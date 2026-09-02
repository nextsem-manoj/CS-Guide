"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, BookOpen, Sparkles, Check, HelpCircle, AlertCircle, 
  Award, ChevronRight, ChevronLeft, Zap, Terminal, Layers, Cpu,
  HardDrive, MemoryStick, Shield, Play, RotateCcw, CheckCircle2,
  ExternalLink, FileText, Monitor, Server, Clock, ListChecks
} from 'lucide-react';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

interface CmdExample {
  id: string;
  title: string;
  command: string;
  description: string;
  output: string;
  explanation: string;
}

const CMD_EXAMPLES: CmdExample[] = [
  {
    id: "systeminfo",
    title: "1. Inspect OS Architecture & Version",
    command: "systeminfo | findstr /B /C:\"OS Name\" /C:\"OS Version\" /C:\"System Type\"",
    description: "Queries the Windows kernel to inspect the OS version, build number, and 64-bit multi-core hardware architecture.",
    output: `OS Name:                   Microsoft Windows 11 Pro
OS Version:                10.0.26100 N/A Build 26100
System Type:               x64-based PC`,
    explanation: "This command demonstrates how the OS exposes its core kernel build string and hardware instruction set (x64) via the System Management Interface."
  },
  {
    id: "tasklist",
    title: "2. View Active Processes in Memory (RAM)",
    command: "tasklist /FI \"STATUS eq RUNNING\"",
    description: "Lists currently running processes managed by the OS Process Scheduler inside RAM.",
    output: `Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
System                           4 Services                   0        148 K
smss.exe                       392 Services                   0      1,024 K
csrss.exe                      580 Services                   0      5,240 K
wininit.exe                    668 Services                   0      4,880 K
explorer.exe                  4120 Console                    1    142,560 K
chrome.exe                    8428 Console                    1    284,120 K`,
    explanation: "Each active program is assigned a unique Process Identifier (PID), session isolation boundary, and real-time physical RAM working set allocation."
  },
  {
    id: "taskkill",
    title: "3. Terminate Malfunctioning Process (Process Control)",
    command: "taskkill /PID 8428 /F",
    description: "Forces immediate termination of a hung process and reclaims all allocated RAM and hardware handles.",
    output: `SUCCESS: The process with PID 8428 has been terminated.`,
    explanation: "The OS kernel sends a SIGKILL signal, immediately releases the process's page table mappings from RAM, and returns the resources to the free memory pool."
  },
  {
    id: "chkdsk",
    title: "4. Verify File System Integrity (NTFS / FAT32)",
    command: "chkdsk C: /f",
    description: "Scans disk sectors, verifies Master File Table (MFT) integrity, and fixes logical file system errors.",
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
    explanation: "The File Management System (FMS) maintains directory tree mappings and cluster allocation bitmaps, verifying physical storage sector health."
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "What is the primary core nucleus of an operating system that permanently resides in RAM?",
    options: ["The Kernel", "The Browser", "The File Explorer", "The Recycle Bin"],
    answer: 0,
    explanation: "The Kernel is the essential foundational core of the OS that stays resident in RAM from boot until power off."
  },
  {
    question: "Which OS scheduling technique allows multiple active programs to share the CPU by allotting each a small time quantum?",
    options: ["Batch Processing", "Time-Sharing (Multitasking)", "Serial Processing", "Single-User Spooling"],
    answer: 1,
    explanation: "Time-sharing assigns tiny time slices (quanta) to active processes, enabling rapid conversational multitasking."
  },
  {
    question: "What state does a process transition to when it requests a slow disk read or keyboard input?",
    options: ["Running State", "Waiting / Blocked State", "Terminated State", "Bootstrap State"],
    answer: 1,
    explanation: "When a process awaits peripheral I/O completion, the OS moves it to the Blocked/Waiting queue so other ready jobs can use the CPU."
  },
  {
    question: "What is the main difference between a Process and a Thread?",
    options: [
      "Processes run on GPU while threads run on RAM",
      "A process has its own isolated memory space, while threads inside a process share memory",
      "Threads cannot execute CPU instructions",
      "A process can only run one line of code per day"
    ],
    answer: 1,
    explanation: "A process is an isolated execution container with its own private address space; threads are lightweight execution units inside the process sharing memory."
  }
];

export default function Unit2OperatingSystemLessonPage() {
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    setActiveQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));
  };

  const activeCmd = CMD_EXAMPLES[activeCmdIdx];

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col selection:bg-[#04AA6D] selection:text-black">
      {/* Top Header */}
      <BcaHeaderNav currentSubjectCode="BCS-111" currentSubjectName="Computer Basics & PC Software" />

      {/* Main Lesson Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 space-y-8">

        {/* Top Breadcrumb & Hero Banner */}
        <div className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-2xl space-y-4">
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

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>🖥️ Operating System Fundamentals & Architecture</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master how the Operating System acts as the central conductor of hardware, manages processes, allocates memory, orchestrates file systems, and runs concurrent programs with step-by-step visual diagrams.
            </p>
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
              1. The Big Picture: What is an Operating System?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Analogy 1: The Restaurant Kitchen */}
            <div className="p-5 rounded-2xl bg-[#070d19] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-amber-300">
                <span>🍳 Analogy 1: The Master Restaurant Chef</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <li>• <strong>The Kitchen Counter (RAM)</strong>: Fast, immediate working space holding current ingredients.</li>
                <li>• <strong>The Storage Pantry (Hard Drive / SSD)</strong>: Massive storage holding all raw food boxes (programs).</li>
                <li>• <strong>The Chef (CPU)</strong>: Performs high-speed cooking instructions (+, -, slicing data).</li>
                <li>• <strong>The Restaurant Manager (The OS)</strong>: Decides which waiter's order gets cooked next, prevents kitchen fires, and ensures no table starves!</li>
              </ul>
            </div>

            {/* Analogy 2: The Traffic Police Officer */}
            <div className="p-5 rounded-2xl bg-[#070d19] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-cyan-300">
                <span>🚦 Analogy 2: The City Traffic Controller</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <li>• <strong>The Road Intersections (System Bus)</strong>: Shared lanes where data travels between chips.</li>
                <li>• <strong>The Vehicles (Running Processes)</strong>: Thousands of cars trying to move simultaneously.</li>
                <li>• <strong>The Traffic Officer (The OS)</strong>: Regulates signal lights, prevents fatal collisions (deadlocks), and gives priority ambulances (interrupts) instant right-of-way!</li>
              </ul>
            </div>
          </div>

          {/* Core Objectives List */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-emerald-100 space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Two Golden Objectives of Every Operating System:</span>
            </div>
            <p>1. <strong>Convenience</strong>: Make complex silicon computer hardware comfortable, friendly, and easy for humans to operate.</p>
            <p>2. <strong>Efficiency</strong>: Maximize CPU and memory throughput so hardware never wastes idle cycles.</p>
          </div>
        </section>

        {/* SECTION 2: 4-LAYER OS ARCHITECTURE DIAGRAM */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
              <h2 className="text-lg sm:text-2xl font-black text-white">
                2. The 4-Layer Operating System Architecture
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">User Space ➔ Kernel Space ➔ Hardware</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The computer system is structured into four distinct hierarchical layers. Applications running in User Space cannot directly touch physical transistors; they must issue safe <strong>System Calls (APIs)</strong> to the Kernel.
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
              <div className="text-xs font-black text-sky-400">Layer 1: User Space</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Applications like Chrome, VS Code, Word, and CLI terminals run in unprivileged CPU rings to prevent crashes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-purple-400">Layer 2: Shell & UI</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                The user-facing command interpreter (⊞ Windows GUI, CMD, PowerShell, Bash) that parses user intent into system calls.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-emerald-400">Layer 3: Kernel Core</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                The resident heart of the OS. Controls CPU scheduling, RAM paging, file systems, and hardware device drivers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-xs font-black text-amber-400">Layer 4: Hardware</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                The physical chips: Multi-core CPU, DDR5 RAM modules, NVMe SSD storage, and Network Interface Cards (NIC).
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
                3. Process Lifecycle & The 5 Execution States
              </h2>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">Process Control Block (PCB)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A <strong>Process</strong> is an active program in execution. The CPU dispatcher transitions processes between 5 lifecycle states to achieve smooth multitasking:
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
              <p className="text-[11px] text-slate-400">Program code is being read from SSD and PCB data structure is being created.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-emerald-300">2. READY 🏃</span>
              <p className="text-[11px] text-slate-400">Loaded in RAM, waiting in the ready queue for the CPU dispatcher to grant a time slice.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-indigo-300">3. RUNNING ⚡</span>
              <p className="text-[11px] text-slate-400">Instructions are actively executing inside the CPU core registers and ALU.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-rose-300">4. WAITING / BLOCKED 🛑</span>
              <p className="text-[11px] text-slate-400">Process paused while waiting for slow peripheral I/O (disk read, keyboard input).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-red-400">5. TERMINATED 🏁</span>
              <p className="text-[11px] text-slate-400">Execution finishes. OS de-allocates RAM and reclaims memory back to free pool.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070d19] border border-slate-800 space-y-1">
              <span className="text-xs font-black text-cyan-300">💡 Thread vs Process</span>
              <p className="text-[11px] text-slate-400">Threads are lightweight execution workers *inside* a process sharing memory.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE WINDOWS 11 CMD LAB EXAMPLES */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />
              <h2 className="text-lg sm:text-2xl font-black text-white">
                4. Practical Lab: 🪟 Windows 11 OS Diagnostics Terminal
              </h2>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">Live 1-to-1 PC Output Simulation</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Select a practical ⊞ Windows Command Prompt instruction below to see how real system administrators inspect the OS kernel, active processes, and storage volumes:
          </p>

          {/* Command Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CMD_EXAMPLES.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => setActiveCmdIdx(idx)}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  activeCmdIdx === idx
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="truncate">{cmd.title}</div>
              </button>
            ))}
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
                <strong>Developer Deep-Dive</strong>: {activeCmd.explanation}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EVOLUTIONARY TIMELINE & COMPARISON TABLE */}
        <section className="p-6 sm:p-8 bg-[#0c1328] border border-slate-800 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-lg sm:text-2xl font-black text-white">
              5. The Evolution of Operating Systems (1940s to Modern Era)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-black">
                  <th className="p-3">Era / Year</th>
                  <th className="p-3">OS Paradigm</th>
                  <th className="p-3">Key Breakthrough</th>
                  <th className="p-3">Primary Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1940s - 1950s</td>
                  <td className="p-3 font-bold">Serial Processing</td>
                  <td className="p-3">Direct plugboard / console switches & punched card readers</td>
                  <td className="p-3 text-rose-400">1 user at a time, massive idle CPU time</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1956 (GM / IBM)</td>
                  <td className="p-3 font-bold">Simple Batch Systems</td>
                  <td className="p-3">Resident Monitor automatically loads queued batch jobs</td>
                  <td className="p-3 text-rose-400">CPU stays idle during slow card/tape I/O</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1964 (IBM OS/360)</td>
                  <td className="p-3 font-bold">Multiprogramming</td>
                  <td className="p-3">Overlaps CPU execution with peripheral I/O using JCL</td>
                  <td className="p-3 text-rose-400">No real-time user conversational response</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1969 - 1973 (UNIX)</td>
                  <td className="p-3 font-bold">Time-Sharing & C Language</td>
                  <td className="p-3">Dennis Ritchie rewrote UNIX in C; tiny time-slices (quanta)</td>
                  <td className="p-3 text-emerald-400">High portability, multi-user terminal standard</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">1981 - 1995 (PC Era)</td>
                  <td className="p-3 font-bold">PC-DOS & ⊞ Windows GUI</td>
                  <td className="p-3">Desktop computing for homes/offices with graphical desktops</td>
                  <td className="p-3 text-emerald-400">User-friendly mass accessibility</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-cyan-400">Modern (2020s)</td>
                  <td className="p-3 font-bold">🪟 Windows 11, Linux, Cloud</td>
                  <td className="p-3">64-bit multi-core SMP, Virtualization, Containers, Microkernels</td>
                  <td className="p-3 text-emerald-400">Petabyte memory, millisecond cloud scaling</td>
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
                6. Interactive Knowledge Verification Quiz
              </h2>
            </div>
            <span className="text-[11px] font-mono text-purple-400">Test Your Core Exam Mastery</span>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const selectedOpt = activeQuizAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.answer;

              return (
                <div key={qIdx} className="p-5 rounded-2xl bg-[#060c18] border border-slate-800 space-y-3">
                  <p className="text-sm font-bold text-white flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-purple-950 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs shrink-0 font-mono">
                      {qIdx + 1}
                    </span>
                    <span>{q.question}</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((option, optIdx) => {
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
                      <span>{q.explanation}</span>
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
