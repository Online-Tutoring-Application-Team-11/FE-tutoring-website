import React from 'react';
import AppNavbar from '../Components/AppNavbar'
import StudentNavbar from '../Components/StudentNavbar';
import TutorNavbar from '../Components/TutorNavbar'
import PageTitle from '../Components/PageTitle'
import PageBlurb from '../Components/PageBlurb'
import PicturesCarousel from '../Components/PicturesCarousel'
import FloatingPicture from '../Components/FloatingPicture';
import TutorsSection from '../Components/TutorsSection';


const HomePage = () => {

    // const[allTutorsAPI, results, errorMessage] = useResultsTutors();

    // const processAPI = () => {
    //   allTutorsAPI();
    //   // console.log("In Homepage, results = " + (results))
    // }

    return (
      <div className="App">
        {/* <AppNavbar/> */}
        <div id="page-body" style={{paddingLeft:"75px", paddingRight:"75px"}}>
          {/* ROW STARTS */}
          <div className="row">
            <div className="col-sm">
              <PageTitle/>
              <PageBlurb/>
            </div>

            <div className="col-sm">
              <PicturesCarousel/>
            </div>
          </div>

          <FloatingPicture/>

          <TutorsSection/>




        </div>{/*  BODY DIV ENDS */}
      </div>
    )
  }
  
export default HomePage