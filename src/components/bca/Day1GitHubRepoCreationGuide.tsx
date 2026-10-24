"use client";

import React, { useState, useEffect } from "react";
import { 
  GitBranch, ExternalLink, Play, Pause, RotateCcw, 
  Check, ArrowRight, ArrowLeft, MousePointer,
  CheckCircle2, Copy, Shield, Globe
} from "lucide-react";
import { useCrossDeviceSync } from "@/context/CrossDeviceSyncContext";
import { safeInstantCopy } from "@/lib/clipboard";

interface StepGuide {
  id: number;
  title: string;
  short: string;
  description: string;
  highlightAction: string;
  badge: string;
  targetUrl?: string;
}

const GITHUB_CREATION_STEPS: StepGuide[] = [
  {
    id: 1,
    title: "1. Open github.com/new",
    short: "1. Navigate",
    description: "Open the direct repository creation page on GitHub in a new browser tab.",
    highlightAction: "Navigate to https://github.com/new (or click the '+' icon in GitHub's top-right corner).",
    badge: "Direct URL",
    targetUrl: "https://github.com/new"
  },
  {
    id: 2,
    title: "2. Name Your Repository: bca-practicals",
    short: "2. Name Repo",
    description: "Type a clean repository name like 'bca-practicals' or 'html-css-projects'.",
    highlightAction: "Use lowercase letters with hyphens. Wait for the green checkmark showing it's available.",
    badge: "Repository Name"
  },
  {
    id: 3,
    title: "3. Select 'Public' Visibility",
    short: "3. Set Public",
    description: "Choose 'Public' so your college teachers, viva examiners, and automated verifiers can inspect your code.",
    highlightAction: "Select the Public radio button. (Private repos cannot be verified by college portals).",
    badge: "Visibility"
  },
  {
    id: 4,
    title: "4. Leave 'Add README' Unchecked",
    short: "4. No README",
    description: "Crucial! Do NOT check 'Add a README file', .gitignore, or license.",
    highlightAction: "Leaving it empty allows you to cleanly push your local VS Code folder without merge conflicts.",
    badge: "Initialize Settings"
  },
  {
    id: 5,
    title: "5. Click 'Create repository' Button",
    short: "5. Click Create",
    description: "Click the large green 'Create repository' button at the bottom.",
    highlightAction: "GitHub will instantly create your repository and open your new empty repo page.",
    badge: "Create Action"
  },
  {
    id: 6,
    title: "6. Copy Your HTTPS Repository URL",
    short: "6. Copy URL",
    description: "Copy your repository URL from the 'Quick setup' box on the screen.",
    highlightAction: "Format: https://github.com/your-username/bca-practicals.git",
    badge: "Final Step"
  }
];

export default function Day1GitHubRepoCreationGuide() {
  const { copyAndSyncToCloud } = useCrossDeviceSync();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copiedExampleRepo, setCopiedExampleRepo] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Auto-play animation through steps
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= GITHUB_CREATION_STEPS.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStepData = GITHUB_CREATION_STEPS[activeStep - 1] || GITHUB_CREATION_STEPS[0];

  const handleCopyExampleName = () => {
    copyAndSyncToCloud("bca-practicals", "GitHub Repo Name");
    setCopiedExampleRepo(true);
    setTimeout(() => setCopiedExampleRepo(false), 2000);
  };

  const handleCopyDirectUrl = () => {
    copyAndSyncToCloud("https://github.com/new", "GitHub Creation URL");
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#0c1328] border border-emerald-200 dark:border-emerald-500/30 p-5 sm:p-6 space-y-6 shadow-sm transition-colors">
      
      {/* ── HEADER WITH DIRECT EXACT URL LINK ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#04AA6D] dark:text-emerald-400 font-bold shrink-0 shadow-sm">
            <GitBranch size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-[#04AA6D] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/40 uppercase">
                Day 1 Exclusive Setup
              </span>
              <span className="text-xs font-mono text-slate-500">
                One-Time GitHub Step
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-black dark:text-white tracking-tight mt-0.5">
              How to Create Your Repository on GitHub (Step-by-Step)
            </h2>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#04AA6D] hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <span>Open github.com/new</span>
            <ExternalLink size={13} />
          </a>

          <button
            type="button"
            onClick={handleCopyDirectUrl}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors cursor-pointer"
            title="Copy https://github.com/new"
          >
            {copiedUrl ? <Check size={14} className="text-[#04AA6D]" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* ── STEPPER PILLS NAVIGATOR ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {GITHUB_CREATION_STEPS.map((s) => {
          const isActive = activeStep === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveStep(s.id);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#04AA6D] text-white shadow-md shadow-emerald-500/20 font-extrabold"
                  : "bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <span>{s.short}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          );
        })}
      </div>

      {/* ── MAIN 2-PANEL GRID: ANIMATED GITHUB SIMULATION (Left) vs STEP DETAILS (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* ── LEFT 7 COLUMNS: ANIMATED GITHUB BROWSER SIMULATION ── */}
        <div className="lg:col-span-7 rounded-2xl bg-[#090e1c] border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between">
          
          {/* Simulated Browser Chrome Top Bar */}
          <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300 text-[11px] flex items-center gap-1.5">
                <span className="text-emerald-400">🔒</span>
                <span>https://github.com/new</span>
              </div>
            </div>

            {/* Animation Player Controls */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? "Pause Animation" : "Play Animation"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-emerald-400 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveStep(1);
                  setIsPlaying(true);
                }}
                className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                title="Restart Animation from Step 1"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Simulated GitHub Page Content Canvas */}
          <div className="p-4 sm:p-5 bg-[#0d1117] text-slate-200 font-sans flex-1 space-y-4 text-xs select-none min-h-[300px]">
            
            {/* GitHub Top Nav Header Simulation */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-black text-[10px]">
                  🐙
                </div>
                <span className="font-bold text-white">GitHub</span>
                <span className="text-slate-600">/</span>
                <span>new</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                  +
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                  U
                </div>
              </div>
            </div>

            {/* Page Heading in GitHub */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Create a new repository
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                A repository contains all project files, including the revision history.
              </p>
            </div>

            {/* Form Fields Simulation */}
            <div className="space-y-3 pt-1">
              
              {/* Field 1: Owner / Repository name */}
              <div className={`p-3 rounded-xl border transition-all ${
                activeStep === 2 
                  ? "bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/30" 
                  : "bg-slate-900/40 border-slate-800"
              }`}>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-300">Repository name *</span>
                  {activeStep >= 2 && (
                    <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                      <Check size={11} className="stroke-[3]" />
                      <span>bca-practicals is available.</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                    your-username
                  </div>
                  <span className="text-slate-500">/</span>
                  <div className={`flex-1 px-3 py-1.5 rounded-lg border text-xs flex items-center justify-between ${
                    activeStep >= 2 
                      ? "bg-slate-900 border-emerald-500 text-emerald-300 font-bold" 
                      : "bg-slate-900 border-slate-700 text-slate-500"
                  }`}>
                    <span>{activeStep >= 2 ? "bca-practicals" : "e.g. bca-practicals"}</span>
                    {activeStep === 2 && (
                      <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>

              {/* Field 2: Visibility Radio Buttons */}
              <div className={`p-3 rounded-xl border transition-all ${
                activeStep === 3 
                  ? "bg-emerald-950/20 border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/30" 
                  : "bg-slate-900/40 border-slate-800"
              }`}>
                <div className="flex items-start gap-2.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    activeStep >= 3 
                      ? "border-emerald-400 bg-emerald-500 text-black font-bold" 
                      : "border-slate-600"
                  }`}>
                    {activeStep >= 3 && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                      <Globe size={12} className="text-emerald-400" />
                      <span>Public</span>
                      <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.2 bg-emerald-950/60 rounded border border-emerald-500/30">
                        Required
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Anyone on the internet can see this repository. You choose who can commit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Field 3: Initialize with README (MUST BE UNCHECKED) */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                activeStep === 4 
                  ? "bg-amber-950/20 border-amber-500 shadow-md ring-2 ring-amber-500/30" 
                  : "bg-slate-900/20 border-slate-800/80 opacity-70"
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded border border-slate-600 flex items-center justify-center bg-slate-900">
                    {/* Unchecked */}
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    Add a README file <strong className="text-amber-400">(Leave UNCHECKED)</strong>
                  </span>
                </div>
              </div>

              {/* Field 4: Create Repository Green Button */}
              <div className="pt-1 flex items-center justify-between">
                <div className="text-[10px] font-mono text-slate-500">
                  {activeStep === 5 ? "👉 Clicking Create button..." : "Step 5 action"}
                </div>

                <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                  activeStep >= 5 
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-500/20 scale-102" 
                    : "bg-emerald-700/80 text-white/80 opacity-80"
                }`}>
                  {activeStep === 5 && (
                    <MousePointer size={12} className="animate-bounce text-yellow-300" />
                  )}
                  <span>Create repository</span>
                </div>
              </div>

            </div>

            {/* Step 6 Preview: Repository URL Box */}
            {activeStep >= 6 && (
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/60 space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                  <span>Quick setup — copy your HTTPS URL:</span>
                  <span className="text-white text-[10px]">HTTPS</span>
                </div>

                <div className="p-2 rounded-lg bg-black text-slate-200 font-mono text-[11px] flex items-center justify-between gap-2 border border-slate-800">
                  <span className="truncate text-emerald-400">
                    https://github.com/your-username/bca-practicals.git
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans px-1.5 py-0.5 rounded bg-slate-800 shrink-0">
                    Copied ✓
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Animation Status Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Step {activeStep} of {GITHUB_CREATION_STEPS.length}: {currentStepData.badge}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveStep((prev) => Math.max(1, prev - 1));
                  setIsPlaying(false);
                }}
                disabled={activeStep <= 1}
                className="hover:text-white disabled:opacity-30 cursor-pointer"
                title="Previous Step"
              >
                <ArrowLeft size={13} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveStep((prev) => Math.min(GITHUB_CREATION_STEPS.length, prev + 1));
                  setIsPlaying(false);
                }}
                disabled={activeStep >= GITHUB_CREATION_STEPS.length}
                className="hover:text-white disabled:opacity-30 cursor-pointer"
                title="Next Step"
              >
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>


        {/* ── RIGHT 5 COLUMNS: STEP DETAILS & COPYABLE SHORTCUTS ── */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          
          {/* Active Step Explanation Card */}
          <div className="rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-[#04AA6D] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                {currentStepData.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Step {activeStep} of 6
              </span>
            </div>

            <h3 className="text-base font-black text-black dark:text-white">
              {currentStepData.title}
            </h3>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {currentStepData.description}
            </p>

            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-[#04AA6D] dark:text-emerald-400 text-[11px] uppercase tracking-wider block">
                Action to take:
              </span>
              <p className="text-[11px] leading-relaxed">
                {currentStepData.highlightAction}
              </p>
            </div>

            {/* Quick Helper Button according to step */}
            {activeStep === 1 && (
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#04AA6D] hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Click here to open github.com/new ↗</span>
              </a>
            )}

            {activeStep === 2 && (
              <button
                type="button"
                onClick={handleCopyExampleName}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Copy size={12} />
                <span>{copiedExampleRepo ? "Copied 'bca-practicals'!" : "Copy Repo Name: 'bca-practicals'"}</span>
              </button>
            )}

            {activeStep === 3 && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px]">
                <Shield size={14} className="shrink-0" />
                <span>Public is 100% free on GitHub with unlimited storage for student code.</span>
              </div>
            )}
          </div>

          {/* Quick Checklist for Student */}
          <div className="rounded-2xl p-4 bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Repository Checklist:
            </span>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Name: <strong className="text-black dark:text-white">bca-practicals</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Visibility: <strong className="text-black dark:text-white">Public</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>README: <strong className="text-black dark:text-white">Leave unchecked</strong></span>
              </div>
            </div>
          </div>

          {/* New to GitHub Link */}
          <div className="text-center text-[11px] text-slate-500 font-mono">
            Don&apos;t have a GitHub account yet?{" "}
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#04AA6D] dark:text-emerald-400 font-bold hover:underline"
            >
              Sign up free on github.com ↗
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
