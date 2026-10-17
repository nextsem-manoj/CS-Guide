/**
 * ═════════════════════════════════════════════════════════════════════════════
 * NextSem Workspace & Multi-Repository Manager
 * Author: Er. Manoj Kumar
 *
 * Capabilities:
 *   1. Auto-Clone: Automatically clones all configured repositories whenever needed.
 *   2. Repo Status: Typing "status <repo>" displays live git metrics, active roadmap,
 *      and the immediate next implementation step.
 *   3. Dynamic Registry: Add/manage repositories via repos.json or CLI.
 *
 * Usage:
 *   node scripts/repo-manager.js status <repo-name>
 *   node scripts/repo-manager.js clone [repo-name]
 *   node scripts/repo-manager.js add <repo-id> <git-url> [dir-name]
 *   node scripts/repo-manager.js list
 *   status <repo-name>       (via status.cmd / status.ps1)
 *   repo clone               (via repo.cmd / repo.ps1)
 * ═════════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Rich ANSI Terminal Styling
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
  emerald: '\x1b[38;5;35m',
  gold: '\x1b[38;5;220m',
  sky: '\x1b[38;5;39m',
  gray: '\x1b[38;5;244m',
};

const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_FILE = path.join(ROOT_DIR, 'repos.json');

// Load repository configuration
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(`${C.red}✖ Missing configuration file: ${CONFIG_FILE}${C.reset}`);
    process.exit(1);
  }
  try {
    let raw = fs.readFileSync(CONFIG_FILE, 'utf8');
    if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
    return JSON.parse(raw);
  } catch (err) {
    console.error(`${C.red}✖ Failed to parse repos.json: ${err.message}${C.reset}`);
    process.exit(1);
  }
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
}

function printHeader() {
  console.log(`\n${C.emerald}${C.bold}╔════════════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.emerald}${C.bold}║       🚀 NEXTSEM ACADEMY — MULTI-REPOSITORY & WORKSPACE MANAGER                ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}║       Universal Auto-Clone & Next-Step Repository Inspector                    ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}║       Author & Lead: Er. Manoj Kumar                                           ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}╚════════════════════════════════════════════════════════════════════════════════╝${C.reset}\n`);
}

function resolveRepoPath(repoConfig, config) {
  // If absolute path or relative to parent directory
  const parentBase = path.resolve(ROOT_DIR, config.defaultParentDir || '..');
  return path.resolve(parentBase, repoConfig.dir || repoConfig.id);
}

function runGit(cmd, cwd) {
  try {
    return execSync(`git ${cmd}`, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch (_) {
    return null;
  }
}

function getGitMetrics(repoDir) {
  if (!fs.existsSync(repoDir) || !fs.existsSync(path.join(repoDir, '.git'))) {
    return { cloned: false };
  }

  const branch = runGit('rev-parse --abbrev-ref HEAD', repoDir) || 'unknown';
  const remoteUrl = runGit('config --get remote.origin.url', repoDir) || 'none';
  const statusSummary = runGit('status --porcelain', repoDir);
  const dirty = Boolean(statusSummary && statusSummary.length > 0);
  const uncommittedCount = dirty ? statusSummary.split('\n').filter(Boolean).length : 0;
  const lastCommit = runGit('log -1 --format="%h - %s (%cr)"', repoDir) || 'No commits yet';

  // Ahead / behind checks if remote tracking exists
  const upstream = runGit('rev-parse --abbrev-ref --symbolic-full-name @{u}', repoDir);
  let syncStatus = 'synced';
  if (upstream) {
    const ahead = runGit(`rev-list --count ${upstream}..HEAD`, repoDir) || '0';
    const behind = runGit(`rev-list --count HEAD..${upstream}`, repoDir) || '0';
    if (parseInt(ahead, 10) > 0 && parseInt(behind, 10) > 0) {
      syncStatus = `diverged (↑${ahead} ↓${behind})`;
    } else if (parseInt(ahead, 10) > 0) {
      syncStatus = `ahead by ${ahead} commit(s) (needs push)`;
    } else if (parseInt(behind, 10) > 0) {
      syncStatus = `behind by ${behind} commit(s) (needs pull)`;
    }
  }

  return {
    cloned: true,
    branch,
    remoteUrl,
    dirty,
    uncommittedCount,
    lastCommit,
    syncStatus,
  };
}

/**
 * Auto-clone registered repositories
 */
function autoCloneAll(config, targetRepoId = null) {
  printHeader();
  console.log(`${C.cyan}${C.bold}🔄 CHECKING & AUTO-CLONING REPOSITORIES...${C.reset}\n`);

  const repos = targetRepoId
    ? config.repositories.filter(r => matchesRepo(r, targetRepoId))
    : config.repositories;

  if (targetRepoId && repos.length === 0) {
    console.log(`${C.red}✖ Repository "${targetRepoId}" not found in repos.json.${C.reset}`);
    return;
  }

  let clonedCount = 0;
  let existingCount = 0;

  for (const repo of repos) {
    const repoPath = resolveRepoPath(repo, config);
    console.log(`${C.bold}📦 Repository:${C.reset} ${C.gold}${repo.name}${C.reset} (${C.sky}${repo.id}${C.reset})`);
    console.log(`   Path: ${C.dim}${repoPath}${C.reset}`);
    console.log(`   Remote: ${C.dim}${repo.url}${C.reset}`);

    if (fs.existsSync(repoPath) && fs.existsSync(path.join(repoPath, '.git'))) {
      console.log(`   ${C.green}✔ Already Cloned & Ready.${C.reset}`);
      const git = getGitMetrics(repoPath);
      console.log(`   Branch: ${C.bold}${git.branch}${C.reset} | Sync: ${git.syncStatus} | Changes: ${git.dirty ? `${C.yellow}${git.uncommittedCount} uncommitted${C.reset}` : `${C.green}clean${C.reset}`}\n`);
      existingCount++;
    } else {
      console.log(`   ${C.yellow}⏳ Not found locally. Starting auto-clone from GitHub...${C.reset}`);
      try {
        const parentDir = path.dirname(repoPath);
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
        execSync(`git clone ${repo.url} "${repoPath}"`, { stdio: 'inherit' });
        console.log(`   ${C.green}${C.bold}✔ Successfully cloned into ${repoPath}!${C.reset}\n`);
        clonedCount++;
      } catch (err) {
        console.log(`   ${C.red}✖ Failed to clone ${repo.id}: ${err.message}${C.reset}\n`);
      }
    }
  }

  console.log(`${C.emerald}${C.bold}════════════════════════════════════════════════════════════════════════════════${C.reset}`);
  console.log(`Result: ${C.green}${existingCount} already present${C.reset}, ${C.gold}${clonedCount} newly cloned${C.reset}.`);
  console.log(`${C.emerald}════════════════════════════════════════════════════════════════════════════════${C.reset}\n`);
}

/**
 * Match a user-supplied repository name against registry IDs or aliases
 */
function matchesRepo(repo, query) {
  if (!query) return false;
  const q = query.trim().toLowerCase();
  if (repo.id.toLowerCase() === q) return true;
  if (repo.dir && repo.dir.toLowerCase() === q) return true;
  if (repo.aliases && repo.aliases.some(a => a.toLowerCase() === q)) return true;
  return false;
}

/**
 * Extract Status and Next Step for Nextsem Online Ecosystem Hub
 */
function inspectNextsemOnline(repoPath) {
  return {
    milestone: 'Flagship NextSem Academy Web & Mobile Portal',
    nextStep: 'Maintain Google AdSense/AdMob monetization compliance & Flutter mobile production builds.',
    extraMetrics: [
      'Architecture: Next.js 16 (Port 3000) + Flutter Mobile App (mobile/)',
      'Curriculum Tracks: Windows CMD CLI Track + HTML5 Visual Developer Suite',
      'Gamification & Monetization: Hearts, Streaks, AdSense (Web) & AdMob (Mobile)',
      'Production Hosting: Firebase (bca-nextsem.web.app) & Domain nextsem.online'
    ]
  };
}

/**
 * Extract Status and Next Step for CS-Guide
 */
function inspectCsGuide(repoPath) {
  const dataFile = path.join(repoPath, 'src', 'data', 'bcaPracticalData.ts');
  const roadmapFile = path.join(repoPath, 'docs', 'roadmap', 'task.md');

  let totalDays = 0;
  let taskCount = 0;
  let vivaCount = 0;
  let currentMilestone = 'Phase 1 (Days 1–30 Complete & Verified ✅)';
  let nextStep = 'Step 4: Author & integrate Days 31–40 of Semester 1 in src/data/bcaPracticalData.ts';

  if (fs.existsSync(dataFile)) {
    const content = fs.readFileSync(dataFile, 'utf8');
    const dayMatches = content.match(/day:\s*(\d+)/g) || [];
    const days = dayMatches.map(m => parseInt(m.replace(/\D/g, ''), 10));
    totalDays = Array.from(new Set(days)).length;
    taskCount = (content.match(/validatorRegex/g) || []).length;
    vivaCount = (content.match(/vivaCheck/g) || []).length;
  }

  if (fs.existsSync(roadmapFile)) {
    const content = fs.readFileSync(roadmapFile, 'utf8');
    const m = content.match(/Current Milestone.*?:(.*?)\n/i);
    const n = content.match(/👉\s*\*\*([^\n]+)/i);
    if (m) currentMilestone = m[1].trim();
    if (n) nextStep = n[1].replace(/\*\*/g, '').trim();
  }

  return {
    milestone: currentMilestone,
    nextStep,
    extraMetrics: [
      `3-Year Scope: 360 Practical Days (Current: ${totalDays}/360 Days • Year 1 Sem 1)`,
      `Verified Coding Tasks: ${taskCount} with Regex Validators`,
      `Viva Voce Checkpoints: ${vivaCount} Technical Q&A blocks`,
      `Student Auth: Google Auth + Instant 0ms Hydration + Firestore Persistent Sync ✅`,
      `Local Endpoint: http://localhost:3001/`
    ]
  };
}

/**
 * Extract Status and Next Step for NCERT StudyGuide
 */
function inspectNcert(repoPath) {
  const roadmapFile = path.join(repoPath, 'docs', 'roadmap', 'task.md');
  const dataDir = path.join(repoPath, 'src', 'data');
  const interactiveDir = path.join(repoPath, 'src', 'components', 'interactive');

  let milestone = 'Phase 3 — Comprehensive Bilingual Question Banks & In-App Practice Studios';
  let nextStep = 'Expand Chapter-Specific Question Banks: Generate & embed bilingual MCQs, HOTS, and numerical studios under in-app chapter PDF (PdfReaderView.tsx).';
  let dataCount = 0;
  let interactiveCount = 0;

  if (fs.existsSync(dataDir)) {
    dataCount = fs.readdirSync(dataDir).length;
  }
  if (fs.existsSync(interactiveDir)) {
    interactiveCount = fs.readdirSync(interactiveDir).filter(f => f.endsWith('.tsx')).length;
  }

  if (fs.existsSync(roadmapFile)) {
    const content = fs.readFileSync(roadmapFile, 'utf8');
    const m = content.match(/\*\*Current Milestone\*\*:\s*([^\n]+)/i);
    const n = content.match(/👉\s*IMMEDIATE NEXT ACTION.*?:?\s*\n\s*([^\n]+)/i);
    if (m) milestone = m[1].replace(/\*\*/g, '').trim();
    if (n) nextStep = n[1].trim();
  }

  return {
    milestone,
    nextStep,
    extraMetrics: [
      `Curriculum Data Files: ${dataCount} files`,
      `Interactive TSX Suites: ${interactiveCount} suites`,
      `Classes Supported: Class 1 to Class 12 + NIOS Senior Secondary (Bilingual English/Hindi)`,
      `Live Endpoints: https://nextsem-ncert-2403.web.app/ & http://localhost:3002/`
    ]
  };
}

/**
 * Extract Status and Next Step for BCA Practical Exercises
 */
function inspectBca(repoPath) {
  let dayFolders = [];
  try {
    dayFolders = fs.readdirSync(repoPath).filter(f => f.startsWith('bca-day-'));
  } catch (_) {}

  return {
    milestone: `BCA Student Starter Coding Exercises (${dayFolders.length} Days Found: Day 01 to Day 07)`,
    nextStep: 'Commit & sync upcoming student practical starter packages for Days 8–30.',
    extraMetrics: [
      `Active Practical Folders: ${dayFolders.join(', ') || 'None'}`,
      `Index File: ${fs.existsSync(path.join(repoPath, 'index.html')) ? 'index.html present ✅' : 'Missing'}`
    ]
  };
}

/**
 * Generic status inspector for any newly added repo
 */
function inspectGeneric(repoPath) {
  const roadmapFile = path.join(repoPath, 'docs', 'roadmap', 'task.md');
  const readmeFile = path.join(repoPath, 'README.md');

  let milestone = 'Active Development';
  let nextStep = 'Inspect repository issues and continue active sprint.';

  if (fs.existsSync(roadmapFile)) {
    const content = fs.readFileSync(roadmapFile, 'utf8');
    const m = content.match(/Current Milestone.*?:(.*?)\n/i);
    const n = content.match(/👉\s*\*\*([^\n]+)/i);
    if (m) milestone = m[1].trim();
    if (n) nextStep = n[1].replace(/\*\*/g, '').trim();
  } else if (fs.existsSync(readmeFile)) {
    const content = fs.readFileSync(readmeFile, 'utf8');
    const firstHeader = content.match(/^#\s+(.+)$/m);
    if (firstHeader) milestone = firstHeader[1].trim();
  }

  return {
    milestone,
    nextStep,
    extraMetrics: [`Path: ${repoPath}`]
  };
}

/**
 * Display detailed status & next step for a single repository
 */
function showSingleRepoStatus(repo, config) {
  const repoPath = resolveRepoPath(repo, config);
  const git = getGitMetrics(repoPath);

  console.log(`\n${C.emerald}${C.bold}╔════════════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.emerald}${C.bold}║ 📌 REPOSITORY STATUS & NEXT STEP REPORT                                        ║${C.reset}`);
  console.log(`${C.emerald}${C.bold}╚════════════════════════════════════════════════════════════════════════════════╝${C.reset}\n`);

  console.log(`${C.bold}📦 Repository:${C.reset}  ${C.gold}${C.bold}${repo.name}${C.reset}`);
  console.log(`   ${C.white}Identifier:${C.reset}  ${C.sky}${repo.id}${C.reset}`);
  console.log(`   ${C.white}Local Path:${C.reset}  ${repoPath}`);
  console.log(`   ${C.white}Remote URL:${C.reset}  ${repo.url}\n`);

  if (!git.cloned) {
    console.log(`${C.red}✖ This repository is not cloned locally.${C.reset}`);
    console.log(`  Run ${C.bold}node scripts/repo-manager.js clone ${repo.id}${C.reset} or ${C.bold}repo clone${C.reset} to clone it automatically.\n`);
    return;
  }

  // Git health
  console.log(`${C.cyan}${C.bold}🌿 1. GIT REPOSITORY HEALTH${C.reset}`);
  console.log(`   • Branch:       ${C.bold}${git.branch}${C.reset}`);
  console.log(`   • Sync Status:  ${git.syncStatus === 'synced' ? `${C.green}Up to date with origin/${git.branch} ✅${C.reset}` : `${C.yellow}${git.syncStatus}${C.reset}`}`);
  console.log(`   • Working Tree: ${git.dirty ? `${C.yellow}⚠️  ${git.uncommittedCount} uncommitted changes${C.reset}` : `${C.green}Clean (No uncommitted changes) ✅${C.reset}`}`);
  console.log(`   • Last Commit:  ${C.dim}${git.lastCommit}${C.reset}\n`);

  // Domain Inspection
  let inspection;
  if (repo.id === 'nextsem.online' || repo.aliases?.includes('nextsem')) {
    inspection = inspectNextsemOnline(repoPath);
  } else if (repo.id === 'cs-guide' || repo.aliases?.includes('cs-guide')) {
    inspection = inspectCsGuide(repoPath);
  } else if (repo.id === 'ncert.nextsem.online' || repo.aliases?.includes('ncert')) {
    inspection = inspectNcert(repoPath);
  } else if (repo.id === 'bca' || repo.aliases?.includes('bca')) {
    inspection = inspectBca(repoPath);
  } else {
    inspection = inspectGeneric(repoPath);
  }

  console.log(`${C.cyan}${C.bold}🎯 2. CURRENT ACTIVE MILESTONE${C.reset}`);
  console.log(`   ${C.bold}${inspection.milestone}${C.reset}\n`);

  if (inspection.extraMetrics && inspection.extraMetrics.length > 0) {
    console.log(`${C.cyan}${C.bold}📊 3. REPOSITORY METRICS & HIGHLIGHTS${C.reset}`);
    inspection.extraMetrics.forEach(m => console.log(`   • ${m}`));
    console.log();
  }

  console.log(`${C.emerald}${C.bold}👉 4. IMMEDIATE NEXT IMPLEMENTATION STEP${C.reset}`);
  console.log(`   ${C.gold}${C.bold}${inspection.nextStep}${C.reset}`);
  console.log(`\n${C.emerald}════════════════════════════════════════════════════════════════════════════════${C.reset}\n`);
}

/**
 * Master multi-repo status dashboard
 */
function showMasterStatusDashboard(config) {
  printHeader();
  console.log(`${C.cyan}${C.bold}📋 ALL REGISTERED REPOSITORIES — STATUS & NEXT STEPS SUMMARY${C.reset}\n`);

  for (const repo of config.repositories) {
    const repoPath = resolveRepoPath(repo, config);
    const git = getGitMetrics(repoPath);

    let inspection;
    if (repo.id === 'nextsem.online' || repo.aliases?.includes('nextsem')) {
      inspection = inspectNextsemOnline(repoPath);
    } else if (repo.id === 'cs-guide' || repo.aliases?.includes('cs-guide')) {
      inspection = inspectCsGuide(repoPath);
    } else if (repo.id === 'ncert.nextsem.online' || repo.aliases?.includes('ncert')) {
      inspection = inspectNcert(repoPath);
    } else if (repo.id === 'bca' || repo.aliases?.includes('bca')) {
      inspection = inspectBca(repoPath);
    } else {
      inspection = inspectGeneric(repoPath);
    }

    const stateIcon = !git.cloned ? '🔴 Missing' : git.dirty ? '🟡 Modified' : '🟢 Clean';

    console.log(`${C.bold}┌─ 📦 ${C.gold}${repo.name}${C.reset} [${C.sky}${repo.id}${C.reset}] — ${stateIcon}`);
    if (git.cloned) {
      console.log(`${C.bold}│${C.reset}  🌿 Branch: ${git.branch} | Sync: ${git.syncStatus}`);
      console.log(`${C.bold}│${C.reset}  🎯 Milestone: ${inspection.milestone}`);
      console.log(`${C.bold}│${C.reset}  ${C.emerald}👉 Next Step:${C.reset} ${C.bold}${inspection.nextStep}${C.reset}`);
    } else {
      console.log(`${C.bold}│${C.reset}  ${C.red}Not cloned locally. Run "repo clone" to clone.${C.reset}`);
    }
    console.log(`${C.bold}└──${C.reset}\n`);
  }

  console.log(`${C.dim}Tip: Type ${C.bold}status <repo-name>${C.reset}${C.dim} (e.g. "status cs-guide", "status ncert", "status bca") for full deep dive.${C.reset}\n`);
}

/**
 * Add a new repository to repos.json
 */
function addNewRepo(config, id, url, dir = null) {
  if (!id || !url) {
    console.log(`${C.red}✖ Usage: repo add <repo-id> <git-url> [dir-name]${C.reset}`);
    return;
  }
  const existing = config.repositories.find(r => r.id.toLowerCase() === id.toLowerCase());
  if (existing) {
    console.log(`${C.yellow}⚠️ Repository "${id}" already exists in repos.json. Updating URL...${C.reset}`);
    existing.url = url;
    if (dir) existing.dir = dir;
  } else {
    config.repositories.push({
      id,
      name: id,
      url,
      dir: dir || id,
      aliases: [id]
    });
    console.log(`${C.green}✔ Added "${id}" to repos.json!${C.reset}`);
  }
  saveConfig(config);
  console.log(`Now run: ${C.bold}node scripts/repo-manager.js clone ${id}${C.reset} to clone it.`);
}

/**
 * List all configured repositories
 */
function listRepos(config) {
  printHeader();
  console.log(`${C.cyan}${C.bold}📂 REGISTERED REPOSITORIES (${config.repositories.length})${C.reset}\n`);
  config.repositories.forEach((r, idx) => {
    const repoPath = resolveRepoPath(r, config);
    const exists = fs.existsSync(repoPath);
    console.log(`${idx + 1}. ${C.gold}${C.bold}${r.name}${C.reset} (${C.sky}${r.id}${C.reset})`);
    console.log(`   URL:     ${r.url}`);
    console.log(`   Path:    ${repoPath} [${exists ? `${C.green}Cloned ✅${C.reset}` : `${C.red}Not Cloned ❌${C.reset}`}]`);
    console.log(`   Aliases: ${r.aliases ? r.aliases.join(', ') : 'none'}\n`);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI Command Dispatcher
// ─────────────────────────────────────────────────────────────────────────────
function main() {
  const config = loadConfig();
  const args = process.argv.slice(2);
  const command = (args[0] || '').toLowerCase();
  const target = args[1] || '';

  // 1. Direct status command: "node scripts/repo-manager.js status [repo]"
  if (command === 'status') {
    if (target && target.toLowerCase() !== 'all') {
      const match = config.repositories.find(r => matchesRepo(r, target));
      if (match) {
        showSingleRepoStatus(match, config);
      } else {
        console.log(`${C.red}✖ Repository "${target}" not found in repos.json.${C.reset}`);
        console.log(`Available repos: ${config.repositories.map(r => r.id).join(', ')}`);
      }
    } else {
      showMasterStatusDashboard(config);
    }
    return;
  }

  // 2. Clone command: "node scripts/repo-manager.js clone [repo]"
  if (command === 'clone') {
    autoCloneAll(config, target || null);
    return;
  }

  // 3. Add repo command: "node scripts/repo-manager.js add <id> <url> [dir]"
  if (command === 'add') {
    addNewRepo(config, args[1], args[2], args[3]);
    return;
  }

  // 4. List command: "node scripts/repo-manager.js list"
  if (command === 'list') {
    listRepos(config);
    return;
  }

  // 5. If first argument is directly a repository name (e.g. "node scripts/repo-manager.js cs-guide")
  if (command) {
    const match = config.repositories.find(r => matchesRepo(r, command));
    if (match) {
      showSingleRepoStatus(match, config);
      return;
    }
  }

  // 6. Default invocation (no args): Run clone-check & show master status
  autoCloneAll(config, null);
  showMasterStatusDashboard(config);
}

main();
