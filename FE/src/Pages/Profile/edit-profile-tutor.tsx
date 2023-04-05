import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent, Typography, CardActions, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'

import { subjectArray } from '../../API/DTOs/subjectTypes'
import { UserSend, TutorSend, UserGet } from '../../API/DTOs/userTypes'
import { updateTutor } from '../../API/Endpoints/userEndpoints'
import { updateUser } from '../../API/Endpoints/userEndpoints'
import { useAppSelector } from '../../Hooks/stateHooks'

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

          <div className="grid grid-flow-col grid-cols-12 form-elements">
            <div className="grid grid-flow-row grid-rows-3 gap-y-4 col-span-6">
            <div className="grid grid-flow-col grid-cols-6">
              <div className="col-span-3">
                <TextField
                  required
                  className="m-2"
                  size="small"
                  label="First Name"
                  value={user.fName}
                />
              </div>
              <div className="col-span-3">
                <TextField
                  required
                  className="m-2"
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
              InputProps={{
                readOnly: true,
              }}
              value={user.email}
            />
          
            <TextField
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
          </div>
 
        </CardContent>
        <CardActions>
          <Button variant="contained">Save Changes</Button>
          <Button variant="contained" color="#6C757D">Reset Password</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default EditProfileTutor