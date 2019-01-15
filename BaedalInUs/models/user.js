const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    pw: String,
});

/*
 비밀번호 비교하는 함수
 암호화 추가해야함
*/
userSchema.methods.comparePassword = function (inputPassword, cb) {
    if (inputPassword === this.password) {
        cb(null, true);
    } else {
        cb('error');
    }
};
// users: collection 이름

module.exports = mongoose.model('User', userSchema, 'users');