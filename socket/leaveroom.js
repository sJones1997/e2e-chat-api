module.exports = (io, socket) => {
    socket.on('user-leaving', async (roomId, roomName) => {
        socket.to(roomName).emit("user-left", true);        
    })
}