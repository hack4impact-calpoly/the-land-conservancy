import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './App.css';
import Login from './components/authentication/login';
import CreateAccount from './components/authentication/createAccount';
import ForgotPasword from './components/authentication/forgotPassword';
import ResetPassword from './components/authentication/resetPassword';
import ProtectedRoute from './components/authentication/protectedRoute';
import PastShifts from './components/pages/pastShifts';
import Events from './components/pages/events';
import LogHours from './components/pages/logHours';
import CreateEvent from './components/pages/createEvent';
import VolunteerLog from './components/pages/volunteerLog';
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

interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: [string];
}

interface Shift {
  _id: string;
  event: Event;
  hours: number;
  user: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  // 'setUser' sets the 'currentUser' to the 'userSub' value,
  // which is a unique identifier
  const [currentUser, setUser] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);
  const [pastShifts, setPastShifts] = useState<Shift[]>([]);
  const [authorized, setAuthorized] = useState(false);

  const user = 'sam';
  // const auth = true;

  console.log(user);
  console.log(currentUser);

  useEffect(() => {
    const loadPastShifts = async () => {
      await fetch(`http://localhost:3001/users/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setPastShifts(data.pastShifts);
        })
        .catch((err) => console.log(err));
    };

    loadPastShifts();
  }, []);

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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/events" />} />
          <Route
            path="/login"
            element={
              <Login setUser={setUser} setAuthorization={setAuthorized} />
            }
          />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPasword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/past-shifts"
            element={
              <ProtectedRoute
                authorization={authorized}
                setAuthorization={setAuthorized}
              >
                <PastShifts pastShiftData={pastShifts} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute
                authorization={authorized}
                setAuthorization={setAuthorized}
              >
                <Events eventData={events} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-hours"
            element={
              <ProtectedRoute
                authorization={authorized}
                setAuthorization={setAuthorized}
              >
                <LogHours />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute
                authorization={authorized}
                setAuthorization={setAuthorized}
              >
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteer-log"
            element={
              <ProtectedRoute
                authorization={authorized}
                setAuthorization={setAuthorized}
              >
                <VolunteerLog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
