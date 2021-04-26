import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './Login';
import { Sample } from './board';
import './App.css';

const socket = io();

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
    <body>
    <Login Login/>
    
    <div className="text-holder">
      <div className="about">
        <div className="sub-about">
        <div className="about-title">What is Penalty Chess?</div>
          <div className="information">
          Penalty Chess is a unique take on the timeless classic game, but is not for the average player.
          This game is designed to put you to the test, making sure that you are truly keeping up, not only with your opponent, but with yourself.
          </div>
          <div className="information">
          All the pieces in front of you are all the same. There is absolutely no way to tell the difference from a pawn to a queen, a rook to a bishop, a knight to a king.
          </div>
        </div>
        <img className="img-right" src="https://cdn.discordapp.com/attachments/836049770254172201/836049803812667442/board.PNG"/>
      </div>
      <div className="about-penalty">
        <img className="img-left" src="https://cdn.discordapp.com/attachments/836049770254172201/836101840743301130/illegal_move.png"/>
        <div className="sub-about">
        <div className="about-title">What's the Penalty?</div>
          <div className="information">
          Penalty Chess is a unique take on the timeless classic game, but is not for the average player.
          This game is designed to put you to the test, making sure that you are truly keeping up, not only with your opponent, but with yourself.
          </div>
          <div className="information">
          All the pieces in front of you are all the same. There is absolutely no way to tell the difference from a pawn to a queen, a rook to a bishop, a knight to a king.
          </div>
        </div>
      </div>
    </div>
    </body>
  );
}

export default App;
