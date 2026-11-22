"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { MajorItem, CareerTrack } from "@/types/career";
import { PlatformNavbar } from "@/components/shared/PlatformNavbar";
import { FilterBar, CategoryCount } from "./FilterBar";
import { CategorySection } from "./CategorySection";
import { DetailDrawer } from "./DetailDrawer";
import { CompareBar } from "./CompareBar";
import scienceMajorsData from "@/data/science_majors.json";
import socialMajorsData from "@/data/social_science_majors.json";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  BookOpen,
  ChevronRight,
  Search,
  RotateCcw,
  ArrowUp,
} from "lucide-react";

const scienceMajors = scienceMajorsData as unknown as MajorItem[];
const socialMajors = socialMajorsData as unknown as MajorItem[];

interface TrackExplorerViewProps {
  track: CareerTrack;
}

export function TrackExplorerView({ track }: TrackExplorerViewProps) {
  const isScience = track === "science";
  const allMajors = isScience ? scienceMajors : socialMajors;

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ទាំងអស់");
  const [sortBy, setSortBy] = useState<"number" | "name" | "careers">("number");

  // Interaction states
  const [selectedMajor, setSelectedMajor] = useState<MajorItem | null>(null);
  const [compareList, setCompareList] = useState<MajorItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate brief skeleton load for smooth hydration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [track]);

  // Handle Scroll for Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compute category counts
  const categoryCounts = useMemo<CategoryCount[]>(() => {
    const countsMap: Record<string, number> = {};
    allMajors.forEach((m) => {
      countsMap[m.category] = (countsMap[m.category] || 0) + 1;
    });
    return Object.entries(countsMap).map(([name, count]) => ({ name, count }));
  }, [allMajors]);

  // Filtered & Sorted majors
  const filteredMajors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = allMajors.filter((major) => {
      // 1. Text Search (Khmer name, English name, category, careers, workplaces)
      if (q) {
        const matchTitleKh = major.major_name_kh?.toLowerCase().includes(q);
        const matchTitleEn = major.major_name_en?.toLowerCase().includes(q);
        const matchCat = major.category?.toLowerCase().includes(q);
        const matchDesc = major.description_kh?.toLowerCase().includes(q);
        const matchCareers = major.career_positions?.some((pos) => pos.toLowerCase().includes(q));
        const matchWorkplaces = major.workplaces?.some((wp) => wp.toLowerCase().includes(q));

        if (!matchTitleKh && !matchTitleEn && !matchCat && !matchDesc && !matchCareers && !matchWorkplaces) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "ទាំងអស់" && major.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    // 3. Sorting
    return list.sort((a, b) => {
      if (sortBy === "name") {
        return a.major_name_kh.localeCompare(b.major_name_kh, "km");
      }
      if (sortBy === "careers") {
        return (b.career_positions?.length || 0) - (a.career_positions?.length || 0);
      }
      return a.number - b.number;
    });
  }, [allMajors, searchQuery, selectedCategory, sortBy]);

  // Group majors by Category for Section-based Display
  const groupedByCategory = useMemo(() => {
    const groups: { categoryName: string; majors: MajorItem[] }[] = [];
    const map = new Map<string, MajorItem[]>();

    filteredMajors.forEach((major) => {
      if (!map.has(major.category)) {
        map.set(major.category, []);
      }
      map.get(major.category)!.push(major);
    });

    map.forEach((majors, categoryName) => {
      groups.push({ categoryName, majors });
    });

    return groups;
  }, [filteredMajors]);

  // Compare Checkbox Handlers
  const handleToggleCompare = (major: MajorItem, checked: boolean) => {
    if (checked) {
      if (compareList.length < 3 && !compareList.some((m) => m.id === major.id)) {
        setCompareList([...compareList, major]);
      }
    } else {
      setCompareList(compareList.filter((m) => m.id !== major.id));
    }
  };

  const handleRemoveCompare = (majorId: string) => {
    setCompareList(compareList.filter((m) => m.id !== majorId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const isFiltered = searchQuery !== "" || selectedCategory !== "ទាំងអស់" || sortBy !== "number";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ទាំងអស់");
    setSortBy("number");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B2430] pb-24 selection:bg-[#EAF1FF] selection:text-[#1F5BFF] relative">
      {/* 1. Header Navigation */}
      <PlatformNavbar />

      <main className="max-w-[1200px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-4 sm:space-y-6">
        {/* Navigation Breadcrumb & Back Links Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-bold text-[#5B6675]">
            <Link href="/" className="hover:text-[#1F5BFF] transition-colors">
              ទំព័រដើម
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <Link href="/careers" className="hover:text-[#1F5BFF] transition-colors">
              មគ្គុទ្ទេសក៍អាជីព
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-[#1B2430]">
              {isScience ? "ផ្នែកវិទ្យាសាស្ត្រ" : "ផ្នែកវិទ្យាសាស្ត្រសង្គម"}
            </span>
          </nav>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/careers"
              className="min-h-[36px] sm:min-h-[40px] inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white hover:bg-stone-50 border-2 border-[#E6E8EC] text-[#1B2430] text-[11px] sm:text-[13px] font-bold shadow-2xs transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B6675]" />
              <span>ត្រឡប់ទៅជ្រើសរើសគន្លង</span>
            </Link>

            {isScience ? (
              <Link
                href="/careers/social"
                className="min-h-[36px] sm:min-h-[40px] inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FFF4E0] hover:bg-[#FFE8C2] border border-[#FED7AA] text-[#E37400] text-[11px] sm:text-[13px] font-black shadow-2xs transition-all active:scale-95"
              >
                <span>វិទ្យាសាស្ត្រសង្គម (៦៦)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E37400]" />
              </Link>
            ) : (
              <Link
                href="/careers/science"
                className="min-h-[36px] sm:min-h-[40px] inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#EAF1FF] hover:bg-[#D4E4FF] border border-[#BAE6FD] text-[#1F5BFF] text-[11px] sm:text-[13px] font-black shadow-2xs transition-all active:scale-95"
              >
                <span>វិទ្យាសាស្ត្រ (៧០)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1F5BFF]" />
              </Link>
            )}
          </div>
        </div>

        {/* Page Header: Track Name, Count Badge, Short Description */}
        <div className="space-y-1.5 sm:space-y-2 pt-0.5 sm:pt-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <h1 className="text-[20px] sm:text-[30px] md:text-[36px] font-black text-[#1B2430] leading-tight tracking-tight">
              {isScience
                ? "មុខជំនាញឧត្តមសិក្សា ផ្នែកវិទ្យាសាស្ត្រ"
                : "មុខជំនាញឧត្តមសិក្សា ផ្នែកវិទ្យាសាស្ត្រសង្គម"}
            </h1>
            <span
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-[13px] font-black border shadow-2xs ${
                isScience
                  ? "bg-[#EAF1FF] text-[#1F5BFF] border-[#BAE6FD]"
                  : "bg-[#FFF4E0] text-[#E37400] border-[#FED7AA]"
              }`}
            >
              {allMajors.length} មុខជំនាញ
            </span>
          </div>

          <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#5B6675] leading-[20px] sm:leading-[24px] font-medium max-w-3xl khmer-content">
            {isScience
              ? "បណ្តុំមុខជំនាញ STEM រួមមានវិស្វកម្ម បច្ចេកវិទ្យា វេជ្ជសាស្ត្រ កសិកម្ម និងវិទ្យាសាស្ត្រធម្មជាតិ ស្របតាមតម្រូវការទីផ្សារការងារឌីជីថល ៤.០។"
              : "បណ្តុំមុខជំនាញសង្គមសាស្រ្ត មនុស្សសាស្រ្ត សេដ្ឋកិច្ច ច្បាប់ គរុកោសល្យ និងសិល្បៈ សម្រាប់អភិវឌ្ឍន៍សង្គម និងការគ្រប់គ្រងស្ថាប័ន។"}
          </p>
        </div>

        {/* 2. Sticky Toolbar (Search input, category dropdown, sort, scrollable chips) */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categoryCounts={categoryCounts}
          totalResults={filteredMajors.length}
          track={track}
          onReset={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* 3. Result Section: Group Results Under Category Headers */}
        {isLoading ? (
          /* Skeleton Loading State */
          <div className="space-y-8 pt-4">
            {[1, 2].map((s) => (
              <div key={s} className="space-y-4 animate-pulse">
                <div className="h-8 w-48 bg-stone-200 rounded-lg" />
                <div className="flex gap-3 sm:gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-[275px] sm:w-[310px] h-56 sm:h-64 shrink-0 bg-white rounded-[16px] sm:rounded-[20px] border-2 border-stone-200" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groupedByCategory.length > 0 ? (
          <div className="space-y-10 pt-2">
            {groupedByCategory.map((group) => (
              <CategorySection
                key={group.categoryName}
                categoryName={group.categoryName}
                track={track}
                majors={group.majors}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-[20px] border-2 border-dashed border-[#E6E8EC] p-12 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-[16px] bg-[#FAF7F2] border border-[#E6E8EC] flex items-center justify-center text-[#5B6675] mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-[18px] font-black text-[#1B2430]">
                រកមិនឃើញមុខជំនាញដែលត្រូវគ្នាទេ
              </h3>
              <p className="text-[13px] text-[#5B6675] mt-1">
                មិនមានលទ្ធផលត្រូវនឹងពាក្យគន្លឹះ ឬក្រុមជំនាញដែលអ្នកបានជ្រើសរើសឡើយ។
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="min-h-[44px] px-5 py-2.5 rounded-[14px] bg-[#1F5BFF] hover:bg-[#1849D6] text-white text-[13px] font-black flex items-center gap-2 mx-auto shadow-xs active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>សម្អាតតម្រង និងបង្ហាញទាំងអស់</span>
            </button>
          </div>
        )}
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#1B2430] hover:bg-[#1F5BFF] text-white flex items-center justify-center shadow-lg transition-all animate-in fade-in zoom-in-75 active:scale-95"
          title="ត្រឡប់ទៅលើវិញ"
          aria-label="ត្រឡប់ទៅលើវិញ"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Screen 3: Detail Drawer (Full page on mobile, right-side 560px drawer on desktop) */}
      <DetailDrawer
        major={selectedMajor}
        onClose={() => setSelectedMajor(null)}
      />

      {/* Sticky Bottom Compare Bar */}
      <CompareBar
        compareList={compareList}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
      />
    </div>
  );
}
