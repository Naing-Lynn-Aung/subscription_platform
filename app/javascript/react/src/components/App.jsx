import React from 'react'
import { Routes, Route } from "react-router-dom";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
