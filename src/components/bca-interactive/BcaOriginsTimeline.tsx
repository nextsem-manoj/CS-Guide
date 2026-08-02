"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Clock } from 'lucide-react';

const TIMELINE_DATA = [
  { 
    year: "3000 B.C.", 
    device: "Abacus", 
    desc: "Developed in China, the abacus (counting frame) is considered the first computer. It consists of vertical wires holding beads divided by a horizontal bar into heaven (top) and earth (bottom) beads.", 
    fact: "Manipulating these beads by hand allows skilled operators to perform additions and subtractions as fast as a modern calculator!" 
  },
  { 
    year: "1617 A.D.", 
    device: "Napier's Bones", 
    desc: "John Napier invented logarithms and built a mechanical device made of eleven ivory rods (bones) side by side to perform multiplications and divisions.", 
    fact: "The rods were called 'bones' simply because they were carved from animal bone or ivory." 
  },
  { 
    year: "17th Cent.", 
    device: "Slide Rule", 
    desc: "Developed by E. Gunter, the slide rule is a device consisting of two sliding rulers marked with logarithmic scales used to multiply and divide rapidly.", 
    fact: "Slide rules were the primary calculation tools used by NASA engineers during the Apollo missions!" 
  },
  { 
    year: "1642 A.D.", 
    device: "Pascal's Calculator (Pascaline)", 
    desc: "Blaise Pascal, at age 19, built a mechanical calculator operated by dialing a series of wheels, gears, and cylinders to add and subtract numbers to help his father (a tax collector).", 
    fact: "It was one of the first real mechanical calculators ever built and used a carry-mechanism similar to an odometer." 
  },
  { 
    year: "1673 A.D.", 
    device: "Leibniz's Machine", 
    desc: "Gottfried Leibniz built a mechanical calculator (stepped reckoner) that could perform direct multiplication and division, in addition to addition and subtraction.", 
    fact: "It introduced the 'Leibniz wheel' (stepped cylinder) mechanism which was used in calculators for three centuries." 
  },
  { 
    year: "1822 A.D.", 
    device: "Difference Engine", 
    desc: "Charles Babbage started working on the Difference Engine, an automatic mechanical calculator designed to tabulate polynomial functions using finite differences.", 
    fact: "Charles Babbage is widely celebrated as the 'father of the computer' for these revolutionary automated engineering designs." 
  },
  { 
    year: "1830s A.D.", 
    device: "Analytical Engine", 
    desc: "Charles Babbage designed a general-purpose, programmable computer containing essential components of modern digital computers: a 'Store' (memory), a 'Mill' (CPU/processor), card readers (input), and printer (output).", 
    fact: "Though never fully built in his lifetime, its logical structure is the direct predecessor of modern computer architecture." 
  },
  { 
    year: "19th Cent.", 
    device: "Electrical Calculator", 
    desc: "Mechanical calculators evolved in the 19th century and eventually rotating parts were driven by electric motors, creating the fast electrical calculators.", 
    fact: "These calculators were widely used in businesses and shops up until the mid-20th century." 
  },
  { 
    year: "1960s A.D.", 
    device: "Electronic Calculator", 
    desc: "Bulky calculators built with vacuum tubes (electron tubes) were replaced by smaller electronic calculators built with transistors.", 
    fact: "Transistors made calculators pocket-sized, highly efficient, and affordable for the general public." 
  }
];

export default function BcaOriginsTimeline() {
  const [slide, setSlide] = useState(0);
  const total = TIMELINE_DATA.length;
  const current = TIMELINE_DATA[slide];

  const handleNext = () => {
    if (slide < total - 1) setSlide(slide + 1);
  };

  const handlePrev = () => {
    if (slide > 0) setSlide(slide - 1);
  };

  const progressPct = Math.round(((slide + 1) / total) * 100);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Slide counter & Progress bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-indigo-400 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider shrink-0">
          Slide {slide + 1} of {total}
        </span>
      </div>

      {/* Main Slide Card */}
      <div className="bg-[#121217] border border-slate-850 rounded-3xl p-6 min-h-[220px] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] bg-emerald-500/5 pointer-events-none" />

        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
              {current.device}
            </h3>
            <span className="flex items-center gap-1 text-xs font-black text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0 shadow-sm">
              <Clock size={12} />
              {current.year}
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {current.desc}
          </p>
        </div>

        {/* Fun Fact Section */}
        <div className="bg-indigo-950/20 border border-indigo-500/15 rounded-2xl p-4 flex gap-3 items-start mt-auto">
          <Lightbulb className="text-indigo-400 shrink-0 mt-0.5" size={16} />
          <div>
            <span className="text-[9px] text-indigo-300 font-black uppercase tracking-widest block">Did You Know?</span>
            <p className="text-slate-350 text-xs mt-1 leading-relaxed">{current.fact}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <button
          onClick={handlePrev}
          disabled={slide === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-850 text-xs font-black uppercase tracking-wider text-slate-300 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft size={14} />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={slide === total - 1}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 border border-emerald-500 disabled:opacity-40 hover:bg-emerald-550 text-xs font-black uppercase tracking-wider text-white rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/10"
        >
          Next
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
