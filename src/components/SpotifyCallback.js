import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const expiresIn = searchParams.get("expires_in");

    if (!accessToken) {
      setError("No access token provided in URL after Spotify login.");
      return;
    }

    // Store tokens securely in localStorage
    localStorage.setItem("spotify_access_token", accessToken);

    if (refreshToken) {
      localStorage.setItem("spotify_refresh_token", refreshToken);
    }

    if (expiresIn) {
      const expirationTime = Date.now() + parseInt(expiresIn) * 1000;
      localStorage.setItem("spotify_token_expires_at", expirationTime.toString());
    }

    // Redirect user to app homepage
    navigate("/");
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-red-400">
        <p className="text-xl font-semibold mb-2">Error Logging In</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white">
      <p className="text-xl font-semibold">Processing Spotify login...</p>
      <p className="text-sm text-gray-400 mt-2">Please wait, redirecting you.</p>
    </div>
  );
};

export default SpotifyCallback;
