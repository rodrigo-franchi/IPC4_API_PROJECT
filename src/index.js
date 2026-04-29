const express = require('express');
const mongoose = require('mongoose');
const clienteRoutes = require('./routes/clienteRoutes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging de requisições
app.use((req, res, next) => {
  const start = Date.now();

  // Log da requisição
  logger.info('Requisição recebida', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.method !== 'GET' ? req.body : undefined
  });

  // Interceptar resposta para log
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - start;

    logger.info('Resposta enviada', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseSize: Buffer.isBuffer(data) ? data.length : (data ? data.length : 0)
    });

    originalSend.call(this, data);
  };

  next();
});

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clientes_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('✅ Conectado ao MongoDB', {
      database: 'clientes_db',
      host: process.env.MONGODB_URI || 'localhost:27017'
    });
  })
  .catch(error => {
    logger.error('❌ Erro ao conectar ao MongoDB', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  });

// Rotas
app.use('/api/clientes', clienteRoutes);

// Rota de saúde da API
app.get('/health', (req, res) => {
  logger.info('Health check solicitado');
  res.status(200).json({
    status: 'OK',
    message: 'API de Clientes funcionando',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Rota raiz
app.get('/', (req, res) => {
  logger.info('Página inicial acessada');
  res.status(200).json({
    message: 'API CRUD de Clientes',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      health: '/health',
      docs: '/docs/api.md'
    },
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  logger.error('Erro não tratado capturado', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body
  });

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado',
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  logger.warn('Rota não encontrada acessada', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });

  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe nesta API`,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  logger.info('🚀 Servidor iniciado com sucesso', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });

  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}`);
  console.log(`📊 Health check em http://localhost:${PORT}/health`);
});

module.exports = app;
