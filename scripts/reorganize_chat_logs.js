const fs = require('fs');
const path = require('path');

const chatLogsDir = path.join(__dirname, '..', 'chat-logs');

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function reorganize() {
  if (!fs.existsSync(chatLogsDir)) {
    console.error('chat-logs directory not found:', chatLogsDir);
    return;
  }

  const entries = fs.readdirSync(chatLogsDir);
  const files = entries.filter(name => {
    const fullPath = path.join(chatLogsDir, name);
    return fs.statSync(fullPath).isFile();
  });

  console.log(`Found ${files.length} flat files in ${chatLogsDir} to organize.`);

  const summary = {};
  let movedCount = 0;

  files.forEach(fileName => {
    const sourcePath = path.join(chatLogsDir, fileName);
    const stat = fs.statSync(sourcePath);
    let date = stat.mtime;

    // Check content header for explicit saved date
    try {
      const head = fs.readFileSync(sourcePath, 'utf8').slice(0, 600);
      const savedOnMatch = head.match(/Saved on:\s*([^\r\n*]+)/i);
      const dateMatch = head.match(/\*Date:\s*([^\r\n*]+)/i);
      const targetMatch = savedOnMatch || dateMatch;
      if (targetMatch) {
        const parsed = new Date(targetMatch[1]);
        if (!isNaN(parsed.getTime())) {
          date = parsed;
        }
      }
    } catch (e) {
      // Ignore read error, fallback to mtime
    }

    // Check filename for explicit date mentions
    if (fileName.toLowerCase().includes('8 july 2026')) {
      date = new Date('2026-07-08');
    }

    const year = date.getFullYear();
    const monthNum = String(date.getMonth() + 1).padStart(2, '0');
    const monthName = monthNames[date.getMonth()];
    const folderKey = `${year}/${monthNum}-${monthName}`;

    const destDir = path.join(chatLogsDir, String(year), `${monthNum}-${monthName}`);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const destPath = path.join(destDir, fileName);

    // Safety check: ensure destination does not overwrite a distinct file
    if (fs.existsSync(destPath) && destPath !== sourcePath) {
      console.warn(`Destination exists, generating unique suffix for: ${fileName}`);
      const ext = path.extname(fileName);
      const base = path.basename(fileName, ext);
      const uniqueDest = path.join(destDir, `${base}-${Date.now()}${ext}`);
      fs.renameSync(sourcePath, uniqueDest);
    } else {
      fs.renameSync(sourcePath, destPath);
    }

    summary[folderKey] = (summary[folderKey] || 0) + 1;
    movedCount++;
  });

  console.log(`\n✅ Successfully organized ${movedCount} chat logs into Month/Year folders:\n`);
  Object.keys(summary).sort().forEach(folder => {
    console.log(`  📁 chat-logs/${folder}/ (${summary[folder]} files)`);
  });
}

reorganize();
