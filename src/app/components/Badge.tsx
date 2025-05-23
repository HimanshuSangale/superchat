import React from "react";
type BadgeProps = {
  text: string;
  type: "success" | "error" | "warning" | "info" | "ghost";
  icon?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};
const Badge = ({ text, type, icon, size, className }: BadgeProps) => {
  return (
    <div
      className={`w-fit flex gap-1 items-center justify-start font-bold py-1 px-2 rounded-lg ${
        type === "success"
          ? "bg-green-100 text-green-500"
          : type === "error"
          ? "bg-red-100 text-red-800"
          : type === "warning"
          ? "bg-orange-100 text-orange-700"
          : type === "info"
          ? "bg-gray-100 text-gray-500"
          : type === "ghost"
          ? "bg-transparent text-gray-500"
          : ""
      } ${
        size === "xs"
          ? "text-[10px]"
          : size === "sm"
          ? "text-xs"
          : size === "md"
          ? "text-sm"
          : "text-base"
      } ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </div>
  );
};

export default Badge;
