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
  Sparkles 
} from 'lucide-react';

export default function SemesterSubjectsDashboard({ semester }: { semester: string }) {
  const router = useRouter();
  const { completedChapters } = useProgress();

  const semesterId = parseInt(semester.replace(/^semester-/, ""), 10) || 1;
  const currentSemester = bcaSemesters.find(s => s.id === semesterId);

  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);

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
      <div className="w-full h-screen bg-[#060c18] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentSemester) {
    return (
      <div className="w-full min-h-screen bg-[#060c18] text-white flex flex-col items-center justify-center p-6 text-center">
        <GraduationCap size={48} className="text-emerald-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-black mb-2">Semester Not Found</h1>
        <p className="text-slate-400 text-sm mb-6 max-w-sm">We couldn&apos;t locate the semester you are looking for in the BCA program guide.</p>
        <Link href="/bca" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-xs uppercase tracking-wider transition-all">
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
      if (subCode === "BEGLA-136") return "/bca/semester-1/begla-136-english";
      if (subCode === "BEVAE-181") return "/bca/semester-1/bevae-181-environmental-studies";
      return `/bca/semester-1/${subCode.toLowerCase()}`;
    }
    return `/bca/${semesterId}/${subCode.toLowerCase()}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#060c18] text-white flex flex-col justify-between font-sans selection:bg-[#c1a648]/30 relative pb-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-950/20 blur-[120px] pointer-events-none" />

      {/* ── Top Header Bar with Subject Switcher ── */}
      <BcaHeaderNav
        currentSubjectCode={`Semester ${semesterId}`}
        currentSubjectName={`${currentSemester.name} Hub`}
        points={points}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
          <Link href="/bca" className="hover:text-white transition-colors">🏠 BCA Hub</Link>
          <span>›</span>
          <span className="text-cyan-300 font-bold">{currentSemester.name}</span>
        </div>

        {/* Title Hero Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] border border-cyan-500/30 shadow-2xl space-y-4 md:flex md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
              <GraduationCap size={14} />
              <span>IGNOU BCA Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {currentSemester.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300">Subjects &amp; Units</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-1 font-medium">
              Choose any subject below to view complete textbook blocks, unit-by-unit study notes, and lab simulators.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 shadow-inner">
            <div className="text-center">
              <span className="block text-emerald-400 font-black text-2xl">{semProg.pct}%</span>
              <span className="block text-[9px] text-slate-400 font-black uppercase tracking-wider">Completed</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <span className="block text-white font-black text-2xl">{semProg.read}/{semProg.total}</span>
              <span className="block text-[9px] text-slate-400 font-black uppercase tracking-wider">Units Read</span>
            </div>
          </div>
        </section>

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

        {/* Subjects List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={18} className="text-amber-400" />
              <span>All Subjects in {currentSemester.name}</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-400">Click subject to open syllabus</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSemester.subjects.map((sub) => {
              const sp = getSubjectProgress(sub.code);
              const totalUnits = sub.blocks.reduce((a, b) => a + b.units.length, 0);
              const isDone = sp.pct === 100;
              const isComputerBasics = sub.code === "BCS-111" || sub.code === "BCS-011";
              const targetUrl = getSubjectUrl(sub.code);

              return (
                <div
                  key={sub.code}
                  onClick={() => router.push(targetUrl)}
                  className="p-5 rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] hover:bg-[#101b38] border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all duration-200 shadow-xl group flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold transition-all duration-300 group-hover:scale-105 ${
                      sub.isLab 
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {sub.isLab ? '🧪' : '📘'}
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-black uppercase text-amber-400">
                          {sub.code}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          sub.isLab 
                            ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' 
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        }`}>
                          {sub.isLab ? 'Lab Module' : 'Theory Course'}
                        </span>
                        {isComputerBasics && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                            Interactive Lessons
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm md:text-base font-black text-white truncate leading-snug mt-1 group-hover:text-cyan-300 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-bold leading-normal mt-0.5">
                        {sub.blocks.length} Blocks · {totalUnits} unit lessons
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-emerald-400">{sp.pct}% Read</span>
                      <span className="text-[10px] text-slate-500">({sp.read}/{sp.total})</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-black text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                      <span>Open Syllabus</span>
                      <Play size={12} className="fill-cyan-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Return to All Semesters Link */}
        <div className="pt-6 border-t border-slate-800 flex justify-center">
          <Link
            href="/bca"
            className="px-6 py-3 rounded-2xl bg-[#0c1328] hover:bg-[#101b38] text-white font-extrabold text-xs sm:text-sm border border-slate-700 hover:border-cyan-400 shadow-xl transition-all active:scale-95 flex items-center gap-2"
          >
            <Layers size={16} className="text-cyan-400" />
            <span>View All 6 Semesters</span>
          </Link>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-[10px] text-slate-500 border-t border-slate-800/80 mt-auto">
        © 2026 Nextsem Academy · IGNOU BCA Revised Syllabus Companion
      </footer>
    </div>
  );
}
