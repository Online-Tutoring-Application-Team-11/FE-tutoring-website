import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent, Typography, CardActions, MenuItem, TextField, Button, Avatar, Badge, IconButton, Dialog, DialogTitle, Collapse, Alert, Fab } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'

import {FaEdit, FaTimes} from 'react-icons/fa';

import { subjectArray } from '../../API/DTOs/subjectTypes'
import { UserSend, TutorSend, UserGet } from '../../API/DTOs/userTypes'
import { updateTutor } from '../../API/Endpoints/userEndpoints'
import { updateUser } from '../../API/Endpoints/userEndpoints'
import { useAppSelector } from '../../Hooks/stateHooks'
import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'
import { uploadImage } from '../../Helpers/firebaseHelper'

const EditProfileTutor = () => {

  const user = useAppSelector((state) => state.user.value);

  var userChange: UserSend = user;
  var tutorSubjects: TutorSend;
  const [openForgotPassword, setOpen] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrMsg] = React.useState('');

  const [profileImage, setImage] = React.useState<string | ArrayBuffer | null>(null);
  const [profileLink, setLink] = React.useState(user.profilePic);

  const profileSchema = object({
    fName: string().nonempty('Name is required'),
    lName: string().nonempty('Name is required'),
    aboutMe: string().nonempty('About Me is required'),
    subjects: string().array().nonempty('Subjects are required')
  });

  type ProfileInput = TypeOf<typeof profileSchema>

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCapture = async ({ target }: { target: any }) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = async (e) => {
      setImage(e.target!.result);
      uploadImage(profileImage!, user.fName! + user.lName!).then((link) => {
        setLink(link);
        console.log(profileLink);
      });
    };
  }

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
          setSuccess(true);
        })
      }).catch((err) => {
        setErrMsg(err.message);
        setError(true);
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
                  <Fab color="primary" aria-label="add-image" sx={{ position: "fixed", overflow: "hidden", backgroundColor: '#1976D2' }}>
                    <input
                      type="file"
                      onChange={handleCapture}
                      accept="image/*"
                      style={{ //make this hidden and display only the icon
                        position: "absolute", 
                        top: "-35px",
                        left: 0,
                        height: "calc(100% + 36px)",
                        width: "calc(100% + 5px)",
                        outline: "none",
                      }}
                    />
                    <FaEdit size='30'/>
                  </Fab>
                }
              >
                <Avatar sx={{ width: 256, height: 256, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }} src={profileLink}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
                </Avatar>
              </Badge>
            </div>

          </div>
 
        </CardContent>
        <CardActions>
          <Button className="m-3" variant="contained" color="primary" type="submit">Save Changes</Button>
          <Button className="m-3" variant="contained" color="success" onClick={handleOpen}>Reset Password</Button>

          <Collapse in={error}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <FaTimes fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
          <Collapse in={success}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccess(false);
                  }}
                >
                  <FaTimes fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Updated Profile
            </Alert>
          </Collapse>
        </CardActions>
      </Card>

      <Dialog open={openForgotPassword} onClose={handleClose}>
        <DialogTitle>Forgot Password</DialogTitle>
      </Dialog>
    </div>
  )
}

export default EditProfileTutor