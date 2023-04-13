import React from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {

  return(
    <Navbar bg="dark" variant="dark" style={{height: "62px"}}>
    <Container>
    <Nav>
      <Navbar.Brand href="#">
      <img src="https://i.imgur.com/N7tRk7d.png" className="navbar-image-full" alt="A+ Tutors Logo"/>
      </Navbar.Brand>
        <Nav.Link className="navlink-sp">TUTORS</Nav.Link>
        <Nav.Link className="navlink-sp">COURSES</Nav.Link>
        <Nav.Link className="navlink-sp">REVIEWS</Nav.Link>
        <Nav.Link className="navlink-sp">CONTACT US</Nav.Link>
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