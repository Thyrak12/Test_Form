"use client";

import React, { useState } from "react";
import { HollandScoreResult, HollandDescriptionsData } from "@/types/hollandRiasec";
import { Briefcase, ChevronDown, Compass, BookOpen } from "lucide-react";
import descriptionsJson from "@/data/assessments/holland-riasec/descriptions.json";

interface PersonalityLetterGuideProps {
  scoreResult: HollandScoreResult;
}

const descriptions = descriptionsJson as unknown as HollandDescriptionsData;

export function PersonalityLetterGuide({
  scoreResult,
}: PersonalityLetterGuideProps) {
  const { firstCode, secondCode, sortedCategories } = scoreResult;

  const topTwoCategories = [
    descriptions.categories[firstCode],
    descriptions.categories[secondCode],
  ];

  const otherCategories = sortedCategories
    .filter((c) => c.code !== firstCode && c.code !== secondCode)
    .map((c) => descriptions.categories[c.code]);

  const [expandedCodes, setExpandedCodes] = useState<Record<string, boolean>>({});

  const toggleExpand = (code: string) => {
    setExpandedCodes((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  return (
    <div className="space-y-5">
      {/* 1. Top 2 Categories Guidance Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            អាជីព និងការសិក្សាដែលសមស្របនឹងអ្នក (Career & Study Pathways)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTwoCategories.map((cat, idx) => {
            const isRankOne = idx === 0;

            return (
              <div
                key={cat.code}
                className={`rounded-xl p-5 border bg-white shadow-2xs flex flex-col justify-between ${
                  isRankOne ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                        {cat.code} • {cat.nameEn}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {cat.nameKh} ({cat.archetypeKh})
                      </h4>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        isRankOne
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {isRankOne ? "ចំណាត់ថ្នាក់ទី ១" : "ចំណាត់ថ្នាក់ទី ២"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed khmer-content mb-4">
                    {cat.descriptionKh}
                  </p>
                </div>

                {/* Career Badges */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>មុខរបរ និងអាជីពគំរូ៖</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.careersListKh.map((career, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-800 text-xs font-medium border border-slate-200"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Other RIASEC Types (Clean Accordion) */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-100">
          <Compass className="w-4 h-4 text-slate-400" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-800">
            ស្វែងយល់បន្ថែមអំពីប្រភេទបុគ្គលិកលក្ខណៈ ៤ ទៀត (Other RIASEC Types)
          </h4>
        </div>

        <div className="space-y-2">
          {otherCategories.map((cat) => {
            const isExpanded = !!expandedCodes[cat.code];

            return (
              <div
                key={cat.code}
                className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(cat.code)}
                  className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center border border-slate-200">
                      {cat.code}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {cat.nameKh} ({cat.archetypeKh})
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed khmer-content space-y-2.5 bg-slate-50/50 border-t border-slate-100">
                    <p>{cat.descriptionKh}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.careersListKh.map((career, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-200"
                        >
                          {career}
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
    </div>
  );
}
