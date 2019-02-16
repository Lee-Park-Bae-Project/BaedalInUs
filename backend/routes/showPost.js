var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const board = require('../models/board');


router.post('/showAllBoard',(req,res,next)=>{
board.find(function (err,boards) {
    if(err){
       res.status(205).json(err);
    }
    console.log(boards.title);
    res.status(200).json(boards);
    })

})
module.exports=router;
















module.exports = router;