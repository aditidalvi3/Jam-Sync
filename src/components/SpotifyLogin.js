import React from "react";

const SpotifyLogin = () => {
  const handleLogin = () => {
    // Use an environment variable for the backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://jamsync-backend.onrender.com";
    window.location.href = `${backendUrl}/login`;
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
          c-2.1,3.5-6.6,4.6-10.1,2.5c-27.7-16.9-62.7-20.7-103.8-11.3c-4.1,0.9-8.3-1.6-9.2-5.7c-0.9-4.1,1.6-8.3,5.7-9.2c27.5-6,52.8-3.1,77.5,11.9c3.9,2.3,5.1,7.2,2.8,11.1L121.3,121.3z M123.6,90.4c-2.6,4.3-8.2,5.7-12.5,3.1c-26.2-16-66.2-19.5-102.3-9.5c-4.5,1.2-9.1-1.2-10.3-5.7c-1.2-4.5,1.2-9.1,5.7-10.3c35.2-9.4,79.5-5.2,109.1,12.9C125.7,83.9,126.2,88.4,123.6,90.4L123.6,90.4z M116.8,61.9c-2.9,4.8-10.2,6.1-15,3.2c-23.7-14.5-59.5-18.4-92.4-8.8c-5.1,1.5-10.3-1.1-11.8-6.2c-1.5-5.1,1.1-10.3,6.2-11.8c34-10.2,73.6-5.8,100.8,11.4C118.9,54.8,119.6,59.3,116.8,61.9L116.8,61.9z"
        />
      </svg>
      <span>Connect with Spotify</span>
    </button>
  );
};

export default SpotifyLogin;