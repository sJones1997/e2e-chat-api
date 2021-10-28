const RoomModel = require('../models').rooms;
const User = require('../models').users;
const sequelize = require('sequelize');

class RoomService {

    async createRoom(roomName, roomLimit, roomAdmin){
        return await RoomModel.create({
            name: roomName,
            limit: roomLimit,
            room_admin: roomAdmin,
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

    async getRoom(roomId){
        return await RoomModel.findOne({
            where: {
                id: roomId
            },
            raw: true,
            plain: true
        })
        .then(data => {
            if(data){
                return {message: data, status: 1};
            }
            return {message: "This room doesn't exist", status: 0};
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })
    }

    async getRoomCapacity(roomId){
        return await RoomModel.findOne({
            attributes:[[sequelize.fn('count','rooms.id'), 'roomCapacity'], 'rooms.limit'],
            include:[{
                model: User,
                attributes:[],
                require:true,
                through: { attributes: []},
                as: 'user'
            }],
            where: {
                id: roomId
            },
            group:['rooms.id'],
            raw: true
        })
        .then(data => {
            if(data){
                data.roomCapacity = parseInt(data.roomCapacity);
                return {message: data, status: 1};
            }
            return {message: "This room doesn't exist", status: 0}
        })
        .catch(err => {
            return {type: err.message, message: err.message, status: 0};
        })
    }
}

module.exports = RoomService;