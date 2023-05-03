//React
import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

//Hooks
import { setAuthToken } from '../Hooks/useAuthToken';
import { Avatar } from '@mui/material';
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper';
import cookies from '../Hooks/cookieHook';


const StudentNavbar = (props: { results: any, restart: () => void }) => {

    const navigate = useNavigate();

    const updateCookie = cookies().updateCookie;

    const signOut = () => {
      setAuthToken("");
      updateCookie("", "", false);
      navigate("/");
      props.restart();
    }

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
        <Nav>
          <Navbar.Brand onClick={() => {navigate("/")}} className="cursor-pointer">
            <img src="https://i.imgur.com/N7tRk7d.png" className="navbar-image-full" alt="A+ Tutors Logo"/>
          </Navbar.Brand>
            <NavDropdown style={{paddingLeft:20}}title="APPOINTMENTS" className="navlink-sp">
                <NavDropdown.Item onClick={() => {navigate("/appointments/set")}} className="down-nb">NEW APPOINTMENT</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {navigate("/upcoming/student")}} className="down-nb">UPCOMING APPOINTMENTS</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => {navigate("/favorites")}} className="navlink-sp">FAVORITES</Nav.Link>
        </Nav>
        

        <Nav className='float-end'>
          {
            props.results.fname && props.results.fname.length > 0 ? 
            <Navbar.Text className="nb-nametag">
              Hello, <b>{props.results.fname}</b>
            </Navbar.Text> :
            <Navbar.Text className="nb-nametag">
              Hello, Guest
            </Navbar.Text>
          }
          <NavDropdown align="end" style={{marginRight:-50}} title={<Avatar sx={{ bgcolor: nameToColor(props.results.fname || " ") }} src={props.results.profilePic}>
                  {nameToInitials(props.results.fname || " ", props.results.lname || " ")}
                </Avatar>}>
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