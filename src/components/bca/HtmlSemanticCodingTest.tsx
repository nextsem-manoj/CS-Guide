"use client";

import React, { useState } from "react";
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
  ExternalLink
} from "lucide-react";
import { safeInstantCopy } from "@/lib/clipboard";
import { useCrossDeviceSync } from "@/context/CrossDeviceSyncContext";

type LangMode = "english" | "hinglish";

interface TestOption {
  id: string;
  textEn: string;
  textHi: string;
  isCorrect: boolean;
  feedbackEn: string;
  feedbackHi: string;
}

interface CodingQuestion {
  id: number;
  category: string;
  badgeEn: string;
  badgeHi: string;
  titleEn: string;
  titleHi: string;
  scenarioEn: string;
  scenarioHi: string;
  codeSnippet: string;
  snippetFileName?: string;
  questionEn: string;
  questionHi: string;
  options: TestOption[];
  solutionCode?: string;
  takeawayEn: string;
  takeawayHi: string;
}

const CODING_QUESTIONS: CodingQuestion[] = [
  {
    id: 1,
    category: "Document Landmark Integrity",
    badgeEn: "Core Architecture",
    badgeHi: "Core Architecture",
    titleEn: "Spot the <main> Semantic Landmark Violation",
    titleHi: "<main> Landmark Ki Sabse Badi W3C Violation Pehchano",
    scenarioEn: "A developer submitted this HTML layout for an educational portal. The W3C validator and Google Lighthouse accessibility audit flagged a severe semantic violation.",
    scenarioHi: "Ek student ne university portal ke liye yeh HTML layout banaya. W3C HTML5 validator aur screen readers ne isme ek critical semantic violation flag ki.",
    codeSnippet: `<body>
  <header>
    <h1>IGNOU Student Portal</h1>
    <!-- Notice this nested landmark: -->
    <main>
      <p>Urgent Notice: Term-End Practical exams start Dec 1st.</p>
    </main>
  </header>

  <main>
    <h2>Welcome to BCA Practical Portal</h2>
    <p>Select your semester to start coding.</p>
  </main>
</body>`,
    snippetFileName: "portal-layout.html",
    questionEn: "What is the critical W3C HTML5 specification violation in this code snippet?",
    questionHi: "Is code snippet mein HTML5 W3C specification ka kaunsa critical rule toda gaya hai?",
    options: [
      {
        id: "q1-a",
        textEn: "An <h1> heading is not permitted inside a <header> element.",
        textHi: "<header> element ke andar <h1> heading likhna illegal hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <header> is the standard, designated container for top site titles and <h1> headings.",
        feedbackHi: "Galat: <header> ke andar <h1> likhna bilkul correct aur recommended standard hai."
      },
      {
        id: "q1-b",
        textEn: "A document must NEVER have more than one visible <main> element, and <main> can NEVER be nested inside <header>, <nav>, <aside>, or <footer>.",
        textHi: "Ek webpage par ek se zyada visible <main> tag nahi ho sakte, aur <main> kabhi bhi <header>, <nav>, <aside> ya <footer> ke andar nest nahi kiya ja sakta.",
        isCorrect: true,
        feedbackEn: "Correct! The W3C HTML5 specification mandates exactly ONE visible <main> element representing the primary unique content of the page. It must never be inside <header> or other landmark sections.",
        feedbackHi: "Bilkul Sahi! HTML5 standard ke hisaab se poore document mein sirf aur sirf EK visible <main> element ho sakta hai. Use <header> ke andar daalna illegal hai."
      },
      {
        id: "q1-c",
        textEn: "<p> tags cannot be used directly inside <main> without an enclosing <div>.",
        textHi: "<main> ke andar <p> tag bina <div> ke nahi likha ja sakta.",
        isCorrect: false,
        feedbackEn: "Incorrect: <p> tags are completely valid direct children of <main>.",
        feedbackHi: "Galat: <main> ke andar <p> tag direct likhna 100% valid hai."
      },
      {
        id: "q1-d",
        textEn: "The <header> must be placed after the <body> closing tag.",
        textHi: "<header> ko <body> tag ke band hone ke baad likhna chahiye.",
        isCorrect: false,
        feedbackEn: "Incorrect: Visible HTML content must always reside inside the <body> element.",
        feedbackHi: "Galat: Saara visible UI content <body> ke andar hi aana chahiye."
      }
    ],
    solutionCode: `<body>
  <header>
    <h1>IGNOU Student Portal</h1>
    <div class="announcement-banner">
      <p>Urgent Notice: Term-End Practical exams start Dec 1st.</p>
    </div>
  </header>

  <!-- Exactly ONE <main> for primary unique page content -->
  <main>
    <h2>Welcome to BCA Practical Portal</h2>
    <p>Select your semester to start coding.</p>
  </main>
</body>`,
    takeawayEn: "Rule of Thumb: Only 1 visible <main> per HTML page. Never put <main> inside <header>, <nav>, or <footer>.",
    takeawayHi: "Golden Rule: Ek webpage par sirf 1 visible <main> tag hota hai. Isko kabhi header ya footer mein mat daalo."
  },
  {
    id: 2,
    category: "Content Syndication",
    badgeEn: "Article vs Section",
    badgeHi: "Article vs Section",
    titleEn: "<article> vs <section> Practical Distinction",
    titleHi: "Blog Post Ke Liye <article> Chune Ya <section>?",
    scenarioEn: "You are building an engineering blog feed with multiple self-contained technical articles (each has an author, timestamp, body, and comments).",
    scenarioHi: "Aap ek developer blog feed bana rahe hain jisme alag-alag complete technical articles hain—har article ka apna author, date aur comment box hai.",
    codeSnippet: `<!-- Which wrapper is semantically correct for each post? -->
<_________ id="post-101">
  <header>
    <h2>Understanding CSS Grid vs Flexbox</h2>
    <p>Published by Er. Manoj Kumar on <time datetime="2026-10-24">Oct 24, 2026</time></p>
  </header>
  <p>Flexbox excels at one-dimensional layouts while Grid handles 2D matrices...</p>
  <footer>
    <p>Tags: #CSS #WebDev | 3 Comments</p>
  </footer>
</_________>`,
    snippetFileName: "blog-feed.html",
    questionEn: "Which semantic tag correctly fills the blank to represent a standalone, distributable blog entry?",
    questionHi: "Ek independent, standalone blog post ko wrap karne ke liye kaunsa tag semantically 100% correct hai?",
    options: [
      {
        id: "q2-a",
        textEn: "<article> — because the content is self-contained and independently syndicatable (e.g. into an RSS feed or email newsletter) without losing its meaning.",
        textHi: "<article> — kyunki yeh content self-contained hai aur agar isko RSS feed ya newsletter mein akele bhi bhej diya jaye to iska poora matlab nikalta hai.",
        isCorrect: true,
        feedbackEn: "Correct! The W3C defines <article> as a complete, self-contained composition that is independently distributable or reusable (e.g. blog post, newspaper article, forum comment, product card).",
        feedbackHi: "Bilkul Sahi! <article> standalone, self-contained content ke liye hota hai jo bina baaki page ke bhi poora sense banata hai."
      },
      {
        id: "q2-b",
        textEn: "<section> — because any part of a webpage with headings must always be a section.",
        textHi: "<section> — kyunki jahan bhi heading ho wahan hamesha section hi use karna zaroori hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <section> is for generic thematic grouping within a broader document. Standalone syndicatable items require <article>.",
        feedbackHi: "Galat: <section> broad thematic groupings ke liye hota hai; independent standalone post ke liye <article> best hai."
      },
      {
        id: "q2-c",
        textEn: "<aside> — because blog posts are secondary to the university logo.",
        textHi: "<aside> — kyunki blog post logo ke muqable secondary content hoti hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <aside> is designated for complementary sidebars, footnotes, or ads, not the primary blog post.",
        feedbackHi: "Galat: <aside> sidebars aur extra links ke liye hota hai, primary content ke liye nahi."
      },
      {
        id: "q2-d",
        textEn: "<div> — because semantic tags are deprecated in modern JavaScript frameworks like React.",
        textHi: "<div> — kyunki React aur modern frameworks mein semantic tags outdated ho chuke hain.",
        isCorrect: false,
        feedbackEn: "Incorrect: Semantic HTML5 elements are strictly required in modern React/Next.js for SEO and WCAG accessibility standards.",
        feedbackHi: "Galat: Semantic tags React/Next.js mein SEO aur accessibility ke liye aur zyada zaroori hain!"
      }
    ],
    solutionCode: `<article id="post-101">
  <header>
    <h2>Understanding CSS Grid vs Flexbox</h2>
    <p>Published by Er. Manoj Kumar on <time datetime="2026-10-24">Oct 24, 2026</time></p>
  </header>
  <p>Flexbox excels at one-dimensional layouts while Grid handles 2D matrices...</p>
  <footer>
    <p>Tags: #CSS #WebDev | 3 Comments</p>
  </footer>
</article>`,
    takeawayEn: "Mental Model: If it could be syndicated in an RSS reader or printed on a newspaper page by itself, wrap it in <article>.",
    takeawayHi: "Mental Model: Agar content ko akele print ya RSS feed mein bheja ja sake aur uska poora matlab nikle, to <article> use karein."
  },
  {
    id: 3,
    category: "Accessibility (a11y)",
    badgeEn: "Accessible Nav",
    badgeHi: "Accessible Nav",
    titleEn: "Multiple <nav> Landmarks & aria-label Disambiguation",
    titleHi: "Ek Hi Page Pe Do <nav> Tags Ko Accessible Kaise Banayein?",
    scenarioEn: "Your web application features a primary navigation bar at the top of the page, and a secondary legal/help navigation bar in the footer.",
    scenarioHi: "Aapki website mein ek top header menu hai aur ek footer mein Privacy, Terms aur Contact links ka menu hai.",
    codeSnippet: `<header>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/courses">Courses</a></li>
    </ul>
  </nav>
</header>

<footer>
  <nav aria-label="Legal and Compliance">
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
</footer>`,
    snippetFileName: "accessible-nav.html",
    questionEn: "Why is the `aria-label` attribute essential when multiple <nav> elements exist on the same page?",
    questionHi: "Jab ek hi page pe multiple <nav> tags hote hain, to un par `aria-label` attribute lagana kyu zaroori hota hai?",
    options: [
      {
        id: "q3-a",
        textEn: "It provides clear auditory announcements for screen readers (e.g. 'Main Navigation, landmark') so visually impaired users can distinguish and jump directly to the intended menu.",
        textHi: "Yeh screen readers ko bolkar batata hai (jaise 'Main Navigation, landmark') taaki visually impaired students dono menus mein antar samajh sakein.",
        isCorrect: true,
        feedbackEn: "Correct! Assistive technologies like NVDA and JAWS allow users to jump between navigation landmarks. Without aria-label, both simply announce 'navigation', leaving users guessing.",
        feedbackHi: "Bilkul Sahi! Screen readers landmarks ke beech jump karte hain. Bina aria-label ke dono sirf 'navigation' bolte hain jisse blind users confuse ho jate hain."
      },
      {
        id: "q3-b",
        textEn: "Without aria-label, the second <nav> element is ignored by the browser CSS engine and remains unstyled.",
        textHi: "Bina aria-label ke doosra <nav> tag browser style nahi karta aur plain text reh jata hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: CSS style matching is completely independent of aria-label.",
        feedbackHi: "Galat: CSS styling ka aria-label se koi direct connection nahi hota."
      },
      {
        id: "q3-c",
        textEn: "HTML5 strictly forbids more than one <nav> element unless aria-label is present to suppress the compiler error.",
        textHi: "HTML5 mein ek se zyada <nav> tag use karna illegal hai jab tak aria-label na lagaya jaye.",
        isCorrect: false,
        feedbackEn: "Incorrect: Multiple <nav> elements are 100% legal; aria-label is an accessibility best practice (WCAG 2.1), not a syntax blocker.",
        feedbackHi: "Galat: Multiple <nav> allowed hain; aria-label accessibility standard (WCAG) ke liye lagaya jata hai."
      },
      {
        id: "q3-d",
        textEn: "It acts as a password hash to prevent web crawlers from indexing footer links.",
        textHi: "Yeh ek password hash hota hai jo Google crawlers ko footer links index karne se rokta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: aria-label has nothing to do with search engine indexing restrictions.",
        feedbackHi: "Galat: Search crawling rokkne ke liye robots.txt ya noindex use hota hai."
      }
    ],
    solutionCode: `<!-- Production Standard for Multiple Navs -->
<header>
  <nav aria-label="Main Navigation">
    <ul><!-- links --></ul>
  </nav>
</header>
<footer>
  <nav aria-label="Footer Navigation">
    <ul><!-- links --></ul>
  </nav>
</footer>`,
    takeawayEn: "Accessibility Pro Tip: Whenever you have more than one <nav> on a page, always add unique `aria-label` values.",
    takeawayHi: "Pro Tip: Jab bhi page par 2 navigation menus hon, dono par alag-alag `aria-label` zaroor lagayein."
  },
  {
    id: 4,
    category: "Refactoring & Modernization",
    badgeEn: "Div Soup Refactor",
    badgeHi: "Div Soup Refactor",
    titleEn: "Refactoring Legacy 2005 'Div Soup' into Semantic HTML5",
    titleHi: "Outdated 2005 'Div Soup' Code Ko Modern Semantic HTML5 Mein Badlein",
    scenarioEn: "You are modernizing a legacy college portal code written with obsolete <div> wrappers:",
    scenarioHi: "Aapko ek purana 2005 ka college portal code modernize karna hai jo bina semantic tags ke sirf <div> se bana tha:",
    codeSnippet: `<!-- ❌ OBSOLETE 2005 CODE TO REFACTOR: -->
<div id="site-header">
  <div class="logo">NITM College</div>
  <div id="site-menu">
    <a href="/home">Home</a>
    <a href="/about">About</a>
  </div>
</div>
<div id="page-body">
  <div class="main-content">
    <h1>Welcome Students</h1>
    <p>Admissions open for 2026.</p>
  </div>
  <div class="sidebar">
    <h3>Upcoming Dates</h3>
  </div>
</div>
<div id="site-footer">
  <p>&copy; 2026 NITM</p>
</div>`,
    snippetFileName: "legacy-div-soup.html",
    questionEn: "Which modern semantic architecture represents the clean, 100% standard HTML5 replacement?",
    questionHi: "Is outdated code ka 100% correct modern semantic HTML5 replacement kaunsa hai?",
    options: [
      {
        id: "q4-a",
        textEn: "<header><nav>...</nav></header><main><h1>...</h1><aside>...</aside></main><footer>...</footer>",
        textHi: "<header><nav>...</nav></header><main><h1>...</h1><aside>...</aside></main><footer>...</footer>",
        isCorrect: true,
        feedbackEn: "Correct! <header> replaces #site-header, <nav> replaces #site-menu, <main> replaces .main-content, <aside> replaces .sidebar, and <footer> replaces #site-footer.",
        feedbackHi: "Bilkul Sahi! #site-header ki jagah <header>, menu ki jagah <nav>, main content ki jagah <main>, sidebar ki jagah <aside>, aur footer ki jagah <footer> aayega."
      },
      {
        id: "q4-b",
        textEn: "<head><menu>...</menu></head><content><sidebar>...</sidebar></content><foot>...</foot>",
        textHi: "<head><menu>...</menu></head><content><sidebar>...</sidebar></content><foot>...</foot>",
        isCorrect: false,
        feedbackEn: "Incorrect: <head> is for invisible document metadata; <content>, <sidebar>, and <foot> are not valid HTML5 elements.",
        feedbackHi: "Galat: <head> metadata ke liye hota hai; <sidebar>, <content>, <foot> naam ke tags HTML mein exist hi nahi karte."
      },
      {
        id: "q4-c",
        textEn: "<navbar>...</navbar><container><side>...</side></container><bottom>...</bottom>",
        textHi: "<navbar>...</navbar><container><side>...</side></container><bottom>...</bottom>",
        isCorrect: false,
        feedbackEn: "Incorrect: Made-up tag names like <navbar>, <container>, <side>, <bottom> are completely non-standard in HTML.",
        feedbackHi: "Galat: <navbar>, <container>, <bottom> HTML5 ke standard tags nahi hain."
      },
      {
        id: "q4-d",
        textEn: "<div type='header'><div type='nav'>...</div></div><div type='main'>...</div>",
        textHi: "<div type='header'><div type='nav'>...</div></div><div type='main'>...</div>",
        isCorrect: false,
        feedbackEn: "Incorrect: Adding a fake 'type' attribute to <div> does not make it semantic.",
        feedbackHi: "Galat: <div> par 'type' attribute lagane se wo semantic landmark nahi banta."
      }
    ],
    solutionCode: `<!-- ✅ 100% SEMANTIC REPLACEMENT -->
<header>
  <div class="logo">NITM College</div>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <section class="main-content">
    <h1>Welcome Students</h1>
    <p>Admissions open for 2026.</p>
  </section>
  <aside aria-label="Important Dates">
    <h3>Upcoming Dates</h3>
  </aside>
</main>

<footer>
  <p>&copy; 2026 NITM</p>
</footer>`,
    takeawayEn: "SEO & Accessibility Win: Replacing generic divs with semantic tags increases SEO crawling efficiency and accessibility scores to 100.",
    takeawayHi: "SEO Benefit: Generic divs ki jagah semantic tags lagane se Google ranking aur screen reader support dono improve hote hain."
  },
  {
    id: 5,
    category: "Media & Code Listings",
    badgeEn: "Media Captions",
    badgeHi: "Media Captions",
    titleEn: "Semantically Associating Illustrations & Code: <figure> & <figcaption>",
    titleHi: "Code Snippet Aur Diagram Ko <figure> Aur <figcaption> Se Jodna",
    scenarioEn: "In your BCA practical project documentation, you need to display an illustrative C program code listing along with an official descriptive caption.",
    scenarioHi: "Aapko apni BCA lab report mein ek C program ka code snippet dikhana hai jiske niche 'Listing 1.1: Hello World in C' ka caption aana chahiye.",
    codeSnippet: `<!-- Which semantic structure correctly binds content with its caption? -->
<figure>
  <pre><code>#include &lt;stdio.h&gt;
int main() {
    printf("Welcome to BCA Practical Portal!\\n");
    return 0;
}</code></pre>
  <figcaption>Listing 1.1: Standard C Program Entry Point</figcaption>
</figure>`,
    snippetFileName: "code-listing.html",
    questionEn: "Why is `<figure>` with `<figcaption>` superior to simply placing `<pre>` and a `<p class='caption'>` inside a `<div>`?",
    questionHi: "Code ya image ko plain `<p>` ke bajaye `<figure>` aur `<figcaption>` mein rakhne ka technical fayda kya hai?",
    options: [
      {
        id: "q5-a",
        textEn: "It programmatically establishes a 1-to-1 semantic parent-child relationship in the browser's Accessibility Tree, ensuring screen readers announce the caption as the official description of that specific code block or image.",
        textHi: "Yeh browser ke Accessibility Tree mein code aur caption ka direct rishta banata hai, jisse screen reader blind student ko saaf batata hai ki yeh caption isi code ka hai.",
        isCorrect: true,
        feedbackEn: "Correct! The <figure> element groups visual content (code, charts, photos, equations) with its <figcaption>, informing assistive technology that they form a cohesive semantic unit.",
        feedbackHi: "Bilkul Sahi! <figure> aur <figcaption> WCAG standard ke mutabiq content aur uske label ko ek cohesive unit banate hain."
      },
      {
        id: "q5-b",
        textEn: "<figure> elements automatically compile and execute C code inside the browser terminal without a GCC compiler.",
        textHi: "<figure> tag browser ke andar C code ko automatically compile karke output dikha deta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML elements are structural markups and never compile native C binaries.",
        feedbackHi: "Galat: HTML sirf structure define karta hai, C code compile nahi karta."
      },
      {
        id: "q5-c",
        textEn: "<figcaption> can only contain hyperlink anchors, not plain text words.",
        textHi: "<figcaption> ke andar sirf clickable links aa sakte hain, normal text nahi.",
        isCorrect: false,
        feedbackEn: "Incorrect: <figcaption> is designed specifically for descriptive text, captions, and citations.",
        feedbackHi: "Galat: <figcaption> ka kaam hi description aur caption text dikhana hai."
      },
      {
        id: "q5-d",
        textEn: "The W3C removed <div> from the HTML specification, so <figure> is now mandatory for everything.",
        textHi: "W3C ne <div> ko HTML se delete kar diya hai isliye sab kuch figure mein likhna padta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <div> is still valid for generic styling/layout wrappers with no semantic meaning.",
        feedbackHi: "Galat: <div> abhi bhi generic CSS styling ke liye exist karta hai."
      }
    ],
    solutionCode: `<figure>
  <pre><code>#include &lt;stdio.h&gt;
int main() {
    printf("Welcome to BCA Practical Portal!\\n");
    return 0;
}</code></pre>
  <figcaption>Listing 1.1: Standard C Program Entry Point</figcaption>
</figure>`,
    takeawayEn: "Semantic Pair: Always pair visual media, charts, and code listings with <figure> and <figcaption> instead of orphan paragraphs.",
    takeawayHi: "Best Practice: Images, diagrams aur code listings ke liye hamesha <figure> aur <figcaption> ka pair use karein."
  },
  {
    id: 6,
    category: "Search Engines & Calendars",
    badgeEn: "Machine-Readable Metadata",
    badgeHi: "Machine-Readable Metadata",
    titleEn: "Machine-Readable Timestamps: <time datetime='...'>",
    titleHi: "Dates Aur Deadlines Ko Machine-Readable <time> Se Encode Karna",
    scenarioEn: "The university publishes an official notice: 'Final MCA project presentation deadline is November 15, 2026 at 5:00 PM.'",
    scenarioHi: "Notice board par likha hai: 'Practical viva ki date 15 November 2026, shaam 5:00 baje hai.'",
    codeSnippet: `<!-- Snippet 1: Plain Text -->
<p>Deadline: November 15, 2026 at 5:00 PM</p>

<!-- Snippet 2: Semantic HTML5 -->
<p>Deadline: <time datetime="2026-11-15T17:00">November 15, 2026 at 5:00 PM</time></p>`,
    snippetFileName: "exam-notice.html",
    questionEn: "What is the primary technical advantage of Snippet 2 using `<time datetime='...'>` over plain text?",
    questionHi: "Plain text ke muqable `<time datetime='...'>` use karne ka main technical advantage kya hota hai?",
    options: [
      {
        id: "q6-a",
        textEn: "The `datetime` attribute provides standardized ISO-8601 data that search engine crawlers, smartphones, and calendar apps can parse unambiguously to add 1-click reminders and show rich event snippets in Google search.",
        textHi: "ISO-8601 format ki wajah se Google, phone calendar aur crawlers bina kisi confusion ke exact date/time samajh kar 1-click 'Add to Calendar' ka option dikha sakte hain.",
        isCorrect: true,
        feedbackEn: "Correct! While humans read 'Nov 15 at 5 PM', computers struggle with natural language ambiguities. The ISO-8601 datetime format (YYYY-MM-DDThh:mm) guarantees unambiguous machine parsing.",
        feedbackHi: "Bilkul Sahi! Insaan 'Nov 15' padhta hai par computers ko ISO format (2026-11-15T17:00) chahiye hota hai calendar aur Google rich snippets ke liye."
      },
      {
        id: "q6-b",
        textEn: "<time> elements freeze the client's system clock to ensure students cannot submit assignments late.",
        textHi: "<time> element computer ke clock ko freeze kar deta hai taaki late submission na ho sake.",
        isCorrect: false,
        feedbackEn: "Incorrect: HTML cannot modify the client operating system's hardware clock.",
        feedbackHi: "Galat: HTML user ke PC ki ghadi ya system clock ko control nahi kar sakta."
      },
      {
        id: "q6-c",
        textEn: "The browser will automatically render a ticking digital clock on the webpage without JavaScript.",
        textHi: "Browser bina JavaScript ke screen par chalti hui ghadi dikhana shuru kar deta hai.",
        isCorrect: false,
        feedbackEn: "Incorrect: <time> is a static semantic data container, not an animated clock widget.",
        feedbackHi: "Galat: <time> static semantic tag hai; chalti ghadi ke liye JS timer lagta hai."
      },
      {
        id: "q6-d",
        textEn: "Using <time> encrypts the date with AES-256 so external web scrapers cannot read it.",
        textHi: "<time> lagane se date encrypt ho jati hai taaki koi web scraper use padh na sake.",
        isCorrect: false,
        feedbackEn: "Incorrect: Semantic HTML is designed for transparent accessibility and crawler discovery, not encryption.",
        feedbackHi: "Galat: Semantic HTML ka maqsad data ko accessible aur machine-readable banana hota hai."
      }
    ],
    solutionCode: `<p>
  Official IGNOU Viva Date: 
  <time datetime="2026-11-15T17:00">November 15, 2026 at 5:00 PM</time>
</p>`,
    takeawayEn: "SEO & Calendar Standard: Whenever displaying dates, event times, or article publication dates, wrap them in <time datetime='YYYY-MM-DD'>.",
    takeawayHi: "Standard Rule: Jab bhi date ya time display karein, <time datetime='YYYY-MM-DD'> use karein taaki Google search event ko samajh sake."
  }
];

export function HtmlSemanticCodingTest() {
  const { copyAndSyncToCloud } = useCrossDeviceSync();
  const [lang, setLang] = useState<LangMode>("hinglish");
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [testFinished, setTestFinished] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const currentQ = CODING_QUESTIONS[currentQIndex];
  const selectedOptionId = selectedAnswers[currentQ.id];
  const isCurrentSubmitted = Boolean(submittedQuestions[currentQ.id]);

  // Calculate score
  const totalQuestions = CODING_QUESTIONS.length;
  const score = CODING_QUESTIONS.reduce((acc, q) => {
    const chosenId = selectedAnswers[q.id];
    const correctOpt = q.options.find(o => o.isCorrect);
    return acc + (chosenId === correctOpt?.id ? 1 : 0);
  }, 0);

  const answeredCount = Object.keys(submittedQuestions).length;
  const isPerfect = score === totalQuestions;

  const handleSelectOption = (optionId: string) => {
    if (isCurrentSubmitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;
    setSubmittedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
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
    copyAndSyncToCloud(code, "Semantic HTML Solution");
    safeInstantCopy(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section 
      id="html-coding-test"
      className="rounded-3xl border-2 border-blue-600/40 dark:border-blue-500/40 bg-white dark:bg-neutral-950 p-5 sm:p-7 shadow-lg relative overflow-hidden transition-all scroll-mt-20"
    >
      {/* Top Banner & Language Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1.5 shadow-sm">
              <Sparkles size={13} />
              Practical Coding Concept Test
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              HTML5 Semantic Architecture
            </span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60">
              6 Practical Challenges
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-black dark:text-white tracking-tight">
            {lang === "hinglish" 
              ? "HTML Semantic Elements & Page Structure — Practical Coding Test" 
              : "HTML Semantic Elements & Page Architecture — Practical Coding Test"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {lang === "hinglish"
              ? "Real-world code snippets ko analyze karein, semantic violations spot karein aur production-ready HTML5 architecture master karein."
              : "Analyze realistic code snippets, diagnose semantic architectural violations, and master accessible W3C HTML5 layout standards."}
          </p>
        </div>

        {/* Dual Language & Score Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 flex-wrap">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm">
            <button
              type="button"
              onClick={() => setLang("english")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === "english"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setLang("hinglish")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === "hinglish"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              🌐 Hinglish
            </button>
          </div>

          {/* Current Live Score Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-xs font-mono font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Award size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Score: {score} / {totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Progress Stepper Pills */}
      <div className="pt-4 pb-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
          <span>Question {currentQIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} / {totalQuestions} Answered</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {CODING_QUESTIONS.map((q, idx) => {
            const isAnswered = Boolean(submittedQuestions[q.id]);
            const chosenOpt = selectedAnswers[q.id];
            const correctOpt = q.options.find(o => o.isCorrect);
            const isRight = chosenOpt === correctOpt?.id;
            const isCurrent = currentQIndex === idx;

            let pillBg = "bg-slate-100 dark:bg-neutral-900 text-slate-500 border-slate-200 dark:border-neutral-800";
            if (isAnswered) {
              pillBg = isRight 
                ? "bg-emerald-500 text-white border-emerald-500" 
                : "bg-rose-500 text-white border-rose-500";
            } else if (isCurrent) {
              pillBg = "bg-blue-600 text-white border-blue-600 shadow-sm";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentQIndex(idx);
                  setTestFinished(false);
                }}
                className={`py-1.5 rounded-lg text-xs font-mono font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${pillBg}`}
                title={`Jump to Question ${idx + 1}`}
              >
                <span>Q{idx + 1}</span>
                {isAnswered && (isRight ? <Check size={11} /> : <XCircle size={11} />)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TEST FINISHED SUMMARY SCREEN ── */}
      {testFinished ? (
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center space-y-4 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border-2 border-blue-500/30">
            <Award size={32} />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 text-white">
              {isPerfect ? "🏆 Perfect Score! 100% Mastery" : "Test Complete"}
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-black dark:text-white mt-2">
              {isPerfect 
                ? "Outstanding! You are a Certified Semantic HTML5 Architect" 
                : `You scored ${score} out of ${totalQuestions}`}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-lg mx-auto leading-relaxed">
              {isPerfect
                ? (lang === "hinglish" 
                    ? "Shabash! Aapne HTML5 semantic tags, landmarks, screen readers aur accessibility ke saare rules successfully clear kar liye hain."
                    : "Magnificent work! You have mastered all W3C landmark rules, <article> vs <section> distinctions, and WCAG accessibility guidelines.")
                : (lang === "hinglish"
                    ? "Achha prayas! Kuch questions review karein taaki university viva aur real-world production coding mein koi mistake na ho."
                    : "Good effort! Review the questions you missed below or retake the test to achieve 100% mastery.")}
            </p>
          </div>

          {/* Quick Review Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left pt-2">
            {CODING_QUESTIONS.map((q, idx) => {
              const chosen = selectedAnswers[q.id];
              const correct = q.options.find(o => o.isCorrect);
              const isRight = chosen === correct?.id;

              return (
                <div 
                  key={q.id}
                  onClick={() => {
                    setCurrentQIndex(idx);
                    setTestFinished(false);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                    isRight 
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800" 
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-black dark:text-white">Q{idx + 1}. {q.category}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isRight ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
                      {isRight ? "CORRECT" : "NEEDS REVIEW"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                    {lang === "hinglish" ? q.titleHi : q.titleEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={handleResetTest}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw size={14} />
              <span>Retake Practical Test (Fresh Attempt)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTestFinished(false);
                setCurrentQIndex(0);
              }}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <span>Review All Questions One-by-One</span>
            </button>
          </div>
        </div>
      ) : (
        /* ── ACTIVE QUESTION VIEW ── */
        <div className="mt-5 space-y-5 animate-in fade-in duration-150">
          {/* Question Metadata Header */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                {lang === "hinglish" ? currentQ.badgeHi : currentQ.badgeEn}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Category: {currentQ.category}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-black dark:text-white leading-snug">
              {lang === "hinglish" ? currentQ.titleHi : currentQ.titleEn}
            </h4>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {lang === "hinglish" ? currentQ.scenarioHi : currentQ.scenarioEn}
            </p>
          </div>

          {/* Code Snippet Box (Syntax-Styled Terminal) */}
          <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-neutral-800 bg-[#090d16] text-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-[#0d1322] border-b border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-2 font-bold text-slate-200">
                <FileCode size={13} className="text-blue-400" />
                <span>{currentQ.snippetFileName || "snippet.html"}</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopyCode(currentQ.codeSnippet)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                {copiedSnippet ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedSnippet ? "Copied!" : "Copy Snippet"}</span>
              </button>
            </div>
            <pre className="p-4 sm:p-5 overflow-x-auto whitespace-pre-wrap break-words break-all sm:break-words text-xs font-mono text-slate-200 leading-relaxed select-all">
              <code className="whitespace-pre-wrap break-words break-all sm:break-words">{currentQ.codeSnippet}</code>
            </pre>
          </div>

          {/* Question Prompt */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <p className="text-xs sm:text-sm font-black text-black dark:text-white flex items-start gap-2">
              <HelpCircle size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>{lang === "hinglish" ? currentQ.questionHi : currentQ.questionEn}</span>
            </p>
          </div>

          {/* 4 Interactive Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedOptionId === opt.id;
              const optionLetter = String.fromCharCode(65 + oIdx); // A, B, C, D

              let cardStyle = "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-black dark:text-white";

              if (isCurrentSubmitted) {
                if (opt.isCorrect) {
                  cardStyle = "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-500";
                } else if (isSelected) {
                  cardStyle = "bg-rose-50 dark:bg-rose-950/30 border-rose-500 dark:border-rose-500 text-rose-950 dark:text-rose-200 ring-1 ring-rose-500";
                }
              } else if (isSelected) {
                cardStyle = "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-900 dark:text-blue-200 font-bold ring-2 ring-blue-600/50";
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
                          ? "bg-emerald-600 text-white"
                          : isCurrentSubmitted && isSelected
                          ? "bg-rose-600 text-white"
                          : isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300"
                      }`}>
                        {optionLetter}
                      </span>
                      <span className="leading-relaxed break-words font-medium">
                        {lang === "hinglish" ? opt.textHi : opt.textEn}
                      </span>
                    </div>

                    {isCurrentSubmitted && (
                      opt.isCorrect ? (
                        <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : isSelected ? (
                        <XCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      ) : null
                    )}
                  </div>

                  {/* Feedback Pill if submitted */}
                  {isCurrentSubmitted && (isSelected || opt.isCorrect) && (
                    <div className={`mt-2.5 pt-2 border-t text-xs leading-relaxed pl-9 ${
                      opt.isCorrect 
                        ? "border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300" 
                        : "border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300"
                    }`}>
                      <strong className="block mb-0.5">
                        {opt.isCorrect ? "✔ Why This is Correct:" : "✖ Why This is Incorrect:"}
                      </strong>
                      <span>{lang === "hinglish" ? opt.feedbackHi : opt.feedbackEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Solution Code Preview & Senior Takeaway (When Answered) */}
          {isCurrentSubmitted && (
            <div className="space-y-3 pt-2">
              {currentQ.solutionCode && (
                <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-700/80 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      <span>Production Standard Solution:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(currentQ.solutionCode!)}
                      className="text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Copy size={12} />
                      <span>Copy Clean Code</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-emerald-300 bg-black/80 p-3 rounded-xl border border-neutral-800 overflow-x-auto leading-relaxed">
                    <code>{currentQ.solutionCode}</code>
                  </pre>
                </div>
              )}

              {/* Developer Takeaway */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs flex items-start gap-2.5">
                <Lightbulb size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 dark:text-amber-300 block text-[11px] uppercase tracking-wider mb-0.5">
                    {lang === "hinglish" ? "Key Practical Takeaway (BCA Viva & Job Interview)" : "Developer Takeaway & Exam Key Fact"}
                  </strong>
                  <span className="text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {lang === "hinglish" ? currentQ.takeawayHi : currentQ.takeawayEn}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer (Submit, Next, Prev) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-neutral-800">
            <button
              type="button"
              disabled={currentQIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-neutral-900 flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
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
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center flex items-center gap-2"
                >
                  <CheckCircle2 size={14} />
                  <span>Submit &amp; Check Answer</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95 w-full sm:w-auto justify-center flex items-center gap-2"
                >
                  <span>{currentQIndex === totalQuestions - 1 ? "Finish Test & View Score 🏆" : "Next Question"}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attribution Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
        <span>Curriculum &amp; Practical Systems Author: <strong className="text-black dark:text-white">Er. Manoj Kumar</strong></span>
        <span>HTML5 Semantic Architecture Mastery &bull; IGNOU BCA Semester 1</span>
      </div>
    </section>
  );
}

export default HtmlSemanticCodingTest;
