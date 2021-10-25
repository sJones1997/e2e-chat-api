const {body} = require('express-validator');

const registerValidation = () => {
    return [
        body('username', 'username cannot be empty')
        .isLength({min:3}).withMessage('Username must be at least 3 characters long').escape(),
        body('password')
        .isLength({min: 8, max:100}).withMessage('Password must be between 8 and 100 characters')
        .matches('[0-9]').withMessage('Password must contain at least one number')
        .matches('[A-Z]').withMessage('Password must contain at least one uppercase letter')
        .custom((value, {req}) => {
            if(value !== req.body.confirmPassword){
                throw new Error('Passwords do not match');
            } else {
                return value;
            }
        })
        .escape()
    ]
}

const loginValidation = () => {
    return [
        body('username', 'username cannot be empty')
        .isLength({min:3}).withMessage('Username must be at least 3 characters long').escape(),
        body('password')
        .isLength({min: 8, max:100}).withMessage('Password must be between 8 and 100 characters')
        .matches('[0-9]').withMessage('Password must contain at least one number')
        .matches('[A-Z]').withMessage('Password must contain at least one uppercase letter')
        .escape()
    ]
}

const newRoomValidation = () => {
    return [
        body('newRoomName')
        .isLength({min:3, max:25}).withMessage("Room name must be between 3 and 25 characters long").escape(),
        body('newRoomLimit')
        .custom((value, {req}) => {
            if(!(value >= 2 && value <= 8)){
                throw new Error("Room member limit must be between 2 and 8")
            } else {
                return value
            }
        })
    ]
}

module.exports = {
    registerValidation,
    loginValidation,
    newRoomValidation
};