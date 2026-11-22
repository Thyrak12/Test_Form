"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from "lucide-react";
import { getCategoryTheme } from "@/lib/careerTheme";

export interface CategoryCount {
  name: string;
  count: number;
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: "number" | "name" | "careers";
  onSortChange: (sort: "number" | "name" | "careers") => void;
  categoryCounts: CategoryCount[];
  totalResults: number;
  track: "science" | "social_science";
  onReset: () => void;
  isFiltered: boolean;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoryCounts,
  totalResults,
  track,
  onReset,
  isFiltered,
}: FilterBarProps) {
  return (
    <div className="sticky top-14 sm:top-18 z-30 bg-[#FAF7F2]/95 backdrop-blur-md py-2.5 sm:py-4 border-b border-[#E6E8EC] space-y-2.5 sm:space-y-3 transition-shadow">
      {/* Upper Bar: Search Input, Category Dropdown, Sort, Result Count */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
        {/* 1. Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B6675] absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ស្វែងរកតាមឈ្មោះជំនាញ (ខ្មែរ/អង់គ្លេស), អាជីព..."
            className="w-full min-h-[40px] sm:min-h-[44px] pl-9 sm:pl-10 pr-8 sm:pr-9 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[14px] bg-white border-2 border-[#E6E8EC] text-[13px] sm:text-[15px] font-semibold text-[#1B2430] placeholder-[#5B6675] focus:border-[#1F5BFF] focus:outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
              aria-label="សម្អាតពាក្យស្វែងរក"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>

        {/* 2. Category Dropdown */}
        <div className="md:col-span-3 relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full min-h-[40px] sm:min-h-[44px] appearance-none pl-3.5 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[14px] bg-white border-2 border-[#E6E8EC] text-[12px] sm:text-[14px] font-bold text-[#1B2430] focus:border-[#1F5BFF] focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="ទាំងអស់">គ្រប់វិស័យ (All Categories)</option>
            {categoryCounts.map((cat, idx) => (
              <option key={idx} value={cat.name}>
                {cat.name.split("(")[0].trim()} ({cat.count})
              </option>
            ))}
          </select>
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B6675] absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Sort Selector */}
        <div className="md:col-span-3 flex items-center gap-1.5 sm:gap-2">
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as "number" | "name" | "careers")}
              className="w-full min-h-[40px] sm:min-h-[44px] appearance-none pl-3.5 sm:pl-4 pr-8 sm:pr-9 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[14px] bg-white border-2 border-[#E6E8EC] text-[12px] sm:text-[14px] font-bold text-[#1B2430] focus:border-[#1F5BFF] focus:outline-none cursor-pointer shadow-2xs"
            >
              <option value="number">តាមលេខកូដ (Default)</option>
              <option value="name">តាមឈ្មោះ A-Z</option>
              <option value="careers">ចំនួនអាជីពច្រើន</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B6675] absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters Icon if filtered */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="min-h-[40px] sm:min-h-[44px] px-2.5 sm:px-3 rounded-[12px] sm:rounded-[14px] border-2 border-[#E6E8EC] bg-white hover:bg-stone-50 text-[#5B6675] hover:text-[#1F5BFF] flex items-center justify-center transition-colors shadow-2xs shrink-0"
              title="កំណត់ឡើងវិញ"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lower Bar: Horizontally scrollable Category Filter Chips */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none pt-0.5">
        {/* 'All' Chip */}
        <button
          type="button"
          onClick={() => onCategoryChange("ទាំងអស់")}
          className={`h-[30px] sm:h-[36px] min-h-[30px] sm:min-h-[36px] px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-[13px] font-black transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 border whitespace-nowrap active:scale-95 ${
            selectedCategory === "ទាំងអស់"
              ? "bg-[#1F5BFF] text-white border-[#1F5BFF] shadow-2xs"
              : "bg-white text-[#1B2430] border-[#E6E8EC] hover:bg-stone-50"
          }`}
        >
          <span>ទាំងអស់</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-bold ${
              selectedCategory === "ទាំងអស់" ? "bg-white/20 text-white" : "bg-stone-100 text-[#5B6675]"
            }`}
          >
            {totalResults}
          </span>
        </button>

        {/* Category Chips with Count Badges */}
        {categoryCounts.map((cat, idx) => {
          const isActive = selectedCategory === cat.name;
          const theme = getCategoryTheme(cat.name, track);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onCategoryChange(cat.name)}
              className={`h-[30px] sm:h-[36px] min-h-[30px] sm:min-h-[36px] px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-[13px] font-bold transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 border whitespace-nowrap active:scale-95 ${
                isActive
                  ? "bg-[#1B2430] text-white border-[#1B2430] shadow-2xs"
                  : "bg-white text-[#1B2430] border-[#E6E8EC] hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <span>{cat.name.split("(")[0].trim()}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-black ${
                  isActive ? "bg-white/25 text-white" : "bg-[#FAF7F2] text-[#5B6675] border border-[#E6E8EC]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
