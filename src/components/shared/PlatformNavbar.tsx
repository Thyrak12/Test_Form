"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutGrid,
  Bookmark,
  Menu,
  X,
  Trash2,
  ArrowRight,
  Home,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

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
  const isHomeActive = pathname === "/";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([]);
  const [shortlistDropdownOpen, setShortlistDropdownOpen] = useState(false);

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

  // Lock body scroll and listen for Escape key when mobile drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setShortlistDropdownOpen(false);
      }
    };

    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  // Close drawer on pathname change
  useEffect(() => {
    setDrawerOpen(false);
    setShortlistDropdownOpen(false);
  }, [pathname]);

  const handleRemoveShortlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = shortlist.filter((item) => item.id !== id);
    setShortlist(updated);
    localStorage.setItem("career_shortlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("shortlistUpdated"));
  };

  return (
    <>
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
            <div>
              <span className="font-black text-[#1B2430] text-sm sm:text-base block leading-tight">
                តេស្តស្វែងយល់ពីខ្លួនឯង
              </span>
              <span className="text-[11px] text-[#5B6675] font-medium hidden sm:block">
                Student Personality & Career Guidance
              </span>
              <span className="text-[10px] text-[#5B6675] font-medium block sm:hidden">
                Career Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Nav Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Shortlist Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShortlistDropdownOpen(!shortlistDropdownOpen)}
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
              {shortlistDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-[20px] border-2 border-[#E6E8EC] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E6E8EC] px-1">
                    <span className="text-xs font-black text-[#1B2430]">
                      មុខជំនាញដែលបានរក្សាទុក ({shortlist.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setShortlistDropdownOpen(false)}
                      className="text-stone-400 hover:text-stone-700 p-1"
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
                          <Link
                            href={`/careers/${item.id}`}
                            onClick={() => setShortlistDropdownOpen(false)}
                            className="truncate flex-1 hover:text-[#1F5BFF] transition-colors"
                          >
                            {item.nameKh}
                          </Link>
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

            {/* Majors & Careers Nav Link */}
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

          {/* Mobile Action Controls: Shortlist Button + Hamburger Drawer Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Shortlist Quick Access Button on Mobile */}
            {shortlist.length > 0 && (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="min-h-[42px] min-w-[42px] rounded-full bg-[#EAF1FF] text-[#1F5BFF] flex items-center justify-center relative shadow-2xs border border-[#BAE6FD] active:scale-95 transition-all"
                aria-label={`បញ្ជីពេញចិត្ត (${shortlist.length})`}
                title="បញ្ជីពេញចិត្ត"
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1F5BFF] text-white text-[10px] font-black flex items-center justify-center">
                  {shortlist.length}
                </span>
              </button>
            )}

            {/* Hamburger Button (Touch target >= 44px) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="min-h-[44px] min-w-[44px] px-2.5 rounded-[12px] border-2 border-[#E6E8EC] bg-white flex items-center justify-center text-[#1B2430] hover:bg-stone-50 active:scale-95 transition-all shadow-2xs"
              aria-label="បើកម៉ឺនុយរុករក (Open Drawer)"
              aria-expanded={drawerOpen}
            >
              <Menu className="w-6 h-6 text-[#1B2430]" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OVER DRAWER (Responsive Drawer) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden no-print" role="dialog" aria-modal="true">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div className="fixed inset-y-0 right-0 w-[300px] sm:w-[340px] max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between z-50 border-l border-[#E6E8EC] animate-in slide-in-from-right duration-250">
            {/* 1. Drawer Header */}
            <div className="p-4 border-b border-[#E6E8EC] flex items-center justify-between gap-3 bg-[#FAF7F2]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-stone-300 shadow-2xs flex items-center justify-center shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-black text-[#1B2430] block truncate">
                    ម៉ឺនុយរុករក
                  </span>
                  <span className="text-[10px] text-[#5B6675] font-semibold block truncate">
                    Navigation Menu
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-[10px] bg-white border border-[#E6E8EC] text-[#5B6675] hover:text-[#1B2430] hover:bg-stone-100 flex items-center justify-center transition-all shadow-2xs active:scale-95"
                aria-label="បិទម៉ឺនុយ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Drawer Body / Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Primary Navigation Links */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#5B6675] uppercase tracking-wider block px-2">
                  ទំព័រសំខាន់ៗ
                </span>

                {/* Home Link */}
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-[14px] font-black text-[13px] flex items-center justify-between transition-all ${
                    isHomeActive
                      ? "bg-[#1F5BFF] text-white shadow-xs"
                      : "bg-[#FAF7F2] text-[#1B2430] hover:bg-stone-100 border border-[#E6E8EC]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 shrink-0" />
                    <span>ទំព័រដើម</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* Majors & Careers Link */}
                <Link
                  href="/careers"
                  onClick={() => setDrawerOpen(false)}
                  className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-[14px] font-black text-[13px] flex items-center justify-between transition-all ${
                    isCareersActive
                      ? "bg-[#1F5BFF] text-white shadow-xs"
                      : "bg-[#EAF1FF] text-[#1F5BFF] hover:bg-[#D4E4FF] border border-[#BAE6FD]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 shrink-0" />
                    <span>មុខជំនាញ និងអាជីព (១៣៦)</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>

                {/* All Assessments Link */}
                <Link
                  href="/assessments"
                  onClick={() => setDrawerOpen(false)}
                  className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-[14px] font-black text-[13px] flex items-center justify-between transition-all ${
                    isAssessmentsActive
                      ? "bg-[#1B2430] text-white shadow-xs"
                      : "bg-[#FAF7F2] text-[#1B2430] hover:bg-stone-100 border border-[#E6E8EC]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <LayoutGrid className="w-4 h-4 shrink-0" />
                    <span>កម្រងតេស្តទាំងអស់</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              </div>

              {/* Assessment Shortcut Links */}
              <div className="space-y-1.5 pt-2 border-t border-[#E6E8EC]">
                <span className="text-[11px] font-bold text-[#5B6675] uppercase tracking-wider block px-2">
                  ធ្វើតេស្តភ្លាមៗ
                </span>

                <Link
                  href="/assessments/holland-riasec"
                  onClick={() => setDrawerOpen(false)}
                  className="min-h-[42px] w-full px-3 py-2 rounded-[12px] bg-white hover:bg-stone-50 border border-[#E6E8EC] flex items-center justify-between text-[12px] font-bold text-[#1B2430] shadow-2xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[8px] bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      🎯
                    </span>
                    <span>តេស្តបុគ្គលិកលក្ខណៈ RIASEC</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1F5BFF] group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  href="/assessments/track-classification"
                  onClick={() => setDrawerOpen(false)}
                  className="min-h-[42px] w-full px-3 py-2 rounded-[12px] bg-white hover:bg-stone-50 border border-[#E6E8EC] flex items-center justify-between text-[12px] font-bold text-[#1B2430] shadow-2xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[8px] bg-amber-100 text-amber-600 flex items-center justify-center text-xs">
                      📐
                    </span>
                    <span>តេស្តញែកប្រភេទថ្នាក់ (ទី១០)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1F5BFF] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>

              {/* Saved Shortlist in Drawer */}
              <div className="space-y-2 pt-2 border-t border-[#E6E8EC]">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[11px] font-bold text-[#5B6675] uppercase tracking-wider flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-[#1F5BFF]" />
                    <span>មុខជំនាញរក្សាទុក</span>
                  </span>
                  <span className="text-[11px] font-black px-2 py-0.2 rounded-full bg-[#EAF1FF] text-[#1F5BFF]">
                    {shortlist.length}
                  </span>
                </div>

                {shortlist.length > 0 ? (
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {shortlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-[10px] bg-[#FAF7F2] border border-[#E6E8EC] text-xs font-bold text-[#1B2430]"
                      >
                        <Link
                          href={`/careers/${item.id}`}
                          onClick={() => setDrawerOpen(false)}
                          className="truncate flex-1 hover:text-[#1F5BFF] transition-colors"
                        >
                          {item.nameKh}
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveShortlist(item.id, e)}
                          className="text-stone-400 hover:text-red-600 p-1 shrink-0"
                          title="លុបចេញ"
                          aria-label={`លុប ${item.nameKh}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-[12px] bg-[#FAF7F2] border border-dashed border-[#E6E8EC] text-center">
                    <p className="text-[11px] text-[#5B6675]">
                      មិនទាន់មានមុខជំនាញរក្សាទុកនៅឡើយទេ
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Drawer Footer */}
            <div className="p-4 border-t border-[#E6E8EC] bg-[#FAF7F2] space-y-2">
              <div className="text-[11px] text-[#5B6675] text-center font-medium">
                ប្រព័ន្ធតម្រង់ទិសអាជីពសិស្ស • MoEYS
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full min-h-[40px] rounded-[10px] bg-white border border-[#E6E8EC] text-[#1B2430] hover:bg-stone-100 text-xs font-black transition-all shadow-2xs active:scale-98"
              >
                បិទម៉ឺនុយ (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
