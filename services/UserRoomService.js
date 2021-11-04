const UserRoomsModel = require('../models/').user_rooms;

class UserRoomService {

    async addUserToRoom(userId, roomId){
        return await UserRoomsModel.create({
            user_id: userId,
            room_id: roomId,
            created_at: Date()
        })
        .then(data => {
            return {message: data.toJSON(), status: 1};
        })
        .catch(err => {
            return {type: err.message, message: err.errors[0].message, status: 0};
        })
    }

    async isUserInRoom(userId, roomId){
        return await UserRoomsModel.findOne({
            where: {
                user_id: userId,
                room_id: roomId
            },
            raw: true
        })
        .then(data => {
            if(data){
                return {message: data, status: 1};
            }
            return {message: "user not in room", status: 0}
        })
        .catch(err => {
            return {message: err.message, status: 0};
        })        
    }

    async leaveRoom(userId, roomId){
        return await UserRoomsModel.destroy({
            where: {
                user_id: userId,
                room_id: roomId 
            }
        });
    }

}

module.exports = UserRoomService;