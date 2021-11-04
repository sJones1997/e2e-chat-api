const MessageModel = require('../models').messages

class MessageService {

    async saveMessage(messageObj){
        return await MessageModel.create({
            message: messageObj.message,
            user_id: messageObj.userId,
            room_id: messageObj.roomId,
            created_at: messageObj.sent
        })
        .then(data => {
            console.log(data.toJSON())
            return {message: data.toJSON(), status: 1}
        })
        .catch(err => {
            console.log(err.message)
            return {message: err.message, status: 0};
        })        
    }

}

module.exports = MessageService;