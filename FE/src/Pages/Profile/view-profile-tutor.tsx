import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

import { Card, CardContent, Typography, Avatar} from '@mui/material/';

import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'
import { UserSend } from '../../API/DTOs/userTypes';
import { getTutor } from '../../API/Endpoints/userEndpoints';

const ViewProfileTutor = () => {

  const { tutorEmail } = useParams();

  const [user, setUser] = React.useState<UserSend>({email:""});

  const fetchUser = () => {
    getTutor(tutorEmail || "").then((response) => {
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

  const subjectsList = user.subjects?.join(', ');

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
              <Typography variant="body1">{subjectsList}</Typography>

            </div>

            <div className="col-span-4 flex justify-end">
              <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }} src={user.profilePic}>
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
