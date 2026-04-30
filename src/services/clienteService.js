const Cliente = require('../models/clienteModel');

class ClienteService {
  /**
   * Cria um novo cliente
   * @param {Object} clienteData - Dados do cliente
   * @returns {Promise<Object>} Cliente criado
   */
  static async criarCliente(clienteData) {
    try {
      // Verificar se email já existe
      const clienteExistente = await Cliente.findByEmail(clienteData.email);
      if (clienteExistente) {
        throw new Error('Email já cadastrado');
      }

      const cliente = new Cliente(clienteData);
      return await cliente.save();
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  }

  /**
   * Lista todos os clientes ativos (não deletados)
   * @returns {Promise<Array>} Lista de clientes
   */
  static async listarClientes() {
    return await Cliente.findActive();
  }

  /**
   * Busca cliente por ID (apenas ativos)
   * @param {string} id - ID do cliente
   * @returns {Promise<Object|null>} Cliente encontrado ou null
   */
  static async buscarClientePorId(id) {
    return await Cliente.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  static async buscarClientePorIdAdmin(id) {
    return await Cliente.findOne({ _id: id });
  }

  /**
   * Atualiza dados do cliente
   * @param {string} id - ID do cliente
   * @param {Object} dadosAtualizacao - Dados para atualizar
   * @returns {Promise<Object>} Cliente atualizado
   */
  static async atualizarCliente(id, dadosAtualizacao) {
    // Verificar se cliente existe e não está deletado
    const clienteExistente = await this.buscarClientePorId(id);
    if (!clienteExistente) {
      throw new Error('Cliente não encontrado');
    }

    // Se está atualizando email, verificar se já existe
    if (
      dadosAtualizacao.email &&
      dadosAtualizacao.email !== clienteExistente.email
    ) {
      const emailExistente = await Cliente.findByEmail(dadosAtualizacao.email);
      if (emailExistente) {
        throw new Error('Email já cadastrado');
      }
    }

    // Atualizar cliente
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      { ...dadosAtualizacao, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    return clienteAtualizado;
  }

  /**
   * Remove cliente (soft delete)
   * @param {string} id - ID do cliente
   * @returns {Promise<Object>} Cliente deletado
   */
  static async deletarCliente(id) {
    const cliente = await this.buscarClientePorId(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    return await cliente.softDelete();
  }

  /**
   * Busca clientes por nome (parcial, case insensitive)
   * @param {string} nome - Nome para buscar
   * @returns {Promise<Array>} Lista de clientes encontrados
   */
  static async buscarClientePorNome(nome) {
    return await Cliente.findByNome(nome);
  }

  /**
   * Busca cliente por email exato
   * @param {string} email - Email para buscar
   * @returns {Promise<Object|null>} Cliente encontrado ou null
   */
  static async buscarClientePorEmail(email) {
    return await Cliente.findByEmail(email);
  }

  /**
   * Remove cliente por email (soft delete)
   * @param {string} email - Email do cliente
   * @returns {Promise<Object>} Cliente deletado
   */
  static async deletarClientePorEmail(email) {
    const cliente = await this.buscarClientePorEmail(email);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    return await cliente.softDelete();
  }
}

module.exports = ClienteService;
