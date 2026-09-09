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
  HelpCircle,
  Building2,
  Code2,
  Cpu,
  Layers,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { bcaSemesters } from '@/data/bcaCoursesData';
import { UNIVERSITY_PROGRAMS, duCsSemesters } from '@/data/universityCoursesData';
import AdSenseBanner from '@/components/AdSenseBanner';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

export default function UniversityCoursesDashboard() {
  const router = useRouter();
  const { completedChapters } = useProgress();
  
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);
  const [selectedUniversity, setSelectedUniversity] = useState<'du' | 'ignou'>('du');

  // Open accordion semesters state
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

    // Read URL param or saved university choice
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const uniParam = params.get('uni');
      if (uniParam === 'ignou' || uniParam === 'du') {
        setSelectedUniversity(uniParam);
      } else {
        const savedUni = localStorage.getItem('nextsem_preferred_university');
        if (savedUni === 'ignou' || savedUni === 'du') {
          setSelectedUniversity(savedUni);
        }
      }
    }

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

  const handleUniversityChange = (uni: 'du' | 'ignou') => {
    setSelectedUniversity(uni);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsem_preferred_university', uni);
      const url = new URL(window.location.href);
      url.searchParams.set('uni', uni);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const getSemesterProgress = (semId: number) => {
    if (selectedUniversity === 'du') {
      const sem = duCsSemesters.find(s => s.id === semId);
      if (!sem) return { read: 0, total: 0, pct: 0 };
      const totalUnits = sem.subjects.reduce((acc, sub) => acc + sub.units.length, 0);
      return { read: 2, total: totalUnits, pct: totalUnits > 0 ? Math.round((2 / totalUnits) * 100) : 0 };
    }

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
    if (selectedUniversity === 'du') {
      const total = duCsSemesters.reduce((acc, sem) => 
        acc + sem.subjects.reduce((sAcc, sub) => sAcc + sub.units.length, 0), 0);
      return { read: 4, total, pct: total > 0 ? Math.round((4 / total) * 100) : 0 };
    }

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
  const currentProgram = UNIVERSITY_PROGRAMS.find(p => p.id === selectedUniversity) || UNIVERSITY_PROGRAMS[0];

  return (
    <div className="w-full min-h-screen bg-[#060c18] text-white flex flex-col justify-between font-sans selection:bg-[#c1a648]/30 relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-950/20 blur-[120px] pointer-events-none" />

      {/* ── Top Header Bar with Navigation ── */}
      <BcaHeaderNav
        currentSubjectCode={selectedUniversity === 'du' ? "CSDSC01" : "BCS-111"}
        currentSubjectName={selectedUniversity === 'du' ? "Programming using Python" : "Computer Basics & PC Software"}
        points={points}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* ── UNIVERSITY SELECTOR TABS ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-[#090f24]/90 border border-slate-800/90 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 hidden sm:inline-block">
              Select University:
            </span>
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleUniversityChange('du')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedUniversity === 'du'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400/40 font-black scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Building2 size={16} className={selectedUniversity === 'du' ? 'text-white' : 'text-blue-400'} />
                <span>Delhi University (DU)</span>
              </button>

              <button
                type="button"
                onClick={() => handleUniversityChange('ignou')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedUniversity === 'ignou'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/40 font-black scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <GraduationCap size={16} className={selectedUniversity === 'ignou' ? 'text-white' : 'text-emerald-400'} />
                <span>IGNOU</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentProgram.regulation}</span>
          </div>
        </div>

        {/* ── Hero Section ── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] border border-cyan-500/30 shadow-2xl space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <span>{currentProgram.badge}</span>
              <span>•</span>
              <span>{currentProgram.degreeName}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {currentProgram.shortName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300">Computer Science Hub</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
              {currentProgram.description}
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

        {/* ── SEMESTERS ACCORDION (DU & IGNOU DYNAMIC) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <span>{currentProgram.degreeName} Curriculum</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-400">Tap semester to expand subjects</span>
          </div>

          <div className="space-y-4">
            {selectedUniversity === 'du' ? (
              /* ── DELHI UNIVERSITY CS CURRICULUM ── */
              duCsSemesters.map((sem) => {
                const semProg = getSemesterProgress(sem.id);
                const isOpen = !!openSemesters[sem.id];

                return (
                  <div
                    key={`du-sem-${sem.id}`}
                    className="rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] border border-slate-800 shadow-xl overflow-hidden transition-all duration-300"
                  >
                    {/* Accordion Header Bar */}
                    <div
                      onClick={() => toggleSemester(sem.id)}
                      className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors select-none"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 font-black text-sm sm:text-base flex items-center justify-center shrink-0">
                          0{sem.id}
                        </div>

                        <div className="min-w-0 text-left">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-black text-white truncate">
                              {sem.name}
                            </h3>
                            <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                              UGCF NEP 2020
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-slate-400 font-bold mt-0.5 truncate">
                            {sem.subjects.length} Core Papers (DSCs) · 16 Credits Total
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

                    {/* Accordion Expanded Body (DU Subjects) */}
                    {isOpen && (
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 bg-slate-950/60 space-y-4 animate-in fade-in duration-200">
                        <div className="text-[11px] font-bold text-slate-400 mt-3 mb-2 flex items-center justify-between">
                          <span>Discipline Specific Core (DSC) Papers in {sem.name}:</span>
                          <span className="text-blue-400 font-mono text-[10px]">Department of Computer Science, DU</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {sem.subjects.map((sub) => (
                            <div
                              key={sub.code}
                              className="p-4 rounded-2xl bg-[#0e1630] border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group shadow-sm"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    {sub.code}
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                                    {sub.credits} Credits ({sub.theoryCredits}L + {sub.practicalCredits}P)
                                  </span>
                                </div>

                                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                                  {sub.name}
                                </h4>

                                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                                  {sub.description}
                                </p>

                                {/* Units Preview Tags */}
                                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Syllabus Units:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {sub.units.map((u) => (
                                      <span key={u.unitNumber} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                                        Unit {u.unitNumber}: {u.title.split('&')[0].trim()}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 flex items-center justify-between gap-2 mt-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (sub.code === "CSDSC01") {
                                      router.push("/cli");
                                    } else if (sub.code === "CSDSC02") {
                                      router.push("/bca/semester-1/bcs-011-computer-basics/unit-1-introduction-to-computer-systems");
                                    } else {
                                      alert(`Syllabus and study notes for ${sub.code} ${sub.name} are being prepared.`);
                                    }
                                  }}
                                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                                >
                                  <Play size={12} className="fill-white" />
                                  <span>Start {sub.name.split(' ')[0]} Lesson</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              /* ── IGNOU BCA CURRICULUM ── */
              bcaSemesters.map((sem) => {
                const semProg = getSemesterProgress(sem.id);
                const isOpen = !!openSemesters[sem.id];

                return (
                  <div
                    key={`ignou-sem-${sem.id}`}
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

                    {/* Accordion Expanded Body (IGNOU Subjects) */}
                    {isOpen && (
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 bg-slate-950/60 space-y-3 animate-in fade-in duration-200">
                        <div className="text-[11px] font-bold text-slate-400 mb-2 mt-3 flex items-center justify-between">
                          <span>Subjects in {sem.name}:</span>
                          <span className="text-emerald-400 font-mono text-[10px]">IGNOU SOCIS Syllabus</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {sem.subjects.map((sub) => {
                            const isComputerBasics = sub.code === "BCS-111" || sub.code === "BCS-011";
                            const totalUnits = sub.blocks.reduce((acc, b) => acc + b.units.length, 0);
                            
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
                                className="p-4 rounded-2xl bg-[#0e1630] border border-slate-800/80 hover:border-cyan-500/50 hover:bg-[#121c3b] transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-sm"
                              >
                                <div className="space-y-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                      {sub.code}
                                    </span>
                                    {sub.isLab && (
                                      <span className="text-[9px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                        Practical Lab
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                    {sub.name}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 font-medium">
                                    {sub.blocks.length} Blocks · {totalUnits} Units
                                  </p>
                                </div>

                                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:translate-x-0.5 transition-all shrink-0">
                                  <Play size={14} className="fill-current" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ── Career & Academic Pathway Highlights ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-[#0a1022] border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <Code2 size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Full-Stack & Python Labs</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real-world programming assignments for DU Python DSC and IGNOU C/Java labs with in-browser execution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a1022] border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Cpu size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Hardware & OS Simulators</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Step-by-step 🪟 Windows 11 terminal commands, process state visualizers, and CPU register architecture.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a1022] border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Exam Preparation Suites</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Previous year university question solutions, formula cheat-sheets, and 100% textbook notes.
            </p>
          </div>
        </section>

      </main>

      {/* ── Standard Platform Footer ── */}
      <footer className="w-full py-6 mt-12 border-t border-slate-800/80 bg-[#040812] text-center text-xs text-slate-400 space-y-2">
        <p className="font-medium text-slate-300">
          Nextsem Academy • University Computer Science Education Portal (Delhi University & IGNOU)
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link>
          <span>•</span>
          <Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
          <span>•</span>
          <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">XML Sitemap</Link>
        </div>
      </footer>
    </div>
  );
}
