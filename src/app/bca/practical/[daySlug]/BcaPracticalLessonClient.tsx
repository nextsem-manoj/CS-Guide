"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Circle, 
  Terminal, Sparkles, Copy, Check, Bug, Lightbulb, GitBranch, 
  BookOpen, HelpCircle, AlertCircle, Share2, Award, Clock, Lock,
  ExternalLink, LogIn, UserCheck, ShieldCheck, Code2, UserPlus,
  Mail, User, Globe, Eye, FileCode
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import { PracticalLesson, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { verifyStudentGitHubCode, GitHubCodeCheckResult, parseGitHubUrl } from "@/lib/githubCodeVerifier";
import ExpectedRepoStructureCard from "@/components/bca/ExpectedRepoStructureCard";
import GoogleOneTapPrompt from "@/components/auth/GoogleOneTapPrompt";
import BugDetectiveLab from "@/components/bca/BugDetectiveLab";
import TerminalCommandBox from "@/components/bca/TerminalCommandBox";
import PracticalLessonExplainer from "@/components/bca/PracticalLessonExplainer";
import MobileToPcCompanionBar from "@/components/bca/MobileToPcCompanionBar";

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

  // Internal Step Tracker within the lesson (1 to 5 or 'all') - Default to 'all'
  const [currentStep, setCurrentStep] = useState<number | "all">("all");
  const [labTab, setLabTab] = useState<"guide" | "preview">("guide");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedGit, setCopiedGit] = useState<boolean>(false);
  const [showBugSolution, setShowBugSolution] = useState<boolean>(false);
  const [showAssignmentBlueprint, setShowAssignmentBlueprint] = useState<boolean>(false);

  // Local VS Code Checklist & Copy States
  const [vsCodeTasksChecked, setVsCodeTasksChecked] = useState<Record<string, boolean>>({});
  const [copiedStarterCode, setCopiedStarterCode] = useState<boolean>(false);
  const [copiedAssignmentCode, setCopiedAssignmentCode] = useState<boolean>(false);
  const [copiedVsCodeCmd, setCopiedVsCodeCmd] = useState<boolean>(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Viva check state
  const [shuffledVivaOptions, setShuffledVivaOptions] = useState<Array<{ text: string; originalIndex: number }>>([]);
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

  // Initialize saved existing repo state
  useEffect(() => {
    if (existingGhUrl) {
      setGithubUrlInput(existingGhUrl);
    }
  }, [existingGhUrl]);

  // Load saved VS Code task checkboxes for student local tracking
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTasks = localStorage.getItem(`nextsem_vscode_tasks_bca_practical_day_${lesson.day}`);
        if (savedTasks) {
          setVsCodeTasksChecked(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error("Failed to check saved vs code tasks", e);
      }
    }
  }, [lesson.day]);

  const toggleVsCodeTask = (taskId: string) => {
    setVsCodeTasksChecked(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem(`nextsem_vscode_tasks_bca_practical_day_${lesson.day}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // If already completed in the past, auto-grant step checks
  useEffect(() => {
    if (isCompleted) {
      setVivaPassed(true);
      setIsVivaSubmitted(true);
    }
  }, [isCompleted]);

  // Dynamically randomize/shuffle Viva options on lesson load
  useEffect(() => {
    if (lesson?.vivaCheck?.options) {
      const items = lesson.vivaCheck.options.map((text, originalIndex) => ({
        text,
        originalIndex
      }));
      // Fisher-Yates unbiased shuffle
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      setShuffledVivaOptions(items);
      setSelectedVivaOption(null);
      if (!isCompleted) {
        setIsVivaSubmitted(false);
        setVivaPassed(false);
      }
    }
  }, [lesson?.slug, lesson?.day, isCompleted]);

  const handleCopyCode = (text: string, type: "demo" | "git" | "starter" | "cmd" | "snippet" | "assignment", snippetId?: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "demo") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else if (type === "git") {
        setCopiedGit(true);
        setTimeout(() => setCopiedGit(false), 2000);
      } else if (type === "starter") {
        setCopiedStarterCode(true);
        setTimeout(() => setCopiedStarterCode(false), 2000);
      } else if (type === "cmd") {
        setCopiedVsCodeCmd(true);
        setTimeout(() => setCopiedVsCodeCmd(false), 2000);
      } else if (type === "assignment") {
        setCopiedAssignmentCode(true);
        setTimeout(() => setCopiedAssignmentCode(false), 2000);
      } else if (type === "snippet" && snippetId) {
        setCopiedSnippetId(snippetId);
        setTimeout(() => setCopiedSnippetId(null), 2000);
      }
    }
  };

  const handleVivaSubmit = () => {
    if (selectedVivaOption === null) return;
    setIsVivaSubmitted(true);
    const selectedItem = shuffledVivaOptions[selectedVivaOption];
    const passed = selectedItem ? selectedItem.originalIndex === lesson.vivaCheck.correctAnswer : false;
    setVivaPassed(passed);
  };

  // Helper to validate personal GitHub repo
  const isGitHubUrlValid = (url: string): boolean => {
    return parseGitHubUrl(url).isValid;
  };

  const isAllStepsCompleted = Boolean(user && vivaPassed && isGitHubUrlValid(githubUrlInput));

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

    // Step 2: Viva Check
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
                    onClick={async () => {
                      setGateError(null);
                      setGateSubmitting(true);
                      try {
                        await signIn();
                      } catch (err: any) {
                        if (err?.code !== "auth/popup-closed-by-user") {
                          setGateError("Google sign-in could not be completed. Please try again.");
                        }
                      } finally {
                        setGateSubmitting(false);
                      }
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

  const padDay = lesson.day < 10 ? `0${lesson.day}` : `${lesson.day}`;
  const targetFolder = `bca-day-${padDay}`;
  const primaryFile = lesson.practicalLab.language === "html" 
    ? "index.html" 
    : lesson.practicalLab.language === "css" 
    ? "style.css" 
    : lesson.practicalLab.language === "c" 
    ? "main.c" 
    : "script.js";
  const vsCodeTerminalCommand = `mkdir ${targetFolder}\ncd ${targetFolder}\ncode .`;

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

        {/* Dual-Device Mobile to PC Companion Bar */}
        <MobileToPcCompanionBar
          day={lesson.day}
          daySlug={lesson.slug}
          lessonTitle={lesson.title}
          primaryFile={primaryFile}
          targetFolder={targetFolder}
          terminalCommand={vsCodeTerminalCommand}
          isCompleted={isCompleted}
        />

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

        {/* Interactive Step Stepper & View Mode Switcher */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Interactive Learning Roadmap
              </span>
              <h2 className="text-sm sm:text-base font-black text-black dark:text-white">
                Day {lesson.day} Step-by-Step Practical Flow
              </h2>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentStep !== "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-neutral-800 hover:text-black dark:hover:text-white"
                }`}
              >
                📑 Step-by-Step
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentStep === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-neutral-800 hover:text-black dark:hover:text-white"
                }`}
              >
                📖 View All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                currentStep === 1
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-neutral-950 text-black dark:text-white border-slate-200 dark:border-neutral-800 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>🎯</span>
                <span className="truncate">1. Concept & Demo</span>
              </div>
              <span className="text-[10px] opacity-80 shrink-0">Step 1</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(2);
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                currentStep === 2
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-neutral-950 text-black dark:text-white border-slate-200 dark:border-neutral-800 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>💻</span>
                <span className="truncate">2. VS Code Lab</span>
              </div>
              {Object.values(vsCodeTasksChecked).filter(Boolean).length === lesson.practicalLab.tasks.length && lesson.practicalLab.tasks.length > 0 ? (
                <span className="text-[10px] font-black text-emerald-400">✔</span>
              ) : (
                <span className="text-[10px] opacity-80 shrink-0">Step 2</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(3);
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                currentStep === 3
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-neutral-950 text-black dark:text-white border-slate-200 dark:border-neutral-800 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>🐛</span>
                <span className="truncate">3. Bug Hunt</span>
              </div>
              <span className="text-[10px] opacity-80 shrink-0">Step 3</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(4);
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                currentStep === 4
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-neutral-950 text-black dark:text-white border-slate-200 dark:border-neutral-800 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>🎓</span>
                <span className="truncate">4. Viva Check</span>
              </div>
              {vivaPassed ? (
                <span className="text-[10px] font-black text-emerald-400">✔</span>
              ) : (
                <span className="text-[10px] opacity-80 shrink-0">Step 4</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(5);
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer col-span-2 sm:col-span-1 flex items-center justify-between gap-1.5 ${
                currentStep === 5
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : isCompleted
                  ? "bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border-blue-400 font-black"
                  : "bg-white dark:bg-neutral-950 text-black dark:text-white border-slate-200 dark:border-neutral-800 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>🚀</span>
                <span className="truncate">5. GitHub Push</span>
              </div>
              {isCompleted ? (
                <span className="text-[10px] font-black text-blue-400">Done</span>
              ) : (
                <span className="text-[10px] opacity-80 shrink-0">Step 5</span>
              )}
            </button>
          </div>
        </div>

        {/* ── STAGE 1: Concepts & Demonstration ── */}
        {(currentStep === 1 || currentStep === "all") && (
          <div>
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

            {/* STEP 2: Comprehensive Lesson Masterclass & Architecture */}
            <div className="mb-8">
              <PracticalLessonExplainer lesson={lesson} />
            </div>

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

              <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-neutral-800 bg-[#090d16]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1322] border-b border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className="text-white font-bold flex items-center gap-2">
                    <FileCode size={13} className="text-blue-400" />
                    <span>{lesson.teacherDemo.title}</span>
                  </span>
                  <span className="uppercase text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-[10px]">
                    {lesson.teacherDemo.language}
                  </span>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-hidden whitespace-pre-wrap break-words break-all sm:break-words text-xs font-mono text-slate-100 leading-relaxed select-all">
                  <code className="whitespace-pre-wrap break-words break-all sm:break-words">{lesson.teacherDemo.code}</code>
                </pre>
              </div>
            </section>

            {/* Stage 1 Footer Navigator */}
            {currentStep !== "all" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 mb-8">
                <div className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
                  <strong className="text-black dark:text-white block font-bold mb-0.5">Concepts Understood?</strong>
                  <span>Open VS Code on your PC to write your code with live interactive checkpoints.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  <span>Start Lab in VS Code</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STAGE 2: Hands-On VS Code Practical Lab ── */}
        {(currentStep === 2 || currentStep === "all") && (
          <div>
            <section id="vscode-lab" className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-7 mb-8 shadow-sm scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-200 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-2 rounded-xl bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
                      <Code2 size={18} />
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-black dark:text-white">
                      2. Hands-On Practical Lab: Follow Instructions in VS Code
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Code like a professional software engineer! Follow the step-by-step instructions below in <strong className="text-black dark:text-white font-bold">Visual Studio Code (VS Code)</strong> on your PC, test your output locally, and push to GitHub.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* View Mode Tabs: Guide vs Live Preview */}
                  <div className="flex items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setLabTab("guide")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                        labTab === "guide"
                          ? "bg-white dark:bg-neutral-950 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <Code2 size={13} />
                      <span>VS Code Guide</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLabTab("preview")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                        labTab === "preview"
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <Globe size={13} />
                      <span>Live Browser Preview</span>
                    </button>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 text-xs font-black">
                    {lesson.practicalLab.tasks.length} Coding Tasks
                  </span>
                </div>
              </div>

              {/* Lab Tab 1: Live Expected Browser Preview */}
              {labTab === "preview" ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 overflow-hidden shadow-inner">
                    {/* Simulated Browser Chrome Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-200/80 dark:bg-neutral-950 border-b border-slate-300 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2 flex items-center gap-1.5">
                          <Globe size={13} className="text-blue-600 dark:text-blue-400" />
                          <span>Expected Browser Output Preview</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                        <span className="text-emerald-500 font-bold">🔒</span>
                        <span>http://localhost:5500/{primaryFile}</span>
                      </div>
                    </div>

                    {/* Preview Content Area */}
                    <div className="p-3 sm:p-5 bg-slate-100 dark:bg-neutral-900 flex justify-center">
                      {lesson.practicalLab.language === "c" ? (
                        <div className="w-full rounded-xl bg-neutral-950 text-emerald-400 p-4 font-mono text-xs border border-neutral-800 shadow-lg min-h-[260px]">
                          <div className="text-slate-500 text-[11px] mb-2 border-b border-neutral-800 pb-1">
                            $ gcc {primaryFile} -o app &amp;&amp; ./app
                          </div>
                          <div className="whitespace-pre-wrap leading-relaxed">
                            {lesson.teacherDemo.explanation}
                          </div>
                        </div>
                      ) : (
                        <iframe
                          title="Live Expected Browser Output"
                          srcDoc={lesson.teacherDemo.code}
                          sandbox="allow-scripts"
                          className="w-full min-h-[380px] bg-white rounded-xl border border-slate-300 dark:border-neutral-800 shadow-md"
                        />
                      )}
                    </div>

                    {/* Browser Footer Helper Bar */}
                    <div className="p-3 bg-white dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>This live preview shows what your webpage looks like when opened with VS Code Live Server.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLabTab("guide")}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer self-start sm:self-auto shrink-0"
                      >
                        ← Back to VS Code Checklist
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Lab Tab 2: Standard Step-by-Step Guide & Tasks Checklist */
                <div className="space-y-6">
                  {/* Guide Step 1: Open VS Code */}
                  <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/60 p-4">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-black dark:text-white mb-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">1</span>
                      <span>Create Project Folder &amp; Open in VS Code</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      Open <strong className="text-black dark:text-white">⊞ Windows Terminal</strong> or Command Prompt on your PC and execute:
                    </p>
                    <TerminalCommandBox
                      commands={vsCodeTerminalCommand}
                      title="Windows 11 Terminal / PowerShell"
                      branch=""
                      cwd={`~/${targetFolder}`}
                      allowOneLiner={true}
                      defaultWrap={true}
                    />
                    <p className="text-[11px] text-slate-500 mt-2">
                      💡 Tip: The command <code className="text-blue-600 dark:text-blue-400 bg-white dark:bg-black px-1.5 py-0.5 rounded border border-slate-200 dark:border-neutral-800 font-mono font-bold">code .</code> immediately opens the new project folder inside Visual Studio Code.
                    </p>
                  </div>

                  {/* Guide Step 2: Create Solution File & Starter Template */}
                  <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/60 p-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-black dark:text-white">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">2</span>
                        <span>Create <code className="text-blue-600 dark:text-blue-400 font-mono">{primaryFile}</code> &amp; Paste Starter Template</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(lesson.practicalLab.initialCode, "starter")}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-black hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                      >
                        {copiedStarterCode ? <Check size={12} className="text-blue-600 dark:text-blue-400" /> : <Copy size={12} />}
                        <span>{copiedStarterCode ? "Copied!" : "Copy Starter Code"}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                      In VS Code Explorer (<code className="text-slate-700 dark:text-slate-300">Ctrl + Shift + E</code>), click <strong>New File</strong>, name it <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">{primaryFile}</code>, and paste this base template:
                    </p>
                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-neutral-900">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-950 border-b border-neutral-800 text-[11px] font-mono text-slate-400">
                        <span className="text-white font-bold">{primaryFile}</span>
                        <span className="uppercase text-blue-400 font-bold">{lesson.practicalLab.language}</span>
                      </div>
                      <pre className="p-4 sm:p-5 overflow-x-hidden whitespace-pre-wrap break-words break-all sm:break-words text-xs font-mono text-white leading-relaxed select-all">
                        <code className="whitespace-pre-wrap break-words break-all sm:break-words">{lesson.practicalLab.initialCode}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Guide Step 3: Implement Tasks Specifications (Checklist) */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-black dark:text-white">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">3</span>
                        <span>Implement Practical Tasks in VS Code (Checklist)</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {Object.values(vsCodeTasksChecked).filter(Boolean).length} / {lesson.practicalLab.tasks.length} Checked
                      </span>
                    </div>

                    <div className="space-y-3">
                      {lesson.practicalLab.tasks.map((task, idx) => {
                        const isChecked = Boolean(vsCodeTasksChecked[task.id]);
                        return (
                          <div 
                            key={task.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isChecked
                                ? "bg-blue-50/50 dark:bg-neutral-900 border-blue-600/40"
                                : "bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-800"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                onClick={() => toggleVsCodeTask(task.id)}
                                className="mt-0.5 text-blue-600 dark:text-blue-400 cursor-pointer shrink-0 hover:scale-110 transition-transform"
                                title={isChecked ? "Mark incomplete" : "Mark done in VS Code"}
                              >
                                {isChecked ? <CheckCircle2 size={18} className="fill-blue-600 text-white dark:text-black" /> : <Circle size={18} />}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 uppercase">
                                    Task {idx + 1}
                                  </span>
                                  <h4 className={`text-xs sm:text-sm font-black text-black dark:text-white ${isChecked ? "line-through text-slate-500 dark:text-slate-400" : ""}`}>
                                    {task.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                                  {task.instruction}
                                </p>

                                {task.hint && (
                                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-1.5">
                                      <Lightbulb size={13} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                      <div>
                                        <strong className="text-black dark:text-white">Syntax / Hint: </strong>
                                        <code className="font-mono text-blue-600 dark:text-blue-400">{task.hint}</code>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyCode(task.hint, "snippet", task.id)}
                                      className="text-slate-500 hover:text-blue-600 text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer"
                                      title="Copy hint snippet"
                                    >
                                      {copiedSnippetId === task.id ? <Check size={11} className="text-blue-600" /> : <Copy size={11} />}
                                      <span>{copiedSnippetId === task.id ? "Copied" : "Copy"}</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guide Step 4: Preview & Local Testing */}
                  <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/60 p-4">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-black dark:text-white mb-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">4</span>
                      <span>Test &amp; Preview Locally on Your PC</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                      {lesson.practicalLab.language === "html" || lesson.practicalLab.language === "css" || lesson.practicalLab.language === "javascript" ? (
                        <>
                          <li>Right-click <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">{primaryFile}</code> in VS Code and select <strong className="text-black dark:text-white">"Open with Live Server"</strong>.</li>
                          <li>Alternatively, open File Explorer, navigate to <code className="text-slate-600 dark:text-slate-400">{targetFolder}</code>, and double-click <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">{primaryFile}</code> to view in Google Chrome or Edge.</li>
                          <li>Verify all elements and styles look correct in the browser before pushing!</li>
                        </>
                      ) : (
                        <>
                          <li>In VS Code, press <code className="text-slate-700 dark:text-slate-300 font-bold">Ctrl + ~</code> to open the integrated terminal.</li>
                          <li>Compile your code with gcc: <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">gcc {primaryFile} -o app</code></li>
                          <li>Run the binary: <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">./app</code> (or <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">app.exe</code> on Windows) to verify output.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Guide Step 5: Ready to push bridge */}
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 flex items-start gap-3">
                    <Sparkles size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      <strong className="text-black dark:text-white block mb-0.5">Code Complete in VS Code? Next Step:</strong>
                      <span>
                        After implementing and verifying your code in VS Code, proceed to <strong className="text-black dark:text-white">Step 3 (Bug Hunt)</strong> and <strong className="text-black dark:text-white">Step 4 (Viva Check)</strong> before executing git push in Step 5!
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Stage 2 Footer Navigator */}
            {currentStep !== "all" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <ChevronLeft size={15} />
                  <span>← Step 1: Concepts &amp; Demo</span>
                </button>

                <div className="text-xs text-slate-500 font-mono text-center">
                  Tasks: {Object.values(vsCodeTasksChecked).filter(Boolean).length} / {lesson.practicalLab.tasks.length} Completed
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(3);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <span>Continue to Bug Hunt</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STAGE 3: Spot-the-Error & Assignment ── */}
        {(currentStep === 3 || currentStep === "all") && (
          <div>
            {/* ── INTERACTIVE BUG DETECTIVE ARENA ── */}
            <BugDetectiveLab
              day={lesson.day}
              title={lesson.debuggingChallenge.title}
              buggyCode={lesson.debuggingChallenge.buggyCode}
              bugExplanation={lesson.debuggingChallenge.bugExplanation}
              fixedCode={lesson.debuggingChallenge.fixedCode}
            />

            {/* STEP 6: Independent Homework Assignment */}
            <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">📝</span>
                  <span>Independent Practice: Assignment</span>
                </h2>
                {lesson.assignment.fileName && (
                  <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    📄 {lesson.assignment.fileName}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-extrabold text-black dark:text-white mb-2">{lesson.assignment.title}</h3>
              
              <ul className="space-y-1.5 mb-4 text-xs text-slate-700 dark:text-slate-300">
                {lesson.assignment.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-400 mb-5">
                <strong className="text-black dark:text-white">Submission Evaluation Criteria: </strong>
                <span>{lesson.assignment.submissionCriteria}</span>
              </div>

              {/* Exact Solution Code with 1-Click Copy-Paste Facility */}
              {lesson.assignment.solutionCode && (
                <div className="rounded-2xl bg-[#0d1117] dark:bg-black border border-slate-700/80 dark:border-neutral-800 p-4 sm:p-5 shadow-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-800 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 font-mono">
                        <FileCode size={15} className="text-emerald-400" />
                        <span>Exact Assignment Solution Code: <strong className="text-emerald-400">{lesson.assignment.fileName || "assignment.html"}</strong></span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(lesson.assignment.solutionCode!, "assignment")}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer ${
                        copiedAssignmentCode
                          ? "bg-emerald-600 text-white shadow-emerald-600/30"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30"
                      }`}
                      title="Copy complete exact code to clipboard"
                    >
                      {copiedAssignmentCode ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy Exact Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-300 dark:text-slate-400 leading-relaxed font-sans">
                    Open Visual Studio Code on your PC (<code className="text-blue-400 font-mono">code .</code>), create <code className="text-emerald-400 font-mono font-bold">{lesson.assignment.fileName || "assignment.html"}</code>, paste this complete step-by-step verified code, test in your browser, and push to your GitHub repo:
                  </p>

                  <div className="relative">
                    <pre className="font-mono text-xs text-emerald-300 dark:text-emerald-400 bg-black/90 p-4 rounded-xl border border-neutral-800 overflow-x-auto max-h-[420px] overflow-y-auto leading-relaxed select-all">
                      <code>{lesson.assignment.solutionCode}</code>
                    </pre>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 size={12} />
                      <span>Verified Assignment Code Solution (100% Tested & Ready to Run)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(lesson.assignment.solutionCode!, "assignment")}
                      className="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer flex items-center gap-1 font-bold"
                    >
                      <Copy size={12} />
                      <span>{copiedAssignmentCode ? "Copied!" : "1-Click Copy Code"}</span>
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Stage 3 Footer Navigator */}
            {currentStep !== "all" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <ChevronLeft size={15} />
                  <span>← Step 2: VS Code Lab</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(4);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <span>Proceed to Viva Check</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STAGE 4: Viva Check ── */}
        {(currentStep === 4 || currentStep === "all") && (
          <div>
            {/* STEP 7: Viva / Knowledge Check */}
            <section id="viva-check" className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 mb-8 shadow-sm scroll-mt-20">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h2 className="text-base font-black text-black dark:text-white flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">🎓</span>
                  <span>4. Viva Check: Mandatory Conceptual Test</span>
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

              <div className="space-y-2.5 mb-4">
                {shuffledVivaOptions.map((item, i) => {
                  const isSelected = selectedVivaOption === i;
                  const isCorrect = item.originalIndex === lesson.vivaCheck.correctAnswer;
                  const optionLetter = String.fromCharCode(65 + i); // 'A', 'B', 'C', 'D'
                  let btnClass = "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-black dark:text-white";

                  if (isVivaSubmitted) {
                    if (isCorrect) {
                      btnClass = "bg-blue-600 border-blue-600 text-white font-bold";
                    } else if (isSelected) {
                      btnClass = "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400";
                    }
                  } else if (isSelected) {
                    btnClass = "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 font-bold";
                  }

                  return (
                    <button
                      key={i}
                      disabled={isVivaSubmitted && vivaPassed}
                      onClick={() => setSelectedVivaOption(i)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5 ${
                          isVivaSubmitted && isCorrect 
                            ? "bg-white text-blue-600" 
                            : isSelected 
                            ? "bg-blue-600 text-white" 
                            : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300"
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="break-words leading-relaxed">{item.text}</span>
                      </div>
                      {isVivaSubmitted && isCorrect && <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              {!isVivaSubmitted ? (
                <button
                  disabled={selectedVivaOption === null}
                  onClick={handleVivaSubmit}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-extrabold text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  Verify Viva Answer
                </button>
              ) : !vivaPassed ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    onClick={() => {
                      setIsVivaSubmitted(false);
                      setSelectedVivaOption(null);
                      // Reshuffle options again on retry so position cannot be memorized
                      setShuffledVivaOptions(prev => {
                        const copy = [...prev];
                        for (let i = copy.length - 1; i > 0; i--) {
                          const j = Math.floor(Math.random() * (i + 1));
                          [copy[i], copy[j]] = [copy[j], copy[i]];
                        }
                        return copy;
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    Incorrect — Reshuffle & Try Again 🔄
                  </button>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    Options have been reshuffled. Think through the concept carefully!
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-blue-600 dark:text-blue-400 block mb-0.5">Explanation:</strong>
                  <span>{lesson.vivaCheck.explanation}</span>
                </div>
              )}
            </section>

            {/* Stage 4 Footer Navigator */}
            {currentStep !== "all" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(3);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <ChevronLeft size={15} />
                  <span>← Step 3: Bug Hunt</span>
                </button>

                <div className="text-xs text-slate-500 font-mono text-center">
                  {vivaPassed ? "✔ Viva Passed" : "Answer correctly to proceed"}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(5);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <span>Final Step: GitHub Push 🚀</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STAGE 5: GitHub Push & Unlock ── */}
        {(currentStep === 5 || currentStep === "all") && (
          <div>
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
                        5. Mandatory Step: Push to GitHub to Unlock Next Lesson
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Target Repo: <code className="text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded font-mono font-bold">{lesson.githubWorkflow.repoName}</code>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terminal Commands Box (Optimized with Word Wrap, Line Numbers, Syntax Highlighting & 1-Click Copy) */}
                <div className="mb-5">
                  <TerminalCommandBox
                    commands={lesson.githubWorkflow.commands}
                    title="Windows 11 Terminal / VS Code"
                    branch="main"
                    repoName={lesson.githubWorkflow.repoName}
                    cwd={`~/${lesson.githubWorkflow.repoName || "html-css-projects"}`}
                    allowOneLiner={true}
                    defaultWrap={true}
                  />
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

                    {/* 2. VS Code Practical Tasks */}
                    <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <Code2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">VS Code Implementation</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(2)} 
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 cursor-pointer"
                      >
                        ✔ Ready in VS Code
                      </button>
                    </div>

                    {/* 3. Viva Check */}
                    <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <HelpCircle size={14} className={vivaPassed ? "text-blue-600 dark:text-blue-400 shrink-0" : "text-slate-400 shrink-0"} />
                        <span className="truncate">Step 4 Viva Check</span>
                      </div>
                      {vivaPassed ? (
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                          ✔ Answer Verified
                        </span>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => setCurrentStep(4)} 
                          className="text-[11px] font-bold text-slate-500 hover:text-blue-600 underline shrink-0 cursor-pointer"
                        >
                          Verify Viva
                        </button>
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
                          !vivaPassed
                            ? "Pass the Viva Check question first"
                            : !isGitHubUrlValid(githubUrlInput)
                            ? "Enter your own GitHub repository URL"
                            : "Verify and mark complete"
                        }
                      >
                        <GitBranch size={14} />
                        <span>
                          {githubSubmitting
                            ? "Verifying on GitHub..."
                            : isCompleted
                            ? "Update GitHub Link"
                            : isAllStepsCompleted
                            ? "Verify & Unlock Next Lesson 🚀"
                            : "Pass Viva & Add Repo to Unlock 🔒"}
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
                        <div className="font-bold text-black dark:text-white">Connecting to GitHub &amp; Inspecting Pushed Code...</div>
                        <div className="text-slate-500 font-mono text-[11px]">Probing branches (&apos;main&apos; / &apos;master&apos;) for Day {lesson.day} source files and evaluating code syntax...</div>
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
                          <pre className="p-3 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-[10px] font-mono text-slate-800 dark:text-slate-200 overflow-x-hidden whitespace-pre-wrap break-words break-all sm:break-words max-h-36 leading-snug">
                            <code className="whitespace-pre-wrap break-words break-all sm:break-words">{githubVerificationResult.rawContentSnippet}</code>
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

                  {isCompleted && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex flex-wrap items-center justify-between gap-3 font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Verified! Your code is pushed to GitHub and recorded in your student profile.</span>
                      </div>
                      <a
                        href={user?.email === "nextsem.academy@gmail.com" ? "https://nextsemacademy-max.github.io/bca-practical/" : (githubUrlInput && githubUrlInput.includes("github.com") ? `https://${githubUrlInput.replace(/https?:\/\/github\.com\//, "").split("/")[0]}.github.io/${githubUrlInput.replace(/https?:\/\/github\.com\//, "").split("/")[1]?.replace(/\.git$/, "") || "bca-practical"}/` : "https://nextsemacademy-max.github.io/bca-practical/")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm transition-all"
                        title="Open Live GitHub Pages Preview"
                      >
                        <ExternalLink size={13} />
                        <span>Live GitHub Pages</span>
                      </a>
                    </div>
                  )}
                </form>
              </div>
            </section>

            {/* Stage 5 Footer Navigator */}
            {currentStep !== "all" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(4);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center"
                >
                  <ChevronLeft size={15} />
                  <span>← Step 4: Viva Check</span>
                </button>
                <span className="text-xs font-mono text-slate-500 text-center">
                  {isCompleted ? "Day Completed! See advance buttons below 🚀" : "Submit Repo URL to Unlock Next Day"}
                </span>
              </div>
            )}
          </div>
        )}

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
