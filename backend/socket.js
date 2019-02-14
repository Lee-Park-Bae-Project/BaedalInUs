const SocketIO = require('socket.io');
const users = require('./models/user');


function setSocketID(socketID, userID){
    console.log('set socket id');
}


module.exports = (server) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
        socket.emit(`message`, {msg:`welcome ${socket.id}`});
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`새로운 클라이언트 접속! ${ip}, ${socket.id}, ${req.ip}`);
        console.log(`connection : ${socket.id}, ${socket.handshake.query}`);


        // 유저에게 새로운 소켓 할당 from ChatRoom.vue
        socket.on('newSocket', (userID, socketID)=>{
            console.log('newSocket : ' + userID + " " + socketID);
            // 디비에 소켓아이디 저장
            users.findOneAndUpdate({'id':userID}, {$set:{'socketID':socketID}})
                .then(
                    (result)=>{
                        console.log(result);
                    }
                )
                .catch(
                    (err)=>console.log(err)
                )
        });

        // 새로운 메시지가 왔다는걸 receiver에게 알려야함
        socket.on('newMsgAlert', (data)=>{
            let receiverID = data.receiverID;
            console.log(receiverID);
            socket.broadcast.to(receiverID).emit('newMsg'); // 이 방에 나 제외한 모든 사람들에게 보냄 (recervier한테 새로운 메시지가 왔다는걸 알림)

        });

        // chatRoom 에서 보냄 TODO: 나 포함한 모든인원에게 보내기로 바꾸
        socket.on('sendNewMsg', (data)=>{
            console.log('data : ' + data);
            console.log('in data : ' + data.newMsg, data.sender, data.created, data.roomID);
            // socket.broadcast.to(data.roomID).emit('newMsg', {message:data.newMsg, sender : data.sender, created : data.created});
            io.to(data.roomID).emit('newMsg', {message:data.newMsg, sender : data.sender, created : data.created});
        });

        //-----------------------------------------------------------------
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