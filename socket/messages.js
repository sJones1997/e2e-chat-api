
module.exports = (io, socket) => {
    socket.on("message", data => {
        io.emit("receive-message", data);
    })
}