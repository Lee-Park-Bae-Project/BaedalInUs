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

    console.log('------------req------------');
    console.log(`senderOID : ${senderOID}`);
    console.log(`senderID : ${senderID}`);
    console.log(`receiverOID : ${receiverOID}`);
    console.log(`receiverID : ${receiverID}`);
    console.log(`message : ${message}`);
    console.log(`date now : ${Date.now()}`);
    console.log('--------------------------------');

    // rooms.findOneAndUpdate({'user2': senderOID}, {
    //     $push: {
    //         messages:{
    //             sender: senderID,
    //             message: message,
    //             created: Date.now()
    //         }
    //     }
    // }, (err, result)=>{
    //     if(err){
    //         console.log(err);
    //         res.json(err);
    //     }
    //
    //     console.log(result);
    // });

    // (user1 = senderOID && user2 = receiverOID) || (user1 = receiverOID && user2 == senderOID)
    rooms.findOneAndUpdate({
            $or: [{'user1': senderOID, 'user2': receiverOID}, {
                'user1': receiverOID,
                'user2': senderOID
            }]
        },{$push:{
            messages:{
                sender: senderID,
                message: message,
                created: Date.now()
            }
        }}, (err, result) => {
            if (err) {
                res.json(err);
            }

            if (result) {
                // 있으니까 데이터 추가만 하면댐
                console.log(`있다`);
                console.log(result);
                // 저장 완료
                res.status(201).json({});
            }
            else {
                console.log(`없다`);
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
                    .then(() => {
                        // 저장완료
                        console.log(`in save then`);
                        res.status(201).json({});
                    })
                    .catch(() => {
                        // 저장 실패
                        console.log(`in save catch`);
                        res.status(202).json({});
                    });
            }


        }
    );

    // populate 예제
    // rooms.find({}, (err, result) => {
    //     if (err) {
    //         console.log(`level1 err : ${err}`);
    //         res.json(err);
    //     }
    // }).populate('user1', (err, result) => {
    //     if (err) {
    //         console.log(`level2 err : ${err}`);
    //         res.json(err);
    //     }
    // }).populate('user2', (err, result) => {
    //     if (err) {
    //         console.log(`level3 err : ${err}`);
    //         res.json(err);
    //     }
    //
    // }).exec((err, result) => {
    //     if (err) {
    //         console.log(`level4 err : ${err}`);
    //         res.json(err);
    //     }
    //     if (result) {
    //         console.log(`잇다`);
    //         console.log(`${result.length}개`);
    //     } else {
    //         console.log(`없다`);
    //     }
    //     console.log(`--------------level 4------------`);
    //     console.log(result);
    //     // console.log(result._id);
    //     // console.log(result.user1._id);
    //     // console.log(result.user2._id);
    //     console.log(`--------------level 4 end------------`);
    //
    //
    // });


})
;

// 아이디로 내 채팅목록 찾기
router.post('/getChatRooms', (req, res) => {
    let userID = req.body.user.id;
    let userOID = req.body.user.id;

    console.log(`userID : ${userID}`);
    console.log(`userOID : ${userOID}`);

    rooms.find({$or: {"user1": userOID, "user2": userOID}}, (err, result) => {
        if (err) res.json(err);
        console.log(result);
    })

});
module.exports = router;
