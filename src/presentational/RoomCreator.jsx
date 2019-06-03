import React from 'react';
import './../../stylesheets/components/RoomCreator/styles.css';

const RoomCreator = ({ index, amenities, validate, createListing, advanceSlide, onChange, onCheckBoxChange, setSlide, home_type, room_type, accommodate, bedrooms, bathrooms, price, listing_name, summary, address }) => {
    const slides = [{
        title: 'Listing',
        markup:
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Listing</div>
                <div className="createRoomWindow-contentWrapper">
                    <div>
                        <label className="listing-label">Home Type
                            <select className="listing-control" name="home_type" onChange={onChange} value={home_type}>
                                <option value={0} selected>Selected...</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="bed">Bed & Breakfast</option>
                            </select>
                        </label>
                        <label className="listing-label">Room Type
                            <select className="listing-control" name="room_type" onChange={onChange} value={room_type}>
                                <option value={0} selected>Selected...</option>
                                <option value="entire">Entire</option>
                                <option value="private">Private</option>
                                <option value="shared">Shared</option>
                            </select>
                        </label>
                        <label className="listing-label">Accommodate
                            <select className="listing-control" name="accommodate" onChange={onChange} value={accommodate}>
                                <option value={0} selected>Selected...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6+</option>
                            </select>
                        </label>
                        <label className="listing-label">Bedrooms
                            <select className="listing-control" name="bedrooms" onChange={onChange} value={bedrooms}>
                                <option value={0} selected>Selected...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </select>
                        </label>
                        <label className="listing-label">Bathrooms
                            <select className="listing-control" name="bathrooms" onChange={onChange} value={bathrooms}>
                                <option value={0} selected>Selected...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <button className="createRoomWindow-saveButton" onClick={advanceSlide}>Save</button>
                    </div>
                </div>
            </div>
    }, {
        title: 'Pricing',
        markup:
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Pricing</div>
                <div className="createRoomWindow-contentWrapper">
                    <div>
                        <label>$ / Night
                            <input className="createRoomWindow-input pricing-control" type="text" name="price" onChange={onChange} placeholder="Price" value={price}/>
                        </label>
                    </div>
                    <div>
                        <button className="createRoomWindow-saveButton" onClick={advanceSlide}>Save</button>
                    </div>
                </div>
            </div>
    }, {
        title: 'Description',
        markup:
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Description</div>
                <div className="createRoomWindow-contentWrapper">
                    <div>
                        <label>Listing name
                            <input className="createRoomWindow-input description-control" type="text" name="listing_name" onChange={onChange} placeholder="Name of property" value={listing_name}/>
                        </label>
                        <label>Summary
                            <textarea className="createRoomWindow-input description-control" type="text" name="summary" onChange={onChange} placeholder="Description of property" value={summary}/>
                        </label>
                    </div>
                    <div>
                        <button className="createRoomWindow-saveButton" onClick={advanceSlide}>Save</button>
                    </div>
                </div>
            </div>
    }, {
        title: 'Amenities',
        markup:
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Amenities</div>
                <div className="createRoomWindow-contentWrapper">
                    <div>
                        {
                            amenities.map((amenity) => {
                                return (
                                    <label className="amenities-label">
                                        <input className="createRoomWindow-input amenities-control"
                                            type="checkbox"
                                            name={amenity.name}
                                            checked={amenity.isChecked}
                                            onChange={onCheckBoxChange} />{amenity.name}
                                    </label>
                                );
                            })
                        }
                    </div>
                    <div>
                        <button className="createRoomWindow-saveButton" onClick={advanceSlide}>Save</button>
                    </div>
                </div>
            </div>
    }, {
        title: 'Location',
        markup:
            <div className="createRoomWindow">
                <div className="createRoomWindow-header">Location</div>
                <div className="createRoomWindow-contentWrapper">
                    <div>
                        <label>Address
                            <input className="createRoomWindow-input location-control" type="text" name="address" onChange={onChange} placeholder="Where is this property located?" value={address}/>
                        </label>
                    </div>
                    <div>
                        {
                            validate() ?
                                <button className="createRoomWindow-publishButton" onClick={() => createListing()}>Publish</button>
                                : <button className="createRoomWindow-publishButton" disabled>Publish</button>
                        }
                    </div>
                </div>
            </div>
    }];

    return (
        <div className="createRoom page">
            <div className="createRoomWindow-controlsContainer ">
                <ul className="createRoomWindow-tabList">
                    {
                        slides.map((slide, i) => <li className={`createRoomWindow-tab ${index === i ? 'createRoomWindow-tab-isActive' : 'createRoomWindow-tab-isInactive'}`} onClick={() => setSlide(i)}>{slide.title}</li>)
                    }
                </ul>
                <div>
                    {
                        validate() ?
                            <button className="createRoomWindow-publishButton" onClick={() => createListing()}>Publish</button>
                            : <button className="createRoomWindow-publishButton" disabled>Publish</button>
                    }
                </div>
            </div>
            <div key={index} className={`roomSlide roomSlide-isActive createRoomWindow-content`}>
                {slides[index].markup}
            </div>
        </div>
    );
}

export default RoomCreator;