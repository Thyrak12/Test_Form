"use client";

import React, { useRef, useState, useEffect } from "react";
import { MajorItem } from "@/types/career";
import { MajorCard } from "./MajorCard";
import { getCategoryTheme } from "@/lib/careerTheme";
import { MajorCategoryIcon } from "./MajorCategoryIcon";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Rows3,
} from "lucide-react";

interface CategorySectionProps {
  categoryName: string;
  track: "science" | "social_science";
  majors: MajorItem[];
  onSelectMajor?: (major: MajorItem) => void;
  compareList: MajorItem[];
  onToggleCompare: (major: MajorItem, checked: boolean) => void;
}

export function CategorySection({
  categoryName,
  track,
  majors,
  onSelectMajor,
  compareList,
  onToggleCompare,
}: CategorySectionProps) {
  if (majors.length === 0) return null;

  const theme = getCategoryTheme(categoryName, track);
  const cleanName = categoryName.split("(")[0].trim();
  const enName = categoryName.includes("(")
    ? categoryName.split("(")[1].replace(")", "")
    : "";

  // View Mode: 'carousel' (default) or 'grid'
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  // Carousel scroll ref & state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(majors.length > 1);

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener("resize", checkScrollState);
    return () => window.removeEventListener("resize", checkScrollState);
  }, [majors, viewMode]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).clientWidth + 16
        : 300;
      const scrollAmount = cardWidth * (window.innerWidth < 640 ? 1 : 2);

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 first:pt-0">
      {/* Category Section Header: Icon Tile + Name + Count + Carousel Navigation */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 pb-2 border-b-2 border-[#E6E8EC]">
        {/* Left: Category Icon + Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className={`w-8 h-8 min-w-8 sm:w-10 sm:h-10 sm:min-w-10 rounded-[10px] sm:rounded-[12px] flex items-center justify-center p-1.5 sm:p-2 border shadow-2xs ${theme.iconBgClass} ${theme.iconTextClass} ${theme.borderClass}`}
          >
            <MajorCategoryIcon
              category={categoryName}
              track={track}
              size="sm"
              className="w-full h-full"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <h2 className="text-[16px] sm:text-[19px] md:text-[21px] font-black text-[#1B2430] leading-snug truncate">
                {cleanName}
              </h2>
              {enName && (
                <span className="text-[11px] sm:text-[13px] font-semibold text-[#5B6675] hidden md:inline truncate">
                  • {enName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls & Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Count Badge */}
          <span
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[12px] font-black border shadow-2xs whitespace-nowrap ${theme.badgeClass}`}
          >
            {majors.length} មុខជំនាញ
          </span>

          {/* Carousel Left / Right Arrows (Shown in carousel mode) */}
          {viewMode === "carousel" && majors.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#E6E8EC] hover:bg-stone-50 text-[#1B2430] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                title="រមូរថយក្រោយ"
                aria-label="រមូរថយក្រោយ"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#E6E8EC] hover:bg-stone-50 text-[#1B2430] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                title="រមូរទៅមុខ"
                aria-label="រមូរទៅមុខ"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

          {/* View Mode Switcher: Carousel ↔ Grid */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] sm:rounded-[10px] bg-stone-100 hover:bg-stone-200 text-[#5B6675] hover:text-[#1B2430] flex items-center justify-center transition-colors shadow-2xs"
            title={
              viewMode === "carousel"
                ? "ប្ដូរទៅទិដ្ឋភាពក្រឡាចត្រង្គ (Switch to Grid)"
                : "ប្ដូរទៅទិដ្ឋភាពរំកិលផ្តេក Carousel (Switch to Carousel)"
            }
            aria-label="ប្ដូរទម្រង់បង្ហាញ"
          >
            {viewMode === "carousel" ? (
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Rows3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Content: Carousel Mode vs Grid Mode */}
      {viewMode === "carousel" ? (
        <div className="space-y-1.5">
          {/* Horizontal Carousel Track */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollState}
            className="flex gap-2.5 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-none items-stretch"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {majors.map((major) => {
              const isComparing = compareList.some((m) => m.id === major.id);
              const canCompare = compareList.length < 3 || isComparing;

              return (
                <div
                  key={major.id}
                  className="w-[78vw] max-w-[275px] sm:w-[305px] md:w-[325px] shrink-0 snap-start flex flex-col"
                >
                  <MajorCard
                    major={major}
                    onSelect={onSelectMajor}
                    isComparing={isComparing}
                    canCompare={canCompare}
                    onToggleCompare={onToggleCompare}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Hint when more than 1 card */}
          {majors.length > 1 && (
            <div className="flex sm:hidden items-center justify-between text-[11px] font-medium text-[#5B6675] px-1 pt-0.5">
              <span>👉 អូសផ្តេកដើម្បីមើល {majors.length} មុខជំនាញ (Swipe)</span>
              <span className="text-[10px] font-semibold text-stone-400">
                {canScrollRight ? "នៅសល់ទៀត →" : "ចប់ហើយ ✓"}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Grid Mode: Responsive Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {majors.map((major) => {
            const isComparing = compareList.some((m) => m.id === major.id);
            const canCompare = compareList.length < 3 || isComparing;

            return (
              <MajorCard
                key={major.id}
                major={major}
                onSelect={onSelectMajor}
                isComparing={isComparing}
                canCompare={canCompare}
                onToggleCompare={onToggleCompare}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
