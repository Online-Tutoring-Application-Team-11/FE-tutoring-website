import React, { useEffect } from 'react';
import AppNavbar from '../../Components/AppNavbar'
import StudentNavbar from '../../Components/StudentNavbar';
import TutorNavbar from '../../Components/TutorNavbar'

import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/stateHooks';
import cookies from '../../Hooks/cookieHook';
import { getTutor, getStudent } from '../../API/Endpoints/userEndpoints';
import { setAuthToken } from '../../Hooks/useAuthToken';
import { setUser } from '../../Hooks/userSlice';
import { UserGet } from '../../API/DTOs/userTypes';

const HomePage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getCookie = cookies().getCookie;

  const [loaded, setLoaded] = React.useState(false);

  const startup = () => {
    if (getCookie().bearerToken && getCookie().email) {
      setAuthToken(getCookie().bearerToken);

      if (getCookie().tutor != undefined && getCookie().tutor == true) {
        getTutor(getCookie().email).then((user) => {
          dispatch(setUser({
            ...user,
            fName: user.fname,
            lName: user.lname
          }));
          setResults(user);
          setLoaded(true);
        })
      } else if (getCookie().tutor != undefined) {
        getStudent(getCookie().email).then((user) => {
          dispatch(setUser({
            ...user,
            fName: user.fname,
            lName: user.lname
          }));
          setResults(user);
          setLoaded(true);
        })
      } else {
        setLoaded(true);
        navigate("/");
      }
    } else {
      setLoaded(true);
    }
  };

  useEffect(() => {
    startup();
  }, []);

  const [results, setResults] = React.useState({} as UserGet);

    return (
      loaded ?
      <div className="App">
        {
          results.fname && results.fname.length > 0 ? 
            results.tutor ? <TutorNavbar results={results}/> : 
            <StudentNavbar results={results}/> :
          <AppNavbar/>
        }
        
        <Outlet/>
      </div> :
      <div/>
    )
  }
  
export default HomePage