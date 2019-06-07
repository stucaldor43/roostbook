import React from 'react';
import MarkerClusterer from '@google/markerclusterer';

let map;

window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.397, lng: -73.644 },
    zoom: 12
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    // console.log(map.getBounds());
    // const {ga, na} = map.getBounds();
    // const l = 40; //lat
    // const n = 73; // long
    
    // console.log(l > ga.j && l < ga.l)
    // console.log(n > na.j && n < na.l)
 });

//  google.maps.event.addListener(map, 'idle', function() {
//   alert('idle')
// });

  // var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   title: "Hello World!"
  // });

  // // To add the marker to the map, call setMap();
  // marker.setMap(map);
};

// const Map = () => {
//   return (
//     <div id="map" style={{height: '600px'}}>
//       <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7OGTqoQRS89usDzUrn-BWsShY90k5ALU&callback=initMap"></script>
//     </div>
//   );
// }

class Map extends React.Component {
  constructor(props) {
    super(props);
    
    this.setRef = this.setRef.bind(this);
    this.config = this.config.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.markers = [];
  }

  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD7OGTqoQRS89usDzUrn-BWsShY90k5ALU&callback=initMap';
    this.instance.appendChild(s);
    s.addEventListener('load', this.config);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.places !== this.props.places) {
      this.markers = [];
      this.addMarker();
    }
  }

  setRef(node) {
    this.instance = node;
  }

  config() {
    const { places } = this.props;
    this.map = map;
    // if (places.length > 0) this.map.setCenter(places[0]);
    this.addMarker();

    let idleCount = 0;
    google.maps.event.addListener(map, 'idle', () => {
      const { mode } = this.props;
      if (idleCount > 0) {
        // alert('idle');
        // this.props.onIdle(this.map.getBounds().getNorthEast(), this.map.getBounds().getSouthWest());
        mode === 'auto' ? null : this.props.onIdle(this.map.getBounds(), this.map.getBounds());
      }
      idleCount += 1;
    });
    google.maps.event.addListener(map, 'click', () => {
      console.log('click');
      this.props.changeMode('manual');
      // switch to manual search mode
    });
    google.maps.event.addListener(map, 'dragend', () => {
      console.log('end drag');
      this.props.changeMode('manual');
      // switch to manual search mode
    });
  }

  addMarker() {
    const { places } = this.props;
    
    for (const place of places) {
      const coordinates = {lat: place.latitude || place.lat, lng: place.longitude || place.lng};
      const marker = new google.maps.Marker({
           position: coordinates,
           label: {
             color: '#fff',
             fontFamily: 'Roboto',
             fontSize: '1.6em',
             text: '$221'
           },
           icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 24,
            strokeColor: '#666ee8', fillColor: '#666ee8', strokeWeight: 1, fillOpacity: 1
           },
           title: "Hello World!",
           map: this.map
         });
      if (place.panTo) this.map.panTo(coordinates);
      this.markers.push(marker)
    }
    
    // const clusterer = new MarkerClusterer(this.map, this.markers) // set clusterer as instance variable then add/remove markers as needed, instead of reinstantiating each time
    // this.map.setZoom(12);
    //if (places.length > 0) setTimeout(() => this.map.panTo(places[0]), 0); // only way to get multiple markers to show on map?
  }

  render() {
    return (
      <div onClick={() => 1} style={{ width: '100%', height: 'calc(100vh - 36px)' }}
        id="map"
        ref={this.setRef}></div>
    );
  }
}
export default Map;