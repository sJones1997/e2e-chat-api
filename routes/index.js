const express = require('express');
const indexRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const roomMiddleware = require('../middlewares/roomMiddlware');

const authRouter = require('./auth');
indexRouter.use('/auth', authMiddleware, authRouter);

const roomRouter = require('./room');
indexRouter.use('/room', jwtMiddleware, roomMiddleware, roomRouter);

const userRoomRouter = require('./userRooms');
indexRouter.use("/user-rooms", jwtMiddleware, roomMiddleware, userRoomRouter);

module.exports = indexRouter;