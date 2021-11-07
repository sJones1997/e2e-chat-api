module.exports = (io, socket) => {
    socket.on("search", async (search, cb) => {
        const resultObj = {};
        const roomByNameLike = await socket.roomService.getRoomByNameLike(search);
        for(const results of roomByNameLike.message){
            const result = await socket.userRoomService.isUserInRoom(socket.id, results.id);
            if(result.status !== 0){
                results['alreadyJoined'] = true;
            } else {
                results['alreadyJoined'] = false;
            }
        }
        resultObj['rooms'] = roomByNameLike;
        console.log(resultObj)
        cb(resultObj);
    })
}