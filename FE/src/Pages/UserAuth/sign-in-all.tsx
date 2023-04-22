import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, Box, Typography, Checkbox, FormGroup, FormControlLabel, Alert, Collapse, IconButton } from '@mui/material'
import { useNavigate } from "react-router-dom";

import '../../output.css'
import './sign-in.css'
import { UserSend } from '../../API/DTOs/userTypes'
import { logIn } from '../../API/Endpoints/authEndpoint'
import { useAppDispatch } from '../../Hooks/stateHooks';
import { setUser } from '../../Hooks/userSlice';
import { setAuthToken } from '../../Hooks/useAuthToken';
import { FaTimes } from 'react-icons/fa';
import { getStudent, getTutor } from '../../API/Endpoints/userEndpoints';
import cookies from '../../Hooks/cookieHook';

const SignIn = () => {

    const navigate = useNavigate();

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrMsg] = React.useState('');

    const dispatch = useAppDispatch();

    const updateCookie = cookies().updateCookie;

    // in progress
    const loginSchema = object({
      email: string().nonempty('Email is required'),
      password: string().nonempty('Password is required'),
    });

    type LoginInput = TypeOf<typeof loginSchema>;

    // in progress
    const onSubmitHandler: SubmitHandler<LoginInput> = (login) => {
        if (isSubmitSuccessful) {
          const returnUser: UserSend = {
            email: login.email, 
            password: login.password,
          }
          logIn(returnUser).then((data) => {
            setAuthToken(data.token);
            updateCookie(data.token, data.email, data.tutor);
            
            if (!data.tutor) {
              getStudent(login.email).then((response) => {
                dispatch(setUser({
                  ...response,
                  fName: response.fname,
                  lName: response.lname,
                  year: response.year,
                  favouriteTutorIds: response.favouriteTutorIds
                }));
                navigate("/");
              })
              
            } else {
              getTutor(login.email).then((response) => {
                dispatch(setUser({
                  ...response,
                  fName: response.fname,
                  lName: response.lname,
                  subjects: response.subjects
                }));
                navigate("/");
              })
            }    

             // only navigate to homepage if log in correctly... yes to the Q: does this user exist in the database?
          }).catch((err) => {
            setError(true);
            setErrMsg(err.message);
          })
        }
      };
    
    const {
        register,
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
      } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
      });

    const [state, setState] = React.useState({
        rememberMe: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]:event.target.checked,
        });
    };

    const navToSignUp = () => {
        navigate("/auth/sign-up")
    }

    const { rememberMe } = state;

    return (
    
        <Box
          sx={{ minWidth: 500, minHeight: 660 }}
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Typography variant="h4" mb={4} className="flex justify-center">Sign In</Typography>
          <FormControl sx={{ height: 360 }} fullWidth className="flex justify-between center">
            <TextField
              required
              id="standard-required"
              className="m-2"
              label="Email Address"
              size="small"
              placeholder="netid@utdallas.edu"
              error={!!errors['email']}
              helperText={errors['email'] ? errors['email'].message : ''}
              {...register('email')} 
            />
            <TextField
              required
              id="standard-password-input"
              className="m-2"
              label="Password"
              type="password"
              size="small"
              error={!!errors['password']}
              helperText={errors['password'] ? errors['password'].message : ''}
              {...register('password')}
            />

            <FormGroup>
                <FormControlLabel 
                    control={<Checkbox checked={rememberMe} onChange={handleChange} name="rememberMe" />} 
                    label="Remember Me"                
                />
            </FormGroup>
            
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
                className="w-20 btn btn-lg btn-primary btn-temp-fix"
                variant="contained"
                type="submit"
              >
                Sign In
              </Button>
              <p className="mt-1 mb-0 text flex justify-center">Don't have an account?</p>
              <Button className="mv-0 btn btn-link btn-temp-fix" variant="text" onClick={navToSignUp}> Sign Up!</Button>
              <p className="text-muted flex justify-center">Team 11 &copy; 2023</p>
            </div>
            
          </FormControl>
          
        </Box>
    
);

}

export default SignIn