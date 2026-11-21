"use client";

import React from "react";
import { getAvatarById, AVATAR_LIST, AvatarOption } from "@/lib/constants/avatars";

export { getAvatarById, AVATAR_LIST };
export type { AvatarOption };

interface StudentAvatarProps {
  avatarId?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

export function StudentAvatar({
  avatarId,
  size = "md",
  className = "",
  showBadge = false,
}: StudentAvatarProps) {
  const avatar = getAvatarById(avatarId);

  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-11 h-11 text-xl",
    lg: "w-14 h-14 text-2xl",
    xl: "w-18 h-18 text-3xl",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div
        className={`${sizeClasses} rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center select-none shadow-2xs`}
      >
        <span>{avatar.emoji}</span>
      </div>
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 text-[9px] bg-slate-800 text-white font-medium px-1.5 py-0.2 rounded-md border border-white">
          {avatar.nameKh}
        </span>
      )}
    </div>
  );
}
