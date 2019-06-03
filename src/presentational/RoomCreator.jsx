import React from 'react';
import CheckMarkIcon from './CheckMarkIcon.jsx';
import './../../stylesheets/components/RoomCreator/styles.css';

class RoomCreator extends React.Component {
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
                }
            })
        };
        this.setActiveTabIndex = this.setActiveTabIndex.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.advanceSlide = this.advanceSlide.bind(this);
        this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);
    }

    changeHandler(evt) {
        const { name, value } = evt.target;
        this.setState((state, props) => {
            return {
                [name]: value
            }
        })
    }

    setActiveTabIndex(index) {
        this.setState({ activeSlideIndex: index });
    }

    advanceSlide() {
        this.setState((state, props) => ({ activeSlideIndex: state.activeSlideIndex + 1 }));
    }

    checkBoxChangeHandler(evt) {
        const { name } = evt.target;
        this.setState((state, props) => {
            return {
                amenities: state.amenities.map((amenity) => amenity.name === name ? Object.assign({}, amenity, { isChecked: !amenity.isChecked }) : amenity)
            };
        });
    }

    render() {
        const elements = [
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Listing</div>
                <div className="createRoomWindow-contentWrapper">
                    <label className="listing-label">Home Type
                        <select className="listing-control" name="home_type" onChange={this.changeHandler}>
                            <option value={null} selected>Selected...</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="bed">Bed & Breakfast</option>
                        </select>
                    </label>
                    <label className="listing-label">Room Type
                        <select className="listing-control" name="room_type" onChange={this.changeHandler}>
                            <option value={null} selected>Selected...</option>
                            <option value="entire">Entire</option>
                            <option value="private">Private</option>
                            <option value="shared">Shared</option>
                        </select>
                    </label>
                    <label className="listing-label">Accommodate
                        <select className="listing-control" name="accommodate" onChange={this.changeHandler}>
                            <option value={null} selected>Selected...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6+</option>
                        </select>
                    </label>
                    <label className="listing-label">Bedrooms
                        <select className="listing-control" name="bedrooms" onChange={this.changeHandler}>
                            <option value={null} selected>Selected...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </label>
                    <label className="listing-label">Bathrooms
                        <select className="listing-control" name="bathrooms" onChange={this.changeHandler}>
                            <option value={null} selected>Selected...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </label>
                    <div>
                        <button onClick={this.advanceSlide}>Save</button>
                    </div>
                </div>
            </div>,
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Pricing</div>
                <div className="createRoomWindow-contentWrapper">
                    <label>$ / Night
                    <input className="createRoomWindow-input pricing-control" type="text" name="price" onChange={this.changeHandler} placeholder="Price" />
                        <div>
                            <button onClick={this.advanceSlide}>Save</button>
                        </div>
                    </label>
                </div>
            </div>,
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Description</div>
                <div className="createRoomWindow-contentWrapper">
                    <label>Listing name
                        <input className="createRoomWindow-input description-control" type="text" name="listing_name" onChange={this.changeHandler} placeholder="Name of property" />
                    </label>
                    <label>Summary
                        <textarea className="createRoomWindow-input description-control" type="text" name="summary" onChange={this.changeHandler} placeholder="Description of property" />
                    </label>
                    <div>
                        <button onClick={this.advanceSlide}>Save</button>
                    </div>
                </div>
            </div>,
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Amenities</div>
                <div className="createRoomWindow-contentWrapper">
                    {
                        this.state.amenities.map((amenity) => {
                            return (
                                <label className="amenities-label">
                                    <input className="createRoomWindow-input amenities-control"
                                        type="checkbox"
                                        name={ amenity.name }
                                        checked={ amenity.isChecked }
                                        onChange={this.checkBoxChangeHandler}/>{amenity.name}
                                </label>
                            );
                        })
                    }
                </div>
            </div>,
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Location</div>
                <div className="createRoomWindow-contentWrapper">
                    <label>Address
                    <input className="createRoomWindow-input location-control" type="text" name="address" onChange={this.changeHandler} placeholder="Where is this property located?" />
                        <div>
                            <button onClick={this.advanceSlide}>Save</button>
                        </div>
                    </label>
                </div>
            </div>
        ];
        const tabText = ['Listing', 'Pricing', 'Description', 'Amenities', 'Location'];
        const { activeSlideIndex } = this.state;

        return (
            <div className="createRoom page">
                <ul className="createRoomWindow-tabList">
                    {
                        tabText.map((text, index) => <li className="createRoomWindow-tab" onClick={() => this.setActiveTabIndex(index)}>{text}<span><CheckMarkIcon /></span></li>)
                    }
                </ul>
                <div key={activeSlideIndex} className={`roomSlide roomSlide-isActive createRoomWindow-content`}>
                    {elements[activeSlideIndex]}
                </div>
            </div>
        );
    }
}

export default RoomCreator;