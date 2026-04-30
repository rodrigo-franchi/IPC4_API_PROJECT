const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
      maxlength: [100, 'Nome deve ter no máximo 100 caracteres'],
      match: [/^[A-Za-zÀ-ú'\- ]+$/, 'Nome deve conter apenas letras, espaços, apóstrofos ou hífens'],
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
      match: [/^\+?\d{2,3} ?\d{2} ?\d{4,5}-?\d{4}$/, 'Telefone deve seguir o formato internacional +55 11 99999-9999'],
    },
    endereco: {
      type: String,
      required: [true, 'Endereço é obrigatório'],
      trim: true,
      maxlength: [200, 'Endereço deve ter no máximo 200 caracteres'],
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
  this.status = 'inativo';
  this.deletedAt = new Date();
  return this.save();
};

// Método para restaurar cliente deletado
clienteSchema.methods.restore = function () {
  this.status = 'ativo';
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
