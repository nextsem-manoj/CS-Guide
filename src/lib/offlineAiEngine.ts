import { DEFAULT_CONCEPTS, getSemmyResponses, SemmyConcept } from "@/data/semmyAiData";
import { htmlLessons } from "@/data/htmlLessonsData";
import { cliLessons } from "@/data/cliLessonsData";
import searchIndexData from "@/data/searchIndex.json";

export interface OfflineAiResponse {
  title: string;
  persona: string;
  markdown: string;
  sourceLessonUrl?: string;
  sourceLessonTitle?: string;
  tags?: string[];
}

export function queryOfflineAi(promptText: string, persona: string = "Web Dev Tutor"): OfflineAiResponse {
  const query = promptText.toLowerCase().trim();
  const words = query.split(/\s+/).filter(w => w.length > 2);

  // 1. Check Semmy Knowledge Base concepts (Von Neumann, ALU, registers, logic gates, physics, accounting, etc.)
  const kb = getSemmyResponses();
  for (const [key, concept] of Object.entries(kb)) {
    if (query.includes(key) || words.some(w => key.includes(w) || concept.title.toLowerCase().includes(w))) {
      let md = `## ${concept.title}\n\n`;
      md += `${concept.summary}\n\n`;
      if (concept.code) {
        md += `\`\`\`\n${concept.code}\n\`\`\`\n\n`;
      }
      md += `### 💡 Key Takeaway\n`;
      md += `* **Topic**: ${concept.title}\n`;
      md += `* **Category**: ${concept.tags ? concept.tags.join(", ") : "Curriculum Concept"}\n`;
      md += `* **Status**: Verified in Nextsem Core Knowledge Base\n`;

      return {
        title: concept.title,
        persona,
        markdown: md,
        tags: concept.tags
      };
    }
  }

  // 2. Check HTML lessons (100 lessons)
  const matchedHtml = htmlLessons.find(l => 
    l.title.toLowerCase().includes(query) ||
    l.slug.toLowerCase().includes(query) ||
    words.some(w => l.title.toLowerCase().includes(w))
  );

  if (matchedHtml) {
    const englishPro = matchedHtml.english?.pro || matchedHtml.english?.kid || "";
    let md = `## ${matchedHtml.title}\n\n`;
    md += `> **Unit**: ${matchedHtml.unit} | **Reference**: ${matchedHtml.bookRef}\n\n`;
    md += `${englishPro.replace(/###/g, "### ").slice(0, 800)}...\n\n`;
    md += `### 💡 Interactive Exercise Question\n`;
    const ex = typeof matchedHtml.exercise === "object" && "english" in matchedHtml.exercise 
      ? (matchedHtml.exercise as any).english 
      : matchedHtml.exercise;
    if (ex?.question) {
      md += `* **Q**: ${ex.question}\n`;
      md += `* **Correct Answer**: \`${ex.correctAnswer}\`\n`;
    }

    return {
      title: matchedHtml.title,
      persona,
      markdown: md,
      sourceLessonUrl: `/html/${matchedHtml.slug}`,
      sourceLessonTitle: matchedHtml.title
    };
  }

  // 3. Check CLI lessons (15 lessons)
  const matchedCli = cliLessons.find(l => 
    l.title.toLowerCase().includes(query) ||
    l.slug.toLowerCase().includes(query) ||
    words.some(w => l.title.toLowerCase().includes(w))
  );

  if (matchedCli) {
    const englishPro = matchedCli.english?.pro || matchedCli.english?.kid || "";
    let md = `## ${matchedCli.title}\n\n`;
    md += `> **Unit**: ${matchedCli.unit} | **Reference**: ${matchedCli.bookRef}\n\n`;
    md += `${englishPro.replace(/###/g, "### ").slice(0, 800)}...\n\n`;
    md += `### 💻 Command Line Example\n`;
    md += `\`\`\`cmd\n${matchedCli.slug.split("-")[0]} --help\n\`\`\`\n`;

    return {
      title: matchedCli.title,
      persona,
      markdown: md,
      sourceLessonUrl: `/cli/${matchedCli.slug}`,
      sourceLessonTitle: matchedCli.title
    };
  }

  // 4. Check full-text Search Index (67 structured content files)
  const matchedIndex = (searchIndexData as any[]).find(item => 
    item.title.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  );

  if (matchedIndex) {
    let md = `## ${matchedIndex.title}\n\n`;
    md += `> **Phase**: ${matchedIndex.phase} | **Read Time**: ${matchedIndex.duration}\n\n`;
    md += `${matchedIndex.content.slice(0, 900)}...\n\n`;
    md += `### 🎯 Quick Summary\n`;
    md += `* Learn more details in the **${matchedIndex.title}** module.\n`;

    return {
      title: matchedIndex.title,
      persona,
      markdown: md,
      sourceLessonUrl: matchedIndex.id.startsWith("cli/") ? `/${matchedIndex.id}` : matchedIndex.id.startsWith("html/") ? `/${matchedIndex.id}` : `/book/${matchedIndex.id}`,
      sourceLessonTitle: matchedIndex.title
    };
  }

  // Fallback response synthesizer
  let fallbackMd = `## Nextsem Offline Study Assistant\n\n`;
  fallbackMd += `Here is a structured explanation based on your prompt **"${promptText}"**:\n\n`;
  fallbackMd += `### 📘 Concept Overview\n`;
  fallbackMd += `* **Topic Analyzed**: \`${promptText}\`\n`;
  fallbackMd += `* **Category**: Full Stack Web Development & Computer Science\n`;
  fallbackMd += `* **Status**: Loaded directly from Nextsem's 100% Offline Knowledge Base.\n\n`;
  fallbackMd += `### 💻 Recommended Code Practice\n`;
  fallbackMd += `\`\`\`html\n<!-- Example HTML5 Structure -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>${promptText}</title>\n</head>\n<body>\n  <h1>Learning ${promptText}</h1>\n</body>\n</html>\n\`\`\`\n\n`;
  fallbackMd += `### 🚀 Recommended Action\n`;
  fallbackMd += `Try searching for related tutorials on the **HTML5 Dashboard** or **Windows CLI Hub**!`;

  return {
    title: `Explanation: ${promptText}`,
    persona,
    markdown: fallbackMd
  };
}
