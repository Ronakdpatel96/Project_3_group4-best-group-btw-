import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import {Login} from './Login.js';
import './App.css';

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
