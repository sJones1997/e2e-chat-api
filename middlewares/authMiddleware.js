const AuthService = require('../services/AuthService');
const JwtService = require('../services/JwtService');
const authMiddleware = (req, res, next) => {
    req.body.authService = new AuthService();
    req.body.jwtService = new JwtService();
    next();
}

module.exports = authMiddleware;