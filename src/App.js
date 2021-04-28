import io from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login } from './login/Login';
import './App.css';
import Gameroom from "./gameroom/Gameroom.js";
import Header from './components/Header.js';
import Profile from './profile/Profile.js';
import Leaderboard from './leaderboard/Leaderboard.js';
import Landing from './Landing.js';


const socket = io();
const user_data = { Black: "Mike", White: "Joe", Spectator : ["idk", "sdqw"] };

function App() {
  const [shown, setShown] = useState(false);
  const [stats, setStats] = useState([]);

  function showStats() {
    setShown((prevShown) => !prevShown);
  }

  useEffect(() => {
    socket.on('statistics', (statsInfo) => {
      console.log('Statistics event received!');
      console.log(statsInfo);
      setStats(statsInfo);
    });
  }, []);


  const [test_username, setTestUser ] = useState("");
  const inputRef = useRef(null);
  function onClickButton() {
    if (inputRef != null && inputRef.current.value != "") {
      const userName = inputRef.current.value;
      setTestUser(prev => userName);
    }
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={true}/>
      <Switch>
        <Route path='/' exact>
          <Landing />
        </Route> 
        <Route path='/gameroom' exact>
          <Gameroom socket={socket} user_name={test_username}/>
              Enter User Name here: <input ref={inputRef} type="text" />
    <button onClick={onClickButton}>Set Username</button>
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
  );
}
export default App;
