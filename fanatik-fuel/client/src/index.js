import React from 'react';
import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl';
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';
// import './index.css';
// import config from './app.config';
import App from './App';
import * as serviceWorker from './serviceWorker';

// mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_API_KEY}`;

const oktaConfig = {
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
};

// function onAuthRequired({ history }) {
//   history.push('/login');
// }

ReactDOM.render(
  <BrowserRouter>
    <Security {...oktaConfig}>
      <App />
    </Security>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) module.hot.accept();
