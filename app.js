const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
const corsFunc = require('./cors/cors')
app.use(cors(corsFunc));

require('dotenv').config();

const server = require('http').createServer(app);

const io = require("socket.io")(server, {
    cors: corsFunc,
    credentials: true
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const sioCookieParser = require('socket.io-cookie-parser');
io.use(sioCookieParser())

const passport = require('passport');

app.use(passport.initialize());

const socketMiddleware = require('./middlewares/socketMiddleware');
const rooms = require('./socket/rooms');
const message = require('./socket/messages');

io.use(socketMiddleware)

io.on("connection", (socket) => {
    message(io, socket);
})

const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

server.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on ${process.env.PORT || 3001}`)
})

module.exports = app;