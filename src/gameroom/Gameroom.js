import React, { useState, useEffect } from 'react';
import BlindChess from './chessboard.js';
/* eslint-disable */
export function Gameroom({socket, user_name}) {
    
    
    const [ join, setJoin ] = useState(false);
    const [ user_data, setUserData ] = useState([]);
    
    useEffect( () => {
        socket.on("on_join", (data) => {
            console.log("on_join mount ", data);
            setUserData(data);
        });
    }
    , [] );
    
    useEffect ( () => {
        socket.on("on_join", (data) => {
            console.log("on_join mount ", data);
            setUserData(data);
        });
    }, [user_data]);
    
    
    function onClickJoin () {
        setJoin((prev) => !prev);
        console.log("on click join " , user_name);   
        
        
        if (!user_data.includes(user_name)) {
            user_data.push(user_name);
        }
        
        const new_user_data = user_data;
        setUserData(new_user_data);
        socket.emit('on_join', new_user_data);
    }
    
    function gameStart() {
        if (!join) {
            return <button onClick={() => onClickJoin()}> Click to Join </button>;
        }
        
        if (user_data.length < 2) {
            return <h2>Waiting for other user to join</h2>;
        }
        
        const prop_data = {White: user_data[0], Black: user_data[1], Spectator: user_data.slice(2)}
        
        return <BlindChess socket={socket} user_name={user_name} user_data={prop_data}/>;
    }
    
    
    return (
    <div>
      {gameStart()}  
    </div>
    );
}
export default Gameroom;