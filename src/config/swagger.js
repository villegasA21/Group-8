const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Group-8 API',
      version: '1.0.0',
      description: 'API documentation for the Group-8 backend application.',
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        description: 'Local server',
        variables: {
          port: {
            default: process.env.PORT || '3000',
          },
        },
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token here.',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: 'HttpOnly cookie containing the refresh token.',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            created_at: { type: 'string', format: 'date-time', example: '2023-10-27T10:00:00Z' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Invalid input data' },
          },
        },
      },
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
  // Expose the raw spec as JSON
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

module.exports = setupSwagger;