import React from 'react';
import ReviewsCarousel from './ReviewsCarousel';
const ReviewsSection = () => {

    return(
        <>
        <div className="text-center">
            <div className="the-tutors" style={{textAlign:"right"}}>REVIEWS</div>
        </div>

        <div className="body-text text-center" style={{textAlign:"right", marginTop:"-10px", fontSize:"20px", paddingBottom:"10px", color:"#3FA637"}}>
            Listen to what our happy student have to say about us! 
        </div>

        <div className="css-selector" style={{borderRadius:"10px"}}>
            <ReviewsCarousel/>
        </div>

        </>
    )
}

export default ReviewsSection;