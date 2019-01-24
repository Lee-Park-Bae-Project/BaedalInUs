var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/user');

router.post('/', (req,res)=>{
    console.log(`in users`);
    user.find({}, (err, result)=>{
        if(err) return res.json(err);

        console.log(result);
        console.log(result.length);

        res.status(200).json(result);
    }).select(`id`);

});
module.exports = router;