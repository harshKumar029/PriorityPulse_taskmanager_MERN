import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Homepage/Home';
import Login from './pages/Login&Signup/Login';
import Signup from './pages/Login&Signup/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/createuser" element={<Signup />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
