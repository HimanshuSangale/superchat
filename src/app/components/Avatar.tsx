import Image from "next/image";
import React from "react";
type AvatarProps = {
  src: string;
  alt: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  className?: string;
};

const Avatar = ({ src, alt, size, className }: AvatarProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={`avatar rounded-full ${size} ${className}`}
      width={
        size === "xxs"
          ? 16
          : size === "xs"
          ? 24
          : size === "sm"
          ? 32
          : size === "md"
          ? 48
          : 64
      }
      height={
        size === "xxs"
          ? 16
          : size === "xs"
          ? 24
          : size === "sm"
          ? 32
          : size === "md"
          ? 48
          : 64
      }
    />
  );
};

export default Avatar;
