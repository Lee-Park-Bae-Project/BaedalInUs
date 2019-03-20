var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//const multer = require('multer');
const board = require('../models/board');

// router.post('/showAllBoard', function(req, res){
//     console.log('hi');
//     console.log(req.body);
//     res.end('123');
// });
router.post('/orderPage/:page',(req,res)=>{
    var perPage= 10;
    let len=0;
    console.log('fdfd');
    console.log(req.params.page);
    board
        .find({})
        .populate('userOID')
        .skip((perPage * req.params.page)-perPage)
        .limit(perPage)
        .exec(function(err, boards) {
        if (err) {
            res.status(205).json(err);
        }
        //len = board.count();


        res.status(200).json(boards);
    });

});
module.exports=router;



