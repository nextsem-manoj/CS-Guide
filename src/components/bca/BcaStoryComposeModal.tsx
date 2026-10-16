"use client";

import React, { useState } from "react";
import { X, Sparkles, Send, CheckCircle2, GitBranch, AlertCircle } from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { getLessonTitleByDay } from "@/data/bcaStoriesData";

interface BcaStoryComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryPublished: (newStory: {
    day: number;
    caption: string;
    githubUrl: string;
  }) => void;
}

export default function BcaStoryComposeModal({
  isOpen,
  onClose,
  onStoryPublished
}: BcaStoryComposeModalProps) {
  const { user, completedDays, githubRepoUrls, githubUsername } = useStudentProgress();

  const latestCompleted = completedDays.length > 0 ? completedDays[completedDays.length - 1] : 1;
  const [selectedDay, setSelectedDay] = useState<number>(latestCompleted);
  const [caption, setCaption] = useState<string>("");
  const [customGithubUrl, setCustomGithubUrl] = useState<string>(
    githubRepoUrls[selectedDay.toString()] || (githubUsername ? `https://github.com/${githubUsername}/bca` : "")
  );
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      setError("Please write a short caption or reflection for your story status.");
      return;
    }

    onStoryPublished({
      day: selectedDay,
      caption: caption.trim(),
      githubUrl: customGithubUrl.trim() || `https://github.com/${githubUsername || "student"}/bca`
    });

    setCaption("");
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="w-full max-w-md bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl relative z-10 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-black dark:text-white">
                Share Coding Status
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Share your practical milestone with the BCA Community
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-900 flex items-center justify-center text-slate-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Compose Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Day Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Practical Day Milestone
            </label>
            <select
              value={selectedDay}
              onChange={(e) => {
                const dayNum = Number(e.target.value);
                setSelectedDay(dayNum);
                if (githubRepoUrls[dayNum.toString()]) {
                  setCustomGithubUrl(githubRepoUrls[dayNum.toString()]);
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  Day {d < 10 ? `0${d}` : d}: {getLessonTitleByDay(d)}
                </option>
              ))}
            </select>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              What did you build or learn?
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Mastered HTML forms & POST methods! Pushed full student registration project to GitHub."
              rows={3}
              maxLength={220}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="text-[11px] text-slate-400 text-right mt-1 font-mono">
              {caption.length}/220 characters
            </div>
          </div>

          {/* GitHub Repo URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Your GitHub Repository URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={customGithubUrl}
                onChange={(e) => setCustomGithubUrl(e.target.value)}
                placeholder="https://github.com/your-username/my-bca-repo"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-black dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <GitBranch size={13} className="absolute left-2.5 top-3 text-slate-400" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Send size={14} />
            <span>Post Story Status Now</span>
          </button>
        </form>
      </div>
    </div>
  );
}
