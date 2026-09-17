"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Sparkles, Check, HelpCircle, AlertCircle, 
  Award, ChevronRight, ChevronLeft, Zap, Terminal, Layers, Cpu,
  HardDrive, MemoryStick, Shield, Play, RotateCcw, CheckCircle2,
  ExternalLink, FileText, Monitor, Server, Clock, ListChecks,
  Languages, Lightbulb, Compass
} from 'lucide-react';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

type LanguageMode = "simple" | "standard" | "hinglish";

interface CmdExampleItem {
  id: string;
  command: string;
  output: string;
  simple: {
    title: string;
    description: string;
    explanation: string;
  };
  standard: {
    title: string;
    description: string;
    explanation: string;
  };
  hinglish: {
    title: string;
    description: string;
    explanation: string;
  };
}

const CMD_EXAMPLES: CmdExampleItem[] = [
  {
    id: "systeminfo",
    command: "systeminfo | findstr /B /C:\"OS Name\" /C:\"OS Version\" /C:\"System Type\"",
    output: `OS Name:                   Microsoft Windows 11 Pro
OS Version:                10.0.26100 N/A Build 26100
System Type:               x64-based PC`,
    simple: {
      title: "1. Check Windows Version & PC Type",
      description: "Asks Windows to show what version is installed (Windows 11) and confirms it is a 64-bit computer.",
      explanation: "This command reaches into the OS brain to show the exact Windows build number and confirm your PC uses a 64-bit multi-core chip."
    },
    standard: {
      title: "1. Inspect OS Architecture & Version",
      description: "Queries the Windows kernel to inspect the OS version, build number, and 64-bit multi-core hardware architecture.",
      explanation: "This command demonstrates how the OS exposes its core kernel build string and hardware instruction set (x64) via the System Management Interface."
    },
    hinglish: {
      title: "1. Windows Version & Architecture Check Karo",
      description: "Windows kernel se poochta hai ki kaun sa OS version (Windows 11) aur 64-bit processor chal raha hai.",
      explanation: "Ye command kernel ki information nikal kar screen par display karta hai ki PC x64 architecture par hai."
    }
  },
  {
    id: "tasklist",
    command: "tasklist /FI \"STATUS eq RUNNING\"",
    output: `Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
System                           4 Services                   0        148 K
smss.exe                       392 Services                   0      1,024 K
csrss.exe                      580 Services                   0      5,240 K
wininit.exe                    668 Services                   0      4,880 K
explorer.exe                  4120 Console                    1    142,560 K
chrome.exe                    8428 Console                    1    284,120 K`,
    simple: {
      title: "2. See All Running Apps in Memory (RAM)",
      description: "Shows a list of every active program loaded into RAM right now with its unique ID number (PID).",
      explanation: "Every app gets a unique ID number called a PID (Process ID) and its own private chunk of RAM memory to work safely."
    },
    standard: {
      title: "2. View Active Processes in Memory (RAM)",
      description: "Lists currently running processes managed by the OS Process Scheduler inside RAM.",
      explanation: "Each active program is assigned a unique Process Identifier (PID), session isolation boundary, and real-time physical RAM working set allocation."
    },
    hinglish: {
      title: "2. RAM Me Chal Rahe Saare Apps Dekho",
      description: "RAM ke andar active processes aur unke unique Process ID (PID) ki live list dikhata hai.",
      explanation: "Har chalte hue program ko ek PID aur alag memory space milti hai taaki ek app dusre ko crash na kare."
    }
  },
  {
    id: "taskkill",
    command: "taskkill /PID 8428 /F",
    output: `SUCCESS: The process with PID 8428 has been terminated.`,
    simple: {
      title: "3. Force-Close a Frozen App",
      description: "Forces a stuck or unresponsive program to shut down right away and frees up its RAM for other apps.",
      explanation: "When an app freezes, the OS forcefully terminates it, closes all open files, and gives all its memory back to the free pool."
    },
    standard: {
      title: "3. Terminate Malfunctioning Process (Process Control)",
      description: "Forces immediate termination of a hung process and reclaims all allocated RAM and hardware handles.",
      explanation: "The OS kernel sends a SIGKILL signal, immediately releases the process's page table mappings from RAM, and returns the resources to the free memory pool."
    },
    hinglish: {
      title: "3. Stuck App Ko Force-Close Karo",
      description: "Agar koi app hang ho jaye toh usse turant close karke uski saari RAM free karta hai.",
      explanation: "OS kernel process ko forcefully kill kar deta hai aur uski memory dusre apps ke liye release kar deta hai."
    }
  },
  {
    id: "chkdsk",
    command: "chkdsk C: /f",
    output: `The type of the file system is NTFS.
Volume label is Windows-SSD.

Stage 1: Examining basic file system structure ...
  245760 file records processed.
Stage 2: Examining file name linkage ...
  312450 index entries processed.
Stage 3: Examining security descriptors ...
  48200 security descriptors processed.

Windows has scanned the file system and found no problems.
No further action is required.`,
    simple: {
      title: "4. Scan & Fix Hard Drive Disk Errors",
      description: "Scans your storage drive to find broken files or disk errors and fixes them automatically.",
      explanation: "The OS File System (like NTFS) organizes all your photos and documents. This command verifies the drive map is clean and healthy."
    },
    standard: {
      title: "4. Verify File System Integrity (NTFS / FAT32)",
      description: "Scans disk sectors, verifies Master File Table (MFT) integrity, and fixes logical file system errors.",
      explanation: "The File Management System (FMS) maintains directory tree mappings and cluster allocation bitmaps, verifying physical storage sector health."
    },
    hinglish: {
      title: "4. Hard Disk Scan & Repair Karo",
      description: "Disk sectors aur file structure ko scan karke errors ko theek karta hai.",
      explanation: "File Management System (NTFS) saari directory mapping check karta hai taaki data corrupt na ho."
    }
  }
];

interface QuizItem {
  simple: {
    question: string;
    options: string[];
    explanation: string;
  };
  standard: {
    question: string;
    options: string[];
    explanation: string;
  };
  hinglish: {
    question: string;
    options: string[];
    explanation: string;
  };
  answer: number;
}

const QUIZ_QUESTIONS: QuizItem[] = [
  {
    answer: 0,
    simple: {
      question: "What is the main brain/core of the Operating System that stays inside RAM from the moment the PC turns on?",
      options: ["The Kernel", "The Web Browser", "The File Explorer", "The Recycle Bin"],
      explanation: "The Kernel is the core nucleus of the OS. It lives permanently in RAM while the computer is running to manage hardware."
    },
    standard: {
      question: "What is the primary core nucleus of an operating system that permanently resides in RAM?",
      options: ["The Kernel", "The Browser", "The File Explorer", "The Recycle Bin"],
      explanation: "The Kernel is the essential foundational core of the OS that stays resident in RAM from boot until power off."
    },
    hinglish: {
      question: "Operating System ka sabse main core part kaun sa hai jo boot hone ke baad hamesha RAM me rehta hai?",
      options: ["The Kernel", "The Browser", "The File Explorer", "The Recycle Bin"],
      explanation: "Kernel OS ka main heart/core hota hai jo RAM me permanent resident rehta hai."
    }
  },
  {
    answer: 1,
    simple: {
      question: "How does the computer let you listen to music, download files, and type in Word all at the exact same time?",
      options: ["By doing only one job per hour", "Time-Sharing: Giving each app tiny split-second turns on the CPU", "By turning the monitor off", "By deleting half the files"],
      explanation: "Time-Sharing (Multitasking) gives each active app tiny split-second slices of CPU time so fast that everything feels instantaneous!"
    },
    standard: {
      question: "Which OS scheduling technique allows multiple active programs to share the CPU by allotting each a small time quantum?",
      options: ["Batch Processing", "Time-Sharing (Multitasking)", "Serial Processing", "Single-User Spooling"],
      explanation: "Time-sharing assigns tiny time slices (quanta) to active processes, enabling rapid conversational multitasking."
    },
    hinglish: {
      question: "Kaun si technique se CPU multiple apps ko small time slices (quanta) dekar ek sath chala pata hai?",
      options: ["Batch Processing", "Time-Sharing (Multitasking)", "Serial Processing", "Single-User Spooling"],
      explanation: "Time-Sharing me CPU har program ko micro-seconds ka time deta hai jisse multitasking possible hoti hai."
    }
  },
  {
    answer: 1,
    simple: {
      question: "What happens to a program when it is waiting for you to type a key on the keyboard?",
      options: ["It keeps burning the CPU core", "The OS moves it to the Waiting / Blocked state so other apps can use the CPU", "The computer restarts", "The app gets permanently deleted"],
      explanation: "When an app waits for human input or slow disk reads, the OS moves it to the 'Waiting' list so other apps can use the fast CPU."
    },
    standard: {
      question: "What state does a process transition to when it requests a slow disk read or keyboard input?",
      options: ["Running State", "Waiting / Blocked State", "Terminated State", "Bootstrap State"],
      explanation: "When a process awaits peripheral I/O completion, the OS moves it to the Blocked/Waiting queue so other ready jobs can use the CPU."
    },
    hinglish: {
      question: "Jab koi process user ke keyboard input ya disk read ka wait karti hai, toh OS usse kis state me daalta hai?",
      options: ["Running State", "Waiting / Blocked State", "Terminated State", "Bootstrap State"],
      explanation: "Slow I/O ke dauran process 'Waiting/Blocked' state me chali jaati hai taaki CPU free rahe."
    }
  },
  {
    answer: 1,
    simple: {
      question: "What is the key difference between a Process and a Thread?",
      options: [
        "Processes run on GPU while threads run on battery",
        "A Process has its own private memory box, while Threads inside the process share the same memory to work together",
        "Threads cannot run computer code",
        "A process only runs on weekends"
      ],
      explanation: "A Process is an independent program in its own memory box; Threads are lightweight helper workers inside that same process sharing memory."
    },
    standard: {
      question: "What is the main difference between a Process and a Thread?",
      options: [
        "Processes run on GPU while threads run on RAM",
        "A process has its own isolated memory space, while threads inside a process share memory",
        "Threads cannot execute CPU instructions",
        "A process can only run one line of code per day"
      ],
      explanation: "A process is an isolated execution container with its own private address space; threads are lightweight execution units inside the process sharing memory."
    },
    hinglish: {
      question: "Process aur Thread ke beech main difference kya hai?",
      options: [
        "Process GPU par chalti hai aur Thread battery par",
        "Process ki apni alag memory space hoti hai, jabki Threads usi process ke andar memory share karte hain",
        "Threads code execute nahi kar sakte",
        "Process sirf offline chalti hai"
      ],
      explanation: "Process ek independent running program hai jabki Threads lightweight workers hote hain jo usi process ki memory share karte hain."
    }
  }
];

export default function Unit2OperatingSystemLessonPage() {
  const [langMode, setLangMode] = useState<LanguageMode>("simple");
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("nextsem_unit2_lang") as LanguageMode | null;
      if (savedLang && (savedLang === "simple" || savedLang === "standard" || savedLang === "hinglish")) {
        setLangMode(savedLang);
      }
    }
  }, []);

  const handleLanguageChange = (mode: LanguageMode) => {
    setLangMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_unit2_lang", mode);
    }
  };

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    setActiveQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));
  };

  const activeCmd = CMD_EXAMPLES[activeCmdIdx];
  const activeCmdText = activeCmd[langMode];

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col selection:bg-[#04AA6D] selection:text-black">
      {/* Top Header */}
      <BcaHeaderNav currentSubjectCode="BCS-111" currentSubjectName="Computer Basics & PC Software" />

      {/* Main Lesson Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">

        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-bold py-1">
          <Link href="/" className="hover:text-[#04AA6D] transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-[#04AA6D] transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1" className="hover:text-[#04AA6D] transition-colors">
            Semester 1
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1/bcs-011-computer-basics" className="hover:text-[#04AA6D] transition-colors">
            BCS-111
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <span className="text-cyan-300 font-extrabold">Unit 2: Operating System</span>
        </nav>

        {/* Top Breadcrumb & Hero Banner */}
        <div className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <Link 
                href="/bca/semester-1/bcs-011-computer-basics"
                className="inline-flex items-center gap-1.5 font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> BCS-111 Dashboard
              </Link>
              <span className="text-slate-600">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                Block 2 • Unit 2 (Theory + Lab)
              </span>
            </div>

            {/* Quick Language Mode Switcher Badge */}
            <div className="flex items-center bg-[#060c18] p-1 rounded-2xl border border-slate-800 shadow-inner">
              <button
                onClick={() => handleLanguageChange("simple")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  langMode === "simple"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>🌱 Simple English</span>
              </button>

              <button
                onClick={() => handleLanguageChange("standard")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  langMode === "standard"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>🎓 Exam English</span>
              </button>

              <button
                onClick={() => handleLanguageChange("hinglish")}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  langMode === "hinglish"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-950/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>🇮🇳 Hinglish</span>
              </button>
            </div>
          </div>

          {/* Dynamic Hero Title & Description */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>🖥️ Operating System Fundamentals & Architecture</span>
            </h1>

            {langMode === "simple" && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1 text-slate-200 text-sm sm:text-base leading-relaxed">
                <div className="font-extrabold text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Simple English Mode Active: Beginner Friendly & Easy to Understand</span>
                </div>
                <p>
                  The Operating System (OS) is the master software conductor of your computer. It connects you to the hardware, runs your apps, manages memory, keeps files organized, and prevents programs from crashing into each other.
                </p>
              </div>
            )}

            {langMode === "standard" && (
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Master how the Operating System acts as the central conductor of hardware, manages processes, allocates memory, orchestrates file systems, and runs concurrent programs with step-by-step visual diagrams for IGNOU Term-End Examination preparation.
              </p>
            )}

            {langMode === "hinglish" && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1 text-slate-200 text-sm sm:text-base leading-relaxed">
                <div className="font-extrabold text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Hinglish Mode Active: Easy Step-by-Step Explanation</span>
                </div>
                <p>
                  Operating System (OS) computer ka main master software hota hai jo physical hardware ko manage karta hai, apps chalata hai, RAM aur storage ko handle karta hai, aur multitasking ko smooth banata hai.
                </p>
              </div>
            )}
          </div>

          {/* Quick Action Badges */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <Link
              href="/bca/notes/bcs-011-unit-2-operating-system"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>12-Page Line-by-Line Textbook Notes & Fill-in-the-Blanks ➔</span>
            </Link>

            <a
              href="/os-unit2-fill-in-the-blanks.html"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Standalone HTML Mode</span>
            </a>
          </div>
        </div>

        {/* SECTION 1: WHAT IS AN OPERATING SYSTEM? (REAL-WORLD ANALOGIES) */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-lg sm:text-2xl font-black text-white">
              {langMode === "simple" && "1. The Big Picture: What Does an Operating System Do?"}
              {langMode === "standard" && "1. The Big Picture: What is an Operating System?"}
              {langMode === "hinglish" && "1. Operating System Ka Main Kaam Kya Hai?"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Analogy 1: The Restaurant Kitchen */}
            <div className="p-5 rounded-2xl bg-[#070d19] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-amber-300">
                <span>🍳 {langMode === "simple" ? "Analogy 1: The Restaurant Kitchen & Chef" : langMode === "hinglish" ? "Analogy 1: Restaurant Kitchen Aur Master Chef" : "Analogy 1: The Master Restaurant Chef"}</span>
              </div>

              {langMode === "simple" && (
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5 leading-relaxed">
                  <li>• <strong>Kitchen Counter (RAM)</strong>: Fast, open table space holding the active ingredients you are cooking right now.</li>
                  <li>• <strong>Storage Cupboard (SSD / Hard Drive)</strong>: Huge pantry holding all raw food boxes (programs and files) for later.</li>
                  <li>• <strong>The Chef (CPU)</strong>: The super-fast worker chopping, mixing, and executing instructions (+, -, math).</li>
                  <li>• <strong>The Manager (The OS)</strong>: Decides which order gets cooked next, prevents kitchen fires, and makes sure no customer waits too long!</li>
                </ul>
              )}

              {langMode === "standard" && (
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>The Kitchen Counter (RAM)</strong>: Fast, immediate working space holding current ingredients.</li>
                  <li>• <strong>The Storage Pantry (Hard Drive / SSD)</strong>: Massive storage holding all raw food boxes (programs).</li>
                  <li>• <strong>The Chef (CPU)</strong>: Performs high-speed cooking instructions (+, -, slicing data).</li>
                  <li>• <strong>The Restaurant Manager (The OS)</strong>: Decides which waiter's order gets cooked next, prevents kitchen fires, and ensures no table starves!</li>
                </ul>
              )}

              {langMode === "hinglish" && (
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>Kitchen Counter (RAM)</strong>: Tez working desk jahan abhi ka chal raha kaam rakha hota hai.</li>
                  <li>• <strong>Storage Pantry (SSD / HDD)</strong>: Bada store room jahan saare apps aur files permanently save hote hain.</li>
                  <li>• <strong>Chef (CPU)</strong>: Tez worker jo saari calculations aur instructions execute karta hai.</li>
                  <li>• <strong>Restaurant Manager (The OS)</strong>: Schedule karta hai kaun sa order kab cook hoga aur resource conflicts rokta hai!</li>
                </ul>
              )}
            </div>

            {/* Analogy 2: The Traffic Police Officer */}
            <div className="p-5 rounded-2xl bg-[#070d19] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-cyan-300">
                <span>🚦 {langMode === "simple" ? "Analogy 2: The City Traffic Controller" : langMode === "hinglish" ? "Analogy 2: City Traffic Police Officer" : "Analogy 2: The City Traffic Controller"}</span>
              </div>

              {langMode === "simple" && (
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5 leading-relaxed">
                  <li>• <strong>Road Intersections (System Bus)</strong>: Shared highways where data travels between chips.</li>
                  <li>• <strong>Vehicles (Running Apps)</strong>: Hundreds of apps trying to move through memory at the same time.</li>
                  <li>• <strong>Traffic Officer (The OS)</strong>: Changes traffic lights, prevents traffic jams (deadlocks), and lets emergency ambulances (urgent hardware tasks) pass first!</li>
                </ul>
              )}

              {langMode === "standard" && (
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>The Road Intersections (System Bus)</strong>: Shared lanes where data travels between chips.</li>
                  <li>• <strong>The Vehicles (Running Processes)</strong>: Thousands of cars trying to move simultaneously.</li>
                  <li>• <strong>The Traffic Officer (The OS)</strong>: Regulates signal lights, prevents fatal collisions (deadlocks), and gives priority ambulances (interrupts) instant right-of-way!</li>
                </ul>
              )}

              {langMode === "hinglish" && (
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>Roads (System Bus)</strong>: Raste jahan se data chips ke beech travel karta hai.</li>
                  <li>• <strong>Vehicles (Running Apps)</strong>: Hazaron processes jo ek saath chalne ki koshish karte hain.</li>
                  <li>• <strong>Traffic Officer (The OS)</strong>: Signal lights control karta hai, deadlocks rokta hai, aur emergency interrupts ko priority deta hai!</li>
                </ul>
              )}
            </div>
          </div>

          {/* Core Objectives List */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-emerald-100 space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {langMode === "simple" ? "The Two Golden Goals of Every Operating System:" : langMode === "hinglish" ? "Har Operating System Ke 2 Main Golden Goals:" : "Two Golden Objectives of Every Operating System:"}
              </span>
            </div>

            {langMode === "simple" && (
              <div className="space-y-1">
                <p>1. <strong>Make it Easy (Convenience)</strong>: Make complicated silicon chips and wires simple and comfortable for humans to use.</p>
                <p>2. <strong>Make it Fast (Efficiency)</strong>: Keep the CPU and RAM working at maximum speed without wasting power or sitting idle.</p>
              </div>
            )}

            {langMode === "standard" && (
              <div className="space-y-1">
                <p>1. <strong>Convenience</strong>: Make complex silicon computer hardware comfortable, friendly, and easy for humans to operate.</p>
                <p>2. <strong>Efficiency</strong>: Maximize CPU and memory throughput so hardware never wastes idle cycles.</p>
              </div>
            )}

            {langMode === "hinglish" && (
              <div className="space-y-1">
                <p>1. <strong>Convenience (सरल उपयोग)</strong>: Hardware ko human users ke liye easy aur intuitive banana.</p>
                <p>2. <strong>Efficiency (कार्यकुशलता)</strong>: CPU aur RAM ka bina waste kiye maximum utilization karna.</p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: 4-LAYER OS ARCHITECTURE DIAGRAM */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {langMode === "simple" ? "2. The 4 Layers of a Computer System" : langMode === "hinglish" ? "2. Computer System Ki 4 Main Layers" : "2. The 4-Layer Operating System Architecture"}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">User Space ➔ Shell ➔ Kernel ➔ Hardware</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {langMode === "simple" && "Think of a computer as a 4-floor building. Everyday apps live on top, while physical chips sit in the basement. Apps cannot touch raw hardware directly; they must ask the Kernel nicely through safe requests (called System Calls)."}
            {langMode === "standard" && "The computer system is structured into four distinct hierarchical layers. Applications running in User Space cannot directly touch physical transistors; they must issue safe System Calls (APIs) to the Kernel."}
            {langMode === "hinglish" && "Computer system 4 layers me divided hota hai. User apps directly hardware ko touch nahi kar sakti; unhe Kernel se System Calls ke through permission leni hoti hai."}
          </p>

          {/* SVG Diagram Embed */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#060c18] p-2 shadow-inner">
            <img 
              src="/os_illustration.svg" 
              alt="4-Layer Operating System Architecture Diagram" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* 4 Layer Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-sky-400">Layer 1: User Apps (User Space)</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {langMode === "simple" && "Everyday software like Chrome, VS Code, Spotify, and Games that run in a safe zone so they cannot crash your PC."}
                {langMode === "standard" && "Applications like Chrome, VS Code, Word, and CLI terminals run in unprivileged CPU rings to prevent crashes."}
                {langMode === "hinglish" && "Aapke daily use apps jaise Chrome, Code Editor, Games jo safe user mode me execute hote hain."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-purple-400">Layer 2: The Shell & UI</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {langMode === "simple" && "The screen buttons, mouse menus (⊞ Windows GUI), or black command prompt window (CMD) where you give instructions."}
                {langMode === "standard" && "The user-facing command interpreter (⊞ Windows GUI, CMD, PowerShell, Bash) that parses user intent into system calls."}
                {langMode === "hinglish" && "Windows GUI ya CMD terminal jo user ke clicks aur typed commands ko system calls me translate karta hai."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-emerald-400">Layer 3: The Kernel Core</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {langMode === "simple" && "The permanent heart of the OS living in RAM. It controls the CPU schedule, memory allocation, and disk storage."}
                {langMode === "standard" && "The resident heart of the OS. Controls CPU scheduling, RAM paging, file systems, and hardware device drivers."}
                {langMode === "hinglish" && "OS ka permanent nucleus jo RAM me rehta hai aur CPU scheduling, memory aur hardware drivers ko manage karta hai."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-amber-400">Layer 4: Hardware Chips</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {langMode === "simple" && "The physical parts you can touch: Multi-core CPU chip, DDR5 RAM sticks, fast NVMe SSD, and network cards."}
                {langMode === "standard" && "The physical chips: Multi-core CPU, DDR5 RAM modules, NVMe SSD storage, and Network Interface Cards (NIC)."}
                {langMode === "hinglish" && "Physical components: CPU processor, RAM memory, SSD hard disk, aur Network Interface Card (NIC)."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROCESS LIFECYCLE & CPU SCHEDULING */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-emerald-400 shrink-0" />
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {langMode === "simple" ? "3. The 5 Life Stages of an App (Process Lifecycle)" : langMode === "hinglish" ? "3. Process Ke 5 Life Cycle Stages" : "3. Process Lifecycle & The 5 Execution States"}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">Process Control Block (PCB)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {langMode === "simple" && "A **Process** is simply a program that is currently running. When you launch an app, the OS moves it through 5 simple life stages so you can run many apps smoothly at once:"}
            {langMode === "standard" && "A Process is an active program in execution. The CPU dispatcher transitions processes between 5 lifecycle states to achieve smooth multitasking:"}
            {langMode === "hinglish" && "Process ek chal raha active program hai. Multitasking smoothly karne ke liye OS process ko 5 stages me move karta hai:"}
          </p>

          {/* Process Diagram Embed */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#060c18] p-2 shadow-inner">
            <img 
              src="/os_process_illustration.svg" 
              alt="Process State Transition and CPU Scheduling Lifecycle Diagram" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* 5 States Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-slate-300">1. NEW 👶</span>
              <p className="text-[11px] text-slate-400">
                {langMode === "simple" ? "You double-clicked an app icon. The computer is loading its code from the SSD." : "Program code is being read from SSD and PCB data structure is being created."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-emerald-300">2. READY 🏃</span>
              <p className="text-[11px] text-slate-400">
                {langMode === "simple" ? "Loaded into RAM, waiting in line for its turn on the fast CPU." : "Loaded in RAM, waiting in the ready queue for the CPU dispatcher to grant a time slice."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-indigo-300">3. RUNNING ⚡</span>
              <p className="text-[11px] text-slate-400">
                {langMode === "simple" ? "The CPU chip is actively working on the app's instructions right now." : "Instructions are actively executing inside the CPU core registers and ALU."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-rose-300">4. WAITING / BLOCKED 🛑</span>
              <p className="text-[11px] text-slate-400">
                {langMode === "simple" ? "App paused while waiting for you to type on keyboard or save a file." : "Process paused while waiting for slow peripheral I/O (disk read, keyboard input)."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-red-400">5. TERMINATED 🏁</span>
              <p className="text-[11px] text-slate-400">
                {langMode === "simple" ? "You closed the app. The OS frees up its RAM so other apps can use it." : "Execution finishes. OS de-allocates RAM and reclaims memory back to free pool."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-cyan-300">💡 Thread vs Process</span>
              <p className="text-[11px] text-slate-400">
                {langMode === "simple" ? "A Process has its own memory house; Threads are helper workers sharing the same house!" : "Threads are lightweight execution workers *inside* a process sharing memory."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE WINDOWS 11 CMD LAB EXAMPLES */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {langMode === "simple" ? "4. Practice Lab: 🪟 Windows 11 Diagnostics Terminal" : langMode === "hinglish" ? "4. Practical Lab: 🪟 Windows 11 Terminal Commands" : "4. Practical Lab: 🪟 Windows 11 OS Diagnostics Terminal"}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">Live 1-to-1 PC Output Simulation</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {langMode === "simple" && "Click on any command tab below to see how real Windows administrators inspect the OS version, manage running memory, and check hard drive health:"}
            {langMode === "standard" && "Select a practical ⊞ Windows Command Prompt instruction below to see how real system administrators inspect the OS kernel, active processes, and storage volumes:"}
            {langMode === "hinglish" && "Neeche diye gaye buttons par click karke dekho ki Windows terminal me OS version, active RAM processes aur disk health kaise check ki jaati hai:"}
          </p>

          {/* Command Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CMD_EXAMPLES.map((cmd, idx) => {
              const itemText = cmd[langMode];
              return (
                <button
                  key={cmd.id}
                  onClick={() => setActiveCmdIdx(idx)}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    activeCmdIdx === idx
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="truncate">{itemText.title}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Code & Output Box */}
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-black">C:\Users\Student&gt;</span>
                <span className="text-white font-mono font-bold">{activeCmd.command}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">CMD.EXE</span>
            </div>

            {/* Terminal Window */}
            <div className="rounded-2xl bg-[#030712] border border-slate-800 overflow-hidden shadow-2xl">
              <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-slate-400 ml-2">Administrator: ⊞ Windows 11 Command Prompt</span>
                </div>
                <span className="text-emerald-400 font-mono text-[10px]">100% Authentic PC Output</span>
              </div>

              <pre className="p-4 sm:p-6 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre selection:bg-emerald-500 selection:text-black">
                {activeCmd.output}
              </pre>
            </div>

            {/* Explanation Note */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>{langMode === "simple" ? "💡 Simple Explanation" : langMode === "hinglish" ? "💡 Aasan Samjh" : "Developer Deep-Dive"}</strong>: {activeCmdText.explanation}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EVOLUTIONARY TIMELINE & COMPARISON TABLE */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-lg sm:text-2xl font-black text-white">
              {langMode === "simple" ? "5. How Operating Systems Evolved Over Time" : langMode === "hinglish" ? "5. Operating Systems Ka Vikas (1940s Se Aaj Tak)" : "5. The Evolution of Operating Systems (1940s to Modern Era)"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-black">
                  <th className="p-3">Era / Year</th>
                  <th className="p-3">{langMode === "simple" ? "Stage Name" : "OS Paradigm"}</th>
                  <th className="p-3">{langMode === "simple" ? "What Was New & Great" : "Key Breakthrough"}</th>
                  <th className="p-3">{langMode === "simple" ? "The Big Problem" : "Primary Limitation"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1940s - 1950s</td>
                  <td className="p-3 font-bold">Serial Processing</td>
                  <td className="p-3">
                    {langMode === "simple" ? "Plugboard wire switches and punched paper cards" : "Direct plugboard / console switches & punched card readers"}
                  </td>
                  <td className="p-3 text-rose-400">
                    {langMode === "simple" ? "Only 1 user at a time; CPU sat doing nothing most of the day" : "1 user at a time, massive idle CPU time"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1956 (IBM / GM)</td>
                  <td className="p-3 font-bold">Simple Batch Systems</td>
                  <td className="p-3">
                    {langMode === "simple" ? "Grouped jobs together; a Monitor program ran cards one after another" : "Resident Monitor automatically loads queued batch jobs"}
                  </td>
                  <td className="p-3 text-rose-400">
                    {langMode === "simple" ? "CPU still had to wait for slow card readers and magnetic tape" : "CPU stays idle during slow card/tape I/O"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1964 (IBM OS/360)</td>
                  <td className="p-3 font-bold">Multiprogramming</td>
                  <td className="p-3">
                    {langMode === "simple" ? "Held multiple jobs in RAM; when one paused for printer, CPU switched to another" : "Overlaps CPU execution with peripheral I/O using JCL"}
                  </td>
                  <td className="p-3 text-rose-400">
                    {langMode === "simple" ? "Users could not type or interact with their program in real time" : "No real-time user conversational response"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1969 - 1973 (UNIX)</td>
                  <td className="p-3 font-bold">Time-Sharing & C Language</td>
                  <td className="p-3">
                    {langMode === "simple" ? "Gave each user split-second turns on keyboard terminals; created the C language" : "Dennis Ritchie rewrote UNIX in C; tiny time-slices (quanta)"}
                  </td>
                  <td className="p-3 text-emerald-400">
                    {langMode === "simple" ? "Huge success! Enabled multi-user systems and internet servers" : "High portability, multi-user terminal standard"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1981 - 1995 (PC Era)</td>
                  <td className="p-3 font-bold">PC-DOS & ⊞ Windows GUI</td>
                  <td className="p-3">
                    {langMode === "simple" ? "Brought mouse clicks, colorful windows, and personal computers to homes & desks" : "Desktop computing for homes/offices with graphical desktops"}
                  </td>
                  <td className="p-3 text-emerald-400">
                    {langMode === "simple" ? "Made computing easy for everyone in the world to use" : "User-friendly mass accessibility"}
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">Modern (2020s)</td>
                  <td className="p-3 font-bold">🪟 Windows 11, Linux, Cloud</td>
                  <td className="p-3">
                    {langMode === "simple" ? "64-bit multi-core speed, strong security, and cloud apps running everywhere" : "64-bit multi-core SMP, Virtualization, Containers, Microkernels"}
                  </td>
                  <td className="p-3 text-emerald-400">
                    {langMode === "simple" ? "Super fast, runs millions of tasks at the speed of light" : "Petabyte memory, millisecond cloud scaling"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: INTERACTIVE KNOWLEDGE CHECK QUIZ */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-purple-400 shrink-0" />
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {langMode === "simple" ? "6. Quick Knowledge Check Quiz" : langMode === "hinglish" ? "6. Interactive Knowledge Quiz" : "6. Interactive Knowledge Verification Quiz"}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-purple-400">
              {langMode === "simple" ? "Test What You Learned!" : "Test Your Core Exam Mastery"}
            </span>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const qData = q[langMode];
              const selectedOpt = activeQuizAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.answer;

              return (
                <div key={qIdx} className="p-5 rounded-2xl bg-[#060c18] border border-slate-800 space-y-3">
                  <p className="text-sm font-bold text-white flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-purple-950 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs shrink-0 font-mono">
                      {qIdx + 1}
                    </span>
                    <span>{qData.question}</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {qData.options.map((option, optIdx) => {
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                      if (isAnswered) {
                        if (optIdx === q.answer) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold shadow-md";
                        } else if (optIdx === selectedOpt) {
                          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 font-bold";
                        } else {
                          btnStyle = "bg-slate-950 border-slate-900 text-slate-500 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuiz(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono font-bold text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation[qIdx] && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                      isCorrect 
                        ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200' 
                        : 'bg-rose-950/30 border-rose-800/40 text-rose-200'
                    }`}>
                      <span className="font-bold">{isCorrect ? '✅ Correct! ' : '⚠️ Note: '}</span>
                      <span>{qData.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: FULL PAGE-WISE STUDY LINK & ATTRIBUTION FOOTER */}
        <div className="p-6 bg-[#0c1328] border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <Link
            href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
            <span>Unit 1: Computer Origin & Apps</span>
          </Link>

          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-white">Nextsem Academy • BCS-111 Master Curriculum</div>
            <div className="text-[11px] text-slate-400">Created by <strong>Er. Manoj Kumar</strong></div>
          </div>

          <Link
            href="/bca/notes/bcs-011-unit-2-operating-system"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Launch 12-Page Notes Suite</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </Link>
        </div>

      </main>
    </div>
  );
}
