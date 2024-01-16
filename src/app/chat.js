"use client";
import Message from "./message"
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// const  socketRef.current = io('http://127.0.0.1:8000', {
//             path: '/socketRef.currents',
//             auth: { username: username },
//         });


export default function Chat({ username }) {
    
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const socket = useRef(null);
    
    useEffect(() => {

        socket.current = io('http://127.0.0.1:8000', {
            path: '/sockets',
            auth: { username: username },
        });

        const handleConnect = () => {
          setIsConnected(true);
        };
    
        const handleDisconnect = () => {
          setIsConnected(false);
        };
    
        const handleJoin = (data) => {
          setMessages((prevMessages) => [...prevMessages, { ...data, type: 'join' }]);
        };

        const handleLeave = (data) => {
            setMessages((prevMessages) => [...prevMessages, { ...data, type: 'leave' }]);
          };

        const handleChat = (data) => {
            setMessages((prevMessages) => [...prevMessages, { ...data, type: 'chat' }]);
        }
    
    
        // Agrega event listeners
        socket.current.on('connect', handleConnect);
        socket.current.on('disconnect', handleDisconnect);
        socket.current.on('join', handleJoin);
        socket.current.on('leave', handleLeave);
        socket.current.on('chat', handleChat);
    
        // Limpieza de event listeners al desmontar el componente
        return () => {
            socket.current.off('connect', handleConnect);
            socket.current.off('disconnect', handleDisconnect);
            socket.current.off('join', handleJoin);
            socket.current.off('leave', handleLeave)
            socket.current.off('chat', handleChat);
        };
      }, [username]);      

    return (
        <div className="flex flex-col h-[800px] w-[800px] rounded-2xl overflow-auto bg-[#3F7C85]">
            <div className="px-8 py-4 bg-[#00CCBF]">
                <h1 className=" text-xl font-bold text-center">socketIO Chat App</h1>
                <div className="flex justify-between mt-4 font-semibold">
                    <h2>
                        Status: <span className={`${isConnected ? 'text-green-700' : 'text-red-500'}`}>{isConnected ? 'connected' : 'disconnected'}</span>
                    </h2>
                    <h2>User: {username}</h2>
                </div>
            </div>
            <div className="flex flex-col flex-1 px-8 py-4 overflow-y-scroll">
                { 
                    messages.map((message, index) => {
                        return <Message key={index} message={message} />
                    })    
                }
            </div>
            <div className="flex justify-between px-8 py-4 bg-[#00CCBF]">
                <input 
                    type="text" id="message" 
                    className="flex-1 px-4 py-2 mr-4 rounded-lg bg-[#F2F2F2] text-[#3F7C85] focus-visible:ring-blue-500 focus-visible:border-blue-500"  
                    onChange={(event) => {
                        setMessage(event.target.value.trim())
                }}/>
                <button 
                    onClick={() => {
                        if (message && message.length > 0) {
                            socket.current.emit('chat', message, username)
                            setMessage('')
                        }
                        let messageBox = document.getElementById('message')
                        messageBox.value = ''
                    }} 
                    className="px-4 py-2 rounded-lg bg-[#3F7C85]">
                        Send
                </button>
            </div>
        </div>
    )
  }