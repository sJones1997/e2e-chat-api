const JwtService = require("../services/JwtService");

const jwtMiddleware = (req, res, next) => {
    const jwtSerivce = new JwtService();
    const {e2etoken} = req.cookies
    const verify = jwtSerivce.verifyJWT(e2etoken);
    if(verify){
        req.body.userId = verify.userId
        next();
    } else {
        res.status(401).json({"message": 'Unauthorised, please sign in'})
    }
}

module.exports = jwtMiddleware;