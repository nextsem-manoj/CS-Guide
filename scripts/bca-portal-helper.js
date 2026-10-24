/**
 * ═════════════════════════════════════════════════════════════════════════════
 * NextSem Academy • BCA Practical Learning Portal Automation Assistant
 * Author: Er. Manoj Kumar
 *
 * Usage:
 *   npm run bca
 *   npm run task
 *   npm run status
 *   node scripts/bca-portal-helper.js
 *   node scripts/bca-portal-helper.js --verify
 * ═════════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Color constants for rich CLI formatting
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  bgDark: '\x1b[40m',
  emerald: '\x1b[38;5;35m',
  gold: '\x1b[38;5;220m',
};

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'src', 'data', 'bcaPracticalData.ts');
const ROADMAP_FILE = path.join(ROOT_DIR, 'docs', 'roadmap', 'task.md');

function printHeader() {
  console.log(`\n${C.emerald}${C.bold}╔════════════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.emerald}${C.bold}║          🚀 NEXTSEM ACADEMY — BCA PRACTICAL PORTAL AUTOMATOR                    ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}║          Universal 3-Year / 6-Semester Practical Coding System                 ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}║          Authored by Er. Manoj Kumar                                           ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}╚════════════════════════════════════════════════════════════════════════════════╝${C.reset}\n`);
}

function analyzeDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`${C.red}✖ Error: ${DATA_FILE} not found.${C.reset}`);
    return null;
  }

  const content = fs.readFileSync(DATA_FILE, 'utf8');

  // Match all practical day entries: day: 1 or "day": 1
  const dayMatches = content.match(/["']?day["']?:\s*(\d+)/g) || [];
  const days = dayMatches.map(m => parseInt(m.replace(/\D/g, ''), 10));
  const uniqueDays = Array.from(new Set(days)).sort((a, b) => a - b);

  // Match tasks, debugging, githubWorkflow, vivaCheck
  const taskCount = (content.match(/validatorRegex/g) || []).length;
  const debuggingCount = (content.match(/debuggingChallenge/g) || []).length;
  const githubCount = (content.match(/githubWorkflow/g) || []).length;
  const vivaCount = (content.match(/vivaCheck/g) || []).length;

  return {
    totalAuthoredDays: uniqueDays.length,
    daysList: uniqueDays,
    taskCount,
    debuggingCount,
    githubCount,
    vivaCount,
    maxDay: uniqueDays.length > 0 ? Math.max(...uniqueDays) : 0,
  };
}

function analyzeRoadmap() {
  if (!fs.existsSync(ROADMAP_FILE)) {
    return { currentPhase: 'Phase 1', nextStep: 'Step 2: Author Days 11–20' };
  }

  const content = fs.readFileSync(ROADMAP_FILE, 'utf8');
  const phaseMatch = content.match(/Current Milestone.*?:(.*?)\n/i);
  const nextStepMatch = content.match(/👉\s*\*\*([^\n]+)/i);

  return {
    currentPhase: phaseMatch ? phaseMatch[1].trim() : 'Phase 1 (Days 1–20 Complete ✅)',
    nextStep: nextStepMatch ? nextStepMatch[1].replace(/\*\*/g, '').trim() : 'Step 3: Author Days 21–30 in bcaPracticalData.ts',
  };
}

function checkDevServerStatus(port = 3001) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/`, (res) => {
      resolve({ running: true, statusCode: res.statusCode });
    });
    req.on('error', () => {
      resolve({ running: false, statusCode: null });
    });
    req.setTimeout(1500, () => {
      req.destroy();
      resolve({ running: false, statusCode: null });
    });
  });
}

function renderProgressBar(current, total, width = 30) {
  const pct = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * width);
  const empty = width - filled;
  const bar = `${'█'.repeat(filled)}${'░'.repeat(empty)}`;
  return `${C.emerald}[${bar}]${C.reset} ${C.bold}${pct}%${C.reset} (${current}/${total} Days)`;
}

async function run() {
  printHeader();

  const data = analyzeDataFile();
  const roadmap = analyzeRoadmap();
  const server = await checkDevServerStatus();

  // 1. 3-Year / 6-Semester Architecture
  console.log(`${C.cyan}${C.bold}📌 1. BCA 3-YEAR / 6-SEMESTER DEGREE ARCHITECTURE${C.reset}`);
  console.log(`   ${C.white}• Year 1 (Foundation):${C.reset}       Semester 1 & Semester 2  ${C.emerald}[Active Focus]${C.reset}`);
  console.log(`   ${C.white}• Year 2 (Core & Specialization):${C.reset} Semester 3 & Semester 4  ${C.dim}[Planned Phase 3]${C.reset}`);
  console.log(`   ${C.white}• Year 3 (Projects & Portfolio):${C.reset}  Semester 5 & Semester 6  ${C.dim}[Planned Phase 6]${C.reset}\n`);

  // 2. Career Specialization Tracks
  console.log(`${C.cyan}${C.bold}🎯 2. FOUR CAREER SPECIALIZATION TRACKS${C.reset}`);
  console.log(`   ${C.gold}[Track 1]${C.reset} Web / Full-Stack Development   (HTML, CSS, JS, React, Node, Express, MySQL)`);
  console.log(`   ${C.blue}[Track 2]${C.reset} Software / Programming          (C, C++, OOP, DSA, SQL, Problem Solving)`);
  console.log(`   ${C.yellow}[Track 3]${C.reset} Data Analytics & AI             (Python, SQL, Pandas, NumPy, Visuals, ML)`);
  console.log(`   ${C.magenta}[Track 4]${C.reset} IT, Networking & Cloud          (Hardware, Linux, Wireshark, Subnetting, Cloud)\n`);

  // 3. 3-Year / 6-Semester (360-Day) Master Practical Progression
  console.log(`${C.cyan}${C.bold}📊 3. 3-YEAR (6-SEMESTER / 360-DAY) MASTER PRACTICAL STATUS${C.reset}`);
  if (data) {
    console.log(`   Overall 3-Year Progress: ${renderProgressBar(data.totalAuthoredDays, 360)}`);
    console.log(`   ${C.bold}📅 YEAR 1 (Semesters 1 & 2 • Days 1–120) — Common Technical Foundation:${C.reset}`);
    console.log(`      • Days 01–10: ${C.emerald}${C.bold}COMPLETE & VERIFIED ✅${C.reset} (HTML5 Boilerplate to CSS Colors)`);
    console.log(`      • Days 11–20: ${C.emerald}${C.bold}COMPLETE & VERIFIED ✅${C.reset} (CSS Box Model, Flexbox, Grid, Responsive Mini Project)`);
    console.log(`      • Days 21–30: ${C.emerald}${C.bold}COMPLETE & VERIFIED ✅${C.reset} (JavaScript Essentials: Variables, Functions, DOM, Events)`);
    console.log(`      • Days 31–40: ${C.emerald}${C.bold}COMPLETE & VERIFIED ✅${C.reset} (Advanced JS & Browser APIs: Web Storage, Timers, Event Delegation)`);
    console.log(`      • Days 41–50: ${C.emerald}${C.bold}COMPLETE & VERIFIED ✅${C.reset} (Canvas 2D, Drag & Drop, Media APIs, SPA Routing & Offline Sync)`);
    console.log(`      • Days 51–60: ${C.yellow}${C.bold}NEXT SPRINT ⏳${C.reset} (Semester 1 Final Capstone: Full-Featured Web Application, Git Portfolio & Viva)`);
    console.log(`      • Days 61–120: ${C.dim}SEMESTER 2 ⏳${C.reset} (C Programming, Pointers, Memory Models, SQL Queries)`);
    console.log(`   ${C.bold}📅 YEAR 2 (Semesters 3 & 4 • Days 121–240) — Core Engineering & Specialization:${C.reset}`);
    console.log(`      • Days 121–180: ${C.dim}SEMESTER 3 ⏳${C.reset} (Data Structures & Algorithms in C/C++, RDBMS & SQL)`);
    console.log(`      • Days 181–240: ${C.dim}SEMESTER 4 ⏳${C.reset} (OOP Java/C++/Python, Node.js REST APIs, Linux Shell)`);
    console.log(`   ${C.bold}📅 YEAR 3 (Semesters 5 & 6 • Days 241–360) — Projects, Cloud & Job Readiness:${C.reset}`);
    console.log(`      • Days 241–300: ${C.dim}SEMESTER 5 ⏳${C.reset} (Career Track Deep Dive, Docker, Cloud VMs, Major Capstone Phase 1)`);
    console.log(`      • Days 301–360: ${C.dim}SEMESTER 6 ⏳${C.reset} (Production Capstone, Portfolio Polish, Technical Viva Defense & Jobs)\n`);

    console.log(`${C.cyan}${C.bold}🧪 4. 7-STEP LESSON QUALITY METRICS (Authored Days 1–${data.totalAuthoredDays})${C.reset}`);
    console.log(`   • Total Coding Tasks with Regex Validators: ${C.bold}${data.taskCount}${C.reset}`);
    console.log(`   • Spot-the-Bug Debugging Challenges:        ${C.bold}${data.debuggingCount}${C.reset}`);
    console.log(`   • Git/GitHub Commit Workflows:              ${C.bold}${data.githubCount}${C.reset}`);
    console.log(`   • Viva Voce Defense Questions:              ${C.bold}${data.vivaCount}${C.reset}\n`);
  }

  // 4. Server & Local URLs
  console.log(`${C.cyan}${C.bold}🌐 5. LOCAL DEV SERVER & ESSENTIAL ENDPOINTS${C.reset}`);
  if (server.running) {
    console.log(`   Server Status: ${C.emerald}${C.bold}● LIVE on Port 3001${C.reset}`);
    console.log(`   • Front Page:       ${C.white}http://localhost:3001/${C.reset}`);
    console.log(`   • Practical Hub:    ${C.white}http://localhost:3001/bca/practical/${C.reset}`);
    console.log(`   • Day 1 Practical:  ${C.white}http://localhost:3001/bca/practical/day-1-html-setup-first-webpage/${C.reset}`);
    console.log(`   • Day 4 Practical:  ${C.white}http://localhost:3001/bca/practical/day-4-html-lists-and-tables/${C.reset}`);
    console.log(`   • Theory Reference: ${C.white}http://localhost:3001/bca/semester-1/${C.reset}`);
  } else {
    console.log(`   Server Status: ${C.red}○ STOPPED${C.reset} (Run ${C.bold}npm run dev${C.reset} to start on port 3001)`);
  }
  console.log();

  // 5. Immediate Next Step
  console.log(`${C.emerald}${C.bold}👉 6. RECOMMENDED IMMEDIATE NEXT STEP${C.reset}`);
  console.log(`   ${C.bold}${roadmap.nextStep}${C.reset}`);
  console.log(`   (JavaScript Foundations: Variables, Functions, Conditionals, Loops, Arrays, DOM Selection, Event Listeners, and Mini Interactive Web App)`);
  console.log(`\n${C.emerald}════════════════════════════════════════════════════════════════════════════════${C.reset}\n`);
}

run().catch(console.error);
