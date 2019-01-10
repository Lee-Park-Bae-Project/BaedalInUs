var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;

db.on('error', function(){
  console.log('Connection Failed!');
});

db.once('open', function(){
  console.log('Connected!');
});

// var testSchema = mongoose.Schema({
//     key:'string',
//     value:'string'
// });
//
// var testModel = mongoose.model('test', testSchema);
//
// var testData = new testModel({key:'new Key', value:'new value'});
//
// testData.save(function(error, data){
//   if(error){
//     console.log(error);
//   } else{
//     console.log('saved!');
//   }
// });
//
// testModel.find(function(err, data){
//   console.log('--- Read all ---');
//   if(err){
//     console.log(err);
//   } else{
//     console.log(data);
//   }
// });


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;