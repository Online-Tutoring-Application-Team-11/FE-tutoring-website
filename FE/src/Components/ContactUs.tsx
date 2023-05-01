import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { getAllTutors } from '../API/Endpoints/appointEndpoint';
import { UserGet } from '../API/DTOs/userTypes'
import CoursesCard from './CoursesCard';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactUsSection = () => {

    return(
        <>
        <div className="row" style={{marginTop:"25px"}}>
            <div className="text-center">
                <div className="the-tutors" style={{textAlign:"right"}}>CONTACT US </div>
                <div className="meet" style={{textAlign:"right"}}>TODAY</div>
                <div className="body-text text-center" style={{textAlign:"right", marginTop:"-10px", fontSize:"20px", paddingBottom:"10px", color:"#3FA637"}}>
                Have any questions about our services? Contact us below. If not, feel free to Sign Up and start learning!
                </div>
            </div>

            {/* COL1 */}
            <div className="col-9" style={{background:""}}>  
                <ContactForm/>
            </div>

            {/* COL2 */}
            <div className="col-3" style={{background:""}}>
                <ContactInfo/>
            </div>

        </div>
        </>
    )
}

export default ContactUsSection;