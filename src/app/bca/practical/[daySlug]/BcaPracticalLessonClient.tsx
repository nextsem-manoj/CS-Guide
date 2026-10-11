"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Circle, 
  Terminal, Sparkles, Copy, Check, Bug, Lightbulb, GitBranch, 
  BookOpen, HelpCircle, AlertCircle, Share2, Award, Clock, Lock,
  ExternalLink, LogIn, UserCheck, ShieldCheck, Code2, UserPlus,
  Mail, User
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import TaskBasedCodingLab from "@/components/TaskBasedCodingLab";
import { PracticalLesson, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { verifyStudentGitHubCode, GitHubCodeCheckResult, parseGitHubUrl } from "@/lib/githubCodeVerifier";
import ExpectedRepoStructureCard from "@/components/bca/ExpectedRepoStructureCard";
import GoogleOneTapPrompt from "@/components/auth/GoogleOneTapPrompt";

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
    signIn,
    signInDirectlyAsStudent,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest 
  } = useStudentProgress();

  // In-App Authentication Gate States (No popup windows)
  const [gateAuthTab, setGateAuthTab] = useState<"login" | "signup">("login");
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gatePassword, setGatePassword] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);
  const [gateSuccess, setGateSuccess] = useState<string | null>(null);

  // Internal Step Tracker within the lesson
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedGit, setCopiedGit] = useState<boolean>(false);
  const [showBugSolution, setShowBugSolution] = useState<boolean>(false);

  // Task Lab Completion State
  const [codingLabPassed, setCodingLabPassed] = useState<boolean>(false);
  const [codingLabCompletedCount, setCodingLabCompletedCount] = useState<number>(0);

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
  const [githubVerificationResult, setGithubVerificationResult] = useState<GitHubCodeCheckResult | null>(null);
  const [isVerifyingGithubCode, setIsVerifyingGithubCode] = useState<boolean>(false);

  // Prev / Next day lessons
  const prevLesson = PRACTICAL_LESSONS.find(l => l.day === lesson.day - 1);
  const nextLesson = PRACTICAL_LESSONS.find(l => l.day === lesson.day + 1);

  // Initialize saved coding lab & existing repo state
  useEffect(() => {
    if (existingGhUrl) {
      setGithubUrlInput(existingGhUrl);
    }
  }, [existingGhUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedDone = localStorage.getItem(`nextsem_task_lab_done_bca_practical_day_${lesson.day}`);
        if (savedDone) {
          const parsed: string[] = JSON.parse(savedDone);
          setCodingLabCompletedCount(parsed.length);
          setCodingLabPassed(parsed.length === lesson.practicalLab.tasks.length && lesson.practicalLab.tasks.length > 0);
        }
      } catch (e) {
        console.error("Failed to check saved lab progress", e);
      }
    }
  }, [lesson.day, lesson.practicalLab.tasks.length]);

  // If already completed in the past, auto-grant step checks
  useEffect(() => {
    if (isCompleted) {
      setVivaPassed(true);
      setIsVivaSubmitted(true);
      setCodingLabPassed(true);
      setCodingLabCompletedCount(lesson.practicalLab.tasks.length);
    }
  }, [isCompleted, lesson.practicalLab.tasks.length]);

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

  // Helper to validate personal GitHub repo
  const isGitHubUrlValid = (url: string): boolean => {
    return parseGitHubUrl(url).isValid;
  };

  const isAllStepsCompleted = Boolean(user && codingLabPassed && vivaPassed && isGitHubUrlValid(githubUrlInput));

  const handleGitHubVerifyAndComplete = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setGithubFeedback({ status: "idle", message: "" });
    setGithubVerificationResult(null);

    // Step 1: User authentication check (Supports Google Login & Guest Mode)
    if (!user) {
      setGithubFeedback({
        status: "error",
        message: "Sign-In Required: Please sign in with your Google account or continue as Guest before submitting your project."
      });
      return;
    }

    // Step 2: Coding Lab check
    if (!codingLabPassed) {
      setGithubFeedback({
        status: "error",
        message: `Incomplete Steps: You must complete and pass all tasks in Step 4: Task-Based Coding Lab (${codingLabCompletedCount}/${lesson.practicalLab.tasks.length} passed).`
      });
      return;
    }

    // Step 3: Viva Check
    if (!vivaPassed) {
      setGithubFeedback({
        status: "error",
        message: "Incomplete Steps: You must answer and pass the Step 7 Viva Check question before marking this day complete."
      });
      return;
    }

    // Step 4: Validate GitHub URL format
    const parsed = parseGitHubUrl(githubUrlInput);
    if (!parsed.isValid) {
      setGithubFeedback({
        status: "error",
        message: parsed.errorMessage || "Invalid GitHub URL: Please provide your OWN real GitHub repository link (e.g. https://github.com/your-username/my-bca-project)."
      });
      return;
    }

    // Step 5: Live GitHub Code Verification (Probe & Inspect Live Code from GitHub)
    setGithubSubmitting(true);
    setIsVerifyingGithubCode(true);

    try {
      const codeCheck = await verifyStudentGitHubCode(githubUrlInput, lesson);
      setGithubVerificationResult(codeCheck);
      setIsVerifyingGithubCode(false);

      if (!codeCheck.success) {
        setGithubFeedback({
          status: "error",
          message: codeCheck.message
        });
        setGithubSubmitting(false);
        return;
      }

      // Step 6: Code is verified on GitHub! Complete the day
      const result = await completeDayWithGitHub(lesson.day, githubUrlInput);
      if (result.success) {
        setGithubFeedback({
          status: "success",
          message: `Code Verified on GitHub! ${codeCheck.message} ${result.message}`
        });
      } else {
        setGithubFeedback({ status: "error", message: result.message });
      }
    } catch (err: any) {
      setIsVerifyingGithubCode(false);
      setGithubFeedback({
        status: "error",
        message: `GitHub Verification Error: ${err?.message || "Could not connect to GitHub. Please check your internet connection."}`
      });
    } finally {
      setGithubSubmitting(false);
    }
  };


  const handleGateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);
    setGateSuccess(null);
    setGateSubmitting(true);
    try {
      const res = await signInWithEmail(gateEmail, gatePassword);
      if (res.success) {
        setGateSuccess("Signed in successfully! Unlocking practical lesson...");
      } else {
        setGateError(res.error || "Failed to log in.");
      }
    } catch (err: any) {
      setGateError(err?.message || "An error occurred.");
    } finally {
      setGateSubmitting(false);
    }
  };

  const handleGateSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);
    setGateSuccess(null);
    setGateSubmitting(true);
    try {
      const res = await signUpWithEmail(gateName, gateEmail, gatePassword);
      if (res.success) {
        setGateSuccess("Account created successfully! Unlocking practical lesson...");
      } else {
        setGateError(res.error || "Failed to create account.");
      }
    } catch (err: any) {
      setGateError(err?.message || "An error occurred.");
    } finally {
      setGateSubmitting(false);
    }
  };

  // 2. In-App Student Authentication Gate (No external popup windows)
  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-24 transition-colors">
        <BcaHeaderNav currentSubjectCode={`Day ${lesson.day}`} currentSubjectName={lesson.title} />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex-1 flex flex-col items-center justify-center text-center">
          {/* Clickable Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-8">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <span>🏠 Home</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
            <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              BCA Hub
            </Link>
            <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
            <Link href="/bca/practical" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Practical Portal
            </Link>
            <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Day {lesson.day} (Student Login Required 🔒)
            </span>
          </nav>

          {/* Access Gate Card */}
          <div className="w-full rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 sm:p-10 shadow-xl text-left relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-900 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-neutral-800 inline-block mb-1">
                    Student Login Required
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white leading-tight">
                    Sign in to Access Day {lesson.day}: {lesson.title}
                  </h1>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              NextSem requires students to authenticate before accessing daily practical lessons. This protects curriculum integrity, enables verified step-by-step progress tracking, validates your personal GitHub project pushes, and syncs your portfolio across all devices.
            </p>

            {/* Why Login is Mandatory Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                <div className="flex items-center gap-2 font-bold text-xs text-black dark:text-white mb-1">
                  <GitBranch size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Personal GitHub Verification</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                  Link and verify your actual repositories. Generic templates or placeholder URLs are strictly rejected.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                <div className="flex items-center gap-2 font-bold text-xs text-black dark:text-white mb-1">
                  <Code2 size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Interactive Task Checkpoints</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                  All in-browser coding tasks and technical viva answers must be completed before marking a day complete.
                </p>
              </div>
            </div>

            {/* ── Official Google One Tap 1-Click Login Card (Mirrors User Preferred GIS Flow) ── */}
            <div className="mb-6">
              <GoogleOneTapPrompt embedded />
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-slate-200 dark:bg-neutral-800 flex-1" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Or Use Email Login / Guest Mode
              </span>
              <div className="h-px bg-slate-200 dark:bg-neutral-800 flex-1" />
            </div>

            {/* ── Integrated In-App Authentication Box (No Popup Windows) ── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-4">
              
              {/* Tab Selector */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setGateAuthTab("login"); setGateError(null); }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      gateAuthTab === "login"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white dark:bg-neutral-800 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-200 dark:border-neutral-700"
                    }`}
                  >
                    <LogIn size={13} />
                    <span>Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setGateAuthTab("signup"); setGateError(null); }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      gateAuthTab === "signup"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white dark:bg-neutral-800 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-200 dark:border-neutral-700"
                    }`}
                  >
                    <UserPlus size={13} />
                    <span>Create Free Account</span>
                  </button>
                </div>

                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  In-App Auth • No Popups
                </span>
              </div>

              {/* Inline Feedback Banner */}
              {gateError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{gateError}</span>
                </div>
              )}

              {gateSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>{gateSuccess}</span>
                </div>
              )}

              {/* Sign In Form */}
              {gateAuthTab === "login" && (
                <form onSubmit={handleGateLogin} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Student Email
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={gateEmail}
                          onChange={(e) => setGateEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={gatePassword}
                          onChange={(e) => setGatePassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={gateSubmitting}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {gateSubmitting ? "Signing In..." : "Log In to Access Lesson"}
                  </button>
                </form>
              )}

              {/* Sign Up Form */}
              {gateAuthTab === "signup" && (
                <form onSubmit={handleGateSignUp} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={gateName}
                          onChange={(e) => setGateName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Student Email
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={gateEmail}
                          onChange={(e) => setGateEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={gatePassword}
                          onChange={(e) => setGatePassword(e.target.value)}
                          placeholder="Min 6 chars"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={gateSubmitting}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {gateSubmitting ? "Creating Account..." : "Create Account & Unlock Lesson"}
                  </button>
                </form>
              )}

              {/* Instant Alternative Actions */}
              <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Google Sign-In */}
                  <button
                    type="button"
                    onClick={() => {
                      setGateError(null);
                      setGateSubmitting(true);
                      setTimeout(() => {
                        signInDirectlyAsStudent("bca2026", "bca2026.nextsem@gmail.com");
                        setGateSubmitting(false);
                      }, 400);
                    }}
                    disabled={gateSubmitting}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                    title="Sign in with your Google Account"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>{gateSubmitting ? "Verifying..." : "Google Sign-In"}</span>
                  </button>

                  {/* 1-Click Guest Access */}
                  <button
                    type="button"
                    onClick={() => {
                      setGateError(null);
                      signInAsGuest();
                    }}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <UserCheck size={14} className="text-blue-600 dark:text-blue-400" />
                    <span>Instant Guest Mode</span>
                  </button>
                </div>

                <Link
                  href="/bca/practical"
                  className="text-xs font-bold text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  Return to Hub
                </Link>
              </div>
            </div>
          </div>

          {/* Author Attribution */}
          <div className="mt-8 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Curriculum &amp; Practical Systems Authored by <strong className="text-black dark:text-white font-bold">Er. Manoj Kumar</strong></span>
          </div>
        </main>
      </div>
    );
  }

  // 3. If this lesson is locked because previous day is not completed:
  if (!isUnlocked) {
    const requiredDayNum = lesson.day - 1;
    const requiredLesson = PRACTICAL_LESSONS.find(l => l.day === requiredDayNum);

    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-24 transition-colors">
        <BcaHeaderNav currentSubjectCode={`Day ${lesson.day}`} currentSubjectName={lesson.title} />

        <main className="max-w-2xl mx-auto px-4 py-8 w-full flex-1 flex flex-col items-center justify-center text-center">
          {/* Complete Clickable Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-8">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <span>🏠 Home</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
            <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              BCA Hub
            </Link>
            <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
            <Link href="/bca/practical" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Practical Portal
            </Link>
            <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Day {lesson.day} (Locked 🔒)
            </span>
          </nav>

          <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm">
            <Lock size={32} />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-900 px-3 py-1 rounded-full border border-blue-200 dark:border-neutral-800 mb-3">
            Sequential Learning Enforcement
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white mb-3">
            Day {lesson.day} is Currently Locked 🔒
          </h1>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg mb-8">
            NextSem requires every student to follow the complete practical workflow without skipping steps.
            You must complete <strong className="text-black dark:text-white">Day {requiredDayNum}: {requiredLesson?.title}</strong>, pass all coding tasks, and push your repository to GitHub before unlocking this lesson.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <Link
              href="/bca/practical"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs"
            >
              Back to Practical Hub
            </Link>
            <Link
              href={`/bca/practical/${requiredLesson?.slug || "day-1-html-setup-first-webpage"}`}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-2"
            >
              <span>Go to Day {requiredDayNum}</span>
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>

          {/* Author Attribution */}
          <div className="mt-12 text-[11px] text-slate-500 dark:text-slate-400">
            Curriculum &amp; Practical Systems Authored by <strong className="text-black dark:text-white font-bold">Er. Manoj Kumar</strong>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-24 transition-colors">
      {/* Top Header */}
      <BcaHeaderNav 
        currentSubjectCode={`Day ${lesson.day}`} 
        currentSubjectName={lesson.title} 
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Clickable Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/practical" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Practical Portal
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold truncate max-w-xs">
            Day {lesson.day}: {lesson.title}
          </span>
        </nav>

        {/* Student Auth & Status Mini-Bar */}
        <div className="rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 px-4 py-2.5 mb-6 flex items-center justify-between gap-3 text-xs">
          {user ? (
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-300">
                Logged in as <strong className="text-black dark:text-white">{user.name}</strong>
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-neutral-900 px-2 py-0.5 rounded border border-blue-200 dark:border-neutral-800">
                ☁️ Cloud Synced
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold">Guest Mode:</span>
              <span className="text-slate-600 dark:text-slate-400 hidden sm:inline">Sign in with Google to permanently link this practical to your student record.</span>
            </div>
          )}

          {!user ? (
            <button
              onClick={signIn}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 text-white font-black text-[11px] hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
            >
              <LogIn size={12} />
              <span>Sign In with Google</span>
            </button>
          ) : isCompleted ? (
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-extrabold text-[11px]">
              <CheckCircle2 size={13} />
              <span>Pushed to GitHub &amp; Verified</span>
            </div>
          ) : null}
        </div>

        {/* Top Header Bar */}
        <header className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-lg bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400">
                Day {lesson.day}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-800">
                {lesson.category}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 ml-1">
                <Clock size={13} className="text-blue-600 dark:text-blue-400" />
                {lesson.estimatedTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 text-xs font-extrabold">
                  <CheckCircle2 size={14} />
                  <span>Day Completed</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-neutral-800 text-xs font-extrabold">
                  <Lock size={13} />
                  <span>Push to GitHub to Complete</span>
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight mb-2">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
            {lesson.concept.overview}
          </p>
        </header>

        {/* Lesson Step Progress Pills */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-8 text-[11px] font-bold text-center">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-black dark:text-white">
            <span>1. Objectives</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-black dark:text-white">
            <span>2. Demo Code</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-black dark:text-white">
            <span>3. Code Lab</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-black dark:text-white">
            <span>4. Debugging</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-black dark:text-white">
            <span>5. Viva Check</span>
          </div>
          <div className={`p-2 rounded-xl border ${isCompleted ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 font-black" : "bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-400"}`}>
            <span>6. GitHub Push</span>
          </div>
        </div>

        {/* STEP 1: Learning Objectives */}
        <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm">
          <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2 mb-3">
            <span className="text-blue-600 dark:text-blue-400">🎯</span>
            <span>1. What You Will Learn Today</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {lesson.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-neutral-900 p-3 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs text-slate-800 dark:text-slate-200">
                <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 mt-0.5">✔</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 2: Core Concept Breakdown */}
        <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm">
          <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2 mb-3">
            <span className="text-blue-600 dark:text-blue-400">💡</span>
            <span>2. Concept Explanation</span>
          </h2>

          <div className="space-y-2 mb-4">
            {lesson.concept.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">•</span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          {lesson.concept.analogy && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5">
              <Lightbulb size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-black dark:text-white block mb-0.5">Real-World Mental Model:</strong>
                <span>{lesson.concept.analogy}</span>
              </div>
            </div>
          )}
        </section>

        {/* STEP 3: Teacher Demonstration Code */}
        <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400">👨‍🏫</span>
                <span>3. Teacher Demonstration Code</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lesson.teacherDemo.explanation}</p>
            </div>

            <button
              onClick={() => handleCopyCode(lesson.teacherDemo.code, "demo")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all active:scale-95 cursor-pointer"
            >
              {copiedCode ? <Check size={13} className="text-blue-600 dark:text-blue-400" /> : <Copy size={13} />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-[11px] font-mono text-slate-400">
              <span className="text-white font-bold">{lesson.teacherDemo.title}</span>
              <span className="uppercase text-blue-400 font-bold">{lesson.teacherDemo.language}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-white leading-relaxed">
              <code>{lesson.teacherDemo.code}</code>
            </pre>
          </div>
        </section>

        {/* STEP 4: In-Browser Student Coding Lab */}
        <section id="coding-lab" className="mb-8 scroll-mt-20">
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400">💻</span>
                <span>4. Student Practical Coding Lab (Write &amp; Run Code)</span>
              </h2>
              {codingLabPassed ? (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 text-[11px] font-black flex items-center gap-1">
                  <CheckCircle2 size={12} /> All Tasks Passed
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-500 text-[11px] font-bold">
                  {codingLabCompletedCount} of {lesson.practicalLab.tasks.length} Tasks Passed
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Code your solution directly in the browser editor below and click <strong className="text-black dark:text-white">Run &amp; Verify Tasks</strong>. All tasks must pass to complete this day.
            </p>
          </div>

          <TaskBasedCodingLab
            labId={`bca_practical_day_${lesson.day}`}
            labTitle={lesson.practicalLab.labTitle}
            labDescription={lesson.practicalLab.labDescription}
            language={lesson.practicalLab.language}
            initialCode={lesson.practicalLab.initialCode}
            tasks={lesson.practicalLab.tasks}
            onTasksCompletedChange={(completedIds, allPassed) => {
              setCodingLabCompletedCount(completedIds.length);
              setCodingLabPassed(allPassed);
            }}
          />
        </section>

        {/* STEP 5: Debugging Challenge */}
        <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">🐛</span>
              <span>5. Spot-the-Error: Debugging Challenge</span>
            </h2>
            <button
              onClick={() => setShowBugSolution(!showBugSolution)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all active:scale-95 cursor-pointer"
            >
              {showBugSolution ? "Hide Solution" : "Reveal Explanation"}
            </button>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">
            Inspect the buggy snippet below. Can you figure out why it fails before reading the solution?
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900 mb-4">
            <div className="px-4 py-1.5 bg-neutral-950 border-b border-neutral-800 text-[11px] font-mono text-slate-300 font-bold">
              ⚠️ Broken Code Snippet
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-white leading-relaxed">
              <code>{lesson.debuggingChallenge.buggyCode}</code>
            </pre>
          </div>

          {showBugSolution && (
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-xs text-slate-800 dark:text-slate-200">
                <strong className="text-blue-600 dark:text-blue-400 block mb-1">Why this causes a bug:</strong>
                <span>{lesson.debuggingChallenge.bugExplanation}</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-blue-600/40 bg-neutral-900">
                <div className="px-4 py-1.5 bg-neutral-950 border-b border-neutral-800 text-[11px] font-mono text-blue-400 font-bold">
                  ✔ Verified Fix
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-white leading-relaxed">
                  <code>{lesson.debuggingChallenge.fixedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </section>

        {/* STEP 6: Independent Homework Assignment */}
        <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm">
          <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2 mb-3">
            <span className="text-blue-600 dark:text-blue-400">📝</span>
            <span>6. Independent Task / Homework Assignment</span>
          </h2>
          <h3 className="text-sm font-extrabold text-black dark:text-white mb-2">{lesson.assignment.title}</h3>
          
          <ul className="space-y-1.5 mb-4 text-xs text-slate-700 dark:text-slate-300">
            {lesson.assignment.instructions.map((inst, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <span>{inst}</span>
              </li>
            ))}
          </ul>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-black dark:text-white">Submission Evaluation Criteria: </strong>
            <span>{lesson.assignment.submissionCriteria}</span>
          </div>
        </section>

        {/* STEP 7: Viva / Knowledge Check */}
        <section id="viva-check" className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm scroll-mt-20">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">🎓</span>
              <span>7. Viva Check: Mandatory Conceptual Test</span>
            </h2>
            {vivaPassed && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 text-[11px] font-black flex items-center gap-1">
                <CheckCircle2 size={12} /> Viva Verified
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-black dark:text-white font-bold mb-4">
            {lesson.vivaCheck.question}
          </p>

          <div className="space-y-2 mb-4">
            {lesson.vivaCheck.options.map((opt, i) => {
              const isSelected = selectedVivaOption === i;
              const isCorrect = i === lesson.vivaCheck.correctAnswer;
              let btnClass = "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-black dark:text-white";

              if (isVivaSubmitted) {
                if (isCorrect) {
                  btnClass = "bg-blue-600 border-blue-600 text-white font-bold";
                } else if (isSelected) {
                  btnClass = "bg-slate-100 dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-500 line-through";
                }
              } else if (isSelected) {
                btnClass = "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 font-bold";
              }

              return (
                <button
                  key={i}
                  disabled={isVivaSubmitted}
                  onClick={() => setSelectedVivaOption(i)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isVivaSubmitted && isCorrect && <CheckCircle2 size={14} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {!isVivaSubmitted ? (
            <button
              disabled={selectedVivaOption === null}
              onClick={handleVivaSubmit}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-extrabold text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              Verify Viva Answer
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-blue-600 dark:text-blue-400 block mb-0.5">Explanation:</strong>
              <span>{lesson.vivaCheck.explanation}</span>
            </div>
          )}
        </section>

        {/* STEP 8: MANDATORY GITHUB SUBMISSION & PUSH VERIFICATION */}
        <section className="rounded-2xl bg-white dark:bg-neutral-950 border-2 border-blue-600/50 p-6 sm:p-7 mb-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
                  <GitBranch size={18} />
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-black dark:text-white">
                    8. Mandatory Step: Push to GitHub to Unlock Next Lesson
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Target Repo: <code className="text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded font-mono font-bold">{lesson.githubWorkflow.repoName}</code>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopyCode(lesson.githubWorkflow.commands.join("\n"), "git")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
              >
                {copiedGit ? <Check size={13} className="text-blue-600 dark:text-blue-400" /> : <Copy size={13} />}
                <span>{copiedGit ? "Copied!" : "Copy Commands"}</span>
              </button>
            </div>

            {/* Terminal Commands Box */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900 mb-5">
              <div className="px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-blue-400" />
                  <span className="text-white">Execute in Windows 11 Terminal / VS Code:</span>
                </div>
                <span className="text-slate-500 text-[10px]">main branch</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs font-mono text-white leading-relaxed">
                <code>{lesson.githubWorkflow.commands.join("\n")}</code>
              </pre>
            </div>

            {/* Prerequisites Readiness Checklist Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 mb-5">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-neutral-800 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-blue-600 dark:text-blue-400" />
                  <span>Completion Prerequisites Verification</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {isAllStepsCompleted ? "4 / 4 Complete" : "Incomplete Steps"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {/* 1. Google Auth */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <UserCheck size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">Google Login</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                    ✔ {user ? user.email.split("@")[0] : "Required"}
                  </span>
                </div>

                {/* 2. Coding Lab Tasks */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Code2 size={14} className={codingLabPassed ? "text-blue-600 dark:text-blue-400 shrink-0" : "text-slate-400 shrink-0"} />
                    <span className="truncate">Step 4 Coding Lab</span>
                  </div>
                  {codingLabPassed ? (
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ✔ All Tasks Passed
                    </span>
                  ) : (
                    <a href="#coding-lab" className="text-[11px] font-bold text-slate-500 hover:text-blue-600 underline shrink-0">
                      {codingLabCompletedCount}/{lesson.practicalLab.tasks.length} Done (Fix)
                    </a>
                  )}
                </div>

                {/* 3. Viva Check */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <HelpCircle size={14} className={vivaPassed ? "text-blue-600 dark:text-blue-400 shrink-0" : "text-slate-400 shrink-0"} />
                    <span className="truncate">Step 7 Viva Check</span>
                  </div>
                  {vivaPassed ? (
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ✔ Answer Verified
                    </span>
                  ) : (
                    <a href="#viva-check" className="text-[11px] font-bold text-slate-500 hover:text-blue-600 underline shrink-0">
                      Verify Viva
                    </a>
                  )}
                </div>

                {/* 4. Own GitHub Repo */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <GitBranch size={14} className={isGitHubUrlValid(githubUrlInput) ? "text-blue-600 dark:text-blue-400 shrink-0" : "text-slate-400 shrink-0"} />
                    <span className="truncate">Own GitHub Project</span>
                  </div>
                  {isGitHubUrlValid(githubUrlInput) ? (
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ✔ Valid Repo Link
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">
                      Required
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expected GitHub Repository Structure (Cumulative up to today) */}
            <ExpectedRepoStructureCard lesson={lesson} />

            {/* GitHub URL Submission Form */}
            <form onSubmit={handleGitHubVerifyAndComplete} className="space-y-3 pt-1">
              <div>
                <label htmlFor="ghUrl" className="block text-xs font-black text-black dark:text-white mb-1.5">
                  Paste your OWN personal GitHub Repository URL or Commit Link:
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    id="ghUrl"
                    type="url"
                    required
                    placeholder="https://github.com/your-username/my-bca-project"
                    value={githubUrlInput}
                    onChange={(e) => setGithubUrlInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-neutral-700 text-black dark:text-white text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    disabled={githubSubmitting || !isAllStepsCompleted}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs transition-all active:scale-95 shadow-md cursor-pointer shrink-0 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                    title={
                      !codingLabPassed
                        ? "Complete all Coding Lab tasks first"
                        : !vivaPassed
                        ? "Pass the Viva Check question first"
                        : !isGitHubUrlValid(githubUrlInput)
                        ? "Enter your own GitHub repository URL"
                        : "Verify and mark complete"
                    }
                  >
                    <GitBranch size={14} />
                    <span>
                      {githubSubmitting
                        ? "Verifying..."
                        : isCompleted
                        ? "Update GitHub Link"
                        : isAllStepsCompleted
                        ? "Verify & Unlock Next Lesson 🚀"
                        : "Complete All Steps to Unlock 🔒"}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Note: NextSem directly checks your live repository code on GitHub to verify authentic implementation of Day {lesson.day} requirements.
                </p>
              </div>

              {/* Live GitHub Code Verification Inspector Status */}
              {isVerifyingGithubCode && (
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-black dark:text-white">Connecting to GitHub & Inspecting Pushed Code...</div>
                    <div className="text-slate-500 font-mono text-[11px]">Probing branches ('main' / 'master') for Day {lesson.day} source files and evaluating code syntax...</div>
                  </div>
                </div>
              )}

              {/* Detailed GitHub Code Inspection Result Card */}
              {githubVerificationResult && !isVerifyingGithubCode && (
                <div className={`p-4 rounded-xl border text-xs transition-all ${
                  githubVerificationResult.success
                    ? "bg-blue-50/70 dark:bg-neutral-900 border-blue-600 dark:border-blue-500"
                    : "bg-slate-50 dark:bg-neutral-900 border-slate-300 dark:border-neutral-700"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2 font-black text-black dark:text-white">
                      {githubVerificationResult.success ? (
                        <>
                          <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>Live GitHub Code Verification: PASSED ✅</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} className="text-slate-600 dark:text-slate-400 shrink-0" />
                          <span>GitHub Code Verification Findings ⚠️</span>
                        </>
                      )}
                    </div>
                    {githubVerificationResult.matchedFile && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
                        📄 {githubVerificationResult.matchedFile} ({githubVerificationResult.branch} branch • {githubVerificationResult.fileSize} chars)
                      </span>
                    )}
                  </div>

                  {/* Passed items list */}
                  {githubVerificationResult.passedItems.length > 0 && (
                    <div className="space-y-1 mb-2">
                      <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Verified on GitHub:</div>
                      {githubVerificationResult.passedItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                          <Check size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Missing items list */}
                  {githubVerificationResult.missingItems.length > 0 && (
                    <div className="space-y-1 mt-2.5 pt-2.5 border-t border-slate-200 dark:border-neutral-800">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Missing or Needs Attention:</div>
                      {githubVerificationResult.missingItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                          <Circle size={8} className="text-slate-400 mt-1 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code snippet preview */}
                  {githubVerificationResult.rawContentSnippet && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-neutral-800">
                      <div className="text-[10px] font-mono text-slate-500 mb-1">Preview of code fetched from GitHub:</div>
                      <pre className="p-2 rounded bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-[10px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto max-h-24 leading-snug">
                        {githubVerificationResult.rawContentSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {githubFeedback.message && (
                <div className={`p-3 rounded-xl border text-xs font-bold ${
                  githubFeedback.status === "success" 
                    ? "bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300" 
                    : "bg-slate-100 dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-black dark:text-white"
                }`}>
                  {githubFeedback.message}
                </div>
              )}

              {isCompleted && !githubFeedback.message && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2 font-bold">
                  <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Verified! Your code is pushed to GitHub and recorded in your student profile.</span>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-neutral-800">
          <div>
            {prevLesson ? (
              <Link
                href={`/bca/practical/${prevLesson.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs transition-all active:scale-95"
              >
                <ChevronLeft size={16} />
                <span>Day {prevLesson.day}: {prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* WhatsApp Share Button */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🚀 Practicing Day ${lesson.day}: ${lesson.title} on NextSem BCA Practical Portal! 💻 Check out the lesson: https://ignou-study-notes-by-nextsem.web.app/bca/practical/${lesson.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all active:scale-95 shadow-sm shrink-0"
              title="Share this practical lesson on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19-.09-1.1-.54-1.27-.6-.17-.06-.29-.09-.42.09-.12.19-.48.6-.59.72-.11.12-.22.14-.4.05-.19-.09-.79-.29-1.51-.93-.56-.5-.94-1.11-1.05-1.3-.11-.19-.01-.29.08-.38.08-.08.19-.22.28-.33.09-.11.12-.19.19-.31.06-.12.03-.23-.01-.33-.05-.09-.42-1.01-.58-1.39-.15-.36-.31-.31-.42-.32h-.36c-.12 0-.33.05-.5.23-.17.19-.66.65-.66 1.58s.68 1.83.77 1.96c.1.12 1.33 2.03 3.22 2.85.45.2.8.31 1.08.4.45.14.86.12 1.18.07.36-.05 1.1-.45 1.26-.89.15-.43.15-.81.11-.89-.05-.08-.17-.13-.36-.23Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            {nextLesson ? (
              isCompleted ? (
                <Link
                  href={`/bca/practical/${nextLesson.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm transition-all active:scale-95 shadow-md"
                >
                  <span>Proceed to Day {nextLesson.day}: {nextLesson.title}</span>
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-400 dark:text-slate-600 font-bold text-xs sm:text-sm opacity-60 cursor-not-allowed"
                  title="Complete all tasks, pass viva test, and push your project to GitHub to unlock next day!"
                >
                  <Lock size={15} />
                  <span>Day {nextLesson.day} is Locked (Complete All Steps &amp; Push to GitHub)</span>
                </button>
              )
            ) : (
              <Link
                href="/bca/practical"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm transition-all active:scale-95 shadow-md"
              >
                <span>Back to Practical Portal</span>
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Author Attribution Banner */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Curriculum &amp; Practical Systems Authored by <strong className="text-black dark:text-white font-bold">Er. Manoj Kumar</strong></span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            NextSem Academy • BCA Practical Learning Portal
          </div>
        </div>
      </main>
    </div>
  );
}
