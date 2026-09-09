"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Filter, 
  Search, 
  Play, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  HardDrive,
  Info,
  ChevronRight,
  Zap,
  Sliders
} from "lucide-react";

interface FilterPreset {
  id: string;
  name: string;
  command: string;
  output: string;
  description: string;
}

const filterPresets: FilterPreset[] = [
  {
    id: "os-details",
    name: "🪟 OS Name, Version & Architecture (Default)",
    command: 'systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"',
    output: `OS Name:                   Microsoft Windows 11 Pro\nOS Version:                10.0.26100 N/A Build 26100\nSystem Type:               x64-based PC`,
    description: "Extracts strictly the OS edition, exact Windows kernel build number, and 64-bit/32-bit hardware processor architecture."
  },
  {
    id: "hardware-memory",
    name: "💾 RAM & Memory Profile",
    command: 'systeminfo | findstr /B /C:"Total Physical Memory" /C:"Available Physical Memory"',
    output: `Total Physical Memory:     16,242 MB\nAvailable Physical Memory: 9,840 MB`,
    description: "Displays installed physical RAM and currently available unallocated memory in megabytes."
  },
  {
    id: "system-hardware",
    name: "💻 Hardware Model & Manufacturer",
    command: 'systeminfo | findstr /B /C:"System Manufacturer" /C:"System Model" /C:"BIOS Version"',
    output: `System Manufacturer:       ASUSTeK COMPUTER INC.\nSystem Model:              ROG Strix G15\nBIOS Version:              American Megatrends Inc. G513.331, 15/01/2026`,
    description: "Extracts PC motherboard manufacturer, laptop/desktop model name, and BIOS firmware release."
  },
  {
    id: "network-domain",
    name: "🌐 Network Host & Domain",
    command: 'systeminfo | findstr /B /C:"Host Name" /C:"Domain" /C:"Time Zone"',
    output: `Host Name:                 DEV-WORKSTATION-11\nDomain:                    WORKGROUP\nTime Zone:                 (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi`,
    description: "Inspects local workstation identity, Windows workgroup/Active Directory domain, and time zone."
  }
];

const quizQuestions = [
  {
    question: "What is the primary purpose of the pipe operator (|) in the command?",
    options: [
      "It deletes the output of the first command",
      "It streams the stdout of 'systeminfo' directly into 'findstr' as stdin",
      "It runs both commands in separate terminal windows",
      "It saves the output to a text file on disk"
    ],
    correct: 1,
    explanation: "The pipe '|' redirects the output of the left command (systeminfo) as direct input stream to the right command (findstr) without writing temporary files."
  },
  {
    question: "What does the '/B' flag in 'findstr /B' enforce?",
    options: [
      "Searches for binary files only",
      "Matches the search string only at the Beginning of a line",
      "Runs findstr in the background",
      "Converts lowercase characters to uppercase"
    ],
    correct: 1,
    explanation: "'/B' forces findstr to match patterns strictly at the start of lines, preventing false positives from middle substrings."
  },
  {
    question: "Why is '/C:\"OS Name\"' enclosed in quotes with the '/C:' flag?",
    options: [
      "To treat 'OS Name' as a single literal phrase with a space",
      "To make the command run faster",
      "Because Windows CMD requires all words to be quoted",
      "To encrypt the output string"
    ],
    correct: 0,
    explanation: "Without '/C:', findstr treats 'OS' and 'Name' as two separate words and matches lines containing either 'OS' OR 'Name'."
  },
  {
    question: "What does 'System Type: x64-based PC' tell a developer?",
    options: [
      "The computer has 64 gigabytes of storage",
      "The processor uses a 64-bit architecture capable of addressing >4GB RAM and running 64-bit software",
      "The computer is 64 years old",
      "The screen resolution is 640x480"
    ],
    correct: 1,
    explanation: "'x64-based PC' indicates an AMD64/x86-64 64-bit microprocessor architecture."
  }
];

export default function SystemInfoFindstrLessonClient() {
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "hinglish" | "hindi">("hinglish");
  const [activePreset, setActivePreset] = useState<FilterPreset>(filterPresets[0]);
  const [copied, setCopied] = useState(false);
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (submittedQuiz) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 selection:bg-emerald-500/30 font-sans pb-24">
      {/* Top Header Breadcrumb Navigation */}
      <header className="sticky top-0 z-50 bg-[#060c18]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            href="/cli" 
            className="flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft size={16} />
            <span>CLI Hub</span>
          </Link>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
            systeminfo | findstr OS Diagnostics
          </span>
        </div>

        {/* Language Tabs Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-700/70 p-1 rounded-xl">
          {(["english", "hinglish", "hindi"] as const).map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize ${
                selectedLanguage === lang 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </header>

      {/* Hero Header Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-10">
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase">
            <Sparkles size={14} className="animate-pulse" />
            <span>Windows CLI Power Diagnostics</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Mastering <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-xl sm:text-3xl font-mono">systeminfo | findstr</code> in 🪟 Windows 11
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {selectedLanguage === "hinglish" && "Kaise ek single terminal line se Windows 11 OS Name, Kernel Build Version aur 64-bit System Type extract kiya jata hai — pure anatomy, flags aur live interactive simulation ke sath!"}
            {selectedLanguage === "english" && "Discover how to instantly filter and extract precise Windows 11 OS Edition, exact Kernel Build Number, and CPU Architecture without digging through heavy GUI settings."}
            {selectedLanguage === "hindi" && "जानें कि कैसे केवल एक टर्मिनल कमांड से विंडोज़ 11 ओएस का नाम, सटीक कर्नेल बिल्ड और 64-बिट सीपीयू आर्किटेक्चर को बिना किसी माउस क्लिक के तुरंत निकाला जाता है।"}
          </p>
        </div>

        {/* 100% Authentic Windows 11 Command Prompt Showcase Box */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <Terminal size={14} className="text-emerald-400" />
              1-to-1 Authentic Windows 11 Terminal
            </span>
            <button
              onClick={() => copyToClipboard(activePreset.command)}
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-md transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "Copied Command!" : "Copy Command"}</span>
            </button>
          </div>

          {/* Outer Prompt Container */}
          <div className="rounded-2xl border border-slate-700/80 bg-[#080e1e] overflow-hidden shadow-2xl shadow-emerald-950/20">
            {/* Command Prompt Top Bar */}
            <div className="bg-[#0c1328] px-4 py-2.5 border-b border-slate-800/90 flex items-center justify-between select-none">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                  Administrator: ⊞ Windows 11 Command Prompt
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400/90 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                100% Authentic PC Output
              </span>
            </div>

            {/* Terminal Command Input Area */}
            <div className="p-4 sm:p-6 bg-[#040814] font-mono text-xs sm:text-sm overflow-x-auto space-y-4">
              <div className="flex items-start flex-wrap gap-1 leading-relaxed text-white">
                <span className="text-emerald-400 font-bold select-none">C:\Users\Student&gt;</span>
                <span className="font-semibold text-slate-100">{activePreset.command}</span>
              </div>

              {/* Console Output Block */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {activePreset.output}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Filter Preset Switcher */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sliders size={18} className="text-emerald-400" />
              <span>Interactive Filter Presets & Scenarios</span>
            </h3>
            <span className="text-xs text-slate-400">Click a scenario below to test live</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filterPresets.map(preset => {
              const isSelected = activePreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset)}
                  className={`text-left p-3.5 rounded-xl border transition-all space-y-1.5 ${
                    isSelected 
                      ? "bg-emerald-950/50 border-emerald-500/80 text-white shadow-lg shadow-emerald-950/40" 
                      : "bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm">{preset.name}</span>
                    {isSelected && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Deep Dive Breakdown Section */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
              <Layers size={22} className="text-emerald-400" />
              <span>Line-by-Line Command Anatomy</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click on each token below to understand how the Windows Command Processor interprets it:
            </p>
          </div>

          {/* Interactive Token Bar */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-900/80 border border-slate-800 rounded-xl font-mono text-xs sm:text-sm">
            <button 
              onClick={() => setActiveToken("systeminfo")}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                activeToken === "systeminfo" ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-800 text-emerald-400 border-slate-700 hover:border-emerald-500/50"
              }`}
            >
              systeminfo
            </button>
            <span className="text-slate-600 font-bold">➔</span>
            <button 
              onClick={() => setActiveToken("pipe")}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                activeToken === "pipe" ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-800 text-amber-400 border-slate-700 hover:border-amber-500/50"
              }`}
            >
              | (Pipe)
            </button>
            <span className="text-slate-600 font-bold">➔</span>
            <button 
              onClick={() => setActiveToken("findstr")}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                activeToken === "findstr" ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-800 text-cyan-400 border-slate-700 hover:border-cyan-500/50"
              }`}
            >
              findstr
            </button>
            <button 
              onClick={() => setActiveToken("flag-b")}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                activeToken === "flag-b" ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-800 text-fuchsia-400 border-slate-700 hover:border-fuchsia-500/50"
              }`}
            >
              /B
            </button>
            <button 
              onClick={() => setActiveToken("flag-c")}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                activeToken === "flag-c" ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-800 text-emerald-300 border-slate-700 hover:border-emerald-500/50"
              }`}
            >
              /C:"Pattern"
            </button>
          </div>

          {/* Detailed Cards for 5 Core Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. systeminfo */}
            <div className={`p-5 rounded-2xl border transition-all space-y-2.5 ${activeToken === "systeminfo" ? "bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40" : "bg-slate-900/50 border-slate-800"}`}>
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Cpu size={16} />
                <span className="font-mono">1. systeminfo</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLanguage === "hinglish" && "Windows ka built-in utility jo WMI (Windows Management Instrumentation) aur Registry ko query karke system ki 50+ properties (RAM, BIOS, OS, Network Cards, Hotfixes) ka ek comprehensive text report banata hai."}
                {selectedLanguage === "english" && "Queries Windows Management Instrumentation (WMI) to generate an exhaustive system diagnostic report of hardware, BIOS, OS configuration, patches, and network adapters."}
                {selectedLanguage === "hindi" && "यह विंडोज़ की एक इनबिल्ट यूटिलिटी है जो सिस्टम की हार्डवेयर और सॉफ्टवेयर जानकारी (रैम, बायोस, ओएस, नेटवर्क कार्ड) की पूरी रिपोर्ट तैयार करती है।"}
              </p>
            </div>

            {/* 2. Pipe | */}
            <div className={`p-5 rounded-2xl border transition-all space-y-2.5 ${activeToken === "pipe" ? "bg-slate-900 border-amber-500 shadow-lg shadow-amber-950/40" : "bg-slate-900/50 border-slate-800"}`}>
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Zap size={16} />
                <span className="font-mono">2. The Pipe Operator (|)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLanguage === "hinglish" && "Inter-Process Communication (IPC) ka jadu! Yeh 'systeminfo' ke pure output ko screen par print karne ke bajaye direct 'findstr' ke input me stream kar deta hai — zero disk space wastage!"}
                {selectedLanguage === "english" && "Streams the standard output (stdout) of systeminfo directly into the standard input (stdin) of findstr in memory without creating temporary files."}
                {selectedLanguage === "hindi" && "पाइप ऑपरेटर बाईं ओर के कमांड के आउटपुट को सीधे दाईं ओर के कमांड (findstr) के इनपुट में भेज देता है।"}
              </p>
            </div>

            {/* 3. findstr */}
            <div className={`p-5 rounded-2xl border transition-all space-y-2.5 ${activeToken === "findstr" ? "bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40" : "bg-slate-900/50 border-slate-800"}`}>
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <Search size={16} />
                <span className="font-mono">3. findstr (Windows Grep)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLanguage === "hinglish" && "Windows CMD ka official string search engine (Linux 'grep' ka equivalent). Yeh hazaro lines me se wahi line filter karta hai jo aapke search criteria se match hoti hain."}
                {selectedLanguage === "english" && "The built-in Windows equivalent of Linux 'grep'. It searches for patterns of text in files or input streams using regular expressions or exact strings."}
                {selectedLanguage === "hindi" && "यह विंडोज़ का शक्तिशाली स्ट्रिंग सर्च टूल है जो आउटपुट में से आपके द्वारा मांगे गए शब्दों को फ़िल्टर करता है।"}
              </p>
            </div>

            {/* 4. /B Flag */}
            <div className={`p-5 rounded-2xl border transition-all space-y-2.5 ${activeToken === "flag-b" ? "bg-slate-900 border-fuchsia-500 shadow-lg shadow-fuchsia-950/40" : "bg-slate-900/50 border-slate-800"}`}>
              <div className="flex items-center space-x-2 text-fuchsia-400 font-bold text-sm">
                <Filter size={16} />
                <span className="font-mono">4. Flag /B (Beginning of Line)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLanguage === "hinglish" && "Match at Beginning! Yeh ensure karta hai ki 'OS Name' line ke ekdam shuru me ho. Agar kisi sentence ke beech me 'OS Name' likha hoga toh yeh use ignore kar dega (zero false positives!)."}
                {selectedLanguage === "english" && "Matches pattern only if it occurs at the beginning of a line. Prevents false positive substring matches buried inside other output lines."}
                {selectedLanguage === "hindi" && "यह फ्लैग सुनिश्चित करता है कि सर्च पैटर्न लाइन के बिल्कुल शुरुआत में होना चाहिए।"}
              </p>
            </div>

            {/* 5. /C:"Pattern" */}
            <div className={`p-5 rounded-2xl border md:col-span-2 transition-all space-y-2.5 ${activeToken === "flag-c" ? "bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40" : "bg-slate-900/50 border-slate-800"}`}>
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
                <ShieldCheck size={16} />
                <span className="font-mono">5. Flag /C:"Literal Phrase"</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLanguage === "hinglish" && "Space wale words ko ek single search term maanne ke liye `/C:\"Word With Space\"` flag lagaya jata hai. Agar aap `/C:` nahi lagayenge, toh findstr 'OS' aur 'Name' dono ko alag-alag dhoondne lagega!"}
                {selectedLanguage === "english" && "Uses specified string as a literal search string containing spaces. Multiple /C: flags allow chained OR matching in a single execution pass."}
                {selectedLanguage === "hindi" && "स्पेस वाले शब्दों को एक साथ खोजने के लिए /C: का उपयोग किया जाता है। एक साथ कई /C: फ्लैग्स लगाकर हम कई फ़ील्ड्स एक बार में निकाल सकते हैं।"}
              </p>
            </div>
          </div>
        </section>

        {/* Output Values Detailed Explanation */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <Info size={20} className="text-emerald-400" />
              <span>What Do The Output Values Actually Mean?</span>
            </h2>
          </div>

          <div className="space-y-4">
            {/* OS Name */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400">OS Name: Microsoft Windows 11 Pro</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Edition</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Indicates the installed OS edition. <strong>Windows 11 Pro</strong> includes enterprise-grade features such as BitLocker drive encryption, Hyper-V virtualization, Windows Sandbox, and Remote Desktop Host capabilities (unlike Home edition).
              </p>
            </div>

            {/* OS Version */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400">OS Version: 10.0.26100 N/A Build 26100</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Kernel & Build</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>10.0</strong> represents the Windows NT Kernel major/minor version. <strong>Build 26100</strong> specifically identifies the <strong>Windows 11 24H2</strong> annual feature release update.
              </p>
            </div>

            {/* System Type */}
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400">System Type: x64-based PC</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">CPU Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Confirms that the hardware CPU operates in <strong>64-bit AMD64/x86_64</strong> mode. This permits memory addressing beyond 4 GB of RAM, running native 64-bit developer toolchains (Node.js, Docker, Python 64-bit), and hardware-assisted virtualization.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Knowledge Check Quiz */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <HelpCircle size={20} className="text-emerald-400" />
                <span>Quick Diagnostic Knowledge Check</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Test your mastery of Windows CLI piping & systeminfo</p>
            </div>
            {submittedQuiz && (
              <button
                onClick={() => { setQuizAnswers({}); setSubmittedQuiz(false); }}
                className="flex items-center space-x-1 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <RefreshCw size={14} />
                <span>Retry Quiz</span>
              </button>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              const isCorrect = selectedOpt === q.correct;
              return (
                <div key={qIdx} className="space-y-3 p-4 bg-slate-950/40 rounded-xl border border-slate-800/70">
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (selectedOpt === optIdx) {
                        btnStyle = "bg-emerald-950 border-emerald-500 text-white font-semibold";
                      }
                      if (submittedQuiz) {
                        if (optIdx === q.correct) {
                          btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                        } else if (selectedOpt === optIdx && !isCorrect) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                        }
                      }
                      return (
                        <button
                          key={optIdx}
                          disabled={submittedQuiz}
                          onClick={() => handleSelectQuiz(qIdx, optIdx)}
                          className={`text-left text-xs sm:text-sm p-3 rounded-lg border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {submittedQuiz && optIdx === q.correct && (
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                          )}
                          {submittedQuiz && selectedOpt === optIdx && !isCorrect && (
                            <XCircle size={16} className="text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? "bg-emerald-950/30 text-emerald-300 border border-emerald-800/50" : "bg-rose-950/30 text-rose-300 border border-rose-800/50"}`}>
                      <strong>{isCorrect ? "✅ Correct!" : "❌ Incorrect."}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submittedQuiz && (
            <button
              onClick={() => setSubmittedQuiz(true)}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-900/40"
            >
              Submit Answers & Check Score
            </button>
          )}
        </section>

        {/* Bottom Back / Next Navigation */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/cli"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Return to Windows CLI Hub</span>
          </Link>

          <Link
            href="/bca/semester-1/bcs-011-computer-basics/unit-2-operating-system"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm text-center transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
          >
            <span>Explore Unit 2: Operating System Hub</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
