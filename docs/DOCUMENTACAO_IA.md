# DOCUMENTACAO_IA.md — Registro do uso de Inteligência Artificial

**Projeto:** FerramentaCompartilhada  
**Disciplina:** Laboratório de Programação — Ciência da Computação / UNIFACVEST    
**Versão deste registro:** 1.1 — histórico de implementação e auditoria documental  
**Atualizado em:** 10/11/2026  
**Período documentado:** concepção, ambiente, implementação do MVP, melhorias solicitadas e revisão da documentação  
**Status atual:** MVP local implementado e testado na API, com primeira publicação no GitHub confirmada no IA-22; revisão visual das novas telas, ensaio e Kanban pendentes. Os registros iniciais abaixo preservam o histórico anterior à implementação.

> **LEIA PRIMEIRO — IMPORTANTE PARA OUTRAS IAs.** Este arquivo documenta como a IA foi usada: prompts, propostas, refinamentos, decisões e evidências. Não substitui a [documentação-mestre](DOCUMENTACAO_MESTRE.md). Todos os Markdown foram reunidos em docs por solicitação do estudante; referências à raiz em registros anteriores descrevem os caminhos usados na época. As seções iniciais e os Apêndices A–C são históricos; os registros IA-09 em diante relatam a implementação inspecionada/executada. O edital original em PDF é citado no histórico, mas não foi localizado nesta pasta. Não afirmar que ele foi conferido diretamente nesta revisão. Nunca confundir uma sugestão com uma ação executada ou um teste técnico com aprovação manual da dupla.

---

## 1. Para que serve este documento

Este arquivo é o **registro de uso e revisão crítica de IA** pedido pelo professor. Ele demonstra que o estudante não apenas solicitou código pronto, mas utilizou a IA como apoio às atividades de Engenharia de Software: compreensão do problema, comparação de alternativas, levantamento e refinamento de requisitos, seleção de tecnologias, proposta de arquitetura, elaboração de documentação e auxílio na configuração do ambiente.

Deve ser mantido no repositório GitHub com o nome `DOCUMENTACAO_IA.md`.
Sua localização atual é `docs/DOCUMENTACAO_IA.md`, por solicitação do estudante.
É diferente do README (execução) e da documentação-mestre (produto/engenharia).
Este documento explica como chegamos às decisões e como a IA contribuiu.

### 1.1 Como interpretar os registros

- **Decidido pelo estudante:** preferência ou regra explicitamente aceita ou introduzida pelo usuário.
- **Sugerido pela IA:** proposta apresentada pelo assistente; não significa que foi implementada.
- **Executado segundo relato:** o estudante afirmou que realizou a atividade; sem inspeção direta do computador ou repositório.
- **Evidência observada na conversa:** saída de comando ou erro compartilhado com o assistente.
- **Pendente / não confirmado:** ainda não existe evidência de execução bem-sucedida.

**Regra de confiabilidade:** se um comando foi recomendado, mas o estudante não mostrou resultado, ele permanece **não confirmado**. O mesmo vale para arquivos, dependências, commits, funcionalidades e testes.

### 1.2 Fontes e limites deste registro

1. O edital de 6 páginas disponibilizado pelo estudante, especialmente as diretrizes de tecnologias, documentação e avaliação.
2. As interações mantidas com o ChatGPT durante o planejamento e as primeiras tentativas de configuração.
3. A documentação-mestre produzida durante esse processo, versão 1.1 (10/11/2026).

O **Apêndice A** reproduz pedidos do planejamento inicial, preservando a grafia.
Os registros IA-09 em diante incluem os prompts relevantes da implementação,
resultados observados e erros/correções. Este arquivo é uma síntese analítica,
não uma transcrição integral de todas as mensagens ou um arquivo de logs brutos.
O código dos testes está em `backend/test/`; resultados consolidados em
`docs/TESTES.md`. Não há commits exportados nem comprovação de revisão manual
de todos os arquivos pela dupla. O checklist acadêmico precisa dessa revisão.

### 1.3 Índice da implementação e das decisões de IA

Os prompts literais e detalhes estão nos registros indicados ao final do arquivo.
A tabela facilita localizar problema, iteração e decisão no formato do trabalho.

| Problema / requisito | Prompt registrado | Refinamento / iteração | Decisão e evidência |
|---|---|---|---|
| Conferir estado sem alterar arquivos | IA-09 | npm.ps1 bloqueado e Docker fora do PATH; inspeção por caminho completo | Só leitura; versões e limites registrados. |
| Iniciar API Express | IA-10 | Alertas no nodemon mais recente; versão ajustada | Rota health validada por HTTP; versões fixadas. |
| React e comunicação com API | IA-11 | Controle visual bloqueado; validação HTTP e build | Proxy Vite e indicador de conexão; relato posterior do estudante no IA-12. |
| PostgreSQL local e persistência | IA-12 | Geração de senha adaptada ao PowerShell | Compose com volume; reinício real confirmado. |
| Prisma e modelo relacional | IA-13 | CLI padrão apontava para Prisma 8; testes antes de aplicar migração falharam | Prisma 7 fixado, migração aplicada, relações/Decimal/DATE testados. |
| Finalizar núcleo acadêmico | IA-14 | Priorização do fluxo local em vez de recursos de produção | Anúncios e reservas; concorrência e build aprovados. |
| Backend antigo ocupando porta | IA-15 | PID e identidade HTTP conferidos; mensagem de sucesso antecipada corrigida | Processo específico encerrado e teste de regressão aprovado. |
| Cancelar reserva aceita nos dois perfis | IA-16 | Regra conservadora anterior substituída a pedido do estudante | Cancelamento libera datas e preserva histórico; testes aprovados. |
| Outra categoria e capa própria | IA-17 | Teste antigo tinha filtro não exclusivo; isolamento corrigido | Multipart/local, uma capa, categoria reutilizada; 18 testes aprovados. |
| Manter demo e conferir documentação | IA-18 | Textos de planejamento estavam misturados ao estado atual | História sinalizada, retomada atual e requisito → código → teste organizados. |

---

## 2. Contexto do trabalho e finalidade de usar IA

O objetivo do trabalho é desenvolver em dupla uma aplicação web e demonstrar decisões típicas da Engenharia de Software. A IA é permitida para auxiliar no planejamento e na programação, mas o grupo deve documentar os **prompts**, os **refinamentos** e os **critérios utilizados para aceitar ou rejeitar** as sugestões e o código gerado.

Exigências relevantes do edital:

| Tema | Diretriz do professor | Escolha planejada para o projeto |
|---|---|---|
| Integrantes | Exatamente duas pessoas | Desenvolvimento em dupla |
| Backend | Node.js + Express; nodemon | Node.js 24.x, Express e nodemon |
| Frontend | Biblioteca/framework moderno | React + Vite |
| Banco de dados | PostgreSQL 15 ou 16, com Docker/Compose | PostgreSQL 16 + Docker Compose |
| ORM | Prisma recomendado | Prisma, versão compatível a fixar na instalação |
| Versionamento | GitHub, commits representando evolução | Repositório GitHub já criado, segundo estudante |
| Gestão de tarefas | Kanban visual | Adiado temporariamente pelo estudante; requisito ainda existe no edital |
| Documentação | `DOCUMENTACAO_IA.md`, com prompts, iterações e decisões | Este documento |
| Demonstração | Sistema rodando localmente, em 10 minutos | Ainda não executado |

**Prazo histórico:** o edital indicou 09/11/2026. Em 10/11/2026 essa data já havia passado; não existe informação confirmada sobre nova data ou prorrogação. O registro de IA não deve afirmar que o trabalho foi entregue.

---

## 3. Histórico de utilização da IA até agora

### Fase 1 — Entender o edital e buscar ideias viáveis

**Necessidade do estudante:** descobrir o que o trabalho exigia, quais ferramentas seriam adequadas e que projeto poderia ser criativo sem ficar difícil demais (**P01**).

**Papel da IA:** interpretar as regras acadêmicas, explicar a separação entre frontend/backend/banco, sugerir a stack e propor alternativas de projetos não tradicionais. Entre as alternativas discutidas estavam museu digital, cápsula do tempo, votação de ideias, registro de problemas, missões educativas e comparador de alternativas.

**Refinamento:** foram priorizadas ideias que permitissem cadastro, busca, relacionamentos de banco e demonstração visual sem depender de pagamentos ou serviços externos.

**Decisão:** o estudante não escolheu automaticamente a primeira sugestão. Selecionou posteriormente uma ideia própria da conversa, FerramentaCompartilhada, por seu foco em economia colaborativa.

**Resultado:** escopo criativo definido para exploração; nenhum código da aplicação produzido ou testado nessa fase.

### Fase 2 — Selecionar e melhorar o FerramentaCompartilhada

**Necessidade:** desenvolver a ideia de vizinhos compartilharem furadeiras, escadas, cortadores de grama e equipamentos esporádicos (**P02**).

**Papel da IA:** transformar o conceito em um marketplace comunitário, sugerir telas, catálogo, filtros, anúncios, painel, reservas e entidades de banco.

**Refinamentos decisivos do estudante:**

- O sistema terá **duas modalidades**: **ALUGUEL PAGO** e **EMPRÉSTIMO GRATUITO**.
- Para **empréstimos gratuitos**, o período será limitado a **um dia**, com retirada e devolução na **mesma data** na primeira versão.
- O **endereço do local de retirada é obrigatório no anúncio**.
- A relação **Categoria 1:N Ferramentas** será a base do modelo, junto com Usuário e Reserva.

**Decisões de engenharia sugeridas e adotadas no planejamento:** o preço por diária só se aplica aos anúncios pagos; o total deve ser calculado no servidor; a listagem pública deve mostrar apenas bairro e cidade; os endereços completos devem ser protegidos. Na demonstração sem autenticação, devem ser usados **dados fictícios**, e não endereços residenciais reais.

**Resultado:** regras de produto definidas, porém ainda não implementadas (**P04**).

### Fase 3 — Modelar o funcionamento das reservas

**Necessidade:** explicar a reserva antes da implementação: retirada, devolução, diárias, valor total, aprovação do proprietário e conflito de datas (**P03**).

**Papel da IA:** propor o fluxo de solicitação e aprovação, estados e regras de validação.

**Regras planejadas:**

1. A reserva nasce com status **PENDENTE**.
2. O proprietário pode **APROVAR** ou **RECUSAR**.
3. A solicitação registra ferramenta, solicitante, retirada, devolução, modalidade, preço/total e status.
4. No aluguel pago, contam-se as datas **inclusivamente**: de 10 a 12/11 são **3 diárias**.
5. Empréstimo gratuito tem total zero e exige retirada/devolução na mesma data.
6. A disponibilidade deve ser verificada no **backend**, principalmente na aprovação; não se deve aprovar duas reservas para o mesmo item em períodos sobrepostos.
7. O dono não pode reservar a própria ferramenta; reservas concluídas ficam no histórico.

**Decisão de engenharia:** implementar primeiro uma solução local simples, sem pagamento online, chat ou GPS; tratar a checagem e aprovação de conflito de forma atômica na futura implementação para evitar aprovações concorrentes incompatíveis.

**Resultado:** regras descritas e aceitas para planejamento; não há backend, rotas ou testes de reserva executados.

### Fase 4 — Escolher a arquitetura e a estratégia de produção

**Necessidade:** saber como começar e se o modo Work do ChatGPT seria útil (**P04**).

**Papel da IA:** explicar as funções de ChatGPT, Work e Codex e recomendar desenvolvimento incremental com VS Code, terminal e testes locais.

**Arquitetura proposta:** React + Vite (interface) → requisições HTTP/JSON → Node.js + Express (API e regras) → Prisma ORM → PostgreSQL 16 no Docker Compose.

**Organização proposta:** separar `backend/`, `frontend/`, `docs/` e arquivos de raiz; usar `controllers/`, `routes/`, `services/` e `middlewares/` no backend.

**Decisão:** seguir um roteiro por etapas, com explicação e teste a cada passo, preservando a capacidade da dupla de explicar o próprio código. Work e Codex foram **apenas opções sugeridas**; não há confirmação de que foram utilizados para alterar arquivos ou executar tarefas.

### Fase 5 — Criar a documentação-mestre

**Necessidade:** reunir as decisões num documento organizado, que outro agente pudesse usar sem reconstruir a conversa (**P05**).

**Papel da IA:** redigir a documentação funcional/técnica, organizar requisitos, fluxos, páginas, entidades, estrutura, passos e contexto de retomada. Foram disponibilizadas versões Markdown e Word; depois foi produzida uma atualização 1.1 com o progresso de configuração.

**Decisão:** manter a documentação-mestre como referência do **produto** e este `DOCUMENTACAO_IA.md` como referência do **processo de uso da IA**. Documentar progresso com cuidado para não transformar planos em alegações de implementação.

### Fase 6 — Planejar GitHub e configurar o computador

**Necessidade:** começar a preparação local e o versionamento, deixando o Kanban para depois (**P06**).

**Papel da IA:** propor instalações, comandos PowerShell, organização do repositório, `.gitignore`, `README.md` e estratégia de commits. Também orientar solução de problemas do Docker e WSL apresentados pelo estudante.

**Ocorrências técnicas efetivamente relatadas:**

- O instalador do Docker Desktop exibiu erro de pré-requisito: **Virtual Machine Platform** não habilitada e instalação *per-user* sem permissão para habilitá-la automaticamente.
- A IA sugeriu verificar/configurar WSL 2, habilitar o recurso do Windows quando necessário, reiniciar e tentar novamente.
- Em um primeiro momento, `docker --version` retornou **comando não reconhecido**.
- A tentativa de digitar `C:\Program Files\Docker\Docker` no PowerShell falhou porque havia espaço no caminho e a pasta não estava naquele local.
- O comando `wsl --status` mostrou: distribuição padrão `docker-desktop`, versão padrão **2**. O aviso de que WSL 1 não está disponível **não impedia usar WSL 2**.
- A IA sugeriu testes `Test-Path` nos locais de instalação. O estudante informou **`True` no caminho per-user** e **`False` no caminho `Program Files`**.
- Depois de tentar iniciar o Docker pelo caminho de usuário, o estudante afirmou que **a versão do Docker apareceu** no PowerShell.

**Evidência confirmada:** o comando de versão passou a ser reconhecido, conforme relato. **Ainda não confirmado:** sucesso de `docker run hello-world`, `docker compose version`, `docker compose up -d` ou serviço PostgreSQL em execução.

**Revisão crítica:** a IA indicou inicialmente a pasta `C:\Program Files\Docker\Docker`, mas foi necessário refinar a hipótese para a instalação **por usuário**. Esse ajuste exemplifica por que sugestões automáticas devem ser verificadas no sistema real.

### Fase 7 — Criar repositório e diretórios iniciais

**Necessidade:** prosseguir com pasta do projeto e VS Code, sem recriar passos já executados (**P07**).

**Ações relatadas pelo estudante:** o repositório no GitHub já havia sido criado; os comandos executados foram:

```powershell
cd C:\
mkdir FerramentaCompartilhada
cd FerramentaCompartilhada
mkdir backend, docs
code .
```

**Papel da IA:** orientar criação de arquivos de raiz, `.gitignore`, `README.md`, organização interna do backend e inicialização do React com Vite, além do futuro vínculo Git local ↔ repositório remoto.

**Checkpoint explícito posterior (**P08**):** o estudante informou que **parou antes de criar a estrutura interna do backend e antes de criar o frontend**. O GitHub está criado segundo seu relato; não foram compartilhadas saídas de `git remote -v`, `git status`, `git commit` ou `git push`.

**Resultado real informado:** existem `C:\FerramentaCompartilhada`, `backend/` e `docs/`; pasta aberta pelo comando `code .`. Arquivos de raiz ainda não verificados. React/Vite, Express, Prisma, PostgreSQL no Compose e lógica de negócio não começaram ou não têm execução comprovada.

---

## 4. Tabela de uso da IA — formato exigido no edital

Esta tabela segue os quatro campos solicitados pelo professor: **Problema / Requisito**, **Prompts Utilizados**, **Refinamento (Iterações)** e **Decisão de Engenharia**. Os identificadores **P01–P08** remetem ao **texto exato** reproduzido no **Apêndice A**; a tabela sintetiza o resultado sem substituir os prompts.

| Problema / Requisito | Prompts Utilizados | Refinamento (Iterações) | Decisão de Engenharia |
|---|---|---|---|
| Entender o edital e encontrar ideias viáveis | P01 | Comparação de ideias criativas, visuais e simples; afastamento de CRUD tradicional sem propósito | Escolher uma aplicação com problema real e escopo controlado |
| Definir conceito do FerramentaCompartilhada | P02 | Marketplace de bairro, catálogo, categorias, painel e reservas | Categoria 1:N Ferramentas e foco em economia colaborativa |
| Especificar reservas, diárias e conflitos | P03 | Separação entre solicitação e aprovação; definição de datas inclusivas | Validação no backend; aprovação por proprietário; impedir períodos aprovados sobrepostos |
| Definir empréstimo gratuito e endereço | P04 | Nova regra de duração de apenas um dia e endereço obrigatório | Duas modalidades, preço obrigatório só no aluguel; endereço público limitado a bairro/cidade |
| Selecionar ferramentas e modo de trabalho com IA | P04 | Work vs. conversa normal vs. Codex; planejamento antes de código | VS Code + GitHub + Node/Express + React/Vite + PostgreSQL/Docker + Prisma; desenvolver por etapas |
| Criar documentação para retomada por outras IAs | P05 | Documento-mestre, revisão de status, separação entre planejado e executado | Manter fonte de requisitos e registro de IA em arquivos distintos |
| Começar versionamento e ambiente local | P06 | Organização por etapas; adiar Kanban por escolha do estudante | GitHub e configuração local primeiro; Kanban permanece pendente no edital |
| Resolver erro de Docker/WSL no Windows | Ver seção 3, Fase 6; mensagens técnicas transcritas em 5.2 | Hipótese inicial de pasta global corrigida para pasta per-user; WSL 2 verificado | Não assumir instalação válida sem verificar o comando e depois executar teste de contêiner |
| Criar estrutura do projeto no VS Code | P07 | Usuário informou comandos já executados; orientações seguintes adaptadas | Preservar `backend/` e `docs/`, criar frontend e backend interno depois dos testes |
| Registrar ponto exato de interrupção | P08 | Atualização da documentação para refletir a situação real | Evitar iniciar o trabalho como se Express, React ou banco já estivessem prontos |

**Observação honesta:** ainda **não houve revisão de código da aplicação** (code review), análise de desempenho real ou testes de API, pois o desenvolvimento de funcionalidades não foi iniciado. Os critérios de aceitação de código apresentados na seção 6 são **planejados para as próximas etapas**, não testes já aprovados.

---

## 5. Dificuldades, erros e lições aprendidas com a IA

### 5.1 O que a IA ajudou a resolver ou esclarecer

- **Interpretar os requisitos:** o projeto precisa de interface, servidor, persistência, Docker, GitHub e documentação, não apenas de uma tela visual.
- **Escolher escopo:** benefícios da ideia colaborativa e da dupla modalidade, sem integrar pagamentos, chat ou autenticação complexa no MVP.
- **Transformar regras informais em requisitos verificáveis:** empréstimo gratuito no mesmo dia, cálculo inclusivo de diárias, proprietário decide reservas, endereço obrigatório e conflito resolvido no servidor.
- **Organizar a arquitetura:** separar responsabilidades de interface, API, regras, dados e infraestrutura.
- **Ajudar na instalação:** interpretar erro de Virtual Machine Platform, orientar WSL 2, diagnosticar `docker` não encontrado, corrigir uso de caminhos com espaço e pesquisar instalação no perfil do usuário.
- **Guardar contexto:** criar documentação-mestre para que outra IA ou colega compreenda o projeto e continue do último checkpoint.

### 5.2 Registro resumido dos erros de ambiente

| Ocorrência relatada | Interpretação/orientação da IA | Situação comprovada |
|---|---|---|
| Instalação Docker falhou: falta `Virtual Machine Platform` | Habilitar requisito do Windows/WSL 2 e reiniciar antes de reinstalar | WSL posteriormente mostrou versão padrão 2 |
| `docker` não reconhecido pelo PowerShell | Conferir instalação e disponibilidade do executável/PATH | Depois, `docker --version` mostrou versão segundo relato |
| `C:\Program Files\Docker\Docker` gerou erro e pasta não foi encontrada | Caminho com espaço exige aspas; procurar instalação per-user | `Test-Path` per-user = `True`, Program Files = `False` |
| Dúvida se Docker estava operacional | Solicitar `docker run hello-world` e `docker compose version` | **Sem resultado enviado; pendente** |
| Organização do VS Code | Criar diretórios e arquivos aos poucos, verificar antes de usar Git | `backend/` e `docs/` criadas; `frontend/` ainda não iniciada |

### 5.3 O que deve melhorar nas próximas interações

1. **Uma etapa por vez:** executar comandos pequenos e solicitar a saída antes de avançar.
2. **Não supor sucesso:** confirmar versão, serviço, arquivo e resultado de teste com evidência.
3. **Versionar progressivamente:** registrar commits de configuração, banco, API e frontend separadamente.
4. **Anotar erros reais:** guardar mensagem de erro, hipótese da IA, correção aplicada e resultado observado.
5. **Revisar código gerado:** não aceitar soluções só porque compilam; verificar regras do projeto, legibilidade, validação, segurança e manutenção.

---

## 6. Critérios de aceitação para o código gerado futuramente

**Esta seção é uma política a aplicar; não há código aprovado até 10/11/2026.** Em cada grande funcionalidade, a dupla deverá verificar:

| Critério | Como demonstrar aceitação |
|---|---|
| Requisitos atendidos | Conferir o comportamento contra a documentação-mestre |
| Execução local | Serviço inicia com comandos do README e sem depender de ambiente externo |
| Validação de entrada | Backend rejeita campos vazios, períodos inválidos e valores inadequados |
| Regras da modalidade | Empréstimo gratuito: mesma data e preço zero; aluguel: valor por diária calculado no servidor |
| Autorização no fluxo de demonstração | Apenas proprietário selecionado aprova/recusa; ninguém reserva o próprio anúncio |
| Integridade de reservas | Não aprovar sobreposição para a mesma ferramenta, inclusive em pedidos simultâneos |
| Privacidade de endereço | Endereço completo não é exposto no catálogo; só dados fictícios no MVP sem autenticação real |
| Banco de dados | Registros persistem após reiniciar os serviços; relações e restrições coerentes |
| Tratamento de erros | Respostas HTTP adequadas, mensagens claras no frontend, erros registrados no backend |
| Qualidade e manutenção | Arquivos por responsabilidade, nomes legíveis, sem segredos versionados |
| Git/documentação | Commit descritivo e registro de prompt, iteração e decisão atualizados |

Ao usar IA para produzir código, o grupo deve responder no registro: **O código gerado funcionou? O que falhou? O que foi alterado? Quais testes foram executados? Por que a versão final foi aceita?** Sem essa análise, não marcar a solução como aprovada.

---

## 7. Estado real do projeto em 10/11/2026

> Informações **com base no relato do estudante**, sem acesso de inspeção ao computador ou repositório.

| Área | Estado nesta atualização |
|---|---|
| Ideia, diferencial e regras centrais | **Definidos** |
| Stack tecnológica e planejamento | **Definidos** |
| Documentação-mestre (Markdown e Word) | **Produzida e atualizada** |
| `DOCUMENTACAO_IA.md` | **Este documento está sendo criado agora**; adicionar ao repositório |
| Repositório GitHub | **Criado**, segundo o estudante; URL e `push` não verificados |
| Pasta `C:\FerramentaCompartilhada` | **Criada**, segundo comandos executados |
| Pastas `backend/` e `docs/` | **Criadas**, segundo o estudante |
| Estrutura interna do backend | **Não iniciada / não confirmada** |
| Frontend React + Vite | **Não iniciado** |
| Docker CLI | **Comando de versão mostrou resultado**, segundo estudante |
| Docker executando contêiner | **Não confirmado** |
| Node.js/npm/Git local | **Instalação/versões não confirmadas nesta conversa** |
| PostgreSQL 16 via Compose | **Não configurado nem testado** |
| Express, Prisma, APIs e telas | **Não implementados** |
| Git local: `origin`, commits e `push` | **Não confirmados** |
| Kanban | **Adiado**; edital continua exigindo |

**Árvore local informada (não confundir com a estrutura futura):**

```text
C:\FerramentaCompartilhada\
├── backend\
└── docs\
```

Arquivos como `README.md`, `.gitignore`, `docker-compose.yml` e `frontend/` **foram orientados**, mas ainda não existe confirmação de que foram criados. Se outro agente tiver acesso aos arquivos reais, deve conferir antes de sobrescrever ou recriar.

---

## 8. Próximas atividades e protocolo para qualquer agente de IA

### 8.1 Continuação recomendada, na ordem

1. Conferir no VS Code a árvore atual, sem recriar `C:\FerramentaCompartilhada`, `backend/` ou `docs/`.
2. Verificar `node -v`, `npm -v`, `git --version`, `docker --version`, `docker compose version` e `docker run hello-world` (com Docker aberto); registrar o resultado real.
3. Criar/revisar `.gitignore`, `README.md`, `.env.example` e `DOCUMENTACAO_IA.md`; salvar a documentação-mestre na pasta `docs/` ou escolher um local único.
4. Criar a estrutura interna de `backend/src/` e instalar/configurar Express e nodemon; testar uma rota `/api/health`.
5. Criar `frontend/` via Vite com template React; instalar dependências; testar a tela inicial no navegador.
6. Verificar `git status` e `git remote -v` **antes** de adicionar o remoto; criar commits e publicar sem sobrescrever histórico existente.
7. Configurar PostgreSQL 16 no Docker Compose, confirmar serviço ativo, adicionar Prisma e gerar migrações.
8. Desenvolver CRUD, catálogo e reservas por módulos; registrar a IA utilizada para cada entrega.
9. Retomar o Kanban obrigatório e confirmar com o professor a situação do prazo do edital.

### 8.2 Prompt de continuidade para novos agentes (modelo proposto, não histórico de uso)

> Você está assumindo o projeto acadêmico **FerramentaCompartilhada**. Leia o edital, a documentação-mestre e o `DOCUMENTACAO_IA.md` antes de modificar arquivos. O objetivo é uma plataforma local de aluguel pago e empréstimo gratuito entre vizinhos. A regra do empréstimo gratuito é retirada e devolução na mesma data; anúncios exigem endereço completo, mas o catálogo só mostra bairro e cidade; reservas dependem da aprovação do proprietário e não podem ter períodos aprovados sobrepostos. A stack prevista é Node.js 24 + Express + nodemon, React + Vite, Prisma e PostgreSQL 16 no Docker Compose. **Status real informado:** GitHub criado, pasta `C:\FerramentaCompartilhada` aberta no VS Code, `backend/` e `docs/` criadas, versão do Docker reconhecida; backend interno, frontend, Compose, Prisma e funcionalidades ainda não iniciados/confirmados. O Kanban está adiado, mas consta como exigência. **Comece pela verificação da árvore e versões instaladas e avance em apenas uma etapa de cada vez.** Para cada alteração, registre o prompt, a revisão crítica e o resultado do teste. Não presuma que sugestões anteriores foram executadas.

---

## 9. Modelo para registrar as próximas interações com IA

Copiar este bloco para cada funcionalidade importante criada ou corrigida:

```markdown
### Registro IA-XX — [nome da funcionalidade]
- **Data:** AAAA-MM-DD
- **Responsável:** [integrante]
- **Problema / requisito:** [qual era a necessidade]
- **Prompt exato enviado à IA:**
  > [colar integralmente, sem reescrever]
- **Resposta ou solução proposta pela IA:** [resumo técnico]
- **Refinamentos / iterações:** [prompts seguintes e correções]
- **Decisão de engenharia:** [por que aprovar/rejeitar; alternativas]
- **Arquivos alterados:** [caminhos reais]
- **Testes realizados e saídas observadas:** [evidências]
- **Resultado:** [aprovado / rejeitado / pendente]
- **Commit Git correspondente:** [hash ou link, somente se existir]
```

**Não inventar resultado nem hash de commit.** Se o recurso não foi testado, registrar **PENDENTE**. Se um comando ou arquivo estiver apenas na resposta do assistente, escrever **SUGERIDO, NÃO EXECUTADO**.

---

## Apêndice A — Principais prompts reais do estudante (transcrição literal)

Os textos a seguir foram enviados pelo estudante. São apresentados sem correção ortográfica para cumprir a exigência de conservar o **prompt efetivamente utilizado**. Outros pedidos técnicos ocorreram, mas esta seleção cobre as grandes decisões e o ponto de retomada do projeto.

### P01 — Pedido inicial de explicação do edital e ideias

> preciso fazer esse trabalho, preciso que voce me explique, o melhor jeito de fazer, quais ferramentas utilizar, algumas ideias de projetos, etc... oq mais achar importante, e precisam ser alguns projetos diferentes dos tradicionais, mas nao dificeis

### P02 — Escolha do projeto

> eu escolhi esse projeto aqui, vamos trabalhar em cima dele, me diga o que podemos melhorar na ideia
>
> **4. Economia Colaborativa: "FerramentaCompartilhada" (Aluguel de Utensílios entre Vizinhos)**
>
> - **A Ideia:** Uma plataforma de bairro para as pessoas anunciarem ferramentas de uso esporádico (furadeira, cortador de grama, escada) para aluguel ou empréstimo.
> - **Relação 1:N no Banco:** Uma **Categoria** (Ex: Ferramentas Elétricas, Jardinagem) possui múltiplos **Itens/Produtos**.
> - **Por que é legal:** Simula perfeitamente o exemplo dado no PDF do professor (Produto e Categoria), mas traz uma roupagem muito mais criativa e focada em comunidade, o que melhora sua nota no critério de "Originalidade".
>
> ---

### P03 — Pedido de especificação técnica da reserva

> No projeto FerramentaCompartilhada, quero implementar uma reserva de ferramentas com data de retirada e devolução, cálculo de dias e valor total, aprovação pelo proprietário e prevenção de conflitos de reserva. Explique os requisitos e o funcionamento técnico, sem implementar ainda.

### P04 — Refinamento de modalidade, limite, endereço e pergunta sobre Work

> perfeito, gostei dessas ideias O primeiro é a dupla modalidade de compartilhamento. A mesma plataforma permite aluguéis pagos e empréstimos gratuitos. Basta armazenar o tipo de oferta e, conforme ele, mostrar o preço ou a indicação "Grátis". mas vamos colocar um limite de quando for locacao gartuita, um limite de apenas 1 dia e tambem precisamos do endereco no anuncio
>
> agora que trabalhamos a ideia, como proseguimos com o desenvolvimento do projeto passo a passo? eu estava pensando em utilizar o modo work, mas nao conheco ele, acha melhor?

### P05 — Pedido de documentação para agentes de IA

> agora que ja entendemos como o projeto ia funcionar, pode fazer um arquivo de documentacao, documentando tudo que fizemos ate agora, elaboracao de ideias, ferramentas, estrutura etc, e como iremos produzir o projeto
>
> bem organizado e explicado para que qualquer agente de IA consiga entender oque queremos fazer

### P06 — Início da etapa de GitHub e ambiente

> vamos para o proximo passo, organizar github e ambiente de desenvolvimento, vamos esquecer o kanban

### P07 — Confirmação das pastas e repositório criados

> vamo continuar com a configuracao da pasta do projeto e organizar no vscode, ja criei o repositorio no github, ja execultei este comando aqui
> cd C:\
> mkdir FerramentaCompartilhada
> cd FerramentaCompartilhada
> mkdir backend, docs
> code .

### P08 — Atualização do checkpoint exato de retomada

> antes, consegue me mandar a documentacao mestre denovo?
> se puder adicionar tambem oque fizemos agora, organizei o github e a pasta do projeto, parei na parte da pasta backend e frontend, nao comecei ainda

---

## Apêndice B — Mensagens técnicas relevantes (trechos de evidência)

Estes registros adicionais documentam o diagnóstico do ambiente. Nem todos são prompts de arquitetura; servem como evidências de iteração com IA.

- **Erro de comando:** `docker : O termo 'docker' não é reconhecido como nome de cmdlet, função, arquivo de script ou programa operável.`
- **Tentativa com caminho contendo espaços:** `C:\Program Files\Docker\Docker` retornou `C:\Program : O termo 'C:\Program' não é reconhecido`.
- **Falha em localizar pasta global:** `nao existe a pasta`.
- **Status WSL fornecido:** `Distribuição Padrão: docker-desktop`; `Versão Padrão: 2`; aviso de WSL 1 não compatível.
- **Busca do Docker:** `primeiro deu true e segundo false` — instalação por usuário encontrada, pasta global não encontrada.
- **Versão do Docker:** `agora apareceu a versao do docker, deu certo?` — CLI reconhecida, ainda sem teste de contêiner confirmado.

---

## Apêndice C — Arquivos e evidências a preservar nas próximas etapas

- `Diretrizes do Trabalho de Laboratório B.pdf`: requisitos do professor.
- `FerramentaCompartilhada_DOCUMENTACAO_MESTRE_ATUALIZADA.md`: decisões funcionais e técnicas consolidadas.
- `DOCUMENTACAO_IA.md`: histórico de prompts, revisões e decisões (este arquivo).
- `README.md`: instruções de instalação/execução (**a criar ou verificar**).
- `docker-compose.yml`: banco PostgreSQL 16 (**a criar ou verificar**).
- Histórico Git: evidências de evolução, quando os commits forem realizados.
- Capturas/saídas reais de testes: `hello-world`, Express, Vite, Compose, migrations, fluxos de reserva (**pendentes no checkpoint**).

**Encerramento do registro 1.0 — 10/11/2026.** Próxima atualização: após conferir a estrutura no VS Code, inicializar backend/frontend e executar os primeiros testes reais.

---

## Atualização de execução — 10/11/2026

Este complemento registra inspeção direta e implementação posterior ao checkpoint
histórico acima. As seções anteriores foram preservadas como histórico; o estado
atual está descrito aqui. Frontend e banco continuam pendentes.

### Registro IA-09 — Inspeção do projeto e planejamento incremental

- **Data:** 2026-11-10.
- **Responsável pela execução assistida:** Codex; revisão acadêmica pela dupla pendente.
- **Problema / requisito:** conferir arquivos e ferramentas antes de implementar.
- **Prompt exato enviado à IA:**

  > Você será meu assistente de desenvolvimento do projeto acadêmico FerramentaCompartilhada.
  >
  > Antes de qualquer implementação, leia integralmente a documentação-mestre localizada na pasta docs e o arquivo DOCUMENTACAO_IA.md na raiz.
  >
  > Analise todos os arquivos existentes e verifique o estado real do projeto. Até agora foram criados o repositório GitHub, a pasta C:\FerramentaCompartilhada e as pastas backend e docs. O backend e o frontend ainda não foram implementados.
  >
  > Tecnologias obrigatórias: Node.js 24, Express, React com Vite, PostgreSQL 16 via Docker Compose, Prisma ORM, Git e GitHub.
  >
  > Regras essenciais: aluguel pago por diária, empréstimo gratuito limitado a uma data, endereço obrigatório nos anúncios, solicitações com aprovação pelo proprietário e prevenção de conflitos de reservas.
  >
  > Primeiro, verifique versões e disponibilidade do Node, npm, Git, Docker e Docker Compose. Não presuma que a execução do Docker já foi testada.
  >
  > Apresente um plano de desenvolvimento dividido em etapas pequenas, com os próximos arquivos a criar, seus objetivos e critérios de aceitação.
  >
  > Nesta primeira tarefa, não altere arquivos, não instale dependências, não execute comandos destrutivos nem faça commits ou push. Explique tudo de forma didática.

- **Solução proposta:** leitura integral dos dois documentos e inspeção dos arquivos;
  plano incremental apresentado, sem alterações na primeira tarefa.
- **Evidências:** backend vazio, frontend ausente; README, AGENTS, .gitignore e
  documentos presentes; `.env.example` da raiz e `docker-compose.yml` vazios.
- **Ambiente:** Node 24.21.0; npm 11.19.0 via `npm.cmd`; Git 2.56.0.windows.4;
  Docker CLI/Engine 29.9.3; Compose v5.7.0. O executável Docker foi localizado em
  `%LOCALAPPDATA%\Programs\DockerDesktop\resources\bin\docker.exe`.
- **Limitações e erros:** PowerShell bloqueou `npm.ps1`; o comando curto `docker`
  não estava disponível na sessão. Leitura da instalação por usuário exigiu
  autorização do ambiente. Nenhuma política ou PATH foi alterado.
- **Docker:** consulta ao servidor funcionou; `ps -a` mostrou um `hello-world`
  existente com `Exited (0)`. Não foi criado nem iniciado contêiner pela IA.
  PostgreSQL e Compose do projeto continuam não testados.
- **Git:** consultas retornaram `fatal: not a git repository`; não existe `.git`
  na raiz inspecionada. GitHub informado pelo estudante, sem URL/histórico verificados.
- **Arquivos alterados na primeira tarefa:** nenhum. Este registro foi acrescentado
  somente após a autorização subsequente.
- **Resultado:** diagnóstico concluído e plano apresentado; funcionalidades pendentes.
- **Commit Git correspondente:** nenhum.

### Registro IA-10 — Organização documental e API Express mínima

- **Data:** 2026-11-10.
- **Prompt exato enviado à IA:**
  > pode prosseguir
- **Contexto da autorização:** prosseguir com a consolidação do ambiente e a API
  mínima, etapas 1 e 2 recomendadas na resposta anterior. Sem commits ou push.
- **Solução:** corrigir a referência da documentação-mestre no AGENTS; atualizar
  README; criar backend JavaScript com módulos ES, Express, nodemon e health.
  Separar `app.js` (rotas/configuração) de `server.js` (porta e inicialização).
  Servidor padrão restrito a `127.0.0.1:3000`. Variáveis opcionais HOST/PORT
  carregadas pelo suporte nativo do Node ao `.env`, sem adicionar dotenv.
- **Refinamentos / iterações:** consulta inicial ao npm falhou com EPERM no cache
  do perfil; repetida com autorização do ambiente. Instalado Express 5.3.0 e,
  inicialmente, nodemon 3.1.14. O npm audit apontou dois alertas moderados ligados
  a minimatch/nodemon. Fixado nodemon 3.1.11, versão indicada pela auditoria;
  reinstalação reportou zero vulnerabilidades. Não utilizado `audit fix --force`.
- **Decisão de engenharia:** fixar versões diretas e preservar o lockfile para
  reprodução via `npm.cmd ci`; usar `npm.cmd` para contornar a resolução de
  `npm.ps1` bloqueado sem alterar a política do Windows. Não criar diretórios
  vazios de camadas que ainda não têm funcionalidades.
- **Arquivos criados:** `backend/package.json`, `backend/package-lock.json`,
  `backend/.env.example`, `backend/src/app.js`, `backend/src/server.js`.
- **Arquivos atualizados:** `AGENTS.md`, `README.md`, `DOCUMENTACAO_IA.md`.
- **Dependências locais:** instaladas em `backend/node_modules/`, já ignorado
  pelo `.gitignore`. Não foi criado `.env` nem adicionada senha.
- **Testes realizados e resultados:**
  - `node --check src/app.js` e `node --check src/server.js`: sucesso.
  - `npm.cmd start`: inicialização em `127.0.0.1:3000` confirmada.
  - Requisição HTTP real a `/api/health`: 200 e JSON
    `{"status":"ok","servico":"FerramentaCompartilhada API"}` conferidos.
  - Requisição a `/api/inexistente`: 404 e erro JSON em português.
  - `npm.cmd run dev`: nodemon 3.1.11 iniciou a API; health retornou HTTP 200.
  - Instalação final: 93 pacotes auditados, zero vulnerabilidades reportadas
    naquele momento. Isso não garante ausência de problemas futuros.
  - Servidores usados na verificação encerrados após os testes.
- **Resultado:** API mínima validada tecnicamente; revisão pela dupla pendente.
  A rota health não consulta banco. Não foram implementadas regras de anúncios
  ou reservas, frontend, Prisma ou PostgreSQL.
- **Pendências:** conferir URL/histórico GitHub antes de vincular Git local;
  disponibilidade do comando curto Docker; frontend React/Vite; banco;
  Prisma 7; regras e testes do MVP; Kanban e prazo acadêmico.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-11 — Frontend inicial React + Vite e integração com a API

- **Data:** 2026-11-10.
- **Prompts exatos enviados pelo estudante nesta continuidade:**
  > consegui execultar a api, retornoi ok, e agora qual proximo passo para prosseguir com o deenvolvimento?

  > pode prosseguir
- **Validação relatada pelo estudante:** executou a API e recebeu retorno `ok`.
  Esse relato complementa os testes técnicos do registro IA-10.
- **Problema / requisito:** criar frontend mínimo, consultar `/api/health` e
  apresentar estados de carregamento, sucesso e indisponibilidade.
- **Solução proposta e implementada:** React 19.3.1, React DOM 19.3.1, Vite 8.3.7
  e plugin React 6.3.0, versões fixadas após consulta ao registro npm.
  Tela inicial em português com descrição do projeto e funcionalidades futuras
  explicitamente identificadas como planejadas; CSS responsivo sem fontes externas.
- **Decisão de engenharia:** frontend usa `fetch('/api/health')`; proxy de
  desenvolvimento encaminha `/api` ao backend, evitando a necessidade de CORS
  nesta etapa. Servidor local em `127.0.0.1:5173`, com porta fixa e destino
  configurável por `API_PROXY_TARGET`. Build estático não inclui esse proxy.
  Consulta com timeout e cancelamento ao desmontar; nova consulta dez segundos
  após cada término, além de botão para tentar novamente.
- **Arquivos criados:** `frontend/package.json`, `frontend/package-lock.json`,
  `frontend/index.html`, `frontend/vite.config.js`, `frontend/.env.example`,
  `frontend/src/main.jsx`, `frontend/src/App.jsx`, `frontend/src/styles.css`,
  `frontend/src/services/api.js`. Dependências locais em `frontend/node_modules/`
  e build em `frontend/dist/`, ambos ignorados pelo `.gitignore` existente.
- **Arquivos atualizados:** `README.md`, `AGENTS.md`, `DOCUMENTACAO_IA.md`.
  A documentação-mestre foi encontrada nesta sessão em `docs/DOCUMENTACAO_MESTRE.md`;
  referências ajustadas para esse arquivo existente, sem duplicar ou renomear.
- **Testes executados:**
  - `npm.cmd install`: 19 pacotes adicionados, 20 auditados, zero vulnerabilidades
    reportadas naquele momento.
  - `npm.cmd run build`: sucesso, 17 módulos transformados e arquivos gerados.
  - `npm.cmd run dev`: servidor Vite iniciou em `127.0.0.1:5173`.
  - Requisição HTTP à raiz do Vite: HTTP 200, HTML do projeto confirmado.
  - Requisição via Vite a `/api/health`: HTTP 200 com
    `{"status":"ok","servico":"FerramentaCompartilhada API"}`.
- **Refinamentos e limites da verificação:** tentativa de iniciar backend próprio
  encontrou `EADDRINUSE` na porta 3000. O serviço já existente foi preservado;
  a integração HTTP foi validada contra a API já disponível nessa porta.
  O acesso de navegador automatizado estava indisponível; a tentativa de controle
  do Chrome foi interrompida porque a ferramenta não conseguiu determinar a URL
  atual com confiança para aplicar sua política. Nenhuma interação adicional foi
  feita no navegador. Renderização visual, botão e mudanças de estado no navegador
  permanecem pendentes de validação manual. Não foi encerrado o backend existente
  para simular indisponibilidade. Somente o Vite iniciado pela IA foi encerrado.
- **Referências técnicas consultadas:** https://vite.dev/guide/ e
  https://vite.dev/config/server-options.html (configuração do proxy).
- **Resultado:** estrutura React e build concluídos; integração HTTP validada;
  validação visual e cenário de indisponibilidade no navegador pendentes.
- **Próxima etapa:** PostgreSQL 16 via Compose, seguido de Prisma 7. Anúncios,
  reservas, autenticação real e pagamento não foram implementados nesta etapa.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-12 — PostgreSQL 16 via Docker Compose

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > perfeito, funcionou perfeitamente, quando encerro a execucao do servidor node a api aparece indisponivel, pode prosseguir
- **Validação relatada pelo estudante:** interface funcionou e apresentou API
  indisponível ao encerrar o servidor Node. O cenário de indisponibilidade visual
  pendente no IA-11 fica confirmado pelo relato do estudante; não é um novo teste
  automatizado executado pela IA.
- **Problema / requisito:** configurar PostgreSQL 16 local em Docker Compose e
  confirmar execução e persistência antes de adicionar Prisma.
- **Inspeção prévia:** Compose e `.env.example` da raiz vazios; Docker respondeu;
  nenhum volume anterior listado; somente o contêiner `hello-world` existente.
- **Solução:** imagem oficial `postgres:16.15-bookworm`, serviço `db`, projeto
  Compose `ferramentacompartilhada`, volume nomeado `postgres_data` montado em
  `/var/lib/postgresql/data`, porta `127.0.0.1:5432` e healthcheck com `pg_isready`.
  Banco padrão `ferramentacompartilhada`, usuário `ferramenta`, fuso
  `America/Sao_Paulo`. Senha obrigatória por variável; `.env.example` sem senha.
- **Credenciais:** criado `.env` local da raiz com senha aleatória, sem exibir
  o valor em saídas ou nesta documentação; arquivo já ignorado pelo `.gitignore`.
  Não foram geradas credenciais em arquivos versionáveis. Ainda não há Git local.
- **Refinamento / erro observado:** a primeira tentativa de gerar a senha usou
  métodos estáticos não disponíveis no .NET do Windows PowerShell e deixou a
  variável vazia. Antes de executar Compose, corrigida a geração com instância
  de `RandomNumberGenerator`, bytes aleatórios e conversão hexadecimal compatível;
  apenas o campo de senha vazio criado nessa operação foi preenchido. O Compose
  exige senha não vazia. Nenhum banco foi iniciado com a configuração incompleta.
- **Arquivos alterados:** `docker-compose.yml`, `.env.example`, `README.md`,
  `docs/DOCUMENTACAO_MESTRE.md` e `DOCUMENTACAO_IA.md`. Criado `.env` local ignorado.
  O cabeçalho da documentação-mestre foi atualizado para distinguir o estado
  atual dos checkpoints históricos preservados.
- **Testes realizados e resultados:**
  - `docker compose config --quiet`: configuração válida, sem imprimir segredos.
  - `docker compose up -d --wait --wait-timeout 60`: download da imagem oficial,
    criação de rede/volume/contêiner e serviço saudável.
  - SQL `SHOW server_version`: `16.15 (Debian 16.15-1.pgdg12+2)`.
  - SQL `SHOW TimeZone`: `America/Sao_Paulo`.
  - Criado esquema exclusivo `fc_teste_persistencia_20261110`, tabela de
    verificação e registro descartável; reiniciado o serviço e aguardada saúde;
    consulta encontrou o marcador esperado após reinício.
  - Removidos somente a tabela e o esquema criados no teste. Nenhum volume
    foi removido e nenhum dado de aplicação existia nessa configuração inicial.
  - `docker compose ps`: `ferramentacompartilhada-db-1` saudável e porta
    `127.0.0.1:5432->5432/tcp`. Banco deixado em execução.
- **Limites:** consultas SQL executadas dentro do contêiner; conexão externa
  da API com credenciais e tabelas de domínio ainda será validada com Prisma 7.
  O teste desta etapa comprova persistência do registro de diagnóstico, não
  conclusão do cenário T-18 com anúncios e reservas, ainda não implementados.
- **Referências técnicas consultadas:** https://hub.docker.com/_/postgres e
  https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/.
- **Resultado:** infraestrutura PostgreSQL configurada e validada; integração
  Prisma/API, migrações, dados demo e funcionalidades de negócio pendentes.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-13 — Prisma 7, modelos, migração inicial e conexão da API

- **Data:** 2026-11-10.
- **Prompt exato de autorização:**
  > pode prosseguir
- **Contexto:** continuação da etapa proposta de configurar Prisma 7, conectar
  o backend e criar os modelos de Usuário, Categoria, Ferramenta e Reserva.
- **Inspeção:** banco saudável, sem tabelas antes da migração; backend Express
  existente preservado. Não houve trabalho parcial da mensagem interrompida.
- **Solução:** Prisma CLI, cliente e adaptador PostgreSQL fixados em 7.10.1;
  `pg` 8.23.1 e dotenv 18.0.10. A versão padrão do CLI no registro apontava
  para 8.0.0-rc.33; foi escolhida explicitamente a versão 7 exigida pelo AGENTS.
  Cliente gerado com provider `prisma-client`, ESM e arquivos TypeScript
  executáveis no Node 24; aplicação mantida em JavaScript.
- **Modelagem:** enums Modalidade/StatusReserva; quatro entidades; endereços
  não nulos; preço/total Decimal(10,2); retirada/devolução DATE; índices de
  consulta e chaves estrangeiras com exclusão restrita. As validações completas
  de domínio e aprovação atômica sem conflitos permanecem pendentes.
- **Configuração:** `prisma.config.ts` carrega DATABASE_URL do `.env` do backend;
  script `db:configure` cria a conexão local a partir do `.env` da raiz sem
  imprimir a senha, preservando uma DATABASE_URL já definida. Arquivo local
  `backend/.env` criado e ignorado pelo Git. Cliente gerado também ignorado.
- **API:** rota adicional `GET /api/health/db` executa `SELECT 1` via Prisma,
  retornando HTTP 200 se acessível ou 503 com mensagem genérica em caso de falha.
  A rota `/api/health` e o indicador atual do frontend continuam independentes
  do banco. Adaptador configurado com cinco conexões e timeout de cinco segundos.
- **Migração:** criada e revisada `20261110164237_init`, aplicada com
  `prisma migrate deploy`, sem reset ou remoção de dados/volumes. Sem alterações
  manuais em migração aplicada. Seed transacional de dois perfis fictícios
  (`example.test`) e quatro categorias; upsert não sobrescreve registros existentes.
- **Arquivos criados:** `backend/prisma.config.ts`, `backend/prisma/schema.prisma`,
  `backend/prisma/seed.js`, `backend/prisma/migrations/migration_lock.toml`,
  `backend/prisma/migrations/20261110164237_init/migration.sql`,
  `backend/src/lib/prisma.js`, `backend/scripts/configure-database-env.js`,
  `backend/test/database.test.js` e `backend/.env` local ignorado.
- **Arquivos atualizados:** `backend/package.json`, `backend/package-lock.json`,
  `backend/.env.example`, `backend/src/app.js`, `.gitignore`, `README.md`,
  `docs/DOCUMENTACAO_MESTRE.md` e `DOCUMENTACAO_IA.md`.
- **Testes e evidências:**
  - Instalação: 248 pacotes auditados, zero vulnerabilidades reportadas na ocasião.
  - `prisma:validate` e `prisma:generate`: sucesso.
  - Migração inicialmente criada com `--create-only`; testes executados antes
    da aplicação falharam por tabelas ausentes. Após `db:deploy`, ambos passaram.
  - `db:seed` executado duas vezes; contagem SQL final: 2 usuários, 4 categorias,
    0 ferramentas, 0 reservas. Nenhum registro duplicado ou de teste remanescente.
  - `test:db`: 2 testes aprovados. Leitura de relações e precisão decimal,
    datas sem horário, status PENDENTE e rollback dos registros de teste;
    rejeição de reserva com referências inexistentes por chave estrangeira P2003.
  - `db:status`: esquema atualizado com a migração inicial aplicada.
  - API em porta temporária 3001: health básico e health/db HTTP 200.
  - API de teste com URL deliberadamente inválida: health/db HTTP 503 genérico;
    health básico manteve HTTP 200. Credenciais reais e banco real preservados.
    Somente processos próprios usados na verificação foram encerrados.
  - Consulta SQL inicial de contagens falhou porque as aspas dos identificadores
    foram removidas pela passagem de argumentos no PowerShell; repetida via
    entrada padrão do psql com sucesso, sem alteração de dados.
- **Avisos observados:** npm informou scripts de instalação Prisma ainda não
  cobertos por allowScripts; a validação, geração e migração funcionaram sem
  alterar essa política. O teste transacional emitiu aviso de depreciação do pg
  sobre client.query enquanto outra consulta estava em execução; os dois testes
  passaram. O aviso está registrado para reavaliar a compatibilidade em futuras
  atualizações; não foi ocultado nem corrigido alterando dependências internas.
- **Referências técnicas:** https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7
  e https://www.prisma.io/docs/orm/v7/prisma-client/setup-and-configuration/databases-connections/connection-pool.
- **Resultado:** estrutura de dados e conexão validadas. CRUD, usuários demo
  selecionáveis na interface, ferramentas demonstrativas, cálculo de reservas,
  permissões, endereço público/privado e conflitos concorrentes ainda não implementados.
- **Próxima etapa:** API de categorias, perfis demo e anúncios com validações.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-14 — Conclusão do núcleo do MVP acadêmico

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > pode prosseguir, mas se lembre que é apenas um trabalho academico, nao precisa levar a seguranca 100% a sério, pois isso nao ira para o publico, apenas para fins academicos, pensando nisso elabore a melhor forma de finalizar o trabalho de forma eficaz, pode prosseguir seguindo essas orientações daqui para frente
- **Decisão de escopo:** priorizar o fluxo de demonstração local, com seletor
  simples de perfis, dados fictícios, imagens locais e sem adicionar login real,
  JWT, pagamentos, uploads, chat ou infraestrutura de produção. Preservadas as
  regras expressas de datas, dinheiro, aprovação e conflitos. Não alteradas as
  tecnologias obrigatórias nem feita publicação.
- **Plano efetivamente seguido:** (1) API de anúncios/catálogo; (2) integração
  React e fluxo de reservas; (3) testes de integração, persistência e preparação
  do roteiro de apresentação. Cada bloco foi verificado antes do encerramento.
- **Backend:** rotas, controladores, serviços, middleware de perfil demo e
  utilitários de validação separados. Catálogo com filtros; cadastro/edição/
  desativação; categorias e perfis; solicitações e consultas; aprovar, recusar,
  cancelar pendente e concluir aprovada. Erros HTTP em português.
- **Regras:** endereço obrigatório; público retorna bairro/cidade; dono não
  reserva própria ferramenta; gratuito exige mesma data e total zero; aluguel
  calcula dias inclusivos e Decimal no servidor, ignorando total/status do
  cliente. Datas validadas contra o calendário e hoje em America/Sao_Paulo.
- **Concorrência:** decisões, alterações e solicitações usam transação com
  bloqueio `SELECT ... FOR UPDATE` na ferramenta. A aprovação verifica reservas
  APROVADAS sobrepostas antes de gravar. Requisições pela API respeitam esse
  fluxo; não foi criada uma restrição SQL de exclusão para impedir edições SQL
  arbitrárias fora da API. A abordagem atende ao fluxo acadêmico testado.
- **Escolhas conservadoras nos pontos abertos da seção 17:** manter cancelamento
  apenas de pendente; bloquear mudança de modalidade/preço enquanto houver
  pendentes ou aprovadas, preservando os termos da oferta; concluir a partir da
  data de devolução. Esses comportamentos e limites foram descritos no README.
- **Frontend:** navegação simples em estado React, sem dependência adicional
  de roteamento; catálogo, filtros, detalhes/reserva, anúncio/edição, meus
  anúncios, solicitações recebidas e minhas reservas. Seletor Ana/Bruno no
  cabeçalho; mensagens de carregamento/erro/vazio e operações em andamento;
  CSS responsivo e ilustrações SVG locais criadas em código.
- **Demonstração:** seed ampliado com furadeira paga e escada gratuita da Ana,
  kit de jardinagem pago do Bruno; três imagens locais. Executado duas vezes,
  sem duplicar nem sobrescrever registros existentes. Os exemplos são
  identificados por título/proprietário; rodar seed após renomear um exemplo
  pode recriar o título original, comportamento documentado.
- **Arquivos criados:** `backend/src/utils/validacao.js`,
  `backend/src/middlewares/usuario-demo.js`, `backend/src/services/ferramentas.js`,
  `backend/src/services/reservas.js`, `backend/src/controllers/marketplace.js`,
  `backend/src/routes/marketplace.js`, `backend/test/marketplace.test.js`,
  `frontend/src/components/Marketplace.jsx`,
  `frontend/public/imagens/{furadeira,escada,jardinagem}.svg`,
  `docs/TESTES.md` e `docs/ROTEIRO_APRESENTACAO.md`.
- **Arquivos atualizados:** `backend/src/app.js`, `backend/package.json`,
  `backend/prisma/seed.js`, `frontend/src/App.jsx`,
  `frontend/src/services/api.js`, `frontend/src/styles.css`, `README.md`,
  `docs/DOCUMENTACAO_MESTRE.md` e `DOCUMENTACAO_IA.md`. Sem dependências novas,
  migrações adicionais ou mudanças em credenciais.
- **Testes realizados:**
  - `npm.cmd test`: 12 testes aprovados, 0 falhas, com PostgreSQL real. Inclui
    os dois testes anteriores de relações e dez testes do marketplace.
  - Verificados validações de anúncio, busca e filtros, endereço público,
    propriedade, diárias/total, gratuito, datas inválidas/passadas/invertidas,
    pendentes sobrepostos, duas aprovações simultâneas (exatamente uma 200 e
    outra 409), períodos distintos, recusa/cancelamento/conclusão e desativação.
  - Testes HTTP criaram registros exclusivos por UUID, removendo somente seus
    próprios dados no encerramento. Nenhum dado da demonstração foi removido.
  - `npm.cmd run build`: sucesso; 18 módulos transformados.
  - HTTP pelo Vite em porta temporária 5174, proxy para API própria em 3001:
    HTML, três imagens, perfis, categorias e catálogo acessíveis. Confirmados
    2 perfis, 4 categorias e 3 anúncios antes do reinício.
  - PostgreSQL reiniciado sem remover volume; API reconectou e os três anúncios
    continuaram no catálogo. Não foi declarado ensaio completo de reinício de
    todos os processos com reservas como concluído; consultar matriz T-18.
  - Processos de verificação próprios encerrados. Banco mantido saudável;
    processos anteriores do estudante preservados.
- **Limitações observadas:** controle do Chrome novamente interrompido pela
  ferramenta por não conseguir determinar a URL atual com confiança para
  aplicar sua política. Encerrada a tentativa de interface, sem contornar o
  bloqueio. Build e HTTP foram verificados; novas telas e botões ainda não
  foram validados visualmente. O aviso de depreciação do pg permaneceu, sem
  falhar os testes. Nenhum resultado visual foi inventado.
- **Referências técnicas consultadas:**
  https://www.postgresql.org/docs/16/explicit-locking.html e
  https://www.prisma.io/docs/orm/v7/prisma-client/queries/transactions.
  O link Prisma sem versão redirecionou para Prisma 8; consultada a versão 7
  explicitamente para manter compatibilidade com a stack do projeto.
- **Resultado:** núcleo funcional implementado e testes de API aprovados;
  entrega acadêmica completa ainda depende de revisão visual/ensaio, confirmação
  de prazo, participação da dupla e evidências reais de GitHub/Kanban.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-15 — Corrigir conflito com execução antiga na porta 3000

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**

```text
nao consegui visualizar, aparece isso quando tento iniciar a api do backend
PS C:\ferramentacompartilhada\backend> npm.cmd run dev

> ferramentacompartilhada-backend@0.1.0 dev
> nodemon --exec node --env-file-if-exists=.env src/server.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node --env-file-if-exists=.env src/server.js`
API disponível em http://127.0.0.1:3000/api/health
Não foi possível iniciar a API: listen EADDRINUSE: address already in use 127.0.0.1:3000
[nodemon] app crashed - waiting for file changes before starting...
```

- **Diagnóstico observado:** porta 3000 ocupada pelo Node PID 276 com comando
  `node --env-file-if-exists=.env src/server.js`. A rota health identificava o
  FerramentaCompartilhada, mas o catálogo retornava 404: execução antiga da API
  continuava ativa. Frontend existente na porta 5173 foi preservado.
- **Correção de processo:** inspeção exigiu autorização do ambiente. Antes de
  encerrar, reconfirmados PID dono da porta, executável, comando e identidade
  HTTP. Encerrado somente PID 276; nenhum encerramento geral de Node foi feito.
- **Correção de código:** `server.js` passou a criar o servidor com `node:http`
  e anunciar disponibilidade somente no callback de escuta efetiva. Evita o
  callback de erro de `app.listen` do Express 5 ser tratado como sucesso.
  EADDRINUSE agora informa em português que é preciso encerrar a execução anterior.
- **Arquivos alterados:** `backend/src/server.js`, `README.md`, `docs/TESTES.md`
  e `DOCUMENTACAO_IA.md`. Criado `backend/test/server.test.js`.
- **Verificação:** teste de regressão ocupou uma porta temporária, iniciou
  outro processo e confirmou código de saída 1, orientação de porta ocupada
  e ausência da mensagem API disponível. Um teste aprovado.
  Backend atual iniciado diretamente em 3000; catálogo respondeu com três
  anúncios tanto diretamente quanto via proxy do frontend na porta 5173.
  Servidor temporário da verificação encerrado e confirmado sem resposta HTTP
  na porta 3000 ao final, deixando-a livre para o comando do estudante.
- **Resultado:** conflito removido e catálogo atual validado por HTTP. Orientar
  manter um único terminal do backend em execução e atualizar a interface em 5173.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-16 — Cancelamento de reservas aprovadas pelos dois perfis

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > adicione junto a opcao de concluir devolucao outra opcao de cancelar reserva depois de aceita, tanto no perfil de quem anunciou o item quanto no perfil de quem reservou
- **Alteração de requisito autorizada:** ampliar RN-16 para que proprietário
  e solicitante possam cancelar APROVADA. O cancelamento de PENDENTE continua
  exclusivo do solicitante; proprietário usa Recusar nesse estado.
- **Implementação:** reutilizada a rota PATCH cancelar e o status CANCELADA.
  Serviço verifica participação e estado dentro da transação com bloqueio da
  ferramenta. Histórico, datas e valores são preservados; CANCELADA não ocupa
  o período. Concluídas, recusadas e já canceladas rejeitam novo cancelamento.
- **Interface:** Cancelar reserva aparece em ambas as listas para aprovadas,
  ao lado de Concluir devolução no painel do proprietário. Solicitante recebe
  a ação em Minhas reservas. Mensagem confirma cancelamento/liberação do período.
  Conclusão continua exclusiva do proprietário.
- **Arquivos alterados:** `backend/src/services/reservas.js`,
  `backend/test/marketplace.test.js`, `frontend/src/components/Marketplace.jsx`,
  `README.md`, `docs/DOCUMENTACAO_MESTRE.md`, `docs/TESTES.md`,
  `docs/ROTEIRO_APRESENTACAO.md` e `DOCUMENTACAO_IA.md`.
- **Testes:** `npm.cmd test`: 15 aprovados, 0 falhas. Dois cenários novos
  verificam cancelamento pelo proprietário e pelo solicitante, bloqueio a outro
  perfil, histórico nos dois painéis e aprovação de pedido sobreposto após
  liberar as datas. Também verificadas rejeições de novo cancelamento, conclusão
  após cancelamento e cancelamento de estados finais. Testes antigos mantidos,
  incluindo concorrência e cancelamento de pendente. `npm.cmd run build`: sucesso.
  Aviso de depreciação do pg já conhecido permaneceu, sem falha dos testes.
- **Resultado:** funcionalidade implementada e validada na API; sem migração,
  instalação de dependências ou alteração dos dados existentes. Verificação
  visual dos botões ainda depende do navegador do estudante.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-17 — Categoria digitada e envio de uma imagem de capa

- **Data:** 2026-11-10.
- **Prompts exatos do estudante:**

  > na parte de criar anuncio, vou testando e dando opinioes, voce me diz depois oque e  possivel implementar
  > opcao de adicionar categoria, ou uma opcao outras onde o usuario pode digitar a categoria que necessitar
  > usuario inserir imagem que quiser no anuncio, apenas a imagem de capa

  > pode prosseguir com essas alteracoes entao
- **Proposta aceita:** Outra categoria com campo de nome, criação/reutilização
  ao salvar; uma capa local JPG/PNG/WebP até 5 MB, prévia e troca na edição,
  mantendo ilustrações prontas como alternativa. Não foi adicionada galeria.
- **Backend:** Multer 2.5.0 fixado após consulta ao registro npm e documentação
  oficial. POST/PUT de anúncios aceitam multipart com campo `capa`, além de JSON
  já suportado. Limite de um arquivo/5 MB, MIME aceito e verificação básica de
  assinatura PNG/JPEG/WebP. Essa verificação simples não faz decodificação completa
  da imagem. Arquivo recebe UUID e extensão detectada, em `backend/uploads/`.
  Diretório ignorado pelo Git e servido em `/uploads`; banco usa imagemUrl existente.
- **Consistência:** validações/propriedade conferidas antes de gravar arquivo.
  Capa nova removida se a transação falhar; capa anterior removida após salvar,
  apenas se não houver anúncio referenciando-a. Edição sem novo arquivo mantém
  a atual. Desativar continua preservando arquivos e histórico.
- **Categorias:** categoriaId OUTRA e categoriaNome de até 60 caracteres;
  normalização de espaços e busca sem distinguir maiúsculas. Bloqueio transacional
  por nome durante criação/reutilização evita duplicar o mesmo nome em chamadas
  simultâneas da API. Categoria e anúncio são salvos na mesma transação, sem
  criar uma categoria quando o anúncio é rejeitado.
- **Frontend:** seletor Outra categoria e campo condicional; escolha entre
  ilustração ou arquivo; prévia com object URL e liberação ao sair/trocar;
  envio FormData sem fixar Content-Type, permitindo o boundary do navegador.
  Atualização das categorias após salvar e proxy Vite adicional para `/uploads`.
- **Arquivos criados:** `backend/src/middlewares/capa.js`.
- **Arquivos atualizados:** `backend/src/services/ferramentas.js`,
  `backend/src/routes/marketplace.js`, `backend/src/controllers/marketplace.js`,
  `backend/src/app.js`, `backend/package.json`, `backend/package-lock.json`,
  `backend/test/marketplace.test.js`, `.gitignore`, `frontend/vite.config.js`,
  `frontend/src/services/api.js`, `frontend/src/components/Marketplace.jsx`,
  `frontend/src/App.jsx`, `frontend/src/styles.css`, `README.md`,
  `docs/DOCUMENTACAO_MESTRE.md`, `docs/TESTES.md`,
  `docs/ROTEIRO_APRESENTACAO.md` e `DOCUMENTACAO_IA.md`.
- **Testes:** instalação auditou 256 pacotes e reportou zero vulnerabilidades
  naquele momento. `npm.cmd test`: 18 testes aprovados, 0 falhas. Novos cenários
  cobrem categoria criada/reutilizada, edição/filtro, upload PNG com bytes e
  content-type conferidos por HTTP, manutenção/substituição da capa, remoção de
  arquivo antigo, volta para ilustração, edição indevida, MIME/conteúdo inválido,
  excesso de tamanho e múltiplos arquivos. Apenas arquivos/registros de teste
  foram removidos pela limpeza. `npm.cmd run build`: sucesso, 18 módulos.
- **Refinamento de teste:** a primeira execução teve uma falha de isolamento
  no teste antigo de catálogo, pois os novos cenários criaram mais anúncios com
  o mesmo prefixo. A busca passou a usar um título exclusivo do seu cenário;
  a suíte completa foi repetida e aprovada, sem afrouxar a verificação dos filtros.
- **Limites:** prévia/seletor de arquivos precisam de conferência manual no
  navegador; não foram declarados visualmente aprovados. O aviso conhecido do
  pg em transações permaneceu, sem falha. Ao mudar de máquina é preciso preservar
  tanto o banco quanto a pasta de capas, que não é versionada. Sem migrações,
  serviços externos, login real ou mudança das regras de reservas.
- **Referência:** https://expressjs.com/en/resources/middleware/multer/.
- **Resultado:** alterações autorizadas implementadas e validadas na API/build.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-18 — Escopo acadêmico e auditoria da documentação

- **Data:** 2026-11-10.
- **Prompts exatos do estudante nesta continuidade:**

  > perfeito, agora será que mantenho esses perfis de demonstracao ou adicionamos abas de criancao de conta, login etc, oque acha? muito complexo? assim esta bom?

  > certo, entao oque precisamos esta pronto, mas voce viu que o foco principal do trabalho é a documentacao, organizacao e engenharia do projeto
  > voce documentou tudo que nos fizemos nos devidos arquivos? cada arquivo md tem sua funcao, certo

  > conferiu? e ajustou?
- **Discussão de escopo:** a IA recomendou manter perfis demo para priorizar o
  fluxo local, explicando o custo adicional de cadastro/login. O estudante
  prosseguiu com o escopo atual e destacou documentação/engenharia. Não foram
  criadas telas ou autenticação real a partir dessa discussão.
- **Auditoria efetiva:** inventariados os seis Markdown do projeto e comparados
  requisitos/contrato/estrutura/testes com os arquivos existentes. Os registros
  IA-09 a IA-17 cobriam as principais etapas da implementação, mas havia
  contradições no corpo da documentação-mestre: modelo e API ainda descritos
  como não implementados, árvore de diretórios apenas proposta e instruções
  antigas de recriação do backend/frontend apresentadas como retomada atual.
  Metadados e referência inicial da documentação de IA também estavam antigos.
- **Correções:** documentação-mestre versão 1.3, estados históricos sinalizados,
  modelo/estrutura/contrato atualizados, RF-19/RF-20 explícitos e retomada atual
  na seção 18.0. Seção 19 acrescenta requisito → arquivo → teste, alternativas,
  consequências e limites das decisões. Mantido o histórico, sem apagar prompts
  ou fabricar retrospectivamente decisões, commits e resultados.
- **Função dos documentos:** README orienta execução; mestre especifica produto
  e engenharia; documentação IA relata processo; TESTES consolida verificação;
  roteiro organiza demonstração; AGENTS orienta agentes. Mapa incluído no README
  e mestre. Índice dos registros IA adicionado com problema, prompt, iteração
  e decisão para facilitar a avaliação acadêmica.
- **Pendências honestas:** Git local continua ausente, conforme `git status` e
  `git remote -v` (`not a git repository`); URL/histórico remoto não conferidos.
  Kanban, nomes/contribuições reais da dupla, revisão manual/ensaio e situação
  do prazo continuam sem comprovação. Edital PDF original não localizado na
  pasta; não foi feita nova conferência direta das exigências do professor.
  Criada tabela de registro manual com campos pendentes, sem inventar aprovações.
- **Arquivos alterados:** `README.md`, `AGENTS.md`, `DOCUMENTACAO_IA.md`,
  `docs/DOCUMENTACAO_MESTRE.md` e `docs/TESTES.md`.
  `docs/ROTEIRO_APRESENTACAO.md` foi conferido e preservado nesta revisão.
- **Verificação:** leitura e comparação com caminhos/rotas/testes reais;
  checagem de links locais Markdown. Sem mudança de código, dependências,
  banco ou arquivos enviados pelo estudante. Testes de aplicação não repetidos
  porque as alterações desta etapa são exclusivamente documentais. A última
  execução funcional continua sendo a de 18 testes aprovados do IA-17.
- **Limite do registro:** os prompts relevantes e as intervenções estão
  documentados; o arquivo não é uma transcrição integral de cada mensagem nem
  contém todos os logs brutos. Revisão acadêmica e aceitação da dupla não são
  substituídas por testes executados pela IA.
- **Resultado:** documentação revisada com responsabilidades claras e distinção
  entre feito, testado, histórico e pendente; não declarar a entrega acadêmica
  inteira concluída antes das evidências de gestão/revisão.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-19 — Centralização dos Markdown na pasta docs

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > pode mover todos os arquivod md para dentro de docs
- **Ação:** movidos `README.md`, `DOCUMENTACAO_IA.md` e `AGENTS.md` da raiz
  para `docs/`, após verificar origens e ausência de destinos conflitantes.
  Os três Markdown que já estavam em docs foram preservados. Não foram movidos
  arquivos de dependências, código gerado ou documentação de terceiros.
- **Ajustes:** links relativos, mapa documental, referência de instruções e
  árvore atual corrigidos. Os caminhos em registros e prompts históricos foram
  preservados como eram na época, com nota explicativa da nova organização.
- **Localização atual:** `docs/README.md`, `docs/AGENTS.md`,
  `docs/DOCUMENTACAO_IA.md`, `docs/DOCUMENTACAO_MESTRE.md`, `docs/TESTES.md`
  e `docs/ROTEIRO_APRESENTACAO.md`. O ponto de entrada da documentação é
  `docs/README.md`; as instruções de agentes estão em `docs/AGENTS.md`.
- **Verificação:** inventário dos Markdown do projeto e checagem de destinos
  dos links locais após a mudança; sem alteração do código, dependências ou banco.
  Não foram repetidos testes de aplicação por ser uma reorganização documental.
- **Resultado:** documentação centralizada sem sobrescrita nem cópias na raiz.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-20 — Remover indicador técnico da apresentação

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > estava reparando agora, podemos remover a parte do site que diz api conectada, para demonstracao ao cliente no caso o professor, nao é interrantes aquilo ficar ali, é um termo mais tecnico,
- **Alteração:** removido o painel de conexão, seu estado, consulta periódica à
  rota health, função consultarSaude e estilos exclusivos. Catálogo/navegação
  seguem a apresentação do projeto diretamente. Rotas de diagnóstico do backend
  preservadas para uso técnico manual.
- **Experiência:** mensagens de falha nas operações continuam disponíveis;
  carregamento inicial com erro permite Tentar novamente. Mensagem de resposta
  inválida foi simplificada, sem orientar o usuário final a conferir API/banco.
- **Arquivos alterados:** `frontend/src/App.jsx`, `frontend/src/services/api.js`,
  `frontend/src/styles.css`, `docs/README.md`, `docs/ROTEIRO_APRESENTACAO.md`,
  `docs/TESTES.md`, `docs/DOCUMENTACAO_MESTRE.md` e `docs/DOCUMENTACAO_IA.md`.
- **Verificação:** `npm.cmd run build` aprovado; busca no frontend confirmou
  ausência das referências ao painel e à função removida. Nenhum teste novo
  criado para essa alteração visual simples; backend não foi modificado.
  Não foi declarada validação visual automatizada.
- **Resultado:** interface sem indicador técnico, com documentação atualizada.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-21 — Testar queda da API e do banco e explicar a execução local

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > podemos testar alguns erros, por exemplo desligar a api do beckend, o front continua aparecendo, desligar o banco de dados, na verdade a parte do banco de dados nao entendi nada onde esta rodando,
- **Inspeção:** serviços reais responderam em 3000 (API), 5173 (Vite) e
  health/db 200. Docker confirmou contêiner `ferramentacompartilhada-db-1`
  saudável, PostgreSQL na porta 5432 e volume `ferramentacompartilhada_postgres_data`.
- **Explicação:** frontend entrega página; API executa regras; PostgreSQL roda
  localmente no Docker Desktop e guarda os registros no volume. Parar API/banco
  não encerra o frontend nem apaga automaticamente dados já carregados no navegador.
- **Teste de API:** iniciados processos temporários próprios em 3001/5174;
  encerrada somente a API temporária. HTML continuou 200, consulta via proxy
  retornou 502. Executada a função real `api` do frontend em Node, apontando seu
  fetch para esse Vite, e conferida mensagem amigável de falha ao carregar dados.
  API temporária foi reiniciada para o próximo teste.
- **Teste do banco:** PostgreSQL do projeto parado brevemente com `compose stop db`;
  restauração protegida por finally com `compose up -d --wait`. HTML e health
  básico continuaram 200; health/db retornou 503 e catálogo 500. Banco religado
  saudável, API reconectou e cinco IDs de anúncios anteriores foram preservados.
  Nenhum volume foi removido, e dados/capas do estudante foram preservados.
- **Erros de procedimento corrigidos:** primeiro teste supôs proxy 500, mas
  observou 502; expectativa ajustada para verificar falha de gateway e mensagem
  do cliente. A primeira comparação de IDs usou incorretamente uma lista JSON
  agrupada no PowerShell e gerou falso alerta; enumerados os registros, repetida
  parada/restauração e confirmada a preservação dos cinco IDs. Não foi uma perda
  real de dados nem uma correção do código da aplicação.
- **Restauração final:** encerradas cópias temporárias; confirmado que não
  respondem mais em 3001/5174. Serviços originais 3000/5173 e health/db voltaram
  a responder HTTP 200. Banco mantido saudável e processos do estudante preservados.
- **Arquivos alterados:** `docs/README.md` (explicação e comandos),
  `docs/TESTES.md` (resultados e limites) e `docs/DOCUMENTACAO_IA.md`.
- **Limite:** testes por HTTP e função de requisição; sem afirmar inspeção
  visual da tela. Ensaio manual completo de T-18/T-20 continua pendente.
  Nenhum código, dependência ou regra de negócio foi alterado nesta etapa.
- **Resultado:** falhas e recuperação verificadas, sem alteração dos dados.
- **Commit Git correspondente:** nenhum; não houve commit ou push.

### Registro IA-22 — Preparação e publicação do projeto no GitHub

- **Data:** 2026-11-10.
- **Prompt exato de autorização:**
  > agora vamos fazer a parte do github, adicionar o projeto inteiro la, ja creiei o reservatorio
- **Informações fornecidas pelo estudante:** repositório
  `https://github.com/rafael-mansur/FerramentaCompartilhada`, autor Rafael e e-mail
  de autoria informado diretamente para configurar os commits neste projeto.
- **Autorização:** pedido explícito de adicionar o projeto ao GitHub inclui
  commit e envio desta entrega. A proibição anterior sem autorização não impede
  esta publicação autorizada. Não foram criados commits fingindo representar
  etapas passadas; a entrega inicial reúne o estado real atual.
- **Inspeção:** Git 2.56 disponível, repositório local ainda ausente e remoto
  consultado com ls-remote sem refs (vazio). `.gitignore` conferido para excluir
  .env, node_modules, dist, cliente Prisma gerado e uploads. Exemplos de ambiente
  contêm senha vazia/marcador, sem senha funcional. Código, imagens ilustrativas,
  documentação, testes e migrações são parte da entrega; dados do banco e capas
  pessoais locais não são versionados.
- **Verificação antes do envio:** `npm.cmd test` aprovou 18 testes, zero falhas;
  `npm.cmd run build` aprovado. Busca por padrões de tokens/chaves privadas não
  encontrou arquivos candidatos. O aviso de depreciação pg já documentado permaneceu.
- **Erro de ambiente e correção:** git init inicial executou pelo usuário isolado
  e a propriedade da pasta .git divergiu do usuário Windows, bloqueando o Git.
  Confirmados ausência de commits, objetos e índice; metadados vazios preservados
  separadamente e Git reinicializado com o usuário correto. Não foi adicionada
  exceção global safe.directory nem alteradas permissões do projeto.
- **Configuração:** branch main, origin do repositório informado, identidade de
  autoria definida somente na configuração local. Histórico remoto preservado;
  não utilizar push forçado.
- **Revisão do índice:** 44 arquivos conferidos, sem .env, dependências, builds,
  cliente gerado, uploads ou senha local. Quebras de linha intencionais de
  Markdown foram preservadas, com checagem de whitespace separada do código.
- **Publicação confirmada:** commit inicial
  `f6ae94ad32e2aaa8c1643879cf561457ef164616`, mensagem
  `feat: implementa MVP academico FerramentaCompartilhada`, enviado com
  `git push -u origin main`. `ls-remote` confirmou o mesmo hash da branch local
  em `refs/heads/main`. Nenhum push forçado ou sobrescrita de histórico.
- **Evidência:** https://github.com/rafael-mansur/FerramentaCompartilhada/commit/f6ae94ad32e2aaa8c1643879cf561457ef164616.
- **Complemento:** esta atualização documental registra o resultado observado
  depois da publicação inicial, em um commit posterior próprio, sem reescrever
  o commit inicial. Metadados vazios do bootstrap ficaram preservados dentro
  da pasta .git local, fora do conteúdo versionado.
- **Resultado:** primeiro envio de código, documentação, testes e migração
  confirmado. GitHub foi concluído como etapa técnica; Kanban, revisão manual
  e evidências de participação da dupla continuam pendentes.

### Registro IA-23 — Remoção do roteiro de apresentação

- **Data:** 2026-11-10.
- **Prompt exato enviado pelo estudante:**
  > pode remover o roteiro de apresentacao, tanto do projeto quanto do github
- **Alteração autorizada:** removido `docs/ROTEIRO_APRESENTACAO.md`; mapas,
  links, árvore e orientações atuais dos demais documentos foram ajustados.
  O checklist de verificação permanece em TESTES.md. Não foi criado outro
  arquivo para substituir o roteiro.
- **Histórico:** menções em registros anteriores da IA são preservadas para
  documentar o que ocorreu. A exclusão será publicada por commit normal na
  main, sem reescrever ou apagar o histórico anterior do repositório.
- **Verificação:** Git estava limpo antes da alteração; checagem dos links
  locais após a remoção e revisão do diff. Código, dependências e banco não
  foram alterados; testes funcionais não repetidos para esta mudança documental.
- **Arquivos alterados:** `docs/AGENTS.md`, `docs/README.md`,
  `docs/TESTES.md`, `docs/DOCUMENTACAO_MESTRE.md` e `docs/DOCUMENTACAO_IA.md`;
  removido `docs/ROTEIRO_APRESENTACAO.md`.
- **Publicação:** remoção preparada para commit e push expressamente autorizados
  pelo pedido; confirmação do remoto será feita antes de encerrar a tarefa.
