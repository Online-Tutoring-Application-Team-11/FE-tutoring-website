import React from 'react'
import { Outlet } from 'react-router-dom'

import '../../output.css'
import './profile.css'


const ProfileLayout = () => {
    return(
      <main className="m-auto body-profile">
        <Outlet/>
      </main>
    )
}

export default ProfileLayout