import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\Manoj\\.gemini\\antigravity-ide\\brain\\db143ee7-a5b2-4e20-8908-7707ba175be8';
const docsDest = path.resolve('docs', 'design-mockups');
const publicDest = path.resolve('public', 'design-mockups');

fs.mkdirSync(docsDest, { recursive: true });
fs.mkdirSync(publicDest, { recursive: true });

const imageMap = [
  { prefix: 'home_desktop_layout_', target: '01-home-desktop-layout.jpg', title: 'Home Desktop Layout (Widescreen 16:9)' },
  { prefix: 'home_mobile_layout_', target: '02-home-mobile-layout.jpg', title: 'Home Mobile Layout (Smartphone 9:16)' },
  { prefix: 'bca_dashboard_desktop_', target: '03-bca-dashboard-desktop-layout.jpg', title: 'BCA Hub Semester Dashboard Desktop (16:9)' },
  { prefix: 'bca_dashboard_mobile_', target: '04-bca-dashboard-mobile-layout.jpg', title: 'BCA Hub Mobile Accordion Layout (9:16)' },
  { prefix: 'practical_lab_layout_', target: '05-practical-lab-desktop-layout.jpg', title: 'BCA Practical Lab Desktop Workspace (16:9)' },
  { prefix: 'practical_lab_mobile_', target: '06-practical-lab-mobile-layout.jpg', title: 'BCA Practical Lab Mobile Layout (9:16)' },
  { prefix: 'lesson_reader_layout_', target: '07-lesson-reader-desktop-and-mobile-layout.jpg', title: 'Lesson Reader Desktop & Mobile Side-by-Side (16:9)' },
];

const files = fs.readdirSync(srcDir);
const results = [];

for (const item of imageMap) {
  const matched = files.find(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
  if (matched) {
    const srcFile = path.join(srcDir, matched);
    const destDocsFile = path.join(docsDest, item.target);
    const destPublicFile = path.join(publicDest, item.target);
    
    fs.copyFileSync(srcFile, destDocsFile);
    fs.copyFileSync(srcFile, destPublicFile);
    
    const stat = fs.statSync(destDocsFile);
    results.push({
      file: item.target,
      title: item.title,
      sizeKB: Math.round(stat.size / 1024),
      source: matched
    });
    console.log(`[SAVED] ${item.target} (${Math.round(stat.size / 1024)} KB) - ${item.title}`);
  } else {
    console.warn(`[NOT FOUND] Prefix: ${item.prefix}`);
  }
}

// Generate an index markdown inside docs/design-mockups/README.md
const mdContent = `# CS-Guide Design Mockups & Layout Reference System
Curated and architected by Er. Manoj Kumar for NextSem CS-Guide & BCA Learning Portal.

All layout mockups are numbered in exact sequential order for Desktop and Mobile development references:

| # | Filename | Viewport | Target Page / Screen | Live Static Asset |
|---|----------|----------|----------------------|-------------------|
${results.map((r, i) => `| ${i + 1} | \`${r.file}\` | ${r.file.includes('mobile') ? 'Mobile (9:16)' : 'Desktop (16:9)'} | **${r.title}** | [\`/design-mockups/${r.file}\`](/${r.file}) |`).join('\n')}

## Layout Galleries

${results.map((r, i) => `### ${i + 1}. ${r.title} (\`${r.file}\`)
![${r.title}](./${r.file})
`).join('\n')}
`;

fs.writeFileSync(path.join(docsDest, 'README.md'), mdContent, 'utf8');
console.log(`\nCreated design index at: ${path.join(docsDest, 'README.md')}`);
