"use client";
import Chat from "@/components/Chat";
import { Profile } from "@/types/supabase";
import React, { useState } from "react";

type ChatListProps = {
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
  activeChat: string;
  chats: Profile[];
};

const ChatList: React.FC<ChatListProps> = ({
  setActiveChat,
  activeChat,
  chats,
}) => {
  return (
    <ul className="h-full flex flex-col w-full overflow-y-auto no-scrollbar">
      {chats.map((chat) => (
        <Chat
          key={chat.id}
          title={chat.full_name}
          description={"Click to chat with " + chat.full_name}
          onClick={() => setActiveChat(chat.id)}
          isActive={activeChat === chat.id}
        />
      ))}
    </ul>
  );
};

export default ChatList;
