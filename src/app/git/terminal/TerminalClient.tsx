"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Terminal, CheckCircle, HelpCircle, RefreshCcw, X, Play, ArrowRight, Sun, Moon, Home, Menu, Save, RotateCw } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AdSenseBanner from "../../../components/AdSenseBanner";

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

export default function TerminalClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step") || "1";
  const { theme, setTheme } = useTheme();
  
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0); // Highest progress index
  const [user, setUser] = useState<{ uid: string; name: string; email: string } | null>(null);
  const [sandboxInput, setSandboxInput] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Sync mounted state to handle SSR theme switching safely
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  // Sync index from URL query param
  useEffect(() => {
    const idx = Math.max(0, Math.min(GIT_SIMULATOR_STEPS.length - 1, parseInt(stepParam, 10) - 1));
    setActiveStepIdx(idx);
    setIsCompleted(false);
    setSandboxInput("");
    setShowHint(false);
  }, [stepParam]);

  // Load progress & user auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, name: currentUser.displayName || "Developer", email: currentUser.email || "" });
        try {
          const docRef = doc(db, "users_progress", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.gitStep !== undefined) {
              setStepIdx(data.gitStep);
              const reqIdx = Math.max(0, Math.min(GIT_SIMULATOR_STEPS.length - 1, parseInt(stepParam, 10) - 1));
              if (reqIdx < data.gitStep) {
                setIsCompleted(true);
              }
            }
          } else {
            const localStep = localStorage.getItem(`nextsem_git_step_${currentUser.email}`);
            if (localStep) {
              const val = parseInt(localStep, 10);
              setStepIdx(val);
              const reqIdx = Math.max(0, Math.min(GIT_SIMULATOR_STEPS.length - 1, parseInt(stepParam, 10) - 1));
              if (reqIdx < val) setIsCompleted(true);
            }
          }
        } catch (e) {
          console.error("Load progress error", e);
        }
      } else {
        const localStep = localStorage.getItem("nextsem_git_step_guest");
        if (localStep) {
          const val = parseInt(localStep, 10);
          setStepIdx(val);
          const reqIdx = Math.max(0, Math.min(GIT_SIMULATOR_STEPS.length - 1, parseInt(stepParam, 10) - 1));
          if (reqIdx < val) setIsCompleted(true);
        }
      }
    });
    return () => unsubscribe();
  }, [stepParam]);

  const activeStep = GIT_SIMULATOR_STEPS[activeStepIdx];

  // Options shuffling
  useEffect(() => {
    if (activeStep) {
      const correct = activeStep.expectedCommand;
      const pool = [
        "git init", "git status", "git add .", "git commit -m \"initial commit\"", 
        "git branch -M main", "git remote add origin https://github.com/nextsem/starter.git", 
        "git push -u origin main", "git checkout -b feature-dev", "git checkout main", 
        "git merge feature-dev", "git log", "git pull origin main", 
        "git stash", "git stash list", "git stash pop", "git branch", "git diff"
      ].filter(d => d.toLowerCase() !== correct.toLowerCase());
      
      const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
      const merged = [correct, shuffledPool[0], shuffledPool[1]].sort(() => 0.5 - Math.random());
      setShuffledOptions(merged);
    }
  }, [activeStepIdx]);

  // Save Progress
  const saveProgress = async (newStep: number) => {
    if (newStep > stepIdx) {
      setStepIdx(newStep);
    }
    if (user) {
      localStorage.setItem(`nextsem_git_step_${user.email}`, newStep.toString());
      try {
        await setDoc(doc(db, "users_progress", user.uid), {
          gitStep: newStep,
          lastUpdated: new Date()
        }, { merge: true });
      } catch (e) {
        console.error("Firestore sync error", e);
      }
    } else {
      localStorage.setItem("nextsem_git_step_guest", newStep.toString());
    }
  };

  const handleCommandRun = (cmd: string) => {
    if (cmd.trim() === activeStep.expectedCommand) {
      setIsCompleted(true);
      const nextStepNum = activeStepIdx + 2;
      if (activeStepIdx === stepIdx) {
        saveProgress(stepIdx + 1);
      }

      // Automatically move to the next command after a brief 2-second delay
      setTimeout(() => {
        if (activeStepIdx < GIT_SIMULATOR_STEPS.length - 1) {
          router.push(`/git/terminal?step=${nextStepNum}`);
        } else {
          alert("Outstanding! You have completed all 40 Git textbook steps!");
          window.close();
        }
      }, 2000);
    } else {
      alert(`Oops! Incorrect command. Try: '${activeStep.expectedCommand}'`);
    }
  };

  const handleNextStep = () => {
    if (activeStepIdx < GIT_SIMULATOR_STEPS.length - 1) {
      const nextStepNum = activeStepIdx + 2;
      router.push(`/git/terminal?step=${nextStepNum}`);
    } else {
      window.close();
    }
  };

  const handleSave = () => {
    setSaveMessage("Progress synced successfully!");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset current command step? This will clear your current input and completion state.")) {
      setSandboxInput("");
      setIsCompleted(false);
      setShowHint(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#05060f] flex flex-col items-center justify-center text-slate-500 font-mono">
        <RefreshCcw size={20} className="animate-spin text-indigo-400 mb-2" />
        <span className="text-[10px] uppercase tracking-widest">Loading workspace...</span>
      </div>
    );
  }

  // Active theme visual styles
  const isLight = theme === "light";
  const bgClass = "bg-[#05060f]";
  const textClass = "text-slate-100";
  const cardBgClass = "bg-[#0b0c16] border border-slate-850";
  const headerTextClass = "text-white";
  const subtextClass = "text-slate-400";
  const terminalBarBgClass = "bg-[#090b14]/90 border border-slate-800/70 text-white";
  const terminalScreenBgClass = "bg-[#05060f] border border-slate-800/70 text-slate-100";
  const pathPrefixColor = "text-indigo-400";
  const optionPillsClass = "bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-indigo-650 hover:text-white";
  const actionRowBgClass = "border-slate-900";
  const actionBtnClass = "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white";
  const rightSidebarBgClass = "bg-[#070b19]/35 border-l border-slate-800/80";

  return (
    <div className={`flex flex-col ${bgClass} ${textClass} h-screen overflow-hidden select-none`}>
      
      {/* ── NEXTSEM ACADEMY-STYLE TOP NAVIGATION BAR ── */}
      <header className="w-full py-2 px-4 border-b border-slate-800/70 flex items-center justify-between shrink-0 select-none z-30 bg-[#090b14]/90 text-white">
        <div className="flex items-center gap-2 relative">
          <Link href="/" className="p-2 hover:bg-slate-500/20 rounded transition-colors text-slate-300 hover:text-white" title="Go to Home Page">
            <Home size={18} />
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`p-2 hover:bg-slate-500/20 rounded cursor-pointer transition-colors ${isMenuOpen ? 'bg-slate-500/20 text-[#39FF14]' : 'text-slate-300 hover:text-white'}`} 
            title="Lessons Menu"
          >
            <Menu size={18} />
          </button>
          
          <button 
            onClick={handleSave} 
            className="p-2 hover:bg-slate-500/20 rounded cursor-pointer transition-colors text-slate-300 hover:text-white" 
            title="Save Progress"
          >
            <Save size={18} />
          </button>
          
          <button 
            onClick={handleReset} 
            className="p-2 hover:bg-slate-500/20 rounded cursor-pointer transition-colors text-slate-300 hover:text-white" 
            title="Reset Current Step"
          >
            <RotateCw size={18} />
          </button>
          
          {/* Toggle Contrast button removed */}

          <button 
            onClick={() => handleCommandRun(sandboxInput || activeStep.expectedCommand)}
            className="ml-2 px-4 py-1 bg-[#04AA6D] hover:bg-[#038c5a] text-white font-bold rounded flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Run ❯
          </button>

          {/* Lessons Dropdown Menu */}
          {isMenuOpen && (
            <div className={`absolute top-12 left-0 w-64 max-h-80 overflow-y-auto rounded-xl border shadow-2xl z-50 p-2 ${isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#0f1424] border-slate-800 text-slate-100'}`}>
              <div className="text-[10px] font-black uppercase tracking-wider px-2 py-1 text-slate-500 border-b border-slate-800/30 mb-1">
                Jump to Step ({GIT_SIMULATOR_STEPS.length})
              </div>
              {GIT_SIMULATOR_STEPS.map((step, idx) => {
                const isLocked = idx > stepIdx;
                const isActive = idx === activeStepIdx;
                const isDone = idx < stepIdx;
                return (
                  <button
                    key={step.id}
                    disabled={isLocked}
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`/git/terminal?step=${idx + 1}`);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-between border border-transparent ${
                      isActive 
                        ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-400 font-black"
                        : isLocked
                        ? "opacity-35 cursor-not-allowed text-slate-500"
                        : "hover:bg-slate-500/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="truncate pr-1.5">{idx + 1}. {step.title}</span>
                    {isDone && <span className="text-emerald-400 shrink-0">✓</span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* Auto-fading Sync Toast */}
          {saveMessage && (
            <div className="absolute top-12 left-24 px-3 py-1.5 bg-emerald-500 text-white font-bold text-[10px] rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {saveMessage}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-black tracking-wider uppercase hidden sm:block ${isLight ? 'text-slate-650' : 'text-slate-400'}`}>
            Nextsem Academy Terminal
          </span>
        </div>
      </header>

      {/* ── WORKSPACE BODY ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* ── LEFT MAIN WORKSPACE CONTENT ── */}
        <div className="flex-1 flex flex-col p-4 justify-between min-h-0 overflow-y-auto">
          
          {/* Ad Placement 1: Top Responsive Banner */}
          <div className="hidden md:block w-full mb-3 shrink-0">
            <AdSenseBanner />
          </div>

          {/* Lesson guide header */}
          <div className={`border p-4 rounded-xl space-y-2 select-text ${cardBgClass}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded border ${isLight ? 'bg-indigo-50/50 border-indigo-200 text-indigo-650' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
                Step {activeStepIdx + 1} of {GIT_SIMULATOR_STEPS.length}
              </span>
              <button 
                onClick={() => window.close()}
                className={`text-[9px] font-black uppercase flex items-center gap-1 px-2.5 py-1.5 rounded border cursor-pointer ${actionBtnClass}`}
              >
                <X size={10} />
                <span>Close Workspace</span>
              </button>
            </div>
            <h2 className={`text-sm font-black uppercase tracking-tight ${headerTextClass}`}>
              {activeStep.title}
            </h2>
            <p className={`text-[11px] leading-normal ${subtextClass}`}>
              {activeStep.instruction}
            </p>

            {showHint && (
              <div className={`p-2.5 border rounded-lg animate-in slide-in-from-top-2 duration-150 ${isLight ? 'bg-indigo-50/30 border-indigo-150' : 'bg-slate-950/60 border-indigo-500/20'}`}>
                <span className={`text-[8px] font-black uppercase tracking-widest block mb-0.5 ${isLight ? 'text-indigo-650' : 'text-indigo-400'}`}>Sage Hint</span>
                <code className={`text-[10px] font-mono block select-text ${isLight ? 'text-emerald-650' : 'text-emerald-400'}`}>
                  {activeStep.hint}
                </code>
              </div>
            )}
          </div>



          {/* Windows 11 Styled Windows Terminal Bar Mockup */}
          <div className="mt-4 flex-1 flex flex-col min-h-0">
            <div className={`w-full h-8 border-t border-x rounded-t-xl flex items-center justify-between px-3 select-none ${terminalBarBgClass}`}>
              <div className="flex items-center gap-1">
                <div className={`border-t border-x px-3 py-1 rounded-t-md flex items-center gap-2 text-[9px] font-black tracking-wide ${isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#05060f] border-slate-800/70 text-white'}`}>
                  <Terminal size={10} className={isLight ? 'text-indigo-650' : 'text-indigo-400'} />
                  <span>Git Bash (step-{activeStepIdx + 1})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />
                <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />
                <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />
              </div>
            </div>

            {/* Console Terminal Screen */}
            <div className={`flex-1 border-b border-x rounded-b-xl p-4 font-mono text-xs overflow-y-auto text-left space-y-3 shadow-2xl relative min-h-0 flex flex-col justify-between ${terminalScreenBgClass}`}>
              <div className="space-y-3">
                <div className={`text-[10px] leading-tight select-none ${isLight ? 'text-slate-400' : 'text-slate-600'}`}>
                  Microsoft Windows [Version 10.0.26200.8875]<br/>
                  (c) Microsoft Corporation. All rights reserved.
                </div>

                {isCompleted ? (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-1">
                      <span className={pathPrefixColor}>C:\Nextsem\projects\advanced-react&gt;</span>
                      <span className="font-bold">{activeStep.expectedCommand}</span>
                    </div>
                    <div className={`whitespace-pre-wrap leading-relaxed select-text font-mono text-[11px] pt-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      {activeStep.successMsg}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className={pathPrefixColor}>C:\Nextsem\projects\advanced-react&gt;</span>
                      <input 
                        type="text"
                        value={sandboxInput}
                        onChange={(e) => setSandboxInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCommandRun(sandboxInput);
                            setSandboxInput("");
                          }
                        }}
                        placeholder="Type expected git command..."
                        className={`flex-1 bg-transparent border-none outline-none font-bold focus:ring-0 p-0 font-mono ${isLight ? 'text-slate-900 caret-indigo-650' : 'text-white caret-indigo-400'}`}
                        autoFocus={!isMobile}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                      />
                    </div>

                    {/* Shuffled Option Pills */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {shuffledOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleCommandRun(opt)}
                          className={`px-3 py-2 border rounded-xl text-[10px] font-bold font-mono transition-all cursor-pointer active:scale-95 ${optionPillsClass}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Row */}
              <div className={`pt-4 border-t flex justify-between items-center shrink-0 ${actionRowBgClass}`}>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className={`px-3 py-1.5 border rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${actionBtnClass}`}
                  >
                    {showHint ? "Hide Hint" : "Get Hint"}
                  </button>
                  {!isCompleted && (
                    <button 
                      onClick={() => handleCommandRun(activeStep.expectedCommand)}
                      className={`px-3 py-1.5 border rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 font-mono ${isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800' : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 hover:text-white'}`}
                    >
                      <Play size={10} fill="currentColor" />
                      <span>Run</span>
                    </button>
                  )}
                </div>

                {isCompleted && (
                  <button 
                    onClick={handleNextStep}
                    className="px-4 py-2 bg-[#39FF14] text-black font-black uppercase tracking-widest rounded-xl text-[10px] flex items-center gap-1 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>{activeStepIdx < GIT_SIMULATOR_STEPS.length - 1 ? "Next Step" : "Finish"}</span>
                    <ArrowRight size={10} />
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
