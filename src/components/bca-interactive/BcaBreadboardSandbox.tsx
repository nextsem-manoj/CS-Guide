"use client";

import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Radio, HelpCircle } from 'lucide-react';

interface Gate {
  name: string;
  desc: string;
  formula: string;
  calc: (a: boolean, b: boolean) => boolean;
  truthTable: { a: number; b: number; out: number }[];
}

const GATES: Record<string, Gate> = {
  AND: {
    name: "AND Gate",
    desc: "Outputs 1 (True) only if BOTH inputs are 1. Performs binary multiplication.",
    formula: "Y = A · B",
    calc: (a, b) => a && b,
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 1 }
    ]
  },
  OR: {
    name: "OR Gate",
    desc: "Outputs 1 if AT LEAST ONE input is 1. Performs binary logical addition.",
    formula: "Y = A + B",
    calc: (a, b) => a || b,
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 1 }
    ]
  },
  NOT: {
    name: "NOT Gate (Inverter)",
    desc: "Reverses the input value. Input 1 outputs 0; input 0 outputs 1. Note: NOT gate only takes Input A.",
    formula: "Y = A'",
    calc: (a) => !a,
    truthTable: [
      { a: 0, b: 0, out: 1 }, // b is ignored
      { a: 1, b: 0, out: 0 }
    ]
  },
  XOR: {
    name: "XOR Gate (Exclusive OR)",
    desc: "Outputs 1 if the inputs are DIFFERENT. Outputs 0 if the inputs are identical.",
    formula: "Y = A ⊕ B",
    calc: (a, b) => a !== b,
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 }
    ]
  },
  NAND: {
    name: "NAND Gate",
    desc: "Universal Gate. Outputs the inverted result of AND. Outputs 0 only if both inputs are 1.",
    formula: "Y = (A · B)'",
    calc: (a, b) => !(a && b),
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 }
    ]
  },
  NOR: {
    name: "NOR Gate",
    desc: "Universal Gate. Outputs the inverted result of OR. Outputs 1 only if both inputs are 0.",
    formula: "Y = (A + B)'",
    calc: (a, b) => !(a || b),
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 0 }
    ]
  }
};

export default function BcaBreadboardSandbox() {
  const [gateKey, setGateKey] = useState<string>("AND");
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  const activeGate = GATES[gateKey];
  const output = activeGate.calc(inputA, inputB);
  
  const intInputA = inputA ? 1 : 0;
  const intInputB = inputB ? 1 : 0;
  const intOutput = output ? 1 : 0;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-slate-400">Select Logic Gate:</span>
          <div className="flex gap-1.5 flex-wrap">
            {Object.keys(GATES).map(key => (
              <button
                key={key}
                onClick={() => setGateKey(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  gateKey === key 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-450 shadow-sm'
                    : 'bg-[#121217] border-white/5 text-slate-450 hover:border-slate-850 hover:text-slate-350'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left: Input Switches & Glowing LED */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="bg-[#121217] border border-slate-850 rounded-[28px] p-5 text-left flex flex-col gap-5 justify-center flex-1">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Input Switches</span>
            
            {/* Input A */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-white/5">
              <div>
                <span className="text-xs font-black text-white block">Input A</span>
                <span className="text-[8px] text-slate-500 font-bold block mt-0.5">Toggle high/low voltage</span>
              </div>
              <button
                onClick={() => setInputA(!inputA)}
                className={`text-emerald-450 cursor-pointer focus:outline-none transition-colors ${inputA ? 'text-emerald-400' : 'text-slate-600'}`}
              >
                {inputA ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
              </button>
            </div>

            {/* Input B (ignored for NOT) */}
            <div className={`flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-white/5 transition-all duration-300 ${
              gateKey === 'NOT' ? 'opacity-30 pointer-events-none' : ''
            }`}>
              <div>
                <span className="text-xs font-black text-white block">Input B</span>
                <span className="text-[8px] text-slate-500 font-bold block mt-0.5">
                  {gateKey === 'NOT' ? 'Ignored for NOT gate' : 'Toggle high/low voltage'}
                </span>
              </div>
              <button
                onClick={() => setInputB(!inputB)}
                className={`text-emerald-450 cursor-pointer focus:outline-none transition-colors ${inputB ? 'text-emerald-400' : 'text-slate-600'}`}
              >
                {inputB ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
              </button>
            </div>
          </div>

          {/* Virtual Output LED */}
          <div className="bg-[#121217] border border-slate-850 rounded-[28px] p-5 text-center flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] bg-indigo-500/5 pointer-events-none" />
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-4">Virtual LED output</span>
            
            {/* LED bulb */}
            <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center text-sm font-black transition-all duration-300 ${
              output 
                ? 'bg-emerald-500/10 border-emerald-400 text-emerald-350 shadow-[0_0_24px_rgba(16,185,129,0.35)] scale-105' 
                : 'bg-red-500/5 border-red-500/20 text-red-400/80 shadow-[0_0_12px_rgba(239,68,68,0.1)]'
            }`}>
              {intOutput}
            </div>

            <span className="text-[10px] text-slate-400 font-bold mt-4">
              State: {output ? <span className="text-emerald-400 font-black">HIGH (5V)</span> : <span className="text-red-400 font-bold">LOW (0V)</span>}
            </span>
          </div>
        </div>

        {/* Right: Gate Specs & Truth Table */}
        <div className="md:col-span-3 flex flex-col gap-4">
          
          {/* Gate details */}
          <div className="bg-[#121217] border border-slate-850 rounded-3xl p-5 text-left relative overflow-hidden flex items-start gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl mt-0.5 uppercase text-[9px] font-black tracking-wider shrink-0 select-none">
              {activeGate.formula}
            </div>
            <div>
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Active component logic</span>
              <h4 className="text-sm font-black text-white leading-tight mt-0.5">{activeGate.name}</h4>
              <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
                {activeGate.desc}
              </p>
            </div>
          </div>

          {/* Truth Table */}
          <div className="bg-[#121217] border border-slate-850 rounded-[28px] p-5 text-left">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-3">Gate Truth Table</span>
            
            <div className="overflow-hidden rounded-2xl border border-white/5 font-mono text-xs">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-white/5 font-bold text-slate-400 text-[10px]">
                    <th className="py-2.5">Input A</th>
                    {gateKey !== 'NOT' && <th className="py-2.5">Input B</th>}
                    <th className="py-2.5 text-white font-black">Output Y</th>
                  </tr>
                </thead>
                <tbody>
                  {activeGate.truthTable.map((row, index) => {
                    const isRowActive = 
                      row.a === intInputA && 
                      (gateKey === 'NOT' || row.b === intInputB);

                    return (
                      <tr 
                        key={index} 
                        className={`border-b border-white/5 transition-all leading-relaxed ${
                          isRowActive 
                            ? 'bg-emerald-500/10 text-emerald-300 font-bold border-l-2 border-l-emerald-500' 
                            : 'text-slate-500'
                        }`}
                      >
                        <td className="py-2.5">{row.a}</td>
                        {gateKey !== 'NOT' && <td className="py-2.5">{row.b}</td>}
                        <td className={`py-2.5 font-bold ${isRowActive ? 'text-emerald-400' : 'text-slate-550'}`}>{row.out}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
