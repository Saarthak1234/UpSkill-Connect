import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useSocket } from "./SocketProvider";
import { Video, Users } from 'lucide-react';

interface RoomJoinData {
  email: string;
  room: string;
}

const LobbyScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const socket: Socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email && room) {
        socket.emit("room:join", { email, room });
      }
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data: RoomJoinData) => {
      navigate(`/room/${data.room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section with Form */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/7129052/pexels-photo-7129052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-200 mb-6">
              Join Your Session
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with your mentor in a secure video meeting room
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-8">
              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="room" className="block text-sm font-medium text-gray-200 mb-2">
                    Room Code
                  </label>
                  <input
                    type="text"
                    id="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter room code"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Join Room
                </button>
              </form>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <Video className="h-8 w-8 text-indigo-400" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">HD Video Calls</h3>
                <p className="text-gray-300">Crystal clear video communication</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <Users className="h-8 w-8 text-indigo-400" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Secure Rooms</h3>
                <p className="text-gray-300">Private and encrypted sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;