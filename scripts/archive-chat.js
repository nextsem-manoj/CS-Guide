const fs = require('fs');
const path = require('path');

const conversationId = '9c6866df-9377-446d-8891-54d92679a3e6';
const brainDir = 'C:\\Users\\manoj2403\\.gemini\\antigravity-ide\\brain';
const logFilePath = path.join(brainDir, conversationId, '.system_generated', 'logs', 'transcript.jsonl');
const outputDir = 'c:\\jbrs-landing-page\\chat-logs';
const outputFileName = 'Default Hinglish Kid Mode and Theme Refactoring.md';
const outputFilePath = path.join(outputDir, outputFileName);

function formatTranscript() {
  if (!fs.existsSync(logFilePath)) {
    console.error(`Log file not found at ${logFilePath}. Creating a basic summary log.`);
    const fallbackContent = `# Chat Log: Default Hinglish Kid Mode and Theme Refactoring\n\n*Auto-generated summary fallback*\n\n### Work Completed:\n- Rewrote /about & /profile to remove all Google AdSense ads.\n- Set Hinglish & Kid Mode default on HTML & CLI lessons.\n- Hidden Help Guide by default on lesson launch.\n- Simplified theme system: dark theme default, premium light theme (white background, black text), relaxing theme removed.\n- Integrated Code Playground directly into HTML/CSS/JS lessons with a new "Playground ↗" button.\n- Placed Windows 11 Simulator links on Homepage hero CLI-band and Exercises dropdown navigation.`;
    fs.writeFileSync(outputFilePath, fallbackContent, 'utf8');
    console.log(`Saved fallback log to ${outputFilePath}`);
    return;
  }

  const fileLines = fs.readFileSync(logFilePath, 'utf8').split('\n').filter(Boolean);
  let mdContent = `# Nextsem Academy — Conversation Transcript\n\n`;
  mdContent += `*Conversation ID: ${conversationId}*\n`;
  mdContent += `*Date: ${new Date().toLocaleDateString()}*\n\n---\n\n`;

  fileLines.forEach((line) => {
    try {
      const step = JSON.parse(line);
      const source = step.source || '';
      const type = step.type || '';
      const content = step.content || '';

      if (type === 'USER_INPUT' && content) {
        mdContent += `### 👤 User:\n\n${content}\n\n`;
        mdContent += `---\n\n`;
      } else if (type === 'PLANNER_RESPONSE' && content) {
        // Strip out tool call snippets from content if they clutter
        const cleanContent = content.replace(/```json[\s\S]*?```/g, '').trim();
        if (cleanContent) {
          mdContent += `### 🤖 Antigravity:\n\n${cleanContent}\n\n`;
          mdContent += `---\n\n`;
        }
      }
    } catch (e) {
      // Ignore JSON parse errors for incomplete lines
    }
  });

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFilePath, mdContent, 'utf8');
  console.log(`Successfully formatted and saved chat log to: ${outputFilePath}`);
}

formatTranscript();
