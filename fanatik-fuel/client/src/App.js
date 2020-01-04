import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import config from './app.config';
import mapboxgl from 'mapbox-gl';
// import './index.css';
import './App.css';
// import Home from './Home';
// import Login from './components/Login';

// mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_API_KEY}`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/zdonner179/ck4sq2ix3027r1cl58pru9005',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <main>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/login"
            render={() => <LoginPage baseUrl={config.url} />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/register" component={RegistrationForm} />
          <SecureRoute path="/profile" component={ProfilePage} />
        </main>
          <div className='sidebarStyle'>
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          </div>
          <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    );
  }
}
