var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const session = require('express-session');

const indexRouter = require('./routes/index');
const testRouter = require('./routes/test');
const apiTestRouter = require('./routes/apiTest');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const mailRouter = require('./routes/mail');
const chatRouter = require('./routes/chat');

const connect = require('./mongo');
// const io = require('socket.io');

var usersRouter = require('./routes/users');
// var app = express();

const app = require('express')();
// const server = require('http').createServer(app);

connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('connect-history-api-fallback')()); // vue router 와 연결해줌
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('1234'));
app.use(session({
    secret: '1234', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
    resave: false,                                   //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: false,                  //세션 아이디를 실제 사용하기전에는 발급하지 않음
    cookie: {
        httpOnly:true,
        seucre:false,
    },

}));

app.use('/users', usersRouter);

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/api', apiTestRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/mail', mailRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
const webSocket = require('./socket');

webSocket(server);
// const io = require('socket.io')(server);

// io.on('connection', function(socket){
//     console.log(`in connection ${socket.id}`);
//     console.log(socket.id);
//
//     socket.on('SEND_MAEESAGE', function(data){
//         console.log(`MESSAGE : ${data}`);
//         console.log(`user : ${data.user}`);
//         console.log(`message : ${data.message}`);
//         io.emit('MESSAGE', data); // 이 서버에 리스닝중인 모든 클라들에게 날림
//     })
// });

module.exports = app;