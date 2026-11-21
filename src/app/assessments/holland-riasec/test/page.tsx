"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { QuestionChecklistCard } from "@/components/assessments/holland-riasec/QuestionChecklistCard";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { StudentProfile } from "@/types/assessment";
import { HollandQuestion } from "@/types/hollandRiasec";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import questionsJson from "@/data/assessments/holland-riasec/questions.json";

const QUESTIONS_PER_PAGE = 12;
const TOTAL_PAGES = 4;

export default function HollandRiasecTestPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("holland_riasec_student");
      if (!savedStudent) {
        router.replace("/assessments/holland-riasec");
        return;
      }
      setStudent(JSON.parse(savedStudent));

      const savedAnswers = localStorage.getItem("holland_riasec_answers");
      if (savedAnswers) {
        setCheckedIds(JSON.parse(savedAnswers));
      }

      const savedPage = localStorage.getItem("holland_riasec_page");
      if (savedPage) {
        const p = parseInt(savedPage, 10);
        if (p >= 0 && p < TOTAL_PAGES) setCurrentPage(p);
      }
    } catch (e) {
      console.warn("Storage access failed", e);
    }
    setIsReady(true);
  }, [router]);

  const toggleQuestion = (id: number) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("holland_riasec_answers", JSON.stringify(next));
      } catch (e) {
        console.warn("Could not save answers", e);
      }
      return next;
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    try {
      localStorage.setItem("holland_riasec_page", String(newPage));
    } catch (e) {
      console.warn("Could not save page", e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!student) {
      setErrorMessage("រកមិនឃើញព័ត៌មានសិស្សទេ។ សូមត្រឡប់ទៅបំពេញព័ត៌មានឡើងវិញ។");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/assessments/holland-riasec/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          answers: checkedIds,
          assessmentSlug: "holland-riasec",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "ការបញ្ជូនបរាជ័យ");
      }

      try {
        localStorage.removeItem("holland_riasec_answers");
        localStorage.removeItem("holland_riasec_page");
      } catch (e) {
        console.warn(e);
      }

      router.push(`/assessments/holland-riasec/result/${data.attemptId}`);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "មានបញ្ហាក្នុងការបញ្ជូនចម្លើយ។ សូមព្យាយាមម្តងទៀត។"
      );
      setIsSubmitting(false);
    }
  };

  if (!isReady || !student) {
    return (
      <AssessmentLayout>
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-slate-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </AssessmentLayout>
    );
  }

  const allQuestions: HollandQuestion[] = questionsJson.questions as HollandQuestion[];
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);

  const progressPercent = Math.round(((currentPage + 1) / TOTAL_PAGES) * 100);

  return (
    <AssessmentLayout>
      <StepProgressHeader currentStep={2} />

      <div className="w-full max-w-3xl mx-auto space-y-4">
        {/* Sticky Header: Student identity & Page Progress */}
        <div className="sticky top-18 z-20 bg-white/95 backdrop-blur-md rounded-[24px] p-4 sm:p-5 border-2 border-stone-200/90 shadow-[0_4px_16px_rgba(180,160,140,0.12)]">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Student Info */}
            <div className="flex items-center gap-3 min-w-0">
              <StudentAvatar avatarId={student.avatar} size="sm" />
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-extrabold text-[#1E293B] block truncate">
                  {student.fullName}
                </span>
                <span className="text-[11px] text-stone-500 font-medium block truncate">
                  ថ្នាក់ {student.classSection} • {student.schoolName}
                </span>
              </div>
            </div>

            {/* Answered Count Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold border border-[#BAE6FD] shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>បានគូស {checkedIds.length}/48</span>
            </div>
          </div>

          {/* Segmented Progress Track (4 segmented bars for 4 pages) */}
          <div className="grid grid-cols-4 gap-1.5 mb-2.5">
            {Array.from({ length: TOTAL_PAGES }).map((_, pIdx) => {
              const isFilled = pIdx <= currentPage;
              const isCurrent = pIdx === currentPage;
              return (
                <div
                  key={pIdx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-blue-600 ring-2 ring-blue-200"
                      : isFilled
                      ? "bg-blue-500"
                      : "bg-stone-200/80"
                  }`}
                  title={`ទំព័រទី ${pIdx + 1}`}
                />
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 gap-1">
            <span className="font-extrabold text-[#1E293B]">
              ទំព័រ {currentPage + 1}/{TOTAL_PAGES}{" "}
              <span className="text-stone-500 font-normal">
                (សំណួរ {startIndex + 1} ដល់ {Math.min(endIndex, allQuestions.length)})
              </span>
            </span>
            <span className="text-stone-600 font-medium text-[11px] sm:text-xs">
              គូស (✓) ចំពោះសកម្មភាពដែលអ្នកចូលចិត្ត
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Question Cards Checklist */}
        <div className="space-y-3">
          {currentQuestions.map((question, idx) => (
            <QuestionChecklistCard
              key={question.id}
              question={question}
              isChecked={checkedIds.includes(question.id)}
              onToggle={toggleQuestion}
              index={startIndex + idx + 1}
            />
          ))}
        </div>

        {/* Navigation Actions & Gentle Reassurance Note */}
        <div className="pt-4 pb-12 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            {currentPage > 0 ? (
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2.5 rounded-full border-2 border-stone-200 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ត្រឡប់ក្រោយ</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/assessments/holland-riasec")}
                className="px-4 py-2.5 rounded-full border-2 border-stone-200 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-600 hover:text-stone-900 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <span>← កែសម្រួលព័ត៌មាន</span>
              </button>
            )}

            {currentPage < TOTAL_PAGES - 1 ? (
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
              >
                <span>ទំព័របន្ទាប់</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/25 active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>កំពុងគណនា...</span>
                  </>
                ) : (
                  <>
                    <span>បញ្ចប់ និងមើលរបាយការណ៍</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Gentle Reassurance Note */}
          <p className="text-center text-[11px] sm:text-xs text-stone-500 font-medium">
            💡 អាចចុចបន្តទៅមុខបាន ទោះបីជាក្នុងទំព័រនេះគ្មានសកម្មភាពណាដែលអ្នកចូលចិត្តក៏ដោយ
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
}
