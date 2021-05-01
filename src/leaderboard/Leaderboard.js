/* eslint-disable */
import React, { useState,  useRef, useEffect } from "react";
import LeaderRow from '../LeaderRow';
import './leaderboard.css'
export function Leaderboard({username, socket}) {
    const [userlist, setUserlist] = useState([]);
    const [update, setUpdate] = useState(true);
    
    if (update){
      socket.emit('leaderboard');
      setUpdate((prevUpdate) => !prevUpdate);
    }
    
    useEffect(() => {
      socket.on("leaderboard", (data) => {
        setUserlist(data);
      });
    }, []);
  
  return (
    <div class="leaderboard">
        <div class="leaderboard-info">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Leaderboard</th>
                </tr>
              </thead>
              <tbody>
                {userlist.map((item, index) => (
                  <LeaderRow key={index} user={item[0]} score={item[1]} win={item[2]} loss={item[3]} tie={item[4]} />
                ))}
              </tbody>
            </table>
        </div>
    </div>
)}
export default Leaderboard;
