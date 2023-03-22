import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Layout from './Pages/layout'
import AuthLayout from './Pages/UserAuth/auth-layout'
import SignUp from './Pages/UserAuth/sign-up-all'
import SignUpTutor from './Pages/UserAuth/sign-up-tutor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
        </Route>
        <Route path = "/auth" element = {<AuthLayout/>}>
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
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
