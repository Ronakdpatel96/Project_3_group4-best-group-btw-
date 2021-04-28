import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Sample } from './board';
import BlindChess from './chessboard.js';
import Chat from './chat.js';

// https://oauth2.googleapis.com/tokeninfo?id_token={token}
const socket = io();

export function Login() {
    const [Login, setLogin] = useState(false);
    const [page, setPage] = useState(false);
    const [user, setUser] = useState([]);
    const [emailName, setEmail] = useState([]);
    const [shown, setShown] = useState(false);
    const [stats, setStats] = useState([]);
    
    function showStats() {
    setShown((prevShown) => !prevShown);
    }
    
    
    console.log("Is the user logged in? ",Login);
    if(Login == true){
        console.log(user);
        console.log(emailName);         //User and email would be used to update the database.
        console.log("Time to change page"); //will have to link this to switchPage to try and switch the page to the next one
        socket.emit('login', { user: user , email: emailName});
        setLogin(false);
        }
        
    
    const responseGoogle = (response) => {
        console.log(response);
        console.log(response['tokenId']);
        
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + response['tokenId'];
        
        axios.get(url)
            .then(name => { 
                const userName = name['data']['given_name'];
                
                
                console.log(name['data']['given_name']);
                console.log("userName",userName);
                setUser(setName => userName);
            });
            
            
        axios.get(url)
            .then(email => {
                const emailUser = email['data']['email'];
                console.log(email['data']['email']);
                console.log("emailUser",emailUser);
                setEmail(setName => emailUser);
                setLogin(true);
                setPage(true);
            });
            
        //Need to change the webpage to the next page once logged in
        };
    
    
    return(
        <div class="login">
            <head>
                <title>Penalty chess login page</title>
                <meta name="google-signin-client_id" content="343458998580-grsva1siatfujrucu7b75hug4hocopsg.apps.googleusercontent.com"/>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </head>
            <div class="header">
                <div class="loggedIn">
                    <h4>{user}</h4>
                    <h4>{emailName}</h4>
                </div>
                
                {page == true ? null : (
                <div class='Page1'>
                    <h1 class="title" id="top">Penalty Chess</h1>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <div class="google">
                            <h3>Login to play:</h3>
                            <br/>
                            <GoogleLogin
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div> 
                
                )}
                
                <div class='Page2'>
                {page === false ? null : (
                    <div class="chessBoard">
                        <div className="board">
                            <BlindChess/>
                        </div>
                        <div className="chat">
                            <Chat className="chat"/>
                        </div>
                        <div className="database-info-holder">
                        <button class="stats" type="button" onClick={showStats}> Show/Hide Stats </button>
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
                    </div> )}
                
                </div>
            </div>
        </div> 
);
}

export default Login;
