import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './components/Login';

const config = {
  issuer: 'https://dev-732359.okta.comDashboard/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa2dco59cSnOEHvP357',
  pkce: true
}

class App extends React.Component{
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
      <Router>
        <Security {...config}>
          <Login/>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
          <div className='sidebarStyle'>
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          </div>
          <div ref={el => this.mapContainer = el} className='mapContainer' />
        </Security>
      </Router>
    );
  }
}

export default App;
