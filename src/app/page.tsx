"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  Clock,
  CheckCircle2,
  LayoutGrid,
  BookOpen,
  BarChart3,
  Lightbulb,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  // Assessment Carousel state
  const [assessmentSlide, setAssessmentSlide] = useState(0);
  const assessmentCarouselRef = useRef<HTMLDivElement>(null);

  const scrollToAssessmentSlide = (index: number) => {
    setAssessmentSlide(index);
    if (assessmentCarouselRef.current) {
      const children = assessmentCarouselRef.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleAssessmentScroll = () => {
    if (assessmentCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = assessmentCarouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 10) {
        const ratio = scrollLeft / maxScroll;
        if (ratio < 0.3) setAssessmentSlide(0);
        else if (ratio < 0.7) setAssessmentSlide(1);
        else setAssessmentSlide(2);
      }
    }
  };

  // Steps Carousel state
  const [stepSlide, setStepSlide] = useState(0);
  const stepsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollToStepSlide = (index: number) => {
    setStepSlide(index);
    if (stepsCarouselRef.current) {
      const children = stepsCarouselRef.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleStepsScroll = () => {
    if (stepsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = stepsCarouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 10) {
        const ratio = scrollLeft / maxScroll;
        if (ratio < 0.3) setStepSlide(0);
        else if (ratio < 0.7) setStepSlide(1);
        else setStepSlide(2);
      }
    }
  };

  const steps = [
    {
      step: "01",
      bgColor: "bg-white",
      badgeColor: "bg-[#E8E5F7] text-[#4338CA] border-2 border-[#C7D2FE]",
      iconBg: "bg-[#E8E5F7] text-[#4338CA] border-2 border-[#C7D2FE]",
      hoverBorder: "hover:border-[#C7D2FE]",
      title: "បំពេញព័ត៌មានសិស្ស",
      desc: "គ្រាន់តែបញ្ចូលឈ្មោះ ថ្នាក់ អាយុ និងសាលារៀន មិនបាច់បង្កើតគណនី ឬផ្តល់ពាក្យសម្ងាត់ឡើយ។",
      icon: BookOpen,
    },
    {
      step: "02",
      bgColor: "bg-white",
      badgeColor: "bg-[#EAF3EA] text-[#15803D] border-2 border-[#BBF7D0]",
      iconBg: "bg-[#EAF3EA] text-[#15803D] border-2 border-[#BBF7D0]",
      hoverBorder: "hover:border-[#BBF7D0]",
      title: "ឆ្លើយសំណួរដោយស្មោះត្រង់",
      desc: "ជ្រើសរើសសកម្មភាព ឬជំនាញដែលអ្នកចូលចិត្តពិតប្រាកដ ដោយគ្មានពិន្ទុខុស ឬត្រូវនោះទេ។",
      icon: CheckCircle2,
    },
    {
      step: "03",
      bgColor: "bg-white",
      badgeColor: "bg-[#FCEAD4] text-[#C2410C] border-2 border-[#FED7AA]",
      iconBg: "bg-[#FCEAD4] text-[#C2410C] border-2 border-[#FED7AA]",
      hoverBorder: "hover:border-[#FED7AA]",
      title: "ទទួលការវិភាគ និងទិសដៅ",
      desc: "ទទួលបានតារាងពិន្ទុ ក្រាហ្វិកច្បាស់លាស់ និងការណែនាំគន្លងសិក្សាភ្លាមៗ ព្រមទាំងអាចបោះពុម្ពបាន។",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col font-sans relative selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      {/* Playful Hand-sketched Background Doodles */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-40">
        {/* Little Star Top-Left */}
        <svg className="absolute top-12 left-8 w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.2 8.6L21 9.2L15.8 13.7L17.4 20.4L12 16.8L6.6 20.4L8.2 13.7L3 9.2L9.8 8.6L12 2Z" />
        </svg>

        {/* Paper Airplane Top-Right */}
        <svg className="absolute top-20 right-12 w-9 h-9 text-blue-300 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>

        {/* Floating Sprout Leaf */}
        <svg className="absolute top-72 left-1/4 w-7 h-7 text-emerald-300 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22C12 22 4 16 4 9C4 5 7 2 12 2C17 2 20 5 20 9C20 16 12 22 12 22Z" />
          <path d="M12 2V22" />
        </svg>

        {/* Tiny Sparkle Near Center */}
        <svg className="absolute top-[480px] right-16 w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9L12 0Z" />
        </svg>

        {/* Sketchy Lightbulb Bottom */}
        <svg className="absolute top-[820px] left-10 w-8 h-8 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
        </svg>
      </div>

      {/* 1. Top Navigation Bar */}
      <header className="border-b-2 border-stone-200/90 bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-40 transition-shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between relative z-10">
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border-2 border-stone-300/90 shadow-2xs flex items-center justify-center shrink-0 ring-4 ring-amber-100/60 group-hover:scale-105 transition-transform">
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
                តេស្តស្វែងយល់ពីខ្លួនឯង
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium block">
                Student Personality & Career Guidance
              </span>
            </div>
          </Link>

          {/* Sketchy Pill Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/careers"
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] border-2 border-[#BAE6FD] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 hover:shadow-sm shrink-0"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0284C7] shrink-0" />
              <span className="hidden sm:inline">មុខជំនាញ និងអាជីព</span>
              <span className="sm:hidden">មុខជំនាញ</span>
            </Link>

            <Link
              href="/assessments"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-stone-50 active:bg-stone-100 text-[#1E293B] border-2 border-stone-300 font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 hover:shadow-sm shrink-0"
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 shrink-0" />
              <span className="hidden sm:inline">កម្រងតេស្តទាំងអស់</span>
              <span className="sm:hidden">កម្រងតេស្ត</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center relative z-10">
        {/* 1. Hero Section (2-Column Split) */}
        <section className="w-full relative pt-8 pb-12 sm:pt-12 sm:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Text & Assessment Options (Order 2 on mobile, Order 1 on desktop) */}
              <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Expressive Headline with Hand-painted Highlighter under 'ទិសដៅអនាគត' */}
                <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-[#1E293B] leading-snug sm:leading-tight mb-3 sm:mb-4 tracking-tight">
                  ស្វែងយល់ពីចំណុចខ្លាំង ចំណង់ចំណូលចិត្ត និង
                  <span className="relative inline-block ml-1.5">
                    <span className="relative z-10">ទិសដៅអនាគត</span>
                    {/* Warm hand-painted brush underline effect */}
                    <svg
                      className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-3 sm:h-3.5 text-[#FCEAD4] -z-0"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                      fill="currentColor"
                    >
                      <path d="M2,7 Q48,1 98,6 Q52,12 2,7 Z" />
                    </svg>
                  </span>
                </h1>

                {/* Friendly Subtitle */}
                <p className="text-xs sm:text-sm text-stone-600 max-w-xl mb-6 leading-relaxed khmer-content">
                  ឧបករណ៍វាយតម្លៃបែបវិទ្យាសាស្ត្រ និងចិត្តវិទ្យាអប់រំ ជួយសិស្សានុសិស្សក្នុងការស្វែងយល់ពីបុគ្គលិកលក្ខណៈ ចំណង់ចំណូលចិត្តការងារ និងការជ្រើសរើសគន្លងសិក្សាឱ្យបានច្បាស់លាស់។
                </p>

                {/* Horizontal CTA Buttons (Stay side-by-side in one line, responsive labels) */}
                <div className="flex flex-row gap-2 sm:gap-3.5 w-full max-w-lg mb-6">
                  <Link
                    href="/assessments/track-classification"
                    className="flex-1 h-11 sm:h-12 px-3 sm:px-5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-center touch-manipulation active:scale-95 whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">តេស្តញែកប្រភេទថ្នាក់</span>
                    <span className="sm:hidden">តេស្តញែកថ្នាក់</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>

                  <Link
                    href="/assessments/holland-riasec"
                    className="flex-1 h-11 sm:h-12 px-3 sm:px-5 rounded-full bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 border-2 border-stone-300 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-center touch-manipulation active:scale-95 whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">តេស្ត Holland RIASEC</span>
                    <span className="sm:hidden">តេស្ត RIASEC</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0 text-stone-400" />
                  </Link>
                </div>

                {/* 3 Trust Badges (Wrap cleanly on mobile with comfortable text size) */}
                <div className="pt-4 border-t-2 border-stone-200/90 w-full max-w-lg flex flex-wrap justify-center lg:justify-start gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-xs text-stone-700">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-4 h-4 rounded-full bg-[#EAF3EA] border border-[#16A34A]/30 flex items-center justify-center text-[#15803D] text-[10px] shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold">ឥតគិតថ្លៃ ១០០%</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-4 h-4 rounded-full bg-[#E0F2FE] border border-[#0284C7]/30 flex items-center justify-center text-[#0369A1] text-[10px] shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold">មិនបាច់បង្កើតគណនី</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-4 h-4 rounded-full bg-[#E8E5F7] border border-[#6366F1]/30 flex items-center justify-center text-[#4338CA] text-[10px] shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold">របាយការណ៍បោះពុម្ពបាន</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Graphic Illustration (Order 1 on mobile, Order 2 on desktop) */}
              <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center mb-2 lg:mb-0 w-full">
                <div className="relative w-full max-w-[220px] sm:max-w-[340px] lg:max-w-[460px]">
                  {/* Storybook-style Pastel Ambient Glow & Frame */}
                  <div className="absolute inset-0 -m-3 sm:-m-5 rounded-[32px] bg-gradient-to-tr from-[#E0F2FE]/60 via-[#E8E5F7]/40 to-[#EAF3EA]/60 blur-xl -z-10" />

                  {/* Main Hero Illustration */}
                  <div className="relative w-full flex items-center justify-center p-1 sm:p-2 max-h-[190px] sm:max-h-none overflow-hidden">
                    <Image
                      src="/Workplace-Personality-Tests-removebg-preview.png"
                      alt="Student Assessment Illustration"
                      width={612}
                      height={408}
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 340px, 460px"
                      className="w-full h-auto max-h-[190px] sm:max-h-none object-contain drop-shadow-md select-none hover:scale-102 transition-transform duration-300"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider (90% stretch from center) */}
        <div className="w-[90%] max-w-5xl mx-auto h-[2px] bg-stone-200/80 rounded-full" />

        {/* 2. Grade-Level Assessment Selection Section */}
        <section className="w-full max-w-5xl px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 relative px-4">
            {/* Playful Floating Doodles around the title */}
            {/* Doodle 1: Sparkle Star (Top Left) */}
            <div className="absolute -top-7 left-0 sm:-left-6 text-amber-400 select-none pointer-events-none opacity-75">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 rotate-12 drop-shadow-2xs" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>

            {/* Doodle 2: Hand-drawn Curly Swoosh / Arrow (Top Right) */}
            <div className="absolute -top-8 right-0 sm:-right-7 text-blue-400 select-none pointer-events-none opacity-75">
              <svg className="w-7 h-7 sm:w-9 sm:h-9 -rotate-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 28C14 14 26 10 32 18C34 21 31 27 25 24C19 21 21 13 28 8" />
                <path d="M25 6L29 8L27 12" />
              </svg>
            </div>

            {/* Doodle 3: Mini Sprout / Plant Doodle (Bottom Left) */}
            <div className="absolute -bottom-4 -left-3 sm:-left-8 text-emerald-400/80 select-none pointer-events-none hidden sm:block">
              <svg className="w-6 h-6 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-9" />
                <path d="M12 13c0-4.5 3.5-7 8-7 0 4.5-2.5 8-7 8" />
                <path d="M12 15c0-4-3-6-7-6 0 4 2 7 7 7" />
              </svg>
            </div>

            {/* Doodle 4: Mini Constellation Star (Bottom Right) */}
            <div className="absolute -bottom-4 -right-2 sm:-right-8 text-purple-400/80 select-none pointer-events-none hidden sm:block">
              <svg className="w-5 h-5 rotate-45" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
              </svg>
            </div>

            {/* Soft Organic Pastel Halo behind the text */}
            <div className="absolute inset-0 -m-3 sm:-m-5 rounded-full bg-gradient-to-r from-amber-100/40 via-purple-100/30 to-blue-100/40 blur-xl -z-10 pointer-events-none" />

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight relative z-10">
              ជ្រើសរើសការវាយតម្លៃសមស្រប
              <span className="relative inline-block ml-1.5">
                <span className="relative z-10">សម្រាប់អ្នក</span>
                {/* Warm hand-painted brush underline */}
                <svg
                  className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-3 sm:h-3.5 text-[#FCEAD4] -z-0"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M2,7 Q48,1 98,6 Q52,12 2,7 Z" />
                </svg>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 relative z-10 max-w-xl mx-auto">
              ជ្រើសរើសតាមកម្រិតថ្នាក់បច្ចុប្បន្នរបស់អ្នក ដើម្បីទទួលបានលទ្ធផលត្រឹមត្រូវបំផុត
            </p>
          </div>

          {/* Carousel Top Controls: Assessment Tabs + Arrow Buttons */}
          <div className="flex items-center justify-between gap-2.5 max-w-5xl mx-auto mb-4">
            {/* Quick Assessment Switcher Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(0)}
                className={`min-h-[36px] px-3 sm:px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-black border transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  assessmentSlide === 0
                    ? "bg-[#0284C7] text-white border-[#0284C7] shadow-xs"
                    : "bg-white text-[#1E293B] border-stone-200 hover:bg-stone-50"
                }`}
              >
                <span>🎯 តេស្ត Holland RIASEC</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${assessmentSlide === 0 ? "bg-white/20 text-white" : "bg-[#E0F2FE] text-[#0369A1]"}`}>
                  ថ្នាក់ទី ៧
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(1)}
                className={`min-h-[36px] px-3 sm:px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-black border transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  assessmentSlide === 1
                    ? "bg-[#EA580C] text-white border-[#EA580C] shadow-xs"
                    : "bg-white text-[#1E293B] border-stone-200 hover:bg-stone-50"
                }`}
              >
                <span>📐 តេស្តញែកប្រភេទថ្នាក់</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${assessmentSlide === 1 ? "bg-white/20 text-white" : "bg-[#FCEAD4] text-[#C2410C]"}`}>
                  ថ្នាក់ទី ៩-១០
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(2)}
                className={`min-h-[36px] px-3 sm:px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-black border transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  assessmentSlide === 2
                    ? "bg-[#4338CA] text-white border-[#4338CA] shadow-xs"
                    : "bg-white text-[#1E293B] border-stone-200 hover:bg-stone-50"
                }`}
              >
                <span>🧭 មគ្គុទ្ទេសក៍មុខជំនាញ & អាជីព</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${assessmentSlide === 2 ? "bg-white/20 text-white" : "bg-[#E8E5F7] text-[#4338CA]"}`}>
                  ១៣៦ ជំនាញ
                </span>
              </button>
            </div>

            {/* Carousel Arrow Navigation Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(Math.max(0, assessmentSlide - 1))}
                disabled={assessmentSlide === 0}
                className="w-9 h-9 rounded-full bg-white border border-stone-300/80 hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                title="កាតមុន"
                aria-label="ទៅកាន់កាតមុន"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(Math.min(2, assessmentSlide + 1))}
                disabled={assessmentSlide === 2}
                className="w-9 h-9 rounded-full bg-white border border-stone-300/80 hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                title="កាតបន្ទាប់"
                aria-label="ទៅកាន់កាតបន្ទាប់"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Scrollable Container (3 Cards) */}
          <div
            ref={assessmentCarouselRef}
            onScroll={handleAssessmentScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 sm:gap-6 pb-2 pt-1 scroll-smooth items-stretch max-w-5xl mx-auto"
          >
            {/* 1. Holland RIASEC Card (Grade 7) */}
            <div className="w-[88vw] max-w-[420px] shrink-0 snap-center md:flex-1 md:max-w-none md:shrink-0 flex flex-col">
              <div className="h-full bg-white rounded-[28px] p-6 sm:p-7 border-2 border-[#BAE6FD] hover:border-[#7DD3FC] shadow-[0_4px_20px_rgba(180,160,140,0.15)] hover:shadow-[0_8px_28px_rgba(180,160,140,0.22)] transition-all flex flex-col justify-between group">
                <div>
                  {/* Top Row: Pastel Badge + Vector Illustration Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] border-2 border-[#BAE6FD]">
                      ថ្នាក់ទី ៧ • RIASEC
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shadow-2xs group-hover:scale-105 transition-transform" title="Holland RIASEC Profiler">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1E293B] mb-1 group-hover:text-blue-700 transition-colors">
                    តេស្ត Holland RIASEC
                  </h3>
                  <p className="text-[11px] font-medium text-stone-500 mb-3">
                    Holland Personality & Career Guidance
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed khmer-content mb-5">
                    ស្វែងរកកូដ Holland ផ្ទាល់ខ្លួន តាមរយៈ ៦ ប្រភេទបុគ្គលិកលក្ខណៈ ដើម្បីស្វែងយល់ពីចំណង់ចំណូលចិត្តការងារ និងអាជីពត្រូវនឹងខ្លួន។
                  </p>

                  {/* 3 Pastel Stat Pills with Icons */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-center text-xs text-stone-700 mb-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>សំណួរ</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">៤៨ សំណួរ</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-x-2 border-stone-200/70 px-1">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>រយៈពេល</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">៥ - ១០ នាទី</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-0.5">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <Award className="w-3 h-3 text-indigo-600 shrink-0" />
                        <span>លទ្ធផល</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">Holland Code</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/assessments/holland-riasec"
                    className="w-full py-2.5 px-5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg"
                  >
                    <span>ចាប់ផ្តើមតេស្ត RIASEC</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Track Classification Card (Grade 9 & 10) */}
            <div className="w-[88vw] max-w-[420px] shrink-0 snap-center md:flex-1 md:max-w-none md:shrink-0 flex flex-col">
              <div className="h-full bg-white rounded-[28px] p-6 sm:p-7 border-2 border-[#FED7AA] hover:border-[#FDBA74] shadow-[0_4px_20px_rgba(180,160,140,0.15)] hover:shadow-[0_8px_28px_rgba(180,160,140,0.22)] transition-all flex flex-col justify-between group">
                <div>
                  {/* Top Row: Pastel Badge + Vector Illustration Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FCEAD4] text-[#C2410C] border-2 border-[#FED7AA]">
                      ថ្នាក់ទី ៩ ឡើងទី ១០ • ឧបសម្ព័ន្ធ ១២
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FCEAD4] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shadow-2xs group-hover:scale-105 transition-transform" title="Track Selection">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1E293B] mb-1 group-hover:text-amber-700 transition-colors">
                    តេស្តញែកប្រភេទថ្នាក់ (MoEYS)
                  </h3>
                  <p className="text-[11px] font-medium text-stone-500 mb-3">
                    High School Track Selection (Science / Social Science)
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed khmer-content mb-5">
                    វាយតម្លៃលើ ១៦ ក្រុមជំនាញ (កម្រិតចំណូលចិត្ត និងជំនាញជាក់ស្តែង) ដើម្បីជួយសិស្សកំណត់គន្លងវិទ្យាសាស្ត្រ ឬវិទ្យាសាស្ត្រសង្គម នៅថ្នាក់ទី ១០។
                  </p>

                  {/* 3 Pastel Stat Pills with Icons */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-center text-xs text-stone-700 mb-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>ក្រុមជំនាញ</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">១៦ ក្រុម</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-x-2 border-stone-200/70 px-1">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>រយៈពេល</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">១៥ - ២០ នាទី</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-0.5">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <Award className="w-3 h-3 text-indigo-600 shrink-0" />
                        <span>លទ្ធផល</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">គន្លងថ្នាក់ទី ១០</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/assessments/track-classification"
                    className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 hover:shadow-lg"
                  >
                    <span>ចាប់ផ្តើមតេស្តញែកថ្នាក់</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Career & University Major Explorer Card */}
            <div className="w-[88vw] max-w-[420px] shrink-0 snap-center md:flex-1 md:max-w-none md:shrink-0 flex flex-col">
              <div className="h-full bg-white rounded-[28px] p-6 sm:p-7 border-2 border-[#C7D2FE] hover:border-[#818CF8] shadow-[0_4px_20px_rgba(180,160,140,0.15)] hover:shadow-[0_8px_28px_rgba(180,160,140,0.22)] transition-all flex flex-col justify-between group">
                <div>
                  {/* Top Row: Pastel Badge + Vector Illustration Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E8E5F7] text-[#4338CA] border-2 border-[#C7D2FE]">
                      ឧត្តមសិក្សា • ១៣៦ មុខជំនាញ
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#E8E5F7] border border-[#C7D2FE] flex items-center justify-center text-[#4338CA] shadow-2xs group-hover:scale-105 transition-transform" title="Career & Major Explorer">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1E293B] mb-1 group-hover:text-indigo-700 transition-colors">
                    មគ្គុទ្ទេសក៍មុខជំនាញ និងអាជីព
                  </h3>
                  <p className="text-[11px] font-medium text-stone-500 mb-3">
                    Career & Major Explorer (STEM & Social Science)
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed khmer-content mb-5">
                    ពិនិត្យមើលមុខជំនាញសិក្សានៅឧត្តមសិក្សា មុខវិជ្ជាស្នូលត្រូវត្រៀមក្នុងវិទ្យាល័យ និងឱកាសការងារស្របតាមស្តង់ដារ MoEYS។
                  </p>

                  {/* 3 Pastel Stat Pills with Icons */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-center text-xs text-stone-700 mb-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>វិទ្យាសាស្ត្រ</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">៧០ ជំនាញ</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-x-2 border-stone-200/70 px-1">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <BookOpen className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>សង្គមសាស្រ្ត</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">៦៦ ជំនាញ</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-0.5">
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mb-0.5 whitespace-nowrap">
                        <GraduationCap className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>បច្ចេកទេស</span>
                      </div>
                      <span className="font-extrabold text-[#1E293B] text-xs whitespace-nowrap">មាន TVET</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/careers"
                    className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20 hover:shadow-lg"
                  >
                    <span>ស្វែងយល់ពីមុខជំនាញ (១៣៦)</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots & Swipe Hint */}
          <div className="flex flex-col items-center gap-1.5 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(0)}
                className={`h-2 rounded-full transition-all ${
                  assessmentSlide === 0 ? "w-8 bg-[#0284C7]" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label="ទៅកាន់តេស្ត Holland RIASEC"
              />
              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(1)}
                className={`h-2 rounded-full transition-all ${
                  assessmentSlide === 1 ? "w-8 bg-[#EA580C]" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label="ទៅកាន់តេស្តញែកប្រភេទថ្នាក់"
              />
              <button
                type="button"
                onClick={() => scrollToAssessmentSlide(2)}
                className={`h-2 rounded-full transition-all ${
                  assessmentSlide === 2 ? "w-8 bg-[#4338CA]" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label="ទៅកាន់មគ្គុទ្ទេសក៍មុខជំនាញ និងអាជីព"
              />
            </div>
            <span className="text-[11px] font-medium text-stone-500">
              👉 អូសផ្តេក ឬចុចព្រួញសងខាងដើម្បីពិនិត្យតេស្ត និងមគ្គុទ្ទេសក៍អាជីព (Swipe to explore)
            </span>
          </div>
        </section>

        {/* Section Divider (90% stretch from center) */}
        <div className="w-[90%] max-w-5xl mx-auto h-[2px] bg-stone-200/80 rounded-full" />

        {/* 3. "How It Works" 3-Step Process Section */}
        <section id="how-it-works" className="w-full bg-[#FAF7F2] pt-14 pb-16 sm:pt-20 sm:pb-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 relative px-4">
              {/* Playful Floating Doodles around the title */}
              {/* Doodle 1: Hand-sketched Lightbulb (Top Left) */}
              <div className="absolute -top-7 left-0 sm:-left-6 text-amber-400 select-none pointer-events-none opacity-75">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 rotate-12 drop-shadow-2xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
                </svg>
              </div>

              {/* Doodle 2: Tiny Flying Paper Airplane (Top Right) */}
              <div className="absolute -top-8 right-0 sm:-right-6 text-blue-400 select-none pointer-events-none opacity-75">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 -rotate-12 drop-shadow-2xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>

              {/* Doodle 3: Four-point Sparkle (Bottom Left) */}
              <div className="absolute -bottom-4 -left-3 sm:-left-8 text-purple-400/80 select-none pointer-events-none hidden sm:block">
                <svg className="w-5 h-5 rotate-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>

              {/* Doodle 4: Sprout Leaf (Bottom Right) */}
              <div className="absolute -bottom-4 -right-2 sm:-right-8 text-emerald-400/80 select-none pointer-events-none hidden sm:block">
                <svg className="w-6 h-6 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-9" />
                  <path d="M12 13c0-4.5 3.5-7 8-7 0 4.5-2.5 8-7 8" />
                  <path d="M12 15c0-4-3-6-7-6 0 4 2 7 7 7" />
                </svg>
              </div>

              {/* Soft Organic Pastel Halo behind the text */}
              <div className="absolute inset-0 -m-3 sm:-m-5 rounded-full bg-gradient-to-r from-purple-100/40 via-blue-100/30 to-emerald-100/40 blur-xl -z-10 pointer-events-none" />

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight relative z-10">
                ដំណើរការធ្វើតេស្តងាយៗ
                <span className="relative inline-block ml-1.5">
                  <span className="relative z-10">៣ ជំហាន</span>
                  {/* Soft lavender brush underline */}
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-3 sm:h-3.5 text-[#E8E5F7] -z-0"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M2,7 Q48,1 98,6 Q52,12 2,7 Z" />
                  </svg>
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 relative z-10 max-w-xl mx-auto">
                អ្នកអាចបញ្ចប់ការធ្វើតេស្ត និងទទួលបានរបាយការណ៍វិភាគក្នុងរយៈពេលត្រឹមតែប៉ុន្មាននាទី
              </p>
            </div>

            {/* Carousel Top Controls: Steps Tabs + Arrow Buttons */}
            <div className="flex items-center justify-between gap-2.5 max-w-5xl mx-auto mb-4">
              {/* Quick Step Switcher Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
                {steps.map((item, idx) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => scrollToStepSlide(idx)}
                    className={`min-h-[36px] px-3 sm:px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-black border transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                      stepSlide === idx
                        ? "bg-[#1E293B] text-white border-[#1E293B] shadow-xs"
                        : "bg-white text-[#1E293B] border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <span>ជំហាន {item.step}</span>
                  </button>
                ))}
              </div>

              {/* Carousel Arrow Navigation Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToStepSlide(Math.max(0, stepSlide - 1))}
                  disabled={stepSlide === 0}
                  className="w-9 h-9 rounded-full bg-white border border-stone-300/80 hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                  title="ជំហានមុន"
                  aria-label="ទៅកាន់ជំហានមុន"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToStepSlide(Math.min(steps.length - 1, stepSlide + 1))}
                  disabled={stepSlide === steps.length - 1}
                  className="w-9 h-9 rounded-full bg-white border border-stone-300/80 hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                  title="ជំហានបន្ទាប់"
                  aria-label="ទៅកាន់ជំហានបន្ទាប់"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Scrollable Container */}
            <div
              ref={stepsCarouselRef}
              onScroll={handleStepsScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 sm:gap-6 pb-2 pt-1 scroll-smooth items-stretch max-w-5xl mx-auto"
            >
              {steps.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.step}
                    className="w-[86vw] max-w-[360px] shrink-0 snap-center md:flex-1 md:max-w-none md:shrink-0 flex flex-col"
                  >
                    <div
                      className={`h-full p-6 sm:p-7 rounded-[28px] bg-white border-2 border-stone-200/90 shadow-[0_4px_16px_rgba(180,160,140,0.12)] ${item.hoverBorder} hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(180,160,140,0.2)] transition-all duration-300 flex flex-col justify-between`}
                    >
                      <div>
                        {/* Top Header of Step Card */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${item.badgeColor} font-mono shadow-2xs`}>
                            ជំហាន {item.step}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-[#1E293B] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed khmer-content">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Pagination Dots & Swipe Hint */}
            <div className="flex flex-col items-center gap-1.5 pt-3">
              <div className="flex items-center gap-2">
                {steps.map((item, idx) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => scrollToStepSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      stepSlide === idx ? "w-8 bg-[#1E293B]" : "w-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                    aria-label={`ទៅកាន់ជំហានទី ${item.step}`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-stone-500">
                👉 អូសផ្តេក ឬចុចព្រួញសងខាងដើម្បីពិនិត្យជំហាននីមួយៗ (Swipe to see steps)
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-stone-200/90 bg-white py-6 pb-20 sm:pb-8 text-xs text-stone-500 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-stone-300 shadow-2xs flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Personality Test Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <p className="text-stone-700 font-medium">
              ប្រព័ន្ធវាយតម្លៃ និងតម្រង់ទិសអាជីពសិស្ស (Student Assessment Platform)
            </p>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <Link href="/assessments" className="hover:text-stone-800 transition-colors">
              កម្រងតេស្តទាំងអស់
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-stone-800 underline underline-offset-2 transition-colors">
              ផ្ទាំងគ្រប់គ្រង (Admin)
            </Link>
            <span>•</span>
            <span>© 2026-2027</span>
          </div>
        </div>
      </footer>
    </div>
  );
}