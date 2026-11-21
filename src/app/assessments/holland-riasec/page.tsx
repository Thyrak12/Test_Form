"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { StudentInfoForm } from "@/components/shared/StudentInfoForm";
import { StudentProfile } from "@/types/assessment";
import { Clock, Info, CheckCircle2, Sparkles } from "lucide-react";
import questionsJson from "@/data/assessments/holland-riasec/questions.json";

export default function HollandRiasecIntroPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<Partial<StudentProfile> | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("holland_riasec_student");
      if (saved) {
        setInitialData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load saved student info", e);
    }
    setIsLoaded(true);
  }, []);

  const handleStudentSubmit = (student: StudentProfile) => {
    try {
      localStorage.setItem("holland_riasec_student", JSON.stringify(student));
    } catch (e) {
      console.warn("Could not save student data to localStorage", e);
    }
    router.push("/assessments/holland-riasec/test");
  };

  return (
    <AssessmentLayout>
      <StepProgressHeader currentStep={1} />

      <div className="max-w-2xl mx-auto space-y-5">
        {/* Page Title & Intro */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            {questionsJson.titleKh || "តេស្តវាយតម្លៃបុគ្គលិកលក្ខណៈ និងចំណង់ចំណូលចិត្ត"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto khmer-content">
            ការស្ទង់មតិដើម្បីជួយសិស្សស្វែងយល់ពីចំណុចខ្លាំង ចំណង់ចំណូលចិត្ត និងទិសដៅសិក្សាសមស្រប
          </p>
        </div>

        {/* Instructions Card (Exact design matching user specification) */}
        <div className="bg-[#EFF4FC] rounded-[24px] border border-[#D6E3F4] p-5 sm:p-6 shadow-[0_4px_16px_rgba(180,195,220,0.18)] flex items-center gap-4 sm:gap-6">
          {/* Left: Stopwatch with Checkmark Badge Illustration */}
          <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            {/* Stopwatch SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top button / crown */}
              <rect x="45" y="6" width="10" height="8" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2.5" />
              <path d="M41 6 H59" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="47" y="14" width="6" height="5" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
              {/* Side button */}
              <path d="M74 24 L79 19" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
              {/* Outer clock ring */}
              <circle cx="50" cy="56" r="37" fill="#F8FAFC" stroke="#475569" strokeWidth="3" />
              {/* Inner dial face */}
              <circle cx="50" cy="56" r="31" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              {/* Dial marks */}
              <line x1="50" y1="29" x2="50" y2="33" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="50" y1="79" x2="50" y2="83" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="23" y1="56" x2="27" y2="56" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="73" y1="56" x2="77" y2="56" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              {/* Clock hands pointing at ~11:20 */}
              <line x1="50" y1="56" x2="49.5" y2="39" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="50" y1="56" x2="63" y2="68" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="50" cy="56" r="3" fill="#334155" />
              {/* Big Checkmark badge on top left */}
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
                <span>រយៈពេលប្រហែល ៥ - ១០ នាទី (៤៨ សំណួរ)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span>គ្មានពិន្ទុខុស ឬត្រូវ ឡើយ</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span>ឆ្លើយឱ្យបានលឿននិងតាមអារម្មណ៍ពិតរបស់អ្នក</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Student Info Form */}
        {isLoaded && (
          <StudentInfoForm
            initialValues={initialData}
            onSubmit={handleStudentSubmit}
            submitButtonText="បន្តទៅធ្វើតេស្ត ៤៨ សំណួរ"
          />
        )}
      </div>
    </AssessmentLayout>
  );
}
