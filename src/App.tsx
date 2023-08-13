import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Protected from './components/Protected';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='login' element={<Login />}></Route>
          <Route element={<RequireAuth />}>
            <Route path='protected' element={<Protected />}></Route>
          </Route>
        </Route>
      </Routes>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
  );
}

export default App;
