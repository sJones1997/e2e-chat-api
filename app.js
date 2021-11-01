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

const socketAuthMiddleware = require('./middlewares/socketAuthMiddleware');
const socketServicesMiddleware = require('./middlewares/socketServicesMiddleware');

io.use(socketAuthMiddleware)
io.use(socketServicesMiddleware);

io.on("connection", (socket) => {     
    require('./socket/rooms')(io, socket);
    require('./socket/messages')(io,socket);  
    require('./socket/search')(io, socket);
})

const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

server.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on ${process.env.PORT || 3001}`)
})

module.exports = app;