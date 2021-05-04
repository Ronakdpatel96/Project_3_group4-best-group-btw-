import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.css';

function Header({ isLoggedIn }) {
  return (
    <>
      <h1>
        <Link to="/">Penalty Chess</Link>
      </h1>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        { isLoggedIn
          ? (
            <>
              <li>
                <Link to="/gameroom">Game Room</Link>
              </li>
              <li>
                <Link to="/leaderboard">LeaderBoard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </>
          )
          : <li><Link to="/login">Log In</Link></li> }
      </ul>
    </>
  );
}

export default Header;

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};
