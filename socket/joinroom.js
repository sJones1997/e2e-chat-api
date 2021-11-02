module.exports = (io, socket) => {
    socket.on("join-room", async (roomId, cb) => {
        const roomCapacityCheck = await socket.roomService.getRoomCapacity(roomId);
        const {roomCapacity, limit} = roomCapacityCheck.message;
        if(!(roomCapacity >= limit)){
            const isInRoom = await socket.userRoomService.isUserInRoom(socket.id, roomId);
            if(!isInRoom.status){
                const addUserToRoom = await socket.userRoomService.addUserToRoom(socket.id, roomId);
                if(addUserToRoom.status){
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