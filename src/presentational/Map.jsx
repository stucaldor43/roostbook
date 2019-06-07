import React from 'react';
import MarkerClusterer from '@google/markerclusterer';
import { AUTO, MANUAL } from './../constants/search_modes';

let map;

window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.397, lng: -73.644 },
    zoom: 12
  });
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    
    this.setRef = this.setRef.bind(this);
    this.init = this.init.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.markers = [];
  }

  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD7OGTqoQRS89usDzUrn-BWsShY90k5ALU&callback=initMap';
    this.instance.appendChild(s);
    s.addEventListener('load', this.init);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.places !== this.props.places) {
      this.markers = [];
      this.addMarkers();
    }
  }

  setRef(node) {
    this.instance = node;
  }

  init() {
    this.map = map;
    this.addMarkers();

    let idleCount = 0;
    google.maps.event.addListener(map, 'idle', () => {
      const { mode } = this.props;
      if (idleCount > 0) {
        mode === AUTO ? null : this.props.onIdle(this.map.getBounds(), this.map.getBounds());
      }
      idleCount += 1;
    });
    google.maps.event.addListener(map, 'click', () => {
      this.props.changeMode(MANUAL);
    });
    google.maps.event.addListener(map, 'dragend', () => {
      this.props.changeMode(MANUAL);
    });
  }

  addMarkers() {
    const { places } = this.props;
    
    for (const place of places) {
      const coordinates = {lat: place.latitude || place.lat, lng: place.longitude || place.lng};
      const marker = new google.maps.Marker({
           position: coordinates,
           label: {
             color: place.panTo ? '#666ee8' : '#fff',
             fontFamily: 'Roboto',
             fontSize: '1.6em',
             text: '$221'
           },
           icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 24,
            strokeColor: place.panTo ? '#fff' : '#666ee8', fillColor: place.panTo ? '#fff' : '#666ee8', strokeWeight: 1, fillOpacity: 1
           },
           title: "",
           map: this.map
         });
      if (place.panTo) this.map.panTo(coordinates);
      this.markers.push(marker)
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}
        id="map"
        ref={this.setRef}></div>
    );
  }
}
export default Map;