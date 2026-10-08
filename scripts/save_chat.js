const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Target directory under AppData for Antigravity IDE brain
const userHome = process.env.USERPROFILE || process.env.HOME;
const brainDir = path.join(userHome, '.gemini', 'antigravity-ide', 'brain');
const outputDir = path.join(__dirname, '..', 'chat-logs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Find the latest active conversation session
function getLatestConversationLog() {
  if (!fs.existsSync(brainDir)) {
    console.error(`Brain directory not found at: ${brainDir}`);
    return null;
  }

  const dirs = fs.readdirSync(brainDir);
  let latestFile = null;
  let latestMtime = 0;
  let latestConvId = null;

  for (const dirName of dirs) {
    const logPath = path.join(brainDir, dirName, '.system_generated', 'logs', 'transcript_full.jsonl');
    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      if (stats.mtimeMs > latestMtime) {
        latestMtime = stats.mtimeMs;
        latestFile = logPath;
        latestConvId = dirName;
      }
    }
  }

  return { logPath: latestFile, convId: latestConvId };
}

async function main() {
  const latest = getLatestConversationLog();
  if (!latest || !latest.logPath) {
    console.error("No active conversation log files found.");
    process.exit(1);
  }

  console.log(`Processing log from conversation: ${latest.convId}`);
  
  const fileStream = fs.createReadStream(latest.logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let firstUserRequest = null;
  const turns = [];

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const data = JSON.parse(line);
      
      // Track user input
      if (data.source === 'USER_EXPLICIT' && data.type === 'USER_INPUT') {
        let content = data.content || '';
        // Strip XML-like wrapper metadata if any
        content = content.replace(/<USER_REQUEST>[\s\S]*?<\/USER_REQUEST>/i, (match) => {
          return match.replace(/<\/?USER_REQUEST>/gi, '').trim();
        });
        content = content.replace(/<ADDITIONAL_METADATA>[\s\S]*?<\/ADDITIONAL_METADATA>/i, '').trim();
        content = content.replace(/<USER_SETTINGS_CHANGE>[\s\S]*?<\/USER_SETTINGS_CHANGE>/i, '').trim();
        
        if (content.trim()) {
          if (!firstUserRequest) {
            // Take the first line as a title preview
            firstUserRequest = content.split('\n')[0].replace(/\/learn\s*/gi, '').trim();
          }
          turns.push({ sender: 'User', content: content.trim() });
        }
      }
      
      // Track model response
      if (data.source === 'MODEL' && data.type === 'PLANNER_RESPONSE') {
        const content = data.content || '';
        if (content.trim()) {
          turns.push({ sender: 'Antigravity AI', content: content.trim() });
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  if (turns.length === 0) {
    console.log("No text exchanges found to format.");
    process.exit(0);
  }

  // Determine output file name
  let rawTitle = process.argv[2];
  if (!rawTitle && firstUserRequest) {
    rawTitle = firstUserRequest;
  }
  if (!rawTitle) {
    rawTitle = `chat-${latest.convId.substring(0, 8)}`;
  }

  // Clean filename (replace invalid characters with dashes or strip them)
  const cleanTitle = rawTitle.replace(/[\\/:*?"<>|]/g, '-').trim();
  const outputFileName = `${cleanTitle}.md`;
  const outputPath = path.join(outputDir, outputFileName);

  let md = `# ${rawTitle}\n\n`;
  md += `*Saved on: ${new Date().toLocaleString()}*\n`;
  md += `*Conversation ID: ${latest.convId}*\n\n---\n\n`;

  for (const turn of turns) {
    if (turn.sender === 'User') {
      md += `### 👤 User\n\n${turn.content}\n\n---\n\n`;
    } else {
      md += `### 🤖 Antigravity AI\n\n${turn.content}\n\n---\n\n`;
    }
  }

  try {
    fs.writeFileSync(outputPath, md, 'utf8');
    console.log(`Chat successfully saved to: ${outputPath}`);
  } catch (err) {
    const os = require('os');
    const tempChat = path.join(os.tmpdir(), outputFileName);
    fs.writeFileSync(tempChat, md, 'utf8');
    console.log(`Windows Protected Folder: Chat saved to temp: ${tempChat}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
