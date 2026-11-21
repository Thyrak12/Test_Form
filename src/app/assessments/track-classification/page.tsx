"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { StudentInfoForm } from "@/components/shared/StudentInfoForm";
import { StudentProfile } from "@/types/assessment";
import { Compass, Sparkles } from "lucide-react";

export default function TrackClassificationIntroPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<Partial<StudentProfile>>({
    grade: "Grade 9",
    age: 15,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("track_student_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        setInitialData(parsed);
      }
    } catch (e) {
      console.error("Could not load stored student profile", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const handleStudentSubmit = (data: StudentProfile) => {
    try {
      localStorage.setItem("track_student_profile", JSON.stringify(data));
      router.push("/assessments/track-classification/test");
    } catch (e) {
      console.error("Could not save student profile", e);
      router.push("/assessments/track-classification/test");
    }
  };

  return (
    <AssessmentLayout
      title="តេស្តញែកប្រភេទថ្នាក់ (ឧបសម្ព័ន្ធ ១២) | MoEYS"
      subtitle="កម្រងតេស្តវាយតម្លៃ ១៦ ក្រុមជំនាញ និងចំណូលចិត្ត ដើម្បីកំណត់គន្លងវិទ្យាសាស្ត្រ ឬវិទ្យាសាស្ត្រសង្គម នៅថ្នាក់ទី ១០"
      gradeBadge="ថ្នាក់ទី ៩ ឡើងទី ១០"
      assessmentNameKh="តេស្តញែកប្រភេទថ្នាក់"
      assessmentNameEn="MoEYS Track Selection Assessment"
    >
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Step Progress Stepper: Step 1 Active */}
        <StepProgressHeader currentStep={1} step2Sublabel="90 Questions" />

        {/* Assessment Title Header Banner */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-xs font-bold shadow-xs">
            <Compass className="w-4 h-4 text-[#0284C7]" />
            <span>ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS) • ឧបសម្ព័ន្ធ ១២</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight">
            តេស្តញែកប្រភេទថ្នាក់រៀន
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            កម្រងតេស្តវាយតម្លៃ ១៦ ក្រុមជំនាញនេះ ជួយសិស្សានុសិស្សថ្នាក់ទី ៧-៩ ឱ្យមានមូលដ្ឋានរឹងមាំក្នុងការជ្រើសរើស
            <span className="font-bold text-[#0369A1]"> គន្លងវិទ្យាសាស្ត្រ</span>,
            <span className="font-bold text-[#D97706]"> គន្លងវិទ្យាសាស្ត្រសង្គម</span> ឬ
            <span className="font-bold text-[#16A34A]"> គន្លងវិជ្ជាជីវៈ</span> នៅថ្នាក់ទី ១០។
          </p>
        </div>

        {/* Instructions Card (Matching the user-specified illustration & clean layout) */}
        <div className="bg-[#EFF4FC] rounded-[24px] border border-[#D6E3F4] p-5 sm:p-6 shadow-[0_4px_16px_rgba(180,195,220,0.18)] flex items-center gap-4 sm:gap-6">
          {/* Left: Stopwatch with Checkmark Badge Illustration */}
          <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="45" y="6" width="10" height="8" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2.5" />
              <path d="M41 6 H59" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="47" y="14" width="6" height="5" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
              <path d="M74 24 L79 19" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="56" r="37" fill="#F8FAFC" stroke="#475569" strokeWidth="3" />
              <circle cx="50" cy="56" r="31" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="50" y1="29" x2="50" y2="33" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="50" y1="79" x2="50" y2="83" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="23" y1="56" x2="27" y2="56" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="73" y1="56" x2="77" y2="56" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="50" y1="56" x2="49.5" y2="39" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="50" y1="56" x2="63" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="50" cy="56" r="3" fill="#334155" />
              <path
                d="M10 32 L22 44 L40 18"
                stroke="#64748B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M10 32 L22 44 L40 18"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Right: Title & List of Instructions */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight mb-2">
              សេចក្តីណែនាំមុនពេលចាប់ផ្តើម
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span className="text-sm">⏰</span>
                <span>រយៈពេលប្រហែល ១៥ - ២០ នាទី (១៦ ក្រុមជំនាញ)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span>គ្មានពិន្ទុខុស ឬត្រូវ ឡើយ — ជាត្រីវិស័យបង្ហាញផ្លូវជីវិត</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span>វាយតម្លៃលើ ២ ផ្នែក៖ ក. កម្រិតចំណូលចិត្ត និង ខ. កម្រិតជំនាញ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Student Info Form */}
        {isLoaded && (
          <StudentInfoForm
            initialValues={initialData}
            onSubmit={handleStudentSubmit}
            submitButtonText="បន្តទៅកាន់សំណួរតេស្ត ១៦ ក្រុមជំនាញ"
          />
        )}
      </div>
    </AssessmentLayout>
  );
}
