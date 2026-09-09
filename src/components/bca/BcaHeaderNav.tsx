"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Home, ChevronDown, BookOpen, X, Sparkles, GraduationCap, CheckCircle2, Search, Building2 } from 'lucide-react';
import { bcaSemesters } from '@/data/bcaCoursesData';
import { duCsSemesters } from '@/data/universityCoursesData';

interface BcaHeaderNavProps {
  currentSubjectCode?: string;
  currentSubjectName?: string;
  points?: number;
}

export default function BcaHeaderNav({
  currentSubjectCode = "BCS-111",
  currentSubjectName = "Computer Basics & PC Software",
  points = 0
}: BcaHeaderNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalUniversityTab, setModalUniversityTab] = useState<'du' | 'ignou'>('du');

  return (
    <>
      <header className="h-16 border-b border-slate-800/80 bg-[#060c18]/90 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 select-none shadow-md gap-2">
        {/* Left: Always Visible Home Link & Search Trigger */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-white font-black text-xs sm:text-sm bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl transition-all active:scale-95 shrink-0"
          >
            <Home size={16} className="text-amber-400" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            title="Universal Search (Ctrl+K)"
          >
            <Search size={14} className="text-cyan-400" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[9px] bg-slate-950 px-1 py-0.5 rounded border border-slate-700 text-slate-400">Ctrl K</kbd>
          </button>
        </div>

        {/* Center: Subject Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0c1328] hover:bg-[#101b38] border border-cyan-500/40 hover:border-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 max-w-[220px] sm:max-w-xs truncate cursor-pointer"
          >
            <BookOpen size={16} className="text-cyan-400 shrink-0" />
            <span className="truncate text-cyan-200">
              {currentSubjectCode}: {currentSubjectName}
            </span>
            <ChevronDown size={14} className={`text-cyan-400 shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Right: University CS Hub Logo Badge Header Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/bca"
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#0c1328] border border-emerald-500/40 text-white hover:border-emerald-400 text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <img src="/logo.svg" alt="University CS Logo" className="w-6 h-6 rounded-md border border-emerald-500/20 shrink-0" />
            <div className="flex flex-col leading-none text-left">
              <span className="font-black text-xs tracking-tight text-white uppercase">
                DU & IGNOU
              </span>
              <span className="text-[8px] font-mono text-[#04AA6D] font-bold tracking-tight">
                CS Degree Hub
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* ── Slide-Over / Modal Subject Switcher Menu ── */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 animate-in fade-in duration-200"
            onClick={() => setDropdownOpen(false)}
          />

          <div className="fixed top-16 right-4 left-4 sm:left-auto sm:right-8 sm:w-[420px] bg-[#0c1328]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-5 z-50 shadow-2xl shadow-cyan-950/60 animate-in zoom-in-95 duration-200 text-white space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                <h3 className="font-extrabold text-sm text-cyan-300">Switch University & Subject</h3>
              </div>
              <button
                onClick={() => setDropdownOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* University Switcher inside Dropdown */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setModalUniversityTab('du')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalUniversityTab === 'du'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 size={13} />
                <span>Delhi University (DU)</span>
              </button>
              <button
                type="button"
                onClick={() => setModalUniversityTab('ignou')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalUniversityTab === 'ignou'
                    ? 'bg-emerald-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap size={13} />
                <span>IGNOU (BCA)</span>
              </button>
            </div>

            {/* List all semesters and subjects for active university modal tab */}
            <div className="space-y-4 pt-1">
              {modalUniversityTab === 'du' ? (
                /* DU CS Subjects */
                duCsSemesters.map((sem) => (
                  <div key={`modal-du-${sem.id}`} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center justify-between">
                      <span>DU • {sem.name}</span>
                      <span className="text-slate-500 font-mono text-[9px]">UGCF 2022</span>
                    </div>

                    <div className="space-y-1">
                      {sem.subjects.map((sub) => {
                        const isCurrent = sub.code.toUpperCase() === currentSubjectCode.toUpperCase();
                        return (
                          <button
                            key={sub.code}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(`/bca?uni=du`);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs font-bold cursor-pointer ${
                              isCurrent
                                ? "bg-blue-500/20 border-blue-400 text-blue-200"
                                : "bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300"
                            }`}
                          >
                            <div className="min-w-0 truncate">
                              <span className="text-[10px] font-black text-amber-400 mr-2 uppercase">{sub.code}</span>
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {isCurrent && <CheckCircle2 size={14} className="text-blue-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                /* IGNOU Subjects */
                bcaSemesters.map((sem) => (
                  <div key={`modal-ignou-${sem.id}`} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center justify-between">
                      <span>IGNOU • {sem.name}</span>
                      <Link
                        href={`/bca?uni=ignou`}
                        onClick={() => setDropdownOpen(false)}
                        className="text-cyan-400 hover:underline"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {sem.subjects.map((sub) => {
                        const isCurrent = sub.code.toUpperCase() === currentSubjectCode.toUpperCase() || currentSubjectCode.includes(sub.code);
                        const isComputerBasics = sub.code === "BCS-111" || sub.code === "BCS-011";
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
                          <button
                            key={sub.code}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(targetUrl);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs font-bold cursor-pointer ${
                              isCurrent
                                ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                                : "bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300"
                            }`}
                          >
                            <div className="min-w-0 truncate">
                              <span className="text-[10px] font-black text-amber-400 mr-2 uppercase">{sub.code}</span>
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {isCurrent && <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
