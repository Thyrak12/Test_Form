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

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Sticky Header: Student identity & Page Progress */}
        <div className="sticky top-18 z-20 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            {/* Student Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <StudentAvatar avatarId={student.avatar} size="sm" />
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                  {student.fullName}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  ថ្នាក់ {student.classSection} • {student.schoolName}
                </span>
              </div>
            </div>

            {/* Answered Count Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>បានគូស {checkedIds.length}/48</span>
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span>
              ទំព័រ {currentPage + 1}/{TOTAL_PAGES} (សំណួរ {startIndex + 1} ដល់ {Math.min(endIndex, allQuestions.length)})
            </span>
            <span className="text-slate-600 font-medium">
              គូស (✓) ចំពោះសកម្មភាពដែលអ្នកចូលចិត្ត
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Question Cards Checklist */}
        <div className="space-y-2.5">
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

        {/* Navigation Actions */}
        <div className="pt-3 pb-12 flex items-center justify-between gap-3">
          {currentPage > 0 ? (
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ត្រឡប់ក្រោយ</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/assessments/holland-riasec")}
              className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors cursor-pointer"
            >
              ← កែសម្រួលព័ត៌មាន
            </button>
          )}

          {currentPage < TOTAL_PAGES - 1 ? (
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>ទំព័របន្ទាប់</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>កំពុងគណនា...</span>
                </>
              ) : (
                <>
                  <span>បញ្ចប់ និងមើលរបាយការណ៍</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </AssessmentLayout>
  );
}
