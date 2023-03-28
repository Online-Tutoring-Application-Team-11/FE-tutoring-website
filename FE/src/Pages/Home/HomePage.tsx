import React from 'react';
import AppNavbar from '../../Components/AppNavbar'
import StudentNavbar from '../../Components/StudentNavbar';
import TutorNavbar from '../../Components/TutorNavbar'

import { Outlet } from 'react-router-dom'

const HomePage = () => {
    return (
      <div className="App">
        <TutorNavbar/>
        <Outlet/>
      </div>
    )
  }
  
export default HomePage