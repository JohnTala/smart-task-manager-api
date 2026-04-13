const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { validationRulesCategory, validateCategory } = require('../middleware/validateCategory');
const isAuthenticated=require('../middleware/isAuthenticated');
const logger = require('../utils/logger');

// Log when routes are loaded
logger.info('Category routes initialized');


// Get all categories
router.get('/', categoryController.getAllCategories); 
/* #swagger.tags = ['Categories']
   #swagger.summary = 'Retrieve all categories'
*/

// Create a new category
router.post('/',isAuthenticated, validationRulesCategory, validateCategory, categoryController.createCategory);
/* #swagger.tags = ['Categories']
   #swagger.summary = 'Create a new category'
*/

// Get a single category by ID
router.get('/:id', categoryController.getSingleCategory);
/* #swagger.tags = ['Categories']
   #swagger.summary = 'Get a category by ID'
*/

// Update a category by ID
router.put('/:id',isAuthenticated, validationRulesCategory, validateCategory, categoryController.updateCategory);
/* #swagger.tags = ['Categories']
   #swagger.summary = 'Update a category by ID'
*/

// Delete a category by ID
router.delete('/:id',isAuthenticated, categoryController.deleteCategory);
/* #swagger.tags = ['Categories']
   #swagger.summary = 'Delete a category by ID'
*/

module.exports = router;
