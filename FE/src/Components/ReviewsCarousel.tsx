import React from 'react';
import {Carousel} from 'react-bootstrap'
import ReviewCard from './ReviewCard';

const ReviewsCarousel = () => {

    return(
        <>
        <Carousel indicators={false} className="">
            <Carousel.Item interval={6000} className='crsl-rv'>
                <ReviewCard stu_name={"Maria Kate"}/>
            </Carousel.Item>
        
            <Carousel.Item interval={6000} className='crsl-rv'>
                <ReviewCard stu_name={"Chris Michaelson"}/>
            </Carousel.Item>

            <Carousel.Item interval={6000} className='crsl-rv'>
                <ReviewCard stu_name={"Preeti Arora"}/>
            </Carousel.Item>

            <Carousel.Item interval={6000} className='crsl-rv'>
                <ReviewCard stu_name={"Travis Baker"}/>
            </Carousel.Item>
        </Carousel>
        </>
    )
}

export default ReviewsCarousel;