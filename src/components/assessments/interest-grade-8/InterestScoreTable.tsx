"use client";

import React from "react";
import { GroupedInterestScoreResult, GroupCode } from "@/types/groupedInterest";
import { BarChart3 } from "lucide-react";

interface InterestScoreTableProps {
  scoreResult: GroupedInterestScoreResult;
}

const GROUP_STYLES: Record<
  GroupCode,
  {
    solidBar: string;
    badge: string;
    border: string;
  }
> = {
  A: {
    solidBar: "bg-blue-600",
    badge: "bg-blue-100 text-blue-900 border-blue-200",
    border: "border-blue-200",
  },
  B: {
    solidBar: "bg-emerald-600",
    badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
    border: "border-emerald-200",
  },
  C: {
    solidBar: "bg-amber-600",
    badge: "bg-amber-100 text-amber-900 border-amber-200",
    border: "border-amber-200",
  },
};

export function InterestScoreTable({ scoreResult }: InterestScoreTableProps) {
  const {
    sortedGroups = [],
    maxPerGroup = 30,
    totalChecked = 0,
    totalQuestions = 90,
  } = scoreResult || {};

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-700" />
            <span>តារាងប្រៀបធៀបពិន្ទុទាំង ៣ កម្រង (ក, ខ, គ)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ពិន្ទុអតិបរមាក្នុងមួយកម្រងគឺ {maxPerGroup} ពិន្ទុ • សរុបបានជ្រើសរើស {totalChecked} នៃ {totalQuestions} សកម្មភាព
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          តម្រៀបតាមពិន្ទុពីខ្ពស់ទៅទាប
        </div>
      </div>

      {/* 3-Row Comparative Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3">កម្រងសំណួរ</th>
              <th className="py-2.5 px-3">វិស័យផ្តោតសំខាន់</th>
              <th className="py-2.5 px-3 text-right">ពិន្ទុ ({maxPerGroup})</th>
              <th className="py-2.5 px-3 text-right">ភាគរយ</th>
              <th className="py-2.5 px-3 text-center">ចំណាត់ថ្នាក់</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedGroups.map((group) => {
              const style = GROUP_STYLES[group.code] || GROUP_STYLES.A;
              const isFirst = group.rank === 1;

              return (
                <tr
                  key={group.code}
                  className={`transition-colors ${
                    isFirst ? "bg-blue-50/30 font-medium" : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                          isFirst
                            ? "bg-blue-700 text-white"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {group.code}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {group.labelKh}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-600 khmer-content max-w-xs">
                    {group.meta?.focusTitleKh || ""}
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {group.score} / {maxPerGroup}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {group.percentage}%
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        group.rank === 1
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : group.rank === 2
                          ? "bg-slate-100 text-slate-700 border border-slate-200"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      លេខ {group.rank}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Visual Bar Comparison */}
      <div className="pt-2 space-y-3">
        <h4 className="text-xs font-bold text-slate-700">
          ក្រាហ្វិកប្រៀបធៀបកម្រិតចំណាប់អារម្មណ៍ (%)
        </h4>

        <div className="space-y-2.5">
          {sortedGroups.map((group) => {
            const style = GROUP_STYLES[group.code] || GROUP_STYLES.A;
            return (
              <div key={group.code} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    {group.labelKh}: {group.meta?.focusTitleKh || ""}
                  </span>
                  <span className="font-mono text-slate-600 font-semibold">
                    {group.score}/{maxPerGroup} ({group.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${style.solidBar} transition-all duration-300`}
                    style={{ width: `${group.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
