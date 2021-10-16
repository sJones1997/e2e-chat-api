const {body} = require('express-validator');

const registerValidation = (req, res, next) => {
    return [
        body('username', 'username cannot be empty')
        .isLength({min:3}).withMessage('Username must be at least 3 characters long').escape(),
        body('password').notEmpty()
        .matches('[0-9]').withMessage('Password must contain as least one number')
        .matches('[A-Z]').withMessage('Password must container at least one uppercase letter')
        .matches(body('confirmPassword')).withMessage('Passwords do not match')
        .escape()
    ]
}

module.exports = {
    registerValidation
};