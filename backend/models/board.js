const mongoose = require('mongoose');
const user = require('./user');


const boardSchema = mongoose.Schema({
        //no:{type:Number},
        //id : {type:String},
        // id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},// 글 쓴 id
        title: {type: String},
        content: {type: String},
        fee: {type: Number},
        addr: {type: String},
        // order_date: {type: Date, default: Date.now},// 주문 날짜
        // order_update: {type: Date, required: false}// 수정된 날짜
        //dueDate:{type:Date},
        //pirUrl:{type:String},
        //orderState:{type:Boolean, default:false}

    },
);

module.exports = mongoose.model('board', boardSchema, 'board');