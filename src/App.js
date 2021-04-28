import io from 'socket.io-client';
import { Login } from './Login';


const socket = io();

function App() {


  return (
    <body>
    <Login Login/>
    </body>
  );
}

export default App;
