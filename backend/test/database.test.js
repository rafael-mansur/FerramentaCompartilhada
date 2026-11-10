import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, test } from 'node:test';
import { getPrisma } from '../src/lib/prisma.js';

const prisma = getPrisma();
after(() => prisma.$disconnect());

class RollbackDeTeste extends Error {}

test('PostgreSQL preserva relações, Decimal e datas no acesso pelo Prisma', async () => {
  const suffix = randomUUID();

  await assert.rejects(prisma.$transaction(async (tx) => {
    const dono = await tx.usuario.create({ data: { nome: 'Dono Teste', email: `dono-${suffix}@example.test` } });
    const interessado = await tx.usuario.create({ data: { nome: 'Interessado Teste', email: `interessado-${suffix}@example.test` } });
    const categoria = await tx.categoria.create({ data: { nome: `Categoria Teste ${suffix}` } });
    const ferramenta = await tx.ferramenta.create({ data: {
      titulo: 'Ferramenta de teste', descricao: 'Registro descartável de integração',
      modalidade: 'ALUGUEL', precoDiaria: '15.50', imagemUrl: '/imagens/teste.svg',
      cep: '00000000', logradouro: 'Rua Fictícia', numero: 's/n',
      bairro: 'Bairro Teste', cidade: 'Cidade Fictícia', uf: 'SC',
      proprietarioId: dono.id, categoriaId: categoria.id,
    } });
    const reserva = await tx.reserva.create({ data: {
      ferramentaId: ferramenta.id, solicitanteId: interessado.id,
      dataRetirada: new Date('2030-01-10T00:00:00Z'),
      dataDevolucao: new Date('2030-01-12T00:00:00Z'),
      diarias: 3, valorTotal: '46.50',
    } });
    const salvo = await tx.reserva.findUniqueOrThrow({
      where: { id: reserva.id },
      include: { ferramenta: { include: { proprietario: true, categoria: true } }, solicitante: true },
    });
    assert.equal(salvo.status, 'PENDENTE');
    assert.equal(salvo.valorTotal.toFixed(2), '46.50');
    assert.equal(salvo.ferramenta.precoDiaria.toFixed(2), '15.50');
    assert.equal(salvo.dataRetirada.toISOString(), '2030-01-10T00:00:00.000Z');
    assert.equal(salvo.dataDevolucao.toISOString(), '2030-01-12T00:00:00.000Z');
    assert.equal(salvo.ferramenta.proprietario.id, dono.id);
    assert.equal(salvo.ferramenta.categoria.id, categoria.id);
    assert.equal(salvo.solicitante.id, interessado.id);
    throw new RollbackDeTeste();
  }), RollbackDeTeste);

  assert.equal(await prisma.usuario.count({ where: { email: `dono-${suffix}@example.test` } }), 0);
});

test('chave estrangeira rejeita reserva sem ferramenta e solicitante existentes', async () => {
  await assert.rejects(prisma.reserva.create({ data: {
    ferramentaId: -1, solicitanteId: -1,
    dataRetirada: new Date('2030-01-10T00:00:00Z'),
    dataDevolucao: new Date('2030-01-10T00:00:00Z'),
    diarias: 1, valorTotal: '0.00',
  } }), (error) => error.code === 'P2003');
});
