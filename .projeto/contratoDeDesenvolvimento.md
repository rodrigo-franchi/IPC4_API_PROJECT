# Contrato de Desenvolvimento de Projeto

## 1. Objetivo
Este documento define o acordo entre o aluno e a IA (GitHub Copilot) para o desenvolvimento do projeto de API CRUD de clientes. Ele estabelece os padrões de implementação, requisitos funcionais e técnicos, boas práticas, validações, testes, documentação e controle de versão.

## 2. Partes envolvidas
- **Aluno**: responsável por fornecer requisitos, revisar entregas, testar manualmente e orientar o rumo do projeto.
- **IA (GitHub Copilot)**: responsável por propor, criar e documentar a implementação seguindo os requisitos, padrões e boas práticas definidos neste contrato.

## 3. Requisitos funcionais iniciais
1. Criar uma API REST para cadastro de clientes.
2. Implementar operações CRUD para clientes:
   - `Criar` um cliente
   - `Ler` todos os clientes
   - `Ler` cliente por ID
   - `Atualizar` cliente por ID
   - `Excluir` cliente por ID
3. Cada cliente deve conter pelo menos os campos:
   - nome
   - email
   - telefone
   - endereço
4. O projeto deve permitir evolução incremental, com etapas de documentação claras para cada novo conjunto de funcionalidades.

## 4. Requisitos técnicos
1. Usar **Node.js** com **Express** como stack principal.
2. Organizar o código em módulos claros: rotas, controladores, serviços e dados (models/repositórios).
3. Manter o servidor configurado para aceitar JSON e usar CORS quando necessário.
4. Incluir arquivos de configuração de dependências (`package.json`) e de execução (`npm start`, `npm run dev`).
5. Preparar o projeto para evolução futura com persistência em banco de dados.

## 5. Padrões de desenvolvimento e boas práticas
1. Código limpo e legível.
2. **Convenção de nomes em `camelCase`**:
   - Variáveis, funções, métodos: `camelCase` (ex: `validateEmail`, `customerService`, `findCustomerById`)
   - Propriedades de objetos: `camelCase` (ex: `firstName`, `lastName`, `phoneNumber`, `streetAddress`)
   - Constantes: `UPPER_SNAKE_CASE` (ex: `DEFAULT_PORT`, `MAX_CUSTOMERS`)
   - Nomes de arquivos: `camelCase` ou `kebab-case` conforme convenção de diretório (ex: `customerService.js`, `email-validator.js`)
   - Nomes de pastas: `kebab-case` (ex: `src/controllers/`, `src/validators/`)
3. Separação de responsabilidades:
   - rotas somente definem endpoints;
   - controladores orquestram a requisição e a resposta;
   - serviços ou repositórios lidam com regras de negócio / dados.
4. Tratamento de erros consistente e mensagens adequadas ao cliente.
5. Uso de comentários apenas quando necessário, preferindo código autoexplicativo.
6. Evitar duplicação de código e repetir padrões.

## 6. Validações e qualidade
1. Validar entradas das rotas em todos os endpoints criados.
2. Garantir que campos obrigatórios estejam presentes antes de gravar ou atualizar.
3. Validar formato de email e outros dados estruturados quando aplicável.
4. Retornar códigos HTTP adequados:
   - `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.
5. Incluir mensagens de erro descritivas no corpo da resposta.

## 7. Metodologia BDD (Behavior Driven Development)
1. Todos os requisitos devem ser documentados em linguagem BDD usando o formato Gherkin.
2. Cada requisito será expresso como: **Dado (Given) / Quando (When) / Então (Then)**.
3. A IA questionará o aluno sobre ambiguidades ou falta de clareza nos requisitos antes de prosseguir.
4. Os requisitos BDD devem ser revisados e aprovados antes de iniciar o desenvolvimento.
5. Arquivo de referência: `docs/requisitosBdd.md`.

## 8. Pirâmide de Testes
1. Aplicar estratégia de testes estruturada na pirâmide de testes:
   - **Testes unitários (40-50%)**: validam funções, métodos e lógica isolada sem dependências externas.
   - **Testes de contrato (10-15%)**: validam interfaces entre módulos e contratos de dados.
   - **Testes de componente (10-15%)**: validam comportamento de componentes integrados.
   - **Testes de integração (10-15%)**: validam integração entre módulos (ex: rota + service).
   - **Testes funcionais/E2E (10-15%)**: validam fluxos completos da API (ex: criar → ler → atualizar → deletar).
2. Cada nível de teste será documentado com seus objetivos e cobertura esperada.
3. Usar `Jest` como framework principal para testes em Node.js.
4. Arquivo de referência: `docs/piramideTestes.md`.

## 9. Test-Driven Development (TDD)
1. Seguir o ciclo Red-Green-Refactor:
   - **Red**: escrever teste que falha (testa comportamento esperado).
   - **Green**: implementar o mínimo necessário para passar no teste.
   - **Refactor**: melhorar código mantendo testes verdes.
2. Escrever testes antes de implementar qualquer funcionalidade.
3. Manter cobertura de testes alta (mínimo 80%).
4. Registrar cada ciclo TDD no histórico de commits.

## 10. Princípios SOLID, DRY e Responsabilidade Única
1. **SOLID**:
   - **S (Single Responsibility)**: cada classe/função tem uma única responsabilidade.
   - **O (Open/Closed)**: aberto para extensão, fechado para modificação.
   - **L (Liskov Substitution)**: subclasses podem substituir classes base sem quebrar.
   - **I (Interface Segregation)**: interfaces específicas, não genéricas.
   - **D (Dependency Inversion)**: depender de abstrações, não de implementações.
2. **DRY (Don't Repeat Yourself)**: evitar duplicação de código.
3. **Responsabilidade Única**: funções/classes fazem uma coisa bem.
4. A IA sugerirá refatorações para manter estes princípios.

## 11. Validação com Linter
1. Configurar **ESLint** com regras rigorosas no projeto.
2. Usar preset recomendado como `eslint:recommended` ou `airbnb`.
3. Adicionar regra de formatação com **Prettier** para consistência de código.
4. Executar linter em cada commit (`npm run lint`).
5. Corrigir todos os erros e avisos antes de prosseguir.
6. Configuração de exemplo em `.eslintrc.json` e `.prettierrc`.

## 12. Testes
1. A implementação deve ser preparada para aceitar testes automatizados.
2. Priorizar testes de integração/rota e também testes de unidade para regras de negócio.
3. Usar bibliotecas comuns de teste em Node.js como `jest` ou `supertest`.
4. Documentar claramente onde estão os testes e como executá-los.
5. Scripts de teste: `npm test`, `npm run test:watch`, `npm run test:coverage`.

## 13. Documentação
1. Criar e manter um arquivo `.projeto/documentacaoProjeto.md` com cada passo do desenvolvimento.
2. Documentar requisitos BDD em `docs/requisitosBdd.md` - inclui padrão camelCase para nomes de campos.
3. Documentar estratégia de testes em `docs/piramideTestes.md` - com exemplos em camelCase.
4. Atualizar documentação a cada nova etapa ou alteração significativa.
5. Incluir instruções de instalação, execução e uso da API em `README.md`.
6. Referenciar capturas de tela ou prints relevantes em `.projeto/images/`, como `prj_step1.png`.
7. Documentar decisões de arquitetura, ciclos TDD e próximos passos, mantendo consistência com padrão camelCase.

## 14. README e arquivos de projeto
1. Criar um `README.md` com descrição do projeto, instalação, uso e estrutura básica.
2. Incluir um `.gitignore` adequado para Node.js (`node_modules/`, `dist/`, `.env`, etc.).
3. Incluir `package.json` com dependências e scripts claros.
4. Configurar `.eslintrc.json` e `.prettierrc` para linting e formatação.
5. Garantir que o projeto esteja pronto para ser versionado desde o início.

## 15. Padrão de commits e versionamento
1. Usar mensagens de commit claras e descritivas.
2. Seguir padrão de commits com referência a ciclos TDD:
   - `test: adicionar teste unitário para validação de email`
   - `feat: implementar validação de email (green do TDD)`
   - `refactor: extrair validação em função reutilizável (refactor do TDD)`
   - `docs: documentar requisito BDD de cadastro de cliente`
3. Registrar cada passo significativo no histórico de commits e documentação.
4. Sempre referenciar em `.projeto/documentacaoProjeto.md` as etapas correspondentes.

## 16. Comunicação e revisão
1. O aluno pode pedir ajustes, melhorias ou mudanças a qualquer momento.
2. A IA deve questionar ambiguidades ou falta de clareza nos requisitos BDD antes de prosseguir.
3. A IA deve sugerir melhorias quando identificar oportunidades de qualidade, SOLID, DRY ou cobertura de testes.
4. Antes de avançar para a próxima etapa, revisar o que foi implementado, testado e documentado.
5. Validar todos os testes e linter antes de considerar uma etapa concluída.

## 17. Atualizações do contrato
1. Este contrato pode ser revisado e atualizado ao longo do projeto.
2. Quaisquer mudanças nos requisitos, padrões ou escopo devem ser registradas no próprio arquivo.

---

## Assinatura do contrato
- **Aluno**: responsável por fornecer requisitos em BDD, revisar entregas e validar.
- **IA (GitHub Copilot)**: responsável por questionar requisitos, implementar via TDD, aplicar SOLID/DRY, testar segundo pirâmide de testes e documentar.

> Este contrato define as bases para desenvolvimento moderno, profissional e de alta qualidade, utilizando BDD, TDD, SOLID, DRY, pirâmide de testes e linter. Garante que o projeto siga padrões claros desde a primeira etapa até a conclusão.
