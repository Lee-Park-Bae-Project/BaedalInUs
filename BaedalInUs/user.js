const mongoose = require('mongoose');

/*
user collection의 형태
 */
const userSchema = mongoose.Schema({
    id:String,
    password:String,
});

userSchema.methods.comparePassword = function(inputPassword, cb) {
    if (inputPassword === this.password) {
        cb(null, true);
    } else {
        cb('error');
    }
};

module.exports = mongoose.model('users', userSchema, 'users');