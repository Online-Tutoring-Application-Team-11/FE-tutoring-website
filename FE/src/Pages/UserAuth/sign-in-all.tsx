import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, Box, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import { useNavigate } from "react-router-dom";

import '../../output.css'
import './sign-in.css'
import { UserSend } from '../../API/DTOs/userTypes'
import { logIn } from '../../API/Endpoints/authEndpoint'

const SignIn = () => {

    const navigate = useNavigate();

    // in progress
    const loginSchema = object({
      email: string().nonempty('Email is required').email('Email is invalid'),
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
            navigate("/") // only navigate to homepage if log in correctly... yes to the Q: does this user exist in the database?
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
            
            <div className="space-y-2">
              <Button
                className="w-100 btn btn-lg btn-primary btn-temp-fix"
                variant="contained"
                type="submit"
              >
                Sign In
              </Button>
              <p className="mt-1 mb-0 text flex justify-center">Don't have an account?</p>
              <Button className="mv-0 btn btn-link btn-temp-fix" variant="text"> Sign Up!</Button>
              <p className="text-muted flex justify-center">Team 11 &copy; 2023</p>
            </div>
            
          </FormControl>
          
        </Box>
    
);

}

export default SignIn