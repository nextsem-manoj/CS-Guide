import fs from 'fs';
import path from 'path';
import { getLockModalHtml, getLockJsScript } from './add_security_lock.mjs';

// 1. Update public/algorithms-and-flowcharts-10-master-problems.html
const masterHtmlPath = path.resolve('public/algorithms-and-flowcharts-10-master-problems.html');
let masterHtml = fs.readFileSync(masterHtmlPath, 'utf8');

if (!masterHtml.includes('id="security-lock-modal"')) {
  // Inject modal after <body>
  masterHtml = masterHtml.replace(
    /(<body[^>]*>)/i,
    `$1\n${getLockModalHtml()}\n<div id="protected-content" style="display: none;" class="w-full flex flex-col items-center">`
  );

  // Add Lock button in nav
  masterHtml = masterHtml.replace(
    /(<button onclick="window\.print\(\)"[^>]*>[\s\S]*?<\/button>)/,
    `<button onclick="lockPage()" class="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition flex items-center gap-1 cursor-pointer" title="Lock this page"><span>🔒</span> <span class="hidden sm:inline">Lock</span></button>\n        $1`
  );

  // Close protected content before </body> and inject lock script
  masterHtml = masterHtml.replace('</body>', `</div><!-- /protected-content -->\n${getLockJsScript()}\n</body>`);
  fs.writeFileSync(masterHtmlPath, masterHtml, 'utf8');
  console.log('Added Security Lock to master HTML page!');
}

// 2. Update directory hub public/algorithms-and-flowcharts/index.html
const hubPath = path.resolve('public/algorithms-and-flowcharts/index.html');
if (fs.existsSync(hubPath)) {
  let hubHtml = fs.readFileSync(hubPath, 'utf8');
  if (!hubHtml.includes('id="security-lock-modal"')) {
    hubHtml = hubHtml.replace(
      /(<body[^>]*>)/i,
      `$1\n${getLockModalHtml()}\n<div id="protected-content" style="display: none;" class="w-full flex flex-col items-center">`
    );
    hubHtml = hubHtml.replace(
      /(<a href="\/algorithms-and-flowcharts-10-master-problems\.html"[^>]*>[\s\S]*?<\/a>)/,
      `<button onclick="lockPage()" class="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition flex items-center gap-1 cursor-pointer" title="Lock this page"><span>🔒</span> <span class="hidden sm:inline">Lock</span></button>\n        $1`
    );
    hubHtml = hubHtml.replace('</body>', `</div><!-- /protected-content -->\n${getLockJsScript()}\n</body>`);
    fs.writeFileSync(hubPath, hubHtml, 'utf8');
    console.log('Added Security Lock to Directory Hub page!');
  }
}

// 3. Update all 10 dedicated standalone pages in public/algorithms-and-flowcharts/
const baseDir = path.resolve('public/algorithms-and-flowcharts');
const subDirs = fs.readdirSync(baseDir, { withFileTypes: true }).filter(d => d.isDirectory());

for (const dir of subDirs) {
  const pageFile = path.join(baseDir, dir.name, 'index.html');
  if (fs.existsSync(pageFile)) {
    let pageHtml = fs.readFileSync(pageFile, 'utf8');
    if (!pageHtml.includes('id="security-lock-modal"')) {
      pageHtml = pageHtml.replace(
        /(<body[^>]*>)/i,
        `$1\n${getLockModalHtml()}\n<div id="protected-content" style="display: none;" class="w-full flex flex-col items-center">`
      );
      pageHtml = pageHtml.replace(
        /(<button onclick="window\.print\(\)"[^>]*>[\s\S]*?<\/button>)/,
        `<button onclick="lockPage()" class="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition flex items-center gap-1 cursor-pointer" title="Lock this page"><span>🔒</span> <span class="hidden sm:inline">Lock</span></button>\n        $1`
      );
      pageHtml = pageHtml.replace('</body>', `</div><!-- /protected-content -->\n${getLockJsScript()}\n</body>`);
      fs.writeFileSync(pageFile, pageHtml, 'utf8');
      console.log(`Added Security Lock to: /algorithms-and-flowcharts/${dir.name}/`);
    }
  }
}

// 4. Sync into out directory
const outDir = path.resolve('out');
if (fs.existsSync(outDir)) {
  fs.cpSync(baseDir, path.join(outDir, 'algorithms-and-flowcharts'), { recursive: true, force: true });
  fs.copyFileSync(masterHtmlPath, path.join(outDir, 'algorithms-and-flowcharts-10-master-problems.html'));
  console.log('Synchronized locked pages into out/ directory!');
}

console.log('ALL LOCKS APPLIED SUCCESSFULLY!');
