"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Star, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Play, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { bcaSemesters } from '@/data/bcaCoursesData';
import AdSenseBanner from '@/components/AdSenseBanner';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

export default function BcaDashboard() {
  const router = useRouter();
  const { completedChapters } = useProgress();
  
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);

  // Open accordion semesters state (Semester 1 open by default!)
  const [openSemesters, setOpenSemesters] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleSemester = (semId: number) => {
    setOpenSemesters((prev) => ({
      ...prev,
      [semId]: !prev[semId]
    }));
  };

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

  const getSemesterProgress = (semId: number) => {
    const sem = bcaSemesters.find(s => s.id === semId);
    if (!sem) return { read: 0, total: 0, pct: 0 };
    
    let totalUnits = 0;
    let readUnits = 0;

    sem.subjects.forEach(sub => {
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

  const getOverallProgress = () => {
    let totalUnits = 0;
    let readUnits = 0;

    bcaSemesters.forEach(sem => {
      sem.subjects.forEach(sub => {
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
    });

    return {
      read: readUnits,
      total: totalUnits,
      pct: totalUnits > 0 ? Math.round((readUnits / totalUnits) * 100) : 0
    };
  };

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-[#060c18] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  const overall = getOverallProgress();

  return (
    <div className="w-full min-h-screen bg-[#060c18] text-white flex flex-col justify-between font-sans selection:bg-[#c1a648]/30 relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-950/20 blur-[120px] pointer-events-none" />

      {/* ── Top Header Bar with Subject Switcher Dropdown (Matching image-20.png) ── */}
      <BcaHeaderNav
        currentSubjectCode="BCS-111"
        currentSubjectName="Computer Basics & PC Software"
        points={points}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* Hero Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] border border-cyan-500/30 shadow-2xl space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <GraduationCap size={14} />
              <span>IGNOU BCA Revised Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              IGNOU BCA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300">Learning Hub</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
              Click any subject below to jump directly into Unit 1 lessons. Complete 100% PDF notes, interactive converters, and practice quizzes.
            </p>
          </div>

          {/* Quick Progress Badge */}
          <div className="mt-4 sm:mt-0 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center shrink-0 w-full sm:w-48 text-center shadow-inner">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Course Progress</span>
            <span className="text-2xl font-black text-emerald-400 mt-1">{overall.pct}%</span>
            <span className="text-[10px] text-slate-400 font-bold mt-0.5">{overall.read} / {overall.total} Units</span>
          </div>
        </section>

        <div>
          <AdSenseBanner />
        </div>

        {/* ── SEMESTERS ACCORDION (Mobile & Desktop Optimized) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <span>Semesters & Subjects List</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-400">Tap to expand subjects</span>
          </div>

          <div className="space-y-4">
            {bcaSemesters.map((sem) => {
              const semProg = getSemesterProgress(sem.id);
              const isOpen = !!openSemesters[sem.id];

              return (
                <div
                  key={sem.id}
                  className="rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] border border-slate-800 shadow-xl overflow-hidden transition-all duration-300"
                >
                  {/* Accordion Header Bar */}
                  <div
                    onClick={() => toggleSemester(sem.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-black text-sm sm:text-base flex items-center justify-center shrink-0">
                        0{sem.id}
                      </div>

                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-white truncate">
                            {sem.name}
                          </h3>
                          {semProg.pct === 100 && (
                            <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                              ✓ Done
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-bold mt-0.5 truncate">
                          {sem.subjects.length} Subjects · {semProg.total} Unit Files
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-black text-emerald-400">{semProg.pct}%</span>
                        <span className="text-[10px] text-slate-500 block">Progress</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Expanded Body (Subjects List) */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 bg-slate-950/60 space-y-3 animate-in fade-in duration-200">
                      <div className="text-[11px] font-bold text-slate-400 mb-2">
                        Subjects in {sem.name}:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sem.subjects.map((sub) => {
                          const isComputerBasics = sub.code === "BCS-111" || sub.code === "BCS-011";
                          const totalUnits = sub.blocks.reduce((acc, b) => acc + b.units.length, 0);
                          
                          // Dedicated subject page URL for all subjects across all semesters
                          const targetUrl = sem.id === 1
                            ? (isComputerBasics 
                                ? "/bca/semester-1/bcs-011-computer-basics" 
                                : sub.code === "BCS-012"
                                ? "/bca/semester-1/bcs-012-basic-mathematics"
                                : sub.code === "BCSL-013"
                                ? "/bca/semester-1/bcsl-013-software-lab"
                                : sub.code === "BEGLA-136"
                                ? "/bca/semester-1/begla-136-english"
                                : sub.code === "BEVAE-181"
                                ? "/bca/semester-1/bevae-181-environmental-studies"
                                : `/bca/semester-1/${sub.code.toLowerCase()}`)
                            : `/bca/${sem.id}/${sub.code.toLowerCase()}`;

                          return (
                            <div
                              key={sub.code}
                              onClick={() => router.push(targetUrl)}
                              className="p-4 rounded-2xl bg-[#0c1328] hover:bg-[#101b38] border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all duration-200 shadow-md group flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-base font-black shrink-0 group-hover:scale-105 transition-transform">
                                  {sub.isLab ? '🧪' : '📘'}
                                </div>

                                <div className="min-w-0 text-left">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] font-black uppercase text-amber-400">
                                      {sub.code}
                                    </span>
                                    {isComputerBasics && (
                                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                                        Interactive Lessons
                                      </span>
                                    )}
                                    <span className="text-[9px] font-bold text-slate-400">
                                      {sub.blocks.length} Blocks · {totalUnits} Units
                                    </span>
                                  </div>
                                  <h4 className="text-xs sm:text-sm font-extrabold text-white truncate leading-snug mt-0.5 group-hover:text-cyan-300 transition-colors">
                                    {sub.name}
                                  </h4>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0 pl-2">
                                <span className="text-[10px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                                  Syllabus
                                </span>
                                <Play size={14} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[10px] text-slate-500 border-t border-slate-800/80 mt-auto space-y-2">
        <div>© 2026 Nextsem Academy · IGNOU BCA Revised Syllabus Companion</div>
      </footer>
    </div>
  );
}
