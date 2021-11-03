module.exports = (io, socket) => {
    socket.on('user-leaving', async (roomId, roomName) => {
        console.log("here", roomId, roomName);
        socket.to(roomName).emit("user-left", true);        
    })
}