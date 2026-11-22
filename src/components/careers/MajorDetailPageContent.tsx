"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MajorItem } from "@/types/career";
import { PlatformNavbar } from "@/components/shared/PlatformNavbar";
import { getCategoryTheme } from "@/lib/careerTheme";
import { CareerAvatar } from "./CareerAvatar";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Printer,
  Share2,
  Bookmark,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Briefcase,
  Building2,
  Clock,
  TrendingUp,
  Award,
  Layers,
  Check,
} from "lucide-react";

interface MajorDetailPageContentProps {
  major: MajorItem;
  prevMajor: MajorItem | null;
  nextMajor: MajorItem | null;
  relatedMajors: MajorItem[];
}

export function MajorDetailPageContent({
  major,
  prevMajor,
  nextMajor,
  relatedMajors,
}: MajorDetailPageContentProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"careers" | "pathway" | "workplaces" | "related">("careers");
  const [isSaved, setIsSaved] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const theme = getCategoryTheme(major.category, major.track);
  const isScience = major.track === "science";
  const backHref = isScience ? "/careers/science" : "/careers/social";
  const hasTvet = major.tvet_equivalent && major.tvet_equivalent.length > 0;

  // Check shortlist state from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("career_shortlist") || "[]");
      setIsSaved(saved.some((item: { id: string }) => item.id === major.id));
    } catch {
      setIsSaved(false);
    }
  }, [major.id]);

  const handleToggleShortlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("career_shortlist") || "[]");
      let updated;
      if (isSaved) {
        updated = saved.filter((item: { id: string }) => item.id !== major.id);
        setIsSaved(false);
      } else {
        updated = [
          ...saved,
          {
            id: major.id,
            nameKh: major.major_name_kh,
            track: major.track,
            category: major.category,
          },
        ];
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
        console.log("Share cancelled or skipped", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const scrollToSection = (sectionId: "careers" | "pathway" | "workplaces" | "related") => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -90; // offset for sticky navbar/pills
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B2430] pb-28 sm:pb-24 selection:bg-[#EAF1FF] selection:text-[#1F5BFF]">
      {/* 1. Header Navigation */}
      <PlatformNavbar />

      <main className="max-w-[1100px] mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 space-y-3.5 sm:space-y-6">
        {/* Breadcrumb & Navigation Controls */}
        <div className="flex items-center justify-between gap-2 no-print">
          {/* Breadcrumb - Sleek & Compact for Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-bold text-[#5B6675] min-w-0">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white hover:bg-stone-50 border border-[#E6E8EC] text-[#1B2430] shadow-2xs transition-all active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#5B6675]" />
              <span className="hidden xs:inline">ត្រឡប់ទៅបញ្ជី</span>
              <span className="xs:hidden">ត្រឡប់</span>
            </Link>

            <span className="text-stone-300 hidden sm:inline">/</span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[#5B6675]">
              {isScience ? "🔬 ផ្នែកវិទ្យាសាស្ត្រ" : "📚 ផ្នែកវិទ្យាសាស្ត្រសង្គម"}
            </span>

            <span className="text-stone-300 hidden sm:inline">/</span>

            <span className="text-[#1B2430] font-black truncate max-w-[140px] sm:max-w-[220px]">
              {major.major_name_kh}
            </span>
          </div>

          {/* Top Actions: Prev/Next Quick Switcher + Share & Shortlist */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {prevMajor && (
              <Link
                href={`/careers/${prevMajor.id}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-50 border border-[#E6E8EC] text-[#1B2430] flex items-center justify-center shadow-2xs transition-all active:scale-95"
                title={`ជំនាញមុន៖ ${prevMajor.major_name_kh}`}
                aria-label="ជំនាញមុន"
              >
                <ChevronLeft className="w-4 h-4 text-[#5B6675]" />
              </Link>
            )}

            {nextMajor && (
              <Link
                href={`/careers/${nextMajor.id}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-50 border border-[#E6E8EC] text-[#1B2430] flex items-center justify-center shadow-2xs transition-all active:scale-95"
                title={`ជំនាញបន្ទាប់៖ ${nextMajor.major_name_kh}`}
                aria-label="ជំនាញបន្ទាប់"
              >
                <ChevronRight className="w-4 h-4 text-[#5B6675]" />
              </Link>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-[#E6E8EC] text-[#1B2430] items-center justify-center shadow-2xs transition-all"
              title="បោះពុម្ព / Save as PDF"
            >
              <Printer className="w-4 h-4 text-[#5B6675]" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-50 border border-[#E6E8EC] text-[#1B2430] flex items-center justify-center shadow-2xs transition-all active:scale-95"
              title="ចែករំលែក"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B6675]" />
            </button>

            <button
              type="button"
              onClick={handleToggleShortlist}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-black transition-all shadow-xs active:scale-95 ${
                isSaved
                  ? "bg-[#1E9E6A] text-white hover:bg-[#168156]"
                  : "bg-[#1F5BFF] text-white hover:bg-[#1849D6]"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isSaved ? "បានរក្សាទុក ✓" : "រក្សាទុក"}</span>
            </button>
          </div>
        </div>

        {/* 2. HERO CARD - Crisp, Scannable & Space-Efficient */}
        <section className="bg-white rounded-[16px] sm:rounded-[24px] border-2 border-[#E6E8EC] p-3.5 sm:p-6 md:p-7 shadow-xs space-y-3.5 sm:space-y-5 relative overflow-hidden">
          {/* Top Pill Row: Category Badge + Track + Rank */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E8EC] pb-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span
                className={`text-[11px] sm:text-[12px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs whitespace-nowrap ${theme.badgeClass}`}
              >
                #{String(major.number).padStart(2, "0")} • {major.category.split("(")[0].trim()}
              </span>

              <span className="text-[10px] sm:text-[12px] font-bold text-[#5B6675] bg-stone-100 px-2 py-0.5 rounded-full">
                {isScience ? "វិទ្យាសាស្ត្រពិត" : "វិទ្យាសាស្ត្រសង្គម"}
              </span>

              {hasTvet && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#047857] border border-[#A7F3D0] text-[10px] sm:text-[11px] font-black shadow-2xs">
                  <GraduationCap className="w-3 h-3" />
                  <span>មានគន្លង TVET</span>
                </span>
              )}
            </div>

            {/* Bookmark button on tablet/desktop */}
            <button
              type="button"
              onClick={handleToggleShortlist}
              className={`sm:hidden inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all ${
                isSaved
                  ? "bg-[#E8F8F0] text-[#047857] border border-[#A7F3D0]"
                  : "bg-[#EAF1FF] text-[#1F5BFF] border border-[#BAE6FD]"
              }`}
            >
              <Bookmark className="w-3 h-3 fill-current" />
              <span>{isSaved ? "រក្សាទុករួច" : "រក្សាទុក"}</span>
            </button>
          </div>

          {/* Titles & Compact Avatar Header */}
          <div className="flex items-start gap-3 sm:gap-5">
            {/* Visual Avatar / Icon - Compact and beautiful */}
            <div className="shrink-0 pt-0.5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[14px] sm:rounded-[18px] bg-[#FAF7F2] border-2 border-[#E6E8EC] p-1.5 sm:p-2 flex items-center justify-center shadow-2xs overflow-hidden">
                <CareerAvatar major={major} size="sm" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Major Titles & Summary */}
            <div className="min-w-0 flex-1 space-y-1">
              <h1 className="text-[18px] sm:text-[26px] md:text-[30px] font-black text-[#1B2430] leading-[26px] sm:leading-[34px] md:leading-[38px] tracking-tight">
                {major.major_name_kh}
              </h1>
              <p className="text-[12px] sm:text-[14px] md:text-[15px] font-bold text-[#5B6675]">
                {major.major_name_en}
              </p>
              <p className="text-[12px] sm:text-[14px] text-[#1B2430] leading-[20px] sm:leading-[24px] font-medium pt-1 line-clamp-3 sm:line-clamp-none khmer-content">
                {major.description_kh}
              </p>
            </div>
          </div>

          {/* 3 Quick-Fact Metric Tiles - Scannable at a Glance */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-1">
            {/* Fact 1: Duration */}
            <div className="p-2 sm:p-3 rounded-[12px] sm:rounded-[16px] bg-[#FAF7F2] border border-[#E6E8EC] text-center shadow-2xs flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-1 text-[#1F5BFF] mb-0.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#5B6675]">រយៈពេលសិក្សា</span>
              </div>
              <span className="text-[12px] sm:text-[15px] font-black text-[#1B2430] truncate">
                ៤ ឆ្នាំ
              </span>
              <span className="text-[9px] sm:text-[11px] font-medium text-[#5B6675] hidden xs:block">
                កម្រិតបរិញ្ញាបត្រ
              </span>
            </div>

            {/* Fact 2: Career Opportunities Count (Verified from JSON data) */}
            <div className="p-2 sm:p-3 rounded-[12px] sm:rounded-[16px] bg-[#FAF7F2] border border-[#E6E8EC] text-center shadow-2xs flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-1 text-[#1E9E6A] mb-0.5">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#5B6675]">ឱកាសការងារ</span>
              </div>
              <span className="text-[12px] sm:text-[15px] font-black text-[#1B2430] truncate">
                {major.career_positions ? major.career_positions.length : 0} មុខរបរ
              </span>
              <span className="text-[9px] sm:text-[11px] font-medium text-[#5B6675] hidden xs:block">
                មុខតំណែងជាក់ស្តែង
              </span>
            </div>

            {/* Fact 3: Market Demand */}
            <div className="p-2 sm:p-3 rounded-[12px] sm:rounded-[16px] bg-[#FAF7F2] border border-[#E6E8EC] text-center shadow-2xs flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-1 text-[#E37400] mb-0.5">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#5B6675]">តម្រូវការទីផ្សារ</span>
              </div>
              <span className="text-[12px] sm:text-[15px] font-black text-[#1B2430] truncate">
                កម្រិតខ្ពស់
              </span>
              <span className="text-[9px] sm:text-[11px] font-medium text-[#5B6675] hidden xs:block">
                ទីផ្សារការងារទូលំទូលាយ
              </span>
            </div>
          </div>
        </section>

        {/* 3. STICKY QUICK ANCHOR TABS - Instant Thumb Jumping */}
        <div className="sticky top-14 sm:top-16 z-20 bg-[#FAF7F2]/95 backdrop-blur-md py-1.5 no-print">
          <div className="bg-white rounded-[12px] sm:rounded-[18px] border-2 border-[#E6E8EC] p-1 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => scrollToSection("careers")}
              className={`min-h-[34px] sm:min-h-[40px] flex-1 px-2.5 sm:px-3 py-1 rounded-[8px] sm:rounded-[12px] text-[11px] sm:text-[13px] font-black transition-all whitespace-nowrap active:scale-95 ${
                activeSection === "careers"
                  ? "bg-[#1F5BFF] text-white shadow-xs"
                  : "text-[#5B6675] hover:text-[#1B2430] hover:bg-stone-50"
              }`}
            >
              💼 អាជីព ({major.career_positions ? major.career_positions.length : 0})
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("pathway")}
              className={`min-h-[34px] sm:min-h-[40px] flex-1 px-2.5 sm:px-3 py-1 rounded-[8px] sm:rounded-[12px] text-[11px] sm:text-[13px] font-black transition-all whitespace-nowrap active:scale-95 ${
                activeSection === "pathway"
                  ? "bg-[#1F5BFF] text-white shadow-xs"
                  : "text-[#5B6675] hover:text-[#1B2430] hover:bg-stone-50"
              }`}
            >
              📚 មុខវិជ្ជា & TVET
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("workplaces")}
              className={`min-h-[34px] sm:min-h-[40px] flex-1 px-2.5 sm:px-3 py-1 rounded-[8px] sm:rounded-[12px] text-[11px] sm:text-[13px] font-black transition-all whitespace-nowrap active:scale-95 ${
                activeSection === "workplaces"
                  ? "bg-[#1F5BFF] text-white shadow-xs"
                  : "text-[#5B6675] hover:text-[#1B2430] hover:bg-stone-50"
              }`}
            >
              🏢 កន្លែងធ្វើការ
            </button>

            {relatedMajors.length > 0 && (
              <button
                type="button"
                onClick={() => scrollToSection("related")}
                className={`min-h-[34px] sm:min-h-[40px] flex-1 px-2.5 sm:px-3 py-1 rounded-[8px] sm:rounded-[12px] text-[11px] sm:text-[13px] font-black transition-all whitespace-nowrap active:scale-95 ${
                  activeSection === "related"
                    ? "bg-[#1F5BFF] text-white shadow-xs"
                    : "text-[#5B6675] hover:text-[#1B2430] hover:bg-stone-50"
                }`}
              >
                🔗 ជំនាញស្រដៀង ({relatedMajors.length})
              </button>
            )}
          </div>
        </div>

        {/* 4. CONTENT SECTIONS - Vertically Organized for Quick Scanning */}

        {/* SECTION 1: CAREERS (Above the Fold) */}
        <section id="careers" className="bg-white rounded-[16px] sm:rounded-[22px] border-2 border-[#E6E8EC] p-3.5 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[10px] bg-[#EAF1FF] text-[#1F5BFF] flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-[15px] sm:text-[18px] md:text-[20px] font-black text-[#1B2430]">
                  ឱកាសការងារ និងមុខតំណែង (Career Opportunities)
                </h2>
                <p className="text-[11px] sm:text-[13px] text-[#5B6675]">
                  មុខតំណែងជាក់ស្តែងក្រោយបញ្ចប់ការសិក្សា
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[12px] font-black text-[#1B2430]">
              {major.career_positions ? major.career_positions.length : 0} មុខរបរ
            </span>
          </div>

          {/* Careers Grid: Crisp, High-Contrast Scannable Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {major.career_positions && major.career_positions.length > 0 ? (
              major.career_positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3.5 rounded-[12px] sm:rounded-[14px] bg-[#FAF7F2] hover:bg-white border border-[#E6E8EC] hover:border-[#1F5BFF] transition-all flex items-center gap-2.5 shadow-2xs group"
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-[8px] bg-white group-hover:bg-[#1F5BFF] border border-[#E6E8EC] group-hover:border-[#1F5BFF] group-hover:text-white flex items-center justify-center text-[#1F5BFF] shrink-0 font-black text-[11px] sm:text-[12px] shadow-2xs transition-colors">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[12px] sm:text-[14px] font-black text-[#1B2430] leading-snug block truncate group-hover:text-[#1F5BFF] transition-colors">
                      {pos}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#5B6675] flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3 text-[#1E9E6A]" /> វិស័យការងារផ្ទាល់
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[12px] text-[#5B6675] col-span-full">
                មិនមានទិន្នន័យមុខតំណែងលម្អិត
              </p>
            )}
          </div>
        </section>

        {/* SECTION 2: STUDY PATHWAY & TVET EQUIVALENTS */}
        <section id="pathway" className="bg-white rounded-[16px] sm:rounded-[22px] border-2 border-[#E6E8EC] p-3.5 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E6E8EC] pb-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#FFF4E0] text-[#E37400] flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[15px] sm:text-[18px] md:text-[20px] font-black text-[#1B2430]">
                គន្លងសិក្សា និងការត្រៀមខ្លួន (Academic Pathway)
              </h2>
              <p className="text-[11px] sm:text-[13px] text-[#5B6675]">
                មុខវិជ្ជាត្រូវត្រៀមក្នុងវិទ្យាល័យ និងជម្រើសបណ្តុះបណ្តាល TVET
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Card A: High School Prep Subjects */}
            <div className="p-3 sm:p-4.5 rounded-[14px] sm:rounded-[18px] bg-[#FAF7F2] border border-[#E6E8EC] space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#1F5BFF]">
                  <BookOpen className="w-4 h-4" />
                  <h3 className="text-[13px] sm:text-[15px] font-black text-[#1B2430]">
                    មុខវិជ្ជាស្នូលត្រូវត្រៀមក្នុងវិទ្យាល័យ
                  </h3>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#5B6675] bg-white px-2 py-0.5 rounded-full border border-[#E6E8EC]">
                  ថ្នាក់ទី១១-១២
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-[#5B6675] leading-normal">
                មុខវិជ្ជាសំខាន់ៗដែលត្រូវផ្តោតយកចិត្តទុកដាក់សម្រាប់ប្រឡងបាក់ឌុប និងចូលរៀនជំនាញនេះ៖
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {major.high_school_subjects && major.high_school_subjects.length > 0 ? (
                  major.high_school_subjects.map((sub, i) => (
                    <span
                      key={i}
                      className="min-h-[32px] sm:min-h-[36px] px-3 py-1 rounded-full bg-white border border-[#E6E8EC] text-[11px] sm:text-[13px] font-black text-[#1B2430] flex items-center gap-1.5 shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#1F5BFF]" />
                      <span>{sub}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-[#5B6675]">មុខវិជ្ជាទូទៅតាមកម្មវិធីក្រសួង</span>
                )}
              </div>
            </div>

            {/* Card B: TVET Technical Pathway */}
            <div className="p-3 sm:p-4.5 rounded-[14px] sm:rounded-[18px] bg-[#FAF7F2] border border-[#E6E8EC] space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#1E9E6A]">
                  <GraduationCap className="w-4 h-4" />
                  <h3 className="text-[13px] sm:text-[15px] font-black text-[#1B2430]">
                    គន្លងបច្ចេកទេស និងវិជ្ជាជីវៈ (TVET)
                  </h3>
                </div>
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                  hasTvet ? "bg-[#E8F8F0] text-[#047857] border-[#A7F3D0]" : "bg-stone-100 text-[#5B6675] border-stone-200"
                }`}>
                  {hasTvet ? "មានវគ្គបណ្តុះបណ្តាល" : "កម្រិតឧត្តមសិក្សា"}
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] text-[#5B6675] leading-normal">
                {hasTvet
                  ? "សញ្ញាបត្របច្ចេកទេសស្របគ្នាដែលសិស្សអាចជ្រើសរើសរៀនជំនួស ឬបន្តពី TVET៖"
                  : "មុខជំនាញនេះតម្រូវឱ្យសិក្សាកម្រិតបរិញ្ញាបត្រ ៤ ឆ្នាំនៅសាកលវិទ្យាល័យ។"}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {hasTvet ? (
                  major.tvet_equivalent.map((tvet, i) => (
                    <span
                      key={i}
                      className="min-h-[32px] sm:min-h-[36px] px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#A7F3D0] text-[11px] sm:text-[13px] font-black text-[#047857] flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{tvet}</span>
                    </span>
                  ))
                ) : (
                  <span className="min-h-[32px] sm:min-h-[36px] px-3 py-1 rounded-full bg-white border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#5B6675] flex items-center gap-1.5 shadow-2xs">
                    🎓 សិក្សាកម្រិតបរិញ្ញាបត្រ (Higher Education)
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WORKPLACES & KEY SKILLS */}
        <section id="workplaces" className="bg-white rounded-[16px] sm:rounded-[22px] border-2 border-[#E6E8EC] p-3.5 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E6E8EC] pb-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#E8F8F0] text-[#1E9E6A] flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[15px] sm:text-[18px] md:text-[20px] font-black text-[#1B2430]">
                ស្ថាប័នការងារគំរូ និងជំនាញទទួលបាន (Workplaces & Skills)
              </h2>
              <p className="text-[11px] sm:text-[13px] text-[#5B6675]">
                បរិយាកាសការងារជាក់ស្តែង និងសមត្ថភាពស្នូល
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Target Workplaces Chips */}
            <div>
              <span className="block text-[12px] sm:text-[13px] font-bold text-[#5B6675] mb-2">
                ស្ថាប័ន និងក្រុមហ៊ុនគោលដៅ៖
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {major.workplaces && major.workplaces.length > 0 ? (
                  major.workplaces.map((wp, idx) => (
                    <span
                      key={idx}
                      className="min-h-[32px] sm:min-h-[36px] px-3 py-1 rounded-[10px] sm:rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] flex items-center gap-1.5 shadow-2xs"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#5B6675]" />
                      <span>{wp}</span>
                    </span>
                  ))
                ) : (
                  <span className="min-h-[32px] px-3 py-1 rounded-[10px] bg-[#FAF7F2] border border-[#E6E8EC] text-[12px] text-[#5B6675]">
                    ស្ថាប័នរដ្ឋ ក្រុមហ៊ុនឯកជន និងអង្គការជាតិ-អន្តរជាតិ
                  </span>
                )}
              </div>
            </div>

            {/* 4 Core Competencies */}
            <div className="pt-2 border-t border-[#E6E8EC]">
              <span className="block text-[12px] sm:text-[13px] font-bold text-[#5B6675] mb-2">
                សមត្ថភាពទទួលបានក្រោយបញ្ចប់ការសិក្សា៖
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <span>ការគិតបែបវិភាគ និងការដោះស្រាយបញ្ហាស្មុគស្មាញ</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] flex items-center gap-2">
                  <span className="text-base">🤝</span>
                  <span>ទំនាក់ទំនង ការងារជាក្រុម និងក្រមសីលធម៌វិជ្ជាជីវៈ</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] flex items-center gap-2">
                  <span className="text-base">💻</span>
                  <span>ការស្រាវជ្រាវ ការប្រើប្រាស់បច្ចេកវិទ្យា និងទិន្នន័យ</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#FAF7F2] border border-[#E6E8EC] text-[11px] sm:text-[13px] font-bold text-[#1B2430] flex items-center gap-2">
                  <span className="text-base">📈</span>
                  <span>ភាពជាអ្នកដឹកនាំ និងការសម្រេចចិត្តប្រកបដោយទំនួលខុសត្រូវ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RELATED MAJORS IN SAME CATEGORY */}
        {relatedMajors.length > 0 && (
          <section id="related" className="bg-white rounded-[16px] sm:rounded-[22px] border-2 border-[#E6E8EC] p-3.5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#F1EEFD] text-[#6E56CF] flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[15px] sm:text-[18px] font-black text-[#1B2430]">
                    មុខជំនាញពាក់ព័ន្ធក្នុងក្រុម {major.category.split("(")[0].trim()}
                  </h2>
                  <p className="text-[11px] sm:text-[12px] text-[#5B6675]">
                    ប្រៀបធៀបជាមួយមុខជំនាញផ្សេងទៀតដែលមានទិសដៅស្រដៀងគ្នា
                  </p>
                </div>
              </div>
              <span className="text-[11px] sm:text-[12px] font-bold text-[#5B6675]">
                {relatedMajors.length} ជំនាញ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {relatedMajors.map((rm) => (
                <Link
                  key={rm.id}
                  href={`/careers/${rm.id}`}
                  className="p-2.5 sm:p-3 rounded-[12px] bg-[#FAF7F2] hover:bg-white border border-[#E6E8EC] hover:border-[#1F5BFF] transition-all flex items-center justify-between gap-2 shadow-2xs group"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#5B6675]">
                      #{String(rm.number).padStart(2, "0")}
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-black text-[#1B2430] group-hover:text-[#1F5BFF] transition-colors truncate block">
                      {rm.major_name_kh}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#5B6675] truncate block">
                      {rm.major_name_en}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#1F5BFF] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. BOTTOM NAVIGATION BAR - Desktop */}
        <div className="bg-white rounded-[16px] sm:rounded-[20px] border-2 border-[#E6E8EC] p-3 sm:p-4 flex items-center justify-between gap-3 shadow-xs no-print">
          <Link
            href={backHref}
            className="min-h-[38px] sm:min-h-[42px] px-3.5 sm:px-4 rounded-[12px] border border-[#E6E8EC] bg-white hover:bg-stone-50 text-[#1B2430] text-[12px] sm:text-[13px] font-black flex items-center gap-1.5 transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#5B6675]" />
            <span>ត្រឡប់ទៅបញ្ជីមុខជំនាញ</span>
          </Link>

          <div className="flex items-center gap-2">
            {prevMajor && (
              <Link
                href={`/careers/${prevMajor.id}`}
                className="min-h-[38px] sm:min-h-[42px] px-3 sm:px-4 rounded-[12px] border border-[#E6E8EC] bg-white hover:bg-stone-50 text-[#1B2430] text-[11px] sm:text-[13px] font-bold flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">ជំនាញមុន៖</span>
                <span className="truncate max-w-[90px] sm:max-w-[130px]">{prevMajor.major_name_kh}</span>
              </Link>
            )}

            {nextMajor && (
              <Link
                href={`/careers/${nextMajor.id}`}
                className="min-h-[38px] sm:min-h-[42px] px-3 sm:px-4 rounded-[12px] bg-[#1F5BFF] hover:bg-[#1849D6] text-white text-[11px] sm:text-[13px] font-black flex items-center gap-1 shadow-xs transition-all"
              >
                <span className="hidden xs:inline">ជំនាញបន្ទាប់៖</span>
                <span className="truncate max-w-[90px] sm:max-w-[130px]">{nextMajor.major_name_kh}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* 6. FIXED MOBILE BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E6E8EC] p-2.5 px-3 flex items-center justify-between gap-2 sm:hidden shadow-lg no-print">
        <Link
          href={backHref}
          className="h-10 px-3 rounded-[10px] bg-stone-100 hover:bg-stone-200 text-[#1B2430] text-[11px] font-black flex items-center gap-1 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>បញ្ជី</span>
        </Link>

        <div className="flex items-center gap-1.5 shrink-0">
          {prevMajor && (
            <Link
              href={`/careers/${prevMajor.id}`}
              className="h-10 w-10 rounded-[10px] bg-stone-100 text-[#1B2430] flex items-center justify-center"
              title="ជំនាញមុន"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}

          {nextMajor && (
            <Link
              href={`/careers/${nextMajor.id}`}
              className="h-10 w-10 rounded-[10px] bg-stone-100 text-[#1B2430] flex items-center justify-center"
              title="ជំនាញបន្ទាប់"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleToggleShortlist}
          className={`h-10 flex-1 px-3 rounded-[10px] text-[12px] font-black flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 ${
            isSaved
              ? "bg-[#1E9E6A] text-white"
              : "bg-[#1F5BFF] text-white"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>{isSaved ? "បានរក្សាទុក ✓" : "រក្សាទុកមុខជំនាញ"}</span>
        </button>
      </div>

      {/* Copy Link Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1B2430] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#1E9E6A]" />
          <span>បានចម្លងតំណភ្ជាប់លម្អិតរួចរាល់!</span>
        </div>
      )}
    </div>
  );
}
