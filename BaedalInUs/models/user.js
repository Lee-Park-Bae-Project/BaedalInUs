const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    id: String,
    pw: String,
    salt: String
});

userSchema.method('makeSalt', function(){
    // 솔트값 만들기
    return Math.round(new Date().valueOf()/Math.random());
});

userSchema.static('encryptPassword', function(password, salt){
    // 솔트값 이용해서 base64 string 으로 해시값 생성 방식은 sha512
    return crypto.createHmac('sha512', salt).update(password).digest('base64');
});

userSchema.static('authenticate', function(userPw, password, userSalt){
    console.log('userPw : ' + userPw);
    console.log('userSalt : ' + userSalt);
    console.log('password : ' + password);
    let test = this.encryptPassword(userPw, userSalt);
    console.log('password : ' + test);
    return password == test;
});

userSchema.virtual('password').set(function(password){
    // user.password = pw 했을 때 호출댐
    this.salt = this.makeSalt(); // 솔트값 만들고
    this.pw = this.encryptPassword(password, this.salt); // 해시한값을 pw에 저장
    console.log('salt : ' + this.salt);
    console.log('pw : ' + this.pw);
}).get(function(){return this.pw;});

// users: collection 이름
module.exports = mongoose.model('User', userSchema, 'users');