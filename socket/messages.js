
module.exports = (io, socket) => {
    socket.on("send-message", async (messageObj, cb) => {
        if(Object.entries(messageObj).length){
            if(messageObj.message.length){
                const userInRoom = await socket.userRoomService.isUserInRoom(socket.id, messageObj.roomId);
                if(userInRoom.status){
                    messageObj.userId = socket.id;
                    const messageSaved = await socket.messageService.saveMessage(messageObj);
                    if(messageSaved.status){
                        delete messageSaved.message.user_id
                        messageToSend = messageSaved;
                        messageToSend.message.local_user = false;
                        socket.to(messageObj.roomName).emit('receive-message', messageToSend);
                        messageSaved.message.local_user = true
                        cb(true, messageSaved.message);
                    } else {
                        cb(false, 'Something went wrong');                     
                    }
                } else {
                    cb(false, "You are not in this room!");
                }                
            } else {
                cb(false)
            }
        } else {
            cb(false, 'Something went wrong');            
        }

    })    
}