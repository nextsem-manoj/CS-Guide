export interface LessonPdfData {
  title: string;
  unit: string;
  subject: string;
  lang: string;
  level: string;
  contentText: string;
  exercise?: {
    question: string;
    options: string[];
    correctAnswer: string;
    hint?: string;
  };
}

export function downloadLessonPdf({
  title,
  unit,
  subject,
  lang,
  level,
  contentText,
  exercise,
}: LessonPdfData) {
  if (typeof window === "undefined") return;

  const formattedContent = contentText
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "<div style='height:8px;'></div>";
      if (trimmed.startsWith("###")) {
        return `
          <div style="margin-top:26px; margin-bottom:12px; display:flex; align-items:center; gap:10px;">
            <span style="display:inline-block; width:6px; height:22px; background:linear-gradient(180deg, #e4ca67, #c1a648); border-radius:3px;"></span>
            <h3 class="section-title" style="font-size:18px; font-weight:900; margin:0; letter-spacing:-0.3px;">${trimmed.replace("###", "").trim()}</h3>
          </div>
        `;
      }
      if (trimmed.startsWith("* ")) {
        return `
          <div style="display:flex; align-items:flex-start; gap:8px; margin:6px 0 6px 12px;">
            <span style="color:#c1a648; font-weight:bold; font-size:16px;">✦</span>
            <div class="body-text" style="font-size:13.5px; line-height:1.65; font-weight:500;">
              ${trimmed.replace("* ", "").replace(/\*\*(.*?)\*\*/g, "<strong class='highlight-text'>$1</strong>")}
            </div>
          </div>
        `;
      }
      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ")) {
        return `
          <div style="display:flex; align-items:flex-start; gap:8px; margin:6px 0 6px 12px;">
            <span class="step-num" style="font-weight:900; font-size:11px; padding:2px 7px; border-radius:6px;">${trimmed.slice(0, 2)}</span>
            <div class="body-text" style="font-size:13.5px; line-height:1.65; font-weight:500;">
              ${trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong class='highlight-text'>$1</strong>")}
            </div>
          </div>
        `;
      }
      if (trimmed.startsWith("GET ") || trimmed.startsWith("Host:") || trimmed.startsWith("<!DOCTYPE html>") || trimmed.startsWith("git ")) {
        return `
          <div class="code-card" style="padding:14px 18px; border-radius:10px; margin:14px 0; font-family:'Fira Code', 'Courier New', monospace; font-size:12px; overflow-x:auto;">
            <code>${trimmed}</code>
          </div>
        `;
      }
      return `
        <p class="body-text" style="font-size:13.5px; line-height:1.75; margin:8px 0; font-weight:450;">
          ${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="highlight-text">$1</strong>')}
        </p>
      `;
    })
    .join("");

  const exerciseHtml = exercise
    ? `
    <div class="quiz-card" style="margin-top:32px; padding:20px; border-radius:16px; text-align:left;">
      <div style="display:flex; align-items:center; justify-between; margin-bottom:10px;">
        <span style="background:#059669; color:#ffffff; font-size:10px; font-weight:900; text-transform:uppercase; tracking-wider; padding:3px 10px; border-radius:20px;">ACADEMY KNOWLEDGE VERIFICATION</span>
        <span style="color:#10b981; font-size:12px; font-weight:800;">✓ Instant Self-Check</span>
      </div>
      <p class="quiz-question" style="font-weight:800; font-size:14.5px; margin:0 0 14px 0; line-height:1.5;">${exercise.question}</p>
      <div style="display:grid; gap:8px;">
        ${exercise.options
          .map(
            (opt) =>
              `<div class="quiz-option ${opt === exercise.correctAnswer ? 'correct-option' : ''}" style="padding:10px 14px; border-radius:10px; font-size:13px; font-weight:${opt === exercise.correctAnswer ? '800' : '500'}; display:flex; align-items:center; justify-content:space-between;">
                <span>${opt}</span>
                ${opt === exercise.correctAnswer ? '<span style="background:#059669; color:#ffffff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:12px;">✔ Correct Answer</span>' : ''}
              </div>`
          )
          .join("")}
      </div>
    </div>
  `
    : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title} — Nextsem Academy Brochure</title>
        <style>
          @page { size: A4; margin: 12mm 15mm 15mm 15mm; }
          
          /* Common Styles */
          body { font-family: 'Segoe UI', system-ui, -apple-system, Roboto, sans-serif; padding: 0; margin: 0; transition: background 0.3s, color 0.3s; }
          
          /* Top Interactive Toolbar (Hidden in Print) */
          .toolbar { display: flex; align-items: center; justify-content: space-between; background: #0f172a; border-bottom: 2px solid #334155; padding: 12px 20px; font-size: 13px; font-weight: 700; color: #f8fafc; position: sticky; top: 0; z-index: 100; shadow: 0 4px 12px rgba(0,0,0,0.3); }
          .toolbar-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 8px; border: 1px solid #475569; background: #1e293b; color: #f8fafc; font-size: 12px; font-weight: 800; cursor: pointer; transition: all 0.2s; }
          .toolbar-btn:hover { background: #334155; border-color: #c1a648; }
          .toolbar-btn.active { background: #c1a648; color: #090d16; border-color: #e4ca67; }
          
          @media print {
            .no-print { display: none !important; }
          }

          /* ── DARK THEME (DEFAULT) ── */
          body.dark-mode { background: #090d16; color: #e2e8f0; }
          body.dark-mode .brochure-header { border-bottom: 3px solid #c1a648; }
          body.dark-mode .brand-title { color: #f8fafc; }
          body.dark-mode .brand-subtitle { color: #e4ca67; }
          body.dark-mode .hero-card { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 2px solid #c1a648; box-shadow: 0 12px 30px rgba(0,0,0,0.4); }
          body.dark-mode .lesson-title { color: #ffffff; }
          body.dark-mode .chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
          body.dark-mode .section-title { color: #e4ca67; }
          body.dark-mode .body-text { color: #cbd5e1; }
          body.dark-mode .highlight-text { color: #fef08a; background: rgba(193,166,72,0.25); padding: 1px 5px; border-radius: 4px; }
          body.dark-mode .step-num { background: #1e293b; color: #e4ca67; border: 1px solid #334155; }
          body.dark-mode .code-card { background: #030712; border-left: 4px solid #c1a648; color: #e4ca67; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; border-bottom: 1px solid #1e293b; }
          body.dark-mode .quiz-card { background: linear-gradient(135deg, #042f2e 0%, #064e3b 100%); border: 2px solid #10b981; }
          body.dark-mode .quiz-question { color: #ecfdf5; }
          body.dark-mode .quiz-option { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; }
          body.dark-mode .quiz-option.correct-option { background: rgba(16,185,129,0.2); border-color: #10b981; color: #34d399; }
          body.dark-mode .brochure-footer { border-top: 2px solid #1e293b; color: #94a3b8; }
          body.dark-mode .footer-brand { color: #f8fafc; }

          /* ── LIGHT THEME (PRINTER-FRIENDLY INK SAVER) ── */
          body.light-mode { background: #ffffff; color: #1e293b; }
          body.light-mode .brochure-header { border-bottom: 3px solid #0f172a; }
          body.light-mode .brand-title { color: #0f172a; }
          body.light-mode .brand-subtitle { color: #967b26; }
          body.light-mode .hero-card { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 2px solid #0f172a; }
          body.light-mode .lesson-title { color: #ffffff; }
          body.light-mode .chip { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #e2e8f0; }
          body.light-mode .section-title { color: #0f172a; }
          body.light-mode .body-text { color: #334155; }
          body.light-mode .highlight-text { color: #0f172a; background: #fef08a; padding: 1px 5px; border-radius: 4px; }
          body.light-mode .step-num { background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; }
          body.light-mode .code-card { background: #f8fafc; border-left: 4px solid #0f172a; color: #0f172a; border: 1px solid #e2e8f0; border-left-width: 4px; }
          body.light-mode .quiz-card { background: #f0fdf4; border: 2px solid #059669; }
          body.light-mode .quiz-question { color: #064e3b; }
          body.light-mode .quiz-option { background: #ffffff; border: 1px solid #e2e8f0; color: #334155; }
          body.light-mode .quiz-option.correct-option { background: #dcfce7; border-color: #059669; color: #064e3b; }
          body.light-mode .brochure-footer { border-top: 2px solid #e2e8f0; color: #64748b; }
          body.light-mode .footer-brand { color: #0f172a; }

          /* Brochure Shared Elements */
          .brochure-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; margin-top: 14px; }
          .logo-container { display: flex; align-items: center; gap: 12px; }
          .svg-logo { width: 44px; height: 44px; }
          .brand-title { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; line-height: 1; }
          .brand-subtitle { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 3px; }
          .doc-badge { background: linear-gradient(135deg, #e4ca67 0%, #c1a648 100%); color: #0f172a; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; }

          .hero-card { color: #ffffff; padding: 24px; border-radius: 16px; margin: 20px 0; position: relative; overflow: hidden; }
          .subject-chip { display: inline-block; background: rgba(193,166,72,0.25); color: #e4ca67; border: 1px solid rgba(193,166,72,0.4); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; border-radius: 20px; }
          .chips-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
          .chip strong { color: #e4ca67; }

          .content-box { font-size: 13.5px; line-height: 1.75; text-align: left; }
          .brochure-footer { margin-top: 40px; padding-top: 20px; display: flex; align-items: center; justify-content: space-between; font-size: 11px; }
          .footer-brand { display: flex; align-items: center; gap: 8px; font-weight: 800; }
          .verify-link { color: #c1a648; font-weight: 900; text-decoration: none; border-bottom: 1.5px dashed #c1a648; }
        </style>
      </head>
      <body class="dark-mode">
        <!-- Interactive Top Toolbar (No-Print) -->
        <div class="toolbar no-print">
          <div>⚡ NEXTSEM ACADEMY PDF BROCHURE</div>
          <div style="display:flex; gap:8px;">
            <button id="btnDark" class="toolbar-btn active" onclick="setBrochureTheme('dark')">🌙 Dark Brochure</button>
            <button id="btnLight" class="toolbar-btn" onclick="setBrochureTheme('light')">☀️ Light (Ink Saver)</button>
            <button class="toolbar-btn" style="background:#c1a648; color:#090d16;" onclick="window.print()">🖨️ Print / Save PDF</button>
          </div>
        </div>

        <div style="padding:0 10px;">
          <!-- Header Bar -->
          <div class="brochure-header">
            <div class="logo-container">
              <svg class="svg-logo" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <rect width="512" height="512" rx="112" fill="#1e303f" stroke="#c1a648" stroke-width="16" stroke-opacity="0.5"/>
                <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="220" fill="#c1a648" letter-spacing="-10">NS</text>
                <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="64" fill="#fbfbfb" letter-spacing="-1">NextSem</text>
              </svg>
              <div>
                <div class="brand-title">NEXTSEM ACADEMY</div>
                <div class="brand-subtitle">Official Certified Curriculum Brochure</div>
              </div>
            </div>
            <span class="doc-badge">⚡ ${subject.toUpperCase()} BROCHURE</span>
          </div>

          <!-- Executive Hero Card -->
          <div class="hero-card">
            <span class="subject-chip">${unit}</span>
            <h1 class="lesson-title">${title}</h1>
            <div class="chips-row">
              <span class="chip">LANGUAGE: <strong>${lang.toUpperCase()}</strong></span>
              <span class="chip">MODE: <strong>${level.toUpperCase()}</strong></span>
              <span class="chip">INSTRUCTOR: <strong>Nextsem (Lead Instructor)</strong></span>
              <span class="chip">VERIFIED: <strong>✔ OFFICIAL NOTES</strong></span>
            </div>
          </div>

          <!-- Lesson Body -->
          <div class="content-box">
            ${formattedContent}
            ${exerciseHtml}
          </div>

          <!-- Footer -->
          <div class="brochure-footer">
            <div class="footer-brand">
              <span>⚡ Nextsem Academy Official Study Guide</span>
            </div>
            <div>
              Official Portal: <a href="https://nextsem.online" target="_blank" class="verify-link">https://nextsem.online</a>
            </div>
          </div>
        </div>

        <script>
          function setBrochureTheme(theme) {
            var body = document.body;
            var btnDark = document.getElementById('btnDark');
            var btnLight = document.getElementById('btnLight');
            if (theme === 'dark') {
              body.className = 'dark-mode';
              btnDark.className = 'toolbar-btn active';
              btnLight.className = 'toolbar-btn';
            } else {
              body.className = 'light-mode';
              btnLight.className = 'toolbar-btn active';
              btnDark.className = 'toolbar-btn';
            }
          }

          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    window.print();
  }
}
