import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, Box, Typography, MenuItem, Alert, Collapse, IconButton } from '@mui/material'

import '../../output.css'
import './sign-in.css'
import { TutorSend, UserGet, UserSend } from '../../API/DTOs/userTypes'
import { subjectArray } from '../../API/DTOs/subjectTypes'
import { updateTutor, updateUser } from '../../API/Endpoints/userEndpoints'
import { useAppDispatch } from '../../Hooks/stateHooks';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useAppSelector } from '../../Hooks/stateHooks';
import { setUser } from '../../Hooks/userSlice';

const SignUpTutor = () => {

  const user = useAppSelector((state) => state.user.value)

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  var newUser: UserSend = user;
  var tutorSubjects: TutorSend

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrMsg] = React.useState('');

  const profileSchema = object({
    aboutMe: string().nonempty('About Me is required'),
    subjects: string().array().nonempty('Subjects are required')
  });

  type ProfileInput = TypeOf<typeof profileSchema>

  const onSubmitHandler: SubmitHandler<ProfileInput> = (profile) => {
    if (isSubmitSuccessful) {
      tutorSubjects = {
        email: newUser.email,
        subjects: profile.subjects.slice(1)
      }
      updateTutor(tutorSubjects).then((data: UserGet) => {
        newUser = {
          email: data.email,
          tutor: data.tutor, 
          profilePic: data.profilePic,
          totalHours: data.totalHours,
          aboutMe: profile.aboutMe,
          fName: data.fname,
          lName: data.lname
        }
        updateUser(newUser).then((response) => {
          dispatch(setUser({
            ...response,
            subjects: data.subjects,
            fName: response.fname,
            lName: response.lname
          }));
          navigate('/');
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

  return (
    
        <React.Fragment>
          <Box
            sx={{ minWidth: 500, minHeight: 660 }}
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Typography variant="h4" mb={4} className="flex justify-center">Tutor Profile</Typography>
            <FormControl sx={{ height: 560 }} fullWidth className="flex justify-between center">
              <TextField
                id="outlined-multiline-static"
                label="About Me"
                multiline
                rows={4}
                error={!!errors['aboutMe']}
                helperText={errors['aboutMe'] ? errors['aboutMe'].message : ''}
                {...register('aboutMe')}
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
              >
                {subjectArray.map((option) => 
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                )}
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
                  className="w-20 btn btn-lg btn-primary btn-temp-fix"
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Save
                </Button>
                <p className="text-muted flex justify-center">Team 11 &copy; 2023</p>
              </div>
              
            </FormControl>
            
          </Box>
        </React.Fragment>
      
  );
}

export default SignUpTutor