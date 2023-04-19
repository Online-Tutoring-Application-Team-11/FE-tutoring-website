import React from 'react'

import { Card, CardContent, Typography, Avatar} from '@mui/material/';

import { useAppSelector } from '../../Hooks/stateHooks'
import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'

const ViewProfileTutor = () => {

  // edit so that students/tutors can view profiles of other students/tutors via id(email)
  const user = useAppSelector((state) => state.user.value)

  const subjectsList = user.subjects?.join(',')
  
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

              <Typography variant="h6">Subjects</Typography>
              <Typography variant="body1">{subjectsList}</Typography>

            </div>

            <div className="col-span-4 flex justify-end">
              <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
              </Avatar>
            </div>

          </div>
 
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewProfileTutor
