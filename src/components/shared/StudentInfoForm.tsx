"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/types/assessment";
import { AVATAR_LIST } from "@/lib/constants/avatars";
import {
  User,
  School,
  ArrowRight,
  AlertCircle,
  Smile,
  Hash,
  Calendar,
} from "lucide-react";

interface StudentInfoFormProps {
  initialValues?: Partial<StudentProfile>;
  onSubmit: (data: StudentProfile) => void;
  isLoading?: boolean;
  submitButtonText?: string;
  extraFields?: React.ReactNode;
}

export function StudentInfoForm({
  initialValues,
  onSubmit,
  isLoading = false,
  submitButtonText = "បន្តទៅកាន់សំណួរតេស្ត",
  extraFields,
}: StudentInfoFormProps) {
  const resolveDefaultGrade = (g?: string) => {
    if (!g) return "Grade 7";
    if (g === "8" || g.includes("8")) return "Grade 8";
    if (g === "9" || g.includes("9")) return "Grade 9";
    if (g === "7" || g.includes("7")) return "Grade 7";
    return g;
  };

  const initialGrade = resolveDefaultGrade(initialValues?.grade);

  const [formData, setFormData] = useState<StudentProfile>({
    fullName: initialValues?.fullName || "",
    studentId: initialValues?.studentId || "",
    gender: initialValues?.gender || "M",
    age: initialValues?.age || (initialGrade === "Grade 8" ? 14 : initialGrade === "Grade 9" ? 15 : 13),
    grade: initialGrade,
    classSection: initialValues?.classSection || "",
    schoolName: initialValues?.schoolName || "",
    avatar: initialValues?.avatar || "avatar-1",
    extraFields: initialValues?.extraFields || {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "សូមបញ្ចូលឈ្មោះពេញរបស់សិស្ស";
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "សូមបញ្ចូលឈ្មោះសាលារៀន";
    }

    if (!formData.classSection.trim()) {
      newErrors.classSection = "សូមបញ្ចូលបន្ទប់/ថ្នាក់ (ឧ. 7A)";
    }

    if (!formData.age || Number(formData.age) < 8 || Number(formData.age) > 25) {
      newErrors.age = "សូមបញ្ចូលអាយុ (ចន្លោះពី ៨ - ២៥ ឆ្នាំ)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        age: Number(formData.age),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-7 space-y-6"
    >
      {/* Form Section Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          ព័ត៌មានផ្ទាល់ខ្លួនរបស់សិស្ស
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          សូមបំពេញព័ត៌មានខាងក្រោមឱ្យបានត្រឹមត្រូវ ដើម្បីរៀបចំរបាយការណ៍លទ្ធផល
        </p>
      </div>

      {/* Main Student Fields */}
      <div className="space-y-4">
        {/* Row 1: Full Name & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ឈ្មោះពេញសិស្ស <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="ឧទាហរណ៍៖ សុខ ចិន្តា"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-hidden ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ភេទ <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
              {[
                { id: "M", label: "ប្រុស" },
                { id: "F", label: "ស្រី" },
              ].map((g) => {
                const isSelected = formData.gender === g.id;
                return (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => setFormData({ ...formData, gender: g.id })}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-white text-blue-900 shadow-2xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: School & Class Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ឈ្មោះសាលារៀន <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ឧទាហរណ៍៖ អនុវិទ្យាល័យវត្តកោះ"
              value={formData.schoolName}
              onChange={(e) => {
                setFormData({ ...formData, schoolName: e.target.value });
                if (errors.schoolName) setErrors({ ...errors, schoolName: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-hidden ${
                errors.schoolName
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
              }`}
            />
            {errors.schoolName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.schoolName}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              បន្ទប់ / ថ្នាក់ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ឧ. 7A, 7B"
              value={formData.classSection}
              onChange={(e) => {
                setFormData({ ...formData, classSection: e.target.value });
                if (errors.classSection) setErrors({ ...errors, classSection: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-hidden ${
                errors.classSection
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
              }`}
            />
            {errors.classSection && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.classSection}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Grade Level & Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              កម្រិតថ្នាក់
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm transition-colors outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="Grade 7">ថ្នាក់ទី ៧ (Grade 7)</option>
              <option value="Grade 8">ថ្នាក់ទី ៨ (Grade 8)</option>
              <option value="Grade 9">ថ្នាក់ទី ៩ (Grade 9)</option>
              <option value="Grade 10">ថ្នាក់ទី ១០ (Grade 10)</option>
              <option value="Grade 11">ថ្នាក់ទី ១១ (Grade 11)</option>
              <option value="Grade 12">ថ្នាក់ទី ១២ (Grade 12)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              អាយុ (ឆ្នាំ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="8"
              max="25"
              required
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: Number(e.target.value) });
                if (errors.age) setErrors({ ...errors, age: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors outline-hidden ${
                errors.age
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
              }`}
            />
            {errors.age && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.age}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Avatar Selection (Secondary Profile Accessory) */}
      <div className="pt-3 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          ជ្រើសរើសរូបតំណាងសិស្ស (Profile Icon)
        </label>
        <p className="text-[11px] text-slate-500 mb-3">
          រូបតំណាងនេះនឹងបង្ហាញនៅលើក្បាលទំព័រនៃរបាយការណ៍លទ្ធផលរបស់អ្នក
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {AVATAR_LIST.map((av) => {
            const isSelected = formData.avatar === av.id;
            return (
              <button
                type="button"
                key={av.id}
                onClick={() => setFormData({ ...formData, avatar: av.id })}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-xl select-none">{av.emoji}</span>
                <span
                  className={`text-[10px] truncate max-w-full font-medium ${
                    isSelected ? "text-blue-900 font-semibold" : "text-slate-500"
                  }`}
                >
                  {av.nameKh}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Extensible Extra Fields */}
      {extraFields && (
        <div className="pt-2 border-t border-slate-100">{extraFields}</div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs disabled:opacity-60"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>{submitButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
