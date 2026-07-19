# Etapa 3 - Definicao de Estrategias de Resposta

Este documento define respostas para os riscos mais relevantes identificados na etapa anterior, utilizando as abordagens: evitar, mitigar, transferir ou aceitar.

## Criterio de selecao dos riscos mais relevantes
Foram priorizados riscos com combinacao de impacto Alto/Critico e probabilidade Media/Alta, especialmente aqueles com potencial de comprometer prazo, qualidade e conformidade legal.

## Plano de resposta aos riscos prioritarios

### Risco 1 - Conflitos e mudancas frequentes de requisitos
- Estrategia proposta: Mitigar
- Justificativa da escolha: nao e viavel eliminar o envolvimento de varios stakeholders, mas e possivel reduzir conflitos com governanca de requisitos.
- Possiveis acoes associadas:
  - criar comite de decisao com representantes definidos e autoridade de aprovacao;
  - estabelecer processo formal de solicitacao de mudanca (change request);
  - aplicar criterio unico de priorizacao (valor, risco, urgencia, esforco);
  - definir janelas de mudanca por sprint para evitar alteracoes continuas.

### Risco 2 - Nao conformidade com a LGPD
- Estrategia proposta: Evitar
- Justificativa da escolha: risco regulatorio e juridico critico; o objetivo deve ser impedir a ocorrencia por desenho de processo e de arquitetura.
- Possiveis acoes associadas:
  - mapear dados pessoais tratados pela API e respectivas bases legais;
  - implementar minimizacao de dados e politicas de retencao/descarte;
  - revisar termos, consentimento e trilhas de auditoria com apoio juridico;
  - incluir checklist LGPD como criterio obrigatorio de aceite.

### Risco 3 - Exposicao indevida de dados sensiveis em logs
- Estrategia proposta: Mitigar
- Justificativa da escolha: logs sao necessarios para operacao, entao a resposta adequada e reduzir a exposicao sem eliminar o mecanismo.
- Possiveis acoes associadas:
  - mascarar campos sensiveis (email, telefone, endereco) em logs;
  - restringir acesso aos arquivos e dashboards de observabilidade;
  - proibir uso de dados reais em homologacao quando possivel;
  - criar rotina de revisao de log seguro em cada release.

### Risco 4 - Controles de acesso insuficientes
- Estrategia proposta: Evitar
- Justificativa da escolha: acesso indevido a dados de clientes e inaceitavel para o projeto; e necessario prevenir a falha na origem.
- Possiveis acoes associadas:
  - implementar autenticacao para todos os endpoints sensiveis;
  - implementar autorizacao por perfil/papel para operacoes administrativas;
  - bloquear e monitorar tentativas de acesso nao autorizado;
  - executar testes de seguranca e revisao de permissoes antes de cada entrega.

### Risco 5 - Queda de produtividade por rotatividade da equipe
- Estrategia proposta: Mitigar
- Justificativa da escolha: a perda de pessoas ja ocorreu; o foco passa a ser reduzir impacto na capacidade de entrega.
- Possiveis acoes associadas:
  - estruturar onboarding tecnico com trilha de 2 a 3 semanas;
  - aplicar pareamento entre membros experientes e novos;
  - registrar decisoes tecnicas e padroes em documentacao viva;
  - replanejar capacidade e ajustar compromissos de sprint.

### Risco 6 - Perda de conhecimento tacito
- Estrategia proposta: Mitigar
- Justificativa da escolha: conhecimento nao documentado nao pode ser totalmente recuperado, mas pode ser preservado a partir de agora.
- Possiveis acoes associadas:
  - instituir rotina de handover para funcoes criticas;
  - criar base de conhecimento por modulo (arquitetura, regras, operacao);
  - gravar sessoes curtas de transferencia de conhecimento;
  - mapear pontos de dependencia de pessoa unica e eliminar gargalos.

### Risco 7 - Atraso no cronograma
- Estrategia proposta: Mitigar
- Justificativa da escolha: nao e possivel transferir integralmente o risco de prazo; e necessario controlar escopo, capacidade e dependencias.
- Possiveis acoes associadas:
  - reestimar backlog com base na capacidade atual do time;
  - separar entregas em marcos incrementais de alto valor;
  - aplicar buffer para itens de conformidade e seguranca;
  - acompanhar indicadores semanais de lead time e bloqueios.

### Risco 8 - Risco reputacional e juridico
- Estrategia proposta: Transferir + Mitigar
- Justificativa da escolha: parte do risco pode ser compartilhada com suporte juridico/compliance e instrumentos formais, mantendo mitigacao tecnica e processual interna.
- Possiveis acoes associadas:
  - envolver area juridica/compliance na validacao de requisitos sensiveis;
  - formalizar criterios de aceite e responsabilidade em atas e aprovacoes;
  - preparar plano de resposta a incidentes e comunicacao com stakeholders;
  - manter evidencias de conformidade (auditoria, testes, controles).

### Risco 9 - Priorizacao ineficiente do backlog
- Estrategia proposta: Mitigar
- Justificativa da escolha: risco de governanca de produto que pode ser reduzido com metodo de priorizacao e ritos objetivos.
- Possiveis acoes associadas:
  - adotar matriz de priorizacao baseada em risco, valor e esforco;
  - revisar backlog semanalmente com decisor unico de produto;
  - limitar trabalho em progresso para evitar dispersao;
  - sinalizar dependencias criticas e riscos de bloqueio no planejamento.

## Riscos com resposta de aceitacao controlada
Alguns riscos de menor criticidade relativa podem ser aceitos de forma controlada, com monitoramento continuo:

### Risco 10 - Cobertura de testes desalinhada a novos requisitos
- Estrategia proposta: Aceitar (controlado) + Mitigar pontual
- Justificativa da escolha: dado o contexto de equipe e prazos, pode haver atraso temporario na atualizacao da suite; o risco e aceito apenas com limites claros.
- Possiveis acoes associadas:
  - definir nivel minimo de testes obrigatorios por release;
  - priorizar testes de regressao dos fluxos mais criticos;
  - registrar debitos de teste com prazo de quitacao.

## Diretriz geral de acompanhamento
- Revisar este plano a cada sprint;
- Atualizar probabilidade e impacto conforme novos fatos;
- Registrar status das acoes (nao iniciado, em andamento, concluido);
- Escalar riscos criticos sem dono definido para decisao executiva.
