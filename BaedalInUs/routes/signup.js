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

const users = mongoose.model('users', userSchema);


router.get('/', (req,res)=>{
   res.render('signup');
});

router.post('/signup', (req, res)=>{
    users.find({}, (err, data) => {
        if (err) return res.json(err);
    });
    //id 중복검사 해야함
    console.log(req.query);
    var id = req.query.id.toString();
    var pw = req.query.pw.toString();

    var newData = new users({id:id, password:pw});
    newData.save();
    console.log("id : " + id + " pw : " + pw);

    users.find({}, (err, data) => {
        if (err) return res.json(err);
    });

    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('db updated');
});

module.exports = router;