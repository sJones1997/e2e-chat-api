module.exports = (io, socket) => {
    socket.on("join-room", async (roomId, cb) => {
        const roomCapacityCheck = await socket.roomService.getRoomCapacity(roomId);
        const {name, roomCapacity, limit} = roomCapacityCheck.message;
        if(!(roomCapacity >= limit)){
            const isInRoom = await socket.userRoomService.isUserInRoom(socket.id, roomId);
            if(!isInRoom.status){
                const addUserToRoom = await socket.userRoomService.addUserToRoom(socket.id, roomId);
                if(addUserToRoom.status){
                    const getUser = await socket.userService.getUserById(socket.id);                    
                    let username; 
                    if(!getUser.message.local_account){
                        const googleUser = await socket.googleService.getGoogleUser(socket.id);
                        username = googleUser.message.profile_name;
                    } else {
                        username = getUser.message.username;                            
                    }
                    socket.to(name).emit("user-joined", true, username);
                    cb('Joined!', true);
                } else {
                    cb('Problem joining room!', false)
                }
            } else {
                cb('You are already in this room!', false)
            }
        } else {
            cb('This room is full, please try another room.', false)            
        }
    })
}