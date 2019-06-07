import React from 'react';
import RoomSearchForm from './../presentational/RoomSearchForm.jsx';

class RoomSearchFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accommodate: null,
      bedrooms: null,
      bathrooms: null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  changeHandler(evt) {
    const { name, value } = evt.target;
    this.setState((state, props) => {
      return {
        [name]: value
      }
    }, () => this.props.onFilterChange({ accommodate: Number(this.state.accommodate), bedrooms: Number(this.state.bedrooms), bathrooms: Number(this.state.bathrooms) }));
  }

  saveHandler(evt) {
    const { accommodate, bedrooms, bathrooms } = this.state;
    this.props.search({ guest_limit: Number(accommodate), bed_count: Number(bedrooms), bath_count: Number(bathrooms) });
  }

  checkBoxChangeHandler(evt) {
    // const { name } = evt.target;
    // this.setState((state, props) => {
    //   return {
    //     amenities: state.amenities.map((amenity) => amenity.name === name ? Object.assign({}, amenity, { isChecked: !amenity.isChecked }) : amenity)
    //   };
    // });
  }

  render() {
    return (
      <RoomSearchForm changeHandler={this.changeHandler} saveHandler={this.saveHandler}/>
    );
  }
}

export default RoomSearchFormContainer;