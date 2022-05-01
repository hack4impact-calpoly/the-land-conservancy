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
import EditPrizes from './components/pages/editPrizes';
import EditOnePrize from './components/pages/editOnePrize';
import UserContext from './userContext';
import { Event, Shift, User, Prize } from './types';
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
  const [allShifts, setAllShifts] = useState<Shift[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

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
          setUserInfo(data);
          setPastShifts(data.pastShifts);
        })
        .catch((err) => console.log(err));
    };

    if (currentUser && currentUser._id) {
      loadPastShifts();
    }
  }, [currentUser]);

  // get all shifts from db
  useEffect(() => {
    const loadAllShifts = async () => {
      await fetch(`http://localhost:3001/shifts`)
        .then((res) => res.json())
        .then((data) => {
          setAllShifts(data);
        })
        .catch((err) => console.log(err));
    };

    if (userInfo?.isAdmin) {
      loadAllShifts();
    }
  }, [userInfo]);

  // get all users from db
  useEffect(() => {
    const loadAllUsers = async () => {
      await fetch(`http://localhost:3001/users`)
        .then((res) => res.json())
        .then((data) => {
          setAllUsers(data);
        })
        .catch((err) => console.log(err));
    };

    if (currentUser?.isAdmin) {
      loadAllUsers();
    }
  }, [currentUser]);

  // get prizes from db
  useEffect(() => {
    const loadPrizes = async () => {
      await fetch(`http://localhost:3001/prizes`)
        .then((res) => res.json())
        .then((data) => {
          setPrizes(data);
        })
        .catch((err) => console.log(err));
    };

    if (userInfo?.isAdmin) {
      loadPrizes();
    }
  }, [userInfo]);

  // runs when currentUser is updated
  useEffect(() => {
    console.log('currentUser has been updated: ', currentUser);
  }, [currentUser]);

  const userContextFields = React.useMemo(
    () => ({ currentUser, setUser }),
    [currentUser]
  );

  return (
    <UserContext.Provider value={userContextFields}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/events" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPasword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/past-shifts"
              element={
                <ProtectedRoute>
                  <PastShifts pastShiftData={pastShifts} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events eventData={events} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/log-hours/:eventId"
              element={
                <ProtectedRoute>
                  <LogHours
                    eventData={events}
                    setPastShifts={setPastShifts}
                    setAllShifts={setAllShifts}
                    allUsers={allUsers}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/thank-you"
              element={
                <ProtectedRoute>
                  <ThankYou />
                  {/* _may_ need to add additional props */}
                  {/* hardcoding shift details for now */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-event"
              element={
                <ProtectedRoute>
                  <CreateEvent eventData={events} setEvents={setEvents} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer-log"
              element={
                <ProtectedRoute>
                  <VolunteerLog allShiftData={allShifts} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress-bar"
              element={
                <ProtectedRoute>
                  <EditProgressBar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-prizes/:prizeId"
              element={
                <ProtectedRoute>
                  <EditOnePrize />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-prizes"
              element={
                <ProtectedRoute>
                  <EditPrizes prizeData={prizes} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
