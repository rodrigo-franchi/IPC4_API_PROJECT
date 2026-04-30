const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

// GET /api/clientes - Listar todos os clientes ativos
router.get('/', clienteController.listarClientes);

// GET /api/clientes/admin/:id - Buscar cliente por ID para administração
router.get('/admin/:id', clienteController.buscarClientePorIdAdmin);

// GET /api/clientes/:id - Buscar cliente por ID
router.get('/:id', clienteController.buscarClientePorId);

// POST /api/clientes - Criar novo cliente
router.post('/', clienteController.criarCliente);

// PUT /api/clientes/:id - Atualizar cliente
router.put('/:id', clienteController.atualizarCliente);

// DELETE /api/clientes/:id - Deletar cliente (soft delete)
router.delete('/:id', clienteController.deletarCliente);

// GET /api/clientes/busca/nome/:nome - Buscar por nome
router.get('/busca/nome/:nome', clienteController.buscarClientePorNome);

// GET /api/clientes/busca/email/:email - Buscar por email
router.get('/busca/email/:email', clienteController.buscarClientePorEmail);

module.exports = router;
