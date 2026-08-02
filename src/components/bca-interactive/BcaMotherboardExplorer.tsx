"use client";

import React, { useState } from 'react';
import { Cpu, Layers, HelpCircle, Power, ShieldAlert, Watch, Radio, Compass } from 'lucide-react';

interface MotherboardPart {
  id: string;
  title: string;
  desc: string;
  spec: string;
  role: string;
  icon: React.ReactNode;
  color: string;
}

const PARTS: Record<string, MotherboardPart> = {
  cpu: {
    id: "cpu",
    title: "CPU Socket & Processor",
    desc: "The socket houses the central processor chip. The CPU coordinates all system hardware, decodes code instructions, and runs calculations. Execution speed is measured in Gigahertz (GHz) or Millions of Instructions Per Second (MIPS).",
    spec: "Dual-contact pins, integrated Level 1/2/3 cache cache memory, support for parallel processing cores.",
    role: "Primary system brain. Interprets instructions and handles math logic loops.",
    icon: <Cpu size={20} />,
    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
  },
  ram: {
    id: "ram",
    title: "RAM Memory Slots",
    desc: "Provides high-speed volatile storage slots. The CPU reads and writes active code instructions and data arrays here dynamically. Under Von Neumann guidelines, program instructions and data share the same RAM blocks.",
    spec: "DIMM dual-channel architecture, read/write speeds measured in nanoseconds (volatile storage).",
    role: "Temporary workspace. Cleared instantly when power is lost.",
    icon: <Layers size={20} />,
    color: "text-blue-400 border-blue-500/20 bg-blue-500/5"
  },
  rom: {
    id: "rom",
    title: "ROM BIOS Chip",
    desc: "A non-volatile memory chip holding system firmware. It stores startup codes to run diagnostics (Power On Self Test) and locate bootable storage drives before handing control to the Operating System.",
    spec: "EEPROM storage, stores POST code, firmware can be updated but cannot be overwritten by normal user apps.",
    role: "Permanent system bootloader. Initializes hardware adapter drivers.",
    icon: <Compass size={20} />,
    color: "text-purple-400 border-purple-500/20 bg-purple-500/5"
  },
  psu: {
    id: "psu",
    title: "Power Supply Connector",
    desc: "Pins where power lines plug in. The power adapter converts utility grid Alternating Current (AC) into low-voltage Direct Current (DC) required by motherboard microchip circuits.",
    spec: "24-pin main ATX connector, delivers regulated +3.3V, +5V, and +12V DC power lines.",
    role: "System electrical adapter. Distributes clean voltage levels to chips.",
    icon: <Power size={20} />,
    color: "text-amber-400 border-amber-500/20 bg-amber-500/5"
  },
  clock: {
    id: "clock",
    title: "System Clock Crystal",
    desc: "A quartz crystal oscillator emitting electrical pulses at a constant frequency. It acts as the metronome of the computer, keeping all CPU calculations and bus cycles synchronized.",
    spec: "Quartz oscillator, clock rate measured in Megahertz (MHz) or Gigahertz (GHz).",
    role: "System metronome. Syncs instruction cycles across registers.",
    icon: <Watch size={20} />,
    color: "text-rose-400 border-rose-500/20 bg-rose-500/5"
  },
  bus: {
    id: "bus",
    title: "System Bus Pathways",
    desc: "The copper pathways linking the CPU to memory and controller chips. Divided into: 1) Data Bus (transfers values), 2) Address Bus (transfers cell indexes), and 3) Control Bus (transfers read/write operations).",
    spec: "64-bit parallel pathways. Unidirectional Address Bus; Bidirectional Data Bus.",
    role: "Internal highway system. Directs data and commands between blocks.",
    icon: <Radio size={20} />,
    color: "text-teal-400 border-teal-500/20 bg-teal-500/5"
  },
  pci: {
    id: "pci",
    title: "PCI Expansion Slots",
    desc: "Motherboard sockets enabling the insertion of expansion cards (such as high-performance graphics adapters, network adapter cards, or audio sound systems) to upgrade device functionalities.",
    spec: "PCI Express x16 lane slots, support for high-throughput expandability.",
    role: "System expandability. Lets users add power/ports over time.",
    icon: <ShieldAlert size={20} />,
    color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
  }
};

export default function BcaMotherboardExplorer() {
  const [selectedId, setSelectedId] = useState<string>("cpu");
  const currentPart = PARTS[selectedId];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          Click on any motherboard controller module on the left to inspect its role, specifications, and layout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Left Column: Parts Selector Grid */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {Object.values(PARTS).map((part) => {
            const isSelected = selectedId === part.id;
            return (
              <button
                key={part.id}
                onClick={() => setSelectedId(part.id)}
                className={`w-full p-4 rounded-2xl text-left border text-xs font-black transition-all duration-150 cursor-pointer flex items-center gap-3 ${
                  isSelected 
                    ? part.color + ' border-current scale-[0.98]'
                    : 'bg-[#121217] border-white/5 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-xl border ${isSelected ? 'bg-white/5 border-current' : 'bg-slate-900 border-white/5'}`}>
                  {part.icon}
                </div>
                <span>{part.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Spec Detail Screen */}
        <div className="md:col-span-3">
          <div className="bg-[#121217] border border-slate-850 rounded-[32px] p-6 shadow-2xl h-full flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] bg-indigo-500/5 pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 border-b border-slate-850 pb-4 mb-4">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                  {currentPart.icon}
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  {currentPart.title}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Functional Description</span>
                  <p className="text-slate-350 text-xs mt-1 leading-relaxed">
                    {currentPart.desc}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Motherboard Role</span>
                  <p className="text-slate-350 text-xs mt-1 leading-relaxed font-bold">
                    ★ {currentPart.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Spec sheet box */}
            <div className="mt-8 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex gap-3 items-start">
              <HelpCircle className="text-indigo-400 shrink-0 mt-0.5" size={16} />
              <div>
                <span className="text-[9px] text-indigo-300 font-black uppercase tracking-widest block">Technical Specifications</span>
                <p className="text-slate-450 text-[11px] mt-1 leading-relaxed font-mono">{currentPart.spec}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
