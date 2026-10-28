import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csGuideRoot = path.resolve(__dirname, "..");
const bcaRepoPath = "c:\\Users\\Manoj\\Nextsem Repositories\\bca";

if (!fs.existsSync(bcaRepoPath)) {
  console.error("BCA repository directory not found at:", bcaRepoPath);
  process.exit(1);
}

// Read bcaPracticalData.ts and extract PRACTICAL_LESSONS
console.log("Reading practical lessons from bcaPracticalData.ts...");
const dataContent = fs.readFileSync(path.join(csGuideRoot, "src/data/bcaPracticalData.ts"), "utf-8");

const lessons = [];

for (let d = 1; d <= 30; d++) {
  const dayMarker = `day: ${d},`;
  const dayIdx = dataContent.indexOf(dayMarker);
  if (dayIdx === -1) continue;

  const nextDayMarker = `day: ${d + 1},`;
  const nextDayIdx = dataContent.indexOf(nextDayMarker, dayIdx);
  const chunk = nextDayIdx !== -1 ? dataContent.slice(dayIdx, nextDayIdx) : dataContent.slice(dayIdx);

  // Extract title
  const titleMatch = chunk.match(/title:\s*['"]([^'"]+)['"]/);
  const title = titleMatch ? titleMatch[1] : `Day ${d}`;

  // Extract category
  const catMatch = chunk.match(/category:\s*['"]([^'"]+)['"]/);
  const category = catMatch ? catMatch[1] : "BCA Practical";

  // Extract estimatedTime
  const timeMatch = chunk.match(/estimatedTime:\s*['"]([^'"]+)['"]/);
  const estimatedTime = timeMatch ? timeMatch[1] : "2 Hours Practical";

  // Extract assignment title
  const assignTitleMatch = chunk.match(/assignment:\s*\{[\s\S]*?title:\s*['"]([^'"]+)['"]/);
  const assignTitle = assignTitleMatch ? assignTitleMatch[1] : title;

  // Extract fileName
  const fileMatch = chunk.match(/fileName:\s*['"]([^'"]+)['"]/);
  const fileName = fileMatch ? fileMatch[1] : "index.html";

  // Extract solutionCode using regex
  let solutionCode = "";
  const solIdx = chunk.indexOf("solutionCode: `");
  if (solIdx !== -1) {
    const afterSol = chunk.slice(solIdx + 15);
    const endMatch = afterSol.match(/([\s\S]*?)`\s*\},/);
    if (endMatch) {
      solutionCode = endMatch[1];
    }
  }

  // Unescape \` and \${
  if (solutionCode) {
    solutionCode = solutionCode
      .replace(/\\`/g, "`")
      .replace(/\\\$\{/g, "${")
      .replace(/\\\\/g, "\\");
  }

  lessons.push({
    day: d,
    title,
    category,
    estimatedTime,
    assignTitle,
    fileName,
    solutionCode
  });
}

console.log(`Parsed ${lessons.length} lessons from bcaPracticalData.ts`);

// 1. Export each lesson to bca repository
let exportedCount = 0;
for (const lesson of lessons) {
  const dayStr = String(lesson.day).padStart(2, "0");
  const folderName = `bca-day-${dayStr}`;
  const folderPath = path.join(bcaRepoPath, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  if (lesson.solutionCode) {
    // Write index.html
    const indexPath = path.join(folderPath, "index.html");
    fs.writeFileSync(indexPath, lesson.solutionCode, "utf-8");

    // Write fileName if different from index.html
    if (lesson.fileName && lesson.fileName !== "index.html") {
      const assignFilePath = path.join(folderPath, lesson.fileName);
      fs.writeFileSync(assignFilePath, lesson.solutionCode, "utf-8");
    }
    exportedCount++;
  }
}

console.log(`Exported solution files for ${exportedCount} days into ${bcaRepoPath}`);

// 2. Generate updated modern index.html for the GitHub Pages portal
const sprint1Lessons = lessons.filter(l => l.day <= 10);
const sprint2Lessons = lessons.filter(l => l.day > 10 && l.day <= 20);
const sprint3Lessons = lessons.filter(l => l.day > 20 && l.day <= 30);

function renderLessonCards(items) {
  return items.map(l => {
    const dayStr = String(l.day).padStart(2, "0");
    const href = `./bca-day-${dayStr}/index.html`;
    return `      <!-- Day ${dayStr} -->
      <a href="${href}" class="card">
        <div>
          <div class="card-top">
            <span class="day-pill">Day ${dayStr}</span>
            <span class="status-pill">✔ Verified Solution</span>
          </div>
          <h3>${l.title}</h3>
          <p class="card-desc">${l.assignTitle}</p>
          <div class="card-meta">
            <span>${l.category}</span>
            <span>•</span>
            <span>${l.fileName}</span>
          </div>
        </div>
        <div class="card-btn">
          <span>Launch Project</span>
          <span>→</span>
        </div>
      </a>`;
  }).join("\n\n");
}

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Practical Coding Portfolio | NextSem Academy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #060c18;
      --card-bg: #0c1328;
      --card-hover: #111a36;
      --border: #1e293b;
      --blue: #2563eb;
      --blue-glow: #3b82f6;
      --emerald: #10b981;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      padding: 2.5rem 1.5rem 4rem;
      line-height: 1.6;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 2.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(37, 99, 235, 0.15);
      border: 1px solid rgba(37, 99, 235, 0.35);
      color: #60a5fa;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.25rem);
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ffffff 30%, #93c5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .bio {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 680px;
      margin: 0 auto 1.5rem;
    }
    .student-card {
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      padding: 0.85rem 1.75rem;
      border-radius: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }
    .student-card span {
      color: var(--text-muted);
    }
    .student-card strong {
      color: #ffffff;
      font-weight: 600;
    }
    .portal-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.4rem;
      background: var(--blue);
      color: #ffffff;
      text-decoration: none;
      font-weight: 800;
      font-size: 0.85rem;
      border-radius: 0.75rem;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
    }
    .portal-link-btn:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
    .sprint-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2.5rem 0 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .sprint-header h2 {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .sprint-header span {
      font-size: 0.8rem;
      color: #38bdf8;
      font-family: 'JetBrains Mono', monospace;
      background: rgba(56, 189, 248, 0.1);
      padding: 0.2rem 0.6rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1.25rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      color: inherit;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      background: var(--card-hover);
      border-color: var(--blue-glow);
      transform: translateY(-3px);
      box-shadow: 0 12px 30px -10px rgba(37, 99, 235, 0.35);
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
    }
    .day-pill {
      background: rgba(37, 99, 235, 0.2);
      color: #93c5fd;
      border: 1px solid rgba(37, 99, 235, 0.4);
      padding: 0.25rem 0.65rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
    }
    .status-pill {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.55rem;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #34d399;
    }
    .card h3 {
      font-size: 1.1rem;
      font-weight: 800;
      margin-bottom: 0.4rem;
      color: #ffffff;
      line-height: 1.35;
    }
    .card-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 1rem;
    }
    .card-btn {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 0.85rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      color: #60a5fa;
      font-size: 0.82rem;
      font-weight: 700;
    }
    .card:hover .card-btn {
      color: #ffffff;
    }
    footer {
      text-align: center;
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    footer a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 700;
    }
    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">🚀 BCA Practical Coding Portfolio (Days 1–30 Live)</div>
      <h1>Nextsem Academy BCA Practical Portfolio</h1>
      <p class="bio">
        Documenting full hands-on daily implementations across Semester 1: HTML5 semantics, modern CSS layout engines (Flexbox &amp; Grid), responsive media queries, and interactive JavaScript DOM applications.
      </p>

      <div class="student-card">
        <div><span>Author:</span> <strong>Er. Manoj Kumar</strong></div>
        <div><span>Degree:</span> <strong>BCA (Semester 1)</strong></div>
        <div><span>Status:</span> <strong>Days 1–30 Verified (100%)</strong></div>
        <div><span>Hosting:</span> <strong>GitHub Pages Live</strong></div>
      </div>

      <div>
        <a href="https://cs.nextsem.online/bca/practical/" target="_blank" class="portal-link-btn">
          <span>Explore NextSem BCA Practical Learning Portal</span>
          <span>→</span>
        </a>
      </div>
    </header>

    <!-- SPRINT 1 -->
    <div class="sprint-header">
      <h2><span>📁</span> Sprint 1: HTML5 &amp; CSS Foundations</h2>
      <span>Days 01–10 • 10 Projects</span>
    </div>
    <div class="grid">
${renderLessonCards(sprint1Lessons)}
    </div>

    <!-- SPRINT 2 -->
    <div class="sprint-header">
      <h2><span>🎨</span> Sprint 2: Modern CSS Layouts, Flexbox &amp; Grid</h2>
      <span>Days 11–20 • 10 Projects</span>
    </div>
    <div class="grid">
${renderLessonCards(sprint2Lessons)}
    </div>

    <!-- SPRINT 3 -->
    <div class="sprint-header">
      <h2><span>⚡</span> Sprint 3: JavaScript Core, DOM &amp; SGPA Capstone</h2>
      <span>Days 21–30 • 10 Projects</span>
    </div>
    <div class="grid">
${renderLessonCards(sprint3Lessons)}
    </div>

    <footer>
      <p>
        Curriculum and practical architecture followed via <a href="https://cs.nextsem.online/bca/practical/" target="_blank">NextSem Academy BCA Practical Portal</a> • Authored by <strong>Er. Manoj Kumar</strong>
      </p>
    </footer>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(bcaRepoPath, "index.html"), masterIndexHtml, "utf-8");
console.log(`Updated ${path.join(bcaRepoPath, "index.html")} with all 30 days!`);
