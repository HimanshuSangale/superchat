"use client";
import React, { useState } from "react";
import { BsChatDotsFill, BsChevronExpand, BsStars } from "react-icons/bs";
import { LuRefreshCcwDot, LuCircleHelp } from "react-icons/lu";
import { MdInstallDesktop } from "react-icons/md";
import { IoNotificationsOffSharp, IoListOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type HeaderAction = {
  key: string;
  icon: React.ReactNode;
  label: string;
  hideLabel?: boolean;
  extra?: React.ReactNode;
};

const headerActions: HeaderAction[] = [
  {
    key: "refresh",
    icon: <LuRefreshCcwDot className="text-lg text-gray-900" />,
    label: "Refresh",
  },
  {
    key: "help",
    icon: <LuCircleHelp className="text-lg text-gray-900" />,
    label: "Help",
  },
  {
    key: "phones",
    icon: <span className="bg-yellow-400 rounded-full w-2 h-2 block m-auto" />,
    label: "5/6 phones",
    extra: <BsChevronExpand className="text-lg text-gray-500" />,
  },
  {
    key: "install",
    icon: <MdInstallDesktop className="text-lg text-gray-900" />,
    label: "Install",
    hideLabel: true,
  },
  {
    key: "notifications",
    icon: <IoNotificationsOffSharp className="text-lg text-gray-900" />,
    label: "Notifications",
    hideLabel: true,
  },
  {
    key: "stars-list",
    icon: (
      <>
        <BsStars className="text-lg text-yellow-300" />
        <IoListOutline className="text-lg text-gray-900" />
      </>
    ),
    label: "Favorites List",
    hideLabel: true,
  },
];

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="h-14 bg-white text-gray-500 p-4 flex items-center border-b border-gray-200">
      <h1 className="text-normal font-bold flex items-center">
        <BsChatDotsFill className="inline-block mr-2" />
        Chat
      </h1>
      <div className="ml-auto flex items-center gap-3">
        {headerActions.map((action, idx) => (
          <button
            key={action.key}
            className={`flex gap-2 items-center px-4 py-1 border border-solid border-gray-200 hover:bg-gray-100 rounded text-sm shadow-sm focus:outline-none ${
              active === action.key ? "bg-gray-200" : ""
            }`}
            aria-label={action.label}
            onClick={() => {
              setActive(action.key);
              if (idx === headerActions.length - 1) handleLogout();
            }}
            type="button"
          >
            {action.icon}
            {!action.hideLabel && (
              <span className="text-gray-900">{action.label}</span>
            )}
            {action.extra}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
