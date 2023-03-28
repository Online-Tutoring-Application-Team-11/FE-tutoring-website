import React from 'react';
import {Carousel} from 'react-bootstrap'
const PicturesCarousel = () => {

    return(
        <>
        <Carousel controls={false} className="hp-pic-car">
            <Carousel.Item interval={4500}>
            <img style={{width: "100%", borderRadius:"50%"}} className="" src="https://i.imgur.com/v4hUCkn.png" alt="First slide"/>
            </Carousel.Item>
        
            <Carousel.Item interval={4500}>
            <img style={{width: "100%", borderRadius:"50%"}} className="" src="https://i.imgur.com/n14t9KB.jpg" alt="Second slide"/>
            </Carousel.Item>

            <Carousel.Item interval={4500}>
            <img style={{width: "100%", borderRadius:"50%"}} className="" src="https://i.imgur.com/85WjQy1.jpg" alt="Third slide"/>
            </Carousel.Item>

            <Carousel.Item interval={4500}>
            <img style={{width: "100%", borderRadius:"50%"}} className="" src="https://i.imgur.com/O8iKIEJ.jpg" alt="Fourth slide"/>
            </Carousel.Item>
        </Carousel>
        </>
    )
}

export default PicturesCarousel;