import React from 'react';
import './starRating.scss';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                if (index < fullStars) {
                    return <span key={index} className="star full">&#9733;</span>;
                } else if (index === fullStars && halfStar) {
                    return <span key={index} className="star half">&#9733;</span>;
                } else {
                    return <span key={index} className="star empty">&#9733;</span>; // Bo'sh yulduz
                }
            })}
        </div>
    );
};

export default StarRating;
