"use client";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { PiClockClockwiseLight } from "react-icons/pi";
import { LuSparkles } from "react-icons/lu";
import { IoMdListBox } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";
import Avatar from "../components/Avatar";
import { BsChevronExpand } from "react-icons/bs";

type ChatInputProps = {
  onSend: (message: string) => void | Promise<void>;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col p-4 gap-5 border-t border-gray-200 bg-white">
      <div className="flex w-full items-center gap-2">
        <input
          name="message-input"
          id="message-textarea"
          placeholder="Message..."
          className="w-full focus:outline-none border-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <IoSend
          className="text-green-700 cursor-pointer"
          onClick={handleSend}
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-6 text-gray-900 text-xl">
          <FiPaperclip className="w-4 h-4 cursor-pointer" />
          <BsEmojiSmile className="w-4 h-4 cursor-pointer" />
          <AiOutlineClockCircle className="w-4 h-4 cursor-pointer" />
          <PiClockClockwiseLight className="w-5 h-5 cursor-pointer" />
          <LuSparkles className="w-4 h-4 cursor-pointer" />
          <IoMdListBox className="w-4.5 h-4.5 cursor-pointer" />
          <FaMicrophone className="w-4 h-4 cursor-pointer" />
        </div>
        <button
          className="flex items-center p-1 gap-16 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm focus:outline-none"
          type="button"
        >
          <span className="flex items-center gap-2">
            <Avatar src="/logo.png" alt="Chat" size="xxs" />
            <span className="text-gray-900 font-bold text-xs">Periskope</span>
          </span>
          <BsChevronExpand className="text-sm text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
