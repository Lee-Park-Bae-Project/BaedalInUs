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
// TODO : 새로운 메시지가 왔을때 chatRooms에서 목록에서 빼서 맨앞으로 넣기 (), 페이지 네이션 추가
router.post('/getChatRooms', (req, res) => {
    let userID = req.body.user.id;
    // let userOID = req.body.user.oid;
    let ret = [];
    let sumOfUncheckedMsg = 0;
    console.log(`userID : ${userID}`);
    // console.log(`userOID : ${userOID}`);

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
        try {

            for (let i = 0; i < len; i++) {
                let t = await getRoomInfoPromise(rooms[i].roomID, rooms[i].uncheckedMsg);
                // console.log(t);
                ret.push(t);

                sumOfUncheckedMsg += rooms[i].uncheckedMsg;
            }
        } catch (error) {
            res.status(202).json({err:error});
        }

        // console.log('정렬 전');
        // console.log(ret);
        // updated 내림차순 정렬
        ret.sort(function(a,b){
            return a.updated > b.updated ? -1 : a.updated < b.updated ? 1 : 0;
        });
        // console.log('정렬 후');
        // console.log(ret);

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

        // console.log(result);
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

router.post('/sendMsg', (req, res)=>{
    console.log(req.body);
    let msg = req.body.msg;
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let created = req.body.created;
    let roomID='';

    console.log('--------------받은 값-------------');
    console.log('msg: ' + msg);
    console.log('sender: ' + sender);
    console.log('receiver: ' + receiver);
    console.log('created: ' + created);
    console.log('--------------------------------');

    sender = String(sender);
    receiver = String(receiver);

    if(sender > receiver){
        console.log(`sender 큼`);
        roomID = sender.concat(receiver);
    } else{
        console.log(`receiver 큼`);
        roomID = receiver.concat('', sender);
    }
    console.log('roomID : ' + roomID); // roomID 만듬. id는 유니크해서 이렇게 가능?

    /**
     * 새로운 roomID 생성
     */
    rooms.roomIDSHA256(roomID, (res, err)=>{
        if(err) reject(new Error(err));
        roomID = res;
        console.log(roomID);
    });

    /**
     * sender, receiver 로 특정 roomID 를 찾음
     * 방이 있냐 없냐를 리턴
     */
    const findRoom = ()=>{
        return new Promise(function (resolve, reject){
            rooms.findOne({'roomID' : roomID})
                .then(res=>{
                    if(res === null){
                        // 결과가 없음, 방이 없음, 새로만들어야함
                        resolve(false);
                    } else{
                        // 겨로가가 있음, 방이 있음, 메시지 푸쉬만 하면댐
                        resolve(true);
                    }
                })
                .catch(err=>{
                    reject(new Error('잠시 후 다시 시도해 주십시오'));
                })
        });
        
    };

    /**
     * 방이 없는 경우 방을 새로 만듬
     */
    const makeRoom = (isRoomExist)=>{
        if(isRoomExist){
            return true;
        } else{
            // 방을 생성하는 프로미스
            return new Promise(function(resolve, reject){
                let newRoom = new rooms({
                    roomID: roomID,
                    user1: sender,    // 유저 1 아이디
                    user2: receiver,  // 유저 2 아이디
                    created: created, // 생성 시각
                    updated: created, // 마지막 업데이트 시각
                    messages:{
                        sender: sender, // 메시지 보낸 사람
                        message: msg,   // 메시지 내용
                        created: created // 메시지 생성시각
                    }
                });
                newRoom.save()
                    .then((res)=>{
                        /**
                         * 유저의 rooms에 새로운 방 id 추가
                         */
                        users.findOneAndUpdate(
                                {'id': sender}, 
                                {$push: {rooms: {roomID: roomID}}}
                            )
                            .catch(err=>{
                                console.log('sender에 룸 푸쉬하다가 터짐');
                                reject(err);
                            });
    
                        users.findOneAndUpdate(
                                {'id': receiver},
                                {$push: {rooms: {roomID: roomID}}}
                            )
                            .catch(err=>{

                                reject(err);
                            });
                        resolve(false);
                    })
                    .catch(err=>{
                        console.log(err);
                        reject(new Error('잠시 후 다시 시도해 주십시오'));
                    })
            });

        }
    };

    /**
     * 새로운 메시지를 roomID에 저장
     * isRoomExist가 true이면 새로운 메시지 추가만 하면댐
     * isRoomExist가 false 이면 방을 만들고 메시지 추가해야함
     */
    const storeNewMsg = (isRoomExist)=>{
        if(isRoomExist){
            return new Promise(function(resolve, reject){

                rooms.findOneAndUpdate({'roomID': roomID},
                    {$push:
                        {
                            messages:{
                                sender: sender,
                                message: msg,
                                created: created
                            }
                        }
                    },
                    {
                        updated: created
                    })
                    .then(res=>{
                        // console.log(res);
                        resolve(res);
                    })
                    .catch(err=>{
                        console.log(err);
                        reject(err);
                    })
            });
        } else{
            return false;
        }
    };

    const onError = (err) => {
        console.log(err.message);
        res.status(403).json({
            complete: false,
            message: err.message
        })
    }

    const respond = () => {
        res.status(200).json({complete: true});
    }

    findRoom()
        .then(makeRoom)
        .then(storeNewMsg)
        .then(respond)
        .catch(onError);

});



module.exports = router;
