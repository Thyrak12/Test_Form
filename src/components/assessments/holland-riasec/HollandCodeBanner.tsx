"use client";

import React from "react";
import { StudentProfile } from "@/types/assessment";
import { HollandScoreResult, HollandDescriptionsData } from "@/types/hollandRiasec";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import Link from "next/link";
import {
  School,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileBadge,
  Printer,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";
import descriptionsJson from "@/data/assessments/holland-riasec/descriptions.json";

interface HollandCodeBannerProps {
  student: StudentProfile;
  scoreResult: HollandScoreResult;
  createdAt?: string;
  onPrint?: () => void;
  onCopyLink?: () => void;
  copied?: boolean;
}

const descriptions = descriptionsJson as unknown as HollandDescriptionsData;

export function HollandCodeBanner({
  student,
  scoreResult,
  createdAt,
  onPrint,
  onCopyLink,
  copied,
}: HollandCodeBannerProps) {
  const { topCode, firstCode, secondCode, firstScore, secondScore, hasTie, scores } = scoreResult;

  const totalAnswered = Object.values(scores).reduce((a, b) => a + b, 0);

  const firstCategory = descriptions.categories[firstCode];
  const secondCategory = descriptions.categories[secondCode];

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("km-KH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("km-KH");

  return (
    <div className="space-y-4">
      {/* 1. Merged Official Student Dossier Header + Action Buttons */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border-2 border-stone-200/90 shadow-[0_4px_16px_rgba(180,160,140,0.1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Student Identity */}
        <div className="flex items-center gap-3.5">
          <StudentAvatar avatarId={student.avatar} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E293B] leading-tight">
                {student.fullName}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold border border-[#BAE6FD]">
                {student.grade} • {student.classSection}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium mt-1 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-stone-400" />
              <span>{student.schoolName}</span>
              <span className="mx-1">•</span>
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>

        {/* Right: Actions Bar (Merged & automatically hidden on print) */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end no-print">
          {onPrint && (
            <button
              type="button"
              onClick={onPrint}
              className="px-3.5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>បោះពុម្ព / PDF</span>
            </button>
          )}

          {onCopyLink && (
            <button
              type="button"
              onClick={onCopyLink}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 font-bold text-xs border-2 border-stone-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span className="text-emerald-700">បានចម្លង!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>ចែករំលែក</span>
                </>
              )}
            </button>
          )}

          <Link
            href="/assessments/holland-riasec"
            className="px-3.5 py-2 rounded-full bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 font-bold text-xs border-2 border-stone-200 transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>ធ្វើតេស្តថ្មី</span>
          </Link>
        </div>
      </div>

      {/* 0/48 Edge Case Friendly Alert */}
      {totalAnswered === 0 && (
        <div className="p-4 rounded-[22px] bg-amber-50/90 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-extrabold text-sm block">អ្នកមិនទាន់បានគូសជ្រើសរើសសកម្មភាពណាមួយទេ</span>
            <p className="leading-relaxed">
              លទ្ធផលខាងក្រោមបង្ហាញត្រឹមតែតម្លៃលំនាំដើមប៉ុណ្ណោះ។ សូមចុច <strong>&quot;ធ្វើតេស្តថ្មី&quot;</strong> ដើម្បីជ្រើសរើសសកម្មភាពដែលអ្នកចូលចិត្ត និងទទួលបានរបាយការណ៍បុគ្គលិកលក្ខណៈត្រឹមត្រូវ!
            </p>
          </div>
        </div>
      )}

      {/* 2. Formal Primary Holland Code Assessment Card */}
      <div className="bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b-2 border-stone-100 bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileBadge className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-xs sm:text-sm font-extrabold text-[#1E293B]">
              កូដបុគ្គលិកលក្ខណៈចម្បង (Primary Holland Code)
            </h3>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            ផ្អែកលើពិន្ទុខ្ពស់បំផុតទាំង ២
          </span>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Code + Character Storytelling Illustration */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              {/* Illustrated Badge Character Icon for RIASEC Combination */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#E0F2FE] via-[#E8E5F7] to-[#EAF3EA] border-2 border-[#BAE6FD] flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden group">
                <div className="text-3xl sm:text-4xl select-none group-hover:scale-110 transition-transform">
                  {topCode.includes("R") && topCode.includes("I")
                    ? "🔬"
                    : topCode.includes("A")
                    ? "🎨"
                    : topCode.includes("S")
                    ? "🤝"
                    : topCode.includes("E")
                    ? "💼"
                    : "📐"}
                </div>
                <div className="absolute -bottom-1 -right-1 text-xs px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-mono font-bold">
                  {topCode}
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-wide text-[#0369A1]">
                    {topCode}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#1E293B]">
                    {firstCategory?.archetypeKh} + {secondCategory?.archetypeKh}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed khmer-content">
                  លទ្ធផលបង្ហាញថា អ្នកមានចំណាប់អារម្មណ៍ និងសក្តានុពលខ្លាំងជាងគេលើប្រភេទ{" "}
                  <strong className="text-[#1E293B] font-bold">“{firstCategory?.nameKh}”</strong> និង{" "}
                  <strong className="text-[#1E293B] font-bold">“{secondCategory?.nameKh}”</strong>។
                </p>
              </div>
            </div>

            {/* Top 2 Score Badges */}
            <div className="flex gap-2.5 shrink-0 self-start lg:self-center">
              <div className="bg-[#FAF7F2] rounded-2xl p-3.5 border-2 border-[#BAE6FD] text-center min-w-[110px]">
                <span className="text-[10px] text-stone-500 font-medium block">
                  ពិន្ទុខ្ពស់ទី ១ ({firstCode})
                </span>
                <span className="text-2xl font-black font-mono text-[#0284C7] block my-0.5">
                  {firstScore}<span className="text-xs font-normal text-stone-400">/8</span>
                </span>
                <span className="text-xs font-bold text-stone-700 block truncate">
                  {firstCategory?.archetypeKh}
                </span>
              </div>

              <div className="bg-[#FAF7F2] rounded-2xl p-3.5 border-2 border-stone-200 text-center min-w-[110px]">
                <span className="text-[10px] text-stone-500 font-medium block">
                  ពិន្ទុខ្ពស់ទី ២ ({secondCode})
                </span>
                <span className="text-2xl font-black font-mono text-stone-800 block my-0.5">
                  {secondScore}<span className="text-xs font-normal text-stone-400">/8</span>
                </span>
                <span className="text-xs font-bold text-stone-700 block truncate">
                  {secondCategory?.archetypeKh}
                </span>
              </div>
            </div>
          </div>

          {/* Tie-breaker Note (Shown only when valid questions answered) */}
          {hasTie && totalAnswered > 0 && (
            <div className="mt-4 pt-3 border-t-2 border-stone-100 flex items-start gap-2 bg-[#FCEAD4]/60 p-3.5 rounded-2xl border border-[#FED7AA] text-xs text-[#9A3412] leading-relaxed khmer-content">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>សម្គាល់ពិន្ទុស្មើគ្នា៖ </strong>
                {descriptions.resultGuide.tieBreakerNoteKh}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
