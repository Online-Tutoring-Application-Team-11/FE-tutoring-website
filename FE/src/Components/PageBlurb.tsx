import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { MDBBtn } from 'mdb-react-ui-kit';
const PageBlurb = () => {

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
            <Button className="btn-options"
                style={{ background: 'linear-gradient(to right, #c1f9ae, #74b67d)'}}>
                    I am a new student ❯
            </Button>

            <Button className="btn-options"
                style={{ background: 'linear-gradient(to right, #c1f9ae, #74b67d)'}}>
                    I am a returning student ❯
            </Button>
        </div>
        </>
    )
}

export default PageBlurb