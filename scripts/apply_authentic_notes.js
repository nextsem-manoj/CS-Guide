const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/unit1LessonsData.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace any generic boilerplate "Understanding **History — Pre-Mechanical Era** is crucial for both IGNOU..." or similar repeated strings
content = content.replace(/Understanding \*\*[^*]+\*\* is crucial for both IGNOU BCA exams and industry software design\. In modern 64-bit multi-core processors, this concept forms the core foundation of operating system memory management and micro-architecture execution pipelines\./g, (match) => {
  return "This key concept bridges foundational computing principles with modern software execution and operating system memory management.";
});

content = content.replace(/\*\*[^*]+\*\* ko samajhna IGNOU BCA exams aur industry software development dono ke liye zaroori hai\. Modern 64-bit multi-core CPUs me ye concept OS memory management aur instruction pipelines ki foundation hai\./g, (match) => {
  return "Ye concept BCA examination perspective aur modern software engineering dono ke liye ek important foundation hai.";
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log("Successfully cleaned generic boilerplate AI phrasing from unit1LessonsData.ts!");
