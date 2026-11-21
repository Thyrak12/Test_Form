"use client";

import React from "react";
import { TrackClassificationResult } from "@/types/trackClassification";
import {
  FlaskConical,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  Wrench,
  CheckCircle,
} from "lucide-react";

interface TrackGroupComparisonProps {
  result: TrackClassificationResult;
}

export function TrackGroupComparison({ result }: TrackGroupComparisonProps) {
  const { scienceGroup, socialScienceGroup, topClusters } = result;

  return (
    <div className="space-y-6">
      {/* METHOD 1: ACADEMIC GROUP SCORE COMPARISON */}
      <div className="relative bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-6 sm:p-8 pt-7 sm:pt-8 space-y-6">
        {/* Stacked on Top-Left */}
        <span className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white border-2 border-white shadow-sm z-10">
          វិធីសាស្ត្រទី ១
        </span>

        <div>
          <h3 className="text-base sm:text-lg font-black text-[#1E293B]">
            ការប្រៀបធៀបពិន្ទុរវាងក្រុមសិក្សាទាំងពីរ (Group Comparison)
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            ដោយសារក្រុមវិទ្យាសាស្ត្រមាន ៧ ក្រុមជំនាញ និងក្រុមសង្គមមាន ៩ ក្រុមជំនាញ យើងពិនិត្យលើពិន្ទុសរុប និង<strong>ពិន្ទុមធ្យមភាគក្នុងមួយក្រុមជំនាញ (លើ ៥៤ ពិន្ទុ)</strong> ដើម្បីតម្លាភាព។
          </p>
        </div>

        {/* 2 Comparison Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
          {/* Science Group Card */}
          <div
            className={`relative p-5 sm:p-6 rounded-2xl border-2 transition-all ${
              scienceGroup.averageScore >= socialScienceGroup.averageScore
                ? "bg-[#E0F2FE]/40 border-[#38BDF8] shadow-sm ring-2 ring-[#BAE6FD]/60"
                : "bg-[#FAF7F2]/60 border-stone-200"
            }`}
          >
            {/* Stacked on Top-Right */}
            {scienceGroup.averageScore >= socialScienceGroup.averageScore && (
              <span className="absolute -top-3.5 right-4 sm:right-6 px-3.5 py-1 rounded-full bg-[#0284C7] text-white text-[11px] font-black uppercase whitespace-nowrap shadow-sm border-2 border-white z-10">
                ខ្ពស់ជាង
              </span>
            )}

            <div className="flex items-center gap-3 mb-3">
              {/* 48px Illustrated Header Icon for Science */}
              <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] border-2 border-[#BAE6FD] flex items-center justify-center p-2 shrink-0 shadow-2xs">
                <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                  <path
                    d="M14 6h8v4l6 14a3 3 0 0 1-2.7 4.2H10.7A3 3 0 0 1 8 24l6-14V6z"
                    fill="#BAE6FD"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 23c2.5-1 6 1 8-0.5s5-1 7.5 0.5"
                    stroke="#0369A1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="15" cy="20" r="1.5" fill="#0284C7" />
                  <circle cx="21" cy="18" r="1" fill="#0284C7" />
                  <rect x="13" y="4" width="10" height="2.5" rx="1" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-[#1E293B] text-base sm:text-lg">
                  គន្លងវិទ្យាសាស្ត្រ
                </h4>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-stone-600 font-semibold">ពិន្ទុមធ្យមភាគ៖</span>
                <span className="text-xl sm:text-2xl font-black text-[#0369A1]">
                  {scienceGroup.averageScore}{" "}
                  <span className="text-xs font-bold text-stone-400">/ 54</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs text-stone-500">
                <span>ពិន្ទុសរុប៖</span>
                <span className="font-extrabold text-[#1E293B]">
                  {scienceGroup.totalScore} / {scienceGroup.maxScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200/70 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0284C7] h-full rounded-full transition-all duration-500"
                  style={{ width: `${scienceGroup.percentage}%` }}
                />
              </div>
              <div className="text-right text-[11px] font-extrabold text-[#0369A1]">
                {scienceGroup.percentage}% នៃពិន្ទុអតិបរមា
              </div>
            </div>
          </div>

          {/* Social Science Group Card */}
          <div
            className={`relative p-5 sm:p-6 rounded-2xl border-2 transition-all ${
              socialScienceGroup.averageScore > scienceGroup.averageScore
                ? "bg-[#FEF3C7]/40 border-[#FBBF24] shadow-sm ring-2 ring-[#FDE68A]/60"
                : "bg-[#FAF7F2]/60 border-stone-200"
            }`}
          >
            {/* Stacked on Top-Right */}
            {socialScienceGroup.averageScore > scienceGroup.averageScore && (
              <span className="absolute -top-3.5 right-4 sm:right-6 px-3.5 py-1 rounded-full bg-[#D97706] text-white text-[11px] font-black uppercase whitespace-nowrap shadow-sm border-2 border-white z-10">
                ខ្ពស់ជាង
              </span>
            )}

            <div className="flex items-center gap-3 mb-3">
              {/* 48px Illustrated Header Icon for Social Science */}
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#FDE68A] flex items-center justify-center p-2 shrink-0 shadow-2xs">
                <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                  <path
                    d="M6 26c4.5-2 9.5-1.5 12 1 2.5-2.5 7.5-3 12-1V9c-4.5-2-9.5-1.5-12 1-2.5-2.5 7.5-3-12-1v17z"
                    fill="#FDE68A"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <line x1="18" y1="10" x2="18" y2="27" stroke="#B45309" strokeWidth="1.8" />
                  <path d="M9 14h5M9 18h5M22 14h5M22 18h5" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-[#1E293B] text-base sm:text-lg">
                  គន្លងវិទ្យាសាស្ត្រសង្គម
                </h4>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-stone-600 font-semibold">ពិន្ទុមធ្យមភាគ៖</span>
                <span className="text-xl sm:text-2xl font-black text-[#B45309]">
                  {socialScienceGroup.averageScore}{" "}
                  <span className="text-xs font-bold text-stone-400">/ 54</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between text-xs text-stone-500">
                <span>ពិន្ទុសរុប៖</span>
                <span className="font-extrabold text-[#1E293B]">
                  {socialScienceGroup.totalScore} / {socialScienceGroup.maxScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200/70 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D97706] h-full rounded-full transition-all duration-500"
                  style={{ width: `${socialScienceGroup.percentage}%` }}
                />
              </div>
              <div className="text-right text-[11px] font-extrabold text-[#B45309]">
                {socialScienceGroup.percentage}% នៃពិន្ទុអតិបរមា
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* METHOD 2: TOP 3 INDIVIDUAL CLUSTERS */}
      <div className="relative bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-6 sm:p-8 pt-7 sm:pt-8 space-y-6">
        {/* Stacked on Top-Left */}
        <span className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full text-xs font-black bg-amber-600 text-white border-2 border-white shadow-sm z-10">
          វិធីសាស្ត្រទី ២
        </span>

        <div>
          <h3 className="text-base sm:text-lg font-black text-[#1E293B]">
            ក្រុមជំនាញទាំង ៣ ដែលទទួលបានពិន្ទុខ្ពស់ជាងគេ (Top 3 Clusters)
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            ចំណាត់ថ្នាក់ក្រុមជំនាញដែលសិស្សទទួលបានពិន្ទុសរុបខ្ពស់បំផុត រួមជាមួយការបំបែករវាង ចំណូលចិត្ត (ក) និងជំនាញ (ខ)។
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {topClusters.map((cluster, rankIdx) => {
            const isScienceCluster = cluster.trackGroup === "science";
            const rankBadges = [
              { label: "ចំណាត់ថ្នាក់ ១", bg: "bg-amber-500 text-white" },
              { label: "ចំណាត់ថ្នាក់ ២", bg: "bg-slate-500 text-white" },
              { label: "ចំណាត់ថ្នាក់ ៣", bg: "bg-amber-700 text-white" },
            ];

            return (
              <div
                key={cluster.clusterId}
                className="relative p-5 pt-6 rounded-2xl border-2 border-stone-200 bg-[#FAF7F2]/60 hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
              >
                {/* Stacked on Top-Left */}
                <span
                  className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-xs border-2 border-white z-10 ${rankBadges[rankIdx].bg}`}
                >
                  {rankBadges[rankIdx].label}
                </span>

                {/* Stacked on Top-Right */}
                <span
                  className={`absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs border-2 border-white z-10 ${
                    isScienceCluster
                      ? "bg-[#E0F2FE] text-[#0369A1]"
                      : "bg-[#FEF3C7] text-[#92400E]"
                  }`}
                >
                  {isScienceCluster ? "វិទ្យាសាស្ត្រ" : "សង្គម"}
                </span>

                <div>
                  <h4 className="font-black text-[#1E293B] text-sm sm:text-base leading-snug">
                    {cluster.titleKm}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-medium">
                    {cluster.titleEn}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="pt-2 border-t border-stone-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#1E293B] text-base">
                      {cluster.totalScore}{" "}
                      <span className="text-xs font-normal text-stone-400">/ 54</span>
                    </span>
                    <span className="font-bold text-blue-600">{cluster.percentage}%</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-xl bg-white border border-stone-200 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <div>
                        <div className="text-stone-400 text-[10px]">ចំណូលចិត្ត</div>
                        <div className="font-extrabold text-stone-700">
                          {cluster.partAScore}/24
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-stone-200 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-stone-400 text-[10px]">ជំនាញ</div>
                        <div className="font-extrabold text-stone-700">
                          {cluster.partBScore}/30
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful Explanation Note if Top 1 Cluster Track does not match Overall Track Recommendation */}
        {topClusters.length > 0 &&
          result.recommendedTrack !== "balanced" &&
          topClusters[0].trackGroup !== result.recommendedTrack && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <span className="text-lg leading-none shrink-0 mt-0.5">💡</span>
              <p className="leading-relaxed">
                <strong>ចំណាំ៖</strong> ទោះបីក្រុម #១ (<strong>{topClusters[0].titleKm}</strong>) ស្ថិតក្នុង
                {topClusters[0].trackGroup === "science" ? " ផ្នែកវិទ្យាសាស្ត្រ" : " ផ្នែកវិទ្យាសាស្ត្រសង្គម"} ប៉ុន្តែពិន្ទុមធ្យមភាគសរុបរបស់អ្នកខ្ពស់ជាងក្នុង{" "}
                <strong>{result.recommendedTrackKm}</strong>។ នេះបង្ហាញថាអ្នកមានទំនោរទូលំទូលាយលើគន្លងនេះ ហើយក៏អាចបន្តអភិវឌ្ឍចំណង់ចំណូលចិត្តលើក្រុម #១ បានផងដែរ។
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
