
# Instruções para agentes de IA

## Projeto
FerramentaCompartilhada — marketplace de aluguel e empréstimo gratuito de ferramentas.

## Documentação
- Consulte DOCUMENTACAO_MESTRE.md, nesta pasta docs, para entender os requisitos e a arquitetura.
- Consulte DOCUMENTACAO_IA.md para conhecer as decisões anteriores e o histórico de utilização da IA.
- Na documentação-mestre, use o cabeçalho e a seção 18.0 como retomada atual; não execute instruções de checkpoints históricos como tarefas novas.
- Consulte TESTES.md para resultados e limites de validação e ROTEIRO_APRESENTACAO.md para o ensaio, ambos nesta pasta docs. Requisitos e arquitetura permanecem na documentação-mestre.

## Tecnologias obrigatórias
- Node.js 24 + Express
- React + Vite
- PostgreSQL 16 via Docker Compose
- Prisma ORM 7
- Git e GitHub

## Regras principais
- Empréstimos gratuitos limitados a uma data.
- Aluguéis pagos calculados por diária.
- Endereço obrigatório no cadastro da ferramenta.
- Reservas precisam de aprovação do proprietário.
- Não permitir reservas aprovadas com datas conflitantes.
- O sistema deve funcionar localmente no Windows.

## Instruções de desenvolvimento
1. Antes de programar, examine os arquivos existentes.
2. Não recrie arquivos ou pastas que já existam.
3. Implemente o projeto em etapas pequenas.
4. Explique as principais alterações realizadas.
5. Execute testes sempre que possível.
6. Não altere os requisitos sem autorização.
7. Não envie senhas ou arquivos .env ao GitHub.
8. Não faça commits nem push sem autorização.
9. Atualize DOCUMENTACAO_IA.md com o uso efetivo da IA.
10. Diferencie funcionalidades planejadas das já implementadas.
