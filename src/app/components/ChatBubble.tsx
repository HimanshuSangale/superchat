// components/ChatBubble.tsx
"use client";

import { Message } from "../types/Message";
import { IoCheckmarkDone } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

interface Props {
  message: Message;
}

export default function ChatBubble({ message }: Props) {
  const { name, phone, content, timestamp, email, isSender } = message;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[75%] p-3 rounded-lg shadow text-sm ${
          isSender ? "bg-green-100 text-gray-800" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-start mb-1 gap-10">
          <span className="font-semibold text-sm text-green-700">{name}</span>
          <span className="text-xs text-gray-500">{phone}</span>
        </div>

        <p className="mb-2 font-semibold">{content}</p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          {isSender && email ? (
            <div className="flex items-center gap-1">
              <FaTelegramPlane className="text-blue-500" size={12} />
              <span>{email}</span>
            </div>
          ) : (
            <span></span>
          )}

          <div className="flex items-center gap-1">
            <span>{timestamp}</span>
            {isSender && (
              <IoCheckmarkDone className="text-blue-500" size={14} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
