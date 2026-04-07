const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { validationRulesTask, validateTask } = require('../middleware/validateTask');
const logger = require('../utils/logger');

// Log when routes are loaded
logger.info('Task routes initialized');

// Get all tasks
router.get('/', taskController.getAllTasks); 
/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Retrieve all tasks'
*/

// Create a new task
router.post('/', validationRulesTask, validateTask, taskController.createTask);
/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Create a new task'
*/

// Get a single task by ID
router.get('/:id', taskController.getSingleTask);
/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Get a task by ID'
*/

// Update a task by ID
router.put('/:id', validationRulesTask, validateTask, taskController.updateTask);
/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Update a task by ID'
*/

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);
/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Delete a task by ID'
*/

module.exports = router;
