module.exports = (io, socket) => {
    socket.on('user-leaving', async (roomId, roomName) => {
        const getUser = await socket.userService.getUserById(socket.id);
        let username; 
        if(!getUser.message.local_account){
            const googleUser = await socket.googleService.getGoogleUser(socket.id);
            username = googleUser.message.profile_name;
        } else {
            username = getUser.message.username;                            
        }
        socket.leave(roomName);
        socket.to(roomName).emit("user-left", true, username);        
    })
}