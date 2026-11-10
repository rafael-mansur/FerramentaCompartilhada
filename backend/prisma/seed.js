import { getPrisma } from '../src/lib/prisma.js';

const prisma = getPrisma();

try {
  await prisma.$transaction(async (tx) => {
    for (const usuario of [
      { nome: 'Ana Demo', email: 'ana@example.test', bairro: 'Bairro Exemplo' },
      { nome: 'Bruno Demo', email: 'bruno@example.test', bairro: 'Bairro Modelo' },
    ]) {
      await tx.usuario.upsert({ where: { email: usuario.email }, update: {}, create: usuario });
    }

    for (const nome of ['Ferramentas Elétricas', 'Jardinagem', 'Construção', 'Limpeza']) {
      await tx.categoria.upsert({ where: { nome }, update: {}, create: { nome } });
    }

    const ana = await tx.usuario.findUniqueOrThrow({ where: { email: 'ana@example.test' } });
    const bruno = await tx.usuario.findUniqueOrThrow({ where: { email: 'bruno@example.test' } });
    const eletricas = await tx.categoria.findUniqueOrThrow({ where: { nome: 'Ferramentas Elétricas' } });
    const construcao = await tx.categoria.findUniqueOrThrow({ where: { nome: 'Construção' } });
    const jardim = await tx.categoria.findUniqueOrThrow({ where: { nome: 'Jardinagem' } });
    for (const item of [
      { titulo: 'Furadeira de impacto', descricao: 'Ideal para pequenos reparos. Acompanha conjunto ilustrativo de brocas.', proprietarioId: ana.id, categoriaId: eletricas.id, modalidade: 'ALUGUEL', precoDiaria: '15.00', imagemUrl: '/imagens/furadeira.svg' },
      { titulo: 'Escada dobrável', descricao: 'Escada para tarefas domésticas. Empréstimo gratuito, com devolução na mesma data.', proprietarioId: ana.id, categoriaId: construcao.id, modalidade: 'EMPRESTIMO', precoDiaria: null, imagemUrl: '/imagens/escada.svg' },
      { titulo: 'Kit de jardinagem', descricao: 'Pá e garfo de jardim para cuidar de vasos e canteiros.', proprietarioId: bruno.id, categoriaId: jardim.id, modalidade: 'ALUGUEL', precoDiaria: '10.00', imagemUrl: '/imagens/jardinagem.svg' },
    ]) {
      const existente = await tx.ferramenta.findFirst({ where: { titulo: item.titulo, proprietarioId: item.proprietarioId } });
      if (!existente) await tx.ferramenta.create({ data: {
        ...item, cep: '00000000', logradouro: 'Rua Fictícia', numero: '100',
        bairro: item.proprietarioId === ana.id ? 'Bairro Exemplo' : 'Bairro Modelo',
        cidade: 'Cidade de Demonstração', uf: 'SC',
      } });
    }
  });

  console.log('Seed concluído: dois perfis, quatro categorias e três anúncios fictícios garantidos, sem sobrescrever dados existentes.');
} catch {
  console.error('Não foi possível executar o seed. Verifique o banco, a configuração e as migrações.');
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
