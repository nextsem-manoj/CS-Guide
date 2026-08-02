const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/data/bcaCoursesData.ts'), 'utf8');

// Strip TypeScript annotations to parse the dataset dynamically in Node
let jsContent = content
  .replace(/export interface[\s\S]*?}/g, '')
  .replace(/export const/g, 'const')
  .replace(/:\s*BcaSemester\[\]/g, '');

jsContent += '\nmodule.exports = { bcaSemesters };';

const tempFile = path.join(__dirname, 'temp_bca_data.js');
fs.writeFileSync(tempFile, jsContent);

const { bcaSemesters } = require(tempFile);
try {
  fs.unlinkSync(tempFile);
} catch (e) {}

const sem1 = bcaSemesters.find(s => s.id === 1);
if (!sem1) {
  console.error("Semester 1 not found!");
  process.exit(1);
}

const missing = [];
sem1.subjects.forEach(subject => {
  subject.blocks.forEach(block => {
    block.units.forEach(unit => {
      const fullPath = path.join(__dirname, '../public/BCA_NEW_Books', block.path, unit.fileName);
      if (!fs.existsSync(fullPath)) {
        missing.push({
          subject: subject.code,
          block: block.name,
          unitName: unit.displayName,
          fileName: unit.fileName,
          relPath: `public/BCA_NEW_Books/${block.path}/${unit.fileName}`
        });
      }
    });
  });
});

console.log(JSON.stringify(missing, null, 2));
console.log(`Total missing files for Semester 1: ${missing.length}`);
