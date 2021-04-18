import logo from './logo.svg';
import './App.css';
import { Chat } from './Chat.js';
import io from 'socket.io-client';

const socket = io();

function App() {
  
  return (
    <Chat />
  );
}

export default App;
