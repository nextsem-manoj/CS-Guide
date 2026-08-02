const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/unit1LessonsData.ts');
let content = fs.readFileSync(targetFile, 'utf8');

const headings = [
  "### 🌟 Modern Hardware Architecture & Practical Applications",
  "### 🚀 Pro-Tip for BCA Term-End Examinations",
  "### 🧠 Real-World Industry Insight & System Design",
  "### 💻 Developer Key Takeaway & Real-Life Code Insight",
  "### ⚡ Hardware Performance & Modern Benchmark Metrics"
];

const images = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Computer_system_bus.svg/800px-Computer_system_bus.svg.png", cap: "System Bus Architecture Diagram" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logic_gates.svg/800px-Logic_gates.svg.png", cap: "Digital Logic Gates Truth Table & Circuit Diagrams" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/CPU_block_diagram.svg/800px-CPU_block_diagram.svg.png", cap: "CPU Internal Block Architecture (CU, ALU, Registers)" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Von_Neumann_Architecture.svg/800px-Von_Neumann_Architecture.svg.png", cap: "Von Neumann Stored Program Architecture" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/RAM_module_image.jpg/640px-RAM_module_image.jpg", cap: "Primary Memory & Cache Storage Hierarchy" }
];

let updatedCount = 0;

// Match individual lesson objects between { and keyPoints: [
const lessonBlockRegex = /(\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?lessonNumber:\s*(\d+)[\s\S]*?title:\s*"([^"]+)"[\s\S]*?pdfPage:\s*(\d+)[\s\S]*?)(keyPoints:\s*\[)/g;

content = content.replace(lessonBlockRegex, (match, prefix, idStr, lessonNumStr, titleStr, pdfPageStr, keyPointsTag) => {
  if (prefix.includes('extraNotes:')) {
    return match;
  }

  const num = parseInt(lessonNumStr, 10);
  const pdfPage = parseInt(pdfPageStr, 10);
  const selH = headings[num % headings.length];
  const selImg = images[num % images.length];

  const extraNotesBlock = `extraNotes: {
      subheading: "${selH}",
      imageUrl: "${selImg.url}",
      imageCaption: "${selImg.cap} (IGNOU PDF Page #${pdfPage} Extension)",
      content: {
        english: "Understanding **${titleStr}** is crucial for both IGNOU BCA exams and industry software design. In modern 64-bit multi-core processors, this concept forms the core foundation of operating system memory management and micro-architecture execution pipelines.\\n\\n🔹 **Er. Manoj Sir Exam Pro-Tip**: When answering 5-mark or 10-mark questions on this topic, state the definition first, draw a neat labeled block diagram, and list at least 3 key technical highlights to secure full marks.",
        hinglish: "**${titleStr}** ko samajhna IGNOU BCA exams aur industry software development dono ke liye zaroori hai. Modern 64-bit multi-core CPUs me ye concept OS memory management aur instruction pipelines ki foundation hai.\\n\\n🔹 **Er. Manoj Sir Exam Pro-Tip**: 5-mark ya 10-mark questions me pehle formal definition likhein, fir clean labeled diagram banayein aur 3 key technical highlights point-by-point explain karein!"
      }
    },\n    keyPoints: [`;

  updatedCount++;
  return prefix + extraNotesBlock;
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log(`Successfully injected extraNotes into ${updatedCount} additional lessons in unit1LessonsData.ts!`);
