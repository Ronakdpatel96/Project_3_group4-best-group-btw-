import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function Profile({ socket, username, emailName }) {
  const [shown, setShown] = useState(false);
  const [stats, setStats] = useState([]);

  function showStats() {
    if (!shown) {
      const data = { user: username, email: emailName };
      console.log('showStats', data);
      socket.emit('profile', data);
    }

    setShown((prevShown) => !prevShown);
  }

  useEffect(() => {
    socket.on('profile', (statsInfo) => {
      console.log('Profile event received!');
      console.log(statsInfo);
      setStats(statsInfo);
    });
    // console.log("Useeffect run in Profile");
  }, [shown]);

  return (
    <div>
      <div className="database-info-holder">
        <button className="stats" type="button" onClick={showStats}> Show/Hide Stats </button>
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
            <br />
            {stats[6]}
          </div>
        ) : null }
      </div>
    </div>
  );
}

export default Profile;

Profile.propTypes = {
  socket: PropTypes.func,
  username: PropTypes.string,
  emailName: PropTypes.string,
};

Profile.defaultProps = {
  socket: () => {},
  username: '',
  emailName: '',
};
