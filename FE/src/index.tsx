import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

import AuthLayout from './Pages/UserAuth/auth-layout'
import SignUp from './Pages/UserAuth/sign-up-all'
import SignUpTutor from './Pages/UserAuth/sign-up-tutor';
import HomePage from './Pages/Home/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import { store}  from './store'
import SignIn from './Pages/UserAuth/sign-in-all';
import ProfileLayout from './Pages/Profile/profile-layout';
import EditProfileTutor from './Pages/Profile/edit-profile-tutor';
import EditProfileStudent from './Pages/Profile/edit-profile-student';
import ViewProfileTutor from './Pages/Profile/view-profile-tutor';
import ViewProfileStudent from './Pages/Profile/view-profile-student';
import SearchTutors from './Pages/Appointments/SearchTutors';
import Favorites from './Pages/Favorites';
import Hours from './Pages/Hours';
import UpcomingTutor from './Pages/Appointments/UpcomingTutor';
import UpcomingStudent from './Pages/Appointments/UpcomingStudent';
import Header from './Pages/Home/Header';

export default function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Header/>}>
            <Route path = "home" element = {<HomePage/>}></Route>
            <Route path = "profile" element = {<ProfileLayout/>}>
              <Route path = "edit/tutor" element = {<EditProfileTutor/>}></Route>
              <Route path = "edit/student" element = {<EditProfileStudent/>}></Route>
              <Route path = "view/tutor/:tutorEmail" element = {<ViewProfileTutor/>}></Route>
              <Route path = "view/student/:studentEmail" element = {<ViewProfileStudent/>}></Route>
            </Route>
            <Route path = "appointments/set" element = {<SearchTutors/>}></Route>
            <Route path = "upcoming/tutor" element = {<UpcomingTutor/>}></Route>
            <Route path = "upcoming/student" element = {<UpcomingStudent/>}></Route>
            <Route path = "favorites" element = {<Favorites/>}></Route>
            <Route path = "hours" element = {<Hours/>}></Route>
          </Route>
          <Route path = "/auth" element = {<AuthLayout/>}>
            <Route path = "sign-in" element = {<SignIn/>}></Route>
            <Route path = "sign-up" element = {<SignUp/>}></Route>
            <Route path = "sign-up-tutor" element = {<SignUpTutor/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
