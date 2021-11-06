const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

class JwtService {

    generateJWT(payload){
        const privateKEY = fs.readFileSync(path.resolve('keys/private.key'), 'utf-8');
        const signOptions = {
            issuer: 'e2e webchat app',
            subject: 'web chat',
            audience: 'YOU',
            expiresIn: '24h',
            algorithm:  "RS256"
        };
    
        const token = jwt.sign(payload, process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), signOptions);  
        return token;
    }


    verifyJWT(token){

        const publicKEY = fs.readFileSync(path.resolve('keys/public.key'), 'utf-8');
    
        const signOptions = {
            issuer: 'e2e webchat app',
            subject: 'web chat',
            audience: 'YOU',
            expiresIn: '24h',
            algorithm:  ["RS256"]
        };

        return jwt.verify(token, process.env.PUBLIC_KEY.replace(/\\n/g, '\n'), signOptions, (err, data) => {
            if(err){
                return false;
            }
            return data;
        });
    
    
    }    



}

module.exports = JwtService;