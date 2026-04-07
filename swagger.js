const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 

// Dynamic host injection
swaggerDocument.host =
  process.env.NODE_ENV === 'production'
    ? 'books-contacts-api.onrender.com'
    : 'localhost:3500'; 

// Swagger UI options
const options = {
  customSiteTitle: 'Smart-manager API Docs',
  swaggerOptions: {
    docExpansion: 'none',
    defaultModelsExpandDepth: -1,
  },
  customCss: '.swagger-ui .topbar { display: none }',
};

// Serve Swagger UI
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;
