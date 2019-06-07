import React from 'react';
import Map from '../presentational/Map.jsx';
import RoomSearchFormContainer from './../containers/RoomSearchFormContainer.jsx';
import { request } from './../helpers/helper';

const RoomsQuery = `query($first: Int!, $offset: Int!, $guest_limit: Int, $bed_count: Int, $bath_count: Int) {
  rooms(first: $first, offset: $offset, guest_limit: $guest_limit, bed_count: $bed_count, bath_count: $bath_count) {
    results {
      id
      guest_limit
      style
      description
      bath_count
      bed_count
      price
      latitude
      longitude
    }
    totalRoomHits
    info {
      hasNextPage
    }
  }
}`;

const filterRoomsByLatLongQuery = `query($first: Int!, $offset: Int!, $minLatitude: Float!, $maxLatitude: Float!, $minLongitude: Float!, $maxLongitude: Float!, $guest_limit: Int, $bed_count: Int, $bath_count: Int) {
	filterRoomsByLatLong(first: $first, offset: $offset, guest_limit: $guest_limit, bed_count: $bed_count, bath_count: $bath_count, minLatitude: $minLatitude, maxLatitude: $maxLatitude, minLongitude: $minLongitude, maxLongitude: $maxLongitude) {
    id
    guest_limit
    style
    description
    bath_count
    bed_count
    price
    latitude
    longitude
  }
}`;

const debounce = (func, delay) => { 
  let debounceTimer 
  return function() { 
      const context = this
      const args = arguments 
          clearTimeout(debounceTimer) 
              debounceTimer 
          = setTimeout(() => func.apply(context, args), delay) 
  } 
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      page: 1,
      accommodate: null,
      bedrooms: null,
      bathrooms: null,
      mode: 'auto'
    }
    this.fetchProperties = this.fetchProperties.bind(this);
    this.showPlacesInViewport = this.showPlacesInViewport.bind(this);
    this.forcePan = this.forcePan.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { accommodate, bedrooms, bathrooms, mode } = this.state;
    if (prevState.page !== this.state.page && mode === 'auto' && prevState.mode === this.state.mode) {
      this.fetchProperties({ guest_limit: Number(accommodate), bath_count: Number(bathrooms), bed_count: Number(bedrooms) });
    }
    if (prevState.page !== this.state.page && mode === 'manual' && prevState.mode === this.state.mode) {
      alert('manual pagination');
    }
    if (prevState.mode !== this.state.mode) {
      this.setState({ page: 1 });
    }
  }

  async fetchProperties({ guest_limit, bath_count, bed_count }) {
    const data = await request(RoomsQuery, { first: 1, offset: Math.abs(1 - this.state.page), guest_limit, bath_count, bed_count });
    // this.setState((state, props) => {
    //   return {
    //     properties: state.properties.concat(data.rooms.results.map((property) => {
    //       return {
    //         bath_count: property.bath_count,
    //         bed_count: property.bed_count,
    //         description: property.description,
    //         guest_limit: guest_limit,
    //         id: property.id,
    //         lat: property.latitude,
    //         lng: property.longitude,
    //         price: property.price,
    //         style: property.style,
    //         panTo: false
    //       };
    //     })).reduce((acc, n, i, arr) => {
    //       if (acc.findIndex((c) => c.id === n.id) >= 0) {
    //       return acc;
    //       }
    //       else {
    //       acc.push(n);
    //          return acc;
    //       }
    //     },[])
    //   };
    // });
    this.setState((state, props) => {
      return {
        properties: data.rooms.results.map((property) => {
          return {
            bath_count: property.bath_count,
            bed_count: property.bed_count,
            description: property.description,
            guest_limit: guest_limit,
            id: property.id,
            lat: property.latitude,
            lng: property.longitude,
            price: property.price,
            style: property.style,
            panTo: false
          };
        })
      };
    });
  }
  
  async showPlacesInViewport(bounds) {
    const minLat = bounds.na.j;
    const maxLat = bounds.na.l;
    const minLng = bounds.ga.j
    const maxLng = bounds.ga.l;

    const { accommodate: guest_limit, bedrooms: bed_count, bathrooms: bath_count } = this.state;
    
    const data = await request(filterRoomsByLatLongQuery, { first: 1, offset: Math.abs(1 - this.state.page), guest_limit, bath_count, bed_count, minLatitude: minLat, maxLatitude: maxLat, minLongitude: minLng, maxLongitude: maxLng });
    this.setState((state, props) => {
      return {
        properties: data.filterRoomsByLatLong.length > 0 ? data.filterRoomsByLatLong.map((p) => Object.assign({}, p, {panTo: false})) : []
      }
    });
    // this.setState((state, props) => {
    //   return {
    //     properties: data.filterRoomsByLatLong.length > 0 ? state.properties.concat(data.filterRoomsByLatLong.map((p) => Object.assign({}, p, {panTo: false}))).reduce((acc, n, i, arr) => {
    //       if (acc.findIndex((c) => c.id === n.id) >= 0) {
    //       return acc;
    //       }
    //       else {
    //       acc.push(n);
    //          return acc;
    //       }
    //     },[]): state.properties
    //   }
    // });
    // alert('properties changed!')
    return null;
  }

  forcePan(id) {
    this.setState((state, props) => {
      return {
        properties: state.properties.map((property) => {
          return property.id === id ? Object.assign({}, property, {panTo: true}) : Object.assign({}, property, {panTo: false});
        })
      };
    });
  }

  stopPan() {
    this.setState((state, props) => {
      return {
        properties: state.properties.map((property) => {
          return Object.assign({}, property, {panTo: false});
        })
      };
    });
  }

  changeMode(mode) {
    this.setState({ mode });
  }

  render() {
    const { properties, mode } = this.state;
    return (
      <div>
        <RoomSearchFormContainer search={this.fetchProperties} onFilterChange={(filters) => this.setState(filters)}/>
        {
          this.state.properties.map((property) => {
            return (
              <div onMouseEnter={() => this.forcePan(property.id)} onMouseLeave={() => this.stopPan()}>{property.description}</div>
            );
          })
        }
        { 
          <div>
            <button onClick={() => this.setState((state, props) => ({ page: state.page + 1 }))}>Next Page</button>
            <button onClick={() => this.setState((state, props) => ({ page: state.page - 1 }))}>Previous Page</button> 
          </div>
        }
        <Map places={properties} onIdle={debounce(this.showPlacesInViewport, 1500)} mode={mode} changeMode={this.changeMode}/>
      </div>
    );
  }
}

export default SearchPage;