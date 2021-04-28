import io from 'socket.io-client';
<<<<<<< HEAD
import { Login } from './Login';
=======
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login } from './login/Login';
import './App.css';
import Gameroom from "./gameroom/Gameroom.js";
import Header from './components/Header.js';
import Profile from './profile/Profile.js';
import Leaderboard from './leaderboard/Leaderboard.js';
import Landing from './Landing.js';
>>>>>>> socket-chess


const socket = io();

function App() {



  const [test_username, setTestUser ] = useState("");
  const inputRef = useRef(null);
  function onClickButton() {
    if (inputRef != null && inputRef.current.value != "") {
      const userName = inputRef.current.value;
      setTestUser(prev => userName);
    }
  }

  return (
<<<<<<< HEAD
    <body>
    <Login Login/>
    </body>
=======
    <BrowserRouter>
      <Header isLoggedIn={true}/>
      <Switch>
        <Route path='/' exact>
          <Landing />
        </Route> 
        <Route path='/gameroom' exact>
          <Gameroom socket={socket} user_name={test_username}/>
          {
          test_username =="" ? 
          
          <>
          <input ref={inputRef} type="text" />
          <button onClick={onClickButton}>Set Username</button> 
          </>
          :
          null
          }
        </Route>
        <Route path='/leaderboard' exact>
          <Leaderboard />
        </Route> 
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='login' exact>
          <Login socket={socket}/>
        </Route>
      </Switch>
    </BrowserRouter>
>>>>>>> socket-chess
  );
}
export default App;
