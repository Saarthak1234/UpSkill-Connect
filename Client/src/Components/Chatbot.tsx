import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { ChatMessage } from '../Types';

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'AI',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(),
      isAI: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'User',
      content: newMessage,
      timestamp: new Date(),
      isAI: false,
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-600 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-black">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
            </div>
          </div>
          
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isAI
                        ? 'bg-customPurple text-gray-800'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message"
                  className="flex-1 rounded-lg bg-purple-50 border border-black focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;