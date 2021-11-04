
module.exports = (io, socket) => {
    socket.on("send-message", async (messageObj, cb) => {
        if(Object.entries(messageObj).length){
            const userInRoom = await socket.userRoomService.isUserInRoom(socket.id, messageObj.roomId);
            if(userInRoom.status){
                messageObj.userId = socket.id;
                const messageSaved = await socket.messageService.saveMessage(messageObj);
                if(messageSaved.status){
                    // socket.to(room).emit('receive-message', messageObj.message);
                    cb(true, 'Message sent!')
                } else {
                    cb(false, 'Something went wrong');                     
                }
            } else {
                cb(false, "You are not in this room!");
            }
        } else {
            cb(false, 'Something went wrong');            
        }

    })    
}