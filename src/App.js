import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Login } from './Login';
import { Sample } from './board';
import './App.css';
import BlindChess from "./chessboard.js";
import Header from './components/Header.js';


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
    
      <Header />
      <div className="App">
       <BlindChess 
       socket={socket}
       user_data = {user_data} 
       user_name = {"White"}/>
      </div>
      
      <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/chessgame' component={BlindChess}/>
        <Route path='/leaderboard' component={Sample}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
