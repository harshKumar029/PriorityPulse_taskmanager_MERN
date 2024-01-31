import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Homepage/Home';
import Login from './pages/Login&Signup/Login';
import Signup from './pages/Login&Signup/Signup';
import Task from './pages/Task/Task'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/createuser" element={<Signup />}/>
          <Route path="/task" element={<Task/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
