import React from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
const PageBlurb = () => {

    const navigate = useNavigate();

    const signIn = () => {
        navigate('/auth/sign-in');
    }

    const signUp = () => {
        navigate('/auth/sign-up')
    }

    return(
        <>
        <div className="body-text text-left">
            Find <b>trusted</b> mentors and <a href="#" className="body-link">tutors</a> for college-level STEM 
            <a href="#coursesSection" className="body-link"> courses</a>, including 3000 and 4000-level courses. And <b>free</b> of charge for 
            UT Dallas students!
        </div>
        <br/>

        <div className="body-text text-left" style={{fontFamily:"'Lato', sans-serif", fontWeight:700}}>Tell us more about yourself.</div>
        <div>
            <Button onClick={signUp} className="btn-options"
                style={{ background: 'linear-gradient(to right, #c1f9ae, #74b67d)'}}>
                    I am a new student ❯
            </Button>

            <Button onClick={signIn} className="btn-options"
                style={{ background: 'linear-gradient(to right, #74b67d, #c1f9ae)'}}>
                    I am a returning student ❯
            </Button>
        </div>
        </>
    )
}

export default PageBlurb