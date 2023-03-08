import React from 'react'
import TextField from '@mui/material/TextField'

import '../../output.css'
import './sign-in.css'

const SignUp = () => {
  return (
    
        
          <div className="grid grid-flow-rol grid-rows-8">
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
      
            <TextField
              id="standard-required"
              className="m-2"
              label="Email Address"
              placeholder="netid@utdallas.edu"
            />
            <TextField
              id="standard-required-password-input"
              className="m-2"
              label="Password"
            />
            <TextField
              id="standard-required-password-input"
              className="m-2"
              label="Confirm Password"
            />
            <div className="form-floating mb-3">
              <select className="form-select" id="floatingSelect" aria-label="Account Type">
                <option selected></option>
                <option value="1">Student</option>
                <option value="2">Tutor</option>
              </select>
              <label htmlFor="floatingSelect">Account Type</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
            <p className="mt-1 mb-0 text">Already have an account?</p>
            <button className="mv-0 btn btn-link" type="button">Log In!</button>
            <p className="mt-5 mb-5 text-muted">Team 11 &copy; 2023</p>
          </div>
      
      
  )
}

export default SignUp