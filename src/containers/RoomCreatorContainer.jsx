import React from 'react';
import RoomCreator from './../presentational/RoomCreator.jsx';

class RoomCreatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
      home_type: null,
      room_type: null,
      accommodate: null,
      bedrooms: null,
      bathrooms: null,
      price: '',
      listing_name: '',
      summary: '',
      address: '',
      amenities: ['Wifi', 'Kitchen', 'Dryer', 'Iron', 'Washer',
        'Heating', 'Hot water', 'Smoke detector', 'Hangers', 'Shampoo',
        'Crib', 'Hair dryer', 'Breakfast', 'Air conditioning'].map((amenity) => {
          return {
            name: amenity,
            isChecked: false,
          };
        })
    };
    this.advanceSlide = this.advanceSlide.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);
    this.setActiveTabIndex = this.setActiveTabIndex.bind(this);
    this.validate = this.validate.bind(this);
    this.createListing = this.createListing.bind(this);
  }

  changeHandler(evt) {
    const { name, value } = evt.target;
    this.setState((state, props) => {
      return {
        [name]: value
      }
    })
  }

  checkBoxChangeHandler(evt) {
    const { name } = evt.target;
    this.setState((state, props) => {
      return {
        amenities: state.amenities.map((amenity) => amenity.name === name ? Object.assign({}, amenity, { isChecked: !amenity.isChecked }) : amenity)
      };
    });
  }

  advanceSlide() {
    this.setState((state, props) => ({ activeSlideIndex: state.activeSlideIndex + 1 }));
  }

  setActiveTabIndex(index) {
    this.setState({ activeSlideIndex: index });
  }

  validate() {
    const { 
      home_type, room_type, accommodate, bedrooms, bathrooms, 
      price, listing_name, summary
    , address 
    } = this.state;
    
    return (home_type && room_type && accommodate && bedrooms && bathrooms
    && Number(price) >= 0 && listing_name.length && summary.length && address.length);
  }

  createListing() {
    alert('listing created!');
  }

  render() {
    const { activeSlideIndex, amenities, home_type, room_type, accommodate, bedrooms, bathrooms, price, listing_name, summary, address } = this.state;

    return (
      <RoomCreator index={activeSlideIndex}
        amenities={amenities}
        validate={this.validate}
        createListing={this.createListing}
        advanceSlide={this.advanceSlide}
        onChange={this.changeHandler}
        onCheckBoxChange={this.checkBoxChangeHandler}
        setSlide={this.setActiveTabIndex} 
        home_type={home_type}
        room_type={room_type}
        accommodate={accommodate}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        price={price}
        listing_name={listing_name}
        summary={summary}
        address={address}/>
    );
  }
}

export default RoomCreatorContainer;