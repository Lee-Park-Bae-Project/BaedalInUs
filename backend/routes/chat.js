var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const rooms = require('../models/rooms');
const users = require('../models/user');

// 채팅 목록 반환
router.post('/getChatRooms', (req, res) => {
    console.log(`in chat / getChatRooms`);
    const userOID = req.body.user.oid.toString();
    const userID = req.body.user.id.toString();

    console.log(`userOID : ${userOID}`);
    console.log(`userID : ${userID}`);

    rooms.find({$or: [{'user1': userOID}, {'user2': userOID}]}, (err, result) => {
        if (err) return res.json(err);

        console.log(result);
        console.log(result.length);
        if (result.length !== 0) {
            res.status(200).json(result);
        } else {
            res.status(204);
        }

    });
});

router.post('/makeRoom', (req, res) => {
    console.log(`in chat / makeRoom`);
    console.log(req.body);
    const senderOID = req.body.room.senderOID;
    const senderID = req.body.room.senderID;
    const receiverOID = req.body.room.receiverOID;
    const receiverID = req.body.room.receiverID;
    const message = req.body.room.message;

    console.log(`senderOID : ${senderOID}`);
    console.log(`senderID : ${senderID}`);
    console.log(`receiverOID : ${receiverOID}`);
    console.log(`receiverID : ${receiverID}`);
    console.log(`message : ${message}`);
    console.log(`date now : ${Date.now()}`);
    // 새로운 방 데이터 생성
    let newRoom = new rooms({
            // roomID: rooms.setRoomID(senderOID, receiverOID),
            user1: senderOID,
            user2: receiverOID,
            messages: [
                {
                    sender: senderID, // 보낸사람
                    message: message, // 메시지 내용
                    created: Date.now() // 보낸 시각
                }
            ],
            updated: Date.now()
        }
    );
    newRoom.setRoomID = 1;

    // 저장
    newRoom.save()
        .then(()=>{
            console.log(`in save then`);
            res.status(201).json({});
        })
        .catch(()=>{
            console.log(`in save catch`);
            res.status(202).json({});
        });
});
module.exports = router;