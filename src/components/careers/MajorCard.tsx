"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MajorItem } from "@/types/career";
import { getCategoryTheme } from "@/lib/careerTheme";
import { MajorCategoryIcon } from "./MajorCategoryIcon";
import { ChevronRight, GraduationCap, Briefcase } from "lucide-react";

interface MajorCardProps {
  major: MajorItem;
  onSelect?: (major: MajorItem) => void;
  isComparing?: boolean;
  onToggleCompare?: (major: MajorItem, checked: boolean) => void;
  canCompare?: boolean;
}

export function MajorCard({
  major,
  onSelect,
  isComparing = false,
  onToggleCompare,
  canCompare = true,
}: MajorCardProps) {
  const router = useRouter();
  const theme = getCategoryTheme(major.category, major.track);
  const careerCount = major.career_positions ? major.career_positions.length : 0;
  const hasTvet = major.tvet_equivalent && major.tvet_equivalent.length > 0;

  const handleCardClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(major);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(major, e.target.checked);
    }
  };

  return (
    <Link
      href={`/careers/${major.id}`}
      onClick={handleCardClick}
      style={{
        borderColor: isComparing ? theme.color : undefined,
      }}
      className={`group relative flex flex-col justify-between rounded-[12px] sm:rounded-[20px] border-2 bg-white p-2.5 sm:p-5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 min-h-[160px] sm:min-h-[280px] h-full ${
        isComparing
          ? "border-2 shadow-sm ring-2 ring-offset-1"
          : "border-[#E6E8EC] hover:border-[#1F5BFF]"
      }`}
    >
      <div className="space-y-1.5 sm:space-y-3">
        {/* Top Row: Category Icon Tile + Rank Number + Compare Checkbox */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Category Icon Tile */}
            <div
              className={`w-8 h-8 min-w-8 sm:w-12 sm:h-12 sm:min-w-12 rounded-[8px] sm:rounded-[14px] flex items-center justify-center p-1.5 sm:p-2.5 border shadow-2xs ${theme.iconBgClass} ${theme.iconTextClass} ${theme.borderClass}`}
            >
              <MajorCategoryIcon
                category={major.category}
                track={major.track}
                size="sm"
                className="w-full h-full"
              />
            </div>

            <div className="min-w-0">
              <span className="text-[10px] sm:text-[13px] font-bold text-[#5B6675]">
                #{String(major.number).padStart(2, "0")}
              </span>
              <span className="block text-[10px] sm:text-[13px] font-bold text-[#1B2430] truncate max-w-[110px] sm:max-w-[160px]">
                {major.category.split("(")[0].trim()}
              </span>
            </div>
          </div>

          {/* Compare Checkbox */}
          {onToggleCompare && (
            <label
              onClick={handleCheckboxClick}
              className={`flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 rounded-lg transition-colors cursor-pointer select-none text-[10px] sm:text-[12px] font-bold shrink-0 ${
                isComparing
                  ? "bg-[#EAF1FF] text-[#1F5BFF]"
                  : "bg-stone-50 hover:bg-stone-100 text-[#5B6675] hover:text-[#1B2430]"
              }`}
              title="ជ្រើសរើសដើម្បីប្រៀបធៀប"
            >
              <input
                type="checkbox"
                checked={isComparing}
                disabled={!isComparing && !canCompare}
                onChange={handleCheckboxChange}
                className="w-3.5 h-3.5 rounded text-[#1F5BFF] focus:ring-[#1F5BFF] cursor-pointer accent-[#1F5BFF] disabled:opacity-40"
              />
              <span className="whitespace-nowrap">ប្រៀបធៀប</span>
            </label>
          )}
        </div>

        {/* Major Titles: Khmer Name + English Subtitle */}
        <div>
          <h3 className="text-[14px] sm:text-[18px] md:text-[20px] font-black text-[#1B2430] leading-[20px] sm:leading-[26px] md:leading-[28px] line-clamp-1 sm:line-clamp-2 group-hover:text-[#1F5BFF] transition-colors">
            {major.major_name_kh}
          </h3>
          <p className="text-[10px] sm:text-[13px] font-semibold text-[#5B6675] leading-[15px] sm:leading-[20px] truncate mt-0.5">
            {major.major_name_en}
          </p>
        </div>

        {/* One-line summary */}
        <p className="text-[11px] sm:text-[13px] md:text-[14px] text-[#5B6675] leading-[17px] sm:leading-[22px] font-medium line-clamp-2 khmer-content">
          {major.description_kh}
        </p>

        {/* Up to 3 University Subject Chips */}
        {major.high_school_subjects && major.high_school_subjects.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
            {major.high_school_subjects.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                className="px-1.5 sm:px-2.5 py-0.2 sm:py-0.5 rounded-full bg-[#FAF7F2] border border-[#E6E8EC] text-[10px] sm:text-[13px] font-bold text-[#1B2430] whitespace-nowrap shadow-2xs"
              >
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Row: Career Count + TVET Available Badge + Chevron */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#E6E8EC] text-[10px] sm:text-[13px] font-bold">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
          <span className="inline-flex items-center gap-1 text-[#5B6675] whitespace-nowrap">
            <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{careerCount} អាជីព</span>
          </span>

          {hasTvet && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-[#E8F8F0] text-[#047857] border border-[#A7F3D0] text-[9px] sm:text-xs font-black whitespace-nowrap shadow-2xs">
              <GraduationCap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span>មាន TVET</span>
            </span>
          )}
        </div>

        {/* Chevron on hover */}
        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-stone-100 group-hover:bg-[#1F5BFF] text-stone-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
