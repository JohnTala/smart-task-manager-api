const { body, validationResult } = require('express-validator');

// Validation Rules for users creation and update
const validationRulesUsers = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('googleId')
    .notEmpty().withMessage('Google ID is required')
    .isLength({ min: 8 }).withMessage('Google ID must be at least 8 characters long'),

  body('photoUrl')
    .optional()
    .isURL().withMessage('Photo URL must be a valid URL'),

  body('serviceProvider')
    .optional()
    .isIn(['google']).withMessage('Service provider must be google')
];

// Validation Error Handler
const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  //if there is error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};

module.exports = { validationRulesUsers, validateUser };
