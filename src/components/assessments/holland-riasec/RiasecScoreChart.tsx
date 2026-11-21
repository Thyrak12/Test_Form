"use client";

import React from "react";
import { HollandScoreResult, RiasecCode } from "@/types/hollandRiasec";
import { BarChart3 } from "lucide-react";

interface RiasecScoreChartProps {
  scoreResult: HollandScoreResult;
}

const CATEGORY_STYLES: Record<
  RiasecCode,
  {
    solidBar: string;
    badge: string;
    badgeBorder: string;
    text: string;
  }
> = {
  R: {
    solidBar: "bg-teal-600",
    badge: "bg-teal-50 text-teal-800",
    badgeBorder: "border-teal-200",
    text: "text-teal-700",
  },
  I: {
    solidBar: "bg-blue-600",
    badge: "bg-blue-50 text-blue-800",
    badgeBorder: "border-blue-200",
    text: "text-blue-700",
  },
  A: {
    solidBar: "bg-violet-600",
    badge: "bg-violet-50 text-violet-800",
    badgeBorder: "border-violet-200",
    text: "text-violet-700",
  },
  S: {
    solidBar: "bg-rose-600",
    badge: "bg-rose-50 text-rose-800",
    badgeBorder: "border-rose-200",
    text: "text-rose-700",
  },
  E: {
    solidBar: "bg-amber-600",
    badge: "bg-amber-50 text-amber-800",
    badgeBorder: "border-amber-200",
    text: "text-amber-700",
  },
  C: {
    solidBar: "bg-slate-600",
    badge: "bg-slate-100 text-slate-800",
    badgeBorder: "border-slate-200",
    text: "text-slate-700",
  },
};

export function RiasecScoreChart({ scoreResult }: RiasecScoreChartProps) {
  const { sortedCategories, firstCode, secondCode } = scoreResult;

  const totalAnswered = Object.values(scoreResult.scores).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-700" />
            <span>តារាងប្រៀបធៀបពិន្ទុទាំង ៦ ប្រភេទ (RIASEC Score Distribution)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ពិន្ទុអតិបរមាក្នុងមួយប្រភេទគឺ ៨ ពិន្ទុ • សរុបបានគូសជ្រើសរើស {totalAnswered}/48 ចំណុច
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          តម្រៀបតាមពិន្ទុពីខ្ពស់ទៅទាប
        </div>
      </div>

      {/* Bar Comparison List */}
      <div className="mt-4 space-y-3.5">
        {sortedCategories.map((item) => {
          const isTopOne = item.code === firstCode;
          const isTopTwo = item.code === secondCode;
          const isTopRanked = isTopOne || isTopTwo;
          const percentage = Math.round((item.score / 8) * 100);
          const style = CATEGORY_STYLES[item.code];

          return (
            <div
              key={item.code}
              className={`p-3.5 rounded-lg border transition-colors ${
                isTopRanked
                  ? "bg-slate-50/70 border-slate-300"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Category Letter Circle */}
                  <span
                    className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center font-bold font-mono text-xs ${
                      isTopRanked
                        ? "bg-blue-700 text-white"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {item.code}
                  </span>

                  {/* Name and Rank Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                      {item.meta.nameKh} ({item.meta.nameEn})
                    </span>

                    {isTopOne && (
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-blue-100 text-blue-900 border border-blue-200">
                        ចំណាត់ថ្នាក់ទី ១
                      </span>
                    )}
                    {isTopTwo && (
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-slate-200 text-slate-800">
                        ចំណាត់ថ្នាក់ទី ២
                      </span>
                    )}
                  </div>
                </div>

                {/* Score and Percentage */}
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                    {item.score} / 8
                  </span>
                  <span className="text-[11px] text-slate-400 ml-1.5 hidden sm:inline">
                    ({percentage}%)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${style.solidBar} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
