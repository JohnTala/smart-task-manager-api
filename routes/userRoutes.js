const router=require('express').Router();
const userController=require('../controllers/userController');
const logger=require('../utils/logger')
const {validationRulesUsers, validateUser}=require('../middleware/validateUser')

// Log when routes are loaded
logger.info('User routes initialized');

router.get('/',userController.getAllUsers)
router.post('/',validationRulesUsers, validateUser,userController.createUser)
router.get('/:id',userController.getSingleUser)
router.put('/:id',validationRulesUsers, validateUser,userController.updateUser)
router.delete('/:id',userController.deleteUser)

module.exports=router;