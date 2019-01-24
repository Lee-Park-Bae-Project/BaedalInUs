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
//
router.post('/', (req, res) => {
    console.log(`in /login post`);
    console.log(req.body);
    const id = req.body.user.id.toString();
    const pw = req.body.user.pw.toString();
    console.log(`id: ${id}`);
    console.log(`pw: ${pw}`);

    // res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    user.find({id: id}, (err, result) => {
        if (err) return res.json(err);
        console.log(`-------------------result-----------------`);
        console.log(result);

        if (result.length != 0) {
            // 아이디 있는 경우
            if (user.authenticate(pw, result[0].password, result[0].salt)) {
                console.log(`authenticate complete`);
                req.session.user_uid = id;
                console.log(`test oid : ${result[0]._id}`);
                res.status(200).json({complete:true, oid:result[0]._id}); // 성공 status code
                console.log(res);
                // res.redirect('/login');
            } else {
                console.log(`authenticate fail`);
                res.status(200).json({complete:false}); // 실패 status code
            }
        } else {
            // 아이디 없는 경우
            res.status(201).json({complete:false});
            // res.end('id is not registered');
        }
    });
});

module.exports = router;