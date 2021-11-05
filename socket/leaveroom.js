module.exports = (io, socket) => {
    socket.on('user-leaving', async (roomId, roomName) => {
        const getUser = await socket.userService.getUserById(socket.id);
        const username = getUser.message.username;
        socket.leave(roomName);
        socket.to(roomName).emit("user-left", true, username);        
    })
}