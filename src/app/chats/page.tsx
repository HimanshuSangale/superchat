"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import ChatIntegration from "../components/ChatIntegrations";
import { RiFolderDownloadFill } from "react-icons/ri";
import { IoSearch, IoFilterSharp } from "react-icons/io5";
import { getAllProfiles } from "@/api/profile";
import { ImSpinner8 } from "react-icons/im";

import ChatArea from "./ChatArea";
import ChatList from "./ChatList";
import { Profile } from "@/types/supabase";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const Chats = () => {
  const [activeChat, setActiveChat] = useState<string>("");
  const [chats, setChats] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      const response = await getAllProfiles();
      setChats(response);
      setActiveChat(response[0]?.id || ""); // Set the first chat as active
      setLoading(false);
    };

    fetchChats();

    // --- Realtime subscription for new profiles ---
    const channel = supabase
      .channel("profiles-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          setChats((prev) => {
            // Prevent duplicates
            if (prev.some((p) => p.id === payload.new.id)) return prev;
            return [...prev, payload.new as Profile];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const handleAuthChange = async () => {
      const userLoggedIn = await supabase.auth.getUser();
      console.log("userLoggedIn", userLoggedIn);
      if (!userLoggedIn.data.user) {
        router.push("/login");
      }
    };
    handleAuthChange();
  }, [router]);

  return (
    <div className="w-full flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex w-full h-[calc(100vh-3.5rem)]">
          {/* Chat List Sidebar */}
          <div className="h-full flex flex-col w-fit min-w-[450px] border-r border-gray-200">
            <div className="flex flex-wrap gap-2 items-center justify-between p-2 bg-white border-b border-gray-200">
              <button className="flex gap-2 items-center px-2 py-1 border-none rounded text-sm text-green-700 font-bold focus:outline-none">
                <RiFolderDownloadFill className="text-base" />
                <span>Custom Filter</span>
              </button>
              <button className="flex gap-2 items-center px-4 py-1 mr-4 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm text-gray-700 font-bold focus:outline-none">
                <span>Save</span>
              </button>
              <button className="ml-auto flex gap-2 items-center px-4 py-1 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm text-gray-700 font-bold focus:outline-none">
                <IoSearch />
                <span>Search</span>
              </button>
              <button className="flex gap-2 items-center px-4 py-1 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm text-green-700 font-bold focus:outline-none">
                <IoFilterSharp />
                <span>Filter</span>
              </button>
            </div>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <ImSpinner8 className="animate-spin text-2xl text-green-500" />
              </div>
            ) : chats.length > 0 ? (
              <ChatList
                setActiveChat={setActiveChat}
                activeChat={activeChat}
                chats={chats}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                No chats available
              </div>
            )}
          </div>
          {/* Main Chat Area */}
          {loading ? (
            <div className="w-full h-screen flex items-center justify-center">
              <ImSpinner8 className="animate-spin text-4xl text-green-500" />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chats;
