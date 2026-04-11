const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Ensure correct scheme + host for local vs production
const isProduction = process.env.NODE_ENV === 'production';

swaggerDocument.host = isProduction
  ? 'smart-task-manager-api-hfpn.onrender.com'
  : `localhost:${process.env.PORT || 3500}`;

swaggerDocument.schemes = isProduction ? ['https'] : ['http'];

// Swagger UI options
const options = {
  customSiteTitle: 'Smart Task Manager API Docs',
  swaggerOptions: {
    docExpansion: 'none',
    defaultModelsExpandDepth: -1,
    tryItOutEnabled: true
  },
  customCss: '.swagger-ui .topbar { display: none }'
};

// Serve Swagger UI
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;
