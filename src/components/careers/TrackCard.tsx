"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, Briefcase, Sparkles, Layers } from "lucide-react";

interface FieldItem {
  icon: string;
  nameKh: string;
}

interface TrackCardProps {
  track: "science" | "social_science";
  count: number;
  titleKh: string;
  titleEn: string;
  descriptionKh: string;
  subjects: string[];
  fields: FieldItem[];
  careers: string[];
  href: string;
}

export function TrackCard({
  track,
  count,
  titleKh,
  titleEn,
  descriptionKh,
  subjects,
  fields,
  careers,
  href,
}: TrackCardProps) {
  const isScience = track === "science";

  return (
    <div
      className={`h-full flex flex-col justify-between rounded-[18px] sm:rounded-[20px] border-2 bg-white p-4 sm:p-6 md:p-7 transition-all duration-300 shadow-[0_4px_24px_rgba(27,36,48,0.06)] hover:shadow-[0_12px_36px_rgba(27,36,48,0.12)] ${
        isScience
          ? "border-[#1F5BFF]/30 hover:border-[#1F5BFF]"
          : "border-[#E37400]/30 hover:border-[#E37400]"
      }`}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* Top Row: Icon Tile + Track Badge & Titles */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={`w-10 h-10 min-w-10 sm:w-12 sm:h-12 sm:min-w-12 rounded-[12px] sm:rounded-[14px] flex items-center justify-center shrink-0 border shadow-2xs ${
              isScience
                ? "bg-[#EAF1FF] text-[#1F5BFF] border-[#BAE6FD]"
                : "bg-[#FFF4E0] text-[#E37400] border-[#FED7AA]"
            }`}
          >
            {isScience ? (
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            ) : (
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-[11px] sm:text-[13px] font-black px-2 py-0.5 sm:px-2.5 rounded-full border whitespace-nowrap shrink-0 ${
                  isScience
                    ? "bg-[#EAF1FF] text-[#1F5BFF] border-[#BAE6FD]"
                    : "bg-[#FFF4E0] text-[#E37400] border-[#FED7AA]"
                }`}
              >
                {count} មុខជំនាញ
              </span>
            </div>

            <h2 className="text-[17px] sm:text-[20px] md:text-[22px] font-black text-[#1B2430] truncate leading-tight mt-0.5 sm:mt-1">
              {titleKh}
            </h2>
            <p className="text-[11px] sm:text-[13px] font-semibold text-[#5B6675] truncate">
              {titleEn}
            </p>
          </div>
        </div>

        {/* 2-line Description */}
        <p className="text-[13px] sm:text-[15px] md:text-[16px] text-[#5B6675] leading-[22px] sm:leading-[26px] line-clamp-2 font-medium khmer-content">
          {descriptionKh}
        </p>

        {/* Subjects to Prepare */}
        <div className="space-y-1.5 sm:space-y-2 pt-1 border-t border-[#E6E8EC]">
          <span className="text-[11px] sm:text-[13px] font-black text-[#1B2430] flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isScience ? "text-[#1F5BFF]" : "text-[#E37400]"}`} />
            <span>មុខវិជ្ជាត្រូវត្រៀម៖</span>
          </span>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {subjects.map((sub, idx) => (
              <span
                key={idx}
                className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] whitespace-nowrap shadow-2xs"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Fields of Study: 2x2 Grid of Icon Tiles */}
        <div className="space-y-1.5 sm:space-y-2 pt-1 border-t border-[#E6E8EC]">
          <span className="text-[11px] sm:text-[13px] font-black text-[#1B2430] flex items-center gap-1.5 uppercase tracking-wider">
            <Layers className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isScience ? "text-[#1F5BFF]" : "text-[#E37400]"}`} />
            <span>វិស័យសិក្សាគំរូ៖</span>
          </span>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {fields.map((f, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-[10px] sm:rounded-[14px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] truncate"
              >
                <span className="text-sm sm:text-base shrink-0">{f.icon}</span>
                <span className="truncate">{f.nameKh}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example Careers: at most 4 as one line */}
        <div className="space-y-1 pt-1 border-t border-[#E6E8EC]">
          <span className="text-[11px] sm:text-[13px] font-black text-[#5B6675] flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#5B6675]" />
            <span>អាជីពការងារគំរូ៖</span>
          </span>
          <p className="text-[11px] sm:text-[13px] font-medium text-[#1B2430] truncate leading-normal">
            {careers.slice(0, 4).join(" • ")}
          </p>
        </div>
      </div>

      {/* Pinned CTA Button at bottom */}
      <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#E6E8EC]">
        <Link
          href={href}
          className={`w-full min-h-[40px] sm:min-h-[44px] py-2 sm:py-3 px-4 sm:px-5 rounded-[12px] sm:rounded-[14px] font-black text-[14px] sm:text-[16px] flex items-center justify-center gap-1.5 sm:gap-2 text-white shadow-sm hover:shadow-md transition-all active:scale-98 ${
            isScience
              ? "bg-[#1F5BFF] hover:bg-[#1849D6]"
              : "bg-[#E37400] hover:bg-[#C96400]"
          }`}
        >
          <span>ចូលស្វែងយល់ ({count} មុខជំនាញ)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
