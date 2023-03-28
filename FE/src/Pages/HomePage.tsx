import React from 'react';
import AppNavbar from '../Components/AppNavbar'
import StudentNavbar from '../Components/StudentNavbar';
import TutorNavbar from '../Components/TutorNavbar'
import PageTitle from '../Components/PageTitle'
import PageBlurb from '../Components/PageBlurb'
import PicturesCarousel from '../Components/PicturesCarousel'

const HomePage = () => {
    return (
      <div className="App">
        <AppNavbar/>

        <div id="page-body" style={{paddingLeft:"75px", paddingRight:"75px"}}>
          <div className="row">
            <div className="col-sm">
              <PageTitle/>
              <PageBlurb/>
            </div>

            <div className="col-sm">
              <PicturesCarousel/>
            </div>

          </div>
        </div>
      </div>
    )
  }
  
export default HomePage