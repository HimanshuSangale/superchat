"use client";
import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "./ChatInput"; // You can create this as shown earlier
import ChatBubble from "../components/ChatBubble";
import { getMessages, sendMessage } from "@/api/message";
import { Message } from "@/types/supabase";
import { getOrCreateChatId } from "@/api/chat";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type ChatAreaProps = {
  activeChat: string;
};

const ChatArea: React.FC<ChatAreaProps> = ({ activeChat }) => {
  const [chats, setChats] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchChat = async () => {
      const currentUserId = await supabase.auth.getUser();
      if (!currentUserId.data.user) {
        router.push("/login");
        return;
      }
      const chatId = await getOrCreateChatId(
        currentUserId.data.user.id,
        activeChat
      );
      if (!chatId) {
        console.error("No chat found");
        return;
      }
      setChatId(chatId);
      const messages = await getMessages(chatId);
      setChats(messages);
    };
    fetchChat();
  }, [activeChat]);

  useEffect(() => {
    if (!chatId) return;

    // Subscribe to new messages in this chat
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setChats((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    // Cleanup on unmount or chatId change
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const handleSendMessage = async (message: string) => {
    const currentUserId = await supabase.auth.getUser();
    if (!currentUserId.data.user) {
      router.push("/login");
      return;
    }
    const { error } = await sendMessage({
      chat_id: chatId,
      sender_id: currentUserId.data.user.id,
      content: message,
    });
    if (error) {
      console.error("Error sending message:", error);
      return;
    }
    setChats((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        chat_id: chatId,
        sender_id: currentUserId.data.user!.id,
        content: message,
        created_at: new Date().toISOString(),
      },
    ]);
  };
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
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
