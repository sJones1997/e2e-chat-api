const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');
const UserRoomService = require('../services/UserRoomService');
const MessageService = require('../services/MessageService');
const GoogleService = require('../services/GoogleService');

module.exports = (socket, next) => {
    socket.roomService = new RoomService();
    socket.userService = new UserService();
    socket.userRoomService = new UserRoomService();
    socket.messageService = new MessageService();
    socket.googleService = new GoogleService()
    next();
}