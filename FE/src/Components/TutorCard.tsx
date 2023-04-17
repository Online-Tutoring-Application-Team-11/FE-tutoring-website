import { Avatar, Chip, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import React from 'react';
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserGet } from '../API/DTOs/userTypes';
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper';
import { FaStar } from 'react-icons/fa';

const TutorCard = (props: { tutor: UserGet }) => {

    const navigate = useNavigate();
  
      return(
        <Card className="m-2 p-2 justify-content-start">
          <div className="grid grid-flow-row space-y-4">
            <div className="grid grid-cols-4">
              <div className="space-y-2">
                <Avatar sx={{ width: 80, height: 80, fontSize: 32, bgcolor: nameToColor(props.tutor.fname || " ") }} src={props.tutor.profilePic}>
                  {nameToInitials(props.tutor.fname || " ", props.tutor.lname || " ")}
                </Avatar>
                <Typography>{props.tutor.fname} {props.tutor.lname}</Typography>
              </div>
              <div className="col-span-2">
                <Typography variant="h6">About Me</Typography>
                <Typography>{props.tutor.aboutMe}</Typography>
              </div>
              <div className="flex justify-end">
                { !props.tutor.fav ?
                  <FaStar size="32" color="yellow"></FaStar> : <div/>
                }
                <SpeedDial
                  ariaLabel="InteractTutor"
                >

                </SpeedDial>
              </div>
            </div>
            <div className="grid grid-cols-3">
              {props.tutor.subjects.map((subject) =>
                <Chip color="success" className="m-1" key={subject} label={subject}/>
              )}
            </div>
          </div>
        </Card>
      )
  }
  
  export default TutorCard;