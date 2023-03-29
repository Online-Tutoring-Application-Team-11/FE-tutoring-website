import React from 'react'
import { Outlet } from 'react-router-dom'

import '../../output.css'
import './sign-in.css'
import logo from '../../Assets/logo.png'


const AuthLayout = () => {
    return(
        <main className="m-auto body-auth">

          <div className="grid grid-flow-col grid-cols-7">
            <div className="col-span-3 justified">
              <img className="center-cropped" src={logo} alt=""/>
            </div>
            <div/>
            <div className="col-span-3 form-signin">
              <Outlet/>
            </div>
          </div>
          
      </main>
    )
}

export default AuthLayout