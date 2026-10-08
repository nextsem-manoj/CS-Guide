"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Circle, 
  Terminal, Sparkles, Copy, Check, Bug, Lightbulb, GitBranch, 
  BookOpen, HelpCircle, AlertCircle, Share2, Award, Clock, Lock,
  ExternalLink, LogIn, UserCheck, ShieldCheck
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import TaskBasedCodingLab from "@/components/TaskBasedCodingLab";
import { PracticalLesson, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";

interface Props {
  lesson: PracticalLesson;
}

export default function BcaPracticalLessonClient({ lesson }: Props) {
  const router = useRouter();
  const { 
    user, 
    isDayCompleted, 
    isDayUnlocked, 
    completeDayWithGitHub, 
    githubRepoUrls, 
    signIn 
  } = useStudentProgress();

  // Internal Step Tracker within the lesson
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedGit, setCopiedGit] = useState<boolean>(false);
  const [showBugSolution, setShowBugSolution] = useState<boolean>(false);

  // Viva check state
  const [selectedVivaOption, setSelectedVivaOption] = useState<number | null>(null);
  const [isVivaSubmitted, setIsVivaSubmitted] = useState<boolean>(false);
  const [vivaPassed, setVivaPassed] = useState<boolean>(false);

  // GitHub submission state
  const isCompleted = isDayCompleted(lesson.day);
  const isUnlocked = isDayUnlocked(lesson.day);
  const existingGhUrl = githubRepoUrls[lesson.day.toString()] || "";
  const [githubUrlInput, setGithubUrlInput] = useState<string>("");
  const [githubSubmitting, setGithubSubmitting] = useState<boolean>(false);
  const [githubFeedback, setGithubFeedback] = useState<{ status: "idle" | "error" | "success"; message: string }>({
    status: "idle",
    message: ""
  });

  // Prev / Next day lessons
  const prevLesson = PRACTICAL_LESSONS.find(l => l.day === lesson.day - 1);
  const nextLesson = PRACTICAL_LESSONS.find(l => l.day === lesson.day + 1);

  useEffect(() => {
    if (existingGhUrl) {
      setGithubUrlInput(existingGhUrl);
    }
  }, [existingGhUrl]);

  const handleCopyCode = (text: string, type: "demo" | "git") => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "demo") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedGit(true);
        setTimeout(() => setCopiedGit(false), 2000);
      }
    }
  };

  const handleVivaSubmit = () => {
    setIsVivaSubmitted(true);
    const passed = selectedVivaOption === lesson.vivaCheck.correctAnswer;
    setVivaPassed(passed);
  };

  const handleGitHubVerifyAndComplete = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setGithubSubmitting(true);
    setGithubFeedback({ status: "idle", message: "" });

    const result = await completeDayWithGitHub(lesson.day, githubUrlInput);

    if (result.success) {
      setGithubFeedback({ status: "success", message: result.message });
    } else {
      setGithubFeedback({ status: "error", message: result.message });
    }
    setGithubSubmitting(false);
  };

  // If this lesson is locked because previous day is not completed:
  if (!isUnlocked) {
    const requiredDayNum = lesson.day - 1;
    const requiredLesson = PRACTICAL_LESSONS.find(l => l.day === requiredDayNum);

    return (
      <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col font-sans pb-24">
        <BcaHeaderNav currentSubjectCode={`Day ${lesson.day}`} currentSubjectName={lesson.title} />

        <main className="max-w-2xl mx-auto px-4 py-16 w-full flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-6 shadow-xl">
            <Lock size={32} />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-3">
            Sequential Learning Enforcement
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Day {lesson.day} is Currently Locked 🔒
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-lg mb-8">
            NextSem requires every student to follow the complete practical workflow without skipping steps.
            You must complete <strong className="text-white">Day {requiredDayNum}: {requiredLesson?.title}</strong>, pass all coding tasks, and push your repository to GitHub before unlocking this lesson.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <Link
              href="/bca/practical"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs"
            >
              Back to Practical Hub
            </Link>
            <Link
              href={`/bca/practical/${requiredLesson?.slug || "day-1-html-setup-first-webpage"}`}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-950/40 flex items-center gap-2"
            >
              <span>Go to Day {requiredDayNum}</span>
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col font-sans pb-24">
      {/* Top Header */}
      <BcaHeaderNav 
        currentSubjectCode={`Day ${lesson.day}`} 
        currentSubjectName={lesson.title} 
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Clickable Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-bold py-1 mb-4">
          <Link href="/" className="hover:text-[#04AA6D] transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-[#04AA6D] transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca/practical" className="hover:text-[#04AA6D] transition-colors">
            Practical Portal
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <span className="text-emerald-400 font-bold truncate max-w-xs">
            Day {lesson.day}: {lesson.title}
          </span>
        </nav>

        {/* Student Auth & Status Mini-Bar */}
        <div className="rounded-xl bg-[#091124] border border-slate-800 px-4 py-2.5 mb-6 flex items-center justify-between gap-3 text-xs">
          {user ? (
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                Logged in as <strong className="text-white">{user.name}</strong>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ☁️ Cloud Synced
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">Guest Mode:</span>
              <span className="text-slate-300 hidden sm:inline">Sign in with Google to permanently link this practical to your student record.</span>
            </div>
          )}

          {!user && (
            <button
              onClick={signIn}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-900 font-black text-[11px] hover:bg-slate-200 transition-all cursor-pointer"
            >
              <LogIn size={12} />
              <span>Sign In with Google</span>
            </button>
          )}

          {isCompleted && (
            <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-[11px]">
              <CheckCircle2 size={13} />
              <span>Pushed to GitHub &amp; Verified</span>
            </div>
          )}
        </div>

        {/* Top Header Bar */}
        <header className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                Day {lesson.day}
              </span>
              <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                {lesson.category}
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 ml-1">
                <Clock size={13} className="text-amber-400" />
                {lesson.estimatedTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Day Completed</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-extrabold">
                  <Lock size={13} />
                  <span>Push to GitHub to Complete</span>
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            {lesson.concept.overview}
          </p>
        </header>

        {/* Lesson Step Progress Pills */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-8 text-[11px] font-bold text-center">
          <div className="p-2 rounded-xl bg-[#0c1328] border border-emerald-500/40 text-emerald-300">
            <span>1. Objectives</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0c1328] border border-cyan-500/40 text-cyan-300">
            <span>2. Demo Code</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0c1328] border border-blue-500/40 text-blue-300">
            <span>3. Code Lab</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0c1328] border border-rose-500/40 text-rose-300">
            <span>4. Debugging</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0c1328] border border-amber-500/40 text-amber-300">
            <span>5. Viva Check</span>
          </div>
          <div className={`p-2 rounded-xl border ${isCompleted ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-black" : "bg-[#0c1328] border-indigo-500/40 text-indigo-300"}`}>
            <span>6. GitHub Push</span>
          </div>
        </div>

        {/* STEP 1: Learning Objectives */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-md">
          <h2 className="text-base font-black text-white flex items-center gap-2 mb-3">
            <span className="text-emerald-400">🎯</span>
            <span>1. What You Will Learn Today</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {lesson.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-200">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 2: Core Concept Breakdown */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-md">
          <h2 className="text-base font-black text-white flex items-center gap-2 mb-3">
            <span className="text-cyan-400">💡</span>
            <span>2. Concept Explanation</span>
          </h2>

          <div className="space-y-2 mb-4">
            {lesson.concept.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span className="text-cyan-400 font-extrabold">•</span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          {lesson.concept.analogy && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2.5">
              <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Real-World Mental Model:</strong>
                <span>{lesson.concept.analogy}</span>
              </div>
            </div>
          )}
        </section>

        {/* STEP 3: Teacher Demonstration Code */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span className="text-amber-400">👨‍🏫</span>
                <span>3. Teacher Demonstration Code</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{lesson.teacherDemo.explanation}</p>
            </div>

            <button
              onClick={() => handleCopyCode(lesson.teacherDemo.code, "demo")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all active:scale-95 cursor-pointer"
            >
              {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#060c18]">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
              <span>{lesson.teacherDemo.title}</span>
              <span className="uppercase text-emerald-400 font-bold">{lesson.teacherDemo.language}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
              <code>{lesson.teacherDemo.code}</code>
            </pre>
          </div>
        </section>

        {/* STEP 4: In-Browser Student Coding Lab */}
        <section className="mb-8">
          <div className="mb-3">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <span className="text-emerald-400">💻</span>
              <span>4. Student Practical Coding Lab (Write & Run Code)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Code your solution directly in the browser editor below and click <strong className="text-white">Run &amp; Verify Tasks</strong>.
            </p>
          </div>

          <TaskBasedCodingLab
            labId={lesson.practicalLab.labTitle}
            labTitle={lesson.practicalLab.labTitle}
            labDescription={lesson.practicalLab.labDescription}
            language={lesson.practicalLab.language}
            initialCode={lesson.practicalLab.initialCode}
            tasks={lesson.practicalLab.tasks}
          />
        </section>

        {/* STEP 5: Debugging Challenge */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <span className="text-rose-400">🐛</span>
              <span>5. Spot-the-Error: Debugging Challenge</span>
            </h2>
            <button
              onClick={() => setShowBugSolution(!showBugSolution)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-extrabold text-cyan-300 transition-all active:scale-95 cursor-pointer"
            >
              {showBugSolution ? "Hide Solution" : "Reveal Explanation"}
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Inspect the buggy snippet below. Can you figure out why it fails before reading the solution?
          </p>

          <div className="rounded-xl overflow-hidden border border-rose-500/30 bg-[#060c18] mb-4">
            <div className="px-4 py-1.5 bg-rose-950/30 border-b border-rose-500/30 text-[11px] font-mono text-rose-300 font-bold">
              ⚠️ Broken Code Snippet
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-rose-200 leading-relaxed">
              <code>{lesson.debuggingChallenge.buggyCode}</code>
            </pre>
          </div>

          {showBugSolution && (
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-slate-200">
                <strong className="text-rose-400 block mb-1">Why this causes a bug:</strong>
                <span>{lesson.debuggingChallenge.bugExplanation}</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-emerald-500/30 bg-[#060c18]">
                <div className="px-4 py-1.5 bg-emerald-950/30 border-b border-emerald-500/30 text-[11px] font-mono text-emerald-300 font-bold">
                  ✔ Verified Fix
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-200 leading-relaxed">
                  <code>{lesson.debuggingChallenge.fixedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </section>

        {/* STEP 6: Independent Homework Assignment */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-md">
          <h2 className="text-base font-black text-white flex items-center gap-2 mb-3">
            <span className="text-indigo-400">📝</span>
            <span>6. Independent Task / Homework Assignment</span>
          </h2>
          <h3 className="text-sm font-extrabold text-white mb-2">{lesson.assignment.title}</h3>
          
          <ul className="space-y-1.5 mb-4 text-xs text-slate-300">
            {lesson.assignment.instructions.map((inst, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{inst}</span>
              </li>
            ))}
          </ul>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <strong className="text-slate-200">Submission Evaluation Criteria: </strong>
            <span>{lesson.assignment.submissionCriteria}</span>
          </div>
        </section>

        {/* STEP 7: Viva / Knowledge Check */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-md">
          <h2 className="text-base font-black text-white flex items-center gap-2 mb-3">
            <span className="text-amber-400">🎓</span>
            <span>7. Viva Check: Mandatory Conceptual Test</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-bold mb-4">
            {lesson.vivaCheck.question}
          </p>

          <div className="space-y-2 mb-4">
            {lesson.vivaCheck.options.map((opt, i) => {
              const isSelected = selectedVivaOption === i;
              const isCorrect = i === lesson.vivaCheck.correctAnswer;
              let btnClass = "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800";

              if (isVivaSubmitted) {
                if (isCorrect) {
                  btnClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-rose-950/40 border-rose-500 text-rose-200";
                }
              } else if (isSelected) {
                btnClass = "bg-cyan-950/50 border-cyan-400 text-white";
              }

              return (
                <button
                  key={i}
                  disabled={isVivaSubmitted}
                  onClick={() => setSelectedVivaOption(i)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isVivaSubmitted && isCorrect && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {!isVivaSubmitted ? (
            <button
              disabled={selectedVivaOption === null}
              onClick={handleVivaSubmit}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition-all active:scale-95 shadow-md cursor-pointer"
            >
              Verify Viva Answer
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-0.5">Explanation:</strong>
              <span>{lesson.vivaCheck.explanation}</span>
            </div>
          )}
        </section>

        {/* STEP 8: MANDATORY GITHUB SUBMISSION & PUSH VERIFICATION */}
        <section className="rounded-2xl bg-gradient-to-br from-[#0c1328] via-[#0b1633] to-[#071026] border-2 border-emerald-500/50 p-6 sm:p-7 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <GitBranch size={18} />
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    8. Mandatory Step: Push to GitHub to Unlock Next Lesson
                  </h2>
                  <p className="text-xs text-slate-300">
                    Target Repo: <code className="text-emerald-300 bg-slate-950 px-2 py-0.5 rounded font-mono font-bold">{lesson.githubWorkflow.repoName}</code>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopyCode(lesson.githubWorkflow.commands.join("\n"), "git")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
              >
                {copiedGit ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedGit ? "Copied!" : "Copy Commands"}</span>
              </button>
            </div>

            {/* Terminal Commands Box */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060c18] mb-4">
              <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-emerald-400" />
                  <span>Execute in Windows 11 Terminal / VS Code:</span>
                </div>
                <span className="text-slate-500 text-[10px]">main branch</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
                <code>{lesson.githubWorkflow.commands.join("\n")}</code>
              </pre>
            </div>

            {/* GitHub URL Submission Form */}
            <form onSubmit={handleGitHubVerifyAndComplete} className="space-y-3 pt-2">
              <div>
                <label htmlFor="ghUrl" className="block text-xs font-black text-white mb-1.5">
                  Paste your GitHub Repository URL or Commit Link:
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    id="ghUrl"
                    type="url"
                    required
                    placeholder="https://github.com/your-username/html-css-projects"
                    value={githubUrlInput}
                    onChange={(e) => setGithubUrlInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={githubSubmitting || !githubUrlInput.trim()}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs transition-all active:scale-95 shadow-lg shadow-emerald-950/50 cursor-pointer shrink-0 flex items-center justify-center gap-2"
                  >
                    <GitBranch size={14} />
                    <span>{githubSubmitting ? "Verifying..." : isCompleted ? "Update GitHub Link" : "Verify & Unlock Next Lesson 🚀"}</span>
                  </button>
                </div>
              </div>

              {githubFeedback.message && (
                <div className={`p-3 rounded-xl border text-xs font-bold ${
                  githubFeedback.status === "success" 
                    ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200" 
                    : "bg-rose-950/60 border-rose-500/50 text-rose-200"
                }`}>
                  {githubFeedback.message}
                </div>
              )}

              {isCompleted && !githubFeedback.message && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>Verified! Your code is pushed to GitHub and recorded in your student profile.</span>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div>
            {prevLesson ? (
              <Link
                href={`/bca/practical/${prevLesson.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-extrabold text-xs transition-all active:scale-95"
              >
                <ChevronLeft size={16} />
                <span>Day {prevLesson.day}: {prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center gap-3">
            {nextLesson ? (
              isCompleted ? (
                <Link
                  href={`/bca/practical/${nextLesson.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all active:scale-95 shadow-xl shadow-emerald-950/40"
                >
                  <span>Proceed to Day {nextLesson.day}: {nextLesson.title}</span>
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-500 font-bold text-xs sm:text-sm opacity-60 cursor-not-allowed"
                  title="Push your code to GitHub above to unlock Day 2!"
                >
                  <Lock size={15} />
                  <span>Day {nextLesson.day} is Locked (Push to GitHub First)</span>
                </button>
              )
            ) : (
              <Link
                href="/bca/practical"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm transition-all active:scale-95 shadow-xl"
              >
                <span>Back to Practical Portal</span>
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
