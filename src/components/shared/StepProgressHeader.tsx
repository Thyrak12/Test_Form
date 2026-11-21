"use client";

import React from "react";
import { Check } from "lucide-react";

export type AssessmentStep = 1 | 2 | 3;

interface StepProgressHeaderProps {
  currentStep: AssessmentStep;
  className?: string;
  step2Sublabel?: string;
}

export function StepProgressHeader({
  currentStep,
  className = "",
  step2Sublabel = "48 Questions",
}: StepProgressHeaderProps) {
  const steps = [
    {
      step: 1 as const,
      label: "ព័ត៌មានសិស្ស",
      sublabel: "Student Info",
    },
    {
      step: 2 as const,
      label: "សំណួរវាយតម្លៃ",
      sublabel: step2Sublabel,
    },
    {
      step: 3 as const,
      label: "របាយការណ៍លទ្ធផល",
      sublabel: "Assessment Report",
    },
  ];

  return (
    <nav
      aria-label="វឌ្ឍនភាពនៃការធ្វើតេស្ត"
      className={`w-full max-w-2xl mx-auto mb-6 no-print ${className}`}
    >
      <div className="relative">
        {/* Background Connecting Bar (Constrained exactly from center of step 1 to center of step 3) */}
        <div className="absolute left-[16.667%] right-[16.667%] top-4 -translate-y-1/2 h-1 bg-stone-200/90 rounded-full z-0 pointer-events-none overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{
              width:
                currentStep === 1
                  ? "0%"
                  : currentStep === 2
                  ? "50%"
                  : "100%",
            }}
          />
        </div>

        {/* Steps (3 evenly distributed columns) */}
        <div className="relative z-10 grid grid-cols-3">
          {steps.map((item) => {
            const isCompleted = item.step < currentStep;
            const isCurrent = item.step === currentStep;

            return (
              <div
                key={item.step}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle Indicator */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all select-none border-2 shadow-2xs ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isCurrent
                      ? "bg-white border-blue-600 text-blue-700 ring-4 ring-blue-100"
                      : "bg-[#FAF7F2] border-stone-300 text-stone-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{item.step}</span>
                  )}
                </div>

                {/* Step Labels */}
                <div className="mt-2 flex flex-col items-center">
                  <span
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? "text-blue-800"
                        : isCompleted
                        ? "text-[#1E293B]"
                        : "text-stone-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-[10px] font-medium hidden sm:block ${
                      isCurrent
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-stone-500"
                        : "text-stone-400"
                    }`}
                  >
                    {item.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
