"use client";
import React from "react";
import { BsChatDotsFill, BsFillGearFill } from "react-icons/bs";
import { LuRefreshCcwDot } from "react-icons/lu";
import { LuCircleHelp } from "react-icons/lu";

const Header = () => {
  return (
    <div className="h-14 bg-white text-gray-500 p-4 flex items-center border-b border-gray-200">
      <h1 className="text-normal font-bold">
        <BsChatDotsFill className="inline-block mr-2" />
        Chat
      </h1>
      <div className="ml-auto flex items-center">
        <button className="p-2 hover:bg-gray-100 rounded">
          <LuRefreshCcwDot className="text-xl" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <LuCircleHelp className="text-xl" />
          <span className="sr-only">Help</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
