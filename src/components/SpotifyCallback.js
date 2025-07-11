import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("No access token provided in URL");
      return;
    }

    // Fetch Spotify user profile using a correct API endpoint
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Spotify API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        localStorage.setItem("spotify_access_token", accessToken);
        // Navigate immediately after success
        navigate("/");
      })
      .catch((err) => {
        console.error("Error fetching Spotify profile:", err);
        setError("Failed to fetch Spotify profile. Please try again.");
      });
  }, [accessToken, navigate]);

  if (error) {
    return <p className="text-center mt-10 text-red-400">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-white">Fetching your Spotify profile...</p>;
  }

  // This part of the code will no longer be reached due to immediate navigation
  return (
    <div className="max-w-lg mx-auto mt-20 text-white text-center space-y-4">
      <h1 className="text-2xl font-bold text-[#1DB954]">🎧 Welcome, {profile.display_name}!</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default SpotifyCallback;