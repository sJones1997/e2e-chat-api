const AuthService = require('../services/AuthService');

const authMiddleware = (req, res, next) => {
    req.body.authService = new AuthService();
    next();
}

module.exports = authMiddleware;