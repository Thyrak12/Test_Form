"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { StudentProfile } from "@/types/assessment";
import { StudentTrackAnswers } from "@/types/trackClassification";
import questionsData from "@/data/assessments/track_classification/questions.json";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  FlaskConical,
  ChevronDown,
  Layers,
  Heart,
  Wrench,
  Loader2,
} from "lucide-react";

const TOTAL_CLUSTERS = questionsData.clusters.length; // 16

const PART_A_OPTIONS = [
  { value: 1, label: "អត់ (១)", shortLabel: "អត់" },
  { value: 2, label: "តិច (២)", shortLabel: "តិច" },
  { value: 3, label: "មធ្យម (៣)", shortLabel: "មធ្យម" },
  { value: 4, label: "ខ្លាំង (៤)", shortLabel: "ខ្លាំង" },
];

const PART_B_OPTIONS = [
  { value: 0, label: "អត់ (០)", shortLabel: "អត់" },
  { value: 1, label: "តិច (១)", shortLabel: "តិច" },
  { value: 2, label: "មធ្យម (២)", shortLabel: "មធ្យម" },
  { value: 3, label: "ខ្លាំង (៣)", shortLabel: "ខ្លាំង" },
];

export default function TrackClassificationTestPage() {
  const router = useRouter();

  // State
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [currentClusterIdx, setCurrentClusterIdx] = useState(0);
  const [answers, setAnswers] = useState<StudentTrackAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showClusterMenu, setShowClusterMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load student profile & cached answers on mount
  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem("track_student_profile");
      if (!storedStudent) {
        router.replace("/assessments/track-classification");
        return;
      }
      setStudent(JSON.parse(storedStudent));

      const storedAnswers = localStorage.getItem("track_assessment_answers");
      if (storedAnswers) {
        setAnswers(JSON.parse(storedAnswers));
      }
    } catch (e) {
      console.error("Error loading cached state:", e);
    } finally {
      setIsLoaded(true);
    }
  }, [router]);

  // Autosave answers to localStorage
  useEffect(() => {
    if (isLoaded && Object.keys(answers).length > 0) {
      try {
        localStorage.setItem("track_assessment_answers", JSON.stringify(answers));
      } catch (e) {
        console.error("Autosave failed", e);
      }
    }
  }, [answers, isLoaded]);

  const currentCluster = questionsData.clusters[currentClusterIdx];
  const clusterId = currentCluster?.cluster_id;

  // Answer handlers
  const handlePartASelect = (itemId: number, rating: number) => {
    setAnswers((prev) => {
      const clusterAns = prev[clusterId] || { partA: {}, partB: {} };
      return {
        ...prev,
        [clusterId]: {
          ...clusterAns,
          partA: {
            ...clusterAns.partA,
            [itemId]: rating,
          },
        },
      };
    });
  };

  const handlePartBSelect = (itemId: number, rating: number) => {
    setAnswers((prev) => {
      const clusterAns = prev[clusterId] || { partA: {}, partB: {} };
      return {
        ...prev,
        [clusterId]: {
          ...clusterAns,
          partB: {
            ...clusterAns.partB,
            [itemId]: rating,
          },
        },
      };
    });
  };

  // Completion calculation for current cluster
  const currentClusterAnswerCount = useMemo(() => {
    const cAns = answers[clusterId];
    if (!cAns) return 0;
    const countA = Object.keys(cAns.partA || {}).length;
    const countB = Object.keys(cAns.partB || {}).length;
    return countA + countB;
  }, [answers, clusterId]);

  // Overall answered items count
  const totalItemsAnswered = useMemo(() => {
    let count = 0;
    for (const c of questionsData.clusters) {
      const cAns = answers[c.cluster_id];
      if (cAns) {
        count += Object.keys(cAns.partA || {}).length;
        count += Object.keys(cAns.partB || {}).length;
      }
    }
    return count;
  }, [answers]);

  const totalPossibleQuestions = TOTAL_CLUSTERS * 16; // 256
  const progressPercent = Math.round((totalItemsAnswered / totalPossibleQuestions) * 100);

  // Check cluster completion status
  const isClusterComplete = (cId: number) => {
    const cAns = answers[cId];
    if (!cAns) return false;
    const countA = Object.keys(cAns.partA || {}).length;
    const countB = Object.keys(cAns.partB || {}).length;
    return countA === 6 && countB === 10;
  };

  const handleNextCluster = () => {
    if (currentClusterIdx < TOTAL_CLUSTERS - 1) {
      setCurrentClusterIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevCluster = () => {
    if (currentClusterIdx > 0) {
      setCurrentClusterIdx((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submit test
  const handleSubmitTest = async () => {
    if (!student) return;

    if (totalItemsAnswered < 32) {
      const confirmProceed = window.confirm(
        `អ្នកបានឆ្លើយត្រឹមតែ ${totalItemsAnswered} / ${totalPossibleQuestions} សំណួរ។ តើអ្នកប្រាកដជាចង់ដាក់ស្នើចម្លើយឥឡូវនេះមែនទេ? (ដើម្បីលទ្ធផលត្រឹមត្រូវបំផុត គួរឆ្លើយឱ្យបានច្រើនតាមដែលអាចធ្វើបាន)`
      );
      if (!confirmProceed) return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/assessments/track-classification/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          answers,
          assessmentSlug: "track-classification",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "ការដាក់ស្នើបានបរាជ័យ");
      }

      // Clear cached answers
      localStorage.removeItem("track_assessment_answers");

      // Route to results page
      router.push(`/assessments/track-classification/result/${data.attemptId}`);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitError(err.message || "មានបញ្ហាក្នុងការដាក់ស្នើចម្លើយ សូមព្យាយាមម្តងទៀត");
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !student) {
    return (
      <AssessmentLayout title="កំពុងដំណើរការ...">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-stone-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">កំពុងរៀបចំទិន្នន័យ...</p>
        </div>
      </AssessmentLayout>
    );
  }

  const isLastCluster = currentClusterIdx === TOTAL_CLUSTERS - 1;
  const isScience = currentCluster.track_group === "science";

  return (
    <AssessmentLayout
      title={`តេស្តញែកប្រភេទថ្នាក់ - ក្រុមទី ${currentClusterIdx + 1} | MoEYS`}
      subtitle="កម្រងតេស្តវាយតម្លៃ ១៦ ក្រុមជំនាញ"
      gradeBadge="ថ្នាក់ទី ៩ ឡើងទី ១០"
      assessmentNameKh="តេស្តញែកប្រភេទថ្នាក់"
      assessmentNameEn="MoEYS Track Selection Assessment"
    >
      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
        {/* Step Progress Stepper (Step 2 Active) */}
        <StepProgressHeader currentStep={2} step2Sublabel="90 Questions" />

        {/* Sticky Dashboard Header */}
        <div className="sticky top-3 z-30 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-stone-200/90 shadow-sm p-3.5 sm:p-4 transition-all">
          <div className="flex items-center justify-between gap-3">
            {/* Student Dossier Pill */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border-2 border-stone-200 flex items-center justify-center font-black text-xs text-stone-700 shrink-0">
                {student.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black text-[#1E293B] truncate">
                  {student.fullName}
                </div>
                <div className="text-[11px] font-medium text-stone-500 truncate">
                  {student.grade} • {student.classSection} • {student.schoolName}
                </div>
              </div>
            </div>

            {/* Quick Cluster Selector Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowClusterMenu(!showClusterMenu)}
                className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>ក្រុម {currentClusterIdx + 1}/16</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Cluster Dropdown Menu */}
              {showClusterMenu && (
                <div className="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-2xl border-2 border-stone-200 shadow-xl p-2 z-50 space-y-1">
                  <div className="text-[11px] font-black text-stone-400 px-2 py-1 uppercase tracking-wider">
                    ជ្រើសរើសក្រុមដើម្បីលោតទៅ
                  </div>
                  {questionsData.clusters.map((c, idx) => {
                    const complete = isClusterComplete(c.cluster_id);
                    return (
                      <button
                        key={c.cluster_id}
                        type="button"
                        onClick={() => {
                          setCurrentClusterIdx(idx);
                          setShowClusterMenu(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          idx === currentClusterIdx
                            ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                            : "hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <span className="truncate pr-2">
                          {idx + 1}. {c.title_km}
                        </span>
                        {complete ? (
                          <span className="text-emerald-600 font-black text-[11px] shrink-0">✓ ពេញ</span>
                        ) : (
                          <span className="text-stone-400 text-[10px] shrink-0">
                            {(answers[c.cluster_id] ? Object.keys(answers[c.cluster_id].partA || {}).length + Object.keys(answers[c.cluster_id].partB || {}).length : 0)}/16
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Segmented Overall Progress Bar */}
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-2 text-stone-500 font-medium">
              <span>ឆ្លើយបាន៖</span>
              <span className="font-extrabold text-[#1E293B]">
                {totalItemsAnswered} / {totalPossibleQuestions} សំណួរ
              </span>
            </div>
            <span className="font-bold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Current Cluster Hero Card */}
        <div className="bg-white rounded-[24px] border-2 border-stone-200/90 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#FAF7F2] text-stone-600 border border-stone-200">
              ក្រុមទី {currentClusterIdx + 1} នៃ ១៦
            </span>

            {isScience ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>គន្លងវិទ្យាសាស្ត្រ (Science)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>គន្លងវិទ្យាសាស្ត្រសង្គម (Social Science)</span>
              </span>
            )}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              {currentCluster.title_km}
            </h2>
            <p className="text-xs text-stone-400 font-medium mt-0.5">
              {currentCluster.title_en}
            </p>
          </div>

          {/* Quick instructions for the 2 parts */}
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200/70 text-xs text-stone-600 flex items-center justify-between gap-2">
            <span>
              ឆ្លើយបាន <strong>{currentClusterAnswerCount} / 16</strong> ក្នុងក្រុមនេះ
            </span>
            <span className="text-[11px] text-stone-400 font-medium">
              ក. ចំណូលចិត្ត (៦) • ខ. ជំនាញ (១០)
            </span>
          </div>
        </div>

        {/* SECTION A: Interest Level (កម្រិតចំណូលចិត្ត - 6 Items) */}
        <div className="bg-white rounded-[24px] border-2 border-stone-200/90 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="border-b-2 border-stone-100 pb-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
              <Heart className="w-4 h-4 fill-rose-500/20" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B]">
                ក. កម្រិតចំណូលចិត្ត (ខ្ញុំចូលចិត្ត...)
              </h3>
              <p className="text-[11px] text-stone-500">
                ជ្រើសរើសកម្រិតដែលអ្នកចូលចិត្តពី ១ (អត់) ដល់ ៤ (ខ្លាំង)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentCluster.part_a_items.map((item, idx) => {
              const currentRating = answers[clusterId]?.partA?.[item.id];
              const isSelected = currentRating !== undefined;

              return (
                <div
                  key={`partA-${item.id}`}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-blue-400 bg-blue-50/40 shadow-xs"
                      : "border-stone-200/80 bg-[#FAF7F2]/40 hover:border-stone-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Item Text */}
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#1E293B] leading-snug">
                        {item.text_km}
                      </span>
                    </div>

                    {/* 4-Level Rating Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 shrink-0 sm:w-72">
                      {PART_A_OPTIONS.map((opt) => {
                        const active = currentRating === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handlePartASelect(item.id, opt.value)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all border ${
                              active
                                ? "bg-blue-600 text-white border-blue-600 shadow-xs scale-102"
                                : "bg-white text-stone-600 border-stone-200 hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                          >
                            {opt.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: Skill Level (កម្រិតជំនាញ - 10 Items) */}
        <div className="bg-white rounded-[24px] border-2 border-stone-200/90 shadow-sm p-5 sm:p-6 space-y-5">
          <div className="border-b-2 border-stone-100 pb-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B]">
                ខ. កម្រិតជំនាញ ({currentCluster.part_b_prompt_km || "ខ្ញុំអាច..."})
              </h3>
              <p className="text-[11px] text-stone-500">
                ជ្រើសរើសសមត្ថភាពជាក់ស្តែងពី ០ (អត់) ដល់ ៣ (ខ្លាំង)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentCluster.part_b_items.map((item, idx) => {
              const currentRating = answers[clusterId]?.partB?.[item.id];
              const isSelected = currentRating !== undefined;

              return (
                <div
                  key={`partB-${item.id}`}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-50/40 shadow-xs"
                      : "border-stone-200/80 bg-[#FAF7F2]/40 hover:border-stone-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Item Text */}
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#1E293B] leading-snug">
                        {item.text_km}
                      </span>
                    </div>

                    {/* 4-Level Rating Buttons (0 to 3) */}
                    <div className="grid grid-cols-4 gap-1.5 shrink-0 sm:w-72">
                      {PART_B_OPTIONS.map((opt) => {
                        const active = currentRating === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handlePartBSelect(item.id, opt.value)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all border ${
                              active
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs scale-102"
                                : "bg-white text-stone-600 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                            }`}
                          >
                            {opt.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error prompt if any */}
        {submitError && (
          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-xs sm:text-sm text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Bottom Navigation Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 pb-8">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrevCluster}
            disabled={currentClusterIdx === 0}
            className={`w-full sm:w-auto px-5 py-3 rounded-full border-2 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
              currentClusterIdx === 0
                ? "opacity-40 cursor-not-allowed border-stone-200 text-stone-400 bg-stone-100"
                : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ក្រុមមុន</span>
          </button>

          {/* Autosave reassuring hint */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>ចម្លើយរក្សាទុកដោយស្វ័យប្រវត្តិ</span>
          </div>

          {/* Next / Submit Button */}
          {isLastCluster ? (
            <button
              type="button"
              onClick={handleSubmitTest}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>កំពុងគណនាលទ្ធផល...</span>
                </>
              ) : (
                <>
                  <span>ដាក់ស្នើចម្លើយ និងមើលលទ្ធផល</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextCluster}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>ក្រុមបន្ទាប់ (ក្រុម {currentClusterIdx + 2})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </AssessmentLayout>
  );
}
