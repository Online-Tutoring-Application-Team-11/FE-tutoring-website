import React from 'react';
// @ts-ignore
import { Element } from 'react-scroll';
import PageBlurb from '../../Components/PageBlurb';
import PageTitle from '../../Components/PageTitle';
import PicturesCarousel from '../../Components/PicturesCarousel';
import FloatingPicture from '../../Components/FloatingPicture';
import TutorsSection from '../../Components/TutorsSection';
import CoursesSection from '../../Components/CoursesSection';
import ReviewsSection from '../../Components/ReviewsSection';
import ContactUsSection from '../../Components/ContactUs';
import HomepageFooter from '../../Components/HomepageFooter';

const HomePage = () => {
    return (
        <>
        <div id="page-body" style={{paddingLeft:"65px", paddingRight:"65px"}}>
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

          <Element id="tutors-section" name="tutors-section">
            <TutorsSection/>
          </Element>

          <Element id="courses-section" name="courses-section">
            <div style={{paddingBottom: "40px"}}>
            <CoursesSection/>
            </div>
          </Element>

          <br/>
          <Element id="reviews-section" name="reviews-section">
            <ReviewsSection/>
          </Element>

          <br/>
          <Element id="contactus-section" name="contactus-section">
            <ContactUsSection/>
          </Element>
          <br/>
          <br/>

        </div>{/*  BODY DIV ENDS */}
        <HomepageFooter/>
        </>
    )
}

export default HomePage