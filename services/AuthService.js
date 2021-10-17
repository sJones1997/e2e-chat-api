const HashService = require('./HashService');
const UserModel = require('../models').users;
const Sequelize = require('sequelize');

class AuthService {

    constructor(){
        this.hashService = new HashService();
    }

    async register(register){
        register.username = register.username.toLowerCase();
        const {hash, salt} = this.hashService.generateHash(register.password)
        return await UserModel.create({
            username: register.username,
            password: hash,
            salt: salt,
            created_at: Date(),
            updated_at: Date()
        })
        .then(data => {
            return {message: data.toJSON(), status: 1};
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })
    }

    async login(login){
        login.username = login.username.toLowerCase();
        const userDetails = await this.getUserByUsername(login.username);
        if(userDetails.id){
            const hash = this.hashService.getUserHash(login.password, userDetails.salt);
            if(hash === userDetails.password){
                return {'message': 'Login successful', 'status': 1}
            }
            return {'message': 'Unable to authenticate, please check your details', 'status': 0};            
        }
        return userDetails;
    }

    async getUserByUsername(username){
        return await UserModel.findAll({
            where: {
                username: username
            },
            raw: true,
            plain: true 
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })        
    }

}

module.exports = AuthService;