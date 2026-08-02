"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

interface Instruction {
  op: string;
  arg: string;
  desc: string;
}

const PROGRAMS: Record<string, { title: string; code: Instruction[]; ramInit: Record<number, number> }> = {
  add: {
    title: "Addition Program (10 + 25 = 35)",
    code: [
      { op: "LOAD", arg: "05", desc: "Load data from RAM[05] (value 10) into ACC" },
      { op: "ADD",  arg: "06", desc: "Add data from RAM[06] (value 25) to ACC" },
      { op: "STORE",arg: "07", desc: "Store result from ACC into RAM[07]" },
      { op: "OUT",  arg: "",   desc: "Output accumulator value to Console" },
      { op: "HALT", arg: "",   desc: "Halt execution" }
    ],
    ramInit: {
      0: 100, // code representations
      1: 101,
      2: 102,
      3: 103,
      4: 104,
      5: 10,  // Variable A
      6: 25,  // Variable B
      7: 0    // Result
    }
  },
  multiply: {
    title: "Multiplication by addition (3 * 4 = 12)",
    code: [
      { op: "LOAD", arg: "05", desc: "Load running sum from RAM[05] (starts at 0)" },
      { op: "ADD",  arg: "06", desc: "Add multiplier value from RAM[06] (value 4) to ACC" },
      { op: "STORE",arg: "05", desc: "Store new total in RAM[05]" },
      { op: "LOAD", arg: "05", desc: "Load running sum to ACC again" },
      { op: "ADD",  arg: "06", desc: "Add 4 again" },
      { op: "STORE",arg: "05", desc: "Store new sum (8) in RAM[05]" },
      { op: "LOAD", arg: "05", desc: "Load sum to ACC" },
      { op: "ADD",  arg: "06", desc: "Add 4 final time" },
      { op: "STORE",arg: "05", desc: "Store final sum (12) in RAM[05]" },
      { op: "OUT",  arg: "",   desc: "Output accumulator value" },
      { op: "HALT", arg: "",   desc: "Halt" }
    ],
    ramInit: {
      0: 200, // code indicators
      5: 0,   // sum variable
      6: 4,   // multiplier constant
    }
  }
};

export default function BcaCpuSimulator() {
  const [progKey, setProgKey] = useState<string>("add");
  
  // CPU registers state
  const [pc, setPc] = useState<number>(0);
  const [acc, setAcc] = useState<number>(0);
  const [ir, setIr] = useState<string>("—");
  const [mar, setMar] = useState<string>("—");
  const [mbr, setMbr] = useState<string>("—");
  
  // Memory state (16 RAM cells)
  const [ram, setRam] = useState<number[]>(new Array(16).fill(0));
  
  // Simulator states
  const [cycleStep, setCycleStep] = useState<'fetch' | 'decode' | 'execute' | 'halted'>('fetch');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [cycleLog, setCycleLog] = useState<string>("Program loaded. Click 'Step' or 'Run' to begin execution.");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepCounter, setStepCounter] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const program = PROGRAMS[progKey];

  // Initialize simulator when program changes
  const initSimulator = (key: string) => {
    const selected = PROGRAMS[key];
    const initialRam = new Array(16).fill(0);
    Object.keys(selected.ramInit).forEach(cell => {
      const idx = parseInt(cell, 10);
      initialRam[idx] = selected.ramInit[idx];
    });
    setRam(initialRam);
    setPc(0);
    setAcc(0);
    setIr("—");
    setMar("—");
    setMbr("—");
    setCycleStep('fetch');
    setStepCounter(0);
    setConsoleLogs([]);
    setCycleLog("Program loaded. Click 'Step' or 'Run' to begin execution.");
    setIsPlaying(false);
  };

  useEffect(() => {
    initSimulator(progKey);
  }, [progKey]);

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgKey(e.target.value);
  };

  const executeHalt = () => {
    setCycleStep('halted');
    setCycleLog("HALT instruction reached. Execution completed successfully.");
    setConsoleLogs(prev => [...prev, "System Halted."]);
    setIsPlaying(false);
  };

  // Perform a single step of the CPU instruction cycle (Fetch -> Decode -> Execute)
  const handleStep = () => {
    if (cycleStep === 'halted') return;

    if (cycleStep === 'fetch') {
      // FETCH cycle
      if (pc >= program.code.length) {
        executeHalt();
        return;
      }

      setMar(`0${pc}`);
      const instr = program.code[pc];
      setMbr(`${instr.op} ${instr.arg}`);
      setIr(`${instr.op} ${instr.arg}`);
      
      setCycleLog(`[FETCH] Loaded instruction from Address [${pc}] into MBR and Instruction Register (IR). Program Counter (PC) incremented.`);
      setPc(prev => prev + 1);
      setCycleStep('decode');
      setStepCounter(prev => prev + 1);

    } else if (cycleStep === 'decode') {
      // DECODE cycle
      const currentInstr = program.code[pc - 1]; // pc is already incremented
      setCycleLog(`[DECODE] Control Unit decoded instruction: '${currentInstr.op}' command with operand argument '${currentInstr.arg}'.`);
      setCycleStep('execute');
      setStepCounter(prev => prev + 1);

    } else if (cycleStep === 'execute') {
      // EXECUTE cycle
      const currentInstr = program.code[pc - 1];
      const argVal = currentInstr.arg ? parseInt(currentInstr.arg, 10) : 0;
      
      let nextLog = "";

      switch (currentInstr.op) {
        case "LOAD":
          setMar(currentInstr.arg);
          const loadVal = ram[argVal];
          setMbr(String(loadVal));
          setAcc(loadVal);
          nextLog = `[EXECUTE] Loaded memory value ${loadVal} from RAM cell [${currentInstr.arg}] into Accumulator (ACC) register.`;
          break;
        case "ADD":
          setMar(currentInstr.arg);
          const addVal = ram[argVal];
          setMbr(String(addVal));
          setAcc(prev => prev + addVal);
          nextLog = `[EXECUTE] Retrieved value ${addVal} from RAM cell [${currentInstr.arg}] and added it to Accumulator. ACC value is now ${acc + addVal}.`;
          break;
        case "STORE":
          setMar(currentInstr.arg);
          setMbr(String(acc));
          setRam(prev => {
            const next = [...prev];
            next[argVal] = acc;
            return next;
          });
          nextLog = `[EXECUTE] Stored Accumulator value ${acc} into RAM memory cell [${currentInstr.arg}].`;
          break;
        case "OUT":
          setConsoleLogs(prev => [...prev, `ACC: ${acc}`]);
          nextLog = `[EXECUTE] Rendered Accumulator value ${acc} to console output monitor.`;
          break;
        case "HALT":
          executeHalt();
          return;
        default:
          nextLog = `[EXECUTE] Unknown operation command.`;
      }

      setCycleLog(nextLog);
      setCycleStep('fetch');
      setStepCounter(prev => prev + 1);
    }
  };

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (cycleStep === 'halted') {
          setIsPlaying(false);
        } else {
          handleStep();
        }
      }, 1500); // 1.5s per step
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, cycleStep, pc, acc, ram]);

  const handleTogglePlay = () => {
    if (cycleStep === 'halted') {
      initSimulator(progKey);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-slate-400">Select Program:</span>
          <select 
            value={progKey}
            onChange={handleProgramChange}
            className="bg-[#0c0c14] border border-white/5 text-slate-200 text-xs px-3 py-1.5 rounded-xl outline-none focus:border-emerald-500 transition-all font-bold cursor-pointer"
          >
            <option value="add">1. Addition Program (10 + 25)</option>
            <option value="multiply">2. Multiplication (3 * 4)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => initSimulator(progKey)}
            className="p-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-350 rounded-xl transition-all cursor-pointer"
            title="Reset Program"
          >
            <RotateCcw size={16} />
          </button>
          
          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                : 'bg-emerald-600 border-emerald-500 hover:bg-emerald-550 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={14} className="fill-amber-300" />
                Pause
              </>
            ) : (
              <>
                <Play size={14} className="fill-white" />
                Run Code
              </>
            )}
          </button>

          <button
            onClick={handleStep}
            disabled={cycleStep === 'halted' || isPlaying}
            className="flex items-center gap-1 px-3 py-2 bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-850 text-slate-300 rounded-xl transition-all cursor-pointer text-xs font-black uppercase"
          >
            Step
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left: Registers & Console Log */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-[#121217] border border-slate-850 rounded-[28px] p-5">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-3">CPU Register States</span>
            
            <div className="space-y-2.5 font-mono">
              {[
                { name: "Program Counter (PC)", val: `0${pc}`, desc: "Address of next instruction" },
                { name: "Instruction Register (IR)", val: ir, desc: "Current instruction decoding" },
                { name: "Memory Address Reg (MAR)", val: mar, desc: "Physical target address" },
                { name: "Memory Buffer Reg (MBR)", val: mbr, desc: "Holds read/write values" },
                { name: "Accumulator (ACC)", val: acc, desc: "Intermediate ALU calculations", highlight: true }
              ].map((reg) => (
                <div key={reg.name} className={`flex items-center justify-between p-2 rounded-xl border text-[11px] ${
                  reg.highlight 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-350 font-bold' 
                    : 'bg-slate-950/40 border-white/5 text-slate-450'
                }`}>
                  <div>
                    <span className="text-white block font-bold">{reg.name}</span>
                    <span className="text-[9px] text-slate-500 block leading-none mt-0.5">{reg.desc}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-black text-emerald-450 border border-white/5">{reg.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Console Output Monitor */}
          <div className="bg-[#121217] border border-slate-850 rounded-[28px] p-5 flex-1 flex flex-col justify-between min-h-[140px]">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-2">Display Console Monitor</span>
            
            <div className="flex-1 bg-black rounded-2xl p-3 border border-emerald-950/30 font-mono text-[10px] text-emerald-400 text-left overflow-y-auto leading-relaxed select-all">
              {consoleLogs.length === 0 ? (
                <span className="text-slate-700 font-bold">[OFFLINE] awaiting print signals...</span>
              ) : (
                consoleLogs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Memory RAM Grid */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Active cycle instruction log */}
          <div className="bg-[#121217] border border-slate-850 rounded-3xl p-5 text-left relative overflow-hidden flex items-start gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl mt-0.5 uppercase text-[9px] font-black tracking-wider shrink-0 select-none">
              {cycleStep}
            </div>
            <div>
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Cycle step status</span>
              <p className="text-slate-350 text-xs mt-1 leading-relaxed font-bold">
                {cycleLog}
              </p>
            </div>
          </div>

          <div className="bg-[#121217] border border-slate-850 rounded-[28px] p-5">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block mb-3">SRAM Memory Cells (RAM)</span>
            
            <div className="grid grid-cols-4 gap-3 font-mono text-[10px]">
              {ram.map((val, idx) => {
                const isPcTarget = pc === idx && cycleStep === 'fetch';
                const isMarTarget = mar !== "—" && parseInt(mar, 10) === idx && cycleStep === 'execute';
                const isCodeCell = idx < program.code.length;
                const instrText = isCodeCell ? `${program.code[idx].op} ${program.code[idx].arg}` : "";

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex flex-col justify-between min-h-[55px] transition-all ${
                      isPcTarget
                        ? 'bg-indigo-500/10 border-indigo-400 text-indigo-300 shadow-md shadow-indigo-500/5'
                        : isMarTarget
                          ? 'bg-emerald-500/10 border-emerald-450 text-emerald-350 shadow-md shadow-emerald-500/5'
                          : 'bg-slate-950/40 border-white/5 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[8px] font-black leading-none mb-1 select-none">
                      <span>ADDR {idx < 10 ? `0${idx}` : idx}</span>
                      {isPcTarget && <span className="text-indigo-400 uppercase text-[7px] font-bold">PC</span>}
                      {isMarTarget && <span className="text-emerald-400 uppercase text-[7px] font-bold">MAR</span>}
                    </div>
                    
                    <div className="text-right">
                      {isCodeCell ? (
                        <span className="text-slate-400 font-bold block overflow-hidden text-ellipsis whitespace-nowrap text-[8px] leading-tight select-text" title={instrText}>
                          {instrText}
                        </span>
                      ) : (
                        <span className="text-emerald-450 text-xs font-black block select-text">
                          {val}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
