import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {

    return(
        <Navbar className="nb-col" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">
          <img src="https://i.imgur.com/Vomm9Wd.png" className="navbar-image" alt="A+ Tutors Logo"/>
          </Navbar.Brand>
          <Nav className="navbar-links">
            <Nav.Link className="navlink-hp" href="#">TUTORS</Nav.Link>
            <Nav.Link className="navlink-hp" href="#">COURSES</Nav.Link>
            <Nav.Link className="navlink-hp" href="#">REVIEWS</Nav.Link>
            <Nav.Link className="navlink-hp" href="#">CONTACT US</Nav.Link>
          </Nav>
          <Nav className="float-end">
            <Button variant="hollow-nb-button" style={{marginRight:15}}>RETURNING USER?</Button>
            <Button variant="full-nb-button" style={{marginRight:-50}}>SIGN-UP ➔</Button>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default AppNavbar;