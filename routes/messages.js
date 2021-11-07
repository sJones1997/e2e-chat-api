const express = require('express');
const messageRouter = express.Router();
module.exports = messageRouter;

messageRouter.get('/:roomId', async (req, res) => {
    const userInRoom = await req.body.userRoomService.isUserInRoom(req.body.userId, req.params.roomId);
    if(userInRoom.status){
        const messages = await req.body.messageService.getRoomMessages(req.params.roomId, req.body.userId);
        if(messages.status){
            return res.status(200).json({message: messages.message});
        }
        return res.status(204).json({message: messages.message});
    } 
    res.status(400).json({message: 'You are not in this room!'})

})