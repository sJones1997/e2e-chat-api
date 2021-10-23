const JwtService = require('../services/JwtService');

module.exports = (socket, next) =>{
    const jwtService = new JwtService();
    const token = socket.request.cookies.token;
    if(jwtService.verifyJWT(token) !== false){
        next();
    } else {
        const err = new Error("What on earth is going on here?");
        err.data = {message: 'Unauthorised, please sign in'}
        console.log(err)
        next(err)
    }

}