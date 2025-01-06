import React from 'react';
import './starRating.scss'; // CSS faylni ulaymiz

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating); // To'liq yulduzlar soni
    const halfStar = rating % 1 >= 0.5;   // Yarim yulduz bormi?
    const totalStars = 5;

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                if (index < fullStars) {
                    return <span key={index} className="star full">&#9733;</span>; // To'liq yulduz
                } else if (index === fullStars && halfStar) {
                    return <span key={index} className="star half">&#9733;</span>; // Yarim yulduz
                } else {
                    return <span key={index} className="star empty">&#9733;</span>; // Bo'sh yulduz
                }
            })}
        </div>
    );
};

export default StarRating;
