module.exports = socket => {
    socket.on("join-room", room => {
        console.log(room)
        socket.join(room)
    })
}