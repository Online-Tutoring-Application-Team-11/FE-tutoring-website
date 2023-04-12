import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserSend } from '../API/DTOs/userTypes';
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper';

const TutorCard = (tutor: UserSend) => {

    const navigate = useNavigate();
  
      return(
        <Card className="m-2 p-2 justify-content-start">
          <div className="grid grid-flow-col">
            <div className="grid grid-flow-row">
              <Avatar sx={{ bgcolor: nameToColor(tutor.fName || " ") }} src={tutor.profilePic}>
                {nameToInitials(tutor.fName || " ", tutor.lName || " ")}
              </Avatar>
              <Typography>{tutor.fName} {tutor.lName}</Typography>
            </div>
          </div>
        </Card>
      )
  }
  
  export default TutorCard;