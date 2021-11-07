const express = require('express');
const authRouter = express.Router();
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const {registerValidation, loginValidation} = require('../validators/validators');
const base64DecodeMiddleware = require('../middlewares/base64Middleware');
const passport = require('passport');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
module.exports = authRouter;

authRouter.post('/register', base64DecodeMiddleware, registerValidation(), validatorMiddleware, async (req, res) => {
    const register = await req.body.authService.register({username: req.body.username, password: req.body.password});
    if(register.status){
        const token = req.body.jwtService.generateJWT({userId: register.message.id});
        res.cookie('token', token,  {httpOnly: true, sameSite: true, secure: true, domain: process.env.DOMAIN})
        return res.status(200).json({'message': 'User created'});
    }
    return res.status(400).json(register)
});

authRouter.post('/login', base64DecodeMiddleware, loginValidation(), validatorMiddleware, async (req, res) => {
    const login = await req.body.authService.login({username: req.body.username, password: req.body.password});
    if(login.status){
        const token = req.body.jwtService.generateJWT({userId: login.message.id});     
        res.cookie('token', token,  {httpOnly: true, sameSite: true, secure: true, domain: process.env.DOMAIN})          
        return res.status(200).json({'message': 'Sign in successful'});
    }
    return res.status(400).json(login);
});

authRouter.get('/verify', jwtMiddleware,  (req, res) => {
    res.status(200).json({message: 'User signed in.'});
})

authRouter.get('/logout', async (req, res) => {
    req.logout();
    res.clearCookie('token', {domain: process.env.DOMAIN})
    res.status(200).json({message: 'logged out'});
})

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    const token = req.body.jwtService.generateJWT({userId: req.user.userId, username: req.user.username});    
    res.cookie('token', token, {httpOnly: true, sameSite: true, secure: true, domain: process.env.DOMAIN})          
    return res.status(200).redirect(process.env.CLIENT_HOST)
})