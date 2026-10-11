"use client";

import React, { useState, useEffect } from "react";
import { 
  X, LogIn, UserPlus, UserCheck, ShieldCheck, 
  Mail, Lock, User, AlertCircle, Sparkles, CheckCircle2 
} from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function InAppAuthModal({ isOpen, onClose, defaultTab = "login" }: Props) {
  const { 
    signIn, 
    signInWithEmail, 
    signUpWithEmail, 
    signInAsGuest 
  } = useStudentProgress();

  const [activeTab, setActiveTab] = useState<"login" | "signup" | "guest">("login");
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [isOpen, defaultTab]);

  // Close on Escape & prevent scroll
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      const res = await signInWithEmail(email, password);
      if (res.success) {
        setSuccessMsg("Welcome back! Signed in successfully.");
        setTimeout(() => {
          onClose();
        }, 350);
      } else {
        setErrorMsg(res.error || "Failed to log in.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      const res = await signUpWithEmail(name, email, password);
      if (res.success) {
        setSuccessMsg("Account created successfully! Welcome to NextSem.");
        setTimeout(() => {
          onClose();
        }, 350);
      } else {
        setErrorMsg(res.error || "Failed to create account.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestLogin = () => {
    setErrorMsg(null);
    signInAsGuest(name || "Student");
    setSuccessMsg("Guest session active! Instant access granted.");
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleGoogleRedirect = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await signIn();
      onClose();
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setErrorMsg("Google Sign-In failed: " + (err?.message || err));
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 text-black dark:text-white relative flex flex-col gap-5 will-change-transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
              &lt;/&gt;
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-black dark:text-white">
                NextSem Academy
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">In-App Student Authentication</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "login" 
                ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-extrabold shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <LogIn size={14} />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("signup"); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "signup" 
                ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-extrabold shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <UserPlus size={14} />
            <span>Create Account</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ── Tab 1: In-App Sign In Form ── */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Student Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Signing In..." : "Log In to NextSem"}
            </button>
          </form>
        )}

        {/* ── Tab 2: In-App Sign Up Form ── */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Student Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50 mt-1"
            >
              {isSubmitting ? "Creating Account..." : "Create Free Student Account"}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="w-full border-t border-slate-200 dark:border-neutral-800" />
          <span className="absolute bg-white dark:bg-neutral-950 px-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            or instant options
          </span>
        </div>

        {/* Quick Options (No Popup Windows) */}
        <div className="space-y-2">
          {/* In-Page Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleRedirect}
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="In-Page Google Authentication without popup windows"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google (In-Page)</span>
          </button>

          {/* Instant Guest Mode */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <UserCheck size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Continue as Guest (Instant 0ms Access)</span>
          </button>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-400 text-center font-mono">
          Zero popup windows • In-App Secure Authentication
        </p>
      </div>
    </div>
  );
}
