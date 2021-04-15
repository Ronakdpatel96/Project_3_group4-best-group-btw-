import './App.css';
import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}

export function Login() {
    return(
        <div class="login">
            <head>
                <title>Penalty chess login page</title>
                <meta name="google-signin-client_id" content="343458998580-grsva1siatfujrucu7b75hug4hocopsg.apps.googleusercontent.com"/>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </head>
            
            <body>
            
                <h1 class="title">Penalty Chess</h1>
            
                <div class="box">
                    <div class="google">
                
                    <h4>User login:</h4>
                    
                <br/>
                <br/>
                
                        <form id="login-form">
                            <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Username"/>
                            
                            <br/>
                            <br/>
                            
                            <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password"/>
                                
                            <br/>
                            <br/>
                                
                            <input type="submit" value="Login" id="login-form-submit"/>
                            <input type="submit" value="Create Account" />
                        </form>
                            
                            <br/>
                            
                            <GoogleLogin
                            buttonText="Login"
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