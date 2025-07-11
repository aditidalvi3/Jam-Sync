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
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection();

        // Add local tracks to peer connection
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        // Listen for remote tracks
        peerConnection.current.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        // **CRITICAL FIX:** Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              roomId,
            });
          }
        };

        // Listen for socket events
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
          } catch (e) {
            console.error("Error adding received ice candidate", e);
          }
        });

        // Only emit to connect peers, joining the room is handled by ChatRoom.js
        socket.emit("start-webrtc", roomId);
      } catch (err) {
        console.error("Failed to get local stream or init WebRTC:", err);
      }
    };

    init();

    // Cleanup function
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [roomId]);

  const toggleMute = () => {
    const audioTrack = localVideoRef.current.srcObject.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoOn;
      setVideoOn(!videoOn);
    }
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const sender = peerConnection.current.getSenders().find(s => s.track.kind === 'video');
      sender.replaceTrack(screenStream.getVideoTracks()[0]);

      screenStream.getVideoTracks()[0].onended = () => {
        const originalVideoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Share Screen
        </button>
      </div>
    </div>
  );
};

export default VideoChat;