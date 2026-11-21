"use client";

import React from "react";
import { StudentProfile } from "@/types/assessment";
import { HollandScoreResult, HollandDescriptionsData } from "@/types/hollandRiasec";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { School, Calendar, CheckCircle2, AlertTriangle, FileBadge } from "lucide-react";
import descriptionsJson from "@/data/assessments/holland-riasec/descriptions.json";

interface HollandCodeBannerProps {
  student: StudentProfile;
  scoreResult: HollandScoreResult;
  createdAt?: string;
}

const descriptions = descriptionsJson as unknown as HollandDescriptionsData;

export function HollandCodeBanner({
  student,
  scoreResult,
  createdAt,
}: HollandCodeBannerProps) {
  const { topCode, firstCode, secondCode, firstScore, secondScore, hasTie } = scoreResult;

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
      {/* 1. Official Student Dossier Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <StudentAvatar avatarId={student.avatar} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {student.fullName}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                {student.grade} • {student.classSection}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal mt-1 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-slate-400" />
              <span>{student.schoolName}</span>
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end gap-1.5">
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>បានវាយតម្លៃចប់សព្វគ្រប់</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>កាលបរិច្ឆេទ៖ {formattedDate}</span>
          </span>
        </div>
      </div>

      {/* 2. Formal Primary Holland Code Assessment Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileBadge className="w-4 h-4 text-blue-700" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              កូដបុគ្គលិកលក្ខណៈចម្បង (Primary Holland Code)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            ផ្អែកលើការរួមបញ្ចូលគ្នានៃពិន្ទុខ្ពស់បំផុតទាំង ២
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-wide text-blue-900">
                  {topCode}
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-800">
                  {firstCategory?.archetypeKh} + {secondCategory?.archetypeKh}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed khmer-content">
                លទ្ធផលបង្ហាញថា អ្នកមានចំណាប់អារម្មណ៍ និងសក្តានុពលខ្លាំងជាងគេលើប្រភេទ{" "}
                <strong className="text-slate-900 font-semibold">“{firstCategory?.nameKh}”</strong> និង{" "}
                <strong className="text-slate-900 font-semibold">“{secondCategory?.nameKh}”</strong>។
              </p>
            </div>

            {/* Top 2 Score Badges */}
            <div className="flex gap-2.5 shrink-0">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center min-w-[105px]">
                <span className="text-[10px] text-slate-500 font-medium block">
                  ពិន្ទុខ្ពស់ទី ១ ({firstCode})
                </span>
                <span className="text-2xl font-bold font-mono text-blue-900 block my-0.5">
                  {firstScore}<span className="text-xs font-normal text-slate-400">/8</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-700 block truncate">
                  {firstCategory?.archetypeKh}
                </span>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center min-w-[105px]">
                <span className="text-[10px] text-slate-500 font-medium block">
                  ពិន្ទុខ្ពស់ទី ២ ({secondCode})
                </span>
                <span className="text-2xl font-bold font-mono text-slate-800 block my-0.5">
                  {secondScore}<span className="text-xs font-normal text-slate-400">/8</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-700 block truncate">
                  {secondCategory?.archetypeKh}
                </span>
              </div>
            </div>
          </div>

          {/* Tie-breaker Note */}
          {hasTie && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed khmer-content">
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
