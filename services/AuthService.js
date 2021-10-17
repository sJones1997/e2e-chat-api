const HashService = require('./HashService');
const UserService = require('./UserService');

class AuthService {

    constructor(){
        this.hashService = new HashService();
        this.userService = new UserService();
    }

    async register(register){
        register.username = register.username.toLowerCase();
        const {hash, salt} = this.hashService.generateHash(register.password);
        return await this.userService.createUser({username: register.username, password: hash, salt: salt});
    }

    async login(login){
        login.username = login.username.toLowerCase();
        const userDetails = await this.userService.getUserByUsername(login.username);
        if(userDetails.id){
            const hash = this.hashService.getUserHash(login.password, userDetails.salt);
            if(hash === userDetails.password){
                return {'message': 'Login successful', 'status': 1}
            }
            return {'message': 'Unable to authenticate, please check your details', 'status': 0};            
        }
        return userDetails;
    }
}

module.exports = AuthService;