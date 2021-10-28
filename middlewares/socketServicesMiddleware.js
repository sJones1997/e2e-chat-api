const RoomService = require('../services/RoomService');

module.exports = (socket, next) => {
    socket.roomService = new RoomService();
    next();
}