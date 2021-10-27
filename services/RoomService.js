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
}

module.exports = RoomService;