import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './Login';
import { Sample } from './board';
import './App.css';
import BlindChess from "./chessboard.js";


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
    <div>
     <BlindChess 
     socket={socket}
     user_data = {user_data} 
     user_name = {"White"}/>
    </div>
  );
}

export default App;
