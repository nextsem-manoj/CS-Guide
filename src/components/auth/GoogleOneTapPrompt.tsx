"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { X, AlertCircle, Mail, Lock, Sparkles, LogIn, CheckCircle2 } from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { getNextPracticalDayUrl } from "@/data/bcaPracticalData";

interface GoogleOneTapPromptProps {
  /** If true, renders embedded inside the login gate card instead of fixed top-right */
  embedded?: boolean;
  /** Custom onComplete callback */
  onComplete?: () => void;
}

export default function GoogleOneTapPrompt({ embedded = false, onComplete }: GoogleOneTapPromptProps) {
  const pathname = usePathname();
  const { 
    user, 
    signIn,
    signInWithEmail,
    signInAsGuest,
    signInDirectlyAsStudent
  } = useStudentProgress();

  const [dismissed, setDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState<"inapp" | "google">("inapp");
  
  // In-app direct fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status states
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // If already authenticated or dismissed
  if (user) return null;
  if (!embedded && (dismissed || pathname?.startsWith("/bca/practical"))) return null;

  const handleRedirectAfterLogin = (cleanEmail?: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nextsem_login_redirect_to_next_day");
      const emailVal = cleanEmail || (() => {
        const userRaw = localStorage.getItem("nextsem_user");
        return userRaw ? JSON.parse(userRaw).email : "student";
      })();
      const saved = localStorage.getItem(`nextsem_practical_completed_${emailVal}`);
      const completed: number[] = saved ? JSON.parse(saved) : [];
      const targetUrl = getNextPracticalDayUrl(completed);
      window.location.href = targetUrl;
      return;
    }
    if (onComplete) onComplete();
  };

  // 1. Direct In-App Login (Stays 100% on site, zero popup windows)
  const handleInAppLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Please enter your student email or name.");
      return;
    }
    try {
      setIsVerifying(true);
      setErrorMessage(null);
      
      const cleanEmail = email.trim().toLowerCase();
      // If user provides password, try full email/password auth
      if (password.trim()) {
        const res = await signInWithEmail(cleanEmail, password);
        if (res.success) {
          setSuccessMessage("Signed in successfully! Loading portal...");
          setTimeout(() => handleRedirectAfterLogin(cleanEmail), 400);
          return;
        } else {
          setErrorMessage(res.error || "Invalid credentials.");
        }
      } else {
        // Frictionless instant student login directly on site
        signInDirectlyAsStudent(cleanEmail.split("@")[0] || "Student", cleanEmail.includes("@") ? cleanEmail : `${cleanEmail}@nextsem.student`);
        setSuccessMessage("Instant Student Access granted!");
        setTimeout(() => handleRedirectAfterLogin(cleanEmail), 400);
      }
    } catch (err: any) {
      console.warn("In-app sign-in status:", err);
      setErrorMessage(err?.message || "Failed to sign in. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // 2. Instant 1-Click Access (Zero popup, zero password)
  const handleInstantGuest = () => {
    setIsVerifying(true);
    setErrorMessage(null);
    signInAsGuest("Student");
    setSuccessMessage("Instant Student Access active!");
    setTimeout(() => handleRedirectAfterLogin("guest"), 300);
  };

  // 3. Same-Tab Google Login (Redirects this tab, ZERO popup window)
  const handleContinueWithGoogle = async () => {
    try {
      setIsVerifying(true);
      setErrorMessage(null);
      sessionStorage.setItem("nextsem_login_redirect_to_next_day", "true");
      // In-page same tab redirect: Google opens right in this tab
      await signIn();
    } catch (err: any) {
      console.warn("Google sign-in status:", err);
      if (err?.code === "auth/unauthorized-domain") {
        setErrorMessage("Domain not authorized in Firebase Console yet. Please use Direct In-App Login.");
      } else {
        setErrorMessage("Google sign-in could not be completed. Please try again or use Direct In-App Login.");
      }
      setIsVerifying(false);
    }
  };

  const promptContent = (
    <div 
      className={`rounded-2xl bg-[#0e1424] border border-slate-700/80 shadow-2xl p-4 sm:p-5 text-white select-none transition-all duration-200 overflow-hidden ${
        embedded ? "w-full" : "w-[360px] max-w-[calc(100vw-32px)]"
      }`}
      style={{
        boxShadow: "0 10px 35px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2 truncate">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-[10px] font-bold">
            &lt;/&gt;
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>NextSem Student Login</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-mono">In-App</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">Zero popup windows • In-Site auth</p>
          </div>
        </div>

        {!embedded && (
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/90 border border-slate-800 mt-3 text-xs font-bold">
        <button
          type="button"
          onClick={() => { setActiveTab("inapp"); setErrorMessage(null); }}
          className={`py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "inapp"
              ? "bg-emerald-600 text-white font-extrabold shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <LogIn size={13} />
          <span>Direct In-App</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("google"); setErrorMessage(null); }}
          className={`py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "google"
              ? "bg-[#1a73e8] text-white font-extrabold shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Google (In-Tab)</span>
        </button>
      </div>

      {/* Feedback Alerts */}
      {errorMessage && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Body: Direct In-App Tab */}
      {activeTab === "inapp" && (
        <form onSubmit={handleInAppLogin} className="pt-3 space-y-2.5">
          <div>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Student email or username..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (optional for 1-click)"
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isVerifying ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={13} />
                <span>Sign In Directly (In-App)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleInstantGuest}
            disabled={isVerifying}
            className="w-full py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-medium text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles size={12} className="text-emerald-400" />
            <span>Instant 1-Click Access (0ms)</span>
          </button>
        </form>
      )}

      {/* Body: Google Same-Tab Redirect Tab */}
      {activeTab === "google" && (
        <div className="pt-3 space-y-3">
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Opens Google Login in <strong>this same browser tab</strong> without any separate popup windows.
          </p>

          <button
            type="button"
            onClick={handleContinueWithGoogle}
            disabled={isVerifying}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-60"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Redirecting in this tab...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google (Same Tab)</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 font-mono text-center">
            Zero popup windows • In-Page Redirect
          </p>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return <div className="w-full">{promptContent}</div>;
  }

  return (
    <aside 
      aria-label="Student In-App Login Prompt"
      className="fixed top-16 sm:top-20 right-3 sm:right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {promptContent}
    </aside>
  );
}
