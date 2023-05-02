import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({stu_name}: {stu_name: string}) => {

    let reviewBlurb;
    let stu_pic;
    let stars;
    let subj;

    if(stu_name === "Maria Kate"){
        reviewBlurb = "I'm so glad to have discovered A+ Tutors. I was failing OS and even thought of dropping. I had a 40 in my first exam, but after A+ Tutors, I got a 96 on my final. Thank you so much!"
        stu_pic = <img className="stu-pic-review" src="https://i.imgur.com/oIfn5yn.jpg"/>
        stars = <img className="stars-review" src="https://i.imgur.com/SjGU8WS.png" alt="5 stars" width="90"></img>
        subj = "Operating Systems, Computer Architecture"
    } else if (stu_name == "Chris Michaelson"){
        reviewBlurb = "Jason is is the best teacher I've ever had. All the tutors here have a very deep understanding of their subjects and it shows. I never felt judged for asking questions, even the basic stuff."
        stu_pic = <img className="stu-pic-review" src="https://i.imgur.com/iosOS35.jpg"/>
        stars = <img className="stars-review" src="https://i.imgur.com/SjGU8WS.png" alt="5 stars" width="90"></img>
        subj = "Intro to Programming, Differential Calculus, Linear Algebra"
    } else if (stu_name === "Preeti Arora"){
        reviewBlurb = "This tutoring center has been a blessing. I am now on track to graduate with a honors distinction all thanks to A+ Tutors. I highly recommend their Calculus tutoring service!"
        stu_pic = <img className="stu-pic-review" src="https://i.imgur.com/KJuIKnP.jpg"/>
        stars = <img className="stars-review" src="https://i.imgur.com/SjGU8WS.png" alt="5 stars" width="90"></img>
        subj = "Differential Equations, Database Systems"
    } else if (stu_name === "Travis Baker"){
        reviewBlurb = "I really appreciate the interactive learning method that the tutors employ here. I originally opted for Mechanical Physics help, and now I am a TA for the same class."
        stu_pic = <img className="stu-pic-review" src="https://i.imgur.com/HaMaYbW.jpg"/>
        stars = <img className="stars-review" src="https://i.imgur.com/SjGU8WS.png" alt="5 stars" width="90"></img>
        subj = "Mechanical Physics, Programming Paradigms, General Chemistry"
    }

    return(
        <>
        <div style={{borderRadius:"10px", background:"white", paddingTop:"30px", paddingBottom:"30px", paddingLeft:"30px", paddingRight:"30px"}}>
            
            <div className="row" style={{background:""}}>
            
                <div className="col-3">
                {stu_pic}
                {stars}
                </div>

                <div className="col-9">
                    <div className="review-blurb">
                        <FontAwesomeIcon icon={faQuoteLeft} style={{color:"#2d8820", fontSize:"45px"}} />
                        {reviewBlurb}
                        
                        <div className="quote-by">
                        — {stu_name} for <i>{subj}</i>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        </>
    )
}

export default ReviewCard;