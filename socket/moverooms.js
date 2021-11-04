

module.exports = (io, socket) => {
    socket.on("move-room",  async (room, roomId, cb) => {
        const roomCheck = await socket.roomService.getRoom(roomId);
        if(roomCheck.status){
            if(socket.lastRoom){
                socket.leave(socket.lastRoom);
                socket.lastRoom = null;
            }
            socket.join(room)
            socket.lastRoom = room;
            cb(true, 'connected');
        } else {
            cb(false, "The room you've tried to join does not exist, please try another room.");        
        }
    })  
}