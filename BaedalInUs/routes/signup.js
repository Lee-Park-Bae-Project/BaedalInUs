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

    console.log(req.body.user);
    console.log(req.body.user.id);
    console.log(req.body.user.pw);


    let id = req.body.user.id.toString();
    let pw = req.body.user.pw.toString();

    console.log(`id : ${id}`);
    console.log(`pw : ${pw}`);
    //id 중복검사
    user.find({id:id}, (err, result)=>{
        if(err) return res.json(err);
        console.log(result);
        if(result.length!=0){
            console.log(`if`);
            res.statusCode = 204; // 자원 생성 실패
            res.end('0');
            console.log(res);
            // res.redirect('/signup');
        } else{
            console.log(`else`);
            var newData = new user({id:id, pw:pw});
            newData.password = pw;
            newData.save();
            // req.session.destroy();  // 세션 삭제
            // res.clearCookie('sid'); // 세션 쿠키 삭제
            res.statusCode = 201; // 자원 생성 완료
            res.end('1');
            // res.redirect('/login');
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