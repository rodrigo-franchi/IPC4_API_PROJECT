const ClienteService = require('../../src/services/clienteService');

// Mock do modelo Cliente
jest.mock('../../src/models/clienteModel');

const Cliente = require('../../src/models/clienteModel');

describe('ClienteService', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe('criarCliente', () => {
    test('deve criar cliente com dados válidos', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua das Flores, 123, São Paulo - SP',
      };

      const clienteMock = {
        ...clienteData,
        _id: 'mockId',
        status: 'ativo',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        save: jest.fn().mockResolvedValue({
          ...clienteData,
          _id: 'mockId',
          status: 'ativo',
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };

      Cliente.findByEmail.mockResolvedValue(null);
      Cliente.mockImplementation(() => clienteMock);

      const cliente = await ClienteService.criarCliente(clienteData);

      expect(Cliente.findByEmail).toHaveBeenCalledWith(clienteData.email);
      expect(clienteMock.save).toHaveBeenCalled();
      expect(cliente._id).toBe('mockId');
      expect(cliente.nome).toBe(clienteData.nome);
      expect(cliente.email).toBe(clienteData.email.toLowerCase());
      expect(cliente.status).toBe('ativo');
      expect(cliente.deletedAt).toBeNull();
    });

    test('deve lançar erro ao tentar criar cliente com email duplicado', async () => {
      const clienteData = {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua das Flores, 123, São Paulo - SP',
      };

      Cliente.findByEmail.mockResolvedValue({ _id: 'existingId' });

      await expect(ClienteService.criarCliente(clienteData))
        .rejects.toThrow('Email já cadastrado');

      expect(Cliente.findByEmail).toHaveBeenCalledWith(clienteData.email);
    });
  });

  describe('listarClientes', () => {
    test('deve retornar todos os clientes ativos', async () => {
      const clientesMock = [
        { nome: 'João Silva', email: 'joao@email.com' },
        { nome: 'Maria Santos', email: 'maria@email.com' },
      ];

      Cliente.findActive.mockResolvedValue(clientesMock);

      const clientes = await ClienteService.listarClientes();

      expect(Cliente.findActive).toHaveBeenCalled();
      expect(clientes).toEqual(clientesMock);
    });
  });

  describe('buscarClientePorId', () => {
    test('deve retornar cliente pelo ID', async () => {
      const clienteMock = { _id: '123', nome: 'João Silva' };

      Cliente.findOne.mockResolvedValue(clienteMock);

      const cliente = await ClienteService.buscarClientePorId('123');

      expect(Cliente.findOne).toHaveBeenCalledWith({
        _id: '123',
        deletedAt: null,
      });
      expect(cliente).toEqual(clienteMock);
    });

    test('deve retornar null para ID inexistente', async () => {
      Cliente.findOne.mockResolvedValue(null);

      const cliente = await ClienteService.buscarClientePorId('inexistente');

      expect(cliente).toBeNull();
    });
  });

  describe('buscarClientePorIdAdmin', () => {
    test('deve buscar cliente por ID administrativo incluindo inativo', async () => {
      const clienteMock = {
        _id: '123',
        nome: 'João Silva',
        status: 'inativo',
        deletedAt: new Date(),
      };

      Cliente.findOne.mockResolvedValue(clienteMock);

      const cliente = await ClienteService.buscarClientePorIdAdmin('123');

      expect(Cliente.findOne).toHaveBeenCalledWith({ _id: '123' });
      expect(cliente).toEqual(clienteMock);
    });
  });

  describe('atualizarCliente', () => {
    test('deve atualizar dados do cliente', async () => {
      const clienteExistente = {
        _id: '123',
        nome: 'João Silva',
        email: 'joao@email.com',
        updatedAt: new Date('2023-01-01'),
      };

      const dadosAtualizacao = {
        nome: 'João Silva Santos',
        telefone: '+55 11 99999-0000',
      };

      const clienteAtualizado = {
        ...clienteExistente,
        ...dadosAtualizacao,
        updatedAt: new Date(),
      };

      ClienteService.buscarClientePorId = jest.fn().mockResolvedValue(clienteExistente);
      Cliente.findByEmail.mockResolvedValue(null);
      Cliente.findByIdAndUpdate.mockResolvedValue(clienteAtualizado);

      const resultado = await ClienteService.atualizarCliente('123', dadosAtualizacao);

      expect(ClienteService.buscarClientePorId).toHaveBeenCalledWith('123');
      expect(Cliente.findByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        { ...dadosAtualizacao, updatedAt: expect.any(Date) },
        { new: true, runValidators: true }
      );
      expect(resultado).toEqual(clienteAtualizado);
    });

    test('deve lançar erro para ID inexistente', async () => {
      ClienteService.buscarClientePorId = jest.fn().mockResolvedValue(null);

      await expect(
        ClienteService.atualizarCliente('inexistente', { nome: 'Novo Nome' })
      ).rejects.toThrow('Cliente não encontrado');
    });
  });

  describe('deletarCliente', () => {
    test('deve fazer soft delete do cliente', async () => {
      const clienteMock = {
        _id: '123',
        nome: 'João Silva',
        softDelete: jest.fn().mockResolvedValue({
          _id: '123',
          deletedAt: new Date(),
        }),
      };

      ClienteService.buscarClientePorId = jest.fn().mockResolvedValue(clienteMock);

      const resultado = await ClienteService.deletarCliente('123');

      expect(ClienteService.buscarClientePorId).toHaveBeenCalledWith('123');
      expect(clienteMock.softDelete).toHaveBeenCalled();
      expect(resultado.deletedAt).toBeInstanceOf(Date);
    });

    test('deve lançar erro para ID inexistente', async () => {
      ClienteService.buscarClientePorId = jest.fn().mockResolvedValue(null);

      await expect(ClienteService.deletarCliente('inexistente'))
        .rejects.toThrow('Cliente não encontrado');
    });
  });

  describe('buscarClientePorNome', () => {
    test('deve buscar clientes por nome parcial', async () => {
      const clientesMock = [
        { nome: 'João Silva', email: 'joao@email.com' },
        { nome: 'Maria Silva', email: 'maria@email.com' },
      ];

      Cliente.findByNome.mockResolvedValue(clientesMock);

      const resultados = await ClienteService.buscarClientePorNome('silva');

      expect(Cliente.findByNome).toHaveBeenCalledWith('silva');
      expect(resultados).toEqual(clientesMock);
    });
  });

  describe('buscarClientePorEmail', () => {
    test('deve buscar cliente por email exato', async () => {
      const clienteMock = { _id: '123', nome: 'João Silva', email: 'joao@email.com' };

      Cliente.findByEmail.mockResolvedValue(clienteMock);

      const cliente = await ClienteService.buscarClientePorEmail('joao@email.com');

      expect(Cliente.findByEmail).toHaveBeenCalledWith('joao@email.com');
      expect(cliente).toEqual(clienteMock);
    });

    test('deve retornar null para email não encontrado', async () => {
      Cliente.findByEmail.mockResolvedValue(null);

      const cliente = await ClienteService.buscarClientePorEmail('nao.existe@email.com');

      expect(cliente).toBeNull();
    });
  });
});