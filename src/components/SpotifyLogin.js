// src/components/SpotifyLogin.js
import React from "react";

const SpotifyLogin = () => {
  const handleLogin = () => {
    window.location.href = "https://jamsync-backend.onrender.com/login";
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 flex items-center space-x-2"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 168 168"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="M84,0C37.6,0,0,37.6,0,84s37.6,84,84,84s84-37.6,84-84S130.4,0,84,0z M121.3,121.3
          c-2.1,3.5-6.6,4.6-10.1,2.5c-27.7-16.9-62.7-20.7-103.8-11.3c-4.1,0.9-8.3-1.8-9.2-6c-0.9-4.1,1.8-8.3,6-9.2
          c44.6-10.2,83.6-6,114.5,12.3C122.4,112.6,123.5,117.1,121.3,121.3z"
        />
      </svg>
      <span>Login with Spotify</span>
    </button>
  );
};

export default SpotifyLogin;
