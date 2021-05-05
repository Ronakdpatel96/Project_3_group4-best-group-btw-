import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import LeaderRow from '../LeaderRow';
import './leaderboard.css';

export function Leaderboard({ userName, emailName, socket }) {
  const [userlist, setUserlist] = useState([]);
  const [update, setUpdate] = useState(true);

  if (update) {
    socket.emit('leaderboard');
    setUpdate((prevUpdate) => !prevUpdate);
  }

  useEffect(() => {
    socket.on('leaderboard', (data) => {
      setUserlist(data);
    });
  }, []);

  return (
    <table>
      <thead>
        <th colSpan="5">Leaderboard</th>
      </thead>
      <thead>
        <tr>
          <th colSpan="1">Name</th>
          <th colSpan="1">Points/Rank</th>
          <th colSpan="1">Win</th>
          <th colSpan="1">Loss</th>
          <th colSpan="1">Tie</th>
        </tr>
      </thead>
      <tbody>
        {userlist.map((item, index) => (
          <LeaderRow
            key={index}
            user={item[0]}
            score={item[1]}
            win={item[2]}
            loss={item[3]}
            tie={item[4]}
          />
        ))}
      </tbody>
    </table>
  );
}
export default Leaderboard;

Leaderboard.propTypes = {
  socket: PropTypes.func,
  userName: PropTypes.string,
  emailName: PropTypes.string,
};

Leaderboard.defaultProps = {
  socket: () => {},
  userName: '',
  emailName: '',
};
