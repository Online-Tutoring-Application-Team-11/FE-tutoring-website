import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactInfo = () => {

    return(
        <>
        <div style={{textAlign:"center", paddingTop:"5px"}}>
              <ul className="">
                  <li><FontAwesomeIcon icon={faLocationDot} style={{fontSize:"40px"}}/>
                      <p>W Campbell Rd, TX 75080, USA</p>
                  </li>
  
                  <li><FontAwesomeIcon icon={faPhone} style={{fontSize:"40px"}}/>
                      <p>+ 01 234 567 89</p>
                  </li>
  
                  <li><FontAwesomeIcon icon={faEnvelope} style={{fontSize:"40px"}}/>
                      <p>contact@aplustutors.com</p>
                  </li>
              </ul>
          
        </div>

        </>
    )
}

export default ContactInfo;