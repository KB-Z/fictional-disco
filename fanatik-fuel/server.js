const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const db = mongoose.connection;
require('dotenv').config();
const PORT = process.env.PORT;

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ISSUER = process.env.ISSUER;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.REDIRECT_URI;
// const BASE_URL = process.BASE_URL;
// const MONGODB_URI = process.env.MONGODB_URI;
//
// mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true }, () => {
//     console.log('connected to mongoose');
//   });

app.use(express.urlencoded({extended:true}));
// app.use(methodOverride('_method'));
// session support is required to use ExpressOIDC
app.use(session({
  secret: 'Maple Syrup',
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: ISSUER,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  appBaseUrl: 'http://localhost:3008',
  scope: 'openid profile'
});

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);

app.all('*', oidc.ensureAuthenticated());

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
