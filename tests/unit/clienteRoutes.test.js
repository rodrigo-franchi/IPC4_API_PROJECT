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

describe('Cliente Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/clientes', () => {
    test('deve chamar clienteController.listarClientes', async () => {
      clienteController.listarClientes.mockImplementation((req, res) => {
        res.status(200).json([{ nome: 'João Silva' }]);
      });

      const response = await request(app).get('/api/clientes');

      expect(response.status).toBe(200);
      expect(clienteController.listarClientes).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/clientes/:id', () => {
    test('deve chamar clienteController.buscarClientePorId com ID correto', async () => {
      clienteController.buscarClientePorId.mockImplementation((req, res) => {
        res.status(200).json({ _id: req.params.id, nome: 'João Silva' });
      });

      const response = await request(app).get('/api/clientes/123');

      expect(response.status).toBe(200);
      expect(clienteController.buscarClientePorId).toHaveBeenCalledTimes(1);
      expect(response.body._id).toBe('123');
    });
  });

  describe('GET /api/clientes/admin/:id', () => {
    test('deve chamar clienteController.buscarClientePorIdAdmin com ID correto', async () => {
      clienteController.buscarClientePorIdAdmin.mockImplementation((req, res) => {
        res.status(200).json({ _id: req.params.id, nome: 'João Silva', status: 'inativo' });
      });

      const response = await request(app).get('/api/clientes/admin/123');

      expect(response.status).toBe(200);
      expect(clienteController.buscarClientePorIdAdmin).toHaveBeenCalledTimes(1);
      expect(response.body._id).toBe('123');
      expect(response.body.status).toBe('inativo');
    });
  });

  describe('POST /api/clientes', () => {
    test('deve chamar clienteController.criarCliente com dados do body', async () => {
      const clienteData = { nome: 'João Silva', email: 'joao@email.com' };

      clienteController.criarCliente.mockImplementation((req, res) => {
        res.status(201).json({ _id: 'mockId', ...req.body });
      });

      const response = await request(app)
        .post('/api/clientes')
        .send(clienteData);

      expect(response.status).toBe(201);
      expect(clienteController.criarCliente).toHaveBeenCalledTimes(1);
      expect(response.body.nome).toBe(clienteData.nome);
    });
  });

  describe('PUT /api/clientes/:id', () => {
    test('deve chamar clienteController.atualizarCliente com ID e dados', async () => {
      const updateData = { nome: 'João Silva Santos' };

      clienteController.atualizarCliente.mockImplementation((req, res) => {
        res.status(200).json({ _id: req.params.id, ...req.body });
      });

      const response = await request(app)
        .put('/api/clientes/123')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(clienteController.atualizarCliente).toHaveBeenCalledTimes(1);
      expect(response.body._id).toBe('123');
      expect(response.body.nome).toBe(updateData.nome);
    });
  });

  describe('DELETE /api/clientes/:id', () => {
    test('deve chamar clienteController.deletarCliente com ID correto', async () => {
      clienteController.deletarCliente.mockImplementation((req, res) => {
        res.status(200).json({ _id: req.params.id, deletedAt: new Date() });
      });

      const response = await request(app).delete('/api/clientes/123');

      expect(response.status).toBe(200);
      expect(clienteController.deletarCliente).toHaveBeenCalledTimes(1);
      expect(response.body._id).toBe('123');
    });
  });

  describe('GET /api/clientes/busca/nome/:nome', () => {
    test('deve chamar clienteController.buscarClientePorNome com nome correto', async () => {
      clienteController.buscarClientePorNome.mockImplementation((req, res) => {
        res.status(200).json([{ nome: req.params.nome }]);
      });

      const response = await request(app).get('/api/clientes/busca/nome/silva');

      expect(response.status).toBe(200);
      expect(clienteController.buscarClientePorNome).toHaveBeenCalledTimes(1);
      expect(response.body[0].nome).toBe('silva');
    });
  });

  describe('GET /api/clientes/busca/email/:email', () => {
    test('deve chamar clienteController.buscarClientePorEmail com email correto', async () => {
      clienteController.buscarClientePorEmail.mockImplementation((req, res) => {
        res.status(200).json({ email: req.params.email });
      });

      const response = await request(app).get('/api/clientes/busca/email/joao@email.com');

      expect(response.status).toBe(200);
      expect(clienteController.buscarClientePorEmail).toHaveBeenCalledTimes(1);
      expect(response.body.email).toBe('joao@email.com');
    });
  });
});