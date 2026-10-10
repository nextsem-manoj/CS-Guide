"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Laptop, Award, CheckCircle2, ChevronRight, ExternalLink, RefreshCw, BarChart3, Clock, Sparkles } from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";

interface Props {
  onAction?: () => void;
}

export default function CbtScoreCard({ onAction }: Props) {
  const { cbtScore, user } = useStudentProgress();
  const [showBreakdown, setShowBreakdown] = useState(false);

  // CBT Exam Link: opens internal CBT route
  const cbtUrl = "/cbt";

  if (!cbtScore) {
    return (
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
              💻
            </div>
            <div>
              <h2 className="text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>Computer Competency Test (CBT)</span>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400">
                  100 MCQs
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Windows OS • Linux • MS Office • Networking • Git • Web Tech
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto">
            Not Attempted Yet
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Test your technical fundamentals with our standard 90-minute Computer-Based Assessment. Submitting your test will automatically certify and link your official score to this student profile!
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-neutral-800">
          <span className="text-[11px] text-slate-500 font-mono">
            Passing Criteria: 60% (60/100 Marks)
          </span>
          <Link
            href={cbtUrl}
            onClick={onAction}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <span>Launch CBT Assessment</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    );
  }

  const isPassed = cbtScore.passed ?? (cbtScore.score >= 60);

  return (
    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            🎓
          </div>
          <div>
            <h2 className="text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span>National Computer Competency</span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
                100 MCQs
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Verified NextSem Assessment Credential
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border flex items-center gap-1.5 ${
            isPassed
              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800"
              : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800"
          }`}>
            <CheckCircle2 size={12} />
            <span>{cbtScore.status || (isPassed ? "PASSED (PROMOTED)" : "NEEDS PRACTICE")}</span>
          </span>
        </div>
      </div>

      {/* 4 Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Score</span>
          <span className="text-xl font-black text-black dark:text-white mt-0.5 block">
            {cbtScore.score} <span className="text-xs text-slate-400 font-normal">/ {cbtScore.totalQuestions || 100}</span>
          </span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block mt-0.5">
            {cbtScore.percentage}% Total
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accuracy</span>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">
            {cbtScore.accuracy}%
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
            Correct / Attempted
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time Elapsed</span>
          <span className="text-xl font-black text-black dark:text-white mt-0.5 block">
            {cbtScore.timeSpentFormatted || (cbtScore.timeSpentSeconds ? `${Math.floor(cbtScore.timeSpentSeconds / 60)}m ${cbtScore.timeSpentSeconds % 60}s` : "90m")}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
            90m Max Allowed
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Certified Date</span>
          <span className="text-sm font-black text-black dark:text-white mt-1.5 block truncate">
            {cbtScore.submittedAt ? new Date(cbtScore.submittedAt).toLocaleDateString(undefined, { dateStyle: "medium" }) : "Recent"}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Cloud Synced
          </span>
        </div>
      </div>

      {/* Category Breakdown Toggle & Bars */}
      {cbtScore.categoryStats && Object.keys(cbtScore.categoryStats).length > 0 && (
        <div className="space-y-2">
          <button
            onClick={() => setShowBreakdown(prev => !prev)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <BarChart3 size={13} />
            <span>{showBreakdown ? "Hide Topic Proficiency Breakdown" : "View Topic Proficiency Breakdown (9 Sections)"}</span>
          </button>

          {showBreakdown && (
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-2.5 animate-in fade-in duration-200">
              {Object.entries(cbtScore.categoryStats).map(([cat, stat]) => {
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-700 dark:text-slate-300">{cat}</span>
                      <span className="font-mono text-slate-500">
                        <strong>{stat.correct}</strong> / {stat.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-neutral-800">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span>🔒 Certified under Google Account:</span>
          <strong className="text-black dark:text-white font-mono">{user?.email || "Google Verified"}</strong>
        </span>

        <div className="flex items-center gap-2">
          <Link
            href={cbtUrl}
            onClick={onAction}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all"
          >
            <span>Review Answers & Retake</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
