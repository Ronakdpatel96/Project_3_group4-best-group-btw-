import './App.css';
import { GoogleLogin } from 'react-google-login';
import { Sample } from './board.js';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import BlindChess from './chessboard.js';
import Chat from './chat.js';
import Stats from './Stats.js'

//https://oauth2.googleapis.com/tokeninfo?id_token={token}
const socket = io();

export function Login() {
    const [Login, setLogin] = useState(false);
    const [page, setPage] = useState(false);
    const [user, setUser] = useState([]);
    const [emailName, setEmail] = useState([]);
    
    console.log("Is the user logged in? ", Login);
    if(Login == true){
        console.log(user);
        console.log(emailName);         //User and email would be used to update the database.
        console.log("Time to change page"); //will have to link this to switchPage to try and switch the page to the next one
        socket.emit('login', { user: user , email: emailName});
        socket.emit('joined', { user: user , email: emailName});
        setLogin(false);
        }
    
    //console.log("User", user);

    
    const responseGoogle = (response) => {
        //console.log(response);
       // console.log(response['tokenId']);
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + response['tokenId'];
        
        axios.get(url)
            .then(name => {
                const userName = name['data']['given_name'];
                const emailUser = name['data']['email'];
                
                console.log(name['data']['given_name']);
                console.log("userName",userName);
                
                setUser(setName => userName);
                socket.emit('user', {user:user});
                setEmail(setName => emailUser);
                
                setLogin(true);
                setPage(true);
            });
    };
    
    const [Player, setPlayer] = useState([]);
    const [Spectator, setSpectator] = useState([]);
    const [user1, setUser1] = useState([]);


  
    useEffect(() => {
            socket.on('LoginName', (LoginName) => {
              console.log('New Player was added to the game');
              console.log("current Player",LoginName);
              var userName = LoginName;
              setUser1( name => userName);
            });
            socket.on('Players', (Players) => {
                console.log("Players",Players);
                setPlayer(stats => Players);
            });
            
            socket.on('current', (current) => {
              
            });
            
            socket.on('Spectators', (Spectators) => {
                console.log(Spectators);
                setSpectator(stats => Spectators);
            });
        }, []);
        
        
    const player1 = Player[0];
    const player2 = Player[1];

    
    const user_data = { 'Black': player1, 'White': player2, Spectator : Spectator };
    
    console.log(user_data);
    
    console.log("Two Players: ",player1,player2); 

    return(
        <div class="login">
            <head>
                <title>Penalty chess login page</title>
                <meta name="google-signin-client_id" content="343458998580-0n44n2lqssm0s59tnobhtacdnsmjs302.apps.googleusercontent.com"/>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </head>
            <body>
                <div class="loggedIn">
                    <h4>{user}</h4>
                    <h4>{emailName}</h4>
                </div>
                
                {page == true ? null : (
                <div class='Page1'>
                <h1 class="title">Penalty Chess</h1>
                
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
                    </div>
                </div> )}
                
                <div class='Page2'>
                {page === false ? null : (
                    <div class="chessBoard">
            
                        <div class="google" >
                            <h1>Hello: {user}</h1>
                            <h2>Players: {player1}, {player2}</h2>
                            <h2> Spectators: {Spectator} </h2>
                        </div>
                        <div className="board">
                            <BlindChess
                             socket={socket}
                             user_data={user_data}
                             user_name={user}
                             />
                        </div>
                        <div className="chat" >
                            <Chat className="chat"/>
                        </div>
                        
                        <div className="Stats">
                            <Stats className="Stats"/>
                        </div>
                        
                    </div> )}
                
                </div>
            </body>
        </div> 
);
}

export default Login;
