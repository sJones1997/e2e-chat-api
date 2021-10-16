const HashService = require('./HashService');

class AuthService {

    constructor(){
        this.hashService = new HashService();
    }

    register(resgister){
        this.hashService.generateHash()
    }

}

module.exports = AuthService;