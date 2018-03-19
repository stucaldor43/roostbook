import React from 'react';

const stars = (starCount, opts) => {
    const starContainer = [];
    const filledStars = opts.filled || starCount;
    for (let i = 0; i < starCount; i++) {
        starContainer.push(
            <i className={(i < filledStars) ? 'icon-star' : 'icon-star-empty'}></i>
        );
    }
    return (
        <span>{ starContainer }</span>
    );
};

export default stars;