import { getPrisma } from '../lib/prisma.js';
import { Prisma } from '../generated/prisma/client.ts';
import { bloquearFerramenta, ferramentaPublica, relacoesFerramenta } from './ferramentas.js';
import { exigir, idValido, dataValida, hoje } from '../utils/validacao.js';

const incluir = {
  ferramenta: { include: relacoesFerramenta },
  solicitante: { select: { id: true, nome: true } },
};

function apresentar(item, usuarioId) {
  const { ferramenta, ...reserva } = item;
  const enderecoPermitido = ferramenta.proprietarioId === usuarioId || (item.solicitanteId === usuarioId && item.status === 'APROVADA');
  return {
    ...reserva,
    dataRetirada: item.dataRetirada.toISOString().slice(0, 10),
    dataDevolucao: item.dataDevolucao.toISOString().slice(0, 10),
    ferramenta: ferramentaPublica(ferramenta),
    endereco: enderecoPermitido ? {
      logradouro: ferramenta.logradouro, numero: ferramenta.numero, complemento: ferramenta.complemento,
      bairro: ferramenta.bairro, cidade: ferramenta.cidade, uf: ferramenta.uf, cep: ferramenta.cep,
    } : null,
  };
}

export async function solicitarReserva(body, usuarioId) {
  exigir(body && typeof body === 'object', 'Informe a ferramenta e as datas.');
  const ferramentaId = idValido(body.ferramentaId);
  const dataRetirada = dataValida(body.dataRetirada);
  const dataDevolucao = dataValida(body.dataDevolucao);
  exigir(body.dataRetirada >= hoje(), 'Retirada não pode estar no passado.');
  exigir(dataDevolucao >= dataRetirada, 'Devolução não pode ser anterior à retirada.');
  const diarias = (dataDevolucao - dataRetirada) / 86400000 + 1;

  const item = await getPrisma().$transaction(async (tx) => {
    const ferramenta = await bloquearFerramenta(tx, ferramentaId);
    exigir(ferramenta.ativa, 'Ferramenta desativada.', 409, 'FERRAMENTA_INDISPONIVEL');
    exigir(ferramenta.proprietarioId !== usuarioId, 'Você não pode reservar sua própria ferramenta.', 403, 'NAO_PERMITIDO');
    exigir(ferramenta.modalidade !== 'EMPRESTIMO' || diarias === 1, 'Empréstimo gratuito exige retirada e devolução na mesma data.');
    const valorTotal = ferramenta.modalidade === 'EMPRESTIMO' ? new Prisma.Decimal(0) : ferramenta.precoDiaria.mul(diarias);
    exigir(valorTotal.lessThanOrEqualTo('99999999.99'), 'Período excede o valor máximo de uma reserva.');
    return tx.reserva.create({ data: { ferramentaId, solicitanteId: usuarioId, dataRetirada, dataDevolucao, diarias, valorTotal }, include: incluir });
  });
  return apresentar(item, usuarioId);
}

export async function listarReservas(usuarioId, recebidas = false) {
  const where = recebidas ? { ferramenta: { proprietarioId: usuarioId } } : { solicitanteId: usuarioId };
  const itens = await getPrisma().reserva.findMany({ where, include: incluir, orderBy: { id: 'desc' } });
  return itens.map((item) => apresentar(item, usuarioId));
}

export async function decidirReserva(id, usuarioId, acao) {
  const item = await getPrisma().$transaction(async (tx) => {
    const inicial = await tx.reserva.findUnique({ where: { id } });
    exigir(inicial, 'Reserva não encontrada.', 404, 'NAO_ENCONTRADO');
    const ferramenta = await bloquearFerramenta(tx, inicial.ferramentaId);
    const reserva = await tx.reserva.findUniqueOrThrow({ where: { id } });
    const solicitante = reserva.solicitanteId === usuarioId;
    const proprietario = ferramenta.proprietarioId === usuarioId;
    if (acao === 'cancelar') {
      exigir(solicitante || proprietario, 'Somente o solicitante ou o proprietário pode cancelar a reserva.', 403, 'NAO_PERMITIDO');
      exigir(['PENDENTE', 'APROVADA'].includes(reserva.status), 'Apenas reservas pendentes ou aprovadas podem ser canceladas.', 409, 'ESTADO_INVALIDO');
      exigir(reserva.status === 'APROVADA' || solicitante, 'Para um pedido pendente, o proprietário deve usar Recusar.', 403, 'NAO_PERMITIDO');
    } else {
      exigir(proprietario, 'Este perfil não pode executar essa ação.', 403, 'NAO_PERMITIDO');
      exigir(reserva.status === (acao === 'concluir' ? 'APROVADA' : 'PENDENTE'), 'A reserva não está em um estado válido para essa ação.', 409, 'ESTADO_INVALIDO');
    }

    if (acao === 'aprovar') {
      exigir(ferramenta.ativa, 'Não é possível aprovar pedidos de uma ferramenta desativada.', 409, 'FERRAMENTA_INDISPONIVEL');
      exigir(reserva.dataRetirada.toISOString().slice(0, 10) >= hoje(), 'A data de retirada já passou.', 409, 'DATA_EXPIRADA');
      const conflito = await tx.reserva.findFirst({ where: {
        ferramentaId: ferramenta.id, status: 'APROVADA',
        dataRetirada: { lte: reserva.dataDevolucao }, dataDevolucao: { gte: reserva.dataRetirada },
      } });
      exigir(!conflito, 'A ferramenta já está reservada nessas datas.', 409, 'PERIODO_INDISPONIVEL');
    }
    if (acao === 'concluir') {
      exigir(reserva.dataDevolucao.toISOString().slice(0, 10) <= hoje(), 'Conclua após a devolução, a partir da data prevista.', 409, 'DEVOLUCAO_FUTURA');
    }
    const status = { aprovar: 'APROVADA', recusar: 'RECUSADA', cancelar: 'CANCELADA', concluir: 'CONCLUIDA' }[acao];
    return tx.reserva.update({ where: { id }, data: { status }, include: incluir });
  }, { timeout: 10000 });
  return apresentar(item, usuarioId);
}
