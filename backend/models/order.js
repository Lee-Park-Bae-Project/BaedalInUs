const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    title : {type:String},
    content: {type:String},
    author : {type:String},
    fee : {type:Number},
    dueDate:{type:Date},
    pirUrl:{type:String},
    addr:{type:String},
    orderState:{type:String},
    no:{type:Number}
});