const SocketIO = require('socket.io');
const users = require('./models/user');
const cluster = require('cluster');
const redisAdapter = require('socket.io-redis');

// userID:'', userSocket:''
let IDSocket = [];



module.exports = (server) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
        socket.emit(`message`, {msg:`welcome ${socket.id}`});
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`새로운 클라이언트 접속! ${ip}, ${socket.id}, ${req.ip}`);
        console.log('connection : ' + socket.id +  ' ' + socket.handshake.query);
        // console.log(socket.handshake);

        // 유저에게 새로운 소켓 할당 from ChatRoom.vue
        // socket.on('newSocket', (userID, socketID)=>{
        //     console.log('newSocket : ' + userID + " " + socketID);
        //     // 디비에 소켓아이디 저장
        //     users.findOneAndUpdate({'id':userID}, {$set:{'socketID':socketID}})
        //         .then(
        //             (result)=>{
        //                 console.log(result);
        //             }
        //         )
        //         .catch(
        //             (err)=>console.log(err)
        //         )
        // });

        // 새로운 메시지가 왔다는걸 receiver에게 알려야함
        // socket.on('newMsgAlert', (data)=>{
        //     let receiverID = data.receiverID;
        //     console.log(receiverID);
        //     // socket.broadcast.to(receiverID).emit('newMsg'); // 이 방에 나 제외한 모든 사람들에게 보냄 (recervier한테 새로운 메시지가 왔다는걸 알림)
        //
        // });

        // chatRoom 에서 보냄
        socket.on('sendNewMsg', (data)=>{
            console.log('data : ' + data);
            console.log('in data : ' + data.newMsg, data.sender, data.created, data.roomID, data.receiver);
            // socket.broadcast.to(data.roomID).emit('newMsgAlert', {message:data.newMsg, sender : data.sender, created : data.created});
            io.to(data.roomID).emit('newMsg', {message:data.newMsg, sender : data.sender, created : data.created}); // roomID 전체에게 보냄
            io.to(data.receiver).emit('newMsgAlert', {message:data.newMsg, sender : data.sender, created : data.created});
            //
            // socket.broadcast.to(data.roomID).emit('newMsg', {message:data.newMsg, sender : data.sender, created : data.created});
            // socket.broadcast.to(data.receiver).emit('newMsgAlert', {message:data.newMsg, sender : data.sender, created : data.created});
            // socket.broadcast.to(data.roomID).emit('newMsgAlert', {message:data.newMsg, sender : data.sender, created : data.created}); // 메시지가 왓다는 알림
        });

        // client 에서 로그인 성공 후 id 랑 socket보내서 서버에서 기억해줌
        socket.on('joinToMyID', (userID)=>{
            console.log('joinToMyID : ' + userID + ' : ' + socket.id);
            IDSocket.push({userID: userID, userSocket: socket.id});
            console.log(IDSocket.length);
            // 로그아웃 할때 빼줘야함
            console.log('----------------------------------------- 한명 들어온 후 -----------------------------------------');
            IDSocket.forEach(function (item, index, array) {
                console.log(item, index);
            })
        });

        // 아직 안씀 TODO: 로그아웃 할때 해줘야함
        socket.on('leaveFromMyID', (userID)=>{
            console.log('leaveFromMyID : ' + userID + ' : ' + socket.id);
            const idx = IDSocket.findIndex(function(item) {return item.userSocket === socket.id}); // 인덱스 찾기
            if(idx > -1) IDSocket.splice(idx, 1); // 제거
        });

        //-----------------------------------------------------------------
        // 사람 들어왔을떄
        socket.on('join', (roomID, fn)=>{
            console.log(`socket on join`);
            socket.join(roomID);
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
            // IDSocket 배열에서 userID - userSocket pair 제
            const idx = IDSocket.findIndex(function(item) {return item.userSocket === socket.id}); // 인덱스 찾기
            if(idx > -1) IDSocket.splice(idx, 1);

            console.log('----------------------------------------- 한명 나간 후 -----------------------------------------');
            IDSocket.forEach(function(item, index, array){
                console.log(item, index);
            })
        });

        socket.on('disconnect', (data)=>{
            console.log(`socket on disconnect`);
            console.log(`disconnect ${socket.id}, ${Object.keys(socket.rooms)}`);
        });

        // socket.interval = setInterval(()=>{
        //     socket.emit('news', 'hello socket.IO');
        // }, 3000);

    })



};