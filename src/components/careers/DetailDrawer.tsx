"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MajorItem } from "@/types/career";
import { getCategoryTheme } from "@/lib/careerTheme";
import { CareerAvatar } from "./CareerAvatar";
import {
  X,
  Printer,
  Share2,
  Bookmark,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  TrendingUp,
  Award,
  Layers,
  ExternalLink,
  Check,
} from "lucide-react";

interface DetailDrawerProps {
  major: MajorItem | null;
  onClose: () => void;
  onSelectRelated?: (majorName: string) => void;
}

export function DetailDrawer({ major, onClose, onSelectRelated }: DetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<"careers" | "pathway" | "workplaces" | "overview">("careers");
  const [isSaved, setIsSaved] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (major) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      // Check shortlist status from localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("career_shortlist") || "[]");
        setIsSaved(saved.some((item: { id: string }) => item.id === major.id));
      } catch (err) {
        console.error(err);
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [major, onClose]);

  if (!major) return null;

  const theme = getCategoryTheme(major.category, major.track);
  const isScience = major.track === "science";
  const hasTvet = major.tvet_equivalent && major.tvet_equivalent.length > 0;

  const handleToggleShortlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("career_shortlist") || "[]");
      let updated;
      if (isSaved) {
        updated = saved.filter((item: { id: string }) => item.id !== major.id);
        setIsSaved(false);
      } else {
        updated = [...saved, { id: major.id, nameKh: major.major_name_kh, track: major.track, category: major.category }];
        setIsSaved(true);
      }
      localStorage.setItem("career_shortlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("shortlistUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${major.major_name_kh} (${major.major_name_en})`,
          text: `ស្វែងយល់ពីមុខជំនាញ ${major.major_name_kh} លើប្រព័ន្ធតម្រង់ទិសអាជីព MoEYS`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share skipped", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("បានចម្លងតំណភ្ជាប់រួចរាល់!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      {/* Backdrop for Desktop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container: Full page on mobile (<640px), 560px right drawer on desktop */}
      <div
        role="dialog"
        aria-modal="true"
        className="detail-drawer-container fixed inset-y-0 right-0 w-full sm:w-[560px] sm:max-w-full bg-white shadow-2xl flex flex-col z-50 border-l border-[#E6E8EC] animate-in slide-in-from-right duration-300"
      >
        {/* 1. STICKY HEADER */}
        <div className="sticky top-0 z-20 bg-white border-b border-[#E6E8EC] p-3 sm:p-4 flex items-start justify-between gap-2.5 shadow-2xs">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className={`text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${theme.badgeClass}`}
              >
                #{String(major.number).padStart(2, "0")} • {major.category.split("(")[0].trim()}
              </span>

              <span className="text-[10px] sm:text-[11px] font-bold text-[#5B6675]">
                {isScience ? "វិទ្យាសាស្ត្រពិត" : "វិទ្យាសាស្ត្រសង្គម"}
              </span>
            </div>

            <h1 className="text-[17px] sm:text-[20px] font-black text-[#1B2430] leading-snug truncate">
              {major.major_name_kh}
            </h1>
            <p className="text-[11px] sm:text-[12px] font-semibold text-[#5B6675] truncate">
              {major.major_name_en}
            </p>
          </div>

          {/* Action Icons + Close Button */}
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <button
              type="button"
              onClick={handlePrint}
              className="w-8 h-8 rounded-[10px] bg-stone-100 hover:bg-stone-200/70 text-[#1B2430] flex items-center justify-center transition-colors"
              title="បោះពុម្ព / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <Link
              href={`/careers/${major.id}`}
              className="w-8 h-8 rounded-[10px] bg-stone-100 hover:bg-stone-200/70 text-[#1B2430] flex items-center justify-center transition-colors"
              title="បើកក្នុងទំព័រពេញលេញ"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="w-8 h-8 rounded-[10px] bg-stone-100 hover:bg-stone-200/70 text-[#1B2430] flex items-center justify-center transition-colors"
              title="ចែករំលែក"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-[10px] bg-stone-100 hover:bg-stone-200 text-[#1B2430] flex items-center justify-center transition-colors ml-0.5"
              title="បិទ"
              aria-label="បិទ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. HERO STRIP: Compact Avatar + Description + 3 Fact Tiles */}
        <div className="bg-[#FAF7F2] p-3 sm:p-4 border-b border-[#E6E8EC] space-y-2.5 shrink-0">
          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white border border-[#E6E8EC] p-1 flex items-center justify-center shrink-0 shadow-2xs">
              <CareerAvatar major={major} size="sm" className="w-full h-full object-contain" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] sm:text-[13px] text-[#1B2430] leading-[19px] sm:leading-[22px] line-clamp-3 font-medium khmer-content">
                {major.description_kh}
              </p>
            </div>
          </div>

          {/* 3 Quick-Fact Tiles */}
          <div className="grid grid-cols-3 gap-1.5 pt-0.5">
            <div className="p-1.5 sm:p-2 rounded-[10px] bg-white border border-[#E6E8EC] text-center shadow-2xs">
              <Clock className="w-3 h-3 text-[#1F5BFF] mx-auto mb-0.5" />
              <span className="block text-[9px] font-bold text-[#5B6675]">រយៈពេលសិក្សា</span>
              <span className="block text-[11px] sm:text-[12px] font-black text-[#1B2430] truncate">៤ ឆ្នាំ</span>
            </div>

            {/* Tile 2: Career Opportunities (Verified from JSON data) */}
            <div className="p-1.5 sm:p-2 rounded-[10px] bg-white border border-[#E6E8EC] text-center shadow-2xs">
              <Briefcase className="w-3 h-3 text-[#1E9E6A] mx-auto mb-0.5" />
              <span className="block text-[9px] font-bold text-[#5B6675]">ឱកាសការងារ</span>
              <span className="block text-[11px] sm:text-[12px] font-black text-[#1B2430] truncate">
                {major.career_positions ? major.career_positions.length : 0} មុខរបរ
              </span>
            </div>

            <div className="p-1.5 sm:p-2 rounded-[10px] bg-white border border-[#E6E8EC] text-center shadow-2xs">
              <TrendingUp className="w-3 h-3 text-[#E37400] mx-auto mb-0.5" />
              <span className="block text-[9px] font-bold text-[#5B6675]">ទីផ្សារ</span>
              <span className="block text-[11px] sm:text-[12px] font-black text-[#1B2430] truncate">កម្រិតខ្ពស់</span>
            </div>
          </div>
        </div>

        {/* 3. STICKY IN-PAGE TABS */}
        <div className="sticky top-[61px] sm:top-[68px] z-10 bg-white border-b border-[#E6E8EC] px-3 sm:px-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("careers")}
            className={`min-h-[36px] px-2.5 text-[11px] sm:text-[12px] font-black border-b-2 transition-all whitespace-nowrap ${
              activeTab === "careers"
                ? "border-[#1F5BFF] text-[#1F5BFF]"
                : "border-transparent text-[#5B6675] hover:text-[#1B2430]"
            }`}
          >
            💼 អាជីព ({major.career_positions ? major.career_positions.length : 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pathway")}
            className={`min-h-[36px] px-2.5 text-[11px] sm:text-[12px] font-black border-b-2 transition-all whitespace-nowrap ${
              activeTab === "pathway"
                ? "border-[#1F5BFF] text-[#1F5BFF]"
                : "border-transparent text-[#5B6675] hover:text-[#1B2430]"
            }`}
          >
            📚 មុខវិជ្ជា & TVET
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("workplaces")}
            className={`min-h-[36px] px-2.5 text-[11px] sm:text-[12px] font-black border-b-2 transition-all whitespace-nowrap ${
              activeTab === "workplaces"
                ? "border-[#1F5BFF] text-[#1F5BFF]"
                : "border-transparent text-[#5B6675] hover:text-[#1B2430]"
            }`}
          >
            🏢 កន្លែងធ្វើការ
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`min-h-[36px] px-2.5 text-[11px] sm:text-[12px] font-black border-b-2 transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#1F5BFF] text-[#1F5BFF]"
                : "border-transparent text-[#5B6675] hover:text-[#1B2430]"
            }`}
          >
            ℹ️ ទិដ្ឋភាពទូទៅ
          </button>
        </div>

        {/* 4. SCROLLABLE TAB CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5">
          {/* TAB 1: CAREERS */}
          {activeTab === "careers" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] sm:text-[16px] font-black text-[#1B2430]">
                  ឱកាសការងារ និងមុខតំណែង (Career Opportunities)
                </h3>
                <span className="text-[10px] font-bold text-[#5B6675] bg-stone-100 px-2 py-0.5 rounded-full">
                  {major.career_positions ? major.career_positions.length : 0} មុខរបរ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {major.career_positions && major.career_positions.length > 0 ? (
                  major.career_positions.map((pos, idx) => (
                    <div
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-[10px] bg-[#FAF7F2] border border-[#E6E8EC] hover:border-[#1F5BFF] transition-all flex items-center gap-2 shadow-2xs group"
                    >
                      <span className="w-5 h-5 rounded-[6px] bg-white border border-[#E6E8EC] flex items-center justify-center text-[#1F5BFF] shrink-0 font-black text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-black text-[#1B2430] truncate group-hover:text-[#1F5BFF]">
                        {pos}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-[#5B6675]">មិនមានទិន្នន័យមុខតំណែង</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PATHWAY & TVET */}
          {activeTab === "pathway" && (
            <div className="space-y-3">
              {/* High School Prep */}
              <div className="p-3 rounded-[14px] bg-[#FAF7F2] border border-[#E6E8EC] space-y-2">
                <div className="flex items-center gap-1.5 text-[#1F5BFF]">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="text-[13px] font-black text-[#1B2430]">
                    មុខវិជ្ជាត្រូវត្រៀមក្នុងវិទ្យាល័យ
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {major.high_school_subjects && major.high_school_subjects.length > 0 ? (
                    major.high_school_subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="min-h-[28px] px-2.5 py-0.5 rounded-full bg-white border border-[#E6E8EC] text-[11px] font-bold text-[#1B2430] flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1F5BFF]" />
                        <span>{sub}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-[#5B6675]">មុខវិជ្ជាទូទៅ</span>
                  )}
                </div>
              </div>

              {/* TVET */}
              <div className="p-3 rounded-[14px] bg-[#FAF7F2] border border-[#E6E8EC] space-y-2">
                <div className="flex items-center gap-1.5 text-[#1E9E6A]">
                  <GraduationCap className="w-4 h-4" />
                  <h4 className="text-[13px] font-black text-[#1B2430]">
                    គន្លងបច្ចេកទេស និងវិជ្ជាជីវៈ (TVET)
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {hasTvet ? (
                    major.tvet_equivalent.map((tvet, i) => (
                      <span
                        key={i}
                        className="min-h-[28px] px-2.5 py-0.5 rounded-full bg-[#E8F8F0] border border-[#A7F3D0] text-[11px] font-black text-[#047857] flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{tvet}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] font-medium text-[#5B6675]">
                      ជំនាញនេះតម្រូវឱ្យសិក្សាកម្រិតបរិញ្ញាបត្រ ៤ ឆ្នាំនៅសាកលវិទ្យាល័យ
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORKPLACES */}
          {activeTab === "workplaces" && (
            <div className="space-y-3">
              <h4 className="text-[13px] font-black text-[#1B2430] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#5B6675]" />
                <span>ស្ថាប័ន និងកន្លែងធ្វើការគំរូ</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {major.workplaces && major.workplaces.length > 0 ? (
                  major.workplaces.map((wp, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-[10px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] font-bold text-[#1B2430] flex items-center gap-1.5"
                    >
                      <Building2 className="w-3 h-3 text-[#5B6675]" />
                      <span>{wp}</span>
                    </span>
                  ))
                ) : (
                  <p className="text-[11px] text-[#5B6675]">ស្ថាប័នរដ្ឋ និងឯកជន</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-3">
              <h4 className="text-[13px] font-black text-[#1B2430]">
                អំពីមុខជំនាញសិក្សា
              </h4>
              <p className="text-[12px] text-[#1B2430] leading-relaxed p-3 rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] khmer-content">
                {major.description_kh}
              </p>
            </div>
          )}
        </div>

        {/* 5. STICKY FOOTER */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-[#E6E8EC] p-3 flex items-center gap-2 shadow-lg">
          <Link
            href={`/careers/${major.id}`}
            className="flex-1 min-h-[40px] px-3 rounded-[10px] border border-[#E6E8EC] bg-white hover:bg-stone-50 text-[#1B2430] text-[12px] font-black flex items-center justify-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>មើលទំព័រពេញ</span>
          </Link>

          <button
            type="button"
            onClick={handleToggleShortlist}
            className={`flex-1 min-h-[40px] px-3 rounded-[10px] text-white text-[12px] font-black flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98 ${
              isSaved
                ? "bg-[#1E9E6A] hover:bg-[#168156]"
                : "bg-[#1F5BFF] hover:bg-[#1849D6]"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{isSaved ? "បានរក្សាទុក ✓" : "រក្សាទុក"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
