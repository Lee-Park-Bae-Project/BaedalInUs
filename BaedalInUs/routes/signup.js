var express = require('express');
var router = express.Router();



router.get('/', (req,res)=>{
   res.render('signup');
});

router.post('/signup', (req, res)=>{
    //id 중복검사 해야함
    console.log(req.body);
    var id = req.body.id;
    var pw = req.body.pw;
    res.render('signup');
});

module.exports = router;