import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem, Button, FormControl, Box, Typography, Alert, Collapse, IconButton, Badge, Fab, Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { FaTimes, FaEdit } from 'react-icons/fa';

import '../../output.css'
import './sign-in.css'
import { StudentSend, UserGet, UserSend } from '../../API/DTOs/userTypes'
import { registerUser, logIn } from '../../API/Endpoints/authEndpoint'
import { setUser } from '../../Hooks/userSlice';
import { useAppDispatch } from '../../Hooks/stateHooks';
import { setAuthToken } from '../../Hooks/useAuthToken';
import cookies from '../../Hooks/cookieHook';
import { uploadImage } from '../../Helpers/firebaseHelper'

import { nameToColor, nameToInitials } from '../../Helpers/avatarHelper'

import { Button as BsButton } from 'react-bootstrap';
import { getStudent, getTutor, updateStudent, updateUser } from '../../API/Endpoints/userEndpoints';


const SignUp = () => {

  const navigate = useNavigate();

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrMsg] = React.useState('');

  const dispatch = useAppDispatch();

  const updateCookie = cookies().updateCookie;

  const registerSchema = object({
    email: string().nonempty('Email is required').email('Email is invalid'),
    fName: string().nonempty('Name is required'),
    lName: string().nonempty('Name is required'),
    password: string()
      .nonempty('Password is required')
      .min(8, 'Password must be more than 8 characters'),
    conPassword: string().nonempty('Please confirm your password'),
    tutor: number({required_error: "Account type is required", invalid_type_error: "Account type is required"}),
  }).refine((data) => data.password === data.conPassword, {
    path: ['conPassword'],
    message: 'Passwords do not match',
  });

  type RegisterInput = TypeOf<typeof registerSchema>;

  const [profileLink, setLink] = React.useState<string>('');
  const [file, setFile] = React.useState<string | ArrayBuffer>();

  const handleCapture = async ({ target }: { target: any }) => {
    setFile(target.files[0]);

    if (target.files[0]) {
      (document.getElementById('myimg') as HTMLInputElement).src = URL.createObjectURL(target.files[0]);
    }
  }

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
      if (hiddenFileInput.current != null) {
        hiddenFileInput.current.click();
      }
  }

  const onSubmitHandler: SubmitHandler<RegisterInput> = (register) => {
    const newUser: UserSend = {
      email: register.email,
      fName: register.fName,
      lName: register.lName,
      password: register.password,
      tutor: register.tutor as unknown as boolean
    }
    registerUser(newUser).then((data) => {
      const logInInfo = {
        email: data.email,
        password: newUser.password
      }
      logIn(logInInfo).then((response) => {
        dispatch(setUser({
          ...response,
          fName: response.fname,
          lName: response.lname
        }));
        setAuthToken(response.token);
        updateCookie(response.token, response.email, response.tutor);

        if(register.tutor == 1 && file != undefined){
          getTutor(register.email).then((freshAccount: UserGet) =>
            
            uploadImage(file, freshAccount.id!.toString()).then((link) => {
              setLink(link);

              var userChange: UserSend = freshAccount;
              userChange = {
                ...userChange,
                fName: freshAccount.fname,
                lName: freshAccount.lname,
                profilePic: link
              }
              updateUser(userChange).then(() => {
                dispatch(setUser({
                  ...response,
                  fName: response.fname,
                  lName: response.lname
                }));
              }).catch((err) => {
                setErrMsg(err.message);
                setError(true);
              });

            })

          )
        }
        else if(register.tutor == 0 && file != undefined){
          getStudent(register.email).then((freshAccount: UserGet) =>

            uploadImage(file, freshAccount.id!.toString()).then((link) => {
              setLink(link);

              var userChange: UserSend = freshAccount;
              userChange = {
                ...userChange,
                fName: freshAccount.fname,
                lName: freshAccount.lname,
                profilePic: link
              }
              updateUser(userChange).then(() => {
                dispatch(setUser({
                  ...response,
                  fName: response.fname,
                  lName: response.lname
                }));
              }).catch((err) => {
                setErrMsg(err.message);
                setError(true);
              });

            })
          )
        }
        
        if (newUser.tutor) {
          navigate("/auth/sign-up-tutor")
        } else {
          navigate("/")
        }
      });
    }).catch((err) => {
      setError(true);
      setErrMsg(err.message);
    })
  };

  const navToSignIn = () => {
    navigate("/auth/sign-in")
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  return (

          <Box
            sx={{ minWidth: 500, minHeight: 660 }}
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Typography variant="h4" mb={4} className="flex justify-center">Sign Up</Typography>
            <FormControl sx={{ height: 560 }} fullWidth className="flex justify-between center">
              <TextField
                required
                className="m-2"
                size="small"
                label="Email Address"
                placeholder="netid@utdallas.edu"
                error={!!errors['email']}
                helperText={errors['email'] ? errors['email'].message : ''}
                {...register('email')}
              />
              <div className="row">
                <div className="col-sm">
                  <TextField
                    required
                    className="m-2"
                    size="small"
                    label="First Name"
                    error={!!errors['fName']}
                    helperText={errors['fName'] ? errors['fName'].message : ''}
                    {...register('fName')}
                  />
                </div>
                <div className="col-sm">
                  <TextField
                    required
                    className="m-2"
                    size="small"
                    label="Last Name"
                    error={!!errors['lName']}
                    helperText={errors['lName'] ? errors['lName'].message : ''}
                    {...register('lName')}
                  />
                </div>
              </div>

              <div className="text-center" style={{paddingTop:"8px", paddingBottom:"6px"}}>
              {profileLink=='' && 
                  <BsButton className="sign-up-pp" onClick={handleClick}>
                  <img id="myimg" src="https://i.imgur.com/ZMAkqjW.jpg"/>
                  </BsButton>
              }
              {profileLink!='' &&
                  <BsButton className="sign-up-pp" onClick={handleClick}>
                  <img src={profileLink}/>
                  </BsButton>
              }
                <div style={{fontSize:"15px", color:"#5A5A5A"}}>Upload Picture</div>
                <input id="imgInp" accept="image/*" onChange={handleCapture} ref={hiddenFileInput} type='file' style={{display:'none'}}/>
              </div>


              <div className='text-center'>
              {/* <label>
                <input type="file" ref={hiddenFileInput} onChange={handleImageChange} style={{display:"none"}}/>
                <BsButton onClick={handleImageButtonClick}>UPLOAD PIC</BsButton>
              </label> */}
              </div>
              <TextField
                required
                className="m-2"
                size="small"
                label="Password"
                type="password"
                error={!!errors['password']}
                helperText={errors['password'] ? errors['password'].message : ''}
                {...register('password')}
              />
              <TextField
                required
                className="m-2"
                size="small"
                label="Confirm Password"
                type="password"
                error={!!errors['conPassword']}
                helperText={errors['conPassword'] ? errors['conPassword'].message : ''}
                {...register('conPassword')}
              />
              <TextField
                select
                required
                className="m-2"
                size="small"
                id="type"
                label="Account Type"
                error={!!errors['tutor']}
                helperText={errors['tutor'] ? errors['tutor'].message : ''}
                {...register('tutor')}
              >
                <MenuItem value={0}>Student</MenuItem>
                <MenuItem value={1}>Tutor</MenuItem>
              </TextField>

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

              <div className="space-y-2">
                <Button
                  className="w-20 btn btn-temp-fix"
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Sign up
                </Button>
                <p className="mt-1 mb-0 text flex justify-center">Already have an account?</p>
                <Button 
                  className="mv-0 btn btn-link btn-temp-fix" 
                  variant="text" onClick={navToSignIn}
                  sx={{color: 'green', '&:hover': {color: 'green'}}}
                >
                  Log In!
                </Button>
                <p className="text-muted flex justify-center">Team 11 &copy; 2023</p>
              </div>
              
            </FormControl>
          </Box>
      
      
  );
}

export default SignUp