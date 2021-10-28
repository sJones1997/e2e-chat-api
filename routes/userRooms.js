const express = require('express');
const userRoomRouter = express.Router();
module.exports = userRoomRouter;

userRoomRouter.get('/', async (req, res) => {
    const userRooms = await req.body.userService.getUserRooms(req.body.userId);
    if(userRooms.status){
        return res.status(200).json({"message": userRooms.message})
    }
    res.status(400).json({"message": "Unable to fetch user rooms"});
});

userRoomRouter.delete('/', async (req, res) => {
    const leaveRoomCheck = await req.body.roomService.leaveRoomCheck(1);
    if(leaveRoomCheck.status){
        console.log(await req.body.userRoomService.leaveRoom(req.body.userId, 1));
    }
})