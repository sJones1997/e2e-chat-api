
module.exports = (io, socket) => {
    socket.on("send-message", (messageObj, cb) => {
        if(Object.entries(messageObj).length){
            const userInRoom = socket.userRoomService.isUserInRoom(socket.id, messageObj.roomId);
            if(userInRoom){
                messageObj.userId = socket.id;
                const messageSaved = socket.messageService.saveMessage(messageObj);
                if(messageSaved.status){
                    // socket.to(room).emit('receive-message', messageObj.message);
                    cb(true)
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