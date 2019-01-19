var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/*
Create: 데이터 생성
Retrieve(Read): 데이터 조회
Update: 데이터 갱신
Delete: 데이터 삭제
 */

/*
이러한 구조의 데이터를 넣곘다.
 */
const testSchema = mongoose.Schema({
    firstname: String,
    lastname: String
});

/*
testModel : 데이터가 들어갈 collection 이름
testSchema 형태의 데이터를 넣겠다.
 */
    const data = mongoose.model('testModel', testSchema);

router.get('/', function (req, res) {
    res.send('mongodb test page');
});

router.get('/create', function (req, res) {
    data.find({}, (err, myData) => {
        if (err) return res.json(err);
    });


    var newData = new data({firstname: "junjun", lastname: "leelee"});
    newData.save(); // 데이터 저장

    data.find({}, (err, myData) => {
        if (err) return res.json(err);
    });

    res.send('create is done');

});

/*
data collection 에서 데이터 다 가져옴
 */
router.get('/retrieve', function (req, res) {
    data.find({}, (err, myData) => {
        if (err) return res.json(err);
        res.json(myData);
    });
});

/*
data collection 에 있는 데이터 다 지움
 */
router.get('/delete', function(req, res){
    data.remove({}, (err, myData)=>{
        if(err) return res.json(err);
        res.redirect('/');
    });
});

/*
firstname이 junjun인 애를 updatedData 로 업데이트함
 */
router.get('/update', function(req,res){
    updatedData={
        firstname:'updated firstname',
        lastname: 'updated lastname'
    };

    data.update({firstname:"junjun"}, updatedData, function(err, myData){
        if(err) return res.json(err);
        res.redirect('/');
    });
});

///////////////////////////////////// session test /////////////////////////////////////

const user = require('../models/user');
router.get('/welcome', (req,res)=>{
    res.send('welcome!');
});

router.get('/session', (req,res)=>{
   res.render('login');
});

router.post('/session', (req,res,next)=>{
    let body = req.body;
    user.find({id:body.id}, (err, result)=>{
        if(err) return res.json(err);
        let id = body.id;
        let pw = body.pw;

        console.log('id : ' + id);
        console.log(`pw : ${pw}`);
    })

});



module.exports = router;