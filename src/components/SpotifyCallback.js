import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Removed profile state as it's not needed here

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token"); // Get refresh token too
  const expiresIn = searchParams.get("expires_in"); // Get expires_in too

  useEffect(() => {
    if (!accessToken) {
      setError("No access token provided in URL after Spotify login.");
      return;
    }

    // Store tokens in localStorage
    localStorage.setItem("spotify_access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("spotify_refresh_token", refreshToken);
    }
    if (expiresIn) {
      // Store expiration time (e.g., current time + expiresIn seconds)
      const expirationTime = new Date().getTime() + parseInt(expiresIn) * 1000;
      localStorage.setItem("spotify_token_expires_at", expirationTime);
    }

    // Navigate to the home page or dashboard after successfully getting tokens
    navigate("/");

  }, [accessToken, refreshToken, expiresIn, navigate]); // Added dependencies

  if (error) {
    return <p className="text-center mt-10 text-red-400">{error}</p>;
  }

  // Display a loading message while processing the callback
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white">
      <p className="text-center text-xl">Processing Spotify login...</p>
      <p className="text-center text-sm text-gray-400">Please wait, redirecting you.</p>
    </div>
  );
};

export default SpotifyCallback;