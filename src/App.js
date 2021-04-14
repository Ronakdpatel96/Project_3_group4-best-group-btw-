import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io();

function App() {
  const [shown, setShown] = useState(false);
  
  function showStats() {
    setShown((prevShown) => !prevShown);
  }
  
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
