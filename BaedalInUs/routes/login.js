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
    password: String
});

// const users = mongoose.model('users', userSchema);
const collection = db.collection('users');

router.post('/', (req, res) => {
    var id = req.query.id.toString();
    var pw = req.query.pw.toString();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    collection.find({id: id}).toArray((err, result) => {
        if (err) return res.json(err);

        console.log(result);

        if (result.length != 0) {
            // 아이디 있는 경우
            console.log(result);
            console.log(result[0]);

            res.end('id is registered : ' + result[0].id);

        } else {
            // 아이디 없는 경우
            res.end('id is not registered');
        }
    });


});


module.exports = router;