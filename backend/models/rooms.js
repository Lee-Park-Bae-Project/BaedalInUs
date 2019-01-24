const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({
    roomID: {type: String, required: true}, // 참여자1 id, 참여자2 id 조합
    user1: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // 참여자1
    user2: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // 참여자2
    messages: [
        {
            sender:{type:String, required:true}, // 보낸사람
            message:{type:String, required:true}, // 내용
            created:{type:Date, default:Date.now, required:true} // 보낸 시각
        }
    ],
    $setOnInsert: {
        created: {type: Date, default: Date.now}, // 방이 생성된 날짜
    },
    updated: {type: Date, required:true} // 마지막으로 메시지 날린 시각
});

// 메시지 처음 보냈을떄 내아이디랑 상대 아이디 조합해서 roomID 생성 socket.io로 통신할떄 이 아이디가 방 아이디가 됨
roomsSchema.method('setRoomID', function(userOid1, userOid2){
    let newRoomID;
    if(userOid1 < userOid2){
        newRoomID = userOid1 + userOid2;
    } else{
        newRoomID = userOid2 + userOid1;
    }
    this.roomID = newRoomID;
});

module.exports = mongoose.model('Room', roomsSchema, 'rooms');