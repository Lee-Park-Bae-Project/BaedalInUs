var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Board = require('../models/board');
const upload = multer({dest: 'uploads/', limits:{fileSize: 5 * 1024 *1024}});

router.post('/imageLoad',upload.single('img'),(req,res)=>{
        console.log(req.file);
});

router.post('/postOrder',(req,res)=>{

        //const no = req.body.no;
        //const id = req.body.board.id.toString();
        const title = req.body.board.title.toString();
        const content =req.body.board.content.toString();
        const fee = req.body.board.fee.toString();
        const addr = req.body.board.addr.toString();
        const due_date = req.body.board.dueDate.toString();
        const order_date = req.body.board.order_date;
        //const dueDate = req.body.board.dueDate;
//    const pirUrl = req.body.board.pirUrl.toString();
        //const orderState = req.body.board.orderState;

        console.log(title);
        console.log(content);
        console.log(fee);
        console.log(addr);
        console.log();

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
});
router.post('/postDelete/:id',(req,res)=> {

        var id = req.params.id;
        Board.findByIdAndRemove(id, function (err, board) {
                if (err) {
                        return next(new Error("There is no board match with id"))
                }
                res.json('Successfully removed')
        })
});
router.post('/postImage/:filename',(req,res,next)=>{

})
router.post('/postUpdate/:id',(req,res,next)=>{
        var id=req.params.id;
        Board.findByIdAndRemove(id,function (err,board) {
                if(err){
                        return next(new Error("There is no board match with id"))
                }else{
                        board.title=req.body.title;
                        board.content=req.body.content;
                        board.addr=req.body.addr;
                        board.fee=req.body.fee;
                        board.save({
                                function(err,board){
                                        if(error){
                                                res.status(400);
                                        }else{
                                                res.status(200);
                                        }
                                }
                        })
                }
        })
});

module.exports = router;