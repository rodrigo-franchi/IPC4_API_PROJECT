# Requisitos em BDD (Behavior Driven Development)

## Formato
Utilizamos o padrão Gherkin para documentar requisitos:
```
Funcionalidade: [Descrição da Funcionalidade]

  Cenário: [Descrição do Cenário]
    Dado [Estado inicial]
    Quando [Ação realizada]
    Então [Resultado esperado]
```

## Padrão de Nomenclatura
- Todos os nomes de campos, variáveis e propriedades seguem **camelCase**
- Exemplos de campos de cliente: `nome`, `email`, `telefone`, `endereco`, `dataCriacao`, `dataAtualizacao`
- Exemplos de funções: `validateEmail`, `createCustomer`, `updateCustomer`

---

## Funcionalidade 1: Criar um novo cliente

### Cenário 1.1: Criar cliente com todos os dados válidos
```gherkin
Funcionalidade: Criar um novo cliente

  Cenário: Criar cliente com todos os dados válidos
    Dado que a API está disponível
    E nenhum cliente com o email "cliente@example.com" existe
    Quando eu envio uma requisição POST para "/api/customers"
    E os dados são:
      | nome     | "João da Silva"      |
      | email    | "cliente@example.com" |
      | telefone | "11999999999"        |
      | endereco | "Rua A, 123"         |
    Então o status HTTP deve ser 201
    E a resposta deve conter o cliente criado com um ID gerado
    E o cliente deve estar armazenado no banco de dados
```

### Cenário 1.2: Tentar criar cliente com email inválido
```gherkin
  Cenário: Tentar criar cliente com email inválido
    Dado que a API está disponível
    Quando eu envio uma requisição POST para "/api/customers"
    E os dados são:
      | nome     | "João da Silva" |
      | email    | "email-invalido" |
      | telefone | "11999999999" |
      | endereco | "Rua A, 123" |
    Então o status HTTP deve ser 400
    E a resposta deve conter uma mensagem de erro sobre formato de email inválido
    E nenhum cliente deve ser criado
```

### Cenário 1.3: Tentar criar cliente sem campo obrigatório
```gherkin
  Cenário: Tentar criar cliente sem campo obrigatório (nome)
    Dado que a API está disponível
    Quando eu envio uma requisição POST para "/api/customers"
    E os dados estão faltando o campo "nome"
    E os outros dados são válidos
    Então o status HTTP deve ser 400
    E a resposta deve conter uma mensagem indicando que o campo "nome" é obrigatório
    E nenhum cliente deve ser criado
```

### Cenário 1.4: Tentar criar cliente com email duplicado
```gherkin
  Cenário: Tentar criar cliente com email já cadastrado
    Dado que um cliente com email "ja-existe@example.com" já existe
    Quando eu envio uma requisição POST para "/api/customers"
    E os dados são:
      | nome     | "Outro Cliente" |
      | email    | "ja-existe@example.com" |
      | telefone | "11999999999" |
      | endereco | "Rua B, 456" |
    Então o status HTTP deve ser 409
    E a resposta deve conter uma mensagem de erro sobre email duplicado
```

---

## Funcionalidade 2: Listar todos os clientes

### Cenário 2.1: Listar clientes quando existem clientes cadastrados
```gherkin
Funcionalidade: Listar todos os clientes

  Cenário: Listar clientes quando existem registros
    Dado que existem 3 clientes cadastrados no banco de dados
    Quando eu envio uma requisição GET para "/api/customers"
    Então o status HTTP deve ser 200
    E a resposta deve conter um array com 3 clientes
    E cada cliente deve conter os campos: id, nome, email, telefone, endereco
```

### Cenário 2.2: Listar clientes quando nenhum existe
```gherkin
  Cenário: Listar clientes quando nenhum está cadastrado
    Dado que nenhum cliente está cadastrado no banco de dados
    Quando eu envio uma requisição GET para "/api/customers"
    Então o status HTTP deve ser 200
    E a resposta deve conter um array vazio
```

---

## Funcionalidade 3: Obter cliente por ID

### Cenário 3.1: Obter cliente existente por ID
```gherkin
Funcionalidade: Obter cliente por ID

  Cenário: Obter cliente quando ele existe
    Dado que um cliente com ID "123" existe no banco de dados
    E seus dados são:
      | nome     | "Maria Silva"     |
      | email    | "maria@example.com" |
      | telefone | "11988888888"     |
      | endereco | "Avenida C, 789"  |
    Quando eu envio uma requisição GET para "/api/customers/123"
    Então o status HTTP deve ser 200
    E a resposta deve conter os dados do cliente
```

### Cenário 3.2: Tentar obter cliente inexistente
```gherkin
  Cenário: Tentar obter cliente que não existe
    Dado que nenhum cliente com ID "999" existe
    Quando eu envio uma requisição GET para "/api/customers/999"
    Então o status HTTP deve ser 404
    E a resposta deve conter uma mensagem de erro informando que o cliente não foi encontrado
```

### Cenário 3.3: Tentar obter cliente com ID inválido
```gherkin
  Cenário: Tentar obter cliente com ID em formato inválido
    Dado que a API está disponível
    Quando eu envio uma requisição GET para "/api/customers/id-invalido"
    Então o status HTTP deve ser 400
    E a resposta deve conter uma mensagem de erro sobre formato de ID inválido
```

---

## Funcionalidade 4: Atualizar cliente

### Cenário 4.1: Atualizar cliente com dados válidos
```gherkin
Funcionalidade: Atualizar cliente existente

  Cenário: Atualizar cliente com dados válidos
    Dado que um cliente com ID "123" existe
    Quando eu envio uma requisição PUT para "/api/customers/123"
    E os novos dados são:
      | nome     | "Maria Silva atualizado" |
      | email    | "maria-novo@example.com" |
      | telefone | "11987654321" |
      | endereco | "Avenida D, 999" |
    Então o status HTTP deve ser 200
    E a resposta deve conter o cliente atualizado
    E o banco de dados deve refletir as alterações
```

### Cenário 4.2: Tentar atualizar cliente com email duplicado
```gherkin
  Cenário: Tentar atualizar cliente para um email que já existe
    Dado que dois clientes existem: ID "123" e ID "456"
    E o cliente com ID "456" tem email "outro@example.com"
    Quando eu envio uma requisição PUT para "/api/customers/123"
    E o novo email é "outro@example.com"
    Então o status HTTP deve ser 409
    E a resposta deve conter uma mensagem de erro sobre email duplicado
    E o cliente com ID "123" não deve ser alterado
```

### Cenário 4.3: Tentar atualizar cliente inexistente
```gherkin
  Cenário: Tentar atualizar cliente que não existe
    Dado que nenhum cliente com ID "999" existe
    Quando eu envio uma requisição PUT para "/api/customers/999"
    E os dados para atualizar são válidos
    Então o status HTTP deve ser 404
    E a resposta deve conter uma mensagem de erro
```

---

## Funcionalidade 5: Deletar cliente

### Cenário 5.1: Deletar cliente existente
```gherkin
Funcionalidade: Deletar cliente

  Cenário: Deletar cliente que existe
    Dado que um cliente com ID "123" existe
    Quando eu envio uma requisição DELETE para "/api/customers/123"
    Então o status HTTP deve ser 204
    E o cliente deve ser removido do banco de dados
    E uma requisição subsequente para GET "/api/customers/123" deve retornar 404
```

### Cenário 5.2: Tentar deletar cliente inexistente
```gherkin
  Cenário: Tentar deletar cliente que não existe
    Dado que nenhum cliente com ID "999" existe
    Quando eu envio uma requisição DELETE para "/api/customers/999"
    Então o status HTTP deve ser 404
    E a resposta deve conter uma mensagem de erro
```

---

## Perguntas de clareza para o aluno

> **NOTA IMPORTANTE**: Antes de prosseguir com a implementação, a IA deve questionar os seguintes pontos:

1. **Validação de email**: Qual é o padrão de email aceito? Apenas RFC 5322 básico ou mais restritivo?

2. **Validação de telefone**: Qual formato de telefone é aceito? (ex: com máscara, apenas números, internacional?)

3. **Limite de caracteres**: Existem limites de tamanho para os campos (nome, email, etc.)?

4. **Paginação**: A funcionalidade de listar clientes deve incluir paginação? Se sim, qual tamanho de página?

5. **Ordenação**: A listagem de clientes deve permitir ordenação? Se sim, por quais campos?

6. **Soft delete vs Hard delete**: Ao deletar um cliente, deve ser exclusão permanente ou apenas marca como deletado?

7. **Busca**: Deve haver funcionalidade de busca/filtro de clientes por nome ou email?

8. **Timestamps**: Os clientes devem conter campos de data de criação e atualização?

9. **Status do cliente**: Há algum status a ser controlado (ativo/inativo)?

10. **Banco de dados**: Qual banco de dados usar inicialmente? (SQLite para desenvolvimento, PostgreSQL para produção?)

---

## Status do documento
- [x] Aprovado pelo aluno
- [x] Perguntas de clareza respondidas
- [x] Pronto para iniciar desenvolvimento com TDD

## Respostas das perguntas de clareza (29/04/2026)

1. **Validação de email**: Básico é suficiente (RFC 5322)
2. **Validação de telefone**: Internacional (+55 11 99999-9999)
3. **Limites de caracteres**: Sim, limites de validação de segurança, usar padrões de mercado
4. **Paginação**: Sem paginação
5. **Ordenação**: Por enquanto sem ordenação
6. **Soft delete vs Hard delete**: Soft delete
7. **Busca/Filtro**: Ambos (nome parcial + email exato)
8. **Timestamps**: Sim (createdAt, updatedAt)
9. **Status do cliente**: Sim, ativo, inativo e bloqueado
10. **Banco de dados**: MongoDB

---

## Funcionalidade 6: Soft Delete com Auditoria

### Cenário 6.1: Deletar cliente - Soft Delete
```gherkin
Funcionalidade: Deletar cliente com soft delete

  Cenário: Deletar cliente marca como inativo sem remover dados
    Dado que um cliente com ID "123" existe e está ativo
    Quando eu envio uma requisição DELETE para "/api/clientes/123"
    Então o status HTTP deve ser 200
    E o cliente deve ter status alterado para "inativo"
    E o campo deletedAt deve conter a data/hora da deleção
    E os dados originais (nome, email, etc) devem ser preservados
    E a requisição GET para "/api/clientes/123" deve retornar 404 (hidden do usuário)
    E a requisição GET para "/api/clientes/admin/123" deve retornar 200 com status "inativo"
```

### Cenário 6.2: Listar clientes - Exclui deletados automaticamente
```gherkin
  Cenário: Listar clientes não inclui deletados
    Dado que existem 3 clientes ativos e 2 deletados
    Quando eu envio uma requisição GET para "/api/clientes"
    Então o status HTTP deve ser 200
    E a resposta deve conter apenas 3 clientes (os ativos)
    E os clientes deletados não devem aparecer na lista
```

---

## Funcionalidade 7: Rota Administrativa para Auditoria

### Cenário 7.1: Buscar cliente deletado via rota admin
```gherkin
Funcionalidade: Rota administrativa para auditoria

  Cenário: Buscar cliente deletado através da rota admin
    Dado que um cliente foi marcado como deletado (inativo)
    E seu ID é "123"
    Quando eu envio uma requisição GET para "/api/clientes/admin/123"
    Então o status HTTP deve ser 200
    E a resposta deve conter o cliente com status "inativo"
    E o campo deletedAt deve conter a data da deleção
    E todos os dados originais devem estar preservados
```

### Cenário 7.2: Rota admin não encontra cliente inexistente
```gherkin
  Cenário: Tentar buscar cliente inexistente na rota admin
    Dado que nenhum cliente com ID "999" existe
    Quando eu envio uma requisição GET para "/api/clientes/admin/999"
    Então o status HTTP deve ser 404
    E a resposta deve conter mensagem de erro
```

---

## Funcionalidade 8: Reativação de Cliente via Email Duplicado

### Cenário 8.1: Reativar cliente deletado ao registrar com mesmo email
```gherkin
Funcionalidade: Reativação automática de cliente deletado

  Cenário: Registrar com email de cliente deletado reativa a conta
    Dado que um cliente com email "joao@email.com" foi deletado logicamente
    E seu ID é "123"
    E o cliente tem status "inativo" e deletedAt preenchido
    Quando eu envio uma requisição POST para "/api/clientes"
    Com os dados:
      | nome      | "João Silva Renovado" |
      | email     | "joao@email.com"      |
      | telefone  | "+55 11 98765-4321"   |
      | endereco  | "Nova Rua, 999"       |
    Então o status HTTP deve ser 201 (Created)
    E a resposta deve retornar o mesmo cliente (mesmo ID "123")
    E o status deve ser alterado para "ativo"
    E o campo deletedAt deve ser null
    E todos os dados devem estar atualizados com os novos valores
```

### Cenário 8.2: Email ativo impede reativação (conflito)
```gherkin
  Cenário: Não é possível reativar quando email ativo já existe
    Dado que dois clientes existem:
      | Cliente A | email "joao@email.com" | status "inativo" (deletado)  |
      | Cliente B | email "joao@email.com" | status "ativo" (duplicado!) |
    Quando eu envio uma requisição POST para "/api/clientes"
    Com email "joao@email.com" para reativar Cliente A
    Então o status HTTP deve ser 409 (Conflict)
    E a resposta deve conter erro "Email já cadastrado"
    E nenhum cliente deve ser modificado
```

### Cenário 8.3: Email único permite reativação
```gherkin
  Cenário: Email deletado pode ser reativado se não houver duplicado ativo
    Dado que um cliente com email "maria@email.com" foi deletado
    E nenhum cliente ativo possui esse email
    Quando eu envio uma requisição POST para "/api/clientes"
    Com email "maria@email.com"
    Então o status HTTP deve ser 201
    E o cliente deve ser reativado com todos os dados atualizados
```

---

## Status de Implementação (30/04/2026)

### ✅ Funcionalidades Implementadas e Testadas
- [x] CRUD Completo (Create, Read, Update, Delete)
- [x] Validações de Email (RFC 5322) e Telefone (Internacional)
- [x] Soft Delete com auditoria (status + deletedAt)
- [x] Rota Administrativa (/api/clientes/admin/:id)
- [x] Reativação automática via email duplicado
- [x] Listagem excluindo clientes deletados
- [x] Busca por nome (parcial) e email (exato)
- [x] Logging estruturado em JSON
- [x] 74 testes automatizados (100% passing)

### 📊 Cobertura de Testes
- **Testes Unitários**: 62 testes
  - Model: 24 testes (validações, soft delete, restore)
  - Service: 13 testes (CRUD + reativação)
  - Controller: 18 testes (HTTP handling + reativação)
  - Routes: 7 testes (registro de rotas)
- **Testes de Integração**: 12 testes (end-to-end)
- **Total**: 74 testes com 100% passing rate
