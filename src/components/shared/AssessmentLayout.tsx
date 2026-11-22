"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, RotateCcw, Compass, LayoutGrid } from "lucide-react";

interface AssessmentLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHomeLink?: boolean;
  gradeBadge?: string;
  assessmentNameKh?: string;
  assessmentNameEn?: string;
  resetHref?: string;
}

export function AssessmentLayout({
  children,
  title,
  subtitle,
  showHomeLink = true,
  gradeBadge = "ថ្នាក់ទី ៧ (Grade 7)",
  assessmentNameKh = "តេស្តវាយតម្លៃសិស្ស",
  assessmentNameEn = "Student Assessment Platform",
  resetHref = "/assessments",
}: AssessmentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E293B] font-sans selection:bg-[#E0F2FE] selection:text-[#0369A1] relative">
      {/* Background Subtle Storybook Doodles (Scrolls naturally with content) */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden opacity-35 select-none">
        <svg className="absolute top-12 left-6 w-8 h-8 text-amber-400 rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
        <svg className="absolute top-48 right-8 w-7 h-7 text-blue-400 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
        <svg className="absolute top-[420px] left-10 w-8 h-8 text-emerald-400 rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-9" />
          <path d="M12 13c0-4.5 3.5-7 8-7 0 4.5-2.5 8-7 8" />
          <path d="M12 15c0-4-3-6-7-6 0 4 2 7 7 7" />
        </svg>
        <svg className="absolute top-[680px] right-12 w-6 h-6 text-purple-400 rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
        </svg>
        <svg className="absolute top-[960px] left-8 w-7 h-7 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
        </svg>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b-2 border-stone-200/90 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border-2 border-stone-300 shadow-2xs flex items-center justify-center shrink-0 ring-4 ring-amber-100/60 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Personality Test Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-[#1E293B] tracking-tight text-sm sm:text-base">
                  {assessmentNameKh}
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium">
                  {assessmentNameEn}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/careers"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-[#0369A1] bg-[#E0F2FE] border-2 border-[#BAE6FD] hover:bg-[#BAE6FD]/40 shadow-2xs transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>មុខជំនាញ និងអាជីព</span>
            </Link>

            <Link
              href="/assessments"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-stone-700 bg-white border-2 border-stone-300 hover:bg-stone-50 shadow-2xs transition-all"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-stone-500" />
              <span>កម្រងតេស្តទាំងអស់</span>
            </Link>

            {gradeBadge && (
              <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border-2 border-[#BAE6FD]">
                <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{gradeBadge}</span>
              </div>
            )}

            {showHomeLink && (
              <Link
                href={resetHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#1E293B] px-3 py-1.5 rounded-full border-2 border-stone-300 bg-white hover:bg-stone-50 shadow-2xs transition-all active:scale-95"
                title="ចាប់ផ្តើមឡើងវិញ"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">ចាប់ផ្តើមឡើងវិញ</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {(title || subtitle) && (
          <div className="mb-6 text-center max-w-2xl mx-auto">
            {title && (
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] leading-snug tracking-tight mb-1.5">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="w-full">{children}</div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-stone-200/90 bg-white py-6 pb-20 sm:pb-8 text-xs text-stone-500 no-print relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-700 font-medium text-center sm:text-left">
            ប្រព័ន្ធវាយតម្លៃចំណង់ចំណូលចិត្ត និងការតម្រង់ទិសអាជីពសិស្ស
          </p>
          <div className="flex items-center gap-4 text-stone-500 shrink-0">
            <span>© 2026-2027</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-stone-800 underline underline-offset-2 font-medium">
              ផ្នែកគ្រប់គ្រង (Admin)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
