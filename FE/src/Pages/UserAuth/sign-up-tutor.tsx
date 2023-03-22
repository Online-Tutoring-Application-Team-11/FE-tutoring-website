import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, Box, Typography, MenuItem } from '@mui/material'

import '../../output.css'
import './sign-in.css'
import { TutorUser } from '../../API/DTOs/userTypes'
import { subjectArray } from '../../API/DTOs/subjectTypes'
import { updateTutor } from '../../API/Endpoints/userEndpoints'
import { useNavigate } from 'react-router-dom';

const SignUpTutor = () => {

  const navigate = useNavigate();
  var newUser: TutorUser;

  const profileSchema = object({
    aboutMe: string().nonempty('About Me is required'),
    subjects: string().array().nonempty('Subjects are required')
  });

  type ProfileInput = TypeOf<typeof profileSchema>

  const onSubmitHandler: SubmitHandler<ProfileInput> = (profile) => {
    if (isSubmitSuccessful) {
      newUser = {
        ...newUser,
        aboutMe: profile.aboutMe,
        subjects: profile.subjects
      }
      updateTutor(newUser).then(() => {
        navigate('/')
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
                SelectProps={{multiple: true}}
                required
                id="type"
                label="Account Type"
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

              <div className="space-y-2">
                <Button
                  className="w-100 btn btn-lg btn-primary btn-temp-fix"
                  variant="contained"
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