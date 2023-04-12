import React from 'react';
import AppNavbar from '../../Components/AppNavbar'
import StudentNavbar from '../../Components/StudentNavbar';
import TutorNavbar from '../../Components/TutorNavbar'

import { Outlet } from 'react-router-dom'
import useResultsStudent from '../../Hooks/useResultsStudent';

const HomePage = () => {

  //HOOKS
  const[studentNameAPI, results, errorMessage] = useResultsStudent();

    return (
      <div className="App">
        {
          results.fname && results.fname.length > 0 ? 
            results.tutor ? <TutorNavbar nameAPI={studentNameAPI} results={results}/> : 
            <StudentNavbar nameAPI={studentNameAPI} results={results}/> :
          <AppNavbar/>
        }
        
        <Outlet/>
      </div>
    )
  }
  
export default HomePage