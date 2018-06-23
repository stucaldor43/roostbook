import React from 'react';
import { Link } from 'react-router';
import CarouselContainer from './../containers/CarouselContainer.jsx';
import stars from './../helpers/stars';
import './../../stylesheets/components/SearchResultCard/styles.css';

const SearchResultCard = ({room, url}) => {
    return (
        <div className="listing">
            <CarouselContainer/>
            <div>
                <Link to={url}>
                    <div className="listing-categories">
                        <span className="listing-type">{ room.style }</span><span className="listing-location">{ room.location }</span>
                    </div>
                    <h2 className="listing-title">{ room.title }</h2>
                    <p className="listing-price">${ room.price } per night</p>
                    <div className="listing-details">
                        { stars(5) }
                        <span className="listing-reviewCount">{ room.reviews }</span>
                    </div>
                </Link>
            </div>
        </div>
    );
} 

SearchResultCard.defaultProps = {
    room: {
        style: 'Entire Apartment',
        location: 'Isla Mujeres',
        price: 100,
        title: 'Private Master Suite in Modern, Renovated Bungalow',
        rating: 5,
        reviews: 159
    },
    url: "http://example.com"
}

export default SearchResultCard;