var express = require('express');
var router = express.Router();
const session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
// var db = mongoose.connection;

// // db 열기
// db.once('open', function () {
//     console.log('Connected!');
// });

var user = require('../models/user');

router.get('/', (req, res)=>{
   res.render('signup');
});
router.post('/', (req, res) => {
    user.find({}, (err, data) => {
        if (err) return res.json(err);
    });
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');

    let id = req.body.id.toString();
    let pw = req.body.pw.toString();

    //id 중복검사
    user.find({id:id}, (err, result)=>{
        if(err) return res.json(err);
        if(result.length!=0){
            res.redirect('/signup');
        } else{
            var newData = new user({id:id, pw:pw});
            newData.password = pw;
            newData.save();
            req.session.destroy();  // 세션 삭제
            res.clearCookie('sid'); // 세션 쿠키 삭제
            res.redirect('/login');
        }
    });
});

router.post('/delete', (req, res) => {
    var id = req.body.id.toString();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    user.find({id:id}, (err, result)=>{
        if(err) return res.json(err);

        if (result.length != 0) {
            user.deleteOne({id: id}, (err, result) => {
                if (err) return res.json(err);
                res.end(id + " is deleted");
            });
        } else {
            res.end('no matching id');
        }
    });


});

module.exports = router;