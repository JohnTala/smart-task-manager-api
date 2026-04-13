const router = require('express').Router();
const commentController = require('../controllers/commentController');
const { validationRulesComment, validateComment } = require('../middleware/validateComment');
const isAuthenticated=require('../middleware/isAuthenticated');
const logger = require('../utils/logger');

// Log when routes are loaded
logger.info('Comment routes initialized');

// Get all comments
router.get('/', commentController.getAllComments);
/* #swagger.tags = ['Comments']
   #swagger.summary = 'Retrieve all comments'
*/

// Create a new comment
router.post('/',isAuthenticated, validationRulesComment, validateComment, commentController.createComment);
/* #swagger.tags = ['Comments']
   #swagger.summary = 'Create a new comment'
*/

// Get a single comment by ID
router.get('/:id', commentController.getSingleComment);
/* #swagger.tags = ['Comments']
   #swagger.summary = 'Get a comment by ID'
*/

// Update a comment by ID
router.put('/:id',isAuthenticated, validationRulesComment, validateComment, commentController.updateComment);
/* #swagger.tags = ['Comments']
   #swagger.summary = 'Update a comment by ID'
*/

// Delete a comment by ID
router.delete('/:id',isAuthenticated, commentController.deleteComment);
/* #swagger.tags = ['Comments']
   #swagger.summary = 'Delete a comment by ID'
*/

module.exports = router;
