



const socketMiddleware = require('./middlewares/socketMiddleware');

io.use(socketMiddleware)

const roomSocket = io.of('/rooms');

roomSocket.on("connection", socket => {
    console.log("connected")
});

module.exports = socketIndex;

io.on("connection", (socket) => {     
    socket.on("join-room", room => {
        if(socket.lastRoom){
            socket.leave(socket.lastRoom);
            socket.lastRoom = null;
        }
        socket.join(room)
        socket.lastRoom = room;
    })    
    socket.on("message", (room, cb) => {
        cb(`Message sent`);
        socket.to(room).emit('receive-message', message);
        
    })    
})