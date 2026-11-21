"use client";

import React, { useEffect, useState, use, Suspense } from "react";
import Link from "next/link";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { HollandCodeBanner } from "@/components/assessments/holland-riasec/HollandCodeBanner";
import { RiasecScoreChart } from "@/components/assessments/holland-riasec/RiasecScoreChart";
import { PersonalityLetterGuide } from "@/components/assessments/holland-riasec/PersonalityLetterGuide";
import { StudentProfile } from "@/types/assessment";
import { HollandScoreResult } from "@/types/hollandRiasec";
import {
  Printer,
  RotateCcw,
  Share2,
  Check,
  AlertCircle,
  FileCheck2,
} from "lucide-react";

interface ResultPageProps {
  params: Promise<{ attemptId: string }>;
}

function ResultContent({ params }: ResultPageProps) {
  const unwrappedParams = use(params);
  const attemptId = unwrappedParams.attemptId;

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [scoreResult, setScoreResult] = useState<HollandScoreResult | null>(null);
  const [createdAt, setCreatedAt] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchResult() {
      try {
        setLoading(true);
        const res = await fetch(`/api/assessments/results/${attemptId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "មិនអាចទាញយកលទ្ធផលបានទេ");
        }

        setStudent(data.student);
        setScoreResult(data.scoreResult);
        setCreatedAt(data.attempt?.createdAt);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "មានបញ្ហាក្នុងការទាញយកលទ្ធផល");
      } finally {
        setLoading(false);
      }
    }

    if (attemptId) {
      fetchResult();
    }
  }, [attemptId]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-600 font-medium">កំពុងផ្ទុករបាយការណ៍លទ្ធផលតេស្ត...</p>
      </div>
    );
  }

  if (error || !student || !scoreResult) {
    return (
      <div className="max-w-lg mx-auto p-6 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 border border-red-100">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h2 className="text-base font-bold text-slate-900 mb-1">
          រកមិនឃើញលទ្ធផលតេស្តនេះទេ
        </h2>
        <p className="text-xs text-slate-500 mb-5">{error}</p>
        <Link
          href="/assessments/holland-riasec"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ចាប់ផ្តើមធ្វើតេស្តសារជាថ្មី</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-12">
      {/* 1. Merged Student Dossier Header, Actions & Primary Holland Result */}
      <HollandCodeBanner
        student={student}
        scoreResult={scoreResult}
        createdAt={createdAt}
        onPrint={handlePrint}
        onCopyLink={handleCopyLink}
        copied={copied}
      />

      {/* 2. Comparative RIASEC Score Distribution Chart with Hexagon Radar */}
      <RiasecScoreChart scoreResult={scoreResult} />

      {/* 3. Career & Educational Guidance Guide + Grade 8 Pathway Recommendation */}
      <PersonalityLetterGuide scoreResult={scoreResult} />
    </div>
  );
}

export default function HollandRiasecResultPage({ params }: ResultPageProps) {
  return (
    <AssessmentLayout>
      <StepProgressHeader currentStep={3} />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-slate-600">កំពុងផ្ទុកទិន្នន័យ...</p>
          </div>
        }
      >
        <ResultContent params={params} />
      </Suspense>
    </AssessmentLayout>
  );
}
