//React
import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {FaHeart} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

//Hooks
import useResultsStudent from '../Hooks/useResultsStudent';
import { setAuthToken } from '../Hooks/useAuthToken';
import { Avatar } from '@mui/material';
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper';


const StudentNavbar = ({ nameAPI, results }: { nameAPI: any, results: any }) => {

    //HELPER FUNCTION
    const processAPI = () => {
        nameAPI("anirudh.umarji@utdallas.edu");
    }

    const navigate = useNavigate();

    const signOut = () => {
      setAuthToken("");
      navigate("/auth/sign-in")
    }

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
        <Nav>
          <Navbar.Brand onClick={() => {navigate("/")}}>
          <img src="https://i.imgur.com/N7tRk7d.png" className="navbar-image-full" alt="A+ Tutors Logo"/>
          </Navbar.Brand>
            <NavDropdown style={{paddingLeft:20}}title="APPOINTMENTS" className="navlink-sp">
                <NavDropdown.Item href="#action3" className="down-nb">NEW APPOINTMENT</NavDropdown.Item>
                <NavDropdown.Item href="#action4" className="down-nb">UPCOMING APPOINTMENT</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="navlink-sp">FAVORITES</Nav.Link>
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
          <NavDropdown align="end" style={{marginRight:-50}} title={<Avatar sx={{ bgcolor: nameToColor(results.fname || " ") }} src={results.profilePic}>
                  {nameToInitials(results.fname || " ", results.lname || " ")}
                </Avatar>}>
                <NavDropdown.Item href="#action3" className="down-nb">View Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {navigate("/profile/edit/student")}} className="down-nb">Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOut} className="down-nb">Sign Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Container>
      </Navbar>
    )
}

export default StudentNavbar;