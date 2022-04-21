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
import ThankYou from './components/pages/thankYou';
import CreateEvent from './components/pages/createEvent';
import VolunteerLog from './components/pages/volunteerLog';
import EditProgressBar from './components/pages/editProgressBar';
import userContext from './userContext';
import { Event, Shift, User } from './types';
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

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  // 'setUser' sets the 'currentUser' to the
  // mongodb user document fetched on login,
  // doc includes the users userSub
  const [currentUser, setUser] = useState<User>({} as User);
  const [pastShifts, setPastShifts] = useState<Shift[]>([]);

  // loads in all events
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

  // get user's past shifts from db
  useEffect(() => {
    const loadPastShifts = async () => {
      await fetch(`http://localhost:3001/users/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          setPastShifts(data.pastShifts);
        })
        .catch((err) => console.log(err));
    };

    if (currentUser && currentUser._id) {
      loadPastShifts();
    }
  }, [currentUser]);

  // runs when currentUser is updated
  useEffect(() => {
    console.log('currentUser has been updated: ', currentUser);
  }, [currentUser]);

  // TODO: value={currentUser} when we get auth finalized
  return (
    <userContext.Provider value={currentUser}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/events" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPasword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/past-shifts"
              element={
                <ProtectedRoute setUser={setUser}>
                  <PastShifts pastShiftData={pastShifts} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute setUser={setUser}>
                  <Events eventData={events} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/log-hours/:eventId"
              element={
                <ProtectedRoute setUser={setUser}>
                  <LogHours eventData={events} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/thank-you"
              element={
                <ProtectedRoute setUser={setUser}>
                  <ThankYou />
                  {/* _may_ need to add additional props */}
                  {/* hardcoding shift details for now */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-event"
              element={
                <ProtectedRoute setUser={setUser}>
                  <CreateEvent eventData={events} setEvents={setEvents} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer-log"
              element={
                <ProtectedRoute setUser={setUser}>
                  <VolunteerLog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress-bar"
              element={
                <ProtectedRoute setUser={setUser}>
                  <EditProgressBar />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
