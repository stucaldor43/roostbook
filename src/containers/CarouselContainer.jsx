import React from 'react';
import Carousel from './../presentational/Carousel.jsx';
import uuid from 'uuid';

class CarouselContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrls: [
                'https://a0.muscache.com/im/pictures/12702248/6d3635c0_original.jpg?aki_policy=x_large',
                'https://a0.muscache.com/im/pictures/12702118/4b90bf60_original.jpg?aki_policy=x_large',
                'https://a0.muscache.com/im/pictures/39de71fb-e6df-434f-9965-6e326b39fcc5.jpg?aki_policy=x_large',
                'https://a0.muscache.com/im/pictures/58c38984-00f7-4f46-90ab-42614a1df897.jpg?aki_policy=x_large'
            ],
            chosenSlideNumber: 0,
            id: uuid()
        };
    }

    render() {
        const {imageUrls, chosenSlideNumber,id} = this.state;

        return (
            <Carousel imageURLs={imageUrls} 
                      currentSlide={chosenSlideNumber}
                      highlightLabel={(labelIndex, evt) => this.setState({chosenSlideNumber: labelIndex})}
                      id={id}/>
        );
    }
}

export default CarouselContainer;