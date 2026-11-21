"use client";

import React from "react";
import { Check } from "lucide-react";
import { HollandQuestion } from "@/types/hollandRiasec";

interface QuestionChecklistCardProps {
  question: HollandQuestion;
  isChecked: boolean;
  onToggle: (id: number) => void;
  index: number;
}

export function QuestionChecklistCard({
  question,
  isChecked,
  onToggle,
  index,
}: QuestionChecklistCardProps) {
  // Format question index with leading zero (e.g., 01, 02, ..., 48)
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={() => onToggle(question.id)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle(question.id);
        }
      }}
      className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex items-center gap-3.5 sm:gap-4 ${
        isChecked
          ? "bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-200"
          : "bg-white border-stone-200 hover:border-stone-300 hover:bg-[#FAF7F2]/60 hover:shadow-2xs"
      }`}
    >
      {/* Question Number Badge */}
      <span
        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-mono text-xs font-bold transition-all ${
          isChecked
            ? "bg-blue-600 text-white shadow-2xs"
            : "bg-[#FAF7F2] text-stone-500 border border-stone-300"
        }`}
      >
        {formattedIndex}
      </span>

      {/* Question Text */}
      <div className="flex-1 min-w-0 pr-1">
        <p
          className={`text-xs sm:text-sm leading-relaxed khmer-content transition-colors ${
            isChecked
              ? "text-blue-950 font-bold"
              : "text-[#1E293B] font-normal group-hover:text-black"
          }`}
        >
          {question.textKh}
        </p>
      </div>

      {/* Softly Rounded Square Checkbox (24px x 24px) */}
      <div
        className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center transition-all ${
          isChecked
            ? "bg-blue-600 border-2 border-blue-600 text-white shadow-2xs scale-105"
            : "border-2 border-stone-300 group-hover:border-stone-400 bg-white"
        }`}
      >
        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
    </div>
  );
}
