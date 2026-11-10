# Roteiro de apresentação — FerramentaCompartilhada

## Estado de entrega

O núcleo do protótipo local está implementado: anúncios, catálogo, filtros,
reservas, decisões do proprietário e persistência. Testes de API e build passaram.
A primeira publicação no GitHub foi confirmada no registro IA-22. A revisão
visual das novas telas, o ensaio e o Kanban continuam pendentes.

## Preparar antes de apresentar

1. Abrir Docker Desktop e iniciar o banco pelo comando do README.
2. Se ainda não houver anúncios de demonstração, executar `npm.cmd run db:seed`
   dentro de `backend`. Não executar seed repetidamente durante a apresentação.
3. Iniciar backend: `npm.cmd run dev`, dentro de `backend`.
4. Iniciar frontend: `npm.cmd run dev`, dentro de `frontend`, em outro terminal.
5. Abrir http://127.0.0.1:5173/ e confirmar o carregamento do catálogo e dos perfis.
6. Conferir `/api/health/db`, executar `npm.cmd test` no backend e o build do
   frontend antes do ensaio. Não é preciso instalar dependências a cada execução.
7. Revisar o fluxo abaixo manualmente e escolher datas ainda livres. Utilizar
   um anúncio novo se os anúncios de exemplo já tiverem reservas aprovadas.
8. No cadastro, testar Outra categoria com nome novo e a mesma categoria com
   diferença de maiúsculas/espaços. Enviar uma capa JPG/PNG/WebP até 5 MB, conferir
   a prévia e o catálogo; editar para trocar a foto e para manter sem novo arquivo.

## Dez minutos de apresentação

| Tempo | Demonstração |
|---|---|
| 0–1 min | Problema: ferramentas usadas poucas vezes; proposta de compartilhar entre vizinhos. |
| 1–2 min | Explicar React → Express → Prisma → PostgreSQL no Docker. Mostrar dois perfis demo. |
| 2–3 min | Como Ana, anunciar ferramenta paga com endereço fictício completo e imagem local. |
| 3–5 min | Como Bruno, buscar o anúncio, abrir detalhes e reservar três datas consecutivas. R$ 15/dia → R$ 45. |
| 5–6 min | Como Ana, aprovar em Solicitações recebidas. Como Bruno, consultar status e endereço. |
| 6–7 min | Criar outro pedido para o mesmo período; tentar aprovar como Ana e mostrar a mensagem de conflito. |
| 7–8 min | Mostrar a escada gratuita: retirada e devolução obrigatoriamente na mesma data. Mostrar cancelamento/recusa de pendente. |
| 8–9 min | Mostrar testes passando, persistência e explicação do bloqueio transacional na aprovação. |
| 9–10 min | Documentação de IA, participação da dupla, evidências reais de GitHub/Kanban e limites do protótipo. |

Para demonstrar conclusão de uma reserva, use retirada/devolução na data atual,
aprove como dono e, após simular a devolução, clique em Concluir devolução.
Uma reserva futura não pode ser concluída antecipadamente.

Para demonstrar cancelamento após aceite, aprove um pedido e use Cancelar reserva
em Solicitações recebidas (proprietário) ou em Minhas reservas (solicitante).
O status muda para Cancelada e o período fica livre para aprovar outro pedido.

## Como explicar as decisões

- **Perfis demo:** o seletor evita construir login para uma apresentação local.
- **Valor:** o servidor conta as datas inclusivamente e calcula o total com Decimal.
- **Conflito:** pedido pendente não ocupa a ferramenta. Ao aprovar, a API bloqueia
  a linha da ferramenta até terminar a transação, confere sobreposição e grava o
  status. A outra aprovação da mesma ferramenta aguarda e verifica o resultado.
- **Endereço:** obrigatório no anúncio; catálogo mostra bairro/cidade; reserva
  aprovada mostra o endereço fictício ao solicitante.
- **Histórico:** desativar não apaga; recusas/cancelamentos não ocupam datas.
- **Limite acadêmico:** não há pagamento online, login real ou chat. O upload
  é simples e local: uma capa por anúncio, sem serviço externo nem galeria.

## Pendências acadêmicas

- Revisar as novas telas no navegador, inclusive largura de celular.
- Guardar resultados do ensaio e capturas de telas, sem dados reais.
- GitHub publicado em `https://github.com/rafael-mansur/FerramentaCompartilhada`,
  branch main. Mostrar commits reais; novas alterações devem ter commits
  correspondentes e autorização para envio. Não inventar commits retroativos.
- Retomar o Kanban exigido no edital, registrando tarefas realmente executadas;
  sua organização pode ser manual, sem outra integração técnica.
- Confirmar com o professor a situação do prazo original e a entrega esperada.
- Cada integrante deve conseguir iniciar e explicar o fluxo sem depender da IA.
