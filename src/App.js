import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login } from './login/Login';
import './App.css';
import BlindChess from "./gameroom/chessboard.js";
import Header from './components/Header.js';
import Profile from './profile/Profile';
import Leaderboard from './leaderboard/Leaderboard';


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

  return (
    <BrowserRouter>
    
      <Header isLoggedIn={true}/>
      
      <Switch>
        <Route path='/' component={Login} exact>
          <Login socket={socket} />
        </Route> 
        <Route path='/chessgame' exact>
          <BlindChess user_data={user_data} socket={socket} user_name={"Black"} />
        </Route>
        <Route path='/leaderboard' exact>
          <Leaderboard />
        </Route> 
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='login' exact>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
