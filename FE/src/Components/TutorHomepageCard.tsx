import React from 'react';
import { UserGet } from '../API/DTOs/userTypes';

const TutorHomepageCard = ({tutor}: {tutor: UserGet}) => {

    return(
        <>
        {/* background:"linear-gradient(to right top, #74b67d, #c1f9ae)" */}
            <div className="tutor-hp-card" style={{}}>

            <ul className="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            </ul>

                <div style={{display:"flex", justifyContent:"center"}}>
                    <img style={{width:"120px", height:"120px"}} className="hp-tutor-pic-card" src={tutor.profilePic} alt="Tutor profile pic"/>
                </div>

                <div className="card-white-section">
                    <div className="nametag">
                        {tutor.fname?.toUpperCase() + " "}{tutor.lname?.toUpperCase()} 
                    </div>
                    
                    <div className="tutoremail">
                        {tutor.email}
                    </div>

                    <div className="tutoraboutme">
                        <i>{tutor.aboutMe}</i>
                    </div>
                </div>
                <div className="card-transparent-section">
                    {tutor.subjects.map((sub) => 
                        <span className="subject-pill">
                            {sub}
                        </span>
                    )}
                </div>
                

                
            </div>
        </>
    )
}

export default TutorHomepageCard;