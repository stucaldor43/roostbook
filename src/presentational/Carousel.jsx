import React from 'react';

const Carousel = ({imageURLs, highlightLabel, currentSlide, id}) => {
    const produceSlide = (url, index) => {
        const extraAttributes = (index === 0) ? {defaultChecked: 'true'} : {}; 
        return (
            <div className="carousel-slide">
                <input { ...extraAttributes} type="radio" id={`slide-${id}${index}`} name={`carousel-${id}`}/>
                <img src={url}/>
            </div>
        );
    };

    return (
        <div className="carousel">
            <div className="carousel-shelf">
                {imageURLs.map(produceSlide)}
            </div>
            <div className="carousel-labelContainer">
                {imageURLs.map((e, index) => <label className={(currentSlide === index) ? 'currentSelection' : ''} onClick={() => highlightLabel(index)} htmlFor={`slide-${id}${index}`}></label>)}
            </div>
        </div>
    );
};

export default Carousel;