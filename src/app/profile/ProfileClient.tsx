"use client";

import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, db } from '../../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, Circle, ArrowLeft, LogOut, BookOpen, ArrowRight, Terminal, Download, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import searchIndex from '../../data/searchIndex.json';
import { usePWA } from '../../hooks/usePWA';
import { getChapterUrl } from '../../lib/htmlLessonsHelper';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  photo: string | null;
}

export default function ProfileClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { completedChapters, totalCompleted } = useProgress();
  const { isInstallable, installApp } = usePWA();
  const [terminalStep, setTerminalStep] = useState(0);
  const [terminalCertified, setTerminalCertified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const initials = firebaseUser.displayName
          ? firebaseUser.displayName.split(" ").map(n => n[0]).join("").substring(0, 2)
          : "NS";
        setUser({
          name: firebaseUser.displayName || "Nextsem Student",
          email: firebaseUser.email || "",
          avatar: initials.toUpperCase(),
          photo: firebaseUser.photoURL
        });

        const email = firebaseUser.email || "";
        const localStep = parseInt(localStorage.getItem(`nextsem_terminal_step_${email}`) || "0", 10);
        const localCertified = localStorage.getItem(`nextsem_terminal_certified_${email}`) === "true";
        setTerminalStep(localStep);
        setTerminalCertified(localCertified);

        try {
          const userDocRef = doc(db, "users_progress", firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const dbData = docSnap.data();
            const dbStep = dbData.stepIdx || 0;
            const dbCertified = dbData.courseCertified || false;
            if (dbStep > localStep || (dbStep === localStep && dbCertified)) {
              setTerminalStep(dbStep);
              setTerminalCertified(dbCertified);
              localStorage.setItem(`nextsem_terminal_step_${email}`, dbStep.toString());
              localStorage.setItem(`nextsem_terminal_certified_${email}`, dbCertified.toString());
            }
          }
        } catch (e) {
          console.error("Error loading terminal progress in profile:", e);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Sign-In Error: ", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-Out Error: ", err);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? All progress and data will be lost and cannot be recovered."
    );
    if (!confirmed) return;
    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        await firebaseUser.delete();
        localStorage.removeItem('nextsem_user');
        localStorage.removeItem('nextsem_premium_badge');
        localStorage.removeItem('completed_chapters');
        window.dispatchEvent(new Event('nextsem_auth_changed'));
        router.push('/');
      }
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === 'auth/requires-recent-login') {
        alert("For security, please sign out, sign in again, and then retry account deletion.");
      } else {
        alert("Failed to delete account. Please check your connection and try again.");
      }
    }
  };

  const totalChapters = searchIndex.length;
  const progressPercent = totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0;
  const terminalPercent = terminalCertified ? 100 : Math.round((terminalStep / 10) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-slate-600 border-t-slate-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Top bar */}
      <div className="sticky top-0 z-40 h-14 bg-slate-950/90 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={15} />
          Home
        </Link>
        <span className="text-sm font-semibold text-slate-300">My Profile</span>
        {user && (
          <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-400 transition-colors cursor-pointer">
            <LogOut size={14} />
            Sign out
          </button>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {user ? (
          <>
            {/* ── Profile card ── */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5">
              {user.photo ? (
                <img src={user.photo} alt={user.name} className="w-14 h-14 rounded-full border border-slate-700 shrink-0 object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {user.avatar}
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-white truncate">{user.name}</h1>
                <p className="text-sm text-slate-400 truncate">{user.email}</p>
                <span className="inline-block mt-1.5 text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                  Student
                </span>
              </div>
            </div>

            {/* ── Overall course progress ── */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-slate-400" />
                  <span className="text-sm font-semibold text-slate-200">Course Progress</span>
                </div>
                <span className="text-sm font-semibold text-emerald-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {totalCompleted} of {totalChapters} modules completed
              </p>
            </div>

            {/* ── Terminal CMD progress ── */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={15} className="text-slate-400" />
                  <span className="text-sm font-semibold text-slate-200">Windows CMD Simulator</span>
                </div>
                <span className="text-sm font-semibold text-violet-400">{terminalPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-violet-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${terminalPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {terminalCertified ? "Completed" : `Step ${terminalStep + 1} of 10`}
                </p>
                <Link href="/cmd" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Open Simulator <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* ── PWA install ── */}
            {isInstallable && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Install as App</p>
                  <p className="text-xs text-slate-500 mt-0.5">Add Nextsem to your home screen for quick access and offline learning.</p>
                </div>
                <button
                  onClick={installApp}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-sm font-medium transition-all cursor-pointer shrink-0"
                >
                  <Download size={14} />
                  Install
                </button>
              </div>
            )}

            {/* ── Syllabus checklist ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <BookOpen size={14} className="text-slate-500" />
                <span className="text-sm font-semibold text-slate-300">Syllabus Checklist</span>
                <span className="text-xs text-slate-600 ml-auto">{totalCompleted}/{totalChapters} done</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {searchIndex.map((chapter) => {
                  const isDone = completedChapters[chapter.id];
                  return (
                    <Link
                      key={chapter.id}
                      href={getChapterUrl(chapter.id)}
                      className={`p-3.5 border rounded-xl flex items-center gap-3 transition-all group hover:bg-slate-900 ${
                        isDone ? "border-emerald-800/60 bg-emerald-950/20" : "border-slate-800 bg-slate-900/40"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                      ) : (
                        <Circle size={15} className="text-slate-700 group-hover:text-slate-500 shrink-0 transition-colors" />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="block text-sm text-slate-300 group-hover:text-white truncate transition-colors">{chapter.title}</span>
                        <span className="block text-xs text-slate-600 mt-0.5">{chapter.phase} · {chapter.duration}</span>
                      </div>
                      <ArrowRight size={13} className="text-slate-700 group-hover:text-slate-400 shrink-0 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── Danger zone ── */}
            <div className="border border-slate-800 rounded-2xl p-6">
              <p className="text-sm font-semibold text-slate-300 mb-1">Delete account</p>
              <p className="text-xs text-slate-500 mb-4">
                Permanently removes your progress, saved data, and account. This cannot be undone.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm text-rose-400 border border-rose-900 rounded-xl hover:bg-rose-950 transition-colors cursor-pointer"
              >
                Delete my account
              </button>
            </div>
          </>
        ) : (
          /* ── Guest state: show progress from localStorage ── */
          <div className="space-y-6">
            {/* Guest profile card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                👤
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-white">Guest Learner</h1>
                <p className="text-sm text-slate-400">Progress saved locally on this device</p>
                <span className="inline-block mt-1.5 text-xs text-amber-400/80 bg-amber-950/30 border border-amber-800/30 px-2 py-0.5 rounded">
                  🔓 No login required
                </span>
              </div>
            </div>

            {/* Progress stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-white">{totalCompleted}</p>
                <p className="text-xs text-slate-500 mt-1">Lessons Completed</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-emerald-400">{progressPercent}%</p>
                <p className="text-xs text-slate-500 mt-1">Overall Progress</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="font-semibold">Course Progress</span>
                <span>{totalCompleted} / {totalChapters} chapters</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Soft sign-in upsell — not a gate */}
            <div className="bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border border-blue-800/40 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-900/30 border border-blue-700/30 flex items-center justify-center text-2xl">
                ☁️
              </div>
              <div>
                <p className="text-sm font-bold text-white">Want cloud sync?</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Sign in with Google to backup your progress to the cloud and access it from any device.
                  <br />
                  <span className="text-slate-500 italic">Coming after AdSense approval.</span>
                </p>
              </div>
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold text-sm shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Sign in with Google (optional)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
