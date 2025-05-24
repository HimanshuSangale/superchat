"use client";
import React, { useState } from "react";
import { AiFillHome, AiOutlineLineChart } from "react-icons/ai";
import { BsChatDotsFill, BsFillGearFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaList, FaBullhorn } from "react-icons/fa6";
import {
  TbBinaryTree2,
  TbStarsFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import { RiContactsBookFill } from "react-icons/ri";
import { MdPermMedia, MdOutlineChecklist } from "react-icons/md";
import Image from "next/image";

type NavItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  { key: "home", icon: <AiFillHome />, label: "Home" },
  { key: "chat", icon: <BsChatDotsFill />, label: "Chat" },
  { key: "ticket", icon: <IoTicket />, label: "Tickets" },
  {
    key: "chart",
    icon: <AiOutlineLineChart />,
    label: "Analytics",
  },
  { key: "list", icon: <FaList />, label: "List" },
  {
    key: "bullhorn",
    icon: <FaBullhorn />,
    label: "Announcements",
  },
  { key: "tree", icon: <TbBinaryTree2 />, label: "Tree" },
  {
    key: "contacts",
    icon: <RiContactsBookFill />,
    label: "Contacts",
  },
  { key: "media", icon: <MdPermMedia />, label: "Media" },
  {
    key: "checklist",
    icon: <MdOutlineChecklist />,
    label: "Checklist",
  },
  {
    key: "settings",
    icon: <BsFillGearFill />,
    label: "Settings",
  },
  {
    key: "stars",
    icon: <TbStarsFilled />,
    label: "Favorites",
  },
  {
    key: "expand",
    icon: <TbLayoutSidebarLeftExpandFilled />,
    label: "Expand",
  },
];

const Sidebar = () => {
  const [active, setActive] = useState<string>("home");

  // Helper to determine if a divider should be rendered after a given index
  const dividerAfter = [0, 3, 6, 8];

  return (
    <div className="w-16 h-screen p-3 border-r border-gray-200 bg-white flex flex-col items-center">
      <ul className="w-full h-full flex flex-col items-center justify-start">
        <li className="mb-4">
          <Image
            width={30}
            height={30}
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
        </li>
        {navItems.map((item, idx) => (
          <React.Fragment key={item.key}>
            <li
              className={`p-2 mb-1 rounded-md ${
                item.key === "stars" ? "mt-auto" : ""
              } ${active === item.key ? "bg-gray-200" : ""}`}
            >
              <button
                aria-label={item.label}
                className={`text-lg flex items-center justify-center w-full text-gray-500 hover:text-green-700 transition-colors focus:outline-none cursor-pointer ${
                  active === item.key ? "text-green-700" : ""
                }`}
                onClick={() => setActive(item.key)}
                type="button"
              >
                {item.icon}
              </button>
            </li>
            {dividerAfter.includes(idx) && (
              <hr className="border-gray-200 mt-2 h-2 w-full" />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
