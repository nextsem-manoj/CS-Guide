"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, FileText, Sparkles, HelpCircle, BookOpen, ChevronRight, CheckCircle2, Play, ExternalLink } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { bcaSemesters } from '@/data/bcaCoursesData';
import AdSenseBanner from '@/components/AdSenseBanner';
import BcaInteractiveModal from '@/components/bca-interactive/BcaInteractiveModal';
import DuduBubuWipWidget from '@/components/bca/DuduBubuWipWidget';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

export default function SubjectSyllabusDashboard({ semester, subject }: { semester: string; subject: string }) {
  const router = useRouter();
  const { completedChapters } = useProgress();

  const semesterId = parseInt(semester.replace(/^semester-/, ""), 10) || 1;
  // ✅ Fix: normalize subject param to subjectCode without splitting on hyphens
  const subjectUpper = subject.toUpperCase().replace(/\s+/g, "-");
  let subjectCode = subjectUpper;
  // Normalize BCS-011 ↔ BCS-111 alias
  if (subjectCode === "BCS-011" || subjectCode === "BCS011" || subjectCode.includes("BCS-011") || subjectCode.includes("COMPUTER-BASICS")) {
    subjectCode = "BCS-111";
  }
  // If subject param has a known code prefix somewhere, extract it
  const codeMatch = subjectUpper.match(/^(BCS-\d+|BCSL-\d+|FEG-\d+|ECO-\d+|MCS-\d+|MCSL-\d+|BEGLA-\d+|BEVAE-\d+)/);
  if (codeMatch) {
    subjectCode = codeMatch[1] === "BCS-011" ? "BCS-111" : codeMatch[1];
  }

  const currentSemester = bcaSemesters.find(s => s.id === semesterId);
  const currentSubject = currentSemester?.subjects.find(s => 
    s.code.toUpperCase() === subjectCode || 
    s.code.toUpperCase().startsWith(subjectCode) ||
    subject.toUpperCase().includes(s.code.toUpperCase())
  );

  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);

  // Lab modal states
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [labUnitNum, setLabUnitNum] = useState<number>(1);
  const [labDefaultTab, setLabDefaultTab] = useState<string>("home");
  const [showProblem7Answer, setShowProblem7Answer] = useState(false);

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

  if (!currentSemester || !currentSubject) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-6 text-center">
        <DuduBubuWipWidget
          title="Arre Arre! Yahan tak to aa gaye 🐾"
          subtitle="par yahan se aage ka content Dudu aur Bubu milkar bana rahe hain! Thoda wait karo 🐻❤️🐻"
          returnUrl="/bca/semester-1"
        />
      </div>
    );
  }

  const getBlockProgress = (blockName: string) => {
    const block = currentSubject.blocks.find(b => b.name === blockName);
    if (!block) return { read: 0, total: 0, pct: 0 };

    let totalUnits = 0;
    let readUnits = 0;

    block.units.forEach(unit => {
      totalUnits++;
      const progressKey = `bca_unit:${block.path}/${unit.fileName}`;
      if (completedChapters[progressKey]) {
        readUnits++;
      }
    });

    return {
      read: readUnits,
      total: totalUnits,
      pct: totalUnits > 0 ? Math.round((readUnits / totalUnits) * 100) : 0
    };
  };

  const getSubjectProgress = () => {
    let totalUnits = 0;
    let readUnits = 0;

    currentSubject.blocks.forEach(block => {
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

  const subProg = getSubjectProgress();

  const handleOpenInteractive = (unitFileName: string, defaultTab?: string) => {
    const unitNum = unitFileName.includes('UNIT 2') ? 2 : 1;
    setLabUnitNum(unitNum);
    setLabDefaultTab(defaultTab || "home");
    setIsLabOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col justify-between font-sans selection:bg-blue-600/30 relative pb-24 transition-colors">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* ── Top Header Bar with Subject Switcher Dropdown ── */}
      <BcaHeaderNav
        currentSubjectCode={currentSubject.code}
        currentSubjectName={currentSubject.name}
        points={points}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold py-1">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-neutral-700 font-bold">❯</span>
          <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-400 dark:text-neutral-700 font-bold">❯</span>
          <Link href={`/bca/semester-${currentSemester.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {currentSemester.name}
          </Link>
          <span className="text-slate-400 dark:text-neutral-700 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">{currentSubject.code}</span>
        </nav>

        {/* Title Hero Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-4 md:flex md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                currentSubject.isLab ? 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-700' : 'bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700'
              }`}>
                {currentSubject.isLab ? 'Lab Module' : 'Theory Course'}
              </span>
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase">{currentSubject.code}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight leading-tight">
              {currentSubject.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-1 font-medium">
              Syllabus Blocks &amp; Interactive Textbooks. Complete all unit lessons to earn course XP.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-4 rounded-2xl shrink-0 shadow-sm">
            <div className="text-center">
              <span className="block text-blue-600 dark:text-blue-400 font-black text-2xl">{subProg.pct}%</span>
              <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-wider">Completed</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-neutral-800" />
            <div className="text-center">
              <span className="block text-black dark:text-white font-black text-2xl">{subProg.read}/{subProg.total}</span>
              <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-wider">Units Read</span>
            </div>
          </div>
        </section>

        <div>
          <AdSenseBanner />
        </div>

        {/* Blocks & Units Hierarchy */}
        <section className="space-y-6">
          {currentSubject.blocks.map((block, bIdx) => {
            const bp = getBlockProgress(block.name);
            return (
              <div key={block.name} className="bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-4">
                {/* Block header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3">
                  <div className="text-left">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-wider">Block {bIdx + 1}</span>
                    <h2 className="text-base sm:text-lg font-black text-black dark:text-white leading-tight mt-0.5">{block.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{bp.read} of {bp.total} read</span>
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 px-2 py-0.5 rounded-md">{bp.pct}%</span>
                  </div>
                </div>

                {/* Units List */}
                <div className="space-y-3">
                  {block.units.length === 0 ? (
                    <p className="text-xs text-slate-500 p-4 text-center select-none">No units configured in this block.</p>
                  ) : (
                    block.units.map((unit, uIdx) => {
                      const progressKey = `bca_unit:${block.path}/${unit.fileName}`;
                      const isCompleted = !!completedChapters[progressKey];
                      const pdfPath = `/BCA_NEW_Books/${block.path}/${unit.fileName}`;
                      
                      // ✅ Dedicated interactive lesson routes in BCS-111 / BCS-011
                      const isComputerBasicsUnit1 =
                        (subjectCode === "BCS-111" || subjectCode === "BCS-011") &&
                        block.name.toLowerCase().includes("block 1") &&
                        (unit.fileName.toLowerCase().includes("unit-1") ||
                          unit.fileName.toLowerCase().includes("unit 1") ||
                          (uIdx === 0 && bIdx === 0));
                      const isOperatingSystemUnit2 =
                        (subjectCode === "BCS-111" || subjectCode === "BCS-011") &&
                        (unit.displayName.toLowerCase().includes("operating system") ||
                          (block.name.toLowerCase().includes("block 2") && unit.fileName.toLowerCase().includes("unit-2")));
                      const isComputerBasicsUnit5 =
                        (subjectCode === "BCS-111" || subjectCode === "BCS-011") &&
                        (unit.fileName.toLowerCase().includes("unit 5") ||
                          unit.fileName.toLowerCase().includes("unit-5"));
                      const isConceptInProgrammingLanguage =
                        (subjectCode === "BCS-111" || subjectCode === "BCS-011") &&
                        (unit.displayName.toLowerCase().includes("concept in programming language") ||
                          (block.name.toLowerCase().includes("block 2") && unit.fileName.toLowerCase().includes("unit-3")));
                      const isNetworkingAndInternetUnit1 =
                        (subjectCode === "BCS-111" || subjectCode === "BCS-011") &&
                        (unit.displayName.toLowerCase().includes("networking and internet") ||
                          (block.name.toLowerCase().includes("block 3") && (unit.fileName.toLowerCase().includes("unit-1") || unit.fileName.toLowerCase().includes("unit 1"))));


                      const interactiveLessonUrl = isComputerBasicsUnit1
                        ? "/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
                        : isOperatingSystemUnit2
                        ? "/bca/notes/bcs-011-unit-2-operating-system"
                        : isComputerBasicsUnit5
                        ? "/bca/notes/bcs-011-unit-5"
                        : isConceptInProgrammingLanguage
                        ? "/bca/notes/bcs-011-unit-3-programming-languages"
                        : isNetworkingAndInternetUnit1
                        ? "/bca/notes/bcs-011-block-3-unit-1-networking-and-internet"
                        : null;

                      const handleUnitClick = () => {
                        if (interactiveLessonUrl) {
                          router.push(interactiveLessonUrl);
                        } else {
                          router.push(`/bca/viewer?file=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(unit.displayName)}`);
                        }
                      };

                      return (
                        <div key={unit.fileName} className="space-y-2.5">
                          <div
                            onClick={handleUnitClick}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-neutral-950 hover:bg-slate-50 dark:hover:bg-neutral-900 border border-slate-200 hover:border-blue-600 dark:border-neutral-800 dark:hover:border-blue-500 rounded-2xl cursor-pointer transition-all duration-200 group shadow-sm"
                          >
                            <div className="flex items-start gap-3.5 min-w-0 pr-2">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black ${
                                isCompleted 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700'
                              }`}>
                                {isCompleted ? '✓' : uIdx + 1}
                              </div>
                              <div className="min-w-0 text-left">
                                <h4 className="text-xs sm:text-sm font-extrabold text-black dark:text-white truncate leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                  <span>{unit.displayName}</span>
                                  {interactiveLessonUrl && (
                                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700">
                                      Interactive Lesson
                                    </span>
                                  )}
                                </h4>
                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{unit.fileName}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-3 sm:mt-0 justify-end">
                              {interactiveLessonUrl && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(interactiveLessonUrl);
                                  }}
                                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                                >
                                  <Play size={11} className="fill-white" />
                                  <span>Start Lesson</span>
                                </button>
                              )}

                              {/* LAB SIMULATION — only show if no dedicated interactive lesson page */}
                              {unit.isInteractive && !interactiveLessonUrl && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenInteractive(unit.fileName, unit.defaultTab);
                                  }}
                                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-blue-200 dark:border-neutral-700 rounded-xl text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <Sparkles size={11} className="text-blue-600 dark:text-blue-400" />
                                  <span>Lab Simulation</span>
                                </button>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/bca/viewer?file=${encodeURIComponent(pdfPath)}&title=${encodeURIComponent(unit.displayName)}`);
                                }}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-[10px] font-bold text-black dark:text-white rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                              >
                                <FileText size={11} />
                                <span>PDF Notes</span>
                              </button>
                            </div>
                          </div>

                          {/* Dedicated Practice Link & Question Section directly below Unit 3 */}
                          {isConceptInProgrammingLanguage && (
                            <div className="p-4 bg-white dark:bg-neutral-950 border border-blue-200 dark:border-blue-900/40 rounded-2xl space-y-3 ml-0 sm:ml-4 shadow-sm">
                              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-neutral-800">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-200 dark:border-neutral-700">
                                    Practice Problem 7
                                  </span>
                                  <h5 className="text-xs sm:text-sm font-extrabold text-black dark:text-white">
                                    Roots of Quadratic Equation (Algorithm &amp; Flowchart)
                                  </h5>
                                </div>
                                <a
                                  href="/algorithms-and-flowcharts/problem-7-quadratic-equation-roots/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
                                >
                                  <span>Open Dedicated Page ↗</span>
                                  <ExternalLink size={11} />
                                </a>
                              </div>

                              {/* Question / Problem Statement */}
                              <div className="p-3 bg-slate-50 dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300">
                                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">Question / Problem Statement:</span>
                                <p className="leading-relaxed">
                                  Given coefficients <strong className="text-black dark:text-white">a</strong>, <strong className="text-black dark:text-white">b</strong>, and <strong className="text-black dark:text-white">c</strong> of <strong className="text-blue-600 dark:text-blue-400">ax² + bx + c = 0</strong>, formulate a step-by-step algorithm and draw an ANSI flowchart to determine both real and complex roots across all three cases: <span className="text-blue-600 dark:text-blue-400 font-mono">D &gt; 0</span>, <span className="text-blue-600 dark:text-blue-400 font-mono">D = 0</span>, and <span className="text-blue-600 dark:text-blue-400 font-mono">D &lt; 0</span>.
                                </p>
                              </div>

                              {/* Toggle Answer Button */}
                              <div className="pt-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProblem7Answer(!showProblem7Answer);
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white text-xs font-bold border border-slate-200 dark:border-neutral-800 transition flex items-center gap-2 cursor-pointer"
                                >
                                  {showProblem7Answer ? "🙈 Hide Answer to Question" : "👁️ View Answer to Question & C++ Program"}
                                </button>

                                {/* Answer Content - Hidden by default */}
                                {showProblem7Answer && (
                                  <div className="mt-3 p-3.5 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl space-y-3 text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">Algorithm Solution (Steps 1 to 8):</span>
                                      <span className="text-slate-500 text-[10px]">Discriminant D = b² - 4ac</span>
                                    </div>
                                    <pre className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
{`Step 1: Start.
Step 2: Read coefficients a, b, c.
Step 3: If a == 0, Print 'Not quadratic (Linear equation)' and Stop.
Step 4: Compute Discriminant D = (b * b) - (4 * a * c).
Step 5: If D > 0 (Two distinct real roots):
         root1 = (-b + sqrt(D)) / (2 * a).
         root2 = (-b - sqrt(D)) / (2 * a).
         Print root1, root2.
Step 6: Else if D == 0 (Two equal real roots):
         root1 = -b / (2 * a).
         Print 'Real and Equal Roots:', root1.
Step 7: Else (D < 0, Complex conjugate roots):
         realPart = -b / (2 * a).
         imagPart = sqrt(-D) / (2 * a).
         Print 'Complex Roots: realPart +/- imagPart * i'.
Step 8: Stop.`}
                                    </pre>

                                    {/* C++ Code Snippet */}
                                    <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 space-y-1.5">
                                      <div className="flex items-center justify-between">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">C++ 17/20 Implementation:</span>
                                        <span className="text-slate-500 text-[10px] font-mono">#include &lt;cmath&gt;</span>
                                      </div>
                                      <pre className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
{`#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double a, b, c;
    if (!(cin >> a >> b >> c) || a == 0) return 1;

    double D = (b * b) - (4.0 * a * c);
    if (D > 0) {
        double r1 = (-b + sqrt(D)) / (2.0 * a);
        double r2 = (-b - sqrt(D)) / (2.0 * a);
        cout << "Real Distinct: " << r1 << ", " << r2 << "\\n";
    } else if (D == 0) {
        cout << "Real Equal: " << (-b / (2.0 * a)) << "\\n";
    } else {
        double real = -b / (2.0 * a);
        double imag = sqrt(-D) / (2.0 * a);
        cout << "Complex: " << real << " +/- " << imag << "i\\n";
    }
    return 0;
}`}
                                      </pre>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                                      <a
                                        href="/algorithms-and-flowcharts/problem-7-quadratic-equation-roots/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs flex items-center gap-1"
                                      >
                                        <span>Open Dedicated Problem 7 Page (Interactive Studio) →</span>
                                      </a>
                                      <a
                                        href="/algorithms-and-flowcharts-10-master-problems.html#problem-7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-500 hover:text-black dark:hover:text-white font-medium text-xs"
                                      >
                                        View on Master Hub (#problem-7)
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Prominent "Back to Semester List" Navigation Button at Bottom ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-neutral-800">
          <Link
            href={`/bca/semester-${currentSemester.id}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white font-extrabold text-xs sm:text-sm border border-slate-200 hover:border-blue-600 dark:border-neutral-800 dark:hover:border-blue-500 shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to {currentSemester.name} Hub</span>
          </Link>

          <Link
            href="/bca"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>View All Semesters List</span>
          </Link>
        </div>
      </main>

      {/* Lab Modal */}
      {isLabOpen && (
        <BcaInteractiveModal
          unitNumber={labUnitNum}
          defaultTab={labDefaultTab}
          onClose={() => setIsLabOpen(false)}
        />
      )}

      <footer className="w-full py-6 text-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-neutral-800 mt-auto">
        © 2026 Nextsem Academy · IGNOU BCA Revised Syllabus Companion
      </footer>
    </div>
  );
}
