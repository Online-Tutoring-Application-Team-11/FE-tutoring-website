import React from 'react';
import {Carousel, Form} from 'react-bootstrap'

const ContactForm = () => {

    return(
        <>
        <div>

            <form action="https://formspree.io/f/myyljejk"
			  method="POST"
			  target="_blank">
                <div className="row">
                    <div className="col-sm">
			            <input className= "form-control" type="email" name="_replyto" id="email" placeholder="Your email"/>
                    </div>

                    <div className="col-sm">
                        <input className= "form-control" type="name" name="name" id="name" placeholder="Your name"/>
                    </div>
			    </div>
			    <textarea className="form-control" name="message" id="message" rows={3} placeholder="Your message"></textarea>
			    <br/>

			    <button className="form-submit-btn" type="submit" id="f-button">SEND</button>
			</form>


        </div>

        </>
    )
}

export default ContactForm;