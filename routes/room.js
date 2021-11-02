const express = require('express');
const roomRouter = express.Router();
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const {newRoomValidation} = require('../validators/validators');
module.exports = roomRouter;

roomRouter.param('roomId', async (req, res, next) => {
    const room = await req.body.roomService.getRoom(req.params.roomId, req.body.userId);
    if(room.status){
        req.body.room = room.message;
        return next();
    } 
    res.status(404).json({message:room.message});
})

roomRouter.post('/', newRoomValidation(), validatorMiddleware, async (req, res) => {
    const newRoom = await req.body.roomService.createRoom(req.body.newRoomName, req.body.newRoomLimit, req.body.userId);
    if(newRoom.status){
        const addUserToRoom = await req.body.userRoomService.addUserToRoom(req.body.userId, newRoom.message.id);
        if(addUserToRoom){
            const {name, limit, room_admin, created_at} = newRoom.message;
            return res.status(200).json({"message": "Room created", "newRoom": {name: name, limit: limit, roomAdmin: room_admin, createdAt: created_at}});
        }
        return res.status(400).json({"message": addUserToRoom.message});
    }
    return res.status(400).json({"message": newRoom.message});
})

roomRouter.get('/:roomId', async(req, res) => {
    return res.status(200).json({"message": req.body.room})
});

roomRouter.delete('/:roomId', async(req, res) => {
    const leaveRoomCheck = await req.body.roomService.leaveRoomCheck(req.body.room.id);
    if(!leaveRoomCheck.status){
        const deleteRoom = await req.body.roomService.deleteRoom(req.body.room.id);
        if(deleteRoom.status){
            return res.status(200).json(deleteRoom);
        }
        return res.status(500).json({'message': 'Something went wrong.'})
    }
    res.status(400).json({'message': 'Are you unable to delete this room while there are members still in it.'})  
})

