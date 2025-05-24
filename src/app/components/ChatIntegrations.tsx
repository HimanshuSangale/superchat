"use client";
import React, { useState } from "react";
import { MdPermMedia } from "react-icons/md";
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
  { key: "chat", icon: <TfiReload />, label: "Chat" },
  { key: "ticket", icon: <FiEdit3 />, label: "Tickets" },
  {
    key: "chart",
    icon: <VscListSelection />,
    label: "Analytics",
  },
  { key: "list", icon: <CiBoxList />, label: "List" },
  {
    key: "bullhorn",
    icon: <SiHubspot />,
    label: "Announcements",
  },
  { key: "tree", icon: <IoIosPeople />, label: "Tree" },
  {
    key: "contacts",
    icon: <VscMention />,
    label: "Contacts",
  },
  { key: "media", icon: <MdPermMedia />, label: "Media" },
  {
    key: "checklist",
    icon: <PiListPlusBold />,
    label: "Checklist",
  },
];

const ChatIntegration = () => {
  const [active, setActive] = useState<string>("home");

  return (
    <div className="w-16 p-3 pt-8 border-l border-gray-200 bg-white flex flex-col items-center">
      <ul className="w-full h-full flex flex-col items-center justify-start gap-3">
        {navItems.map((item, idx) => (
          <React.Fragment key={item.key}>
            <li className={`px-3 py-2 my-1 rounded-xl`}>
              <button
                aria-label={item.label}
                className={`flex text-lg items-center justify-center w-full text-gray-400 hover:text-green-700 transition-colors focus:outline-none cursor-pointer `}
                onClick={() => setActive(item.key)}
                type="button"
              >
                {item.icon}
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ChatIntegration;
