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
router.post('/singlePage/:ids',(req,res)=>{
    console.log('123456789');
    board.find({"id":ids}).exec(function(err,boards) {
        if (err) {
            res.status(208).json(err);
        }
        console.log(boards.title);
        res.status(419).json(boards);
    });
});
router.post('/orderPage/:page',(req,res)=>{
    var perPage= 10;
    let len=0;
    console.log('fdfd');
    console.log(req.params.page);
    board.find({}).skip((perPage * req.params.page)-perPage).limit(perPage).exec(function(err, boards) {
        if (err) {
            res.status(205).json(err);
        }
        console.log(boards.title);
        res.status(200).json(boards);
    });

});
module.exports=router;



