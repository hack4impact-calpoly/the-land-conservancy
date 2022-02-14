import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './App.css';
import Home from './components/Home';
import Login from './components/authentication/login';
import CreateAccount from './components/authentication/createAccount';
import ForgotPasword from './components/authentication/forgotPassword';
import ResetPassword from './components/authentication/resetPassword';
import PastShifts from './components/pages/pastShifts';
import Events from './components/pages/events';
import LogHours from './components/pages/logHours';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.configure({
  Auth: {
    // Amazon Cognito Region
    region: 'us-west-2',
    // Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_GsGspX3dl',
    // Amazon Cognito Web Client ID
    userPoolWebClientId: '56nsvt3lp1gmb3ou6t63ldj72m',
    // Enforce user authentication prior to accessing AWS resources
    mandatorySignIn: false,
  },
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPasword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/past-shifts" element={<PastShifts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/log-hours" element={<LogHours />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
