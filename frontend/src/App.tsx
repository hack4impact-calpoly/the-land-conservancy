import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Login from './components/authentication/login';
import CreateAccount from './components/authentication/createAccount';
import ForgotPasword from './components/authentication/forgotPassword';
import ResetPassword from './components/authentication/resetPassword';
import PastShifts from './components/pages/pastShifts';

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
          <Route path="/past-shift" element={<PastShifts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
