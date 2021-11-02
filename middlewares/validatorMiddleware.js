const {validationResult} = require('express-validator');

const validateRegistration = (req, res, next) => {
    const {errors} = validationResult(req);
    if(!errors.length){
        return next();
    }
    const response = errors.map(e => {
        return e.msg
    })

    return res.status(422).json({'message': response})
}

module.exports = validateRegistration;