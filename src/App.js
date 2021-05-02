import io from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Login } from './login/Login';
import { Logout } from './login/Logout';
import './App.css';
import Gameroom from "./gameroom/Gameroom.js";
import Header from './components/Header.js';
import Profile from './profile/Profile.js';
import Leaderboard from './leaderboard/Leaderboard.js';
import Landing from './Landing.js';

const socket = io();

function App() {

  const [user, setUser] = useState("");
  const [emailName, setEmail] = useState("");
  
  
  useEffect(() => {
        const loggedInUser = localStorage.getItem('username');
        const loggedemail = localStorage.getItem('email');
        
        console.log("useEffect Login", loggedInUser, loggedemail);
        
        if (loggedInUser && loggedemail) {
          setUser(loggedInUser);
          setEmail(loggedemail);
          console.log("useEffect Login If", loggedInUser, loggedemail);
        }
    }, []);
  
  
  
  
  
  return (
    <BrowserRouter>
      <Header isLoggedIn={user!==""}/>
      <Switch>
        <Route path='/' exact>
          <Landing />
        </Route> 
        <Route path='/gameroom/' exact>
          <Gameroom socket={socket} user_name={emailName}/>
        </Route>
        <Route path='/leaderboard' exact>
          <Leaderboard socket={socket} user_name={user} email_name={emailName}/>
        </Route> 
        <Route path='/profile' exact>
          <Profile username={user} email={emailName} socket={socket}/>
        </Route>
        <Route path='/login' exact>
        {user === "" ? 
          <Login 
            socket={socket}
            user={user}
            setUser={setUser}
            emailName={emailName}
            setEmail={setEmail}/>
            :
            <Redirect to='/' />
        }
        </Route>
        
        <Route path='/logout' exact>
          {user !== "" ? 
            <Logout
              setUser={setUser}
              setEmail={setEmail}/>
              :
              <Redirect to='/' />
          }
        
        </Route>
        
        <Route path='/' >
          <Redirect to='/' />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}
export default App;
