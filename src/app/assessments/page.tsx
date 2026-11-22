import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col font-sans relative selection:bg-[#E0F2FE] selection:text-[#0369A1]">
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

      {/* Header */}
      <header className="border-b-2 border-stone-200/90 bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
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
            <div className="hidden sm:block">
              <span className="font-extrabold text-[#1E293B] text-sm sm:text-base block leading-tight">
                កម្រងតេស្តវាយតម្លៃសិស្ស
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium block">
                Student Assessment Hub
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/careers"
              className="text-xs font-bold text-[#0369A1] hover:text-[#0284C7] px-3.5 py-2 rounded-full border-2 border-[#BAE6FD] bg-[#E0F2FE] hover:bg-[#BAE6FD]/40 shadow-2xs transition-all active:scale-95"
            >
              មុខជំនាញ និងអាជីព
            </Link>

            <Link
              href="/"
              className="text-xs font-bold text-stone-700 hover:text-[#1E293B] px-4 py-2 rounded-full border-2 border-stone-300 bg-white hover:bg-stone-50 shadow-2xs transition-all active:scale-95"
            >
              ← ទំព័រដើម
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hub Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 relative z-10">
        {/* Title & Introduction */}
        <div className="text-center space-y-2 max-w-2xl mx-auto relative px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8E5F7] border-2 border-[#C7D2FE] text-[#4338CA] text-xs font-bold mb-1 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#4f46e5]" />
            <span>ជ្រើសរើសតេស្តតាមកម្រិតថ្នាក់សិក្សា</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            កម្រងតេស្តវាយតម្លៃ និងតម្រង់ទិស
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 khmer-content leading-relaxed">
            សូមជ្រើសរើសកម្រងតេស្តសមស្របទៅតាមកម្រិតថ្នាក់របស់អ្នក
            ដើម្បីស្វែងយល់ពីចំណុចខ្លាំង ចំណង់ចំណូលចិត្ត និងការរៀបចំផែនការសិក្សានាពេលអនាគត។
          </p>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Holland RIASEC Assessment Card */}
          <div className="bg-white rounded-[28px] border-2 border-[#BAE6FD] hover:border-[#7DD3FC] p-6 sm:p-7 shadow-[0_4px_20px_rgba(180,160,140,0.15)] hover:shadow-[0_8px_28px_rgba(180,160,140,0.22)] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold border-2 border-[#BAE6FD]">
                  ថ្នាក់ទី ៧ • RIASEC
                </span>
                <div className="w-9 h-9 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shadow-2xs group-hover:scale-105 transition-transform">
                  <Compass className="w-4.5 h-4.5" />
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1E293B] leading-snug group-hover:text-blue-700 transition-colors">
                  តេស្តស្វែងយល់ពីខ្លួនឯង Holland RIASEC
                </h2>
                <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                  Holland Career RIASEC Assessment
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed khmer-content">
                ការវាយតម្លៃចំណង់ចំណូលចិត្ត និងបុគ្គលិកលក្ខណៈ ៤៨ សំណួរ ដើម្បីស្វែងរកកូដ Holland និងទិសដៅអាជីពសមស្រប។
              </p>

              <div className="pt-2 grid grid-cols-3 gap-2 py-3 px-2 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-xs text-stone-700 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-amber-600 mb-1" />
                  <span className="font-extrabold text-[#1E293B] text-[11px]">៥ - ១០ នាទី</span>
                </div>
                <div className="flex flex-col items-center justify-center border-x-2 border-stone-200/70 px-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mb-1" />
                  <span className="font-extrabold text-[#1E293B] text-[11px]">៤៨ សំណួរ</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-indigo-600 mb-1" />
                  <span className="font-extrabold text-[#1E293B] text-[11px]">Holland Code</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/assessments/holland-riasec"
                className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg"
              >
                <span>ចាប់ផ្តើមធ្វើតេស្តឥឡូវនេះ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Track Classification Assessment Card (MoEYS Appendix 12) */}
          <div className="bg-white rounded-[28px] border-2 border-[#FED7AA] hover:border-[#FDBA74] p-6 sm:p-7 shadow-[0_4px_20px_rgba(180,160,140,0.15)] hover:shadow-[0_8px_28px_rgba(180,160,140,0.22)] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FCEAD4] text-[#C2410C] text-xs font-bold border-2 border-[#FED7AA]">
                  ថ្នាក់ទី ៩ ឡើងទី ១០ • ឧបសម្ព័ន្ធ ១២
                </span>
                <div className="w-9 h-9 rounded-full bg-[#FCEAD4] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shadow-2xs group-hover:scale-105 transition-transform">
                  <Layers className="w-4.5 h-4.5" />
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1E293B] leading-snug group-hover:text-amber-700 transition-colors">
                  តេស្តញែកប្រភេទថ្នាក់ (MoEYS)
                </h2>
                <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                  Class & Track Selection Assessment (Science / Social Science)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed khmer-content">
                កម្រងតេស្តវាយតម្លៃ ១៦ ក្រុមជំនាញ (កម្រិតចំណូលចិត្ត និងជំនាញជាក់ស្តែង) ដើម្បីជួយសិស្សកំណត់គន្លងសិក្សាថ្នាក់ទី ១០។
              </p>

              <div className="pt-2 grid grid-cols-3 gap-2 py-3 px-2 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-xs text-stone-700 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-amber-600 mb-1" />
                  <span className="font-extrabold text-[#1E293B] text-[11px]">១៥ - ២០ នាទី</span>
                </div>
                <div className="flex flex-col items-center justify-center border-x-2 border-stone-200/70 px-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mb-1" />
                  <span className="font-extrabold text-[#1E293B] text-[11px]">១៦ ក្រុម</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-indigo-600 mb-1" />
                  <span className="font-extrabold text-[#1E293B] text-[11px]">គន្លងថ្នាក់ទី ១០</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/assessments/track-classification"
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 hover:shadow-lg"
              >
                <span>ចាប់ផ្តើមតេស្តញែកប្រភេទថ្នាក់</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Career & University Major Explorer Card Banner */}
        <div className="max-w-4xl mx-auto pt-2">
          <div className="bg-gradient-to-r from-[#E0F2FE]/70 via-white to-[#FEF3C7]/70 rounded-[28px] p-6 sm:p-8 border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.15)] hover:shadow-[0_8px_28px_rgba(180,160,140,0.2)] transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 flex-1 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-stone-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Compass className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <span className="inline-block text-xs font-black px-3 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200 shadow-2xs">
                  មគ្គុទ្ទេសក៍អាជីព • ១៣៦ មុខជំនាញ
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E293B] tracking-tight leading-snug">
                  ស្វែងយល់ពីមុខជំនាញ និងអាជីពការងារ (Career & Major Explorer)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  ពិនិត្យមើលមុខជំនាញសិក្សានៅឧត្តមសិក្សា មុខវិជ្ជាតម្រង់ទិស ម.ទុតិយភូមិ និងឱកាសការងារសម្រាប់ផ្នែកវិទ្យាសាស្ត្រ និងវិទ្យាសាស្ត្រសង្គម
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/careers"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg whitespace-nowrap active:scale-95"
              >
                <span>ស្វែងយល់ពីមុខជំនាញ</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-stone-200/90 bg-white py-6 pb-16 sm:pb-6 text-xs text-stone-500 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-700 font-medium text-center sm:text-left">
            ប្រព័ន្ធវាយតម្លៃចំណង់ចំណូលចិត្ត និងការតម្រង់ទិសអាជីពសិស្ស
          </p>
          <div className="flex items-center gap-4 text-stone-500">
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
