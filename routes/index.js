const express = require('express');
const indexRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const roomMiddleware = require('../middlewares/roomMiddlware');
const messageMiddleware = require('../middlewares/messageMiddleware');

const authRouter = require('./auth');
indexRouter.use('/auth', authMiddleware, authRouter);

const roomRouter = require('./room');
indexRouter.use('/room', jwtMiddleware, roomMiddleware, roomRouter);

const userRoomRouter = require('./userRooms');
indexRouter.use("/user-rooms", jwtMiddleware, roomMiddleware, userRoomRouter);

const messageRouter = require('./messages');
indexRouter.use('/messages', jwtMiddleware, messageMiddleware, messageRouter);

module.exports = indexRouter;