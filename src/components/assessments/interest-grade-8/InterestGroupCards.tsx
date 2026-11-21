"use client";

import React from "react";
import { GroupedInterestScoreResult } from "@/types/groupedInterest";
import { BookOpen, Compass, Info } from "lucide-react";
import descriptionsData from "@/data/assessments/interest-grade-8/descriptions.json";

interface InterestGroupCardsProps {
  scoreResult: GroupedInterestScoreResult;
}

export function InterestGroupCards({ scoreResult }: InterestGroupCardsProps) {
  const { sortedGroups = [] } = scoreResult || {};
  const counselingNote = descriptionsData.resultGuide?.counselingNoteKh;

  return (
    <div className="space-y-5">
      {/* 1. All 3 Groups Detailed Guidance Cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            សេចក្តីលម្អិតនៃកម្រងសំណួរ និងគន្លងសិក្សា (Track Descriptions)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {sortedGroups.map((group) => {
            const isRankOne = group.rank === 1;
            const suggestedTracks = group.meta?.suggestedTracksKh || [];

            return (
              <div
                key={group.code}
                className={`rounded-xl p-4 sm:p-5 border bg-white shadow-2xs transition-all ${
                  isRankOne
                    ? "border-blue-300 ring-1 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                        isRankOne
                          ? "bg-blue-700 text-white"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {group.code}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {group.labelKh} — {group.meta?.focusTitleKh || ""}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-md self-start sm:self-auto ${
                      isRankOne
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {group.score} ពិន្ទុ (ចំណាត់ថ្នាក់ទី {group.rank})
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed khmer-content mb-3 pl-0 sm:pl-9.5">
                  {group.meta?.descriptionKh || ""}
                </p>

                {/* Suggested Tracks */}
                {suggestedTracks.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-100 pl-0 sm:pl-9.5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-slate-400" />
                      <span>គន្លងសិក្សា និងវិជ្ជាជីវៈដែលត្រូវគ្នា៖</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedTracks.map((track, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-800 text-xs font-medium border border-slate-200"
                        >
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Institutional Counseling Note */}
      {counselingNote && (
        <div className="bg-blue-50/60 rounded-xl p-4 sm:p-5 border border-blue-200 text-xs text-blue-950 leading-relaxed khmer-content space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-blue-900 text-xs sm:text-sm">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>ចំណាំ និងការណែនាំសម្រាប់គ្រូប្រឹក្សា និងសាលារៀន៖</span>
          </div>
          <p className="text-slate-700 pl-6">
            {counselingNote}
          </p>
        </div>
      )}
    </div>
  );
}
