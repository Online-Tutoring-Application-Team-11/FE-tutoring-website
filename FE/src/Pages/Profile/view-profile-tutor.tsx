import React from 'react'
import { useNavigate } from "react-router-dom";

import { Card, CardContent, Typography, CardActions, Button, Avatar} from '@mui/material/';

import { useAppSelector } from '../../Hooks/stateHooks'
import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'

const ViewProfileTutor = () => {

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.value)
  
  const navToEditTutor = () => {
    navigate("/profile/edit/tutor")
  };

  return(
    <div>
      <Card>
        <CardContent>
          
          <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
            View Profile
          </Typography>

          <div className="grid grid-flow-col grid-cols-12">
            <div className="grid grid-flow-row col-span-6 form-elements">
              
              <Typography variant="h6">Name</Typography>
              <Typography variant="body1">{user.fName} {user.lName}</Typography>

              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{user.email}</Typography>
          
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body1">{user.aboutMe}</Typography>

              <Typography variant="h6">List of Subjects</Typography>
              <Typography variant="body1"> 
                {user.subjects![0]}
                {user.subjects!.slice(1).map((subject) => 
                  ", " + subject
                )}
              </Typography>

            </div>

            <div className="col-span-4 flex justify-end">
              <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
              </Avatar>
            </div>

          </div>
 
        </CardContent>
        <CardActions>
          <Button className="m-3" variant="contained" color="primary" onClick={navToEditTutor}>Edit Profile</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ViewProfileTutor
