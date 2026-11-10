# Verificação do MVP — 10/11/2026

## Resultado observado

- `backend`: `npm.cmd test` → 18 testes aprovados, 0 falhas, após inclusão de
  categoria digitada e upload de capa.
- Correção posterior de inicialização: `node --test test/server.test.js` → 1 teste
  de regressão aprovado; porta ocupada não anuncia API disponível. Esse teste
  já está incluído no total de 18 do comando geral, não é um 19º teste.
- `frontend`: `npm.cmd run build` → sucesso.
- Preparação para GitHub: suíte completa de 18 testes e build novamente
  aprovados antes do primeiro envio autorizado, sem novos erros. Aviso pg conhecido mantido.
- HTTP via Vite: HTML, três SVGs, categorias, perfis e catálogo acessíveis.
- Seed executado duas vezes: 2 perfis, 4 categorias e 3 anúncios.
- Após reiniciar PostgreSQL: API reconectou e os 3 anúncios permaneceram no catálogo.
- Aviso conhecido de depreciação do driver pg em transações, sem falha dos testes.
- As portas temporárias 3001/5174 foram usadas na verificação para preservar
  os processos existentes do estudante. Processos próprios encerrados ao final.

## Matriz da documentação-mestre

“API aprovada” indica teste automatizado de integração com PostgreSQL, não uma
inspeção visual da interface. As novas telas ainda precisam do ensaio manual.

| Cenário | Resultado / evidência |
|---|---|
| T-01 Cadastro pago com endereço | API aprovada; registro criado no PostgreSQL e localizado pela busca. |
| T-02 Empréstimo gratuito | API aprovada: preço nulo no anúncio, reserva total zero. |
| T-03 Preço ausente/inválido | API aprovada para zero, negativo e excesso de casas; ausência é validada pelo mesmo serviço. |
| T-04 Endereço ausente | API aprovada para bairro/cidade vazios. |
| T-05 Endereço público | API aprovada: catálogo/detalhes omitem campos completos; aprovada revela ao solicitante. |
| T-06 Diárias inclusivas | API aprovada: 3 dias × R$ 15,50 = R$ 46,50. |
| T-07 Gratuito mesma data | API aprovada: pendente com total zero. |
| T-08 Gratuito duas datas | API aprovada: HTTP 400. |
| T-09 Datas invertidas | API aprovada: HTTP 400; também testadas data inválida e passada. |
| T-10 Reserva própria | API aprovada: HTTP 403. |
| T-11 Pendentes sobrepostos | API aprovada: dois pedidos criados. |
| T-12 Aprovação conflitante | API aprovada no teste concorrente: uma aprovada, outra HTTP 409 e pendente. |
| T-13 Aprovações simultâneas | API aprovada: requisições paralelas produzem exatamente uma APROVADA. |
| T-14 Sem sobreposição | API aprovada: ambas aprovadas. |
| T-15 Recusa | API aprovada: RECUSADA, sem permitir aprovação posterior. |
| T-16 Cancelamento | API aprovada: somente solicitante cancela pendente. |
| T-16b Cancelar aprovada | API aprovada para proprietário e solicitante; terceiro rejeitado; histórico preservado e outro pedido sobreposto pode ser aprovado após cancelamento. Estados finais são rejeitados. |
| T-17 Conclusão | API aprovada: conclusão de reserva do dia preserva histórico; futura é rejeitada. |
| T-18 Reiniciar processos/banco | Anúncios persistiram após reinício real do PostgreSQL; ensaio completo com reservas e reinício de todos os processos ainda pendente. |
| T-19 Desativada | API aprovada: detalhes públicos 404; novas reservas/aprovações 409; histórico preservado. |
| T-20 API indisponível na interface | Indicador antigo foi removido a pedido do estudante. Painéis/formulários mantêm mensagens de erro, e falha inicial oferece Tentar novamente; validação visual pendente. |

## Limites e execução segura dos testes

Testes adicionais de anúncio: nova categoria criada/reutilizada com normalização,
edição e filtro; upload PNG servido com os mesmos bytes; preservação na edição
sem arquivo, substituição e remoção da capa antiga; rejeição de tipo/conteúdo
inválidos, arquivo acima de 5 MB e múltiplas capas. Testes limpam apenas os
arquivos enviados por eles. Build do frontend passou; prévia e seletor de
arquivo ainda precisam de conferência manual no navegador.

Os testes criam perfis, categoria e anúncios identificados por UUID e apagam
apenas esses registros ao final. Não utilizam os anúncios da apresentação nem
removem volumes. É necessário banco migrado e `backend/.env` configurado.
O teste de relações usa transação revertida; o teste HTTP verifica gravações
reais e faz limpeza dos seus próprios dados em `after`.

O controle automatizado do Chrome foi interrompido pela ferramenta porque não
conseguiu determinar a URL atual com confiança para aplicar sua política.
Nenhum novo fluxo visual foi declarado aprovado a partir dessa tentativa.

Para concluir a validação manual: seguir `ROTEIRO_APRESENTACAO.md`, conferir
carregamento, estados vazios, mensagens de erro, troca de perfil, edição,
reserva, decisões e tamanho de celular. Registrar data e resultado após executar.

## Testes técnicos de interrupção — 10/11/2026

Executados por HTTP e pela função de requisição do frontend, sem declarar
inspeção visual do navegador. API/Vite temporários nas portas 3001/5174 foram
usados para a queda da API, preservando os terminais existentes em 3000/5173.
O PostgreSQL real do projeto foi brevemente parado e restaurado, sem remover volume.

| Condição | Resultado observado |
|---|---|
| API temporária desligada | HTML do Vite 200; consulta ao catálogo pelo proxy 502; função do cliente gera “Não foi possível carregar os dados. Tente novamente em instantes.” |
| PostgreSQL parado | HTML 200; health básico da API 200; health/db 503; catálogo 500 com erro da API. |
| PostgreSQL restaurado | Contêiner saudável; cinco IDs de anúncios anteriores preservados e catálogo acessível. |
| Final do teste | API 3000, frontend 5173 e health/db responderam 200; cópias temporárias encerradas. |

A primeira comparação de persistência usou uma lista JSON sem enumerar cada
registro no PowerShell e gerou um falso alerta. Após corrigir a coleta dos IDs,
o teste de parada/restauração foi repetido e confirmou os cinco IDs preservados.
O primeiro teste de proxy esperava 500, mas a versão usada retornou 502; ajustada
a expectativa do procedimento, sem alterar a aplicação ou ocultar o resultado.
Esses testes não substituem o ensaio manual completo de T-18/T-20.

## Registro manual da dupla — a preencher após execução

Não preencher responsável, data ou aprovação retroativamente sem evidência.
O relato do estudante sobre o indicador de API indisponível já foi registrado
no IA-12; não equivale à aprovação de todas as novas telas.

| Verificação | Situação | Responsável / data / evidência |
|---|---|---|
| Catálogo e filtros no navegador | Pendente de registro formal | — |
| Criar/editar anúncio e endereço obrigatório | Pendente de registro formal | — |
| Outra categoria e prévia/troca da capa | Pendente de registro formal | — |
| Reserva paga, gratuita e conflito de aprovação | Pendente de registro formal | — |
| Cancelamento de aprovada nos dois perfis | Pendente de registro formal | — |
| Concluir devolução e consultar histórico | Pendente de registro formal | — |
| Estados vazios/erro e largura de celular | Pendente de registro formal | — |
| Reiniciar todos os processos com anúncio e reserva persistidos | Pendente de ensaio completo | — |

A rastreabilidade entre requisitos, arquivos e testes automatizados está na
seção 19 da [documentação-mestre](DOCUMENTACAO_MESTRE.md).
