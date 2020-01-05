const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
// const mongoose = require('mongoose');
const { ExpressOIDC } = require('@okta/oidc-middleware');
require('dotenv').config();
// const db = mongoose.connection;
const PORT = process.env.PORT;

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ISSUER = process.env.ISSUER;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.REDIRECT_URI;
const oidc = new ExpressOIDC({
  issuer: ISSUER,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  appBaseUrl: 'http://localhost:3008',
  scope: 'openid profile'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Maple Syrup',
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);


app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

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

app.get('/', (req, res) => {
  if (req.userContext.userinfo) {
    res.send(`Hi ${req.userContext.userinfo.name}!`);
  } else {
    res.send('Hi!');
  }
});

oidc.on('ready', () => {
  app.listen(3008, () => console.log(`Started!`));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});

app.listen(PORT, () => {
  console.log('Herro');
});

module.exports = app;
