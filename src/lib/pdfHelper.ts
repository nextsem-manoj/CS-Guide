/**
 * Nextsem Academy - PDF Download Generator Utility
 * Uses jsPDF to generate a real .pdf binary file — no window.open(), no print dialogs.
 * Works on Android WebView, iOS, and all mobile browsers without popup blockers.
 *
 * Author: Nextsem | nextsem.online
 */

import { jsPDF } from "jspdf";

export interface LessonPdfPayload {
  title: string;
  courseName: string;
  content: string;
  unit?: string;
  author?: string;
  canonicalUrl?: string;
}

/**
 * Strips markdown syntax from content for clean plain text in jsPDF.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, "")          // Remove headings #, ##, ###
    .replace(/\*\*(.*?)\*\*/g, "$1")       // Remove **bold**
    .replace(/\*(.*?)\*/g, "$1")           // Remove *italic*
    .replace(/`{3}[\s\S]*?`{3}/g, "")     // Remove ```code blocks```
    .replace(/`([^`]+)`/g, "$1")          // Remove `inline code`
    .replace(/🔹|🔸|✅|❌|📌|💡|🚀|🎯|📘|📗|📙|🧠|👨‍💻|⚡/g, "") // Remove emojis (jsPDF font compat)
    .replace(/^\s*[-*]\s+/gm, "• ")       // Convert - list items to bullets
    .replace(/\n{3,}/g, "\n\n")           // Collapse excess newlines
    .trim();
}

/**
 * Wraps long text into lines that fit within a given width (in jsPDF units).
 */
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");
  for (const para of paragraphs) {
    if (para.trim() === "") {
      lines.push(""); // blank line for paragraph spacing
      continue;
    }
    const wrapped = doc.splitTextToSize(para, maxWidth);
    lines.push(...wrapped);
  }
  return lines;
}

export function generateAndDownloadLessonPdf(data: LessonPdfPayload): void {
  if (typeof window === "undefined") return;

  const authorName = data.author || "Nextsem";
  const lessonUrl = data.canonicalUrl || "https://cs.nextsem.online/bca/semester-1";
  const unit = data.unit || "";

  // ── Init jsPDF ─────────────────────────────────────────────────────────────
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();   // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;          // 180mm
  let y = margin;

  // ── Helper: Add new page if needed ─────────────────────────────────────────
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ── HEADER BACKGROUND BAR ───────────────────────────────────────────────────
  doc.setFillColor(6, 12, 24); // #060c18
  doc.rect(0, 0, pageWidth, 28, "F");

  // App Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("Nextsem Academy", margin, 12);

  // Sub heading
  doc.setFontSize(8);
  doc.setTextColor(193, 166, 72); // gold #c1a648
  doc.text("IGNOU BCA 1st Semester Official Study Notes", margin, 18);

  // NS Badge (top right)
  doc.setFillColor(193, 166, 72);
  doc.roundedRect(pageWidth - margin - 16, 6, 14, 14, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(6, 12, 24);
  doc.text("NS", pageWidth - margin - 10.5, 15, { align: "center" });

  y = 32;

  // ── META BAR ───────────────────────────────────────────────────────────────
  doc.setFillColor(12, 19, 40); // #0c1328
  doc.roundedRect(margin, y, contentWidth, 14, 3, 3, "F");
  doc.setDrawColor(30, 41, 59);
  doc.roundedRect(margin, y, contentWidth, 14, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(193, 166, 72);
  doc.text(`${data.courseName}${unit ? ` • ${unit}` : ""}`, margin + 4, y + 5.5);

  doc.setTextColor(56, 189, 248); // cyan #38bdf8
  doc.text(`Author: ${authorName}`, margin + 4, y + 10.5);

  y += 18;

  // ── LESSON URL ─────────────────────────────────────────────────────────────
  doc.setFillColor(3, 7, 18); // #030712
  doc.roundedRect(margin, y, contentWidth, 10, 2, 2, "F");
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("Lesson URL: ", margin + 3, y + 6.5);
  doc.setTextColor(56, 189, 248);
  doc.textWithLink(lessonUrl, margin + 24, y + 6.5, { url: lessonUrl });

  y += 14;

  // ── LESSON TITLE ───────────────────────────────────────────────────────────
  checkPageBreak(16);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(data.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 4;

  // Divider
  doc.setDrawColor(4, 170, 109); // emerald
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // ── LESSON CONTENT ─────────────────────────────────────────────────────────
  const cleanContent = stripMarkdown(data.content);
  const contentLines = wrapText(doc, cleanContent, contentWidth);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225); // #cbd5e1

  for (const line of contentLines) {
    checkPageBreak(6);

    if (line === "") {
      y += 3; // paragraph spacing
      continue;
    }

    // Section headings detection (lines ending with ':' or ALL CAPS short lines)
    if (line.endsWith(":") && line.length < 60) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(4, 170, 109); // #04AA6D emerald
      doc.text(line, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(203, 213, 225);
    } else if (line.startsWith("•")) {
      doc.setTextColor(56, 189, 248); // cyan bullets
      doc.text("•", margin, y);
      doc.setTextColor(203, 213, 225);
      doc.text(line.slice(1).trim(), margin + 5, y);
    } else {
      doc.text(line, margin, y);
    }

    y += 5.5;
  }

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const footerY = pageHeight - 10;
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `© ${new Date().getFullYear()} Nextsem Academy • Authored by ${authorName} • All Rights Reserved`,
      margin, footerY
    );
    doc.setTextColor(4, 170, 109);
    doc.textWithLink("nextsem.online", pageWidth - margin - 20, footerY, { url: "https://nextsem.online" });
    doc.setTextColor(100, 116, 139);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, footerY, { align: "center" });
  }

  // ── SAVE / DOWNLOAD ────────────────────────────────────────────────────────
  const fileName = `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-nextsem.pdf`;
  doc.save(fileName);
}
