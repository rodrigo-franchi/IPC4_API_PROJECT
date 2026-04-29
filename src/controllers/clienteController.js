const ClienteService = require('../services/clienteService');
const logger = require('../utils/logger');

class ClienteController {
  // GET /api/clientes - Listar todos os clientes ativos
  async listarClientes(req, res) {
    try {
      const clientes = await ClienteService.listarClientes();
      logger.info('Clientes listados com sucesso', {
        count: clientes.length,
        endpoint: '/api/clientes'
      });
      res.status(200).json(clientes);
    } catch (error) {
      logger.error('Erro ao listar clientes', {
        error: error.message,
        stack: error.stack,
        endpoint: '/api/clientes'
      });
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }

  // GET /api/clientes/:id - Buscar cliente por ID
  async buscarClientePorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteService.buscarClientePorId(id);

      if (!cliente) {
        logger.warn('Cliente não encontrado por ID', {
          clienteId: id,
          endpoint: '/api/clientes/:id'
        });
        return res.status(404).json({
          error: 'Cliente não encontrado',
          message: `Cliente com ID ${id} não foi encontrado`,
        });
      }

      logger.info('Cliente encontrado por ID', {
        clienteId: id,
        clienteNome: cliente.nome,
        endpoint: '/api/clientes/:id'
      });
      res.status(200).json(cliente);
    } catch (error) {
      logger.error('Erro ao buscar cliente por ID', {
        error: error.message,
        stack: error.stack,
        clienteId: req.params.id,
        endpoint: '/api/clientes/:id'
      });
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }

  // POST /api/clientes - Criar novo cliente
  async criarCliente(req, res) {
    try {
      const clienteData = req.body;
      const cliente = await ClienteService.criarCliente(clienteData);

      logger.info('Cliente criado com sucesso', {
        clienteId: cliente._id,
        clienteNome: cliente.nome,
        clienteEmail: cliente.email,
        endpoint: '/api/clientes'
      });

      res.status(201).json(cliente);
    } catch (error) {
      logger.error('Erro ao criar cliente', {
        error: error.message,
        stack: error.stack,
        clienteData: req.body,
        endpoint: '/api/clientes'
      });

      // Tratamento específico de erros de negócio
      if (error.message === 'Email já cadastrado') {
        return res.status(409).json({
          error: 'Conflito de dados',
          message: error.message,
        });
      }

      // Erro de validação de dados
      if (
        error.message.includes('Dados inválidos') ||
        error.name === 'ValidationError'
      ) {
        return res.status(400).json({
          error: 'Dados inválidos',
          message: error.message,
        });
      }

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }

  // PUT /api/clientes/:id - Atualizar cliente
  async atualizarCliente(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizacao = req.body;
      const cliente = await ClienteService.atualizarCliente(
        id,
        dadosAtualizacao,
      );

      logger.info('Cliente atualizado com sucesso', {
        clienteId: id,
        clienteNome: cliente.nome,
        camposAtualizados: Object.keys(dadosAtualizacao),
        endpoint: '/api/clientes/:id'
      });

      res.status(200).json(cliente);
    } catch (error) {
      logger.error('Erro ao atualizar cliente', {
        error: error.message,
        stack: error.stack,
        clienteId: req.params.id,
        updateData: req.body,
        endpoint: '/api/clientes/:id'
      });

      if (error.message === 'Cliente não encontrado') {
        return res.status(404).json({
          error: 'Cliente não encontrado',
          message: error.message,
        });
      }

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }

  // DELETE /api/clientes/:id - Deletar cliente (soft delete)
  async deletarCliente(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteService.deletarCliente(id);

      logger.info('Cliente deletado com sucesso (soft delete)', {
        clienteId: id,
        clienteNome: cliente.nome,
        deletedAt: cliente.deletedAt,
        endpoint: '/api/clientes/:id'
      });

      res.status(200).json(cliente);
    } catch (error) {
      logger.error('Erro ao deletar cliente', {
        error: error.message,
        stack: error.stack,
        clienteId: req.params.id,
        endpoint: '/api/clientes/:id'
      });

      if (error.message === 'Cliente não encontrado') {
        return res.status(404).json({
          error: 'Cliente não encontrado',
          message: error.message,
        });
      }

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }

  // GET /api/clientes/busca/nome/:nome - Buscar por nome
  async buscarClientePorNome(req, res) {
    try {
      const { nome } = req.params;
      const clientes = await ClienteService.buscarClientePorNome(nome);

      logger.info('Busca de clientes por nome realizada', {
        termoBusca: nome,
        resultadosEncontrados: clientes.length,
        endpoint: '/api/clientes/busca/nome/:nome'
      });

      res.status(200).json(clientes);
    } catch (error) {
      logger.error('Erro ao buscar cliente por nome', {
        error: error.message,
        stack: error.stack,
        termoBusca: req.params.nome,
        endpoint: '/api/clientes/busca/nome/:nome'
      });

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }

  // GET /api/clientes/busca/email/:email - Buscar por email
  async buscarClientePorEmail(req, res) {
    try {
      const { email } = req.params;
      const cliente = await ClienteService.buscarClientePorEmail(email);

      if (!cliente) {
        logger.warn('Cliente não encontrado por email', {
          emailBuscado: email,
          endpoint: '/api/clientes/busca/email/:email'
        });
        return res.status(404).json({
          error: 'Cliente não encontrado',
          message: `Cliente com email ${email} não foi encontrado`,
        });
      }

      logger.info('Cliente encontrado por email', {
        emailBuscado: email,
        clienteId: cliente._id,
        clienteNome: cliente.nome,
        endpoint: '/api/clientes/busca/email/:email'
      });

      res.status(200).json(cliente);
    } catch (error) {
      logger.error('Erro ao buscar cliente por email', {
        error: error.message,
        stack: error.stack,
        emailBuscado: req.params.email,
        endpoint: '/api/clientes/busca/email/:email'
      });

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
      });
    }
  }
}

module.exports = new ClienteController();
