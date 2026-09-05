export interface HtmlTagAttribute {
  name: string;
  description: string;
  exampleValue?: string;
}

export interface HtmlTagItem {
  tag: string;
  name: string;
  category: 
    | "Document & Metadata"
    | "Layout & Sectioning"
    | "Text & Grouping"
    | "Inline Semantics"
    | "Media & Multimedia"
    | "Embedded & Graphics"
    | "Tables"
    | "Forms & Inputs"
    | "Interactive & Dialogs"
    | "Web Components"
    | "Deprecated & Obsolete";
  isVoid: boolean; // Self-closing tag (e.g. <img>, <br>, <input>)
  display: "block" | "inline" | "inline-block" | "table" | "table-caption" | "table-row-group" | "table-row" | "table-column-group" | "list-item" | "contents" | "meta" | "none" | "other";
  isHtml5: boolean; // Introduced or redefined in HTML5
  isDeprecated?: boolean;
  deprecatedAlternative?: string;
  english: string;
  hinglish: string;
  hindi: string;
  attributes?: HtmlTagAttribute[];
  example: string;
  livePreviewHtml?: string;
}

export const ALL_HTML_TAGS: HtmlTagItem[] = [
  // ──────────────────────────────────────────────
  // 1. DOCUMENT & METADATA
  // ──────────────────────────────────────────────
  {
    tag: "<!DOCTYPE html>",
    name: "!DOCTYPE",
    category: "Document & Metadata",
    isVoid: true,
    display: "none",
    isHtml5: true,
    english: "Informs the web browser that the page is written in HTML5 standard. Must always be placed as the very first line of your HTML document before <html>.",
    hinglish: "Browser ko batata hai ki page modern HTML5 standard mein likha gaya hai. Document ki sabse pehli line mein hota hai.",
    hindi: "Browser को सूचित करता है कि दस्तावेज़ HTML5 मानक में लिखा गया है। HTML दस्तावेज़ की सबसे पहली पंक्ति में आता है।",
    attributes: [],
    example: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My First HTML5 Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>`,
    livePreviewHtml: `<div style="font-family:sans-serif; padding:12px; background:#0c1328; border-radius:8px; color:#e2e8f0;">
  <p style="margin:0; color:#38bdf8; font-weight:bold;">&lt;!DOCTYPE html&gt;</p>
  <p style="margin:4px 0 0; color:#94a3b8; font-size:13px;">Specifies HTML5 document mode. Browser renders standard CSS and JS correctly.</p>
</div>`
  },
  {
    tag: "<html>",
    name: "html",
    category: "Document & Metadata",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "The root element of an HTML document. Wraps all other elements on the entire web page (except <!DOCTYPE>).",
    hinglish: "Poore web page ka root wrapper element. Saare tags (head, body) isi ke andar hote hain.",
    hindi: "पूरे HTML दस्तावेज़ का मुख्य रूट एलिमेंट। सभी अन्य टैग्स इसी के अंदर समाहित होते हैं।",
    attributes: [
      { name: "lang", description: "Language code of page (e.g., 'en', 'hi', 'fr')", exampleValue: '"en"' },
      { name: "dir", description: "Text direction ('ltr' for Left-to-Right, 'rtl' for Right-to-Left)", exampleValue: '"ltr"' }
    ],
    example: `<html lang="en" dir="ltr">
  <head>
    <title>Website Home</title>
  </head>
  <body>
    <p>Welcome to NextSem!</p>
  </body>
</html>`,
    livePreviewHtml: `<div style="padding:10px; border:1px dashed #38bdf8; border-radius:6px; color:#f8fafc; font-family:sans-serif;">
  <span style="background:#0284c7; color:#fff; font-size:11px; padding:2px 6px; border-radius:4px; font-weight:bold;">&lt;html lang="en"&gt;</span>
  <div style="margin-top:8px; padding-left:12px; border-left:2px solid #0284c7;">
    <p style="margin:0; font-size:14px;">Root element wrapping &lt;head&gt; and &lt;body&gt;.</p>
  </div>
</div>`
  },
  {
    tag: "<head>",
    name: "head",
    category: "Document & Metadata",
    isVoid: false,
    display: "none",
    isHtml5: false,
    english: "Container for document metadata (information about data). Holds page title, CSS stylesheets, character encoding, and SEO meta tags. Not visible directly on the page.",
    hinglish: "Page ki background settings aur metadata rakhne ka container (title, stylesheets, favicon, SEO meta tags). Yeh page par visible nahi hota.",
    hindi: "दस्तावेज़ के मेटाडेटा (शीर्षक, सीएसएस लिंक, एनकोडिंग, एसईओ टैग्स) का कंटेनर। यह पेज पर सीधे दिखाई नहीं देता।",
    attributes: [],
    example: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-radius:8px; color:#cbd5e1;">
  <span style="color:#a855f7; font-weight:bold; font-size:12px;">🧠 &lt;head&gt; Container</span>
  <p style="margin:6px 0 0; font-size:13px; color:#94a3b8;">Contains Title, Favicon link, Meta Charset, and Viewport tags.</p>
</div>`
  },
  {
    tag: "<title>",
    name: "title",
    category: "Document & Metadata",
    isVoid: false,
    display: "none",
    isHtml5: false,
    english: "Defines the text displayed on the browser tab, in bookmarks, and as the search result title on Google. Crucial for SEO.",
    hinglish: "Browser ke tab bar mein aane wala title define karta hai. Search engines aur SEO ke liye sabse important tag hai.",
    hindi: "ब्राउज़र टैब पर दिखने वाला शीर्षक निर्धारित करता है। सर्च इंजन और एसईओ के लिए अत्यंत महत्वपूर्ण।",
    attributes: [],
    example: `<title>Learn HTML5 - Complete Reference Guide | NextSem</title>`,
    livePreviewHtml: `<div style="background:#1e293b; border-radius:8px; padding:10px 14px; display:inline-flex; align-items:center; gap:8px; border:1px solid #334155;">
  <span style="width:10px; height:10px; background:#10b981; border-radius:50%; display:inline-block;"></span>
  <span style="font-family:sans-serif; font-size:13px; color:#f8fafc; font-weight:600;">🔖 Learn HTML5 - Complete Reference Guide</span>
</div>`
  },
  {
    tag: "<base>",
    name: "base",
    category: "Document & Metadata",
    isVoid: true,
    display: "none",
    isHtml5: false,
    english: "Specifies the default base URL and default target window for all relative URLs in an HTML document.",
    hinglish: "Page ke saare relative links ke liye ek default base URL aur target set karta hai.",
    hindi: "पेज के सभी सापेक्ष (relative) लिंक्स के लिए बेस यूआरएल और डिफॉल्ट टारगेट विंडो सेट करता है।",
    attributes: [
      { name: "href", description: "The base URL for relative links", exampleValue: '"https://nextsem.online/assets/"' },
      { name: "target", description: "Default target for links ('_blank', '_self')", exampleValue: '"_blank"' }
    ],
    example: `<head>
  <base href="https://nextsem.online/images/" target="_blank">
</head>
<body>
  <!-- Resolves to: https://nextsem.online/images/logo.png -->
  <img src="logo.png" alt="NextSem Logo">
</body>`,
    livePreviewHtml: `<div style="font-family:sans-serif; padding:10px; background:#0c1328; border-radius:6px; color:#cbd5e1; font-size:13px;">
  <code>&lt;base href="https://example.com/assets/"&gt;</code>
  <p style="margin:6px 0 0; color:#94a3b8;">All relative images and links prepend this URL automatically.</p>
</div>`
  },
  {
    tag: "<link>",
    name: "link",
    category: "Document & Metadata",
    isVoid: true,
    display: "none",
    isHtml5: false,
    english: "Links external resources like CSS stylesheets, web fonts, or website favicons to the HTML document.",
    hinglish: "External CSS file, favicon icon ya Google Fonts ko HTML page se connect karta hai.",
    hindi: "बाहरी संसाधनों जैसे सीएसएस स्टाइलशीट, फेविकॉन आइकन या फॉन्ट्स को एचटीएमएल से जोड़ता है।",
    attributes: [
      { name: "rel", description: "Relationship (e.g. 'stylesheet', 'icon', 'preconnect')", exampleValue: '"stylesheet"' },
      { name: "href", description: "Path to external file or URL", exampleValue: '"styles.css"' },
      { name: "type", description: "MIME type (e.g., 'text/css')", exampleValue: '"text/css"' }
    ],
    example: `<!-- Link External CSS -->
<link rel="stylesheet" href="style.css">

<!-- Link Favicon Icon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
    livePreviewHtml: `<div style="font-family:sans-serif; padding:10px; background:#0c1328; border-left:3px solid #06b6d4; border-radius:4px; color:#e2e8f0; font-size:13px;">
  <span style="color:#38bdf8; font-weight:bold;">🔗 External Resource Linked:</span>
  <div style="margin-top:4px; color:#94a3b8;">style.css (Stylesheet) & favicon.svg (Tab Icon)</div>
</div>`
  },
  {
    tag: "<meta>",
    name: "meta",
    category: "Document & Metadata",
    isVoid: true,
    display: "none",
    isHtml5: false,
    english: "Provides structured metadata such as character encoding, viewport responsiveness, SEO descriptions, and social media OpenGraph tags.",
    hinglish: "Page ke bare mein hidden data deta hai — jaise mobile responsive viewport, Google SEO description, aur social media share cards.",
    hindi: "दस्तावेज़ की छुपी हुई जानकारी (कैरेक्टर सेट, मोबाइल व्यूमोर्ट, गूगल सर्च विवरण, ओपनग्राफ कार्ड्स) प्रदान करता है।",
    attributes: [
      { name: "charset", description: "Character encoding standard (UTF-8)", exampleValue: '"UTF-8"' },
      { name: "name", description: "Metadata property name ('viewport', 'description', 'author')", exampleValue: '"description"' },
      { name: "content", description: "Value of the metadata", exampleValue: '"Learn all HTML tags with examples."' }
    ],
    example: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Complete HTML5 tags cheat sheet with working examples.">
<meta name="author" content="Er. Manoj Kumar">`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#cbd5e1; font-size:13px;">
  <span style="color:#eab308; font-weight:bold;">🏷️ SEO Meta Information:</span>
  <ul style="margin:4px 0 0 16px; padding:0; color:#94a3b8; font-size:12px;">
    <li>Charset: UTF-8</li>
    <li>Responsive: width=device-width</li>
    <li>Description: Search Engine Ready</li>
  </ul>
</div>`
  },
  {
    tag: "<style>",
    name: "style",
    category: "Document & Metadata",
    isVoid: false,
    display: "none",
    isHtml5: false,
    english: "Allows embedding CSS styles directly inside the HTML document head or body.",
    hinglish: "HTML document ke andar direct CSS styling likhne ke liye use hota hai.",
    hindi: "एचटीएमएल पेज के अंदर ही डायरेक्ट सीएसएस कोड लिखने के लिए उपयोग होता है।",
    attributes: [
      { name: "media", description: "Media query applying this style ('screen', 'print')", exampleValue: '"screen"' }
    ],
    example: `<style>
  body {
    background-color: #060c18;
    color: #ffffff;
    font-family: 'Segoe UI', sans-serif;
  }
  .highlight {
    color: #04AA6D;
    font-weight: bold;
  }
</style>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#060c18; border:1px solid #04AA6D; padding:12px; border-radius:8px; color:#fff;">
  <p style="margin:0; font-size:14px;">This box styled using <span style="color:#04AA6D; font-weight:bold;">&lt;style&gt;</span> rules!</p>
</div>`
  },

  // ──────────────────────────────────────────────
  // 2. LAYOUT & SECTIONING
  // ──────────────────────────────────────────────
  {
    tag: "<body>",
    name: "body",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "The visible content container. Every heading, paragraph, image, video, button, and table displayed on screen lives inside <body>.",
    hinglish: "Web page par jo kuch bhi aankhon se dikhta hai (text, button, image, table), sab <body> tag ke andar hota hai.",
    hindi: "वेब पेज पर जो कुछ भी स्क्रीन पर दिखाई देता है (टेक्स्ट, बटन, इमेज, टेबल), वह सब <body> के अंदर होता है।",
    attributes: [],
    example: `<body>
  <header>
    <h1>My Website</h1>
  </header>
  <main>
    <p>Welcome to the web page!</p>
  </main>
</body>`,
    livePreviewHtml: `<div style="font-family:sans-serif; padding:12px; background:#0c1328; border:2px solid #3b82f6; border-radius:8px; color:#e2e8f0;">
  <span style="font-size:11px; background:#3b82f6; color:#fff; padding:2px 6px; border-radius:4px; font-weight:bold;">&lt;body&gt; (Visible Window)</span>
  <p style="margin:8px 0 0; font-size:14px; color:#f8fafc;">Everything users see on the browser screen is rendered here.</p>
</div>`
  },
  {
    tag: "<header>",
    name: "header",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Represents introductory content or navigation links at the top of a web page or section. Usually holds a logo, search bar, or main nav.",
    hinglish: "Page ya section ka top introductory header area jisme logo, website name aur navigation links hote hain.",
    hindi: "पेज या सेक्शन का शीर्ष हेडर भाग जिसमें लोगो, शीर्षक या नेविगेशन मेनू होता है।",
    attributes: [],
    example: `<header>
  <img src="logo.png" alt="NextSem Logo">
  <nav>
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
  </nav>
</header>`,
    livePreviewHtml: `<div style="font-family:sans-serif; display:flex; justify-content:space-between; align-items:center; background:#0c1328; border-bottom:2px solid #04AA6D; padding:10px 16px; border-radius:6px; color:#fff;">
  <strong style="color:#04AA6D; font-size:16px;">🚀 NextSem Academy</strong>
  <span style="font-size:12px; color:#94a3b8; display:flex; gap:10px;">
    <span style="color:#38bdf8; text-decoration:underline;">Home</span>
    <span style="color:#38bdf8; text-decoration:underline;">Tutorials</span>
    <span style="color:#38bdf8; text-decoration:underline;">Contact</span>
  </span>
</div>`
  },
  {
    tag: "<nav>",
    name: "nav",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Defines a section of navigation links intended for site-wide or page navigation. Helps screen readers and SEO engines identify menus.",
    hinglish: "Navigation menu links ka section. Screen readers aur Google search bots ko batata hai ki yeh main menu hai.",
    hindi: "वेबसाइट के मुख्य नेविगेशन लिंक्स का ब्लॉक। सर्च इंजन और स्क्रीन रीडर्स के लिए मेनू की पहचान कराता है।",
    attributes: [],
    example: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About Us</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:8px 14px; border-radius:6px; display:inline-flex; gap:16px; border:1px solid #1e293b;">
  <a href="#" style="color:#38bdf8; text-decoration:none; font-size:13px; font-weight:600;">🏠 Home</a>
  <a href="#" style="color:#38bdf8; text-decoration:none; font-size:13px; font-weight:600;">📚 Courses</a>
  <a href="#" style="color:#38bdf8; text-decoration:none; font-size:13px; font-weight:600;">✨ Playground</a>
</div>`
  },
  {
    tag: "<main>",
    name: "main",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Represents the dominant, unique content of the <body>. There should only be ONE unique <main> element per HTML page.",
    hinglish: "Page ka sabse mukhya (main) unique content area. Har web page par sirf ek hi <main> tag hona chahiye.",
    hindi: "पेज का मुख्य विशिष्ट सामग्री क्षेत्र। प्रत्येक वेब पेज पर केवल एक ही <main> टैग होना चाहिए।",
    attributes: [],
    example: `<main>
  <h1>HTML5 Web Development Course</h1>
  <p>Learn front-end web development with hands-on exercises.</p>
</main>`,
    livePreviewHtml: `<div style="font-family:sans-serif; padding:14px; background:#0c1328; border:1px solid #c1a648; border-radius:8px; color:#f8fafc;">
  <span style="background:#c1a648; color:#060c18; font-size:10px; font-weight:900; padding:2px 6px; border-radius:4px; text-transform:uppercase;">&lt;main&gt; Primary Content</span>
  <h3 style="margin:8px 0 4px; font-size:16px; color:#fff;">Welcome to HTML5 Masterclass</h3>
  <p style="margin:0; font-size:13px; color:#94a3b8;">This section contains the unique central topic of this page.</p>
</div>`
  },
  {
    tag: "<section>",
    name: "section",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Defines a generic standalone thematic section of a document, typically containing an explanatory heading (<h2>, <h3>).",
    hinglish: "Ek thematic content section jaise Features, Pricing, ya Reviews. Isme aamtaur par ek heading zaroor hoti hai.",
    hindi: "पेज का एक विषयगत खंड (जैसे फीचर्स, मूल्य सूची, समीक्षाएं) जिसमें सामान्यतः एक हेडिंग होती है।",
    attributes: [],
    example: `<section>
  <h2>Course Features</h2>
  <p>100% free interactive lessons with instant code compilation.</p>
</section>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-radius:6px; border:1px solid #1e293b; color:#e2e8f0;">
  <h4 style="margin:0 0 6px; color:#38bdf8; font-size:14px;">📑 Section: Features</h4>
  <p style="margin:0; font-size:13px; color:#94a3b8;">Interactive sandbox with live execution.</p>
</div>`
  },
  {
    tag: "<article>",
    name: "article",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Represents an independent, self-contained composition that makes sense on its own (e.g. blog post, newspaper article, forum post, product card).",
    hinglish: "Self-contained content jise agar page se alag bhi share karein to uska poora matlab nikle — jaise blog post, news ya product card.",
    hindi: "स्वतंत्र व स्व-निहित सामग्री (जैसे ब्लॉग पोस्ट, समाचार लेख, यूजर कमेंट) जिसे स्वतंत्र रूप से साझा किया जा सके।",
    attributes: [],
    example: `<article>
  <h2>How Web Browsers Work</h2>
  <p>Published on: <time datetime="2026-09-04">Sept 4, 2026</time></p>
  <p>Browsers parse HTML into a DOM tree and render CSS rules.</p>
</article>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:14px; border-radius:8px; border:1px solid #04AA6D; color:#f8fafc;">
  <span style="color:#04AA6D; font-size:11px; font-weight:bold;">📰 ARTICLE</span>
  <h4 style="margin:4px 0; color:#fff; font-size:15px;">Understanding DOM Rendering</h4>
  <p style="margin:0; font-size:12px; color:#94a3b8;">Independent post that can be distributed via RSS feeds.</p>
</div>`
  },
  {
    tag: "<aside>",
    name: "aside",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Represents content tangentially related to the main content (e.g., sidebar, related links, advertisements, author bio).",
    hinglish: "Side content jo main topic se thoda related ho — jaise sidebar, related articles, ads, ya author bio.",
    hindi: "मुख्य सामग्री से आंशिक रूप से संबंधित सामग्री (जैसे साइडबार, संबंधित लिंक, विज्ञापन, लेखक का परिचय)।",
    attributes: [],
    example: `<aside>
  <h3>Related Resources</h3>
  <ul>
    <li><a href="/css">CSS3 Masterclass</a></li>
    <li><a href="/js">JavaScript for Beginners</a></li>
  </ul>
</aside>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-left:4px solid #a855f7; border-radius:4px; color:#e2e8f0;">
  <strong style="color:#a855f7; font-size:13px;">📌 Sidebar Note (Aside)</strong>
  <p style="margin:4px 0 0; font-size:12px; color:#94a3b8;">Pro Tip: Combine semantic HTML with CSS Grid for clean responsive layouts.</p>
</div>`
  },
  {
    tag: "<h1> to <h6>",
    name: "h1-h6",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Six levels of section headings. <h1> is the most important primary title (use only one per page for SEO), down to <h6> for minor sub-sections.",
    hinglish: "Headings ke 6 levels. <h1> sabse bada aur SEO ke liye mukhya hota hai, <h6> sabse chhota sub-heading hota hai.",
    hindi: "हेडिंग के 6 स्तर। <h1> सबसे मुख्य शीर्षक है (SEO हेतु पेज पर केवल एक उपयोग करें) और <h6> सबसे छोटा उप-शीर्षक है।",
    attributes: [],
    example: `<h1>Main Page Title (H1)</h1>
<h2>Major Section Heading (H2)</h2>
<h3>Sub-topic Heading (H3)</h3>
<h4>Minor Heading (H4)</h4>
<h5>Sub-section Heading (H5)</h5>
<h6>Lowest Level Heading (H6)</h6>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-radius:6px; color:#fff;">
  <h1 style="margin:0 0 4px; font-size:18px; color:#38bdf8;">H1: Main Title</h1>
  <h2 style="margin:0 0 4px; font-size:15px; color:#04AA6D;">H2: Section Subheading</h2>
  <h3 style="margin:0; font-size:13px; color:#c1a648;">H3: Topic Sub-heading</h3>
</div>`
  },
  {
    tag: "<footer>",
    name: "footer",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Represents a footer for its nearest section or page root. Contains copyright notices, social links, author attribution, and privacy policies.",
    hinglish: "Page ya section ka sabse neeche wala footer area jisme copyright, privacy policy aur contact links hote hain.",
    hindi: "पेज या सेक्शन का निचला पाद-लेख (फ़ुटर) जिसमें कॉपीराइट, संपर्क लिंक और नीतियां होती हैं।",
    attributes: [],
    example: `<footer>
  <p>&copy; 2026 NextSem Academy. Authored by Er. Manoj Kumar.</p>
  <a href="/privacy">Privacy Policy</a>
</footer>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-top:1px solid #334155; border-radius:6px; text-align:center; color:#94a3b8; font-size:12px;">
  <div>&copy; 2026 NextSem Academy &bull; Authored by Er. Manoj Kumar</div>
  <div style="margin-top:4px; color:#38bdf8;">Privacy Policy &bull; Terms of Service &bull; Contact</div>
</div>`
  },
  {
    tag: "<address>",
    name: "address",
    category: "Layout & Sectioning",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Supplies contact information for the author or owner of the document or article (email, physical address, phone number).",
    hinglish: "Website author ya organization ka contact information (email, address, phone number) dikhane ke liye tag.",
    hindi: "लेखक या संगठन के संपर्क विवरण (ईमेल, पता, फोन) को दर्शाने वाला सिमेंटिक टैग।",
    attributes: [],
    example: `<address>
  Written by <a href="mailto:contact@nextsem.online">Er. Manoj Kumar</a><br>
  NextSem Academy, New Delhi, India
</address>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px; font-style:italic;">
  📫 Written by <span style="color:#38bdf8; font-style:normal; font-weight:bold;">Er. Manoj Kumar</span><br>
  <span style="font-size:12px; color:#94a3b8;">NextSem Academy, New Delhi, India</span>
</div>`
  },

  // ──────────────────────────────────────────────
  // 3. TEXT & GROUPING
  // ──────────────────────────────────────────────
  {
    tag: "<p>",
    name: "p",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Defines a paragraph of text. Browsers automatically add vertical margin spacing above and below paragraph blocks.",
    hinglish: "Text ka ek paragraph banata hai. Browser automatically iske upar aur neeche thoda space (margin) jod deta hai.",
    hindi: "टेक्स्ट का पैराग्राफ बनाता है। ब्राउज़र स्वतः इसके ऊपर और नीचे स्पेस जोड़ता है।",
    attributes: [],
    example: `<p>HTML is the standard markup language for documents designed to be displayed in a web browser.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0;">
  <p style="margin:0; font-size:13px; line-height:1.5;">HTML is the fundamental building block of all web pages.</p>
</div>`
  },
  {
    tag: "<hr>",
    name: "hr",
    category: "Text & Grouping",
    isVoid: true,
    display: "block",
    isHtml5: false,
    english: "Draws a horizontal rule representing a thematic break between paragraphs or content sections (void/self-closing).",
    hinglish: "Content ke beech ek horizontal divider line kheechta hai thematic break dikhane ke liye.",
    hindi: "दो अनुभागों या पैराग्राफों के बीच क्षैतिज रेखा (विभाजक) खींचता है।",
    attributes: [],
    example: `<p>First Section Content</p>
<hr>
<p>Second Section Content</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0;">
  <p style="margin:0 0 6px; font-size:13px;">Topic A: Frontend</p>
  <hr style="border:none; border-top:1px solid #334155; margin:8px 0;">
  <p style="margin:0; font-size:13px;">Topic B: Backend</p>
</div>`
  },
  {
    tag: "<pre>",
    name: "pre",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Defines preformatted text. Preserves all spaces, line breaks, and tabs exactly as written in the source code in a monospace font.",
    hinglish: "Preformatted text — iske andar saare spaces, tabs aur line breaks bilkul waise hi dikhte hain jaise code mein likhe hain.",
    hindi: "पूर्व-स्वरूपित टेक्स्ट। सभी रिक्त स्थान (spaces), टैब और लाइन ब्रेक को स्रोत कोड के अनुसार सुरक्षित रखता है।",
    attributes: [],
    example: `<pre>
  function calculateTotal(a, b) {
    return a + b;
  }
</pre>`,
    livePreviewHtml: `<pre style="background:#0c1328; color:#38bdf8; padding:10px; border-radius:6px; font-size:12px; margin:0; border:1px solid #1e293b;">  function add(x, y) {
    return x + y; // Preserves whitespace & tabs
  }</pre>`
  },
  {
    tag: "<blockquote>",
    name: "blockquote",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Represents an extended quotation quoted from another source, typically indented visually with left border styling.",
    hinglish: "Kissi doosre source se liya gaya bada quote dikhane ke liye tag. By default left-side se indented hota hai.",
    hindi: "किसी बाहरी स्रोत से उद्धृत लंबा उद्धरण (कोटेशन)। यह आमतौर पर बाएं तरफ इंडेंटेड दिखता है।",
    attributes: [
      { name: "cite", description: "URL pointing to the source quotation", exampleValue: '"https://w3.org"' }
    ],
    example: `<blockquote cite="https://www.w3.org">
  <p>The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.</p>
  <footer>— Tim Berners-Lee</footer>
</blockquote>`,
    livePreviewHtml: `<blockquote style="margin:0; padding:10px 14px; background:#0c1328; border-left:4px solid #04AA6D; border-radius:4px; font-family:sans-serif; color:#e2e8f0; font-size:13px;">
  "The power of the Web is in its universality."
  <div style="font-size:11px; color:#94a3b8; margin-top:4px;">— Tim Berners-Lee</div>
</blockquote>`
  },
  {
    tag: "<ol>",
    name: "ol",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Creates an ordered (numbered) list where sequence matters. Contains <li> list items.",
    hinglish: "Numbered (ordered) list banata hai (1, 2, 3...) jahan sequence ya steps important hote hain.",
    hindi: "क्रमबद्ध (संख्यांकित) सूची बनाता है जहां क्रम महत्वपूर्ण होता है। इसके अंदर <li> टैग्स होते हैं।",
    attributes: [
      { name: "type", description: "Numbering style ('1', 'a', 'A', 'i', 'I')", exampleValue: '"1"' },
      { name: "start", description: "Starting number value", exampleValue: '"5"' },
      { name: "reversed", description: "Counts backwards", exampleValue: 'true' }
    ],
    example: `<ol type="1" start="1">
  <li>Install VS Code</li>
  <li>Write HTML Code</li>
  <li>Open in Browser</li>
</ol>`,
    livePreviewHtml: `<ol style="margin:0; padding-left:20px; font-family:sans-serif; color:#e2e8f0; font-size:13px;">
  <li>Install Code Editor</li>
  <li>Write Semantic HTML</li>
  <li>Deploy to Web</li>
</ol>`
  },
  {
    tag: "<ul>",
    name: "ul",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Creates an unordered (bulleted) list where the sequence does not strictly matter. Contains <li> list items.",
    hinglish: "Bulleted (unordered) list banata hai jahan items ka koi fixed order hona zaroori nahi hota.",
    hindi: "अक्रमित (बुलेटेड) सूची बनाता है। इसके अंदर <li> लिस्ट आइटम होते हैं।",
    attributes: [],
    example: `<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
</ul>`,
    livePreviewHtml: `<ul style="margin:0; padding-left:20px; font-family:sans-serif; color:#38bdf8; font-size:13px;">
  <li><span style="color:#e2e8f0;">HTML5 Semantics</span></li>
  <li><span style="color:#e2e8f0;">CSS Flexbox & Grid</span></li>
  <li><span style="color:#e2e8f0;">Modern JavaScript</span></li>
</ul>`
  },
  {
    tag: "<li>",
    name: "li",
    category: "Text & Grouping",
    isVoid: false,
    display: "list-item",
    isHtml5: false,
    english: "Defines an individual list item. Must always be placed inside an <ol>, <ul>, or <menu> parent container.",
    hinglish: "List ka ek single item. Yeh hamesha <ol> ya <ul> ke andar hi likha jata hai.",
    hindi: "सूची का एक एकल आइटम। हमेशा <ol>, <ul> या <menu> के अंदर प्रयोग किया जाता है।",
    attributes: [
      { name: "value", description: "Sets custom numeric value inside an <ol>", exampleValue: '"10"' }
    ],
    example: `<ol>
  <li value="10">Special Item 10</li>
  <li>Auto Item 11</li>
</ol>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:8px 14px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  &bull; &lt;li&gt; List item node
</div>`
  },
  {
    tag: "<dl>, <dt>, <dd>",
    name: "dl-dt-dd",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Creates a description list (<dl>) of term definitions (<dt>) accompanied by their detailed descriptions (<dd>). Great for glossaries and dictionaries.",
    hinglish: "Dictionary ya glossary banane ka list format. <dt> term (word) hota hai aur <dd> uska description/meaning hota hai.",
    hindi: "शब्दावली या विवरण सूची। <dl> सूची कंटेनर है, <dt> शब्द है और <dd> उसका विस्तृत अर्थ/विवरण है।",
    attributes: [],
    example: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`,
    livePreviewHtml: `<dl style="margin:0; font-family:sans-serif; background:#0c1328; padding:10px 14px; border-radius:6px; font-size:13px;">
  <dt style="color:#38bdf8; font-weight:bold;">HTML</dt>
  <dd style="margin:2px 0 8px 12px; color:#94a3b8;">HyperText Markup Language</dd>
  <dt style="color:#04AA6D; font-weight:bold;">CSS</dt>
  <dd style="margin:2px 0 0 12px; color:#94a3b8;">Cascading Style Sheets</dd>
</dl>`
  },
  {
    tag: "<figure> & <figcaption>",
    name: "figure-figcaption",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "<figure> wraps self-contained visual assets (photos, code snippets, charts), and <figcaption> provides an accessible caption for it.",
    hinglish: "Image, chart ya diagram ke saath uska caption (heading/title) jodkar ek semantic block banata hai.",
    hindi: "चित्रों, आरेखों या कोड के साथ उनका शीर्षक/कैप्शन जोड़ने हेतु प्रयुक्त सिमेंटिक टैग।",
    attributes: [],
    example: `<figure>
  <img src="code-preview.png" alt="Code Syntax">
  <figcaption>Fig 1.1: Visual layout of DOM tree</figcaption>
</figure>`,
    livePreviewHtml: `<figure style="margin:0; font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; text-align:center; border:1px solid #1e293b;">
  <div style="background:#1e293b; padding:16px; border-radius:4px; color:#38bdf8; font-size:13px;">🖼️ [Diagram / Illustration]</div>
  <figcaption style="margin-top:6px; font-size:12px; color:#94a3b8; font-style:italic;">Fig 1.1 - DOM Tree Model</figcaption>
</figure>`
  },
  {
    tag: "<div>",
    name: "div",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Generic block-level division container with no semantic meaning. Used extensively as a layout wrapper for CSS styling and flexbox/grid grids.",
    hinglish: "Generic block container jiska koi khas semantic meaning nahi hota. CSS styling aur layout grouping ke liye sabse zyada use hota hai.",
    hindi: "सामान्य ब्लॉक-लेवल कंटेनर जिसका कोई अंतर्निहित सिमेंटिक अर्थ नहीं होता। सीएसएस लेआउट और ग्रुपिंग हेतु सर्वाधिक प्रयुक्त।",
    attributes: [
      { name: "class", description: "CSS class name for styling", exampleValue: '"card-container"' },
      { name: "id", description: "Unique identifier for JavaScript DOM selection", exampleValue: '"main-wrapper"' }
    ],
    example: `<div class="card">
  <h3>NextSem Card</h3>
  <p>Wrapped inside a generic div container.</p>
</div>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; border:1px solid #334155; padding:12px; border-radius:8px; color:#e2e8f0;">
  <span style="font-size:11px; color:#64748b; font-family:monospace;">&lt;div class="card"&gt;</span>
  <div style="font-size:13px; color:#fff; font-weight:600; margin-top:2px;">Generic Styled Box</div>
</div>`
  },
  {
    tag: "<menu>",
    name: "menu",
    category: "Text & Grouping",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "A semantic alternative to <ul> specifically designated for a toolbar or menu of interactive commands and buttons.",
    hinglish: "Toolbar ya action buttons ke menu list ke liye semantic container.",
    hindi: "टूलबार या एक्शन बटनों की इंटरैक्टिव सूची हेतु <ul> का सिमेंटिक विकल्प।",
    attributes: [],
    example: `<menu>
  <li><button onclick="save()">Save</button></li>
  <li><button onclick="share()">Share</button></li>
</menu>`,
    livePreviewHtml: `<menu style="margin:0; padding:0; list-style:none; display:flex; gap:8px; font-family:sans-serif;">
  <li><button style="background:#04AA6D; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:12px; cursor:pointer;">💾 Save</button></li>
  <li><button style="background:#0284c7; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:12px; cursor:pointer;">🔗 Share</button></li>
</menu>`
  },

  // ──────────────────────────────────────────────
  // 4. INLINE TEXT SEMANTICS & FORMATTING
  // ──────────────────────────────────────────────
  {
    tag: "<a>",
    name: "a",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "The anchor tag creates hyperlinks to jump to other web pages, files, email addresses, phone numbers, or sections on the same page.",
    hinglish: "Hyperlink banane wala tag. Click karne par doosre page, website, email ya phone dialer par redirect karta hai.",
    hindi: "हाइपरलिंक बनाने वाला टैग जो अन्य वेब पेजों, फाइलों, ईमेल या फोन नंबरों से जोड़ता है।",
    attributes: [
      { name: "href", description: "Destination URL or anchor link", exampleValue: '"https://nextsem.online"' },
      { name: "target", description: "Target window ('_blank' opens in new tab)", exampleValue: '"_blank"' },
      { name: "rel", description: "Security relationship for external tabs ('noopener noreferrer')", exampleValue: '"noopener noreferrer"' },
      { name: "download", description: "Prompts download with suggested filename", exampleValue: '"guide.pdf"' }
    ],
    example: `<a href="https://nextsem.online" target="_blank" rel="noopener noreferrer">
  Visit NextSem Online (Opens in New Tab)
</a>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px;">
  <a href="#" style="color:#38bdf8; text-decoration:underline; font-size:13px; font-weight:600;">🔗 Click to Visit NextSem Online &rarr;</a>
</div>`
  },
  {
    tag: "<strong>",
    name: "strong",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Indicates strong importance, seriousness, or urgency for its contents. Screen readers pronounce it with emphasized vocal stress, and browsers render it bold.",
    hinglish: "Text ko strong importance deta hai. Screen readers isko zor dekar bolte hain aur browser bold dikhata hai.",
    hindi: "टेक्स्ट को गहरा महत्व या गंभीरता प्रदान करता है। स्क्रीन रीडर इसे जोर देकर पढ़ते हैं और ब्राउज़र बोल्ड दिखाते हैं।",
    attributes: [],
    example: `<p><strong>Warning:</strong> Always save your work before closing the terminal.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  <strong style="color:#f87171; font-weight:bold;">⚠️ Caution:</strong> Strong semantic importance text.
</div>`
  },
  {
    tag: "<em>",
    name: "em",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Marks text with stress emphasis that alters the spoken meaning of a sentence. Rendered in italics by browsers.",
    hinglish: "Text par bolte waqt zor (stress emphasis) dene ke liye use hota hai. Browser isko italic dikhata hai.",
    hindi: "वाक्य के अर्थ में विशेष जोर (तनाव) दर्शाने के लिए। ब्राउज़र इसे इटैलिक (तिरछा) प्रदर्शित करते हैं।",
    attributes: [],
    example: `<p>I <em>love</em> learning web development!</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  You <em>must</em> complete the assignment today.
</div>`
  },
  {
    tag: "<b> & <i>",
    name: "b-i",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "<b> draws stylistic attention (bold) without semantic urgency. <i> renders text in alternate voice/mood (italic) such as technical terms or idioms.",
    hinglish: "<b> bina extra importance ke text ko bold karta hai. <i> alternate voice ya technical terms ko italic karta hai.",
    hindi: "<b> बिना अतिरिक्त महत्ता के टेक्स्ट को बोल्ड करता है। <i> तकनीकी शब्दों या मुहावरों को इटैलिक में दिखाता है।",
    attributes: [],
    example: `<p>The keyword <b>HTML</b> is a <i>lingua franca</i> of the internet.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Keyword <b>HTML5</b> is the <i>lingua franca</i> of the modern web.
</div>`
  },
  {
    tag: "<small>",
    name: "small",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Represents side-comments, fine print, copyright details, and legal disclaimers in smaller typography.",
    hinglish: "Chhota fine print, copyright terms, ya legal notices dikhane ke liye tag.",
    hindi: "छोटे अक्षरों में कानूनी शर्तें, नियम या कॉपीराइट जानकारी प्रदर्शित करने वाला टैग।",
    attributes: [],
    example: `<p>&copy; 2026 NextSem. <small>All rights reserved. Terms & conditions apply.</small></p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  NextSem Online &bull; <small style="font-size:11px; color:#94a3b8;">Terms and privacy conditions apply.</small>
</div>`
  },
  {
    tag: "<s> & <del>",
    name: "s-del",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "<s> marks text that is no longer accurate or relevant (strikethrough). <del> represents explicitly deleted text in an edit.",
    hinglish: "Text ko strikethrough (beech se kata hua) dikhata hai — jaise puraani price ya out-of-stock item.",
    hindi: "कटिंग लाइन (स्ट्राइकथ्रू) के साथ पुरानी या हटाई गई जानकारी को दर्शाता है (जैसे पुराना मूल्य)।",
    attributes: [],
    example: `<p>Original Price: <s>$99</s> <ins>$49</ins></p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Course Price: <s style="color:#ef4444;">₹1,999</s> <span style="color:#10b981; font-weight:bold; margin-left:6px;">FREE (₹0)</span>
</div>`
  },
  {
    tag: "<ins>",
    name: "ins",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Represents a range of text that has been newly inserted into a document (rendered with underline).",
    hinglish: "Naye jode gaye text ko darshata hai. By default underlined render hota hai.",
    hindi: "दस्तावेज़ में नए जोड़े गए टेक्स्ट को रेखांकित (अंडरलाइन) रूप में प्रदर्शित करता है।",
    attributes: [
      { name: "cite", description: "URL explaining reason for insertion", exampleValue: '"#update-log"' },
      { name: "datetime", description: "Timestamp of edit", exampleValue: '"2026-09-04T12:00"' }
    ],
    example: `<p><del>Draft version</del> <ins>Published final version</ins></p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Status: <ins style="color:#10b981;">Verified Complete</ins>
</div>`
  },
  {
    tag: "<mark>",
    name: "mark",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "Highlights a portion of text with a yellow background for reference or relevance purposes (like using a highlighter marker).",
    hinglish: "Text ko highlighter marker ki tarah yellow background mein highlight karke dikhata hai.",
    hindi: "हाइलाइटर मार्कर की तरह टेक्स्ट के पीछे पीला रंग लगाकर उसे हाइलाइट करता है।",
    attributes: [],
    example: `<p>Do not forget to buy <mark>milk and eggs</mark> today.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Search match: Learn <mark style="background:#fef08a; color:#854d0e; padding:1px 4px; border-radius:2px; font-weight:bold;">HTML5 tags</mark> easily.
</div>`
  },
  {
    tag: "<code>, <kbd>, <samp>, <var>",
    name: "code-kbd-samp-var",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "<code> displays computer code fragments; <kbd> indicates keyboard keys (Ctrl+C); <samp> shows program output; <var> denotes mathematical/programming variables.",
    hinglish: "<code> code snippet ke liye, <kbd> keyboard shortcut keys ke liye, <samp> terminal output ke liye, aur <var> variable name ke liye.",
    hindi: "<code> कोड अंश के लिए, <kbd> कीबोर्ड कुंजियों हेतु, <samp> प्रोग्राम आउटपुट के लिए और <var> चर (वेरिएबल) हेतु।",
    attributes: [],
    example: `<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy the <var>x</var> variable in <code>console.log(x)</code>.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Press <kbd style="background:#1e293b; border:1px solid #475569; padding:2px 6px; border-radius:4px; font-family:monospace; font-size:11px; box-shadow:0 1px 0 #000;">Ctrl</kbd> + <kbd style="background:#1e293b; border:1px solid #475569; padding:2px 6px; border-radius:4px; font-family:monospace; font-size:11px; box-shadow:0 1px 0 #000;">S</kbd> to run <code style="background:#0f172a; color:#38bdf8; padding:2px 4px; border-radius:3px;">save()</code>.
</div>`
  },
  {
    tag: "<sub> & <sup>",
    name: "sub-sup",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "<sub> renders subscript text below the baseline (e.g. H₂O). <sup> renders superscript text above the baseline (e.g. E = mc² or 1st, 2nd).",
    hinglish: "<sub> chemical formulas (H₂O) ke liye neeche text karta hai. <sup> power ya exponent (x², 1st) ke liye upar text karta hai.",
    hindi: "<sub> सबस्क्रिप्ट (नीचे) जैसे H₂O और <sup> सुपरस्क्रिप्ट (ऊपर) जैसे गणितीय घात E = mc² हेतु प्रयुक्त।",
    attributes: [],
    example: `<p>Water formula: H<sub>2</sub>O</p>
<p>Einstein Equation: E = mc<sup>2</sup></p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Chemistry: H<sub>2</sub>O &bull; Math: a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
</div>`
  },
  {
    tag: "<abbr>",
    name: "abbr",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Defines an abbreviation or acronym. The title attribute provides the full expansion shown on hover and read by screen readers.",
    hinglish: "Abbreviation ya short form ka full form hover tooltip mein dikhane ke liye tag.",
    hindi: "संक्षिप्त नाम (एक्रोनिम) का पूरा रूप टूलटिप और स्क्रीन रीडर में दिखाने के लिए।",
    attributes: [
      { name: "title", description: "Full expansion of the abbreviation", exampleValue: '"HyperText Markup Language"' }
    ],
    example: `<p><abbr title="HyperText Markup Language">HTML</abbr> is easy to learn.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  <abbr title="HyperText Markup Language" style="text-decoration:underline dotted #38bdf8; cursor:help; color:#38bdf8; font-weight:bold;">HTML</abbr> is the standard language.
</div>`
  },
  {
    tag: "<time>",
    name: "time",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "Represents a specific point in time or duration. The datetime attribute provides a machine-readable ISO date format for calendar scrapers and search bots.",
    hinglish: "Date ya time ko machine-readable ISO format mein darshata hai taaki search engines aur calendar apps samajh sakein.",
    hindi: "मशीन-पठनीय प्रारूप में समय या तारीख को प्रदर्शित करने वाला सिमेंटिक टैग।",
    attributes: [
      { name: "datetime", description: "ISO 8601 formatted date/time (YYYY-MM-DD)", exampleValue: '"2026-09-04"' }
    ],
    example: `<p>Class starts on <time datetime="2026-09-04T09:00">September 4 at 9:00 AM</time>.</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  📅 Date: <time datetime="2026-09-04" style="color:#04AA6D; font-weight:bold;">September 4, 2026</time>
</div>`
  },
  {
    tag: "<span>",
    name: "span",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Generic inline container with no semantic meaning. Used to wrap a piece of text for targeted CSS styling or JavaScript manipulation without creating a line break.",
    hinglish: "Generic inline wrapper jisse bina nayi line shuru kiye text ke kisi hisse ko color ya style de sakte hain.",
    hindi: "सामान्य इनलाइन कंटेनर जिसका उपयोग बिना लाइन बदले टेक्स्ट के किसी भाग को स्टाइल करने में होता है।",
    attributes: [
      { name: "class", description: "CSS class identifier", exampleValue: '"highlight-text"' }
    ],
    example: `<p>Hello <span style="color: #04AA6D; font-weight: bold;">NextSem</span> Developers!</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Welcome to <span style="color:#04AA6D; font-weight:bold; background:#04AA6D20; padding:2px 6px; border-radius:4px;">NextSem</span> Academy!
</div>`
  },
  {
    tag: "<br> & <wbr>",
    name: "br-wbr",
    category: "Inline Semantics",
    isVoid: true,
    display: "inline",
    isHtml5: false,
    english: "<br> inserts a hard line break without starting a new paragraph. <wbr> specifies a word-break opportunity where a browser may optionally wrap a long URL or word.",
    hinglish: "<br> nayi line mein break karta hai. <wbr> bohot lambe shabdon ya URLs mein wrap hone ki jagah batata hai.",
    hindi: "<br> नई लाइन शुरू करता है और <wbr> लंबे शब्दों या लिंक्स को सुरक्षित रूप से मोड़ने की जगह बताता है।",
    attributes: [],
    example: `<p>NextSem Academy<br>New Delhi, India</p>
<p>https://nextsem.online/learning/<wbr>all-html-tags-complete-reference</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  Line 1: NextSem<br>Line 2: New Line via &lt;br&gt;
</div>`
  },
  {
    tag: "<q> & <cite>",
    name: "q-cite",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "<q> marks a short inline quotation (browsers add quotation marks automatically). <cite> marks the title of a referenced creative work (book, paper, movie).",
    hinglish: "<q> chhota inline quotation banata hai (quotes automatically aate hain). <cite> book ya movie ka title dikhane ke liye tag hai.",
    hindi: "<q> छोटा इनलाइन उद्धरण है (कोटेशन मार्क्स स्वतः जुड़ते हैं) और <cite> पुस्तक या रचना के शीर्षक हेतु है।",
    attributes: [
      { name: "cite", description: "URL source of quotation", exampleValue: '"https://book.org"' }
    ],
    example: `<p>As stated in <cite>HTML & CSS Book</cite>, <q>HTML provides the structure of web pages.</q></p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  In <cite style="color:#c1a648; font-style:italic;">NextSem Guide</cite>, <q style="color:#38bdf8;">Code daily to master web development.</q>
</div>`
  },
  {
    tag: "<bdi> & <bdo>",
    name: "bdi-bdo",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "<bdi> isolates text that might be formatted in a different direction (e.g. Arabic/Hebrew) from surrounding text. <bdo> explicitly overrides the text direction (LTR or RTL).",
    hinglish: "<bdi> doosri bhasha (jaise Urdu/Arabic) ke text direction ko isolate karta hai. <bdo> text direction ko zabardasti LTR ya RTL banata hai.",
    hindi: "<bdi> अलग दिशा वाले टेक्स्ट को अलग करता है और <bdo> टेक्स्ट दिशा को जबरन बाएं-से-दाएं या दाएं-से-बाएं करता है।",
    attributes: [
      { name: "dir", description: "Direction override ('ltr' or 'rtl')", exampleValue: '"rtl"' }
    ],
    example: `<!-- BDO forces Right-to-Left -->
<bdo dir="rtl">This English text is reversed.</bdo>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  BDO Reverse: <bdo dir="rtl" style="color:#ec4899; font-weight:bold;">NextSem.online</bdo>
</div>`
  },
  {
    tag: "<ruby>, <rt>, <rp>",
    name: "ruby-rt-rp",
    category: "Inline Semantics",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "Used to present East Asian pronunciation ruby annotations over characters (<ruby>), with ruby text (<rt>) and fallback parentheses (<rp>).",
    hinglish: "East Asian bhashaon ke aksharon ke upar unka pronunciation likhne ke liye use hone wala tag set.",
    hindi: "पूर्वी एशियाई भाषा के अक्षरों के ऊपर उच्चारण मार्गदर्शिका दर्शाने हेतु प्रयुक्त टैग।",
    attributes: [],
    example: `<ruby>
  漢 <rp>(</rp><rt>Kan</rt><rp>)</rp>
  字 <rp>(</rp><rt>ji</rt><rp>)</rp>
</ruby>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:16px;">
  <ruby>漢<rt style="font-size:10px; color:#38bdf8;">kan</rt></ruby> <ruby>字<rt style="font-size:10px; color:#38bdf8;">ji</rt></ruby>
</div>`
  },

  // ──────────────────────────────────────────────
  // 5. MEDIA & MULTIMEDIA
  // ──────────────────────────────────────────────
  {
    tag: "<img>",
    name: "img",
    category: "Media & Multimedia",
    isVoid: true,
    display: "inline-block",
    isHtml5: false,
    english: "Embeds an image in the document. The src attribute gives the image URL, and alt provides required accessibility text for screen readers.",
    hinglish: "Page par photo/image embed karta hai. src mein file path aur alt mein description daalte hain.",
    hindi: "वेब पेज पर चित्र (इमेज) जोड़ता है। src में चित्र का पता और alt में विवरण दिया जाता है।",
    attributes: [
      { name: "src", description: "Image file path or web URL", exampleValue: '"photo.jpg"' },
      { name: "alt", description: "Alternative text for accessibility & SEO", exampleValue: '"Developer working"' },
      { name: "loading", description: "Lazy loading support ('lazy', 'eager')", exampleValue: '"lazy"' },
      { name: "width", description: "Intrinsic width in pixels", exampleValue: '"300"' },
      { name: "height", description: "Intrinsic height in pixels", exampleValue: '"200"' }
    ],
    example: `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" 
     alt="Laptop on desk with code editor" 
     loading="lazy" 
     width="320" 
     height="180">`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; text-align:center;">
  <div style="background:#1e293b; border-radius:6px; padding:20px; display:inline-flex; align-items:center; gap:8px; color:#38bdf8;">
    <span>🖼️</span> <strong>&lt;img src="laptop.jpg" alt="Laptop" /&gt;</strong>
  </div>
</div>`
  },
  {
    tag: "<picture> & <source>",
    name: "picture-source",
    category: "Media & Multimedia",
    isVoid: false,
    display: "inline-block",
    isHtml5: true,
    english: "<picture> contains multiple <source> tags to provide responsive images based on screen width (media queries) or modern image formats (AVIF, WebP) with an <img> fallback.",
    hinglish: "Screen size (mobile vs desktop) ya modern image format (AVIF/WebP) ke hisaab se alag-alag images load karne ka wrapper.",
    hindi: "स्क्रीन साइज या फॉर्मेट (WebP, AVIF) के आधार पर उपयुक्त इमेज चुनने हेतु रिस्पॉन्सिव इमेज कंटेनर।",
    attributes: [
      { name: "srcset", description: "Source image candidates", exampleValue: '"banner-mobile.webp"' },
      { name: "media", description: "CSS media query condition", exampleValue: '"(min-width: 768px)"' },
      { name: "type", description: "Image MIME type", exampleValue: '"image/webp"' }
    ],
    example: `<picture>
  <source media="(min-width: 1024px)" srcset="large.webp">
  <source media="(min-width: 640px)" srcset="medium.webp">
  <img src="fallback.jpg" alt="Responsive Banner">
</picture>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#cbd5e1; font-size:13px;">
  <span style="color:#10b981; font-weight:bold;">🖼️ Responsive Picture Element:</span>
  <p style="margin:4px 0 0; color:#94a3b8; font-size:12px;">Automatically serves AVIF on mobile & WebP on desktop.</p>
</div>`
  },
  {
    tag: "<video>",
    name: "video",
    category: "Media & Multimedia",
    isVoid: false,
    display: "inline-block",
    isHtml5: true,
    english: "Embeds a native video player in the HTML document. Supports playback controls, autoplay, loop, poster thumbnail, and subtitles via <track>.",
    hinglish: "Web page par video player embed karta hai. Controls, autoplay, loop aur poster image support karta hai.",
    hindi: "वेब पेज पर वीडियो प्लेयर जोड़ता है जिसमें प्ले/पॉज़ बटन, लूप और पोस्टर थंबनेल शामिल होते हैं।",
    attributes: [
      { name: "controls", description: "Shows native play/pause and volume controls", exampleValue: 'true' },
      { name: "autoplay", description: "Starts playback automatically (requires muted)", exampleValue: 'true' },
      { name: "muted", description: "Mutes the audio by default", exampleValue: 'true' },
      { name: "poster", description: "Thumbnail image displayed before video plays", exampleValue: '"thumb.jpg"' },
      { name: "loop", description: "Loops video continuously", exampleValue: 'true' }
    ],
    example: `<video width="480" height="270" controls poster="thumb.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser does not support HTML5 video.
</video>`,
    livePreviewHtml: `<div style="background:#0c1328; padding:12px; border-radius:6px; text-align:center; font-family:sans-serif; color:#e2e8f0;">
  <div style="background:#1e293b; padding:16px; border-radius:4px; display:inline-flex; align-items:center; gap:8px;">
    <span>🎬</span> <strong>HTML5 Video Player (controls enabled)</strong>
  </div>
</div>`
  },
  {
    tag: "<audio>",
    name: "audio",
    category: "Media & Multimedia",
    isVoid: false,
    display: "inline-block",
    isHtml5: true,
    english: "Embeds sound content or music streams in documents. Supports standard MP3, WAV, and OGG formats with native playback controls.",
    hinglish: "Music ya voice recording play karne ke liye audio player widget banata hai.",
    hindi: "वेब पेज पर ऑडियो/संगीत फाइलें (MP3, WAV, OGG) चलाने के लिए ऑडियो प्लेयर जोड़ता है।",
    attributes: [
      { name: "controls", description: "Displays native playback and volume controls", exampleValue: 'true' },
      { name: "autoplay", description: "Plays audio automatically", exampleValue: 'true' },
      { name: "loop", description: "Repeats audio track continuously", exampleValue: 'true' }
    ],
    example: `<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  Your browser does not support audio element.
</audio>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  🔊 &lt;audio controls&gt; Native audio playback bar
</div>`
  },
  {
    tag: "<track>",
    name: "track",
    category: "Media & Multimedia",
    isVoid: true,
    display: "none",
    isHtml5: true,
    english: "Specifies timed text subtitles, captions, or descriptions for <video> or <audio> using WebVTT (.vtt) subtitle files.",
    hinglish: "Video ya audio ke andar subtitles (captions) aur translation add karne ke liye tag.",
    hindi: "वीडियो और ऑडियो में सबटाइटल्स (उपशीर्षक) जोड़ने के लिए प्रयुक्त टैग।",
    attributes: [
      { name: "src", description: "Path to .vtt subtitle file", exampleValue: '"subtitles_en.vtt"' },
      { name: "kind", description: "Track type ('subtitles', 'captions', 'chapters')", exampleValue: '"subtitles"' },
      { name: "srclang", description: "Language code of subtitles", exampleValue: '"en"' },
      { name: "label", description: "Human-readable label shown in player menu", exampleValue: '"English"' }
    ],
    example: `<video controls>
  <source src="lesson.mp4" type="video/mp4">
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English" default>
  <track src="subtitles_hi.vtt" kind="subtitles" srclang="hi" label="Hindi">
</video>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#cbd5e1; font-size:13px;">
  💬 Track subtitle connected: <code>subtitles_en.vtt</code>
</div>`
  },
  {
    tag: "<iframe>",
    name: "iframe",
    category: "Media & Multimedia",
    isVoid: false,
    display: "inline-block",
    isHtml5: false,
    english: "Embeds an entire secondary HTML document (nested browsing context) inside current page (e.g., YouTube video, Google Map, payment widget).",
    hinglish: "Doosri website ya video (jaise YouTube video ya Google Map) ko apne page ke andar frame mein embed karta hai.",
    hindi: "दूसरे वेब पेज, यूट्यूब वीडियो या गूगल मैप को वर्तमान पेज के अंदर एम्बेड करने हेतु फ्रेम।",
    attributes: [
      { name: "src", description: "URL of embedded page", exampleValue: '"https://www.youtube.com/embed/..."' },
      { name: "width", description: "Frame width", exampleValue: '"560"' },
      { name: "height", description: "Frame height", exampleValue: '"315"' },
      { name: "sandbox", description: "Security sandbox restrictions", exampleValue: '"allow-scripts allow-same-origin"' },
      { name: "loading", description: "Lazy loading support", exampleValue: '"lazy"' }
    ],
    example: `<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" 
  title="Video Player" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" 
  allowfullscreen>
</iframe>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-radius:6px; text-align:center; border:1px solid #334155; color:#38bdf8;">
  🪟 <strong>Embedded iFrame Container</strong>
  <div style="font-size:12px; color:#94a3b8; margin-top:4px;">Renders nested web context safely.</div>
</div>`
  },
  {
    tag: "<embed> & <object>",
    name: "embed-object",
    category: "Media & Multimedia",
    isVoid: false,
    display: "inline-block",
    isHtml5: false,
    english: "Embeds external applications, multimedia plugins, or external documents (like PDF documents) into an HTML page.",
    hinglish: "PDF files, external flash/plugin content ko HTML page ke andar direct display karne ke liye.",
    hindi: "बाहरी एप्लिकेशन, पीडीएफ दस्तावेज़ या मल्टीमीडिया फ़ाइलों को एम्बेड करने के लिए।",
    attributes: [
      { name: "data", description: "URL of resource (object)", exampleValue: '"document.pdf"' },
      { name: "type", description: "MIME type", exampleValue: '"application/pdf"' }
    ],
    example: `<object data="curriculum.pdf" type="application/pdf" width="100%" height="400">
  <p>PDF reader plugin missing. <a href="curriculum.pdf">Download PDF</a></p>
</object>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#cbd5e1; font-size:13px;">
  📄 &lt;object data="doc.pdf"&gt; PDF Viewer Frame
</div>`
  },
  {
    tag: "<map> & <area>",
    name: "map-area",
    category: "Media & Multimedia",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Defines a client-side clickable image map (<map>) containing specific clickable geometric zones (<area>) that link to different destinations.",
    hinglish: "Ek single photo ke alag-alag hisso (parts) par alag-alag click links banane ke liye map aur area tags.",
    hindi: "एक चित्र के विभिन्न हिस्सों पर अलग-अलग क्लिक करने योग्य लिंक (हॉटस्पॉट) बनाने हेतु।",
    attributes: [
      { name: "shape", description: "Geometry shape ('rect', 'circle', 'poly')", exampleValue: '"rect"' },
      { name: "coords", description: "Pixel coordinates", exampleValue: '"34,44,270,350"' },
      { name: "href", description: "Destination link for this zone", exampleValue: '"#solar-panel"' }
    ],
    example: `<img src="computer.jpg" usemap="#computermap" alt="Computer">
<map name="computermap">
  <area shape="rect" coords="34,44,270,350" href="screen.html" alt="Monitor">
  <area shape="circle" coords="337,300,44" href="mouse.html" alt="Mouse">
</map>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:13px;">
  🗺️ Clickable Image Map Hotspot Area
</div>`
  },

  // ──────────────────────────────────────────────
  // 6. EMBEDDED & GRAPHICS
  // ──────────────────────────────────────────────
  {
    tag: "<svg>",
    name: "svg",
    category: "Embedded & Graphics",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "Scalable Vector Graphics container. Allows writing vector shapes (circles, paths, polygons) directly in HTML that scale infinitely without pixelation.",
    hinglish: "Scalable Vector Graphics — isse vector icons aur shapes bante hain jo kitna bhi zoom karne par pixelated nahi hote.",
    hindi: "स्केलेबल वेक्टर ग्राफिक्स। वेक्टर आइकन और आकृतियां बनाता है जो ज़ूम करने पर भी नहीं फटतीं।",
    attributes: [
      { name: "viewBox", description: "Coordinate system viewport", exampleValue: '"0 0 24 24"' },
      { name: "width", description: "Display width", exampleValue: '"24"' },
      { name: "height", description: "Display height", exampleValue: '"24"' }
    ],
    example: `<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" stroke="#04AA6D" stroke-width="4" fill="#0c1328" />
</svg>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; display:inline-flex; align-items:center; gap:10px;">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#04AA6D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
  <span style="color:#e2e8f0; font-size:13px; font-weight:bold;">Crisp Scalable SVG Star Icon</span>
</div>`
  },
  {
    tag: "<canvas>",
    name: "canvas",
    category: "Embedded & Graphics",
    isVoid: false,
    display: "inline-block",
    isHtml5: true,
    english: "Provides a scriptable resolution-dependent 2D and 3D WebGL bitmap surface used to draw graphs, game graphics, animations, or photo effects using JavaScript.",
    hinglish: "JavaScript ke zariye live graphics, games, charts aur animations draw karne ka drawing board.",
    hindi: "जावास्क्रिप्ट की मदद से 2डी/3डी ग्राफिक्स, गेम एनिमेशन और चार्ट्स बनाने वाला कैनवास।",
    attributes: [
      { name: "width", description: "Canvas pixel width", exampleValue: '"400"' },
      { name: "height", description: "Canvas pixel height", exampleValue: '"200"' }
    ],
    example: `<canvas id="gameCanvas" width="300" height="100"></canvas>
<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#04AA6D';
  ctx.fillRect(10, 10, 80, 80);
</script>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; border:1px solid #334155; display:inline-block;">
  <div style="width:160px; height:50px; background:#0f172a; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#38bdf8; font-size:12px; font-family:monospace;">
    🎮 Canvas Render Surface
  </div>
</div>`
  },
  {
    tag: "<script>",
    name: "script",
    category: "Embedded & Graphics",
    isVoid: false,
    display: "none",
    isHtml5: false,
    english: "Embeds or references executable client-side JavaScript code. Supports modern attributes like defer and async for optimal page speed.",
    hinglish: "JavaScript code ko HTML mein jodta hai. defer ya async attribute se page fast load hota hai.",
    hindi: "जावास्क्रिप्ट कोड को एचटीएमएल में शामिल करता है या बाहरी स्क्रिप्ट फ़ाइल को लिंक करता है।",
    attributes: [
      { name: "src", description: "URL or path of external JS file", exampleValue: '"app.js"' },
      { name: "defer", description: "Executes script after HTML parsing finishes", exampleValue: 'true' },
      { name: "async", description: "Loads and runs script asynchronously", exampleValue: 'true' },
      { name: "type", description: "Script type ('module' for ES modules)", exampleValue: '"module"' }
    ],
    example: `<!-- External Defer Script -->
<script src="bundle.js" defer></script>

<!-- Inline JavaScript -->
<script>
  console.log("NextSem HTML5 Reference Loaded!");
</script>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#cbd5e1; font-size:13px;">
  ⚡ &lt;script src="main.js" defer&gt; JavaScript Executable Node
</div>`
  },
  {
    tag: "<noscript>",
    name: "noscript",
    category: "Embedded & Graphics",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Defines fallback HTML content to be displayed ONLY if the user's browser does not support JavaScript or has it disabled.",
    hinglish: "Agar user ke browser mein JavaScript band (disabled) hai, tab yeh fallback message dikhta hai.",
    hindi: "यदि ब्राउज़र में जावास्क्रिप्ट अक्षम (डिसेबल्ड) हो, तो यह बैकअप संदेश दिखाता है।",
    attributes: [],
    example: `<noscript>
  <div class="warning">
    <p>JavaScript is disabled in your browser. Please enable it for the best experience.</p>
  </div>
</noscript>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#fbbf24; font-size:13px; border-left:3px solid #fbbf24;">
  ⚠️ &lt;noscript&gt; (Rendered if JavaScript is disabled)
</div>`
  },
  {
    tag: "<math>",
    name: "math",
    category: "Embedded & Graphics",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "The root element of MathML (Mathematical Markup Language), used to display complex mathematical formulas and equations directly in HTML.",
    hinglish: "Complex mathematical formulas aur equations ko HTML page par render karne ke liye MathML root tag.",
    hindi: "जटिल गणितीय सूत्रों और समीकरणों को सीधे वेब पेज पर दिखाने के लिए MathML टैग।",
    attributes: [],
    example: `<math>
  <mrow>
    <msup><mi>a</mi><mn>2</mn></msup>
    <mo>+</mo>
    <msup><mi>b</mi><mn>2</mn></msup>
    <mo>=</mo>
    <msup><mi>c</mi><mn>2</mn></msup>
  </mrow>
</math>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#e2e8f0; font-size:14px;">
  📐 MathML: a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
</div>`
  },

  // ──────────────────────────────────────────────
  // 7. TABLES
  // ──────────────────────────────────────────────
  {
    tag: "<table>",
    name: "table",
    category: "Tables",
    isVoid: false,
    display: "table",
    isHtml5: false,
    english: "Defines an HTML data table for presenting tabular two-dimensional data with rows and columns.",
    hinglish: "Rows aur Columns mein data dikhane ke liye data table banata hai.",
    hindi: "पंक्तियों (rows) और स्तंभों (columns) में डेटा प्रदर्शित करने हेतु टेबल बनाता है।",
    attributes: [],
    example: `<table>
  <caption>Student Grades</caption>
  <thead>
    <tr><th>Name</th><th>Subject</th><th>Grade</th></tr>
  </thead>
  <tbody>
    <tr><td>Manoj</td><td>Web Dev</td><td>A+</td></tr>
  </tbody>
</table>`,
    livePreviewHtml: `<table style="width:100%; border-collapse:collapse; font-family:sans-serif; background:#0c1328; border-radius:6px; overflow:hidden; font-size:12px;">
  <thead>
    <tr style="background:#1e293b; color:#38bdf8;">
      <th style="padding:6px 10px; text-align:left;">Tag</th>
      <th style="padding:6px 10px; text-align:left;">Type</th>
      <th style="padding:6px 10px; text-align:left;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-top:1px solid #334155; color:#e2e8f0;">
      <td style="padding:6px 10px;">&lt;table&gt;</td>
      <td style="padding:6px 10px;">Grid</td>
      <td style="padding:6px 10px; color:#10b981;">Standard</td>
    </tr>
  </tbody>
</table>`
  },
  {
    tag: "<caption>",
    name: "caption",
    category: "Tables",
    isVoid: false,
    display: "table-caption",
    isHtml5: false,
    english: "Provides an accessible title or caption for an HTML table. Must be the very first child element placed inside a <table>.",
    hinglish: "Table ka title ya summary caption. Yeh <table> ke andar sabse pehli line mein hota hai.",
    hindi: "टेबल का शीर्षक या सारांश। यह <table> टैग के ठीक बाद सबसे पहले आता है।",
    attributes: [],
    example: `<table>
  <caption>Quarterly Sales Report (2026)</caption>
  <!-- table content -->
</table>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:8px 12px; border-radius:6px; color:#c1a648; font-size:13px; font-weight:bold; text-align:center;">
  📊 Table Caption: Quarterly Sales 2026
</div>`
  },
  {
    tag: "<thead>, <tbody>, <tfoot>",
    name: "thead-tbody-tfoot",
    category: "Tables",
    isVoid: false,
    display: "table-row-group",
    isHtml5: false,
    english: "Semantic structure for tables: <thead> groups header rows, <tbody> contains the body data rows, and <tfoot> encapsulates footer summary rows.",
    hinglish: "Table ko teen hisso mein baant ta hai: <thead> header ke liye, <tbody> data ke liye, aur <tfoot> total/summary ke liye.",
    hindi: "टेबल के तीन भाग: <thead> हेडर पंक्तियों के लिए, <tbody> डेटा पंक्तियों के लिए और <tfoot> सारांश/योग हेतु।",
    attributes: [],
    example: `<table>
  <thead>
    <tr><th>Item</th><th>Price</th></tr>
  </thead>
  <tbody>
    <tr><td>HTML5 Course</td><td>$0</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>$0</td></tr>
  </tfoot>
</table>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:8px; border-radius:6px; font-size:12px; color:#cbd5e1;">
  <span style="color:#38bdf8;">&lt;thead&gt; Header</span> &bull; <span style="color:#10b981;">&lt;tbody&gt; Data</span> &bull; <span style="color:#c1a648;">&lt;tfoot&gt; Totals</span>
</div>`
  },
  {
    tag: "<tr>, <th>, <td>",
    name: "tr-th-td",
    category: "Tables",
    isVoid: false,
    display: "table-row",
    isHtml5: false,
    english: "<tr> defines a table row; <th> defines a table header cell (bold and centered by default); <td> defines a regular table data cell.",
    hinglish: "<tr> ek table row hoti hai. <th> header cell (bold) hota hai aur <td> aam data cell hota hai.",
    hindi: "<tr> पंक्ति (row) बनाता है, <th> हेडर सेल (बोल्ड) बनाता है और <td> सामान्य डेटा सेल बनाता है।",
    attributes: [
      { name: "colspan", description: "Number of columns a cell should span", exampleValue: '"2"' },
      { name: "rowspan", description: "Number of rows a cell should span", exampleValue: '"2"' },
      { name: "scope", description: "Header scope ('col', 'row', 'colgroup')", exampleValue: '"col"' }
    ],
    example: `<tr>
  <th scope="col">Subject</th>
  <th scope="col">Status</th>
</tr>
<tr>
  <td>Computer Basics</td>
  <td colspan="1">Active</td>
</tr>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:8px 12px; border-radius:6px; font-size:12px; color:#e2e8f0;">
  &lt;tr&gt; &rarr; &lt;th&gt;Header Cell&lt;/th&gt; | &lt;td&gt;Data Cell&lt;/td&gt;
</div>`
  },
  {
    tag: "<colgroup> & <col>",
    name: "colgroup-col",
    category: "Tables",
    isVoid: false,
    display: "table-column-group",
    isHtml5: false,
    english: "Specifies column properties (such as width, background color) for entire vertical columns in a table without repeating styles on every <td>.",
    hinglish: "Table ke saare vertical columns ki width aur background color ek hi jagah set karne ke liye tag.",
    hindi: "टेबल के पूरे कॉलम की चौड़ाई और बैकग्राउंड स्टाइल को एक साथ सेट करने वाला टैग।",
    attributes: [
      { name: "span", description: "Number of columns to style", exampleValue: '"2"' }
    ],
    example: `<table>
  <colgroup>
    <col style="background-color: #1e293b;">
    <col span="2" style="background-color: #0f172a;">
  </colgroup>
  <tr><th>ID</th><th>Name</th><th>Email</th></tr>
</table>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:8px; border-radius:6px; font-size:12px; color:#94a3b8;">
  &lt;colgroup&gt; Column-level bulk styling manager
</div>`
  },

  // ──────────────────────────────────────────────
  // 8. FORMS & INPUTS
  // ──────────────────────────────────────────────
  {
    tag: "<form>",
    name: "form",
    category: "Forms & Inputs",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "Defines an interactive form container for collecting user inputs (login, checkout, search) and submitting data to a backend server.",
    hinglish: "User inputs (login, signup, search) collect karke server par bhejane wala form container.",
    hindi: "उपयोगकर्ता से इनपुट (लॉगिन, साइनअप, खोज) लेने और सर्वर पर भेजने वाला फॉर्म कंटेनर।",
    attributes: [
      { name: "action", description: "Backend URL endpoint to receive data", exampleValue: '"/api/login"' },
      { name: "method", description: "HTTP request method ('GET' or 'POST')", exampleValue: '"POST"' },
      { name: "enctype", description: "Encoding type for file uploads ('multipart/form-data')", exampleValue: '"multipart/form-data"' },
      { name: "autocomplete", description: "Browser autocomplete ('on' or 'off')", exampleValue: '"on"' }
    ],
    example: `<form action="/api/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  <button type="submit">Submit Form</button>
</form>`,
    livePreviewHtml: `<form style="font-family:sans-serif; background:#0c1328; padding:12px; border-radius:8px; border:1px solid #1e293b; display:flex; flex-direction:column; gap:8px;" onsubmit="return false;">
  <div style="font-size:13px; color:#fff; font-weight:600;">Interactive Form Container</div>
  <div style="display:flex; gap:6px;">
    <input type="text" placeholder="Enter username..." style="background:#1e293b; border:1px solid #475569; padding:6px 10px; border-radius:4px; color:#fff; font-size:12px; flex:1;">
    <button style="background:#04AA6D; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">Submit</button>
  </div>
</form>`
  },
  {
    tag: "<label>",
    name: "label",
    category: "Forms & Inputs",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    english: "Represents a caption for a form control. Linking via the for attribute enables clicking the label to focus or toggle the input control.",
    hinglish: "Input field ka caption/title. Label click karne par input field automatic focus ho jaata hai.",
    hindi: "फॉर्म इनपुट का लेबल। लेबल पर क्लिक करने से संबंधित इनपुट बॉक्स फोकस या चेक हो जाता है।",
    attributes: [
      { name: "for", description: "Must match the id of the targeted input element", exampleValue: '"user-email"' }
    ],
    example: `<label for="user-email">Email Address:</label>
<input type="email" id="user-email" name="email" placeholder="name@domain.com">`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; display:flex; align-items:center; gap:8px;">
  <label style="font-size:13px; color:#38bdf8; font-weight:bold; cursor:pointer;">🏷️ &lt;label for="id"&gt;:</label>
  <input type="text" placeholder="Clicking label focuses me" style="background:#1e293b; border:1px solid #334155; padding:4px 8px; border-radius:4px; color:#fff; font-size:12px;">
</div>`
  },
  {
    tag: "<input>",
    name: "input",
    category: "Forms & Inputs",
    isVoid: true,
    display: "inline-block",
    isHtml5: false,
    english: "Versatile input control. The type attribute selects the mode: text, password, email, number, checkbox, radio, date, color, file, range, submit, and more.",
    hinglish: "Sabse versatile input field. type badal kar text, password, checkbox, color picker, ya date picker bana sakte hain.",
    hindi: "सर्वाधिक बहुमुखी इनपुट नियंत्रण। type बदलकर इसे टेक्स्ट, पासवर्ड, चेकबॉक्स, रंग चयनकर्ता या तारीख बना सकते हैं।",
    attributes: [
      { name: "type", description: "Input type ('text', 'email', 'password', 'checkbox', 'radio', 'file', 'date', 'color', 'range')", exampleValue: '"email"' },
      { name: "placeholder", description: "Ghost hint text", exampleValue: '"Enter your name"' },
      { name: "required", description: "Requires field before submission", exampleValue: 'true' },
      { name: "disabled", description: "Disables interaction", exampleValue: 'true' },
      { name: "value", description: "Initial value", exampleValue: '"Default"' }
    ],
    example: `<!-- Text --> <input type="text" placeholder="Full Name">
<!-- Email --> <input type="email" placeholder="Email">
<!-- Password --> <input type="password" placeholder="Password">
<!-- Checkbox --> <input type="checkbox" id="agree"> <label for="agree">Agree</label>
<!-- Color --> <input type="color" value="#04AA6D">
<!-- Range --> <input type="range" min="0" max="100" value="75">`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:12px; border-radius:8px; display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
  <input type="text" placeholder="Text..." style="background:#1e293b; border:1px solid #334155; padding:4px 8px; border-radius:4px; color:#fff; font-size:12px; width:100px;">
  <input type="color" value="#04AA6D" style="width:36px; height:28px; border:none; background:none; cursor:pointer;">
  <input type="range" value="65" style="width:90px; accent-color:#04AA6D;">
  <label style="color:#e2e8f0; font-size:12px; display:flex; align-items:center; gap:4px;"><input type="checkbox" checked style="accent-color:#04AA6D;"> Checkbox</label>
</div>`
  },
  {
    tag: "<button>",
    name: "button",
    category: "Forms & Inputs",
    isVoid: false,
    display: "inline-block",
    isHtml5: false,
    english: "Defines a clickable button. Inside a form, type='submit' submits data, type='reset' clears fields, and type='button' executes custom JavaScript.",
    hinglish: "Click karne wala button. Form submit karne ya JavaScript functions chalane ke liye use hota hai.",
    hindi: "क्लिक करने योग्य बटन। फॉर्म सबमिट करने या जावास्क्रिप्ट फंक्शन ट्रिगर करने हेतु प्रयुक्त।",
    attributes: [
      { name: "type", description: "Button behavior ('submit', 'button', 'reset')", exampleValue: '"submit"' },
      { name: "disabled", description: "Prevents clicks when true", exampleValue: 'true' }
    ],
    example: `<button type="submit">Submit Form</button>
<button type="button" onclick="alert('Clicked!')">Run Action</button>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; display:inline-flex; gap:8px;">
  <button style="background:#04AA6D; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; font-size:12px; cursor:pointer;">Primary Button</button>
  <button style="background:#334155; color:#cbd5e1; border:none; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer;">Secondary</button>
</div>`
  },
  {
    tag: "<select>, <optgroup>, <option>",
    name: "select-optgroup-option",
    category: "Forms & Inputs",
    isVoid: false,
    display: "inline-block",
    isHtml5: false,
    english: "Creates a dropdown selection menu (<select>) containing grouped categories (<optgroup>) and individual selectable items (<option>).",
    hinglish: "Dropdown list menu banata hai jisme se user koi option choose kar sakta hai.",
    hindi: "ड्रॉपडाउन चयन मेनू बनाता है जिसमें विकल्प समूह (<optgroup>) और विकल्प (<option>) होते हैं।",
    attributes: [
      { name: "multiple", description: "Allows multiple option selection", exampleValue: 'true' },
      { name: "selected", description: "Pre-selects an option by default", exampleValue: 'true' }
    ],
    example: `<select name="course" id="course">
  <optgroup label="Frontend">
    <option value="html" selected>HTML5</option>
    <option value="css">CSS3</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
  </optgroup>
</select>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px;">
  <select style="background:#1e293b; color:#fff; border:1px solid #475569; padding:6px 10px; border-radius:4px; font-size:12px;">
    <option>⚡ HTML5 Masterclass</option>
    <option>🎨 CSS3 Flexbox</option>
    <option>🚀 JavaScript Pro</option>
  </select>
</div>`
  },
  {
    tag: "<textarea>",
    name: "textarea",
    category: "Forms & Inputs",
    isVoid: false,
    display: "inline-block",
    isHtml5: false,
    english: "Creates a multi-line plain text editing box for long inputs like comments, bios, and feedback reviews.",
    hinglish: "Multi-line text box lambe comments, feedback ya messages likhne ke liye.",
    hindi: "कई पंक्तियों वाला टेक्स्ट इनपुट बॉक्स (जैसे टिप्पणियां, संदेश, फीडबैक)।",
    attributes: [
      { name: "rows", description: "Visible number of text lines", exampleValue: '"4"' },
      { name: "cols", description: "Visible width in characters", exampleValue: '"50"' },
      { name: "maxlength", description: "Maximum allowed characters", exampleValue: '"500"' }
    ],
    example: `<textarea rows="4" cols="40" placeholder="Type your review here..."></textarea>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px;">
  <textarea rows="2" placeholder="Multi-line textarea input..." style="width:100%; box-sizing:border-box; background:#1e293b; border:1px solid #334155; border-radius:4px; padding:6px; color:#fff; font-size:12px; resize:none;"></textarea>
</div>`
  },
  {
    tag: "<datalist>",
    name: "datalist",
    category: "Forms & Inputs",
    isVoid: false,
    display: "none",
    isHtml5: true,
    english: "Provides an autocomplete list of predefined options for an <input> while still allowing users to type custom values.",
    hinglish: "Input field ke sath search autocomplete suggestions dropdown provide karta hai.",
    hindi: "इनपुट बॉक्स के लिए ऑटोकम्पलीट सुझावों की सूची प्रदान करता है।",
    attributes: [
      { name: "id", description: "Must match the list attribute on the input", exampleValue: '"browsers"' }
    ],
    example: `<input list="browsers" name="browser" placeholder="Choose a browser...">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#cbd5e1; font-size:12px;">
  💡 &lt;datalist&gt; Autocomplete suggestions attached to &lt;input&gt;
</div>`
  },
  {
    tag: "<fieldset> & <legend>",
    name: "fieldset-legend",
    category: "Forms & Inputs",
    isVoid: false,
    display: "block",
    isHtml5: false,
    english: "<fieldset> draws a grouped border around related form controls, and <legend> provides a caption embedded directly into the fieldset border.",
    hinglish: "Form ke related fields ko border se group karta hai aur <legend> us group ka title banata hai.",
    hindi: "फॉर्म कंट्रोल्स को एक साथ बॉर्डर से घेरता है और <legend> उसका शीर्षक बनाता है।",
    attributes: [],
    example: `<fieldset>
  <legend>Personal Details</legend>
  <label for="name">Name:</label>
  <input type="text" id="name">
</fieldset>`,
    livePreviewHtml: `<fieldset style="font-family:sans-serif; background:#0c1328; border:1px solid #334155; border-radius:6px; padding:8px 12px; margin:0;">
  <legend style="color:#04AA6D; font-weight:bold; font-size:12px; padding:0 6px;">Contact Details</legend>
  <span style="color:#94a3b8; font-size:12px;">Grouped form controls inside fieldset</span>
</fieldset>`
  },
  {
    tag: "<progress> & <meter>",
    name: "progress-meter",
    category: "Forms & Inputs",
    isVoid: false,
    display: "inline-block",
    isHtml5: true,
    english: "<progress> shows task completion percentage (e.g. download progress). <meter> displays a scalar measurement within a known range (e.g. disk space, battery level).",
    hinglish: "<progress> kaam kitna complete hua (progress bar) dikhata hai. <meter> gauge meter (jaise disk space ya battery level) dikhata hai.",
    hindi: "<progress> कार्य की प्रगति (डाउनलोड बार) दर्शाता है और <meter> निश्चित सीमा में पैमाना (बैटरी स्तर) दर्शाता है।",
    attributes: [
      { name: "value", description: "Current value", exampleValue: '"70"' },
      { name: "max", description: "Maximum upper value", exampleValue: '"100"' },
      { name: "optimum", description: "Optimal gauge value (for meter)", exampleValue: '"80"' }
    ],
    example: `<label>Download:</label>
<progress value="75" max="100">75%</progress>

<label>Disk Space:</label>
<meter value="0.6" min="0" max="1" low="0.3" high="0.8" optimum="0.5">60%</meter>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; display:flex; flex-direction:column; gap:6px; font-size:12px; color:#e2e8f0;">
  <div style="display:flex; justify-content:space-between;"><span>Progress:</span> <span style="color:#04AA6D; font-weight:bold;">75%</span></div>
  <div style="background:#1e293b; border-radius:4px; height:8px; overflow:hidden; width:100%;">
    <div style="background:#04AA6D; height:100%; width:75%;"></div>
  </div>
</div>`
  },
  {
    tag: "<output>",
    name: "output",
    category: "Forms & Inputs",
    isVoid: false,
    display: "inline",
    isHtml5: true,
    english: "Displays the calculated result of a user action or mathematical calculation performed via JavaScript.",
    hinglish: "JavaScript ya form calculations ka result display karne wala tag.",
    hindi: "जावास्क्रिप्ट या फॉर्म गणनाओं का परिणाम प्रदर्शित करने वाला सिमेंटिक टैग।",
    attributes: [
      { name: "for", description: "IDs of inputs contributing to result", exampleValue: '"a b"' }
    ],
    example: `<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
  <input type="number" id="a" value="10"> +
  <input type="number" id="b" value="20"> =
  <output name="x" for="a b">30</output>
</form>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#38bdf8; font-size:13px; font-weight:bold;">
  Calculation Output: <output style="color:#10b981;">₹ 5,000</output>
</div>`
  },

  // ──────────────────────────────────────────────
  // 9. INTERACTIVE & DIALOGS
  // ──────────────────────────────────────────────
  {
    tag: "<details> & <summary>",
    name: "details-summary",
    category: "Interactive & Dialogs",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Creates a native accordion disclosure widget. <summary> acts as the clickable toggle header, and clicking it expands/collapses the hidden details with ZERO JavaScript required!",
    hinglish: "Bina JavaScript ke native collapsible accordion (expand/collapse) banata hai. <summary> par click karne par content khulta/band hota hai.",
    hindi: "बिना किसी जावास्क्रिप्ट के नेटिव एकॉर्डियन (विस्तार/संकुचन) विजेट बनाता है।",
    attributes: [
      { name: "open", description: "Opens accordion by default", exampleValue: 'true' }
    ],
    example: `<details open>
  <summary>What is NextSem Academy?</summary>
  <p>NextSem is a free interactive platform for coding and BCA exam preparation.</p>
</details>`,
    livePreviewHtml: `<details style="font-family:sans-serif; background:#0c1328; border:1px solid #334155; padding:8px 12px; border-radius:6px; color:#e2e8f0; font-size:13px;" open>
  <summary style="cursor:pointer; color:#38bdf8; font-weight:bold;">✨ Click to Toggle Accordion</summary>
  <p style="margin:6px 0 0; font-size:12px; color:#94a3b8;">This content expands & collapses natively with 0 JavaScript!</p>
</details>`
  },
  {
    tag: "<dialog>",
    name: "dialog",
    category: "Interactive & Dialogs",
    isVoid: false,
    display: "block",
    isHtml5: true,
    english: "Represents a native modal or non-modal popup dialog box with built-in backdrop support, opened via dialog.showModal() and closed via dialog.close().",
    hinglish: "Native popup modal window banata hai jisme built-in dark backdrop support hota hai.",
    hindi: "नेटिव पॉपअप मोडल विंडो जो बिल्ट-इन बैकड्रॉप के साथ संवाद बॉक्स प्रदर्शित करता है।",
    attributes: [
      { name: "open", description: "Indicates dialog is active", exampleValue: 'true' }
    ],
    example: `<dialog id="myDialog">
  <h3>NextSem Modal Dialog</h3>
  <p>Native HTML5 modal popup.</p>
  <button onclick="document.getElementById('myDialog').close()">Close</button>
</dialog>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; border:2px solid #04AA6D; padding:12px; border-radius:8px; color:#e2e8f0; font-size:13px;">
  <strong style="color:#04AA6D;">🪟 Native &lt;dialog&gt; Modal Box</strong>
  <p style="margin:4px 0 0; font-size:12px; color:#94a3b8;">Built-in backdrop and Escape-key dismiss support.</p>
</div>`
  },

  // ──────────────────────────────────────────────
  // 10. WEB COMPONENTS & TEMPLATES
  // ──────────────────────────────────────────────
  {
    tag: "<template>",
    name: "template",
    category: "Web Components",
    isVoid: false,
    display: "none",
    isHtml5: true,
    english: "Container holding client-side HTML that is NOT rendered on page load. Can be instantiated and cloned dynamically at runtime using JavaScript.",
    hinglish: "Client-side HTML template jo page load hone par nahi dikhta, balki JavaScript se clone karke use hota hai.",
    hindi: "क्लाइंट-साइड एचटीएमएल टेम्पलेट जो पेज लोड पर रेंडर नहीं होता बल्कि जावास्क्रिप्ट से गतिशील रूप से उपयोग होता है।",
    attributes: [],
    example: `<template id="user-card">
  <div class="card">
    <h4 class="name"></h4>
    <p class="role"></p>
  </div>
</template>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#a855f7; font-size:12px;">
  📦 &lt;template&gt; Invisible blueprint until cloned via JS
</div>`
  },
  {
    tag: "<slot>",
    name: "slot",
    category: "Web Components",
    isVoid: false,
    display: "contents",
    isHtml5: true,
    english: "A placeholder inside a Web Component shadow DOM template that is filled by user-provided markup.",
    hinglish: "Web Components ke Shadow DOM ke andar placeholder jahan custom user HTML content inject hota hai.",
    hindi: "वेब कंपोनेंट्स के शैडो डॉम में यूजर कंटेंट को इंजेक्ट करने वाला प्लेसहोल्डर।",
    attributes: [
      { name: "name", description: "Named slot identifier", exampleValue: '"header"' }
    ],
    example: `<template id="my-component">
  <div class="wrapper">
    <slot name="title">Default Title</slot>
  </div>
</template>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#0c1328; padding:10px; border-radius:6px; color:#38bdf8; font-size:12px;">
  🧩 &lt;slot name="title"&gt; Shadow DOM Content Slot
</div>`
  },

  // ──────────────────────────────────────────────
  // 11. DEPRECATED & OBSOLETE (WITH MODERN ALTERNATIVES)
  // ──────────────────────────────────────────────
  {
    tag: "<marquee>",
    name: "marquee",
    category: "Deprecated & Obsolete",
    isVoid: false,
    display: "inline-block",
    isHtml5: false,
    isDeprecated: true,
    deprecatedAlternative: "CSS @keyframes animation / transform: translateX()",
    english: "Deprecated tag used to create automatically scrolling text tickers. Obsolete in HTML5 — use modern CSS animations instead.",
    hinglish: "Puraana scrolling text tag. HTML5 mein obsolete ho chuka hai — ab iski jagah CSS Keyframe animations use karein.",
    hindi: "पुराना स्क्रॉलिंग टेक्स्ट टैग जो HTML5 में अमान्य (Deprecated) है। इसके स्थान पर आधुनिक CSS एनिमेशन का प्रयोग करें।",
    attributes: [],
    example: `<!-- ❌ Deprecated -->
<marquee>Breaking News Ticker</marquee>

<!-- ✅ Modern CSS Replacement -->
<div class="scroll-ticker">Breaking News Ticker</div>
<style>
@keyframes scroll { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
.scroll-ticker { animation: scroll 10s linear infinite; }
</style>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#2a1215; border:1px solid #ef4444; padding:8px 12px; border-radius:6px; color:#fca5a5; font-size:12px;">
  <span style="font-weight:bold;">⚠️ &lt;marquee&gt; (Deprecated)</span>
  <div style="margin-top:2px; color:#fecaca;">Use CSS <code>@keyframes</code> instead.</div>
</div>`
  },
  {
    tag: "<center>",
    name: "center",
    category: "Deprecated & Obsolete",
    isVoid: false,
    display: "block",
    isHtml5: false,
    isDeprecated: true,
    deprecatedAlternative: "CSS text-align: center OR display: flex; justify-content: center;",
    english: "Deprecated tag used to center text and elements. Obsolete in HTML5 — use CSS text-align: center or CSS Flexbox.",
    hinglish: "Text ko center karne ka purana tag. HTML5 mein hat chuka hai — iski jagah CSS text-align: center use karein.",
    hindi: "टेक्स्ट को केंद्र में करने का पुराना टैग। HTML5 में इसके स्थान पर CSS 'text-align: center' का प्रयोग किया जाता है।",
    attributes: [],
    example: `<!-- ❌ Deprecated -->
<center><p>Centered Text</p></center>

<!-- ✅ Modern CSS Replacement -->
<p style="text-align: center;">Centered Text</p>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#2a1215; border:1px solid #ef4444; padding:8px; border-radius:6px; color:#fca5a5; font-size:12px; text-align:center;">
  ⚠️ &lt;center&gt; &rarr; Replace with CSS <code>text-align: center</code>
</div>`
  },
  {
    tag: "<font>",
    name: "font",
    category: "Deprecated & Obsolete",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    isDeprecated: true,
    deprecatedAlternative: "CSS font-family, color, font-size properties",
    english: "Deprecated tag used to set font color, size, and face. Obsolete in HTML5 — style via CSS.",
    hinglish: "Font ka size, color aur style badalne ka purana tag. Iski jagah CSS font-size aur color use karein.",
    hindi: "फॉन्ट का आकार और रंग बदलने का पुराना टैग। इसके स्थान पर सीएसएस नियमों का प्रयोग करें।",
    attributes: [],
    example: `<!-- ❌ Deprecated -->
<font size="4" color="red" face="Arial">Styled Text</font>

<!-- ✅ Modern CSS Replacement -->
<span style="font-size: 18px; color: red; font-family: Arial;">Styled Text</span>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#2a1215; border:1px solid #ef4444; padding:8px; border-radius:6px; color:#fca5a5; font-size:12px;">
  ⚠️ &lt;font color="red"&gt; &rarr; Replace with CSS <code>color: red;</code>
</div>`
  },
  {
    tag: "<frameset> & <frame>",
    name: "frameset-frame",
    category: "Deprecated & Obsolete",
    isVoid: false,
    display: "block",
    isHtml5: false,
    isDeprecated: true,
    deprecatedAlternative: "CSS Grid / Flexbox multi-column layout OR <iframe>",
    english: "Obsolete tags that split a browser window into separate HTML frames. Deprecated in HTML5 — use CSS Flexbox/Grid or <iframe>.",
    hinglish: "Page ko alag-alag frames mein baantne ka purana tag. Ab bilkul use na karein, CSS Grid use karein.",
    hindi: "वेब ब्राउज़र विंडो को कई अलग-अलग फ्रेमों में बांटने का पुराना टैग जो अब अमान्य है।",
    attributes: [],
    example: `<!-- ❌ Obsolete HTML4 Frameset -->
<frameset cols="25%,75%">
  <frame src="menu.html">
  <frame src="content.html">
</frameset>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#2a1215; border:1px solid #ef4444; padding:8px; border-radius:6px; color:#fca5a5; font-size:12px;">
  ⚠️ &lt;frameset&gt; (Obsolete) &rarr; Replace with CSS Grid
</div>`
  },
  {
    tag: "<blink>",
    name: "blink",
    category: "Deprecated & Obsolete",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    isDeprecated: true,
    deprecatedAlternative: "CSS @keyframes opacity blink animation",
    english: "Obsolete non-standard tag used to make text blink. Deprecated for accessibility — use CSS animations.",
    hinglish: "Text ko blink karwane ka purana tag jo accessibility ke liye band ho chuka hai.",
    hindi: "टेक्स्ट को चमकाने (ब्लिंक) वाला पुराना टैग जो अब अमान्य है।",
    attributes: [],
    example: `<!-- ❌ Obsolete -->
<blink>Blinking Text</blink>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#2a1215; border:1px solid #ef4444; padding:8px; border-radius:6px; color:#fca5a5; font-size:12px;">
  ⚠️ &lt;blink&gt; (Obsolete) &rarr; Replace with CSS animation
</div>`
  },
  {
    tag: "<big> & <strike> & <tt>",
    name: "big-strike-tt",
    category: "Deprecated & Obsolete",
    isVoid: false,
    display: "inline",
    isHtml5: false,
    isDeprecated: true,
    deprecatedAlternative: "CSS font-size: larger (for big), <s> or <del> (for strike), <code> or <kbd> (for tt)",
    english: "Obsolete formatting tags. Replace <big> with CSS font-size, <strike> with <s>/<del>, and <tt> with <code>.",
    hinglish: "Purane visual formatting tags. Inki jagah <code>, <s>, aur CSS properties use karein.",
    hindi: "पुराने फॉर्मेटिंग टैग्स। <big> की जगह CSS, <strike> की जगह <s> और <tt> की जगह <code> का प्रयोग करें।",
    attributes: [],
    example: `<!-- ❌ Deprecated -->
<big>Large Text</big>
<strike>Crossed Out</strike>
<tt>Teletype monospace</tt>`,
    livePreviewHtml: `<div style="font-family:sans-serif; background:#2a1215; border:1px solid #ef4444; padding:8px; border-radius:6px; color:#fca5a5; font-size:12px;">
  ⚠️ &lt;big&gt;, &lt;strike&gt;, &lt;tt&gt; &rarr; Replace with modern semantic tags
</div>`
  }
];

export const CATEGORIES = [
  "All",
  "Document & Metadata",
  "Layout & Sectioning",
  "Text & Grouping",
  "Inline Semantics",
  "Media & Multimedia",
  "Embedded & Graphics",
  "Tables",
  "Forms & Inputs",
  "Interactive & Dialogs",
  "Web Components",
  "Deprecated & Obsolete"
] as const;

export type TagCategory = typeof CATEGORIES[number];
