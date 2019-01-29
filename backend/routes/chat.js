var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const rooms = require('../models/rooms');
const users = require('../models/user');


function makeRet(user1, user2, sender, msg, updated) {
    let ret = {
        user1ID: user1,
        user2ID: user2,
        sender: sender,
        message: msg,
        updated: updated
    };

    return ret;
}

// function getRoomInfo(roomID) {
//     return new Promise(function (resolve, reject) {
//         console.log(`getRoomInfo start ${roomID}`);
//
//         rooms.findOne({'roomID': roomID})
//             .then((result) => {
//                 console.log(`result : ${result}`);
//                 resolve(makeRet(result.user1, result.user2, result.messages[0].sender, result.messages[0].message, result.updated));
//             })
//             .catch((err) => reject(err))
//     })
// }
//
// async function promise2(roomIDs) {
//     console.log(`promise2 start : ${roomIDs.length}`);
//     let ret = [];
//
//     // roomIDList.push(await Promise.all(roomIDs.map(async i => await extRoomID(i))));
//     // return ret.push(await Promise.all(roomIDList.map(async i => await getRoomInfo(i))));
//
//     try {
//         for (let i = 0; i < roomIDs.length; i++) {
//             let temp = await getRoomInfo(roomIDs[i].roomID);
//             console.log(`----------temp----------`);
//             console.log(temp);
//             ret.push(temp);
//         }
//         return ret;
//
//     } catch (err) {
//         return {error: err}
//     }
//
//
// }
//
// function promise1(userID) {
//     return new Promise(function (resolve, reject) {
//         console.log(`promise1 start ${userID}`);
//
//         users.findOne({'id': userID})
//             .then((result) => {
//                 resolve(result.rooms)
//             })
//             .catch((err) => reject(err))
//     })
// }



// 채팅 목록 반환
router.post('/getChatRooms', (req, res) => {
    let userID = req.body.user.id;
    let userOID = req.body.user.oid;
    let ret=[];
    console.log(`userID : ${userID}`);
    console.log(`userOID : ${userOID}`);

    function getRoomInfoPromise(roomID){
        return new Promise(function (resolve, reject){
            rooms.findOne({'roomID':roomID}, (err, result)=>{
                if(err) reject(err);
                resolve(makeRet(result.user1ID, result.user2ID, result.messages[0].sender, result.messages[0].message, result.updated));
            })
        })
    }

    async function getRoomInfo(rooms){
        let len = rooms.length;
        for(let i=0;i<len;i++){
            let t = await getRoomInfoPromise(rooms[i].roomID);
            console.log(t);
            ret.push(t);
            console.log(ret);
        }
        res.status(200).json({complete:ret});

    }


    users.findOne({'id': userID}, (err, result) => {
        if (err) res.status(204).json(err);
        getRoomInfo(result.rooms);

    });



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
    rooms.findOneAndUpdate(
        {
            $or: [{'user1': senderOID, 'user2': receiverOID}, {'user1': receiverOID, 'user2': senderOID}]
        }, {
            $push: {
                messages: {
                    sender: senderID,
                    message: message,
                    created: Date.now()
                }
            }
        }, (err, result) => {
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
                let newRoomID = rooms.makeRoomID();
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
                                created: Date.now() // 보낸 시각
                            }
                        ],
                        updated: Date.now()
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
                                                roomID: newRoomID
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


})
;


module.exports = router;
