import fs from 'fs';
import path from 'path';
import { getLockModalHtml, getLockJsScript } from './add_security_lock.mjs';

const sourceFile = path.resolve('test_d8_utf8.html');
const targetMasterHtml = path.resolve('public/algorithms-and-flowcharts-10-master-problems.html');
const targetMasterDir = path.resolve('public/algorithms-and-flowcharts-10-master-problems');
const outMasterHtml = path.resolve('out/algorithms-and-flowcharts-10-master-problems.html');
const outMasterDir = path.resolve('out/algorithms-and-flowcharts-10-master-problems');

let html = fs.readFileSync(sourceFile, 'utf8');

// 1. Ensure security lock modal is cleanly inserted after <body ...>
if (!html.includes('id="security-lock-modal"')) {
  html = html.replace(
    /(<body[^>]*>)/i,
    `$1\n${getLockModalHtml()}\n<div id="protected-content" style="display: none;" class="w-full flex flex-col items-center">`
  );
}

// 2. Add Lock button in nav
if (!html.includes('onclick="lockPage()"')) {
  html = html.replace(
    /(<button onclick="window\.print\(\)"[^>]*>[\s\S]*?<\/button>)/,
    `<button onclick="lockPage()" class="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition flex items-center gap-1 cursor-pointer" title="Lock this page"><span>🔒</span> <span class="hidden sm:inline">Lock</span></button>\n        $1`
  );
}

// 3. Ensure closing protected content and lock script before </body>
if (!html.includes('id="protected-content"')) {
  console.error('Missing protected-content div!');
} else {
  // Check if lock script already at bottom
  if (!html.includes('VALID_PASSWORDS')) {
    html = html.replace('</body>', `</div><!-- /protected-content -->\n${getLockJsScript()}\n</body>`);
  }
}

// Write to public/algorithms-and-flowcharts-10-master-problems.html
fs.writeFileSync(targetMasterHtml, html, 'utf8');
console.log('Successfully wrote repaired master HTML, bytes:', fs.statSync(targetMasterHtml).size);

// Also create public/algorithms-and-flowcharts-10-master-problems/index.html so trailing slash works identically
if (!fs.existsSync(targetMasterDir)) {
  fs.mkdirSync(targetMasterDir, { recursive: true });
}
fs.writeFileSync(path.join(targetMasterDir, 'index.html'), html, 'utf8');
console.log('Successfully created public/algorithms-and-flowcharts-10-master-problems/index.html');

// Sync to out directory if it exists
if (fs.existsSync(path.resolve('out'))) {
  fs.writeFileSync(outMasterHtml, html, 'utf8');
  if (!fs.existsSync(outMasterDir)) {
    fs.mkdirSync(outMasterDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outMasterDir, 'index.html'), html, 'utf8');
  console.log('Successfully synchronized to out/ directory!');
}
