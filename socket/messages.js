
module.exports = (io, socket) => {
    socket.on("send-message", async (messageObj, cb) => {
        if(Object.keys(messageObj).length){
            if(messageObj.message.length){
                const userInRoom = await socket.userRoomService.isUserInRoom(socket.id, messageObj.roomId);
                if(userInRoom.status){
                    messageObj.userId = socket.id;
                    const messageSaved = await socket.messageService.saveMessage(messageObj);
                    if(messageSaved.status){
                        const getUser = await socket.userService.getUserById(socket.id);
                        let username; 
                        if(!getUser.message.local_account){
                            const googleUser = await socket.googleService.getGoogleUser(socket.id);
                            username = googleUser.message.profile_name;
                        } else {
                            username = getUser.message.username;                            
                        }
                        delete messageSaved.message.user_id
                        messageToSend = messageSaved;
                        messageToSend.message.username = username;
                        messageToSend.message.local_user = false;
                        console.log(messageToSend)
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