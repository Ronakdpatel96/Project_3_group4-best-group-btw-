import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import {Login} from './Login.js';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

const socket = io();

function App() {
 
  return (
    <div>
    
      <div>
        <Login Login/>
      </div>
    
    </div>
  );
}

export default App;

// Just testing this out for the login page