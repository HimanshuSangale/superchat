import React from "react";

type ButtonProps = {
  label: string;
  sufixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const Button = ({
  label,
  sufixIcon,
  prefixIcon,
  type = "primary",
  size = "md",
  className,
}: ButtonProps) => {
  const buttonTypes = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    tertiary: "bg-green-500 text-white",
    ghost: "bg-transparent text-gray-500 border border-gray-500",
  };
  const buttonSizes = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-md px-4 py-2",
    lg: "text-lg px-5 py-2.5",
  };
  return (
    <button
      className={`flex hover:bg-gray-100 rounded gap-2 items-center ${buttonTypes[type]} ${buttonSizes[size]} ${className}`}
    >
      {prefixIcon && <span className="icon">{prefixIcon}</span>}
      {label}
      {sufixIcon && <span className="icon">{sufixIcon}</span>}
    </button>
  );
};

export default Button;
