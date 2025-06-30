// File: src/components/SpotifyCallback.js
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) return;

    // Fetch Spotify user profile using access token
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);

        // Optionally: store access token for later use
        localStorage.setItem("spotify_access_token", accessToken);

        // Auto-navigate to home after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [accessToken, navigate]);

  if (!accessToken) {
    return <p className="text-center mt-10 text-red-400">No access token provided in URL</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-white">Fetching your Spotify profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-20 text-white text-center space-y-4">
      <h1 className="text-2xl font-bold text-[#1DB954]">🎧 Welcome, {profile.display_name}!</h1>
      <p>Email: {profile.email}</p>
      <p>Country: {profile.country}</p>
      <img
        src={profile.images?.[0]?.url}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto shadow-lg"
      />
      <p className="text-gray-400">Redirecting to JamSync...</p>
    </div>
  );
};

export default SpotifyCallback;
