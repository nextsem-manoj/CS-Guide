"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Circle, 
  Sparkles, Copy, Check, Lightbulb, GitBranch, 
  HelpCircle, AlertCircle, Clock, Lock, BookOpen,
  ExternalLink, LogIn, UserCheck, ShieldCheck, Code2,
  Terminal, Folder, Layers, Cpu
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import { DotnetLesson, DOTNET_LESSONS } from "@/data/dotnetPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { safeInstantCopy } from "@/lib/clipboard";
import { triggerCelebration } from "@/lib/celebration";

interface Props {
  lesson: DotnetLesson;
}

export default function DotnetPracticalLessonClient({ lesson }: Props) {
  const { 
    user, 
    isDayCompleted, 
    completeDayWithGitHub, 
    githubRepoUrls, 
    signIn,
    signInAsGuest 
  } = useStudentProgress();

  const [activeTab, setActiveTab] = useState<"concept" | "demo" | "lab" | "debug" | "viva">("concept");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedCli, setCopiedCli] = useState<boolean>(false);
  const [tasksChecked, setTasksChecked] = useState<Record<string, boolean>>({});

  // Viva State
  const [selectedVivaOption, setSelectedVivaOption] = useState<number | null>(null);
  const [vivaSubmitted, setVivaSubmitted] = useState<boolean>(false);
  const [vivaPassed, setVivaPassed] = useState<boolean>(false);

  // GitHub Submission State
  const isCompleted = isDayCompleted(lesson.day);
  const existingGhUrl = githubRepoUrls[lesson.day.toString()] || "";
  const [githubUrl, setGithubUrl] = useState<string>(existingGhUrl);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ status: "idle" | "error" | "success"; message: string }>({
    status: "idle",
    message: ""
  });

  const prevLesson = DOTNET_LESSONS.find(l => l.day === lesson.day - 1);
  const nextLesson = DOTNET_LESSONS.find(l => l.day === lesson.day + 1);

  const handleCopyCode = async (text: string) => {
    await safeInstantCopy(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = async (text: string) => {
    await safeInstantCopy(text);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleToggleTask = (taskId: string) => {
    setTasksChecked(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleVivaSubmit = () => {
    if (selectedVivaOption === null) return;
    setVivaSubmitted(true);
    const passed = selectedVivaOption === lesson.vivaCheck.correctAnswer;
    setVivaPassed(passed);
    if (passed) {
      triggerCelebration();
    }
  };

  const handleGitHubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFeedback({ status: "error", message: "Please sign in with Google first." });
      return;
    }
    if (!vivaPassed && !isCompleted) {
      setFeedback({ status: "error", message: "Please pass the Technical Viva check first." });
      return;
    }

    const trimmed = githubUrl.trim();
    if (!trimmed.startsWith("https://github.com/") || trimmed.includes("example") || trimmed.includes("your-username")) {
      setFeedback({
        status: "error",
        message: "Please enter a valid personal GitHub repository URL (e.g. https://github.com/yourname/dotnet-learning-hub)."
      });
      return;
    }

    try {
      setSubmitting(true);
      setFeedback({ status: "idle", message: "" });
      await completeDayWithGitHub(lesson.day, trimmed);
      triggerCelebration();
      setFeedback({
        status: "success",
        message: `🎉 Day ${lesson.day} marked verified and synchronized with your mentor!`
      });
    } catch {
      setFeedback({
        status: "error",
        message: "Failed to sync progress. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-24 transition-colors">
      <BcaHeaderNav currentSubjectCode=".NET Practical" currentSubjectName={lesson.title} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/practical/dotnet" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            .NET Practical Portal
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            Day {lesson.day < 10 ? `0${lesson.day}` : lesson.day}
          </span>
        </nav>

        {/* ── GOOGLE SIGN-IN MANDATORY GATE (If Unauthenticated) ── */}
        {!user && (
          <div className="rounded-3xl bg-blue-50 dark:bg-neutral-950 border-2 border-blue-600/30 p-6 sm:p-8 mb-8 text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <UserCheck size={28} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white mb-2">
              Google Sign-In Required for .NET Guided Labs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6 leading-relaxed">
              To verify code authenticity, store your pushed GitHub repositories, and earn the .NET Enterprise certification, please sign in with your student account.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={signIn}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <LogIn size={16} />
                <span>Continue with Google</span>
              </button>
              <button
                onClick={() => signInAsGuest()}
                className="px-4 py-3 rounded-2xl bg-slate-200 dark:bg-neutral-800 text-black dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-neutral-700 transition-all cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}

        {/* Lesson Header Banner */}
        <div className="rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-xl bg-blue-600 text-white font-mono">
                Day {lesson.day < 10 ? `0${lesson.day}` : lesson.day}
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Sprint {lesson.sprint} • {lesson.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Clock size={13} />
                {lesson.estimatedTime}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={13} />
                  Completed &amp; Verified
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white mb-3">
            {lesson.title}
          </h1>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {lesson.concept.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-slate-200 dark:border-neutral-800">
            {lesson.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── INTERACTIVE TAB NAVIGATION ── */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-neutral-800 overflow-x-auto pb-2 mb-6">
          {[
            { id: "concept", label: "1. Concept & Theory", icon: BookOpen },
            { id: "demo", label: "2. Teacher Demo", icon: Code2 },
            { id: "lab", label: "3. Hands-on Lab", icon: Terminal },
            { id: "debug", label: "4. Debug Challenge", icon: AlertCircle },
            { id: "viva", label: "5. Technical Viva", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs shrink-0 transition-all cursor-pointer ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: CONCEPT & THEORY (SIMPLE ENGLISH THEORY OF .NET) ── */}
        {activeTab === "concept" && (
          <div className="space-y-6">
            {/* 1. Plain English Definition Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-neutral-900 dark:to-neutral-950 border border-blue-200 dark:border-blue-900/40 p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-black uppercase tracking-wider mb-1">
                    <span>💡 Simple English Theory of .NET</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-black dark:text-white">
                    What is this in Simple, Everyday English?
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {lesson.concept.simpleTheory?.plainEnglishSummary || lesson.concept.overview}
              </p>
            </div>

            {/* 2. Under The Hood: How .NET Runtime & CLR Works Internally */}
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <h3 className="text-sm sm:text-base font-black text-black dark:text-white mb-2 flex items-center gap-2">
                <Cpu size={16} className="text-blue-600" />
                <span>⚙️ Under The Hood: How .NET Executes This Code</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Ever wondered what happens behind the scenes when you run <code className="bg-slate-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-black dark:text-white">dotnet run</code>? Here is the step-by-step internal workflow:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(lesson.concept.simpleTheory?.howDotnetWorksUnderTheHood || [
                  "1. Roslyn C# Compiler: Takes your readable C# code and compiles it into MSIL (Microsoft Intermediate Language) bytecode.",
                  "2. Common Language Runtime (CLR): The virtual machine environment that loads your assembly (.dll) and manages memory safely.",
                  "3. RyuJIT (Just-In-Time) Compiler: Compiles IL bytecode into native 64-bit machine CPU instructions right before execution.",
                  "4. Automatic Garbage Collector (GC): Automatically tracks and cleans up objects in RAM (Gen 0, 1, 2) with zero manual memory leaks."
                ]).map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Core Architectural Principles (Key Points) */}
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <h3 className="text-sm sm:text-base font-black text-black dark:text-white mb-3 flex items-center gap-2">
                <Layers size={16} className="text-blue-600" />
                <span>🎯 Core Key Points to Master</span>
              </h3>
              <ul className="space-y-2.5">
                {lesson.concept.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Real-World Developer Analogy */}
            {lesson.concept.analogy && (
              <div className="rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Lightbulb size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-blue-900 dark:text-blue-200 uppercase tracking-wide mb-1">
                      💡 Real-World Developer Analogy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lesson.concept.analogy}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Enterprise Why Tech Giants Use It & Beginner Traps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-blue-600" />
                  <span>🏢 Why Companies & Tech Giants Use This in .NET</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lesson.concept.simpleTheory?.whyEnterprisesUseIt || 
                    ".NET is trusted by high-scale companies like Microsoft, Stack Overflow, and banking institutions because it combines lightning-fast execution speed with strict compile-time type safety and cross-platform Docker cloud deployment."}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-600 dark:text-amber-400" />
                  <span>⚠️ Beginner Trap to Avoid</span>
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lesson.concept.simpleTheory?.beginnerPitfalls?.[0] || 
                    "Avoid blocking asynchronous Tasks with .Result or .Wait() — always use 'await' all the way down to avoid thread pool starvation and freezing your application."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: TEACHER DEMO ── */}
        {activeTab === "demo" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-extrabold text-black dark:text-white">
                  {lesson.teacherDemo.title}
                </h2>
                <button
                  onClick={() => handleCopyCode(lesson.teacherDemo.code)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-bold hover:border-blue-500 cursor-pointer"
                >
                  {copiedCode ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{copiedCode ? "Copied" : "Copy C# Code"}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                {lesson.teacherDemo.explanation}
              </p>
              <pre className="p-4 rounded-xl bg-neutral-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                <code>{lesson.teacherDemo.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* ── TAB 3: HANDS-ON LAB ── */}
        {activeTab === "lab" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <h2 className="text-base font-extrabold text-black dark:text-white mb-2">
                {lesson.practicalLab.labTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                {lesson.practicalLab.labDescription}
              </p>

              {/* CLI Command Box */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Terminal size={14} className="text-blue-600" />
                    <span>Run in Windows CMD / PowerShell:</span>
                  </span>
                  <button
                    onClick={() => handleCopyCli(lesson.practicalLab.cliCommand)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCli ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span>{copiedCli ? "Copied CLI" : "Copy Command"}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-neutral-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-neutral-800">
                  <code>{lesson.practicalLab.cliCommand}</code>
                </pre>
              </div>

              {/* Tasks Checklist */}
              <div>
                <h3 className="text-xs font-black text-black dark:text-white uppercase tracking-wider mb-3">
                  Verification Checklist:
                </h3>
                <div className="space-y-2.5">
                  {lesson.practicalLab.tasks.map((task) => {
                    const isChecked = !!tasksChecked[task.id];
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(task.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked 
                            ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40" 
                            : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 dark:border-neutral-700"
                        }`}>
                          {isChecked && <Check size={13} />}
                        </div>
                        <div>
                          <div className={`text-xs font-extrabold ${isChecked ? "line-through text-slate-500" : "text-black dark:text-white"}`}>
                            {task.title}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            {task.instruction}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: DEBUG CHALLENGE ── */}
        {activeTab === "debug" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <h2 className="text-base font-extrabold text-black dark:text-white mb-2 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" />
                <span>{lesson.debuggingChallenge.title}</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Analyze why this C# code fails at compile or runtime:
              </p>
              
              <div className="mb-4">
                <div className="text-xs font-bold text-red-500 mb-1">❌ Buggy Code:</div>
                <pre className="p-3.5 rounded-xl bg-red-950/20 text-red-200 font-mono text-xs overflow-x-auto border border-red-900/40">
                  <code>{lesson.debuggingChallenge.buggyCode}</code>
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 mb-4">
                <div className="text-xs font-extrabold text-amber-900 dark:text-amber-200 mb-1">
                  💡 Bug Analysis:
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lesson.debuggingChallenge.bugExplanation}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-500 mb-1">✅ Corrected Production Code:</div>
                <pre className="p-3.5 rounded-xl bg-emerald-950/20 text-emerald-200 font-mono text-xs overflow-x-auto border border-emerald-900/40">
                  <code>{lesson.debuggingChallenge.fixedCode}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: TECHNICAL VIVA & GITHUB SUBMISSION ── */}
        {activeTab === "viva" && (
          <div className="space-y-6">
            {/* Technical Viva Card */}
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <div className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                <HelpCircle size={15} />
                <span>Mandatory Technical Viva Check</span>
              </div>

              <h2 className="text-base font-extrabold text-black dark:text-white mb-4">
                {lesson.vivaCheck.question}
              </h2>

              <div className="space-y-2 mb-6">
                {lesson.vivaCheck.options.map((opt, idx) => {
                  const isSelected = selectedVivaOption === idx;
                  let optionStyles = "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800";
                  if (vivaSubmitted) {
                    if (idx === lesson.vivaCheck.correctAnswer) {
                      optionStyles = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200";
                    } else if (isSelected) {
                      optionStyles = "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200";
                    }
                  } else if (isSelected) {
                    optionStyles = "bg-blue-50 dark:bg-blue-950/40 border-blue-600";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={vivaSubmitted}
                      onClick={() => setSelectedVivaOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyles}`}
                    >
                      <span>{opt}</span>
                      {vivaSubmitted && idx === lesson.vivaCheck.correctAnswer && (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!vivaSubmitted ? (
                <button
                  disabled={selectedVivaOption === null}
                  onClick={handleVivaSubmit}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-xs transition-all shadow-sm cursor-pointer"
                >
                  Submit Viva Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  vivaPassed 
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-900 dark:text-emerald-200" 
                    : "bg-red-50 dark:bg-red-950/30 border-red-300 text-red-900 dark:text-red-200"
                }`}>
                  <div className="font-extrabold mb-1">
                    {vivaPassed ? "✅ Viva Passed!" : "❌ Incorrect Option Selected"}
                  </div>
                  <div>{lesson.vivaCheck.explanation}</div>
                </div>
              )}
            </div>

            {/* GitHub Verification Gate */}
            <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6">
              <div className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                <GitBranch size={15} />
                <span>GitHub Repository Proof</span>
              </div>

              <h3 className="text-base font-extrabold text-black dark:text-white mb-2">
                Submit Your Live .NET GitHub Repository
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Commit your <code className="font-mono text-blue-600">{lesson.practicalLab.targetFolder}</code> code to your personal GitHub repository and enter the URL below to unlock Day {lesson.day + 1}.
              </p>

              <form onSubmit={handleGitHubSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-username/dotnet-learning-hub"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs sm:text-sm font-mono text-black dark:text-white outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    disabled={submitting || (!vivaPassed && !isCompleted)}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    {submitting ? "Verifying..." : isCompleted ? "Update URL" : "Verify & Complete Day"}
                  </button>
                </div>

                {feedback.message && (
                  <div className={`text-xs p-3 rounded-xl border ${
                    feedback.status === "error" 
                      ? "bg-red-50 dark:bg-red-950/30 border-red-300 text-red-700 dark:text-red-300" 
                      : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-700 dark:text-emerald-300"
                  }`}>
                    {feedback.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ── SEQUENTIAL DAY NAVIGATION (BOTTOM) ── */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/practical/dotnet/${prevLesson.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-800 font-bold text-xs transition-all"
            >
              <ChevronLeft size={16} />
              <span>Day {prevLesson.day}: {prevLesson.title.split(":")[1] || prevLesson.title}</span>
            </Link>
          ) : <div />}

          {nextLesson && (
            <Link
              href={`/practical/dotnet/${nextLesson.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
            >
              <span>Day {nextLesson.day}: {nextLesson.title.split(":")[1] || nextLesson.title}</span>
              <ChevronRight size={16} />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
