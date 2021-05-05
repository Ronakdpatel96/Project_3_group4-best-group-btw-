import React from 'react';
import PropTypes from 'prop-types';
// https://oauth2.googleapis.com/tokeninfo?id_token={token}
export function Logout({ setUser, setEmail }) {
  const handleLogout = () => {
    setUser('');
    setEmail('');
    localStorage.clear();
  };

  return (
    <div className="login">
      <h2>Click to log out</h2>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;

Logout.propTypes = {
  setUser: PropTypes.func,
  setEmail: PropTypes.func,
};

Logout.defaultProps = {
  setUser: () => {},
  setEmail: () => {},
};
