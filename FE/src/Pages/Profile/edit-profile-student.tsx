import { zodResolver } from '@hookform/resolvers/zod'
import { CardContent, Typography, CardActions, TextField, Button, Avatar, Badge, IconButton, Dialog, DialogTitle, Collapse, Alert, Fab } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'

import {FaEdit, FaTimes} from 'react-icons/fa';

import { UserSend } from '../../API/DTOs/userTypes'
import { updateUser, changePassword } from '../../API/Endpoints/userEndpoints'
import { useAppDispatch, useAppSelector } from '../../Hooks/stateHooks'
import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import './profile.css'
import { uploadImage } from '../../Helpers/firebaseHelper'
import { setUser } from '../../Hooks/userSlice'

const EditProfileStudent = () => {

  const user = useAppSelector((state) => state.user.value);

  const dispatch = useAppDispatch();

  var userChange: UserSend = user;
  const [openForgotPassword, setOpen] = React.useState(false);
  const [oldPassword, setOldPass] = React.useState("");
  const [newPassword, setNewPass] = React.useState("");

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
      uploadImage(profileImage!, user.id!.toString()).then((link) => {
        setLink(link);
        console.log(profileLink);
      });
    };
  }

  const handlePassword = async () => {
    const passSend = {
      email: user.email,
      password: oldPassword,
      newPassword: newPassword
    };
    changePassword(passSend).then(() => {
      setOpen(false);
      setSuccess(true);
    }).catch((err) => {
      setErrMsg(err.message);
      setError(true);
      setOpen(false);
    })
  }

  const onSubmitHandler: SubmitHandler<ProfileInput> = (profile) => {
    if (isSubmitSuccessful) {
        userChange = {
          ...userChange,
          fName: profile.fName,
          lName: profile.lName,
          profilePic: profileLink
        }
        updateUser(userChange).then((response) => {
          dispatch(setUser({
            ...response,
            fName: response.fname,
            lName: response.lname
          }));
          setSuccess(true);
        }).catch((err) => {
          setErrMsg(err.message);
          setError(true);
        });
    }
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<ProfileInput>({
    defaultValues: {
      fName: user.fName,
      lName: user.lName
    },
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
                    error={!!errors['fName']}
                    helperText={errors['fName'] ? errors['fName'].message : ''}
                    {...register('fName')}
                  />
                </div>
                <div className="col-span-3">
                  <TextField
                    required
                    className="m-2 name-fields"
                    size="small"
                    label="Last Name"
                    error={!!errors['lName']}
                    helperText={errors['lName'] ? errors['lName'].message : ''}
                    {...register('lName')}
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
                  {nameToInitials(user.fName || " ", user.lName || " ")}
                </Avatar>
              </Badge>
            </div>

          </div>
 
        </CardContent>
        <CardActions>
          <Button className="m-3" variant="contained" color="primary" onClick={handleSubmit(onSubmitHandler)}>Save Changes</Button>
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
        <TextField className='m-2' label="Old Password" onChange={(e) => {setOldPass(e.target.value)}}></TextField>
        <TextField className='m-2' label="New Password" onChange={(e) => {setNewPass(e.target.value)}}></TextField>
        <Button className='m-2' onClick={handlePassword}>Change Password</Button>
      </Dialog>
    </div>
  )
}

export default EditProfileStudent