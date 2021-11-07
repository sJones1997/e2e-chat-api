const JwtService = require('../services/JwtService');

module.exports = (socket, next) =>{
    const jwtService = new JwtService();
    const e2etoken = socket.request.cookies.e2etoken;
    if(jwtService.verifyJWT(e2etoken) !== false){
        const userId = jwtService.verifyJWT(e2etoken).userId;
        socket.id = userId;
        next();
    } else {
        const err = new Error("What on earth is going on here?");
        err.data = {message: 'Unauthorised, please sign in'}
        next(err)
    }

}