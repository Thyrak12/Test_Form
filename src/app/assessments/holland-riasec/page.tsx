"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentLayout } from "@/components/shared/AssessmentLayout";
import { StepProgressHeader } from "@/components/shared/StepProgressHeader";
import { StudentInfoForm } from "@/components/shared/StudentInfoForm";
import { StudentProfile } from "@/types/assessment";
import { Clock, Info, CheckCircle2 } from "lucide-react";
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
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {questionsJson.titleKh || "តេស្តវាយតម្លៃបុគ្គលិកលក្ខណៈ និងចំណង់ចំណូលចិត្ត"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto khmer-content">
            ការស្ទង់មតិដើម្បីជួយសិស្សស្វែងយល់ពីចំណុចខ្លាំង ចំណង់ចំណូលចិត្ត និងទិសដៅសិក្សាសមស្រប
          </p>
        </div>

        {/* Instructions Card */}
        <div className="bg-slate-100/80 rounded-xl border border-slate-200/90 p-3.5 sm:p-4 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-2">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>សេចក្តីណែនាំមុនពេលចាប់ផ្តើម៖</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-slate-600">
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <span>រយៈពេលប្រហែល <strong>៥ - ១០ នាទី</strong> (៤៨ សំណួរខ្លីៗ)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>គ្មានពិន្ទុខុស ឬត្រូវ</strong> ចូរជ្រើសរើសតាមចំណូលចិត្តពិត</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <span>ទទួលបានរបាយការណ៍ <strong>Holland Code</strong> ភ្លាមៗ</span>
            </div>
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
