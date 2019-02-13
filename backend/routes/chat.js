var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const rooms = require('../models/rooms');
const users = require('../models/user');


function makeRet(user1, user2, sender, msg, updated, roomID, uncheckedMsg) {
    let ret = {
        user1ID: user1,
        user2ID: user2,
        sender: sender,
        message: msg,
        updated: updated,
        roomID: roomID,
        uncheckedMsg: uncheckedMsg
    };

    return ret;
}


// 채팅 목록 반환
router.post('/getChatRooms', (req, res) => {
    let userID = req.body.user.id;
    let userOID = req.body.user.oid;
    let ret = [];
    let sumOfUncheckedMsg = 0;
    console.log(`userID : ${userID}`);
    console.log(`userOID : ${userOID}`);

    // 받은 roomID로 방목록 만듬
    function getRoomInfoPromise(roomID, uncheckedMsg) {
        return new Promise(function (resolve, reject) {
            rooms.findOne({'roomID': roomID}, (err, result) => {
                if (err) reject(err);

                let len = result.messages.length;
                resolve(makeRet(result.user1ID, result.user2ID, result.messages[len - 1].sender, result.messages[len - 1].message, result.updated, roomID, uncheckedMsg));
            })
        })
    }

    // roomID 하나씪 getRoomInfoPromise에 넘겨줌
    async function getRoomInfo(rooms) {
        let len = rooms.length;
        for (let i = 0; i < len; i++) {
            let t = await getRoomInfoPromise(rooms[i].roomID, rooms[i].uncheckedMsg);
            console.log(t);
            ret.push(t);
            sumOfUncheckedMsg += rooms[i].uncheckedMsg;
        }
        res.status(200).json({ret, sumOfUncheckedMsg});

    }

    // 유저가 가진 방들 찾음
    users.findOne({'id': userID}, (err, result) => {
        if (err) res.status(204).json(err);
        getRoomInfo(result.rooms);

    });


});

// 특정 room 반환
router.post('/getRoom/:roomID', (req, res) => {
    console.log('get room');
    console.log(req.params);
    console.log(req.body);
    let roomID = req.params.roomID;
    let userID = req.body.userID;

    console.log('--------------------------------------------');
    console.log(`req.params : ${req.params}`);
    console.log(`roomID : ${roomID}`);
    console.log(`userID : ${userID}`);
    console.log('--------------------------------------------');

    rooms.findOne({'roomID': roomID}, (err, result) => {
        if (err) res.status(202);

        console.log(result);
        res.status(200).json(result);
    });

    // 확인 안한 메시지 0 개로 맞춤
    users.findOneAndUpdate({'id': userID, 'rooms.roomID': roomID}, {$set: {'rooms.$.uncheckedMsg': 0}})
        .then(
            (result) => {
                // console.log(result);
            }
        )
        .catch(
            (err) => {
                console.log(err);
            }
        )


});


// 새로운 메시지 왔을떄
router.post('/sendNewMsg', (req, res) => {
    let sender = req.body.sender;
    let newMsg = req.body.newMsg;
    let roomID = req.body.roomID;
    let socketID = req.body.socketID;
    let receiverID = req.body.receiverID;
    let created = req.body.created;

    console.log(`sender : ${sender}`);
    console.log(`newMsg : ${newMsg}`);
    console.log(`roomID : ${roomID}`);
    console.log(`receiverID : ${receiverID}`);
    console.log(`socketID : ${socketID}`);
    console.log(`created : ${created}`);

    // receiverID의 socket이 있을때만 쏴줘야

    // 확인안한 메시지 1증가

    console.log('새로운 메시지 디비에 추가');
    rooms.findOneAndUpdate({'roomID': roomID}, {$push: {messages: {sender: sender, message: newMsg, created: created}}})
        .then(
            (result) => {
                // console.log(result);
                console.log('-----------------------------');
                console.log('sender : ' + sender);
                console.log('message : ' + newMsg);
                console.log('created : ' + created);
                console.log('-----------------------------');
                res.status(200).json({complete: true, newMsg: {sender: sender, message: newMsg, created: created}});
            }
        )
        .catch(
            (err) => {
                console.log(err);
                res.status(201).json({complete: false, error: err});
            }
        );

    // users.findOneAndUpdate({'id': receiverID, 'rooms.roomID': roomID}, {$inc: {'rooms.$.uncheckedMsg': 1}})
    //     .then(
    //         (result) => {
    //             console.log(result);
    //             console.log('새로운 메시지 디비에 추가');
    //             return rooms.findOneAndUpdate({'roomID': roomID}, {$push: {messages: {sender: sender, message: newMsg, created: created}}})
    //         }
    //     )
    //     .then(
    //         (result)=>{
    //             console.log(result);
    //             console.log('-----------------------------');
    //             console.log('sender : ' + sender);
    //             console.log('message : ' + newMsg);
    //             console.log('created : ' + created);
    //             console.log('-----------------------------');
    //
    //             res.status(200).json({complete: true, newMsg: {sender: sender, message: newMsg, created: created}});
    //         }
    //     )
    //     .catch(
    //         (err)=>{
    //             console.log(err);
    //             res.status(201).json({complete: false, error: err});
    //         }
    //     );

});

// 처음 대화일떄 대화방 만들기
router.post('/makeRoom', (req, res) => {
    console.log(`in chat / makeRoom`);
    console.log(req.body);
    const senderOID = req.body.room.senderOID;
    const senderID = req.body.room.senderID;
    const receiverOID = req.body.room.receiverOID;
    const receiverID = req.body.room.receiverID;
    const message = req.body.room.message;
    const created = req.body.room.created;

    console.log('------------req------------');
    console.log(`senderOID : ${senderOID}`);
    console.log(`senderID : ${senderID}`);
    console.log(`receiverOID : ${receiverOID}`);
    console.log(`receiverID : ${receiverID}`);
    console.log(`message : ${message}`);
    console.log(`created : ${created}`);

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
    rooms.findOneAndUpdate(
        {
            $or: [{'user1': senderOID, 'user2': receiverOID}, {'user1': receiverOID, 'user2': senderOID}]
        },
        {
            $push: {
                messages: {
                    sender: senderID,
                    message: message,
                    created: created
                }
            }
        }, (err, result) => {
            if (err) {
                res.json(err);
            }

            if (result) {
                // 있으니까 데이터 추가만 하면댐
                console.log(`방있음`);
                console.log(result);
                // 저장 완료
                res.status(201).json({});
            }
            else {
                console.log(`방 없음`);
                let newRoomID = rooms.makeRoomID(); // rooms에 static method
                console.log(`newRoomID : ${newRoomID}`);
                let newRoom = new rooms({
                        roomID: newRoomID,
                        user1: senderOID,
                        user2: receiverOID,
                        user1ID: senderID,
                        user2ID: receiverID,
                        messages: [
                            {
                                sender: senderID, // 보낸사람
                                message: message, // 메시지 내용
                                created: created // 보낸 시각
                            }
                        ],
                        updated: created
                    }
                );

                // 저장
                newRoom.save()
                    .then(() => {
                        // 저장완료
                        console.log(`in save then`);
                        users.findOneAndUpdate(
                            {'id': senderID},
                            {
                                $push: {
                                    rooms: {
                                        roomID: newRoomID
                                    }
                                }
                            }, (err, result) => {
                                if (err) res.json(err);
                                console.log(`유저 콜렉션에 roomid 저장`);
                                console.log(result);

                                users.findOneAndUpdate(
                                    {'id': receiverID},
                                    {
                                        $push: {
                                            rooms: {
                                                roomID: newRoomID,
                                                uncheckedMsg: 1
                                            }
                                        }
                                    }, (err, result) => {
                                        if (err) res.json(err);
                                        console.log(`유저 콜렉션에 roomid 저장`);
                                        console.log(result);
                                        res.status(201).json({});

                                    }
                                );

                            }
                        );

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


});

router.post('/getSumOfUnCheckMsg', (req, res) => {
    let id = req.body.id;
    users.findOne({'id': id})
        .then(
            (result) => {
                // getSumOfUncheckedMsg(result.rooms);
                let ret = 0;
                for (let i = 0; i < result.rooms.length; i++) {
                    ret += result.rooms[i].uncheckedMsg;
                }

                res.status(200).json({sumOfUncheckedMsg: ret});

            }
        )
        .catch(
            (err) => {
                console.log(err);
                res.status(201).json({err: err});
            }
        )
});

module.exports = router;