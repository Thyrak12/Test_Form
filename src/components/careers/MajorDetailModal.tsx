"use client";

import React, { useEffect } from "react";
import { MajorItem } from "@/types/career";
import { MajorCategoryIcon } from "./MajorCategoryIcon";
import { CareerAvatar, getCareerAvatarInfo } from "./CareerAvatar";
import {
  X,
  Printer,
  Briefcase,
  Building2,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
} from "lucide-react";

interface MajorDetailModalProps {
  major: MajorItem | null;
  onClose: () => void;
}

export function MajorDetailModal({ major, onClose }: MajorDetailModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (major) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [major, onClose]);

  if (!major) return null;

  const isScience = major.track === "science";
  const avatarInfo = getCareerAvatarInfo(major);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] border-2 border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div
          className={`p-6 sm:p-7 border-b-2 relative ${
            isScience
              ? "bg-gradient-to-br from-sky-50 via-white to-indigo-50/50 border-sky-100"
              : "bg-gradient-to-br from-amber-50 via-white to-orange-50/50 border-amber-100"
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-all shadow-2xs z-10"
            aria-label="បិទផ្ទាំង"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            {/* Illustrated Icon Badge */}
            <MajorCategoryIcon
              category={major.category}
              track={major.track}
              size="lg"
            />

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                    isScience
                      ? "bg-sky-100/80 text-sky-800 border-sky-200"
                      : "bg-amber-100/80 text-amber-900 border-amber-200"
                  }`}
                >
                  #{String(major.number).padStart(2, "0")} • {isScience ? "គន្លងវិទ្យាសាស្ត្រ" : "គន្លងវិទ្យាសាស្ត្រសង្គម"}
                </span>

                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 whitespace-nowrap shrink-0">
                  {major.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight leading-snug">
                {major.major_name_kh}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-stone-500">
                {major.major_name_en}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-sm text-stone-700 leading-relaxed">
          {/* 1. Overview with Featured Career Avatar Spotlight */}
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-black text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${isScience ? "text-sky-600" : "text-amber-600"}`} />
              <span>អំពីមុខជំនាញ និងអាជីពតំណាង (Career Profile)</span>
            </h3>

            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center sm:items-start gap-4 transition-all ${
                isScience
                  ? "bg-gradient-to-r from-sky-50/80 via-white to-blue-50/50 border-sky-200"
                  : "bg-gradient-to-r from-amber-50/80 via-white to-orange-50/50 border-amber-200"
              }`}
            >
              <div className="flex flex-col items-center shrink-0">
                <CareerAvatar major={major} size="lg" />
                <span
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-black border shadow-2xs whitespace-nowrap ${
                    isScience
                      ? "bg-sky-100 text-sky-800 border-sky-300"
                      : "bg-amber-100 text-amber-900 border-amber-300"
                  }`}
                >
                  {avatarInfo.emoji} {avatarInfo.labelKh}
                </span>
                <span className="text-[10px] font-bold text-stone-400 mt-0.5">
                  {avatarInfo.labelEn}
                </span>
              </div>

              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center justify-center sm:justify-start gap-1">
                  <span>ការពិពណ៌នាអំពីមុខជំនាញ</span>
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium khmer-content">
                  {major.description_kh}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Academic Preparation (2-Column Box) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* High School Subjects */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-2">
              <span className="text-xs font-black text-[#1E293B] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>មុខវិជ្ជាតម្រង់ទិស ម.ទុតិយភូមិ</span>
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {major.high_school_subjects.length > 0 ? (
                  major.high_school_subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs whitespace-nowrap"
                    >
                      {sub}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-400 font-medium">
                    មុខវិជ្ជាទូទៅ
                  </span>
                )}
              </div>
            </div>

            {/* TVET Equivalent */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-2">
              <span className="text-xs font-black text-[#1E293B] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>ជំនាញអប់រំបច្ចេកទេស (TVET)</span>
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {major.tvet_equivalent && major.tvet_equivalent.length > 0 ? (
                  major.tvet_equivalent.map((tvet, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs"
                    >
                      {tvet}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500 font-medium">
                    សិក្សានៅកម្រិតឧត្តមសិក្សា (បរិញ្ញាបត្រ)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 3. Career Positions */}
          <div className="space-y-2.5">
            <h3 className="text-xs sm:text-sm font-black text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <Briefcase className={`w-4 h-4 ${isScience ? "text-sky-600" : "text-amber-600"}`} />
              <span>អាជីពការងារដែលសក្តិសម (Career Positions)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {major.career_positions.map((pos, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-2 hover:border-stone-300 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-stone-800 leading-snug">
                    {pos}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Typical Workplaces */}
          <div className="space-y-2.5">
            <h3 className="text-xs sm:text-sm font-black text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <Building2 className={`w-4 h-4 ${isScience ? "text-sky-600" : "text-amber-600"}`} />
              <span>កន្លែងបម្រើការងារ (Typical Workplaces)</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {major.workplaces.map((wp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs font-semibold text-stone-700"
                >
                  <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{wp}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t-2 border-stone-100 bg-[#FAF7F2]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98"
          >
            <Printer className="w-4 h-4 text-stone-500" />
            <span>បោះពុម្ព / រក្សាទុកព័ត៌មាននេះ</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className={`w-full sm:w-auto px-7 py-2.5 rounded-full text-white font-black text-xs sm:text-sm transition-all shadow-md active:scale-98 ${
              isScience
                ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
            }`}
          >
            បិទ (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
