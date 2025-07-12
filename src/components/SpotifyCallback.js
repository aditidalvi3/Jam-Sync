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

    // FIXED: The fetch URL has been corrected to the official Spotify API endpoint
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

  // The rest of the code is unreachable due to the navigate call, but is left for context
  return (
    <p className="text-center mt-10 text-white">Fetching your Spotify profile...</p>
  );
};

export default SpotifyCallback;