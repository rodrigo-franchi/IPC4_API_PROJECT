# 🚀 API CRUD de Clientes

Uma API REST completa para gerenciamento de clientes, desenvolvida em Node.js com Express e MongoDB. Implementa operações CRUD completas seguindo as melhores práticas de desenvolvimento.

## 📋 Características

- ✅ **CRUD Completo**: Criar, listar, buscar, atualizar e deletar clientes
- ✅ **Validações Robustas**: Email RFC 5322, telefone internacional, limites de caracteres
- ✅ **Soft Delete**: Exclusão lógica mantendo histórico
- ✅ **Busca Avançada**: Por nome parcial e email exato
- ✅ **Logging Estruturado**: Sistema completo de logs com Winston
- ✅ **Testes Completos**: 68 testes automatizados (pirâmide de testes)
- ✅ **Documentação Completa**: API docs e collection Postman
- ✅ **Padrões SOLID/DRY**: Código limpo e bem estruturado

## 🛠️ Tecnologias

- **Node.js** 20+
- **Express.js** - Framework web
- **MongoDB** 7+ - Banco de dados
- **Mongoose** - ODM para MongoDB
- **Winston** - Sistema de logging
- **Jest** - Framework de testes
- **Supertest** - Testes de API
- **ESLint + Prettier** - Qualidade de código

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 20 ou superior
- MongoDB 7 ou superior (local ou MongoDB Atlas)
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd ipc4-api-project

# Instalar dependências
npm install
```

### Configuração
A API suporta arquivo de ambiente `.env`. Copie o arquivo de exemplo e ajuste os valores antes de executar.

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Edite `.env` com suas configurações:

```env
MONGODB_URI=mongodb://localhost:27017/clientes_db
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### Execução
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start

# Testes
npm test

# Testes com watch
npm run test:watch

# Linting
npm run lint

# Formatação de código
npm run format
```

## 📚 Documentação da API

### Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/health` | Status de saúde da API |
| GET | `/api/clientes` | Listar todos os clientes |
| POST | `/api/clientes` | Criar novo cliente |
| GET | `/api/clientes/:id` | Buscar cliente por ID |
| PUT | `/api/clientes/:id` | Atualizar cliente |
| DELETE | `/api/clientes/:id` | Deletar cliente (soft delete) |
| GET | `/api/clientes/busca/nome/:nome` | Buscar por nome |
| GET | `/api/clientes/busca/email/:email` | Buscar por email |

### Exemplo de Uso

```bash
# Criar um cliente
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "telefone": "+55 11 99999-9999",
    "endereco": "Rua das Flores, 123, São Paulo - SP"
  }'

# Listar clientes
curl http://localhost:3000/api/clientes

# Buscar por nome
curl http://localhost:3000/api/clientes/busca/nome/silva
```

## 📖 Documentação Completa

- **[Documentação Técnica da API](docs/api.md)** - Documentação completa com exemplos
- **[Collection Postman](docs/postman_collection.json)** - Importe no Postman para testar
- **[Documentação do Projeto](.projeto/documentacaoProjeto.md)** - Log detalhado do desenvolvimento
- **[Contrato de Desenvolvimento](.projeto/contratoDeDesenvolvimento.md)** - Padrões e metodologias
- **[Pirâmide de Testes](docs/piramideTestes.md)** - Estratégia de testes

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Cobertura de testes
npm test -- --coverage

# Testes específicos
npm test -- tests/unit/clienteModel.test.js
npm test -- tests/integration/clienteApi.test.js
```

### Estrutura de Testes
```
tests/
├── unit/                    # 58 testes unitários
│   ├── clienteModel.test.js     # Validações do modelo
│   ├── clienteService.test.js   # Lógica de negócio
│   ├── clienteController.test.js # Endpoints REST
│   ├── clienteRoutes.test.js    # Configuração de rotas
│   └── ...
└── integration/             # 10 testes de integração
    └── clienteApi.test.js       # Testes end-to-end
```

## 📊 Logging

O sistema utiliza Winston para logging estruturado:

- **Console**: Logs coloridos em desenvolvimento
- **Arquivo**: `logs/error.log` (apenas erros) e `logs/combined.log` (todos os logs)
- **Níveis**: `error`, `warn`, `info`, `debug`
- **Estrutura**: JSON com contexto (IDs, endpoints, timestamps)

### Configuração de Log
```bash
# Nível de log
LOG_LEVEL=info  # error, warn, info, debug

# Ambiente
NODE_ENV=development  # development, production
```

## 🏗️ Estrutura do Projeto

```
.
├── src/
│   ├── controllers/       # Controllers Express
│   ├── models/           # Modelos Mongoose
│   ├── routes/           # Definição de rotas
│   ├── services/         # Lógica de negócio
│   ├── utils/            # Utilitários (logger)
│   └── index.js          # Servidor Express
├── tests/
│   ├── unit/             # Testes unitários
│   └── integration/      # Testes de integração
├── docs/                 # Documentação
├── .projeto/            # Material acadêmico
├── logs/                # Arquivos de log (gerado)
├── package.json
├── README.md
└── ...
```

## 🔧 Scripts Disponíveis

```json
{
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "lint": "eslint src/**/*.js",
  "format": "prettier --write src/**/*.js"
}
```

## 🚀 Deploy

### Desenvolvimento
```bash
npm run dev
# Servidor roda em http://localhost:3000
```

### Produção
```bash
npm start
# Configurar variável PORT se necessário
```

### Docker (opcional)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é parte de um trabalho acadêmico de pós-graduação.

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a [documentação técnica](docs/api.md)
2. Verifique os [logs da aplicação](logs/)
3. Execute os [testes automatizados](npm test)

---

**🎓 Projeto desenvolvido seguindo rigorosamente a metodologia BDD → TDD → Pirâmide de Testes com aplicação prática dos princípios SOLID/DRY.**