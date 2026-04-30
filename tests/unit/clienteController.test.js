const request = require('supertest');
const express = require('express');
const clienteController = require('../../src/controllers/clienteController');

// Mock do serviço
jest.mock('../../src/services/clienteService');

const ClienteService = require('../../src/services/clienteService');

// Configurar app Express para testes
const app = express();
app.use(express.json());

// Rotas para teste
app.get('/api/clientes', clienteController.listarClientes);
app.get('/api/clientes/admin/:id', clienteController.buscarClientePorIdAdmin);
app.get('/api/clientes/:id', clienteController.buscarClientePorId);
app.post('/api/clientes', clienteController.criarCliente);
app.put('/api/clientes/:id', clienteController.atualizarCliente);
app.delete('/api/clientes/:id', clienteController.deletarCliente);
app.get('/api/clientes/busca/nome/:nome', clienteController.buscarClientePorNome);
app.get('/api/clientes/busca/email/:email', clienteController.buscarClientePorEmail);

describe('ClienteController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/clientes', () => {
    test('deve retornar lista de clientes com status 200', async () => {
      const clientesMock = [
        { _id: '1', nome: 'João Silva', email: 'joao@email.com' },
        { _id: '2', nome: 'Maria Santos', email: 'maria@email.com' },
      ];

      ClienteService.listarClientes.mockResolvedValue(clientesMock);

      const response = await request(app).get('/api/clientes');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(clientesMock);
      expect(ClienteService.listarClientes).toHaveBeenCalled();
    });

    test('deve retornar 500 em caso de erro interno', async () => {
      ClienteService.listarClientes.mockRejectedValue(new Error('Erro interno'));

      const response = await request(app).get('/api/clientes');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Erro interno do servidor',
        message: 'Erro interno',
      });
    });
  });

  describe('GET /api/clientes/:id', () => {
    test('deve retornar cliente específico com status 200', async () => {
      const clienteMock = { _id: '123', nome: 'João Silva', email: 'joao@email.com' };

      ClienteService.buscarClientePorId.mockResolvedValue(clienteMock);

      const response = await request(app).get('/api/clientes/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(clienteMock);
      expect(ClienteService.buscarClientePorId).toHaveBeenCalledWith('123');
    });

    test('deve retornar 404 quando cliente não encontrado', async () => {
      ClienteService.buscarClientePorId.mockResolvedValue(null);

      const response = await request(app).get('/api/clientes/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Cliente não encontrado',
        message: 'Cliente com ID 999 não foi encontrado',
      });
    });

    test('deve retornar 500 em caso de erro interno', async () => {
      ClienteService.buscarClientePorId.mockRejectedValue(new Error('Erro interno'));

      const response = await request(app).get('/api/clientes/123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Erro interno do servidor',
        message: 'Erro interno',
      });
    });
  });

  describe('GET /api/clientes/admin/:id', () => {
    test('deve retornar cliente administrativo com status inativo', async () => {
      const clienteMock = {
        _id: '123',
        nome: 'João Silva',
        email: 'joao@email.com',
        status: 'inativo',
        deletedAt: new Date(),
      };

      ClienteService.buscarClientePorIdAdmin.mockResolvedValue(clienteMock);

      const response = await request(app).get('/api/clientes/admin/123');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: '123',
        nome: 'João Silva',
        email: 'joao@email.com',
        status: 'inativo',
      });
      expect(typeof response.body.deletedAt).toBe('string');
      expect(ClienteService.buscarClientePorIdAdmin).toHaveBeenCalledWith('123');
    });

    test('deve retornar 404 quando cliente administrativo não for encontrado', async () => {
      ClienteService.buscarClientePorIdAdmin.mockResolvedValue(null);

      const response = await request(app).get('/api/clientes/admin/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Cliente não encontrado',
        message: 'Cliente administrativo com ID 999 não foi encontrado',
      });
    });
  });

  describe('POST /api/clientes', () => {
    test('deve criar cliente com dados válidos e retornar status 201', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua das Flores, 123, São Paulo - SP',
      };

      const clienteCriado = {
        ...clienteData,
        _id: 'mockId',
        status: 'ativo',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      ClienteService.criarCliente.mockResolvedValue(clienteCriado);

      const response = await request(app)
        .post('/api/clientes')
        .send(clienteData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        _id: 'mockId',
        nome: clienteData.nome,
        email: clienteData.email.toLowerCase(),
        telefone: clienteData.telefone,
        endereco: clienteData.endereco,
        status: 'ativo',
        deletedAt: null,
      });
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(ClienteService.criarCliente).toHaveBeenCalledWith(clienteData);
    });

    test('deve retornar 400 para dados inválidos', async () => {
      const clienteData = {
        nome: '',
        email: 'email-invalido',
      };

      ClienteService.criarCliente.mockRejectedValue(new Error('Dados inválidos'));

      const response = await request(app)
        .post('/api/clientes')
        .send(clienteData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Dados inválidos',
        message: 'Dados inválidos',
      });
    });

    test('deve retornar 409 para email duplicado', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua das Flores, 123',
      };

      ClienteService.criarCliente.mockRejectedValue(new Error('Email já cadastrado'));

      const response = await request(app)
        .post('/api/clientes')
        .send(clienteData);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        error: 'Conflito de dados',
        message: 'Email já cadastrado',
      });
    });

    test('deve reativar cliente deletado ao cadastrar com mesmo email', async () => {
      const clienteData = {
        nome: 'João Silva Renovado',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua das Flores, 123',
      };

      const clienteRestaurado = {
        _id: 'deletedId',
        ...clienteData,
        status: 'ativo',
        deletedAt: null,
        createdAt: new Date('2026-04-30T09:00:00.000Z'),
        updatedAt: new Date('2026-04-30T11:00:00.000Z'),
      };

      ClienteService.criarCliente.mockResolvedValue(clienteRestaurado);

      const response = await request(app)
        .post('/api/clientes')
        .send(clienteData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        _id: 'deletedId',
        nome: 'João Silva Renovado',
        email: 'joao@email.com',
        endereco: 'Rua das Flores, 123',
        telefone: '+55 11 99999-9999',
        status: 'ativo',
        deletedAt: null,
      });
      expect(typeof response.body.createdAt).toBe('string');
      expect(typeof response.body.updatedAt).toBe('string');
      expect(ClienteService.criarCliente).toHaveBeenCalledWith(clienteData);
    });
  });

  describe('PUT /api/clientes/:id', () => {
    test('deve atualizar cliente e retornar status 200', async () => {
      const dadosAtualizacao = {
        nome: 'João Silva Santos',
        telefone: '+55 11 99999-0000',
      };

      const clienteAtualizado = {
        _id: '123',
        nome: 'João Silva Santos',
        email: 'joao@email.com',
        telefone: '+55 11 99999-0000',
        endereco: 'Rua das Flores, 123',
        updatedAt: new Date(),
      };

      ClienteService.atualizarCliente.mockResolvedValue(clienteAtualizado);

      const response = await request(app)
        .put('/api/clientes/123')
        .send(dadosAtualizacao);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: '123',
        nome: 'João Silva Santos',
        email: 'joao@email.com',
        telefone: '+55 11 99999-0000',
        endereco: 'Rua das Flores, 123',
      });
      expect(response.body.updatedAt).toBeDefined();
      expect(ClienteService.atualizarCliente).toHaveBeenCalledWith('123', dadosAtualizacao);
    });

    test('deve retornar 404 quando cliente não encontrado', async () => {
      ClienteService.atualizarCliente.mockRejectedValue(new Error('Cliente não encontrado'));

      const response = await request(app)
        .put('/api/clientes/999')
        .send({ nome: 'Novo Nome' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Cliente não encontrado',
        message: 'Cliente não encontrado',
      });
    });
  });

  describe('DELETE /api/clientes/:id', () => {
    test('deve deletar cliente e retornar status 200', async () => {
      const clienteDeletado = {
        _id: '123',
        nome: 'João Silva',
        deletedAt: new Date(),
      };

      ClienteService.deletarCliente.mockResolvedValue(clienteDeletado);

      const response = await request(app).delete('/api/clientes/123');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: '123',
        nome: 'João Silva',
      });
      expect(response.body.deletedAt).toBeDefined();
      expect(ClienteService.deletarCliente).toHaveBeenCalledWith('123');
    });

    test('deve retornar 404 quando cliente não encontrado', async () => {
      ClienteService.deletarCliente.mockRejectedValue(new Error('Cliente não encontrado'));

      const response = await request(app).delete('/api/clientes/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Cliente não encontrado',
        message: 'Cliente não encontrado',
      });
    });
  });

  describe('GET /api/clientes/busca/nome/:nome', () => {
    test('deve buscar clientes por nome e retornar status 200', async () => {
      const clientesMock = [
        { _id: '1', nome: 'João Silva', email: 'joao@email.com' },
        { _id: '2', nome: 'Maria Silva', email: 'maria@email.com' },
      ];

      ClienteService.buscarClientePorNome.mockResolvedValue(clientesMock);

      const response = await request(app).get('/api/clientes/busca/nome/silva');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(clientesMock);
      expect(ClienteService.buscarClientePorNome).toHaveBeenCalledWith('silva');
    });
  });

  describe('GET /api/clientes/busca/email/:email', () => {
    test('deve buscar cliente por email e retornar status 200', async () => {
      const clienteMock = { _id: '123', nome: 'João Silva', email: 'joao@email.com' };

      ClienteService.buscarClientePorEmail.mockResolvedValue(clienteMock);

      const response = await request(app).get('/api/clientes/busca/email/joao@email.com');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(clienteMock);
      expect(ClienteService.buscarClientePorEmail).toHaveBeenCalledWith('joao@email.com');
    });

    test('deve retornar 404 quando email não encontrado', async () => {
      ClienteService.buscarClientePorEmail.mockResolvedValue(null);

      const response = await request(app).get('/api/clientes/busca/email/nao.existe@email.com');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Cliente não encontrado',
        message: 'Cliente com email nao.existe@email.com não foi encontrado',
      });
    });
  });
});