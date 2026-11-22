"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MajorItem } from "@/types/career";
import { getCategoryTheme } from "@/lib/careerTheme";
import {
  X,
  ArrowRight,
  Scale,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Building2,
  ExternalLink,
  SlidersHorizontal,
  Columns,
  ListFilter,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface CompareBarProps {
  compareList: MajorItem[];
  onRemove: (majorId: string) => void;
  onClear: () => void;
}

export function CompareBar({ compareList, onRemove, onClear }: CompareBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabMobile, setActiveTabMobile] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"cards" | "matrix">("cards");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & prevent body scroll when modal open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // If compareList becomes empty, close modal automatically
  useEffect(() => {
    if (compareList.length === 0) {
      setIsModalOpen(false);
    } else if (activeTabMobile >= compareList.length) {
      setActiveTabMobile(0);
    }
  }, [compareList.length, activeTabMobile]);

  if (compareList.length === 0) return null;

  // Scroll to selected card on mobile when tab clicked
  const handleMobileTabClick = (index: number) => {
    setActiveTabMobile(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth * 0.88;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Listen to scroll events on mobile to update active tab dot
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.clientWidth * 0.88;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < compareList.length && newIndex !== activeTabMobile) {
        setActiveTabMobile(newIndex);
      }
    }
  };

  return (
    <>
      {/* 1. STICKY BOTTOM BAR */}
      <div className="compare-bar fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl bg-[#1B2430]/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-[16px] sm:rounded-[20px] shadow-2xl flex items-center justify-between gap-2 border border-stone-700 animate-in slide-in-from-bottom-5 duration-200 no-print">
        {/* Left Section: Icon + Counter & Preview Tags */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1F5BFF] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Scale className="w-4 h-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] sm:text-[14px] font-black tracking-tight text-white whitespace-nowrap">
                ប្រៀបធៀប ({compareList.length}/3)
              </span>
              <span className="text-[10px] text-stone-400 hidden sm:inline">
                មុខជំនាញ
              </span>
            </div>

            {/* Chips on Mobile & Tablet */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[10px] sm:text-xs text-stone-300 truncate mt-0.5">
              {compareList.map((m) => (
                <span
                  key={m.id}
                  className="inline-flex items-center gap-1 bg-stone-800/90 border border-stone-700 px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0 max-w-[110px] sm:max-w-[140px]"
                >
                  <span className="truncate">{m.major_name_kh}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(m.id);
                    }}
                    className="hover:text-red-400 p-0.5 rounded-full"
                    title={`ដកចេញ៖ ${m.major_name_kh}`}
                    aria-label={`ដកចេញ ${m.major_name_kh}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Clear & Compare Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] sm:text-xs text-stone-400 hover:text-white px-2 py-1.5 font-bold transition-colors whitespace-nowrap"
            title="សម្អាតទាំងអស់"
          >
            សម្អាត
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-[14px] bg-[#1F5BFF] hover:bg-[#1849D6] text-white text-[11px] sm:text-[13px] font-black flex items-center gap-1 sm:gap-1.5 shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <span>ប្រៀបធៀប</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. FULLY RESPONSIVE COMPARISON MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center bg-black/65 backdrop-blur-xs p-0 sm:p-4 md:p-6 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-5xl bg-[#FAF7F2] sm:bg-white sm:rounded-[24px] sm:border-2 sm:border-[#E6E8EC] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-5 border-b-2 border-[#E6E8EC] bg-white sm:bg-[#FAF7F2] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-xl bg-[#EAF1FF] border border-[#BAE6FD] text-[#1F5BFF] flex items-center justify-center shrink-0 shadow-2xs">
                  <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h2 className="text-[16px] sm:text-[20px] font-black text-[#1B2430] truncate">
                      តារាងប្រៀបធៀបមុខជំនាញ
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black bg-[#EAF1FF] text-[#1F5BFF] border border-[#BAE6FD] whitespace-nowrap">
                      {compareList.length} មុខជំនាញ
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-[13px] text-[#5B6675] truncate hidden xs:block">
                    ប្រៀបធៀបលក្ខណៈពិសេស មុខវិជ្ជាត្រៀម TVET និងទីផ្សារការងារ
                  </p>
                </div>
              </div>

              {/* View Mode Toggle & Close Button */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Switch between Card View and Attribute Table on Mobile/Desktop */}
                <div className="hidden sm:inline-flex p-1 rounded-xl bg-stone-100 border border-[#E6E8EC]">
                  <button
                    type="button"
                    onClick={() => setViewMode("cards")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      viewMode === "cards"
                        ? "bg-white text-[#1B2430] shadow-2xs"
                        : "text-[#5B6675] hover:text-[#1B2430]"
                    }`}
                  >
                    កាតទន្ទឹមគ្នា
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("matrix")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      viewMode === "matrix"
                        ? "bg-white text-[#1B2430] shadow-2xs"
                        : "text-[#5B6675] hover:text-[#1B2430]"
                    }`}
                  >
                    តារាងប្រៀបធៀប
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-full bg-stone-100 hover:bg-stone-200 text-[#1B2430] flex items-center justify-center transition-all shadow-2xs"
                  title="បិទផ្ទាំងប្រៀបធៀប"
                  aria-label="បិទផ្ទាំងប្រៀបធៀប"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Mobile View Switcher Sub-Bar (<640px) */}
            <div className="sm:hidden bg-white border-b border-[#E6E8EC] px-3 py-2 flex items-center justify-between gap-2 shrink-0">
              {/* Mobile Segmented Switcher for majors */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
                {compareList.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMobileTabClick(idx)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all whitespace-nowrap shrink-0 border ${
                      activeTabMobile === idx
                        ? "bg-[#1B2430] text-white border-[#1B2430] shadow-2xs"
                        : "bg-[#FAF7F2] text-[#5B6675] border-[#E6E8EC]"
                    }`}
                  >
                    #{idx + 1} {m.major_name_kh}
                  </button>
                ))}
              </div>

              {/* View Toggle on Mobile */}
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "cards" ? "matrix" : "cards")}
                className="px-2 py-1 rounded-lg text-[10px] font-black bg-stone-100 hover:bg-stone-200 text-[#1B2430] border border-[#E6E8EC] shrink-0"
              >
                {viewMode === "cards" ? "តារាង" : "កាត"}
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
              {/* VIEW 1: COMPARISON CARDS (Swipeable on mobile, Grid on desktop) */}
              {viewMode === "cards" && (
                <>
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className={`
                      flex sm:grid gap-3 sm:gap-5 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory pb-2 sm:pb-0 scrollbar-none
                    `}
                    style={{
                      gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {compareList.map((major, idx) => {
                      const theme = getCategoryTheme(major.category, major.track);
                      const isScience = major.track === "science";
                      const careerCount = major.career_positions ? major.career_positions.length : 0;
                      const hasTvet = major.tvet_equivalent && major.tvet_equivalent.length > 0;

                      return (
                        <div
                          key={major.id}
                          className={`
                            w-[86vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:shrink sm:min-w-0
                            flex flex-col justify-between rounded-[16px] sm:rounded-[20px] border-2 bg-white p-3.5 sm:p-5 shadow-xs transition-all
                            ${activeTabMobile === idx ? "border-[#1F5BFF]/70" : "border-[#E6E8EC]"}
                          `}
                        >
                          <div className="space-y-3">
                            {/* Card Header: Category Badge + Remove button */}
                            <div className="flex items-start justify-between gap-2 border-b border-[#E6E8EC] pb-2.5">
                              <div className="min-w-0 flex-1">
                                <span
                                  className={`inline-block text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap mb-1 ${theme.badgeClass}`}
                                >
                                  #{String(major.number).padStart(2, "0")} • {major.category.split("(")[0].trim()}
                                </span>
                                <h3 className="text-[15px] sm:text-[18px] font-black text-[#1B2430] leading-snug line-clamp-2">
                                  {major.major_name_kh}
                                </h3>
                                <p className="text-[11px] sm:text-[12px] font-semibold text-[#5B6675] truncate">
                                  {major.major_name_en}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => onRemove(major.id)}
                                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-500 flex items-center justify-center transition-colors shrink-0"
                                title="ដកចេញពីការប្រៀបធៀប"
                                aria-label={`ដក ${major.major_name_kh} ចេញ`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Track Tag & Duration */}
                            <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                              <span className="px-2 py-0.5 rounded-full bg-stone-100 font-bold text-[#5B6675]">
                                {isScience ? "គន្លងវិទ្យាសាស្ត្រ" : "គន្លងវិទ្យាសាស្ត្រសង្គម"}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-stone-100 font-bold text-[#5B6675]">
                                ៤ ឆ្នាំ (បរិញ្ញាបត្រ)
                              </span>
                            </div>

                            {/* Description Summary */}
                            <div className="p-2.5 rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] space-y-1">
                              <span className="text-[10px] font-black text-[#5B6675] uppercase tracking-wider block">
                                សេចក្តីសង្ខេប
                              </span>
                              <p className="text-[11px] sm:text-[12px] text-[#1B2430] leading-[18px] sm:leading-[20px] font-medium line-clamp-3 khmer-content">
                                {major.description_kh}
                              </p>
                            </div>

                            {/* High School Subjects Prep */}
                            <div className="space-y-1 pt-2 border-t border-[#E6E8EC]">
                              <span className="text-[10px] sm:text-[11px] font-black text-[#1B2430] uppercase tracking-wider flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#1F5BFF]" />
                                <span>មុខវិជ្ជាស្នូលត្រូវត្រៀម៖</span>
                              </span>
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {major.high_school_subjects && major.high_school_subjects.length > 0 ? (
                                  major.high_school_subjects.map((sub, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 rounded-full bg-white border border-[#E6E8EC] text-[10px] sm:text-[11px] font-bold text-[#1B2430] shadow-2xs"
                                    >
                                      {sub}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[11px] text-[#5B6675]">មិនមានទិន្នន័យ</span>
                                )}
                              </div>
                            </div>

                            {/* TVET Equivalent Pathway */}
                            <div className="space-y-1 pt-2 border-t border-[#E6E8EC]">
                              <span className="text-[10px] sm:text-[11px] font-black text-[#1B2430] uppercase tracking-wider flex items-center gap-1">
                                <GraduationCap className="w-3 h-3 text-[#1E9E6A]" />
                                <span>គន្លង TVET៖</span>
                              </span>
                              {hasTvet ? (
                                <div className="flex flex-wrap gap-1">
                                  {major.tvet_equivalent!.map((t, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 rounded-full bg-[#E8F8F0] border border-[#A7F3D0] text-[10px] sm:text-[11px] font-bold text-[#047857]"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-[11px] text-[#5B6675] font-medium">
                                  សិក្សាកម្រិតបរិញ្ញាបត្រ
                                </p>
                              )}
                            </div>

                            {/* Career Positions */}
                            <div className="space-y-1 pt-2 border-t border-[#E6E8EC]">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] sm:text-[11px] font-black text-[#1B2430] uppercase tracking-wider">
                                  ឱកាសការងារគំរូ ({careerCount})
                                </span>
                              </div>
                              <ul className="space-y-1 text-[11px] text-[#1B2430] font-medium pt-0.5">
                                {major.career_positions && major.career_positions.slice(0, 4).map((pos, i) => (
                                  <li key={i} className="flex items-start gap-1.5 leading-snug">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E6A] shrink-0 mt-0.5" />
                                    <span className="truncate">{pos}</span>
                                  </li>
                                ))}
                                {careerCount > 4 && (
                                  <li className="text-[10px] text-[#5B6675] pl-5">
                                    + {careerCount - 4} មុខតំណែងទៀត
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Workplaces */}
                            {major.workplaces && major.workplaces.length > 0 && (
                              <div className="space-y-1 pt-2 border-t border-[#E6E8EC]">
                                <span className="text-[10px] sm:text-[11px] font-black text-[#1B2430] uppercase tracking-wider flex items-center gap-1">
                                  <Building2 className="w-3 h-3 text-[#5B6675]" />
                                  <span>ស្ថាប័នការងារ៖</span>
                                </span>
                                <p className="text-[11px] text-[#5B6675] leading-snug line-clamp-2">
                                  {major.workplaces.join(", ")}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Detail Link Button */}
                          <div className="pt-3 mt-3 border-t border-[#E6E8EC]">
                            <Link
                              href={`/careers/${major.id}`}
                              className="w-full min-h-[38px] px-3 py-1.5 rounded-[12px] bg-[#EAF1FF] hover:bg-[#1F5BFF] text-[#1F5BFF] hover:text-white text-[12px] font-black flex items-center justify-center gap-1.5 transition-all shadow-2xs group"
                            >
                              <span>មើលលម្អិតមុខជំនាញ</span>
                              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Swipe Indicator Dots & Hint */}
                  <div className="sm:hidden flex flex-col items-center gap-1.5 pt-1 pb-2">
                    <div className="flex items-center gap-1.5">
                      {compareList.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleMobileTabClick(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            activeTabMobile === idx ? "w-6 bg-[#1F5BFF]" : "w-1.5 bg-stone-300"
                          }`}
                          aria-label={`ទៅកាន់ជំនាញទី ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-medium text-[#5B6675]">
                      👉 អូសទៅឆ្វេង/ស្តាំ ដើម្បីពិនិត្យមុខជំនាញនីមួយៗ
                    </span>
                  </div>
                </>
              )}

              {/* VIEW 2: ATTRIBUTE MATRIX TABLE (Responsive feature-by-feature comparison) */}
              {viewMode === "matrix" && (
                <div className="bg-white rounded-[16px] sm:rounded-[20px] border-2 border-[#E6E8EC] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#FAF7F2] border-b-2 border-[#E6E8EC]">
                          <th className="p-3 font-black text-[#5B6675] uppercase tracking-wider w-[120px] sm:w-[160px] sticky left-0 bg-[#FAF7F2] z-10 border-r border-[#E6E8EC]">
                            លក្ខណៈ
                          </th>
                          {compareList.map((m) => (
                            <th key={m.id} className="p-3 font-black text-[#1B2430] min-w-[200px] border-r border-[#E6E8EC] last:border-r-0">
                              <div className="text-[13px] font-black">{m.major_name_kh}</div>
                              <div className="text-[10px] text-[#5B6675] font-semibold">{m.major_name_en}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E8EC]">
                        {/* Row 1: Track */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            គន្លងសិក្សា
                          </td>
                          {compareList.map((m) => (
                            <td key={m.id} className="p-3 font-medium border-r border-[#E6E8EC] last:border-r-0">
                              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[11px] font-bold">
                                {m.track === "science" ? "វិទ្យាសាស្ត្រ" : "វិទ្យាសាស្ត្រសង្គម"}
                              </span>
                            </td>
                          ))}
                        </tr>

                        {/* Row 2: Category */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            ក្រុមវិស័យ
                          </td>
                          {compareList.map((m) => {
                            const theme = getCategoryTheme(m.category, m.track);
                            return (
                              <td key={m.id} className="p-3 font-medium border-r border-[#E6E8EC] last:border-r-0">
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${theme.badgeClass}`}>
                                  {m.category.split("(")[0].trim()}
                                </span>
                              </td>
                            );
                          })}
                        </tr>

                        {/* Row 3: High School Subjects */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            មុខវិជ្ជាត្រូវត្រៀម
                          </td>
                          {compareList.map((m) => (
                            <td key={m.id} className="p-3 font-medium border-r border-[#E6E8EC] last:border-r-0">
                              <div className="flex flex-wrap gap-1">
                                {m.high_school_subjects.map((sub, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E6E8EC] text-[10px] font-bold">
                                    {sub}
                                  </span>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Row 4: TVET */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            សញ្ញាបត្រ TVET
                          </td>
                          {compareList.map((m) => (
                            <td key={m.id} className="p-3 font-medium border-r border-[#E6E8EC] last:border-r-0">
                              {m.tvet_equivalent && m.tvet_equivalent.length > 0 ? (
                                <span className="text-[#047857] font-bold text-[11px]">
                                  {m.tvet_equivalent.join(", ")}
                                </span>
                              ) : (
                                <span className="text-[#5B6675] text-[11px]">
                                  កម្រិតបរិញ្ញាបត្រ
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>

                        {/* Row 5: Career count */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            អាជីពការងារ
                          </td>
                          {compareList.map((m) => (
                            <td key={m.id} className="p-3 font-medium border-r border-[#E6E8EC] last:border-r-0">
                              <div className="font-black text-[#1F5BFF] mb-1">
                                {m.career_positions ? m.career_positions.length : 0} មុខតំណែង
                              </div>
                              <ul className="space-y-0.5 text-[11px] text-[#1B2430]">
                                {m.career_positions?.slice(0, 3).map((pos, i) => (
                                  <li key={i} className="truncate">• {pos}</li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>

                        {/* Row 6: Workplaces */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            ស្ថាប័នការងារ
                          </td>
                          {compareList.map((m) => (
                            <td key={m.id} className="p-3 font-medium border-r border-[#E6E8EC] last:border-r-0 text-[11px] text-[#5B6675]">
                              {m.workplaces ? m.workplaces.join(", ") : "ស្ថាប័នរដ្ឋ និងឯកជន"}
                            </td>
                          ))}
                        </tr>

                        {/* Row 7: Action */}
                        <tr>
                          <td className="p-3 font-bold text-[#5B6675] sticky left-0 bg-white border-r border-[#E6E8EC]">
                            សកម្មភាព
                          </td>
                          {compareList.map((m) => (
                            <td key={m.id} className="p-3 border-r border-[#E6E8EC] last:border-r-0">
                              <Link
                                href={`/careers/${m.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1F5BFF] text-white text-[11px] font-black shadow-2xs hover:bg-[#1849D6]"
                              >
                                <span>មើលលម្អិត</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Sticky Footer */}
            <div className="p-3 sm:p-4 bg-white sm:bg-[#FAF7F2] border-t-2 border-[#E6E8EC] flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={onClear}
                className="px-3.5 sm:px-4 py-2 rounded-[12px] border-2 border-[#E6E8EC] bg-white hover:bg-stone-50 text-[#5B6675] hover:text-red-500 text-xs sm:text-[13px] font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>សម្អាតទាំងអស់</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="min-h-[38px] sm:min-h-[42px] px-5 sm:px-6 py-2 rounded-[12px] bg-[#1B2430] hover:bg-stone-800 text-white text-xs sm:text-[13px] font-black shadow-sm transition-all active:scale-95"
              >
                បិទផ្ទាំងប្រៀបធៀប
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
