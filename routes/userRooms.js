const express = require('express');
const userRoomRouter = express.Router();
module.exports = userRoomRouter;

userRoomRouter.param('roomId', async (req, res, next, id) => {
    const room = await req.body.roomService.getRoom(id);
    if(room.status){
        return next();
    }
    return res.status(404).send(room.message);
})

userRoomRouter.get('/', async (req, res) => {
    const userRooms = await req.body.userService.getUserRooms(req.body.userId);
    if(userRooms.status){
        return res.status(200).json({"message": userRooms.message})
    }
    res.status(400).json({"message": "Unable to fetch user rooms."});
});

userRoomRouter.delete('/:roomId', async (req, res) => {
    const leaveRoomCheck = await req.body.roomService.leaveRoomCheck(req.params.roomId);
    if(leaveRoomCheck.status){
        const leaveRoom = await req.body.userRoomService.leaveRoom(req.body.userId, req.params.roomId);
        if(leaveRoom){
            return res.status(200).json({message: 'You have left.'});
        }
        return res.status(500).json({message: 'Unable to leave room.'});
    }
    return res.status(200).json({prompt: leaveRoomCheck});
})