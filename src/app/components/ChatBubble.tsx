// components/ChatBubble.tsx
"use client";

import React, { useMemo } from "react";
import { Message, Profile } from "@/types/supabase";
import { IoCheckmarkDone } from "react-icons/io5";

interface Props {
  message: Message;
  userProfile: Profile | null;
  received: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

export default function ChatBubble({
  message,
  userProfile,
  received,
  isFirstInGroup = true,
  isLastInGroup = true,
}: Props) {
  const { content, created_at } = message;
  console.log("User Profile", userProfile);
  const formattedTime = useMemo(() => {
    const date = new Date(created_at);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [created_at]);

  // Dynamic margin based on grouping
  const marginTop = isFirstInGroup ? "mt-2" : "mt-0.5";
  const marginBottom = isLastInGroup ? "mb-2" : "mb-0.5";

  // Bubble styling based on position in group
  const getBubbleStyle = () => {
    if (received) {
      // Received messages (left side)
      if (isFirstInGroup && isLastInGroup) {
        return "rounded-lg"; // Single message
      } else if (isFirstInGroup) {
        return "rounded-lg rounded-bl-md"; // First in group
      } else if (isLastInGroup) {
        return "rounded-lg rounded-tl-md"; // Last in group
      } else {
        return "rounded-lg rounded-l-md"; // Middle of group
      }
    } else {
      // Sent messages (right side)
      if (isFirstInGroup && isLastInGroup) {
        return "rounded-lg"; // Single message
      } else if (isFirstInGroup) {
        return "rounded-lg rounded-br-md"; // First in group
      } else if (isLastInGroup) {
        return "rounded-lg rounded-tr-md"; // Last in group
      } else {
        return "rounded-lg rounded-r-md"; // Middle of group
      }
    }
  };

  return (
    <li
      className={`flex ${
        received ? "justify-start" : "justify-end"
      } ${marginTop} ${marginBottom}`}
    >
      <div className="flex items-end gap-1 max-w-[75%]">
        {received && isFirstInGroup && (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-1 flex-shrink-0">
            <span className="text-xs font-semibold text-gray-600">
              {userProfile?.full_name?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
        )}

        {/* Spacer for grouped received messages */}
        {received && !isFirstInGroup && <div className="w-8 flex-shrink-0" />}

        <div
          className={`px-3 py-2 shadow-sm text-sm relative min-w-56 ${getBubbleStyle()} ${
            received ? "bg-white text-gray-900" : "bg-green-100 text-gray-900"
          }`}
        >
          {/* Sender name - only for first message in received group */}
          {isFirstInGroup && (
            <div className="mb-1 flex justify-between">
              <span className="font-bold text-sm text-green-600">
                {userProfile?.full_name || "Unknown User"}
              </span>
              <span className="text-xs text-gray-500">
                {userProfile?.phone_number}
              </span>
            </div>
          )}

          {/* Message content */}
          <p className="leading-relaxed whitespace-pre-wrap mb-1">{content}</p>

          <div className="flex items-center gap-1 mt-1">
            {!received && (
              <span className={`text-xs text-gray-500 `}>
                {userProfile?.email}
              </span>
            )}
            <span className={`text-xs text-gray-500 ml-auto`}>
              {formattedTime}
            </span>

            {!received && (
              <IoCheckmarkDone
                className="text-blue-500"
                size={16}
                title="Delivered"
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
