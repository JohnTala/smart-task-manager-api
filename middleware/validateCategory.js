const { body, validationResult } = require('express-validator');

// Validation Rules for Category
const validationRulesCategory = [

  body('name')
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2 }).withMessage('Category name must be at least 2 characters long'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('user')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid User ID')

];

// Validation Error Handler
const validateCategory = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};

module.exports = { validationRulesCategory, validateCategory };
