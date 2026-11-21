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
  Check,
  ChevronDown,
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

    if (!formData.age || Number(formData.age) < 10 || Number(formData.age) > 18) {
      newErrors.age = "សូមបញ្ចូលអាយុសមស្រប (ចន្លោះពី ១០ - ១៨ ឆ្នាំ)";
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
      className="bg-white rounded-[28px] border-2 border-stone-200/90 shadow-[0_4px_20px_rgba(180,160,140,0.12)] p-6 sm:p-8 space-y-6"
    >
      {/* Form Section Header with playful badge */}
      <div className="border-b-2 border-stone-100 pb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1E293B]">
            ព័ត៌មានផ្ទាល់ខ្លួនរបស់សិស្ស
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            សូមបំពេញព័ត៌មានខាងក្រោមឱ្យបានត្រឹមត្រូវ ដើម្បីរៀបចំរបាយការណ៍លទ្ធផល
          </p>
        </div>
        <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] items-center justify-center text-[#0284C7] shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>

      {/* Main Student Fields */}
      <div className="space-y-4">
        {/* Row 1: Full Name & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              ឈ្មោះពេញសិស្ស <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="ឧ. សុខ ដារ៉ា"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm transition-all outline-hidden ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
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
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              ភេទ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as "M" | "F" })}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border-2 border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 text-sm font-medium transition-all outline-hidden appearance-none cursor-pointer"
              >
                <option value="M">ប្រុស (Male)</option>
                <option value="F">ស្រី (Female)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: School & Class Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              ឈ្មោះសាលារៀន <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ឧ. អនុវិទ្យាល័យវត្តកោះ"
              value={formData.schoolName}
              onChange={(e) => {
                setFormData({ ...formData, schoolName: e.target.value });
                if (errors.schoolName) setErrors({ ...errors, schoolName: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm transition-all outline-hidden ${
                errors.schoolName
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
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
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              បន្ទប់ / ថ្នាក់ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ឧ. ៧ក"
              value={formData.classSection}
              onChange={(e) => {
                setFormData({ ...formData, classSection: e.target.value });
                if (errors.classSection) setErrors({ ...errors, classSection: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm transition-all outline-hidden ${
                errors.classSection
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
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
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              កម្រិតថ្នាក់
            </label>
            <div className="relative">
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border-2 border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 text-sm font-medium transition-all outline-hidden appearance-none cursor-pointer"
              >
                <option value="Grade 7">ថ្នាក់ទី ៧ (Grade 7)</option>
                <option value="Grade 8">ថ្នាក់ទី ៨ (Grade 8)</option>
                <option value="Grade 9">ថ្នាក់ទី ៩ (Grade 9)</option>
                <option value="Grade 10">ថ្នាក់ទី ១០ (Grade 10)</option>
                <option value="Grade 11">ថ្នាក់ទី ១១ (Grade 11)</option>
                <option value="Grade 12">ថ្នាក់ទី ១២ (Grade 12)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              អាយុ (ឆ្នាំ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="10"
              max="18"
              required
              placeholder="ឧ. ១២ ឬ ១៣"
              value={formData.age || ""}
              onChange={(e) => {
                setFormData({ ...formData, age: Number(e.target.value) });
                if (errors.age) setErrors({ ...errors, age: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm transition-all outline-hidden ${
                errors.age
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-stone-200 bg-[#FAF7F2]/40 hover:border-stone-300 focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
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
      <div className="pt-3 border-t-2 border-stone-100">
        <label className="block text-xs font-bold text-[#1E293B] mb-1">
          ជ្រើសរើសរូបតំណាងសិស្ស (Profile Icon)
        </label>
        <p className="text-[11px] text-stone-500 mb-3">
          រូបតំណាងនេះនឹងបង្ហាញនៅលើក្បាលទំព័រនៃរបាយការណ៍លទ្ធផលរបស់អ្នក
        </p>

        {/* 4-column x 2-row grid to prevent any text truncation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {AVATAR_LIST.map((av) => {
            const isSelected = formData.avatar === av.id;
            return (
              <button
                type="button"
                key={av.id}
                onClick={() => setFormData({ ...formData, avatar: av.id })}
                className={`relative flex items-center gap-2.5 p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/80 shadow-xs ring-2 ring-blue-100"
                    : "border-stone-200 bg-[#FAF7F2]/60 hover:bg-white hover:border-stone-300"
                }`}
              >
                {/* Active Choice Checkmark Badge */}
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                <span className="text-2xl select-none shrink-0">{av.emoji}</span>
                <span
                  className={`text-xs font-bold leading-snug break-words ${
                    isSelected ? "text-blue-900" : "text-[#1E293B]"
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
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-full border-2 border-blue-500/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60 active:scale-98"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
