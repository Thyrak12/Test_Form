"use client";

import React from "react";
import { CheckCircle2, FlaskConical, BookOpen, GraduationCap } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  colorClass: string;
}

export function StatPill() {
  const stats: StatItem[] = [
    {
      value: "៧០",
      label: "ផ្នែកវិទ្យាសាស្ត្រ",
      subLabel: "Science Track",
      icon: <FlaskConical className="w-5 h-5 text-[#1F5BFF]" />,
      colorClass: "border-[#1F5BFF]/20 bg-[#EAF1FF]/70 text-[#1F5BFF]",
    },
    {
      value: "៦៦",
      label: "ផ្នែកវិទ្យាសាស្ត្រសង្គម",
      subLabel: "Social Science",
      icon: <BookOpen className="w-5 h-5 text-[#E37400]" />,
      colorClass: "border-[#E37400]/20 bg-[#FFF4E0]/70 text-[#E37400]",
    },
    {
      value: "TVET",
      label: "ភ្ជាប់ជាមួយបច្ចេកទេស",
      subLabel: "Technical Linked",
      icon: <GraduationCap className="w-5 h-5 text-[#1E9E6A]" />,
      colorClass: "border-[#1E9E6A]/20 bg-[#E8F8F0]/70 text-[#1E9E6A]",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-4 max-w-2xl mx-auto w-full pt-1 sm:pt-2">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3.5 p-2 sm:p-4 rounded-[14px] sm:rounded-[20px] border-2 bg-white shadow-xs transition-all hover:shadow-sm text-center sm:text-left ${stat.colorClass}`}
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-2xl bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs">
            <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
              {stat.icon}
            </span>
          </div>
          <div className="min-w-0 w-full">
            <div className="flex items-baseline justify-center sm:justify-start gap-1 sm:gap-1.5">
              <span className="text-[17px] sm:text-2xl md:text-3xl font-black text-[#1B2430] leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-[#5B6675] truncate">
                {stat.value === "TVET" ? "កម្រិត" : "ជំនាញ"}
              </span>
            </div>
            <p className="text-[10px] sm:text-[13px] font-extrabold text-[#1B2430] leading-tight truncate mt-0.5">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
