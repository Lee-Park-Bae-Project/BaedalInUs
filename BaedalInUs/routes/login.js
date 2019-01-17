const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/user');
router.get('/', (req, res) => {
    let session = req.session;
    console.log(session.user_uid);
    res.render('login', {session: session});
});

router.get('/logout', (req, res) => {
    console.log('in logout // get');
    let session = req.session;
    console.log(session.user_uid);
    if(session.user_uid){
        // 세션 삭제
        req.session.destroy(function(err){
            if(err) console.log(err);
        });
    }
    console.log('after delete session');
    console.log(session.user_uid);
    res.redirect('/login');
});

router.post('/', (req, res) => {
    const id = req.body.id.toString();
    const pw = req.body.pw.toString();
    // console.log(`id: ${id}`);
    // console.log(`pw: ${pw}`);

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');

    user.find({id: id}, (err, result) => {
        if (err) return res.json(err);

        if (result.length != 0) {
            // 아이디 있는 경우
            if (user.authenticate(pw, result[0].password, result[0].salt)) {
                console.log(`authenticate complete`);
                req.session.user_uid = id;
                res.redirect('/login');
            } else {
                console.log(`authenticate fail`);
                res.end('password is not correct');
            }
        } else {
            // 아이디 없는 경우
            res.end('id is not registered');
        }
    });

});


module.exports = router;