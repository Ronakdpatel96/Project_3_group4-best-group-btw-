import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

//https://oauth2.googleapis.com/tokeninfo?id_token={token}

export function Login() {
    
    const responseGoogle = (response) => {
        console.log(response['tokenId']);
        
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + response['tokenId'];
        
        axios.get(url)
            .then(response => { console.log(response['data']['given_name']) });
            
        axios.get(url)
            .then(response => { console.log(response['data']['email']) });

    }
    
    return(
        <div class="login">
            <head>
                <title>Penalty chess login page</title>
                <meta name="google-signin-client_id" content="343458998580-grsva1siatfujrucu7b75hug4hocopsg.apps.googleusercontent.com"/>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </head>
            
            <body>
                <h1 class="title">Penalty Chess</h1>
                
                <br/>
                <br/>
                <br/>
            
                <div class="box">
                    <div class="google">
                
                    <h4>User login:</h4>
                    
                            <br/>
                            <GoogleLogin
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>
                    </div>
            </body>
        </div>
);
}

export default Login;