const rooms = require('../../../models/rooms');
const users = require('../../../models/user');


exports.getChatRooms = (req, res)=>{

    let userID = req.decoded.userID;
    let ret=[];
    console.log('userID: ' + userID);


    const makeRet = (res)=>{
        return new Promise(((resolve, reject) =>{
            if(!res){
                reject();
            }
            let len = res.rooms.length;
            console.log('room :' + len); // number of rooms

            for(i=0;i<len;i++){
                ret.push({
                    'sender': res.rooms[i].room.messages[0].sender,
                    'message': res.rooms[i].room.messages[0].message,
                    'updated': res.rooms[i].room.messages[0].created,
                    'user1ID': res.rooms[i].room.user1,
                    'user2ID': res.rooms[i].room.user2
                })
                console.log('ret: ' + ret);
            }
            resolve();

        }))

    }
    const onError = (err) => {
        console.log(err.message);
        res.status(403).json({
            complete: false,
            message: err.message
        })
    }

    const respond = () => {
        res.status(200).json({chatRooms: ret});
    }

    users.findOne({'id':userID})
        .populate({path:'rooms.room'})
        .then(res=>{
            return res;
        })
        .then(makeRet)
        .then(respond)
        .catch(onError)


    // TODO: 필요한것 - 상대방 아이디, 마지막 업데이트 시각, 마지막 메시지 --
    //
    // // roomID 하나씪 getRoomInfoPromise에 넘겨줌
    // async function getRoomInfo(rooms) {
    //     let len = rooms.length;
    //     try {
    //
    //         for (let i = 0; i < len; i++) {
    //             let t = await getRoomInfoPromise(rooms[i].roomID, rooms[i].uncheckedMsg);
    //             // console.log(t);
    //             ret.push(t);
    //
    //             sumOfUncheckedMsg += rooms[i].uncheckedMsg;
    //         }
    //     } catch (error) {
    //         res.status(202).json({err:error});
    //     }
    //     // console.log('정렬 전');
    //     // console.log(ret);
    //     // updated 내림차순 정렬
    //     ret.sort(function(a,b){
    //         return a.updated > b.updated ? -1 : a.updated < b.updated ? 1 : 0;
    //     });
    //     // console.log('정렬 후');
    //     // console.log(ret);
    //
    //     res.status(200).json({ret, sumOfUncheckedMsg});
    //
    // }
    //
    // // 유저가 가진 방들 찾음
    // users.findOne({'id': userID}, (err, result) => {
    //     if (err) res.status(204).json(err);
    //     getRoomInfo(result.rooms);
    // });
}

exports.getRoom = (req, res)=>{
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

}

exports.sendMsg = (req, res)=>{
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
    console.log('roomID : ' + roomID); // roomID 만듬. id는 유니크해서 이렇게 가능

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
                    // roomID: roomID,
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
                        console.log('====================');
                        console.log(res);
                        console.log('====================');

                        users.findOneAndUpdate(
                            {'id': sender},
                            {$push: {rooms: {roomID: roomID, room:res._id}}}
                        )
                            .catch(err=>{
                                reject(err);
                            });

                        users.findOneAndUpdate(
                            {'id': receiver},
                            {$push: {rooms: {roomID: roomID, room:res._id}}}
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

}

exports.makeRoom = (req, res)=>{
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
                // console.log(result);
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
                                // console.log(result);

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
                                        // console.log(result);
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

}

exports.getSumOfUnCheckMsg = (req, res)=>{
    console.log('ok');

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
}
