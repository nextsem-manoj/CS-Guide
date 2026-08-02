"use client";

import React, { useState } from "react";
import { Calendar, Monitor, History, Terminal, ArrowRight, Layers } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  shortDesc: string;
  uiStyle: string; // Tailwind class
  screenText: string;
  details: string;
}

const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "1981",
    title: "MS-DOS Era",
    shortDesc: "Microsoft Disk Operating System",
    uiStyle: "bg-black border-slate-700 text-[#39ff14] font-mono",
    screenText: "C:\\> ver\n\nMS-DOS Version 1.00\nC:\\>",
    details: "DOS originated during the early days of the personal computer revolution in the late 1970s and the early 1980s. As the personal computer market grew, IBM, a major manufacturer of high-powered mainframe computers, decided to market its own personal computer. Rather than designing specific IBM components, IBM bought MS-DOS from a small Seattle company called Microsoft. IBM let Microsoft keep the rights to DOS, figuring the real value was in the hardware, not the software."
  },
  {
    year: "1990",
    title: "Windows 3.x",
    shortDesc: "Graphical Shell on top of DOS",
    uiStyle: "bg-[#008080] border-slate-200 text-black p-2 font-sans",
    screenText: "C:\\> win\n\n[Loading Program Manager...]",
    details: "As the IBM PC took off, it faced competition from Apple’s Macintosh, which relied on a user-friendly GUI. Recognizing the danger, Microsoft developed 'Windows' as a graphical shell riding on top of DOS. Users booted into the text line and typed 'win' to launch the graphical interface. The early versions of Windows - 3.0, 3.1, and 3.11, all were graphical interfaces running on top of the old DOS system."
  },
  {
    year: "1995",
    title: "Windows 9x",
    shortDesc: "Integrated DOS & Windows",
    uiStyle: "bg-[#000080] text-white p-2 font-sans",
    screenText: "Microsoft Windows 95\nStart Menu is booting...\nC:\\Windows>",
    details: "Even the Windows 9x line of operating systems – Windows 95, 98, and Millennium Edition (Me) – ran on top of DOS. While they booted directly into a graphical user interface and felt like unified systems, the MS-DOS subsystem was still running underneath, acting as the foundation for the operating system's system calls."
  },
  {
    year: "1993",
    title: "Windows NT",
    shortDesc: "A Truly Graphical OS Core",
    uiStyle: "bg-[#333333] text-[#00e5ff] p-2 font-mono",
    screenText: "Windows NT Workstation 3.1\nKernel initialization success.",
    details: "Microsoft created a 32-bit version of Windows called Windows NT ('New Technology') to compete with IBM’s OS/2. Unlike the Windows 9x line, NT was a truly graphical operating system—the GUI did not run on top of DOS. It was engineered from scratch to be secure, stable, and independent of the old DOS architecture."
  },
  {
    year: "2001",
    title: "Windows XP",
    shortDesc: "The Death of DOS, Birth of CMD",
    uiStyle: "bg-[#0054e3] text-white p-2 font-sans",
    screenText: "C:\\Windows\\System32\\cmd.exe\n\nMicrosoft Windows XP [Version 5.1.2600]",
    details: "With the release of Windows XP in 2001, Microsoft's consumer-based line of operating systems merged with the NT line (Windows XP was technically Windows NT 5.1), and the days of DOS had come to an end. However, Windows XP still kept the command-line interface in the form of the Command Prompt application (CMD.EXE) so users could run old commands."
  },
  {
    year: "Modern",
    title: "Windows 11",
    shortDesc: "Modern NT with CMD Preserved",
    uiStyle: "bg-[#1c1c1c] text-[#dfdfdf] p-3 font-mono rounded-lg border border-[#2d2d2d]",
    screenText: "C:\\Users\\Student>ver\n\nMicrosoft Windows [Version 10.0.22621]",
    details: "Windows Vista, Windows 7, 8, 10, and Windows 11 followed suit, as did Microsoft's line of server operating systems. While DOS is history, thanks to the Command Prompt application, you can still use the old DOS commands on a modern Windows system to automate developer pipelines and configure network interfaces."
  }
];

export default function WindowsHistoryTimeline() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeEvent = TIMELINE_DATA[selectedIdx];

  return (
    <div className="my-8 rounded-2xl border border-blue-500/10 dark:border-slate-800 bg-[#090f1e]/40 shadow-xl overflow-hidden select-none">
      
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-800 bg-[#090f1e]/75">
        <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 bg-blue-500/10 px-2.5 py-1 rounded-full select-none mb-3 inline-block">
          Historical Roadmap
        </span>
        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">
          The Evolution of Windows &amp; MS-DOS
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
          Click through the timeline milestones below to discover how Microsoft transitioned from a command line system (MS-DOS) to the modern NT architecture (Windows 11).
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="p-4 bg-slate-950/70 border-b border-slate-900 overflow-x-auto flex md:justify-between items-center gap-4 scrollbar-thin">
        {TIMELINE_DATA.map((event, idx) => (
          <button
            key={event.year}
            onClick={() => setSelectedIdx(idx)}
            className={`flex flex-col items-center gap-1 min-w-[90px] py-2 px-3 rounded-xl transition-all cursor-pointer ${
              selectedIdx === idx
                ? "bg-blue-600/25 border border-blue-500/30 text-white scale-105"
                : "border border-transparent text-slate-550 hover:text-slate-300"
            }`}
          >
            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${selectedIdx === idx ? "bg-blue-500 text-white" : "bg-slate-900 text-slate-450"}`}>
              {event.year}
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider text-center">{event.title}</span>
          </button>
        ))}
      </div>

      {/* Main Details Area */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#070b13]">
        
        {/* Left Column: Simulated Screen of the Era */}
        <div className="flex flex-col justify-between border border-slate-800/80 bg-slate-950 rounded-2xl p-4 shadow-inner min-h-[220px]">
          <div>
            <div className="flex items-center gap-2 mb-4 select-none pb-2 border-b border-slate-900">
              <Monitor size={14} className="text-slate-500" />
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                Simulated Screen ({activeEvent.year})
              </span>
            </div>
            <pre className={`p-4 rounded-xl min-h-[120px] text-xs font-mono whitespace-pre-wrap select-text border border-slate-900 ${activeEvent.uiStyle}`}>
              {activeEvent.screenText}
            </pre>
          </div>
          <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-slate-650 uppercase font-black tracking-widest select-none">
            <span>Interface Mode: {activeEvent.year === "1981" ? "CLI Only" : "GUI / CLI hybrid"}</span>
            <span>Subsystem: {activeEvent.year === "1993" || activeEvent.year === "2001" || activeEvent.year === "Modern" ? "Windows NT" : "MS-DOS"}</span>
          </div>
        </div>

        {/* Right Column: Historical Narrative Text */}
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
              <History size={15} className="text-blue-400" />
              <span>{activeEvent.title}</span>
            </h4>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              {activeEvent.shortDesc}
            </span>
            <p className="text-xs text-slate-350 leading-relaxed font-medium">
              {activeEvent.details}
            </p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-500">
            <span>Milestone {selectedIdx + 1} of 6</span>
            {selectedIdx < TIMELINE_DATA.length - 1 && (
              <button 
                onClick={() => setSelectedIdx(prev => prev + 1)}
                className="text-blue-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Next Era</span>
                <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
