"use client";
import Chat from './chat'
import WelcomeBox from './welcomeBox';
import React, { useState } from 'react';

export default function Home() {
  const [hasJoined, setHasJoined] = useState(false);
  const [user, setUser] = useState('')
  const handleJoinChat = (username) => {
    setUser(username);
    setHasJoined(true);
  };

  return (
    <main className="grid place-content-center min-h-screen w-full">
      {hasJoined ? (<Chat username={user} />) : (<WelcomeBox onJoinChat={handleJoinChat}/>)}
    </main>
  )
}
