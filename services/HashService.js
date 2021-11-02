const crypto = require('crypto');

class HashService {

    generateHash(password){
        const salt = password !== null ? crypto.randomBytes(60).toString('base64') : null;
        const hasher = crypto.createHmac('sha256', process.env.HASH_SECRET);
        const hash = password !== null ? hasher.update(`${password}${salt}`).digest('hex') : null;
        return {
            hash: hash,
            salt: salt
        };
    }

    getUserHash(password, salt){
    
        const hasher = crypto.createHmac('sha256', process.env.HASH_SECRET);
        const hash = hasher.update(`${password}${salt}`).digest('hex');

        return hash;
    }    

}

module.exports = HashService;
