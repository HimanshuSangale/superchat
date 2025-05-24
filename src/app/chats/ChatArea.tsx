"use client";
import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "./ChatInput";
import ChatBubble from "../components/ChatBubble";
import { getMessages, sendMessage } from "@/api/message";
import { Message, Profile } from "@/types/supabase";
import { getOrCreateChatId } from "@/api/chat";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getProfile } from "@/api/profile";

type ChatAreaProps = {
  activeChat: string;
};

interface GroupedMessage extends Message {
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  showDateSeparator?: boolean;
  dateLabel?: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ activeChat }) => {
  const [chats, setChats] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const [senderProfile, setSenderProfile] = useState<Profile | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(
    null
  );
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [shouldScrollOnNewMessage, setShouldScrollOnNewMessage] =
    useState(true);
  const router = useRouter();
  const messagesContainerRef = useRef<HTMLUListElement>(null);
  const isInitialLoad = useRef(true);
  const previousChatLength = useRef(0);

  // Group messages by date and consecutive sender
  const groupMessages = useCallback((messages: Message[]): GroupedMessage[] => {
    if (messages.length === 0) return [];

    const grouped: GroupedMessage[] = [];
    let currentDate = "";
    let previousSender = "";
    let previousTime = 0;

    messages.forEach((message, index) => {
      const messageDate = new Date(message.created_at);
      const dateString = messageDate.toLocaleDateString();
      const messageTime = messageDate.getTime();

      // Add date separator if date changed
      const showDateSeparator = dateString !== currentDate;
      if (showDateSeparator) {
        currentDate = dateString;
      }

      // Determine if this message starts a new group
      const timeDiff = messageTime - previousTime;
      const isNewGroup =
        message.sender_id !== previousSender ||
        timeDiff > 10 * 60 * 1000 || // 10 minutes
        showDateSeparator;

      // Determine if this is the last message in a group
      const nextMessage = messages[index + 1];
      const isLastInGroup =
        !nextMessage ||
        nextMessage.sender_id !== message.sender_id ||
        new Date(nextMessage.created_at).getTime() - messageTime >
          10 * 60 * 1000 ||
        new Date(nextMessage.created_at).toLocaleDateString() !== dateString;

      grouped.push({
        ...message,
        isFirstInGroup: isNewGroup,
        isLastInGroup,
        showDateSeparator,
        dateLabel: showDateSeparator ? formatDateLabel(messageDate) : undefined,
      });

      previousSender = message.sender_id;
      previousTime = messageTime;
    });

    return grouped;
  }, []);

  // Format date label like WhatsApp
  const formatDateLabel = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  // Get grouped messages
  const groupedChats = groupMessages(chats);

  // Simple scroll to bottom function
  const scrollToBottom = useCallback(
    (behavior: "auto" | "smooth" = "smooth") => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: behavior,
        });
      }
    },
    []
  );

  // Handle scroll events to detect if user is at bottom
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    setIsUserScrolling(!isAtBottom);
    setShouldScrollOnNewMessage(isAtBottom);
  }, []);

  // Only scroll on initial render and new messages (if user is at bottom)
  useLayoutEffect(() => {
    if (isInitialLoad.current) {
      setTimeout(() => scrollToBottom("auto"), 100);
      isInitialLoad.current = false;
      previousChatLength.current = chats.length;
      return;
    }

    if (chats.length > previousChatLength.current) {
      if (shouldScrollOnNewMessage) {
        setTimeout(() => scrollToBottom("smooth"), 50);
      }
      previousChatLength.current = chats.length;
    }
  }, [chats, scrollToBottom, shouldScrollOnNewMessage]);

  // Initial chat loading
  useEffect(() => {
    const fetchChat = async () => {
      const currentUserId = await supabase.auth.getUser();
      if (!currentUserId.data.user) {
        router.push("/login");
        return;
      }

      const currentUserProfile = await getProfile(currentUserId.data.user.id);
      if (currentUserProfile) {
        setCurrentUserProfile(currentUserProfile);
      }

      const sender = await getProfile(activeChat);
      if (sender) {
        setSenderProfile(sender);
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

      isInitialLoad.current = true;
      setShouldScrollOnNewMessage(true);
      setIsUserScrolling(false);
    };

    fetchChat();
  }, [activeChat, router]);

  // Real-time message subscription
  useEffect(() => {
    if (!chatId) return;

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
          const newMessage = payload.new as Message;
          setChats((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, currentUserProfile?.id]);

  // Handle sending messages
  const handleSendMessage = async (message: string) => {
    const currentUserId = await supabase.auth.getUser();
    if (!currentUserId.data.user) {
      router.push("/login");
      return;
    }

    setShouldScrollOnNewMessage(true);

    const { error } = await sendMessage({
      chat_id: chatId,
      sender_id: currentUserId.data.user.id,
      content: message,
    });

    if (error) {
      console.error("Error sending message:", error);
      return;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0 h-full">
      <ChatHeader title={senderProfile?.full_name || ""} />
      <div className="flex-1 flex flex-col w-full min-h-0">
        <div className="flex-1 flex gap-2 relative min-h-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.5,
              zIndex: 0,
            }}
          />
          <ul
            ref={messagesContainerRef}
            className="relative z-10 w-full flex-1 flex flex-col gap-1 p-4 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full"
            style={{
              minHeight: 0,
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db transparent",
            }}
            onScroll={handleScroll}
          >
            {groupedChats.map((msg) => {
              const isCurrentUser = msg.sender_id === currentUserProfile?.id;

              return (
                <React.Fragment key={msg.id}>
                  {/* Date separator */}
                  {msg.showDateSeparator && (
                    <div className="flex justify-center my-4 mt-auto">
                      <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <span className="text-xs font-medium text-gray-600">
                          {msg.dateLabel}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Message bubble */}
                  <ChatBubble
                    message={msg}
                    userProfile={
                      isCurrentUser ? currentUserProfile : senderProfile
                    }
                    received={!isCurrentUser}
                    isFirstInGroup={msg.isFirstInGroup}
                    isLastInGroup={msg.isLastInGroup}
                  />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>

      {/* Scroll to bottom button */}
      {isUserScrolling && (
        <button
          onClick={() => {
            scrollToBottom("smooth");
            setShouldScrollOnNewMessage(true);
          }}
          className="absolute bottom-32 right-20 z-20 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
          aria-label="Scroll to bottom"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatArea;
