import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('public/algorithms-and-flowcharts-10-master-problems.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix Problem 8 Mermaid syntax error
const oldProblem8Mermaid = `flowchart TD
    Start([Start]) --> InArr[/Read N and Arr[0..N-1]/]
    InArr --> InKey[/Read target Key/]
    InKey --> Init[Initialize i = 0, Found = 0]
    Init --> LoopCond{i < N ?}
    
    LoopCond -- Yes --> MatchCond{Arr[i] == Key ?}
    MatchCond -- Yes --> SetFound[Found = 1]
    SetFound --> OutFound[/Print 'Key found at position i'/]
    OutFound --> EarlyExit[/⚡ Early Exit Break /] --> Stop([Stop])
    
    MatchCond -- No --> Inc[i = i + 1]
    Inc --> LoopCond
    
    LoopCond -- No --> ChkFound{Found == 0 ?}
    ChkFound -- Yes --> OutNotFound[/Print 'Key not present in array'/] --> Stop
    ChkFound -- No --> Stop`;

const fixedProblem8Mermaid = `flowchart TD
    Start([Start]) --> InArr[/"Read N and Array elements Arr[0..N-1]"/]
    InArr --> InKey[/"Read target Key to search"/]
    InKey --> Init["Initialize index i = 0, Found = 0"]
    Init --> LoopCond{"Is i < N ?"}
    
    LoopCond -- Yes --> MatchCond{"Does Arr[i] == Key ?"}
    MatchCond -- Yes --> SetFound["Set Found = 1"]
    SetFound --> OutFound[/"Print 'Key found at index i'"/]
    OutFound --> EarlyExit[/"⚡ Early Exit Break Loop"/]
    EarlyExit --> Stop([Stop])
    
    MatchCond -- No --> Inc["i = i + 1"]
    Inc --> LoopCond
    
    LoopCond -- No --> ChkFound{"Is Found == 0 ?"}
    ChkFound -- Yes --> OutNotFound[/"Print 'Key not present in array'"/]
    OutNotFound --> Stop
    ChkFound -- No --> Stop`;

if (html.includes(oldProblem8Mermaid)) {
  html = html.replace(oldProblem8Mermaid, fixedProblem8Mermaid);
  console.log('Fixed Problem 8 Mermaid syntax successfully in main file!');
} else {
  console.log('Problem 8 mermaid pattern not directly matched; checking substring replacement...');
  html = html.replace(/InArr\[\/Read N and Arr\[0\.\.N-1\]\/\]/g, 'InArr[/"Read N and Arr[0..N-1]"/]');
  html = html.replace(/Init\[Initialize i = 0, Found = 0\]/g, 'Init["Initialize index i = 0, Found = 0"]');
  html = html.replace(/LoopCond\{i < N \?\}/g, 'LoopCond{"Is i < N ?"}');
  html = html.replace(/MatchCond\{Arr\[i\] == Key \?\}/g, 'MatchCond{"Does Arr[i] == Key ?"}');
  html = html.replace(/SetFound\[Found = 1\]/g, 'SetFound["Set Found = 1"]');
  html = html.replace(/OutFound\[\/Print 'Key found at position i'\/\]/g, 'OutFound[/"Print \'Key found at position i\'"/]');
  html = html.replace(/EarlyExit\[\/⚡ Early Exit Break \/\] --> Stop\(\[Stop\]\)/g, 'EarlyExit[/"⚡ Early Exit Break Loop"/]\n    EarlyExit --> Stop([Stop])');
  html = html.replace(/ChkFound\{Found == 0 \?\}/g, 'ChkFound{"Is Found == 0 ?"}');
  html = html.replace(/OutNotFound\[\/Print 'Key not present in array'\/\]/g, 'OutNotFound[/"Print \'Key not present in array\'"/]');
}

// Fix Problem 6 unquoted operators & and > in Mermaid
html = html.replace(/Valid\{P>0 & R>0 & T>0 \?\}/g, 'Valid{"Is P > 0, R > 0, and T > 0 ?"}');
html = html.replace(/Bonus\{T > 5 \?\}/g, 'Bonus{"Is T > 5 ?"}');
html = html.replace(/Base\[EffectiveRate = R\]/g, 'Base["EffectiveRate = R"]');
html = html.replace(/Add\[EffectiveRate = R \+ 2\]/g, 'Add["EffectiveRate = R + 2"]');

// Also add ANSI Standard SVG for Problem 7 in the main HTML if not present
const problem7Svg = `
          <!-- Flowchart: ANSI Standard High-Resolution Vector Diagram -->
          <div>
            <h4 class="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Flowchart (ANSI Standard Visual SVG Diagram)</h4>
            <div class="bg-[#080b11] border border-slate-800 rounded-xl p-3 sm:p-6 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 980" class="w-full max-w-[660px] h-auto text-white select-none font-sans" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad-pill-7" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#04AA6D" />
                    <stop offset="100%" stop-color="#02734a" />
                  </linearGradient>
                  <linearGradient id="grad-card-7" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#141c2e" />
                    <stop offset="100%" stop-color="#0c1322" />
                  </linearGradient>
                  <linearGradient id="grad-cyan-7" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7" />
                    <stop offset="100%" stop-color="#0369a1" />
                  </linearGradient>
                  <filter id="glow-7" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#04AA6D" flood-opacity="0.35"/>
                  </filter>
                  <marker id="arr-7" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                    <polygon points="0 1, 8 4.5, 0 8" fill="#38bdf8" />
                  </marker>
                  <marker id="arr-green-7" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                    <polygon points="0 1, 8 4.5, 0 8" fill="#04AA6D" />
                  </marker>
                  <marker id="arr-red-7" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                    <polygon points="0 1, 8 4.5, 0 8" fill="#ef4444" />
                  </marker>
                </defs>

                <!-- START -->
                <rect x="290" y="20" width="180" height="46" rx="23" fill="url(#grad-pill-7)" stroke="#34d399" stroke-width="2" filter="url(#glow-7)" />
                <text x="380" y="49" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff" letter-spacing="1.5">START</text>

                <path d="M 380 66 L 380 95" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-7)" />

                <!-- INPUT a, b, c -->
                <polygon points="260,100 500,100 460,150 220,150" fill="url(#grad-cyan-7)" stroke="#38bdf8" stroke-width="2" />
                <text x="360" y="127" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">INPUT: Read a, b, c</text>
                <text x="360" y="142" text-anchor="middle" font-size="10" font-weight="600" fill="#bae6fd">Quadratic: ax² + bx + c = 0</text>

                <path d="M 360 150 L 360 185" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-7)" />

                <!-- CHECK a == 0 -->
                <polygon points="360,190 480,240 360,290 240,240" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
                <text x="360" y="236" text-anchor="middle" font-size="13" font-weight="800" fill="#fef3c7">Is a == 0 ?</text>
                <text x="360" y="252" text-anchor="middle" font-size="10" font-weight="600" fill="#fde68a">(Linear Degeneracy)</text>

                <!-- a == 0 YES -->
                <path d="M 480 240 L 590 240 L 590 290" stroke="#ef4444" stroke-width="2" marker-end="url(#arr-red-7)" />
                <text x="520" y="232" font-size="11" font-weight="800" fill="#fca5a5">YES</text>
                <polygon points="510,295 670,295 640,345 480,345" fill="#450a0a" stroke="#ef4444" stroke-width="1.5" />
                <text x="575" y="322" text-anchor="middle" font-size="11" font-weight="700" fill="#fecaca">Print 'Not Quadratic'</text>
                <path d="M 575 345 L 575 920 L 465 920" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arr-red-7)" />

                <!-- a == 0 NO -->
                <path d="M 360 290 L 360 335" stroke="#04AA6D" stroke-width="2.5" marker-end="url(#arr-green-7)" />
                <text x="372" y="312" font-size="11" font-weight="800" fill="#6ee7b7">NO</text>

                <!-- COMPUTE DISCRIMINANT D -->
                <rect x="230" y="340" width="260" height="55" rx="10" fill="url(#grad-card-7)" stroke="#38bdf8" stroke-width="2" />
                <text x="360" y="364" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">D = (b × b) - (4 × a × c)</text>
                <text x="360" y="382" text-anchor="middle" font-size="10" font-weight="600" fill="#94a3b8">Calculate Discriminant</text>

                <path d="M 360 395 L 360 435" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-7)" />

                <!-- CHECK D > 0 -->
                <polygon points="360,440 480,490 360,540 240,490" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
                <text x="360" y="486" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">Is D &gt; 0 ?</text>
                <text x="360" y="502" text-anchor="middle" font-size="10" font-weight="600" fill="#7dd3fc">(2 Real Distinct Roots)</text>

                <!-- D > 0 YES -->
                <path d="M 240 490 L 120 490 L 120 560" stroke="#04AA6D" stroke-width="2" marker-end="url(#arr-green-7)" />
                <text x="170" y="482" font-size="11" font-weight="800" fill="#6ee7b7">YES</text>

                <polygon points="40,565 200,565 170,635 10,635" fill="#064e3b" stroke="#10b981" stroke-width="2" />
                <text x="105" y="592" text-anchor="middle" font-size="11" font-weight="800" fill="#a7f3d0">root1 = (-b+√D)/(2a)</text>
                <text x="105" y="608" text-anchor="middle" font-size="11" font-weight="800" fill="#a7f3d0">root2 = (-b-√D)/(2a)</text>
                <text x="105" y="624" text-anchor="middle" font-size="9" font-weight="600" fill="#6ee7b7">Print Distinct Real Roots</text>
                <path d="M 105 635 L 105 920 L 295 920" stroke="#10b981" stroke-width="2" marker-end="url(#arr-green-7)" />

                <!-- D > 0 NO -->
                <path d="M 360 540 L 360 595" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-7)" />
                <text x="372" y="565" font-size="11" font-weight="800" fill="#94a3b8">NO</text>

                <!-- CHECK D == 0 -->
                <polygon points="360,600 480,650 360,700 240,650" fill="#1e293b" stroke="#c084fc" stroke-width="2" />
                <text x="360" y="646" text-anchor="middle" font-size="13" font-weight="800" fill="#f3e8ff">Is D == 0 ?</text>
                <text x="360" y="662" text-anchor="middle" font-size="10" font-weight="600" fill="#e9d5ff">(Equal Real Roots)</text>

                <!-- D == 0 YES -->
                <path d="M 480 650 L 590 650 L 590 720" stroke="#04AA6D" stroke-width="2" marker-end="url(#arr-green-7)" />
                <text x="520" y="642" font-size="11" font-weight="800" fill="#6ee7b7">YES</text>

                <polygon points="510,725 670,725 640,785 480,785" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
                <text x="575" y="752" text-anchor="middle" font-size="11" font-weight="800" fill="#c7d2fe">root = -b / (2a)</text>
                <text x="575" y="770" text-anchor="middle" font-size="9" font-weight="600" fill="#a5b4fc">Print Real &amp; Equal Roots</text>
                <path d="M 575 785 L 575 920 L 465 920" stroke="#818cf8" stroke-width="2" marker-end="url(#arr-7)" />

                <!-- D == 0 NO (Complex D < 0) -->
                <path d="M 360 700 L 360 745" stroke="#ec4899" stroke-width="2.5" marker-end="url(#arr-7)" />
                <text x="372" y="725" font-size="11" font-weight="800" fill="#f472b6">NO (D &lt; 0)</text>

                <polygon points="270,750 450,750 420,830 240,830" fill="#831843" stroke="#f43f5e" stroke-width="2" />
                <text x="345" y="775" text-anchor="middle" font-size="11" font-weight="800" fill="#ffe4e6">real = -b / (2a)</text>
                <text x="345" y="793" text-anchor="middle" font-size="11" font-weight="800" fill="#ffe4e6">imag = √(-D) / (2a)</text>
                <text x="345" y="812" text-anchor="middle" font-size="9" font-weight="600" fill="#fbcfe8">Print 'real ± imag · i'</text>

                <path d="M 345 830 L 345 895" stroke="#f43f5e" stroke-width="2.5" marker-end="url(#arr-7)" />

                <!-- STOP -->
                <rect x="290" y="900" width="180" height="46" rx="23" fill="url(#grad-pill-7)" stroke="#34d399" stroke-width="2" filter="url(#glow-7)" />
                <text x="380" y="929" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff" letter-spacing="1.5">STOP</text>
              </svg>
            </div>
          </div>
`;

if (!html.includes('viewBox="0 0 760 980"') && html.includes('id="solution-7"')) {
  // insert SVG after Mermaid diagram of Problem 7
  html = html.replace(/(<div class="mermaid">[\s\S]*?OutComp\[\/Print Complex Roots with i\/\] --> Stop[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>)/, `$1\n${problem7Svg}`);
  console.log('Inserted ANSI Standard SVG into Problem 7 in main file!');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Main HTML file updated successfully!');
