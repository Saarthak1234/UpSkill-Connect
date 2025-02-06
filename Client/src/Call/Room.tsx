import { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "./SocketProvider";
import { Socket } from "socket.io-client";
import { Video, Phone, PhoneOff, Send, Users } from 'lucide-react';

interface UserJoinedData {
  email: string;
  id: string;
}

interface CallData {
  from: string;
  offer: RTCSessionDescriptionInit;
}

interface AnswerData {
  from: string;
  ans: RTCSessionDescriptionInit;
}

interface NegotiationData {
  from: string;
  offer: RTCSessionDescriptionInit;
}

interface NegotiationFinalData {
  ans: RTCSessionDescriptionInit;
}

const RoomPage: React.FC = () => {
  const socket: Socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const handleUserJoined = useCallback(({ email, id }: UserJoinedData) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    if (!remoteSocketId) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  
  const sendStreams = useCallback(() => {
    if (!myStream) return;
    for (const track of myStream.getTracks()) {
      peer.getPeerInstance().addTrack(track, myStream);
    }
  }, [myStream]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }: CallData) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
  
      // Ensure tracks are sent after the answer
      sendStreams();
    },
    [socket, sendStreams]
  );
  


  const handleCallAccepted = useCallback(
    ({ ans }: AnswerData) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams(); // Automatically send tracks
    },
    [sendStreams]
  );
  
  const handleNegoNeeded = useCallback(async () => {
    if (!remoteSocketId) return;
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.getPeerInstance().addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.getPeerInstance().removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }: NegotiationData) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: NegotiationFinalData) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.getPeerInstance().addEventListener("track", async (ev) => {
      const [stream] = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(stream);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-indigo-400" />
              <h1 className="text-xl font-bold">Video Room</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <span className={`text-sm ${remoteSocketId ? 'text-green-400' : 'text-yellow-400'}`}>
                {remoteSocketId ? "Connected" : "Waiting for peer..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* My Stream */}
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">Your Camera</h2>
            </div>
            <div className="aspect-video bg-slate-900 relative">
              {myStream ? (
                <ReactPlayer
                  playing
                  muted
                  width="100%"
                  height="100%"
                  url={myStream}
                  className="absolute top-0 left-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Video className="h-16 w-16 text-slate-700" />
                </div>
              )}
            </div>
          </div>

          {/* Remote Stream */}
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold">Remote Camera</h2>
            </div>
            <div className="aspect-video bg-slate-900 relative">
              {remoteStream ? (
                <ReactPlayer
                  playing
                  muted
                  width="100%"
                  height="100%"
                  url={remoteStream}
                  className="absolute top-0 left-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Users className="h-16 w-16 text-slate-700" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {remoteSocketId && !myStream && (
            <button
              onClick={handleCallUser}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Start Call</span>
            </button>
          )}
          
          {myStream && !remoteStream && (
            <button
              onClick={sendStreams}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Send Stream</span>
            </button>
          )}

          {myStream && (
            <button
              onClick={() => {
                myStream.getTracks().forEach(track => track.stop());
                setMyStream(null);
              }}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 space-x-2"
            >
              <PhoneOff className="h-5 w-5" />
              <span>End Call</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;