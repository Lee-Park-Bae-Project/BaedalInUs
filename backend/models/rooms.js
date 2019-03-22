const mongoose = require('mongoose');
const users = require('./user');
const crypto = require('crypto'); // 암호화 모듈


const roomsSchema = mongoose.Schema({
    roomID: {type: String}, // 참여자1 id, 참여자2 id 조합
    // user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // 참여자1
    // user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // 참여자2
    user1: {type: String},
    user2: {type: String},
    messages: [
        {
            sender: {type: String, required: true}, // 보낸사람
            message: {type: String, required: true}, // 내용
            created: {type: String, required: true} // 보낸 시각
        }
    ],
    created: {type:String}, // 방이 생성된 날짜
    updated: {type: String, required: true} // 마지막으로 메시지 날린 시각
});

    roomsSchema.statics.roomIDSHA256 = function(idMixture, cb) {
        console.log('in make room id function');
        let shasum = crypto.createHash('sha256');
        shasum.update('baedalinus');
        // let newRoomID = shasum.digest('hex'); // 해시함수 아웃풋
        return shasum.digest('hex', cb);
    }

// roomsSchema.method('makeRandomRoomID', () => {
//     let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
//     let string_length = 20;
//     let randomstring = '';
//     for (var i = 0; i < string_length; i++) {
//         var rnum = Math.floor(Math.random() * chars.length);
//         randomstring += chars.substring(rnum, rnum + 1);
//     }
//     return randomstring;
// });
// roomsSchema.virtual('setRoomID').set(function (user1, user2) {
//     console.log(`in virtual`);
//     this.roomID = this.makeRandomRoomID();
// });

// roomsSchema.static('makeRoomID', function () {
//     let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
//     let string_length = 20;
//     let randomstring = '';
//     for (var i = 0; i < string_length; i++) {
//         var rnum = Math.floor(Math.random() * chars.length);
//         randomstring += chars.substring(rnum, rnum + 1);
//     }
//     return randomstring;
// });


module.exports = mongoose.model('Room', roomsSchema, 'rooms');