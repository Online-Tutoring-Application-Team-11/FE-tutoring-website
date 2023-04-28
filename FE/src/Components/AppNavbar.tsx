import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { Link } from "react-scroll";

const AppNavbar = () => {

  const navigate = useNavigate();

  const signIn = () => {
    navigate('/auth/sign-in');
  }

  const signUp = () => {
    navigate('/auth/sign-up')
  }

    return(
        <Navbar className="nb-col" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">
          <img src="https://i.imgur.com/Vomm9Wd.png" className="navbar-image" alt="A+ Tutors Logo"/>
          </Navbar.Brand>
          <Nav className="navbar-links">
            <Link activeClass="active" smooth spy to="tutors-section">
              <Nav.Link className="navlink-hp">TUTORS</Nav.Link>
            </Link>

            <Link activeClass="active" smooth spy to="courses-section">
              <Nav.Link className="navlink-hp" href="#">COURSES</Nav.Link>
            </Link>

            <Link activeClass="active" smooth spy to="reviews-section">
              <Nav.Link className="navlink-hp" href="#">REVIEWS</Nav.Link>
            </Link>

            <Link activeClass="active" smooth spy to="contactus-section">
              <Nav.Link className="navlink-hp" href="#">CONTACT US</Nav.Link>
            </Link>
          </Nav>
          <Nav className="float-end">
            <Button variant="hollow-nb-button" style={{marginRight:15}} onClick={signIn}>RETURNING USER?</Button>
            <Button variant="full-nb-button" style={{marginRight:-50}} onClick={signUp}>SIGN-UP ➔</Button>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default AppNavbar;