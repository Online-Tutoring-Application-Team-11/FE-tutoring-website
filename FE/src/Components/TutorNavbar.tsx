//React
import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {FaHeart} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

//Hooks
import useResultsStudent from '../Hooks/useResultsStudent';


const TutorNavbar = () => {

    //HOOKS
    const[studentNameAPI, results, errorMessage] = useResultsStudent();

    //HELPER FUNCTION
    const processAPI = () => {
        studentNameAPI("anirudh.umarji@utdallas.edu");
    }

    return(
        <Navbar bg="dark" variant="dark" style={{height: "62px"}}>
        <Container>
        <Nav>
          <Navbar.Brand href="#">
          <img src="https://i.imgur.com/N7tRk7d.png" className="navbar-image-full" alt="A+ Tutors Logo"/>
          </Navbar.Brand>
            <Nav.Link className="navlink-sp">UPCOMING</Nav.Link>
            <Nav.Link className="navlink-sp">SET HOURS</Nav.Link>
        </Nav>
        

        <Nav className='float-end'>
          {
          results.fname && results.fname.length > 0 ? 
          <Navbar.Text className="nb-nametag">
            Hello, <b>{results.fname}</b>
          </Navbar.Text> :
          <Navbar.Text className="nb-nametag">
            Hello, Guest
          </Navbar.Text>
          }
          
          <NavDropdown align="end" style={{marginRight:-50}} title={<img className="thumbnail-image" src="https://i.imgur.com/cyUeBP3.jpg" alt="user pic"/>}>
                <NavDropdown.Item href="#action3" className="down-nb">View Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action4" className="down-nb">Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action4" className="down-nb">Sign Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Container>
      </Navbar>
    )
}

export default TutorNavbar;