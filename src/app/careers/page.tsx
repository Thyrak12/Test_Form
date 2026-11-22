"use client";

import React, { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PlatformNavbar } from "@/components/shared/PlatformNavbar";
import { StatPill } from "@/components/careers/StatPill";
import { TrackCard } from "@/components/careers/TrackCard";
import { TrackExplorerView } from "@/components/careers/TrackExplorerView";
import {
  Compass,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

function CareersLandingContent() {
  const searchParams = useSearchParams();
  const trackParam = searchParams?.get("track");

  // Carousel State & Ref
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    setActiveSlide(index);
    if (carouselRef.current) {
      const children = carouselRef.current.children;
      if (children[index]) {
        (children[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 10) {
        const ratio = scrollLeft / maxScroll;
        setActiveSlide(ratio > 0.45 ? 1 : 0);
      }
    }
  };

  // If a specific track query parameter is given, directly render that track's explorer
  if (trackParam === "science") {
    return <TrackExplorerView track="science" />;
  }
  if (trackParam === "social_science" || trackParam === "social") {
    return <TrackExplorerView track="social_science" />;
  }

  // SCREEN 1: LANDING
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B2430] pb-20 selection:bg-[#EAF1FF] selection:text-[#1F5BFF]">
      {/* 1. Header with mobile hamburger and active 'Majors & Careers' */}
      <PlatformNavbar />

      <main className="max-w-[1200px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-5 sm:space-y-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-bold text-[#5B6675]">
          <Link href="/" className="hover:text-[#1F5BFF] transition-colors">
            ទំព័រដើម
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[#1B2430]">
            មគ្គុទ្ទេសក៍មុខជំនាញ និងអាជីព
          </span>
        </nav>

        {/* 2. Hero (Centered, Compact) */}
        <section className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto pt-1 sm:pt-2">
          {/* Small Pill: Ministry guideline - 136 majors */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-[13px] font-black bg-[#EAF1FF] border border-[#BAE6FD] text-[#1F5BFF] shadow-2xs">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1F5BFF]" />
            <span>មគ្គុទ្ទេសក៍ក្រសួងអប់រំ • ១៣៦ មុខជំនាញ</span>
          </div>

          {/* H1: Responsive Type scale (compact on mobile) */}
          <h1 className="text-[22px] sm:text-[32px] md:text-[40px] leading-[30px] sm:leading-[42px] md:leading-[48px] font-black text-[#1B2430] tracking-tight">
            ស្វែងយល់ពីមុខជំនាញ និងអាជីពការងារ
          </h1>

          {/* One-line Subtitle (Max 2 lines) */}
          <p className="text-[13px] sm:text-[15px] md:text-[16px] text-[#5B6675] leading-[22px] sm:leading-[26px] md:leading-[28px] font-medium max-w-2xl mx-auto khmer-content">
            ពិនិត្យមើលមុខជំនាញសិក្សានៅឧត្តមសិក្សា មុខវិជ្ជាស្នូលត្រូវត្រៀមក្នុងវិទ្យាល័យ និងឱកាសទីផ្សារការងារស្របតាមស្តង់ដារ MoEYS។
          </p>

          {/* 3-Stat Row with Large Numbers */}
          <StatPill />
        </section>

        {/* 3. Horizontal Carousel: Pure Science & Social Science Tracks */}
        <section className="space-y-3.5 pt-1 sm:pt-2">
          {/* Carousel Top Controls: Track Tabs + Arrow Buttons */}
          <div className="flex items-center justify-between gap-2.5">
            {/* Quick Track Switcher Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
              <button
                type="button"
                onClick={() => scrollToSlide(0)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-black border transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeSlide === 0
                    ? "bg-[#1F5BFF] text-white border-[#1F5BFF] shadow-xs"
                    : "bg-white text-[#1B2430] border-[#E6E8EC] hover:bg-stone-50"
                }`}
              >
                <span>🔬 ផ្នែកវិទ្យាសាស្ត្រ</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeSlide === 0 ? "bg-white/20 text-white" : "bg-stone-100 text-[#5B6675]"}`}>
                  ៧០
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSlide(1)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-black border transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeSlide === 1
                    ? "bg-[#E37400] text-white border-[#E37400] shadow-xs"
                    : "bg-white text-[#1B2430] border-[#E6E8EC] hover:bg-stone-50"
                }`}
              >
                <span>📚 ផ្នែកវិទ្យាសាស្ត្រសង្គម</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeSlide === 1 ? "bg-white/20 text-white" : "bg-stone-100 text-[#5B6675]"}`}>
                  ៦៦
                </span>
              </button>
            </div>

            {/* Carousel Arrow Navigation Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollToSlide(0)}
                disabled={activeSlide === 0}
                className="w-9 h-9 rounded-full bg-white border border-[#E6E8EC] hover:bg-stone-50 text-[#1B2430] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                title="គន្លងមុន (វិទ្យាសាស្ត្រ)"
                aria-label="ទៅកាន់ផ្នែកវិទ្យាសាស្ត្រ"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSlide(1)}
                disabled={activeSlide === 1}
                className="w-9 h-9 rounded-full bg-white border border-[#E6E8EC] hover:bg-stone-50 text-[#1B2430] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all shadow-2xs active:scale-95"
                title="គន្លងបន្ទាប់ (វិទ្យាសាស្ត្រសង្គម)"
                aria-label="ទៅកាន់ផ្នែកវិទ្យាសាស្ត្រសង្គម"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Scrollable Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 sm:gap-6 pb-2 pt-1 scroll-smooth items-stretch"
          >
            {/* Track 1: Science Track Card */}
            <div className="w-[88vw] max-w-[540px] shrink-0 snap-center md:flex-1 md:max-w-none md:shrink-0 flex flex-col">
              <TrackCard
                track="science"
                count={70}
                titleKh="ផ្នែកវិទ្យាសាស្ត្រ"
                titleEn="Science Track"
                descriptionKh="ផ្តោតលើការស្រាវជ្រាវ គណិតវិទ្យា វិស្វកម្ម វេជ្ជសាស្ត្រ និងបច្ចេកវិទ្យាឌីជីថល សម្រាប់សិស្សដែលមានបំណងបន្តការសិក្សាផ្នែក STEM។"
                subjects={["គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "ជីវវិទ្យា"]}
                fields={[
                  { icon: "🛠️", nameKh: "វិស្វកម្ម និងបច្ចេកវិទ្យា" },
                  { icon: "🏥", nameKh: "វិទ្យាសាស្ត្រសុខាភិបាល" },
                  { icon: "💻", nameKh: "បច្ចេកវិទ្យាព័ត៌មាន (IT)" },
                  { icon: "🌱", nameKh: "កសិកម្ម និងបរិស្ថាន" },
                ]}
                careers={["វិស្វករ", "វេជ្ជបណ្ឌិត", "អ្នកសរសេរកូដ", "អ្នកវិទ្យាសាស្ត្រ"]}
                href="/careers/science"
              />
            </div>

            {/* Track 2: Social Science Track Card */}
            <div className="w-[88vw] max-w-[540px] shrink-0 snap-center md:flex-1 md:max-w-none md:shrink-0 flex flex-col">
              <TrackCard
                track="social_science"
                count={66}
                titleKh="ផ្នែកវិទ្យាសាស្ត្រសង្គម"
                titleEn="Social Science Track"
                descriptionKh="ផ្តោតលើការគ្រប់គ្រង ទំនាក់ទំនង ច្បាប់ សេដ្ឋកិច្ច មនុស្សសាស្ត្រ និងសិល្បៈ សម្រាប់សិស្សដែលមានចំណូលចិត្តដឹកនាំ និងទំនាក់ទំនង។"
                subjects={["អក្សរសាស្ត្រខ្មែរ", "ប្រវត្តិវិទ្យា", "ភូមិវិទ្យា", "សីលធម៌-ពលរដ្ឋ", "សេដ្ឋកិច្ច"]}
                fields={[
                  { icon: "📊", nameKh: "សេដ្ឋកិច្ច និងធុរកិច្ច" },
                  { icon: "⚖️", nameKh: "នីតិសាស្ត្រ និងរដ្ឋបាល" },
                  { icon: "🎓", nameKh: "អប់រំ និងគរុកោសល្យ" },
                  { icon: "🎨", nameKh: "សិល្បៈ និងសារព័ត៌មាន" },
                ]}
                careers={["សហគ្រិន", "មេធាវី", "អ្នកការទូត", "សេដ្ឋវិទូ"]}
                href="/careers/social"
              />
            </div>
          </div>

          {/* Carousel Pagination Dots & Swipe Hint */}
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToSlide(0)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === 0 ? "w-8 bg-[#1F5BFF]" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label="ទៅកាន់ផ្នែកវិទ្យាសាស្ត្រ"
              />
              <button
                type="button"
                onClick={() => scrollToSlide(1)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === 1 ? "w-8 bg-[#E37400]" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label="ទៅកាន់ផ្នែកវិទ្យាសាស្ត្រសង្គម"
              />
            </div>
            <span className="text-[11px] font-medium text-[#5B6675]">
              👉 អូសផ្តេក ឬចុចព្រួញសងខាងដើម្បីពិនិត្យគន្លងនីមួយៗ (Swipe to explore)
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function CareersLandingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1F5BFF] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CareersLandingContent />
    </Suspense>
  );
}
