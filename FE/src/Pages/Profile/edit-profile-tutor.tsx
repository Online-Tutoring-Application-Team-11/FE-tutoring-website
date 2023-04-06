import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent, Typography, CardActions, MenuItem, TextField, Button, Avatar, Badge, IconButton } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'

import {FaEdit} from 'react-icons/fa';

import { subjectArray } from '../../API/DTOs/subjectTypes'
import { UserSend, TutorSend, UserGet } from '../../API/DTOs/userTypes'
import { updateTutor } from '../../API/Endpoints/userEndpoints'
import { updateUser } from '../../API/Endpoints/userEndpoints'
import { useAppSelector } from '../../Hooks/stateHooks'
import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'

const EditProfileTutor = () => {

  const user = useAppSelector((state) => state.user.value)

  var userChange: UserSend = user;
  var tutorSubjects: TutorSend

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrMsg] = React.useState('');

  const profileSchema = object({
    fName: string().nonempty('Name is required'),
    lName: string().nonempty('Name is required'),
    aboutMe: string().nonempty('About Me is required'),
    subjects: string().array().nonempty('Subjects are required')
  });

  type ProfileInput = TypeOf<typeof profileSchema>

  const onSubmitHandler: SubmitHandler<ProfileInput> = (profile) => {
    if (isSubmitSuccessful) {
      tutorSubjects = {
        email: userChange.email,
        subjects: profile.subjects.slice(1)
      }
      updateTutor(tutorSubjects).then((data: UserGet) => {
        userChange = {
          email: data.email,
          tutor: data.tutor, 
          profilePic: data.profilePic,
          totalHours: data.totalHours,
          aboutMe: profile.aboutMe,
          fName: data.fname,
          lName: data.lname
        }
        updateUser(userChange).then(() => {
          
        })
      }).catch((err) => {
        setError(true);
        setErrMsg(err.message)
      })
    }
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  return(
    <div>
      <Card>
        <CardContent>
          
          <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
            Edit Profile
          </Typography>

          <div className="grid grid-flow-col grid-cols-12">
            <div className="grid grid-flow-row grid-rows-5 gap-y-4 col-span-6 form-elements">
              <div className="grid grid-flow-col grid-cols-6">
                <div className="col-span-3">
                  <TextField
                    required
                    className="m-2 name-fields"
                    size="small"
                    label="First Name"
                    value={user.fName}
                  />
                </div>
                <div className="col-span-3">
                  <TextField
                    required
                    className="m-2 name-fields"
                    size="small"
                    label="Last Name"
                    value={user.lName}
                  />
                </div>
              </div>

              <TextField
                className="m-2"
                size="small"
                label="Email Address"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={user.email}
              />
          
              <TextField
                className="row-span-2 m-2"
                id="outlined-multiline-static"
                label="About Me"
                multiline
                rows={4}
                error={!!errors['aboutMe']}
                helperText={errors['aboutMe'] ? errors['aboutMe'].message : ''}
                {...register('aboutMe')}
                value={user.aboutMe}
              />
              <TextField
                className="m-2"
                select
                SelectProps={{
                  multiple: true,
                  native: false
                }}
                required
                id="type"
                label="Subjects"
                defaultValue={[""]}
                error={!!errors['subjects']}
                helperText={errors['subjects'] ? errors['subjects'].message : ''}
                {...register('subjects')}
                value={user.subjects}
              >
                {subjectArray.map((option) => 
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )}
              </TextField>
            </div>

            <div className="col-span-4 flex justify-end">
              <Badge
                sx={{ width: 256, height: 256 }}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton sx={{ backgroundColor: 'steelblue' }} size="large">
                    <FaEdit/>
                  </IconButton>
                }
              >
                <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
                </Avatar>
              </Badge>
            </div>

          </div>
 
        </CardContent>
        <CardActions>
          <Button className="m-3" variant="contained" color="primary">Save Changes</Button>
          <Button className="m-3" variant="contained" color="success">Reset Password</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default EditProfileTutor