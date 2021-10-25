const RoomService = require('../services/RoomService');
const UserRoomService = require('../services/UserRoomService');

const roomMiddleware = (req, res, next) => {
    req.body.roomService = new RoomService();
    req.body.userRoomService = new UserRoomService();
    next();
}

module.exports = roomMiddleware;