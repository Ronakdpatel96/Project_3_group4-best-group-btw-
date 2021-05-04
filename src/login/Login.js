import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// https://oauth2.googleapis.com/tokeninfo?id_token={token}

export function Login({
  socket, user, setUser, emailName, setEmail,
}) {
  const [Login, setLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = user !== '' && emailName !== '';
    if (isLoggedIn) {
      setLogin(true);
    }
  }, []);

  console.log('Is the user logged in? ', Login);
  if (Login === true) {
    console.log(user);
    console.log(emailName); // User and email would be used to update the database.
    console.log('Time to change page'); // will have to link this to switchPage to try and switch the page to the next one
    setLogin(false);
  }

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.tokenId);

    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${response.tokenId}`;

    axios.get(url)
      .then((resp) => {
        const userName = resp.data.given_name;
        const emailUser = resp.data.email;

        console.log(resp.data.given_name);
        console.log('userName', userName);
        console.log(resp.data.email);
        console.log('emailUser', emailUser);

        setUser((setName) => userName);
        setEmail((setName) => emailUser);
        setLogin(true);

        localStorage.setItem('username', userName);
        localStorage.setItem('email', emailUser);

        socket.emit('login', { user: userName, email: emailUser });
      });
  };

  return (
    <div className="login">
      <meta name="google-signin-client_id" content="343458998580-0n44n2lqssm0s59tnobhtacdnsmjs302.apps.googleusercontent.com" />
      <script src="https://apis.google.com/js/platform.js" async defer />
      <div>
        <div className="google">
          <br />
          <br />
          <br />
          <GoogleLogin
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;

// socket, user, setUser, emailName, setEmail
Login.propTypes = {
  socket: PropTypes.func,
  user: PropTypes.string,
  setUser: PropTypes.func,
  emailName: PropTypes.string,
  setEmail: PropTypes.func,
};

Login.defaultProps = {
  socket: () => {},
  user: '',
  setUser: () => {},
  emailName: '',
  setEmail: () => {},
};
