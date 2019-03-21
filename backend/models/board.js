const mongoose = require('mongoose');
const user = require('./user');

const boardSchema = mongoose.Schema({
        //no:{type:Number},
        //id : {type:String},
         id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},// 글 쓴 id
        userOID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},// 글 쓴 id
        userID: {type:String},
        title: {type: String},
        content: {type: String},
        fee: {type: Number},
        addr: {type: String},
         //order_update: {type: Date, required: false},// 수정된 날짜
        dueDate:{type:String},
        order_date: {type: Date, default: Date.now},// 주문 날짜
        //order_update: {type: Date, required: false},// 수정된 날짜
        //pirUrl:{type:String},
        //orderState:{type:Boolean, default:false}
        location: {
            type: {
                type: String,
                default: 'Point'
            },
            coordinates: [Number]
        }
    },
);
boardSchema.index({location: '2dsphere'});
module.exports = mongoose.model('board', boardSchema, 'board');
