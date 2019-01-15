var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport');
// const passportConfig = require('./passport');
// passportConfig(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var apiTestRouter = require('./routes/apiTest');
// var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');


var app = express();


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
app.use(passport.initialize()); // req 객체 내애 apassport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport 정보를 저장함

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/api', apiTestRouter);
// app.use('/login', loginRouter);
app.use('/signup', signupRouter);



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
