import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Sample } from './board';
import BlindChess from './chessboard.js';
import Chat from './chat.js';
import Stats from './Stats.js'

// https://oauth2.googleapis.com/tokeninfo?id_token={token}
const socket = io();

export function Login() {
    const [Login, setLogin] = useState(false);
    const [page, setPage] = useState(false);
    const [user, setUser] = useState([]);
    const [emailName, setEmail] = useState([]);
    const [shown, setShown] = useState(false);
    const [stats, setStats] = useState([]);
    const [messages, setMessages] = useState([]);

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
        const url = 'https://164fa2839bfc44bd9df6ce370909f882.vfs.cloud9.us-east-1.amazonaws.com'
        
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
    const [PlayerE, setPlayerE] = useState([]);
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
            
            socket.on('Emails', (Emails) => {
                console.log(Emails);
                setPlayerE(stats => Emails);
            });
            
            socket.on('Spectators', (Spectators) => {
                console.log(Spectators);
                setSpectator(stats => Spectators);
            });
            
            socket.on('chat', (data) => {
                setMessages((prevMessages) => [...prevMessages, data.new_message]);
            });
            
        }, []);
        
        
    const player1 = Player[0];
    const player2 = Player[1];
    
    const player1E = PlayerE[0];
    const player2E = PlayerE[1];

    
    const user_data = { 'Black': player1, 'White': player2, 'Spectator' : Spectator };
    
    console.log(user_data);
    console.log(player1E,player2E);
    
    console.log("Two Players: ",player1,player2); 
    var color;
    if(user == player1 && emailName == player1E ){
        color = 'White';
    }
    else if(user == player2 && emailName == player2E){
        color = 'Black';
    }
    else{
        color = 'Spectator';
    }

    return(
        <div class="login">
            <head>
                <title>Penalty chess login page</title>
                <meta name="google-signin-client_id" content="343458998580-0n44n2lqssm0s59tnobhtacdnsmjs302.apps.googleusercontent.com"/>
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
                            <h2>Login to play:</h2>
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
                    <div className="text-holder">
    
      <div className="about">
        <div className="sub-about">
        <div className="about-title" id="about">What is Penalty Chess?</div>
          <div className="information">
          Penalty Chess is a unique take on the timeless classic game, but is not for the average player.
          This game is designed to put you to the test, making sure that you are truly keeping up, not only with your opponent, but with yourself.
          </div>
          <div className="information">
          All the pieces in front of you are all the same. There is absolutely no way to tell the difference from a pawn to a queen, a rook to a bishop, a knight to a king.
          </div>
        </div>
        <img className="img-right" src="https://cdn.discordapp.com/attachments/836049770254172201/836049803812667442/board.PNG"/>
      </div>
      
      <div className="about-penalty">
        <img className="img-left" src="https://cdn.discordapp.com/attachments/836049770254172201/836101840743301130/illegal_move.png"/>
        <div className="sub-about">
        <div className="about-title" id="penalty">What's the Penalty?</div>
          <div className="information">
          Every piece looks the same, which means you have to remember where you placed each piece. If you forget and accidentally make an illegal move, you lose immediately.
          </div>
          <div className="information">
          This is a tougher and more challenging version of chess, perfect for those who are comfortable with the game and want to take it to the next level.
          </div>
        </div>
      </div>
      
      <div className="purpose">
        <div className="sub-about">
        <div className="about-title" id="special">What's so special about this version?</div>
          <div className="information">
          There are dozens of variations of chess to play online, with multiple players, different boards, and new pieces.
          Although similar to Blindfold Chess, where the players do not see or touch their pieces, this version allows players to at least see where their pieces are,
          and making an illegal move will immediately end the game.
          Due to the similarities, Penalty Chess could be used to train for Blindfold Chess, especially since you are forced to be as accurate as possible.
          It strikes a good balance between regular chess and Blindfold Chess that has yet to be fully realized.
          Players that want a new challenge, but aren't ready for Blindfold Chess will appreciate this game.
          </div>
        </div>
      </div>
    </div>
    
    <div className="footer">
      
      <div className="column-holder">
        <div className="column">
          <h2>Links:</h2>
          <div className="links">
            <a href="#top">Back to Top</a>
            <a href="#about">About</a>
            <a href="#penalty">Penalty</a>
            <a href="#special">Special</a>
          </div>
        </div>
        
        <div className="column">
          <h2>Languages used:</h2>
          <div className="links">
            <a href="https://www.javascript.com/">Javascript</a>
            <a href="https://www.python.org/">Python</a>
          </div>
          <h2>Special Thanks to:</h2>
          <div className="links">
            <a href="https://www.heroku.com/">Heroku</a>
          </div>
        </div>
        
      </div>
      
      <div className="contact">
      © Created by Mike Jeong, Joe Passalacqua, Ronak Patel, and Karel Rojas Requena
      </div>
    </div>
                </div> 
                
                )}
                
                <div class='Page2'>
                {page === false ? null : (
                    <div class="chessBoard">
            
                        <div class="google" >
                            <h1>Hello: {user}</h1>
                            <h2>Players: {player1}, {player2}</h2>
                            <h2> Spectators: {Spectator} </h2>
                        </div>
                        <div className="board" id={user}>
                            <BlindChess
                             socket={socket}
                             user_data={user_data}
                             user_name={color}
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
            </div>
        </div> 
);
}

export default Login;
