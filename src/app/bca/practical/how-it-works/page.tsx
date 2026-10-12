import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Database, Cloud, HardDrive, Zap, ShieldCheck, 
  Calendar, Compass, Award, Code2, Terminal, Layers, 
  CheckCircle2, ArrowRight, Home, ChevronRight, Sparkles, 
  GitBranch, Share2, MessageCircle, HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "How BCA Practical & Data Sync Works | Architecture & Roadmap Guide | NextSem Academy",
  description: "Complete student guide to NextSem's zero-lag local-first browser storage, Google Cloud Firestore backup, and 360-Day (6 Semesters × 60 Practical Days) BCA industry roadmap.",
  alternates: {
    canonical: "https://ignou-study-notes-by-nextsem.web.app/bca/practical/how-it-works"
  }
};

export default function PracticalHowItWorksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-3 px-4 sm:px-8">
        <nav className="max-w-6xl mx-auto flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto scrollbar-none">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors shrink-0">
            <span>🏠 Home</span>
          </Link>
          <ChevronRight size={13} className="shrink-0 text-slate-400" />
          <Link href="/bca" className="hover:text-blue-600 transition-colors shrink-0">
            <span>BCA Hub</span>
          </Link>
          <ChevronRight size={13} className="shrink-0 text-slate-400" />
          <Link href="/bca/practical" className="hover:text-blue-600 transition-colors shrink-0">
            <span>Practical Lab</span>
          </Link>
          <ChevronRight size={13} className="shrink-0 text-slate-400" />
          <span className="text-blue-600 dark:text-blue-400 font-extrabold shrink-0">
            How It Works & Roadmap
          </span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            <Sparkles size={14} />
            <span>Official Practical Architecture & Blueprint</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            How NextSem Saves Your Progress & The 3-Year Practical Roadmap
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Everything you need to know about our Local-First zero-lag engine, Google Cloud Firestore backup, and how 360 daily practical coding sessions prepare you for high-paying software engineering roles.
          </p>
          <div className="pt-1 text-xs text-slate-500">
            Curriculum Architect: <strong className="text-black dark:text-white">Er. Manoj Kumar</strong> • NextSem BCA Division
          </div>
        </div>

        {/* Section 1: Progress Persistence & Cloud Sync */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                1. How Your Learning Progress Is Saved (Zero-Lag + Cloud Safe)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Why does my dashboard say "Saved Locally on Device"?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-base">
                <HardDrive size={20} />
                <span>Tier 1: Device Memory (0ms Local-First)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Whenever you solve a coding lab, submit a GitHub link, or update your social profiles, the app saves it immediately into your device's browser memory (<code>localStorage</code>).
              </p>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Zero Wait Time:</strong> No loading spinners or blank screens when opening your dashboard.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>100% Offline Ready:</strong> Continue coding and practicing even when traveling or without internet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Persistent:</strong> Closing the tab or restarting your PC does not delete your work.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                <Cloud size={20} />
                <span>Tier 2: Google Cloud Firestore (Background Backup)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                When you sign in with your Google Account, a background worker silently mirrors your progress to Google Firebase Cloud Firestore.
              </p>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Multi-Device Sync:</strong> Solve Day 1 on your phone, then open Day 2 on your laptop seamlessly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Disaster Recovery:</strong> Even if you clear your browser cache, logging back in instantly restores everything.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Permanent Security:</strong> Linked to your verified Google UID.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 360-Day Degree Blueprint */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                2. Why 360 Practical Days for a 3-Year BCA Degree?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Understanding the college semester academic timeline
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="text-center space-y-2">
              <div className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                The Academic Semester Math
              </div>
              <div className="text-2xl sm:text-3xl font-black">
                3 Years = 6 Semesters × 60 Practical Lab Days = <span className="text-blue-600 dark:text-blue-400">360 Days</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                In a standard 6-month university semester, approximately 90 days are active teaching days (excluding examination weeks, admission cycles, and holiday breaks). Out of those 90 days, <strong>exactly 60 days are allocated to rigorous programming lab sessions</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-blue-600 dark:text-blue-400">Semester 1</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white">ACTIVE NOW</span>
                </div>
                <div className="text-xs font-bold">Days 1 – 60</div>
                <p className="text-[11px] text-slate-500">Computer Basics, Linux CLI, Git & GitHub, Pure HTML5 & DevTools.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-sm">Semester 2</span>
                <div className="text-xs font-bold text-slate-500">Days 61 – 120</div>
                <p className="text-[11px] text-slate-500">C Language Fundamentals, Pointers, Arrays, and Memory Architecture.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-sm">Semester 3</span>
                <div className="text-xs font-bold text-slate-500">Days 121 – 180</div>
                <p className="text-[11px] text-slate-500">Data Structures & Algorithms in C/C++, Stacks, Queues, Binary Trees.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-sm">Semester 4</span>
                <div className="text-xs font-bold text-slate-500">Days 181 – 240</div>
                <p className="text-[11px] text-slate-500">Object Oriented Programming (C++/Java), RDBMS & Practical SQL Lab.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-sm">Semester 5</span>
                <div className="text-xs font-bold text-slate-500">Days 241 – 300</div>
                <p className="text-[11px] text-slate-500">Full-Stack Web Development, Modern React, Node.js REST APIs & Cloud DBs.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-sm">Semester 6</span>
                <div className="text-xs font-bold text-slate-500">Days 301 – 360</div>
                <p className="text-[11px] text-slate-500">Industry Capstone Project, Comprehensive Viva Defense & Placement Portfolio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 4-Step Verification Protocol */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                3. The Mandatory 4-Step Verification Protocol
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Why passive reading won't unlock practical days
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">1</div>
              <h3 className="font-bold text-sm">Verified Google Sign-In</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Practical days are gated behind Google authentication so that your code, time spent, and viva score are permanently recorded to your official student profile.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">2</div>
              <h3 className="font-bold text-sm">Real VS Code Implementation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Follow guided specifications in Visual Studio Code on your PC (<code>code .</code>), test locally, and build production-grade code.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">3</div>
              <h3 className="font-bold text-sm">Technical Viva Check</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Oral examiner questions test your core intuition and prepare you for university lab viva exams.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">4</div>
              <h3 className="font-bold text-sm">Real GitHub Submission</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Submit a genuine repository URL (<code>https://github.com/username/repo</code>). Dummy placeholders are detected and rejected.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Specialization & Social Integration */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                4. Career Tracks & Social Proof of Work
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Build a portfolio that attracts software engineering recruiters
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every student can specialize in one of 4 industry tracks: <strong>Full-Stack Web Development</strong>, <strong>Modern Frontend Architecture</strong>, <strong>Backend & Systems</strong>, or <strong>AI & Cloud Data</strong>.
            </p>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-300">
                <strong>Showcase Your Coding Streak:</strong> Connect your LinkedIn, GitHub, and Instagram in your profile dashboard. After completing each day, tap the WhatsApp Share button to update your peers and mentor circle.
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center gap-1">
                  <span>in</span> LinkedIn
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-1 border border-neutral-300 dark:border-neutral-700">
                  <GitBranch size={13} /> GitHub
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1">
                  <MessageCircle size={13} /> WhatsApp
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="pt-4 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/bca/practical"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Go to Practical Learning Portal</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/bca/practical/day-1-linux-cli-mastery"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-600 font-extrabold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>Launch Day 1 Practical Lab</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
