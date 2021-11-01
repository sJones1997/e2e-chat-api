module.exports = (io, socket) => {
    socket.on("search", async (search, cb) => {
        const resultObj = {};
        const roomByNameLike = await socket.roomService.getRoomByNameLike(search);
        const userByNameLike = await socket.userService.getUserByNameLike(search);
        resultObj['rooms'] = roomByNameLike;
        resultObj['users'] = userByNameLike;
        console.log(resultObj);
        cb(resultObj);
    })
}