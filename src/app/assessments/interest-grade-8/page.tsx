"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { StudentInfoForm } from "@/components/shared/StudentInfoForm";
import { StudentProfile } from "@/types/assessment";
import { Clock, Info, CheckCircle2, Layers } from "lucide-react";
import questionsJson from "@/data/assessments/interest-grade-8/questions.json";

export default function InterestGrade8IntroPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<Partial<StudentProfile> | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("interest_grade_8_student");
      if (saved) {
        setInitialData(JSON.parse(saved));
      } else {
        // Default to Grade 8 and age 14 for Grade 8 assessment
        setInitialData({
          grade: "Grade 8",
          age: 14,
        });
      }
    } catch (e) {
      console.warn("Could not load saved student info", e);
      setInitialData({
        grade: "Grade 8",
        age: 14,
      });
    }
    setIsLoaded(true);
  }, []);

  const handleStudentSubmit = (student: StudentProfile) => {
    try {
      localStorage.setItem("interest_grade_8_student", JSON.stringify(student));
    } catch (e) {
      console.warn("Could not save student data to localStorage", e);
    }
    router.push("/assessments/interest-grade-8/test");
  };

  return (
    <AssessmentLayout
      gradeBadge="ថ្នាក់ទី ៨ (Grade 8)"
      assessmentNameKh="តេស្តវាយតម្លៃចំណង់ចំណូលចិត្ត"
      assessmentNameEn="Grade 8 Interest Assessment"
      resetHref="/assessments/interest-grade-8"
    >
      <StepProgressHeader currentStep={1} />

      <div className="max-w-2xl mx-auto space-y-5">
        {/* Page Title & Intro */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-1">
            <span>{questionsJson.subtitleKh || "សម្រាប់សិស្សថ្នាក់ទី៨"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {questionsJson.titleKh}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto khmer-content">
            {questionsJson.instructionKh}
          </p>
        </div>

        {/* 3 Group Structure Preview / Instructions Card */}
        <div className="bg-slate-100/80 rounded-xl border border-slate-200/90 p-3.5 sm:p-4 text-xs text-slate-700 space-y-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>ព័ត៌មានអំពីកម្រងសំណួរវាយតម្លៃ៖</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
              <Layers className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-800">៣ កម្រងសំណួរ (ក, ខ, គ)</strong>
                <span className="text-[11px] text-slate-500">៣០ សំណួរក្នុងមួយកម្រង (សរុប ៩០)</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
              <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-800">១០ - ១៥ នាទី</strong>
                <span className="text-[11px] text-slate-500">ឆ្លើយតាមចំណាប់អារម្មណ៍ពិត</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-800">របាយការណ៍គន្លងសិក្សា</strong>
                <span className="text-[11px] text-slate-500">កំណត់គន្លងវិទ្យាសាស្ត្រ និងវិជ្ជាជីវៈ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Info Form */}
        {isLoaded && (
          <StudentInfoForm
            initialValues={initialData}
            onSubmit={handleStudentSubmit}
            submitButtonText="បន្តទៅកាន់សំណួរតេស្ត ៩០ ចំណុច"
          />
        )}
      </div>
    </AssessmentLayout>
  );
}
