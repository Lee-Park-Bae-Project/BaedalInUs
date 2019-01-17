const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// const passport = require('passport');
// const passportConfig = require('./passport');
// passportConfig(passport);
const session = require('express-session');

const indexRouter = require('./routes/index');
const testRouter = require('./routes/test');
const apiTestRouter = require('./routes/apiTest');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//asd

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express-session({ secret: '1234', resave: true, saveUninitialized: false })); // 세션 활성화
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

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/api', apiTestRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const db = mongoose.connection;
// db 열기
db.once('open', function () {
    console.log('Connected!');
});


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

app.listen(3000, function(){
  console.log('Baedal in us listening on port 3000!');
});







module.exports = app;