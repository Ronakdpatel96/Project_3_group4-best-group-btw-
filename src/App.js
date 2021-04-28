import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
//import logo from './logo.svg';
import {Login} from './Login.js';
=======
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './Login';
import { Sample } from './board';
>>>>>>> 9ca263150403bf720b3a1011b13c7441503214de
import './App.css';

const socket = io();

function App() {
 
  return (
    <div>
    
<<<<<<< HEAD
      <div>
        <Login Login/>
      </div>
    
=======
    <div className="database-info-holder">
      <button class="stats" type="button" onClick={showStats}> Show/Hide Stats </button>
      { shown === true ? (
        <div className="database-info">
          Name:&nbsp;
          {stats[0]}
          <br />
          Email:&nbsp;
          {stats[1]}
          <br />
          Record:&nbsp;
          {stats[2]}
          -
          {stats[3]}
          -
          {stats[4]}
          <br />
          Rank:&nbsp;
          {stats[5]}
          <br />
          {stats[6]}
        </div>
      ) : null }
    </div>
>>>>>>> 9ca263150403bf720b3a1011b13c7441503214de
    </div>
  );
}

export default App;
