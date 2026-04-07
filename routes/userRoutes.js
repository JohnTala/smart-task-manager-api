const router = require('express').Router();
const userController = require('../controllers/userController');
const { validationRulesUser, validateUser } = require('../middleware/validateUser');
const logger = require('../utils/logger');

// Log when routes are loaded
logger.info('User routes initialized');

// Get all users
router.get('/', userController.getAllUsers);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Retrieve all users'
*/

// Create a new user
router.post('/', validationRulesUser, validateUser, userController.createUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Create a new user'
*/

// Get a single user by ID
router.get('/:id', userController.getUserById);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Get a user by ID'
*/

// Update a user by ID
router.put('/:id', validationRulesUser, validateUser, userController.updateUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Update a user by ID'
*/

// Delete a user by ID
router.delete('/:id', userController.deleteUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Delete a user by ID'
*/

module.exports = router;
