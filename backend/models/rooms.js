const mongoose = require('mongoose');
const users = require('./user');

const roomsSchema = mongoose.Schema({
    roomID: {type: String}, // 참여자1 id, 참여자2 id 조합
    user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // 참여자1
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // 참여자2
    user1ID: {type: String},
    user2ID: {type: String},
    messages: [
        {
            sender: {type: String, required: true}, // 보낸사람
            message: {type: String, required: true}, // 내용
            created: {type: Date, default: Date.now, required: true} // 보낸 시각
        }
    ],
    created: {type: Date, default: Date.now}, // 방이 생성된 날짜
    updated: {type: Date, required: true} // 마지막으로 메시지 날린 시각
});

// 메시지 처음 보냈을떄 내아이디랑 상대 아이디 조합해서 roomID 생성 socket.io로 통신할떄 이 아이디가 방 아이디가 됨
// roomsSchema.static('setRoomID', function(){
//     console.log(`in static`);
//     let newRoomID;
//     if(this.user1 < this.user2){
//         newRoomID = this.user1 + this.user2;
//     } else{
//         newRoomID = this.user1 + this.user2;
//     }
//     this.roomID = newRoomID;
// });


roomsSchema.method('makeRandomRoomID', () => {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let string_length = 20;
    let randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
});
roomsSchema.virtual('setRoomID').set(function (user1, user2) {
    console.log(`in virtual`);
    this.roomID = this.makeRandomRoomID();
});

roomsSchema.static('makeRoomID', function () {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let string_length = 20;
    let randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
});


module.exports = mongoose.model('Room', roomsSchema, 'rooms');