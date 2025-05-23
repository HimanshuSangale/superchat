"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Chat from "../components/Chat";
import ChatHeader from "../components/ChatHeader";
import ChatIntegration from "../components/ChatIntegrations";
import { RiFolderDownloadFill } from "react-icons/ri";
import { IoSearch, IoSend, IoFilterSharp } from "react-icons/io5";
import { getAllProfiles } from "@/api/profile";

import ChatArea from "./ChatArea"; // <-- New component
import ChatList from "./ChatList";
import { Profile } from "@/types/supabase";
import AuthRedirect from "@/Hooks/AuthRedirect";

const Chats = () => {
  const [activeChat, setActiveChat] = useState<string>("");
  const [chats, setChats] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // AuthRedirect();
    // Simulate fetching data from an API
    const fetchChats = async () => {
      // Replace this with your actual data fetching logic
      const response = await getAllProfiles();
      setChats(response);
      setActiveChat(response[0]?.id || ""); // Set the first chat as active
      setLoading(false);
    };

    fetchChats();
  }, []);

  console.log("active chat", activeChat);
  return (
    <div className="w-full flex">
      <AuthRedirect />
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex w-full h-[calc(100vh-3.5rem)]">
          {/* Chat List Sidebar */}
          <div className="h-full flex flex-col w-3/12 border-r border-gray-200">
            <div className="flex gap-2 items-center justify-between p-2 bg-white border-b border-gray-200">
              <button className="flex gap-2 items-center px-2 py-1 border-none rounded text-sm text-green-700 font-bold focus:outline-none">
                <RiFolderDownloadFill className="text-base" />
                <span>Custom Filter</span>
              </button>
              <button className="flex gap-2 items-center px-4 py-1 mr-auto border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm text-gray-700 font-bold focus:outline-none">
                <span>Save</span>
              </button>
              <button className="flex gap-2 items-center px-4 py-1 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm text-gray-700 font-bold focus:outline-none">
                <IoSearch />
                <span>Search</span>
              </button>
              <button className="flex gap-2 items-center px-4 py-1 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm text-green-700 font-bold focus:outline-none">
                <IoFilterSharp />
                <span>Filter</span>
              </button>
            </div>
            <ChatList
              setActiveChat={setActiveChat}
              activeChat={activeChat}
              chats={chats}
            />
          </div>
          {/* Main Chat Area */}
          {activeChat ? (
            <>
              <ChatArea activeChat={activeChat} />
              <ChatIntegration />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chats;
