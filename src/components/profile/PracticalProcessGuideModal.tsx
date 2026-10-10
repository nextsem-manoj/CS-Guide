"use client";

import React, { useState, useEffect } from "react";
import { 
  X, ShieldCheck, Database, HardDrive, Cloud, Zap, 
  CheckCircle2, GitBranch, Share2, MessageCircle, 
  Compass, Award, Terminal, Code2, Sparkles, BookOpen, 
  Calendar, Layers, ArrowRight, Info, Check, HelpCircle
} from "lucide-react";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "sync" | "roadmap" | "protocol" | "tracks";

export default function PracticalProcessGuideModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("sync");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-black text-black dark:text-white border-2 border-blue-600/30 dark:border-blue-600/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1.5">
                <Sparkles size={12} />
                Student Architecture Blueprint
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold hidden sm:inline">
                Curriculum Architect: <strong className="text-black dark:text-white">Er. Manoj Kumar</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-black dark:text-white flex items-center gap-2">
              How Your Progress & Practical Roadmap Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Complete transparent walkthrough of our Local-First zero-lag engine, Google Cloud sync, and 360-day BCA practical curriculum.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors shrink-0 cursor-pointer"
            aria-label="Close Guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab("sync")}
            className={`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === "sync"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <Database size={15} />
            <span>1. Data Sync & Offline Engine</span>
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === "roadmap"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <Calendar size={15} />
            <span>2. 360-Day Degree Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab("protocol")}
            className={`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === "protocol"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <ShieldCheck size={15} />
            <span>3. 4-Step Practical Protocol</span>
          </button>

          <button
            onClick={() => setActiveTab("tracks")}
            className={`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === "tracks"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <Compass size={15} />
            <span>4. Career Tracks & Socials</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          {/* TAB 1: SYNC & OFFLINE ENGINE */}
          {activeTab === "sync" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
                <Zap className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-extrabold text-blue-900 dark:text-blue-300">
                    Why does my profile say "Saved Locally on Device"?
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-400 mt-1">
                    It means your coding submissions, day milestones, and GitHub links are saved into your device's browser memory (<code>localStorage</code>) in <strong>0 milliseconds</strong>. It guarantees you will never experience lag, loading spinners, or lose work if your internet cuts out!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Local Tier */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold">
                    <HardDrive size={18} />
                    <span>Tier 1: Device Memory (Instant 0ms)</span>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Instant Page Loads:</strong> Zero wait time when navigating between practical days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>100% Offline Practice:</strong> Practice coding labs and study without active Wi-Fi.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Persistent Cache:</strong> Survives tab closures, browser restarts, and computer reboots.</span>
                    </li>
                  </ul>
                </div>

                {/* Cloud Tier */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold">
                    <Cloud size={18} />
                    <span>Tier 2: Google Cloud Firestore (Backup)</span>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Silent Background Sync:</strong> Seamlessly uploads your progress to your Google Account.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Multi-Device Access:</strong> Switch between mobile phone and PC without losing completed days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Disaster Recovery:</strong> Even if you clear your browser history, logging back into Google restores your record.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Status Badge Explanation Table */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 font-bold text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                  Status Indicator Legend
                </div>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>💾 Saved Locally on Device</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      Your milestones are stored securely on this computer/phone. Safe, instant, and offline-ready.
                    </div>
                  </div>
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>☁️ Synced to Cloud (Safe & Backed Up)</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      Background sync has mirrored all your submissions to Firebase Firestore under your verified Google UID.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 360-DAY DEGREE ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-extrabold text-base flex items-center gap-2">
                  <Calendar className="text-blue-600" size={18} />
                  <span>Why 360 Practical Days for a 3-Year BCA Degree?</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Many students ask: <em>"If a degree is 3 years, why isn't it 365 or 1000 days?"</em> Here is the exact academic calculation designed by Er. Manoj Kumar:
                </p>
              </div>

              {/* Formula Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-neutral-50 to-blue-50 dark:from-blue-950/20 dark:via-neutral-950 dark:to-blue-950/20 border-2 border-blue-600/30 text-center space-y-2">
                <div className="text-xs uppercase font-extrabold text-blue-600 dark:text-blue-400 tracking-wider">
                  The Master Academic Formula
                </div>
                <div className="text-lg sm:text-2xl font-black">
                  6 Semesters × 60 Practical Lab Days = <span className="text-blue-600 dark:text-blue-400">360 Practical Days</span>
                </div>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  In a university semester (6 calendar months), there are approximately 90 teaching days excluding exam months, holidays, and preparation breaks. Exactly <strong>60 of those days are dedicated to rigorous hands-on laboratory programming</strong>.
                </p>
              </div>

              {/* Semester Breakdown Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-blue-600 dark:text-blue-400">Semester 1</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white">ACTIVE NOW</span>
                  </div>
                  <div className="text-xs font-bold">Days 1 – 60</div>
                  <p className="text-[11px] text-slate-500">Computer Basics, Linux CLI, Git & GitHub, Pure HTML5 & DevTools.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1">
                  <span className="font-bold text-sm">Semester 2</span>
                  <div className="text-xs font-bold text-slate-500">Days 61 – 120</div>
                  <p className="text-[11px] text-slate-500">C Language Fundamentals, Pointers, Arrays, and Memory Architecture.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1">
                  <span className="font-bold text-sm">Semester 3</span>
                  <div className="text-xs font-bold text-slate-500">Days 121 – 180</div>
                  <p className="text-[11px] text-slate-500">Data Structures & Algorithms in C/C++, Stacks, Queues, Binary Trees.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1">
                  <span className="font-bold text-sm">Semester 4</span>
                  <div className="text-xs font-bold text-slate-500">Days 181 – 240</div>
                  <p className="text-[11px] text-slate-500">Object Oriented Programming (C++/Java), RDBMS & Practical SQL Lab.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1">
                  <span className="font-bold text-sm">Semester 5</span>
                  <div className="text-xs font-bold text-slate-500">Days 241 – 300</div>
                  <p className="text-[11px] text-slate-500">Full-Stack Web Development, Modern React, Node.js REST APIs & Cloud DBs.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1">
                  <span className="font-bold text-sm">Semester 6</span>
                  <div className="text-xs font-bold text-slate-500">Days 301 – 360</div>
                  <p className="text-[11px] text-slate-500">Industry Capstone Project, Comprehensive Viva Defense & Placement Portfolio.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 4-STEP VERIFICATION PROTOCOL */}
          {activeTab === "protocol" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-extrabold text-base flex items-center gap-2">
                  <ShieldCheck className="text-blue-600" size={18} />
                  <span>The Mandatory 4-Step Completion Protocol</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Unlike traditional platforms where you simply click "Next" without learning, NextSem enforces 4 strict prerequisites to certify each day:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Verified Google Authentication</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ensures every student has a unique identity, prevents anonymous bot spam, and links progress to your permanent cloud profile.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">100% Task-Based Coding Lab Verification</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      You must run the in-app interactive code compiler and pass all unit assertions. You cannot fake code completion.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Technical Oral Viva Check</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Answer the university examiner viva question correctly to test conceptual understanding and prepare for semester oral examinations.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Real GitHub Repository Submission</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submit your live repository URL (e.g. <code>https://github.com/yourname/bca-day-1</code>). Generic dummy placeholders are strictly blocked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CAREER TRACKS & SOCIALS */}
          {activeTab === "tracks" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-extrabold text-base flex items-center gap-2">
                  <Compass className="text-blue-600" size={18} />
                  <span>Choose Your Industry Specialization Track</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Align your 3-year BCA journey with real market hiring roles. You can toggle your active track anytime from your profile dashboard:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Code2 className="text-blue-600" size={16} />
                    <span>Full-Stack Web Engineering</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    HTML5, Tailwind, JavaScript, React, Node.js, Express, PostgreSQL, Next.js, and Cloud Deployment.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Layers className="text-emerald-600" size={16} />
                    <span>Modern Frontend & UI Architecture</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Responsive CSS systems, interactive DOM simulations, State Machines, React 19, and Figma-to-code.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Terminal className="text-purple-600" size={16} />
                    <span>Backend Systems & RDBMS</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    C/C++ Memory Management, Linux CLI, Data Structures, Relational SQL Design, and REST API microservices.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={16} />
                    <span>AI, Data & Cloud Foundations</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Python scripting, Linear Data Models, Git automation, Firebase Cloud, and AI LLM prompt integrations.
                  </p>
                </div>
              </div>

              {/* Social Portfolios Note */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2">
                <div className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
                  <Share2 size={14} />
                  <span>Public Proof of Work Integration</span>
                </div>
                <p className="text-xs text-blue-900 dark:text-blue-300">
                  Connect your <strong>LinkedIn</strong>, <strong>GitHub</strong>, and <strong>Instagram</strong> handles from your profile. After completing each day, tap the <strong>WhatsApp Share</strong> button at the bottom of the lesson to share your daily coding streak with peers, study groups, and mentors!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Action */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Have questions about the roadmap? Discuss with mentors or explore daily lessons.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer text-center"
            >
              Got it! Return to Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
