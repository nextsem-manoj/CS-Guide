// Safer MCQ shuffle - operates on individual options arrays line-by-line
// Does NOT use regex replacement on the whole file content
const fs = require('fs');
const path = 'src/data/htmlLessonsData.ts';
const lines = fs.readFileSync(path, 'utf8').split('\n');

let seed = 42;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let fixCount = 0;
let i = 0;

while (i < lines.length) {
  // Find lines that start an options array like:  options: [
  if (/^\s*options:\s*\[/.test(lines[i])) {
    const optStartLine = i;
    // Check if options are all on one line
    if (lines[i].includes('],')) {
      // Single-line options: ["A", "B", "C", "D"],
      const match = lines[i].match(/^(\s*options:\s*\[)(.*?)(\],?.*)$/);
      if (match) {
        const prefix = match[1];
        const optStr = match[2];
        const suffix = match[3];
        // Extract quoted strings carefully
        const opts = [];
        const re = /"((?:[^"\\]|\\.)*)"/g;
        let m;
        while ((m = re.exec(optStr)) !== null) {
          opts.push(m[0]); // keep full quoted form with escapes
        }
        if (opts.length >= 3) {
          const shuffled = shuffle(opts);
          if (shuffled.join() !== opts.join()) fixCount++;
          lines[i] = prefix + shuffled.join(', ') + suffix;
        }
      }
      i++;
      continue;
    }
    
    // Multi-line options array
    // Collect option lines until we find the closing ]
    const optionLines = [];
    let j = i + 1;
    while (j < lines.length && !lines[j].match(/^\s*\]/)) {
      if (lines[j].trim().startsWith('"') || lines[j].trim().startsWith("'")) {
        optionLines.push({ idx: j, content: lines[j] });
      }
      j++;
    }
    
    if (optionLines.length >= 3) {
      // Shuffle the option lines
      const contents = optionLines.map(o => o.content);
      const shuffled = shuffle(contents);
      
      // Ensure trailing commas are consistent
      for (let k = 0; k < optionLines.length; k++) {
        let line = shuffled[k];
        // Ensure all but last have comma, last may or may not
        if (k < optionLines.length - 1) {
          line = line.replace(/,?\s*$/, ',');
        }
        lines[optionLines[k].idx] = line;
      }
      if (shuffled.join() !== contents.join()) fixCount++;
    }
    
    i = j + 1;
    continue;
  }
  i++;
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');

// Verify
const newLines = fs.readFileSync(path, 'utf8').split('\n');
let pos = {0:0, 1:0, 2:0, 3:0};
let total = 0;

for (let i = 0; i < newLines.length; i++) {
  const caMatch = newLines[i].match(/correctAnswer:\s*["'](.+?)["']/);
  if (!caMatch) continue;
  const answer = caMatch[1];
  for (let j = i - 1; j >= Math.max(0, i - 20); j--) {
    if (/options/.test(newLines[j])) {
      let optContent = newLines.slice(j, i).join('\n');
      let opts = [];
      const re = /"((?:[^"\\]|\\.)*)"/g;
      let m;
      while ((m = re.exec(optContent)) !== null) opts.push(m[1]);
      // Filter out non-option strings
      opts = opts.filter(o => o.length > 0 && o !== 'options');
      const idx = opts.findIndex(o => o === answer);
      if (idx >= 0 && idx <= 3) { pos[idx]++; total++; }
      break;
    }
  }
}

console.log('Shuffled', fixCount, 'MCQ option arrays.');
console.log('Distribution (' + total + ' MCQs):');
console.log('  A:', pos[0], '(' + (total ? Math.round(pos[0]/total*100) : 0) + '%)');
console.log('  B:', pos[1], '(' + (total ? Math.round(pos[1]/total*100) : 0) + '%)');
console.log('  C:', pos[2], '(' + (total ? Math.round(pos[2]/total*100) : 0) + '%)');
console.log('  D:', pos[3], '(' + (total ? Math.round(pos[3]/total*100) : 0) + '%)');
