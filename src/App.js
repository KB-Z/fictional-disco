import React, { Fragment, Component } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import ReactMapGL, { Marker } from 'react-map-gl';
import AppHeader from './components/AppHeader';
// import PostsManager from './pages/PostsManager';
import './App.css';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

class Markers extends Component {
  render() {
    if(this.props.events){
    const data = this.props.events;
    return data.map(
      event => <Marker key={event.name} longitude={event.lng} latitude={event.lat} ><img className="location-icon" src="ICON-MEET-CARBON-3X.png" alt="userImg" /></Marker>
      )
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 33.748795,
        longitude: -84.384904,
        zoom: 10
      },
      userLocation: {},
      markers: [],
      events: []
    }
  }
  onClickMap = (e) => {
    console.log(e.lngLat);
    let setMarker = {
      lng: e.lngLat[0],
      lat: e.lngLat[1]
    };
    this.state.markers.push(setMarker);
    this.setState({
      events: this.state.markers
    });
    console.log(this.state.events);
    e.stopPropagation();
  };
  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      let newViewport = {
        height: "100vh",
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
            onViewportChange={viewport => this.setState({viewport})}
            onDblClick={this.onClickMap}
            doubleClickZoom={false}>
            {Object.keys(this.state.userLocation).length !== 0 ? (
              <Marker
                latitude={this.state.userLocation.lat}
                longitude={this.state.userLocation.long}
              >
                <img className="location-icon" src="ICON-MEET-CARBON-3X.png" alt="userImg" />
              </Marker>
            ) : (
              <div>Empty</div>
            )}
            <>
              {this.state.markers.map((event, index) => (
                <Marker key={index}
                  longitude={event.lng}
                  latitude={event.lat}
                >
                  <img className="location-icon" src="ICON-MEET-CARBON-3X.png" alt="eventImg" />
                </Marker>
              ))}
            </>
            </ReactMapGL>
          </div>
          <Route path="/implicit/callback" component={ImplicitCallback} />
        </main>
      </Fragment>
  )}
};

export default withStyles(styles)(App);
