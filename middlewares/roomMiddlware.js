const RoomService = require('../services/RoomService');
const UserRoomService = require('../services/UserRoomService');
const UserService = require('../services/UserService');
const MessageService = require('../services/MessageService');

const roomMiddleware = (req, res, next) => {
    req.body.roomService = new RoomService();
    req.body.userRoomService = new UserRoomService();
    req.body.userService = new UserService();
    req.body.messageService = new MessageService();
    next();
}

module.exports = roomMiddleware;