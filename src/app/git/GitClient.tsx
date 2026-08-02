"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, GitBranch, ArrowLeft, LogOut, Search, Play, CheckCircle2, Lock, Menu, X, ChevronRight, RefreshCw, Award } from "lucide-react";
import { auth, signInWithGoogle } from "../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ThemeToggle } from "../../components/ThemeToggle";

interface StepType {
  id: string;
  title: string;
  instruction: string;
  expectedCommand: string;
  hint: string;
  successMsg: string;
}

const GIT_SIMULATOR_STEPS: StepType[] = [
  {
    id: "init",
    title: "Initialize Git Repository",
    instruction: "Create an empty local Git repository inside your project folder. Type `git init` and press Enter.",
    expectedCommand: "git init",
    hint: "git init",
    successMsg: "Initialized empty Git repository in C:\\Nextsem\\projects\\advanced-react\\.git\\"
  },
  {
    id: "status",
    title: "Check Repository Status",
    instruction: "Check the status of your workspace files to see what modifications are untracked. Type `git status` and press Enter.",
    expectedCommand: "git status",
    hint: "git status",
    successMsg: "On branch master\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tREADME.md\n\tpackage.json\n\tsrc/\n\nnothing added to commit but untracked files present (use \"git add\" to track)"
  },
  {
    id: "add",
    title: "Stage Modified Files",
    instruction: "Stage all project files to prepare them for the upcoming commit snapshot. Type `git add .` and press Enter.",
    expectedCommand: "git add .",
    hint: "git add .",
    successMsg: "All files (README.md, package.json, src/*) added to staging area successfully."
  },
  {
    id: "commit",
    title: "Commit Staged Changes",
    instruction: "Save staged snapshots permanently into your local repository commit tree. Type `git commit -m \"initial commit\"` and press Enter.",
    expectedCommand: 'git commit -m "initial commit"',
    hint: 'git commit -m "initial commit"',
    successMsg: "[master (root-commit) 8fb3f2a] initial commit\n 3 files changed, 142 insertions(+)\n create mode 100644 README.md\n create mode 100644 package.json\n create mode 100644 src/App.js"
  },
  {
    id: "branch",
    title: "Rename Default Branch",
    instruction: "Rename your main default branch to 'main' to match standard server hosting defaults. Type `git branch -M main` and press Enter.",
    expectedCommand: "git branch -M main",
    hint: "git branch -M main",
    successMsg: "Default branch successfully renamed to 'main'."
  },
  {
    id: "remote",
    title: "Add GitHub Remote Host",
    instruction: "Connect your local repository origin mapping link to a remote GitHub hosting server. Type `git remote add origin https://github.com/nextsem/starter.git` and press Enter.",
    expectedCommand: "git remote add origin https://github.com/nextsem/starter.git",
    hint: "git remote add origin https://github.com/nextsem/starter.git",
    successMsg: "Remote 'origin' successfully connected to https://github.com/nextsem/starter.git"
  },
  {
    id: "push",
    title: "Push Changes to Origin",
    instruction: "Upload all local main commits to your remote repository origin host. Type `git push -u origin main` and press Enter.",
    expectedCommand: "git push -u origin main",
    hint: "git push -u origin main",
    successMsg: "Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (5/5), 3.2 KiB | 3.2 MiB/s, done.\nTo https://github.com/nextsem/starter.git\n * [new branch]      main -> main\nbranch 'main' set up to track remote branch 'main' from 'origin'."
  },
  {
    id: "checkout-b",
    title: "Create & Switch Branches",
    instruction: "Create a feature branch named 'feature-dev' and switch to it immediately to isolate updates. Type `git checkout -b feature-dev` and press Enter.",
    expectedCommand: "git checkout -b feature-dev",
    hint: "git checkout -b feature-dev",
    successMsg: "Switched to a new branch 'feature-dev'"
  },
  {
    id: "checkout-main",
    title: "Switch Back to Main Branch",
    instruction: "Check out back to your stable 'main' branch to prepare for merging changes. Type `git checkout main` and press Enter.",
    expectedCommand: "git checkout main",
    hint: "git checkout main",
    successMsg: "Switched to branch 'main'\nYour branch is up to date with 'origin/main'."
  },
  {
    id: "merge",
    title: "Merge Feature Branch Changes",
    instruction: "Merge the commits from your 'feature-dev' branch into 'main' to apply updates. Type `git merge feature-dev` and press Enter.",
    expectedCommand: "git merge feature-dev",
    hint: "git merge feature-dev",
    successMsg: "Updating 8fb3f2a..1b4a8e2\nFast-forward\n README.md | 4 +++-\n 1 file changed, 3 insertions(+), 1 deletion(-)\nMerge completed successfully!"
  },
  {
    id: "log",
    title: "View Commit History Logs",
    instruction: "Inspect the commit tree timeline history to see all logged code snapshots. Type `git log` and press Enter.",
    expectedCommand: "git log",
    hint: "git log",
    successMsg: "commit 1b4a8e2fd99ea5c7b399d885a0c99f09e2cf3b2a (HEAD -> main, feature-dev)\nAuthor: Manoj <manoj@nextsem.dev>\nDate:   Thu Jul 16 12:00:00 2026 +0530\n\n    update readme instructions\n\ncommit 8fb3f2a5c7b399d885a0c99f09e2cf3b2a8fb3f2a (origin/main)\nAuthor: Manoj <manoj@nextsem.dev>\nDate:   Thu Jul 16 11:30:00 2026 +0530\n\n    initial commit"
  },
  {
    id: "pull",
    title: "Pull Remote Repo Updates",
    instruction: "Fetch updates from your remote host and merge them into your current local directory. Type `git pull origin main` and press Enter.",
    expectedCommand: "git pull origin main",
    hint: "git pull origin main",
    successMsg: "From https://github.com/nextsem/starter\n * branch            main       -> FETCH_HEAD\nAlready up to date."
  },
  {
    id: "stash",
    title: "Stash Workspace Modifications",
    instruction: "Temporarily stash modified tracked changes to clear your workspace index without losing files. Type `git stash` and press Enter.",
    expectedCommand: "git stash",
    hint: "git stash",
    successMsg: "Saved working directory and index state WIP on main: 1b4a8e2 update readme instructions"
  },
  {
    id: "stash-list",
    title: "List Workspace Stashes",
    instruction: "List all stashes recorded in your local repository tracking list. Type `git stash list` and press Enter.",
    expectedCommand: "git stash list",
    hint: "git stash list",
    successMsg: "stash@{0}: WIP on main: 1b4a8e2 update readme instructions"
  },
  {
    id: "stash-pop",
    title: "Restore Stashed Modifications",
    instruction: "Restore and apply the latest stashed workspace modifications back to your local folder. Type `git stash pop` and press Enter.",
    expectedCommand: "git stash pop",
    hint: "git stash pop",
    successMsg: "On branch main\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n\tmodified:   src/App.js\n\nDropped stash@{0} (1b4a8e2fd99ea5c7b399d885a0c99f09e2cf3b2a)"
  },
  {
    id: "diff",
    title: "Inspect File Differences",
    instruction: "View differences between your unstaged changes and the latest commit snapshot. Type `git diff` and press Enter.",
    expectedCommand: "git diff",
    hint: "git diff",
    successMsg: "diff --git a/src/App.js b/src/App.js\nindex e69de29..8bb3a1f 100644\n--- a/src/App.js\n+++ b/src/App.js\n@@ -1,3 +1,4 @@\n+import React from ''; font changes detected."
  },
  {
    id: "reset",
    title: "Unstage File Staging",
    instruction: "Unstage a staged file from the index to prevent it from committing. Type `git reset HEAD README.md` and press Enter.",
    expectedCommand: "git reset HEAD README.md",
    hint: "git reset HEAD README.md",
    successMsg: "Unstaged changes after reset:\nM\tREADME.md"
  },
  {
    id: "rm-cached",
    title: "Untrack Staged Files",
    instruction: "Remove a file from Git tracking without deleting it from your local disk. Type `git rm --cached README.md` and press Enter.",
    expectedCommand: "git rm --cached README.md",
    hint: "git rm --cached README.md",
    successMsg: "rm 'README.md'\nRemoved README.md tracking index successfully."
  },
  {
    id: "tag",
    title: "Create Release Tags",
    instruction: "Create an annotated tag to mark a specific release milestone. Type `git tag -a v1.0.0 -m \"version 1.0\"` and press Enter.",
    expectedCommand: 'git tag -a v1.0.0 -m "version 1.0"',
    hint: 'git tag -a v1.0.0 -m "version 1.0"',
    successMsg: "Tag 'v1.0.0' successfully created."
  },
  {
    id: "push-tags",
    title: "Upload Release Tags",
    instruction: "Push your local release tags to the remote repository origin server. Type `git push origin --tags` and press Enter.",
    expectedCommand: "git push origin --tags",
    hint: "git push origin --tags",
    successMsg: "To https://github.com/nextsem/starter.git\n * [new tag]         v1.0.0 -> v1.0.0"
  },
  {
    id: "log-oneline",
    title: "View Compact Commit Logs",
    instruction: "Display commit history in a compact, single-line format. Type `git log --oneline` and press Enter.",
    expectedCommand: "git log --oneline",
    hint: "git log --oneline",
    successMsg: "1b4a8e2 update readme instructions\n8fb3f2a initial commit"
  },
  {
    id: "show-head",
    title: "Show Commit Details",
    instruction: "View detailed information and code diff changes of the latest commit. Type `git show HEAD` and press Enter.",
    expectedCommand: "git show HEAD",
    hint: "git show HEAD",
    successMsg: "commit 1b4a8e2fd99ea5c7b399d885a0c99f09e2cf3b2a\nAuthor: Manoj <manoj@nextsem.dev>\nDate:   Thu Jul 16 12:00:00 2026 +0530\n\n    update readme instructions\n\n- old text\n+ new text"
  },
  {
    id: "config-name",
    title: "Configure User Name",
    instruction: "Set your global git author name. Type `git config --global user.name \"Manoj\"` and press Enter.",
    expectedCommand: 'git config --global user.name "Manoj"',
    hint: 'git config --global user.name "Manoj"',
    successMsg: "Global user.name configured to 'Manoj'."
  },
  {
    id: "config-email",
    title: "Configure User Email",
    instruction: "Set your global git author email. Type `git config --global user.email \"manoj@nextsem.dev\"` and press Enter.",
    expectedCommand: 'git config --global user.email "manoj@nextsem.dev"',
    hint: 'git config --global user.email "manoj@nextsem.dev"',
    successMsg: "Global user.email configured to 'manoj@nextsem.dev'."
  },
  {
    id: "remote-v",
    title: "List Remote Connections",
    instruction: "Inspect all configured remote repository url mappings. Type `git remote -v` and press Enter.",
    expectedCommand: "git remote -v",
    hint: "git remote -v",
    successMsg: "origin\thttps://github.com/nextsem/starter.git (fetch)\norigin\thttps://github.com/nextsem/starter.git (push)"
  },
  {
    id: "branch-list",
    title: "List Local Branches",
    instruction: "List all local branches in your current repository workspace. Type `git branch` and press Enter.",
    expectedCommand: "git branch",
    hint: "git branch",
    successMsg: "  feature-dev\n* main"
  },
  {
    id: "branch-del",
    title: "Delete Local Branches",
    instruction: "Delete a local branch after merging its changes safely. Type `git branch -d feature-dev` and press Enter.",
    expectedCommand: "git branch -d feature-dev",
    hint: "git branch -d feature-dev",
    successMsg: "Deleted branch feature-dev (was 1b4a8e2)."
  },
  {
    id: "fetch-origin",
    title: "Fetch Remote References",
    instruction: "Download refs and objects from remote origin without merging. Type `git fetch origin` and press Enter.",
    expectedCommand: "git fetch origin",
    hint: "git fetch origin",
    successMsg: "Fetching origin\nFrom https://github.com/nextsem/starter.git\n * [new branch]      dev -> origin/dev"
  },
  {
    id: "track-remote",
    title: "Track Remote Branch",
    instruction: "Create and checkout a local branch tracking a remote server branch. Type `git checkout -b dev origin/dev` and press Enter.",
    expectedCommand: "git checkout -b dev origin/dev",
    hint: "git checkout -b dev origin/dev",
    successMsg: "Switched to a new branch 'dev'\nbranch 'dev' set up to track remote branch 'dev' from 'origin'."
  },
  {
    id: "clean-df",
    title: "Clean Untracked Files",
    instruction: "Force-remove untracked files and directories from your workspace. Type `git clean -df` and press Enter.",
    expectedCommand: "git clean -df",
    hint: "git clean -df",
    successMsg: "Removing temp_cache/\nRemoving debug.log"
  },
  {
    id: "branch-all",
    title: "List Remote & Local Branches",
    instruction: "List all local and remote-tracking branches available in your repository. Type `git branch -a` and press Enter.",
    expectedCommand: "git branch -a",
    hint: "git branch -a",
    successMsg: "* main\n  remotes/origin/main\n  remotes/origin/dev"
  },
  {
    id: "diff-staged",
    title: "Inspect Staged Differences",
    instruction: "View modifications staged for the next commit snapshot against the latest commit. Type `git diff --staged` and press Enter.",
    expectedCommand: "git diff --staged",
    hint: "git diff --staged",
    successMsg: "diff --git a/README.md b/README.md\nindex d1492b4..f812cb4 10544\n--- a/README.md\n+++ b/README.md\n@@ -1,2 +1,3 @@\n+# Nextsem Academy Version Control Guide"
  },
  {
    id: "checkout-discard",
    title: "Discard Working Copy Changes",
    instruction: "Discard all unstaged local modifications in a tracked file to revert to the HEAD state. Type `git checkout -- README.md` and press Enter.",
    expectedCommand: "git checkout -- README.md",
    hint: "git checkout -- README.md",
    successMsg: "Reverted unstaged modifications in README.md successfully."
  },
  {
    id: "cherry-pick",
    title: "Apply Specific Commit Changes",
    instruction: "Cherry-pick and apply changes from a specific commit hash onto your current branch. Type `git cherry-pick 8fb3f2a` and press Enter.",
    expectedCommand: "git cherry-pick 8fb3f2a",
    hint: "git cherry-pick 8fb3f2a",
    successMsg: "[main 4f12d5a] initial commit\n Date: Thu Jul 16 11:30:00 2026 +0530\n 1 file changed, 1 insertion(+)"
  },
  {
    id: "remote-rename",
    title: "Rename Remote Aliases",
    instruction: "Rename your configured remote origin server alias to 'upstream'. Type `git remote rename origin upstream` and press Enter.",
    expectedCommand: "git remote rename origin upstream",
    hint: "git remote rename origin upstream",
    successMsg: "Renamed remote origin reference to upstream successfully."
  },
  {
    id: "remote-rm",
    title: "Remove Remote Mappings",
    instruction: "Remove a remote connection link from your local repository tracking list. Type `git remote rm upstream` and press Enter.",
    expectedCommand: "git remote rm upstream",
    hint: "git remote rm upstream",
    successMsg: "Remote upstream reference successfully removed."
  },
  {
    id: "commit-amend",
    title: "Amend Latest Commit",
    instruction: "Modify and overwrite your latest local commit details or files in place. Type `git commit --amend -m \"updated initial commit\"` and press Enter.",
    expectedCommand: 'git commit --amend -m "updated initial commit"',
    hint: 'git commit --amend -m "updated initial commit"',
    successMsg: "[main 7d21b4a] updated initial commit\n Date: Thu Jul 16 11:30:00 2026 +0530\n 3 files changed, 142 insertions(+)"
  },
  {
    id: "reflog",
    title: "Inspect Reference Logs",
    instruction: "View the local reference log history recording branch tip movements. Type `git reflog` and press Enter.",
    expectedCommand: "git reflog",
    hint: "git reflog",
    successMsg: "7d21b4a HEAD@{0}: commit (amend): updated initial commit\n1b4a8e2 HEAD@{1}: merge feature-dev: Fast-forward\n8fb3f2a HEAD@{2}: checkout: switching from dev to main"
  },
  {
    id: "reset-hard",
    title: "Hard Reset Commit History",
    instruction: "Reset your current branch HEAD to a previous commit, discarding all working copy edits. Type `git reset --hard HEAD~1` and press Enter.",
    expectedCommand: "git reset --hard HEAD~1",
    hint: "git reset --hard HEAD~1",
    successMsg: "HEAD is now at 1b4a8e2 update readme instructions"
  },
  {
    id: "describe-tags",
    title: "Describe Latest Tag Commit",
    instruction: "Find the most recent tag reachable from a commit and construct a human-readable name. Type `git describe --tags` and press Enter.",
    expectedCommand: "git describe --tags",
    hint: "git describe --tags",
    successMsg: "v1.0.0-1-g1b4a8e2\nAll 40 Git mastery steps completed! You are now a master of advanced version control systems! +4000 XP!"
  }
];

interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  exp: string;
}

const GIT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "Which command initializes a new local Git repository in your current working folder?",
    options: ["git init", "git create", "git start", "git setup"],
    correct: 0,
    exp: "'git init' creates an empty .git directory structure which begins tracking file modifications inside the folder."
  },
  {
    q: "What is the primary purpose of running `git add .`?",
    options: [
      "To download remote code to your PC",
      "To stage all modified and untracked files for the upcoming commit",
      "To save changes directly to the permanent commit log",
      "To upload files to GitHub remote hosting"
    ],
    correct: 1,
    exp: "`git add .` stages all new, modified, and deleted files. It flags them in the indexing queue before they are permanently snapshotted by a commit."
  },
  {
    q: "Which command saves staged changes permanently in the local repository commit history?",
    options: ["git push", "git save", "git upload", "git commit -m \"message\""],
    correct: 3,
    exp: "`git commit -m \"message\"` saves a snapshot of the staging area to the local history timeline. The -m flag attaches a descriptive message."
  },
  {
    q: "How do you create a new branch named 'feature-auth' and switch to it immediately?",
    options: [
      "git branch feature-auth",
      "git checkout -b feature-auth",
      "git switch main",
      "git checkout main"
    ],
    correct: 1,
    exp: "`git checkout -b <name>` creates a new branch and checks it out in a single unified operation."
  },
  {
    q: "Which command uploads your local commits to a remote hosting platform like GitHub?",
    options: ["git push", "git pull", "git merge", "git remote origin"],
    correct: 0,
    exp: "`git push` uploads your local repository commits to the corresponding upstream remote branches."
  }
];

export default function GitClient() {
  const [user, setUser] = useState<{ uid: string; name: string; email: string; avatar: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [stepIdx, setStepIdx] = useState(0); // Highest progress index
  const [activeStepIdx, setActiveStepIdx] = useState(0); // Selected lesson index
  const [view, setView] = useState<"lesson" | "quiz">("lesson");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Quiz interactive state
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const loadProgress = async (currentUser: { uid: string; email: string }) => {
    try {
      const docRef = doc(db, "users_progress", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.gitStep !== undefined) {
          setStepIdx(data.gitStep);
          return;
        }
      }
      const localStep = localStorage.getItem(`nextsem_git_step_${currentUser.email}`);
      if (localStep) setStepIdx(parseInt(localStep, 10));
    } catch (e) {
      console.error("Firestore loading error", e);
    }
  };

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setAuthLoading(true);
      if (currentUser) {
        const u = {
          uid: currentUser.uid,
          name: currentUser.displayName || "Developer",
          email: currentUser.email || "",
          avatar: currentUser.photoURL || ""
        };
        setUser(u);
        await loadProgress(u);
      } else {
        setUser(null);
        const localStep = localStorage.getItem("nextsem_git_step_guest");
        if (localStep) setStepIdx(parseInt(localStep, 10));
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to cross-window storage progress changes
  useEffect(() => {
    const handleStorage = () => {
      const key = user ? `nextsem_git_step_${user.email}` : "nextsem_git_step_guest";
      const localStep = localStorage.getItem(key);
      if (localStep) {
        setStepIdx(parseInt(localStep, 10));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user]);

  const handleSignOut = async () => {
    if (confirm("Sign out of Nextsem Academy?")) {
      try {
        await signOut(auth);
        setUser(null);
      } catch (e) {
        console.error("Sign out failed", e);
      }
    }
  };

  const openTerminalWindow = (stepNumber: number) => {
    window.open(`/git/terminal?step=${stepNumber}`, "_blank");
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizAnswered) return;
    setQuizSelectedOption(optionIdx);
    setQuizAnswered(true);
    if (optionIdx === GIT_QUIZ_QUESTIONS[quizStep].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  const handleQuizNext = () => {
    setQuizSelectedOption(null);
    setQuizAnswered(false);
    if (quizStep < GIT_QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleQuizReset = () => {
    setQuizStep(0);
    setQuizSelectedOption(null);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizFinished(false);
  };

  const filteredSteps = GIT_SIMULATOR_STEPS.filter(
    (step) =>
      step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.expectedCommand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.instruction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeStep = GIT_SIMULATOR_STEPS[activeStepIdx];

  // Render Sidebar Content (Shared Desktop/Mobile)
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between select-none">
      <div className="flex flex-col gap-6 flex-1 min-h-0 overflow-y-auto pr-1">
        <Link href="/" className="flex items-center gap-2 select-none group shrink-0">
          <img src="/logo.svg" alt="Nextsem Logo" className="w-8 h-8 rounded-lg border border-emerald-500/20 group-hover:scale-105 transition-transform select-none" />
          <span className="font-black text-base tracking-tight text-white uppercase">
            Nextsem<span className="text-[#04AA6D] lowercase font-bold">.online</span>
          </span>
        </Link>

        {/* Search Filter */}
        <div className="relative shrink-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Search size={12} />
          </span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter lessons..."
            className="w-full bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-xl py-1.5 pl-8 pr-3 text-[10px] text-slate-350 outline-none transition-colors"
          />
        </div>

        {/* Scrollable list */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block px-2">Git Lessons (40)</span>
          <div className="space-y-1 max-h-[300px] lg:max-h-[350px] overflow-y-auto scrollbar-thin">
            {filteredSteps.map((step) => {
              const globalIdx = GIT_SIMULATOR_STEPS.findIndex((s) => s.id === step.id);
              const isLocked = globalIdx > stepIdx;
              const isActive = view === "lesson" && globalIdx === activeStepIdx;
              const isDone = globalIdx < stepIdx;

              return (
                <button
                  key={step.id}
                  disabled={isLocked}
                  onClick={() => {
                    setView("lesson");
                    setActiveStepIdx(globalIdx);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between border ${
                    isActive 
                      ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-400"
                      : isLocked
                      ? "opacity-35 border-transparent text-slate-500 cursor-not-allowed"
                      : "hover:bg-slate-850/50 border-transparent text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="truncate pr-1.5">{globalIdx + 1}. {step.title}</span>
                  {isDone && <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />}
                  {isLocked && <Lock size={9} className="text-slate-550 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quizzes & Practice Exercises */}
        <div className="space-y-1.5 shrink-0 pt-2 border-t border-slate-850/50">
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block px-2">Practice & Assess</span>
          <button
            onClick={() => {
              setView("quiz");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 border ${
              view === "quiz"
                ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                : "hover:bg-slate-850/50 border-transparent text-slate-300 hover:text-white"
            }`}
          >
            <Award size={13} className="shrink-0" />
            <span>📝 Practice Quiz</span>
          </button>
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col gap-4 border-t border-slate-800/60 pt-4 shrink-0">
        {/* Theme toggle removed */}
        
        {user ? (
          <div className="flex flex-col gap-3 bg-slate-950/20 border border-slate-850/50 rounded-xl p-3">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-slate-800" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-650 to-violet-650 text-white flex items-center justify-center font-black text-xs">
                  {user.name[0]}
                </div>
              )}
              <div className="text-left leading-none">
                <span className="block text-[10px] font-black text-white">{user.name}</span>
                <span className="text-[7px] text-slate-500 font-bold">{user.email ? user.email.split('@')[0] + '.dev' : 'guest.dev'}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 select-none text-[9px] font-black">
              <div className="flex items-center justify-between">
                <span className="text-[#39FF14]">⚡ Git Level {Math.min(40, stepIdx + 1)}/40</span>
              </div>
            </div>

            <button onClick={handleSignOut} className="w-full py-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer border-none">
              <LogOut size={10} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <button onClick={signInWithGoogle} className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-none">
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-92px)] bg-[#060813] text-slate-100 font-sans relative selection:bg-[#c1a648]/30">

      {/* Header bar */}
      <header className="w-full px-4 md:px-6 py-3 bg-[#090d22]/30 border-b border-slate-800/60 sticky top-[92px] z-20 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger removed — handled by layout */}
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400 block">Version Control</span>
            <h1 className="text-sm font-black text-white uppercase tracking-tight">🐙 Git Reference Textbook</h1>
          </div>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/20 px-3 py-1 rounded-full">
          Completed: {stepIdx}/40 Steps
        </span>
      </header>

      {/* Content Container */}
      <div className="max-w-3xl w-full mx-auto px-4 md:px-6 py-8 space-y-8 flex-1" style={{ fontFamily: 'Verdana, sans-serif' }}>
          
          {view === "lesson" ? (
            <div className="space-y-6">
              
              {/* Active Lesson details card */}
              <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 md:p-8 space-y-6 animate-in fade-in duration-200">
                <div className="space-y-3.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded border bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                      Lesson {activeStepIdx + 1} of 40
                    </span>
                    {activeStepIdx < stepIdx && <CheckCircle2 size={12} className="text-emerald-400" />}
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-theme-text tracking-tight">
                    {activeStep.title}
                  </h2>
                  
                  <p className="text-[15px] text-theme-text/80 leading-[1.5] font-normal">
                    {activeStep.instruction}
                  </p>
                </div>

                {/* Code syntax reference block */}
                <div className="space-y-2 text-left">
                  <span className="text-[9px] font-black uppercase text-theme-text-muted tracking-wider block">Syntax Reference</span>
                  <div className="w-full bg-theme-bg border border-theme-border rounded-xl p-4 font-mono text-xs md:text-sm text-theme-accent select-all overflow-x-auto whitespace-nowrap">
                    {activeStep.expectedCommand}
                  </div>
                </div>

                {/* Try it redirect launcher */}
                <div className="pt-4 border-t border-theme-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button 
                    onClick={() => openTerminalWindow(activeStepIdx + 1)}
                    className="px-6 py-2.5 bg-[#39FF14] hover:bg-[#2ebd10] text-[#07070c] font-black uppercase tracking-widest rounded-xl text-[10px] flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                  >
                    <Play size={10} fill="currentColor" />
                    <span>Try it in Terminal</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    {activeStepIdx > 0 && (
                      <button
                        onClick={() => setActiveStepIdx(activeStepIdx - 1)}
                        className="px-4 py-2 border border-theme-border hover:bg-theme-surface rounded-xl text-[10px] font-black uppercase text-theme-text/80 hover:text-theme-text transition-colors cursor-pointer"
                      >
                        Prev Lesson
                      </button>
                    )}
                    {activeStepIdx < stepIdx && activeStepIdx < GIT_SIMULATOR_STEPS.length - 1 && (
                      <button
                        onClick={() => setActiveStepIdx(activeStepIdx + 1)}
                        className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>Next Lesson</span>
                        <ChevronRight size={10} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips banner card */}
              <div className="bg-theme-surface border border-theme-border p-6 rounded-2xl text-left space-y-2 select-text">
                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">Pro Version Control Tip</span>
                <p className="text-xs text-theme-text/80 leading-normal font-medium">
                  Complete each command practice session inside the standalone terminal simulator tab. Once you run the command successfully, your progress status synchronizes globally, unlocking subsequent lessons and certification tasks automatically.
                </p>
              </div>

            </div>
          ) : (
            /* Interactive practice quiz panel */
            <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 md:p-8 space-y-6 text-left animate-in zoom-in-95 duration-200">
              
              {!quizFinished ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-theme-border pb-4">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 block">Git Assessment</span>
                      <h2 className="text-base font-bold text-theme-text uppercase tracking-tight">Question {quizStep + 1} of {GIT_QUIZ_QUESTIONS.length}</h2>
                    </div>
                    <span className="text-[9px] font-black uppercase text-theme-text/80 bg-theme-surface border border-theme-border px-2 py-0.5 rounded">
                      Score: {quizScore}
                    </span>
                  </div>

                  <p className="text-[15px] font-normal leading-[1.5] text-theme-text font-sans">
                    {GIT_QUIZ_QUESTIONS[quizStep].q}
                  </p>

                  <div className="flex flex-col gap-3 pt-2">
                    {GIT_QUIZ_QUESTIONS[quizStep].options.map((opt, oIdx) => {
                      const isSelected = quizSelectedOption === oIdx;
                      const isCorrect = oIdx === GIT_QUIZ_QUESTIONS[quizStep].correct;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleQuizAnswer(oIdx)}
                          className={`w-full text-left p-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-between cursor-pointer ${
                            quizAnswered
                              ? isCorrect
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : isSelected
                                ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                : "bg-theme-surface border-theme-border text-theme-text/40 opacity-60"
                              : "bg-theme-surface border-theme-border hover:border-theme-accent text-theme-text"
                          }`}
                        >
                          <span>{opt}</span>
                          {quizAnswered && isCorrect && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered && (
                    <div className="p-4 bg-theme-bg border border-theme-border rounded-xl space-y-2 animate-in slide-in-from-top-2 duration-150">
                      <span className="text-[9px] font-black text-indigo-450 dark:text-indigo-400 uppercase tracking-widest block">Explanation</span>
                      <p className="text-xs text-theme-text/80 leading-normal font-medium font-sans">
                        {GIT_QUIZ_QUESTIONS[quizStep].exp}
                      </p>
                      
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleQuizNext}
                          className="px-5 py-2 bg-[#39FF14] text-[#07070c] font-black uppercase tracking-widest text-[10px] rounded-lg transition-all cursor-pointer hover:scale-[1.02]"
                        >
                          Next Question
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz score screen */
                <div className="text-center py-8 space-y-6 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 shadow-md">
                    <Award size={32} />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-theme-text tracking-tight uppercase">Quiz Finished!</h2>
                    <p className="text-sm text-theme-text/70 leading-relaxed font-sans max-w-sm mx-auto">
                      Congratulations on completing the Git Version Control practice assessment quiz!
                    </p>
                  </div>

                  <div className="p-4 bg-theme-bg border border-theme-border rounded-2xl max-w-xs mx-auto flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-theme-text/80 tracking-wider">Final Score:</span>
                    <span className="text-base font-black text-[#39FF14] font-mono">{quizScore} / {GIT_QUIZ_QUESTIONS.length}</span>
                  </div>

                  <button
                    onClick={handleQuizReset}
                    className="px-6 py-2.5 bg-theme-surface border border-theme-border hover:bg-theme-card text-theme-text rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RefreshCw size={11} />
                    <span>Restart Assessment</span>
                  </button>
                </div>
              )}
            </div>
          )}

      </div>
    </div>
  );
}
