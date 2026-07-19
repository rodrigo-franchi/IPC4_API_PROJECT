# Etapa 2 - Analise dos Riscos

Esta etapa apresenta uma analise qualitativa dos riscos identificados, considerando impacto potencial no projeto e fatores que influenciam a probabilidade de ocorrencia.

## Escala qualitativa utilizada
- Probabilidade: Baixa, Media, Alta
- Impacto: Baixo, Medio, Alto, Critico

## Analise estruturada dos riscos

### Risco 1 - Conflitos e mudancas frequentes de requisitos
- Impacto no projeto: Alto
- Probabilidade: Alta
- Explicacao dos impactos: pode gerar desvio de escopo, aumento de retrabalho, perda de previsibilidade das entregas e atrasos no cronograma.
- Fatores condicionantes:
  - numero elevado de stakeholders com objetivos distintos;
  - ausencia de criterio unico de priorizacao;
  - aprovacoes sem governanca formal de mudanca.

### Risco 2 - Aumento de retrabalho tecnico
- Impacto no projeto: Alto
- Probabilidade: Alta
- Explicacao dos impactos: reduz produtividade da equipe, aumenta custo de desenvolvimento e pode introduzir regressao em funcionalidades estaveis.
- Fatores condicionantes:
  - mudancas tardias em requisitos ja implementados;
  - baixa rastreabilidade entre requisito e teste;
  - falta de congelamento de escopo por sprint.

### Risco 3 - Nao conformidade com a LGPD
- Impacto no projeto: Critico
- Probabilidade: Media
- Explicacao dos impactos: risco de sancoes legais, bloqueio de entrada em producao, necessidade de refatoracao ampla e dano reputacional.
- Fatores condicionantes:
  - ausencia de politica de privacidade operacionalizada no sistema;
  - falta de revisao juridica e tecnica dos fluxos de dados;
  - inexistencia de processo de governanca de dados pessoais.

### Risco 4 - Exposicao indevida de dados sensiveis em logs
- Impacto no projeto: Alto
- Probabilidade: Media
- Explicacao dos impactos: potencial vazamento de dados pessoais, incidentes de seguranca e nao conformidade regulatoria.
- Fatores condicionantes:
  - logs sem mascaramento de campos sensiveis;
  - monitoramento sem controle de acesso adequado;
  - ambientes de teste/homologacao com dados reais.

### Risco 5 - Controles de acesso insuficientes
- Impacto no projeto: Critico
- Probabilidade: Media
- Explicacao dos impactos: acesso nao autorizado a dados, manipulacao indevida de registros e risco juridico elevado.
- Fatores condicionantes:
  - ausencia de autenticacao/autorizacao robusta;
  - endpoints administrativos expostos sem restricao;
  - falhas em validacao de permissao por perfil.

### Risco 6 - Queda de produtividade por rotatividade da equipe
- Impacto no projeto: Alto
- Probabilidade: Alta
- Explicacao dos impactos: desaceleracao da velocidade de entrega, aumento de dependencia de membros remanescentes e risco de gargalos tecnicos.
- Fatores condicionantes:
  - curva de aprendizado dos novos profissionais;
  - falta de onboarding estruturado;
  - documentacao tecnica insuficiente para transferencia de conhecimento.

### Risco 7 - Perda de conhecimento tacito
- Impacto no projeto: Alto
- Probabilidade: Media
- Explicacao dos impactos: maior tempo para diagnostico de problemas, decisoes inconsistentes de arquitetura e aumento da variabilidade tecnica entre entregas.
- Fatores condicionantes:
  - baixa documentacao de decisoes arquiteturais;
  - dependencia de especialistas em modulos especificos;
  - pouca padronizacao de praticas de desenvolvimento.

### Risco 8 - Atraso no cronograma
- Impacto no projeto: Alto
- Probabilidade: Alta
- Explicacao dos impactos: comprometimento de marcos de entrega, necessidade de replanejamento frequente e risco de perda de confianca dos stakeholders.
- Fatores condicionantes:
  - acoplamento entre tarefas criticas;
  - estimativas iniciais desatualizadas;
  - acao simultanea dos riscos de requisitos, LGPD e rotatividade.

### Risco 9 - Reducao da qualidade por sobrecarga
- Impacto no projeto: Alto
- Probabilidade: Media
- Explicacao dos impactos: aumento de defeitos, incidentes em producao e custo de manutencao corretiva.
- Fatores condicionantes:
  - pressao por prazo sem ajuste de escopo;
  - revisoes de codigo e testes encurtados;
  - acumulacao de divida tecnica.

### Risco 10 - Cobertura de testes desalinhada a novos requisitos
- Impacto no projeto: Medio
- Probabilidade: Media
- Explicacao dos impactos: menor confianca para deploy, maior chance de regressao funcional e deteccao tardia de falhas.
- Fatores condicionantes:
  - mudancas frequentes sem atualizacao imediata de testes;
  - foco prioritario em entrega de funcionalidade;
  - capacidade limitada de teste frente ao volume de mudancas.

### Risco 11 - Risco reputacional e juridico
- Impacto no projeto: Critico
- Probabilidade: Media
- Explicacao dos impactos: desgaste institucional, contestacoes formais e impacto negativo na continuidade do projeto.
- Fatores condicionantes:
  - incidentes de privacidade;
  - baixa transparencia sobre decisoes e prazos;
  - desalinhamento recorrente com stakeholders juridicos.

### Risco 12 - Priorizacao ineficiente do backlog
- Impacto no projeto: Alto
- Probabilidade: Alta
- Explicacao dos impactos: alocacao inadequada de esforco, postergacao de itens criticos e reducao do valor entregue por sprint.
- Fatores condicionantes:
  - ausencia de matriz de priorizacao baseada em risco e valor;
  - backlog inflado por demandas concorrentes;
  - decisao orientada por urgencia percebida e nao por criticidade real.

## Conclusao da etapa
A analise qualitativa indica concentracao de riscos de alto impacto em tres eixos: governanca de requisitos, conformidade LGPD e capacidade de execucao da equipe. Esses eixos se reforcam mutuamente e, sem tratamento coordenado, aumentam a probabilidade de atrasos e de problemas de qualidade e conformidade.
