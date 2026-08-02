"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Terminal, ShieldAlert, CheckCircle, HelpCircle, 
  RefreshCw, Play, ArrowRight, LockKeyhole, Sparkles, 
  Star, LogOut, ChevronRight, Award, Copy, Download,
  Check, ArrowLeft, RefreshCcw, X, Menu, GitBranch
} from "lucide-react";
import { auth, signInWithGoogle, db } from "../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ThemeToggle } from "../../components/ThemeToggle";

interface HistoryLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

interface FSItem {
  isDir: boolean;
  content?: string;
  isReadOnly?: boolean;
  isHidden?: boolean;
}

type VirtualFS = Record<string, FSItem>;

interface StepType {
  id: string;
  title: string;
  instruction: string;
  expectedCommand: string;
  hint: string;
  successMsg: string;
}

const COLOR_MAP: Record<string, string> = {
  "0": "#000000", // Black
  "1": "#000080", // Blue
  "2": "#008000", // Green
  "3": "#008080", // Aqua
  "4": "#800000", // Red
  "5": "#800080", // Purple
  "6": "#808000", // Yellow
  "7": "#C0C0C0", // White
  "8": "#808080", // Gray
  "9": "#0000FF", // Light Blue
  "a": "#39FF14", // Light Green (Matrix Green)
  "b": "#00FFFF", // Light Aqua
  "c": "#FF0000", // Light Red
  "d": "#FF00FF", // Light Purple
  "e": "#FFFF00", // Light Yellow
  "f": "#FFFFFF"  // Bright White
};

const SIMULATOR_STEPS: StepType[] = [
  {
    id: "cd",
    title: "1. Navigate to Projects Folder",
    instruction: "First, navigate into the projects directory to set up your workspace. Type `cd projects` and press Enter.",
    expectedCommand: "cd projects",
    hint: "cd projects",
    successMsg: "Excellent! You are now in the C:\\Nextsem\\projects folder."
  },
  {
    id: "git",
    title: "2. Clone Advanced React Project",
    instruction: "Now, clone the advanced React starter repository. Type `git clone https://github.com/nextsem-labs/advanced-react` and press Enter.",
    expectedCommand: "git clone https://github.com/nextsem-labs/advanced-react",
    hint: "git clone https://github.com/nextsem-labs/advanced-react",
    successMsg: "Done! Repository successfully cloned to advanced-react folder."
  },
  {
    id: "code",
    title: "3. Open Editor (VS Code)",
    instruction: "Type `code .` to launch VS Code in your workspace and edit your code files.",
    expectedCommand: "code .",
    hint: "code .",
    successMsg: "Launching VS Code editor... project opened successfully!"
  },
  {
    id: "install",
    title: "4. Install Dependencies",
    instruction: "Next, install all npm package dependencies for your React app. Type `npm install` and press Enter.",
    expectedCommand: "npm install",
    hint: "npm install",
    successMsg: "Dependencies installed! (This might take a while)"
  },
  {
    id: "start",
    title: "5. Start Development Server",
    instruction: "Finally, launch the local React server. Type `npm start` and press Enter.",
    expectedCommand: "npm start",
    hint: "npm start",
    successMsg: "Outstanding! Nextsem React Dev Server running at http://localhost:3000. React.js Mastery unlocked! +1000 XP!"
  }
];

export default function CmdClient() {
  const router = useRouter();
  
  // Auth state
  const [user, setUser] = useState<{ uid: string; name: string; email: string; avatar: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Lesson progression state
  const [stepIdx, setStepIdx] = useState(0);
  const [maxStepIdx, setMaxStepIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [certified, setCertified] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showCertOverlay, setShowCertOverlay] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<"tutorial" | "simulator">("simulator");
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isExercisesOpen, setIsExercisesOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Sandbox state
  const [sandboxFiles, setSandboxFiles] = useState<string[]>(["projects", "documents", "README.txt"]);
  const [sandboxPath, setSandboxPath] = useState("C:\\Nextsem");
  const [sandboxInput, setSandboxInput] = useState("");
  const [sandboxHistory, setSandboxHistory] = useState<HistoryLine[]>([
    { text: "Microsoft Windows [Version 10.0.22621.1702]", type: "output" },
    { text: "(c) Microsoft Corporation. All rights reserved.", type: "output" },
    { text: "", type: "output" },
    { text: "Nextsem Virtual Cmd Console Sandbox [v1.0.0]", type: "system" },
    { text: "Type 'help' to view the list of supported commands.", type: "system" },
    { text: "", type: "output" }
  ]);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      q: "What command is used to list files and folders in a directory in Windows CMD?",
      options: ["ls", "dir", "list", "show"],
      correct: 1,
      exp: "In Windows CMD, 'dir' is used to list directory content. 'ls' is used in Unix-like shells (Mac/Linux)."
    },
    {
      q: "How do you navigate up one directory level to the parent directory in Windows CMD?",
      options: ["cd ..", "cd /", "cd parent", "back"],
      correct: 0,
      exp: "'cd ..' changes the directory to the parent folder. 'cd /' returns to the root drive directory."
    },
    {
      q: "Which command is used to create a new folder/directory?",
      options: ["newdir", "mkdir", "create", "touch"],
      correct: 1,
      exp: "'mkdir' stands for 'make directory' and creates a new directory. 'touch' is a Unix command used to create empty files."
    },
    {
      q: "Which command clears the screen history in Windows CMD?",
      options: ["clear", "cls", "clean", "reset"],
      correct: 1,
      exp: "'cls' stands for 'clear screen' and resets the terminal console buffer in Windows."
    },
    {
      q: "What is the command to display IP network address details in Windows?",
      options: ["ifconfig", "ipconfig", "netstat", "ping"],
      correct: 1,
    }
  ];

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (stepIdx < SIMULATOR_STEPS.length) {
      const correct = SIMULATOR_STEPS[stepIdx].expectedCommand;
      const pool = [
        "dir", "cd ..", "mkdir src", "cls", "ipconfig", "git status", "cd documents", "git init", "code .", "npm run dev", "npm install", "git add ."
      ].filter(d => d.toLowerCase() !== correct.toLowerCase());
      
      const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
      const merged = [correct, shuffledPool[0], shuffledPool[1]].sort(() => 0.5 - Math.random());
      setShuffledOptions(merged);
    }
  }, [stepIdx]);

  const handleSandboxCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory = [...sandboxHistory, { text: `${sandboxPath}> ${cmdStr}`, type: "input" as const }];
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let outputText = "";
    let outputType: "output" | "error" | "system" = "output";

    switch (cmd) {
      case "help":
        outputText = "Supported commands:\n  help            - Display list of commands\n  dir             - List files and directories in current folder\n  mkdir <folder>  - Create a new directory\n  cd <folder>     - Change directories (cd .. to go back)\n  echo <text>     - Print text\n  ipconfig        - View simulated network parameters\n  git init        - Initialize empty Git repository\n  cls             - Clear console history";
        outputType = "system";
        break;
      case "cls":
        setSandboxHistory([]);
        setSandboxInput("");
        return;
      case "dir":
        outputText = ` Directory of ${sandboxPath}\n\n`;
        sandboxFiles.forEach((file) => {
          const isDir = !file.includes(".");
          outputText += `15-Jul-2026  12:00 PM    ${isDir ? "<DIR>" : "     "}          ${file}\n`;
        });
        outputText += `\n               ${sandboxFiles.length} File(s) / Dir(s)`;
        break;
      case "mkdir":
        if (!arg) {
          outputText = "Error: Please specify directory name. Usage: mkdir <dirname>";
          outputType = "error";
        } else if (sandboxFiles.includes(arg)) {
          outputText = `Error: Subdirectory or file ${arg} already exists.`;
          outputType = "error";
        } else {
          setSandboxFiles([...sandboxFiles, arg]);
          outputText = `Directory '${arg}' created successfully.`;
          outputType = "system";
        }
        break;
      case "cd":
        if (!arg) {
          outputText = sandboxPath;
        } else if (arg === "..") {
          if (sandboxPath === "C:\\Nextsem") {
            outputText = "Cannot navigate above root in virtual sandbox.";
            outputType = "error";
          } else {
            setSandboxPath("C:\\Nextsem");
          }
        } else {
          if (sandboxFiles.includes(arg) && !arg.includes(".")) {
            setSandboxPath(`C:\\Nextsem\\${arg}`);
          } else {
            outputText = `Error: The system cannot find the path specified: '${arg}'`;
            outputType = "error";
          }
        }
        break;
      case "echo":
        outputText = arg ? arg : "ECHO is on.";
        break;
      case "ipconfig":
        outputText = "\nWindows IP Configuration\n\nEthernet adapter Ethernet0:\n   Connection-specific DNS Suffix  . : localdomain\n   IPv4 Address. . . . . . . . . . . : 192.168.1.108\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1";
        break;
      case "git":
        if (arg === "init") {
          outputText = "Initialized empty Git repository in C:/Nextsem/.git/";
          outputType = "system";
        } else {
          outputText = `Error: Git command '${arg}' is not supported in this mock terminal. Try 'git init'`;
          outputType = "error";
        }
        break;
      default:
        outputText = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file. Type 'help' for available commands.`;
        outputType = "error";
    }

    setSandboxHistory([...newHistory, { text: outputText, type: outputType }]);
    setSandboxInput("");
  };

  // Terminal state
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { text: "Microsoft Windows [Version 10.0.22621.1702]", type: "output" },
    { text: "(c) Microsoft Corporation. All rights reserved.", type: "output" },
    { text: "", type: "output" },
    { text: "Type 'help' to view the list of supported Windows commands.", type: "system" },
    { text: "Type the expected commands in the left pane to progress through lessons.", type: "system" },
    { text: "", type: "output" }
  ]);
  const [currentDrive, setCurrentDrive] = useState("C");
  const [currentPath, setCurrentPath] = useState("C:\\NEXTSEM");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isWorking, setIsWorking] = useState(false);

  // Custom colors theme state
  const [themeColors, setThemeColors] = useState({
    bg: "#050914",
    text: "#c5c9d6"
  });

  // Shell configurations and custom modes state
  const [terminalTitle, setTerminalTitle] = useState("cmd.exe");
  const [shellMode, setShellMode] = useState<"cmd" | "powershell" | "diskpart">("cmd");
  const [envVars, setEnvVars] = useState<Record<string, string>>({
    "USERNAME": "Sarah J.",
    "USERPROFILE": "C:\\NEXTSEM",
    "COMPUTERNAME": "DESKTOP-NEXTSEM",
    "PATH": "C:\\Windows\\system32;C:\\Windows",
    "OS": "Windows_NT",
    "PROCESSOR_ARCHITECTURE": "AMD64",
    "SYSTEMDRIVE": "C:",
    "SYSTEMROOT": "C:\\Windows"
  });
  const [diskpartDisk, setDiskpartDisk] = useState<string | null>(null);
  const [diskpartPartition, setDiskpartPartition] = useState<string | null>(null);
  const [formatPendingConfirm, setFormatPendingConfirm] = useState(false);
  const [shutdownTimerVal, setShutdownTimerVal] = useState<NodeJS.Timeout | null>(null);

  // Sync clear of shutdown timer on unmount
  useEffect(() => {
    return () => {
      if (shutdownTimerVal) clearTimeout(shutdownTimerVal);
    };
  }, [shutdownTimerVal]);

  const getPrompt = () => {
    if (shellMode === "diskpart") return "DISKPART>";
    if (shellMode === "powershell") return `PS ${currentPath}>`;
    return `${currentPath}>`;
  };

  // Virtual Filesystem State
  const [fs, setFs] = useState<VirtualFS>({
    "C:": { isDir: true },
    "C:\\NEXTSEM": { isDir: true },
    "C:\\NEXTSEM\\PROJECTS": { isDir: true }
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleBufferRef = useRef<HTMLDivElement>(null);

  // Reconcile and load user progress
  const loadProgress = async (uid: string, email: string) => {
    try {
      // 1. Check local progress first (scoped by email)
      const localStep = parseInt(localStorage.getItem(`nextsem_terminal_step_${email}`) || "0", 10);
      const localCertified = localStorage.getItem(`nextsem_terminal_certified_${email}`) === "true";

      // 2. Fetch progress from Firestore online database
      const userDocRef = doc(db, "users_progress", uid);
      const docSnap = await getDoc(userDocRef);

      let finalStep = localStep;
      let finalCertified = localCertified;

      if (docSnap.exists()) {
        const dbData = docSnap.data();
        const dbStep = dbData.stepIdx || 0;
        const dbCertified = dbData.courseCertified || false;

        // Choose higher progress
        if (dbStep > localStep || (dbStep === localStep && dbCertified)) {
          finalStep = dbStep;
          finalCertified = dbCertified;
        }
      }

      setStepIdx(finalStep);
      setMaxStepIdx(finalStep);
      setPoints(finalStep * 100);
      setCertified(finalCertified);

      // Save merged progress back to local
      localStorage.setItem(`nextsem_terminal_step_${email}`, finalStep.toString());
      localStorage.setItem(`nextsem_terminal_certified_${email}`, finalCertified.toString());
    } catch (e) {
      console.error("Failed to reconcile progress:", e);
    } finally {
      setAuthLoading(false);
    }
  };

  // Save progress online & offline
  const saveProgress = async (nextStep: number, isCert: boolean) => {
    if (nextStep > maxStepIdx) {
      setMaxStepIdx(nextStep);
    }
    if (!user) return;
    try {
      const email = user.email;
      const uid = user.uid;

      // Local save
      localStorage.setItem(`nextsem_terminal_step_${email}`, nextStep.toString());
      localStorage.setItem(`nextsem_terminal_certified_${email}`, isCert.toString());

      // Firestore save
      const userDocRef = doc(db, "users_progress", uid);
      await setDoc(userDocRef, {
        stepIdx: nextStep,
        points: nextStep * 100,
        courseCertified: isCert,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  };

  // Auth setup listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthLoading(true);
      if (firebaseUser) {
        const profile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Student",
          email: firebaseUser.email || "guest@nextsem.local",
          avatar: firebaseUser.photoURL || ""
        };
        setUser(profile);
        loadProgress(firebaseUser.uid, profile.email);
      } else {
        setUser(null);
        loadProgress("guest", "guest@nextsem.local");
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll to bottom when terminal history updates
  useEffect(() => {
    if (consoleBufferRef.current) {
      consoleBufferRef.current.scrollTop = consoleBufferRef.current.scrollHeight;
    }
  }, [history]);

  // Focus terminal input helper
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Sign-In Error:", err);
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Sign-Out Error:", err);
    }
  };

  // Path resolution utility
  const resolvePath = (current: string, target: string): string => {
    const cleanTarget = target.replace(/\//g, "\\").trim();
    if (!cleanTarget) return current;

    // Check if target contains absolute drive root
    if (cleanTarget.match(/^[a-zA-Z]:\\/)) {
      return cleanTarget.toUpperCase();
    }
    if (cleanTarget.match(/^[a-zA-Z]:$/)) {
      return cleanTarget.toUpperCase() + "\\";
    }

    let parts = current.split("\\");
    if (cleanTarget.startsWith("\\")) {
      // Start from current drive root
      parts = [current.split("\\")[0]];
    }

    const targetParts = cleanTarget.split("\\");
    for (const part of targetParts) {
      if (!part || part === ".") continue;
      if (part === "..") {
        if (parts.length > 1) {
          parts.pop();
        }
      } else {
        parts.push(part.toUpperCase());
      }
    }
    return parts.join("\\");
  };

  // ASCII tree drawing recursive generator
  const buildTreeString = (path: string, prefix = ""): string[] => {
    const lines: string[] = [];
    const parentPath = path.endsWith("\\") ? path : path + "\\";

    const subDirs: string[] = [];
    const subFiles: string[] = [];

    Object.keys(fs).forEach(key => {
      if (key === path) return;
      if (key.startsWith(parentPath)) {
        const sub = key.slice(parentPath.length);
        if (!sub.includes("\\")) {
          if (fs[key].isDir) {
            subDirs.push(sub);
          } else {
            subFiles.push(sub);
          }
        }
      }
    });

    const allItems = [...subDirs.map(d => ({ name: d, isDir: true })), ...subFiles.map(f => ({ name: f, isDir: false }))];

    allItems.forEach((item, index) => {
      const isLast = index === allItems.length - 1;
      const marker = isLast ? "└── " : "├── ";
      lines.push(prefix + marker + (item.isDir ? item.name + "/" : item.name));

      if (item.isDir) {
        const nextPrefix = prefix + (isLast ? "    " : "│   ");
        const childLines = buildTreeString(parentPath + item.name, nextPrefix);
        lines.push(...childLines);
      }
    });

    return lines;
  };

  // Keyboard autocomplete tab-completion and history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isWorking) {
      e.preventDefault();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const parts = inputVal.split(" ");
      if (parts.length === 0) return;
      
      const lastWord = parts[parts.length - 1];
      if (!lastWord) return;

      const parentPath = currentPath.endsWith("\\") ? currentPath : currentPath + "\\";
      const candidates: string[] = [];

      Object.keys(fs).forEach(key => {
        if (key.startsWith(parentPath)) {
          const sub = key.slice(parentPath.length);
          if (!sub.includes("\\")) {
            if (sub.toUpperCase().startsWith(lastWord.toUpperCase())) {
              candidates.push(sub.toLowerCase());
            }
          }
        }
      });

      if (candidates.length > 0) {
        parts[parts.length - 1] = candidates[0];
        setInputVal(parts.join(" "));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const nextIdx = historyIdx > 0 ? historyIdx - 1 : 0;
      setHistoryIdx(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIdx = historyIdx < commandHistory.length - 1 ? historyIdx + 1 : commandHistory.length;
      setHistoryIdx(nextIdx);
      if (nextIdx === commandHistory.length) {
        setInputVal("");
      } else {
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  // Command Interpreter Engine
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Append to command history list
    setCommandHistory(prev => {
      const next = [...prev, trimmed];
      setHistoryIdx(next.length);
      return next;
    });

    const activePrompt = getPrompt();
    const rawPrompt = `${activePrompt} ${trimmed}`;
    const newHistory = [...history, { text: rawPrompt, type: "input" as const }];

    // Intercept Y/N format prompt
    if (formatPendingConfirm) {
      const response = trimmed.toLowerCase();
      let stdoutLines: string[] = [];
      const isError = false;
      
      if (response === "y" || response === "yes") {
        setFormatPendingConfirm(false);
        setHistory(newHistory);
        setInputVal("");
        runAsync("format", [], newHistory);
        return;
      } else {
        setFormatPendingConfirm(false);
        stdoutLines = ["Format command aborted by user."];
      }

      setHistory(prev => [
        ...prev,
        ...stdoutLines.map(line => ({ text: line, type: isError ? ("error" as const) : ("output" as const) })),
        { text: "", type: "output" }
      ]);
      setInputVal("");
      return;
    }

    // Intercept DiskPart Shell Mode
    if (shellMode === "diskpart") {
      const tokens = trimmed.split(" ");
      const subCommand = tokens[0].toLowerCase();
      const subArgs = tokens.slice(1);
      let stdoutLines: string[] = [];
      let isError = false;

      if (subCommand === "exit") {
        setShellMode("cmd");
        stdoutLines = ["Leaving DiskPart..."];
      } else if (subCommand === "help") {
        stdoutLines = [
          "Microsoft DiskPart commands:",
          "  LIST DISK          - Display a list of virtual disks.",
          "  LIST PARTITION     - Display a list of partitions on selected disk.",
          "  SELECT DISK [n]    - Shift disk focus to disk number [n].",
          "  SELECT PARTITION [n]- Shift partition focus to partition number [n].",
          "  CLEAN              - Erase partition tables from the selected disk.",
          "  EXIT               - Exit the DiskPart utility."
        ];
      } else if (subCommand === "list") {
        const listTarget = subArgs[0]?.toLowerCase();
        if (listTarget === "disk") {
          stdoutLines = [
            "  Disk ###  Status           Size     Free     Dyn  Gpt",
            "  --------  -------------  -------  -------  ---  ---",
            "  Disk 0    Online          100 GB      0 B        *",
            "  Disk 1    Online           50 GB    10 GB        *"
          ];
        } else if (listTarget === "partition") {
          if (diskpartDisk === null) {
            stdoutLines = [
              "There is no disk selected to list partitions.",
              "Select a disk and try again."
            ];
            isError = true;
          } else if (diskpartDisk === "0") {
            stdoutLines = [
              "  Partition ###  Type              Size     Offset",
              "  -------------  ----------------  -------  -------",
              "  Partition 1    Primary             99 GB  1024 KB",
              "  Partition 2    System             100 MB   100 GB"
            ];
          } else {
            stdoutLines = [
              "  Partition ###  Type              Size     Offset",
              "  -------------  ----------------  -------  -------",
              "  Partition 1    Primary             40 GB  1024 KB"
            ];
          }
        } else {
          stdoutLines = ["Error: Invalid LIST target. Try: LIST DISK or LIST PARTITION."];
          isError = true;
        }
      } else if (subCommand === "select") {
        const selTarget = subArgs[0]?.toLowerCase();
        const selVal = subArgs[1];
        if (selTarget === "disk") {
          if (selVal === "0" || selVal === "1") {
            setDiskpartDisk(selVal);
            setDiskpartPartition(null);
            stdoutLines = [`Disk ${selVal} is now the selected disk.`];
          } else {
            stdoutLines = ["Error: Disk number must be 0 or 1."];
            isError = true;
          }
        } else if (selTarget === "partition") {
          if (diskpartDisk === null) {
            stdoutLines = ["There is no disk selected to choose partitions from."];
            isError = true;
          } else if (selVal === "1" || (diskpartDisk === "0" && selVal === "2")) {
            setDiskpartPartition(selVal);
            stdoutLines = [`Partition ${selVal} is now the selected partition.`];
          } else {
            stdoutLines = ["Error: Invalid partition selection."];
            isError = true;
          }
        } else {
          stdoutLines = ["Error: Invalid SELECT target. Try: SELECT DISK or SELECT PARTITION."];
          isError = true;
        }
      } else if (subCommand === "clean") {
        if (diskpartDisk === null) {
          stdoutLines = ["There is no disk selected to clean. Select a disk first."];
          isError = true;
        } else {
          stdoutLines = [`DiskPart succeeded in cleaning disk ${diskpartDisk}.`];
        }
      } else {
        stdoutLines = [`Microsoft DiskPart version 10.0.22621`, `Command '${trimmed}' is not recognized in DiskPart shell.`];
        isError = true;
      }

      setHistory(prev => [
        ...prev,
        ...stdoutLines.map(line => ({ text: line, type: isError ? ("error" as const) : ("output" as const) })),
        { text: "", type: "output" }
      ]);
      setInputVal("");
      return;
    }

    // Resolve environment variables %VAR%
    let resolvedCmd = trimmed;
    Object.keys(envVars).forEach(key => {
      const regex = new RegExp(`%${key}%`, "gi");
      resolvedCmd = resolvedCmd.replace(regex, envVars[key]);
    });

    // Check piping operator '|' (e.g. echo hello | clip)
    let isPiped = false;
    let pipeTarget = "";
    let cmdPart = resolvedCmd;

    if (resolvedCmd.includes("|")) {
      const parts = resolvedCmd.split("|");
      cmdPart = parts[0].trim();
      pipeTarget = parts[1]?.trim()?.toLowerCase() || "";
      isPiped = true;
    }

    // Parsing commands with optional redirection operators
    let redirectFile = "";
    let isAppend = false;

    if (cmdPart.includes(">>")) {
      const parts = cmdPart.split(">>");
      cmdPart = parts[0].trim();
      redirectFile = parts[1]?.trim() || "";
      isAppend = true;
    } else if (cmdPart.includes(">")) {
      const parts = cmdPart.split(">");
      cmdPart = parts[0].trim();
      redirectFile = parts[1]?.trim() || "";
    }

    // Split target arguments
    const cmdTokens = cmdPart.split(" ");
    let command = cmdTokens[0].toLowerCase();
    let args = cmdTokens.slice(1);

    // PowerShell Mode Intercept & Aliases
    if (shellMode === "powershell") {
      if (command === "exit") {
        setShellMode("cmd");
        setHistory([...newHistory, { text: "", type: "output" }]);
        setInputVal("");
        return;
      }
      if (command === "ls" || command === "gci" || command === "get-childitem") {
        command = "dir";
      } else if (command === "gl" || command === "get-location" || command === "pwd") {
        command = "cd";
        args = [];
      } else if (command === "clear-host" || command === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      } else if (command === "write-host") {
        command = "echo";
      }
    }

    if (command === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    // Async commands check (ping / chkdsk / sfc / tracert)
    if (!redirectFile) {
      if (command === "ping") {
        setHistory(newHistory);
        setInputVal("");
        runAsync("ping", args, newHistory);
        return;
      }
      if (command === "chkdsk") {
        setHistory(newHistory);
        setInputVal("");
        runAsync("chkdsk", args, newHistory);
        return;
      }
      if (command === "sfc" && args[0]?.toLowerCase() === "/scannow") {
        setHistory(newHistory);
        setInputVal("");
        runAsync("sfc", args, newHistory);
        return;
      }
      if (command === "tracert") {
        setHistory(newHistory);
        setInputVal("");
        runAsync("tracert", args, newHistory);
        return;
      }
    }

    let stdoutLines: string[] = [];
    let isError = false;

    // Direct drive switch check (e.g. C: or D:)
    if (cmdPart.match(/^[a-zA-Z]:$/)) {
      const driveLetter = cmdPart[0].toUpperCase();
      const targetDrivePath = driveLetter + ":";
      
      if (fs[targetDrivePath] || targetDrivePath === "C:" || targetDrivePath === "D:") {
        setCurrentDrive(driveLetter);
        setCurrentPath(driveLetter === "C" ? "C:\\Users\\Student" : "D:\\");
        setHistory([...newHistory, { text: "", type: "output" }]);
        setInputVal("");
        return;
      } else {
        setHistory([...newHistory, { text: `The system cannot find the drive specified.`, type: "error" }]);
        setInputVal("");
        return;
      }
    }
    switch (command) {
      case "help":
        stdoutLines = [
          "Supported Windows CMD commands and parameters:",
          "  HELP            Provides Help information for Windows commands.",
          "  CLS             Clears the Command Prompt terminal screen.",
          "  VER             Displays the Microsoft Windows operating system version.",
          "  WHOAMI          Displays active user identity and group scopes.",
          "  HOSTNAME        Displays the network hostname of the system.",
          "  DATE / TIME     Displays current system date and clock details.",
          "  VOL             Displays the disk volume label and serial key.",
          "  DIR             Lists all files and subdirectories in the folder. (/W for wide).",
          "  CD [path]       Changes the current active directory prompt path.",
          "  MKDIR [name]    Creates (makes) a new folder directory.",
          "  RMDIR [name]    Deletes (removes) an empty folder directory.",
          "  ECHO [text]     Outputs (prints) text or redirects to a file.",
          "  TYPE [file]     Outputs the contents of a text file to screen.",
          "  COPY [s] [d]    Copies files to another folder path or filename.",
          "  MOVE [s] [d]    Moves or renames files or directories.",
          "  DEL [file]      Deletes (erases) one or more files.",
          "  REN [old] [new] Renames a file or directory folder.",
          "  ATTRIB          Displays or modifies file attributes (+R/-R for Read-only, +H/-H for Hidden).",
          "  TREE            Displays the graphical folder tree structure.",
          "  SYSTEMINFO      Displays hardware, kernel, network, and memory config stats.",
          "  IPCONFIG        Displays IP networks configurations. (/ALL, /FLUSHDNS).",
          "  PING [host]     Tests host latency by sending ICMP packets.",
          "  NSLOOKUP [host] Resolves IP mapping and queries DNS domain entries.",
          "  TASKLIST        Displays current running background execution processes.",
          "  TASKKILL        Terminates a process matching PID or Image Name.",
          "  NETSTAT         Lists active network socket connection streams."
        ];
        break;

      case "ver":
        stdoutLines = ["Microsoft Windows [Version 10.0.22631.3296]"];
        break;

      case "whoami":
        stdoutLines = [`DESKTOP-NEXTSEM\\${user ? user.email.split("@")[0] : "student"}`];
        break;

      case "hostname":
        stdoutLines = ["DESKTOP-NEXTSEM"];
        break;

      case "vol":
        stdoutLines = [
          " Volume in drive C has no label.",
          " Volume Serial Number is B48C-9F12"
        ];
        break;

      case "date":
        stdoutLines = [`The current date is: ${new Date().toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`];
        break;

      case "time":
        stdoutLines = [`The current time is: ${new Date().toLocaleTimeString()}`];
        break;

      case "echo":
        stdoutLines = [args.join(" ")];
        break;

      case "systeminfo":
        stdoutLines = [
          "OS Name:                   Microsoft Windows 11 Home",
          "OS Version:                10.0.22631 N/A Build 22631",
          "OS Manufacturer:           Microsoft Corporation",
          "Registered Owner:          " + (user ? user.name : "Guest Student"),
          "Product ID:                00326-10000-00000-AA523",
          "System Uptime:             3 Days, 5 Hours, 12 Minutes",
          "BIOS Version:              Dell Inc. 1.14.0, 7/12/2025",
          "Total Physical Memory:     16,234 MB",
          "Available Physical Memory: 6,842 MB",
          "Virtual Memory: Max Size:  24,192 MB",
          "Virtual Memory: Available: 11,208 MB",
          "Network Card(s):           1 NIC(s) Installed.",
          "                           [01]: Realtek PCIe GbE Family Controller",
          "                                 Connection Name: Ethernet0",
          "                                 DHCP Enabled:    Yes",
          "                                 IP Address(es):  192.168.1.104"
        ];
        break;

      case "ipconfig":
        if (args[0]?.toLowerCase() === "/flushdns") {
          stdoutLines = [
            "Windows IP Configuration",
            "",
            "Successfully flushed the DNS Resolver Cache."
          ];
        } else if (args[0]?.toLowerCase() === "/all") {
          stdoutLines = [
            "Windows IP Configuration",
            "",
            "Host Name . . . . . . . . . . . . : DESKTOP-NEXTSEM",
            "Primary Dns Suffix  . . . . . . . : local",
            "Node Type . . . . . . . . . . . . : Hybrid",
            "IP Routing Enabled. . . . . . . . : No",
            "WINS Proxy Enabled. . . . . . . . : No",
            "",
            "Ethernet adapter Ethernet0:",
            "   Connection-specific DNS Suffix  . : local",
            "   Description . . . . . . . . . . . : Realtek PCIe GbE Family Controller",
            "   Physical Address. . . . . . . . . : E8-11-32-A5-92-CF",
            "   DHCP Enabled. . . . . . . . . . . : Yes",
            "   Autoconfiguration Enabled . . . . : Yes",
            "   IPv4 Address. . . . . . . . . . . : 192.168.1.104(Preferred)",
            "   Subnet Mask . . . . . . . . . . . : 255.255.255.0",
            "   Lease Obtained. . . . . . . . . . : Friday, July 10, 2026 8:00 AM",
            "   Default Gateway . . . . . . . . . : 192.168.1.1",
            "   DHCP Server . . . . . . . . . . . : 192.168.1.1",
            "   DNS Servers . . . . . . . . . . . : 8.8.8.8",
            "                                       8.8.4.4"
          ];
        } else {
          stdoutLines = [
            "Windows IP Configuration",
            "",
            "Ethernet adapter Ethernet0:",
            "   Connection-specific DNS Suffix  . : local",
            "   IPv4 Address. . . . . . . . . . . : 192.168.1.104",
            "   Subnet Mask . . . . . . . . . . . : 255.255.255.0",
            "   Default Gateway . . . . . . . . . : 192.168.1.1"
          ];
        }
        break;

      case "nslookup":
        if (!args[0]) {
          stdoutLines = ["Default Server:  google-public-dns.google\nAddress:  8.8.8.8"];
        } else {
          stdoutLines = [
            "Server:  google-public-dns.google",
            "Address:  8.8.8.8",
            "",
            "Non-authoritative answer:",
            `Name:    ${args[0]}`,
            "Address:  199.36.158.100"
          ];
        }
        break;

      case "tasklist":
        stdoutLines = [
          "Image Name                     PID Session Name        Mem Usage",
          "========================= ======== ================ ============",
          "System Idle Process              0 Services                   8 K",
          "System                           4 Services                 156 K",
          "smss.exe                       384 Services                 452 K",
          "csrss.exe                      522 Services               1,450 K",
          "wininit.exe                    602 Services               1,200 K",
          "services.exe                   744 Services               4,520 K",
          "lsass.exe                      780 Services               6,212 K",
          "explorer.exe                  3212 Console              142,400 K",
          "cmd.exe                       5904 Console                8,240 K",
          "chrome.exe                    8412 Console              324,500 K",
          "laggy-process.exe             9214 Console              850,200 K"
        ];
        break;

      case "taskkill":
        const hasPid = args.includes("/pid") || args.includes("/PID");
        const hasIm = args.includes("/im") || args.includes("/IM");
        if (hasPid) {
          const idx = args.findIndex(v => v.toLowerCase() === "/pid");
          const targetPid = args[idx + 1];
          if (targetPid === "9214") {
            stdoutLines = ["SUCCESS: Sent termination signal to process with PID 9214."];
          } else {
            stdoutLines = [`ERROR: Process with PID ${targetPid} not found.`];
            isError = true;
          }
        } else if (hasIm) {
          const idx = args.findIndex(v => v.toLowerCase() === "/im");
          const targetIm = args[idx + 1]?.toLowerCase();
          if (targetIm === "laggy-process.exe") {
            stdoutLines = ["SUCCESS: Sent termination signal to image laggy-process.exe."];
          } else {
            stdoutLines = [`ERROR: Image ${targetIm} process not found.`];
            isError = true;
          }
        } else {
          stdoutLines = ["Usage: taskkill /pid <PID>  or  taskkill /im <ImageName>"];
        }
        break;

      case "netstat":
        stdoutLines = [
          "Active Connections",
          "",
          "  Proto  Local Address          Foreign Address        State",
          "  TCP    127.0.0.1:5000         0.0.0.0:0              LISTENING",
          "  TCP    192.168.1.104:51221    199.36.158.100:443     ESTABLISHED",
          "  TCP    192.168.1.104:51225    8.8.8.8:443            ESTABLISHED",
          "  UDP    0.0.0.0:5353           *:*"
        ];
        break;

      case "color":
        if (!args[0]) {
          // Reset default
          setThemeColors({ bg: "#050914", text: "#c5c9d6" });
          stdoutLines = [];
        } else {
          const val = args[0].toLowerCase();
          let bgCode = "0";
          let fgCode = "7";
          if (val.length === 1) {
            fgCode = val[0];
          } else if (val.length === 2) {
            bgCode = val[0];
            fgCode = val[1];
          }

          if (COLOR_MAP[bgCode] && COLOR_MAP[fgCode]) {
            if (bgCode === fgCode) {
              stdoutLines = ["Error: Foreground and background colors cannot be the same."];
              isError = true;
            } else {
              setThemeColors({
                bg: COLOR_MAP[bgCode],
                text: COLOR_MAP[fgCode]
              });
              stdoutLines = [];
            }
          } else {
            stdoutLines = ["Error: Invalid color scheme attribute hex character."];
            isError = true;
          }
        }
        break;

      case "cd":
        const targetCD = args.join(" ");
        if (!targetCD) {
          stdoutLines = [currentPath];
        } else {
          const resolved = resolvePath(currentPath, targetCD);
          if (fs[resolved] && fs[resolved].isDir) {
            setCurrentPath(resolved);
            stdoutLines = [];
          } else {
            stdoutLines = ["The system cannot find the path specified."];
            isError = true;
          }
        }
        break;

      case "dir":
        const isWide = args.some(a => a.toLowerCase() === "/w");
        const parentPrefix = currentPath.endsWith("\\") ? currentPath : currentPath + "\\";
        const dirsList: string[] = [];
        const filesList: { name: string; size: number }[] = [];

        Object.keys(fs).forEach(key => {
          if (key === currentPath) return;
          if (key.startsWith(parentPrefix)) {
            const sub = key.slice(parentPrefix.length);
            if (!sub.includes("\\")) {
              if (fs[key].isDir) {
                dirsList.push(sub);
              } else {
                filesList.push({ name: sub, size: fs[key].content?.length || 0 });
              }
            }
          }
        });

        if (isWide) {
          const allNames = [...dirsList.map(d => `[${d}]`), ...filesList.map(f => f.name)];
          stdoutLines = [
            ` Directory of ${currentPath}`,
            "",
            allNames.join("      "),
            `               ${filesList.length} File(s)             ${filesList.reduce((acc, f) => acc + f.size, 0)} bytes`,
            `               ${dirsList.length} Dir(s)   98,415,342 KB free`
          ];
        } else {
          const listLines = [
            ` Directory of ${currentPath}`,
            ""
          ];
          
          dirsList.forEach(d => {
            listLines.push(`07/10/2026  12:00 PM    <DIR>          ${d}`);
          });
          filesList.forEach(f => {
            listLines.push(`07/10/2026  12:00 PM                ${f.size} ${f.name}`);
          });

          listLines.push(
            `               ${filesList.length} File(s)             ${filesList.reduce((acc, f) => acc + f.size, 0)} bytes`,
            `               ${dirsList.length} Dir(s)   98,415,342 KB free`
          );
          stdoutLines = listLines;
        }
        break;

      case "mkdir":
      case "md":
        const targetMkdir = args.join(" ");
        if (!targetMkdir) {
          stdoutLines = ["A subdirectory or file already exists or command parameters incorrect."];
          isError = true;
        } else {
          const resolved = resolvePath(currentPath, targetMkdir);
          if (fs[resolved]) {
            stdoutLines = [`A subdirectory or file '${targetMkdir}' already exists.`];
            isError = true;
          } else {
            setFs(prev => ({
              ...prev,
              [resolved]: { isDir: true }
            }));
            stdoutLines = [];
          }
        }
        break;

      case "rmdir":
      case "rd":
        const targetRmdir = args.join(" ");
        if (!targetRmdir) {
          stdoutLines = ["The syntax of the command is incorrect."];
          isError = true;
        } else {
          const resolved = resolvePath(currentPath, targetRmdir);
          if (fs[resolved] && fs[resolved].isDir) {
            // Remove matching keys
            setFs(prev => {
              const next = { ...prev };
              Object.keys(next).forEach(k => {
                if (k === resolved || k.startsWith(resolved + "\\")) {
                  delete next[k];
                }
              });
              return next;
            });
            stdoutLines = [];
          } else {
            stdoutLines = ["The system cannot find the file specified."];
            isError = true;
          }
        }
        break;

      case "type":
        const targetType = args.join(" ");
        if (!targetType) {
          stdoutLines = ["The syntax of the command is incorrect."];
          isError = true;
        } else {
          const resolved = resolvePath(currentPath, targetType);
          if (fs[resolved] && !fs[resolved].isDir) {
            stdoutLines = [fs[resolved].content || ""];
          } else {
            stdoutLines = [`The system cannot find the file specified: '${targetType}'`];
            isError = true;
          }
        }
        break;

      case "copy":
        const srcCopy = args[0];
        const destCopy = args[1];
        if (!srcCopy || !destCopy) {
          stdoutLines = ["The syntax of the command is incorrect."];
          isError = true;
        } else {
          const srcResolved = resolvePath(currentPath, srcCopy);
          const destResolved = resolvePath(currentPath, destCopy);

          if (fs[srcResolved] && !fs[srcResolved].isDir) {
            let targetKey = destResolved;
            // If dest is a directory, append filename
            if (fs[destResolved] && fs[destResolved].isDir) {
              const filename = srcResolved.split("\\").pop() || "copied.txt";
              targetKey = destResolved.endsWith("\\") ? destResolved + filename : destResolved + "\\" + filename;
            }

            setFs(prev => ({
              ...prev,
              [targetKey]: {
                isDir: false,
                content: prev[srcResolved].content || "",
                isReadOnly: false,
                isHidden: false
              }
            }));
            stdoutLines = ["        1 file(s) copied."];
          } else {
            stdoutLines = ["The system cannot find the file specified."];
            isError = true;
          }
        }
        break;

      case "move":
        const srcMove = args[0];
        const destMove = args[1];
        if (!srcMove || !destMove) {
          stdoutLines = ["The syntax of the command is incorrect."];
          isError = true;
        } else {
          const srcResolved = resolvePath(currentPath, srcMove);
          const destResolved = resolvePath(currentPath, destMove);

          if (fs[srcResolved]) {
            let targetKey = destResolved;
            if (fs[destResolved] && fs[destResolved].isDir) {
              const itemname = srcResolved.split("\\").pop() || "moved_item";
              targetKey = destResolved.endsWith("\\") ? destResolved + itemname : destResolved + "\\" + itemname;
            }

            if (fs[srcResolved].isReadOnly) {
              stdoutLines = ["Access is denied (File is Read-Only)."];
              isError = true;
            } else {
              setFs(prev => {
                const next = { ...prev };
                const sourceItem = next[srcResolved];
                delete next[srcResolved];
                next[targetKey] = sourceItem;
                // Move subfolders if directory
                if (sourceItem.isDir) {
                  Object.keys(next).forEach(k => {
                    if (k.startsWith(srcResolved + "\\")) {
                      const relativePart = k.slice(srcResolved.length);
                      next[targetKey + relativePart] = next[k];
                      delete next[k];
                    }
                  });
                }
                return next;
              });
              stdoutLines = ["        1 file(s) moved."];
            }
          } else {
            stdoutLines = ["The system cannot find the file specified."];
            isError = true;
          }
        }
        break;

      case "del":
      case "erase":
        const targetDel = args.join(" ");
        if (!targetDel) {
          stdoutLines = ["The syntax of the command is incorrect."];
          isError = true;
        } else {
          const resolved = resolvePath(currentPath, targetDel);
          if (fs[resolved] && !fs[resolved].isDir) {
            if (fs[resolved].isReadOnly) {
              stdoutLines = ["Access is denied (File is Read-Only)."];
              isError = true;
            } else {
              setFs(prev => {
                const next = { ...prev };
                delete next[resolved];
                return next;
              });
              stdoutLines = [];
            }
          } else {
            stdoutLines = ["Could Not Find " + targetDel];
            isError = true;
          }
        }
        break;

      case "ren":
      case "rename":
        const oldRen = args[0];
        const newRen = args[1];
        if (!oldRen || !newRen) {
          stdoutLines = ["The syntax of the command is incorrect."];
          isError = true;
        } else {
          const oldResolved = resolvePath(currentPath, oldRen);
          // Rename only in the same folder context
          const parentFolder = oldResolved.substring(0, oldResolved.lastIndexOf("\\"));
          const newResolved = parentFolder + "\\" + newRen.toUpperCase();

          if (fs[oldResolved]) {
            if (fs[oldResolved].isReadOnly) {
              stdoutLines = ["Access is denied (File is Read-Only)."];
              isError = true;
            } else if (fs[newResolved]) {
              stdoutLines = ["A duplicate file name exists, or the file cannot be found."];
              isError = true;
            } else {
              setFs(prev => {
                const next = { ...prev };
                const oldObj = next[oldResolved];
                delete next[oldResolved];
                next[newResolved] = oldObj;
                
                // Move subfolders recursively
                if (oldObj.isDir) {
                  Object.keys(next).forEach(k => {
                    if (k.startsWith(oldResolved + "\\")) {
                      const sub = k.slice(oldResolved.length);
                      next[newResolved + sub] = next[k];
                      delete next[k];
                    }
                  });
                }
                return next;
              });
              stdoutLines = [];
            }
          } else {
            stdoutLines = ["The system cannot find the file specified."];
            isError = true;
          }
        }
        break;

      case "attrib":
        if (!args[0]) {
          // List files and attributes
          const lines: string[] = [];
          const parent = currentPath.endsWith("\\") ? currentPath : currentPath + "\\";
          Object.keys(fs).forEach(k => {
            if (k.startsWith(parent)) {
              const sub = k.slice(parent.length);
              if (!sub.includes("\\")) {
                const item = fs[k];
                const r = item.isReadOnly ? "R" : " ";
                const h = item.isHidden ? "H" : " ";
                lines.push(`${r}   ${h}     ${k}`);
              }
            }
          });
          stdoutLines = lines;
        } else {
          const attribFlag = args[0].toLowerCase();
          const fileName = args[1];
          if (!fileName) {
            stdoutLines = ["The syntax of the command is incorrect."];
            isError = true;
          } else {
            const fileResolved = resolvePath(currentPath, fileName);
            if (fs[fileResolved]) {
              setFs(prev => {
                const next = { ...prev };
                if (attribFlag === "+r") next[fileResolved].isReadOnly = true;
                if (attribFlag === "-r") next[fileResolved].isReadOnly = false;
                if (attribFlag === "+h") next[fileResolved].isHidden = true;
                if (attribFlag === "-h") next[fileResolved].isHidden = false;
                return next;
              });
              stdoutLines = [];
            } else {
              stdoutLines = ["File not found - " + fileName];
              isError = true;
            }
          }
        }
        break;

      case "tree":
        const treeLines = buildTreeString(currentPath);
        if (treeLines.length === 0) {
          stdoutLines = ["No subfolders exist."];
        } else {
          stdoutLines = [
            `Folder PATH listing for volume C`,
            `Volume serial number is B48C-9F12`,
            currentPath,
            ...treeLines
          ];
        }
        break;

      case "title":
        if (args.length === 0) {
          stdoutLines = ["Usage: title <new_title>"];
          isError = true;
        } else {
          setTerminalTitle(args.join(" "));
          stdoutLines = [];
        }
        break;

      case "set":
        if (args.length === 0) {
          stdoutLines = Object.keys(envVars).map(k => `${k}=${envVars[k]}`);
        } else {
          const fullArg = args.join(" ");
          const eqIdx = fullArg.indexOf("=");
          if (eqIdx !== -1) {
            const varName = fullArg.substring(0, eqIdx).trim().toUpperCase();
            const varVal = fullArg.substring(eqIdx + 1).trim();
            setEnvVars(prev => ({
              ...prev,
              [varName]: varVal
            }));
            stdoutLines = [];
          } else {
            const varName = args[0].toUpperCase();
            stdoutLines = [`${varName}=${envVars[varName] || ""}`];
          }
        }
        break;

      case "powershell":
        setShellMode("powershell");
        stdoutLines = [
          "Windows PowerShell",
          "Copyright (C) Microsoft Corporation. All rights reserved.",
          "",
          "Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows",
          ""
        ];
        break;

      case "diskpart":
        setShellMode("diskpart");
        setDiskpartDisk(null);
        setDiskpartPartition(null);
        stdoutLines = [
          "Microsoft DiskPart version 10.0.22621.1",
          "",
          "Copyright (C) Microsoft Corporation.",
          "On computer: DESKTOP-NEXTSEM",
          "",
          "DiskPart is an interactive partition utility. Type 'help' for instructions.",
          ""
        ];
        break;

      case "get-service":
        if (shellMode !== "powershell") {
          stdoutLines = [`'${command}' is not recognized as an internal or external command,`, "operable program or batch file. Type 'help' for support."];
          isError = true;
        } else {
          stdoutLines = [
            "Status   Name               DisplayName",
            "------   ----               -----------",
            "Running  AppIDSvc           Application Identity",
            "Running  AudioSvc           Windows Audio",
            "Stopped  BluetoothSupport   Bluetooth Support Service",
            "Running  CryptSvc           Cryptographic Services",
            "Running  Dhcp               DHCP Client",
            "Running  Dnscache           DNS Client",
            "Running  EventLog           Windows Event Log",
            "Stopped  Spooler            Print Spooler"
          ];
        }
        break;

      case "get-process":
        if (shellMode !== "powershell") {
          stdoutLines = [`'${command}' is not recognized as an internal or external command,`, "operable program or batch file. Type 'help' for support."];
          isError = true;
        } else {
          stdoutLines = [
            "Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName",
            "-------  ------    -----      -----     ------     --  -- -----------",
            "    210      12     8420      24120       0.45   5904   1 cmd",
            "    890      45   324500     412000      23.14   8412   1 chrome",
            "   1120      60   142400     195000       4.12   3212   1 explorer",
            "    150       8     4520      12400       0.12    744   0 services"
          ];
        }
        break;

      case "shutdown":
        const isRestart = args.includes("/r") || args.includes("/R");
        const isShutdown = args.includes("/s") || args.includes("/S");
        const isAbort = args.includes("/a") || args.includes("/A");
        
        if (isAbort) {
          if (shutdownTimerVal) {
            clearTimeout(shutdownTimerVal);
            setShutdownTimerVal(null);
            stdoutLines = ["The system shutdown has been aborted."];
          } else {
            stdoutLines = ["Unable to abort the system shutdown because no shutdown was in progress."];
            isError = true;
          }
        } else if (isShutdown || isRestart) {
          let timeoutSec = 5;
          const tIdx = args.findIndex(v => v.toLowerCase() === "/t");
          if (tIdx !== -1 && args[tIdx + 1]) {
            timeoutSec = parseInt(args[tIdx + 1], 10) || 5;
          }
          
          stdoutLines = [`This system will shut down in ${timeoutSec} seconds.`];
          
          if (shutdownTimerVal) clearTimeout(shutdownTimerVal);
          
          const timer = setTimeout(() => {
            handleSignOut();
          }, timeoutSec * 1000);
          setShutdownTimerVal(timer);
        } else {
          stdoutLines = ["Usage: shutdown [/s | /r | /a] [/t xxx]"];
        }
        break;

      case "gpupdate":
        stdoutLines = [
          "Updating policy...",
          "Computer Policy update has completed successfully.",
          "User Policy update has completed successfully."
        ];
        break;

      case "driverquery":
        stdoutLines = [
          "Module Name  Display Name           Driver Type   Link Date",
          "===========  =====================  ============  ====================",
          "AppID        AppID Driver           Kernel        07/10/2026 12:00:00",
          "disk         Disk Driver            Kernel        07/10/2026 12:00:00",
          "intelpep     Intel Power Engine     Kernel        07/10/2026 12:00:00",
          "ntfs         NTFS File System       File System   07/10/2026 12:00:00",
          "pci          PCI Bus Driver         Kernel        07/10/2026 12:00:00"
        ];
        break;

      case "schtasks":
        stdoutLines = [
          "Folder: \\",
          "TaskName                                 Next Run Time          Status",
          "======================================== ====================== ===============",
          "\\NextsemUpdateCheck                      07/11/2026 10:00:00 AM Ready",
          "\\OneDrive Reporting                      07/11/2026 12:00:00 PM Ready"
        ];
        break;

      case "robocopy":
        const srcRobo = args[0];
        const destRobo = args[1];
        if (!srcRobo || !destRobo) {
          stdoutLines = ["Usage: robocopy <source> <destination>"];
          isError = true;
        } else {
          const srcRes = resolvePath(currentPath, srcRobo);
          const destRes = resolvePath(currentPath, destRobo);
          if (fs[srcRes] && !fs[srcRes].isDir) {
            setFs(prev => ({
              ...prev,
              [destRes]: {
                isDir: false,
                content: prev[srcRes].content || "",
                isReadOnly: false,
                isHidden: false
              }
            }));
            stdoutLines = [
              "-------------------------------------------------------------------------------",
              "   ROBOCOPY     ::     Robust File Copy for Windows",
              "-------------------------------------------------------------------------------",
              "  Started : " + new Date().toLocaleString(),
              "   Source : " + currentPath,
              "     Dest : " + currentPath,
              "    Files : " + srcRobo,
              "  Options : /DCOPY:DA /COPY:DAT /R:1000000 /W:30",
              "",
              "Total    Copied   Skipped  Mismatch    FAILED    Extras",
              " Dirs :         1         0         1         0         0         0",
              "Files :         1         1         0         0         0         0"
            ];
          } else {
            stdoutLines = ["Error: Source file not found."];
            isError = true;
          }
        }
        break;

      case "assoc":
        stdoutLines = [
          ".txt=txtfile",
          ".html=htmlfile",
          ".js=jsfile",
          ".json=jsonfile",
          ".css=cssfile"
        ];
        break;

      case "ftype":
        stdoutLines = [
          "txtfile=notepad.exe \"%1\"",
          "htmlfile=chrome.exe \"%1\"",
          "jsfile=node.exe \"%1\"",
          "cssfile=notepad.exe \"%1\""
        ];
        break;

      case "wmic":
        const targetWmic = args[1]?.toLowerCase();
        if (targetWmic === "cpu") {
          stdoutLines = ["Name", "Intel(R) Core(TM) i7-12700H CPU @ 2.70GHz"];
        } else if (targetWmic === "bios") {
          stdoutLines = ["SerialNumber", "B48C-9F12"];
        } else {
          stdoutLines = ["Usage: wmic <alias> get <property> (e.g. wmic cpu get name)"];
        }
        break;

      case "getmac":
        stdoutLines = [
          "Physical Address    Transport Name",
          "=================== =========================================================",
          "E8-11-32-A5-92-CF   \\Device\\Tcpip_{4546B48C-9F12-42FF-B326-1000000AA523}"
        ];
        break;

      case "format":
        const targetFormat = args[0]?.toUpperCase();
        if (targetFormat === "D:") {
          setFormatPendingConfirm(true);
          stdoutLines = [
            "WARNING, ALL DATA ON NON-REMOVABLE DISK DRIVE D: WILL BE LOST!",
            "Proceed with Format (Y/N)?"
          ];
        } else if (!targetFormat) {
          stdoutLines = ["Required parameter missing. Try: format D:"];
          isError = true;
        } else {
          stdoutLines = ["Access is denied. Cannot format active system drive " + targetFormat];
          isError = true;
        }
        break;

      case "fc":
        const file1 = args[0];
        const file2 = args[1];
        if (!file1 || !file2) {
          stdoutLines = ["Usage: fc <file1> <file2>"];
          isError = true;
        } else {
          const path1 = resolvePath(currentPath, file1);
          const path2 = resolvePath(currentPath, file2);
          if (fs[path1] && !fs[path1].isDir && fs[path2] && !fs[path2].isDir) {
            const c1 = fs[path1].content || "";
            const c2 = fs[path2].content || "";
            if (c1 === c2) {
              stdoutLines = ["FC: no differences encountered"];
            } else {
              stdoutLines = [
                "Comparing files " + file1 + " and " + file2,
                `***** ${file1}`,
                c1,
                "*****",
                `***** ${file2}`,
                c2,
                "*****"
              ];
            }
          } else {
            stdoutLines = ["FC: cannot open file(s) for comparison."];
            isError = true;
          }
        }
        break;

      case "find":
        let findText = args[0];
        const findFile = args[1];
        if (!findText || !findFile) {
          stdoutLines = ["Usage: find \"text\" <filename>"];
          isError = true;
        } else {
          findText = findText.replace(/['"]/g, "");
          const filePath = resolvePath(currentPath, findFile);
          if (fs[filePath] && !fs[filePath].isDir) {
            const fileLines = (fs[filePath].content || "").split("\n");
            const matches = fileLines.filter(l => l.toLowerCase().includes(findText.toLowerCase()));
            stdoutLines = [
              `---------- ${findFile.toUpperCase()}`,
              ...matches
            ];
          } else {
            stdoutLines = ["FIND: File not found - " + findFile];
            isError = true;
          }
        }
        break;

      default:
        stdoutLines = [`'${command}' is not recognized as an internal or external command,`, "operable program or batch file. Type 'help' for support."];
        isError = true;
        break;
    }

    // Redirect to clipboard if piped to clip
    if (isPiped && pipeTarget === "clip") {
      const clipboardText = stdoutLines.join("\n");
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(clipboardText).catch(() => {});
      }
      stdoutLines = ["Success: Output copied to clipboard."];
    }

    // Redirect to file handler
    if (redirectFile) {
      if (redirectFile.includes(" ")) {
        stdoutLines = ["Error: Space detected in destination filename."];
        isError = true;
      } else {
        const fileResolved = resolvePath(currentPath, redirectFile);
        const existing = fs[fileResolved];
        if (existing && existing.isReadOnly) {
          stdoutLines = ["Access is denied (File is Read-Only)."];
          isError = true;
        } else {
          const writtenContent = stdoutLines.join("\n");
          setFs(prev => {
            const prevContent = (isAppend && prev[fileResolved]?.content) ? prev[fileResolved].content + "\n" : "";
            return {
              ...prev,
              [fileResolved]: {
                isDir: false,
                content: prevContent + writtenContent,
                isReadOnly: false,
                isHidden: false
              }
            };
          });
          stdoutLines = [];
        }
      }
    }

    // Append output lines to console history
    const finalHistory = [...newHistory];
    stdoutLines.forEach(l => {
      finalHistory.push({ text: l, type: isError ? "error" : "output" });
    });
    finalHistory.push({ text: "", type: "output" });
    
    setHistory(finalHistory);
    setInputVal("");

    // Validate step
    checkLessonCompletion(trimmed);
  };

  // Simulated Async ping / chkdsk / sfc / tracert / format
  const runAsync = (type: "ping" | "chkdsk" | "sfc" | "tracert" | "format", args: string[], baseHistory: HistoryLine[]) => {
    setIsWorking(true);
    let step = 0;

    if (type === "ping") {
      const target = args[0] || "nextsem.online";
      const localHist = [...baseHistory];

      const interval = setInterval(() => {
        step++;
        if (step === 1) {
          localHist.push({ text: `Pinging ${target} [199.36.158.100] with 32 bytes of data:`, type: "output" });
          setHistory([...localHist]);
        } else if (step <= 5) {
          const latency = Math.floor(Math.random() * 8) + 12;
          localHist.push({ text: `Reply from 199.36.158.100: bytes=32 time=${latency}ms TTL=54`, type: "output" });
          setHistory([...localHist]);
        } else {
          clearInterval(interval);
          localHist.push(
            { text: "", type: "output" },
            { text: `Ping statistics for ${target}:`, type: "output" },
            { text: `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`, type: "output" },
            { text: `Approximate round trip times in milli-seconds:`, type: "output" },
            { text: `    Minimum = 12ms, Maximum = 20ms, Average = 15ms`, type: "output" },
            { text: "", type: "output" }
          );
          setHistory(localHist);
          setIsWorking(false);
          checkLessonCompletion("ping " + target);
        }
      }, 500);
    } else if (type === "chkdsk") {
      const localHist = [...baseHistory];
      localHist.push({ text: "The type of the file system is NTFS.", type: "output" });
      setHistory([...localHist]);

      const interval = setInterval(() => {
        step++;
        if (step === 1) {
          localHist.push({ text: "Stage 1: Examining basic file system structure...", type: "output" });
          setHistory([...localHist]);
        } else if (step === 2) {
          localHist.push({ text: "Stage 2: Examining file name linkage...", type: "output" });
          setHistory([...localHist]);
        } else if (step === 3) {
          localHist.push({ text: "Stage 3: Examining security descriptors...", type: "output" });
          setHistory([...localHist]);
        } else {
          clearInterval(interval);
          localHist.push(
            { text: "Windows has scanned the file system and found no problems.", type: "output" },
            { text: "No further action is required.", type: "output" },
            { text: "   98,421,098 KB total disk space.", type: "output" },
            { text: "        1,244 KB in 12 files.", type: "output" },
            { text: "        4,512 KB in 9 folders.", type: "output" },
            { text: "   98,415,342 KB available on disk.", type: "output" },
            { text: "", type: "output" }
          );
          setHistory(localHist);
          setIsWorking(false);
        }
      }, 600);
    } else if (type === "sfc") {
      const localHist = [...baseHistory];
      localHist.push({ text: "Beginning system scan. This process will take some time.", type: "output" });
      localHist.push({ text: "Beginning verification phase of system scan.", type: "output" });
      setHistory([...localHist]);

      const interval = setInterval(() => {
        step++;
        if (step === 1) {
          localHist.push({ text: "Verification 20% complete.", type: "output" });
          setHistory([...localHist]);
        } else if (step === 2) {
          localHist.push({ text: "Verification 50% complete.", type: "output" });
          setHistory([...localHist]);
        } else if (step === 3) {
          localHist.push({ text: "Verification 80% complete.", type: "output" });
          setHistory([...localHist]);
        } else if (step === 4) {
          localHist.push({ text: "Verification 100% complete.", type: "output" });
          setHistory([...localHist]);
        } else {
          clearInterval(interval);
          localHist.push(
            { text: "Windows Resource Protection did not find any integrity violations.", type: "output" },
            { text: "", type: "output" }
          );
          setHistory(localHist);
          setIsWorking(false);
        }
      }, 500);
    } else if (type === "tracert") {
      const target = args[0] || "nextsem.online";
      const localHist = [...baseHistory];
      localHist.push({ text: `Tracing route to ${target} [199.36.158.100] over a maximum of 30 hops:`, type: "output" });
      setHistory([...localHist]);

      const interval = setInterval(() => {
        step++;
        if (step === 1) {
          localHist.push({ text: "  1    <1 ms    <1 ms    <1 ms  192.168.1.1", type: "output" });
          setHistory([...localHist]);
        } else if (step === 2) {
          localHist.push({ text: "  2     1 ms     1 ms     1 ms  10.0.0.1", type: "output" });
          setHistory([...localHist]);
        } else if (step === 3) {
          localHist.push({ text: "  3    12 ms    10 ms    11 ms  72.14.232.12", type: "output" });
          setHistory([...localHist]);
        } else if (step === 4) {
          localHist.push({ text: "  4    15 ms    14 ms    14 ms  199.36.158.100", type: "output" });
          setHistory([...localHist]);
        } else {
          clearInterval(interval);
          localHist.push({ text: "Trace complete.", type: "output" }, { text: "", type: "output" });
          setHistory(localHist);
          setIsWorking(false);
        }
      }, 500);
    } else if (type === "format") {
      const localHist = [...baseHistory];
      localHist.push({ text: "Formatting D: drive...", type: "output" });
      setHistory([...localHist]);

      const interval = setInterval(() => {
        step++;
        if (step === 1) {
          localHist.push({ text: "Creating file system structures...", type: "output" });
          setHistory([...localHist]);
        } else if (step === 2) {
          localHist.push({ text: "Verifying 50.0 GB...", type: "output" });
          setHistory([...localHist]);
        } else {
          clearInterval(interval);
          setFs(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(k => {
              if (k.startsWith("D:\\") && k !== "D:") {
                delete next[k];
              }
            });
            return next;
          });
          localHist.push(
            { text: "Format complete.", type: "output" },
            { text: "D: drive now has 53,687,091,200 bytes of free space.", type: "output" },
            { text: "", type: "output" }
          );
          setHistory(localHist);
          setIsWorking(false);
        }
      }, 600);
    }
  };

  // Lesson Step Validation Trigger
  const checkLessonCompletion = (enteredCmd: string) => {
    if (certified) return; // already certified

    const currentStep = SIMULATOR_STEPS[stepIdx];
    if (!currentStep) return;

    // Normalizing comparisons
    const entered = enteredCmd.trim().toLowerCase().replace(/\s+/g, " ");
    const expected = currentStep.expectedCommand.trim().toLowerCase().replace(/\s+/g, " ");

    let match = false;
    if (expected === "git clone https://github.com/nextsem-labs/advanced-react") {
      match = entered.startsWith("git clone");
    } else if (expected === "npm install") {
      match = entered.startsWith("npm install");
    } else if (expected === "npm start") {
      match = entered.startsWith("npm start");
    } else {
      match = entered === expected;
    }

    if (match) {
      // Correct command entered! Move to next step
      const nextStepIdx = stepIdx + 1;
      const isLastStep = nextStepIdx >= SIMULATOR_STEPS.length;
      
      const newPoints = (stepIdx + 1) * 100;
      setPoints(newPoints);

      if (isLastStep) {
        setCertified(true);
        setShowCertOverlay(true);
        saveProgress(stepIdx, true);
        setHistory(prev => [
          ...prev,
          { text: `[SYSTEM ALERT] ${currentStep.successMsg}`, type: "system" },
          { text: `+100 XP gained! Total XP: ${newPoints}`, type: "system" },
          { text: "Redirecting to next lesson: Windows CLI Chapter 1 in 3 seconds...", type: "system" },
          { text: "", type: "output" }
        ]);
        setTimeout(() => {
          router.push("/book/cli-ch1-basics");
        }, 3000);
        setShowHint(false);
      } else {
        setStepIdx(nextStepIdx);
        saveProgress(nextStepIdx, false);
        // Add success response banner inside command history log
        setHistory(prev => [
          ...prev,
          { text: `[SYSTEM ALERT] ${currentStep.successMsg}`, type: "system" },
          { text: `+100 XP gained! Total XP: ${newPoints}`, type: "system" },
          { text: "", type: "output" }
        ]);
        setShowHint(false);
      }
    }
  };

  const handleLessonSkip = () => {
    if (stepIdx < SIMULATOR_STEPS.length - 1) {
      const nextStep = stepIdx + 1;
      setStepIdx(nextStep);
      setPoints(nextStep * 100);
      saveProgress(nextStep, false);
      
      setHistory(prev => [
        ...prev,
        { text: `[SYSTEM] Skipped to Lesson ${nextStep + 1}: ${SIMULATOR_STEPS[nextStep].title}`, type: "system" },
        { text: "", type: "output" }
      ]);
    }
  };

  const resetAllProgress = () => {
    if (!user) return;
    setStepIdx(0);
    setPoints(0);
    setCertified(false);
    setShowCertOverlay(false);
    saveProgress(0, false);

    setHistory([
      { text: "Microsoft Windows [Version 10.0.22621.1702]", type: "output" },
      { text: "(c) Microsoft Corporation. All rights reserved.", type: "output" },
      { text: "", type: "output" },
      { text: "Console session reset. All lesson progress cleared successfully.", type: "system" },
      { text: "", type: "output" }
    ]);
  };



  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground font-mono transition-colors">
        <RefreshCw size={24} className="animate-spin text-emerald-400 mb-3" />
        <span className="text-[10px] uppercase tracking-widest text-slate-550 font-bold">Synchronizing Terminal Session...</span>
      </div>
    );
  }

  // Enforce authentication before starting the simulator
  if (!user) {
    return (
      <div className="min-h-screen w-screen bg-[#050914] text-[#c5c9d6] flex items-center justify-center font-mono p-4 select-none relative bg-[radial-gradient(rgba(193,166,72,0.15)_1px,transparent_1px)] [background-size:24px_24px]">
        
        {/* Background Terminal Window Frame */}
        <div className="max-w-md w-full bg-[#0c0c0c] border border-red-500/25 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
          
          {/* Header Bar */}
          <div className="bg-[#1f1f1f] px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80 select-none">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-red-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">cmd.exe - Restricted Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>

          {/* Console Text Panel */}
          <div className="p-6 space-y-6 text-left text-xs leading-relaxed">
            <div className="space-y-1">
              <p className="text-slate-500 font-mono">Microsoft Windows [Version 10.0.26200.8875]</p>
              <p className="text-slate-500 font-mono">(c) Microsoft Corporation. All rights reserved.</p>
            </div>

            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2 text-red-400">
              <div className="flex items-center gap-2 font-bold text-sm uppercase">
                <ShieldAlert size={16} />
                <span>Access Denied</span>
              </div>
              <p className="text-[11px] leading-normal font-sans">
                Command Simulator requires user session authentication. Please sign in to sync and persist your terminal progress.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-slate-350 font-sans">
                Type or press the sign-in button below to initialize connection parameters and verify your Google developer session.
              </p>

              <button 
                onClick={handleSignIn}
                className="w-full py-3 bg-[#c1a648] hover:bg-[#a38b3a] text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-98"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span className="font-mono">Sign In with Google</span>
              </button>

              <button 
                onClick={() => router.push('/')}
                className="w-full py-2.5 bg-transparent hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={12} />
                <span className="font-mono">Return to Landing Page</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between select-none">
      <div className="flex flex-col gap-6 overflow-y-auto pr-1">
        <Link href="/" className="flex items-center gap-2 select-none group shrink-0">
          <img src="/logo.svg" alt="Nextsem Logo" className="w-8 h-8 rounded-lg border border-emerald-500/20 group-hover:scale-105 transition-transform select-none" />
          <span className="font-black text-base tracking-tight text-white uppercase">
            Nextsem<span className="text-[#04AA6D] lowercase font-bold">.online</span>
          </span>
        </Link>

        {/* Lessons List */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block px-2 font-mono">CMD Lessons (5)</span>
          <div className="space-y-1">
            {SIMULATOR_STEPS.map((step, idx) => {
              const isLocked = idx > maxStepIdx;
              const isActive = !isSandboxOpen && !isQuizOpen && idx === stepIdx;
              const isDone = idx < maxStepIdx;

              return (
                <button
                  key={step.id}
                  disabled={isLocked}
                  onClick={() => {
                    setStepIdx(idx);
                    setIsSandboxOpen(false);
                    setIsQuizOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between border ${
                    isActive 
                      ? "bg-[#04AA6D]/10 border-[#04AA6D]/25 text-[#04AA6D]"
                      : isLocked
                      ? "opacity-35 border-transparent text-slate-500 cursor-not-allowed"
                      : "hover:bg-slate-850/50 border-transparent text-slate-350 hover:text-white"
                  }`}
                >
                  <span className="truncate pr-1.5">{idx + 1}. {step.title.split('. ')[1] || step.title}</span>
                  {(isDone || certified) && <CheckCircle size={11} className="text-emerald-400 shrink-0" />}
                  {isLocked && !certified && <LockKeyhole size={9} className="text-slate-550 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Playgrounds & Quizzes */}
        <div className="space-y-1.5 pt-2 border-t border-slate-850/50">
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block px-2 font-mono">Exercises & Assess</span>
          
          <button
            onClick={() => {
              setIsSandboxOpen(true);
              setIsQuizOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 border ${
              isSandboxOpen && !isQuizOpen
                ? "bg-[#04AA6D]/10 border-[#04AA6D]/25 text-[#04AA6D]"
                : "hover:bg-slate-850/50 border-transparent text-slate-355 hover:text-white"
            }`}
          >
            <Terminal size={13} className="shrink-0" />
            <span>💻 CMD Sandbox Console</span>
          </button>

          <button
            onClick={() => {
              setIsQuizOpen(true);
              setIsSandboxOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 border ${
              isQuizOpen
                ? "bg-[#04AA6D]/10 border-[#04AA6D]/25 text-[#04AA6D]"
                : "hover:bg-slate-850/50 border-transparent text-slate-355 hover:text-white"
            }`}
          >
            <Award size={13} className="shrink-0" />
            <span>📝 CMD Assessment Quiz</span>
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
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-650 text-white flex items-center justify-center font-black text-xs">
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
                <span className="text-[#39FF14]">⚡ CMD Progress {Math.min(5, maxStepIdx + 1)}/5</span>
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

  const currentStep = SIMULATOR_STEPS[stepIdx];

  return (
    <div className="min-h-screen w-screen bg-background text-foreground overflow-x-hidden font-sans select-none relative bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] [background-size:32px_32px] flex flex-col lg:flex-row transition-colors">
      
      {/* ── MOBILE MENU SIDEBAR (DRAWER OVERLAY) ── */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <aside 
        className={`fixed inset-y-0 left-0 w-72 bg-[#070b19]/95 backdrop-blur-xl border-r border-slate-800/80 z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderSidebarContent()}
      </aside>

      {/* ── DESKTOP LEFT SIDEBAR ── */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-800/80 bg-[#070b19]/35 backdrop-blur-md p-6 h-screen sticky top-0 shrink-0 justify-between z-20">
        {renderSidebarContent()}
      </aside>

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* ── MOBILE HEADER (Visible on mobile/tablet) ── */}
        <header className="w-full flex lg:hidden items-center justify-between px-4 py-3 bg-[#0d1225]/40 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
            
            <Link href="/" className="flex items-center gap-2 select-none group">
              <img src="/logo.svg" alt="Nextsem Logo" className="w-6 h-6 rounded-lg border border-emerald-500/20 group-hover:scale-105 transition-transform select-none" />
              <span className="font-black text-sm tracking-tight text-white uppercase">
                Nextsem<span className="text-[#04AA6D] lowercase font-bold">.online</span>
              </span>
            </Link>
          </div>

          {/* Small User Stats Avatar on Mobile Header */}
          <div>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-rose-500 flex items-center gap-0.5">❤️ <span className="text-white">450</span></span>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-slate-800" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-650 text-white flex items-center justify-center font-black text-[10px]">
                    {user.name[0]}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="px-2.5 py-1 bg-violet-650 hover:bg-violet-600 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none relative z-10">
        
        {/* ── LEFT COLUMN: CMD WINDOW (lg:col-span-7) ── */}
        <div className="lg:col-span-7 flex flex-col min-h-[480px] bg-black border-2 border-emerald-500/40 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
          
          {/* Windows Administrator Bar */}
          <div className="bg-[#1d1d1f] border-b border-[#2d2d2f] flex items-center justify-between px-4 select-none shrink-0 py-2">
            <div className="flex items-center gap-2">
              <Terminal size={11} className="text-[#39FF14]" />
              <span className="font-mono text-[10px] text-slate-300 font-bold select-none">
                Administrator: C:\Windows\System32\cmd.exe
              </span>
            </div>
            {/* Window control buttons */}
            <div className="flex items-center gap-3 text-slate-500 hover:text-slate-300 transition-colors text-xs pr-1">
              <span className="cursor-pointer font-light select-none hover:text-white transition-colors">─</span>
              <span className="cursor-pointer font-light select-none hover:text-white transition-colors">☐</span>
              <span className="cursor-pointer font-light select-none hover:text-rose-500 transition-colors">✕</span>
            </div>
          </div>

          {/* Console Buffer */}
          <div 
            ref={consoleBufferRef}
            onClick={focusInput}
            className="flex-1 p-5 overflow-y-auto font-mono text-xs select-text scrollbar-thin cursor-text transition-colors duration-200"
            style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
          >
            <div className="space-y-1">
              {history.map((line, idx) => {
                let colorClass = "";
                if (line.type === "error") colorClass = "text-rose-500 font-bold";
                if (line.type === "system") colorClass = "text-emerald-500 font-bold";
                return (
                  <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                    {line.text}
                  </div>
                );
              })}

              {/* Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand(inputVal);
                }}
                className="flex items-center leading-relaxed w-full"
              >
                <span className="whitespace-nowrap mr-2 select-none">
                  {getPrompt()}
                </span>
                <div className="flex-1 relative flex items-center mr-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isWorking}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-inherit font-mono leading-relaxed focus:outline-none"
                  />
                  {/* Simulated pulsing custom cursor in case input is out of focus */}
                  {isWorking && (
                    <span className="absolute left-0 w-1.5 h-3.5 bg-slate-400 animate-pulse ml-0.5" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isWorking || !inputVal.trim()}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-350 hover:text-white rounded font-mono text-[9px] uppercase tracking-wide cursor-pointer transition-all active:scale-95 shrink-0 flex items-center gap-1"
                  title="Execute command (Enter)"
                >
                  <span>Enter</span>
                  <span className="text-[7px]">⏎</span>
                </button>
              </form>
              
              {/* Mobile Quick Command Option Buttons */}
              <div className="mt-4 p-3 bg-slate-950/40 border border-slate-900 rounded-xl select-none shrink-0">
                <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                  📱 Mobile Quick Commands:
                </span>
                <div className="flex flex-wrap gap-2">
                  {shuffledOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => {
                        setInputVal(opt);
                        executeCommand(opt);
                      }}
                      className="px-2.5 py-1.5 bg-[#0a0f1d] hover:bg-[#121c38] border border-slate-800 hover:border-violet-500 text-slate-300 hover:text-white rounded-lg font-mono text-[9px] cursor-pointer transition-all active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Reset Lesson State floating bar */}
          <div className="p-3 border-t border-slate-900/60 bg-black/60 backdrop-blur-sm flex items-center justify-between">
            <button
              onClick={resetAllProgress}
              className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-slate-655 hover:text-slate-400 transition-colors cursor-pointer"
              title="Reset Terminal Progression State"
            >
              <RefreshCcw size={10} />
              <span>Reset Progress</span>
            </button>
            <span className="text-[8px] font-mono text-slate-700 font-bold uppercase">
              v1.2.0-REACT-LAB
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN: NEXTSEM CAREER PATH ROADMAP (lg:col-span-5) ── */}
        <div className="lg:col-span-5 flex flex-col">
          
          {/* Pinned Current Simulator Objective */}
          {!certified && (
            <div className="bg-[#0b101c]/90 border border-violet-500/35 rounded-2xl p-4 mb-6 shadow-[0_0_20px_rgba(139,92,246,0.1)] relative overflow-hidden flex items-center justify-between gap-4">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 to-indigo-500" />
              <div className="min-w-0">
                <span className="text-[8px] font-black uppercase tracking-widest text-violet-400">Current Simulator Objective</span>
                <h4 className="text-xs font-black text-white uppercase tracking-tight mt-0.5">{currentStep.title}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium mt-1">{currentStep.instruction}</p>
              </div>
              <button 
                onClick={() => {
                  setInputVal(currentStep.expectedCommand);
                  executeCommand(currentStep.expectedCommand);
                }}
                className="px-3.5 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-650 hover:brightness-110 text-white rounded-lg text-[9px] font-black uppercase tracking-wider shrink-0 cursor-pointer shadow-md active:scale-95 transition-all"
              >
                Run
              </button>
            </div>
          )}

          {/* Connected Pathways Card */}
          <div className="bg-[#0d1225]/45 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md flex-1 relative flex flex-col justify-between overflow-hidden shadow-2xl">
            
            {/* SVG Connecting Paths */}
            <svg className="absolute inset-0 pointer-events-none z-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="active-path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="selected-path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Static Path Connections */}
              <path d="M 28 17 L 72 17" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <path d="M 72 17 C 50 17, 50 49, 28 49" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <path d="M 28 49 L 72 49" stroke="url(#selected-path-gradient)" strokeWidth="2" fill="none" className="drop-shadow-[0_0_6px_#f59e0b]" />
              <path d="M 72 49 C 50 49, 50 81, 28 81" stroke="#475569" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <path d="M 28 81 L 72 81" stroke="#475569" strokeWidth="1" strokeOpacity="0.4" fill="none" />
            </svg>

            {/* Title */}
            <div className="relative z-10 mb-6 flex items-center justify-between">
              <h3 className="text-white font-extrabold text-sm tracking-wide uppercase">Nextsem Career Path</h3>
              <span className="text-[8px] font-black uppercase text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">Fullstack Developer</span>
            </div>

            {/* Vertical Nodes Grid (Zig-Zag Layout matches Mockup) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 relative z-10 flex-1">
              
              {/* HTML & CSS (Row 1 Left) */}
              <Link href="/course" className="bg-[#11162d]/90 border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer h-24 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-black text-[10px]">
                    5
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-white leading-none">HTML & CSS</span>
                    <span className="text-[7px] text-slate-500 font-bold uppercase">Basic layout</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-black uppercase">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-violet-400">75%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[0.5px]">
                    <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </Link>

              {/* JavaScript Fundamentals (Row 1 Right) */}
              <Link href="/course" className="bg-[#11162d]/90 border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer h-24 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-black text-[10px]">
                    JS
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-white leading-none">JS Basics</span>
                    <span className="text-[7px] text-slate-500 font-bold uppercase">Fundamentals</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-black uppercase">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-violet-400">90%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[0.5px]">
                    <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
              </Link>

              {/* Modern JavaScript ES6+ (Row 2 Left) */}
              <Link href="/course" className="bg-[#11162d]/90 border border-slate-800/80 rounded-2xl p-3 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer h-24 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 font-black text-[10px]">
                    ES
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-white leading-none">Modern JS</span>
                    <span className="text-[7px] text-slate-500 font-bold uppercase">ES6+ logic</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-black uppercase">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-violet-400">60%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[0.5px]">
                    <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </Link>

              {/* React.js Mastery (Row 2 Right - ACTIVE NODE GLOWS ORANGE) */}
              <div className={`bg-[#11162d] border rounded-2xl p-3 flex flex-col justify-between h-24 shadow-md transition-all ${
                certified 
                  ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/35'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[10px] ${
                    certified
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/10 border border-amber-500/20 text-amber-500 animate-pulse'
                  }`}>
                    ⚛️
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-white leading-none">React.js Mastery</span>
                    <span className={`text-[7px] font-bold uppercase ${certified ? 'text-emerald-400' : 'text-amber-500'}`}>
                      {certified ? 'Completed' : 'Active lab'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-black uppercase">
                    <span className="text-slate-500">Progress</span>
                    <span className={certified ? 'text-emerald-400' : 'text-amber-500'}>
                      {certified ? '100%' : `${Math.round((stepIdx / SIMULATOR_STEPS.length) * 75) + 25}%`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[0.5px]">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        certified 
                          ? 'bg-emerald-500' 
                          : 'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`} 
                      style={{ width: `${certified ? 100 : Math.round((stepIdx / SIMULATOR_STEPS.length) * 75) + 25}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Node.js Backend (Row 3 Left) */}
              <div className="bg-[#11162d]/40 border border-slate-900/60 rounded-2xl p-3 flex flex-col justify-between opacity-50 h-24 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800/40 border border-slate-700/20 flex items-center justify-center text-slate-500 font-black text-[10px]">
                    Node
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-slate-400 leading-none">Node.js Backend</span>
                    <span className="text-[7px] text-slate-655 font-bold uppercase">Server API</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-black uppercase">
                    <span className="text-slate-650">Progress</span>
                    <span className="text-slate-650">0%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[0.5px]">
                    <div className="bg-slate-800 h-full rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>

              {/* Fullstack Project (Row 3 Right) */}
              <div className="bg-[#11162d]/40 border border-slate-900/60 rounded-2xl p-3 flex flex-col justify-between opacity-50 h-24 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800/40 border border-slate-700/20 flex items-center justify-center text-slate-500 font-black text-[10px]">
                    FS
                  </div>
                  <div className="leading-tight">
                    <span className="block text-[9px] font-black text-slate-400 leading-none">Fullstack Project</span>
                    <span className="text-[7px] text-slate-655 font-bold uppercase">Deployment</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[7px] font-black uppercase">
                    <span className="text-slate-650">Progress</span>
                    <span className="text-slate-650">0%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[0.5px]">
                    <div className="bg-slate-800 h-full rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* ── CERTIFICATE CLAIM MODAL OVERLAY ── */}
      {showCertOverlay && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="max-w-2xl w-full bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-between text-center relative shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <button
              onClick={() => setShowCertOverlay(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg p-1.5 hover:bg-slate-900 rounded-full transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[9px] font-black uppercase tracking-widest text-[#39ff14] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Course Completed
            </span>

            {/* Simulated certificate card */}
            <div className="w-full border-4 border-double border-amber-500/30 bg-slate-950 p-6 md:p-8 rounded-2xl my-6 select-text text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full flex items-center justify-center text-amber-500 opacity-20 font-black text-6xl">
                ★
              </div>

              <h3 className="font-serif text-amber-500 dark:text-amber-400 font-extrabold text-lg md:text-xl uppercase tracking-widest">
                Certificate of Mastery
              </h3>
              <p className="text-[8px] md:text-[9px] font-mono text-slate-550 uppercase tracking-widest mt-1">
                Nextsem React Dev Server Setup
              </p>

              <div className="my-6">
                <span className="block text-[9px] font-serif italic text-slate-450">This is to certify that</span>
                <span className="block text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-1.5 border-b border-slate-850 pb-1.5 max-w-xs mx-auto">
                  {user ? user.name : "Guest Developer"}
                </span>
                <span className="block text-[9px] text-slate-400 leading-relaxed mt-2 px-6">
                  has successfully completed the interactive **React Setup Workstation**, demonstrating developer proficiency in workspace configuration, package installations, cloning structures, and server initialization.
                </span>
              </div>

              <div className="flex justify-between items-center px-4 mt-6 pt-4 border-t border-slate-900 text-[8px] font-mono text-slate-500">
                <div className="text-left">
                  <span>DATE OF ISSUE</span>
                  <span className="block font-bold text-slate-400 uppercase mt-0.5">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="text-right">
                  <span>AUTHORIZED SIGNATORY</span>
                  <span className="block font-bold text-[#39ff14] uppercase mt-0.5">NEXTSEM ACADEMY ✓</span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                <span>Save PDF</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://nextsem.online/cmd");
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {copiedLink ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Share Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── ADSENSE FRIENDLY GLASSMORPHIC FOOTER ── */}
      <footer className="w-full max-w-7xl mx-auto px-4 mt-auto pt-12 pb-8 shrink-0 z-20">
        <div className="bg-[#0d1225]/35 backdrop-blur-md border-t border-slate-850/80 rounded-t-2xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_-4px_30px_rgba(0,0,0,0.15)] text-center md:text-left">
          
          {/* Left Column: Brand & Copyright */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-650 flex items-center justify-center text-white font-black text-xs">
                N
              </div>
              <span className="font-extrabold tracking-tight text-white text-sm">
                Nextsem Academy
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              © 2026 Nextsem. All rights reserved. Empowering developer journeys.
            </p>
            <p className="text-[8px] text-slate-655 leading-relaxed max-w-md mx-auto md:mx-0">
              Disclaimer: We use cookies to analyze site traffic and personalize content. Google AdSense ads may be shown on this website to support our educational missions.
            </p>
          </div>

          {/* Right Column: AdSense Required Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

        </div>
      </footer>

      </div>

      {/* ── TRY IT TERMINAL SANDBOX WINDOW (MODAL OVERLAY) ── */}
      {isSandboxOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="max-w-3xl w-full bg-black border-2 border-[#39FF14]/40 rounded-2xl shadow-[0_0_40px_rgba(57,255,20,0.15)] overflow-hidden flex flex-col h-[500px]">
            {/* Title Bar */}
            <div className="bg-[#1d1d1f] border-b border-[#2d2d2f] flex items-center justify-between px-4 py-2 select-none shrink-0">
              <div className="flex items-center gap-2">
                <Terminal size={11} className="text-[#39FF14]" />
                <span className="font-mono text-[10px] text-slate-350 font-bold">
                  Administrator: Command Prompt Sandbox (Try It)
                </span>
              </div>
              <button 
                onClick={() => setIsSandboxOpen(false)}
                className="p-1 rounded hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Sandbox Console buffer */}
            <div 
              className="flex-1 p-5 overflow-y-auto font-mono text-xs select-text scrollbar-thin cursor-text bg-[#030303]"
              style={{ color: "#39FF14" }}
            >
              <div className="space-y-1">
                {sandboxHistory.map((line, idx) => {
                  let colorClass = "";
                  if (line.type === "error") colorClass = "text-rose-500 font-bold";
                  if (line.type === "system") colorClass = "text-[#39FF14] font-bold";
                  return (
                    <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                      {line.text}
                    </div>
                  );
                })}

                {/* Input Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSandboxCommand(sandboxInput);
                  }}
                  className="flex items-center leading-relaxed w-full"
                >
                  <span className="whitespace-nowrap mr-2 select-none">
                    {sandboxPath}&gt;
                  </span>
                  <input
                    type="text"
                    value={sandboxInput}
                    onChange={(e) => setSandboxInput(e.target.value)}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-inherit font-mono leading-relaxed focus:outline-none"
                  />
                </form>
              </div>
            </div>

            {/* Quick Sandbox Commands Helper */}
            <div className="p-3 bg-slate-950/20 border-t border-slate-900 select-none shrink-0">
              <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider block mb-1.5">
                📱 Mobile Quick Commands:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["help", "dir", "cd projects", "mkdir components", "cls", "ipconfig", "git init"].map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSandboxInput(opt);
                      handleSandboxCommand(opt);
                    }}
                    className="px-2 py-1 bg-black hover:bg-[#121c38] border border-slate-850 hover:border-[#39FF14] text-slate-350 hover:text-white rounded font-mono text-[9px] cursor-pointer transition-all active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-3 border-t border-slate-900 bg-black/60 backdrop-blur-sm flex items-center justify-between text-[8px] font-mono text-slate-550 select-none">
              <span>Type &apos;help&apos; to view commands. Create directories with mkdir.</span>
              <button 
                onClick={() => {
                  setSandboxHistory([
                    { text: "Microsoft Windows [Version 10.0.22621.1702]", type: "output" },
                    { text: "(c) Microsoft Corporation. All rights reserved.", type: "output" },
                    { text: "", type: "output" },
                    { text: "Nextsem Virtual Cmd Console Sandbox [v1.0.0]", type: "system" }
                  ]);
                  setSandboxFiles(["projects", "documents", "README.txt"]);
                  setSandboxPath("C:\\Nextsem");
                }}
                className="hover:text-white transition-colors uppercase font-bold cursor-pointer"
              >
                Reset Virtual Drive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MOCK EXERCISES MODAL ── */}
      {isExercisesOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="max-w-2xl w-full bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsExercisesOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg p-1.5 hover:bg-slate-900 rounded-full transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[9px] font-black uppercase tracking-widest text-[#39ff14] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit mb-3">
              Practice Board
            </span>

            <h3 className="font-extrabold text-white text-xl uppercase tracking-tight mb-4">
              📋 Windows CMD Practice Exercises
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Attempt these 4 hands-on command challenges in the terminal sandbox to build absolute confidence in terminal operations.
            </p>

            <div className="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-thin">
              <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded bg-violet-650/20 text-violet-400 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-extrabold text-white text-xs uppercase">Navigate Workspace</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Navigate into the existing `projects` folder by running the change directory command.</p>
                  <pre className="bg-black/85 p-2 rounded text-[#39FF14] font-mono text-[9px] mt-2 border border-slate-850">cd projects</pre>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded bg-violet-650/20 text-violet-400 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-extrabold text-white text-xs uppercase">Create Directory Structure</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Create a new assets folder named `components` inside the directory.</p>
                  <pre className="bg-black/85 p-2 rounded text-[#39FF14] font-mono text-[9px] mt-2 border border-slate-850">mkdir components</pre>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded bg-violet-650/20 text-violet-400 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-extrabold text-white text-xs uppercase">Verify Directory Content</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Verify that your newly created directory exists by listing all files in the current folder.</p>
                  <pre className="bg-black/85 p-2 rounded text-[#39FF14] font-mono text-[9px] mt-2 border border-slate-850">dir</pre>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded bg-violet-650/20 text-violet-400 font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <div>
                  <h4 className="font-extrabold text-white text-xs uppercase">Clear Console Buffer</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Reset your screen history buffer to start with a fresh clean screen.</p>
                  <pre className="bg-black/85 p-2 rounded text-[#39FF14] font-mono text-[9px] mt-2 border border-slate-850">cls</pre>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsExercisesOpen(false)}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setIsExercisesOpen(false);
                  setIsSandboxOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-650 text-white hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
              >
                Launch Sandbox to Practice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE QUIZ MODAL ── */}
      {isQuizOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="max-w-xl w-full bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <button
              onClick={() => {
                setIsQuizOpen(false);
                setQuizStep(0);
                setQuizSelectedOption(null);
                setQuizScore(0);
                setQuizAnswered(false);
                setQuizFinished(false);
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg p-1.5 hover:bg-slate-900 rounded-full transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[9px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 w-fit mb-3">
              Quiz Challenge
            </span>

            {!quizFinished ? (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[8px] font-mono text-slate-550 mb-4 uppercase select-none">
                    <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                    <span>Score: {quizScore}</span>
                  </div>

                  <h3 className="font-extrabold text-white text-base leading-snug uppercase mb-6 select-none">
                    {quizQuestions[quizStep].q}
                  </h3>

                  <div className="space-y-2.5">
                    {quizQuestions[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-800 bg-slate-950/30 hover:bg-slate-900/50 text-slate-300";
                      
                      if (quizAnswered) {
                        if (idx === quizQuestions[quizStep].correct) {
                          btnClass = "border-emerald-500/45 bg-emerald-500/10 text-emerald-400 font-bold";
                        } else if (idx === quizSelectedOption) {
                          btnClass = "border-rose-500/45 bg-rose-500/10 text-rose-400 font-bold";
                        } else {
                          btnClass = "border-slate-900 bg-slate-950/10 text-slate-655 opacity-55";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizAnswered}
                          onClick={() => {
                            setQuizSelectedOption(idx);
                            setQuizAnswered(true);
                            if (idx === quizQuestions[quizStep].correct) {
                              setQuizScore(quizScore + 1);
                            }
                          }}
                          className={`w-full text-left p-3.5 border rounded-xl text-xs transition-all cursor-pointer flex justify-between items-center ${btnClass}`}
                        >
                          <span>{option}</span>
                          {quizAnswered && idx === quizQuestions[quizStep].correct && (
                            <span className="text-emerald-400 text-[10px] font-bold">✓ Correct</span>
                          )}
                          {quizAnswered && idx === quizSelectedOption && idx !== quizQuestions[quizStep].correct && (
                            <span className="text-rose-400 text-[10px] font-bold">✗ Incorrect</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered && (
                    <div className="mt-4 p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-[10px] text-slate-400 leading-relaxed select-none">
                      💡 <span className="font-bold text-slate-300">Explanation:</span> {quizQuestions[quizStep].exp}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  {quizAnswered && (
                    <button
                      onClick={() => {
                        if (quizStep + 1 < quizQuestions.length) {
                          setQuizStep(quizStep + 1);
                          setQuizSelectedOption(null);
                          setQuizAnswered(false);
                        } else {
                          setQuizFinished(true);
                          setPoints(points + 500); // Reward 500 XP
                        }
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-650 hover:brightness-110 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-1"
                    >
                      <span>{quizStep + 1 < quizQuestions.length ? "Next Question" : "Finish Quiz"}</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 flex flex-col items-center justify-center">
                <span className="text-4xl mb-4">🏆</span>
                <h3 className="font-extrabold text-white text-lg uppercase tracking-tight mb-2">Quiz Completed!</h3>
                <p className="text-xs text-slate-400 mb-6">
                  You scored <span className="text-[#39ff14] font-black">{quizScore} out of {quizQuestions.length}</span> correct answers.
                </p>
                <div className="bg-[#39ff14]/10 border border-[#39ff14]/20 rounded-2xl p-4 mb-6 text-center text-xs font-bold text-slate-200">
                  ⚡ XP Reward Unlocked: <span className="text-[#39ff14]">+500 XP</span> Added to Profile!
                </div>
                <button
                  onClick={() => {
                    setIsQuizOpen(false);
                    setQuizStep(0);
                    setQuizSelectedOption(null);
                    setQuizScore(0);
                    setQuizAnswered(false);
                    setQuizFinished(false);
                  }}
                  className="px-6 py-3 bg-[#39ff14] hover:bg-[#2ebd10] text-[#07070c] text-xs font-black uppercase tracking-wider rounded-3xl transition-all cursor-pointer shadow-md"
                >
                  Return to Simulator
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
