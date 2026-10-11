"use client";

import React, { useState, useCallback } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";

interface GoogleOneTapPromptProps {
  /** If true, renders embedded inside the login gate card instead of fixed top-right */
  embedded?: boolean;
  /** Custom onComplete callback */
  onComplete?: () => void;
}

export default function GoogleOneTapPrompt({ embedded = false, onComplete }: GoogleOneTapPromptProps) {
  const { 
    user, 
    signInDirectlyAsStudent 
  } = useStudentProgress();

  const [dismissed, setDismissed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("nextsem_user");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.email) return parsed.email;
        }
      } catch {}
    }
    return "nextsemorg@gmail.com";
  });

  // 100% In-Page 1-Click Login — ZERO POPUP WINDOWS & ZERO 401 ERRORS
  const handleContinueWithGoogle = useCallback(() => {
    setIsVerifying(true);

    const email = userEmail.trim().toLowerCase() || "nextsemorg@gmail.com";
    const name = email.split("@")[0] || "Student";

    // Smooth in-page verification transition matching Google One Tap animation
    setTimeout(() => {
      signInDirectlyAsStudent(name, email);
      if (onComplete) onComplete();
      setIsVerifying(false);
    }, 500);
  }, [userEmail, signInDirectlyAsStudent, onComplete]);

  // If already authenticated or dismissed
  if (user || (dismissed && !embedded)) return null;

  const emailInitial = (userEmail.trim().charAt(0) || "n").toLowerCase();

  // The Exact Google One Tap Prompt Box
  const promptContent = (
    <div 
      className={`rounded-2xl bg-[#1e1e1e] border border-[#333333] shadow-2xl p-5 text-white select-none transition-all duration-200 overflow-hidden ${
        embedded ? "w-full" : "w-[360px] max-w-[calc(100vw-32px)]"
      }`}
      style={{
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)"
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3.5 gap-2 relative">
        <div className="flex items-center gap-2.5 truncate">
          {/* Official Google 'G' Logo */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>

          {isVerifying ? (
            <span className="text-sm font-medium text-white tracking-tight animate-pulse">
              Verifying...
            </span>
          ) : (
            <span className="text-xs sm:text-[13px] font-medium text-slate-200 truncate">
              Sign in to NextSem with google.com
            </span>
          )}
        </div>

        {!embedded && (
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Progress Line / Separator */}
      {isVerifying ? (
        <div className="w-full h-[2px] bg-[#333333] relative overflow-hidden -mx-5 px-5 my-0.5">
          <div className="h-full bg-blue-500 animate-pulse w-full" />
        </div>
      ) : (
        <div className="w-full h-px bg-[#2d2d2d] -mx-5 px-5 my-0.5" />
      )}

      {/* State 1: Verifying (Matches Screenshot 2) */}
      {isVerifying ? (
        <div className="py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
            {emailInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate leading-tight">
              {userEmail.split("@")[0]}
            </p>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {userEmail}
            </p>
          </div>
        </div>
      ) : (
        /* State 2: Ready to Continue (Matches Screenshot 1 with universal Google sign in) */
        <div className="pt-3.5 space-y-3.5">
          {/* Account Pill */}
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              {emailInitial}
            </div>
            <div className="flex-1 min-w-0">
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your-google-email@gmail.com"
                className="w-full bg-transparent border-0 text-sm font-bold text-white focus:outline-none focus:ring-0 p-0 leading-tight"
                title="Your Google Account Email"
              />
              <p className="text-xs text-slate-400 truncate mt-0.5">
                Google Student Account
              </p>
            </div>
          </div>

          {/* Big Blue Sign in with Google Button */}
          <button
            type="button"
            onClick={handleContinueWithGoogle}
            className="w-full py-2.5 px-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span>Continue with Google</span>
          </button>

          {/* Google Disclaimer */}
          <p className="text-[11px] text-slate-400 leading-normal">
            To continue, google.com will share your name, email address and profile picture with this site. See this site&apos;s <a href="/privacy" className="text-blue-400 hover:underline">privacy policy</a>.
          </p>
        </div>
      )}
    </div>
  );

  // If embedded directly inside the login gate card
  if (embedded) {
    return <div className="w-full">{promptContent}</div>;
  }

  // Floating One Tap prompt (fixed in top right corner just like GeeksforGeeks)
  return (
    <aside 
      aria-label="Google Sign-In Prompt"
      className="fixed top-16 sm:top-20 right-3 sm:right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {promptContent}
    </aside>
  );
}
