const request = require('supertest');
const express = require('express');
const clienteRoutes = require('../../src/routes/clienteRoutes');

// Mock do controller
jest.mock('../../src/controllers/clienteController');

const clienteController = require('../../src/controllers/clienteController');

// Configurar app Express para testes
const app = express();
app.use(express.json());
app.use('/api/clientes', clienteRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API de Clientes funcionando',
    timestamp: new Date().toISOString(),
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API CRUD de Clientes',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      health: '/health',
    },
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe nesta API`,
  });
});

describe('API de Clientes - Integração (Rotas)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/clientes', () => {
    test('deve chamar controller.listarClientes', async () => {
      clienteController.listarClientes.mockImplementation((req, res) => {
        res.status(200).json([
          { _id: '1', nome: 'João Silva', email: 'joao@email.com' },
          { _id: '2', nome: 'Maria Santos', email: 'maria@email.com' },
        ]);
      });

      const response = await request(app).get('/api/clientes');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(clienteController.listarClientes).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/clientes/:id', () => {
    test('deve chamar controller.buscarClientePorId com ID correto', async () => {
      clienteController.buscarClientePorId.mockImplementation((req, res) => {
        res.status(200).json({ _id: req.params.id, nome: 'João Silva' });
      });

      const response = await request(app).get('/api/clientes/123');

      expect(response.status).toBe(200);
      expect(response.body._id).toBe('123');
      expect(clienteController.buscarClientePorId).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/clientes', () => {
    test('deve chamar controller.criarCliente com dados válidos', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua das Flores, 123, São Paulo - SP',
      };

      clienteController.criarCliente.mockImplementation((req, res) => {
        res.status(201).json({
          _id: 'mockId',
          ...req.body,
          status: 'ativo',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      const response = await request(app)
        .post('/api/clientes')
        .send(clienteData);

      expect(response.status).toBe(201);
      expect(response.body._id).toBe('mockId');
      expect(response.body.nome).toBe(clienteData.nome);
      expect(clienteController.criarCliente).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/clientes/:id', () => {
    test('deve chamar controller.atualizarCliente com ID e dados', async () => {
      const updateData = { nome: 'João Silva Santos' };

      clienteController.atualizarCliente.mockImplementation((req, res) => {
        res.status(200).json({
          _id: req.params.id,
          nome: 'João Silva Santos',
          email: 'joao@email.com',
          updatedAt: new Date(),
        });
      });

      const response = await request(app)
        .put('/api/clientes/123')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe('123');
      expect(response.body.nome).toBe('João Silva Santos');
      expect(clienteController.atualizarCliente).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/clientes/:id', () => {
    test('deve chamar controller.deletarCliente com ID correto', async () => {
      clienteController.deletarCliente.mockImplementation((req, res) => {
        res.status(200).json({
          _id: req.params.id,
          deletedAt: new Date(),
        });
      });

      const response = await request(app).delete('/api/clientes/123');

      expect(response.status).toBe(200);
      expect(response.body._id).toBe('123');
      expect(response.body.deletedAt).toBeDefined();
      expect(clienteController.deletarCliente).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/clientes/busca/nome/:nome', () => {
    test('deve chamar controller.buscarClientePorNome com nome correto', async () => {
      clienteController.buscarClientePorNome.mockImplementation((req, res) => {
        res.status(200).json([
          { nome: req.params.nome, email: 'joao@email.com' },
        ]);
      });

      const response = await request(app).get('/api/clientes/busca/nome/silva');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].nome).toBe('silva');
      expect(clienteController.buscarClientePorNome).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/clientes/busca/email/:email', () => {
    test('deve chamar controller.buscarClientePorEmail com email correto', async () => {
      clienteController.buscarClientePorEmail.mockImplementation((req, res) => {
        res.status(200).json({
          email: req.params.email,
          nome: 'João Silva',
        });
      });

      const response = await request(app).get('/api/clientes/busca/email/joao@email.com');

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('joao@email.com');
      expect(clienteController.buscarClientePorEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /health', () => {
    test('deve retornar status da API', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('API de Clientes funcionando');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /', () => {
    test('deve retornar informações da API', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('API CRUD de Clientes');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('404 Handler', () => {
    test('deve retornar 404 para rota inexistente', async () => {
      const response = await request(app).get('/rota-inexistente');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Rota não encontrada');
      expect(response.body.message).toContain('não existe nesta API');
    });
  });
});