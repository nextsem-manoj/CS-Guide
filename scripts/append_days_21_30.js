const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'data', 'bcaPracticalData.ts');
const rawPath = path.join(__dirname, 'days_21_30.raw.ts');

if (!fs.existsSync(rawPath)) {
  console.error("raw snippet not found:", rawPath);
  process.exit(1);
}

const rawSnippet = fs.readFileSync(rawPath, 'utf8');
let content = fs.readFileSync(targetPath, 'utf8');

const targetMarker = '  }\n];';
const lastIndex = content.lastIndexOf(targetMarker);
if (lastIndex === -1) {
  console.error("Could not find target marker in", targetPath);
  process.exit(1);
}

const replacement = '  },\n\n' + rawSnippet.trim() + '\n];';
const newContent = content.slice(0, lastIndex) + replacement + content.slice(lastIndex + targetMarker.length);

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log("Successfully appended Days 21-30 to bcaPracticalData.ts!");
