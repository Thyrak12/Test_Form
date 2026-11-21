"use client";

import React from "react";
import Link from "next/link";
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-800 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-slate-900 tracking-tight text-sm sm:text-base">
                  {assessmentNameKh}
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  {assessmentNameEn}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/assessments"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>កម្រងតេស្តទាំងអស់</span>
            </Link>

            {gradeBadge && (
              <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>{gradeBadge}</span>
              </div>
            )}

            {showHomeLink && (
              <Link
                href={resetHref}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                title="ចាប់ផ្តើមឡើងវិញ"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">ចាប់ផ្តើមឡើងវិញ</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {(title || subtitle) && (
          <div className="mb-6 text-center max-w-2xl mx-auto">
            {title && (
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight mb-1.5">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="w-full">{children}</div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500 no-print">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-slate-600">
            ប្រព័ន្ធវាយតម្លៃចំណង់ចំណូលចិត្ត និងការតម្រង់ទិសអាជីពសិស្ស
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>© 2026-2027</span>
            <Link href="/admin" className="hover:text-slate-600 underline underline-offset-2">
              ផ្នែកគ្រប់គ្រង
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
