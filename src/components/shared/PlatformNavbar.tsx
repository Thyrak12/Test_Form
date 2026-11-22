"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Compass, LayoutGrid, Bookmark, Menu, X, Trash2, ArrowRight } from "lucide-react";

interface ShortlistItem {
  id: string;
  nameKh: string;
  track: "science" | "social_science";
  category: string;
}

interface PlatformNavbarProps {
  className?: string;
}

export function PlatformNavbar({ className = "" }: PlatformNavbarProps) {
  const pathname = usePathname();
  const isCareersActive = pathname?.startsWith("/careers");
  const isAssessmentsActive = pathname?.startsWith("/assessments");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([]);
  const [shortlistOpen, setShortlistOpen] = useState(false);

  // Sync shortlist from localStorage
  const loadShortlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("career_shortlist") || "[]");
      setShortlist(saved);
    } catch {
      setShortlist([]);
    }
  };

  useEffect(() => {
    loadShortlist();
    window.addEventListener("shortlistUpdated", loadShortlist);
    return () => {
      window.removeEventListener("shortlistUpdated", loadShortlist);
    };
  }, []);

  const handleRemoveShortlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = shortlist.filter((item) => item.id !== id);
    setShortlist(updated);
    localStorage.setItem("career_shortlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("shortlistUpdated"));
  };

  return (
    <header className={`border-b-2 border-[#E6E8EC] bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-40 transition-shadow no-print ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between relative z-10">
        {/* Logo & Platform Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border-2 border-stone-300 shadow-2xs flex items-center justify-center shrink-0 ring-4 ring-amber-100/60 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Platform Logo"
              width={44}
              height={44}
              className="w-full h-full object-contain p-0.5"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-[#1B2430] text-sm sm:text-base block leading-tight">
              តេស្តស្វែងយល់ពីខ្លួនឯង
            </span>
            <span className="text-[11px] text-[#5B6675] font-medium block">
              Student Personality & Career Guidance
            </span>
          </div>
        </Link>

        {/* Desktop Nav Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Shortlist Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShortlistOpen(!shortlistOpen)}
              className="min-h-[44px] px-3.5 py-2 rounded-full font-bold text-[13px] border-2 border-[#E6E8EC] bg-white hover:bg-stone-50 text-[#1B2430] flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
              title="មុខជំនាញដែលបានរក្សាទុក"
            >
              <Bookmark className={`w-4 h-4 ${shortlist.length > 0 ? "text-[#1F5BFF] fill-[#1F5BFF]" : "text-[#5B6675]"}`} />
              <span>បញ្ជីពេញចិត្ត</span>
              {shortlist.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1F5BFF] text-white text-[11px] font-black flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </button>

            {/* Shortlist Dropdown */}
            {shortlistOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-[20px] border-2 border-[#E6E8EC] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E8EC] px-1">
                  <span className="text-xs font-black text-[#1B2430]">
                    មុខជំនាញដែលបានរក្សាទុក ({shortlist.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setShortlistOpen(false)}
                    className="text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto py-2 space-y-1.5">
                  {shortlist.length > 0 ? (
                    shortlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-[12px] bg-[#FAF7F2] hover:bg-stone-100 text-xs font-bold text-[#1B2430]"
                      >
                        <span className="truncate">{item.nameKh}</span>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveShortlist(item.id, e)}
                          className="text-stone-400 hover:text-red-600 p-1"
                          title="លុបចេញ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#5B6675] py-4 text-center">
                      មិនទាន់មានមុខជំនាញរក្សាទុកនៅឡើយទេ
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Majors & Careers Nav Link (Active in #1F5BFF) */}
          <Link
            href="/careers"
            className={`min-h-[44px] px-4 py-2 rounded-full font-black text-[14px] shadow-xs transition-all flex items-center gap-1.5 border-2 active:scale-98 ${
              isCareersActive
                ? "bg-[#1F5BFF] text-white border-[#1F5BFF] shadow-sm"
                : "bg-[#EAF1FF] hover:bg-[#D4E4FF] text-[#1F5BFF] border-[#BAE6FD]"
            }`}
          >
            <Compass className={`w-4 h-4 shrink-0 ${isCareersActive ? "text-white" : "text-[#1F5BFF]"}`} />
            <span>មុខជំនាញ និងអាជីព</span>
          </Link>

          {/* All Tests Nav Link */}
          <Link
            href="/assessments"
            className={`min-h-[44px] px-4 py-2 rounded-full font-bold text-[14px] shadow-xs transition-all flex items-center gap-1.5 border-2 active:scale-98 ${
              isAssessmentsActive
                ? "bg-[#1B2430] text-white border-[#1B2430] shadow-sm"
                : "bg-white hover:bg-stone-50 text-[#1B2430] border-[#E6E8EC]"
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-[#5B6675]" />
            <span>កម្រងតេស្តទាំងអស់</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button (<640px touch target >= 44px) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Shortlist Count Icon */}
          {shortlist.length > 0 && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-h-[44px] min-w-[44px] rounded-full bg-[#EAF1FF] text-[#1F5BFF] flex items-center justify-center relative"
              aria-label="បញ្ជីពេញចិត្ត"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1F5BFF] text-white text-[10px] font-black flex items-center justify-center">
                {shortlist.length}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] rounded-[14px] border-2 border-[#E6E8EC] bg-white flex items-center justify-center text-[#1B2430] hover:bg-stone-50"
            aria-label="បើកម៉ឺនុយ"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsed Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6E8EC] bg-white p-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[44px] w-full px-4 py-2.5 rounded-[14px] font-black text-sm flex items-center justify-between border-2 ${
              isCareersActive
                ? "bg-[#1F5BFF] text-white border-[#1F5BFF]"
                : "bg-[#EAF1FF] text-[#1F5BFF] border-[#BAE6FD]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>មុខជំនាញ និងអាជីព</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/assessments"
            onClick={() => setMobileMenuOpen(false)}
            className={`min-h-[44px] w-full px-4 py-2.5 rounded-[14px] font-bold text-sm flex items-center justify-between border-2 ${
              isAssessmentsActive
                ? "bg-[#1B2430] text-white border-[#1B2430]"
                : "bg-white text-[#1B2430] border-[#E6E8EC]"
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-[#5B6675]" />
              <span>កម្រងតេស្តទាំងអស់</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Shortlist Summary */}
          {shortlist.length > 0 && (
            <div className="pt-2 border-t border-[#E6E8EC]">
              <span className="text-xs font-bold text-[#5B6675] block mb-1">
                បញ្ជីពេញចិត្ត ({shortlist.length} មុខជំនាញ)
              </span>
              <div className="flex flex-wrap gap-1">
                {shortlist.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E6E8EC] text-xs font-bold text-[#1B2430]"
                  >
                    {item.nameKh}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
