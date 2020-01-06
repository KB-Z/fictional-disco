import React, { Fragment, Component } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

// import mapboxgl from 'mapbox-gl';
import ReactMapGL from 'react-map-gl';
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
        zoom: 14
      }
    }
  }
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
          zoom: 10
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
            <button className="location" onClick={this.setUserLocation}>My Location</button>
            <div className="map">
              <ReactMapGL
              {...this.state.viewport}
              mapStyle="mapbox://styles/zdonner179/ck4sq2ix3027r1cl58pru9005"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
              onViewportChange={(viewport => this.setState({viewport}))}>
              </ReactMapGL>
            </div>
            <SecureRoute path="/posts" component={PostsManager} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
          </main>
        </Fragment>
      )}
};

export default withStyles(styles)(App);

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 5,
//       lat: 34,
//       zoom: 2
//     };
//   }
//   componentDidMount() {
//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: 'mapbox://styles/zdonner179/ck4sq2ix3027r1cl58pru9005',
//       center: [this.state.lng, this.state.lat],
//       zoom: this.state.zoom
//     });
//     map.on('move', () => {
//       this.setState({
//         lng: map.getCenter().lng.toFixed(4),
//         lat: map.getCenter().lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2)
//       });
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         <Navigation />
//         <main>
//           <Route exact path="/" component={HomePage} />
//           <Route
//             path="/login"
//             render={() => <LoginPage baseUrl={config.url} />}
//           />
//           <Route path="/implicit/callback" component={ImplicitCallback} />
//           <Route path="/register" component={RegistrationForm} />
//           <SecureRoute path="/profile" component={ProfilePage} />
//         </main>
//           <div className='sidebarStyle'>
//             <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
//           </div>
//           <div ref={el => this.mapContainer = el} className='mapContainer' />
//       </div>
//     );
//   }
// }
