"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { bcaSemesters } from '@/data/bcaCoursesData';
import AdSenseBanner from '@/components/AdSenseBanner';
import DuduBubuWipWidget from '@/components/bca/DuduBubuWipWidget';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';
import { 
  ArrowLeft, 
  Star, 
  GraduationCap, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  ExternalLink,
  Laptop,
  Check
} from 'lucide-react';

export default function SemesterSubjectsDashboard({ semester }: { semester: string }) {
  const router = useRouter();
  const { completedChapters } = useProgress();

  const semesterId = parseInt(semester.replace(/^semester-/, ""), 10) || 1;
  const currentSemester = bcaSemesters.find(s => s.id === semesterId);

  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);

  // Accordion state for mobile view (Subject 1 expanded by default)
  const [expandedSubjectCode, setExpandedSubjectCode] = useState<string>("BCS-111");

  useEffect(() => {
    setMounted(true);

    const savedUser = localStorage.getItem('nextsem_user');
    let email = "guest";
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        email = parsed.email || "guest";
      } catch (e) {}
    }
    setUserEmail(email);

    const savedPoints = localStorage.getItem(`nextsem_bca_points_${email}`);
    if (savedPoints) {
      setPoints(parseInt(savedPoints) || 0);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-[#ffffff] dark:bg-[#060c18] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-200 dark:border-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentSemester) {
    return (
      <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#060c18] text-black dark:text-white flex flex-col items-center justify-center p-6 text-center">
        <GraduationCap size={48} className="text-emerald-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-black mb-2">Semester Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-sm">
          We couldn&apos;t locate the semester you are looking for in the BCA curriculum guide.
        </p>
        <Link 
          href="/bca" 
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
        >
          Back to BCA Hub
        </Link>
      </div>
    );
  }

  // Calculate progress for a subject
  const getSubjectProgress = (subjectCode: string) => {
    const sub = currentSemester.subjects.find(s => s.code === subjectCode);
    if (!sub) return { read: 0, total: 0, pct: 0 };

    let totalUnits = 0;
    let readUnits = 0;

    sub.blocks.forEach(block => {
      block.units.forEach(unit => {
        totalUnits++;
        const progressKey = `bca_unit:${block.path}/${unit.fileName}`;
        if (completedChapters[progressKey]) {
          readUnits++;
        }
      });
    });

    return {
      read: readUnits,
      total: totalUnits,
      pct: totalUnits > 0 ? Math.round((readUnits / totalUnits) * 100) : 0
    };
  };

  const overallSemesterProg = () => {
    let totalUnits = 0;
    let readUnits = 0;

    currentSemester.subjects.forEach(sub => {
      sub.blocks.forEach(block => {
        block.units.forEach(unit => {
          totalUnits++;
          const progressKey = `bca_unit:${block.path}/${unit.fileName}`;
          if (completedChapters[progressKey]) {
            readUnits++;
          }
        });
      });
    });

    return {
      read: readUnits,
      total: totalUnits,
      pct: totalUnits > 0 ? Math.round((readUnits / totalUnits) * 100) : 0
    };
  };

  const semProg = overallSemesterProg();

  const getSubjectUrl = (subCode: string) => {
    const isComputerBasics = subCode === "BCS-111" || subCode === "BCS-011";
    if (semesterId === 1) {
      if (isComputerBasics) return "/bca/semester-1/bcs-011-computer-basics";
      if (subCode === "BCS-012") return "/bca/semester-1/bcs-012-basic-mathematics";
      if (subCode === "BCSL-013") return "/bca/semester-1/bcsl-013-software-lab";
      if (subCode === "BEGLA-136" || subCode === "FEG-02") return "/bca/semester-1/begla-136-english";
      if (subCode === "BEVAE-181") return "/bca/semester-1/bevae-181-environmental-studies";
      return `/bca/semester-1/${subCode.toLowerCase()}`;
    }
    return `/bca/${semesterId}/${subCode.toLowerCase()}`;
  };

  const getSubjectCredits = (subCode: string) => {
    if (subCode === "BCSL-013") return 2;
    return 4;
  };

  const getSubjectIcon = (subCode: string, isLab: boolean) => {
    if (isLab) return "🧪";
    if (subCode.includes("111") || subCode.includes("011")) return "💻";
    if (subCode.includes("012")) return "📐";
    if (subCode.includes("136") || subCode.includes("FEG")) return "💬";
    if (subCode.includes("181")) return "🌿";
    return "📘";
  };

  return (
    <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#060c18] text-black dark:text-white flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative pb-20 transition-colors">
      
      {/* ── Top Header Navigation Bar ── */}
      <BcaHeaderNav
        currentSubjectCode={`Semester ${semesterId}`}
        currentSubjectName={`${currentSemester.name} Hub`}
        points={points}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
        
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold">
          <Link href="/" className="hover:text-emerald-500 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-neutral-700 font-bold">❯</span>
          <Link href="/bca" className="hover:text-emerald-500 transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-400 dark:text-neutral-700 font-bold">❯</span>
          <span className="text-emerald-500 font-extrabold">{currentSemester.name}</span>
        </nav>

        {/* ── Top Section Header (BCA HUB • SEMESTER DASHBOARD) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-black dark:text-white">
                BCA HUB • <span className="text-emerald-500">SEMESTER DASHBOARD</span>
              </h1>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
              Curriculum, Line-by-Line Textbook Units &amp; Lab Simulators Authored by <strong className="text-black dark:text-white">Er. Manoj Kumar</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-black">
              {semProg.pct}% Semester Finished
            </span>
            <span className="text-xs font-bold text-slate-500">
              ({semProg.read}/{semProg.total} Units)
            </span>
          </div>
        </div>

        {/* ── 1. HORIZONTAL SEMESTER SELECTOR BAR (Desktop & Mobile Swipeable) ── */}
        <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-[#0c1328] border border-slate-200 dark:border-neutral-800 shadow-sm overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {bcaSemesters.map((sem) => {
              const isActive = sem.id === semesterId;
              return (
                <button
                  key={sem.id}
                  type="button"
                  onClick={() => router.push(`/bca/semester-${sem.id}`)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/50'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Semester {sem.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* AdSense Unit */}
        <div>
          <AdSenseBanner />
        </div>

        {/* Show Dudu & Bubu Work-In-Progress for upcoming Semesters 2-6 */}
        {semesterId > 1 && (
          <DuduBubuWipWidget
            title={`Arre Arre! Yahan tak to aa gaye 🐾 (${currentSemester.name})`}
            subtitle="par yahan se aage ka content Dudu aur Bubu milkar bana rahe hain! Thoda wait karo 🐻❤️🐻"
            returnUrl="/bca/semester-1"
          />
        )}


        {/* ════════════════════════════════════════════════════════════════
            2. MOBILE VIEW: CLEAN SUBJECT ACCORDIONS (04-bca-dashboard-mobile-layout)
        ════════════════════════════════════════════════════════════════ */}
        <div className="block md:hidden space-y-3">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            <span>Semester {semesterId} Subjects</span>
            <span>Tap to Expand</span>
          </div>

          {currentSemester.subjects.map((sub) => {
            const isExpanded = expandedSubjectCode === sub.code;
            const sp = getSubjectProgress(sub.code);
            const targetUrl = getSubjectUrl(sub.code);
            const icon = getSubjectIcon(sub.code, sub.isLab);
            const credits = getSubjectCredits(sub.code);
            const allUnits = sub.blocks.flatMap(b => b.units);

            return (
              <div
                key={sub.code}
                className="rounded-2xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-neutral-800 shadow-sm overflow-hidden transition-all"
              >
                {/* Accordion Toggle Header */}
                <button
                  type="button"
                  onClick={() => setExpandedSubjectCode(isExpanded ? "" : sub.code)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-[#101a35] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-500 dark:text-amber-400">
                          {sub.code === "BCS-111" ? "BCS-011 / BCS-111" : sub.code}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {credits} Credits
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-black dark:text-white truncate mt-0.5">
                        {sub.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono font-bold text-emerald-500">
                      {sp.pct > 0 ? `${sp.pct}%` : "Not Started"}
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Accordion Body */}
                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slate-100 dark:border-neutral-800/80 space-y-4 animate-in fade-in duration-200">
                    
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>Syllabus Completion</span>
                        <span>{sp.pct}% Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(8, sp.pct)}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Unit Pills */}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                        Textbook Units
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {allUnits.slice(0, 4).map((unit, uIdx) => (
                          <Link
                            key={unit.fileName}
                            href={targetUrl}
                            className="px-3 py-1 rounded-full text-xs font-bold transition-all bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 active:scale-95"
                          >
                            Unit {uIdx + 1}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Prominent Gold Action Button */}
                    <Link
                      href={targetUrl}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-black text-xs shadow-md transition-all active:scale-95"
                    >
                      <Play size={13} className="fill-black" />
                      <span>Start Lesson</span>
                    </Link>

                  </div>
                )}
              </div>
            );
          })}
        </div>


        {/* ════════════════════════════════════════════════════════════════
            3. DESKTOP VIEW: 4-COLUMN CURRICULUM GRID (03-bca-dashboard-desktop-layout)
        ════════════════════════════════════════════════════════════════ */}
        <div className="hidden md:block space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentSemester.subjects.map((sub) => {
              const sp = getSubjectProgress(sub.code);
              const targetUrl = getSubjectUrl(sub.code);
              const credits = getSubjectCredits(sub.code);
              const allUnits = sub.blocks.flatMap(b => b.units);

              return (
                <div
                  key={sub.code}
                  className="rounded-3xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all group"
                >
                  <div className="space-y-3.5">
                    
                    {/* Header Badges */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-amber-400/10 text-amber-500 border border-amber-400/30 text-xs font-black">
                        {sub.code === "BCS-111" ? "BCS-011" : sub.code}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Credits: {credits}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-black dark:text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {sub.name}
                    </h3>

                    {/* Syllabus Completion Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        <span>Syllabus Completion</span>
                        <span className="text-emerald-500 font-mono">{sp.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(6, sp.pct)}%` }}
                        />
                      </div>
                    </div>

                    {/* Units Section */}
                    <div className="pt-2 border-t border-slate-100 dark:border-neutral-800/80 space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Units Catalog
                      </div>
                      <div className="space-y-1.5">
                        {allUnits.slice(0, 4).map((unit, idx) => (
                          <div 
                            key={unit.fileName}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/60 text-xs"
                          >
                            <span className="text-slate-700 dark:text-slate-300 font-bold truncate max-w-[130px]" title={unit.displayName}>
                              Unit {idx + 1}: {unit.displayName.replace(/^Unit-\d+:\s*/i, '')}
                            </span>
                            <Link
                              href={targetUrl}
                              className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-black text-[10px] font-black shrink-0 transition-transform active:scale-95 shadow-xs"
                            >
                              Start Unit
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Card Footer: Author Attribution */}
                  <div className="pt-4 border-t border-slate-100 dark:border-neutral-800/80 mt-4 text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium">
                    Curriculum by <strong className="text-black dark:text-white">Er. Manoj Kumar</strong>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Return to BCA Hub Link */}
        <div className="pt-6 border-t border-slate-200 dark:border-neutral-800 flex justify-center">
          <Link
            href="/bca"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 dark:bg-[#0c1328] dark:hover:bg-[#121c38] text-black dark:text-white font-extrabold text-xs sm:text-sm border border-slate-200 hover:border-emerald-500 dark:border-neutral-800 dark:hover:border-emerald-500 shadow-sm transition-all active:scale-95 flex items-center gap-2"
          >
            <Layers size={16} className="text-emerald-500" />
            <span>Return to All 6 Semesters Hub</span>
          </Link>
        </div>

      </main>

      <footer className="w-full py-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-neutral-800 mt-auto">
        Curriculum &amp; Textbook Units Authored by <strong className="text-black dark:text-white">Er. Manoj Kumar</strong> • NextSem CS Guide
      </footer>

    </div>
  );
}
