const Cliente = require('../../src/models/clienteModel');

describe('Cliente Model - Validações de Schema', () => {
  describe('Validação de campos obrigatórios', () => {
    test('deve validar que nome é obrigatório', () => {
      const cliente = new Cliente({
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.nome).toBeDefined();
      expect(validationError.errors.nome.message).toContain('Nome é obrigatório');
    });

    test('deve validar que email é obrigatório', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.email).toBeDefined();
      expect(validationError.errors.email.message).toContain('Email é obrigatório');
    });

    test('deve validar que telefone é obrigatório', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.telefone).toBeDefined();
      expect(validationError.errors.telefone.message).toContain('Telefone é obrigatório');
    });

    test('deve validar que endereco é obrigatório', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.endereco).toBeDefined();
      expect(validationError.errors.endereco.message).toContain('Endereço é obrigatório');
    });
  });

  describe('Validação de formato de email', () => {
    test('deve aceitar email válido', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError).toBeUndefined();
    });

    test('deve rejeitar email inválido', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'email-invalido',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.email).toBeDefined();
      expect(validationError.errors.email.message).toContain('Email deve ter formato válido');
    });

    test('deve converter email para lowercase', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'JoAo.SiLvA@EmAiL.CoM',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      expect(cliente.email).toBe('joao.silva@email.com');
    });
  });

  describe('Validação de limites de tamanho', () => {
    test('deve rejeitar nome com mais de 100 caracteres', () => {
      const nomeLongo = 'a'.repeat(101);
      const cliente = new Cliente({
        nome: nomeLongo,
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.nome).toBeDefined();
      expect(validationError.errors.nome.message).toContain('Nome deve ter no máximo 100 caracteres');
    });

    test('deve aceitar nome com exatamente 100 caracteres', () => {
      const nomeLimite = 'a'.repeat(100);
      const cliente = new Cliente({
        nome: nomeLimite,
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError).toBeUndefined();
    });

    test('deve rejeitar email com mais de 255 caracteres', () => {
      const emailLongo = 'a'.repeat(246) + '@email.com'; // 256 chars total
      const cliente = new Cliente({
        nome: 'João Silva',
        email: emailLongo,
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.email).toBeDefined();
      expect(validationError.errors.email.message).toContain('Email deve ter no máximo 255 caracteres');
    });

    test('deve rejeitar telefone com mais de 20 caracteres', () => {
      const telefoneLongo = '+55 11 99999-9999-9999'; // 21 chars
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: telefoneLongo,
        endereco: 'Rua Teste, 123',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.telefone).toBeDefined();
      expect(validationError.errors.telefone.message).toContain('Telefone deve ter no máximo 20 caracteres');
    });

    test('deve rejeitar endereco com mais de 200 caracteres', () => {
      const enderecoLongo = 'Rua '.repeat(51); // 204 chars
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: enderecoLongo,
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.endereco).toBeDefined();
      expect(validationError.errors.endereco.message).toContain('Endereço deve ter no máximo 200 caracteres');
    });
  });

  describe('Validação de status', () => {
    test('deve definir status padrão como ativo', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      expect(cliente.status).toBe('ativo');
    });

    test('deve aceitar status válido', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
        status: 'inativo',
      });

      const validationError = cliente.validateSync();

      expect(validationError).toBeUndefined();
      expect(cliente.status).toBe('inativo');
    });

    test('deve aceitar status bloqueado', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
        status: 'bloqueado',
      });

      const validationError = cliente.validateSync();

      expect(validationError).toBeUndefined();
      expect(cliente.status).toBe('bloqueado');
    });

    test('deve rejeitar status inválido', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
        status: 'pendente',
      });

      const validationError = cliente.validateSync();

      expect(validationError.errors.status).toBeDefined();
      expect(validationError.errors.status.message).toContain('Status deve ser: ativo, inativo ou bloqueado');
    });
  });

  describe('Campos de auditoria', () => {
    test('deve ter campo deletedAt inicializado como null', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      expect(cliente.deletedAt).toBeNull();
    });

    test('deve ter timestamps habilitados', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      // Verificar se o schema tem timestamps
      const schema = Cliente.schema;
      expect(schema.options.timestamps).toBe(true);
    });
  });

  describe('Trim de strings', () => {
    test('deve remover espaços em branco do nome', () => {
      const cliente = new Cliente({
        nome: '  João Silva  ',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      expect(cliente.nome).toBe('João Silva');
    });

    test('deve remover espaços em branco do email', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: '  joao@email.com  ',
        telefone: '+55 11 99999-9999',
        endereco: 'Rua Teste, 123',
      });

      expect(cliente.email).toBe('joao@email.com');
    });

    test('deve remover espaços em branco do telefone', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '  +55 11 99999-9999  ',
        endereco: 'Rua Teste, 123',
      });

      expect(cliente.telefone).toBe('+55 11 99999-9999');
    });

    test('deve remover espaços em branco do endereco', () => {
      const cliente = new Cliente({
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '+55 11 99999-9999',
        endereco: '  Rua Teste, 123  ',
      });

      expect(cliente.endereco).toBe('Rua Teste, 123');
    });
  });

  describe('Índices', () => {
    test('deve ter índice único no email', () => {
      const schema = Cliente.schema;
      const emailIndex = schema.indexes().find(([fields]) =>
        fields.email === 1 && Object.keys(fields).length === 1
      );

      expect(emailIndex).toBeDefined();
      expect(emailIndex[0]).toEqual({ email: 1 });
      expect(emailIndex[1]).toEqual({ unique: true });
    });

    test('deve ter índice composto para busca por nome e email', () => {
      const schema = Cliente.schema;
      const nameEmailIndex = schema.indexes().find(([fields]) =>
        fields.nome === 1 && fields.email === 1
      );

      expect(nameEmailIndex).toBeDefined();
      expect(nameEmailIndex[0]).toEqual({ nome: 1, email: 1 });
    });
  });
});