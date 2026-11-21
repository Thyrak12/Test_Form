"use client";

import React from "react";
import { Check } from "lucide-react";
import { GroupedQuestionItem, GroupCode } from "@/types/groupedInterest";

interface GroupedQuestionChecklistCardProps {
  item: GroupedQuestionItem;
  groupCode: GroupCode;
  isChecked: boolean;
  onToggle: (groupCode: GroupCode, id: number) => void;
  index: number;
}

export function GroupedQuestionChecklistCard({
  item,
  groupCode,
  isChecked,
  onToggle,
  index,
}: GroupedQuestionChecklistCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={() => onToggle(groupCode, item.id)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle(groupCode, item.id);
        }
      }}
      className={`group relative p-3.5 sm:p-4 rounded-lg border transition-colors duration-150 cursor-pointer select-none flex items-center gap-3 sm:gap-3.5 ${
        isChecked
          ? "bg-blue-50/60 border-blue-400 shadow-2xs"
          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
      }`}
    >
      {/* Question Number Badge */}
      <span
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md shrink-0 flex items-center justify-center font-mono text-xs font-semibold transition-colors ${
          isChecked
            ? "bg-blue-100 text-blue-900 border border-blue-200"
            : "bg-slate-100 text-slate-500 border border-slate-200"
        }`}
      >
        {formattedIndex}
      </span>

      {/* Item Text */}
      <div className="flex-1 min-w-0 pr-1">
        <p
          className={`text-xs sm:text-sm leading-relaxed khmer-content transition-colors ${
            isChecked
              ? "text-blue-950 font-semibold"
              : "text-slate-700 font-normal group-hover:text-slate-900"
          }`}
        >
          {item.textKh}
        </p>
      </div>

      {/* Standard Accessible Checkbox */}
      <div
        className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all ${
          isChecked
            ? "bg-blue-600 border border-blue-600 text-white shadow-2xs"
            : "border-2 border-slate-300 group-hover:border-slate-400 bg-white"
        }`}
      >
        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
}
