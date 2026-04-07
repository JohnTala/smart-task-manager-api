const router=require('express').Router();
const taskController=require('../controllers/taskController');
const {validationRulesUsers, validateUser}=require('../middleware/validateTask')
const logger=require('../utils/logger')

// Log when routes are loaded
logger.info('User routes initialized');

router.get('/',taskController.getAllTasks)
router.post('/',validationRulesUsers, validateUser,taskController.createTask)
router.get('/:id',taskController.getSingleTask)
router.put('/:id',validationRulesUsers, validateUser,taskController.updateTask)
router.delete('/:id',taskController.deleteTask)

module.exports=router;