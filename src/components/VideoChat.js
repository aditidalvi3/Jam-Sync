import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";

const VideoChat = ({ roomId }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection();

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      socket.emit("join-room", roomId);

      socket.on("offer", async (offer) => {
        await peerConnection.current.setRemoteDescription(offer);
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", { answer, roomId });
      });

      socket.on("answer", async (answer) => {
        await peerConnection.current.setRemoteDescription(answer);
      });

      socket.on("ice-candidate", async (candidate) => {
        try {
          await peerConnection.current.addIceCandidate(candidate);
        } catch (err) {
          console.error("Error adding received ice candidate", err);
        }
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            roomId,
          });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { offer, roomId });

      // Push-to-talk
      const audioTrack = stream.getAudioTracks()[0];

      const handleKeyDown = (e) => {
        if (e.code === "Space") {
          audioTrack.enabled = true;
        }
      };

      const handleKeyUp = (e) => {
        if (e.code === "Space") {
          audioTrack.enabled = false;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    };

    init();
  }, [roomId]);

  const toggleMute = () => {
    const audioTrack = localVideoRef.current.srcObject
      ?.getAudioTracks?.()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    const videoTrack = localVideoRef.current.srcObject
      ?.getVideoTracks?.()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
    }
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const screenTrack = screenStream.getVideoTracks()[0];

      const sender = peerConnection.current
        .getSenders()
        .find((s) => s.track.kind === "video");

      sender.replaceTrack(screenTrack);

      screenTrack.onended = () => {
        const originalVideoTrack =
          localVideoRef.current.srcObject.getVideoTracks()[0];
        sender.replaceTrack(originalVideoTrack);
      };
    } catch (err) {
      console.error("Failed to share screen:", err);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center space-y-4">
      <div className="flex gap-4 justify-center">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-64 h-48 border rounded bg-black"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-64 h-48 border rounded bg-black"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={toggleMute}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={toggleVideo}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {videoOn ? "Turn Video Off" : "Turn Video On"}
        </button>

        <button
          onClick={shareScreen}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          Share Screen
        </button>
      </div>

      <p className="text-gray-500 text-sm">
        🎙️ Hold <strong>Spacebar</strong> to talk (Push-to-Talk)
      </p>
    </div>
  );
};

export default VideoChat;
