const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome deve ter no máximo 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [255, 'Email deve ter no máximo 255 caracteres'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email deve ter formato válido'],
    },
    telefone: {
      type: String,
      required: [true, 'Telefone é obrigatório'],
      trim: true,
      maxlength: [20, 'Telefone deve ter no máximo 20 caracteres'],
    },
    endereco: {
      type: String,
      required: [true, 'Endereço é obrigatório'],
      trim: true,
      maxlength: [500, 'Endereço deve ter no máximo 500 caracteres'],
    },
    status: {
      type: String,
      enum: {
        values: ['ativo', 'inativo', 'bloqueado'],
        message: 'Status deve ser: ativo, inativo ou bloqueado',
      },
      default: 'ativo',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Índice composto para busca por nome e email
clienteSchema.index({ nome: 1, email: 1 });

// Método para soft delete
clienteSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

// Método para restaurar cliente deletado
clienteSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

// Método estático para buscar apenas clientes não deletados
clienteSchema.statics.findActive = function () {
  return this.find({ deletedAt: null });
};

// Método estático para buscar por nome (parcial)
clienteSchema.statics.findByNome = function (nome) {
  return this.find({
    nome: { $regex: nome, $options: 'i' },
    deletedAt: null,
  });
};

// Método estático para buscar por email exato
clienteSchema.statics.findByEmail = function (email) {
  return this.findOne({
    email: email.toLowerCase(),
    deletedAt: null,
  });
};

module.exports = mongoose.model('Cliente', clienteSchema);
