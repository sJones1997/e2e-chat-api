const express = require('express');
const roomRouter = express.Router();
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const {newRoomValidation} = require('../validators/validators');
module.exports = roomRouter;

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
    const room = await req.body.roomService.getRoom(req.params.roomId);
    console.log(room)
    if(room.status){
        return res.status(200).json({"message": room.message})
    }
    res.status(400).json({"message": room.message});
})