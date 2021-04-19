import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import './App.css';
import { Chat } from './Chat.js';

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
    <div className="database-info-holder">
      <button type="button" onClick={showStats}> Show/Hide Stats </button>
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
        </div>
      ) : null }
      <Chat />
    </div>
  );
}

export default App;
