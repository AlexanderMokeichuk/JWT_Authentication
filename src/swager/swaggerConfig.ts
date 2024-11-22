module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My TypeScript API',
      version: '1.0.0',
      description: 'API documentation for my TypeScript project',
    },
  },
  apis: ['./src/routes/*.ts'],
};
