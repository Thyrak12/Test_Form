"use client";

import React from "react";
import { MajorItem } from "@/types/career";

export type CareerAvatarType =
  | "doctor"
  | "nurse"
  | "pharmacist"
  | "engineer"
  | "programmer"
  | "scientist"
  | "farmer"
  | "architect"
  | "lawyer"
  | "teacher"
  | "business"
  | "artist"
  | "musician"
  | "journalist"
  | "diplomat"
  | "chef"
  | "psychologist"
  | "pilot";

export interface CareerAvatarInfo {
  type: CareerAvatarType;
  labelKh: string;
  labelEn: string;
  emoji: string;
}

export function getCareerAvatarInfo(major: MajorItem): CareerAvatarInfo {
  const text = `${major.major_name_kh} ${major.major_name_en} ${major.category} ${(major.career_positions || []).join(" ")}`.toLowerCase();

  // 1. Doctor / General Medicine / Dentist
  if (
    text.includes("វេជ្ជ") ||
    text.includes("doctor") ||
    text.includes("physician") ||
    text.includes("ទន្តវទ្យា") ||
    text.includes("dentist") ||
    text.includes("វះកាត់")
  ) {
    return { type: "doctor", labelKh: "វេជ្ជបណ្ឌិត", labelEn: "Doctor", emoji: "👨‍⚕️" };
  }

  // 2. Nurse & Midwife
  if (text.includes("គិលានុបដ្ឋាក") || text.includes("ឆ្មប") || text.includes("nurse") || text.includes("midwife")) {
    return { type: "nurse", labelKh: "គិលានុបដ្ឋាក", labelEn: "Nurse", emoji: "🧑‍⚕️" };
  }

  // 3. Pharmacist
  if (text.includes("ឱសថ") || text.includes("pharmacy") || text.includes("pharmacist")) {
    return { type: "pharmacist", labelKh: "ឱសថការី", labelEn: "Pharmacist", emoji: "💊" };
  }

  // 4. Programmer / IT / Data / AI
  if (
    text.includes("កុំព្យូទ័រ") ||
    text.includes("ព័ត៌មានវិទ្យា") ||
    text.includes("developer") ||
    text.includes("programmer") ||
    text.includes("software") ||
    text.includes("computer") ||
    text.includes("cyber") ||
    text.includes("ទិន្នន័យ") ||
    text.includes("data") ||
    text.includes("ai")
  ) {
    return { type: "programmer", labelKh: "អ្នកអភិវឌ្ឍន៍ IT", labelEn: "Developer", emoji: "🧑‍💻" };
  }

  // 5. Engineer
  if (
    text.includes("វិស្វករ") ||
    text.includes("វិស្វកម្ម") ||
    text.includes("សំណង់") ||
    text.includes("មេកានិក") ||
    text.includes("អគ្គិសនី") ||
    text.includes("ទូរគមនាគមន៍") ||
    text.includes("engineering")
  ) {
    return { type: "engineer", labelKh: "វិស្វករ", labelEn: "Engineer", emoji: "👷‍♂️" };
  }

  // 6. Architect
  if (text.includes("ស្ថាបត្យ") || text.includes("architect")) {
    return { type: "architect", labelKh: "ស្ថាបត្យករ", labelEn: "Architect", emoji: "📐" };
  }

  // 7. Pilot / Aviation
  if (text.includes("អាកាសចរ") || text.includes("ពីឡុត") || text.includes("pilot") || text.includes("aviation")) {
    return { type: "pilot", labelKh: "ពីឡុត", labelEn: "Pilot", emoji: "🧑‍✈️" };
  }

  // 8. Farmer / Agronomist / Fisheries / Forestry
  if (
    text.includes("កសិកម្ម") ||
    text.includes("ក្សេត្រ") ||
    text.includes("ជលផល") ||
    text.includes("ព្រៃឈើ") ||
    text.includes("បសុព្យាបាល") ||
    text.includes("agriculture") ||
    text.includes("farmer")
  ) {
    return { type: "farmer", labelKh: "អ្នកកសិកម្ម", labelEn: "Agronomist", emoji: "🧑‍🌾" };
  }

  // 9. Scientist / Pure Sciences
  if (
    text.includes("វិទ្យាសាស្ត្រពិត") ||
    text.includes("គីមី") ||
    text.includes("ជីវវិទ្យា") ||
    text.includes("រូបវិទ្យា") ||
    text.includes("ស្រាវជ្រាវ") ||
    text.includes("scientist") ||
    text.includes("chemist") ||
    text.includes("biologist")
  ) {
    return { type: "scientist", labelKh: "អ្នកវិទ្យាសាស្ត្រ", labelEn: "Scientist", emoji: "🧑‍🔬" };
  }

  // 10. Lawyer / Legal / Judge
  if (text.includes("ច្បាប់") || text.includes("នីតិសាស្ត្រ") || text.includes("មេធាវី") || text.includes("law")) {
    return { type: "lawyer", labelKh: "អ្នកច្បាប់/មេធាវី", labelEn: "Lawyer", emoji: "⚖️" };
  }

  // 11. Teacher / Professor / Education
  if (
    text.includes("អប់រំ") ||
    text.includes("គរុកោសល្យ") ||
    text.includes("គ្រូបង្រៀន") ||
    text.includes("សាស្ត្រាចារ្យ") ||
    text.includes("education") ||
    text.includes("teacher")
  ) {
    return { type: "teacher", labelKh: "គ្រូបង្រៀន", labelEn: "Teacher", emoji: "🧑‍🏫" };
  }

  // 12. Journalist / Media / Communication
  if (
    text.includes("សារព័ត៌មាន") ||
    text.includes("ទូរទស្សន៍") ||
    text.includes("ទំនាក់ទំនងមហាជន") ||
    text.includes("journalism") ||
    text.includes("reporter")
  ) {
    return { type: "journalist", labelKh: "អ្នកសារព័ត៌មាន", labelEn: "Journalist", emoji: "🎙️" };
  }

  // 13. Artist / Graphic Designer
  if (text.includes("សិល្បៈ") || text.includes("រចនា") || text.includes("គំនូរ") || text.includes("art") || text.includes("design")) {
    return { type: "artist", labelKh: "អ្នករចនា/សិល្បករ", labelEn: "Artist", emoji: "🎨" };
  }

  // 14. Musician
  if (text.includes("តន្ត្រី") || text.includes("music")) {
    return { type: "musician", labelKh: "តន្ត្រីករ", labelEn: "Musician", emoji: "🎵" };
  }

  // 15. Diplomat / Foreign Affairs
  if (text.includes("ការទូត") || text.includes("ទំនាក់ទំនងអន្តរជាតិ") || text.includes("diplomacy") || text.includes("international")) {
    return { type: "diplomat", labelKh: "អ្នកការទូត", labelEn: "Diplomat", emoji: "🌐" };
  }

  // 16. Chef / Hospitality / Tourism
  if (text.includes("ម្ហូប") || text.includes("ចុងភៅ") || text.includes("បដិសណ្ឋារកិច្ច") || text.includes("ទេសចរណ៍") || text.includes("hotel") || text.includes("culinary")) {
    return { type: "chef", labelKh: "អ្នកបដិសណ្ឋារកិច្ច", labelEn: "Hospitality", emoji: "🧑‍🍳" };
  }

  // 17. Psychologist / Social Worker
  if (text.includes("ចិត្តវិទ្យា") || text.includes("សង្គមកិច្ច") || text.includes("psychology")) {
    return { type: "psychologist", labelKh: "អ្នកចិត្តវិទ្យា", labelEn: "Psychologist", emoji: "🧠" };
  }

  // 18. Business / Finance / Banking / Default
  return { type: "business", labelKh: "អ្នកគ្រប់គ្រងធុរកិច្ច", labelEn: "Executive", emoji: "💼" };
}

interface CareerAvatarProps {
  major: MajorItem;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

export function CareerAvatar({
  major,
  size = "md",
  className = "",
  showBadge = false,
}: CareerAvatarProps) {
  const info = getCareerAvatarInfo(major);

  const dimensionClasses = {
    sm: "w-10 h-10 min-w-10",
    md: "w-14 h-14 min-w-14 sm:w-16 sm:h-16 sm:min-w-16",
    lg: "w-20 h-20 min-w-20 sm:w-24 sm:h-24 sm:min-w-24",
    xl: "w-28 h-28 min-w-28 sm:w-32 sm:h-32 sm:min-w-32",
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center shrink-0 ${className}`}>
      <div
        className={`rounded-2xl sm:rounded-3xl border-2 border-stone-200/90 shadow-sm overflow-hidden bg-gradient-to-b from-white to-[#FAF7F2] flex items-center justify-center relative p-1 ${dimensionClasses}`}
      >
        <AvatarSvg type={info.type} />
      </div>

      {showBadge && (
        <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-white border border-stone-200 text-stone-700 shadow-2xs whitespace-nowrap">
          {info.emoji} {info.labelKh}
        </span>
      )}
    </div>
  );
}

// Custom crisp, friendly vector avatars for all career types
function AvatarSvg({ type }: { type: CareerAvatarType }) {
  switch (type) {
    case "doctor":
      // Doctor with stethoscope, white medical coat, blue scrubs, and friendly face
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#EFF6FF" />
          {/* Head & Neck */}
          <path d="M46 58 H54 V66 H46 Z" fill="#FBCFE8" />
          <ellipse cx="50" cy="42" rx="16" ry="17" fill="#FDE2D6" />
          {/* Hair */}
          <path d="M34 40 C34 26 40 24 50 24 C60 24 66 26 66 40 C66 35 63 30 50 30 C38 30 35 34 34 40 Z" fill="#334155" />
          {/* Friendly Eyes & Smile */}
          <circle cx="44" cy="41" r="2" fill="#1E293B" />
          <circle cx="56" cy="41" r="2" fill="#1E293B" />
          <path d="M46 48 Q50 52 54 48" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          {/* Blue Scrubs Shirt */}
          <path d="M35 66 L50 72 L65 66 L72 96 H28 L35 66 Z" fill="#0284C7" />
          {/* White Doctor Coat */}
          <path d="M26 66 L37 66 L44 96 H20 L26 66 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M74 66 L63 66 L56 96 H80 L74 66 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          {/* Stethoscope */}
          <path d="M40 66 Q40 82 50 82 Q60 82 60 66" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M50 82 V88" stroke="#475569" strokeWidth="2.5" />
          <circle cx="50" cy="90" r="3.5" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
          {/* Red Cross Lapel Pin */}
          <circle cx="33" cy="74" r="4" fill="#FEE2E2" />
          <path d="M33 72 V76 M31 74 H35" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "nurse":
      // Nurse with scrub cap and cross
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#F0FDF4" />
          <ellipse cx="50" cy="44" rx="15" ry="16" fill="#FDE2D6" />
          {/* Hair */}
          <path d="M34 44 C34 29 42 27 50 27 C58 27 66 29 66 44 Z" fill="#78350F" />
          {/* Nurse Cap */}
          <path d="M36 28 H64 L61 18 H39 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M50 20 V25 M47.5 22.5 H52.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          {/* Eyes & Smile */}
          <circle cx="45" cy="43" r="2" fill="#1E293B" />
          <circle cx="55" cy="43" r="2" fill="#1E293B" />
          <path d="M47 49 Q50 53 53 49" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          {/* Scrubs */}
          <path d="M30 68 L50 74 L70 68 L76 96 H24 Z" fill="#10B981" />
          <path d="M44 68 L50 78 L56 68" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        </svg>
      );

    case "pharmacist":
      // Pharmacist with lab coat and pill/mortar
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#ECFDF5" />
          <ellipse cx="50" cy="42" rx="15" ry="16" fill="#FDE2D6" />
          <path d="M34 40 C34 26 42 25 50 25 C58 25 66 26 66 40 Z" fill="#1E293B" />
          {/* Glasses */}
          <rect x="40" y="38" width="8" height="6" rx="2" fill="none" stroke="#059669" strokeWidth="1.5" />
          <rect x="52" y="38" width="8" height="6" rx="2" fill="none" stroke="#059669" strokeWidth="1.5" />
          <line x1="48" y1="41" x2="52" y2="41" stroke="#059669" strokeWidth="1.5" />
          <circle cx="44" cy="41" r="1.5" fill="#1E293B" />
          <circle cx="56" cy="41" r="1.5" fill="#1E293B" />
          <path d="M47 48 Q50 52 53 48" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          {/* Green Pharmacist Coat */}
          <path d="M30 66 L50 72 L70 66 L78 96 H22 Z" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.5" />
          {/* Capsule emblem on chest */}
          <rect x="45" y="76" width="10" height="5" rx="2.5" fill="#10B981" />
          <rect x="50" y="76" width="5" height="5" rx="1" fill="#3B82F6" />
        </svg>
      );

    case "engineer":
      // Engineer with yellow hardhat and safety vest
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <ellipse cx="50" cy="46" rx="15" ry="16" fill="#FDE2D6" />
          {/* Yellow Hardhat */}
          <path d="M33 34 C33 22 40 18 50 18 C60 18 67 22 67 34 Z" fill="#F59E0B" />
          <rect x="30" y="32" width="40" height="6" rx="3" fill="#D97706" />
          <rect x="47" y="19" width="6" height="14" rx="1" fill="#FBBF24" />
          {/* Eyes & Smile */}
          <circle cx="44" cy="44" r="2" fill="#1E293B" />
          <circle cx="56" cy="44" r="2" fill="#1E293B" />
          <path d="M46 51 Q50 55 54 51" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          {/* Orange Safety Vest over denim */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#1E3A8A" />
          <path d="M34 68 L44 96 H24 L30 68 Z" fill="#EA580C" />
          <path d="M66 68 L56 96 H76 L70 68 Z" fill="#EA580C" />
          {/* Reflective silver stripes */}
          <rect x="33" y="80" width="8" height="4" fill="#E2E8F0" />
          <rect x="59" y="80" width="8" height="4" fill="#E2E8F0" />
        </svg>
      );

    case "programmer":
      // Programmer with modern glasses and headphones
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#E0F2FE" />
          <ellipse cx="50" cy="44" rx="15" ry="16" fill="#FDE2D6" />
          {/* Hair */}
          <path d="M34 38 C34 25 42 22 50 22 C58 22 66 25 66 38 Z" fill="#1E293B" />
          {/* Over-ear Headphones */}
          <path d="M30 42 C30 24 70 24 70 42" stroke="#0284C7" strokeWidth="4" fill="none" />
          <rect x="27" y="38" width="6" height="12" rx="3" fill="#0369A1" />
          <rect x="67" y="38" width="6" height="12" rx="3" fill="#0369A1" />
          {/* Geek Glasses */}
          <rect x="39" y="39" width="9" height="7" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <rect x="52" y="39" width="9" height="7" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="48" y1="42" x2="52" y2="42" stroke="#1E293B" strokeWidth="2" />
          <circle cx="43.5" cy="42.5" r="1.5" fill="#1E293B" />
          <circle cx="56.5" cy="42.5" r="1.5" fill="#1E293B" />
          <path d="M46 51 Q50 55 54 51" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          {/* Dark Tech Hoodie */}
          <path d="M28 68 L50 76 L72 68 L78 96 H22 Z" fill="#0F172A" />
          {/* Code Symbol < / > on hoodie */}
          <text x="50" y="88" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt;/&gt;</text>
        </svg>
      );

    case "scientist":
      // Scientist with beaker and goggles
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#F5F3FF" />
          <ellipse cx="50" cy="44" rx="15" ry="16" fill="#FDE2D6" />
          {/* Wild / Smart Hair */}
          <path d="M32 38 C30 24 40 20 50 20 C60 20 70 24 68 38 Z" fill="#6366F1" />
          {/* Safety Goggles on forehead */}
          <rect x="37" y="27" width="11" height="7" rx="2" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="1.5" />
          <rect x="52" y="27" width="11" height="7" rx="2" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="1.5" />
          <line x1="48" y1="30" x2="52" y2="30" stroke="#4F46E5" strokeWidth="1.5" />
          {/* Eyes & Smile */}
          <circle cx="44" cy="44" r="2" fill="#1E293B" />
          <circle cx="56" cy="44" r="2" fill="#1E293B" />
          <path d="M46 51 Q50 56 54 51" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
          {/* White Lab Coat */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Flask with bubbling purple liquid */}
          <path d="M46 76 H54 L58 90 H42 Z" fill="#A855F7" opacity="0.85" />
          <path d="M47 72 H53 V76 H47 Z" fill="#CBD5E1" />
          <circle cx="48" cy="84" r="1.5" fill="#FFFFFF" />
          <circle cx="53" cy="87" r="1" fill="#FFFFFF" />
        </svg>
      );

    case "architect":
      // Architect with drafting ruler and blueprints
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#F0FDF4" />
          <ellipse cx="50" cy="44" rx="15" ry="16" fill="#FDE2D6" />
          {/* Sleek Hair */}
          <path d="M34 38 C34 24 42 22 50 22 C58 22 66 24 66 38 Z" fill="#047857" />
          {/* Round frames */}
          <circle cx="43" cy="43" r="5" fill="none" stroke="#065F46" strokeWidth="1.5" />
          <circle cx="57" cy="43" r="5" fill="none" stroke="#065F46" strokeWidth="1.5" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#065F46" strokeWidth="1.5" />
          <circle cx="43" cy="43" r="1.5" fill="#1E293B" />
          <circle cx="57" cy="43" r="1.5" fill="#1E293B" />
          <path d="M46 52 Q50 55 54 52" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
          {/* Black Turtleneck with Compass / Ruler */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#1E293B" />
          <path d="M44 78 L50 90 L56 78" stroke="#34D399" strokeWidth="2" fill="none" />
          <line x1="46" y1="83" x2="54" y2="83" stroke="#34D399" strokeWidth="1.5" />
        </svg>
      );

    case "farmer":
      // Agronomist / Farmer with straw hat and sprout
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#ECFDF5" />
          <ellipse cx="50" cy="46" rx="15" ry="16" fill="#FDE2D6" />
          {/* Straw Hat */}
          <ellipse cx="50" cy="30" rx="26" ry="7" fill="#F59E0B" />
          <path d="M36 29 C36 18 42 16 50 16 C58 16 64 18 64 29 Z" fill="#D97706" />
          <rect x="36" y="27" width="28" height="3" fill="#15803D" />
          {/* Eyes & Smile */}
          <circle cx="44" cy="45" r="2" fill="#1E293B" />
          <circle cx="56" cy="45" r="2" fill="#1E293B" />
          <path d="M46 52 Q50 56 54 52" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          {/* Green Overalls */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#15803D" />
          <path d="M38 74 L42 96 M62 74 L58 96" stroke="#BBF7D0" strokeWidth="2" />
          {/* Green Sprout */}
          <path d="M50 76 Q46 68 40 70 Q44 76 50 76 Z" fill="#84CC16" />
          <path d="M50 76 Q54 68 60 70 Q56 76 50 76 Z" fill="#84CC16" />
        </svg>
      );

    case "lawyer":
      // Lawyer / Judge with formal robe and scales
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#FDF4FF" />
          <ellipse cx="50" cy="42" rx="15" ry="16" fill="#FDE2D6" />
          <path d="M34 38 C34 24 42 22 50 22 C58 22 66 24 66 38 Z" fill="#4C1D95" />
          <circle cx="44" cy="42" r="2" fill="#1E293B" />
          <circle cx="56" cy="42" r="2" fill="#1E293B" />
          <path d="M46 49 Q50 53 54 49" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          {/* Formal Black Robe with White Collar Bands */}
          <path d="M28 66 L50 74 L72 66 L78 96 H22 Z" fill="#1E1B4B" />
          {/* White Lawyer Bands */}
          <rect x="47" y="68" width="3" height="12" fill="#FFFFFF" />
          <rect x="50" y="68" width="3" height="12" fill="#FFFFFF" />
          {/* Scales Emblem */}
          <line x1="42" y1="84" x2="58" y2="84" stroke="#FBBF24" strokeWidth="1.5" />
          <line x1="50" y1="80" x2="50" y2="92" stroke="#FBBF24" strokeWidth="1.5" />
          <path d="M42 84 L40 88 H44 Z M58 84 L56 88 H60 Z" fill="#F59E0B" />
        </svg>
      );

    case "teacher":
      // Teacher with book and spectacles
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#FFFBEB" />
          <ellipse cx="50" cy="43" rx="15" ry="16" fill="#FDE2D6" />
          <path d="M34 38 C34 24 42 23 50 23 C58 23 66 24 66 38 Z" fill="#92400E" />
          {/* Glasses */}
          <circle cx="44" cy="43" r="4" fill="none" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="56" cy="43" r="4" fill="none" stroke="#B45309" strokeWidth="1.5" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="44" cy="43" r="1.5" fill="#1E293B" />
          <circle cx="56" cy="43" r="1.5" fill="#1E293B" />
          <path d="M46 51 Q50 55 54 51" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          {/* Cardigan & Open Textbook */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#D97706" />
          {/* Open Book */}
          <path d="M42 82 Q50 80 50 86 Q50 80 58 82 L57 92 Q50 90 50 94 Q50 90 43 92 Z" fill="#FFFFFF" stroke="#78350F" strokeWidth="1" />
        </svg>
      );

    case "business":
      // Business executive with suit and tie
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#EFF6FF" />
          <ellipse cx="50" cy="42" rx="15" ry="16" fill="#FDE2D6" />
          <path d="M34 38 C34 24 42 22 50 22 C58 22 66 24 66 38 Z" fill="#1E293B" />
          <circle cx="44" cy="42" r="2" fill="#1E293B" />
          <circle cx="56" cy="42" r="2" fill="#1E293B" />
          <path d="M46 49 Q50 53 54 49" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
          {/* Navy Suit, White Shirt, Red Tie */}
          <path d="M28 66 L50 74 L72 66 L78 96 H22 Z" fill="#1E3A8A" />
          <path d="M42 66 L50 78 L58 66 Z" fill="#FFFFFF" />
          {/* Red Necktie */}
          <polygon points="48,72 52,72 53,88 50,92 47,88" fill="#DC2626" />
        </svg>
      );

    case "artist":
      // Artist with beret and palette
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#FDF2F8" />
          <ellipse cx="50" cy="44" rx="15" ry="16" fill="#FDE2D6" />
          {/* French Beret */}
          <ellipse cx="48" cy="28" rx="20" ry="8" fill="#BE185D" transform="rotate(-10 48 28)" />
          <circle cx="48" cy="20" r="2" fill="#BE185D" />
          <circle cx="44" cy="44" r="2" fill="#1E293B" />
          <circle cx="56" cy="44" r="2" fill="#1E293B" />
          <path d="M46 51 Q50 55 54 51" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
          {/* Smock with paint splatters */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#DB2777" />
          {/* Artist Palette */}
          <path d="M44 80 C40 82 42 90 48 90 C56 90 60 84 56 80 C52 76 46 78 44 80 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
          <circle cx="48" cy="83" r="1.5" fill="#EF4444" />
          <circle cx="52" cy="83" r="1.5" fill="#3B82F6" />
          <circle cx="50" cy="87" r="1.5" fill="#10B981" />
        </svg>
      );

    case "pilot":
      // Pilot with captain hat and wings
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#F0F9FF" />
          <ellipse cx="50" cy="45" rx="15" ry="16" fill="#FDE2D6" />
          {/* Captain Hat */}
          <path d="M33 32 C33 22 40 18 50 18 C60 18 67 22 67 32 Z" fill="#1E293B" />
          <rect x="31" y="30" width="38" height="5" rx="2" fill="#0F172A" />
          <circle cx="50" cy="25" r="4" fill="#F59E0B" />
          {/* Aviator Sunglasses */}
          <path d="M39 39 Q44 38 48 41 Q47 48 42 48 Q37 46 39 39 Z" fill="#334155" stroke="#F59E0B" strokeWidth="1" />
          <path d="M61 39 Q56 38 52 41 Q53 48 58 48 Q63 46 61 39 Z" fill="#334155" stroke="#F59E0B" strokeWidth="1" />
          <line x1="48" y1="41" x2="52" y2="41" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M46 53 Q50 56 54 53" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          {/* White Uniform Shirt with Gold Epaulettes */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="25" y="69" width="10" height="4" fill="#1E293B" />
          <rect x="65" y="69" width="10" height="4" fill="#1E293B" />
          {/* Gold Wings badge */}
          <path d="M42 78 L50 82 L58 78 L50 86 Z" fill="#F59E0B" />
        </svg>
      );

    case "journalist":
      // Journalist with microphone and press badge
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#F8FAFC" />
          <ellipse cx="50" cy="42" rx="15" ry="16" fill="#FDE2D6" />
          <path d="M34 38 C34 24 42 22 50 22 C58 22 66 24 66 38 Z" fill="#0F172A" />
          <circle cx="44" cy="42" r="2" fill="#1E293B" />
          <circle cx="56" cy="42" r="2" fill="#1E293B" />
          <path d="M46 49 Q50 53 54 49" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          {/* Jacket & Press Badge Lanyard */}
          <path d="M28 66 L50 74 L72 66 L78 96 H22 Z" fill="#475569" />
          <path d="M44 66 L50 78 L56 66" stroke="#EF4444" strokeWidth="1.5" fill="none" />
          <rect x="46" y="78" width="8" height="10" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          <text x="50" y="85" fill="#EF4444" fontSize="4" fontWeight="bold" textAnchor="middle">PRESS</text>
          {/* Microphone */}
          <rect x="62" y="74" width="6" height="14" rx="3" fill="#1E293B" />
          <rect x="63" y="72" width="4" height="6" rx="2" fill="#DC2626" />
        </svg>
      );

    case "chef":
      // Chef with toque blanche
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#FFF7ED" />
          <ellipse cx="50" cy="46" rx="15" ry="16" fill="#FDE2D6" />
          {/* Chef Hat (Toque) */}
          <path d="M34 32 C30 20 40 12 50 12 C60 12 70 20 66 32 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="34" y="30" width="32" height="6" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <circle cx="44" cy="45" r="2" fill="#1E293B" />
          <circle cx="56" cy="45" r="2" fill="#1E293B" />
          <path d="M46 52 Q50 56 54 52" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          {/* Chef Double-breasted Coat */}
          <path d="M28 68 L50 74 L72 68 L78 96 H22 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="46" cy="76" r="1.5" fill="#1E293B" />
          <circle cx="46" cy="84" r="1.5" fill="#1E293B" />
          <circle cx="54" cy="76" r="1.5" fill="#1E293B" />
          <circle cx="54" cy="84" r="1.5" fill="#1E293B" />
        </svg>
      );

    default:
      // Versatile professional avatar
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" fill="#EFF6FF" />
          <ellipse cx="50" cy="42" rx="15" ry="16" fill="#FDE2D6" />
          <path d="M34 38 C34 24 42 22 50 22 C58 22 66 24 66 38 Z" fill="#1E293B" />
          <circle cx="44" cy="42" r="2" fill="#1E293B" />
          <circle cx="56" cy="42" r="2" fill="#1E293B" />
          <path d="M46 49 Q50 53 54 49" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 66 L50 74 L72 66 L78 96 H22 Z" fill="#2563EB" />
          <path d="M44 66 L50 76 L56 66" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        </svg>
      );
  }
}
