const RoomModel = require('../models').rooms;
const User = require('../models').users;
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

    async getRoom(roomId, userId){
        return await RoomModel.findOne({
            attributes:['rooms.*',[sequelize.fn('count','rooms.id'), 'roomCapacity']],            
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
                data['roomCapacity'] = parseInt(data['roomCapacity']); 
                data.roomAdmin = data.roomAdmin === userId ? true : false;            
                return {message: data, status: 1};
            }
            return {message: "This room doesn't exist", status: 0};
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })
    }

    async getRoomByNameLike(roomName){
        return await RoomModel.findAll({
            attributes: ['id','name'],
            where: {
                name: {
                    [Op.like]: `${roomName}%`
                }
            },
            raw: true
        })
        .then(data => {
            if(data.length){
                return {message: data, status: 1}
            }
            return {message: "No rooms with this name", status: 0}
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
            if(data || data.length){
                data.roomCapacity = parseInt(data.roomCapacity);
                return {message: data, status: 1};
            }
            return {message: "This room doesn't exist", status: 0}
        })
        .catch(err => {
            return {type: err.message, message: err.message, status: 0};
        })
    }

    async leaveRoomCheck(roomId){
        const roomCapacity = await this.getRoom(roomId);
        const capacity = roomCapacity.message.roomCapacity;
        if(capacity > 1){
            return {"message": "Leaving room", "status": 1};
        }
        return {'message': "You're the last member in the team, if you leave the room and it's chat history will be permanently deleted.", "status": 0}

    }

    async deleteRoom(roomId){
        return await RoomModel.destroy({
            where: {
                id: roomId
            }
        })
        .then(data => {
            if(data){
                return {message: 'Room deleted', status: 1}
            }
        })
        .catch(err => {
            return {type: err.message, message: err.message, status: 0};
        })
    }
}

module.exports = RoomService;