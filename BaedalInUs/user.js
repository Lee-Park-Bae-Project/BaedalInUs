const mongoose = require('mongoose');

/*
user collection의 형태
 */
// const userSchema = mongoose.Schema({
//     id:String,
//     password:String,
// });

const userSchema = mongoose.Schema({
    id: String,
    password: String,
    name: String,
    email: String,
    kakaoID: String,
    intro: String,
    orderNum: Number,
    dlvNum: Number,
    star: Number
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

module.exports = mongoose.model('users', userSchema, 'users');