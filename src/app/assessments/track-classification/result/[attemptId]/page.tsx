"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { TrackResultBanner } from "@/components/assessments/track-classification/TrackResultBanner";
import { TrackGroupComparison } from "@/components/assessments/track-classification/TrackGroupComparison";
import { TrackVocationalAndAdvice } from "@/components/assessments/track-classification/TrackVocationalAndAdvice";
import { AllClustersGrid } from "@/components/assessments/track-classification/AllClustersGrid";
import { StudentProfile } from "@/types/assessment";
import { TrackClassificationResult } from "@/types/trackClassification";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TrackClassificationResultPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params?.attemptId as string;

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [result, setResult] = useState<TrackClassificationResult | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!attemptId) return;

    async function fetchResult() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/assessments/results/${attemptId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "មិនអាចទាញយកទិន្នន័យលទ្ធផលបានទេ");
        }

        setStudent(data.student);
        setResult(data.scoreResult);
        setCreatedAt(data.attempt?.createdAt || "");
      } catch (err: any) {
        console.error("Fetch result failed:", err);
        setError(err.message || "មានបញ្ហាបច្ចេកទេសក្នុងការទាញយកលទ្ធផល");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResult();
  }, [attemptId]);

  if (isLoading) {
    return (
      <AssessmentLayout title="កំពុងទាញយកលទ្ធផល...">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-stone-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-semibold">កំពុងគណនារបាយការណ៍លទ្ធផល...</p>
        </div>
      </AssessmentLayout>
    );
  }

  if (error || !student || !result) {
    return (
      <AssessmentLayout title="រកមិនឃើញលទ្ធផល">
        <div className="max-w-xl mx-auto text-center py-16 space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-stone-800">រកមិនឃើញលទ្ធផលតេស្ត</h2>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            {error || "តេស្តនេះប្រហែលជាមិនទាន់ត្រូវបានកត់ត្រា ឬតំណភ្ជាប់មិនត្រឹមត្រូវ។"}
          </p>
          <div className="pt-4">
            <Link
              href="/assessments/track-classification"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-sm hover:bg-blue-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ត្រឡប់ទៅកាន់ទំព័រដើមតេស្ត</span>
            </Link>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  return (
    <AssessmentLayout
      title={`របាយការណ៍លទ្ធផលតេស្តញែកប្រភេទថ្នាក់ - ${student.fullName} | MoEYS`}
      subtitle="លទ្ធផលនៃការវាយតម្លៃគន្លងសិក្សាថ្នាក់ទី ១០"
      gradeBadge="ថ្នាក់ទី ៩ ឡើងទី ១០"
      assessmentNameKh="តេស្តញែកប្រភេទថ្នាក់"
      assessmentNameEn="MoEYS Track Selection Assessment"
    >
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Step Progress Stepper (Step 3 Active - Finished) */}
        <StepProgressHeader currentStep={3} step2Sublabel="90 Questions" />

        {/* Student Header & Recommended Track Hero Banner */}
        <TrackResultBanner
          student={student}
          result={result}
          createdAt={createdAt}
        />

        {/* Group Comparison (Method 1) & Top 3 Clusters (Method 2) */}
        <TrackGroupComparison result={result} />

        {/* Vocational Technical Majors (Table 2) & Study Advice */}
        <TrackVocationalAndAdvice result={result} />

        {/* All 16 Clusters Detailed Accordion */}
        <AllClustersGrid clusters={result.allClusters} />

        {/* Bottom Back / Explore Hub Button */}
        <div className="no-print pt-4 text-center">
          <Link
            href="/assessments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-black transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ត្រឡប់ទៅកាន់បញ្ជីកម្រងតេស្តទាំងអស់</span>
          </Link>
        </div>
      </div>
    </AssessmentLayout>
  );
}
