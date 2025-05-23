import React from "react";
import Image from "next/image";
import Badge from "./Badge";
import { IoCallOutline } from "react-icons/io5";
import Avatar from "./Avatar";

type ChatProps = {
  title: string;
  description: string;
};

const Chat = ({ title, description }: ChatProps) => {
  return (
    <li className="bg-white w-full max-h-24 h-full list-none p-3 gap-2 flex items-start justify-start hover:bg-gray-100 border-b border-gray-100 cursor-pointer">
      <Avatar
        src="/logo.png"
        alt="Chat"
        size="lg"
        className="rounded-full w-12 h-12"
      />
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h3 className="text-black font-bold ">
              {title || "Untitled Chat"}
            </h3>
            <div className="flex items-center gap-1">
              <Badge text="Demo" type="warning" size="sm" />
              <Badge text="internal" type="success" size="sm" />
              <Badge text="+1" type="ghost" size="sm" />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-gray-500 font-normal text-sm">
            <div className="flex items-center gap-1 justify-between">
              <p>{description || "No description available."}</p>
              <Avatar src="/logo.png" alt="Chat" size="xxs" />
            </div>
            <div className="flex items-center justify-between">
              <Badge
                text="+91 992238745 +1"
                type="info"
                icon={<IoCallOutline />}
                size="xs"
              />
              <p className="text-gray-400 text-xs">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Chat;
