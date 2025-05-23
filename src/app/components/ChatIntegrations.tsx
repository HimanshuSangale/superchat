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
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { FiEdit3 } from "react-icons/fi";
import { VscListSelection, VscMention } from "react-icons/vsc";
import { CiBoxList } from "react-icons/ci";
import { SiHubspot } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { PiListPlusBold } from "react-icons/pi";

type NavItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  {
    key: "home",
    icon: <TbLayoutSidebarRightExpandFilled className="text-2xl" />,
    label: "Home",
  },
  { key: "chat", icon: <TfiReload className="text-2xl" />, label: "Chat" },
  { key: "ticket", icon: <FiEdit3 className="text-2xl" />, label: "Tickets" },
  {
    key: "chart",
    icon: <VscListSelection className="text-2xl" />,
    label: "Analytics",
  },
  { key: "list", icon: <CiBoxList className="text-2xl" />, label: "List" },
  {
    key: "bullhorn",
    icon: <SiHubspot className="text-2xl" />,
    label: "Announcements",
  },
  { key: "tree", icon: <IoIosPeople className="text-2xl" />, label: "Tree" },
  {
    key: "contacts",
    icon: <VscMention className="text-2xl" />,
    label: "Contacts",
  },
  { key: "media", icon: <MdPermMedia className="text-2xl" />, label: "Media" },
  {
    key: "checklist",
    icon: <PiListPlusBold className="text-2xl" />,
    label: "Checklist",
  },
];

const ChatIntegration = () => {
  const [active, setActive] = useState<string>("home");

  // Helper to determine if a divider should be rendered after a given index
  const dividerAfter = [0, 3, 6, 8, 9, 10];

  return (
    <div className="w-16 p-3 border-l border-gray-200 bg-white flex flex-col items-center">
      <ul className="w-full h-full flex flex-col items-center justify-start">
        {navItems.map((item, idx) => (
          <React.Fragment key={item.key}>
            <li
              className={`px-3 py-2 my-1 rounded-xl ${
                active === item.key ? "bg-gray-200" : ""
              }`}
            >
              <button
                aria-label={item.label}
                className={`flex items-center justify-center w-full text-gray-400 hover:text-green-700 transition-colors focus:outline-none cursor-pointer ${
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

export default ChatIntegration;
