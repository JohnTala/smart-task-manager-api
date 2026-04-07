const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 

// Swagger UI options
const options = {
  customSiteTitle: 'Smart Task Manager API Docs',
  swaggerOptions: {
    docExpansion: 'none',
    defaultModelsExpandDepth: -1,
  },
  customCss: '.swagger-ui .topbar { display: none }',
};

// Serve Swagger UI
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;
