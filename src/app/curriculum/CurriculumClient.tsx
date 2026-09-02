"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Layers, Terminal, Rocket, CheckCircle2, 
  Sparkles, Code, Cpu, Shield, Database, Globe, Brain, Award, 
  ChevronRight, Percent, Zap, Flame, Clock
} from 'lucide-react';
import { bcaSemesters } from '@/data/bcaCoursesData';

interface PhaseData {
  semId: number;
  phaseTitle: string;
  badge: string;
  badgeColor: string;
  progressPercent: number;
  status: 'Complete' | 'In Progress' | 'Upcoming';
  description: string;
  highlights: string[];
}

const semesterPhases: PhaseData[] = [
  {
    semId: 1,
    phaseTitle: "Phase 1: Foundation & Computer Basics",
    badge: "100% Ready • Active",
    badgeColor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    progressPercent: 100,
    status: "Complete",
    description: "Build core computing concepts, binary arithmetic, PC software, basic mathematics, workplace English, and environmental science fundamentals.",
    highlights: [
      "🖥️ BCS-111: Computer Basics, CPU Architecture & Memory Systems",
      "📐 BCS-012: Basic Mathematics, Sets, Matrices & Calculus",
      "🧪 BCSL-013: Software Lab (Windows CMD, Linux CLI, HTML5)",
      "💬 BEGLA-136: English at Workplace & Communication Skills",
      "🌱 BEVAE-181: Environmental Studies & Sustainability"
    ]
  },
  {
    semId: 2,
    phaseTitle: "Phase 2: Programming Fundamentals & C Language",
    badge: "75% Ready • Active",
    badgeColor: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    progressPercent: 75,
    status: "In Progress",
    description: "Master C programming structures, pointers, computer organization, assembly language, and discrete mathematics for computer science.",
    highlights: [
      "⚙️ MCS-011: Problem Solving & C Programming (Control Flow, Arrays, Pointers)",
      "💻 MCS-012: Computer Organization & Assembly Language",
      "🔢 MCS-013: Discrete Mathematics (Graph Theory, Logic, Boolean Algebra)",
      "🧪 MCSL-017: C & Assembly Language Programming Lab"
    ]
  },
  {
    semId: 3,
    phaseTitle: "Phase 3: Data Structures & DBMS Systems",
    badge: "60% Ready • In Progress",
    badgeColor: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    progressPercent: 60,
    status: "In Progress",
    description: "Deep dive into Data Structures (Trees, Graphs, Stacks, Queues), Relational Databases (SQL, Normalization), Systems Analysis, and Web Technologies.",
    highlights: [
      "🌳 MCS-021: Data & File Structures (Trees, Hash Tables, Sorting)",
      "🗄️ MCS-023: Database Management Systems (SQL Queries, ER Diagrams, ACID)",
      "📊 MCS-014: Systems Analysis and Design & SDLC Models",
      "🧪 MCSL-025: Lab for Data Structures & DBMS SQL"
    ]
  },
  {
    semId: 4,
    phaseTitle: "Phase 4: Object-Oriented Java & OS Kernels",
    badge: "45% Ready • Phase 4 Release",
    badgeColor: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
    progressPercent: 45,
    status: "In Progress",
    description: "Master Java Object-Oriented Programming (OOP), Operating System process management, threads, file systems, and statistical methods.",
    highlights: [
      "☕ MCS-024: Object Oriented Technologies & Java (Inheritance, Multithreading, Streams)",
      "🐧 MCS-022: Operating System Concepts & Linux Administration",
      "📈 BCS-040: Statistical Techniques & Probability for Developers",
      "🧪 MCSL-036: Lab for Java Programming & Linux Shell Scripting"
    ]
  },
  {
    semId: 5,
    phaseTitle: "Phase 5: Software Engineering & Web Architecture",
    badge: "30% Ready • Phase 5 Release",
    badgeColor: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    progressPercent: 30,
    status: "Upcoming",
    description: "Learn Software Engineering principles, TCP/IP Networking, Web Server Development (PHP, MySQL, Node.js), and Advanced Computer Architecture.",
    highlights: [
      "🏗️ BCS-051: Software Engineering (Agile, Testing, Design Patterns)",
      "🌐 BCS-052: Network Concepts and Management (TCP/IP, Routing, Security)",
      "🐘 BCS-053: Web Programming (Full Stack Web Apps, REST APIs, Security)",
      "🖥️ BCS-054: Computer Architecture & Parallel Processing",
      "🧪 BCSL-056: Full Stack Web Programming Lab"
    ]
  },
  {
    semId: 6,
    phaseTitle: "Phase 6: E-Commerce, Security & Major Capstone Project",
    badge: "20% Ready • Final Capstone",
    badgeColor: "bg-rose-500/15 border-rose-500/30 text-rose-400",
    progressPercent: 20,
    status: "Upcoming",
    description: "Build an end-to-end full stack Major Capstone Project, explore E-Commerce systems, Advanced Security, and prepare for industry interviews.",
    highlights: [
      "🛒 BCS-062: E-Commerce & Cyber Law Regulations",
      "🐧 BCSL-063: Advanced Linux & Network Administration Lab",
      "🎓 BCSP-064: BCA Major Capstone Project & Viva Presentation (8 Credits)"
    ]
  }
];

export default function CurriculumClient() {
  const [selectedSemFilter, setSelectedSemFilter] = useState<number | 'all'>('all');

  const filteredSemesters = selectedSemFilter === 'all' 
    ? bcaSemesters 
    : bcaSemesters.filter(s => s.id === selectedSemFilter);

  const totalOverallProgress = Math.round(
    semesterPhases.reduce((acc, curr) => acc + curr.progressPercent, 0) / semesterPhases.length
  );

  return (
    <div className="min-h-screen bg-[#060c18] text-white flex flex-col font-sans selection:bg-[#04AA6D]/30">
      
      {/* ── HEADER NAVIGATION ── */}
      <header className="sticky top-0 z-50 bg-[#0c1328]/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 select-none group">
              <img src="/logo.svg" alt="IGNOU Logo" className="w-8 h-8 rounded-lg border border-emerald-500/20 group-hover:scale-105 transition-transform shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg tracking-tight text-white uppercase">
                  IGNOU
                </span>
                <span className="text-[10px] font-mono text-[#04AA6D] font-bold tracking-tight mt-0.5">
                  Study Notes Hub
                </span>
              </div>
            </Link>
            <span className="hidden sm:inline-block text-slate-700">•</span>
            <span className="hidden sm:inline-block text-xs font-bold text-[#c1a648] uppercase tracking-wider">
              Subject & Phase Curriculum
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all border border-slate-700/60"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <section className="py-12 px-4 md:px-6 max-w-[1200px] mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1328] border border-[#04AA6D]/40 text-[#04AA6D] text-xs font-black uppercase tracking-widest shadow-lg">
          <Sparkles size={14} className="text-[#c1a648]" />
          <span>Official IGNOU BCA 3-Year Degree Curriculum Roadmap</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
          IGNOU BCA <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Subject-Wise Phase Tracker</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-base max-w-3xl mx-auto font-medium leading-relaxed">
          Line-by-line textbook units, bilingual English & Hinglish interactive micro-lessons, lab simulators, and exam prep modules structured into 6 sequential degree phases.
        </p>

        {/* ── OVERALL COMPLETION PROGRESS BAR ── */}
        <div className="max-w-xl mx-auto bg-[#0c1328] border border-slate-800 p-4 rounded-2xl shadow-2xl space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" />
              <span>Overall Curriculum Readiness</span>
            </span>
            <span className="text-[#04AA6D] font-mono text-sm">{totalOverallProgress}% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-[#04AA6D] via-cyan-400 to-[#c1a648] rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${totalOverallProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-300 font-bold pt-1">
            <span>Sem 1 (100%)</span>
            <span>Sem 2 (75%)</span>
            <span>Sem 3 (60%)</span>
            <span>Sem 4 (45%)</span>
            <span>Sem 5 (30%)</span>
            <span>Sem 6 (20%)</span>
          </div>
        </div>
      </section>

      {/* ── SEMESTER FILTER TABS ── */}
      <section className="max-w-[1200px] mx-auto px-4 w-full mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-[#0c1328] border border-slate-800 rounded-2xl">
          <button
            onClick={() => setSelectedSemFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedSemFilter === 'all'
                ? "bg-[#04AA6D] text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            All 6 Semesters
          </button>
          {semesterPhases.map((phase) => (
            <button
              key={phase.semId}
              onClick={() => setSelectedSemFilter(phase.semId)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSemFilter === phase.semId
                  ? "bg-[#04AA6D] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span>Sem {phase.semId}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 font-mono font-bold">
                {phase.progressPercent}%
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── PHASE-BY-PHASE CURRICULUM LIST ── */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 pb-16 space-y-10">
        {filteredSemesters.map((sem) => {
          const phaseInfo = semesterPhases.find(p => p.semId === sem.id) || {
            semId: sem.id,
            phaseTitle: `Phase ${sem.id}: Semester ${sem.id}`,
            badge: "Active",
            badgeColor: "bg-slate-800 text-slate-300",
            progressPercent: 50,
            status: "In Progress",
            description: `IGNOU BCA Semester ${sem.id} subjects and interactive units.`,
            highlights: []
          };

          return (
            <div 
              key={sem.id} 
              className="bg-[#0c1328] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden group hover:border-[#04AA6D]/40 transition-all duration-300"
            >
              {/* Top Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-[#c1a648] tracking-widest">
                      IGNOU BCA • Semester {sem.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${phaseInfo.badgeColor}`}>
                      {phaseInfo.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {phaseInfo.phaseTitle}
                  </h2>
                </div>

                {/* Progress Circle / Bar */}
                <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl shrink-0">
                  <Percent size={18} className="text-[#04AA6D]" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completion Status</div>
                    <div className="text-sm font-black text-white font-mono">{phaseInfo.progressPercent}% Available</div>
                  </div>
                </div>
              </div>

              {/* Phase Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {phaseInfo.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-[#04AA6D] to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${phaseInfo.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Subject Grid Cards */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#04AA6D]" />
                  <span>Subjects & Modules in Semester {sem.id}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sem.subjects.map((subj) => (
                    <div 
                      key={subj.code}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#0c1328] border border-slate-700 text-[#c1a648] font-mono text-xs font-black">
                            {subj.code}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                            {subj.isLab ? "Practical Lab" : "Theory Paper"}
                          </span>
                        </div>

                        <h4 className="text-sm font-extrabold text-white leading-snug">
                          {subj.name}
                        </h4>

                        <div className="text-[11px] text-slate-400">
                          {subj.blocks.length} Block{subj.blocks.length > 1 ? "s" : ""} • {subj.blocks.reduce((acc, b) => acc + b.units.length, 0)} Units Covered
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <Link
                          href={sem.id === 1 ? `/bca/semester-1` : `/bca/${sem.id}/${subj.code.toLowerCase()}`}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#04AA6D] hover:text-emerald-300 transition-colors group/btn"
                        >
                          <span>Explore Subject Units</span>
                          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Developer Highlights / Jokes / Emojis */}
              {phaseInfo.highlights.length > 0 && (
                <div className="pt-3 border-t border-slate-800/60 space-y-2">
                  <div className="text-xs font-black uppercase text-[#c1a648] tracking-wider flex items-center gap-1.5">
                    <Flame size={14} />
                    <span>Phase Key Takeaways & Exam Highlights</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {phaseInfo.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-xl border border-slate-800/40">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0c1328] border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <p className="text-white font-bold uppercase tracking-wider">
            IGNOU BCA Curriculum & Phase Progress • Er. Manoj Kumar
          </p>
          <p className="text-[11px] text-slate-400">
            Official IGNOU BCA 3-Year Bachelor of Computer Applications curriculum roadmap. Formatted line-by-line with interactive lab simulators, bilingual units, and exam preparation.
          </p>
        </div>
      </footer>

    </div>
  );
}
