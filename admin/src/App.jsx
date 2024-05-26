import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {

  return (
    <div>
        <>
          <Navbar />
          <hr/>
          <div className='app-content'>
            <Sidebar/>
            <Routes>
              <Route path="/add" element={<Add/>}/>
              <Route path="/list" element={<List/>}/>
              <Route path="/orders" element={<Orders/>}/>
              <Route path="*" element={<Navigate to="/add" />} />
            </Routes>
          </div>
        </>
      
    </div>
  );
};

export default App;
