import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, Typography, Avatar, Button} from '@mui/material/';

import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'
import { UserSend } from '../../API/DTOs/userTypes';
import { getStudent } from '../../API/Endpoints/userEndpoints';

const ViewProfileStudent = () => {
  
  const { studentEmail } = useParams();

  const [user, setUser] = React.useState<UserSend>({email:""});

  const fetchUser = () => {
    getStudent(studentEmail || "").then((response) => {
      const newTutor: UserSend = {
        ...response,
        fName: response.fname,
        lName: response.lname
      };
      setUser(newTutor);
    })
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const navBack = () => {
    navigate(-1);
  }

  return(
    <main>
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
              <Typography className="row-span-1" variant="h6">Year</Typography>
              <Typography className="row-span-1" variant="body1">{user.year}</Typography>
              <div className = "row-span-4"></div>
          
            </div>

            <div className="grid grid-flow-row col-span-4 flex justify-end">
              <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }} src={user.profilePic}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
              </Avatar>

              <Typography variant="h6">Hours Spent Learning: {user.totalHours}</Typography>
            </div>

          </div>
 
        </CardContent>
      </Card>
    </div>

    <div>
      <Button className="m-3" variant="contained" color="success"onClick={navBack} >Back</Button>
    </div>

    </main>
  )
}

export default ViewProfileStudent