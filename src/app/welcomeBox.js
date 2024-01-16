"use client";
import React, { useState } from 'react';

export default function WelcomeBox ({ onJoinChat }) {
  const [username, setUsername] = useState('');

  const handleJoinChat = () => {
    if (username.trim() !== '') {
      onJoinChat(username);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido al Chat!</h1>
      <p className="mb-4">Ingresa tu nombre para comenzar:</p>
      <input
        type="text"
        className="px-4 py-2 mb-4 rounded-lg border text-black"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-[#3F7C85] text-white rounded-lg"
        onClick={handleJoinChat}
      >
        Ingresar al Chat
      </button>
    </div>
  )
};

