"use client";

import React, { useState } from "react";
import { ClusterScoreDetail } from "@/types/trackClassification";
import { ChevronDown, ChevronUp, Layers, Heart, Wrench } from "lucide-react";

interface AllClustersGridProps {
  clusters: ClusterScoreDetail[];
}

export function AllClustersGrid({ clusters }: AllClustersGridProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-6 sm:p-8 pt-7 sm:pt-8 space-y-4">
      {/* Stacked on Top-Left */}
      <span className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full text-xs font-black bg-stone-700 text-white border-2 border-white shadow-sm z-10">
        លទ្ធផលលម្អិត
      </span>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#1E293B]">
              ពិន្ទុពិស្ដារទាំង ១៦ ក្រុមជំនាញ (All 16 Clusters Breakdown)
            </h3>
            <p className="text-xs text-stone-400">
              រៀបលំដាប់ពីពិន្ទុខ្ពស់ទៅទាប
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-3.5 py-1.5 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <span>{isOpen ? "បង្រួម" : "មើលលម្អិត"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-100">
          {clusters.map((c, idx) => {
            const isSci = c.trackGroup === "science";
            return (
              <div
                key={c.clusterId}
                className="p-3.5 rounded-2xl border border-stone-200 bg-[#FAF7F2]/40 hover:bg-white hover:border-stone-300 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-stone-400 block">
                      #{idx + 1} • ក្រុម {c.clusterId}
                    </span>
                    <h5 className="text-xs sm:text-sm font-black text-[#1E293B] line-clamp-2 leading-snug">
                      {c.titleKm}
                    </h5>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      isSci ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {isSci ? "វិទ្យាសាស្ត្រ" : "សង្គម"}
                  </span>
                </div>

                <div className="pt-1 border-t border-stone-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500" />
                        <span>{c.partAScore}/24</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-emerald-600" />
                        <span>{c.partBScore}/30</span>
                      </span>
                    </div>

                    <span className="font-extrabold text-[#1E293B]">
                      {c.totalScore} / 54 ({c.percentage}%)
                    </span>
                  </div>

                  {/* Compact 4px Mini-Bar along the bottom edge */}
                  <div className="w-full bg-stone-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isSci ? "bg-blue-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.max(4, c.percentage)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
