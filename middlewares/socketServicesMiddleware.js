const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');
const UserRoomService = require('../services/UserRoomService');

module.exports = (socket, next) => {
    socket.roomService = new RoomService();
    socket.userService = new UserService();
    socket.userRoomService = new UserRoomService();
    next();
}