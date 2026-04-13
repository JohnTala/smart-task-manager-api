const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser } = require('../controllers/userController');
const { validationRulesUsers, validateUser } = require('../middleware/validateUser');
const isAuthenticated=require('../middleware/isAuthenticated');
const logger = require('../utils/logger');

// Log when routes are loaded
logger.info('User routes initialized');

// Get all users
router.get('/', getAllUsers);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Retrieve all users'
*/

// Create a new user
router.post('/',isAuthenticated, validationRulesUsers, validateUser, createUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Create a new user'
*/

// Get a single user by ID
router.get('/:id', getSingleUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Get a user by ID'
*/

// Update a user by ID
router.put('/:id',isAuthenticated, validationRulesUsers, validateUser, updateUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Update a user by ID'
*/

// Delete a user by ID
router.delete('/:id',isAuthenticated, deleteUser);
/* #swagger.tags = ['Users']
   #swagger.summary = 'Delete a user by ID'
*/

module.exports = router;
