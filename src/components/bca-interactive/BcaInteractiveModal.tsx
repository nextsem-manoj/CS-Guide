"use client";

import React, { useState, useEffect } from 'react';
import { X, Menu, Home, Clock, Cpu, HelpCircle, GraduationCap, Star, BookOpen, AlertCircle, Layers } from 'lucide-react';
import BcaOriginsTimeline from './BcaOriginsTimeline';
import BcaGenerationsGame from './BcaGenerationsGame';
import BcaComputerFunctioning from './BcaComputerFunctioning';
import BcaMotherboardExplorer from './BcaMotherboardExplorer';
import BcaCpuSimulator from './BcaCpuSimulator';
import BcaBreadboardSandbox from './BcaBreadboardSandbox';
import BcaVirtualConsole from './BcaVirtualConsole';

interface BcaInteractiveModalProps {
  unitNumber: number; // 1 or 2
  defaultTab?: string;
  onClose: () => void;
}

interface Question {
  q: string;
  o: string[];
  c: number;
  exp: string;
}

const QUIZ_U1: Question[] = [
  {
    q: "Who is widely celebrated as the 'father of the computer'?",
    o: ["John Napier", "Blaise Pascal", "Charles Babbage", "Gottfried Leibniz"],
    c: 2,
    exp: "Charles Babbage designed the Difference and Analytical Engines, forming the basis of modern computer design."
  },
  {
    q: "Which device, developed in China in 3000 B.C., is considered the first computer?",
    o: ["Slide Rule", "Abacus", "Pascaline", "Napier's Bones"],
    c: 1,
    exp: "The Abacus is a simple counting frame with beads, considered the earliest calculation aid in history."
  },
  {
    q: "Which switching technology characterized the First Generation of computers (1940-1956)?",
    o: ["Transistors", "Integrated Circuits", "Vacuum Tubes", "Microprocessors"],
    c: 2,
    exp: "First Generation computers used glass vacuum tubes, which generated massive heat and broke down frequently."
  },
  {
    q: "What was the major breakthrough of Third Generation computers?",
    o: ["Microprocessors", "Integrated Circuits (ICs)", "Transistors", "Artificial Intelligence"],
    c: 1,
    exp: "Third Generation computers introduced Integrated Circuits (ICs), placing multiple transistors on silicon chips."
  },
  {
    q: "In Von Neumann architecture, what concept allows both data and instructions to be stored in the same memory?",
    o: ["Separated Cache Concept", "Stored Program Concept", "Sequential Flow Concept", "Dual Execution Concept"],
    c: 1,
    exp: "The Stored Program Concept dictates that instructions and data reside in the same physical memory space (RAM)."
  }
];

const QUIZ_U2: Question[] = [
  {
    q: "What is the correct sequence of phases in the instruction cycle?",
    o: ["Decode, Fetch, Execute", "Fetch, Decode, Execute", "Fetch, Execute, Decode", "Execute, Fetch, Decode"],
    c: 1,
    exp: "The instruction cycle always proceeds as: Fetch (read from memory), Decode (CU interprets), and Execute (ALU processes)."
  },
  {
    q: "Which register holds the address of the next instruction to be fetched from memory?",
    o: ["Instruction Register (IR)", "Program Counter (PC)", "Memory Address Register (MAR)", "Accumulator (ACC)"],
    c: 1,
    exp: "The Program Counter (PC) stores the memory index of the next instruction and increments automatically."
  },
  {
    q: "Which CPU register stores the instruction that is currently being decoded and executed?",
    o: ["Program Counter (PC)", "Instruction Register (IR)", "Accumulator (ACC)", "Memory Buffer Register (MBR)"],
    c: 1,
    exp: "The Instruction Register (IR) holds a copy of the instruction currently being executed by the CPU."
  },
  {
    q: "What is the primary function of the Accumulator (ACC) register?",
    o: ["To store physical memory addresses", "To hold intermediate arithmetic and logic results", "To decode incoming control signals", "To sync hardware clock cycles"],
    c: 1,
    exp: "The Accumulator (ACC) is a temporary CPU register in the ALU used to store calculated values during arithmetic steps."
  },
  {
    q: "Which system bus is unidirectional and carries the index of the target memory cell?",
    o: ["Data Bus", "Address Bus", "Control Bus", "System Bus"],
    c: 1,
    exp: "The Address Bus is unidirectional (CPU to RAM/IO) and carries memory addresses to select specific cells."
  }
];

const APPS_U1 = [
  { icon: "🏦", title: "Banking", desc: "Manages accounts, electronic fund transfers (EFT), ledger databases, and online banking systems." },
  { icon: "🚦", title: "Traffic Control", desc: "Coordinates signal intervals, detects traffic densities, and manages lane flow automatically." },
  { icon: "🏫", title: "Education", desc: "Runs student-centered interactive learning dashboards, grades tracking, and digital library catalogs." },
  { icon: "🏥", title: "Health Care", desc: "Organizes patient records (HIS), medical imaging, diagnostics systems, and digital ICU surgery monitors." }
];

const LIMITS_U1 = [
  { icon: "🧠", title: "No Self Intelligence", desc: "Computers have no native intelligence. They can only execute programmed instructions and cannot make moral/associative decisions." },
  { icon: "🛠️", title: "Program Dependent", desc: "Without human-coded software scripts, computer hardware is simply a set of switches waiting for binary control signals." },
  { icon: "🧸", title: "Emotionless", desc: "Computers do not possess feelings, empathy, or moral judgment. They are blind to human relationships." }
];

export default function BcaInteractiveModal({ unitNumber, defaultTab = "home", onClose }: BcaInteractiveModalProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  
  // Quiz State
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizDone, setQuizDone] = useState<boolean>(false);

  const quizQuestions = unitNumber === 2 ? QUIZ_U2 : QUIZ_U1;

  // Escape key close handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent scroll hijacking on body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleNextQuestion = () => {
    setSelectedAns(null);
    setShowExplanation(false);
    if (quizIdx < quizQuestions.length - 1) {
      setQuizIdx(quizIdx + 1);
    } else {
      setQuizDone(true);
      
      // Award XP points (+50 XP for quiz completion)
      const savedUser = localStorage.getItem('nextsem_user');
      let email = "guest";
      if (savedUser) {
        try {
          email = JSON.parse(savedUser).email || "guest";
        } catch (e) {}
      }
      const savedPoints = parseInt(localStorage.getItem(`nextsem_bca_points_${email}`) || "0", 10);
      localStorage.setItem(`nextsem_bca_points_${email}`, (savedPoints + 50).toString());
      window.dispatchEvent(new Event("nextsem_points_updated"));
    }
  };

  const handleAnsSelect = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    setShowExplanation(true);
    if (idx === quizQuestions[quizIdx].c) {
      setQuizScore(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setSelectedAns(null);
    setQuizScore(0);
    setShowExplanation(false);
    setQuizDone(false);
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 1024) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      
      {/* Outer Wrapper */}
      <div className="w-full h-full sm:max-h-[92vh] sm:max-w-5xl bg-slate-950 border border-white/5 sm:rounded-[36px] overflow-hidden flex flex-col relative shadow-2xl">
        
        {/* Top Toolbar */}
        <div className="h-14 border-b border-slate-850/50 bg-[#0a0a0f] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white"
            >
              <Menu size={18} />
            </button>
            <span className="text-xs font-black uppercase text-slate-350 tracking-wider flex items-center gap-2">
              <GraduationCap size={16} className="text-emerald-400" />
              Unit {unitNumber} Interactive Workspace
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Core Layout */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Left Sidebar Navigation */}
          <aside className={`absolute lg:static top-0 bottom-0 left-0 z-20 w-60 border-r border-slate-850/40 bg-[#09090d] flex flex-col justify-between shrink-0 transition-transform duration-300 lg:translate-x-0 ${
            sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
          }`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest px-2.5">Workspace</span>
                <button
                  onClick={() => handleTabSwitch('home')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                    activeTab === 'home' 
                      ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/10' 
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
                >
                  <Home size={15} />
                  Home Station
                </button>
              </div>

              {unitNumber === 1 ? (
                <>
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest px-2.5">Historical Evolution</span>
                    {[
                      { id: "origins", label: "Origins Timeline", icon: <Clock size={15} /> },
                      { id: "generations", label: "Generations Game", icon: <Star size={15} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabSwitch(tab.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                          activeTab === tab.id 
                            ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/10' 
                            : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest px-2.5">Hardware Core</span>
                    {[
                      { id: "systemunit", label: "Motherboard Explorer", icon: <Cpu size={15} /> },
                      { id: "iccircuits", label: "Logic Gate Breadboard", icon: <AlertCircle size={15} /> },
                      { id: "osshell", label: "Virtual DOS Console", icon: <BookOpen size={15} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabSwitch(tab.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                          activeTab === tab.id 
                            ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/10' 
                            : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest px-2.5">Context & Review</span>
                    {[
                      { id: "appslimits", label: "Applications & Limits", icon: <HelpCircle size={15} /> },
                      { id: "quiz", label: "Check Your Progress", icon: <Star size={15} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabSwitch(tab.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                          activeTab === tab.id 
                            ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/10' 
                            : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest px-2.5">Instruction Cycle</span>
                    {[
                      { id: "functioning", label: "CPU Operational Flow", icon: <Cpu size={15} /> },
                      { id: "vonneumann", label: "Von Neumann Simulator", icon: <Layers size={15} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabSwitch(tab.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                          activeTab === tab.id 
                            ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/10' 
                            : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest px-2.5">Review</span>
                    <button
                      onClick={() => handleTabSwitch('quiz')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                        activeTab === 'quiz' 
                          ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/10' 
                          : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                      }`}
                    >
                      <Star size={15} />
                      Check Your Progress
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Backdrop layer for mobile sidebar */}
          {!sidebarCollapsed && (
            <div 
              onClick={() => setSidebarCollapsed(true)} 
              className="lg:hidden absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"
            />
          )}

          {/* Right Display Stage */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
            
            {/* TAB: Dashboard Home */}
            {activeTab === 'home' && (
              <div className="flex flex-col gap-6 text-left animate-fadeInFast">
                {/* Banner */}
                <div className="bg-gradient-to-br from-emerald-500/15 to-indigo-500/5 border border-emerald-500/20 rounded-[32px] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] bg-emerald-500/10 pointer-events-none" />
                  <h2 className="text-xl font-black text-white">
                    🎓 Unit {unitNumber} Interactive Learning Hub
                  </h2>
                  <p className="text-slate-350 text-xs mt-2 leading-relaxed max-w-2xl">
                    Welcome to the hardware architecture laboratory workstation. Explore microchips, diagnostic consoles, register simulation, and animated data paths. Select a sandbox station in the sidebar menu or grid below to begin.
                  </p>
                </div>

                {/* Stations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                  {unitNumber === 1 ? (
                    <>
                      {[
                        { id: "origins", label: "Origins Timeline", desc: "Trace counting frames, bones, Pascal gears, and log slide rules.", icon: "🕒", badge: "History" },
                        { id: "generations", label: "Generations Game", desc: "Drag, match, and categorize key logic technologies (valves, transistors).", icon: "📊", badge: "Game" },
                        { id: "systemunit", label: "Motherboard Explorer", desc: "Inspect quartz clocks, serial ports, BIOS, RAM, and sockets.", icon: "💾", badge: "Board" },
                        { id: "iccircuits", label: "Logic Gate Breadboard", icon: "🔬", desc: "Toggle switch states, map gate inputs, and inspect glowing LEDs.", badge: "Sandbox" },
                        { id: "osshell", label: "Virtual DOS Console", icon: "💻", desc: "Simulate POST sequences and run command diagnostics (DIR, HELP, TYPE).", badge: "Terminal" },
                        { id: "appslimits", label: "Applications & Limits", icon: "🌍", desc: "Check real-world software scopes and computer bottlenecks.", badge: "Context" }
                      ].map(item => (
                        <div
                          key={item.id}
                          onClick={() => handleTabSwitch(item.id)}
                          className="bg-[#121217] hover:bg-[#15151e] border border-white/5 hover:border-slate-800 rounded-3xl p-5 cursor-pointer hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between shadow-md min-h-[145px]"
                        >
                          <div>
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <h4 className="text-sm font-black text-white">{item.label}</h4>
                            <p className="text-[10px] text-slate-550 mt-1 leading-snug">{item.desc}</p>
                          </div>
                          <span className="text-[8px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded self-start mt-4">{item.badge}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {[
                        { id: "functioning", label: "CPU Operational Flow", desc: "Animate SVG packages along buses during scenarios (addition, logical checks).", icon: "⚙️", badge: "Bus path" },
                        { id: "vonneumann", label: "Von Neumann Simulator", desc: "Trace registers (PC, ACC, MBR) and compile custom RAM code.", icon: "🔲", badge: "Processor" },
                        { id: "quiz", label: "Check Your Progress", desc: "Solve MCQ syllabus questions to review the unit content.", icon: "🏆", badge: "Review" }
                      ].map(item => (
                        <div
                          key={item.id}
                          onClick={() => handleTabSwitch(item.id)}
                          className="bg-[#121217] hover:bg-[#15151e] border border-white/5 hover:border-slate-800 rounded-3xl p-5 cursor-pointer hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between shadow-md min-h-[145px]"
                        >
                          <div>
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <h4 className="text-sm font-black text-white">{item.label}</h4>
                            <p className="text-[10px] text-slate-550 mt-1 leading-snug">{item.desc}</p>
                          </div>
                          <span className="text-[8px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded self-start mt-4">{item.badge}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB: Timeline */}
            {activeTab === 'origins' && <BcaOriginsTimeline />}

            {/* TAB: Generations */}
            {activeTab === 'generations' && <BcaGenerationsGame />}

            {/* TAB: Functioning */}
            {activeTab === 'functioning' && <BcaComputerFunctioning />}

            {/* TAB: Motherboard Explorer */}
            {activeTab === 'systemunit' && <BcaMotherboardExplorer />}

            {/* TAB: CPU Simulator */}
            {activeTab === 'vonneumann' && <BcaCpuSimulator />}

            {/* TAB: Logic Gate Breadboard */}
            {activeTab === 'iccircuits' && <BcaBreadboardSandbox />}

            {/* TAB: Virtual Console */}
            {activeTab === 'osshell' && <BcaVirtualConsole />}

            {/* TAB: Applications & Limits */}
            {activeTab === 'appslimits' && (
              <div className="flex flex-col gap-6 text-left animate-fadeInFast">
                <div>
                  <h3 className="text-lg font-black text-white">🌍 Computer Applications &amp; Limitations</h3>
                  <p className="text-slate-400 text-xs mt-1">Review where computers excel, and where their logical circuits hit bottlenecks.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Apps */}
                  <div className="bg-[#121217] border border-slate-850 rounded-[32px] p-5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-4">Key Applications</span>
                    <div className="space-y-4">
                      {APPS_U1.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start border-b border-slate-900 pb-3 last:border-0 last:pb-0">
                          <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                          <div>
                            <h5 className="text-xs font-black text-white">{item.title}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Limitations */}
                  <div className="bg-[#121217] border border-slate-850 rounded-[32px] p-5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-4">Limitations</span>
                    <div className="space-y-4">
                      {LIMITS_U1.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start border-b border-slate-900 pb-3 last:border-0 last:pb-0">
                          <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                          <div>
                            <h5 className="text-xs font-black text-white">{item.title}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Quiz */}
            {activeTab === 'quiz' && (
              <div className="max-w-xl mx-auto text-left animate-fadeInFast">
                {quizDone ? (
                  <div className="bg-[#121217] border border-emerald-500/20 rounded-[32px] p-6 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-[#39D353] mb-4">
                      🏆
                    </div>
                    <h3 className="text-xl font-black text-white">Quiz Completed!</h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      You scored <strong className="text-[#39D353]">{quizScore}</strong> out of <strong className="text-white">{quizQuestions.length}</strong>.
                    </p>
                    <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md mt-4 border border-amber-500/20">
                      +50 XP Points Awarded
                    </span>
                    <button
                      onClick={resetQuiz}
                      className="mt-6 px-6 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 font-black text-xs uppercase tracking-wider text-slate-350 rounded-2xl transition-all cursor-pointer"
                    >
                      Restart Quiz
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#121217] border border-slate-850 rounded-[32px] p-6 min-h-[320px] flex flex-col justify-between">
                    <div>
                      {/* Progress */}
                      <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-850 pb-3 mb-4 select-none">
                        <span>Question {quizIdx + 1} of {quizQuestions.length}</span>
                        <span>Score: {quizScore}</span>
                      </div>

                      {/* Question Text */}
                      <h4 className="text-sm font-black text-white leading-snug">
                        {quizQuestions[quizIdx].q}
                      </h4>

                      {/* Options Grid */}
                      <div className="space-y-3 mt-6">
                        {quizQuestions[quizIdx].o.map((opt, oIdx) => {
                          const isSelected = selectedAns === oIdx;
                          const isCorrect = oIdx === quizQuestions[quizIdx].c;
                          
                          let optStyle = "bg-[#181822]/40 border-white/5 text-slate-300 hover:border-slate-800 hover:text-white";
                          if (selectedAns !== null) {
                            if (isCorrect) {
                              optStyle = "bg-emerald-500/10 border-emerald-450 text-emerald-300 font-bold shadow-md shadow-emerald-500/5";
                            } else if (isSelected) {
                              optStyle = "bg-red-500/10 border-red-500/40 text-red-400 font-bold";
                            } else {
                              optStyle = "bg-[#181822]/10 border-white/5 text-slate-600 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnsSelect(oIdx)}
                              disabled={selectedAns !== null}
                              className={`w-full p-4 rounded-2xl border text-left text-xs font-black transition-all cursor-pointer leading-snug ${optStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback & Navigation */}
                    {showExplanation && (
                      <div className="mt-6 pt-5 border-t border-slate-850 flex flex-col gap-4 animate-fadeInFast">
                        <div className="bg-indigo-950/20 border border-indigo-500/15 rounded-2xl p-4 text-xs leading-relaxed text-slate-350">
                          <span className="font-black text-indigo-400 block mb-1">Explanation:</span>
                          {quizQuestions[quizIdx].exp}
                        </div>

                        <button
                          onClick={handleNextQuestion}
                          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-550 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-md shadow-emerald-600/15 cursor-pointer"
                        >
                          {quizIdx < quizQuestions.length - 1 ? "Next Question" : "Submit Results"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
