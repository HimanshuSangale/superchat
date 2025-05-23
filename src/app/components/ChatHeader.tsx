import React from "react";
import Avatar from "./Avatar";
import { IoSearch } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

const ChatHeader = () => {
  return (
    // Header component for the chat application
    <div className="flex w-full items-center justify-between p-2 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Avatar src="/logo.png" alt="Chat" size="md" />
        <div className="flex flex-col w-full">
          <h3 className="text-base font-bold text-gray-900">Chat Header</h3>
          <p className="text-sm font-base text-gray-400">
            Rohan, Rohan, Rohan, Rohan, Rohan{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center -space-x-1">
          <Avatar src="/logo.png" alt="Chat" size="xs" />
          <Avatar src="/logo.png" alt="Chat" size="xs" />
          <Avatar src="/logo.png" alt="Chat" size="xs" />
          <Avatar src="/logo.png" alt="Chat" size="xs" />
          <Avatar src="/logo.png" alt="Chat" size="xs" />
          <Avatar src="/logo.png" alt="Chat" size="xs" />
        </div>

        <button
          className="flex items-center justify-center w-8 h-8 p-2 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none"
          type="button"
        >
          <BsStars />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 p-2 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none"
          type="button"
        >
          <IoSearch />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
