import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header.js';

// https://oauth2.googleapis.com/tokeninfo?id_token={token}

export function Logout({ setUser, setEmail }) {
    
    const handleLogout = () => {
    setUser("");
    setEmail("");
    localStorage.clear();
  };
    
    
    return(
        <div class="login">
            
            <h2>Click to log out</h2>
            
            <button onClick={handleLogout}>Logout</button>
        </div> 
);
}

export default Logout;
