const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');
const UserRoomService = require('../services/UserRoomService');
const MessageService = require('../services/MessageService');

module.exports = (socket, next) => {
    socket.roomService = new RoomService();
    socket.userService = new UserService();
    socket.userRoomService = new UserRoomService();
    socket.messageService = new MessageService();
    next();
}