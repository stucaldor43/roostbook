import React from 'react';
import { Link } from 'react-router';
import CarouselContainer from './../containers/CarouselContainer.jsx';
import stars from './../helpers/stars';

const SearchResultCard = ({room, url}) => {
    return (
        <div className="listing">
            <Link to={url}>
                <CarouselContainer/>
                <div>
                    <div className="listing-categories">{ room.style } <span className="square">&#9642;</span> { room.location }</div>
                    <h2 className="listing-title">{ room.title }</h2>
                    <p className="listing-price">${ room.price } per night</p>
                    <div className="listing-details">
                        { stars(5) }
                        <span className="listing-reviewCount">{ room.reviews }</span>
                    </div>
                </div>
            </Link>
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