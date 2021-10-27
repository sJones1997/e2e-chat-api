
module.exports = (io, socket) => {
    socket.on("message", (message, room) => {
        console.log(message, room)
        console.log(socket.id)
        socket.join(room);
    })
}