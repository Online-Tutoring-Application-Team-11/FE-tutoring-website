import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';

import AuthLayout from './Pages/UserAuth/auth-layout'
import SignUp from './Pages/UserAuth/sign-up-all'
import SignUpTutor from './Pages/UserAuth/sign-up-tutor';
import HomePage from './Pages/Home/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import { store}  from './store'
import SignIn from './Pages/UserAuth/sign-in-all';
import EditProfileTutor from './Pages/Profile/edit-profile-tutor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>}>
          {/* ~Put any pages that use the nav bar in this area~ */}
          <Route path = "profile/edit" element = {<EditProfileTutor/>}></Route>
        </Route>
        <Route path = "/auth" element = {<AuthLayout/>}>
          <Route path = "sign-in" element = {<SignIn/>}></Route>
          <Route path = "sign-up" element = {<SignUp/>}></Route>
          <Route path = "sign-up-tutor" element = {<SignUpTutor/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
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
