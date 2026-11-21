"use client";

import React from "react";
import { StudentProfile } from "@/types/assessment";
import { GroupedInterestScoreResult } from "@/types/groupedInterest";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { School, Calendar, CheckCircle2, AlertTriangle, Compass, Award } from "lucide-react";

interface InterestResultBannerProps {
  student: StudentProfile;
  scoreResult: GroupedInterestScoreResult;
  createdAt?: string;
}

export function InterestResultBanner({
  student,
  scoreResult,
  createdAt,
}: InterestResultBannerProps) {
  const {
    topGroupCodes = ["A"],
    topScore = 0,
    hasTie = false,
    sortedGroups = [],
    maxPerGroup = 30,
  } = scoreResult || {};

  const topGroups = sortedGroups.filter((g) => g.isTop);
  const primaryGroup = topGroups[0] || sortedGroups[0] || {
    code: "A",
    labelKh: "កម្រងសំណួរ (ក)",
    score: topScore,
    maxScore: maxPerGroup,
    percentage: 0,
    rank: 1,
    isTop: true,
    meta: {
      code: "A",
      labelKh: "កម្រងសំណួរ (ក)",
      maxScore: maxPerGroup,
      focusTitleKh: "វិទ្យាសាស្ត្រ បច្ចេកវិទ្យា សុខាភិបាល និងហិរញ្ញវត្ថុ",
      descriptionKh: "",
      suggestedTracksKh: ["គន្លងវិទ្យាសាស្ត្រ", "គន្លងវិជ្ជាជីវៈ"],
    },
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("km-KH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("km-KH");

  const displayTracks = primaryGroup?.meta?.suggestedTracksKh || [];

  return (
    <div className="space-y-4">
      {/* 1. Official Student Dossier Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <StudentAvatar avatarId={student.avatar} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {student.fullName}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                {student.grade || "Grade 8"} • {student.classSection}
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

      {/* 2. Top Interest Group Highlight Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-700" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              លទ្ធផលកម្រងសំណួរចំណង់ចំណូលចិត្តខ្ពស់បំផុត
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            ពិន្ទុអតិបរមាក្នុងមួយកម្រងគឺ {maxPerGroup} ពិន្ទុ
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold font-mono text-sm border border-blue-200">
                  {hasTie
                    ? `កម្រងស្មើគ្នា៖ ${topGroupCodes.join(" & ")}`
                    : primaryGroup?.labelKh || "កម្រងសំណួរ"}
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {primaryGroup?.meta?.focusTitleKh || ""}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed khmer-content">
                {primaryGroup?.meta?.descriptionKh || ""}
              </p>

              {/* Suggested Pathways */}
              {displayTracks.length > 0 && (
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-700" />
                    <span>គន្លងសិក្សា និងវិជ្ជាជីវៈដែលត្រូវគ្នា៖</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {displayTracks.map((track, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Score Badge */}
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-center min-w-[120px] shrink-0">
              <span className="text-[10px] text-slate-500 font-medium block">
                ពិន្ទុខ្ពស់ជាងគេ
              </span>
              <span className="text-3xl font-bold font-mono text-blue-900 block my-0.5">
                {topScore}
                <span className="text-xs font-normal text-slate-400">/{maxPerGroup}</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-md inline-block">
                {Math.round((topScore / maxPerGroup) * 100)}% នៃសំណួរ
              </span>
            </div>
          </div>

          {/* Tie Alert if 2 or more groups are tied */}
          {hasTie && (
            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 bg-amber-50/70 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed khmer-content">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>សម្គាល់ពិន្ទុស្មើគ្នា៖ </strong>
                អ្នកទទួលបានពិន្ទុស្មើគ្នាក្នុងកម្រងសំណួរ {topGroupCodes.join(" និង ")} ({topScore} ពិន្ទុដូចគ្នា)។ នេះបញ្ជាក់ថា អ្នកមានចំណង់ចំណូលចិត្តចម្រុះក្នុងវិស័យទាំងពីរ។ សូមពិគ្រោះយោបល់បន្ថែមជាមួយគ្រូប្រឹក្សាដើម្បីជ្រើសរើសគន្លងដែលសមស្របបំផុត។
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
