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
            return {message: data.toJSON(), status: 1}
        })
        .catch(err => {
            console.log(err.message)
            return {message: err.message, status: 0};
        })        
    }

    async getRoomMessages(roomId, userId){
        return await MessageModel.findAll({
            attributes: ['message', 'room_id', ['user_id', 'local_user'], 'created_at'],
            where: {
                room_id: roomId
            },
            order: [['created_at', 'DESC']],
            raw: true
        })
        .then(data => {
            console.log(data);
            if(data.length){
                data.map(e => (
                    e.local_user = e.local_user === userId ? true : false
                ))
                return {message: data, status: 1}                
            }
            return {message: 'No messages in this room!', status: 0}              
        })
        .catch(err => {
            console.log(err.message);
            return {message: err.message, status: 0}
        })
    }

    async deleteRoomMessages(roomId){
        return await MessageModel.destroy({
            where:{
                room_id: roomId
            }
        })
        .then(data => {
            if(data.length){
                return {message: 'Messages deleted for room', status: 1}                
            }
            return {message: 'Nothing to delete!', status: 1}                   
        })
        .catch(err => {
            return {message: err.message, status: 0}
        })        
    }

}

module.exports = MessageService;