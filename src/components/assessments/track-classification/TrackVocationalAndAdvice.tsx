"use client";

import React from "react";
import Link from "next/link";
import { TrackClassificationResult } from "@/types/trackClassification";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface TrackVocationalAndAdviceProps {
  result: TrackClassificationResult;
}

export function TrackVocationalAndAdvice({ result }: TrackVocationalAndAdviceProps) {
  const { vocationalRecommendations, subjectAdvice, recommendedTrack } = result;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      {/* VOCATIONAL / TECHNICAL TRACK MAJORS (គន្លងវិជ្ជាជីវៈ - Table 2) */}
      <div className="relative bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-6 sm:p-7 pt-7 sm:pt-8 space-y-5 flex flex-col justify-between">
        {/* Stacked on Top-Left */}
        <span className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white border-2 border-white shadow-sm z-10">
          ជម្រើសគន្លងវិជ្ជាជីវៈ
        </span>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EAF3EA] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1E293B]">
                ជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈ (Vocational Majors)
              </h3>
              <p className="text-[11px] text-stone-400">តារាងទី ២ • ក្រសួងអប់រំ យុវជន និងកីឡា</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            ប្រសិនបើសិស្សមានបំណងបន្តការសិក្សាលើជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈនៅថ្នាក់ទី ១០ ជំនាញដែលស្របគ្នានឹងលទ្ធផលតេស្តរួមមាន៖
          </p>

          {/* List of Recommended Vocational Majors */}
          <div className="space-y-2.5 pt-2">
            {vocationalRecommendations.map((major, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200/80 hover:border-emerald-300 hover:bg-[#EAF3EA]/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-xs font-black text-[#1E293B] truncate">
                      {major.km}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium hidden sm:inline truncate">
                      ({major.en})
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap shrink-0">
                    ជំនាញស្របគ្នា
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium leading-relaxed pl-4">
                  {major.descriptionKm || "ជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈកម្រិតមធ្យមសិក្សាទុតិយភូមិ"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#EAF3EA]/50 border border-[#BBF7D0] text-[11px] text-[#15803D] flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            ជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈផ្តល់នូវការអនុវត្តផ្ទាល់ច្រើន និងត្រៀមខ្លួនសម្រាប់ទីផ្សារការងារភ្លាមៗក្រោយបញ្ចប់ការសិក្សា។
          </span>
        </div>
      </div>

      {/* ACTIONABLE STUDY ADVICE - HIGH SCHOOL SUBJECTS TO PRIORITIZE */}
      <div className="relative bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-6 sm:p-7 pt-7 sm:pt-8 space-y-5 flex flex-col justify-between">
        {/* Stacked on Top-Left */}
        <span className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white border-2 border-white shadow-sm z-10">
          មុខវិជ្ជាស្នូល
        </span>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1E293B]">
                មុខវិជ្ជាស្នូលគួរយកចិត្តទុកដាក់ (Study Advice)
              </h3>
              <p className="text-[11px] text-stone-400">ត្រៀមខ្លួនសម្រាប់ថ្នាក់ទី ១០ ដល់ ១២</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            ដើម្បីពង្រឹងសមត្ថភាពក្នុងការរៀនសូត្រឱ្យទទួលបានជោគជ័យ សិស្សគួរយកចិត្តទុកដាក់ពិសេសលើមុខវិជ្ជាដូចខាងក្រោម៖
          </p>

          {/* Subject Cards */}
          <div className="space-y-2.5 pt-2">
            {subjectAdvice.map((sub, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200/80 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-black text-[#1E293B]">
                    {sub.subjectKm}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap shrink-0">
                    មុខវិជ្ជាអាទិភាព
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium leading-relaxed">
                  {sub.reasonKm}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-[11px] text-blue-800 flex items-start gap-2">
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
          <span>
            ការបង្កើតទម្លាប់អាន ការធ្វើលំហាត់ទៀងទាត់ និងការពិភាក្សាជាក្រុម នឹងជួយឱ្យអ្នកមានទំនុកចិត្តខ្ពស់ក្នុងថ្នាក់វិទ្យាល័យ។
          </span>
        </div>
      </div>

      {/* Explore All 136 Majors Cross-Link Banner */}
      <div className="no-print md:col-span-2">
        <div className="bg-[#FAF7F2] rounded-[24px] border-2 border-stone-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#1E293B]">
                ចង់ស្វែងយល់ពីមុខជំនាញ និងអាជីពការងារទាំង ១៣៦ មុខជំនាញ?
              </h4>
              <p className="text-xs text-stone-500 font-medium">
                ពិនិត្យមើលមុខវិជ្ជាត្រៀមប្រឡងបាក់ឌុប តម្រូវការទីផ្សារការងារ និងមុខជំនាញតាម{result.recommendedTrackKm}
              </p>
            </div>
          </div>
          <Link
            href={recommendedTrack === "science" ? "/careers/science" : "/careers/social"}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black whitespace-nowrap shadow-xs transition-all flex items-center gap-2 shrink-0 active:scale-98"
          >
            <span>រុករកមុខជំនាញទាំងអស់</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
