var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Board = require('../models/board');
const moment = require('moment');
const upload = multer({dest: 'uploads/', limits:{fileSize: 5 * 1024 *1024}});
var faker = require('faker');
const users = require('../models/user');

router.post('/imageLoad', upload.single('img'), (req, res) => {
    console.log(req.file);
});

router.post('/postOrder', (req, res) => {

    //const no = req.body.no;
    //const id = req.body.board.id.toString();
    const title = req.body.board.title.toString();
    const content = req.body.board.content.toString();
    const fee = req.body.board.fee.toString();
    const addr = req.body.board.addr.toString();
    const due_date = req.body.board.dueDate.toString();
    const order_date = req.body.board.order_date;
    const userID = req.body.board.userID;
    const lat = req.body.board.lat;
    const lng = req.body.board.lng;

    //const dueDate = req.body.board.dueDate;
    //const pirUrl = req.body.board.pirUrl.toString();
    //const orderState = req.body.board.orderState;

    console.log(title);
    console.log(content);
    console.log(fee);
    console.log(addr);
    console.log();
    console.log(req.body);


    /*if(title.length==0)
    {
        console.log('write your title');
        res.status(200).json({complete:false}); // 실패 status code
    }*/
    var boardInfo = new Board({title:title, content:content, fee:fee ,addr:addr,dueDate:due_date,order_date:order_date});
    boardInfo.save();
    //console.log('asdfadf');
   /* for( let i=0;i<10;i++) {
        var boardInf = new Board({
            title: 'go '+i,
            content: 'fake '+i,
            fee: 'money '+i,
            addr: 'addr '+i
        });
        boardInf.save();
    }*/

    /**
     * 
     * @param {*} user : userID로 검색한 결과 object
     * oid 값, userID 값을 board collection에 넣어줌
     */
    const setBoard = (user)=>{
        console.log(user.length);
        if(user.length === 0){
            throw new Error('잘못된 접근입니다.'); // user collection에 해당하는 아이디가 없다는 것
        }
        
        let userOID = user[0]._id;

        var boardInfo = new Board({
            title: title,
            content: content,
            fee: fee,
            addr: addr,
            dueDate: due_date,
            order_date: order_date,
            location:{
                coordinates:[lng, lat]
            },
            userOID: userOID,
            userID: userID
        });

        boardInfo.save()
            .then(
                ()=>{
                    return 1;
                }
            )
            .catch(
                (err)=>{
                    throw new Error('잠시 후 다시 시도해 주십시오.')
                }
            );
    };


    const respond = ()=>{
        res.status(200).json({complete:true});
    };

    /**
     * 
     * @param {*} error 
     */
    const onError = (error)=>{
        console.log(error);
        res.status(201).json({message: error.message});
    }

    users.find({id:userID})
    .then(setBoard)
    .then(respond)
    .catch(onError);


    // var boardInfo = new Board({
    //     title: title,
    //     content: content,
    //     fee: fee,
    //     addr: addr,
    //     dueDate: due_date,
    //     order_date: order_date,
    //     location:{
    //         coordinates:[lng, lat]
    //     }
    // });
    // boardInfo.save()
    //     .then(
    //         ()=>{
    //             res.status(200).json({complete:true});
    //         }
    //     )
    //     .catch(
    //         (err)=>{
    //             res.status(202).json({coplete:false});
    //         }
    //     );


    // res.status(200).json({complete:true});

    //console.log('asdfadf');
    /* for( let i=0;i<10;i++) {
         var boardInf = new Board({
             title: 'go '+i,
             content: 'fake '+i,
             fee: 'money '+i,
             addr: 'addr '+i
         });
         boardInf.save();
     }*/
});
router.post('/postImage/:filename', (req, res, next) => {

});
router.post('/postUpdate/:id', (req, res, next) => {

    var id = req.params.id;
    Board.findByIdAndRemove(id, function (err, board) {
        if (err) {
            return next(new Error("There is no board match with id"))
        }
        res.json('Successfully removed')
    })
});
router.post('/postImage/:filename',(req,res,next)=>{

});
router.post('/postUpdate/:id',(req,res,next)=>{
    var id=req.params.id;
    Board.findByIdAndRemove(id,function (err,board) {
        if(err){
            return next(new Error("There is no board match with id"))
        }else {
            board.title = req.body.title;
            board.content = req.body.content;
            board.addr = req.body.addr;
            board.fee = req.body.fee;

            board.save({
                function(err, board) {
                    if (error) {
                        res.status(400);
                    } else {
                        res.status(200);
                    }
                }
            })
        }
    });
});

module.exports = router;
