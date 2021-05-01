import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header.js';

// https://oauth2.googleapis.com/tokeninfo?id_token={token}

export function Login({ socket, user, setUser, emailName, setEmail }) {
    const [Login, setLogin] = useState(false);
    const [page, setPage] = useState(false);

    
    useEffect(() => {
        
        const is_logged_in = user !== "" && emailName !== "";
        if (is_logged_in) {
          setLogin(true);
          setPage(true);
        }
    }, []);
    
    console.log("Is the user logged in? ",Login);
    if(Login == true){
        console.log(user);
        console.log(emailName);         //User and email would be used to update the database.
        console.log("Time to change page"); //will have to link this to switchPage to try and switch the page to the next one
        setLogin(false);
    }
        
    
    const responseGoogle = (response) => {
        console.log(response);
        console.log(response['tokenId']);
        
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + response['tokenId'];

        axios.get(url)
            .then(resp => {
                const userName = resp['data']['given_name'];
                const emailUser = resp['data']['email'];
                
                console.log(resp['data']['given_name']);
                console.log("userName",userName);
                console.log(resp['data']['email']);
                console.log("emailUser",emailUser);
                
                setUser(setName => userName);
                setEmail(setName => emailUser);
                setLogin(true);
                setPage(true);
                
                socket.emit('login', { user: userName , email: emailUser});
            });
            
        //Need to change the webpage to the next page once logged in
        
        
        
        };
    

    
    return(
        <div class="login">
            <meta name="google-signin-client_id" content="343458998580-0n44n2lqssm0s59tnobhtacdnsmjs302.apps.googleusercontent.com"/>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
            <div>
                <div class="google">
                        <br/><br/><br/>
                        <GoogleLogin
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <br/>
                        <br/>
                        <br/><br/><br/>
                </div>
            </div>
        </div> 
    );
}

export default Login;
