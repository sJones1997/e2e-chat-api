const express = require('express');
const userRoomRouter = express.Router();
module.exports = userRoomRouter;

userRoomRouter.get('/', async (req, res) => {
    const userRooms = await req.body.userService.getUserRooms(req.body.userId);
    if(userRooms.status){
        return res.status(200).json({"message": userRooms.message})
    }
    res.status(400).json({"message": "Unable to fetch user rooms"});
})