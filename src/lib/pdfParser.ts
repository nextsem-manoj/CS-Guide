import { FillInBlankItem } from "@/components/FillInBlanksWidget";
import { SimulationConfig } from "@/components/PdfSimulationEngine";

export interface PdfPointItem {
  pointNumber: number;
  originalText: string;
  formattedPointText: string;
  keyTerm: string;
}

export interface ParsedPdfPage {
  pageNumber: number;
  extractedText: string;
  structuredPoints: PdfPointItem[];
  fillInBlanks: FillInBlankItem[];
  simulation?: SimulationConfig;
  extractedImages?: { src: string; caption: string; alt?: string }[];
  pageImageUrl?: string;
  title?: string;
  explanationEn?: string;
  explanationHi?: string;
  explanationHinglish?: string;
  mcqs?: Array<{
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }>;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Line-by-Line Point Extractor & Fill-in-the-Blanks Quiz Card Generator.
 * Converts raw text lines from PDF pages into numbered visual points (Point 1, Point 2, Point 3...)
 * and pairs EACH point with an interactive fill-in-the-blanks quiz card + simulation step!
 */
export function generateInteractiveNotesFromText(
  rawText: string, 
  pageNum: number,
  pageImages?: { src: string; caption: string; alt?: string }[]
): ParsedPdfPage {
  // Split PDF text by sentences or line breaks to make distinct points
  const rawLines = (rawText || "")
    .split(/(?<=[.!?])\s+|\r?\n/g)
    .map(l => l.trim().replace(/^[-•*0-9.]+\s*/, "")) // remove bullets or existing numbers
    .filter(l => l.length >= 10)
    .slice(0, 15); // Process up to 15 key points per page for clean layout

  const structuredPoints: PdfPointItem[] = [];
  const fillInBlanks: FillInBlankItem[] = [];
  const simulationSteps: { command: string; output: string }[] = [];

  rawLines.forEach((line, idx) => {
    const pointNumber = idx + 1;
    const words = line.split(/\s+/).filter(w => w.length >= 2);

    // Find the best keyword to blank out for the interactive quiz card
    let blankWord = "";
    // Check for technical words or pick middle word
    for (const w of words) {
      const clean = w.replace(/[^a-zA-Z0-9_-]/g, "");
      if (clean.length >= 3 && !["the", "and", "this", "that", "with", "from", "for", "your"].includes(clean.toLowerCase())) {
        blankWord = clean;
        break;
      }
    }
    if (!blankWord && words.length > 0) {
      blankWord = words[Math.floor(words.length / 2)].replace(/[^a-zA-Z0-9_-]/g, "");
    }
    if (!blankWord) blankWord = "command";

    const safeWord = escapeRegExp(blankWord);
    let sentenceWithBlank = line;
    try {
      sentenceWithBlank = line.replace(new RegExp(`\\b${safeWord}\\b`, "i"), "___");
    } catch (_err) {
      sentenceWithBlank = line.replace(blankWord, "___");
    }

    // 1. Structured Point Item
    structuredPoints.push({
      pointNumber,
      originalText: line,
      formattedPointText: `Point ${pointNumber}: ${line}`,
      keyTerm: blankWord
    });

    // 2. Fill-in-the-Blanks Quiz Card for this exact Point
    fillInBlanks.push({
      id: pageNum * 100 + pointNumber,
      sentence: sentenceWithBlank,
      blankAnswer: blankWord,
      options: [blankWord, "dir", "cls", "mkdir", "cd", "type"].filter((v, i, a) => a.indexOf(v) === i),
      hintKid: `Look at Point ${pointNumber}! The missing word starts with '${blankWord.slice(0, 2)}...'.`,
      hintPro: `Core technical keyword: '${blankWord}'. Re-read Point ${pointNumber} above.`,
      solutionExplanation: `Point ${pointNumber} Explanation: The correct answer is '${blankWord}'. Full sentence: "${line}".`,
      conceptTitle: `Point ${pointNumber} Fill-in-the-Blank Quiz`
    });

    // 3. Add to Interactive Simulation Steps
    simulationSteps.push({
      command: blankWord.toLowerCase(),
      output: `[Point ${pointNumber} Verified]: ${line}\nStatus: Command/Concept executed with return code 0.`
    });
  });

  // Fallback if no lines found
  if (structuredPoints.length === 0) {
    structuredPoints.push({
      pointNumber: 1,
      originalText: "The dir command is used to list all files and subdirectories on Windows.",
      formattedPointText: "Point 1: The dir command is used to list all files and subdirectories on Windows.",
      keyTerm: "dir"
    });

    fillInBlanks.push({
      id: pageNum * 100 + 1,
      sentence: "The ___ command is used to list all files and subdirectories on Windows.",
      blankAnswer: "dir",
      options: ["dir", "cd", "cls", "mkdir"],
      hintKid: "Look at Point 1! It starts with 'd' and ends with 'r'.",
      hintPro: "Standard Windows CMD directory listing command.",
      solutionExplanation: "The 'dir' command displays directory contents and file sizes.",
      conceptTitle: "Point 1 Fill-in-the-Blank Quiz"
    });

    simulationSteps.push({
      command: "dir",
      output: "Directory of C:\\Users\\Student\n07/25/2026  10:00 AM  <DIR> Desktop\n0 File(s) 0 bytes"
    });
  }

  return {
    pageNumber: pageNum,
    extractedText: rawText ? rawText.slice(0, 1200) : "Sample page content extracted from PDF document.",
    structuredPoints,
    fillInBlanks,
    extractedImages: pageImages || [],
    simulation: {
      type: "cli",
      title: `Page ${pageNum} Interactive Concept Simulation`,
      simulationSteps
    }
  };
}
