import React, { Fragment, Component } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

// import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker } from 'react-map-gl';
import AppHeader from './components/AppHeader';
// import Home from './pages/Home';
import PostsManager from './pages/PostsManager';
// import MapGL from './components/MapGL';
import './App.css';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: "100vw",
        height: "98vh",
        latitude: 33.748795,
        longitude: -84.384904,
        zoom: 10
      },
      userLocation: {}
    }
  }
  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      let newViewport = {
        height: "98vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 16
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation
      });
    });
  };
  render(){
    return(
      <Fragment>
        <CssBaseline />
        <AppHeader setUserLocation={this.setUserLocation} />
        <main>
          <div className="map">
            <ReactMapGL
            {...this.state.viewport}
            mapStyle="mapbox://styles/zdonner179/ck4sq2ix3027r1cl58pru9005"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            onViewportChange={viewport => this.setState({viewport})}>
            {Object.keys(this.state.userLocation).length !== 0 ? (
              <Marker
                latitude={this.state.userLocation.lat}
                longitude={this.state.userLocation.long}
              >
                <img className="location-icon" src="ICON-MEET-CARBON-3X.png" />
              </Marker>
            ) : (
              <div>Empty</div>
            )}
            </ReactMapGL>
          </div>
          <SecureRoute path="/posts" component={PostsManager} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
        </main>
      </Fragment>
  )}
};

export default withStyles(styles)(App);
