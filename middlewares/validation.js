const { body, validationResult } = require('express-validator');

const validateCharacter = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('classe').optional().notEmpty().withMessage('Classe is required'),
    body('level').optional().isInt({ min: 0}).withMessage('Level must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateCharacter;


