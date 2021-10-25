const express = require('express');
const roomRouter = express.Router();
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const {newRoomValidation} = require('../validators/validators');
module.exports = roomRouter;

roomRouter.post('/', newRoomValidation(), validatorMiddleware, async (req, res) => {
    const newRoom = await req.body.roomService.createRoom(req.body.newRoomName, req.body.newRoomLimit, req.body.userId);
    console.log(newRoom)
    if(newRoom.status){
        const addUserToRoom = await req.body.userRoomService.addUserToRoom(req.body.userId, newRoom.message.id);
        if(addUserToRoom){
            const {name, limit, room_admin, created_at} = newRoom.message;
            console.log({name: name, limit: limit, roomAdmin: room_admin, createdAt: created_at})
            return res.status(200).json({"message": "Room created", "newRoom": {name: name, limit: limit, roomAdmin: room_admin, createdAt: created_at}});
        }
        return res.status(400).json({"message": "Unable to add user to room"});
    }
    return res.status(400).json({"message": "Unable to create room"});
})