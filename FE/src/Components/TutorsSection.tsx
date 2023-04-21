import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { getAllTutors } from '../API/Endpoints/appointEndpoint';
import { UserGet } from '../API/DTOs/userTypes'

const TutorsSection = (resultsTutors: any) => {

    // const getAllAppTutors = () => {
    //     getAllTutors('').then((data: Array<UserGet>) => {}

    // }
    // let abc:Array<UserGet> = resultsTutors
    // console.log("abc = ")

    // const processAPI = () => {
    //   allTutorsAPI();
    //   // console.log("In Homepage, results = " + (results))
    // }

    return(
        <>
        {/* {console.log("Result: " + abc)} */}
        {/* {(resultsTutors).forEach((element:any) => {
            console.log("ELEMENT = " + element)
        })} */}
        
        {/* <img className="tutorClipartPicture" src="https://i.imgur.com/DjrOzVL.png" alt="tutors clipart"/> */}
        {/* {console.log("Inside TutorSection.tsx, tutorList value = " + tutorList[0].fname)} */}
        <div className="row" style={{marginTop:"25px"}}>

            {/* TUTOR CaRD PANEL */}
            <div className="col-5" style={{background:"pink"}}>
                CASHAPP
            </div>

            {/* TUTOR FACE PANEL  */}
            <div className="col-7" style={{background:"white"}}> 

                <div className="text-center">
                    <div className="meet" style={{textAlign:"right"}}>MEET THE </div>
                    <div className="the-tutors" style={{textAlign:"right"}}>TUTORS</div>
                    <div className="body-text text-center" style={{textAlign:"right", marginTop:"-10px", fontSize:"18px"}}>
                        Tutors are selected from top universities like Harvard, MIT, and UC Berkley. 
                    </div>
                </div>

                

            </div>
        </div>



        </>
    )
}

export default TutorsSection;