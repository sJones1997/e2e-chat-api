const express = require('express');
const indexRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const authRouter = require('./auth');
indexRouter.use('/auth', authMiddleware, authRouter);

module.exports = indexRouter;