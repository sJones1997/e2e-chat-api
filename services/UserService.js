const UserModel = require('../models').users;
const RoomModel = require('../models').rooms;
const sequelize = require('sequelize');
const Op = sequelize.Op;

class UserService  { 

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

    async getUserById(userId){
        return await UserModel.findOne({
            where: {
                id: userId
            },
            raw: true,
            plain: true 
        })
        .then(data => {
            return {message: data, status: 1};
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
            if(data){
                return {message: data, status: 1};
            }
            return {message: 'Unable to login, please check your details', status: 0};
        })
        .catch(err => {
            return {type: err.message, message: err.message, status: 0};
        })        
    }

    async getUserByNameLike(username){
        return await UserModel.findAll({
            attributes: ['username'],
            where: {
                username: {
                    [Op.like]: `${username}%`
                }
            },
            raw: true
        })
        .then(data => {
            if(data.length){
                return {message: data, status: 1}
            }
            return {message: "No user with this name", status: 0}
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })         
    }

    async getUserRooms(userId){
        return await UserModel.findAll({     
            attributes: [[sequelize.col("rooms.id"), "roomId"], [sequelize.col("rooms.name"), "name"], [sequelize.col("rooms.created_at"), "createdAt"]], 
            include: [{
                attributes: [],
                model: RoomModel,
                through: {
                    attributes: []
                },
                as: "rooms"
            }],            
            where: {
                id: userId
            },            
            order: [[sequelize.col("rooms.created_at"), 'DESC']],
            raw: true
        })
        .then(data => {
            if(!(data.length === 1 && data[0].roomId === null)){
                return {message: data, status: 1};
            }          
            return {message: 'No rooms', status: 0}
        })
        .catch(err => {
            return {message: err.errors, status: 0};
        }) 
    }     
}

module.exports = UserService