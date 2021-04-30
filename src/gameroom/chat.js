import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); 

export default function Chat() {
    
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    
    function onClickButton() {
        if (inputRef != null) {
            const message = inputRef.current.value;
            inputRef.current.value = "";
            setMessages((prevMessages) => [...prevMessages, message]);
            socket.emit('chat', { new_message : message });
        }
    }
    
    useEffect(() => {
        socket.on('chat', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.new_message]);
        });
    }, []);
    
    return(
        <div class="chatting">
            <input ref={inputRef} type="text" />
                <button type="button" onClick={onClickButton}>
                    Send Message
                </button>
            <ul>
                {messages.map((item,index) => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
    
}