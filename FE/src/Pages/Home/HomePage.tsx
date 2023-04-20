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

const HomePage = () => {

  //HOOKS
  const[studentNameAPI, results] = useResultsStudent();
  const[allTutorsAPI, resultsTutors] = useResultsTutors();

  const processAPI = () => {
      allTutorsAPI();
      console.log("In Homepage, 1results = " + (resultsTutors));
  }

  useEffect(() => {
    processAPI();
    console.log("In Homepage, 2results = " + (resultsTutors));
  }, []);



    return (
      <div className="App">
        {
          // results.fname && results.fname.length > 0 ? 
          //   results.tutor ? <TutorNavbar nameAPI={studentNameAPI} results={results}/> : 
          //   <StudentNavbar nameAPI={studentNameAPI} results={results}/> :
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

          <TutorsSection/>




        </div>{/*  BODY DIV ENDS */}
        
        <Outlet/>
      </div>
    )
  }
  
export default HomePage