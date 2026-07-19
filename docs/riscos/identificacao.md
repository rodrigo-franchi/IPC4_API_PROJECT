# Etapa 1 - Identificacao de Riscos

Com base no cenario do projeto (API REST de gestao de clientes com equipe reduzida, conflitos de requisitos e exigencias de LGPD), seguem os principais riscos identificados.

## 1. Conflitos e mudancas frequentes de requisitos
- Descricao breve: alta quantidade de stakeholders juridicos com interesses distintos pode gerar mudancas constantes no escopo e divergencia sobre prioridades.
- Contexto de ocorrencia: reunioes de alinhamento, validacao de backlog, aprovacao de historias e alteracoes tardias no fluxo de negocio.

## 2. Aumento de retrabalho tecnico
- Descricao breve: redefinicoes de requisitos em fase intermediaria tendem a invalidar implementacoes ja concluidas, gerando refatoracoes nao planejadas.
- Contexto de ocorrencia: sprints com historias parcialmente prontas, ajustes em endpoints ja publicados e revisao de regras no servico de clientes.

## 3. Nao conformidade com a LGPD
- Descricao breve: armazenamento e tratamento inadequado de dados pessoais podem violar obrigacoes legais de privacidade e protecao de dados.
- Contexto de ocorrencia: coleta de dados sem base legal clara, ausencia de minimizacao de dados, falhas em consentimento, retencao e descarte.

## 4. Exposicao indevida de dados sensiveis em logs
- Descricao breve: logs de aplicacao podem registrar informacoes pessoais de clientes sem mascaramento, ampliando risco de vazamento.
- Contexto de ocorrencia: logs de erro, logs de requisicoes HTTP e monitoramento em ambiente de homologacao/producao.

## 5. Controles de acesso insuficientes
- Descricao breve: ausencia de autenticacao/autorizacao robusta pode permitir consulta ou alteracao indevida de dados de clientes.
- Contexto de ocorrencia: consumo publico de endpoints administrativos, falta de segregacao de perfis e validacoes de permissao incompletas.

## 6. Queda de produtividade por rotatividade da equipe
- Descricao breve: perda de profissionais e entrada de novos membros reduz velocidade de entrega no curto prazo.
- Contexto de ocorrencia: transicao de conhecimento, onboarding tecnico, adaptacao ao padrao arquitetural e ramp-up em regras de negocio.

## 7. Perda de conhecimento tacito
- Descricao breve: saida de pessoas-chave pode levar embora decisoes de arquitetura e detalhes de implementacao nao documentados.
- Contexto de ocorrencia: manutencao de modulos legados, investigacao de bugs complexos e evolucao de componentes sem historico claro.

## 8. Atraso no cronograma
- Descricao breve: combinacao de mudancas de escopo, exigencias de conformidade e equipe em recomposicao pode comprometer prazos.
- Contexto de ocorrencia: planejamento de releases, marcos de entrega academicos/contratuais e dependencias entre tarefas criticas.

## 9. Reducao da qualidade por sobrecarga
- Descricao breve: pressao por prazo pode levar a testes insuficientes, revisoes superficiais e aumento de defeitos em producao.
- Contexto de ocorrencia: fechamento de sprint, hotfixes urgentes e priorizacao de velocidade sobre qualidade.

## 10. Cobertura de testes desalinhada a novos requisitos
- Descricao breve: alteracoes de regra de negocio podem nao ser refletidas rapidamente na suite de testes, reduzindo confianca nas entregas.
- Contexto de ocorrencia: mudancas em validacoes de cadastro, ajustes de fluxo de atualizacao/exclusao e cenarios de regressao.

## 11. Risco reputacional e juridico
- Descricao breve: incidentes de privacidade ou entregas inconsistentes para stakeholders juridicos podem gerar desgaste institucional e exposicao legal.
- Contexto de ocorrencia: auditorias, demonstracoes para partes interessadas, reclamacoes formais e notificacoes regulatórias.

## 12. Priorizacao ineficiente do backlog
- Descricao breve: sem um criterio objetivo de priorizacao, o time pode focar demandas menos criticas e postergar itens de maior risco.
- Contexto de ocorrencia: planejamento de sprint, negociacao entre multiplos solicitantes e ausencia de governanca de produto.
