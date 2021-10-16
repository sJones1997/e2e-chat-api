const express = require('express');
const authRouter = express.Router();
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const {registerValidation} = require('../validators/validators');
module.exports = authRouter;


authRouter.post('/register', registerValidation(), validatorMiddleware, (req, res) => {
    const register = req.body.authService.register({username: req.body.username, password: req.body.password});
    res.status(200).json({'message': 'Hello', 'status': 1});
})