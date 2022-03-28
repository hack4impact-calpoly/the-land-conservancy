import React, { useEffect, useState } from 'react';
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
import CreateEvent from './components/pages/createEvent';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);
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

interface Event {
  id: string;
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: string[];
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      await fetch('http://localhost:3001/events')
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          // console.log(data);
        })
        .catch((err) => console.log(err));
    };

    loadEvents();
  }, []);

  // 'setUser' sets the 'currentUser' to the 'userSub' value,
  // which is a unique identifier
  /* eslint-disable */
  const [currentUser, setUser] = useState('');
  /* eslint-enable */

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPasword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/past-shifts" element={<PastShifts />} />
          <Route path="/events" element={<Events eventData={events} />} />
          <Route path="/log-hours" element={<LogHours />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
