import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BlindChess from './chessboard';

export function Gameroom({ socket, userName }) {
  const [join, setJoin] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    socket.on('on_join', (data) => {
      console.log('on_join mount ', data);
      setUserData(data);
    });
  },
  []);

  useEffect(() => {
    socket.on('on_join', (data) => {
      console.log('on_join mount ', data);
      setUserData(data);
    });
  }, [userData]);

  function onClickJoin() {
    setJoin((prev) => !prev);
    console.log('on click join ', userName);

    if (!userData.includes(userName)) {
      userData.push(userName);
    }

    const newUserData = userData;
    setUserData(newUserData);
    socket.emit('on_join', newUserData);
  }

  function gameStart() {
    if (!join) {
      return <button type="button" onClick={() => onClickJoin()} className="join"> Click to Join </button>;
    }

    if (userData.length < 2) {
      return <h2>Waiting for other user to join</h2>;
    }

    const propData = { White: userData[0], Black: userData[1], Spectator: userData.slice(2) };
    // <Redirect to = {"/game/" + this.state.gameId}><button className="btn btn-success"
    // style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>
    // Start Game</button></Redirect>
    return <BlindChess socket={socket} userName={userName} userData={propData} />;
  }

  return (
    <div>
      {gameStart()}
    </div>
  );
}
export default Gameroom;

Gameroom.propTypes = {
  socket: PropTypes.func,
  userName: PropTypes.string,
};

Gameroom.defaultProps = {
  socket: () => {},
  userName: '',
};
