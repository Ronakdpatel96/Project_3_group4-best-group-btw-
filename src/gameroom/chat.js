import React, { useState, useRef, useEffect } from 'react';




export default function Chat({socket, user_name}) {
    
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    
    function onClickButton() {
        //console.log("inputRef", inputRef.current.value === "" );
        if (inputRef.current.value === null || inputRef.current.value === "") {
            return;
        }
        
        const message = inputRef.current.value;
        inputRef.current.value = "";
        const time = new Date();
        const currentTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        
        const newMessage = user_name + "  :  " + message + "  /  " + currentTime;
        
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        socket.emit('chat', { new_message : newMessage });
    
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