const UserModel = require('../models').users;

class UserService { 

    async createUser(username = null, hash = null, salt = null){
        return await UserModel.create({
            username: username,
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

    async getUserByUsername(username){
        return await UserModel.findAll({
            where: {
                username: username
            },
            raw: true,
            plain: true 
        })
        .then(data => {
            return {message: data, status: 1};
        })
        .catch(err => {
            console.log(err)
            return {type: err.message, message: err.errors[0].message, status: 0};
        })        
    }
}

module.exports = UserService