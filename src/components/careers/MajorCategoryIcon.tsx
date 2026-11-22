"use client";

import React from "react";
import {
  Code,
  FlaskConical,
  Wrench,
  Stethoscope,
  Sprout,
  BookOpen,
  Scale,
  Palette,
  Compass,
  Briefcase,
  Megaphone,
  Music,
  HeartHandshake,
  GraduationCap,
  Globe,
  Building2,
  Atom,
  Cpu,
} from "lucide-react";

interface MajorCategoryIconProps {
  category: string;
  track: "science" | "social_science";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function MajorCategoryIcon({
  category,
  track,
  className = "",
  size = "md",
}: MajorCategoryIconProps) {
  const isScience = track === "science";

  const sizeClasses = {
    sm: "w-8 h-8 rounded-xl p-1.5",
    md: "w-12 h-12 rounded-2xl p-2.5",
    lg: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-3",
  }[size];

  // Map category keywords to icons
  const getCategoryTheme = () => {
    const c = category.toLowerCase();

    if (c.includes("កុំព្យូទ័រ") || c.includes("ព័ត៌មាន") || c.includes("computing") || c.includes("it")) {
      return {
        bg: isScience ? "bg-cyan-50 border-cyan-200 text-cyan-600" : "bg-blue-50 border-blue-200 text-blue-600",
        icon: <Cpu className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("សុខាភិបាល") || c.includes("សុខភាព") || c.includes("medicine") || c.includes("health")) {
      return {
        bg: "bg-rose-50 border-rose-200 text-rose-600",
        icon: <Stethoscope className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("វិស្វកម្ម") || c.includes("សំណង់") || c.includes("engineering")) {
      return {
        bg: "bg-blue-50 border-blue-200 text-blue-600",
        icon: <Wrench className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("កសិកម្ម") || c.includes("ចំណីអាហារ") || c.includes("agriculture") || c.includes("food")) {
      return {
        bg: "bg-emerald-50 border-emerald-200 text-emerald-600",
        icon: <Sprout className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("វិទ្យាសាស្ត្រពិត") || c.includes("pure science")) {
      return {
        bg: "bg-indigo-50 border-indigo-200 text-indigo-600",
        icon: <FlaskConical className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("ច្បាប់") || c.includes("រដ្ឋបាល") || c.includes("law")) {
      return {
        bg: "bg-purple-50 border-purple-200 text-purple-600",
        icon: <Scale className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("សិល្បៈ") || c.includes("រចនា") || c.includes("art") || c.includes("design")) {
      return {
        bg: "bg-pink-50 border-pink-200 text-pink-600",
        icon: <Palette className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("តន្ត្រី") || c.includes("music")) {
      return {
        bg: "bg-amber-50 border-amber-200 text-amber-600",
        icon: <Music className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("ទេសចរណ៍") || c.includes("បដិសណ្ឋារកិច្ច") || c.includes("tourism") || c.includes("hospitality")) {
      return {
        bg: "bg-teal-50 border-teal-200 text-teal-600",
        icon: <Compass className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("ភាសា") || c.includes("អក្សរសាស្ត្រ") || c.includes("literature") || c.includes("language")) {
      return {
        bg: "bg-amber-50 border-amber-200 text-amber-700",
        icon: <BookOpen className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("សារព័ត៌មាន") || c.includes("ទំនាក់ទំនង") || c.includes("media") || c.includes("communication")) {
      return {
        bg: "bg-orange-50 border-orange-200 text-orange-600",
        icon: <Megaphone className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("ធុរកិច្ច") || c.includes("ហិរញ្ញវត្ថុ") || c.includes("ពាណិជ្ជកម្ម") || c.includes("business") || c.includes("finance")) {
      return {
        bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
        icon: <Briefcase className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("អប់រំ") || c.includes("បណ្តុះបណ្តាល") || c.includes("education")) {
      return {
        bg: "bg-indigo-50 border-indigo-200 text-indigo-600",
        icon: <GraduationCap className="w-full h-full stroke-[2.2]" />,
      };
    }
    if (c.includes("សេវាកម្មសង្គម") || c.includes("មនុស្សសាស្ត្រ") || c.includes("social")) {
      return {
        bg: "bg-rose-50 border-rose-200 text-rose-600",
        icon: <HeartHandshake className="w-full h-full stroke-[2.2]" />,
      };
    }

    // Default Fallback
    return {
      bg: isScience ? "bg-sky-50 border-sky-200 text-sky-600" : "bg-amber-50 border-amber-200 text-amber-600",
      icon: isScience ? <Atom className="w-full h-full stroke-[2.2]" /> : <BookOpen className="w-full h-full stroke-[2.2]" />,
    };
  };

  const theme = getCategoryTheme();

  return (
    <div
      className={`border-2 flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 ${sizeClasses} ${theme.bg} ${className}`}
    >
      {theme.icon}
    </div>
  );
}
