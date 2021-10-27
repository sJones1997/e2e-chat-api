const RoomService = require('../services/RoomService');
const UserRoomService = require('../services/UserRoomService');
const UserService = require('../services/UserService');

const roomMiddleware = (req, res, next) => {
    req.body.roomService = new RoomService();
    req.body.userRoomService = new UserRoomService();
    req.body.userService = new UserService();
    next();
}

module.exports = roomMiddleware;