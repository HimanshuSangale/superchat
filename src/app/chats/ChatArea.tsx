"use client";
import React, { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "./ChatInput"; // You can create this as shown earlier
import { Message } from "../types/Message";
import ChatBubble from "../components/ChatBubble";

const messages: Message[] = [
  {
    id: "1",
    content: "CDERT",
    name: "Roshnag Airtel",
    phone: "+91 63646 47925",
    timestamp: "09:49",
    isSender: false,
  },
  {
    id: "2",
    content: "testing",
    name: "Periskope",
    phone: "+91 99718 44008",
    email: "bharat@hashlabs.dev",
    timestamp: "09:49",
    isSender: true,
  },
];

const ChatArea: React.FC = () => {
  const [chats, setChats] = useState<Message[]>(messages);
  return (
    <div className="flex-1 flex flex-col items-center justify-start bg-gray-100 min-h-0">
      <ChatHeader />
      <div className="flex items-center justify-between w-full flex-1 bg-white border-b border-gray-200 min-h-0">
        <div className="flex-1 flex flex-col w-full h-full">
          <div className="flex-1 flex gap-2 h-full relative">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.5,
                zIndex: 0,
              }}
            />
            {/* Chat bubbles/messages will go here */}
            <div className="relative z-10 w-full flex flex-col gap-2 p-4">
              {/* Example bubble */}
              {/* <ChatBubble message="Hello!" sender="me" /> */}
              {chats.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
            </div>
          </div>
          <ChatInput onSend={setChats} />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
