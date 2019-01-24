const SocketIO = require('socket.io');


module.exports = (server) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
        socket.emit(`message`, {msg:`welcome ${socket.id}`});
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`새로운 클라이언트 접속! ${ip}, ${socket.id}, ${req.ip}`);
        console.log(`connection : ${socket.id}, ${socket.handshake.query}`);

        // 사람 들어왔을떄
        socket.on('join', (roomID, fn)=>{

            console.log(`socket on join`);
            socket.join(roomID, ()=>{
                console.log("Join", roomID, Object.keys(socket.rooms));
                if(fn){
                    fn();
                }
            });
        });

        // 사람 나갈때
        socket.on('leave', (roomID, fn)=>{
            console.log(`socket on leave`);
            socket.leave(roomID, ()=>{
                if(fn){
                    fn();
                }
            });
        });

        //방 목록 줄때
        socket.on('rooms', (fn)=>{
            if(fn){
                fn(Object.keys(socket.rooms));
            }
        });

        // 메시지 날라왓을떄
        // data: {room: 'roomid', msg: 'msg 내용,,,'}
        socket.on('message', (data, fn)=>{
            console.log(`socket on message`);
            console.log(`message : ${data.msg}, ${Object.keys(socket.rooms)}`);
            if(fn){
                fn(data.msg);
            }

            socket.broadcast.to(data.room).emit('message', {room:data.room, msg:data.msg}); // 이 방에 나 제외한 모든 사람들에게 보냄
            // io.emit('message', data); // 이 서버에 리스닝중인 모든 클라들에게 날림
        });


        socket.on('disconnecting', (data)=>{
            console.log(`socket on disconnecting`);
            console.log(`disconnecting ${socket.id}`);
        });

        socket.on('disconnect', (data)=>{
            console.log(`socket on disconnect`);
            console.log(`disconnect ${socket.id}, ${Object.keys(socket.rooms)}`);
        });

        socket.interval = setInterval(()=>{
            socket.emit('news', 'hello socket.IO');
        }, 3000);

    })
};