import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerApp = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Yatec Test API',
      version: '1.0.0',
      description: 'API Docs',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        jwtAuth: [],
      },
    ],
  },
  apis: ['./src/controllers/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerApp;
