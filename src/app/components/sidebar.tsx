"use client";
import React, { useState } from "react";
import { AiFillHome, AiOutlineLineChart } from "react-icons/ai";
import { BsChatDotsFill, BsFillGearFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaB, FaList, FaBullhorn } from "react-icons/fa6";
import {
  TbBinaryTree2,
  TbStarsFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import { RiContactsBookFill } from "react-icons/ri";
import { MdPermMedia, MdOutlineChecklist } from "react-icons/md";
import Image from "next/image";

const navItems = [
  { key: "home", icon: <AiFillHome className="text-2xl" />, label: "Home" },
  { key: "chat", icon: <BsChatDotsFill className="text-2xl" />, label: "Chat" },
  { key: "ticket", icon: <IoTicket className="text-2xl" />, label: "Tickets" },
  {
    key: "chart",
    icon: <AiOutlineLineChart className="text-2xl" />,
    label: "Analytics",
  },
  { key: "list", icon: <FaList className="text-2xl" />, label: "List" },
  {
    key: "bullhorn",
    icon: <FaBullhorn className="text-2xl" />,
    label: "Announcements",
  },
  { key: "tree", icon: <TbBinaryTree2 className="text-2xl" />, label: "Tree" },
  {
    key: "contacts",
    icon: <RiContactsBookFill className="text-2xl" />,
    label: "Contacts",
  },
  { key: "media", icon: <MdPermMedia className="text-2xl" />, label: "Media" },
  {
    key: "checklist",
    icon: <MdOutlineChecklist className="text-2xl" />,
    label: "Checklist",
  },
  {
    key: "settings",
    icon: <BsFillGearFill className="text-2xl" />,
    label: "Settings",
  },
  {
    key: "stars",
    icon: <TbStarsFilled className="text-2xl" />,
    label: "Favorites",
  },
  {
    key: "expand",
    icon: <TbLayoutSidebarLeftExpandFilled className="text-2xl" />,
    label: "Expand",
  },
];

const Sidebar = () => {
  const [active, setActive] = useState("home");

  // Helper to determine if a divider should be rendered after a given index
  const dividerAfter = [0, 3, 6, 8, 9, 10];

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
              className={`px-3 py-2 my-1 rounded-xl ${
                item.key === "stars" ? "mt-auto" : ""
              } ${active === item.key ? "bg-gray-200" : ""}`}
            >
              <button
                aria-label={item.label}
                className={`flex items-center justify-center w-full text-gray-500 hover:text-green-700 transition-colors focus:outline-none cursor-pointer ${
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
