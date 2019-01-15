// /*
// user collection의 형태
//  */
// const userSchema = mongoose.Schema({
//     name:String,
//     email:String,
//     kakaoID:String,
//     intro:String,
//     orderNum:Number,
//     dlvNum:Number,
//     star:Number
// });
//
// /*
// users : 데이터가 들어갈 collection 이름
// userSchema 형태의 데이터를 넣겠다.
//  */
// const userData = mongoose.model('users', userSchema);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../user');
var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    // 로그인 페이
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
}), (req, res) => {
    console.log(req.user);
    res.redirect('/');
});

module.exports = router;