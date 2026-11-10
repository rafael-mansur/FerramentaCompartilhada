# FerramentaCompartilhada — Documentação-mestre do projeto

**Subtítulo:** Especificação funcional e técnica, registro das decisões, plano de desenvolvimento e contexto para agentes de IA  
**Versão:** 1.3 — documentação consolidada e rastreabilidade do MVP  
**Atualização:** 10/11/2026  
**Situação atual verificada em 10/11/2026:** MVP local implementado com anúncios, categoria digitada, upload de capa, catálogo, filtros, perfis demo, reservas e decisões do proprietário, incluindo cancelamento de aprovadas por ambos os participantes. Dezoito testes aprovados e build React concluído. Revisão visual das novas telas, ensaio completo e evidências de GitHub/Kanban pendentes. Consulte `TESTES.md` nesta pasta. Os checkpoints históricos abaixo descrevem o estado anterior à implementação.  
**Disciplina:** Laboratório de Programação, Ciência da Computação, UNIFACVEST   


> **LEIA PRIMEIRO — PARA AGENTES DE IA.** Este é o documento de referência do produto e de sua engenharia. Consulte o estado atual no cabeçalho, a retomada na seção **18** e a rastreabilidade na seção **19**. A seção **2.3** preserva um checkpoint histórico anterior à implementação, não o estado atual. O código do MVP já existe: não recrie backend, frontend ou banco. Resultados de testes estão em `TESTES.md`; prompts, erros e decisões da IA em `DOCUMENTACAO_IA.md`, nesta mesma pasta docs. Referências históricas aos Markdown na raiz correspondem à organização anterior. Preserve os requisitos e diferencie implementação, teste automatizado, relato do estudante e validação manual pendente.

---

## 1. Contexto acadêmico, objetivo e restrições

O trabalho é uma atividade de **Engenharia de Software com auxílio de IA**. O professor quer avaliar não só código, mas criatividade na definição do problema, especificação de requisitos, escopo, prototipação, decisões de arquitetura, organização em equipe, versionamento e revisão crítica do código gerado por agentes de IA.

### 1.1 Exigências do edital

| Item | Exigência | Decisão do projeto |
|---|---|---|
| Equipe | Exatamente 2 participantes | Trabalho em dupla, com responsabilidades compartilhadas |
| Backend | Node.js + Express | Adotado; **nodemon** no ambiente de desenvolvimento |
| Node.js | Versões 22.x a 24.x | Priorizar **Node.js 24.x** compatível |
| Frontend | Framework/biblioteca moderna | **React + Vite** |
| Banco | PostgreSQL via Docker e Docker Compose | **PostgreSQL 16** em contêiner |
| PostgreSQL | Versão 15 ou 16 | Utilizar 16 |
| ORM | Prisma recomendado | **Prisma 7.10.1**, conforme exigência do AGENTS e versão fixada no projeto |
| Versionamento | Repositório GitHub; commits que mostrem evolução | Git + GitHub, commits pequenos e descritivos |
| Gestão | Quadro visual Kanban | **Exigido no edital; estudante decidiu adiar por enquanto**, não dispensar definitivamente |
| Inteligência artificial | Uso permitido; documentação crítica obrigatória | `DOCUMENTACAO_IA.md` com prompts, iterações e decisões |
| Execução | Rodar localmente na apresentação | Frontend + backend + PostgreSQL funcionando no computador |
| Prazo | 09/11/2026 no edital | Data original já passada; confirmar orientação atual com o professor |
| Apresentação | 10 minutos | Demonstração principal de ponta a ponta |

O edital também espera um `README.md`, um `.gitignore`, um `docker-compose.yml` e o arquivo **obrigatório `DOCUMENTACAO_IA.md`**, além de documentação em Markdown. O código e o histórico de desenvolvimento devem estar no GitHub.

### 1.2 O que será avaliado

1. **Criatividade e escopo:** originalidade do domínio e requisitos coerentes.
2. **Engenharia e gestão:** divisão de responsabilidades, Git, Kanban e boas práticas.
3. **Documentação analítica:** registro e avaliação crítica de como a IA ajudou.
4. **Execução técnica:** sistema rodando localmente com banco, Node e interface.

**Não há pesos numéricos informados no documento-base.** O professor prevê uma segunda parte do trabalho depois da apresentação, mas **aqui o escopo cobre a primeira entrega**.

---

## 2. Histórico da ideia e decisões já tomadas

### 2.1 Origem da proposta

A equipe buscava um projeto **diferente de sistemas tradicionais** (estoque, biblioteca, simples cadastros), **criativo, apresentável e não excessivamente difícil**. Foram discutidas alternativas como museu digital, cápsula do tempo, votação de ideias, radar de problemas, missões educativas e comparação de alternativas.

A ideia escolhida foi **FerramentaCompartilhada**, uma plataforma de **economia colaborativa** para disponibilização de ferramentas entre vizinhos. O modelo preserva a relação **Categoria 1:N Ferramentas**, semelhante ao exercício de Produto e Categoria citado nas diretrizes, mas coloca essa estrutura num problema de comunidade.

### 2.2 Evolução da proposta

1. **Conceito inicial:** usuários anunciam furadeiras, escadas, cortadores de grama etc. para **aluguel ou empréstimo** entre vizinhos.
2. **Melhoria de experiência:** catálogo com pesquisa, filtros, detalhes, fotos, categorias, bairro e painel do proprietário.
3. **Fluxo de reservas:** datas de retirada/devolução, cálculo de diárias, aprovação/recusa pelo dono, status e prevenção de conflitos.
4. **Regra acrescentada pelo grupo:** o **empréstimo gratuito tem duração máxima de 1 dia**; na versão inicial, isso significa **retirada e devolução na mesma data**.
5. **Regra acrescentada pelo grupo:** **endereço completo é obrigatório no cadastro do anúncio**.
6. **Decisão de exposição de dados:** por prudência, exibir publicamente só **bairro e cidade**, deixando o endereço completo visível apenas ao proprietário e ao solicitante de reserva aprovada. No MVP, usar **dados fictícios de demonstração**, pois não há autenticação real.
7. **Estratégia de desenvolvimento:** planejamento explícito primeiro; construção por módulos, validação a cada etapa e IA como assistente revisado pela dupla.

### 2.3 Checkpoint histórico em 10/11/2026 — antes da implementação

**Fonte deste checkpoint:** relato do estudante no diálogo, **não uma inspeção remota do computador ou do GitHub**. Não tratar itens sugeridos como itens já executados.

| Área | Situação | Evidência ou limite do que sabemos |
|---|---|---|
| Ideia e requisitos | **Definidos** | Modelo colaborativo, aluguel pago, empréstimo gratuito de apenas um dia, endereço obrigatório, reservas sujeitas a aprovação e prevenção de conflitos |
| Repositório no GitHub | **Criado, conforme o estudante** | Nome/endereço exato e conexão do Git local ao remoto ainda **não verificados**; não há confirmação de primeiro commit ou `push` |
| Pasta local | **Criada, conforme comandos executados** | `C:\FerramentaCompartilhada` |
| Pastas existentes relatadas | **`backend/` e `docs/`** | Criadas com `mkdir backend, docs`; não presumir conteúdo interno |
| VS Code | **Pasta aberta via `code .`** | O estudante relatou organização da pasta no editor |
| WSL | **Configurado para WSL 2** | `wsl --status` informou distribuição padrão `docker-desktop` e versão padrão 2; aviso sobre WSL 1 não impede o uso do WSL 2 |
| Docker Desktop | **Instalado na pasta do usuário** | Teste de localização por usuário retornou `True`, e o comando `docker --version` passou a mostrar uma versão |
| Funcionamento de contêineres | **Ainda não confirmado** | Não foi apresentado resultado de `docker run hello-world` nem `docker compose ps` |
| Arquivos da raiz (`README.md`, `.gitignore` etc.) | **Planejados; criação não confirmada** | Foram fornecidas instruções, mas não há confirmação dos arquivos no disco ou GitHub |
| Estrutura interna do backend (`src/`, `routes/` etc.) | **Não iniciada, segundo o estudante** | Ele parou antes de configurar as pastas internas e dependências do backend |
| Frontend React/Vite | **Não iniciado, segundo o estudante** | Não há confirmação de pasta `frontend/`, `npm create vite` ou página React funcionando |
| Express, Prisma, PostgreSQL no Compose, migrations e funcionalidades | **Não implementados/testados** | Sem evidência de código, API ou banco de dados já executados |
| Kanban | **Adiado por escolha do estudante** | Continua constando como requisito obrigatório do edital; não declarar como cumprido |

**Último ponto confirmado de execução do projeto:**

```powershell
cd C:\
mkdir FerramentaCompartilhada
cd FerramentaCompartilhada
mkdir backend, docs
code .
```

**Ponto exato em que o estudante pediu para parar:** antes de configurar a estrutura interna de `backend/` e antes de criar o `frontend/` com React/Vite. É possível que ele tenha criado algum arquivo de orientação no VS Code, mas **isso não foi confirmado**. O próximo agente deve perguntar apenas pelo estado real de arquivos se isso for necessário para evitar sobrescrita, ou verificar a árvore local se tiver acesso.

**Atenção ao prazo:** o edital indicava apresentação em **09/11/2026**. Esta atualização é de **10/11/2026**; não presumir prorrogação, entrega realizada ou nova data.

---

## 3. Visão do produto

**Nome:** FerramentaCompartilhada  
**Slogan proposto:** *Compartilhe mais. Compre menos.*  
**Categoria:** marketplace comunitário de ferramentas (protótipo acadêmico).  
**Objetivo:** permitir que pessoas de uma mesma região anunciem ferramentas pouco utilizadas e que outras solicitem seu **aluguel por diária** ou **empréstimo gratuito**, com organização simples das reservas.

### 3.1 Problema que resolve

Muitas pessoas precisam de uma furadeira, escada ou cortador de grama poucas vezes ao ano. Comprar um equipamento pode ser caro e desnecessário. Ao mesmo tempo, há ferramentas paradas em residências próximas. A aplicação conecta oferta e demanda de forma organizada.

### 3.2 Papéis no sistema

- **Visitante/usuário de demonstração:** explora catálogo, pesquisa e consulta informações públicas.
- **Proprietário:** cadastra, edita e desativa anúncios próprios; aprova ou recusa solicitações; acompanha suas ferramentas.
- **Solicitante:** consulta ferramentas, escolhe datas, envia pedidos, acompanha status e cancela quando permitido.

Uma mesma pessoa pode ser proprietária e solicitante. **Para a primeira versão**, perfis podem ser **pré-cadastrados e alternados por um seletor de demonstração**; esse seletor **não substitui autenticação nem fornece segurança de produção**.

### 3.3 Proposta de identidade visual

Interface limpa, responsiva e confiável; paleta sugerida com **verde** como cor de destaque, branco e cinza neutro; cartões com foto da ferramenta, título, preço ou selo **Grátis**, bairro/cidade e indicação do status. Layout responsivo para notebook e celular. A paleta é sugestão, não requisito obrigatório.

---

## 4. Escopo da primeira entrega (MVP)

### 4.1 O que PRECISA existir

- Catálogo de ferramentas, pesquisa e filtros por **nome, categoria, bairro e modalidade** (paga/gratuita).
- Visualização dos detalhes da ferramenta.
- Cadastro de ferramentas com proprietário, categoria existente ou digitada em Outra categoria, descrição, uma capa enviada ou ilustração, endereço obrigatório, tipo de oferta e preço quando pago. Categoria digitada e upload simples autorizados pelo estudante em 10/11/2026.
- Edição e desativação de anúncios pelo proprietário.
- Perfis de demonstração para testar o fluxo entre duas pessoas.
- Solicitação de reserva com data de retirada e devolução.
- Regra de **mesma data** para modalidade gratuita.
- Cálculo de diárias e valor total para modalidade paga.
- Aprovação/recusa pelo proprietário.
- Consulta de reservas próprias e recebidas, com status.
- Bloqueio de aprovação de períodos conflitantes para a mesma ferramenta.
- Persistência PostgreSQL, API Express, interface React e execução local.
- Repositório GitHub, Kanban, `README.md` e documentação da IA.

### 4.2 Melhorias desejáveis apenas se o MVP estiver pronto

Calendário com destaque visual de dias já ocupados; cartões de indicadores comunitários; favoritos; avaliações após utilização; tela de estatísticas. Essas melhorias **não podem comprometer** os testes nem a entrega. Uma versão inicial pode usar um seletor de datas simples (dois campos) e mensagens de indisponibilidade.

### 4.3 Fora do escopo nesta entrega

Pagamento real/Pix, chat em tempo real, notificações por email/SMS, GPS em tempo real, frete, contratos eletrônicos, seguro/caução, login com Google, upload avançado de imagens, infraestrutura em nuvem e uso de IA embutida como recurso do próprio produto. Não criar dependência de serviço externo para a demonstração.

---

## 5. Regras de negócio — referência obrigatória

| Código | Regra | Comportamento esperado |
|---|---|---|
| RN-01 | Modalidades | Toda ferramenta possui **ALUGUEL** ou **EMPRESTIMO**. |
| RN-02 | Gratuidade | Em `EMPRESTIMO`, o valor é **R$ 0,00** e não há cobrança por diária. |
| RN-03 | Limite gratuito | Em `EMPRESTIMO`, `dataRetirada` **deve ser igual** a `dataDevolucao`. |
| RN-04 | Preço pago | Em `ALUGUEL`, `precoDiaria` é obrigatório, positivo e expresso em reais. |
| RN-05 | Contagem de diárias | Datas são **inclusivas**: dias = `(dataDevolucao − dataRetirada) + 1`. |
| RN-06 | Cálculo do total | Aluguel: `total = dias × precoDiaria`; empréstimo: `total = 0`. O servidor é a autoridade. |
| RN-07 | Datas válidas | Devolução não pode ser anterior à retirada; retirada não pode estar no passado conforme a data local configurada. |
| RN-08 | Endereço obrigatório | Rua, número (ou indicação válida sem número), bairro, cidade, UF e CEP são armazenados no anúncio; complemento é opcional. |
| RN-09 | Privacidade do endereço | No catálogo público, mostrar **somente bairro e cidade**; endereço completo apenas ao dono e a quem tiver **reserva aprovada** da ferramenta. |
| RN-10 | Proprietário | Um usuário não pode solicitar reserva de ferramenta anunciada por ele próprio. |
| RN-11 | Reserva inicial | Novo pedido começa em **PENDENTE** e não bloqueia automaticamente o calendário. |
| RN-12 | Aprovação | Somente o proprietário pode aprovar ou recusar pedidos **PENDENTES**. |
| RN-13 | Conflito | Não podem existir duas reservas **APROVADAS** da mesma ferramenta com períodos que se sobreponham. |
| RN-14 | Concorrência | Verificação de disponibilidade e aprovação devem ocorrer atomicamente no PostgreSQL, para evitar duas aprovações simultâneas. |
| RN-15 | Status finais | Recusas e cancelamentos não ocupam datas. Reservas concluídas permanecem no histórico. |
| RN-16 | Cancelamento | Solicitante cancela pedido PENDENTE. Solicitante ou proprietário pode cancelar reserva APROVADA. A reserva passa a CANCELADA, preserva histórico/valores e libera as datas. Estados finais não podem ser cancelados. Regra ampliada por solicitação expressa do estudante em 10/11/2026. |
| RN-17 | Anúncio indisponível | Ferramentas desativadas não aceitam novas reservas e deixam de aparecer no catálogo público, preservando o histórico. |
| RN-18 | Pagamentos | O sistema **informa valores**, mas **não processa pagamentos**. Entrega e eventual pagamento são combinados fora da plataforma. |

### 5.1 Definição precisa de datas

Nesta primeira versão, trabalharemos com **datas sem horário** (formato `AAAA-MM-DD`) e com o fuso de referência **America/Sao_Paulo** para validar “hoje”. Não existirá reserva por hora nem devolução em horários específicos.

Exemplos: aluguel de **10 a 12 de novembro = 3 diárias**; empréstimo gratuito com retirada **10/11** e devolução **10/11 = permitido**; empréstimo de **10/11 a 11/11 = rejeitado**.

Fórmula de sobreposição inclusiva, para uma reserva candidata `N` e outra aprovada `A`:

```text
conflito = (N.inicio <= A.fim) E (N.fim >= A.inicio)
```

Pedidos **PENDENTES** podem se sobrepor entre si. A checagem definitiva ocorre no momento da **APROVAÇÃO**, não apenas no momento de solicitar. Se houver conflito, a aprovação é recusada e o pedido permanece pendente até que seja recusado, cancelado ou ajustado por uma funcionalidade futura.

### 5.2 Ciclo de vida da reserva

```text
SOLICITAR -> PENDENTE
                |---- APROVAR (sem conflito) ---> APROVADA ---> CONCLUIDA
                |---- RECUSAR -----------------> RECUSADA
                |---- CANCELAR ----------------> CANCELADA

APROVADA ---- CANCELAR (proprietário ou solicitante) ----> CANCELADA
```

No MVP, **CONCLUIDA** será marcada pelo proprietário após a devolução; ela continua no histórico. Reservas concluídas referem-se a utilização já encerrada e não devem causar bloqueio de novos períodos futuros. O backend valida quem executa cada transição. **Não permitir mudanças arbitrárias de status** enviadas diretamente pelo frontend.

### 5.3 Segurança e simplicidade acadêmica

Como as contas de demonstração não possuem autenticação de verdade, **não utilizar endereços reais, publicar a aplicação na internet nem prometer privacidade de produção**. Em APIs de listagem e detalhes públicos, **não retornar o endereço completo**, mesmo que a interface não o exiba. Um produto real precisaria de autenticação, autorização robusta e medidas de proteção de dados antes de qualquer lançamento.

---

## 6. Requisitos funcionais e critérios de aceitação

| ID | Requisito | Critério verificável de aceitação |
|---|---|---|
| RF-01 | Listar ferramentas ativas | Catálogo exibe registros armazenados no PostgreSQL, mesmo após reiniciar servidor. |
| RF-02 | Pesquisar/filtrar | Busca por texto e filtros retornam apenas itens correspondentes. |
| RF-03 | Visualizar detalhes | Exibe título, descrição, categoria, preço ou Grátis, foto e bairro/cidade. |
| RF-04 | Cadastrar anúncio | Rejeita ausência de campos obrigatórios e grava anúncio válido. |
| RF-05 | Editar próprio anúncio | Alterações válidas são persistidas e exibidas no catálogo. |
| RF-06 | Desativar anúncio | Anúncio desativado deixa de aceitar novas reservas e mantém histórico. |
| RF-07 | Alternar usuário demo | É possível simular proprietário e interessado para testar o fluxo. |
| RF-08 | Solicitar reserva | Cria pedido PENDENTE com datas válidas para ferramenta ativa. |
| RF-09 | Limitar empréstimo grátis | Reserva gratuita com datas diferentes é rejeitada na API. |
| RF-10 | Calcular aluguel | API calcula dias inclusivos e total em BRL corretamente. |
| RF-11 | Aprovar reserva | Só dono aprova PENDENTE; reserva vira APROVADA se sem conflito. |
| RF-12 | Impedir conflito | Segunda aprovação sobreposta à primeira é recusada. |
| RF-13 | Recusar reserva | Proprietário pode marcar pedido pendente como RECUSADA. |
| RF-14 | Consultar reservas | Cada usuário vê seus pedidos; dono vê solicitações das suas ferramentas. |
| RF-15 | Concluir reserva | Proprietário encerra empréstimo/aluguel aprovado, preservando histórico. |
| RF-16 | Cancelar reserva | Solicitante cancela PENDENTE; solicitante ou proprietário cancela APROVADA. Histórico é preservado e o período liberado. |
| RF-17 | Tratar estados e erros | Interface mostra carregamento, campos inválidos e erros de rede/API. |
| RF-18 | Demonstrar persistência | Dados permanecem no banco após reinicialização dos processos e contêiner. |
| RF-19 | Informar outra categoria | Nome digitado é criado ou reutilizado ao salvar, sem diferenciar maiúsculas e espaços repetidos. |
| RF-20 | Enviar capa do anúncio | Uma capa JPG/PNG/WebP até 5 MB pode ser enviada, visualizada antes de salvar e substituída na edição. |

**Situação da verificação:** os requisitos principais estão implementados e têm testes de integração. Isso não equivale à aprovação visual de todas as telas. Consulte a matriz em [TESTES.md](TESTES.md) para resultados e limites, especialmente RF-17/RF-18, e a seção 19 para localizar código e testes.

### 6.1 Requisitos não funcionais

- **RNF-01 — Compatibilidade:** Node 22–24, PostgreSQL 15–16, com versões utilizadas registradas.
- **RNF-02 — Execução local:** subir banco via `docker compose`, backend Node, frontend React.
- **RNF-03 — Manutenibilidade:** rotas, controladores, serviços/validações e acesso a dados separados.
- **RNF-04 — Usabilidade:** mensagens em português, interface responsiva, navegação simples.
- **RNF-05 — Consistência:** validações críticas no backend e operações sensíveis em transação.
- **RNF-06 — Segurança básica:** não versionar `.env` com senhas; não expor endereço nos endpoints públicos; usar dados fictícios.
- **RNF-07 — Evidência:** tarefas Kanban, commits e decisões da IA rastreáveis.
- **RNF-08 — Reprodutibilidade:** `README.md` com pré-requisitos, variáveis e comandos para rodar do zero.

---

## 7. Modelo de dados implementado (PostgreSQL + Prisma)

### 7.1 Relacionamentos

```text
USUARIO (1) -------- (N) FERRAMENTA
CATEGORIA (1) ------ (N) FERRAMENTA
USUARIO (1) -------- (N) RESERVA [como solicitante]
FERRAMENTA (1) ----- (N) RESERVA
```

### 7.2 Entidades e campos implementados

**Usuario**

- `id`: chave primária.
- `nome`: texto obrigatório.
- `email`: texto único para identificação demonstrativa.
- `bairro`: texto opcional para perfil.
- `createdAt`, `updatedAt`: datas de auditoria.

**Categoria**

- `id`: chave primária.
- `nome`: texto único (ex.: Ferramentas Elétricas, Jardinagem, Construção, Limpeza).
- `descricao`: texto opcional.

**Ferramenta**

- `id`: chave primária.
- `titulo`, `descricao`: obrigatórios.
- `categoriaId`: chave estrangeira para `Categoria`.
- `proprietarioId`: chave estrangeira para `Usuario`.
- `modalidade`: enum `ALUGUEL` ou `EMPRESTIMO`.
- `precoDiaria`: `Decimal(10,2)`; obrigatório e maior que zero no aluguel; nulo no empréstimo (total gratuito = zero).
- `imagemUrl`: caminho de imagem ilustrativa local ou capa em `/uploads/`; uma única capa por anúncio. JPG, PNG ou WebP até 5 MB, substituível na edição. Arquivo salvo no backend; banco guarda o caminho.
- `cep`, `logradouro`, `numero`, `bairro`, `cidade`, `uf`: obrigatórios; `complemento`: opcional.
- `ativa`: booleano (padrão `true`).
- `createdAt`, `updatedAt`.

**Reserva**

- `id`: chave primária.
- `ferramentaId`: referência à ferramenta.
- `solicitanteId`: referência ao usuário que pediu.
- `dataRetirada`, `dataDevolucao`: colunas do tipo `DATE` (sem horário), via Prisma `@db.Date` se aplicável à versão adotada.
- `diarias`: inteiro calculado no servidor.
- `valorTotal`: `Decimal(10,2)` calculado e armazenado no momento da solicitação para preservar o valor histórico.
- `status`: enum `PENDENTE`, `APROVADA`, `RECUSADA`, `CANCELADA`, `CONCLUIDA`.
- `createdAt`, `updatedAt`.

**Implementação verificável:** o esquema está em [schema.prisma](../backend/prisma/schema.prisma), e a migração inicial em `backend/prisma/migrations/20261110164237_init/migration.sql`. Valores usam Decimal(10,2), datas de reserva usam DATE e IDs usam inteiros autoincrementais. A prevenção de sobreposição é feita pelo serviço de reservas em transação, não por um índice isolado. Campos não nulos no banco não substituem a validação de texto obrigatório na API.

### 7.3 Integridade e exclusão

A remoção visual de um anúncio será preferencialmente **desativação lógica** (`ativa=false`), para não quebrar referências das reservas históricas. Categorias e usuários em uso não devem ser apagados indiscriminadamente. A exclusão física fica fora do MVP se representar risco de perda de histórico.

---

## 8. Fluxos de uso e comportamento da aplicação

### 8.1 Fluxo A — Anunciar ferramenta

1. Selecionar perfil demonstrativo do proprietário.
2. Abrir **Anunciar ferramenta**.
3. Informar título, descrição, categoria existente ou Outra categoria (nome digitado), modalidade e imagem ilustrativa ou arquivo de capa.
4. Se `ALUGUEL`, informar preço diário positivo; se `EMPRESTIMO`, ocultar e ignorar o preço.
5. Informar CEP, logradouro, número, bairro, cidade e UF; complemento opcional.
6. Validar no frontend para orientar o usuário e **validar novamente no backend**.
7. Persistir via Prisma no PostgreSQL; mostrar confirmação e anúncio no catálogo.

### 8.2 Fluxo B — Solicitar uma reserva

1. Selecionar outro perfil demonstrativo, diferente do dono.
2. Localizar a ferramenta no catálogo.
3. Abrir os detalhes e escolher retirada e devolução.
4. Frontend exibe prévia: diárias e valor total ou **Grátis — máximo de 1 dia**.
5. Backend confere propriedade, anúncio ativo, datas e modalidade; **recalcula** dias/valor.
6. Gravar solicitação `PENDENTE` e exibir no painel do interessado e do proprietário.

### 8.3 Fluxo C — Proprietário decide

1. Proprietário acessa **Solicitações recebidas**.
2. Ao aprovar, backend inicia uma transação e **serializa aprovações da mesma ferramenta** (ex.: bloqueio da linha `Ferramenta` com `SELECT ... FOR UPDATE` dentro da transação, seguido da busca de conflitos e atualização da reserva; verificar compatibilidade com o Prisma instalado).
3. Se já existe reserva aprovada com datas sobrepostas, retornar erro de conflito (HTTP **409**), sem aprovar.
4. Caso contrário, mudar status para `APROVADA` e disponibilizar o endereço completo somente na visão autorizada do dono e do solicitante aprovado.
5. O proprietário pode recusar uma pendente; após a devolução, pode marcar uma aprovada como concluída.

### 8.4 Fluxo D — Persistência e retorno

Reiniciar frontend/backend e contêiner sem excluir o volume do PostgreSQL. Anúncios e reservas devem continuar disponíveis. **Não utilizar** `docker compose down -v` em demonstrações com dados que se pretende manter.

---

## 9. Interface implementada e revisão visual pendente

| Página | Elementos necessários | Ações principais |
|---|---|---|
| 1. Início/Catálogo | Cabeçalho, busca, categorias, filtros, cartões com foto e selo Grátis/preço | Pesquisar e abrir detalhes |
| 2. Detalhes/Reserva | Foto maior, descrição, categoria, proprietário, bairro/cidade, modalidade, datas, total | Enviar solicitação |
| 3. Anunciar/Editar | Formulário, modalidade, preço condicional, imagem de referência e endereço completo | Salvar/editar |
| 4. Painel do proprietário | Meus anúncios, solicitações, aprovar/recusar, concluir e cancelar aprovada | Gerenciar anúncios e pedidos |
| 5. Minhas reservas | Lista de solicitações, períodos, valor, status, informações da reserva aprovada | Acompanhar/cancelar pendente ou aprovada |

Componentes reutilizáveis sugeridos: `Header`, `FerramentaCard`, `FiltroFerramentas`, `FormularioFerramenta`, `FormularioReserva`, `StatusBadge`, `MensagemErro`, `Loading`, `SeletorUsuarioDemo`.

O formulário permite escolher uma imagem local ilustrativa ou enviar uma única capa JPG, PNG ou WebP de até 5 MB, com prévia e substituição na edição. Arquivos são locais ao backend, sem serviço externo. Também há Outra categoria com nome digitado (até 60 caracteres), criado/reutilizado ao salvar o anúncio. Alterações autorizadas pelo estudante em 10/11/2026. Não exibir endereço residencial completo em cartões públicos.

---

## 10. Arquitetura, tecnologias e organização de pastas

### 10.1 Fluxo técnico

```text
NAVEGADOR
  React + Vite (interface)
       | HTTP + JSON (fetch)
       v
  Node.js + Express (API REST)
       | validação + regras de negócio
       v
  Prisma ORM (acesso aos dados)
       | PostgreSQL
       v
  PostgreSQL 16 em Docker Compose (volume persistente)
```

**Ferramentas selecionadas:** VS Code (editor), Node.js 24 (runtime alvo), Express (servidor), nodemon (reinício em desenvolvimento), React + Vite (frontend), PostgreSQL 16, Docker Desktop + Compose, Prisma ORM (modelos/migrations), Thunder Client ou Postman (testes da API), Git/GitHub (versionamento), GitHub Projects (Kanban), ChatGPT/Work/Codex (assistência de IA), Figma opcional (protótipos).

**Uso efetivo:** Codex foi utilizado para implementação e testes, conforme registros IA-09 a IA-17. Não é uma dependência da aplicação. Testes foram executados com o runner nativo do Node e requisições HTTP; não há comprovação de uso de Postman, Thunder Client ou Figma nesta implementação.

### 10.2 Estrutura real do projeto (resumo da inspeção)

```text
FerramentaCompartilhada/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── lib/
│   │   ├── app.js
│   │   └── server.js
│   ├── scripts/
│   ├── test/
│   ├── uploads/             # arquivos locais; ignorados pelo Git
│   ├── prisma.config.ts
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── imagens/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles.css
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .env.example
├── docs/
│   ├── DOCUMENTACAO_MESTRE.md
│   ├── DOCUMENTACAO_IA.md
│   ├── README.md
│   ├── AGENTS.md
│   └── TESTES.md
├── docker-compose.yml
└── .gitignore
```

**A árvore resume arquivos existentes.** Dependências, cliente Prisma gerado, builds, credenciais e conteúdo de uploads foram omitidos. As telas React estão em `App.jsx` e `components/Marketplace.jsx`; não existem pastas `pages/` ou documentos separados de requisitos/arquitetura, pois essas informações estão concentradas neste documento. Git local foi inicializado em main após autorização de publicação, com origin em `https://github.com/rafael-mansur/FerramentaCompartilhada.git`; o remoto estava vazio na inspeção. Evidências de commit/push ficam no IA-22.

`node_modules/`, `.env`, arquivos temporários e credenciais **não** entram no Git. `README.md` precisa conter pré-requisitos, versões, instalação, configuração de variáveis, migrações, dados de demonstração e como iniciar frontend/backend.

---

## 11. Contrato da API REST implementado

A API responde com JSON no prefixo `/api`. A identidade demo vem do header `x-usuario-demo`. Criação/edição de anúncio também aceitam multipart com campo `capa`. O formulário usa `categoriaId=OUTRA` e `categoriaNome` para categoria digitada. Os arquivos da capa são servidos em `/uploads/`.

| Método e rota | Função | Observação |
|---|---|---|
| `GET /api/health` | Confirmar API online | Retorna status simples |
| `GET /api/health/db` | Confirmar conexão PostgreSQL | Retorna 503 se banco indisponível |
| `GET /api/categorias` | Listar categorias | Dados pré-carregados |
| `GET /api/usuarios-demo` | Listar perfis demonstrativos | **Somente ambiente local** |
| `GET /api/ferramentas` | Catálogo com filtros | Apenas anúncios ativos; omitir endereço completo |
| `GET /api/ferramentas/minhas` | Anúncios do perfil selecionado | Inclui endereço próprio e desativados |
| `GET /api/ferramentas/:id` | Detalhes públicos | Omitir endereço completo |
| `POST /api/ferramentas` | Criar anúncio | Identidade demo resolvida no servidor em ambiente local |
| `PUT /api/ferramentas/:id` | Editar anúncio | Conferir se é do proprietário demo selecionado |
| `PATCH /api/ferramentas/:id/desativar` | Desativar | Preservar reservas históricas |
| `POST /api/reservas` | Solicitar | Recalcular dias/total; status PENDENTE |
| `GET /api/reservas/minhas` | Reservas solicitadas | Filtrar por perfil demo selecionado |
| `GET /api/reservas/recebidas` | Pedidos para minhas ferramentas | Filtrar por dono |
| `PATCH /api/reservas/:id/aprovar` | Aprovar após verificar conflitos | Transação + 409 se período ocupado |
| `PATCH /api/reservas/:id/recusar` | Recusar pendente | Somente proprietário |
| `PATCH /api/reservas/:id/cancelar` | Cancelar pendente ou aprovada | Pendente: solicitante; aprovada: solicitante ou proprietário |
| `PATCH /api/reservas/:id/concluir` | Concluir aprovada | Somente proprietário |

**Identificação acadêmica:** o header seleciona um perfil existente; não há senha, sessão nem autenticação real. Essa simplificação foi mantida após discussão com o estudante para priorizar a demonstração local. Rotas e middleware estão em `backend/src/routes/marketplace.js` e `backend/src/middlewares/usuario-demo.js`.

**Códigos de erro esperados:** `400` para dados inválidos, `404` para recurso inexistente, `403` para operação não permitida no modo de demonstração, `409` para conflito de período ou estado, `500` para falha inesperada com mensagem segura ao usuário. A resposta de erros deve seguir formato uniforme, por exemplo `{ "erro": "PERIODO_INDISPONIVEL", "mensagem": "A ferramenta já está reservada nessas datas." }`.

---

## 12. Etapas de produção e critérios de conclusão

**Leitura desta seção:** as etapas abaixo preservam o plano inicial. O estado atual por marco é: ambiente/banco implementados; catálogo/anúncios/reservas implementados com testes de API; acabamento visual e ensaio ainda pendentes; GitHub/Kanban e revisão acadêmica da dupla não comprovados. Os dois parágrafos “Status em 10/11” abaixo são checkpoints anteriores à implementação. Nenhum commit foi realizado pela IA; commits futuros dependem de autorização.

O plano adotou desenvolvimento incremental, com entregas verificáveis e testes.
Commits representam marcos quando autorizados; a publicação inicial foi
expressamente autorizada e confirmada no IA-22.
O plano inicial abaixo deve ser lido junto ao estado atual, não como evidência
de que todas as atividades de gestão já foram realizadas.

### Etapa 1 — Planejar e organizar

**Status em 10/11:** ideia e documentação preparadas; repositório GitHub informado como criado; primeiro envio de arquivos e quadro Kanban **não comprovados**.

- Revisar esta documentação e converter em `docs/REQUISITOS.md` quando útil.
- Confirmar telas e campos; desenhar wireframes básicos (Figma ou papel).
- Criar repositório GitHub privado/público conforme decisão da dupla.
- Criar Kanban com colunas `A fazer`, `Em andamento`, `Em teste`, `Concluído`.
- Distribuir tarefas e abrir `DOCUMENTACAO_IA.md` desde o início.

**Concluída quando:** requisitos aceitos pela dupla, tarefas criadas e arquivos iniciais versionados.

### Etapa 2 — Preparar ambiente

**Status em 10/11:** pastas `backend/` e `docs/` criadas; Docker detectado no Windows (`docker --version`), mas execução de contêiner, Node/npm/Git, backend, frontend e banco **a verificar ou iniciar**.

- Instalar/verificar Node.js 24, npm, Git e Docker Desktop.
- Criar `backend` Express com nodemon e `frontend` React/Vite.
- Criar `docker-compose.yml` PostgreSQL 16 com volume persistente.
- Configurar `.env.example` e Prisma numa versão compatível/fixada.

**Concluída quando:** `docker compose up -d` sobe o PostgreSQL; API health e React abrem localmente.

### Etapa 3 — Banco e dados de exemplo

- Criar enums/entidades e migrations Prisma.
- Popular categorias, 2 perfis fictícios e ferramentas demonstrativas.
- Conferir relações e persistência após reinício.

**Concluída quando:** banco consultável, tabelas relacionais corretas e dados persistentes.

### Etapa 4 — CRUD de anúncios e catálogo

- Criar rotas para listar, detalhar, cadastrar, editar e desativar.
- Validar categoria, modalidade, preço e endereço.
- Testar rotas no Thunder Client/Postman.
- Criar catálogo React, filtros e formulário de anúncios.

**Concluída quando:** é possível cadastrar uma ferramenta e encontrá-la no catálogo.

### Etapa 5 — Reservas e regras críticas

- Criar solicitação com datas, dias inclusivos e total no backend.
- Rejeitar empréstimo gratuito com mais de um dia.
- Impedir reserva da própria ferramenta.
- Criar aprovar/recusar/cancelar/concluir, verificando permissões.
- Implementar transação de aprovação sem conflitos, inclusive concorrência.
- Exibir histórico/solicitações nas telas correspondentes.

**Concluída quando:** o fluxo completo funciona e conflitos são rejeitados.

### Etapa 6 — Acabamento e integração

- Ajustar responsividade, estados vazios, loading e mensagens de erro.
- Usar imagens locais e conteúdo fictício apresentável.
- Revisar exposição do endereço público/privado.

**Concluída quando:** principal demonstração funciona sem ajustes manuais no banco.

### Etapa 7 — Verificação, documentação e apresentação

- Rodar testes com a matriz da seção 14.
- Revisar `README.md`, `DOCUMENTACAO_IA.md`, Kanban e commits.
- Testar instalação e execução a partir de instruções do README.
- Ensaiar apresentação em 10 minutos e ter dados de demonstração prontos.

**Concluída quando:** dupla consegue iniciar e explicar o sistema sem depender da IA durante a avaliação.

---

## 13. Planejamento de equipe, Kanban e Git

### 13.1 Divisão inicial de responsabilidades

**Divisão proposta, não evidência de trabalho realizado pela dupla.** Os nomes dos integrantes e as contribuições efetivas ainda precisam ser informados e revisados pelos estudantes; não atribuir automaticamente a alguém o código gerado com IA.

**Integrante A:** banco, Docker, Prisma, API Express e testes de regras de negócio.  
**Integrante B:** protótipos, interface React, formulários, catálogo e integração visual.  
**Ambos:** revisão de requisitos, integração, testes finais, documentação, decisões de IA e apresentação. Cada integrante deve entender o fluxo geral.

### 13.2 Quadro Kanban sugerido

**Decisão de execução atual:** a equipe quer focar no GitHub e no ambiente e **adiou o Kanban**. Como o documento do professor ainda exige gestão visual, manter esta seção e retomar a atividade antes da avaliação, sem alegar que está pronta.

Tarefas iniciais: criar repositório; configurar GitHub Projects; escrever requisitos; desenhar cinco telas; configurar Docker/PostgreSQL; iniciar Express; iniciar React; criar migrations e seed; API de ferramentas; formulário de anúncio; catálogo e filtros; API de reservas; aprovação sem conflito; painéis; testes; README; documentação IA; ensaio.

Colunas: **A fazer → Em andamento → Em teste → Concluído**. Guardar capturas de momentos importantes no diretório `docs/kanban-prints/`. Uma tarefa só entra em “Concluído” quando verificada.

### 13.3 Disciplina de versionamento

- Antes de trabalhar, atualizar o repositório (`git pull` na branch adequada).
- Evitar mudanças simultâneas no mesmo arquivo sem alinhamento.
- Usar commits semânticos: `feat: ...`, `fix: ...`, `docs: ...`, `test: ...`, `chore: ...`.
- Fazer commits por funcionalidade; não concentrar todo o desenvolvimento num único commit.
- Não enviar `.env`, senhas, dados reais de moradores ou `node_modules/` ao GitHub.
- Documentar mudanças de regra e arquitetura neste documento e na documentação de IA.

---

## 14. Plano de testes e cenários obrigatórios

| ID | Cenário | Resultado esperado |
|---|---|---|
| T-01 | Cadastrar ferramenta paga com endereço completo | Persiste e aparece no catálogo com preço |
| T-02 | Cadastrar empréstimo gratuito | Mostra Grátis e nenhum preço cobrado |
| T-03 | Cadastrar aluguel sem preço / preço negativo | API rejeita com validação |
| T-04 | Cadastrar anúncio sem bairro ou cidade | API rejeita |
| T-05 | Visitante abre anúncio | Vê bairro/cidade, **não** endereço completo |
| T-06 | Solicitar aluguel de 10 a 12/11, R$ 15/dia | 3 diárias, total **R$ 45,00** |
| T-07 | Solicitar empréstimo gratuito 10 a 10/11 | Pedido PENDENTE, total R$ 0,00 |
| T-08 | Solicitar empréstimo gratuito 10 a 11/11 | API rejeita |
| T-09 | Solicitar devolução antes da retirada | API rejeita |
| T-10 | Proprietário solicita a própria ferramenta | API rejeita |
| T-11 | Duas solicitações PENDENTES sobrepostas | Ambas podem existir pendentes |
| T-12 | Aprovar primeira e depois segunda sobreposta | Primeira APROVADA; segunda falha com HTTP 409 |
| T-13 | Aprovar duas reservas sobrepostas simultaneamente | No máximo **uma** resulta APROVADA |
| T-14 | Aprovar reservas não sobrepostas | Ambas aprovadas |
| T-15 | Proprietário recusa pedido pendente | Status RECUSADA |
| T-16 | Solicitante cancela pedido pendente | Status CANCELADA |
| T-17 | Proprietário conclui reserva aprovada | Status CONCLUIDA; histórico permanece |
| T-18 | Reiniciar API, frontend e Docker sem remover volume | Dados continuam cadastrados |
| T-19 | Acessar ferramenta desativada e tentar reservar | Nova reserva rejeitada |
| T-20 | Remover conexão da API durante uso | Frontend exibe erro, sem ficar em branco |

O quadro define os resultados esperados; a evidência atual fica em [TESTES.md](TESTES.md), com 18 testes automatizados aprovados na última execução registrada. A matriz distingue API, persistência parcial e revisão visual pendente, sem declarar todos os cenários manuais aprovados.

---

## 15. Uso de IA e documentação exigida pelo professor

### 15.1 Política para qualquer agente que assumir o desenvolvimento

1. **Ler esta documentação e o edital antes de gerar código.** Em conflito, priorizar as exigências do professor; em seguida, decisões expressas da equipe; por último, sugestões técnicas.
2. **Trabalhar em uma funcionalidade por vez.** Antes de alterar arquivos, indicar o objetivo, arquivos envolvidos e testes de aceitação.
3. **Não inventar testes, commits, instalações ou arquivos.** Só marcar como concluído o que foi de fato executado/verificado.
4. **Respeitar stack e limites de versões.** Não substituir React/Express/PostgreSQL/Docker por tecnologias alternativas sem aprovação.
5. **Explicar decisões técnicas**, especialmente validação de datas, segurança do endereço e prevenção de conflitos.
6. **Preservar migrações e dados**; não apagar banco sem autorização, não expor segredos e não usar endereços reais na demonstração.
7. **Registrar prompts e iterações no `DOCUMENTACAO_IA.md`** após cada parte relevante. O agente deve fornecer também um resumo compreensível ao estudante.
8. **Não aumentar o escopo** com chat, pagamento, login real, upload complexo ou notificações sem decisão explícita.
9. **Priorizar funcionamento local e reprodutibilidade.** O edital citava 09/11/2026 como data de apresentação; confirmar com o professor a situação atual do prazo.

### 15.2 Formato obrigatório de `DOCUMENTACAO_IA.md`

Para cada grande funcionalidade, preencher a tabela descrita no edital:

| Problema/requisito | Prompt exato utilizado | Refinamento/iterações | Decisão de engenharia e critério de aceitação |
|---|---|---|---|
| Ex.: evitar reservas conflitantes | **Colar prompt real, sem reescrever** | Ex.: primeira solução não tratava concorrência; foi revisada | Ex.: transação validada com dois pedidos simultâneos |

**A linha acima é apenas um modelo, não um histórico de teste executado.** Preservar o texto literal enviado à IA, registrar o que ela errou/corrigiu, por que a dupla aceitou a solução e qual teste foi realizado. Registrar também versões de ferramentas e limitações encontradas.

### 15.3 Registro fiel do planejamento já conduzido com IA

**Registro histórico da concepção, anterior à implementação.** O parágrafo e os exemplos abaixo descrevem o primeiro planejamento. O uso posterior para gerar/corrigir código, executar testes e revisar documentos está nos registros IA-09 em diante do `DOCUMENTACAO_IA.md`.

Até o momento, a IA foi usada para **análise do edital**, **brainstorming de ideias**, **avaliação de viabilidade do conceito**, **refinamento de regras**, **sugestão da arquitetura**, **planejamento por etapas** e **orientações de instalação de WSL/Docker e organização do VS Code/GitHub**. O estudante executou comandos de criação da pasta e de verificação da instalação, mas **ainda não há geração/teste de código da aplicação comprovada**.

Exemplos de solicitações reais que orientaram o planejamento, transcritas da conversa:

> “preciso fazer esse trabalho, preciso que voce me explique, o melhor jeito de fazer, quais ferramentas utilizar, algumas ideias de projetos, etc... oq mais achar importante, e precisam ser alguns projetos diferentes dos tradicionais, mas nao dificeis”

> “No projeto FerramentaCompartilhada, quero implementar uma reserva de ferramentas com data de retirada e devolução, cálculo de dias e valor total, aprovação pelo proprietário e prevenção de conflitos de reserva. Explique os requisitos e o funcionamento técnico, sem implementar ainda.”

> “agora que ja entendemos como o projeto ia funcionar, pode fazer um arquivo de documentacao, documentando tudo que fizemos ate agora, elaboracao de ideias, ferramentas, estrutura etc, e como iremos produzir o projeto”

Outros pedidos reais que marcaram a configuração:

> “vamos para o proximo passo, organizar github e ambiente de desenvolvimento, vamos esquecer o kanban”

> “vamo continuar com a configuracao da pasta do projeto e organizar no vscode, ja criei o repositorio no github, ja execultei este comando aqui”

> “antes, consegue me mandar a documentacao mestre denovo? se puder adicionar tambem oque fizemos agora, organizei o github e a pasta do projeto, parei na parte da pasta backend e frontend, nao comecei ainda”

A regra do empréstimo gratuito por somente um dia e o endereço obrigatório também foram **decisões explícitas do usuário** no refinamento da ideia. Quando a equipe passar à implementação, deverá continuar o registro dos prompts literais nos arquivos apropriados; esta seção é um resumo de origem e **não substitui o formato exigido pelo professor**.

### 15.4 Modelo histórico de prompt de retomada (não usar como estado atual)

O texto abaixo foi redigido no checkpoint inicial e está preservado como histórico. Para retomar hoje, use o estado do cabeçalho e a seção 18; não execute as instruções antigas para criar estruturas já existentes.

```text
Você é o assistente técnico do projeto acadêmico FerramentaCompartilhada.
Antes de alterar código, leia integralmente esta documentação e o edital.
STATUS INFORMADO EM 10/11/2026:
- Ideia, arquitetura e regras de negócio planejadas.
- Repositório GitHub já criado pelo estudante, mas ainda não verificado
  se existe origin configurado, commit inicial ou push.
- Pasta local C:\FerramentaCompartilhada criada e aberta no VS Code.
- Pastas backend/ e docs/ criadas. Estrutura interna do backend
  e pasta frontend/ ainda não iniciadas, segundo o estudante.
- Docker Desktop instalado por usuário e docker --version responde.
  O teste docker run hello-world e Compose ainda não foram confirmados.
- O Kanban foi adiado pelo estudante, mas é exigido no edital.
- O edital marcava apresentação em 09/11/2026 (data já passada);
  não presumir prorrogação ou entrega.

STACK E REGRAS:
- Node.js 22–24 + Express + nodemon; React com Vite;
  PostgreSQL 15–16 via Docker Compose; Prisma; Git/GitHub.
- Anúncios: ALUGUEL pago ou EMPRESTIMO gratuito, com endereço
  completo obrigatório. Mostrar publicamente só bairro e cidade.
- Empréstimo gratuito: retirada e devolução na mesma data.
- Aluguel: diárias inclusivas; cálculo no backend.
- Reservas começam PENDENTE, são aprovadas/recusadas pelo dono e
  não podem ser aprovadas em períodos conflitantes.
- Usar dados fictícios no MVP; não há autenticação real nesta etapa.
- Não adicionar pagamentos reais, chat, GPS, login complexo ou extras.

PROTOCOLO:
1. Continue do ponto em que o estudante parou. Não recrie pastas já
   existentes nem presuma arquivos/comandos ainda não confirmados.
2. Antes de programar, explique o próximo passo com comandos para
   PowerShell e indique onde criar cada arquivo no VS Code.
3. Faça uma etapa por vez, peça a saída do teste correspondente,
   e só marque concluído o que for executado e confirmado.
4. Relembre a necessidade de documentar prompts e decisões de IA.
5. Use como primeira tarefa: verificar a raiz do projeto, organizar
   backend/src e criar o frontend React/Vite, sem implementar telas.
```

---

## 16. Cronograma original do edital e replanejamento em 10/11/2026

O planejamento anterior usava **02–09/11/2026** e previa entregar o sistema em **09/11/2026**. Essas datas agora representam o **cronograma histórico inicialmente proposto**, **não** atividades executadas nem um prazo novo. **Como a atualização ocorre em 10/11/2026, confirmar imediatamente com o professor a situação do trabalho e qualquer nova data**.

Para a retomada, usar prioridades sequenciais em vez de inventar datas:

| Ordem | Marco de execução | Evidência exigida para marcar como concluído |
|---|---|---|
| 1 | Confirmar arquivos na raiz e ligação do Git local ao GitHub | `git status`, `git remote -v`, arquivos visíveis no VS Code |
| 2 | Preparar backend e frontend sem lógica de negócio | API simples do Express e tela Vite/React funcionando |
| 3 | Confirmar Docker e criar banco PostgreSQL 16 com Compose | `docker run hello-world` e `docker compose ps` sem erros |
| 4 | Criar schema Prisma, migrations e dados fictícios | Tabelas e registros consultáveis após reiniciar |
| 5 | Implementar cadastro, catálogo, filtros e detalhes | CRUD funcionando com API e React |
| 6 | Implementar solicitação/aprovação e prevenção de conflito | Testes de 1 dia gratuito e rejeição de datas sobrepostas |
| 7 | Concluir documentação, GitHub, Kanban exigido e apresentação | README reproduzível, `DOCUMENTACAO_IA.md` e demonstração integral |

**Prioridade de escopo:** catálogo, anúncio, reserva, aprovação e conflito; recursos opcionais somente depois desses fluxos funcionando.

### 16.1 Roteiro sugerido da apresentação (10 minutos)

1. **1 min:** problema da compra de ferramentas pouco utilizadas e proposta colaborativa.
2. **2 min:** requisitos, modalidades, regra de empréstimo de 1 dia e arquitetura.
3. **4 min:** proprietário anuncia, interessado solicita, proprietário aprova, teste de conflito e visualização do status.
4. **2 min:** GitHub, Kanban, uso da IA, correções e decisões de engenharia.
5. **1 min:** dificuldades, limites do MVP e próximas melhorias.

---

## 17. Decisões adotadas e limites

As escolhas abaixo descrevem a implementação atual. Cancelamento de aprovada, categoria digitada e envio de capa vieram de solicitações expressas do estudante. As demais escolhas técnicas mantêm o MVP simples e podem ser revistas mediante nova decisão registrada.

| Tema | Padrão recomendado para começar | Por quê |
|---|---|---|
| Identificação | 2 usuários fictícios selecionáveis em ambiente local | Evita construir login completo às pressas |
| Fotos | Ilustração local ou envio de uma capa JPG/PNG/WebP até 5 MB, com prévia e troca na edição | Upload local simples autorizado em 10/11/2026; sem galeria ou serviço externo |
| CEP | Digitação e validação básica; sem API de busca de CEP | Mantém aplicação offline |
| Cancelamento de aprovada | Disponível ao proprietário e ao solicitante, por solicitação expressa de 10/11/2026 | Preserva histórico e libera datas sem excluir a reserva |
| Atualização de anúncio reservado | Bloquear alterações de modalidade/preço enquanto houver PENDENTE ou APROVADA; dono não é editável; total da reserva permanece histórico | Preserva os termos da oferta e mantém implementação simples |
| Período pago | Sem limite máximo adicional inicialmente | Usuário só definiu limite para gratuito |
| Categorias | Pré-carregadas ou digitadas em Outra categoria; nome normalizado é reutilizado se existente | Ampliação autorizada em 10/11/2026, sem tela administrativa |
| Disponibilidade | Não criar agenda complexa; mostrar datas e erro caso ocupado | Menor escopo |
| Localidade | BRL, `pt-BR` e datas locais de São Paulo | Consistência na demonstração |

Login real permanece como evolução futura; o estudante concordou em manter perfis demo após discutir a complexidade. As decisões e alternativas estão no registro IA-18. Não há confirmação de aprovação manual de cada arquivo pela dupla.

---

## 18. Retomada atual e histórico do primeiro plano de retomada

### 18.0 Retomada válida hoje

Backend, frontend, Compose, Prisma, migração, seed e testes estão implementados.
Use os comandos do README; não recrie arquivos ou diretórios. O foco agora é
revisão manual e fechamento das evidências acadêmicas. O histórico das subseções
18.1–18.3 abaixo foi escrito antes da implementação e não deve ser executado
como lista atual de tarefas.

| Pendência real | Como fechar sem inventar evidências |
|---|---|
| Revisão manual da interface e código | Dupla executa o checklist de TESTES.md e registra cenário, data, resultado e correções. |
| Responsáveis e contribuições | Informar nomes e atividades efetivas de cada integrante; a divisão da seção 13.1 é proposta. |
| Git/GitHub | Primeiro envio confirmado em main, commit f6ae94a e evidência no IA-22. Manter commits futuros correspondentes a mudanças reais. |
| Kanban | Organizar tarefas reais e evidências do quadro; não simular datas nem um histórico que não ocorreu. |
| Ensaio e persistência completa | Executar roteiro com reserva e reiniciar todos os processos sem remover volume; registrar resultado. |
| Edital/prazo | PDF original não localizado no projeto; conferir os requisitos oficiais e a orientação atual com o professor. |

A discussão sobre login terminou com manutenção dos perfis demonstrativos para
esta entrega. Essa escolha não é uma funcionalidade de cadastro/autenticação.

**Histórico abaixo:** plano inicial anterior à implementação, preservado para
entender o processo. A retomada atual é a subseção 18.0.

### 18.1 Histórico — organização local inicial

1. Abrir no VS Code a pasta **`C:\FerramentaCompartilhada`**, previamente criada.
2. Confirmar no Explorer que existem **`backend/` e `docs/`**. Se o estudante tiver criado `README.md`, `.gitignore`, `DOCUMENTACAO_IA.md`, `.env.example` ou `docker-compose.yml`, **preservar e revisar**; se não, criar os arquivos de maneira orientada.
3. Colocar esta documentação-mestre atualizada em `docs/` ou na raiz, adotando um caminho único e registrando no README; evitar versões duplicadas e contraditórias.
4. Criar em `backend/` as pastas de código necessárias, a princípio `src/controllers/`, `src/routes/`, `src/services/` e `src/middlewares/`. **Elas ainda não estão confirmadas como criadas.**
5. Verificar `node -v` (deve ser 22.x–24.x), `npm -v` e `git --version`. Não presumir que já foram validados.
6. Somente depois, criar o frontend na raiz com `npm create vite@latest frontend -- --template react`; instalar dependências em `frontend/` e testar `npm run dev` no navegador.

### 18.2 Histórico — primeiro backend, Docker e GitHub

7. Iniciar o `backend/package.json`, instalar Express e nodemon e criar uma rota `/api/health` simples; confirmar que responde localmente antes de trabalhar no Prisma.
8. Com o Docker Desktop aberto, confirmar execução do motor por `docker run hello-world`; depois configurar `docker-compose.yml` para PostgreSQL 16 e testar `docker compose up -d` / `docker compose ps`.
9. Na raiz, executar **apenas comandos de inspeção primeiro**: `git status` e `git remote -v`. Como o repositório GitHub já existe, **não** usar `git init` ou `git remote add origin` às cegas. Conectar o repositório local ao remoto se necessário e fazer commits progressivos. Não sobrescrever histórico remoto.
10. Preparar `.gitignore` antes de usar `git add .`; não publicar `.env`, `node_modules/` ou dados pessoais.
11. O Kanban foi adiado; por constar no edital, deverá ser retomado antes da avaliação, salvo orientação expressa diferente do professor.
12. Confirmar a situação do prazo acadêmico originalmente indicado para 09/11/2026.

### 18.3 Histórico — critérios do checkpoint inicial

O próximo registro de progresso deve distinguir claramente: **(a)** pastas de backend realmente criadas, **(b)** frontend gerado e aberto no navegador, **(c)** API Express testada, **(d)** Docker executando contêiner, **(e)** repositório local ligado ao GitHub e atualizado. Nenhum desses cinco está comprovado nesta revisão.

**Definição de pronto da primeira entrega:** qualquer integrante consegue, seguindo o README, iniciar a aplicação local, navegar no catálogo, cadastrar ferramenta, solicitar aluguel/empréstimo, aprovar um pedido, observar a prevenção de sobreposição e mostrar persistência, além de apresentar GitHub, Kanban e a documentação da IA.

---

## 19. Rastreabilidade e decisões de engenharia

### 19.1 Do requisito à implementação e à evidência

Os caminhos abaixo são relativos à raiz. Os arquivos de teste são executáveis;
a matriz de resultados e as validações manuais pendentes ficam em TESTES.md.

| Requisito | Implementação principal | Evidência e limite |
|---|---|---|
| RF-01/02/03 — catálogo, busca, filtros e detalhes | `backend/src/services/ferramentas.js`; `frontend/src/components/Marketplace.jsx` | Teste “catálogo filtra e detalhes públicos omitem endereço completo”; revisão visual pendente. |
| RF-04/05/06 — criar, editar e desativar | `backend/src/services/ferramentas.js` | Testes de endereço/preço, propriedade e desativação; histórico mantido. |
| RF-07 — perfil demo | `backend/src/middlewares/usuario-demo.js`; `frontend/src/App.jsx` | Testes HTTP com perfis distintos; seletor não é autenticação. |
| RF-08/09/10 — solicitar, gratuito e cálculo | `backend/src/services/reservas.js`; `backend/src/utils/validacao.js` | Testes de 3 diárias e Decimal, mesma data gratuita, datas inválidas/passadas e reserva própria. |
| RF-11/12 — aprovação e conflitos | `decidirReserva` em `backend/src/services/reservas.js` | Teste de duas aprovações simultâneas com respostas 200/409; teste de períodos distintos. |
| RF-13/14/15/16 — painéis e transições | `backend/src/services/reservas.js`; componente `Reservas` | Testes de recusa/cancelamento/conclusão e consulta de histórico nos dois perfis. |
| RF-17 — mensagens e estados | `frontend/src/services/api.js`; componentes `Aviso` e `Estado`; middleware de erros em `app.js` | Erros HTTP testados; painel técnico de conexão removido por solicitação; revisão visual das mensagens de operação pendente. |
| RF-18 — persistência | `docker-compose.yml`; Prisma e migração inicial | Registro de diagnóstico e anúncios persistiram após reiniciar PostgreSQL; ensaio completo T-18 ainda pendente. |
| RF-19 — categoria digitada | `salvarFerramenta`; formulário do anúncio | Teste “Outra categoria cria, reutiliza nome normalizado e permite editar e filtrar”. |
| RF-20 — capa | `backend/src/middlewares/capa.js`; serviço de ferramentas; formulário e proxy Vite | Testes de upload, manutenção/substituição, bytes servidos e rejeições; prévia visual pendente. |
| RN-09 — endereço público | `ferramentaPublica` e `apresentar` no backend | Testes confirmam omissão pública e acesso do solicitante na aprovada. |
| Execução Windows e erro de porta | `backend/src/server.js`; comandos no README | Teste de regressão de porta ocupada; registros IA-09/15. |

Todos os testes de marketplace citados estão em
[marketplace.test.js](../backend/test/marketplace.test.js). Relações/Decimal/DATE
estão em [database.test.js](../backend/test/database.test.js), e inicialização em
[server.test.js](../backend/test/server.test.js).

### 19.2 Decisões, alternativas e consequências

| Decisão | Motivo e alternativa considerada | Consequência / evidência |
|---|---|---|
| Perfis demo em vez de cadastro/login | Priorizar regras do domínio e uma apresentação local; login acrescentaria senhas/sessões e testes. | Estudante concordou em manter a demonstração; autenticação fica futura. |
| React com navegação por estado | Poucas telas; evitar dependência extra de roteamento neste MVP. | Páginas centralizadas em App/Marketplace; sem URLs por tela. |
| Cálculos no servidor com Decimal e DATE | Evitar total adulterado e diferenças de arredondamento/fuso. | Cliente exibe prévia, API é autoridade; testes monetários e de datas. |
| Bloquear a ferramenta em transação | Uma checagem fora da transação não impediria aprovações simultâneas. | PostgreSQL serializa o fluxo da API; SQL direto pode ignorar a regra. |
| Desativação lógica e estados finais | Evitar quebrar relações e perder histórico. | Não há exclusão física nem tela de reativação. |
| Categoria/arquivo no próprio cadastro | Incorporar feedback do estudante sem criar administração ou galeria. | Upload local, uma capa e categoria normalizada; sem serviços externos. |
| Manter história sem tratá-la como estado atual | Demonstrar evolução e revisão crítica da IA. | Checkpoints antigos identificados como históricos e retomada atual explícita. |

### 19.3 Função de cada documento

| Documento | Responsabilidade |
|---|---|
| `README.md` | Entrada do projeto, instalação/execução, comandos e solução de problemas. |
| Este documento | Requisitos, escopo, modelo, arquitetura, decisões, rastreabilidade e limites da entrega. |
| `DOCUMENTACAO_IA.md` | Prompts reais, iterações, erros, correções, decisões e testes associados ao uso da IA. |
| `TESTES.md` | Resultados observados, cobertura, limitações e validações pendentes. |
| `AGENTS.md` | Instruções operacionais para agentes; não substitui os requisitos nem o relatório da dupla. |

**Fim da especificação v1.3.** Revisão documental em 10/11/2026. Não considerar
uma aprovação técnica da IA como aprovação acadêmica ou revisão manual da dupla.
