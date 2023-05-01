import React from 'react';
import {Carousel, Form, Navbar} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const HomepageFooter = () => {

    return(
        <>
        <div className="page-ftr">
            <span>Team 11 ©</span>
            <div style={{display:"inline", position:"absolute", left:"50%", transform:"translateX(-50%)"}}>
                <img style={{display:"inline", height:"60px", width:"220px"}} src="https://i.imgur.com/bA7rfgW.png"/>
            </div>
            <span className="float-end">
                <span>
                    <a target="_blank" href="https://twitter.com/UT_Dallas" className="ftr-link">
                        <FontAwesomeIcon icon={faTwitter} style={{fontSize:"20px"}}/>
                    </a>
                </span>

                <span>
                    <a href="#" className="ftr-link">
                        <FontAwesomeIcon icon={faPhone} style={{paddingLeft:"20px", paddingRight:"20px"}}/>
                    </a>
                </span>

                <span>
                    <a href="#" className="ftr-link">
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </a>
                </span>
            </span>

        </div>

        </>
    )
}

export default HomepageFooter;