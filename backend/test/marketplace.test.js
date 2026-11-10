import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, test } from 'node:test';
import { once } from 'node:events';
import app from '../src/app.js';
import { getPrisma } from '../src/lib/prisma.js';
import { hoje } from '../src/utils/validacao.js';
import { removerCapa } from '../src/middlewares/capa.js';

const prisma = getPrisma();
let server, base, dono, interessado, terceiro, categoria;
const ferramentas = [];
const categoriasExtras = [];
const capas = [];
const sufixo = randomUUID();
const dia = (offset) => new Date(Date.parse(`${hoje()}T00:00:00Z`) + offset * 86400000).toISOString().slice(0, 10);
const dadosFerramenta = (extras = {}) => ({
  titulo: `Teste ${sufixo}`, descricao: 'Anúncio descartável de integração', categoriaId: categoria.id,
  modalidade: 'ALUGUEL', precoDiaria: '15.50', imagemUrl: '/imagens/furadeira.svg',
  cep: '00000000', logradouro: 'Rua Fictícia Teste', numero: 's/n',
  bairro: `Bairro ${sufixo}`, cidade: 'Cidade Fictícia', uf: 'SC', ...extras,
});

async function request(path, usuario, method = 'GET', body) {
  const multipart = body instanceof FormData;
  const response = await fetch(`${base}/api${path}`, {
    method, headers: { ...(!multipart ? { 'Content-Type': 'application/json' } : {}), ...(usuario ? { 'x-usuario-demo': String(usuario.id) } : {}) },
    ...(body ? { body: multipart ? body : JSON.stringify(body) } : {}),
  });
  return { status: response.status, data: await response.json() };
}

async function anunciar(extras = {}) {
  const result = await request('/ferramentas', dono, 'POST', dadosFerramenta(extras));
  assert.equal(result.status, 201);
  ferramentas.push(result.data.id);
  return result.data;
}

async function reservar(item, inicio = dia(2), fim = dia(4), usuario = interessado) {
  return request('/reservas', usuario, 'POST', { ferramentaId: item.id, dataRetirada: inicio, dataDevolucao: fim, valorTotal: 0, status: 'APROVADA' });
}

before(async () => {
  dono = await prisma.usuario.create({ data: { nome: 'Dono Teste', email: `dono-${sufixo}@example.test` } });
  interessado = await prisma.usuario.create({ data: { nome: 'Interessado Teste', email: `interessado-${sufixo}@example.test` } });
  terceiro = await prisma.usuario.create({ data: { nome: 'Outro Perfil Teste', email: `terceiro-${sufixo}@example.test` } });
  categoria = await prisma.categoria.create({ data: { nome: `Categoria ${sufixo}` } });
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)); }
  if (ferramentas.length) {
    await prisma.reserva.deleteMany({ where: { ferramentaId: { in: ferramentas } } });
    await prisma.ferramenta.deleteMany({ where: { id: { in: ferramentas } } });
  }
  if (categoria) await prisma.categoria.delete({ where: { id: categoria.id } });
  if (categoriasExtras.length) await prisma.categoria.deleteMany({ where: { id: { in: categoriasExtras } } });
  for (const capa of capas) await removerCapa(capa);
  if (dono && interessado && terceiro) await prisma.usuario.deleteMany({ where: { id: { in: [dono.id, interessado.id, terceiro.id] } } });
  await prisma.$disconnect();
});

test('Outra categoria cria, reutiliza nome normalizado e permite editar e filtrar', async () => {
  const nome = `Pintura ${sufixo}`;
  const primeiro = await anunciar({ categoriaId: 'OUTRA', categoriaNome: `  Pintura   ${sufixo}  ` });
  categoriasExtras.push(primeiro.categoriaId);
  assert.equal(primeiro.categoria.nome, nome);
  const segundo = await anunciar({ categoriaId: 'OUTRA', categoriaNome: nome.toLowerCase() });
  assert.equal(segundo.categoriaId, primeiro.categoriaId);
  assert.equal(await prisma.categoria.count({ where: { nome: { equals: nome, mode: 'insensitive' } } }), 1);
  const resultado = await request(`/ferramentas?categoriaId=${primeiro.categoriaId}`);
  assert.equal(resultado.data.length, 2);
  const editado = await request(`/ferramentas/${segundo.id}`, dono, 'PUT', dadosFerramenta({ categoriaId: categoria.id }));
  assert.equal(editado.status, 200); assert.equal(editado.data.categoriaId, categoria.id);
  assert.equal((await request('/ferramentas', dono, 'POST', dadosFerramenta({ categoriaId: 'OUTRA', categoriaNome: '   ' }))).status, 400);
});

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+afoUAAAAASUVORK5CYII=', 'base64');
function formularioCapa(extras = {}, arquivo = png, tipo = 'image/png') {
  const form = new FormData();
  for (const [key, value] of Object.entries(dadosFerramenta(extras))) form.set(key, String(value));
  form.append('capa', new Blob([arquivo], { type: tipo }), 'capa-teste.png');
  return form;
}

test('capa enviada é servida, mantida na edição e substituída sem acumular a anterior', async () => {
  const criado = await request('/ferramentas', dono, 'POST', formularioCapa());
  assert.equal(criado.status, 201);
  ferramentas.push(criado.data.id); capas.push(criado.data.imagemUrl);
  assert.match(criado.data.imagemUrl, /^\/uploads\/[a-f0-9-]+\.png$/);
  const imagem = await fetch(`${base}${criado.data.imagemUrl}`);
  assert.equal(imagem.status, 200); assert.match(imagem.headers.get('content-type'), /image\/png/);
  assert.deepEqual(Buffer.from(await imagem.arrayBuffer()), png);

  const mantida = await request(`/ferramentas/${criado.data.id}`, dono, 'PUT', dadosFerramenta({ imagemUrl: criado.data.imagemUrl }));
  assert.equal(mantida.status, 200); assert.equal(mantida.data.imagemUrl, criado.data.imagemUrl);
  assert.equal((await request(`/ferramentas/${criado.data.id}`, interessado, 'PUT', formularioCapa())).status, 403);

  const substituida = await request(`/ferramentas/${criado.data.id}`, dono, 'PUT', formularioCapa());
  assert.equal(substituida.status, 200); capas.push(substituida.data.imagemUrl);
  assert.notEqual(substituida.data.imagemUrl, criado.data.imagemUrl);
  assert.equal((await fetch(`${base}${criado.data.imagemUrl}`)).status, 404);
  assert.equal((await fetch(`${base}${substituida.data.imagemUrl}`)).status, 200);

  const ilustracao = await request(`/ferramentas/${criado.data.id}`, dono, 'PUT', dadosFerramenta());
  assert.equal(ilustracao.status, 200); assert.equal(ilustracao.data.imagemUrl, '/imagens/furadeira.svg');
  assert.equal((await fetch(`${base}${substituida.data.imagemUrl}`)).status, 404);
});

test('upload rejeita tipo inválido, conteúdo incompatível, excesso de tamanho e duas capas', async () => {
  assert.equal((await request('/ferramentas', dono, 'POST', formularioCapa({}, '<svg/>', 'image/svg+xml'))).status, 400);
  assert.equal((await request('/ferramentas', dono, 'POST', formularioCapa({}, 'não é imagem', 'image/png'))).status, 400);
  const grande = await request('/ferramentas', dono, 'POST', formularioCapa({}, Buffer.alloc(5 * 1024 * 1024 + 1)));
  assert.equal(grande.status, 400); assert.match(grande.data.mensagem, /5 MB/);
  const duas = formularioCapa();
  duas.append('capa', new Blob([png], { type: 'image/png' }), 'outra.png');
  assert.equal((await request('/ferramentas', dono, 'POST', duas)).status, 400);
});

test('anúncio rejeita endereço ausente e aluguel com preço inválido', async () => {
  for (const extras of [{ bairro: '' }, { cidade: '' }, { precoDiaria: '0' }, { precoDiaria: '-1' }, { precoDiaria: '1.234' }]) {
    assert.equal((await request('/ferramentas', dono, 'POST', dadosFerramenta(extras))).status, 400);
  }
});

test('catálogo filtra e detalhes públicos omitem endereço completo', async () => {
  const titulo = `Catálogo ${sufixo}`;
  const item = await anunciar({ titulo });
  const query = new URLSearchParams({ nome: titulo, bairro: sufixo, categoriaId: String(categoria.id), modalidade: 'ALUGUEL' });
  const lista = await request(`/ferramentas?${query}`);
  assert.equal(lista.status, 200); assert.equal(lista.data.length, 1);
  for (const retorno of [lista.data[0], (await request(`/ferramentas/${item.id}`)).data]) {
    assert.equal(retorno.id, item.id);
    for (const campo of ['logradouro', 'numero', 'cep', 'complemento', 'uf']) assert.equal(campo in retorno, false);
  }
});

test('proprietário edita; outro perfil não pode editar ou desativar', async () => {
  const item = await anunciar();
  assert.equal((await request(`/ferramentas/${item.id}`, interessado, 'PUT', dadosFerramenta())).status, 403);
  assert.equal((await request(`/ferramentas/${item.id}/desativar`, interessado, 'PATCH')).status, 403);
  const salvo = await request(`/ferramentas/${item.id}`, dono, 'PUT', dadosFerramenta({ titulo: `Editado ${sufixo}` }));
  assert.equal(salvo.status, 200); assert.equal(salvo.data.titulo, `Editado ${sufixo}`);
});

test('aluguel calcula diárias inclusivas e total; cliente não define preço nem status', async () => {
  const item = await anunciar(); const pedido = await reservar(item);
  assert.equal(pedido.status, 201); assert.equal(pedido.data.diarias, 3);
  assert.equal(Number(pedido.data.valorTotal), 46.5); assert.equal(pedido.data.status, 'PENDENTE');
  assert.equal(pedido.data.endereco, null);
});

test('gratuito aceita a mesma data, ignora preço e rejeita dois dias', async () => {
  const item = await anunciar({ modalidade: 'EMPRESTIMO', precoDiaria: '999' });
  assert.equal(item.precoDiaria, null);
  const pedido = await reservar(item, dia(2), dia(2));
  assert.equal(pedido.status, 201); assert.equal(Number(pedido.data.valorTotal), 0);
  assert.equal((await reservar(item, dia(2), dia(3))).status, 400);
});

test('datas inválidas, passadas, invertidas e reserva própria são rejeitadas', async () => {
  const item = await anunciar();
  for (const [inicio, fim] of [['2030-02-30', '2030-03-01'], [dia(-1), dia(2)], [dia(4), dia(2)]]) {
    assert.equal((await reservar(item, inicio, fim)).status, 400);
  }
  assert.equal((await reservar(item, dia(2), dia(3), dono)).status, 403);
});

test('duas aprovações simultâneas sobrepostas: uma aprovada, outra HTTP 409', async () => {
  const item = await anunciar();
  const a = await reservar(item); const b = await reservar(item, dia(4), dia(5));
  assert.equal(a.status, 201); assert.equal(b.status, 201);
  assert.equal((await request(`/reservas/${a.data.id}/aprovar`, interessado, 'PATCH')).status, 403);
  const resultados = await Promise.all([a, b].map((pedido) => request(`/reservas/${pedido.data.id}/aprovar`, dono, 'PATCH')));
  assert.deepEqual(resultados.map((r) => r.status).sort(), [200, 409]);
  assert.equal(await prisma.reserva.count({ where: { ferramentaId: item.id, status: 'APROVADA' } }), 1);
  assert.equal(await prisma.reserva.count({ where: { ferramentaId: item.id, status: 'PENDENTE' } }), 1);
  const lista = await request('/reservas/minhas', interessado);
  const aprovada = lista.data.find((r) => r.ferramentaId === item.id && r.status === 'APROVADA');
  assert.equal(aprovada.endereco.logradouro, 'Rua Fictícia Teste');
  const pendente = lista.data.find((r) => r.ferramentaId === item.id && r.status === 'PENDENTE');
  assert.equal(pendente.endereco, null);
});

test('períodos distintos podem ser aprovados e não se conclui devolução futura', async () => {
  const item = await anunciar();
  for (const [inicio, fim] of [[dia(2), dia(3)], [dia(4), dia(5)]]) {
    const pedido = await reservar(item, inicio, fim);
    assert.equal((await request(`/reservas/${pedido.data.id}/aprovar`, dono, 'PATCH')).status, 200);
    assert.equal((await request(`/reservas/${pedido.data.id}/concluir`, dono, 'PATCH')).status, 409);
  }
});

test('cancelar, recusar e concluir preservam histórico e controlam transições', async () => {
  const item = await anunciar();
  const a = await reservar(item); const b = await reservar(item);
  assert.equal((await request(`/reservas/${a.data.id}/cancelar`, dono, 'PATCH')).status, 403);
  assert.equal((await request(`/reservas/${a.data.id}/cancelar`, interessado, 'PATCH')).data.status, 'CANCELADA');
  assert.equal((await request(`/reservas/${b.data.id}/recusar`, dono, 'PATCH')).data.status, 'RECUSADA');
  assert.equal((await request(`/reservas/${b.data.id}/aprovar`, dono, 'PATCH')).status, 409);
  assert.equal((await request(`/reservas/${b.data.id}/cancelar`, interessado, 'PATCH')).status, 409);
  const c = await reservar(item, hoje(), hoje());
  assert.equal((await request(`/reservas/${c.data.id}/aprovar`, dono, 'PATCH')).status, 200);
  assert.equal((await request(`/reservas/${c.data.id}/concluir`, dono, 'PATCH')).data.status, 'CONCLUIDA');
  assert.equal((await request(`/reservas/${c.data.id}/cancelar`, dono, 'PATCH')).status, 409);
  assert.equal(await prisma.reserva.count({ where: { ferramentaId: item.id } }), 3);
});

for (const perfil of ['proprietário', 'solicitante']) {
  test(`${perfil} cancela aprovada, mantém histórico e libera as datas`, async () => {
    const item = await anunciar();
    const primeira = await reservar(item);
    const segunda = await reservar(item);
    assert.equal((await request(`/reservas/${primeira.data.id}/aprovar`, dono, 'PATCH')).status, 200);
    assert.equal((await request(`/reservas/${segunda.data.id}/aprovar`, dono, 'PATCH')).status, 409);
    assert.equal((await request(`/reservas/${primeira.data.id}/cancelar`, terceiro, 'PATCH')).status, 403);

    const usuario = perfil === 'proprietário' ? dono : interessado;
    const cancelada = await request(`/reservas/${primeira.data.id}/cancelar`, usuario, 'PATCH');
    assert.equal(cancelada.status, 200);
    assert.equal(cancelada.data.status, 'CANCELADA');
    assert.equal(Number(cancelada.data.valorTotal), 46.5);
    assert.equal((await request(`/reservas/${primeira.data.id}/cancelar`, usuario, 'PATCH')).status, 409);
    assert.equal((await request(`/reservas/${primeira.data.id}/concluir`, dono, 'PATCH')).status, 409);
    assert.equal((await request(`/reservas/${segunda.data.id}/aprovar`, dono, 'PATCH')).status, 200);

    for (const [path, usuario] of [['/reservas/minhas', interessado], ['/reservas/recebidas', dono]]) {
      const lista = await request(path, usuario);
      assert.equal(lista.data.find((r) => r.id === primeira.data.id).status, 'CANCELADA');
    }
    assert.equal(await prisma.reserva.count({ where: { ferramentaId: item.id } }), 2);
  });
}

test('desativação oculta anúncio e impede novas solicitações e aprovações pendentes', async () => {
  const item = await anunciar(); const pedido = await reservar(item);
  assert.equal((await request(`/ferramentas/${item.id}/desativar`, dono, 'PATCH')).status, 200);
  assert.equal((await request(`/ferramentas/${item.id}`)).status, 404);
  assert.equal((await reservar(item)).status, 409);
  assert.equal((await request(`/reservas/${pedido.data.id}/aprovar`, dono, 'PATCH')).status, 409);
  assert.equal(await prisma.reserva.count({ where: { ferramentaId: item.id } }), 1);
});
