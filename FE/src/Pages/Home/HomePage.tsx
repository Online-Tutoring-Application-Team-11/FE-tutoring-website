import React, { useEffect } from 'react';
import AppNavbar from '../../Components/AppNavbar'
import StudentNavbar from '../../Components/StudentNavbar';
import TutorNavbar from '../../Components/TutorNavbar'
import PageTitle from '../../Components/PageTitle';
import PageBlurb from '../../Components/PageBlurb';
import PicturesCarousel from '../../Components/PicturesCarousel';
import FloatingPicture from '../../Components/FloatingPicture';
import TutorsSection from '../../Components/TutorsSection';
import { Outlet } from 'react-router-dom'
import useResultsStudent from '../../Hooks/useResultsStudent';
import useResultsTutors from '../../Hooks/useResultsTutors';
import CoursesSection from '../../Components/CoursesSection';
import ReviewsSection from '../../Components/ReviewsSection';
import ContactUsSection from '../../Components/ContactUs';
import HomepageFooter from '../../Components/HomepageFooter';

const HomePage = () => {

  //HOOKS
  const[studentNameAPI, results] = useResultsStudent();
  const[allTutorsAPI, resultsTutors] = useResultsTutors();

  const processAPI = () => {
      allTutorsAPI();
      // console.log("In Homepage, 1results = " + JSON.stringify(resultsTutors));
  }

  useEffect(() => {
    processAPI();
    // console.log("In Homepage, 2results = " + (resultsTutors));
  }, []);



    return (
      <div className="App">
        {
          results.fname && results.fname.length > 0 ? 
            results.tutor ? <TutorNavbar nameAPI={studentNameAPI} results={results}/> : 
            <StudentNavbar nameAPI={studentNameAPI} results={results}/> :
          <AppNavbar/>
        }

        <div id="page-body" style={{paddingLeft:"65px", paddingRight:"65px"}}>
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

          <TutorsSection resultsTutors={resultsTutors}/>

          <div style={{paddingBottom: "40px"}}>
          <CoursesSection/>
          </div>

          <ReviewsSection/>

          <ContactUsSection/>
          <br/>
          <br/>

        </div>{/*  BODY DIV ENDS */}
        <HomepageFooter/>
        
        <Outlet/>
      </div>
    )
  }
  
export default HomePage