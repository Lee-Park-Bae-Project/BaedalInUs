var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;

// db 열기
db.once('open', function () {
    console.log('Connected!');
});

const userSchema = mongoose.Schema({
    id: String,
    pw: String
});

const users = mongoose.model('users', userSchema);
const collection = db.collection('users');

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    users.find({}, (err, data) => {
        if (err) return res.json(err);
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var id = req.query.id.toString();
    var pw = req.query.pw.toString();

    //id 중복검사
    collection.find({id: id}).toArray((err, result) => {
        if (err) return res.json(err);

        if (result.length != 0) {
            res.end('already exists');
        } else {
            var newData = new users({id: id, pw: pw});
            newData.save();
            console.log("id : " + id + " pw : " + pw);

            users.find({}, (err, data) => {
                if (err) return res.json(err);
            });

            res.end('id is registered');
        }
    });


});

router.post('/delete', (req, res) => {
    var id = req.query.id.toString();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    collection.find({id:id}).toArray((err, result)=>{
        if(err) return res.json(err);

        if (result.length != 0) {
            collection.deleteOne({id: id}, (err, result) => {
                if (err) return res.json(err);
                res.end(id + " is deleted");

            });
        } else {
            res.end('no matching id');
        }
    });


});

module.exports = router;