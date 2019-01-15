var express = require('express');
var router = express.Router();
const crypto = require('crypto');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;

// db 열기
db.once('open', function () {
    console.log('Connected!');
});

var user = require('../models/user');

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    user.find({}, (err, data) => {
        if (err) return res.json(err);
        // console.log(data);
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    let id = req.query.id.toString();
    let pw = req.query.pw.toString();
    // console.log("id : " + id + " pw : " + pw);

    //id 중복검사
    user.find({id:id}, (err, result)=>{
        if(err) return res.json(err);

        if(result.length!=0){
            res.end('already exists');
        } else{
            var newData = new user({id:id, pw:pw});
            newData.save();

            res.end('id is registered');
        }

    });


});

router.post('/delete', (req, res) => {
    var id = req.query.id.toString();

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