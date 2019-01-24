const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        // mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true},  (err) => {
        mongoose.connect('mongodb://admin:0192@13.209.35.139:27017/admin',{useNewUrlParser: true},  (err) => {
        if (err) {
                console.log('mongodb connection error', err);
            } else {
                console.log('mongodb connection success');
            }
        });

    };

    connect();
    mongoose.connection.on('error', (err)=>{
        console.log(' mongodb connection error', err);
    });
    mongoose.connection.on('disconnected', ()=>{
        console.log('mongodb connection is lost, trying to re-connect to mongodb.');
        connect();
    });
    require('./models/user');
    require('./models/order');

};
