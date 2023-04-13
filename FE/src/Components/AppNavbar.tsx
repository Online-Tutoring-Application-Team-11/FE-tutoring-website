import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {

  const navigate = useNavigate();

  const signIn = () => {
    navigate('/auth/sign-in');
  }

  const signUp = () => {
    navigate('/auth/sign-up')
  }

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">
          <img src="https://i.imgur.com/Vomm9Wd.png" className="navbar-image-full" alt="A+ Tutors Logo"/>
          </Navbar.Brand>
          <Nav className="navbar-links">
            <Nav.Link className="navlink-hp" href="#">TUTORS</Nav.Link>
            <Nav.Link className="navlink-hp" href="#">COURSES</Nav.Link>
            <Nav.Link className="navlink-hp" href="#">REVIEWS</Nav.Link>
            <Nav.Link className="navlink-hp" href="#">CONTACT US</Nav.Link>
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