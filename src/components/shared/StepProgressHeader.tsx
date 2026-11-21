"use client";

import React from "react";
import { Check } from "lucide-react";

export type AssessmentStep = 1 | 2 | 3;

interface StepProgressHeaderProps {
  currentStep: AssessmentStep;
  className?: string;
}

export function StepProgressHeader({
  currentStep,
  className = "",
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
      sublabel: "48 Questions",
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
        {/* Background Connecting Bar */}
        <div className="absolute left-7 right-7 top-4 -translate-y-1/2 h-0.5 bg-slate-200 z-0">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
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

        {/* Steps */}
        <div className="relative z-10 flex items-start justify-between">
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all select-none border-2 ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isCurrent
                      ? "bg-white border-blue-600 text-blue-700 ring-4 ring-blue-50"
                      : "bg-white border-slate-300 text-slate-400"
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
                    className={`text-xs font-semibold leading-tight ${
                      isCurrent
                        ? "text-blue-900"
                        : isCompleted
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-[10px] font-normal hidden sm:block ${
                      isCurrent
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-slate-500"
                        : "text-slate-400"
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
