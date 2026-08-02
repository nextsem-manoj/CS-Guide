"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface Step {
  name: string;
  desc: string;
  path: string; // ID of active path
  activeNodes: string[];
  state: {
    input: string;
    cu: string;
    alu: string;
    memory: string;
    output: string;
  };
}

interface Scenario {
  title: string;
  steps: Step[];
}

const SCENARIOS: Record<string, Scenario> = {
  addition: {
    title: "1. Addition Process (15 + 27)",
    steps: [
      {
        name: "1. Input numbers into memory",
        desc: "The numbers 15 and 27, plus the add command, are entered from the Input Unit and stored in RAM locations.",
        path: "path-in-mem",
        activeNodes: ["input", "memory"],
        state: { input: "15, 27, ADD", cu: "Waiting...", alu: "Idle", memory: "RAM[0]=15<br/>RAM[1]=27<br/>RAM[2]=ADD", output: "[OFFLINE]" }
      },
      {
        name: "2. Fetch Instruction to CU",
        desc: "The Control Unit (CU) fetches the instruction 'ADD' from RAM cell [2] to decode and prepare execution.",
        path: "path-mem-cu",
        activeNodes: ["memory", "cu"],
        state: { input: "15, 27, ADD", cu: "Fetch: ADD (from cell 2)", alu: "Idle", memory: "RAM[0]=15<br/>RAM[1]=27<br/>RAM[2]=ADD", output: "[OFFLINE]" }
      },
      {
        name: "3. Direct ALU operation",
        desc: "The CU directs the ALU to prepare for addition, and signals Memory to output the operands (15 and 27).",
        path: "path-cu-alu",
        activeNodes: ["cu", "alu"],
        state: { input: "15, 27, ADD", cu: "Decoded: Addition check", alu: "Preparing registers", memory: "RAM[0]=15<br/>RAM[1]=27<br/>RAM[2]=ADD", output: "[OFFLINE]" }
      },
      {
        name: "4. Load operands & Add in ALU",
        desc: "RAM feeds 15 and 27 into the ALU registers. The ALU arithmetic gates calculate: 15 + 27 = 42.",
        path: "path-mem-alu",
        activeNodes: ["memory", "alu"],
        state: { input: "15, 27, ADD", cu: "Active", alu: "Executing: 15 + 27 = 42", memory: "RAM[0]=15<br/>RAM[1]=27<br/>RAM[2]=ADD", output: "[OFFLINE]" }
      },
      {
        name: "5. Write result back to RAM",
        desc: "The calculated sum (42) is sent from the ALU accumulator register and stored back in Memory (RAM cell [3]).",
        path: "path-alu-mem",
        activeNodes: ["alu", "memory"],
        state: { input: "15, 27, ADD", cu: "Idle", alu: "Result sent", memory: "RAM[0]=15<br/>RAM[1]=27<br/>RAM[2]=ADD<br/>RAM[3]=42 (Result)", output: "[OFFLINE]" }
      },
      {
        name: "6. Send result to Output Monitor",
        desc: "The value 42 is read from RAM cell [3] and routed to the Output monitor to display: 'Result: 42'.",
        path: "path-mem-out",
        activeNodes: ["memory", "output"],
        state: { input: "15, 27, ADD", cu: "Idle", alu: "Idle", memory: "RAM[0]=15<br/>RAM[1]=27<br/>RAM[2]=ADD<br/>RAM[3]=42", output: "Result: 42" }
      }
    ]
  },
  save: {
    title: "2. Storing User Setting (Volume = 80%)",
    steps: [
      {
        name: "1. Input Configuration",
        desc: "The user adjusts the slider to set volume to 80%. This input config is sent via the Input Unit to Memory.",
        path: "path-in-mem",
        activeNodes: ["input", "memory"],
        state: { input: "VOL=80%, SAVE", cu: "Waiting...", alu: "Idle", memory: "RAM[0]=VOL 80%<br/>RAM[1]=SAVE", output: "[OFFLINE]" }
      },
      {
        name: "2. Fetch Instruction",
        desc: "The Control Unit (CU) fetches the instruction 'SAVE' from Memory to run the storage operation.",
        path: "path-mem-cu",
        activeNodes: ["memory", "cu"],
        state: { input: "VOL=80%, SAVE", cu: "Fetching: SAVE", alu: "Idle", memory: "RAM[0]=VOL 80%<br/>RAM[1]=SAVE", output: "[OFFLINE]" }
      },
      {
        name: "3. Direct Memory Save",
        desc: "The Control Unit sends control commands directing Memory to store the volume value (80%) in the system's persistent block.",
        path: "path-cu-alu",
        activeNodes: ["cu", "memory"],
        state: { input: "VOL=80%, SAVE", cu: "Writing to block...", alu: "Idle", memory: "RAM[0]=VOL 80%<br/>RAM[1]=SAVE<br/>SYSTEM[Vol]=80%", output: "[OFFLINE]" }
      },
      {
        name: "4. Display Success Message",
        desc: "The Memory Unit sends the success confirmation to the Output Unit to display: 'Volume set to 80%'.",
        path: "path-mem-out",
        activeNodes: ["memory", "output"],
        state: { input: "VOL=80%, SAVE", cu: "Idle", alu: "Idle", memory: "RAM[0]=VOL 80%<br/>RAM[1]=SAVE<br/>SYSTEM[Vol]=80%", output: "Volume set to 80%" }
      }
    ]
  },
  compare: {
    title: "3. Logical Comparison (Is Score >= 40?)",
    steps: [
      {
        name: "1. Input Score & Passing Mark",
        desc: "The score 89 and threshold 40, plus the logical comparison command, are sent from Input to Memory.",
        path: "path-in-mem",
        activeNodes: ["input", "memory"],
        state: { input: "89, 40, COMPARE", cu: "Waiting...", alu: "Idle", memory: "RAM[0]=89<br/>RAM[1]=40<br/>RAM[2]=COMPARE", output: "[OFFLINE]" }
      },
      {
        name: "2. Fetch Instruction",
        desc: "The Control Unit (CU) fetches the instruction 'COMPARE' from Memory to initiate logic processing.",
        path: "path-mem-cu",
        activeNodes: ["memory", "cu"],
        state: { input: "89, 40, COMPARE", cu: "Fetching: COMPARE", alu: "Idle", memory: "RAM[0]=89<br/>RAM[1]=40<br/>RAM[2]=COMPARE", output: "[OFFLINE]" }
      },
      {
        name: "3. Direct ALU Check",
        desc: "The Control Unit directs the ALU to prepare for logical comparison (Greater-Than-or-Equal-To test).",
        path: "path-cu-alu",
        activeNodes: ["cu", "alu"],
        state: { input: "89, 40, COMPARE", cu: "Decoded: logical cmp", alu: "Setting up GE check", memory: "RAM[0]=89<br/>RAM[1]=40<br/>RAM[2]=COMPARE", output: "[OFFLINE]" }
      },
      {
        name: "4. Logical Evaluation in ALU",
        desc: "Memory feeds 89 and 40 to the ALU. The ALU compares them: 'Is 89 >= 40?' -> Result: True (Pass).",
        path: "path-mem-alu",
        activeNodes: ["memory", "alu"],
        state: { input: "89, 40, COMPARE", cu: "Active", alu: "89 >= 40 = True", memory: "RAM[0]=89<br/>RAM[1]=40<br/>RAM[2]=COMPARE", output: "[OFFLINE]" }
      },
      {
        name: "5. Store Verdict",
        desc: "The ALU writes the comparison verdict (True / Pass) back to the Memory Unit (RAM cell 3).",
        path: "path-alu-mem",
        activeNodes: ["alu", "memory"],
        state: { input: "89, 40, COMPARE", cu: "Idle", alu: "Result written", memory: "RAM[0]=89<br/>RAM[1]=40<br/>RAM[2]=COMPARE<br/>RAM[3]=True (Pass)", output: "[OFFLINE]" }
      },
      {
        name: "6. Display Decision Output",
        desc: "The result (True / Pass) is loaded from Memory and displayed on the Output Monitor: 'Result: Pass'.",
        path: "path-mem-out",
        activeNodes: ["memory", "output"],
        state: { input: "89, 40, COMPARE", cu: "Idle", alu: "Idle", memory: "RAM[0]=89<br/>RAM[1]=40<br/>RAM[2]=COMPARE<br/>RAM[3]=True (Pass)", output: "Result: Pass" }
      }
    ]
  }
};

// Coordinate mapping of active paths for hardware-accelerated animated circles
const PATHS_MAP: Record<string, string> = {
  "path-in-mem": "M 75 160 L 140 160 L 140 90 L 397 90",
  "path-mem-cu": "M 397 80 L 235 80",
  "path-cu-alu": "M 235 80 L 235 200",
  "path-mem-alu": "M 397 100 L 330 100 L 330 190 L 235 190",
  "path-alu-mem": "M 235 210 L 320 210 L 320 120 L 397 120",
  "path-mem-out": "M 397 90 L 397 235"
};

export default function BcaComputerFunctioning() {
  const [scenarioKey, setScenarioKey] = useState<string>("addition");
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [infoComponent, setInfoComponent] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scenario = SCENARIOS[scenarioKey];
  const step = scenario.steps[stepIdx];

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScenarioKey(e.target.value);
    setStepIdx(0);
    setIsPlaying(false);
    setInfoComponent(null);
  };

  const handleNext = () => {
    if (stepIdx < scenario.steps.length - 1) {
      setStepIdx(stepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < scenario.steps.length - 1) {
            return prev + 1;
          } else {
            return 0; // loop back
          }
        });
      }, 3500);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, scenarioKey, scenario.steps.length]);

  const activePathD = PATHS_MAP[step.path];
  const isControlSignal = step.path === "path-cu-alu";
  const packetColor = isControlSignal ? "#8b5cf6" : "#10b981"; // Purple for control bus, Green for data bus

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-slate-400">Select Scenario:</span>
          <select 
            value={scenarioKey}
            onChange={handleScenarioChange}
            className="bg-[#0c0c14] border border-white/5 text-slate-200 text-xs px-3 py-1.5 rounded-xl outline-none focus:border-emerald-500 transition-all font-bold cursor-pointer"
          >
            <option value="addition">1. Addition Process (15 + 27)</option>
            <option value="save">2. Storing User Setting (Volume = 80%)</option>
            <option value="compare">3. Logical Comparison (Score &gt;= 40)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={stepIdx === 0}
            className="p-2 bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-850 text-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
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
                Auto Play
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={stepIdx === scenario.steps.length - 1}
            className="p-2 bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-850 text-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left 3 cols: Block Diagram SVG Container */}
        <div className="lg:col-span-3 flex flex-col items-center w-full">
          <div className="w-full max-w-[480px] aspect-[3/2] bg-[#09090e] border border-slate-850 rounded-[32px] relative shadow-inner select-none overflow-hidden p-0 flex items-center justify-center">
            <svg viewBox="0 0 480 320" className="w-full h-auto">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(255,255,255,0.15)"/>
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={packetColor}/>
                </marker>
              </defs>

              {/* Static background path lanes */}
              {Object.keys(PATHS_MAP).map(key => {
                const isActive = step.path === key;
                return (
                  <path
                    key={key}
                    d={PATHS_MAP[key]}
                    fill="none"
                    stroke={isActive ? packetColor : "rgba(255,255,255,0.06)"}
                    strokeWidth={isActive ? "2.5" : "2"}
                    strokeDasharray={key === "path-cu-alu" ? "4,4" : undefined}
                    markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                    className="transition-colors duration-300"
                  />
                );
              })}

              {/* Animated motion packet (rendered only when active) */}
              {activePathD && (
                <circle r="4.5" fill={packetColor} style={{ filter: `drop-shadow(0 0 4px ${packetColor})` }}>
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={activePathD} />
                </circle>
              )}

              {/* Node: Input Unit */}
              <g
                onClick={() => setInfoComponent('input')}
                className="cursor-pointer group"
              >
                <rect
                  x="20"
                  y="120"
                  width="110"
                  height="80"
                  rx="16"
                  fill={step.activeNodes.includes("input") ? "rgba(16, 185, 129, 0.08)" : "#121217"}
                  stroke={step.activeNodes.includes("input") ? "#10b981" : "rgba(255,255,255,0.05)"}
                  strokeWidth={step.activeNodes.includes("input") ? "2" : "1"}
                  className="transition-all duration-200 group-hover:stroke-slate-500"
                />
                <text x="75" y="156" textAnchor="middle" fill={step.activeNodes.includes("input") ? "#34d399" : "#94a3b8"} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  📥 Input Unit
                </text>
                <text x="75" y="174" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                  Keyboard, Disk
                </text>
              </g>

              {/* CPU Box Group */}
              <g>
                <rect
                  x="155"
                  y="30"
                  width="160"
                  height="250"
                  rx="24"
                  fill={step.activeNodes.includes("cu") || step.activeNodes.includes("alu") ? "rgba(99, 102, 241, 0.03)" : "rgba(15, 15, 21, 0.3)"}
                  stroke={step.activeNodes.includes("cu") || step.activeNodes.includes("alu") ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                  strokeWidth="1"
                />
                <text x="235" y="46" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="900" letterSpacing="0.8" fontFamily="sans-serif">
                  CPU (PROCESSOR)
                </text>

                {/* CU Node */}
                <g
                  onClick={() => setInfoComponent('cu')}
                  className="cursor-pointer group"
                >
                  <rect
                    x="170"
                    y="60"
                    width="130"
                    height="75"
                    rx="16"
                    fill={step.activeNodes.includes("cu") ? "rgba(99, 102, 241, 0.08)" : "#121217"}
                    stroke={step.activeNodes.includes("cu") ? "#818cf8" : "rgba(255,255,255,0.05)"}
                    strokeWidth={step.activeNodes.includes("cu") ? "2" : "1"}
                    className="transition-all duration-200 group-hover:stroke-slate-500"
                  />
                  <text x="235" y="96" textAnchor="middle" fill={step.activeNodes.includes("cu") ? "#a5b4fc" : "#94a3b8"} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    🎮 Control Unit
                  </text>
                  <text x="235" y="114" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                    Decodes & Directs
                  </text>
                </g>

                {/* ALU Node */}
                <g
                  onClick={() => setInfoComponent('alu')}
                  className="cursor-pointer group"
                >
                  <rect
                    x="170"
                    y="180"
                    width="130"
                    height="75"
                    rx="16"
                    fill={step.activeNodes.includes("alu") ? "rgba(99, 102, 241, 0.08)" : "#121217"}
                    stroke={step.activeNodes.includes("alu") ? "#818cf8" : "rgba(255,255,255,0.05)"}
                    strokeWidth={step.activeNodes.includes("alu") ? "2" : "1"}
                    className="transition-all duration-200 group-hover:stroke-slate-500"
                  />
                  <text x="235" y="216" textAnchor="middle" fill={step.activeNodes.includes("alu") ? "#a5b4fc" : "#94a3b8"} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    🧮 ALU Core
                  </text>
                  <text x="235" y="234" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                    Math & logic
                  </text>
                </g>
              </g>

              {/* Node: Memory Unit */}
              <g
                onClick={() => setInfoComponent('memory')}
                className="cursor-pointer group"
              >
                <rect
                  x="335"
                  y="40"
                  width="125"
                  height="100"
                  rx="16"
                  fill={step.activeNodes.includes("memory") ? "rgba(16, 185, 129, 0.08)" : "#121217"}
                  stroke={step.activeNodes.includes("memory") ? "#10b981" : "rgba(255,255,255,0.05)"}
                  strokeWidth={step.activeNodes.includes("memory") ? "2" : "1"}
                  className="transition-all duration-200 group-hover:stroke-slate-500"
                />
                <text x="397.5" y="60" textAnchor="middle" fill={step.activeNodes.includes("memory") ? "#34d399" : "#94a3b8"} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  🧠 Memory (RAM)
                </text>
                
                {/* Inner background container for memory lines */}
                <rect
                  x="343"
                  y="72"
                  width="109"
                  height="58"
                  rx="8"
                  fill="#08080c"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
                
                {/* Split memory string by <br/> and render as SVG texts */}
                {step.state.memory.split('<br/>').map((line, i) => (
                  <text
                    key={i}
                    x="349"
                    y={87 + i * 13}
                    fill={step.activeNodes.includes("memory") ? "#a7f3d0" : "#64748b"}
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {line}
                  </text>
                ))}
              </g>

              {/* Node: Output Unit */}
              <g
                onClick={() => setInfoComponent('output')}
                className="cursor-pointer group"
              >
                <rect
                  x="335"
                  y="185"
                  width="125"
                  height="100"
                  rx="16"
                  fill={step.activeNodes.includes("output") ? "rgba(16, 185, 129, 0.08)" : "#121217"}
                  stroke={step.activeNodes.includes("output") ? "#10b981" : "rgba(255,255,255,0.05)"}
                  strokeWidth={step.activeNodes.includes("output") ? "2" : "1"}
                  className="transition-all duration-200 group-hover:stroke-slate-500"
                />
                <text x="397.5" y="205" textAnchor="middle" fill={step.activeNodes.includes("output") ? "#34d399" : "#94a3b8"} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  🖥️ Output Unit
                </text>

                {/* Inner output screen */}
                <rect
                  x="343"
                  y="218"
                  width="109"
                  height="54"
                  rx="8"
                  fill={step.state.output === '[OFFLINE]' ? '#0c0c12' : '#000000'}
                  stroke={step.state.output === '[OFFLINE]' ? 'rgba(255,255,255,0.02)' : 'rgba(16, 185, 129, 0.1)'}
                  strokeWidth="1"
                />
                
                <text
                  x="397.5"
                  y="250"
                  textAnchor="middle"
                  fill={step.state.output === '[OFFLINE]' ? '#475569' : '#39FF14'}
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {step.state.output}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right 2 cols: Step Info & Table Logs */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Active Step Panel */}
          <div className="bg-[#121217] border border-slate-850 rounded-3xl p-5 text-left relative overflow-hidden">
            <span className="absolute top-4 right-4 text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
              Step {stepIdx + 1} of {scenario.steps.length}
            </span>
            
            <h4 className="text-sm font-black text-white pr-16 leading-tight">
              {step.name}
            </h4>
            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              {step.desc}
            </p>
          </div>

          {/* Component Quick Info panel */}
          {infoComponent && (
            <div className="bg-[#0b0c14] border border-indigo-500/10 rounded-3xl p-5 text-left animate-fadeInFast">
              <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Component Information</span>
              <h5 className="text-xs font-black text-white">
                {infoComponent === 'input' && "📥 Input Unit"}
                {infoComponent === 'cu' && "🎮 Control Unit (CU)"}
                {infoComponent === 'alu' && "🧮 Arithmetic Logic Unit (ALU)"}
                {infoComponent === 'memory' && "🧠 Memory Unit (RAM)"}
                {infoComponent === 'output' && "🖥️ Output Unit"}
              </h5>
              <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
                {infoComponent === 'input' && "Translates commands and data from the user/hardware interface into binary computer-readable signals."}
                {infoComponent === 'cu' && "Supervises and coordinates instruction cycles. It fetches data, decodes instructions, and controls signal pathways."}
                {infoComponent === 'alu' && "The mathematical core of the CPU. Executes math calculations (+, -, *, /) and logical checks (comparisons)."}
                {infoComponent === 'memory' && "Primary volatile storage. Holds active program code and memory values. Von Neumann features shared instruction/data storage."}
                {infoComponent === 'output' && "Translates processed binary values back into human-understandable visual characters or printing feeds."}
              </p>
            </div>
          )}

          {!infoComponent && (
            <div className="border border-white/5 border-dashed rounded-3xl p-5 flex flex-col justify-center items-center text-center gap-1.5 select-none min-h-[100px]">
              <HelpCircle className="text-slate-650" size={18} />
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Interactive Block Diagram</span>
              <p className="text-[10px] text-slate-600">Click on any operational block in the diagram to inspect its technical specifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
