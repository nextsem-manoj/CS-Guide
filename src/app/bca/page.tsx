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
  ExternalLink,
  Download,
  FileCheck,
  Eye
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { UNIVERSITY_PROGRAMS, UniversityProgram, UniversitySemester } from '@/data/universityCoursesData';
import AdSenseBanner from '@/components/AdSenseBanner';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

export default function UniversityCoursesDashboard() {
  const router = useRouter();
  const { completedChapters } = useProgress();
  
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);
  const [selectedProgramId, setSelectedProgramId] = useState<'du-bsc' | 'ignou-bca' | 'ignou-mca'>('ignou-bca');

  // Open accordion semesters state
  const [openSemesters, setOpenSemesters] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  });

  const toggleSemester = (semId: number) => {
    setOpenSemesters((prev) => ({
      ...prev,
      [semId]: !prev[semId]
    }));
  };

  useEffect(() => {
    setMounted(true);

    // Read URL param or saved program choice
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const progParam = params.get('prog');
      const uniParam = params.get('uni');
      
      if (progParam === 'du-bsc' || progParam === 'ignou-bca' || progParam === 'ignou-mca') {
        setSelectedProgramId(progParam);
      } else if (progParam === 'mca' || uniParam === 'mca') {
        setSelectedProgramId('ignou-mca');
      } else if (progParam === 'bca' || uniParam === 'bca' || uniParam === 'ignou') {
        setSelectedProgramId('ignou-bca');
      } else if (progParam === 'du' || uniParam === 'du') {
        setSelectedProgramId('du-bsc');
      } else {
        const savedProg = localStorage.getItem('nextsem_preferred_university_program');
        if (savedProg === 'du-bsc' || savedProg === 'ignou-bca' || savedProg === 'ignou-mca') {
          setSelectedProgramId(savedProg);
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

  const handleProgramChange = (progId: 'du-bsc' | 'ignou-bca' | 'ignou-mca') => {
    setSelectedProgramId(progId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextsem_preferred_university_program', progId);
      const url = new URL(window.location.href);
      url.searchParams.set('prog', progId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const activeProgram: UniversityProgram = UNIVERSITY_PROGRAMS.find(p => p.id === selectedProgramId) || UNIVERSITY_PROGRAMS[0];

  const getSemesterProgress = (sem: UniversitySemester) => {
    const totalUnits = sem.subjects.reduce((acc, sub) => acc + sub.units.length, 0);
    if (selectedProgramId === 'du-bsc') {
      return { read: sem.id === 1 ? 2 : 0, total: totalUnits, pct: sem.id === 1 && totalUnits > 0 ? Math.round((2 / totalUnits) * 100) : 0 };
    }
    return { read: sem.id === 1 ? 2 : 0, total: totalUnits, pct: sem.id === 1 && totalUnits > 0 ? Math.round((2 / totalUnits) * 100) : 0 };
  };

  const getOverallProgress = () => {
    const total = activeProgram.semesters.reduce((acc, sem) => 
      acc + sem.subjects.reduce((sAcc, sub) => sAcc + sub.units.length, 0), 0);
    return { read: 2, total, pct: total > 0 ? Math.round((2 / total) * 100) : 0 };
  };

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-blue-600 border-slate-200 dark:border-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  const overall = getOverallProgress();

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col justify-between font-sans selection:bg-blue-600/30 relative transition-colors">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* ── Top Header Bar with Navigation ── */}
      <BcaHeaderNav
        currentSubjectCode={
          selectedProgramId === 'du-bsc' ? "Discipline A1" :
          selectedProgramId === 'ignou-mca' ? "MCS-211" : "BCS-111"
        }
        currentSubjectName={
          selectedProgramId === 'du-bsc' ? "Programming using C++" :
          selectedProgramId === 'ignou-mca' ? "Design & Analysis of Algorithms" : "Computer Basics & PC Software"
        }
        points={points}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold py-1">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-neutral-700 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">BCA &amp; University CS Hub</span>
        </nav>

        {/* ── 3-WAY UNIVERSITY & DEGREE PROGRAM SELECTOR ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 hidden sm:inline-block">
              Choose Degree:
            </span>
            <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
              {/* DU B.Sc. */}
              <button
                type="button"
                onClick={() => handleProgramChange('du-bsc')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  selectedProgramId === 'du-bsc'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800'
                }`}
              >
                <Building2 size={14} className={selectedProgramId === 'du-bsc' ? 'text-white' : 'text-blue-600 dark:text-blue-400'} />
                <span className="truncate">DU B.Sc. (P) CS</span>
              </button>

              {/* IGNOU BCA */}
              <button
                type="button"
                onClick={() => handleProgramChange('ignou-bca')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  selectedProgramId === 'ignou-bca'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800'
                }`}
              >
                <GraduationCap size={14} className={selectedProgramId === 'ignou-bca' ? 'text-white' : 'text-blue-600 dark:text-blue-400'} />
                <span className="truncate">IGNOU BCA</span>
              </button>

              {/* IGNOU MCA */}
              <button
                type="button"
                onClick={() => handleProgramChange('ignou-mca')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  selectedProgramId === 'ignou-mca'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800'
                }`}
              >
                <Layers size={14} className={selectedProgramId === 'ignou-mca' ? 'text-white' : 'text-blue-600 dark:text-blue-400'} />
                <span className="truncate">IGNOU MCA</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:text-blue-400 animate-pulse" />
            <span>{activeProgram.regulation}</span>
          </div>
        </div>

        {/* ── Hero Section with Official Syllabus PDF Download Button ── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
              <span>{activeProgram.badge}</span>
              <span>•</span>
              <span>{activeProgram.degreeName}</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight">
              {activeProgram.shortName} <span className="text-blue-600 dark:text-blue-400">Computer Science Hub</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              {activeProgram.description}
            </p>

            {/* Official Syllabus PDF View on Webpage & Practical Portal Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/bca/practical"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Launch Practical Portal ⚡</span>
              </Link>

              <Link
                href={`/bca/viewer?url=${encodeURIComponent(activeProgram.officialSyllabusPdf)}&title=${encodeURIComponent(activeProgram.degreeName + " Official Syllabus")}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Eye size={16} />
                <span>View Official Syllabus PDF</span>
              </Link>

              <a
                href={activeProgram.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
              >
                <span>Official University Portal</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Quick Progress Badge */}
          <div className="mt-4 sm:mt-0 p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col items-center justify-center shrink-0 w-full sm:w-52 text-center shadow-sm">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">Program Overview</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{activeProgram.semesters.length} Semesters</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{overall.total} Total Topics &amp; Modules</span>
          </div>
        </section>

        <div>
          <AdSenseBanner />
        </div>

        {/* ── SEMESTERS ACCORDION (DU B.Sc. / IGNOU BCA / IGNOU MCA) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy size={18} className="text-blue-600 dark:text-blue-400" />
              <span>{activeProgram.degreeName} Semester Breakdown</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Tap semester to view papers &amp; syllabus</span>
          </div>

          <div className="space-y-4">
            {activeProgram.semesters.map((sem) => {
              const semProg = getSemesterProgress(sem);
              const isOpen = !!openSemesters[sem.id];

              return (
                <div
                  key={`${activeProgram.id}-sem-${sem.id}`}
                  className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm overflow-hidden transition-all duration-300"
                >
                  {/* Accordion Header Bar */}
                  <div
                    onClick={() => toggleSemester(sem.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-850 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 text-blue-600 dark:text-blue-400 font-black text-sm sm:text-base flex items-center justify-center shrink-0">
                        0{sem.id}
                      </div>

                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-black dark:text-white truncate">
                            {sem.name}
                          </h3>
                          {sem.exitAward && (
                            <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 px-2 py-0.5 rounded">
                              🏆 {sem.exitAward}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5 truncate">
                          {sem.subjects.length} Core Papers · {sem.totalCredits} Credits
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400">{semProg.pct}%</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Progress</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-blue-600 dark:text-blue-400">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Expanded Body */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 space-y-4 animate-in fade-in duration-200">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-3 mb-2 flex items-center justify-between">
                        <span>Course Papers in {sem.name}:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-mono text-[10px]">{activeProgram.universityName}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sem.subjects.map((sub) => (
                          <div
                            key={sub.code}
                            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 hover:border-blue-600 dark:border-neutral-800 dark:hover:border-blue-500 transition-all flex flex-col justify-between group shadow-sm"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700">
                                  {sub.code}
                                </span>
                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 px-2 py-0.5 rounded">
                                  {sub.credits} Credits
                                </span>
                              </div>

                              <h4 className="text-sm sm:text-base font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {sub.name}
                              </h4>

                              <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                {sub.description}
                              </p>

                              {/* Units Preview Tags */}
                              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-neutral-800">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Syllabus Breakdown:</span>
                                <div className="flex flex-wrap gap-1">
                                  {sub.units.map((u) => (
                                    <span key={u.unitNumber} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300">
                                      Unit {u.unitNumber}: {u.title.split('&')[0].trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons: Lesson link + PDF syllabus link */}
                            <div className="pt-4 flex items-center gap-2 mt-3">
                              {sub.targetUrl && (
                                <button
                                  type="button"
                                  onClick={() => router.push(sub.targetUrl!)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                                >
                                  <Play size={12} className="fill-white" />
                                  <span>Start Lesson</span>
                                </button>
                              )}

                              {sub.pdfUrl && (
                                <Link
                                  href={`/bca/viewer?url=${encodeURIComponent(sub.pdfUrl)}&title=${encodeURIComponent(sub.name + " (" + sub.code + ")")}`}
                                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                                  title="View Official PDF on Webpage"
                                >
                                  <Eye size={13} />
                                  <span>View PDF</span>
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Career & Academic Pathway Highlights ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Code2 size={18} />
            </div>
            <h4 className="text-sm font-bold text-black dark:text-white">Programming &amp; OOP Labs</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              In-browser interactive coding for DU C++/Python DSCs and IGNOU C/Java labs with automated test checks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu size={18} />
            </div>
            <h4 className="text-sm font-bold text-black dark:text-white">OS &amp; Architecture Simulators</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step 🪟 Windows 11 terminal commands, process scheduling visualizers, and CPU register logic.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h4 className="text-sm font-bold text-black dark:text-white">Official University Syllabi</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Download complete official NEP 2024 Delhi University and IGNOU BCA/MCA Programme Guides in original PDF format.
            </p>
          </div>
        </section>

      </main>

      {/* ── Standard Platform Footer ── */}
      <footer className="w-full py-6 mt-12 border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-black text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-medium text-slate-700 dark:text-slate-300">
          Nextsem Academy • University Computer Science Education Portal (Delhi University &amp; IGNOU)
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link>
          <span>•</span>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link>
          <span>•</span>
          <Link href="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">XML Sitemap</Link>
        </div>
      </footer>
    </div>
  );
}
