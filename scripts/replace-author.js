const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const targetDir = path.join(__dirname, '../src');

walkDir(targetDir, (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.json')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (/Manoj/i.test(content)) {
      let updated = content
        .replace(/Er\.\s*Manoj\s*Kumar's/gi, "Nextsem's")
        .replace(/Er\.\s*Manoj\s*Kumar/gi, "Nextsem")
        .replace(/Er\.\s*Manoj\s*Sir/gi, "Nextsem")
        .replace(/Manoj\s*Sir/gi, "Nextsem")
        .replace(/Manoj\s*Kumar/gi, "Nextsem");

      fs.writeFileSync(filePath, updated, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
