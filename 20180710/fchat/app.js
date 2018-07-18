require('./config/config.js');
   
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session')({
  secret:process.env.SECRET,
  resave: true,
  saveUninitialized: true
});
var socketIO = require('socket.io');
var sharedsession = require("express-socket.io-session");
// var bootstrap = require('bootstrap');
var index   = require('./routes/index');
var signup  = require('./routes/signup');
var forgotpassword  = require('./routes/forgot-password');
var logout  = require('./routes/logout');
var chat    = require('./routes/chat');
var hayven    = require('./routes/hayven');
var call    = require('./routes/call');
var projects    = require('./routes/projects');
var quicklists    = require('./routes/quicklists');
var polls    = require('./routes/polls');
var notification    = require('./routes/notification');
var hvandroid    = require('./routes/hvandroid');
var workspaceSetting    = require('./routes/workspaceSetting');
var user_settings = require('./routes/user_settings');
var fdd = require('./routes/fdd');

alluserlist = []; // {user_id: '345234rqwerq3w452345452345dfadf', user_fullname: 'User Full Name'}

// Express
var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// app.use(fileUpload({
//   limits: { fileSize: 80 * 1024 * 1024 },
// }));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressSession({secret: 'keyboard3245235cat', resave: false, saveUninitialized: false}));
app.use(expressSession);
app.use( express.static( "public" ) );
// Socket.io
var io = socketIO();
app.io = io;
io.use(sharedsession(expressSession, {
  autoSave: true
}));
io.of('/namespace').use(sharedsession(expressSession, {
  autoSave: true
}));
var routes = require('./socket/socket.js')(io);

app.use('/', index);
app.use('/signup', signup);
app.use('/forgot-password', forgotpassword);
app.use('/logout', logout);
app.use('/chat', chat);
app.use('/hayven', hayven);
app.use('/call', call);
app.use('/projects', projects);
app.use('/quicklists', quicklists);
app.use('/polls', polls);
app.use('/notification', notification);
app.use('/hvandroid', hvandroid);
app.use('/settings', workspaceSetting);
app.use('/user_settings', user_settings);
app.use('/fdd', fdd);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error', {title: 'Not Found', bodyClass: ''});
  res.send(err.message);
});
// node --max-old-space-size=2000;
module.exports = app;
