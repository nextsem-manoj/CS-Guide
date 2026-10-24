"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Code2, 
  Copy, 
  Check, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  FileCode,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Filter,
  CheckCircle,
  Clock,
  Layers,
  ChevronRight,
  ListOrdered,
  BarChart3,
  ExternalLink,
  Target,
  Compass,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import { safeInstantCopy } from "@/lib/clipboard";
import { useCrossDeviceSync } from "@/context/CrossDeviceSyncContext";
import { NextSemEmblem } from "@/components/NextSemLogoBadge";

type LangMode = "english" | "hinglish";
type CategoryFilter = "all" | "basics" | "tables_lists" | "forms" | "semantic";

interface TestOption {
  id: string;
  textEn: string;
  textHi: string;
  isCorrect: boolean;
  feedbackEn: string;
  feedbackHi: string;
}

interface PracticalQuestion {
  id: number;
  sprintDay: number;
  categoryKey: "basics" | "tables_lists" | "forms" | "semantic";
  categoryLabel: string;
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  scenarioEn: string;
  scenarioHi: string;
  codeSnippet: string;
  snippetFileName: string;
  questionEn: string;
  questionHi: string;
  options: TestOption[];
  solutionCode?: string;
  takeawayEn: string;
  takeawayHi: string;
}

const SPRINT1_QUESTIONS: PracticalQuestion[] = [
  // ── DAY 1: BOILERPLATE & STANDARDS ──
  {
    id: 1,
    sprintDay: 1,
    categoryKey: "basics",
    categoryLabel: "HTML5 Boilerplate",
    badgeEn: "Day 01 • Document Standards",
    badgeHi: "Day 01 • Document Standards",
    titleEn: "Document Type Declaration & Quirks Mode Avoidance",
    titleHi: "<!DOCTYPE html> Declaration Aur Quirks Mode Se Bachna",
    scenarioEn: "A junior developer creates a new webpage but forgets to add the very first line of code:",
    scenarioHi: "Ek junior developer ne naya HTML page banaya par pehli line of code bhool gaya:",
    codeSnippet: `<!-- Line 1 is MISSING! -->
<html lang="en">
<head>
  <title>Student Portal</title>
</head>
<body>
  <h1>Welcome to NextSem Academy</h1>
</body>
</html>`,
    snippetFileName: "index.html",
    questionEn: "What happens when `<!DOCTYPE html>` is omitted from the very first line of an HTML document?",
    questionHi: "Agar HTML document ki pehli line par `<!DOCTYPE html>` na likha jaye to browser mein kya problem aati hai?",
    options: [
      {
        id: "q1-a",
        textEn: "Modern browsers fall back into legacy 'Quirks Mode', rendering CSS layouts inconsistently using obsolete 1999 box-model bugs.",
        textHi: "Browser purane 'Quirks Mode' mein chala jata hai jisse CSS layout toot jata hai aur 1999 ke bugged rules apply hone lagte hain.",
        isCorrect: true,
        feedbackEn: "Correct! <!DOCTYPE html> signals Google Chrome, Edge, and Safari to parse the document in strict modern W3C Standards mode.",
        feedbackHi: "Bilkul Sahi! <!DOCTYPE html> browser ko batata hai ki page ko modern W3C standards mode mein render karna hai."
      },
      {
        id: "q1-b",
        textEn: "The browser refuses to open the file and displays a fatal 404 HTTP server error.",
        textHi: "Browser file ko kholne se mana kar deta hai aur direct 404 error dikhata hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Browsers still parse the document, but in buggy Quirks Mode.",
        feedbackHi: "Galat: File khul jati hai par formatting toot jati hai (Quirks Mode)."
      },
      {
        id: "q1-c",
        textEn: "JavaScript execution is permanently blocked on the entire operating system.",
        textHi: "Poore computer par JavaScript hamesha ke liye block ho jati hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: JavaScript execution is not blocked by missing doctype declarations.",
        feedbackHi: "Galat: Doctype ka JS blocking se koi talluq nahi hai."
      },
      {
        id: "q1-d",
        textEn: "The page automatically converts into a PDF document.",
        textHi: "Page apne aap PDF document ban jata hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML never auto-converts to PDF without external converter libraries.",
        feedbackHi: "Galat: HTML bina external script ke PDF nahi banta."
      }
    ],
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Portal</title>
</head>
<body>
  <h1>Welcome to NextSem Academy</h1>
</body>
</html>`,
    takeawayEn: "Rule: Always start with <!DOCTYPE html> on Line 1 to guarantee standard W3C layout behavior across all devices.",
    takeawayHi: "Golden Rule: Har HTML document ki Line 1 par <!DOCTYPE html> likhna mandatory hai."
  },

  // ── DAY 2: HEADINGS & TEXT ──
  {
    id: 2,
    sprintDay: 2,
    categoryKey: "basics",
    categoryLabel: "Headings & Formatting",
    badgeEn: "Day 02 • Heading Outlines",
    badgeHi: "Day 02 • Heading Outlines",
    titleEn: "Heading Hierarchy & SEO Outline Rules",
    titleHi: "Heading Hierarchy (h1 Se h6) Ke Rules",
    scenarioEn: "A student wants to make a subheading look small, so they skip levels in their code:",
    scenarioHi: "Ek student ne text ko chota dikhane ke liye headings ke levels skip kar diye:",
    codeSnippet: `<body>
  <h1>University Portal</h1>
  <!-- Skipped h2 and jumped straight to h4 for smaller font: -->
  <h4>Faculty of Computer Applications</h4>
</body>`,
    snippetFileName: "headings.html",
    questionEn: "Why is skipping heading levels (e.g. jumping from <h1> directly to <h4>) considered a severe accessibility violation?",
    questionHi: "Heading levels ko skip karna (jaise <h1> se direct <h4> par jump karna) accessibility violation kyu mana jata hai?",
    options: [
      {
        id: "q2-a",
        textEn: "Screen reader users navigate webpages by stepping through heading levels (H1 ➔ H2 ➔ H3); skipping levels breaks the logical document outline.",
        textHi: "Blind users screen reader se H1 ➔ H2 ➔ H3 karke padhte hain; level chhodne se unka document structure confuse ho jata hai.",
        isCorrect: true,
        feedbackEn: "Correct! Screen reader software relies on hierarchical heading depth. Font size should be controlled via CSS, not by choosing incorrect heading tags.",
        feedbackHi: "Bilkul Sahi! Text chota ya bada karne ke liye CSS use karein, heading tags ko sirf semantic hierarchy ke liye use karein."
      },
      {
        id: "q2-b",
        textEn: "The HTML parser crashes and stops rendering the rest of the <body>.",
        textHi: "HTML parser crash ho jata hai aur baaki page render hona band ho jata hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML is forgiving and will render, but the accessibility tree is broken.",
        feedbackHi: "Galat: Page crash nahi hota par accessibility aur SEO kharab hota hai."
      },
      {
        id: "q2-c",
        textEn: "An HTML document can only contain <h4> if there are at least four paragraphs on the page.",
        textHi: "<h4> tabhi likh sakte hain jab page par kam se kam 4 paragraphs hon.",
        isCorrect: false,
        feedbackEn: "Incorrect: Heading rules have no dependency on paragraph count.",
        feedbackHi: "Galat: Paragraphs ki ginti se heading tag ka koi connection nahi hai."
      },
      {
        id: "q2-d",
        textEn: "Search engines ban domains that use <h4>.",
        textHi: "Google <h4> use karne wali websites ko block kar deta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <h4> is a standard tag when used sequentially below <h3>.",
        feedbackHi: "Galat: <h4> standard tag hai jab wo <h3> ke niche aaye."
      }
    ],
    solutionCode: `<body>
  <h1>University Portal</h1>
  <h2>Faculty of Computer Applications</h2>
  <p class="subtitle">BCA Semester 1 Practical Hub</p>
</body>`,
    takeawayEn: "Hierarchy Rule: Never choose heading tags for font size. Use H1 -> H2 -> H3 logically and style visually with CSS.",
    takeawayHi: "Golden Rule: Size ke liye heading tag mat chuno! H1 ke baad H2, fir H3 aana chahiye."
  },

  // ── DAY 3: LINKS & SECURITY ──
  {
    id: 3,
    sprintDay: 3,
    categoryKey: "basics",
    categoryLabel: "Hyperlinks & Security",
    badgeEn: "Day 03 • Security Best Practice",
    badgeHi: "Day 03 • Security Best Practice",
    titleEn: "Secure New Tab Hyperlinks: target='_blank' & rel='noopener'",
    titleHi: "Target='_blank' Ke Sath rel='noopener' Lagana Kyu Zaroori Hai?",
    scenarioEn: "You are creating an external link to GitHub that opens in a fresh browser tab:",
    scenarioHi: "Aap student portfolio mein GitHub ka external link de rahe hain jo naye tab mein khulta hai:",
    codeSnippet: `<!-- Which external link follows modern cybersecurity standards? -->
<!-- Option 1 -->
<a href="https://github.com/nextsem" target="_blank">View GitHub</a>

<!-- Option 2 -->
<a href="https://github.com/nextsem" target="_blank" rel="noopener noreferrer">View GitHub</a>`,
    snippetFileName: "portfolio.html",
    questionEn: "Why is Option 2 with `rel='noopener noreferrer'` strictly required when using `target='_blank'`?",
    questionHi: "Target='_blank' ke sath `rel='noopener noreferrer'` lagana kyu mandatory security standard hai?",
    options: [
      {
        id: "q3-a",
        textEn: "It prevents 'reverse tabnabbing' phishing attacks where the opened page gains access to the original page via window.opener.",
        textHi: "Yeh 'tabnabbing' attack se bachata hai jahan nayi website purani window ko hijack (window.opener) karke fake login page par redirect kar sakti hai.",
        isCorrect: true,
        feedbackEn: "Correct! Without 'noopener', the new tab can execute `window.opener.location = 'phishing-url'`, silently hijacking the user's original tab.",
        feedbackHi: "Bilkul Sahi! Bina noopener ke dusri website aapke original page ka address badal sakti hai."
      },
      {
        id: "q3-b",
        textEn: "Without 'noopener', the target website will automatically deduct money from the user's credit card.",
        textHi: "Bina noopener ke dusri site user ke bank account se paise kaat leti hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Hyperlinks cannot trigger financial transactions without authorization.",
        feedbackHi: "Galat: Link se bank account ka koi relation nahi hai."
      },
      {
        id: "q3-c",
        textEn: "It compresses the link so mobile 4G data is saved.",
        textHi: "Yeh link ko compress karke mobile data bachata hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: rel='noopener' is a security context isolation attribute, not data compression.",
        feedbackHi: "Galat: Yeh security feature hai, data compression nahi."
      },
      {
        id: "q3-d",
        textEn: "Target='_blank' links won't turn blue without rel='noopener'.",
        textHi: "Target='_blank' wale link bina noopener ke blue color ke nahi bante.",
        isCorrect: false,
        feedbackEn: "Incorrect: Link coloring is governed by browser user-agent stylesheets and CSS.",
        feedbackHi: "Galat: Link color CSS se control hota hai."
      }
    ],
    solutionCode: `<a href="https://github.com/my-profile" target="_blank" rel="noopener noreferrer">
  Visit My Official GitHub Portfolio ↗
</a>`,
    takeawayEn: "Security Standard: Always pair target='_blank' with rel='noopener noreferrer' to isolate execution contexts.",
    takeawayHi: "Security Rule: Jab bhi target='_blank' likhein, rel='noopener noreferrer' hamesha lagayein."
  },

  // ── DAY 4: LISTS & TABLES ──
  {
    id: 4,
    sprintDay: 4,
    categoryKey: "tables_lists",
    categoryLabel: "Tables & Matrices",
    badgeEn: "Day 04 • Table Cell Merging",
    badgeHi: "Day 04 • Table Cell Merging",
    titleEn: "Table Merging: colspan vs rowspan Distinction",
    titleHi: "Table Mein Cells Merge Karna: colspan vs rowspan",
    scenarioEn: "In your BCA Semester 1 mark sheet table, you want a single cell titled 'Grand Total' to merge across 3 horizontal columns:",
    scenarioHi: "Aapko marksheet table mein 'Grand Total' wali cell ko 3 columns ke barabar chauda (horizontal merge) karna hai:",
    codeSnippet: `<tr>
  <!-- Which attribute merges across 3 horizontal columns? -->
  <td _________="3">Grand Total</td>
  <td>450 / 500</td>
</tr>`,
    snippetFileName: "marksheet.html",
    questionEn: "Which attribute correctly merges cells across horizontal columns in an HTML table?",
    questionHi: "HTML table mein horizontal columns ko jodkar merge karne ke liye kaunsa attribute use hota hai?",
    options: [
      {
        id: "q4-a",
        textEn: "colspan='3' — because it spans the cell horizontally across multiple columns.",
        textHi: "colspan='3' — kyunki yeh cell ko horizontal columns mein merge karta hai.",
        isCorrect: true,
        feedbackEn: "Correct! `colspan` combines columns horizontally across the row; `rowspan` combines rows vertically down the column.",
        feedbackHi: "Bilkul Sahi! `colspan` columns ko merge karta hai; `rowspan` vertical rows ko merge karta hai."
      },
      {
        id: "q4-b",
        textEn: "rowspan='3' — because rows and columns are interchangeable in HTML5.",
        textHi: "rowspan='3' — kyunki HTML5 mein rows aur columns ek barabar hote hain.",
        isCorrect: false,
        feedbackEn: "Incorrect: rowspan spans vertically downward, which would corrupt the table rows.",
        feedbackHi: "Galat: rowspan vertical rows ko niche merge karta hai, horizontal ko nahi."
      },
      {
        id: "q4-c",
        textEn: "merge='3' — the universal HTML cell merger tag.",
        textHi: "merge='3' — universal cell merge attribute.",
        isCorrect: false,
        feedbackEn: "Incorrect: No such attribute named 'merge' exists in HTML.",
        feedbackHi: "Galat: HTML mein 'merge' naam ka koi attribute nahi hota."
      },
      {
        id: "q4-d",
        textEn: "width='300%' — expands the cell using inline styles.",
        textHi: "width='300%' — inline style se cell chauda karta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Width controls pixel/percent size, not table structural column spanning.",
        feedbackHi: "Galat: Width sirf size badalta hai, cells ko merge nahi karta."
      }
    ],
    solutionCode: `<tr>
  <td colspan="3">Grand Total (Semester 1)</td>
  <td><strong>450 / 500</strong></td>
</tr>`,
    takeawayEn: "Mnemonic: Colspan = Columns sideways (horizontal). Rowspan = Rows downward (vertical).",
    takeawayHi: "Short Trick: Colspan = Columns ko jodo (sideways). Rowspan = Rows ko jodo (niche)."
  },

  // ── DAY 5: FORMS & SUBMISSION ──
  {
    id: 5,
    sprintDay: 5,
    categoryKey: "forms",
    categoryLabel: "HTML Forms & Inputs",
    badgeEn: "Day 05 • Backend Serialization",
    badgeHi: "Day 05 • Backend Serialization",
    titleEn: "The Silent Submission Bug: The Mandatory `name` Attribute",
    titleHi: "Form Submission Ki Sabse Badi Galti: `name` Attribute",
    scenarioEn: "A student codes a registration form. When submitted, the backend server receives an empty `{}` payload:",
    scenarioHi: "Student ne form banaya par submit karne par server ko blank `{}` data receive hua:",
    codeSnippet: `<form action="/register" method="POST">
  <label for="uname">Your Name:</label>
  <input type="text" id="uname" placeholder="Rahul Sharma" required>
  <button type="submit">Register Now</button>
</form>`,
    snippetFileName: "registration.html",
    questionEn: "Why did the server receive zero data from the `<input>` field upon form submission?",
    questionHi: "Form submit hone par server tak input ka data kyu nahi pahuncha?",
    options: [
      {
        id: "q5-a",
        textEn: "The `name` attribute was omitted; browsers only serialize and submit inputs that have an explicit `name` attribute.",
        textHi: "Input par `name` attribute nahi tha; browser sirf unhi inputs ko bhejta hai jinpar `name` attribute hota hai.",
        isCorrect: true,
        feedbackEn: "Correct! The `id` attribute is purely for CSS/JS/DOM identification. The `name` attribute defines the key sent to the backend server.",
        feedbackHi: "Bilkul Sahi! `id` sirf styling aur label ke liye hota hai; server ko bhejne ke liye `name` attribute zaroori hai."
      },
      {
        id: "q5-b",
        textEn: "The input was missing the `disabled` attribute.",
        textHi: "Input par `disabled` attribute missing tha.",
        isCorrect: false,
        feedbackEn: "Incorrect: The `disabled` attribute actually prevents submission!",
        feedbackHi: "Galat: Disabled attribute lagane se ulta input band ho jata hai."
      },
      {
        id: "q5-c",
        textEn: "Modern browsers require input elements to have a closing `</input>` tag.",
        textHi: "Modern browsers mein input ka closing tag `</input>` hona zaroori hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: `<input>` is a void element and must never have a closing tag.",
        feedbackHi: "Galat: `<input>` self-closing void element hai."
      },
      {
        id: "q5-d",
        textEn: "Forms cannot use method='POST' without paying for a paid SSL certificate.",
        textHi: "Bina paid SSL certificate ke POST method kaam nahi karta.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTTP POST works on localhost and all standard servers.",
        feedbackHi: "Galat: POST method localhost aur sabhi servers pe free chalta hai."
      }
    ],
    solutionCode: `<form action="/register" method="POST">
  <label for="uname">Your Name:</label>
  <input type="text" id="uname" name="fullName" placeholder="Rahul Sharma" required>
  <button type="submit">Register Now</button>
</form>`,
    takeawayEn: "Junior Dev Rule #1: `id` is for CSS & Labels. `name` is for the Backend Server. Always include both!",
    takeawayHi: "Golden Rule: `id` frontend ke liye hai aur `name` backend server ke liye hai. Dono lagao!"
  },

  // ── DAY 5: RADIO BUTTON MUTUAL EXCLUSION ──
  {
    id: 6,
    sprintDay: 5,
    categoryKey: "forms",
    categoryLabel: "Form Controls",
    badgeEn: "Day 05 • Radio Logic",
    badgeHi: "Day 05 • Radio Logic",
    titleEn: "Enforcing Mutual Exclusion in Radio Button Groups",
    titleHi: "Radio Buttons Mein Ek Waqt Pe Sirf Ek Select Kaise Karwayein?",
    scenarioEn: "On an exam application form, users must choose either 'Regular' or 'Distance' student mode. In buggy code, users can select both at once:",
    scenarioHi: "Form par user ko 'Regular' ya 'Distance' mein se ek chunna tha, par bug ki wajah se dono tick ho rahe hain:",
    codeSnippet: `<!-- ❌ BUGGY: Both radio buttons can be checked simultaneously! -->
<input type="radio" id="reg" name="isRegular" value="regular">
<label for="reg">Regular Student</label>

<input type="radio" id="dist" name="isDistance" value="distance">
<label for="dist">Distance Student</label>`,
    snippetFileName: "admission.html",
    questionEn: "How do you fix this code so that selecting one radio button automatically deselects the other?",
    questionHi: "Is code ko kaise fix karein taaki ek radio button select karne par dusra automatically uncheck ho jaye?",
    options: [
      {
        id: "q6-a",
        textEn: "Assign the exact same `name` attribute value to both radio buttons (e.g. `name='studentMode'`).",
        textHi: "Dono radio buttons ka `name` attribute EXACT SAME kardo (jaise `name='studentMode'`).",
        isCorrect: true,
        feedbackEn: "Correct! Radio buttons are grouped by their `name` attribute. All inputs sharing the same `name` form a mutually exclusive toggle group.",
        feedbackHi: "Bilkul Sahi! Radio buttons group tabhi bante hain jab sabhi ka `name` identical ho."
      },
      {
        id: "q6-b",
        textEn: "Change `type='radio'` to `type='checkbox'` on both inputs.",
        textHi: "Dono inputs ka type badal kar `checkbox` kardo.",
        isCorrect: false,
        feedbackEn: "Incorrect: Checkboxes are explicitly designed for multiple independent selections.",
        feedbackHi: "Galat: Checkbox lagane se dono alag-alag tick ho jayenge."
      },
      {
        id: "q6-c",
        textEn: "Delete the `<label>` tags.",
        textHi: "Label tags ko delete kardo.",
        isCorrect: false,
        feedbackEn: "Incorrect: Labels do not dictate mutual exclusion logic.",
        feedbackHi: "Galat: Labels se radio exclusion logic decide nahi hota."
      },
      {
        id: "q6-d",
        textEn: "Radio buttons cannot be mutually exclusive without installing a React library.",
        textHi: "Bina React library ke radio buttons mutually exclusive nahi ho sakte.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML natively handles this when inputs share the same `name`.",
        feedbackHi: "Galat: HTML bina kisi JS library ke khud handle karta hai."
      }
    ],
    solutionCode: `<!-- ✅ PRODUCTION STANDARD: Shared name groups them together -->
<input type="radio" id="reg" name="studentMode" value="regular" checked>
<label for="reg">Regular Student</label>

<input type="radio" id="dist" name="studentMode" value="distance">
<label for="dist">Distance Student</label>`,
    takeawayEn: "Rule: For radio buttons to be mutually exclusive, every radio in that set MUST have the identical `name` attribute.",
    takeawayHi: "Golden Rule: Ek group ke sabhi radio buttons ka `name` attribute exact match hona chahiye."
  },

  // ── DAY 6: SEMANTIC ARCHITECTURE (MAIN LANDMARK) ──
  {
    id: 7,
    sprintDay: 6,
    categoryKey: "semantic",
    categoryLabel: "Semantic Landmarks",
    badgeEn: "Day 06 • W3C Rule",
    badgeHi: "Day 06 • W3C Rule",
    titleEn: "The Cardinal Rule of the <main> Semantic Landmark",
    titleHi: "<main> Landmark Ka Cardinal Rule Pehchano",
    scenarioEn: "A developer writes the following document skeleton for a student dashboard:",
    scenarioHi: "Ek developer ne student dashboard ke liye yeh document structure likha:",
    codeSnippet: `<body>
  <header>
    <h1>NextSem BCA Portal</h1>
    <main>
      <p>Today's Practical: Day 6 HTML Semantics</p>
    </main>
  </header>
  <main>
    <section>
      <h2>Active Assignments</h2>
    </section>
  </main>
</body>`,
    snippetFileName: "portal.html",
    questionEn: "What is the critical W3C HTML5 specification violation in this snippet?",
    questionHi: "Is code snippet mein W3C HTML5 specification ka kaunsa rule toda gaya hai?",
    options: [
      {
        id: "q7-a",
        textEn: "A document can only have ONE visible <main> element, and <main> must NEVER be nested inside <header>, <nav>, <aside>, or <footer>.",
        textHi: "Page par sirf 1 visible <main> tag ho sakta hai, aur <main> ko kabhi <header>, <nav>, <aside> ya <footer> ke andar nest nahi kiya ja sakta.",
        isCorrect: true,
        feedbackEn: "Correct! The W3C specification strictly dictates that <main> holds the unique primary content and cannot be inside other landmark containers.",
        feedbackHi: "Bilkul Sahi! <main> sirf 1 hota hai aur kisi landmark ke andar nest nahi ho sakta."
      },
      {
        id: "q7-b",
        textEn: "<header> is only allowed inside <footer>.",
        textHi: "<header> sirf <footer> ke andar likha ja sakta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <header> belongs at the top of sections or the page.",
        feedbackHi: "Galat: <header> introductory area mein aata hai."
      },
      {
        id: "q7-c",
        textEn: "<section> tags cannot have headings inside them.",
        textHi: "<section> ke andar headings nahi likhi ja sakti.",
        isCorrect: false,
        feedbackEn: "Incorrect: Every <section> should ideally have a heading.",
        feedbackHi: "Galat: Section ke andar heading zaroori hoti hai."
      },
      {
        id: "q7-d",
        textEn: "HTML5 removed <main> in 2026.",
        textHi: "HTML5 ne 2026 mein <main> tag delete kar diya.",
        isCorrect: false,
        feedbackEn: "Incorrect: <main> is a core permanent HTML5 landmark.",
        feedbackHi: "Galat: <main> permanent W3C standard landmark hai."
      }
    ],
    solutionCode: `<body>
  <header>
    <h1>NextSem BCA Portal</h1>
    <p class="tagline">Today's Practical: Day 6 HTML Semantics</p>
  </header>

  <!-- Single primary <main> element -->
  <main>
    <section>
      <h2>Active Assignments</h2>
    </section>
  </main>
</body>`,
    takeawayEn: "Rule: Exactly ONE visible <main> per document. Never put <main> inside <header> or <footer>.",
    takeawayHi: "Golden Rule: Poore page par sirf 1 visible <main> tag. Isko header ya footer mein mat daalo."
  },

  // ── DAY 6: ARTICLE VS SECTION ──
  {
    id: 8,
    sprintDay: 6,
    categoryKey: "semantic",
    categoryLabel: "Content Syndication",
    badgeEn: "Day 06 • Syndication Architecture",
    badgeHi: "Day 06 • Syndication Architecture",
    titleEn: "<article> vs <section> Architectural Decision",
    titleHi: "Standalone Content Ke Liye <article> vs <section>",
    scenarioEn: "You are designing an online magazine layout featuring standalone articles with their own author, publication date, and comments.",
    scenarioHi: "Aap ek online magazine layout bana rahe hain jisme independent technical articles hain:",
    codeSnippet: `<!-- Which wrapper is semantically correct for each standalone article? -->
<_________ id="article-42">
  <header>
    <h2>Mastering Web Development in BCA</h2>
    <p>By Er. Manoj Kumar on Oct 24, 2026</p>
  </header>
  <p>Building real-world projects is the fastest path to software engineering roles...</p>
  <footer>
    <p>3 Comments &bull; Share on LinkedIn</p>
  </footer>
</_________>`,
    snippetFileName: "magazine.html",
    questionEn: "Why is `<article>` the semantically correct choice here instead of `<section>`?",
    questionHi: "Yahan `<section>` ke bajaye `<article>` use karna kyu semantically sahi hai?",
    options: [
      {
        id: "q8-a",
        textEn: "<article> represents a self-contained, independently syndicatable composition that makes sense on its own if distributed in an RSS feed or email.",
        textHi: "<article> standalone, self-contained content hota hai jo bina baaki website ke bhi poora sense banaye (jaise RSS feed ya newsletter mein).",
        isCorrect: true,
        feedbackEn: "Correct! The W3C specification defines <article> as a complete self-contained item suitable for independent distribution. <section> is for generic thematic grouping.",
        feedbackHi: "Bilkul Sahi! Standalone, independent articles ke liye <article> correct choice hai."
      },
      {
        id: "q8-b",
        textEn: "<section> tags only accept numbers, while <article> accepts letters.",
        textHi: "<section> mein sirf numbers likhe ja sakte hain aur <article> mein letters.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML text nodes accept all characters regardless of container.",
        feedbackHi: "Galat: Dono text accept karte hain."
      },
      {
        id: "q8-c",
        textEn: "<article> tags load 10x faster because Google hosts them on special servers.",
        textHi: "<article> tags Google ke server se 10x fast load hote hain.",
        isCorrect: false,
        feedbackEn: "Incorrect: Tag names do not affect hosting server speed.",
        feedbackHi: "Galat: Tag name se loading server speed ka koi lena dena nahi."
      },
      {
        id: "q8-d",
        textEn: "Using <section> causes the browser window to shrink by 50%.",
        textHi: "Section use karne se browser window 50% choti ho jati hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Window sizing is never modified by semantic tags.",
        feedbackHi: "Galat: Semantic tag se browser window shrink nahi hoti."
      }
    ],
    solutionCode: `<article id="article-42">
  <header>
    <h2>Mastering Web Development in BCA</h2>
    <p>By Er. Manoj Kumar on <time datetime="2026-10-24">Oct 24, 2026</time></p>
  </header>
  <p>Building real-world projects is the fastest path to software engineering roles...</p>
  <footer>
    <p>3 Comments &bull; Share on LinkedIn</p>
  </footer>
</article>`,
    takeawayEn: "Mental Model: If it could be printed on a separate sheet of paper and make complete sense on its own, it's an <article>.",
    takeawayHi: "Mental Model: Agar content ko akele print karein aur uska poora matlab nikle, to wo <article> hai."
  },

  // ── DAY 6: MULTIPLE NAV LANDMARKS & ARIA-LABEL ──
  {
    id: 9,
    sprintDay: 6,
    categoryKey: "semantic",
    categoryLabel: "Accessibility (a11y)",
    badgeEn: "Day 06 • Nav Landmarks",
    badgeHi: "Day 06 • Nav Landmarks",
    titleEn: "Disambiguating Multiple <nav> Landmarks with aria-label",
    titleHi: "Multiple <nav> Tags Ko Screen Readers Ke Liye Disambiguate Karna",
    scenarioEn: "A webpage contains a header navigation bar for courses and a footer navigation bar for legal policies.",
    scenarioHi: "Ek webpage par top menu bhi hai aur footer mein legal privacy links ka menu bhi hai:",
    codeSnippet: `<header>
  <nav aria-label="Main Navigation">
    <ul><li><a href="/">Home</a></li></ul>
  </nav>
</header>
<footer>
  <nav aria-label="Legal and Privacy Links">
    <ul><li><a href="/privacy">Privacy</a></li></ul>
  </nav>
</footer>`,
    snippetFileName: "accessible-site.html",
    questionEn: "Why is `aria-label` vital when a document contains more than one `<nav>` element?",
    questionHi: "Jab document mein ek se zyada `<nav>` hote hain to `aria-label` kyu zaroori hota hai?",
    options: [
      {
        id: "q9-a",
        textEn: "Screen readers announce the label (e.g. 'Main Navigation, landmark') so visually impaired students can distinguish between the two menus.",
        textHi: "Screen reader user ko bolkar sunata hai ('Main Navigation' vs 'Legal Links') jisse blind students dono menus ko pehchan sakein.",
        isCorrect: true,
        feedbackEn: "Correct! Assistive tech lists landmarks by label. Without aria-label, both appear identical as 'navigation', confusing users.",
        feedbackHi: "Bilkul Sahi! Bina aria-label ke screen reader dono ko sirf 'navigation' bolega."
      },
      {
        id: "q9-b",
        textEn: "Without aria-label, links in the footer become unclickable.",
        textHi: "Bina aria-label ke footer ke links par click hona band ho jata hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Links remain clickable; accessibility identification is lost.",
        feedbackHi: "Galat: Click hota hai par accessibility violate hoti hai."
      },
      {
        id: "q9-c",
        textEn: "It is required for Google AdSense revenue calculations.",
        textHi: "AdSense revenue calculate karne ke liye zaroori hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Ad networks do not rely on aria-label for impressions.",
        feedbackHi: "Galat: AdSense se iska koi lena dena nahi."
      },
      {
        id: "q9-d",
        textEn: "aria-label forces the browser to open the link in a dark mode window.",
        textHi: "aria-label link ko dark mode mein kholta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: ARIA attributes are for accessibility, not dark mode rendering.",
        feedbackHi: "Galat: ARIA attributes accessibility ke liye hote hain."
      }
    ],
    solutionCode: `<nav aria-label="Main Navigation">
  <ul><li><a href="/">Home</a></li></ul>
</nav>
<nav aria-label="Footer Legal">
  <ul><li><a href="/privacy">Privacy</a></li></ul>
</nav>`,
    takeawayEn: "Rule: Always add unique `aria-label` values when multiple <nav> elements are present on a single page.",
    takeawayHi: "Golden Rule: Jab bhi ek page par 2 menu hon, dono par alag-alag `aria-label` lagayein."
  },

  // ── DAY 6: CAPTIONING MEDIA WITH FIGURE ──
  {
    id: 10,
    sprintDay: 6,
    categoryKey: "semantic",
    categoryLabel: "Media Semantics",
    badgeEn: "Day 06 • Figure & Caption",
    badgeHi: "Day 06 • Figure & Caption",
    titleEn: "Semantically Associating Code & Media with <figure> & <figcaption>",
    titleHi: "<figure> Aur <figcaption> Se Code Snippet Ko Caption Dena",
    scenarioEn: "In an educational tutorial, you are displaying an illustrative code snippet along with its official caption:",
    scenarioHi: "Tutorial document mein aapko ek code block aur uska official title/caption display karna hai:",
    codeSnippet: `<figure>
  <pre><code>console.log("Welcome BCA Practical!");</code></pre>
  <figcaption>Listing 6.1: JavaScript Console Verification</figcaption>
</figure>`,
    snippetFileName: "tutorial.html",
    questionEn: "What is the technical advantage of using `<figure>` and `<figcaption>` over placing `<pre>` and a plain `<p class='caption'>` inside a `<div>`?",
    questionHi: "Plain `<p>` ke bajaye `<figure>` aur `<figcaption>` use karne ka main technical advantage kya hota hai?",
    options: [
      {
        id: "q10-a",
        textEn: "It programmatically establishes a 1-to-1 semantic parent-child relationship in the browser Accessibility Tree, explicitly informing assistive tech that the caption belongs to this specific code listing.",
        textHi: "Yeh browser ke Accessibility Tree mein code aur caption ko ek sath jodta hai, jisse screen reader samajh pata hai ki yeh caption isi code ka hai.",
        isCorrect: true,
        feedbackEn: "Correct! The <figure> and <figcaption> pair explicitly couples media, diagrams, or code listings with their explanatory labels under WCAG standards.",
        feedbackHi: "Bilkul Sahi! <figure> aur <figcaption> WCAG standard ke mutabiq caption aur content ka direct relation banate hain."
      },
      {
        id: "q10-b",
        textEn: "<figcaption> automatically translates the code into 50 foreign languages.",
        textHi: "<figcaption> code ko automatically 50 languages mein translate kar deta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML markups do not auto-translate code syntax.",
        feedbackHi: "Galat: HTML khud code translate nahi karta."
      },
      {
        id: "q10-c",
        textEn: "<figure> tags execute the code inside the GPU hardware chip.",
        textHi: "<figure> tag code ko GPU chip ke andar run karta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <figure> is purely structural semantic markup.",
        feedbackHi: "Galat: Figure sirf structural tag hai."
      },
      {
        id: "q10-d",
        textEn: "Plain `<p>` tags are not permitted on pages that use CSS.",
        textHi: "CSS use karne wale page par plain `<p>` tag allow nahi hota.",
        isCorrect: false,
        feedbackEn: "Incorrect: Paragraph tags are universally permitted across all HTML documents.",
        feedbackHi: "Galat: Paragraph tags hamesha valid hote hain."
      }
    ],
    solutionCode: `<figure>
  <pre><code>console.log("Welcome BCA Practical!");</code></pre>
  <figcaption>Listing 6.1: JavaScript Console Verification</figcaption>
</figure>`,
    takeawayEn: "Pairing Standard: Always pair illustrative code snippets, diagrams, and photos with <figure> and <figcaption>.",
    takeawayHi: "Golden Rule: Diagrams aur code listings ke liye hamesha <figure> aur <figcaption> ka pair use karein."
  },

  // ── DAY 6: MACHINE-READABLE TIME ──
  {
    id: 11,
    sprintDay: 6,
    categoryKey: "semantic",
    categoryLabel: "Metadata & SEO",
    badgeEn: "Day 06 • Time Element",
    badgeHi: "Day 06 • Time Element",
    titleEn: "Machine-Readable Dates with <time datetime='...'>",
    titleHi: "Dates Ko Machine-Readable <time> Se Encode Karna",
    scenarioEn: "The university announces: 'Practical Viva Examination scheduled for November 15, 2026 at 10:00 AM.'",
    scenarioHi: "Notice board par practical viva exam ki date publish karni hai:",
    codeSnippet: `<!-- Snippet A: Plain text -->
<p>Viva Date: Nov 15, 2026 at 10 AM</p>

<!-- Snippet B: Semantic HTML5 -->
<p>Viva Date: <time datetime="2026-11-15T10:00">Nov 15, 2026 at 10 AM</time></p>`,
    snippetFileName: "exam-date.html",
    questionEn: "Why is Snippet B with `<time datetime='...'>` vastly superior for search engines, smartphones, and web apps?",
    questionHi: "Plain text ke muqable `<time datetime='...'>` lagane ka sabse bada fayda kya hai?",
    options: [
      {
        id: "q11-a",
        textEn: "The ISO-8601 datetime format allows search engine crawlers, Google Calendar, and smartphones to parse the exact timestamp unambiguously and offer 1-click 'Add to Calendar' actions.",
        textHi: "ISO-8601 standard ki wajah se Google crawlers aur phone calendars exact date/time samajh kar 1-click 'Add to Calendar' ka option dikha sakte hain.",
        isCorrect: true,
        feedbackEn: "Correct! The <time> tag bridges human natural language ('Nov 15 at 10 AM') with machine-readable precision (2026-11-15T10:00).",
        feedbackHi: "Bilkul Sahi! Computers ko ISO-8601 date format chahiye hota hai calendar integration aur search indexing ke liye."
      },
      {
        id: "q11-b",
        textEn: "Snippet B prevents students from opening the webpage before November 15.",
        textHi: "Snippet B students ko 15 November se pehle page kholne se rokta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML cannot restrict page view access without backend auth.",
        feedbackHi: "Galat: HTML access control nahi karta."
      },
      {
        id: "q11-c",
        textEn: "The `<time>` tag makes the webpage refresh every second like a digital watch.",
        textHi: "`<time>` tag webpage ko ghadi ki tarah har second refresh karta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <time> is a static semantic element.",
        feedbackHi: "Galat: <time> static tag hai, live clock nahi."
      },
      {
        id: "q11-d",
        textEn: "Datetime attributes delete expired assignments from the server automatically.",
        textHi: "Datetime attribute expired homework ko database se khud delete kar deta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: Client-side HTML tags cannot modify backend database records.",
        feedbackHi: "Galat: HTML database records delete nahi kar sakta."
      }
    ],
    solutionCode: `<p>
  Official Practical Viva Date: 
  <time datetime="2026-11-15T10:00">November 15, 2026 at 10:00 AM</time>
</p>`,
    takeawayEn: "Standard: Whenever displaying dates, event deadlines, or blog post timestamps, wrap in <time datetime='YYYY-MM-DD'>.",
    takeawayHi: "Golden Rule: Deadlines aur dates ke liye hamesha <time datetime='YYYY-MM-DD'> use karein."
  },

  // ── DAY 6: MODERNIZING DIV SOUP ──
  {
    id: 12,
    sprintDay: 6,
    categoryKey: "semantic",
    categoryLabel: "Refactoring",
    badgeEn: "Day 06 • Full Page Wireframe",
    badgeHi: "Day 06 • Full Page Wireframe",
    titleEn: "Complete Semantic Modernization of Legacy 2005 Layout",
    titleHi: "2005 Ke Obsolete Div Soup Layout Ko Modern HTML5 Mein Badalna",
    scenarioEn: "You are tasked with refactoring a 20-year-old university website layout that has 0 semantic elements:",
    scenarioHi: "Aapko ek purana 2005 ka college layout modernize karna hai jo bina semantic tags ke bana tha:",
    codeSnippet: `<!-- ❌ OBSOLETE 2005 CODE: -->
<div id="site-header">
  <div id="nav"><a href="/">Home</a></div>
</div>
<div id="page-content">
  <div class="main-story"><h2>Breaking News</h2></div>
  <div class="sidebar"><h3>Notices</h3></div>
</div>
<div id="site-footer"><p>&copy; 2026</p></div>`,
    snippetFileName: "legacy-layout.html",
    questionEn: "Which modern semantic architecture represents the clean, 100% standard HTML5 replacement?",
    questionHi: "Is outdated code ka 100% correct modern semantic HTML5 replacement kaunsa hai?",
    options: [
      {
        id: "q12-a",
        textEn: "<header><nav>...</nav></header><main><article>...</article><aside>...</aside></main><footer>...</footer>",
        textHi: "<header><nav>...</nav></header><main><article>...</article><aside>...</aside></main><footer>...</footer>",
        isCorrect: true,
        feedbackEn: "Correct! <header> replaces #site-header, <nav> replaces #nav, <main> wraps the central page content, <article> houses the story, <aside> houses the sidebar, and <footer> replaces #site-footer.",
        feedbackHi: "Bilkul Sahi! Header, Nav, Main, Article, Aside aur Footer ka exact 100% standard use."
      },
      {
        id: "q12-b",
        textEn: "<top><menu>...</menu></top><body><content>...</content><side>...</side></body><bottom>...</bottom>",
        textHi: "<top><menu>...</menu></top><body><content>...</content><side>...</side></body><bottom>...</bottom>",
        isCorrect: false,
        feedbackEn: "Incorrect: Non-standard made-up tag names (<top>, <content>, <side>, <bottom>) do not exist in HTML5.",
        feedbackHi: "Galat: <top>, <content>, <bottom> HTML ke tags nahi hain."
      },
      {
        id: "q12-c",
        textEn: "<div semantic='true'><div role='everything'>...</div></div>",
        textHi: "<div semantic='true'><div role='everything'>...</div></div>",
        isCorrect: false,
        feedbackEn: "Incorrect: Adding fake 'semantic' attributes to divs does not create semantic landmark containers.",
        feedbackHi: "Galat: Fake attributes se div semantic nahi banta."
      },
      {
        id: "q12-d",
        textEn: "<table width='100%'><tr><td>Layout</td></tr></table>",
        textHi: "<table width='100%'><tr><td>Layout</td></tr></table>",
        isCorrect: false,
        feedbackEn: "Incorrect: Using tables for page layout was deprecated two decades ago.",
        feedbackHi: "Galat: Layout ke liye table use karna 20 saal pehle obsolete ho chuka hai."
      }
    ],
    solutionCode: `<!-- 100% Clean Modern Semantic Architecture -->
<header>
  <h1>University News Portal</h1>
  <nav aria-label="Main Navigation">
    <ul><li><a href="/">Home</a></li></ul>
  </nav>
</header>

<main>
  <article>
    <h2>Breaking News</h2>
    <p>Admissions Open for BCA & MCA 2026...</p>
  </article>
  <aside aria-label="Campus Notices">
    <h3>Notices</h3>
    <p>Term-end exams start Dec 1st.</p>
  </aside>
</main>

<footer>
  <p>&copy; 2026 University. All rights reserved.</p>
</footer>`,
    takeawayEn: "Architectural Standard: Modern web apps are composed of landmark elements (<header>, <nav>, <main>, <aside>, <footer>) rather than generic div soup.",
    takeawayHi: "Mastery Rule: Modern websites div soup ke bajaye <header>, <nav>, <main>, <aside>, <footer> se banai jati hain."
  }
];

// ── AUTHENTIC NEXTSEM ACADEMY LOGO BADGE (MATCHING USER'S LOGO) ──
function NextSemAcademyLogo({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
  const emblemSize = size === "sm" ? 22 : size === "lg" ? 36 : 28;

  if (size === "lg") {
    return (
      <div className={`inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-[#2563eb]/70 shadow-sm dark:shadow-[0_4px_20px_rgba(37,99,235,0.3)] select-none shrink-0 ${className}`}>
        <NextSemEmblem size={emblemSize} />
        <div className="flex flex-col">
          <span className="font-black text-base text-slate-900 dark:text-white tracking-tight leading-none">Academy</span>
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#04AA6D] font-bold mt-0.5">Sprint 1 Certificate</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-[#2563eb]/60 shadow-xs select-none shrink-0 ${className}`}>
      <NextSemEmblem size={emblemSize} />
      <span className="font-black text-xs text-slate-900 dark:text-white tracking-tight">Academy</span>
    </div>
  );
}

export default function Sprint1TestClient() {
  const { copyAndSyncToCloud } = useCrossDeviceSync();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const [lang, setLang] = useState<LangMode>("english");
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>("all");
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [testFinished, setTestFinished] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  // Mobile Navigation States
  type MobileViewTab = "challenge" | "questions" | "scorecard";
  const [mobileTab, setMobileTab] = useState<MobileViewTab>("challenge");
  const [mobileLeftDrawerOpen, setMobileLeftDrawerOpen] = useState<boolean>(false);
  const [mobileRightDrawerOpen, setMobileRightDrawerOpen] = useState<boolean>(false);

  // Filtered questions
  const filteredQuestions = SPRINT1_QUESTIONS.filter(q => {
    if (filterCategory === "all") return true;
    return q.categoryKey === filterCategory;
  });

  const activeQ = filteredQuestions[currentQIndex] || filteredQuestions[0];
  const selectedOptionId = selectedAnswers[activeQ.id];
  const isCurrentSubmitted = Boolean(submittedQuestions[activeQ.id]);

  // Overall Score Calculations
  const totalQuestions = SPRINT1_QUESTIONS.length;
  const score = SPRINT1_QUESTIONS.reduce((acc, q) => {
    const chosenId = selectedAnswers[q.id];
    const correctOpt = q.options.find(o => o.isCorrect);
    return acc + (chosenId === correctOpt?.id ? 1 : 0);
  }, 0);

  const answeredCount = Object.keys(submittedQuestions).length;
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  const isCertified = scorePercentage >= 80;

  const handleSelectOption = (optionId: string) => {
    if (isCurrentSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [activeQ.id]: optionId }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;
    setSubmittedQuestions(prev => ({ ...prev, [activeQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQIndex < filteredQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setTestFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const handleResetTest = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setCurrentQIndex(0);
    setTestFinished(false);
  };

  const handleCopyCode = (code: string) => {
    copyAndSyncToCloud(code, "Sprint 1 Solution Snippet");
    safeInstantCopy(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleSelectQuestion = (idx: number) => {
    setCurrentQIndex(idx);
    setTestFinished(false);
    setMobileTab("challenge");
    setMobileLeftDrawerOpen(false);
    setMobileRightDrawerOpen(false);
  };

  // Reusable Theme Switcher Button (with Electric Blue & Emerald Green Accent)
  const renderThemeToggle = (compact = false) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Dark and Light Mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`inline-flex items-center gap-1.5 rounded-xl border font-bold transition-all cursor-pointer select-none active:scale-95 ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      } ${
        isDark
          ? "bg-[#111624] hover:bg-[#192238] border-[#2563eb]/50 text-white shadow-[0_0_10px_rgba(37,99,235,0.2)]"
          : "bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm"
      }`}
    >
      {isDark ? (
        <>
          <Sun size={compact ? 12 : 14} className="text-amber-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={compact ? 12 : 14} className="text-[#2563eb]" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );

  // ────────────────────────────────────────────────────────────
  // 1. LEFT SIDEBAR CONTENT (Question Navigator & Topic Filters)
  // ────────────────────────────────────────────────────────────
  const renderLeftSidebarContent = () => (
    <div className="space-y-4">
      {/* NextSem Brand Identity Card with Authentic Logo Badge */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-neutral-800 shadow-md dark:shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-2">
          <NextSemAcademyLogo size="sm" />
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#2563eb]/10 dark:bg-[#2563eb]/20 text-[#2563eb] dark:text-[#60a5fa] font-mono border border-[#2563eb]/30 font-bold">
            TEST SPRINT 1
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
          BCA Practical Days 01–10 &bull; HTML Foundation
        </p>

        {/* Category Filter Chips */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-neutral-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block mb-1 font-bold">
            Filter by Topic:
          </span>
          {[
            { key: "all", label: "All Challenges", count: 12 },
            { key: "basics", label: "HTML Basics (Days 1–3)", count: 3 },
            { key: "tables_lists", label: "Lists & Tables (Day 4)", count: 1 },
            { key: "forms", label: "Forms & Inputs (Day 5)", count: 2 },
            { key: "semantic", label: "Semantic Layouts (Day 6)", count: 6 }
          ].map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setFilterCategory(cat.key as CategoryFilter);
                setCurrentQIndex(0);
                setTestFinished(false);
                setMobileLeftDrawerOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                filterCategory === cat.key
                  ? "bg-[#04AA6D] text-black shadow-[0_0_15px_rgba(4,170,109,0.35)] font-black"
                  : "text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#151a24] hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-neutral-800"
              }`}
            >
              <span className="truncate">{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                filterCategory === cat.key ? "bg-black/30 text-black font-black" : "bg-slate-200 dark:bg-black/60 text-slate-600 dark:text-neutral-400 border border-slate-300 dark:border-neutral-800"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Question Index List */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-neutral-800 shadow-md dark:shadow-xl space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800 text-xs font-mono">
          <span className="text-slate-900 dark:text-white font-black flex items-center gap-1.5">
            <ListOrdered size={14} className="text-[#04AA6D]" />
            <span>Question Index</span>
          </span>
          <span className="text-[#04AA6D] font-bold font-mono">{answeredCount}/{totalQuestions} Done</span>
        </div>

        <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-neutral-800">
          {filteredQuestions.map((q, idx) => {
            const isAnswered = Boolean(submittedQuestions[q.id]);
            const chosenOpt = selectedAnswers[q.id];
            const correctOpt = q.options.find(o => o.isCorrect);
            const isRight = chosenOpt === correctOpt?.id;
            const isCurrent = currentQIndex === idx && !testFinished;

            let stateClass = "bg-slate-50 dark:bg-[#121622] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-800 hover:border-[#2563eb]/50 hover:bg-slate-100 dark:hover:bg-[#181d2c]";
            if (isCurrent) {
              stateClass = "bg-blue-50/80 dark:bg-[#091a30] text-blue-950 dark:text-white border-2 border-[#2563eb] shadow-[0_0_15px_rgba(37,99,235,0.25)] ring-1 ring-[#2563eb]";
            } else if (isAnswered) {
              stateClass = isRight
                ? "bg-emerald-50 dark:bg-[#071d13] text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-[#04AA6D]/60"
                : "bg-rose-50 dark:bg-[#1e0a0e] text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-600/50";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelectQuestion(idx)}
                className={`w-full text-left p-2 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer text-xs ${stateClass}`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-black text-[10px] shrink-0 mt-0.5 ${
                  isCurrent
                    ? "bg-[#2563eb] text-white shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                    : isAnswered && isRight
                    ? "bg-[#04AA6D] text-black font-black"
                    : isAnswered && !isRight
                    ? "bg-rose-600 text-white font-black"
                    : "bg-slate-200 dark:bg-black text-slate-600 dark:text-neutral-400 border border-slate-300 dark:border-neutral-800 font-bold"
                }`}>
                  Q{idx + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-bold truncate text-[11px] text-slate-900 dark:text-white">
                    {lang === "hinglish" ? q.titleHi : q.titleEn}
                  </p>
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 block truncate font-mono">
                    Day {q.sprintDay} &bull; {q.categoryLabel}
                  </span>
                </div>

                {isAnswered && (
                  <span className="shrink-0 mt-1">
                    {isRight ? (
                      <Check size={12} className="text-[#04AA6D]" />
                    ) : (
                      <XCircle size={12} className="text-rose-500" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ────────────────────────────────────────────────────────────
  // 2. RIGHT SIDEBAR CONTENT (Scorecard HUD & Performance Metrics)
  // ────────────────────────────────────────────────────────────
  const renderRightSidebarContent = () => (
    <div className="space-y-4">
      {/* Live Performance HUD */}
      <div className="p-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0d111a] dark:to-[#07090e] border-2 border-[#2563eb]/30 dark:border-[#2563eb]/40 shadow-lg dark:shadow-[0_0_35px_rgba(37,99,235,0.12)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800">
          <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <BarChart3 size={14} className="text-[#04AA6D]" />
            <span>Performance Scorecard</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-[#04AA6D] bg-[#04AA6D]/15 px-2 py-0.5 rounded border border-[#04AA6D]/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#04AA6D] animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Score Ring Display */}
        <div className="text-center py-2 space-y-1">
          <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {score} <span className="text-lg text-slate-400 dark:text-neutral-500 font-mono">/ {totalQuestions}</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#04AA6D]">
            Accuracy: {scorePercentage}%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400">
            Target: <strong className="text-slate-900 dark:text-white font-bold">80% (10/12)</strong> for Mastery Badge
          </p>
        </div>

        {/* Target Criteria Meter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-400">
            <span>Progress:</span>
            <span className="text-slate-900 dark:text-white font-bold">{answeredCount} / {totalQuestions} Answered</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-black border border-slate-300 dark:border-neutral-800 overflow-hidden">
            <div 
              className="h-full bg-[#04AA6D] shadow-[0_0_10px_#04AA6D] transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Topic Diagnostic Bars */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block font-bold">
            Topic Breakdown:
          </span>
          {[
            { key: "basics", name: "HTML Basics", total: 3 },
            { key: "tables_lists", name: "Lists & Tables", total: 1 },
            { key: "forms", name: "Forms & Inputs", total: 2 },
            { key: "semantic", name: "Semantic Architecture", total: 6 }
          ].map(topic => {
            const topicQuestions = SPRINT1_QUESTIONS.filter(q => q.categoryKey === topic.key);
            const topicScore = topicQuestions.reduce((acc, q) => {
              const ch = selectedAnswers[q.id];
              const co = q.options.find(o => o.isCorrect);
              return acc + (ch === co?.id ? 1 : 0);
            }, 0);

            return (
              <div key={topic.key} className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-700 dark:text-neutral-300">{topic.name}</span>
                  <span className="text-[#04AA6D] font-bold">{topicScore}/{topic.total}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-black overflow-hidden border border-slate-300 dark:border-neutral-850">
                  <div 
                    className="h-full bg-[#04AA6D] shadow-[0_0_6px_#04AA6D]"
                    style={{ width: `${(topicScore / topic.total) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Retake Button */}
        <button
          type="button"
          onClick={() => {
            handleResetTest();
            setMobileRightDrawerOpen(false);
          }}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black border border-slate-300 dark:border-neutral-800 hover:border-[#04AA6D]/60 text-xs font-bold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(4,170,109,0.2)]"
        >
          <RotateCcw size={12} className="text-[#04AA6D]" />
          <span>Reset &amp; Retake Test</span>
        </button>
      </div>

      {/* Quick Curriculum Navigation Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-neutral-800 shadow-md dark:shadow-xl space-y-2.5">
        <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
          <Compass size={14} className="text-[#04AA6D]" />
          <span>Related Practical Links</span>
        </span>
        <div className="space-y-1.5 text-xs font-medium">
          <Link
            href="/bca/practical/day-6-html-semantic-elements-and-page-structure"
            className="block p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121622] dark:hover:bg-[#181d2c] border border-slate-200 dark:border-neutral-800 text-[#04AA6D] hover:underline truncate"
          >
            Day 6: Semantic Elements Lesson ➔
          </Link>
          <Link
            href="/bca/practical"
            className="block p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#121622] dark:hover:bg-[#181d2c] border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white truncate"
          >
            BCA Practical 360-Day Hub ➔
          </Link>
        </div>
      </div>

      {/* Author Attribution Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-black border-2 border-[#04AA6D]/40 text-xs text-slate-600 dark:text-neutral-400 space-y-1 shadow-sm dark:shadow-[0_0_15px_rgba(4,170,109,0.15)]">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#04AA6D] block font-bold">
          Curriculum &amp; Systems Author
        </span>
        <p className="text-xs font-black text-slate-900 dark:text-white">
          Er. Manoj Kumar
        </p>
        <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
          BCA Semester 1 Practical Learning Systems &bull; NextSem Academy
        </p>
      </div>
    </div>
  );

  // ────────────────────────────────────────────────────────────
  // 3. CENTER MAIN STAGE (Hero, Stepper, Question Card / Scorecard)
  // ────────────────────────────────────────────────────────────
  const renderCenterMainContent = () => (
    <div className="space-y-5 w-full">
      {/* Master Hero Banner (Derived from NextSem Academy Logo Colors) */}
      <section className="rounded-3xl border-2 border-[#2563eb]/40 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 dark:from-[#0d121c] dark:via-[#090d15] dark:to-[#07090e] p-5 sm:p-7 shadow-md dark:shadow-[0_0_35px_rgba(37,99,235,0.12)] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563eb]/10 dark:bg-[#04AA6D]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2.5">
            {/* Brand Logo Badge using the User's Exact Logo */}
            <div className="flex items-center gap-2 flex-wrap">
              <NextSemAcademyLogo size="md" />

              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#2563eb]/10 dark:bg-[#2563eb]/20 text-[#2563eb] dark:text-[#60a5fa] border border-[#2563eb]/30">
                Sprint 1: Days 01–10
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-black text-slate-700 dark:text-white border border-slate-300 dark:border-neutral-700">
                12 Coding Challenges
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sprint 1: HTML Coding Practical Concept Test
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              {lang === "hinglish"
                ? "HTML5 Boilerplate, Headings, Links, Images, Tables, Forms aur Semantic Landmarks ke real code snippets ko verify karein."
                : "Diagnose practical code snippets, fix W3C specification violations, and master production-grade HTML5 page architecture."}
            </p>
          </div>

          {/* Language Switcher & Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-black p-1 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-inner">
              <button
                type="button"
                onClick={() => setLang("english")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === "english"
                    ? "bg-[#04AA6D] text-black shadow-[0_0_10px_rgba(4,170,109,0.4)] font-black"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => setLang("hinglish")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === "hinglish"
                    ? "bg-[#04AA6D] text-black shadow-[0_0_10px_rgba(4,170,109,0.4)] font-black"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                🌐 Hinglish
              </button>
            </div>
          </div>
        </div>

        {/* Question Quick-Stepper Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 shrink-0 mr-1 font-bold">Steps:</span>
          {filteredQuestions.map((q, idx) => {
            const isAnswered = Boolean(submittedQuestions[q.id]);
            const chosen = selectedAnswers[q.id];
            const correct = q.options.find(o => o.isCorrect);
            const isRight = chosen === correct?.id;
            const isCur = currentQIndex === idx && !testFinished;

            let pillStyle = "bg-white dark:bg-black text-slate-600 dark:text-neutral-400 border-slate-300 dark:border-neutral-800 hover:border-[#2563eb]/60";
            if (isCur) {
              pillStyle = "bg-[#04AA6D] text-black border-[#04AA6D] font-black shadow-[0_0_12px_rgba(4,170,109,0.6)]";
            } else if (isAnswered) {
              pillStyle = isRight ? "bg-[#04AA6D] text-black border-[#04AA6D] font-black" : "bg-rose-600 text-white border-rose-500 font-bold";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentQIndex(idx);
                  setTestFinished(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer shrink-0 ${pillStyle}`}
              >
                Q{idx + 1}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── TEST FINISHED / SCORECARD SCREEN ── */}
      {testFinished ? (
        <section className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0d111a] dark:to-[#07090e] border-2 border-[#04AA6D]/50 p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-center">
            <NextSemAcademyLogo size="lg" />
          </div>

          <div className="w-20 h-20 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] border-2 border-[#04AA6D] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(4,170,109,0.3)]">
            <Award size={40} />
          </div>

          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black ${
              isCertified ? "bg-[#04AA6D] shadow-[0_0_15px_rgba(4,170,109,0.4)]" : "bg-emerald-400"
            }`}>
              {isCertified ? "🏆 Sprint 1 Certified HTML Master" : "Assessment Completed"}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              {isCertified 
                ? "Outstanding! You Passed the Sprint 1 Practical Test" 
                : `You Scored ${score} out of ${totalQuestions} (${scorePercentage}%)`}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 mt-2 max-w-xl mx-auto leading-relaxed">
              {isCertified
                ? (lang === "hinglish"
                    ? "Shandar! Aapne HTML5 Boilerplate, Tables, Forms, Input Validation aur Semantic Architecture ke saare real-world rules successfully master kar liye hain."
                    : "Outstanding work! You have proven hands-on mastery over modern HTML5 markup, forms, accessible tables, and semantic landmarks.")
                : (lang === "hinglish"
                    ? "80% se kam score aane par review karein aur dubara attempt karein taaki university viva aur real coding mein full marks milein."
                    : "A minimum score of 80% is recommended for lab viva excellence. Review the diagnostic breakdown below and retake the test.")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={handleResetTest}
              className="px-5 py-2.5 rounded-xl bg-[#04AA6D] hover:bg-[#039861] text-black font-black text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(4,170,109,0.35)] transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw size={14} />
              <span>Retake Sprint 1 Test (Fresh Attempt)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTestFinished(false);
                setCurrentQIndex(0);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-white font-bold text-xs transition-all cursor-pointer"
            >
              <span>Review All 12 Questions</span>
            </button>

            <Link
              href="/bca/practical/day-6-html-semantic-elements-and-page-structure"
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#14151a] border border-[#04AA6D]/40 text-[#04AA6D] font-bold text-xs hover:bg-slate-200 dark:hover:bg-[#1a1b22] transition-all flex items-center gap-1.5"
            >
              <span>Day 6 Practical Lesson ➔</span>
            </Link>
          </div>
        </section>
      ) : (
        /* ── ACTIVE QUESTION CARD (NEXTSEM LOGO THEME: ELECTRIC BLUE & EMERALD GREEN) ── */
        <section className="rounded-3xl bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-neutral-800 shadow-xl p-5 sm:p-7 space-y-5 animate-in fade-in duration-150">
          {/* Question Header & Scenario */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black bg-blue-50 dark:bg-[#2563eb]/20 text-[#2563eb] dark:text-[#60a5fa] border border-[#2563eb]/30 shadow-sm">
                {lang === "hinglish" ? activeQ.badgeHi : activeQ.badgeEn}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                Sprint Day {activeQ.sprintDay} &bull; {activeQ.categoryLabel}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {lang === "hinglish" ? activeQ.titleHi : activeQ.titleEn}
            </h2>

            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              {lang === "hinglish" ? activeQ.scenarioHi : activeQ.scenarioEn}
            </p>
          </div>

          {/* Code Snippet Terminal Box - Developer Console in both Dark & Light */}
          <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-neutral-800 bg-[#000000] shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#090a0d] border-b border-neutral-800 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-3 font-bold text-neutral-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="flex items-center gap-1.5 ml-1">
                  <FileCode size={13} className="text-[#04AA6D]" />
                  <span>{activeQ.snippetFileName}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(activeQ.codeSnippet)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#04AA6D] hover:underline cursor-pointer"
              >
                {copiedSnippet ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedSnippet ? "Copied!" : "Copy Snippet"}</span>
              </button>
            </div>
            <pre className="p-4 sm:p-5 overflow-x-auto whitespace-pre-wrap break-words break-all sm:break-words text-xs font-mono text-emerald-300 leading-relaxed select-all bg-[#040405]">
              <code className="whitespace-pre-wrap break-words break-all sm:break-words">{activeQ.codeSnippet}</code>
            </pre>
          </div>

          {/* Question Prompt */}
          <div className="p-4 rounded-2xl bg-blue-50/90 dark:bg-[#081528] border-2 border-[#2563eb]/40 shadow-sm dark:shadow-[0_0_15px_rgba(37,99,235,0.15)]">
            <p className="text-xs sm:text-sm font-extrabold text-blue-950 dark:text-white flex items-start gap-2.5">
              <HelpCircle size={16} className="text-[#2563eb] dark:text-[#60a5fa] shrink-0 mt-0.5" />
              <span>{lang === "hinglish" ? activeQ.questionHi : activeQ.questionEn}</span>
            </p>
          </div>

          {/* 4 Interactive Options */}
          <div className="space-y-2.5">
            {activeQ.options.map((opt, oIdx) => {
              const isSelected = selectedOptionId === opt.id;
              const optionLetter = String.fromCharCode(65 + oIdx);

              let cardStyle = "bg-slate-50 hover:bg-slate-100 dark:bg-[#121622] dark:hover:bg-[#181d2c] border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 hover:border-[#2563eb]/50";

              if (isCurrentSubmitted) {
                if (opt.isCorrect) {
                  cardStyle = "bg-emerald-50 dark:bg-[#092b1a] border-2 border-[#04AA6D] text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-[#04AA6D]";
                } else if (isSelected) {
                  cardStyle = "bg-rose-50 dark:bg-[#250d11] border-2 border-rose-600 text-rose-950 dark:text-rose-200 ring-1 ring-rose-600 font-bold";
                }
              } else if (isSelected) {
                cardStyle = "bg-blue-50 dark:bg-[#071e3d] border-2 border-[#2563eb] text-blue-950 dark:text-white font-bold ring-2 ring-[#2563eb]/40 shadow-[0_0_20px_rgba(37,99,235,0.2)]";
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${cardStyle} ${
                    isCurrentSubmitted ? "cursor-default" : "hover:scale-[1.005]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                        isCurrentSubmitted && opt.isCorrect
                          ? "bg-[#04AA6D] text-black"
                          : isCurrentSubmitted && isSelected
                          ? "bg-rose-600 text-white"
                          : isSelected
                          ? "bg-[#2563eb] text-white shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                          : "bg-slate-200 dark:bg-black text-slate-700 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700"
                      }`}>
                        {optionLetter}
                      </span>
                      <span className="leading-relaxed break-words font-medium">
                        {lang === "hinglish" ? opt.textHi : opt.textEn}
                      </span>
                    </div>

                    {isCurrentSubmitted && (
                      opt.isCorrect ? (
                        <CheckCircle2 size={18} className="text-[#04AA6D] shrink-0 mt-0.5" />
                      ) : isSelected ? (
                        <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                      ) : null
                    )}
                  </div>

                  {/* Explanation Feedback Pill */}
                  {isCurrentSubmitted && (isSelected || opt.isCorrect) && (
                    <div className={`mt-2.5 pt-2 border-t text-xs leading-relaxed pl-9 ${
                      opt.isCorrect 
                        ? "border-[#04AA6D]/40 text-emerald-800 dark:text-emerald-300" 
                        : "border-rose-300 dark:border-rose-900/60 text-rose-800 dark:text-rose-300"
                    }`}>
                      <strong className="block mb-0.5 text-slate-900 dark:text-white">
                        {opt.isCorrect ? "✔ Why This is Correct:" : "✖ Why This is Incorrect:"}
                      </strong>
                      <span>{lang === "hinglish" ? opt.feedbackHi : opt.feedbackEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Solution Code & Developer Takeaway */}
          {isCurrentSubmitted && (
            <div className="space-y-3 pt-2">
              {activeQ.solutionCode && (
                <div className="p-4 rounded-2xl bg-black border-2 border-[#04AA6D]/40 text-white space-y-2 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-[#04AA6D] font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      <span>Production Standard Solution:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(activeQ.solutionCode!)}
                      className="text-[#04AA6D] hover:underline cursor-pointer flex items-center gap-1 font-bold"
                    >
                      <Copy size={12} />
                      <span>Copy Clean Code</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-emerald-300 bg-[#050507] p-3 rounded-xl border border-neutral-900 overflow-x-auto leading-relaxed">
                    <code>{activeQ.solutionCode}</code>
                  </pre>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-gradient-to-r dark:from-[#092215] dark:to-[#071810] border border-emerald-300 dark:border-[#04AA6D]/40 text-xs flex items-start gap-2.5">
                <Lightbulb size={16} className="text-[#04AA6D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#04AA6D] block text-[11px] uppercase tracking-wider mb-0.5 font-black">
                    {lang === "hinglish" ? "Key Practical Takeaway (BCA Lab & Viva Fact)" : "Developer Takeaway & Viva Key Fact"}
                  </strong>
                  <span className="text-slate-800 dark:text-neutral-200 leading-relaxed">
                    {lang === "hinglish" ? activeQ.takeawayHi : activeQ.takeawayEn}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-neutral-800">
            <button
              type="button"
              disabled={currentQIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#14151a] dark:hover:bg-[#1c1d24] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-neutral-800 text-xs font-bold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <ArrowLeft size={14} />
              <span>Previous Question</span>
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {!isCurrentSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl bg-[#04AA6D] hover:bg-[#039861] disabled:opacity-40 text-black font-black text-xs shadow-[0_0_20px_rgba(4,170,109,0.35)] transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center flex items-center gap-2"
                >
                  <CheckCircle2 size={15} />
                  <span>Submit &amp; Check Answer</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-[#04AA6D] hover:bg-[#039861] text-black font-black text-xs shadow-[0_0_20px_rgba(4,170,109,0.35)] transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center flex items-center gap-2"
                >
                  <span>{currentQIndex === filteredQuestions.length - 1 ? "Finish Test & View Score 🏆" : "Next Question"}</span>
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07090e] text-slate-900 dark:text-white flex flex-col font-sans selection:bg-[#04AA6D] selection:text-black pb-24 lg:pb-8 relative transition-colors duration-200">
      {/* Subtle Ambient Glow Aura */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(4,170,109,0.12),transparent_70%)] z-0" />

      {/* ── 1. GLOBAL BCA HEADER NAVIGATION ── */}
      <div className="relative z-10">
        <BcaHeaderNav />
      </div>

      {/* ── 2. MANDATORY COMPLETE BREADCRUMB NAVIGATION (HOME ➔ CURRENT PAGE) ── */}
      <nav 
        aria-label="Breadcrumb Navigation"
        className="relative z-10 w-full bg-white/95 dark:bg-[#0c0f17]/95 border-b border-slate-200 dark:border-neutral-800/80 px-4 sm:px-6 py-2.5 text-xs text-slate-500 dark:text-neutral-400 select-none shadow-sm backdrop-blur-md"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap font-medium">
            <Link href="/" className="text-[#04AA6D] hover:text-[#05c47d] underline decoration-[#04AA6D] font-bold flex items-center gap-1">
              <span>🏠 Home</span>
            </Link>
            <span className="text-slate-400 dark:text-neutral-600 font-bold">❯</span>
            <Link href="/bca" className="text-[#04AA6D] hover:text-[#05c47d] underline decoration-[#04AA6D] font-bold">
              <span>BCA Hub</span>
            </Link>
            <span className="text-slate-400 dark:text-neutral-600 font-bold">❯</span>
            <Link href="/bca/practical" className="text-[#04AA6D] hover:text-[#05c47d] underline decoration-[#04AA6D] font-bold">
              <span>Practical Portal</span>
            </Link>
            <span className="text-slate-400 dark:text-neutral-600 font-bold">❯</span>
            <span className="text-slate-900 dark:text-white font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#04AA6D] shadow-[0_0_8px_#04AA6D] animate-pulse" />
              <span>Sprint 1 Practical Test</span>
            </span>
          </div>

          {/* Right Action Bar: Theme Toggle (Dark & Light) & Mobile Quick Drawers */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Dark / Light Mode Switcher with Logo Accent colors */}
            {renderThemeToggle(false)}

            {/* Mobile Drawers Quick Buttons in Top Bar */}
            <div className="lg:hidden flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setMobileLeftDrawerOpen(true);
                  setMobileRightDrawerOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-300 dark:border-neutral-800 text-xs font-bold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer active:scale-95"
              >
                <Menu size={13} className="text-[#04AA6D]" />
                <span className="hidden sm:inline">Questions</span>
                <span>({answeredCount}/12)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileRightDrawerOpen(true);
                  setMobileLeftDrawerOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-black border border-[#2563eb]/40 text-xs font-bold text-[#2563eb] dark:text-[#60a5fa] cursor-pointer active:scale-95"
              >
                <BarChart3 size={13} />
                <span>{scorePercentage}%</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── 3. MOBILE VIEW SEGMENTED TABS (MIRRORS LEFT / MAIN / RIGHT SIDEBAR CONCEPT) ── */}
      <div className="relative z-10 lg:hidden w-full max-w-[1600px] mx-auto px-3 pt-3">
        <div className="grid grid-cols-3 gap-1 p-1 bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-md dark:shadow-xl">
          <button
            type="button"
            onClick={() => setMobileTab("questions")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "questions"
                ? "bg-[#04AA6D] text-black font-black shadow-[0_0_15px_rgba(4,170,109,0.35)]"
                : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ListOrdered size={14} />
            <span className="truncate">Q Index</span>
            <span className={`text-[10px] font-mono px-1 rounded ${
              mobileTab === "questions" ? "bg-black/20 text-black font-bold" : "bg-slate-200 dark:bg-black/50 text-slate-700 dark:text-neutral-400"
            }`}>
              {answeredCount}/{totalQuestions}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab("challenge")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "challenge"
                ? "bg-[#04AA6D] text-black font-black shadow-[0_0_15px_rgba(4,170,109,0.35)]"
                : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Code2 size={14} />
            <span className="truncate">Challenge</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab("scorecard")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "scorecard"
                ? "bg-[#04AA6D] text-black font-black shadow-[0_0_15px_rgba(4,170,109,0.35)]"
                : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BarChart3 size={14} />
            <span className="truncate">Scorecard</span>
            <span className={`text-[10px] font-mono px-1 rounded ${
              mobileTab === "scorecard" ? "bg-black/20 text-black font-bold" : "bg-slate-200 dark:bg-black/50 text-[#04AA6D]"
            }`}>
              {scorePercentage}%
            </span>
          </button>
        </div>
      </div>

      {/* ── 4. DESKTOP 3-COLUMN LAYOUT & MOBILE ADAPTIVE VIEW ── */}
      <div className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col lg:flex-row gap-5 items-start">

        {/* ══════════════════════════════════════════════════════════
            COLUMN 1 (DESKTOP): LEFT SIDEBAR (STICKY QUESTION NAVIGATOR)
           ══════════════════════════════════════════════════════════ */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-neutral-800">
          {renderLeftSidebarContent()}
        </aside>

        {/* ══════════════════════════════════════════════════════════
            COLUMN 2 (DESKTOP): CENTER MAIN STAGE (HERO & CHALLENGE)
           ══════════════════════════════════════════════════════════ */}
        <main className="hidden lg:block flex-1 min-w-0 w-full">
          {renderCenterMainContent()}
        </main>

        {/* ══════════════════════════════════════════════════════════
            COLUMN 3 (DESKTOP): RIGHT SIDEBAR (STICKY SCORECARD HUD)
           ══════════════════════════════════════════════════════════ */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-neutral-800">
          {renderRightSidebarContent()}
        </aside>

        {/* ══════════════════════════════════════════════════════════
            MOBILE ACTIVE VIEW (CONTROLLED BY 3-SEGMENT MOBILE TABS)
           ══════════════════════════════════════════════════════════ */}
        <div className="lg:hidden w-full">
          {mobileTab === "questions" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {renderLeftSidebarContent()}
            </div>
          )}

          {mobileTab === "challenge" && (
            <div className="animate-in fade-in duration-150">
              {renderCenterMainContent()}
            </div>
          )}

          {mobileTab === "scorecard" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {renderRightSidebarContent()}
            </div>
          )}
        </div>
      </div>

      {/* ── 5. MOBILE SLIDE-IN DRAWER: LEFT SIDEBAR (QUESTION NAVIGATOR) ── */}
      {mobileLeftDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setMobileLeftDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-80 max-w-[85vw] h-full bg-white dark:bg-[#0d111a] border-r border-slate-200 dark:border-neutral-800 p-4 shadow-2xl flex flex-col space-y-3 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
              <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <ListOrdered size={16} className="text-[#04AA6D]" />
                <span>Question Navigator</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileLeftDrawerOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-black border border-slate-300 dark:border-neutral-800 flex items-center justify-center text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
            {renderLeftSidebarContent()}
          </div>
        </div>
      )}

      {/* ── 6. MOBILE SLIDE-IN DRAWER: RIGHT SIDEBAR (SCORECARD HUD) ── */}
      {mobileRightDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setMobileRightDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-80 max-w-[85vw] h-full bg-white dark:bg-[#0d111a] border-l border-slate-200 dark:border-[#2563eb]/40 p-4 shadow-2xl flex flex-col space-y-3 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
              <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <BarChart3 size={16} className="text-[#04AA6D]" />
                <span>Live Scorecard</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileRightDrawerOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-black border border-slate-300 dark:border-neutral-800 flex items-center justify-center text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
            {renderRightSidebarContent()}
          </div>
        </div>
      )}

      {/* ── 7. STICKY MOBILE BOTTOM NAVIGATION BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#08090c]/95 backdrop-blur-md border-t border-slate-200 dark:border-neutral-800 px-3 py-2 flex items-center justify-between shadow-[0_-10px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
        <button
          type="button"
          onClick={() => {
            setMobileLeftDrawerOpen(true);
            setMobileRightDrawerOpen(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-300 dark:border-neutral-800 text-xs font-bold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer active:scale-95"
        >
          <ListOrdered size={14} className="text-[#04AA6D]" />
          <span>Q Index ({answeredCount}/12)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMobileTab("challenge");
            setMobileLeftDrawerOpen(false);
            setMobileRightDrawerOpen(false);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#111216] border border-[#2563eb]/40 text-xs font-black text-slate-900 dark:text-white cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#04AA6D] shadow-[0_0_6px_#04AA6D] animate-pulse" />
          <span>Q{currentQIndex + 1} of {totalQuestions}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMobileRightDrawerOpen(true);
            setMobileLeftDrawerOpen(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-300 dark:border-neutral-800 text-xs font-bold text-[#04AA6D] cursor-pointer active:scale-95"
        >
          <BarChart3 size={14} />
          <span>{score}/{totalQuestions} ({scorePercentage}%)</span>
        </button>
      </div>
    </div>
  );
}
