import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import './App.css';

const socket = io();

function App() {
  const [shown, setShown] = useState(false);
  
  function showStats() {
    console.log("Clicked stats button!");
    setShown((prevShown) => !prevShown);
    socket.emit('statistics');
  }
  
  useEffect(() => {
    socket.on('statistics', (data) => {
      console.log('Statistics event received!');
      console.log(data);
    });
  }, []);
  
  return (
    <div className="database-info-holder">
      <button type="button" onClick={showStats}>
            Show/Hide Stats
      </button>
      { shown === true ? (
        <div className="database-info">
          TEST!
        </div>
      ) : null }
    </div>
  );
}

export default App;
