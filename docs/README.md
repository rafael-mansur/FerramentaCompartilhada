
# FerramentaCompartilhada

Plataforma web de economia colaborativa para aluguel e empréstimo gratuito de ferramentas entre vizinhos.

## Objetivo

Permitir que moradores anunciem ferramentas de uso eventual e que outros usuários solicitem seu aluguel ou empréstimo.

## Funcionalidades implementadas no protótipo local

- Cadastro e gerenciamento de ferramentas.
- Categorias de ferramentas.
- Nova categoria digitada no anúncio e imagem de capa enviada do computador.
- Aluguel pago com valor por diária.
- Empréstimo gratuito limitado a um dia.
- Endereço obrigatório nos anúncios.
- Solicitação e aprovação de reservas.
- Verificação de conflitos entre reservas.
- Pesquisa e filtros de ferramentas.

## Tecnologias

- Frontend: React com Vite
- Backend: Node.js com Express
- Banco de dados: PostgreSQL 16
- ORM: Prisma 7.10.1
- Infraestrutura: Docker Compose
- Versionamento: Git e GitHub

## Estado do desenvolvimento

API Express implementada com diagnóstico em `GET /api/health`. Essa rota confirma apenas
que o servidor está respondendo; ainda não verifica banco de dados.

Frontend React + Vite com catálogo, filtros, detalhes, formulário de anúncio,
gerenciamento de anúncios e painéis de reservas enviadas/recebidas.
PostgreSQL 16 configurado via Docker Compose, com volume persistente.
Prisma 7 conectado ao banco, com migração inicial de Usuário, Categoria,
Ferramenta e Reserva. A rota `GET /api/health/db` testa a conexão PostgreSQL.
O seed inclui dois perfis fictícios, quatro categorias e três anúncios ilustrativos.
O fluxo de anúncios e reservas está implementado e validado por testes de API.
A revisão manual das novas telas e o ensaio da apresentação ainda estão pendentes.
Consulte [o roteiro de apresentação](ROTEIRO_APRESENTACAO.md) e
[a matriz de verificação](TESTES.md).

## Ambiente verificado em 10/11/2026

| Ferramenta | Versão / situação observada |
|---|---|
| Node.js | 24.21.0 |
| npm | 11.19.0, disponível via `npm.cmd` |
| Git | 2.56.0.windows.4 |
| Docker Engine / CLI | 29.9.3, motor Linux respondeu |
| Docker Compose | v5.7.0 |

Nesta sessão, o PowerShell bloqueou `npm.ps1`; use `npm.cmd`, sem precisar
alterar a política de execução do Windows.

O comando curto `docker` não foi encontrado nesta sessão. A instalação foi
localizada em `%LOCALAPPDATA%\Programs\DockerDesktop\resources\bin\docker.exe`.
O motor respondeu e havia um contêiner `hello-world` encerrado com código 0.
O banco do projeto foi configurado posteriormente, conforme as instruções abaixo.
Exemplo de consulta no PowerShell:

```powershell
& "$env:LOCALAPPDATA\Programs\DockerDesktop\resources\bin\docker.exe" version
```

Não foi encontrado repositório Git local nesta pasta na inspeção inicial.
Posteriormente, o estudante autorizou publicar o projeto. O Git local foi
inicializado na branch `main`, com remoto
[rafael-mansur/FerramentaCompartilhada](https://github.com/rafael-mansur/FerramentaCompartilhada),
conferido vazio antes do envio. O primeiro envio foi confirmado no commit
[`f6ae94a`](https://github.com/rafael-mansur/FerramentaCompartilhada/commit/f6ae94ad32e2aaa8c1643879cf561457ef164616).
A publicação e suas verificações estão registradas no IA-22 em DOCUMENTACAO_IA.md.
Não foi fabricado histórico retroativo de commits.

## Executar a API no Windows

Requer Node.js 24 e npm. Inicie primeiro o banco conforme a seção PostgreSQL.
Na primeira instalação, ou após obter o projeto:

```powershell
cd C:\FerramentaCompartilhada\backend
npm.cmd ci
npm.cmd run db:configure
npm.cmd run prisma:generate
npm.cmd run db:deploy
npm.cmd run db:seed
npm.cmd run dev
```

Para iniciar sem o monitor de alterações:

```powershell
npm.cmd start
```

Abra `http://127.0.0.1:3000/api/health` no navegador, ou consulte em outro terminal:

```powershell
Invoke-RestMethod http://127.0.0.1:3000/api/health
```

Resposta esperada, com HTTP 200:

```json
{"status":"ok","servico":"FerramentaCompartilhada API"}
```

Use `Ctrl+C` para encerrar o servidor. O modo de desenvolvimento usa nodemon
para reiniciar a API após alterações em arquivos.

A configuração padrão usa `127.0.0.1:3000`, restrita ao computador local.
Opcionalmente, copie `backend/.env.example` para `backend/.env` e ajuste
`HOST` e `PORT`; os scripts carregam esse arquivo quando ele existe.
Não versione `.env` ou credenciais. O exemplo do backend contém somente um
marcador de senha que precisa ser substituído; não é uma credencial funcional.

## Se aparecer EADDRINUSE na porta 3000

Já existe outra execução usando a porta. Mantenha somente um backend aberto:
no terminal da execução anterior, pressione `Ctrl+C` e aguarde encerrar. Depois
execute `npm.cmd run dev` em `backend` no terminal que deseja manter.
O nodemon pode permanecer aberto após um erro; encerre a tentativa duplicada
também antes de começar de novo. Não encerre todos os processos Node do computador.

A mensagem `API disponível` só deve aparecer após a porta estar aberta. Abra
`http://127.0.0.1:3000/api/ferramentas` para conferir a versão com o catálogo.
O endereço da interface é `http://127.0.0.1:5173/`; a porta 3000 é somente da API.

## Executar o frontend no Windows

Mantenha o backend em execução em um terminal. Em um segundo terminal:

```powershell
cd C:\FerramentaCompartilhada\frontend
npm.cmd ci
npm.cmd run dev
```

Se as dependências já estiverem instaladas, basta executar `npm.cmd run dev`.
Abra `http://127.0.0.1:5173/`. A página apresenta o projeto, catálogo e navegação.
O painel técnico de conexão foi removido a pedido do estudante. Falhas ao carregar
dados ou realizar ações continuam apresentando mensagens; se o carregamento
inicial falhar, é possível usar Tentar novamente. Não há consulta periódica à
rota health na interface.

O Vite encaminha chamadas `/api` para `http://127.0.0.1:3000` durante o
desenvolvimento; o navegador utiliza a mesma origem do frontend. Se alterar a
porta do backend, copie `frontend/.env.example` para `frontend/.env`, ajuste
`API_PROXY_TARGET` e reinicie o frontend. Essa variável configura apenas o
servidor Vite e não precisa do prefixo público `VITE_`.

A porta 5173 é fixa: se estiver ocupada, o Vite informa erro em vez de escolher
outra porta. Encerre somente o processo de desenvolvimento que você iniciou.

Para verificar a geração dos arquivos estáticos:

```powershell
cd C:\FerramentaCompartilhada\frontend
npm.cmd run build
```

O resultado fica em `frontend/dist/`, ignorado pelo Git. O proxy descrito acima
é de desenvolvimento; o build não inclui um servidor de API nem uma configuração
de hospedagem integrada. Nesta etapa, utilize `npm.cmd run dev` para a integração.

Selecione Ana Demo ou Bruno Demo no cabeçalho para alternar o papel na demonstração.
Os botões do catálogo, anúncios e reservas executam operações reais no banco local.
Esse seletor é propositalmente simples e não constitui autenticação.

## Executar o PostgreSQL 16 no Windows

Abra o Docker Desktop e, no PowerShell, entre na raiz do projeto:

```powershell
cd C:\FerramentaCompartilhada
$dockerExePath = Join-Path $env:LOCALAPPDATA 'Programs\DockerDesktop\resources\bin\docker.exe'
```

Se sua instalação disponibilizar o comando `docker`, ele também pode ser usado
no lugar de `& $dockerExePath` nos comandos seguintes.

Nesta configuração inicial, o `.env` local da raiz foi criado com uma senha
aleatória, sem exibi-la na conversa. Ele é ignorado pelo `.gitignore`.
Em outra máquina, copie `.env.example` para `.env` **somente se ainda não existir**
e preencha `POSTGRES_PASSWORD` com sua própria senha antes de iniciar o banco.
O exemplo versionável mantém a senha vazia e o Compose rejeita senha ausente.

```powershell
& $dockerExePath compose config --quiet
& $dockerExePath compose up -d --wait
& $dockerExePath compose ps
```

O serviço se chama `db` e utiliza a imagem oficial `postgres:16.15-bookworm`.
O banco `ferramentacompartilhada` e o usuário `ferramenta` são os padrões.
A porta publicada é `127.0.0.1:5432`, restrita ao próprio computador.
Se ela estiver ocupada, ajuste `POSTGRES_PORT` no `.env` e execute o comando
de inicialização novamente. Não encerre serviços de outros projetos.

Para consultar a versão e abrir o console SQL, com os padrões acima:

```powershell
& $dockerExePath compose exec db psql -U ferramenta -d ferramentacompartilhada -c 'SELECT version();'
& $dockerExePath compose exec db psql -U ferramenta -d ferramentacompartilhada
```

Use `\q` para sair do console SQL. Se alterar usuário/banco no `.env`, ajuste
também os argumentos desses comandos.

Para parar ou reiniciar:

```powershell
& $dockerExePath compose stop db
& $dockerExePath compose up -d --wait
# Ou, para apenas reiniciar um banco em execução:
& $dockerExePath compose restart db
```

Os dados ficam no volume nomeado `ferramentacompartilhada_postgres_data`.
Parar ou reiniciar o serviço preserva esse volume. Não use `down -v` nem remova
o volume se quiser manter os dados. Alterar usuário, senha ou nome de banco no
`.env` não reconfigura automaticamente um volume já inicializado; mudanças de
credenciais precisam ser feitas também no PostgreSQL, sem apagar o banco.

O `.env` da raiz é do Compose; o `backend/.env` contém a conexão Prisma.
A API `/api/health` continua independente do PostgreSQL.

Verificação técnica em 10/11/2026: PostgreSQL 16.15 saudável, fuso
`America/Sao_Paulo` e registro de teste preservado após reiniciar o contêiner.
A tabela e o esquema usados exclusivamente nessa verificação foram removidos;
As tabelas da aplicação foram criadas posteriormente pela migração inicial Prisma.

## Entender os serviços e testar interrupções

São três processos independentes no mesmo computador:

| Serviço | Onde roda | Função |
|---|---|---|
| Frontend React/Vite | Terminal em `frontend`, porta 5173 | Entrega a página ao navegador. |
| Backend Node/Express | Terminal em `backend`, porta 3000 | Executa regras e acessa os dados via Prisma. |
| PostgreSQL | Docker Desktop, contêiner `ferramentacompartilhada-db-1`, porta 5432 | Armazena anúncios, categorias, usuários e reservas. |

O Compose descreve o banco e o volume. Os dados ficam no volume
`ferramentacompartilhada_postgres_data`, gerenciado pelo Docker; não dependem
de deixar um terminal Node aberto. Capas enviadas ficam separadamente em
`backend/uploads/`. No Docker Desktop, procure esse contêiner para acompanhar
se o PostgreSQL está executando.

Se desligar a API, o Vite ainda pode entregar a página. Conteúdo já carregado
pode continuar visível até atualizar ou realizar uma operação. Uma nova busca,
troca de tela ou tentativa de salvar deve apresentar erro. A mesma lógica vale
para o banco parado: a página continua disponível, mas operações de dados falham.
Não há monitor técnico permanente na tela nem limpeza automática de todos os
dados exibidos quando um serviço para.

Para testar o backend manualmente, pressione `Ctrl+C` apenas no terminal dele,
deixe o frontend aberto e faça uma busca ou atualize a página. Depois execute
`npm.cmd run dev` novamente em `backend` e repita a busca/atualize a página.

Para testar o banco, com Docker Desktop aberto, execute na raiz do projeto:

```powershell
cd C:\FerramentaCompartilhada
$dockerExePath = Join-Path $env:LOCALAPPDATA 'Programs\DockerDesktop\resources\bin\docker.exe'
& $dockerExePath compose stop db
# Faça uma busca no site: a consulta aos dados deve falhar.
& $dockerExePath compose up -d --wait
# Faça uma nova busca/atualize a página para consultar os dados novamente.
```

`stop db` preserva o volume. Não use `down -v` nem remova volumes neste teste.
A rota `/api/health` confirma somente o processo da API; `/api/health/db`
verifica o PostgreSQL. Com banco parado, é esperado a primeira responder 200
e a segunda 503. Isso não significa que operações de dados estejam disponíveis.

## Prisma, migrações e dados fictícios

Execute os comandos Prisma dentro de `backend/`.
`npm.cmd run db:configure` monta a `DATABASE_URL` no `backend/.env` a partir
do `.env` da raiz, codificando usuário e senha na URL sem exibir credenciais.
Uma `DATABASE_URL` já preenchida é preservada. Se mudar porta/credenciais,
atualize a conexão local conscientemente para corresponder ao banco existente.

```powershell
cd C:\FerramentaCompartilhada\backend
npm.cmd run prisma:validate
npm.cmd run prisma:generate
npm.cmd run db:deploy
npm.cmd run db:seed
npm.cmd run db:status
npm.cmd run test:db
```

- `prisma:generate`: gera o cliente local ignorado pelo Git. Execute após
  `npm.cmd ci` e após mudar o modelo.
- `db:deploy`: aplica as migrações existentes sem apagar o banco.
- `db:seed`: garante Ana Demo, Bruno Demo, quatro categorias e três ferramentas
  ilustrativas sem sobrescrever registros existentes. As ferramentas são
  identificadas por título/proprietário; renomear uma delas pode levar o seed
  a recriar o anúncio original. Não execute o seed durante a apresentação.
- `test:db`: exige banco migrado; valida relações, Decimal, DATE e chave
  estrangeira. Os registros válidos de teste usam transação revertida ao final.

Para uma alteração futura de modelo, crie uma nova migração revisável com
`npm.cmd run db:migrate -- --name nome_da_alteracao`. Não use reset nem aceite
apagar o banco para resolver divergências sem antes analisar o estado real.
Não edite uma migração já aplicada.

O arquivo `prisma.config.ts` configura a CLI do Prisma 7; a aplicação continua
em JavaScript. O cliente Prisma gerado em TypeScript é executado pelo Node 24.
A conexão usa `@prisma/adapter-pg`, com limite de cinco conexões e timeout
de aquisição de cinco segundos. Não existe autenticação real nesta etapa.

Com a API em execução:

```powershell
Invoke-RestMethod http://127.0.0.1:3000/api/health/db
```

Retorno esperado: `{"status":"ok","banco":"PostgreSQL"}`. Quando o banco não
está acessível, essa rota responde HTTP 503 com mensagem genérica, sem revelar
credenciais. A rota `/api/health` permanece disponível para diagnóstico manual,
mas não é consultada periodicamente nem exibida como indicador no frontend.

Os modelos já definem endereços obrigatórios como colunas não nulas, enums,
datas `DATE`, valores `Decimal(10,2)` e relações que impedem exclusões de registros
referenciados. Os serviços da API validam textos, modalidades/preços, datas,
diárias, permissões e aprovação sem conflitos. As tabelas por si só não garantem
todas essas regras de negócio.

## Demonstração do marketplace

1. Inicie banco, backend e frontend conforme as seções anteriores.
2. No cabeçalho, escolha Bruno Demo; abra a furadeira de Ana e solicite três
   datas consecutivas: R$ 15 por dia, total R$ 45. A reserva começa pendente.
3. Troque para Ana Demo; em Solicitações recebidas, aprove o pedido.
4. Troque para Bruno e veja o status e endereço fictício em Minhas reservas.
5. Envie outro pedido para o mesmo período. Ao tentar aprová-lo como Ana,
   a API rejeita com conflito e mantém o pedido pendente.
6. Use a escada gratuita para demonstrar retirada/devolução na mesma data.

As datas são inclusivas e não incluem horário. Retirada passada é rejeitada
conforme `America/Sao_Paulo`. O backend recalcula valores e ignora total/status
enviados pelo cliente. Pedidos pendentes podem se sobrepor; a aprovação usa
transação e bloqueio da linha da ferramenta no PostgreSQL para serializar
decisões concorrentes. A integridade depende de realizar as aprovações pela API;
uma edição SQL direta pode ignorar as regras de serviço.

Somente o proprietário selecionado edita/desativa seus anúncios e decide pedidos.
O solicitante cancela seus pedidos pendentes. Após a aprovação, tanto o
solicitante quanto o proprietário podem usar Cancelar reserva em seus painéis.
A reserva passa a CANCELADA, permanece no histórico e deixa de ocupar as datas.
O proprietário também pode concluir uma aprovada a partir da data de devolução.
Reservas já concluídas, recusadas ou canceladas não podem ser canceladas.
Alterações de preço/modalidade são bloqueadas enquanto houver pedidos pendentes
ou aprovados para preservar a oferta; outros campos podem ser editados. Valores
de reservas permanecem armazenados como histórico.

Desativar não apaga anúncio ou reservas: oculta o anúncio do catálogo e impede
novos pedidos/aprovações. Não há tela de reativação nesta entrega.
Endereço completo aparece ao proprietário em seus anúncios/pedidos e ao
solicitante somente enquanto a reserva estiver aprovada. O catálogo e os
detalhes públicos retornam apenas bairro/cidade.

## Categoria e capa do anúncio

No formulário Anunciar/Editar, selecione **Outra categoria…** e digite um nome
de até 60 caracteres. Ao salvar, a categoria é criada ou reutilizada, ignorando
diferenças de maiúsculas e espaços repetidos. Ela aparece no seletor e nos filtros
após salvar. Não há uma tela administrativa de categorias.

Em **Imagem de capa**, escolha uma ilustração pronta ou **Enviar imagem do
computador**. É aceita uma única capa JPG, PNG ou WebP de até 5 MB, com prévia
antes de salvar. Na edição, selecionar outro arquivo substitui a capa; deixar
sem novo arquivo mantém a atual. Também é possível voltar a uma ilustração.

As capas ficam em `backend/uploads/`, criada automaticamente e ignorada pelo
Git. O banco armazena apenas o caminho. Ao substituir, a capa anterior é
removida se não estiver em uso por outro anúncio. Desativar um anúncio preserva
sua imagem e histórico. Para transferir todos os anúncios com fotos a outra
máquina, preserve tanto o banco quanto essa pasta; as capas não vão ao GitHub.

O backend serve as imagens em `/uploads/` e o Vite encaminha esse caminho ao
backend durante o desenvolvimento. Após esta alteração, reinicie o Vite caso
a configuração de proxy não tenha sido recarregada automaticamente.

POST/PUT de ferramentas aceitam JSON para ilustrações e `multipart/form-data`
para envio de arquivo no campo `capa`. Para categoria digitada, use
`categoriaId=OUTRA` e `categoriaNome`. Na edição sem novo arquivo, mantenha
`imagemUrl` com o caminho atual. O upload usa Multer 2.5.0.

## Contrato resumido da API

Identificação local: header `x-usuario-demo` com um ID retornado por
`GET /api/usuarios-demo`. Não é login; use apenas dados fictícios.

| Rotas | Função |
|---|---|
| `GET /api/categorias`, `GET /api/usuarios-demo` | Dados do seletor e categorias |
| `GET /api/ferramentas` | Catálogo; filtros `nome`, `categoriaId`, `bairro`, `modalidade` |
| `GET /api/ferramentas/:id` | Detalhes públicos |
| `GET /api/ferramentas/minhas` | Anúncios do perfil, inclusive desativados |
| `POST /api/ferramentas`, `PUT /api/ferramentas/:id` | Criar/editar anúncio |
| `PATCH /api/ferramentas/:id/desativar` | Desativar preservando histórico |
| `POST /api/reservas` | Solicitar com `ferramentaId`, `dataRetirada`, `dataDevolucao` |
| `GET /api/reservas/minhas`, `GET /api/reservas/recebidas` | Painéis do perfil |
| `PATCH /api/reservas/:id/aprovar` | Aprovar sem sobreposição |
| `PATCH /api/reservas/:id/recusar` | Recusar pendente |
| `PATCH /api/reservas/:id/cancelar` | Solicitante cancela pendente; solicitante ou proprietário cancela aprovada |
| `PATCH /api/reservas/:id/concluir` | Proprietário conclui aprovada |

Erros de validação usam HTTP 400, permissão 403, recurso ausente 404 e conflito
de datas/estado 409, com JSON `{ "erro": "CODIGO", "mensagem": "Explicação" }`.

## Verificar o trabalho

```powershell
cd C:\FerramentaCompartilhada\backend
npm.cmd test
cd C:\FerramentaCompartilhada\frontend
npm.cmd run build
```

Os testes exigem o banco configurado e migrado. Criam registros fictícios
exclusivos e removem somente seus próprios registros ao terminar. Há cobertura
de validações, modalidades, permissões, transições, endereço público e duas
aprovações concorrentes. O driver pg ainda emite um aviso de depreciação em
transações; os testes passam e o aviso está documentado.

O foco acadêmico é o fluxo local completo. Login real, pagamentos online, chat,
galeria de múltiplas imagens e publicação da aplicação em nuvem permanecem fora
do escopo. O envio do código ao GitHub foi autorizado pelo estudante e está
registrado no IA-22. Kanban e revisão acadêmica da dupla continuam pendentes.

## Documentação

| Arquivo | Função |
|---|---|
| Este README | Apresentar o projeto e permitir instalar, executar e resolver problemas comuns. |
| [Documentação-mestre](DOCUMENTACAO_MESTRE.md) | Requisitos, arquitetura, dados, decisões, rastreabilidade e estado atual. |
| [Registro de uso da IA](DOCUMENTACAO_IA.md) | Prompts reais, iterações, erros, correções e critérios de aceitação técnica. |
| [Testes](TESTES.md) | Resultados e limites da verificação; validações manuais pendentes. |
| [Roteiro de apresentação](ROTEIRO_APRESENTACAO.md) | Preparar a demonstração e conferir pendências acadêmicas. |
| [AGENTS.md](AGENTS.md) | Orientar agentes que forem trabalhar nos arquivos. |

Evite manter cópias divergentes dos requisitos: a documentação-mestre é a
referência do produto. Consulte sua seção 19 para ligar requisitos ao código e
aos testes. Checkpoints históricos não substituem o estado atual.

Todos os Markdown do projeto ficam em `docs/`, por solicitação do estudante.
Os comandos de execução continuam sendo executados na raiz, backend ou frontend
conforme indicado; mover a documentação não altera a execução da aplicação.

Os próximos passos são revisar as telas manualmente, executar o roteiro de
demonstração e organizar o Kanban e as evidências de participação da dupla.
Kanban e confirmação do prazo acadêmico
continuam pendentes conforme a documentação-mestre.
