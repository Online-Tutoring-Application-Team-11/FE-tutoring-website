import React from 'react'
import { useNavigate } from "react-router-dom";

import { Card, CardContent, Typography, CardActions, Button, Avatar} from '@mui/material/';

import { useAppSelector } from '../../Hooks/stateHooks'
import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'

const ViewProfileStudent = () => {

  const navigate = useNavigate();
  
  const user = useAppSelector((state) => state.user.value)

  const navToEditStudent = () => {
    navigate("/profile/edit/student")
  }

  return(
    <div>
      <Card>
        <CardContent>
          
          <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
            View Profile
          </Typography>

          <div className="grid grid-flow-col grid-cols-12">
            <div className="grid grid-flow-row grid-rows-12 col-span-6 form-elements">
              
              <Typography className="row-span-1" variant="h6">Name</Typography>
              <Typography className="row-span-1" variant="body1">{user.fName} {user.lName}</Typography>
              <Typography className="row-span-1" variant="h6">Email</Typography>
              <Typography className="row-span-1" variant="body1">{user.email}</Typography>
              <div className = "row-span-6"></div>
          
            </div>

            <div className="col-span-4 flex justify-end">
              <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
              </Avatar>
            </div>

          </div>
 
        </CardContent>
        <CardActions>
          <Button className="m-3" variant="contained" color="primary" onClick={navToEditStudent}>Edit Profile</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ViewProfileStudent