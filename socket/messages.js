
module.exports = (io, socket) => {
    socket.on("message", data => {
        console.log(data)
        socket.broadcast.emit("receive-message", data);
    })
}