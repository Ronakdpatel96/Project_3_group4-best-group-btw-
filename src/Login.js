import './App.css';
import { GoogleLogin } from 'react-google-login';
import { Sample } from './board.js';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//https://oauth2.googleapis.com/tokeninfo?id_token={token}

export function Login() {
    const [Login, setLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [emailName, setEmail] = useState([]);
    
    
    
    console.log("Is the user logged in? ",Login);
    if(Login == true){
        console.log(user);
        console.log(emailName);         //User and email would be used to update the database.
        console.log("Time to change page"); //will have to link this to switchPage to try and switch the page to the next one
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
            <body>
                <div class="loggedIn">
                    <h4>{user}</h4>
                    <h4>{emailName}</h4>
                </div>
                
                {Login == true ? null : (
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
                {Login === false ? null : (
                    <div>
                        <Sample Sample/>
                    </div> )}
                
                </div>
            </body>
        </div> 
);
}

export default Login;