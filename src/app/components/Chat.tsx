import React from "react";
import Badge from "./Badge";
import { IoCallOutline } from "react-icons/io5";
import Avatar from "./Avatar";

type ChatProps = {
  title: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
};

const Chat = ({ title, description, onClick, isActive }: ChatProps) => {
  return (
    <li
      className={`w-full max-h-24 h-full list-none p-3 gap-2 flex items-start justify-start hover:bg-gray-100 border-b border-gray-100 cursor-pointer ${
        isActive ? "bg-gray-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-1 flex-shrink-0">
        <span className="text-lg font-semibold text-gray-600">
          {title?.charAt(0)?.toUpperCase() || "?"}
        </span>
      </div>
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
