const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    id: String,
    nickname: String,
    pw: String,
    salt: String,
    lock:Boolean,
    rooms:[
        {
            roomID:{type:String}, // 유저가 참여중인 방 목록
            uncheckedMsg:{type:Number, default:0}
        }
    ],
    socketID:String,
    // 토큰 정보
    userToken:{
        access_token: {type:String},
        expires_in: {type:String},
        refresh_token: {type:String},
        refresh_token_expires_in: {type:String},
        scope: {type:String},
        token_type: {type:String},
    },

    // 카카오톡 관련정보
    userInfo: {
        id: {type:String},
        properties: {
            nickname: {type:String},
            profile_image: {type:String},
            thumbnail_image: {type:String},
        },
        kakao_account: {
            has_email: {type:String}, // boolean
            is_email_vaild: {type:String}, // boolean
            is_email_verified: {type:String}, // boolean
            email: {type:String},
            has_age_range: {type:String}, //boolean
            has_birthday: {type:String}, //boolean
            has_gender: {type:String}, // boolean
        }
    }
});

userSchema.method('makeSalt', function(){
    // 솔트값 만들기
    return Math.round(new Date().valueOf()/Math.random());
});

userSchema.method('encryptPassword', function(password, salt){
    // 솔트값 이용해서 base64 string 으로 해시값 생성 방식은 sha512
    return crypto.createHmac('sha512', salt).update(password).digest('base64');
});

userSchema.static('authenticate', function(userPw, password, userSalt){
    let test = crypto.createHmac('sha512', userSalt).update(userPw).digest('base64');
    return password == test;
});

userSchema.virtual('password').set(function(password){
    // user.password = pw 했을 때 호출댐
    this.salt = this.makeSalt(); // 솔트값 만들고
    this.pw = this.encryptPassword(password, this.salt); // 해시한값을 pw에 저장
}).get(function(){return this.pw;});


// users: collection 이름
module.exports = mongoose.model('User', userSchema, 'users');
