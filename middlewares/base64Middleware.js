

module.exports = base64DecodeMiddleware = (req,res,next) =>{
    const base64String = req.headers.authorization.split(" ")[1];
    const userDetailsString = Buffer.from(base64String, 'base64').toString('utf-8');
    const userDetails = userDetailsString.split(":");
    req.body.username = userDetails[0];
    req.body.password = userDetails[1];
    if(userDetails[2]){
        req.body.confirmPassword = userDetails[2]
    }
    next();
}