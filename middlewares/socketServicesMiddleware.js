const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');

module.exports = (socket, next) => {
    socket.roomService = new RoomService();
    socket.userService = new UserService();
    next();
}