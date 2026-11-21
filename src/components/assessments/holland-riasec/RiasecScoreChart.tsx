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
    accent: string;
  }
> = {
  R: {
    solidBar: "bg-sky-500",
    badge: "bg-sky-50 text-sky-800",
    badgeBorder: "border-sky-200",
    text: "text-sky-700",
    accent: "#0ea5e9",
  },
  I: {
    solidBar: "bg-indigo-600",
    badge: "bg-indigo-50 text-indigo-800",
    badgeBorder: "border-indigo-200",
    text: "text-indigo-700",
    accent: "#6366f1",
  },
  A: {
    solidBar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-800",
    badgeBorder: "border-rose-200",
    text: "text-rose-700",
    accent: "#f43f5e",
  },
  S: {
    solidBar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-800",
    badgeBorder: "border-emerald-200",
    text: "text-emerald-700",
    accent: "#10b981",
  },
  E: {
    solidBar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800",
    badgeBorder: "border-amber-200",
    text: "text-amber-700",
    accent: "#f59e0b",
  },
  C: {
    solidBar: "bg-teal-600",
    badge: "bg-teal-50 text-teal-800",
    badgeBorder: "border-teal-200",
    text: "text-teal-700",
    accent: "#0d9488",
  },
};

export function RiasecScoreChart({ scoreResult }: RiasecScoreChartProps) {
  const { sortedCategories, firstCode, secondCode, scores } = scoreResult;

  const totalAnswered = Object.values(scores).reduce((a, b) => a + b, 0);

  // SVG Radar Hexagon Points Calculation
  const riasecOrder: RiasecCode[] = ["R", "I", "A", "S", "E", "C"];
  const centerX = 120;
  const centerY = 120;
  const radius = 80;

  // Calculate polygon points based on student scores (out of 8)
  const getCoordinates = (index: number, score: number) => {
    // 6 points spaced 60 deg (Math.PI / 3) starting from top (-Math.PI / 2)
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const r = (Math.max(score, 0.5) / 8) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  const scorePoints = riasecOrder
    .map((code, idx) => {
      const score = scores[code] || 0;
      const { x, y } = getCoordinates(idx, score);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  // Grid levels (2, 4, 6, 8 points)
  const gridLevels = [2, 4, 6, 8];

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-7 border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-stone-100">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#1E293B] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>តារាងប្រៀបធៀបពិន្ទុទាំង ៦ ប្រភេទ (RIASEC Score Distribution)</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            ពិន្ទុអតិបរមាក្នុងមួយប្រភេទគឺ ៨ ពិន្ទុ • សរុបបានគូសជ្រើសរើស {totalAnswered}/48 ចំណុច
          </p>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          តម្រៀបតាមពិន្ទុពីខ្ពស់ទៅទាប
        </div>
      </div>

      {/* 2-Column Split: Hexagon Radar Chart (Left) + Horizontal Score Bars (Right) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Holland Hexagon Radar Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF7F2] border-2 border-stone-200/80">
          <span className="text-xs font-bold text-[#1E293B] mb-2 block text-center">
            ក្រាហ្វិកផ្កាយ ៦ ទិស (Holland Hexagon Radar)
          </span>

          <svg width="240" height="240" className="overflow-visible select-none drop-shadow-2xs">
            {/* Background Hexagon Grid Levels */}
            {gridLevels.map((lvl) => {
              const pts = riasecOrder
                .map((_, idx) => {
                  const angle = (Math.PI / 3) * idx - Math.PI / 2;
                  const r = (lvl / 8) * radius;
                  const x = centerX + r * Math.cos(angle);
                  const y = centerY + r * Math.sin(angle);
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(" ");
              return (
                <polygon
                  key={lvl}
                  points={pts}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                  strokeDasharray={lvl < 8 ? "3 3" : undefined}
                />
              );
            })}

            {/* Radial Spokes from Center to Vertices */}
            {riasecOrder.map((_, idx) => {
              const angle = (Math.PI / 3) * idx - Math.PI / 2;
              const x2 = centerX + radius * Math.cos(angle);
              const y2 = centerY + radius * Math.sin(angle);
              return (
                <line
                  key={idx}
                  x1={centerX}
                  y1={centerY}
                  x2={x2}
                  y2={y2}
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Student Score Polygon Fill & Stroke */}
            <polygon
              points={scorePoints}
              fill="rgba(59, 130, 246, 0.25)"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Vertices Dots & Labels */}
            {riasecOrder.map((code, idx) => {
              const score = scores[code] || 0;
              const { x, y } = getCoordinates(idx, score);
              const style = CATEGORY_STYLES[code];

              // Label placement outside radius
              const labelAngle = (Math.PI / 3) * idx - Math.PI / 2;
              const lx = centerX + (radius + 20) * Math.cos(labelAngle);
              const ly = centerY + (radius + 18) * Math.sin(labelAngle);

              return (
                <g key={code}>
                  {/* Point Marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={style.accent}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Category Code Label */}
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[11px] font-mono font-black"
                    fill={style.accent}
                  >
                    {code} ({score})
                  </text>
                </g>
              );
            })}
          </svg>

          <span className="text-[10px] text-stone-500 text-center mt-2">
            ទម្រង់ក្រាហ្វិកបង្ហាញពីលំនាំបុគ្គលិកលក្ខណៈចម្បងរបស់អ្នក
          </span>
        </div>

        {/* Right Column: Bar Comparison List with Individual Signature Colors */}
        <div className="lg:col-span-7 space-y-3">
          {sortedCategories.map((item) => {
            const isTopOne = item.code === firstCode;
            const isTopTwo = item.code === secondCode;
            const isTopRanked = isTopOne || isTopTwo;
            const percentage = Math.round((item.score / 8) * 100);
            const style = CATEGORY_STYLES[item.code];

            return (
              <div
                key={item.code}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  isTopRanked
                    ? "bg-[#FAF7F2] border-stone-300 shadow-2xs"
                    : "bg-white border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Category Letter Circle with Signature Color */}
                    <span
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-black font-mono text-xs text-white shadow-xs"
                      style={{ backgroundColor: style.accent }}
                    >
                      {item.code}
                    </span>

                    {/* Name */}
                    <div className="flex items-center min-w-0">
                      <span className="font-extrabold text-xs sm:text-sm text-[#1E293B] truncate">
                        {item.meta.nameKh} ({item.meta.nameEn})
                      </span>
                    </div>
                  </div>

                  {/* Score and Percentage */}
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs sm:text-sm font-black text-[#1E293B]">
                      {item.score} / 8
                    </span>
                    <span className="text-[11px] text-stone-400 ml-1.5 hidden sm:inline">
                      ({percentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress Bar with Signature Solid Color */}
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${style.solidBar} rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
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
