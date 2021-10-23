module.exports = socket => {
    socket.on("rooms", data => {
        socket.emit("rooms", data);
    })
}