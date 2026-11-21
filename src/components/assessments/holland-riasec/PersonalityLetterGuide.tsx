"use client";

import React, { useState } from "react";
import { HollandScoreResult, HollandDescriptionsData, RiasecCode } from "@/types/hollandRiasec";
import { Briefcase, ChevronDown, Compass, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import descriptionsJson from "@/data/assessments/holland-riasec/descriptions.json";

// Visual Header Banners and Theme Configurations for RIASEC Categories
const CATEGORY_THEMES: Record<
  RiasecCode,
  {
    bgWash: string;
    border: string;
    text: string;
    iconEmoji: string;
    subtitle: string;
    careersWithIcons: { name: string; emoji: string }[];
  }
> = {
  R: {
    bgWash: "bg-sky-50/80",
    border: "border-sky-300",
    text: "text-sky-800",
    iconEmoji: "🛠️ ⚙️ 📐",
    subtitle: "ជំនាញបច្ចេកទេស វិស្វកម្ម យន្តការ និងកម្លាំងពលកម្មច្បាស់លាស់",
    careersWithIcons: [
      { name: "វិស្វករ", emoji: "👷" },
      { name: "ជាងម៉ាស៊ីន/អគ្គិសនី", emoji: "🔧" },
      { name: "ស្ថាបត្យករ", emoji: "📐" },
      { name: "កសិករជំនាញ", emoji: "🌱" },
      { name: "អ្នកបើកបរយានយន្តធុនធ្ងន់", emoji: "🚜" },
      { name: "ជាងឈើ", emoji: "🪚" },
    ],
  },
  I: {
    bgWash: "bg-indigo-50/80",
    border: "border-indigo-300",
    text: "text-indigo-800",
    iconEmoji: "🔬 💻 🧪",
    subtitle: "ការស្រាវជ្រាវ វិទ្យាសាស្ត្រ ការវិភាគទិន្នន័យ និងដោះស្រាយបញ្ហាស៊ីជម្រៅ",
    careersWithIcons: [
      { name: "អ្នកវិទ្យាសាស្ត្រ", emoji: "🧪" },
      { name: "អ្នកបង្កើតកម្មវិធីកុំព្យូទ័រ (Software)", emoji: "💻" },
      { name: "វេជ្ជបណ្ឌិត", emoji: "🩺" },
      { name: "អ្នកវិភាគទិន្នន័យ", emoji: "📊" },
      { name: "សាស្ត្រាចារ្យស្រាវជ្រាវ", emoji: "📚" },
    ],
  },
  A: {
    bgWash: "bg-rose-50/80",
    border: "border-rose-300",
    text: "text-rose-800",
    iconEmoji: "🎨 🎭 ✍️",
    subtitle: "ការបង្កើតថ្មី សិល្បៈ ការរចនា ភាពច្នៃប្រឌិត និងការបញ្ចេញអារម្មណ៍",
    careersWithIcons: [
      { name: "អ្នករចនាក្រាហ្វិក (Designer)", emoji: "🎨" },
      { name: "អ្នកនិពន្ធ", emoji: "✍️" },
      { name: "តន្ត្រីករ", emoji: "🎵" },
      { name: "អ្នកថតរូប/វីដេអូ", emoji: "📸" },
      { name: "អ្នកដឹកនាំសិល្បៈ", emoji: "🎬" },
    ],
  },
  S: {
    bgWash: "bg-emerald-50/80",
    border: "border-emerald-300",
    text: "text-emerald-800",
    iconEmoji: "🤝 🏫 🩺",
    subtitle: "ការបង្រៀន ការជួយសង្គម ការប្រឹក្សា និងការទំនាក់ទំនងជាមួយមនុស្ស",
    careersWithIcons: [
      { name: "គ្រូបង្រៀន", emoji: "👩‍🏫" },
      { name: "អ្នកចិត្តវិទ្យា/ប្រឹក្សា", emoji: "🧠" },
      { name: "គិលានុបដ្ឋាយិកា", emoji: "🏥" },
      { name: "បុគ្គលិកសង្គមកិច្ច", emoji: "🤝" },
      { name: "អ្នកសម្របសម្រួលសហគមន៍", emoji: "🌍" },
    ],
  },
  E: {
    bgWash: "bg-amber-50/80",
    border: "border-amber-300",
    text: "text-amber-800",
    iconEmoji: "💼 🚀 📈",
    subtitle: "ភាពជាអ្នកដឹកនាំ អាជីវកម្ម ទីផ្សារ ការបញ្ចុះបញ្ចូល និងការគ្រប់គ្រង",
    careersWithIcons: [
      { name: "សហគ្រិន/ម្ចាស់អាជីវកម្ម", emoji: "🚀" },
      { name: "អ្នកគ្រប់គ្រងគម្រោង", emoji: "📋" },
      { name: "អ្នកលក់/ទីផ្សារ", emoji: "📈" },
      { name: "មេធាវី", emoji: "⚖️" },
      { name: "អ្នកដឹកនាំស្ថាប័ន", emoji: "👔" },
    ],
  },
  C: {
    bgWash: "bg-teal-50/80",
    border: "border-teal-300",
    text: "text-teal-800",
    iconEmoji: "📑 🗄️ 🧮",
    subtitle: "រៀបចំប្រព័ន្ធ របាយការណ៍ គណនេយ្យ ភាពត្រឹមត្រូវ និងទិន្នន័យជាក់លាក់",
    careersWithIcons: [
      { name: "គណនេយ្យករ", emoji: "🧮" },
      { name: "មន្ត្រីរដ្ឋបាល", emoji: "📑" },
      { name: "អ្នកគ្រប់គ្រងទិន្នន័យ (Database)", emoji: "🗄️" },
      { name: "បេឡាធិការ/ធនាគារ", emoji: "🏦" },
      { name: "សវនករ", emoji: "🔍" },
    ],
  },
};

// Recommended Study Track Resolver based on RIASEC top codes
function getGrade8StudyTrackAdvice(topCode: string) {
  if (topCode.includes("R") || topCode.includes("I")) {
    return {
      titleKh: "គន្លងវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា (STEM & Technical Track)",
      descKh: "បុគ្គលិកលក្ខណៈរបស់អ្នកស៊ីគ្នាខ្លាំងបំផុតជាមួយ មុខវិជ្ជាវិទ្យាសាស្ត្រពិត (គណិតវិទ្យា រូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា) ឬគន្លងបច្ចេកវិទ្យា/វិស្វកម្ម ICT នៅថ្នាក់ទី៨ និងវិទ្យាល័យ។",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
      accentBorder: "border-blue-400",
      bgWash: "bg-[#E0F2FE]/40",
      tags: ["វិទ្យាសាស្ត្រពិត (Science)", "បច្ចេកវិទ្យាព័ត៌មាន (ICT)", "វិស្វកម្ម & មេកានិច"],
    };
  }
  if (topCode.includes("S") || topCode.includes("E")) {
    return {
      titleKh: "គន្លងវិទ្យាសាស្ត្រសង្គម ភាសា និងសហគ្រិនភាព (Social & Business Track)",
      descKh: "បុគ្គលិកលក្ខណៈរបស់អ្នកស៊ីគ្នាជាមួយ គន្លងវិទ្យាសាស្ត្រសង្គម សេដ្ឋកិច្ច ការគ្រប់គ្រង ទំនាក់ទំនង និងភាសាបរទេស សម្រាប់ការបន្តទៅថ្នាក់ទី៨ និងវិទ្យាល័យ។",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
      accentBorder: "border-amber-400",
      bgWash: "bg-[#FCEAD4]/40",
      tags: ["វិទ្យាសាស្ត្រសង្គម", "គ្រប់គ្រងពាណិជ្ជកម្ម", "ទំនាក់ទំនង & ភាសា"],
    };
  }
  return {
    titleKh: "គន្លងសិល្បៈច្នៃប្រឌិត ឬវិជ្ជាជីវៈឯកទេស (Creative Arts & Specialized Track)",
    descKh: "បុគ្គលិកលក្ខណៈរបស់អ្នកស័ក្តិសមជាមួយការសិក្សាផ្តោតលើភាពច្នៃប្រឌិត សិល្បៈ ការរចនា ឬវិជ្ជាជីវៈបច្ចេកទេសជំនាញច្បាស់លាស់។",
    badgeColor: "bg-rose-100 text-rose-900 border-rose-200",
    accentBorder: "border-rose-400",
    bgWash: "bg-rose-50/40",
    tags: ["សិល្បៈ & រចនា", "វិជ្ជាជីវៈឯកទេស", "ស្ថាបត្យកម្ម"],
  };
}

interface PersonalityLetterGuideProps {
  scoreResult: HollandScoreResult;
}

const descriptions = descriptionsJson as unknown as HollandDescriptionsData;

export function PersonalityLetterGuide({
  scoreResult,
}: PersonalityLetterGuideProps) {
  const { firstCode, secondCode, sortedCategories } = scoreResult;

  const topTwoCategories = [
    descriptions.categories[firstCode],
    descriptions.categories[secondCode],
  ];

  const otherCategories = sortedCategories
    .filter((c) => c.code !== firstCode && c.code !== secondCode)
    .map((c) => descriptions.categories[c.code]);

  const [expandedCodes, setExpandedCodes] = useState<Record<string, boolean>>({});

  const toggleExpand = (code: string) => {
    setExpandedCodes((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const studyTrackAdvice = getGrade8StudyTrackAdvice(scoreResult.topCode);

  return (
    <div className="space-y-6">
      {/* 1. Recommended High School / Grade 8 Study Track Callout */}
      <div className={`rounded-[28px] p-6 sm:p-7 border-2 ${studyTrackAdvice.accentBorder} ${studyTrackAdvice.bgWash} shadow-[0_4px_16px_rgba(180,160,140,0.1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5`}>
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-white shadow-2xs text-blue-600">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200">
              ការណែនាំគន្លងសិក្សាថ្នាក់ទី ៨ & វិទ្យាល័យ
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-[#1E293B]">
            {studyTrackAdvice.titleKh}
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed khmer-content">
            {studyTrackAdvice.descKh}
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
          {studyTrackAdvice.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-3.5 py-1.5 rounded-full bg-white text-[#1E293B] text-xs font-bold border-2 border-stone-200 shadow-2xs"
            >
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Top 2 Categories Guidance Cards with Illustrated Header Banners */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#1E293B]">
            អាជីព និងការសិក្សាដែលសមស្របនឹងអ្នក (Career & Study Pathways)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topTwoCategories.map((cat, idx) => {
            const isRankOne = idx === 0;
            const theme = CATEGORY_THEMES[cat.code as RiasecCode];

            return (
              <div
                key={cat.code}
                className={`rounded-[28px] border-2 bg-white shadow-[0_4px_20px_rgba(180,160,140,0.12)] flex flex-col justify-between overflow-hidden ${
                  isRankOne ? "border-blue-400 ring-2 ring-blue-100" : "border-stone-200"
                }`}
              >
                <div>
                  {/* Illustrated Header Banner */}
                  <div className={`p-5 border-b-2 border-stone-100 ${theme.bgWash} flex items-center justify-between gap-3`}>
                    <div>
                      <span className="text-[10px] font-mono font-black text-stone-400 block uppercase">
                        {cat.code} • {cat.nameEn}
                      </span>
                      <h4 className="text-lg font-extrabold text-[#1E293B] leading-snug">
                        {cat.nameKh} ({cat.archetypeKh})
                      </h4>
                      <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                        {theme.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl mb-1 select-none">{theme.iconEmoji.split(" ")[0]}</div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isRankOne
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-white text-stone-700 border border-stone-300"
                        }`}
                      >
                        {isRankOne ? "ចំណាត់ថ្នាក់ ១" : "ចំណាត់ថ្នាក់ ២"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-5 sm:p-6">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed khmer-content mb-4">
                      {cat.descriptionKh}
                    </p>
                  </div>
                </div>

                {/* Career Badges with Custom Emojis / Icons */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-3 border-t-2 border-stone-100">
                    <span className="text-xs font-bold text-stone-700 mb-2.5 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-stone-400" />
                      <span>មុខរបរ និងអាជីពគំរូ៖</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {theme.careersWithIcons.map((career, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#E0F2FE]/40 text-[#1E293B] text-xs font-bold border border-stone-200 transition-colors flex items-center gap-1.5"
                        >
                          <span>{career.emoji}</span>
                          <span>{career.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Other RIASEC Types (Color-Coded Accordion) */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border-2 border-stone-200/90 shadow-[0_4px_16px_rgba(180,160,140,0.1)]">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2 border-stone-100">
          <Compass className="w-4 h-4 text-stone-400" />
          <h4 className="text-xs sm:text-sm font-extrabold text-[#1E293B]">
            ស្វែងយល់បន្ថែមអំពីប្រភេទបុគ្គលិកលក្ខណៈ ៤ ទៀត (Other RIASEC Types)
          </h4>
        </div>

        <div className="space-y-2.5">
          {otherCategories.map((cat) => {
            const isExpanded = !!expandedCodes[cat.code];
            const theme = CATEGORY_THEMES[cat.code as RiasecCode];

            return (
              <div
                key={cat.code}
                className="border-2 border-stone-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(cat.code)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[#FAF7F2]/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full text-xs font-black font-mono flex items-center justify-center text-white shadow-2xs ${theme.bgWash.replace('/80', '')} bg-stone-700`}>
                      {cat.code}
                    </span>
                    <div>
                      <span className="text-xs sm:text-sm font-extrabold text-[#1E293B]">
                        {cat.nameKh} ({cat.archetypeKh})
                      </span>
                      <span className="text-stone-400 text-xs ml-2 hidden sm:inline">
                        • {cat.nameEn}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed khmer-content space-y-3 bg-[#FAF7F2]/40 border-t-2 border-stone-100">
                    <p>{cat.descriptionKh}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {theme.careersWithIcons.map((career, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-full bg-white text-stone-700 text-xs font-semibold border border-stone-200 shadow-2xs flex items-center gap-1"
                        >
                          <span>{career.emoji}</span>
                          <span>{career.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
