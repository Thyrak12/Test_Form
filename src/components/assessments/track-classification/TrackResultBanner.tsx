"use client";

import React from "react";
import { StudentProfile } from "@/types/assessment";
import { TrackClassificationResult } from "@/types/trackClassification";
import {
  Printer,
  RotateCcw,
  Share2,
  Calendar,
  Compass,
  Sparkles,
  FlaskConical,
  BookOpen,
  Scale,
} from "lucide-react";
import Link from "next/link";

interface TrackResultBannerProps {
  student: StudentProfile;
  result: TrackClassificationResult;
  createdAt?: string;
}

export function TrackResultBanner({
  student,
  result,
  createdAt,
}: TrackResultBannerProps) {
  const isScience = result.recommendedTrack === "science";
  const isSocial = result.recommendedTrack === "social_science";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("km-KH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "ថ្ងៃនេះ";

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `លទ្ធផលតេស្តញែកប្រភេទថ្នាក់ - ${student.fullName}`,
          text: `លទ្ធផលវាយតម្លៃគន្លងសិក្សាថ្នាក់ទី ១០ របស់ ${student.fullName}: ${result.recommendedTrackKm}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share skipped", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("បានចម្លងតំណភ្ជាប់លទ្ធផលរួចរាល់!");
    }
  };

  return (
    <div className="space-y-5">
      {/* Merged Student Dossier & Action Toolbar Card */}
      <div className="bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Student Profile & Assessment Meta */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FAF7F2] border-2 border-stone-200 flex items-center justify-center text-xl sm:text-2xl font-black text-stone-700 shrink-0 shadow-xs">
            {student.fullName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-[#1E293B] truncate">
                {student.fullName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#EAF3EA] text-[#15803D] border border-[#BBF7D0]">
                បានបញ្ចប់
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 truncate mt-0.5">
              {student.grade} • {student.classSection} • {student.schoolName}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#0369A1] font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>MoEYS ឧបសម្ព័ន្ធ ១២</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Print / Share / Retake Action Buttons (Hidden on Print) */}
        <div className="no-print flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-full border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-stone-500" />
            <span>បោះពុម្ព</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-2 rounded-full border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-500" />
            <span>ចែករំលែក</span>
          </button>

          <Link
            href="/assessments/track-classification"
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ធ្វើតេស្តឡើងវិញ</span>
          </Link>
        </div>
      </div>

      {/* Primary Recommended Track Hero Card */}
      <div
        className={`rounded-[28px] border-2 p-6 sm:p-8 shadow-[0_4px_24px_rgba(180,160,140,0.14)] relative overflow-hidden transition-all ${
          isScience
            ? "bg-gradient-to-br from-[#E0F2FE]/80 via-white to-[#EFF6FF] border-[#BAE6FD]"
            : isSocial
            ? "bg-gradient-to-br from-[#FEF3C7]/80 via-white to-[#FFFBEB] border-[#FDE68A]"
            : "bg-gradient-to-br from-[#FAF7F2] via-white to-[#F1F5F9] border-stone-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Custom Illustrated Track Badge */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border-2 shadow-md flex items-center justify-center shrink-0 border-stone-200/80 p-3">
            {isScience ? (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <circle cx="50" cy="50" r="45" fill="#E0F2FE" />
                <path d="M42 22 H58 V35 L70 65 C73 72 68 80 60 80 H40 C32 80 27 72 30 65 L42 35 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
                <path d="M33 68 C40 66 60 72 67 68 L60 80 H40 Z" fill="#0284C7" />
                <circle cx="48" cy="58" r="4" fill="#FFFFFF" opacity="0.8" />
                <circle cx="56" cy="66" r="3" fill="#FFFFFF" opacity="0.8" />
                <circle cx="44" cy="72" r="2.5" fill="#FFFFFF" opacity="0.8" />
                <path d="M72 26 L82 36 M77 24 L85 32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : isSocial ? (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <circle cx="50" cy="50" r="45" fill="#FEF3C7" />
                <path d="M22 68 C35 62 48 64 50 72 C52 64 65 62 78 68 V32 C65 26 52 28 50 36 C48 28 35 26 22 32 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
                <line x1="50" y1="36" x2="50" y2="72" stroke="#D97706" strokeWidth="2.5" />
                <path d="M28 42 H44 M28 50 H42 M56 42 H72 M58 50 H72" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="20" r="4" fill="#F59E0B" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <circle cx="50" cy="50" r="45" fill="#FAF7F2" stroke="#CBD5E1" strokeWidth="2" />
                <circle cx="50" cy="50" r="34" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                <polygon points="50,26 58,48 50,44 42,48" fill="#3B82F6" />
                <polygon points="50,74 58,52 50,56 42,52" fill="#94A3B8" />
                <circle cx="50" cy="50" r="3" fill="#1E293B" />
              </svg>
            )}
          </div>

          {/* Track Description */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 border border-stone-200 text-stone-600 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>អនុសាសន៍គន្លងសិក្សាថ្នាក់ទី ១០</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
              {result.recommendedTrackKm}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
              ផ្អែកលើការវាយតម្លៃទាំង ១៦ ក្រុមជំនាញ (កម្រិតចំណូលចិត្ត និងជំនាញជាក់ស្តែង) លទ្ធផលបង្ហាញថាអ្នកមានទំនោរ និងសក្តានុពលខ្ពស់ស្របគ្នានឹង{" "}
              <strong className="text-[#1E293B]">{result.recommendedTrackKm}</strong>។
            </p>

            {/* Encouraging Counselor Note from MoEYS */}
            <div className="mt-2 text-[11px] sm:text-xs text-stone-500 bg-white/70 rounded-xl p-3 border border-stone-200/70">
              🧭 <strong>ត្រីវិស័យតម្រង់ទិស៖</strong> លទ្ធផលតេស្តនេះមិនតម្រូវឱ្យសិស្សត្រូវតែអនុវត្តតាមទាំងស្រុងនោះទេ ប៉ុន្តែជាត្រីវិស័យបង្ហាញផ្លូវ និងផ្តល់ប្រឹក្សាគាំទ្រផ្នែកស្មារតី ក្នុងការពិភាក្សាជាមួយមាតាបិតា និងលោកគ្រូអ្នកគ្រូ។
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
