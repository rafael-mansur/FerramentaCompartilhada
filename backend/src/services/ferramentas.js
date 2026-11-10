import { getPrisma } from '../lib/prisma.js';
import { exigir, idValido, texto, dinheiro } from '../utils/validacao.js';
import { gravarCapa, removerCapa } from '../middlewares/capa.js';

export const imagens = ['/imagens/furadeira.svg', '/imagens/escada.svg', '/imagens/jardinagem.svg'];
export const relacoesFerramenta = {
  categoria: true,
  proprietario: { select: { id: true, nome: true } },
};

export function ferramentaPublica(item) {
  return {
    id: item.id, titulo: item.titulo, descricao: item.descricao,
    modalidade: item.modalidade, precoDiaria: item.precoDiaria,
    imagemUrl: item.imagemUrl, bairro: item.bairro, cidade: item.cidade,
    categoria: item.categoria, proprietario: item.proprietario, ativa: item.ativa,
  };
}

export async function bloquearFerramenta(tx, id) {
  await tx.$queryRaw`SELECT id FROM "Ferramenta" WHERE id = ${id} FOR UPDATE`;
  const item = await tx.ferramenta.findUnique({ where: { id }, include: relacoesFerramenta });
  exigir(item, 'Ferramenta não encontrada.', 404, 'NAO_ENCONTRADO');
  return item;
}

function validarAnuncio(body) {
  exigir(body && typeof body === 'object', 'Informe os dados do anúncio.');
  exigir(['ALUGUEL', 'EMPRESTIMO'].includes(body.modalidade), 'Modalidade inválida.');
  const categoriaId = body.categoriaId === 'OUTRA' ? null : idValido(body.categoriaId);
  const categoriaNome = body.categoriaId === 'OUTRA' ? texto(body.categoriaNome, 'Nome da categoria', 60).replace(/\s+/g, ' ') : null;
  const cep = texto(body.cep, 'CEP', 9).replace(/\D/g, '');
  exigir(/^\d{8}$/.test(cep), 'CEP deve conter oito dígitos.');
  const uf = texto(body.uf, 'UF', 2).toUpperCase();
  exigir(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].includes(uf), 'UF inválida.');
  return {
    titulo: texto(body.titulo, 'Título', 100), descricao: texto(body.descricao, 'Descrição', 2000),
    categoriaId, categoriaNome, modalidade: body.modalidade,
    precoDiaria: body.modalidade === 'ALUGUEL' ? dinheiro(body.precoDiaria) : null,
    imagemUrl: body.imagemUrl, cep, uf,
    logradouro: texto(body.logradouro, 'Rua'), numero: texto(body.numero, 'Número ou s/n', 20),
    bairro: texto(body.bairro, 'Bairro', 100), cidade: texto(body.cidade, 'Cidade', 100),
    complemento: body.complemento ? texto(body.complemento, 'Complemento') : null,
  };
}

export async function listarFerramentas(query) {
  const where = { ativa: true };
  if (query.nome) where.titulo = { contains: texto(query.nome, 'Busca', 100), mode: 'insensitive' };
  if (query.bairro) where.bairro = { contains: texto(query.bairro, 'Bairro', 100), mode: 'insensitive' };
  if (query.categoriaId) where.categoriaId = idValido(query.categoriaId);
  if (query.modalidade) {
    exigir(['ALUGUEL', 'EMPRESTIMO'].includes(query.modalidade), 'Modalidade inválida.');
    where.modalidade = query.modalidade;
  }
  const itens = await getPrisma().ferramenta.findMany({ where, include: relacoesFerramenta, orderBy: { id: 'desc' } });
  return itens.map(ferramentaPublica);
}

export async function detalharFerramenta(id) {
  const item = await getPrisma().ferramenta.findUnique({ where: { id }, include: relacoesFerramenta });
  exigir(item?.ativa, 'Ferramenta não encontrada ou desativada.', 404, 'NAO_ENCONTRADO');
  return ferramentaPublica(item);
}

export function minhasFerramentas(proprietarioId) {
  return getPrisma().ferramenta.findMany({ where: { proprietarioId }, include: relacoesFerramenta, orderBy: { id: 'desc' } });
}

export async function salvarFerramenta(body, usuarioId, id, arquivo) {
  const { categoriaNome, ...data } = validarAnuncio(body);
  let novaCapa;
  let capaAnterior;
  let resultado;
  try {
    resultado = await getPrisma().$transaction(async (tx) => {
      const item = id ? await bloquearFerramenta(tx, id) : null;
      if (item) {
        exigir(item.proprietarioId === usuarioId, 'Somente o proprietário pode editar.', 403, 'NAO_PERMITIDO');
        const mudouOferta = item.modalidade !== data.modalidade || String(item.precoDiaria) !== String(data.precoDiaria);
        if (mudouOferta) {
          const abertas = await tx.reserva.count({ where: { ferramentaId: id, status: { in: ['PENDENTE', 'APROVADA'] } } });
          exigir(!abertas, 'Há reservas abertas. Preserve modalidade e preço até encerrá-las.', 409, 'RESERVAS_ABERTAS');
        }
      }
      exigir(arquivo || imagens.includes(data.imagemUrl) || (item && data.imagemUrl === item.imagemUrl), 'Selecione uma imagem ilustrativa ou envie uma capa.');
      if (categoriaNome) {
        // Serializa criação/reutilização do mesmo nome, inclusive com diferenças de caixa.
        await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${`categoria:${categoriaNome.toLocaleLowerCase('pt-BR')}`}))::text`;
        const categoria = await tx.categoria.findFirst({ where: { nome: { equals: categoriaNome, mode: 'insensitive' } } })
          || await tx.categoria.create({ data: { nome: categoriaNome } });
        data.categoriaId = categoria.id;
      } else {
        exigir(await tx.categoria.findUnique({ where: { id: data.categoriaId } }), 'Categoria não encontrada.');
      }
      if (arquivo) data.imagemUrl = novaCapa = await gravarCapa(arquivo);
      capaAnterior = item?.imagemUrl;
      return id ? tx.ferramenta.update({ where: { id }, data, include: relacoesFerramenta })
        : tx.ferramenta.create({ data: { ...data, proprietarioId: usuarioId }, include: relacoesFerramenta });
    }, { timeout: 10000 });
  } catch (err) {
    if (novaCapa) await removerCapa(novaCapa);
    throw err;
  }
  if (capaAnterior !== resultado.imagemUrl) {
    try {
      if (capaAnterior?.startsWith('/uploads/') && !await getPrisma().ferramenta.count({ where: { imagemUrl: capaAnterior } })) await removerCapa(capaAnterior);
    } catch { console.error('Não foi possível conferir a remoção da capa antiga.'); }
  }
  return resultado;
}

export function desativarFerramenta(id, usuarioId) {
  return getPrisma().$transaction(async (tx) => {
    const item = await bloquearFerramenta(tx, id);
    exigir(item.proprietarioId === usuarioId, 'Somente o proprietário pode desativar.', 403, 'NAO_PERMITIDO');
    return tx.ferramenta.update({ where: { id }, data: { ativa: false } });
  });
}
