"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { GroupedQuestionChecklistCard } from "@/components/assessments/interest-grade-8/GroupedQuestionChecklistCard";
import { StudentProfile } from "@/types/assessment";
import { GroupCode, QuestionGroup } from "@/types/groupedInterest";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
} from "lucide-react";
import questionsData from "@/data/assessments/interest-grade-8/questions.json";

const ITEMS_PER_PAGE = 15;
const PAGES_PER_GROUP = 2; // 2 pages of 15 = 30 items
const GROUP_CODES: GroupCode[] = ["A", "B", "C"];

export default function InterestGrade8TestPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [activeGroup, setActiveGroup] = useState<GroupCode>("A");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<GroupCode, number[]>>({
    A: [],
    B: [],
    C: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const groupsMap = useMemo(() => {
    const map = new Map<GroupCode, QuestionGroup>();
    for (const g of questionsData.groups) {
      map.set(g.code as GroupCode, g as QuestionGroup);
    }
    return map;
  }, []);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("interest_grade_8_student");
      if (!savedStudent) {
        router.replace("/assessments/interest-grade-8");
        return;
      }
      setStudent(JSON.parse(savedStudent));

      const savedAnswers = localStorage.getItem("interest_grade_8_answers");
      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        setAnswers({
          A: Array.isArray(parsed?.A) ? parsed.A : [],
          B: Array.isArray(parsed?.B) ? parsed.B : [],
          C: Array.isArray(parsed?.C) ? parsed.C : [],
        });
      }

      const savedGroup = localStorage.getItem("interest_grade_8_active_group") as GroupCode;
      if (savedGroup && GROUP_CODES.includes(savedGroup)) {
        setActiveGroup(savedGroup);
      }

      const savedPage = localStorage.getItem("interest_grade_8_page");
      if (savedPage) {
        const p = parseInt(savedPage, 10);
        if (p >= 0 && p < PAGES_PER_GROUP) {
          setCurrentPage(p);
        }
      }
    } catch (e) {
      console.warn("Storage access failed", e);
    }
    setIsReady(true);
  }, [router]);

  // Toggle selection for a question in a group
  const toggleQuestion = (groupCode: GroupCode, id: number) => {
    setAnswers((prev) => {
      const currentList = prev[groupCode] || [];
      const updatedList = currentList.includes(id)
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];

      const nextAnswers = {
        ...prev,
        [groupCode]: updatedList,
      };

      try {
        localStorage.setItem("interest_grade_8_answers", JSON.stringify(nextAnswers));
      } catch (e) {
        console.warn("Could not save answers to localStorage", e);
      }

      return nextAnswers;
    });
  };

  const handleGroupTabChange = (group: GroupCode) => {
    setActiveGroup(group);
    setCurrentPage(0);
    try {
      localStorage.setItem("interest_grade_8_active_group", group);
      localStorage.setItem("interest_grade_8_page", "0");
    } catch (e) {
      console.warn(e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    try {
      localStorage.setItem("interest_grade_8_page", String(newPage));
    } catch (e) {
      console.warn(e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    if (currentPage < PAGES_PER_GROUP - 1) {
      // Next page in same group
      handlePageChange(currentPage + 1);
    } else {
      // End of current group, advance to next group if available
      const currentGroupIdx = GROUP_CODES.indexOf(activeGroup);
      if (currentGroupIdx < GROUP_CODES.length - 1) {
        const nextGroup = GROUP_CODES[currentGroupIdx + 1];
        handleGroupTabChange(nextGroup);
      } else {
        // Last group and last page -> Submit
        handleSubmit();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    } else {
      const currentGroupIdx = GROUP_CODES.indexOf(activeGroup);
      if (currentGroupIdx > 0) {
        const prevGroup = GROUP_CODES[currentGroupIdx - 1];
        setActiveGroup(prevGroup);
        setCurrentPage(PAGES_PER_GROUP - 1);
        try {
          localStorage.setItem("interest_grade_8_active_group", prevGroup);
          localStorage.setItem("interest_grade_8_page", String(PAGES_PER_GROUP - 1));
        } catch (e) {
          console.warn(e);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/assessments/interest-grade-8");
      }
    }
  };

  const handleSubmit = async () => {
    if (!student) {
      setErrorMessage("រកមិនឃើញព័ត៌មានសិស្សទេ។ សូមត្រឡប់ទៅបំពេញព័ត៌មានឡើងវិញ។");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/assessments/interest-grade-8/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          answers,
          assessmentSlug: "interest-grade-8",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "ការបញ្ជូនបរាជ័យ");
      }

      // Clear test answers storage
      try {
        localStorage.removeItem("interest_grade_8_answers");
        localStorage.removeItem("interest_grade_8_active_group");
        localStorage.removeItem("interest_grade_8_page");
      } catch (e) {
        console.warn(e);
      }

      router.push(`/assessments/interest-grade-8/result/${data.attemptId}`);
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
      <AssessmentLayout gradeBadge="ថ្នាក់ទី ៨ (Grade 8)">
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-slate-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </AssessmentLayout>
    );
  }

  const currentGroup = groupsMap.get(activeGroup) || questionsData.groups[0];
  const allGroupItems = currentGroup.items;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = allGroupItems.slice(startIndex, endIndex);

  const totalChecked = answers.A.length + answers.B.length + answers.C.length;
  const overallProgressPercent = Math.round((totalChecked / 90) * 100);

  const isLastStep =
    activeGroup === "C" && currentPage === PAGES_PER_GROUP - 1;

  return (
    <AssessmentLayout
      gradeBadge="ថ្នាក់ទី ៨ (Grade 8)"
      assessmentNameKh="តេស្តវាយតម្លៃចំណង់ចំណូលចិត្ត"
      assessmentNameEn="Grade 8 Interest Assessment"
      resetHref="/assessments/interest-grade-8"
    >
      <StepProgressHeader currentStep={2} />

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Sticky Header: Student profile, selection counts, and tabs */}
        <div className="sticky top-18 z-20 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs space-y-3">
          {/* Student Info & Live Selection Counters */}
          <div className="flex items-center justify-between gap-3">
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

            {/* Overall Answered Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>បានជ្រើសរើស {totalChecked}/90</span>
            </div>
          </div>

          {/* Group Tabs (A, B, C) */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            {GROUP_CODES.map((code) => {
              const isActive = activeGroup === code;
              const count = answers[code]?.length || 0;
              const label =
                code === "A"
                  ? "កម្រង (ក)"
                  : code === "B"
                  ? "កម្រង (ខ)"
                  : "កម្រង (គ)";

              return (
                <button
                  type="button"
                  key={code}
                  onClick={() => handleGroupTabChange(code)}
                  className={`py-2 px-1 sm:px-2 rounded-md font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                    isActive
                      ? "bg-white text-blue-900 shadow-2xs border border-slate-200 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <span className="truncate">{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}/30
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>

          {/* Group and Page Subtitle */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-medium text-slate-800">
              {currentGroup.labelKh} • ទំព័រ {currentPage + 1}/{PAGES_PER_GROUP} (សំណួរ {startIndex + 1} ដល់ {Math.min(endIndex, allGroupItems.length)})
            </span>
            <span className="text-slate-600">
              គូស (✓) ចំពោះសកម្មភាពណាដែលអ្នកចាប់អារម្មណ៍
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

        {/* Question Checklist Items */}
        <div className="space-y-2.5">
          {currentItems.map((item, idx) => {
            const isChecked = (answers[activeGroup] || []).includes(item.id);
            return (
              <GroupedQuestionChecklistCard
                key={`${activeGroup}-${item.id}`}
                item={item}
                groupCode={activeGroup}
                isChecked={isChecked}
                onToggle={toggleQuestion}
                index={startIndex + idx + 1}
              />
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div className="pt-3 pb-12 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {activeGroup === "A" && currentPage === 0
                ? "ព័ត៌មានសិស្ស"
                : "ត្រឡប់ក្រោយ"}
            </span>
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>
                {currentPage < PAGES_PER_GROUP - 1
                  ? "ទំព័របន្ទាប់"
                  : activeGroup === "A"
                  ? "បន្តទៅ កម្រងសំណួរ (ខ)"
                  : "បន្តទៅ កម្រងសំណួរ (គ)"}
              </span>
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
