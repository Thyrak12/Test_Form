import Link from "next/link";
import {
  Compass,
  ArrowRight,
  GraduationCap,
  Clock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Layers,
  LayoutGrid,
} from "lucide-react";

export default function Home() {
  const riasecOverview = [
    { code: "R", title: "បច្ចេកទេស និងការអនុវត្ត (Realistic)", desc: "ចូលចិត្តធ្វើការងារដោយដៃ ឧបករណ៍ គ្រឿងម៉ាស៊ីន និងសកម្មភាពជាក់ស្តែង" },
    { code: "I", title: "ការស្រាវជ្រាវ និងវិភាគ (Investigative)", desc: "ចូលចិត្តការគិត វិភាគ ដោះស្រាយបញ្ហាស្មុគស្មាញ និងស្វែងយល់ពីវិទ្យាសាស្ត្រ" },
    { code: "A", title: "សិល្បៈ និងការច្នៃប្រឌិត (Artistic)", desc: "ចូលចិត្តការបង្កើតថ្មី ការស្រមើស្រមៃ សិល្បៈ តន្ត្រី និងការបញ្ចេញអារម្មណ៍" },
    { code: "S", title: "សង្គម និងមនុស្ស (Social)", desc: "ចូលចិត្តជួយអ្នកដទៃ ការបង្រៀន ទំនាក់ទំនង និងការធ្វើការងារជាក្រុម" },
    { code: "E", title: "ភាពជាអ្នកដឹកនាំ និងធុរកិច្ច (Enterprising)", desc: "ចូលចិត្តការបញ្ចុះបញ្ចូល ការដឹកនាំ គំនិតផ្តួចផ្តើម និងការធ្វើអាជីវកម្ម" },
    { code: "C", title: "ការរៀបចំ និងរដ្ឋបាល (Conventional)", desc: "ចូលចិត្តភាពមានរបៀបរៀបរយ ការចាត់ចែងទិន្នន័យ ឯកសារ និងច្បាប់ទម្លាប់" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Institutional Top Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm sm:text-base block leading-tight">
                តេស្តស្វែងយល់ពីខ្លួនឯង
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Student Personality & Career Assessment
              </span>
            </div>
          </div>

          <Link
            href="/assessments"
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>កម្រងតេស្តទាំងអស់</span>
          </Link>
        </div>
      </header>

      {/* Hero & Overview Section */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        {/* Academic Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-4">
          <Compass className="w-3.5 h-3.5 text-blue-700" />
          <span>សម្រាប់សិស្សអនុវិទ្យាល័យ (ថ្នាក់ទី ៧ និង ថ្នាក់ទី ៨)</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl sm:leading-tight font-bold text-slate-900 text-center max-w-2xl mb-3 tracking-tight">
          ស្វែងយល់ពីចំណង់ចំណូលចិត្ត និងទិសដៅអាជីពរបស់អ្នក
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 text-center max-w-xl mb-8 khmer-content leading-relaxed">
          ប្រព័ន្ធវាយតម្លៃស្តង់ដារសម្រាប់ជួយសិស្សក្នុងការស្វែងយល់ពីចំណុចខ្លាំងផ្ទាល់ខ្លួន
          និងការជ្រើសរើសគន្លងសិក្សា (វិទ្យាសាស្ត្រ ឬវិជ្ជាជីវៈ) ឱ្យបានច្បាស់លាស់។
        </p>

        {/* Two Featured Assessment Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Card 1: Grade 7 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                  ថ្នាក់ទី ៧ (Grade 7)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">៤៨ សំណួរ</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">
                តេស្ត Holland RIASEC (បុគ្គលិកលក្ខណៈ)
              </h2>
              <p className="text-xs text-slate-600 khmer-content leading-relaxed">
                ស្វែងរកកូដ Holland ផ្ទាល់ខ្លួន ដើម្បីកំណត់ចំណូលចិត្ត និងអាជីពសមស្រប។
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">⏱️ ៥ - ១០ នាទី</span>
              <Link
                href="/assessments/holland-riasec"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>ចាប់ផ្តើម</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Grade 8 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ថ្នាក់ទី ៨ (Grade 8)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">៩០ សំណួរ</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1">
                តេស្តចំណង់ចំណូលចិត្ត (គន្លងសិក្សា)
              </h2>
              <p className="text-xs text-slate-600 khmer-content leading-relaxed">
                វាយតម្លៃ ៣ កម្រងសំណួរ (ក, ខ, គ) ដើម្បីកំណត់គន្លងវិទ្យាសាស្ត្រ ឬវិជ្ជាជីវៈ។
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">⏱️ ១០ - ១៥ នាទី</span>
              <Link
                href="/assessments/interest-grade-8"
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>ចាប់ផ្តើម</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 6 RIASEC Categories Explanation */}
        <div className="w-full max-w-3xl">
          <div className="text-center mb-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              ប្រភេទទ្រឹស្តីបុគ្គលិកលក្ខណៈទាំង ៦ (RIASEC)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              មូលដ្ឋានគ្រឹះក្នុងការស្វែងយល់ពីចំណង់ចំណូលចិត្តការងាររបស់សិស្ស
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {riasecOverview.map((item) => (
              <div
                key={item.code}
                className="bg-white rounded-lg p-3.5 border border-slate-200/90 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                    {item.code}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-8 khmer-content">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-slate-600">
            ប្រព័ន្ធវាយតម្លៃ និងតម្រង់ទិសអាជីពសិស្ស
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>© 2026-2027</span>
            <Link href="/admin" className="hover:text-slate-600 underline underline-offset-2">
              ផ្នែកគ្រប់គ្រង
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
