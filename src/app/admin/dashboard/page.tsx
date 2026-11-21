"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import {
  Users,
  Award,
  Layers,
  Search,
  Download,
  LogOut,
  ExternalLink,
  Shield,
  Filter,
  RefreshCw,
  School,
  GraduationCap,
  Calendar,
} from "lucide-react";

interface AdminRecord {
  id: string;
  assessmentSlug: string;
  topCode: string;
  answersCount: number;
  scores: Record<string, number>;
  createdAt: string;
  student: {
    id: string;
    fullName: string;
    studentId?: string | null;
    gender: string;
    age: number;
    grade: string;
    classSection: string;
    schoolName: string;
    avatar?: string | null;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAttempts: 0,
    mostFrequentCode: "N/A",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState<string>("all");
  const [selectedCode, setSelectedCode] = useState<string>("all");

  // Verify auth session
  useEffect(() => {
    async function init() {
      try {
        const { data: session } = await authClient.getSession();
        if (!session?.user) {
          router.replace("/admin");
          return;
        }
        setUser(session.user);
        await fetchRecords();
      } catch (err) {
        console.error("Auth check failed", err);
        router.replace("/admin");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/admin/records");
      const data = await res.json();
      if (data.success) {
        setRecords(data.records);
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Failed to load records", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/admin");
    } catch (e) {
      console.error("Sign out failed", e);
      router.push("/admin");
    }
  };

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchSearch =
        rec.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.student.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.student.classSection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rec.student.studentId &&
          rec.student.studentId.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchForm =
        selectedForm === "all" || rec.assessmentSlug === selectedForm;

      const matchCode =
        selectedCode === "all" || rec.topCode === selectedCode;

      return matchSearch && matchForm && matchCode;
    });
  }, [records, searchTerm, selectedForm, selectedCode]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredRecords.length === 0) return;

    const headers = [
      "Student Name",
      "Student ID",
      "Gender",
      "Age",
      "Grade",
      "Class",
      "School",
      "Assessment Form",
      "Holland Code",
      "Checked Answers",
      "Date Submitted",
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.student.fullName}"`,
      `"${r.student.studentId || ""}"`,
      r.student.gender === "M" ? "Male" : r.student.gender === "F" ? "Female" : "Other",
      r.student.age,
      `"${r.student.grade}"`,
      `"${r.student.classSection}"`,
      `"${r.student.schoolName}"`,
      r.assessmentSlug,
      r.topCode,
      r.answersCount,
      new Date(r.createdAt).toLocaleString("km-KH"),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `student_records_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white gap-3">
        <div className="w-9 h-9 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">កំពុងផ្ទុកផ្ទាំងគ្រប់គ្រង...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base block leading-tight">
                Admin Portal
              </span>
              <span className="text-[11px] text-indigo-300">
                ផ្ទាំងគ្រប់គ្រងលទ្ធផលតេស្តសិស្ស
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <span>ទំព័រសិស្ស</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Admin User Info */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-400/40">
                {user?.name?.[0] || user?.email?.[0] || "A"}
              </div>
              <span className="text-xs text-slate-300 hidden md:block max-w-[140px] truncate">
                {user?.name || user?.email}
              </span>

              <button
                type="button"
                onClick={handleSignOut}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="ចាកចេញ (Sign Out)"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                សិស្សសរុប (Total Students)
              </span>
              <span className="text-2xl font-black text-slate-900">
                {stats.totalStudents}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                ចំនួនដងធ្វើតេស្ត (Test Attempts)
              </span>
              <span className="text-2xl font-black text-slate-900">
                {stats.totalAttempts}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                កូដ Holland ច្រើនជាងគេ (Top Code)
              </span>
              <span className="text-2xl font-black text-amber-600">
                {stats.mostFrequentCode}
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="ស្វែងរកតាមឈ្មោះសិស្ស, សាលា, ថ្នាក់, ឬអត្តលេខ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-hidden"
              />
            </div>

            {/* Test Form Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 outline-hidden"
              >
                <option value="all">ទម្រង់តេស្តទាំងអស់ (All Forms)</option>
                <option value="holland-riasec">Holland Code (ថ្នាក់ទី ៧)</option>
                <option value="interest-grade-8">ចំណង់ចំណូលចិត្ត (ថ្នាក់ទី ៨)</option>
              </select>

              <button
                type="button"
                onClick={handleExportCSV}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>ទាញយក CSV</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              បង្ហាញទិន្នន័យ៖ <strong>{filteredRecords.length}</strong> / {records.length} កំណត់ត្រា
            </span>
            <button
              type="button"
              onClick={fetchRecords}
              className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ធ្វើបច្ចុប្បន្នភាព</span>
            </button>
          </div>
        </div>

        {/* Student Records Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">សិស្ស (Student)</th>
                  <th className="py-3.5 px-4">សាលារៀន & ថ្នាក់</th>
                  <th className="py-3.5 px-4">ភេទ / អាយុ</th>
                  <th className="py-3.5 px-4">ទម្រង់តេស្ត</th>
                  <th className="py-3.5 px-4">កូដ Holland</th>
                  <th className="py-3.5 px-4">កាលបរិច្ឆេទ</th>
                  <th className="py-3.5 px-4 text-right">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      ពុំមានទិន្នន័យសិស្សនៅឡើយទេ
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <StudentAvatar avatarId={r.student.avatar || undefined} size="sm" />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {r.student.fullName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {r.student.studentId || "គ្មានអត្តលេខ"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* School & Class */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">
                          {r.student.schoolName}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {r.student.grade} - ថ្នាក់ {r.student.classSection}
                        </span>
                      </td>

                      {/* Gender / Age */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {r.student.gender === "M"
                          ? "ប្រុស"
                          : r.student.gender === "F"
                          ? "ស្រី"
                          : "ផ្សេងទៀត"}{" "}
                        ({r.student.age} ឆ្នាំ)
                      </td>

                      {/* Assessment Form Slug */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                          {r.assessmentSlug === "holland-riasec"
                            ? "Holland RIASEC (ទី ៧)"
                            : r.assessmentSlug === "interest-grade-8"
                            ? "ចំណង់ចំណូលចិត្ត (ទី ៨)"
                            : r.assessmentSlug}
                        </span>
                      </td>

                      {/* Top Code Badge */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold text-xs border border-blue-200">
                          <Award className="w-3.5 h-3.5 text-blue-600" />
                          <span>{r.topCode}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {new Date(r.createdAt).toLocaleDateString("km-KH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/assessments/${r.assessmentSlug || "holland-riasec"}/result/${r.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors"
                        >
                          <span>មើលលទ្ធផល</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
