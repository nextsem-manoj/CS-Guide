"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, GraduationCap } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { bcaSemesters } from '@/data/bcaCoursesData';
import AdSenseBanner from '@/components/AdSenseBanner';
import DuduBubuWipWidget from '@/components/bca/DuduBubuWipWidget';

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
      <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentSemester) {
    return (
      <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
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

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans selection:bg-[#c1a648]/30 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="h-16 border-b border-slate-850/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 shrink-0">
        <Link 
          href="/bca" 
          className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to BCA Hub</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-550/20 px-4 py-1.5 rounded-full">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
              {points} BCA XP
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6">
          <Link href="/bca" className="hover:text-white transition-colors">🏠 Home</Link>
          <span>›</span>
          <span className="text-slate-350">{currentSemester.name}</span>
        </div>

        {/* Title Section */}
        <section className="mb-10 text-left">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-2">
            {currentSemester.name} Subjects
          </h1>
          <p className="text-slate-400 text-xs">
            {currentSemester.subjects.length} subjects · {semProg.total} unit files · <span className="text-[#39D353] font-bold">{semProg.pct}% read</span>
          </p>
        </section>

        <div className="mb-6">
          <AdSenseBanner />
        </div>

        {/* Show Dudu & Bubu Work-In-Progress for upcoming Semesters 2-5 */}
        {semesterId > 1 && (
          <DuduBubuWipWidget
            title={`Arre Arre! Yahan tak to aa gaye 🐾 (${currentSemester.name})`}
            subtitle="par yahan se aage ka content Dudu aur Bubu milkar bana rahe hain! Thoda wait karo 🐻❤️🐻"
            returnUrl="/bca/semester-1"
          />
        )}

        {/* Subjects List */}
        <section className="space-y-4 mb-10">
          {currentSemester.subjects.map((sub) => {
            const sp = getSubjectProgress(sub.code);
            const totalPdfs = sub.blocks.reduce((a, b) => a + b.units.length, 0);
            const isDone = sp.pct === 100;
            
            // Circle parameters for SVG ring
            const radius = 18;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (sp.pct / 100) * circumference;

            return (
              <div
                key={sub.code}
                onClick={() => router.push(`/bca/${semesterId}/${sub.code.toLowerCase()}`)}
                className="bg-[#111116]/80 hover:bg-[#14141d] border border-white/5 hover:border-emerald-500/20 rounded-3xl p-5 flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold transition-all duration-300 ${
                    sub.isLab ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {sub.isLab ? '🧪' : '📘'}
                  </div>

                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${sub.isLab ? 'text-teal-400' : 'text-blue-400'}`}>
                        {sub.code}
                      </span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        sub.isLab ? 'bg-teal-500/10 text-teal-400 border border-teal-500/10' : 'bg-blue-500/10 text-blue-400 border border-blue-500/10'
                      }`}>
                        {sub.isLab ? 'Lab' : 'Theory'}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-black text-white truncate leading-snug mt-1 group-hover:text-emerald-300 transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold leading-normal mt-0.5">
                      {sub.blocks.length} Blocks · {totalPdfs} unit PDFs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Circular Progress Ring */}
                  <div className="relative w-12 h-12 flex items-center justify-center select-none" title={`${sp.pct}% read`}>
                    <svg className="w-10 h-10 transform -rotate-90">
                      <circle 
                        className="text-slate-800" 
                        strokeWidth="3" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r={radius} 
                        cx="20" 
                        cy="20" 
                      />
                      <circle 
                        className={`transition-all duration-500 ${isDone ? 'text-[#39D353]' : 'text-emerald-400'}`} 
                        strokeWidth="3" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={offset} 
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r={radius} 
                        cx="20" 
                        cy="20" 
                      />
                    </svg>
                    <div className={`absolute text-[8px] font-black ${isDone ? 'text-[#39D353]' : 'text-slate-350'}`}>
                      {isDone ? '✓' : `${sp.pct}%`}
                    </div>
                  </div>
                  
                  <span className="text-slate-650 group-hover:text-slate-400 transition-colors font-bold text-xl pr-1">›</span>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <footer className="w-full py-6 text-center text-[10px] text-slate-700 border-t border-white/5 select-none mt-auto">
        © 2026 Nextsem Academy · IGNOU BCA Revised Syllabus Companion
      </footer>
    </div>
  );
}
