import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileText,
  Compass,
  Layers,
} from "lucide-react";
import { AVAILABLE_ASSESSMENTS } from "@/lib/assessments/registry";

export default function AssessmentsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-800 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm sm:text-base block leading-tight">
                កម្រងតេស្តវាយតម្លៃសិស្ស
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Student Assessment Hub
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
          >
            ← ទំព័រដើម
          </Link>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Title & Introduction */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            <span>ជ្រើសរើសតេស្តតាមកម្រិតថ្នាក់សិក្សា</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            កម្រងតេស្តវាយតម្លៃ និងតម្រង់ទិស
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 khmer-content leading-relaxed">
            សូមជ្រើសរើសកម្រងតេស្តសមស្របទៅតាមកម្រិតថ្នាក់របស់អ្នក
            ដើម្បីស្វែងយល់ពីចំណុចខ្លាំង ចំណង់ចំណូលចិត្ត និងការរៀបចំផែនការសិក្សានាពេលអនាគត។
          </p>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Test 1: Grade 7 Holland RIASEC */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                  ថ្នាក់ទី ៧ (Grade 7)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  តេស្តទី ១
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  តេស្តស្វែងយល់ពីខ្លួនឯង Holland RIASEC
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Holland Career RIASEC Assessment
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed khmer-content">
                ការវាយតម្លៃចំណង់ចំណូលចិត្ត និងបុគ្គលិកលក្ខណៈ ៤៨ សំណួរ ដើម្បីស្វែងរកកូដ Holland និងទិសដៅអាជីពសមស្រប។
              </p>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-[11px] text-slate-600 text-center">
                <div className="bg-slate-50 p-2 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span>៥ - ១០ នាទី</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span>៤៨ សំណួរ</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-md">
                  <FileText className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span>Holland Code</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/assessments/holland-riasec"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>ចាប់ផ្តើមធ្វើតេស្តថ្នាក់ទី ៧</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Test 2: Grade 8 Interest Assessment */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  ថ្នាក់ទី ៨ (Grade 8)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  តេស្តទី ២
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  តេស្តវាយតម្លៃខ្លួនឯង អំពីចំណង់ចំណូលចិត្ត
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Grade 8 Interest Assessment (Groups A, B, C)
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed khmer-content">
                ការវាយតម្លៃចំណង់ចំណូលចិត្ត ៩០ សំណួរ បែងចែកជា ៣ កម្រង (ក, ខ, គ) ដើម្បីកំណត់គន្លងសិក្សា និងវិជ្ជាជីវៈសមស្រប។
              </p>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-[11px] text-slate-600 text-center">
                <div className="bg-slate-50 p-2 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span>១០ - ១៥ នាទី</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-md">
                  <Layers className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span>៩០ សំណួរ (៣ កម្រង)</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-md">
                  <FileText className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span>គន្លងសិក្សា</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/assessments/interest-grade-8"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>ចាប់ផ្តើមធ្វើតេស្តថ្នាក់ទី ៨</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-slate-600">
            ប្រព័ន្ធវាយតម្លៃ និងតម្រង់ទិសអាជីពសិស្ស
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
