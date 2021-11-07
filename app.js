const express = require('express');
const app = express();

require('dotenv').config();

const passport = require('passport');
const googleSetup = require('./passport/google');
app.use(passport.initialize());

app.use(express.json());

const cors = require('cors');
const corsFunc = require('./cors/cors')
app.use(cors(corsFunc));

const server = require('http').createServer(app);

const io = require("socket.io")(server, {
    cors: corsFunc,
    credentials: true
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const sioCookieParser = require('socket.io-cookie-parser');
io.use(sioCookieParser())

const socketAuthMiddleware = require('./middlewares/socketAuthMiddleware');
const socketServicesMiddleware = require('./middlewares/socketServicesMiddleware');

io.use(socketAuthMiddleware)
io.use(socketServicesMiddleware);

io.on("connection", (socket) => { 
    console.log("connection")
    require('./socket/moverooms')(io, socket);
    require('./socket/messages')(io,socket);  
    require('./socket/search')(io, socket);
    require('./socket/joinroom')(io, socket);
    require('./socket/leaveroom')(io, socket);
    socket.on("disconnect", () => {
        console.log("disconnected");
    })
    
})
const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

server.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on ${process.env.PORT || 3001}`)
})

module.exports = app;