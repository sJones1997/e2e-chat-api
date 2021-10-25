const UserRoomsModel = require('../models/').user_rooms;
const Rooms = require('../models/').rooms;

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

}

module.exports = UserRoomService;