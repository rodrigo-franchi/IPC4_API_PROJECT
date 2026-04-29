# 📚 Documentação da API CRUD de Clientes

## Visão Geral

Esta é uma API REST completa para gerenciamento de clientes, desenvolvida em Node.js com Express e MongoDB. A API segue os princípios RESTful e implementa operações CRUD completas com validações robustas.

**Versão:** 1.0.0
**Base URL:** `http://localhost:3000`
**Formato de dados:** JSON

## Autenticação

Atualmente, a API não requer autenticação (desenvolvimento). Em produção, considere implementar JWT ou OAuth2.

## Headers Padrão

```http
Content-Type: application/json
Accept: application/json
```

## Endpoints

### 🔍 **Informações da API**

#### GET /
Retorna informações básicas sobre a API.

**Resposta (200):**
```json
{
  "message": "API CRUD de Clientes",
  "version": "1.0.0",
  "endpoints": {
    "clientes": "/api/clientes",
    "health": "/health"
  }
}
```

#### GET /health
Verifica o status de saúde da API.

**Resposta (200):**
```json
{
  "status": "OK",
  "message": "API de Clientes funcionando",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 👥 **Clientes**

#### GET /api/clientes
Lista todos os clientes ativos (não deletados).

**Resposta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "telefone": "+55 11 99999-9999",
    "endereco": "Rua das Flores, 123, São Paulo - SP",
    "status": "ativo",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

#### GET /api/clientes/{id}
Busca um cliente específico pelo ID.

**Parâmetros:**
- `id` (path): ID do cliente (ObjectId do MongoDB)

**Resposta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "+55 11 99999-9999",
  "endereco": "Rua das Flores, 123, São Paulo - SP",
  "status": "ativo",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Resposta (404):**
```json
{
  "error": "Cliente não encontrado",
  "message": "Cliente com ID 507f1f77bcf86cd799439011 não foi encontrado"
}
```

#### POST /api/clientes
Cria um novo cliente.

**Corpo da requisição:**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "+55 11 99999-9999",
  "endereco": "Rua das Flores, 123, São Paulo - SP"
}
```

**Campos obrigatórios:**
- `nome`: string (3-100 caracteres)
- `email`: string (formato RFC 5322 válido)
- `telefone`: string (formato internacional, ex: +55 11 99999-9999)
- `endereco`: string (máximo 200 caracteres)

**Resposta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "+55 11 99999-9999",
  "endereco": "Rua das Flores, 123, São Paulo - SP",
  "status": "ativo",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Resposta (400) - Dados inválidos:**
```json
{
  "error": "Dados inválidos",
  "message": "Nome é obrigatório e deve ter entre 3 e 100 caracteres"
}
```

**Resposta (409) - Email duplicado:**
```json
{
  "error": "Conflito de dados",
  "message": "Email já cadastrado"
}
```

#### PUT /api/clientes/{id}
Atualiza um cliente existente.

**Parâmetros:**
- `id` (path): ID do cliente

**Corpo da requisição (apenas campos a atualizar):**
```json
{
  "nome": "João Silva Santos",
  "telefone": "+55 11 99999-0000"
}
```

**Resposta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva Santos",
  "email": "joao.silva@email.com",
  "telefone": "+55 11 99999-0000",
  "endereco": "Rua das Flores, 123, São Paulo - SP",
  "status": "ativo",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T11:00:00.000Z"
}
```

**Resposta (404):**
```json
{
  "error": "Cliente não encontrado",
  "message": "Cliente com ID 507f1f77bcf86cd799439011 não foi encontrado"
}
```

#### DELETE /api/clientes/{id}
Remove um cliente (soft delete).

**Parâmetros:**
- `id` (path): ID do cliente

**Resposta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "deletedAt": "2024-01-01T12:00:00.000Z"
}
```

**Resposta (404):**
```json
{
  "error": "Cliente não encontrado",
  "message": "Cliente com ID 507f1f77bcf86cd799439011 não foi encontrado"
}
```

#### GET /api/clientes/busca/nome/{nome}
Busca clientes por nome (busca parcial, case-insensitive).

**Parâmetros:**
- `nome` (path): Parte do nome a buscar

**Exemplo:** `/api/clientes/busca/nome/silva`

**Resposta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "telefone": "+55 11 99999-9999",
    "endereco": "Rua das Flores, 123, São Paulo - SP",
    "status": "ativo",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "nome": "Maria Silva",
    "email": "maria.silva@email.com",
    "telefone": "+55 11 88888-8888",
    "endereco": "Rua das Árvores, 456, Rio de Janeiro - RJ",
    "status": "ativo",
    "createdAt": "2024-01-01T10:30:00.000Z",
    "updatedAt": "2024-01-01T10:30:00.000Z"
  }
]
```

#### GET /api/clientes/busca/email/{email}
Busca cliente por email exato.

**Parâmetros:**
- `email` (path): Email completo a buscar

**Exemplo:** `/api/clientes/busca/email/joao.silva@email.com`

**Resposta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "+55 11 99999-9999",
  "endereco": "Rua das Flores, 123, São Paulo - SP",
  "status": "ativo",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Resposta (404):**
```json
{
  "error": "Cliente não encontrado",
  "message": "Cliente com email joao.silva@email.com não foi encontrado"
}
```

---

## 📋 **Validações**

### Campos do Cliente

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `nome` | string | ✅ | 3-100 caracteres | `"João Silva"` |
| `email` | string | ✅ | RFC 5322 válido | `"joao.silva@email.com"` |
| `telefone` | string | ✅ | Formato internacional | `"+55 11 99999-9999"` |
| `endereco` | string | ✅ | Máximo 200 caracteres | `"Rua das Flores, 123, São Paulo - SP"` |
| `status` | string | Auto | `ativo`, `inativo`, `bloqueado` | `"ativo"` |
| `createdAt` | Date | Auto | Timestamp criação | `"2024-01-01T10:00:00.000Z"` |
| `updatedAt` | Date | Auto | Timestamp atualização | `"2024-01-01T10:00:00.000Z"` |
| `deletedAt` | Date | Auto | Timestamp exclusão (soft delete) | `null` |

### Regras de Validação

- **Nome**: Deve ter entre 3 e 100 caracteres, apenas letras, espaços, apóstrofos e hífens
- **Email**: Deve seguir o padrão RFC 5322, será convertido para minúsculas
- **Telefone**: Deve seguir formato internacional (+XX XX XXXXX-XXXX)
- **Endereço**: Máximo 200 caracteres, pode conter qualquer caracter
- **Status**: Valores permitidos: `ativo`, `inativo`, `bloqueado`
- **Soft Delete**: Campo `deletedAt` é definido na exclusão, registros ficam "invisíveis" para operações normais

---

## 🚨 **Códigos de Status HTTP**

| Código | Descrição | Quando usar |
|--------|-----------|-------------|
| 200 | OK | Operação bem-sucedida (GET, PUT) |
| 201 | Created | Recurso criado com sucesso (POST) |
| 400 | Bad Request | Dados inválidos na requisição |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Conflito de dados (email duplicado) |
| 500 | Internal Server Error | Erro interno do servidor |

---

## 🔧 **Configuração e Execução**

### Pré-requisitos
- Node.js 20+
- MongoDB 7+
- npm ou yarn

### Instalação
```bash
npm install
```

### Configuração
```bash
# Variáveis de ambiente (opcional)
export MONGODB_URI=mongodb://localhost:27017/clientes_db
export PORT=3000
```

### Execução
```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Testes
npm test
```

### Scripts Disponíveis
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

---

## 📝 **Exemplos de Uso**

### Criar cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "telefone": "+55 11 99999-9999",
    "endereco": "Rua das Flores, 123, São Paulo - SP"
  }'
```

### Listar clientes
```bash
curl http://localhost:3000/api/clientes
```

### Buscar por nome
```bash
curl http://localhost:3000/api/clientes/busca/nome/silva
```

### Atualizar cliente
```bash
curl -X PUT http://localhost:3000/api/clientes/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Santos"
  }'
```

### Deletar cliente
```bash
curl -X DELETE http://localhost:3000/api/clientes/{id}
```

---

## 🔒 **Segurança**

- **Validação de entrada**: Todos os dados são validados antes do processamento
- **Sanitização**: Emails são convertidos para minúsculas
- **Limitação de tamanho**: Campos têm limites definidos para prevenir ataques
- **Soft delete**: Dados não são permanentemente removidos do banco
- **Logs**: Todas as operações são registradas para auditoria

---

## 📊 **Monitoramento**

- **Endpoint de saúde**: `/health` para verificar status da API
- **Logs estruturados**: Console logs para debugging e monitoramento
- **Métricas**: Contadores de operações e tempos de resposta

---

## 🚀 **Próximos Passos**

- [ ] Implementar autenticação JWT
- [ ] Adicionar paginação aos endpoints de listagem
- [ ] Implementar ordenação e filtros avançados
- [ ] Adicionar documentação OpenAPI/Swagger
- [ ] Implementar cache Redis
- [ ] Adicionar testes de carga
- [ ] Configurar CI/CD
- [ ] Deploy em ambiente de produção

---

**📧 Suporte:** Para dúvidas ou problemas, consulte a documentação técnica ou entre em contato com a equipe de desenvolvimento.