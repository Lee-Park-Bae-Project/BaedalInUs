var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const rooms = require('../models/rooms');

// 채팅 목록 반환
router.post('/getChatRooms', (req, res)=>{
    rooms.find({}, (err, result)=>{
        if(err) return res.json(err);

        console.log(result);
        console.log(result.length);

        res.status(200).json(result);
    });
});
module.exports = router;