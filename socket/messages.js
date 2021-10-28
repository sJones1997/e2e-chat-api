
module.exports = (io, socket) => {
    socket.on("message", (room, message) => {
        socket.to(room).emit('receive-message', message);
    })    
}