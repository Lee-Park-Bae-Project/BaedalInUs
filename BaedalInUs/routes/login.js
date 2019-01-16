var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;
// db 열기
db.once('open', function () {
    console.log('Connected!');
});

const user = require('../models/user');

router.post('/', (req, res) => {
    const id = req.query.id.toString();
    const pw = req.query.pw.toString();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    user.find({id: id}, (err, result) => {
        if (err) return res.json(err);

        if (result.length != 0) {
            // 아이디 있는 경우
            // console.log(result);
            // console.log(user.authenticate(pw, result[0].password, result[0].salt));

            if(user.authenticate(pw, result[0].password, result[0].salt)){
                res.end('login ok');
            } else{
                res.end('password is not correct');
            }

        } else {
            // 아이디 없는 경우
            res.end('id is not registered');
        }
    });

});


module.exports = router;