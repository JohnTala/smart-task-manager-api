const { body, validationResult } = require('express-validator');

// Validation Rules for Task
const validationRulesTask = [

  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid User ID'),

  body('title')
    .notEmpty().withMessage('Task title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date')
];

// Validation Error Handler
const validateTask = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};

module.exports = { validationRulesTask, validateTask };
