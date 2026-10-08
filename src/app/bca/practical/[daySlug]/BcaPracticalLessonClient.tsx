"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Circle, 
  Terminal, Sparkles, Copy, Check, Bug, Lightbulb, GitBranch, 
  BookOpen, HelpCircle, AlertCircle, Share2, Award, Clock
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import TaskBasedCodingLab from "@/components/TaskBasedCodingLab";
import { triggerCelebration } from "@/lib/celebration";
import { PracticalLesson, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";

interface Props {
  lesson: PracticalLesson;
}

export default function BcaPracticalLessonClient({ lesson }: Props) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedGit, setCopiedGit] = useState<boolean>(false);
  const [showBugSolution, setShowBugSolution] = useState<boolean>(false);

  // Viva check state
  const [selectedVivaOption, setSelectedVivaOption] = useState<number | null>(null);
  const [isVivaSubmitted, setIsVivaSubmitted] = useState<boolean>(false);

  // Prev / Next day lessons
  const prevLesson = PRACTICAL_LESSONS.find(l => l.day === lesson.day - 1);
  const nextLesson = PRACTICAL_LESSONS.find(l => l.day === lesson.day + 1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("nextsem_user");
      let email = "guest";
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          email = parsed.email || "guest";
        } catch (e) {}
      }
      setUserEmail(email);

      const done = localStorage.getItem(`nextsem_practical_day_${lesson.day}_done_${email}`) === "true";
      setIsCompleted(done);
      setSelectedVivaOption(null);
      setIsVivaSubmitted(false);
      setShowBugSolution(false);
    }
  }, [lesson.day]);

  const handleToggleCompletion = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem(`nextsem_practical_day_${lesson.day}_done_${userEmail}`, nextState ? "true" : "false");
    }
    if (nextState) {
      triggerCelebration();
    }
  };

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

        {/* Top Header Bar */}
        <header className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-8 shadow-xl">
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

            {/* Mark Complete Action */}
            <button
              onClick={handleToggleCompletion}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
              }`}
            >
              <CheckCircle2 size={14} className={isCompleted ? "text-emerald-400" : "text-slate-500"} />
              <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            {lesson.concept.overview}
          </p>
        </header>

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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all active:scale-95"
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
              Code your solution directly in the browser editor below and click <strong className="text-white">Run & Verify Tasks</strong>.
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
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-extrabold text-cyan-300 transition-all active:scale-95"
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

        {/* STEP 7: Git & GitHub Workflow */}
        <section className="rounded-2xl bg-gradient-to-br from-[#0c1328] to-[#091124] border border-cyan-500/30 p-5 sm:p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span className="text-emerald-400">🐙</span>
                <span>7. Git & GitHub Submission Workflow</span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Target Repository: <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">{lesson.githubWorkflow.repoName}</code>
              </p>
            </div>

            <button
              onClick={() => handleCopyCode(lesson.githubWorkflow.commands.join("\n"), "git")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all active:scale-95"
            >
              {copiedGit ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedGit ? "Copied!" : "Copy Commands"}</span>
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060c18] mb-3">
            <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <Terminal size={12} className="text-emerald-400" />
              <span>Windows 11 Terminal / Git Bash</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed">
              <code>{lesson.githubWorkflow.commands.join("\n")}</code>
            </pre>
          </div>

          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400 shrink-0" />
            <span>{lesson.githubWorkflow.tips}</span>
          </p>
        </section>

        {/* STEP 8: Viva / Knowledge Check */}
        <section className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 sm:p-6 mb-10 shadow-md">
          <h2 className="text-base font-black text-white flex items-center gap-2 mb-3">
            <span className="text-amber-400">🎓</span>
            <span>8. Viva Check: Conceptual Test</span>
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
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnClass}`}
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
              onClick={() => setIsVivaSubmitted(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition-all active:scale-95 shadow-md"
            >
              Verify Answer
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-0.5">Explanation:</strong>
              <span>{lesson.vivaCheck.explanation}</span>
            </div>
          )}
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

          <button
            onClick={handleToggleCompletion}
            className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all active:scale-95 shadow-xl flex items-center gap-2 ${
              isCompleted
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40"
            }`}
          >
            <CheckCircle2 size={16} className={isCompleted ? "text-emerald-400" : "text-white"} />
            <span>{isCompleted ? "Day Completed (Review)" : "Mark Day Completed 🚀"}</span>
          </button>

          <div>
            {nextLesson ? (
              <Link
                href={`/bca/practical/${nextLesson.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all active:scale-95 shadow-md shadow-emerald-950/30"
              >
                <span>Day {nextLesson.day}: {nextLesson.title}</span>
                <ChevronRight size={16} />
              </Link>
            ) : (
              <Link
                href="/bca/practical"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs transition-all active:scale-95 shadow-md"
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
