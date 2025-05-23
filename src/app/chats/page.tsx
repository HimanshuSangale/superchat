import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Chat from "../components/Chat";
import ChatHeader from "../components/ChatHeader";
import ChatIntegration from "../components/ChatIntegrations";
import { RiFolderDownloadFill } from "react-icons/ri";
import { IoSearch, IoSend, IoFilterSharp } from "react-icons/io5";

import ChatArea from "./ChatArea"; // <-- New component

const mockChats = Array.from({ length: 200 }, (_, index) => ({
  id: index,
  title: `Chat ${index + 1}`,
  description: `This is chat ${index + 1}`,
}));

const Chats = () => {
  return (
    <div className="w-full flex">
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
            <ul className="h-full flex flex-col w-full overflow-y-auto no-scrollbar">
              {mockChats.map((chat) => (
                <Chat
                  key={chat.id}
                  title={chat.title}
                  description={chat.description}
                />
              ))}
            </ul>
          </div>
          {/* Main Chat Area */}
          <ChatArea />
          <ChatIntegration />
        </div>
      </main>
    </div>
  );
};

export default Chats;
