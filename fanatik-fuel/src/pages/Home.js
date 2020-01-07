import React from 'react';
import mapboxgl from 'mapbox-gl';
import {
  Typography,
} from '@material-ui/core';

export default class MapUI extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        lng: 5,
        lat: 34,
        zoom: 2,
        viewport:{
          width: "100vw",
          height: "100vh",
          latitude: 42.430472,
          longitude: -123.334102,
          zoom: 16
        },
        userLocation: {}
      };
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
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
    }
    render() {
      return (
        <div className="App">
            <div className='sidebarStyle'>
              <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
            </div>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
      );
    }
};
