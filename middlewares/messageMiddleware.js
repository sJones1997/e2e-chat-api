const MessageService = require('../services/MessageService');
const UserRoomService = require('../services/UserRoomService');

const messageMiddleware = (req,res,next) => {
    req.body.messageService = new MessageService();
    req.body.userRoomService = new UserRoomService();
    next();
}

module.exports = messageMiddleware;