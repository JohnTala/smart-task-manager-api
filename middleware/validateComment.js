const { body, validationResult } = require('express-validator');

// Validation Rules for Comment
const validationRulesComment = [

  body('text')
    .notEmpty().withMessage('Comment text is required')
    .isLength({ min: 2 }).withMessage('Comment must be at least 2 characters long'),

  body('task')
    .notEmpty().withMessage('Task ID is required')
    .isMongoId().withMessage('Invalid Task ID'),

  body('user')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid User ID')

];

// Validation Error Handler
const validateComment = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};

module.exports = { validationRulesComment, validateComment };
