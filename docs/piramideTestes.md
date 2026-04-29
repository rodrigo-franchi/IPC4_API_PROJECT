# Pirâmide de Testes - Estratégia e Estrutura

## Visão geral da pirâmide

```
                    ▲
                   /|\
                  / | \
                 /  |  \
                /   |   \     10-15% Testes Funcionais/E2E
               /____|____\     Fluxos completos da API
              /     |     \
             /      |      \
            /       |       \   10-15% Testes de Integração
           /________|________\  API + Banco de dados
          /         |         \
         /          |          \
        /           |           \  10-15% Testes de Componente
       /____________|____________\  Múltiplos módulos
      /             |             \
     /              |              \  10-15% Testes de Contrato
    /______[BASE]___|___[BASE]______\  Interfaces entre módulos
   /                 |                 \
  /                  |                  \  40-50% Testes Unitários
 /___________________│___________________\  Funções isoladas
```

## Estrutura de pastas de testes

```
projeto/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── validators/
│   ├── models/
│   └── utils/
├── tests/
│   ├── unit/
│   │   ├── validators.test.js
│   │   ├── utils.test.js
│   │   └── models.test.js
│   ├── contract/
│   │   ├── customerService.contract.test.js
│   │   └── customerRepository.contract.test.js
│   ├── component/
│   │   ├── customerService.component.test.js
│   │   └── customerController.component.test.js
│   ├── integration/
│   │   ├── customersCrud.integration.test.js
│   │   └── database.integration.test.js
│   └── functional/
│       ├── e2eCustomersFlow.test.js
│       └── e2eValidationFlow.test.js
├── jest.config.js
└── package.json
```

> **Nota**: Todos os nomes de arquivos, funções, variáveis e propriedades seguem o padrão **camelCase**.

---

## Nível 1: Testes Unitários (40-50%)

### Objetivo
Testar funções, métodos e lógica isolada **sem dependências externas**. Cada teste cobre uma pequena unidade de código.

### Exemplos de testes unitários

#### 1.1 Validadores
```javascript
// tests/unit/validators.test.js
describe('validateEmail', () => {
  it('deve retornar true para email válido', () => {
    const result = validateEmail('usuario@example.com');
    expect(result).toBe(true);
  });

  it('deve retornar false para email inválido', () => {
    const result = validateEmail('email-invalido');
    expect(result).toBe(false);
  });
});

describe('validatePhoneNumber', () => {
  it('deve retornar true para telefone válido', () => {
    const result = validatePhoneNumber('11999999999');
    expect(result).toBe(true);
  });
});
```

#### 1.2 Utilitários
```javascript
// tests/unit/utils.test.js
describe('maskPhoneNumber', () => {
  it('deve formatar telefone com máscara', () => {
    const result = maskPhoneNumber('11999999999');
    expect(result).toBe('(11) 99999-9999');
  });
});

describe('generateId', () => {
  it('deve gerar um ID único', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});
```

#### 1.3 Modelos
```javascript
// tests/unit/models.test.js
describe('Customer model', () => {
  it('deve criar um cliente com dados válidos', () => {
    const customer = new Customer({
      nome: 'João',
      email: 'joao@example.com',
      telefone: '11999999999',
      endereco: 'Rua A, 123'
    });
    expect(customer.nome).toBe('João');
  });
});
```

### Cobertura esperada
- Validadores: 100%
- Utilitários: 100%
- Modelos: 80%+

---

## Nível 2: Testes de Contrato (10-15%)

### Objetivo
Validar **interfaces e contratos entre módulos**. Garante que a entrada e saída de um módulo são as esperadas.

### Exemplos de testes de contrato

#### 2.1 CustomerService
```javascript
// tests/contract/customerService.contract.test.js
describe('CustomerService - Contrato', () => {
  it('deve criar cliente e retornar objeto com propriedades esperadas', async () => {
    const result = await customerService.create({
      nome: 'João',
      email: 'joao@example.com',
      telefone: '11999999999',
      endereco: 'Rua A, 123'
    });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('nome');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('telefone');
    expect(result).toHaveProperty('endereco');
  });

  it('deve listar clientes retornando um array', async () => {
    const result = await customerService.getAll();
    expect(Array.isArray(result)).toBe(true);
  });
});
```

#### 2.2 CustomerRepository
```javascript
// tests/contract/customerRepository.contract.test.js
describe('CustomerRepository - Contrato', () => {
  it('deve retornar cliente com os campos esperados ao buscar por ID', async () => {
    const customer = await customerRepository.findById('123');
    expect(customer).toHaveProperty('id');
    expect(customer).toHaveProperty('nome');
  });

  it('deve retornar null quando cliente não existe', async () => {
    const result = await customerRepository.findById('999');
    expect(result).toBeNull();
  });
});
```

### Cobertura esperada
- Interfaces de serviços: 100%
- Interfaces de repositórios: 100%

---

## Nível 3: Testes de Componente (10-15%)

### Objetivo
Testar **comportamento de componentes integrados**, com dependências mockadas.

### Exemplos de testes de componente

#### 3.1 CustomerService com repositório mockado
```javascript
// tests/component/customerService.component.test.js
describe('CustomerService - Componente', () => {
  let mockRepository;
  let customerService;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn().mockResolvedValue({ id: '1', nome: 'João' }),
      findById: jest.fn().mockResolvedValue({ id: '1', nome: 'João' }),
      findAll: jest.fn().mockResolvedValue([{ id: '1', nome: 'João' }])
    };
    customerService = new CustomerService(mockRepository);
  });

  it('deve criar cliente chamando repository.create', async () => {
    const result = await customerService.create({
      nome: 'João',
      email: 'joao@example.com',
      telefone: '11999999999',
      endereco: 'Rua A, 123'
    });

    expect(mockRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('deve validar dados antes de criar cliente', async () => {
    await expect(
      customerService.create({ nome: '', email: 'invalido' })
    ).rejects.toThrow();
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
```

#### 3.2 CustomerController com service mockado
```javascript
// tests/component/customerController.component.test.js
describe('CustomerController - Componente', () => {
  let mockService;
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockService = { create: jest.fn() };
    mockRequest = { body: {} };
    mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  it('deve retornar 201 ao criar cliente com sucesso', async () => {
    mockService.create.mockResolvedValue({ id: '1', nome: 'João' });
    await customerController.create(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});
```

### Cobertura esperada
- Controladores: 80%+
- Serviços: 85%+

---

## Nível 4: Testes de Integração (10-15%)

### Objetivo
Testar **integração entre módulos reais**, incluindo banco de dados em memória ou teste.

### Exemplos de testes de integração

#### 4.1 Criar cliente e verificar persistência
```javascript
// tests/integration/customers-crud.integration.test.js
describe('Integração: CRUD de Clientes', () => {
  let database;

  beforeAll(async () => {
    database = new InMemoryDatabase();
    await database.initialize();
  });

  afterAll(async () => {
    await database.teardown();
  });

  it('deve criar cliente e recuperá-lo do banco de dados', async () => {
    const customerData = {
      nome: 'João',
      email: 'joao@example.com',
      telefone: '11999999999',
      endereco: 'Rua A, 123'
    };

    const repository = new CustomerRepository(database);
    const service = new CustomerService(repository);

    const created = await service.create(customerData);
    const retrieved = await service.getById(created.id);

    expect(retrieved.nome).toBe('João');
    expect(retrieved.email).toBe('joao@example.com');
  });

  it('deve atualizar cliente persistentemente', async () => {
    const repository = new CustomerRepository(database);
    const service = new CustomerService(repository);

    const created = await service.create({
      nome: 'Maria',
      email: 'maria@example.com',
      telefone: '11988888888',
      endereco: 'Avenida B, 456'
    });

    await service.update(created.id, { nome: 'Maria Silva' });
    const updated = await service.getById(created.id);

    expect(updated.nome).toBe('Maria Silva');
  });
});
```

#### 4.2 Rotas com banco de dados
```javascript
// tests/integration/database.integration.test.js
describe('Integração: API Routes + Database', () => {
  let app;
  let server;
  let database;

  beforeAll(async () => {
    database = new InMemoryDatabase();
    await database.initialize();
    app = createApp(database);
    server = app.listen(3001);
  });

  afterAll(async () => {
    server.close();
    await database.teardown();
  });

  it('deve criar cliente via POST /api/customers', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        nome: 'João',
        email: 'joao@example.com',
        telefone: '11999999999',
        endereco: 'Rua A, 123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

### Cobertura esperada
- Repositórios: 85%+
- Serviços com dados reais: 80%+

---

## Nível 5: Testes Funcionais/E2E (10-15%)

### Objetivo
Testar **fluxos completos end-to-end** da API, simulando a experiência real do usuário.

### Exemplos de testes funcionais

#### 5.1 Fluxo completo CRUD
```javascript
// tests/functional/e2e-customers-flow.test.js
describe('E2E: Fluxo Completo CRUD de Clientes', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3002);
  });

  afterAll(() => {
    server.close();
  });

  it('deve executar fluxo: criar → ler → atualizar → deletar', async () => {
    // Criar
    const createRes = await request(app)
      .post('/api/customers')
      .send({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
        endereco: 'Rua A, 123'
      });

    expect(createRes.status).toBe(201);
    const customerId = createRes.body.id;

    // Ler
    const readRes = await request(app)
      .get(`/api/customers/${customerId}`);

    expect(readRes.status).toBe(200);
    expect(readRes.body.nome).toBe('João Silva');

    // Atualizar
    const updateRes = await request(app)
      .put(`/api/customers/${customerId}`)
      .send({ nome: 'João Silva Atualizado' });

    expect(updateRes.status).toBe(200);

    // Deletar
    const deleteRes = await request(app)
      .delete(`/api/customers/${customerId}`);

    expect(deleteRes.status).toBe(204);

    // Verificar se foi realmente deletado
    const checkRes = await request(app)
      .get(`/api/customers/${customerId}`);

    expect(checkRes.status).toBe(404);
  });
});
```

#### 5.2 Fluxo de validação
```javascript
// tests/functional/e2e-validation-flow.test.js
describe('E2E: Fluxo de Validações', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3003);
  });

  afterAll(() => {
    server.close();
  });

  it('deve rejeitar criação com email duplicado', async () => {
    // Criar primeiro cliente
    await request(app)
      .post('/api/customers')
      .send({
        nome: 'João',
        email: 'mesmo@example.com',
        telefone: '11999999999',
        endereco: 'Rua A, 123'
      });

    // Tentar criar segundo com mesmo email
    const response = await request(app)
      .post('/api/customers')
      .send({
        nome: 'Maria',
        email: 'mesmo@example.com',
        telefone: '11988888888',
        endereco: 'Rua B, 456'
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toContain('email duplicado');
  });
});
```

### Cobertura esperada
- Fluxos críticos: 100%
- Validações: 100%

---

## Scripts de teste

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest tests/unit",
    "test:contract": "jest tests/contract",
    "test:component": "jest tests/component",
    "test:integration": "jest tests/integration",
    "test:functional": "jest tests/functional"
  }
}
```

---

## Configuração do Jest

Exemplo de `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};
```

---

## Metas de cobertura

| Nível | % Cobertura | Prioridade |
|-------|-------------|-----------|
| Unitários | 40-50% | 🔴 Máxima |
| Contrato | 10-15% | 🟠 Alta |
| Componente | 10-15% | 🟠 Alta |
| Integração | 10-15% | 🟡 Média |
| Funcional/E2E | 10-15% | 🟡 Média |
| **Total** | **80%+** | - |

---

## Status do documento
- [ ] Estrutura de pastas criada
- [ ] Configuração do Jest definida
- [ ] Pronto para implementar testes conforme TDD
