import React from 'react';
import Map from '../presentational/Map.jsx';
import RoomSearchFormContainer from './../containers/RoomSearchFormContainer.jsx';
import { request, debounce } from './../helpers/helper';
import { AUTO, MANUAL } from './../constants/search_modes';
import Pagination from '../presentational/Pagination.jsx';

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

const MAXIMUM_RESULTS_PER_PAGE = 9;

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      page: 1,
      maxPages: 1,
      accommodate: null,
      bedrooms: null,
      bathrooms: null,
      mode: AUTO
    }
    this.fetchProperties = this.fetchProperties.bind(this);
    this.showPlacesInViewport = this.showPlacesInViewport.bind(this);
    this.forcePan = this.forcePan.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { accommodate, bedrooms, bathrooms, mode } = this.state;
    if (prevState.page !== this.state.page && mode === AUTO && prevState.mode === this.state.mode) {
      this.fetchProperties({ guest_limit: Number(accommodate), bath_count: Number(bathrooms), bed_count: Number(bedrooms) });
    }
    if (prevState.page !== this.state.page && mode === MANUAL && prevState.mode === this.state.mode) {
      this.showPlacesInViewport(window.map.getBounds());
    }
    if (prevState.mode !== this.state.mode) {
      this.setState({ page: 1 });
    }
  }

  async fetchProperties({ guest_limit, bath_count, bed_count }) {
    const data = await request(RoomsQuery, { first: MAXIMUM_RESULTS_PER_PAGE, offset: Math.abs(1 - this.state.page), guest_limit, bath_count, bed_count });
    
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
        }),
        maxPages: Math.ceil(data.rooms.totalRoomHits / MAXIMUM_RESULTS_PER_PAGE),
        mode: AUTO
      };
    });
  }
  
  async showPlacesInViewport(bounds) {
    const { j: minLat, l: maxLat } = bounds.na;
    const { j: minLng, l: maxLng } = bounds.ga;
    const { accommodate: guest_limit, bedrooms: bed_count, bathrooms: bath_count } = this.state;
    
    const data = await request(filterRoomsByLatLongQuery, { first: MAXIMUM_RESULTS_PER_PAGE, offset: Math.abs(1 - this.state.page), guest_limit, bath_count, bed_count, minLatitude: minLat, maxLatitude: maxLat, minLongitude: minLng, maxLongitude: maxLng });
    
    this.setState((state, props) => {
      return {
        properties: data.filterRoomsByLatLong.results.length > 0 ? data.filterRoomsByLatLong.results.map((p) => Object.assign({}, p, { panTo: false })) : [],
        maxPages: Math.ceil(data.filterRoomsByLatLong.totalRoomHits / MAXIMUM_RESULTS_PER_PAGE)
      }
    });
    return null;
  }

  forcePan(id) {
    this.setState((state, props) => {
      return {
        properties: state.properties.map((property) => {
          return property.id === id ? Object.assign({}, property, { panTo: true }) : Object.assign({}, property, { panTo: false });
        })
      };
    });
  }

  stopPan() {
    this.setState((state, props) => {
      return {
        properties: state.properties.map((property) => {
          return Object.assign({}, property, { panTo: false });
        })
      };
    });
  }

  changeMode(mode) {
    this.setState({ mode });
  }

  render() {
    const { properties, mode, page, maxPages } = this.state;
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
        { <Pagination page={page} maxPages={maxPages} goToPage={(page) => this.setState({ page })}/> }
        <Map places={properties} onIdle={debounce(this.showPlacesInViewport, 1500)} mode={mode} changeMode={this.changeMode}/>
      </div>
    );
  }
}

export default SearchPage;