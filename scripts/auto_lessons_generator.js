const fs = require('fs');
const path = require('path');

const TargetFilePath = path.join(__dirname, '../src/data/htmlLessonsData.ts');

// Load existing hand-written lessons (1-30) by evaluating the current TS file as JS
let tsContent = fs.readFileSync(TargetFilePath, 'utf8');

// Find the hint of lesson 30 to locate the end of the exercise block
const hintText = 'It contains phone numbers, emails, or office addresses, rendering in italics by default.';
const hintIndex = tsContent.indexOf(hintText);
if (hintIndex === -1) {
  console.error("Could not find lesson 30 hint in htmlLessonsData.ts!");
  process.exit(1);
}

// Find the closing brace of the exercise block that comes after the hint
const exerciseClosingBraceIndex = tsContent.indexOf('}', hintIndex);
if (exerciseClosingBraceIndex === -1) {
  console.error("Could not find closing brace of exercise block!");
  process.exit(1);
}

// Slice top part up to the closing brace of the exercise block
const topPart = tsContent.substring(0, exerciseClosingBraceIndex + 1);

// Lesson 30 Translations to be appended to close lesson 30 object
const lesson30Translations = `,\n    english: {
      kid: "### ✉️ The <address> Tag: Contact Me!\\nIf you want to tell your readers how to write to you, email you, or call you, you use the **\`<address>\`** tag!\\n\\nIt makes the contact details stand out and look super professional (usually in italics!).\\n\\n\`\`\`html\\n<address>\\n  Email: support@nextsem.online\\n</address>\\n\`\`\`",
      pro: "### ✉️ The <address> Element: Semantic Contact Mapping\\nThe \`<address>\` element represents contact information for its nearest \`<article>\` or \`<body>\` ancestor.\\n\\n* **Semantics**: Do not use \`<address>\` for arbitrary postal addresses unless they represent the contact points for the document.\\n* **Presentation**: By default, browsers render \`<address>\` in italics."
    },
    hinglish: {
      kid: "### ✉️ <address> Tag: Contact Details Add Karna!\\nWebpage me author ya owner ka contact information (jaise email, phone number, physical address) show karne ke liye hum **\`<address>\`** tag use karte hain.",
      pro: "### ✉️ Semantic Contact Specifications and Address Element\\n\`<address>\` element doc specifications:\\n\\n* **Usage**: Document section or article footer me contact channels map karne ke liye iska use standard compliance structure setup karta hai."
    },
    hindi: {
      kid: "### ✉️ <address> टैग: संपर्क जानकारी!\\nयदि आप अपने पाठकों को बताना चाहते हैं कि वे आपसे कैसे संपर्क करें, ईमेल करें या कॉल करें, तो आप **\`<address>\`** टैग का उपयोग करते हैं!\\n\\nयह संपर्क जानकारी को एक सुंदर इटैलिक शैली में दिखाता है।",
      pro: "### ✉️ <address> तत्व: संपर्क जानकारी सिमेंटिक्स\\n\`<address>\` तत्व दस्तावेज़ के लेखक या स्वामी की संपर्क जानकारी का प्रतिनिधित्व करता है:\\n\\n* **नियम**: इसका उपयोग केवल वास्तविक संपर्क जानकारी के लिए करें, सामान्य डाक पते के लिए नहीं।"
    }
  }`;

// Database of lessons 31 to 100
const lessonsDb = [
  // Unit 4: Semantic Content & Text Modifications (31-40)
  {
    id: 31,
    slug: "bold-b-vs-semantic-strong-tag",
    title: "Presentational Bold (<b>) vs. Semantic Strong (<strong>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 34-35)",
    tag: "<strong>",
    concept: "Strong importance",
    analogy: "shouting warning megaphone",
    question: "Which tag is semantically designated to indicate that text has strong importance?",
    options: ["<strong>", "<b>", "<bold>", "<heavy>"],
    correctAnswer: "<strong>",
    hint: "While <b> just makes text bold visually, this tag tells screen readers and Google that the text is critically important!"
  },
  {
    id: 32,
    slug: "italic-i-vs-semantic-emphasis-em-tag",
    title: "Presentational Italic (<i>) vs. Semantic Emphasis (<em>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 35-36)",
    tag: "<em>",
    concept: "Emphasis",
    analogy: "slanted stress tone voice",
    question: "Which HTML element is semantically used to apply emphasis to a word inside a sentence?",
    options: ["<em>", "<i>", "<emphasis>", "<slant>"],
    correctAnswer: "<em>",
    hint: "Emphasis (em) changes the meaning of the sentence by placing stress on specific words."
  },
  {
    id: 33,
    slug: "highlight-text-mark-tag-search-results",
    title: "Highlighted Text (<mark>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 37-38)",
    tag: "<mark>",
    concept: "Highlighted text",
    analogy: "neon yellow marker pen",
    question: "Which HTML5 element is specifically designed to highlight keyword matches in search results?",
    options: ["<mark>", "<highlight>", "<span>", "<b>"],
    correctAnswer: "<mark>",
    hint: "It wraps text in a bright yellow background highlight by default."
  },
  {
    id: 34,
    slug: "monospace-code-snippet-code-tag",
    title: "Code Snippets (<code>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 45)",
    tag: "<code>",
    concept: "Monospace code block",
    analogy: "programmer text terminal font",
    question: "Which HTML tag is used to display inline programming code in a monospaced font?",
    options: ["<code>", "<pre>", "<monospace>", "<tt>"],
    correctAnswer: "<code>",
    hint: "It renders characters with equal width, ideal for variable names like userEmail."
  },
  {
    id: 35,
    slug: "preformatted-text-pre-tag-spaces-tabs",
    title: "Preformatted Text (<pre>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 46)",
    tag: "<pre>",
    concept: "Preformatted text layout",
    analogy: "photocopy machine that preserves spaces",
    question: "Which tag is used to preserve whitespace, tabs, and line breaks exactly as written in source code?",
    options: ["<pre>", "<code>", "<p>", "<br>"],
    correctAnswer: "<pre>",
    hint: "Preformatted (pre) text keeps all spacing intact without browser layout collapse."
  },
  {
    id: 36,
    slug: "insert-ins-and-delete-del-tags",
    title: "Insertions (<ins>) & Deletions (<del>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 48)",
    tag: "<del> and <ins>",
    concept: "Document edit markup",
    analogy: "pen strikethrough and underline edits",
    question: "Which tag combination is used to show a revised price in an e-commerce catalog?",
    options: ["<del> and <ins>", "<s> and <u>", "<strike> and <add>", "<b> and <i>"],
    correctAnswer: "<del> and <ins>",
    hint: "Del strikes through the outdated content, and ins underlines the newly added content."
  },
  {
    id: 37,
    slug: "strikethrough-s-tag-outdated-content",
    title: "Strikethrough (<s>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 49)",
    tag: "<s>",
    concept: "Outdated content strikethrough",
    analogy: "crossed out list item",
    question: "Which element is used to represent content that is no longer accurate or relevant, like a sold-out item?",
    options: ["<s>", "<del>", "<strike>", "<u>"],
    correctAnswer: "<s>",
    hint: "Use <s> to show content that is no longer relevant, without indicating a document revision."
  },
  {
    id: 38,
    slug: "abbreviation-abbr-tag-title-tooltip",
    title: "Abbreviations (<abbr>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 42)",
    tag: "<abbr>",
    concept: "Abbreviation tooltips",
    analogy: "hover tooltip magnifier bubble",
    question: "Which attribute inside the <abbr> tag holds the full explanation shown as a mouse hover tooltip?",
    options: ["title", "href", "desc", "alt"],
    correctAnswer: "title",
    hint: "Setting title=\"World Wide Web\" displays a standard browser tooltip on hover."
  },
  {
    id: 39,
    slug: "defining-term-dfn-tag-first-instance",
    title: "Defining Terms (<dfn>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 41)",
    tag: "<dfn>",
    concept: "Defining term instance",
    analogy: "dictionary entry highlight",
    question: "What is the semantic purpose of the <dfn> tag in HTML?",
    options: ["To mark the defining instance of a term", "To define a form", "To make text bold", "To cite external URLs"],
    correctAnswer: "To mark the defining instance of a term",
    hint: "It marks the first time a new term is introduced and defined in content."
  },
  {
    id: 40,
    slug: "superscript-sup-and-subscript-sub-tags",
    title: "Superscript (<sup>) & Subscript (<sub>)",
    unit: "Unit 4: Semantic Content & Text Modifications",
    bookRef: "Duckett Chapter 2 (p. 39)",
    tag: "<sup> and <sub>",
    concept: "Superscript and subscript notation",
    analogy: "hot air balloon and submarine",
    question: "Which tag is used to write mathematical exponents like X squared (X²)?",
    options: ["<sup>", "<sub>", "<exp>", "<up>"],
    correctAnswer: "<sup>",
    hint: "Superscript (sup) raises text upward, while subscript (sub) lowers it down."
  },

  // Unit 5: Navigation & Hyperlinks (41-50)
  {
    id: 41,
    slug: "anchor-a-tag-href-hyperlinks",
    title: "Anchor Elements (<a>) & the href Attribute",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 74-76)",
    tag: "<a>",
    concept: "Hyperlinks",
    analogy: "teleportation portal door",
    question: "Which attribute inside the anchor (<a>) tag specifies the target URL destination?",
    options: ["href", "src", "link", "to"],
    correctAnswer: "href",
    hint: "Hypertext Reference (href) points to the webpage URL you want to open."
  },
  {
    id: 42,
    slug: "absolute-vs-relative-link-paths",
    title: "Absolute vs. Relative Paths",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 77-79)",
    tag: "relative/absolute",
    concept: "Link path types",
    analogy: "global GPS coordinates vs. local directions",
    question: "Which of the following is an example of an absolute URL path?",
    options: ["https://nextsem.online/about", "/about", "about.html", "../about.html"],
    correctAnswer: "https://nextsem.online/about",
    hint: "Absolute URLs include the protocol (https) and domain name, pointing globally."
  },
  {
    id: 43,
    slug: "parent-directory-hopping-relative-paths",
    title: "Parent Directory Hopping (../)",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 80-82)",
    tag: "../",
    concept: "Relative path directory hopping",
    analogy: "climbing up one ladder step to the parent folder",
    question: "What does the '../' prefix represent in a relative link path?",
    options: ["Go up one level to the parent directory", "Reload current page", "Jump to website root", "Open a new window"],
    correctAnswer: "Go up one level to the parent directory",
    hint: "It moves the relative path pointer out of the current folder into the folder enclosing it."
  },
  {
    id: 44,
    slug: "grandparent-directory-hopping-double-slash",
    title: "Grandparent Directory Hopping (../../)",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 83-84)",
    tag: "../../",
    concept: "Grandparent directory navigation",
    analogy: "climbing up two ladder steps",
    question: "How do you navigate upward two directory levels in a relative path?",
    options: ["../../", "../", "///", ".../"],
    correctAnswer: "../../",
    hint: "Each '../' moves up one level, so doubling it navigates up two levels."
  },
  {
    id: 45,
    slug: "email-mailto-links-anchor-tag",
    title: "Linking to Email Addresses (mailto:)",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 85)",
    tag: "mailto:",
    concept: "Email links",
    analogy: "auto envelope filler",
    question: "What prefix is used inside href to configure a link that opens the user's default email client?",
    options: ["mailto:", "email:", "send:", "mail:"],
    correctAnswer: "mailto:",
    hint: "Writing href=\"mailto:support@nextsem.online\" triggers the system's mail application."
  },
  {
    id: 46,
    slug: "telephone-dialing-tel-links-mobile",
    title: "Telephone Dialing Links (tel:)",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 86)",
    tag: "tel:",
    concept: "Telephone links",
    analogy: "phone dial keypad shortkey",
    question: "Which prefix enables a clickable link to dial a phone number on mobile devices?",
    options: ["tel:", "phone:", "call:", "dial:"],
    correctAnswer: "tel:",
    hint: "Setting href=\"tel:+1234567890\" prompts mobile browsers to start a phone call."
  },
  {
    id: 47,
    slug: "open-link-new-tab-target-blank",
    title: "Target Targets (target=\"_blank\")",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 87)",
    tag: "target=\"_blank\"",
    concept: "Opening links in new tabs",
    analogy: "spawning a new catalog window",
    question: "Which attribute and value configuration forces a link to open in a new browser tab?",
    options: ["target=\"_blank\"", "target=\"_new\"", "rel=\"newtab\"", "href=\"_blank\""],
    correctAnswer: "target=\"_blank\"",
    hint: "The target attribute set to _blank launches the linked document in a fresh window tab."
  },
  {
    id: 48,
    slug: "link-security-rel-noopener-noreferrer",
    title: "Link Security (rel=\"noopener noreferrer\")",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "The Definitive Guide to HTML5 Chapter 13",
    tag: "noopener noreferrer",
    concept: "External link security",
    analogy: "locking the window connection thread",
    question: "Why should you add rel=\"noopener noreferrer\" to links configured with target=\"_blank\"?",
    options: ["To prevent security exploits and protect referral information", "To load pages faster", "To style external links", "To index links in search engines"],
    correctAnswer: "To prevent security exploits and protect referral information",
    hint: "It blocks the new page from accessing the opening page's window.opener object, preventing phishing redirects."
  },
  {
    id: 49,
    slug: "hash-links-jump-to-page-sections",
    title: "Document Hash Links (href=\"#id\")",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "Duckett Chapter 4 (p. 88-89)",
    tag: "href=\"#id\"",
    concept: "Same-page hash navigation",
    analogy: "elevator button jumping to a specific building floor",
    question: "What character is prefix-linked in href to jump to an element with a matching ID on the same page?",
    options: ["#", ".", "/", "@"],
    correctAnswer: "#",
    hint: "Use href=\"#section-id\" to scroll the browser instantly to the element with id=\"section-id\"."
  },
  {
    id: 50,
    slug: "download-attribute-force-file-download",
    title: "Download Attribute (force download)",
    unit: "Unit 5: Navigation & Hyperlinks",
    bookRef: "The Definitive Guide to HTML5 Chapter 13",
    tag: "download",
    concept: "Forced file downloading",
    analogy: "auto-save envelope trigger",
    question: "Which anchor tag attribute prompts the browser to download a linked file instead of navigating to it?",
    options: ["download", "save", "action", "type"],
    correctAnswer: "download",
    hint: "Setting the download attribute on <a> triggers a save dialog, optionally specifying the downloaded file name."
  },

  // Unit 6: Multimedia & Responsive Art Direction (51-60)
  {
    id: 51,
    slug: "image-src-alt-attributes-elements",
    title: "The Image Element (<img>)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "Duckett Chapter 5 (p. 94-96)",
    tag: "<img>",
    concept: "Image embedding",
    analogy: "picture frame window",
    question: "Which of the following is a key syntactic characteristic of the <img> element?",
    options: ["It is a self-closing empty element", "It requires </img>", "It must contain text content", "It is a block-level wrapper"],
    correctAnswer: "It is a self-closing empty element",
    hint: "It is empty because it only references an external source file via attributes without enclosing text."
  },
  {
    id: 52,
    slug: "image-sizing-width-height-attributes",
    title: "Image Sizing (width & height)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "Duckett Chapter 5 (p. 97-99)",
    tag: "width/height",
    concept: "Image aspect ratio properties",
    analogy: "cardboard template slots",
    question: "Why is it best practice to specify explicit width and height attributes on <img> tags?",
    options: ["To reserve layout space and prevent Cumulative Layout Shift (CLS)", "To compress image files", "To enable zoom effects", "To translate image content"],
    correctAnswer: "To reserve layout space and prevent Cumulative Layout Shift (CLS)",
    hint: "Setting dimensions lets browsers calculate the aspect ratio early, preventing page content jumps as images load."
  },
  {
    id: 53,
    slug: "responsive-images-srcset-sizes-attributes",
    title: "Responsive Images (srcset & sizes)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "The Definitive Guide to HTML5 Chapter 15",
    tag: "srcset",
    concept: "Responsive layout image sources",
    analogy: "different sized shoes based on foot size",
    question: "Which attribute allows specifying multiple source images for different viewport resolutions?",
    options: ["srcset", "srcs", "media", "sizes"],
    correctAnswer: "srcset",
    hint: "srcset (source set) lists image URLs and their widths (e.g., banner-320w.jpg 320w) so browsers load the best fit."
  },
  {
    id: 54,
    slug: "art-direction-picture-source-elements",
    title: "Art Direction with <picture> & <source>",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "The Definitive Guide to HTML5 Chapter 15",
    tag: "<picture>",
    concept: "Art direction image swapping",
    analogy: "wardrobe selector changing jackets based on weather",
    question: "Which element is used as a wrapper to perform 'Art Direction' by serving cropped images for mobile viewports?",
    options: ["<picture>", "<figure>", "<canvas>", "<srcset>"],
    correctAnswer: "<picture>",
    hint: "It wraps multiple `<source>` tags and a single fallback `<img>` to dynamically select the best graphic profile."
  },
  {
    id: 55,
    slug: "lazy-loading-images-loading-attribute",
    title: "Lazy Loading Images (loading attribute)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "The Definitive Guide to HTML5 Chapter 15",
    tag: "loading=\"lazy\"",
    concept: "Image lazy loading optimization",
    analogy: "waiter bringing dessert only when requested",
    question: "Which attribute and value configuration prevents images from loading until they are scrolled near the viewport?",
    options: ["loading=\"lazy\"", "defer=\"true\"", "preload=\"none\"", "async=\"lazy\""],
    correctAnswer: "loading=\"lazy\"",
    hint: "loading=\"lazy\" conserves bandwidth by fetching off-screen images only as they approach the screen boundary."
  },
  {
    id: 56,
    slug: "figure-figcaption-semantic-image-wrappers",
    title: "Semantic Image Wrappers (<figure> & <figcaption>)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "Duckett Chapter 5 (p. 100-101)",
    tag: "<figure>",
    concept: "Media figure mapping",
    analogy: "museum exhibit display frame",
    question: "Which element is used to group an image with its caption semantically?",
    options: ["<figure>", "<section>", "<div>", "<aside>"],
    correctAnswer: "<figure>",
    hint: "The figure tag encloses the image, diagram, or code, while figcaption adds the description."
  },
  {
    id: 57,
    slug: "inline-vector-graphics-svg-element",
    title: "Vector Graphics (<svg>)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "<svg>",
    concept: "Scalable vector graphics",
    analogy: "infinitely stretchable rubber band drawing",
    question: "What is the primary benefit of Scalable Vector Graphics (SVG) over raster images like PNG or JPG?",
    options: ["They scale infinitely without losing quality or blurring", "They load faster on all servers", "They are automatically animated", "They store audio files"],
    correctAnswer: "They scale infinitely without losing quality or blurring",
    hint: "Since SVGs are drawn using math equations (xml coordinates) instead of pixel grids, they remain crisp on all screen displays."
  },
  {
    id: 58,
    slug: "image-maps-map-area-coordinate-tags",
    title: "Image Maps (<map> & <area>)",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "Duckett Chapter 5 (p. 102-103)",
    tag: "<map>",
    concept: "Clickable coordinate image map",
    analogy: "clickable coordinate sectors on a map page",
    question: "Which element defines the clickable hotspot shapes inside an HTML image map?",
    options: ["<area>", "<spot>", "<coord>", "<link>"],
    correctAnswer: "<area>",
    hint: "The <map> tag coordinates with <area coords=\"...\"> to map clicks to specific geometric spots."
  },
  {
    id: 59,
    slug: "favicon-modern-format-link-types",
    title: "Favicon Formats & Link Configurations",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "The Definitive Guide to HTML5 Chapter 6",
    tag: "rel=\"icon\"",
    concept: "Tab bar favicon formats",
    analogy: "mini badge on a lapel pin",
    question: "Which rel attribute configuration attaches a modern PNG format icon to the browser tab?",
    options: ["rel=\"icon\"", "rel=\"shortcut\"", "rel=\"stylesheet\"", "rel=\"favicon\""],
    correctAnswer: "rel=\"icon\"",
    hint: "Writing rel=\"icon\" with type=\"image/png\" is the standard configuration for modern site badges."
  },
  {
    id: 60,
    slug: "capstone-photo-gallery-responsive",
    title: "Capstone Project: Responsive Photo Gallery",
    unit: "Unit 6: Multimedia & Responsive Art Direction",
    bookRef: "Duckett Chapter 5 & 10",
    tag: "<figure> portfolio",
    concept: "HTML5 gallery integration",
    analogy: "art gallery presentation walls",
    question: "Which semantic tag combination is ideal for structuring a responsive photo grid listing?",
    options: ["<figure> wrapping <img> and <figcaption>", "<ul> wrapping raw text items", "<table> grids containing headers", "<form> boxes containing checkboxes"],
    correctAnswer: "<figure> wrapping <img> and <figcaption>",
    hint: "Figure structures provide semantic layout hooks to present images alongside text labels cleanly."
  },

  // Unit 7: Native Audio, Video & Embeds (61-70)
  {
    id: 61,
    slug: "audio-elements-src-controls-autoplay-attributes",
    title: "Audio Elements (src & controls)",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "Duckett Chapter 9 (p. 200-202)",
    tag: "<audio>",
    concept: "Native audio player",
    analogy: "tape recorder buttons play pause",
    question: "Which attribute must be declared on <audio> to display the native browser play, volume, and progress bar controls?",
    options: ["controls", "buttons", "show", "play"],
    correctAnswer: "controls",
    hint: "Adding the controls attribute tells the browser to render its default player controls interface."
  },
  {
    id: 62,
    slug: "audio-fallback-source-format-types",
    title: "Audio Fallback Formats & Sources",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "Duckett Chapter 9 (p. 203)",
    tag: "<source>",
    concept: "Audio formats compatibility",
    analogy: "different audio cassettes inside a player",
    question: "How do you specify multiple fallback audio files inside a single <audio> tag?",
    options: ["Using nested <source> tags", "Separating links with commas inside src", "Declaring multiple src attributes", "Adding multiple audio blocks"],
    correctAnswer: "Using nested <source> tags",
    hint: "Declaring multiple `<source src=\"...\">` tags lets the browser select the first format it supports."
  },
  {
    id: 63,
    slug: "video-elements-src-poster-preload-settings",
    title: "Video Elements (poster & preload)",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "Duckett Chapter 9 (p. 206-209)",
    tag: "<video>",
    concept: "Native video element properties",
    analogy: "home cinema movie projector screen",
    question: "Which video attribute displays a placeholder poster image while the video file loads?",
    options: ["poster", "src", "thumbnail", "preload"],
    correctAnswer: "poster",
    hint: "The poster attribute points to a static image URL displayed until the user presses play."
  },
  {
    id: 64,
    slug: "video-subtitles-tracks-element",
    title: "Video Subtitles & Captions (<track>)",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "<track>",
    concept: "Video track caption syncing",
    analogy: "movie subtitle text translation roll",
    question: "What is the standard file format referenced by the <track> tag to display video subtitles?",
    options: ["WebVTT (.vtt)", "SRT (.srt)", "TXT (.txt)", "XML (.xml)"],
    correctAnswer: "WebVTT (.vtt)",
    hint: "HTML5 track elements read Web Video Text Tracks (.vtt) to sync timestamps with caption text."
  },
  {
    id: 65,
    slug: "embedding-external-sites-iframe-sandbox",
    title: "External Site Embedding (<iframe> & sandbox)",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "Duckett Chapter 9 (p. 212-214)",
    tag: "<iframe>",
    concept: "Iframe frame sandbox controls",
    analogy: "security window looking at a remote house",
    question: "Which iframe security attribute isolates embedded pages, preventing them from accessing cookies or forms?",
    options: ["sandbox", "security", "protect", "isolate"],
    correctAnswer: "sandbox",
    hint: "The sandbox attribute applies restrictions, locking down the iframe content to a secure runtime profile."
  },
  {
    id: 66,
    slug: "plugin-insertion-embed-object-elements",
    title: "Plugin Insertion (<embed> & <object>)",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "<object>",
    concept: "Flash object plugin loaders",
    analogy: "universal plug adapter adapter slots",
    question: "Which tag is used as a container to embed external documents, PDFs, or legacy Flash plugins?",
    options: ["<object>", "<iframe>", "<media>", "<plugin>"],
    correctAnswer: "<object>",
    hint: "The object element is a generic container for external resources, supporting data and type attributes."
  },
  {
    id: 67,
    slug: "custom-data-attributes-data-prefix",
    title: "Custom Data Attributes (data-*)",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "The Definitive Guide to HTML5 Chapter 25",
    tag: "data-*",
    concept: "Custom data properties attributes",
    analogy: "sticky note with metadata on a folder",
    question: "Which prefix prefix-labels custom attributes used to store user-defined metadata on HTML tags?",
    options: ["data-", "meta-", "custom-", "id-"],
    correctAnswer: "data-",
    hint: "Custom attributes must start with data- (e.g. data-user-role) to be accessed via JavaScript dataset APIs."
  },
  {
    id: 68,
    slug: "iframe-communication-security-headers",
    title: "Iframe Communication & Security Headers",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "postMessage",
    concept: "Iframe cross-domain communication",
    analogy: "safe telephone hotline between embassies",
    question: "Which API method enables safe, cross-origin communication between a main page and an iframe?",
    options: ["window.postMessage()", "window.send()", "iframe.emit()", "document.dispatch()"],
    correctAnswer: "window.postMessage()",
    hint: "postMessage allows sending message payloads between page contexts securely, ignoring strict origin checks."
  },
  {
    id: 69,
    slug: "html5-native-geolocation-api-details",
    title: "HTML5 Geolocation API Basics",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "The Definitive Guide to HTML5 Chapter 28",
    tag: "navigator.geolocation",
    concept: "HTML5 location tracking api",
    analogy: "compass indicator built into your browser",
    question: "Which JavaScript object is queried to retrieve the device coordinates in HTML5 Geolocation?",
    options: ["navigator.geolocation", "window.coords", "document.location", "system.gps"],
    correctAnswer: "navigator.geolocation",
    hint: "The navigator.geolocation object exposes methods like getCurrentPosition to retrieve latitude and longitude."
  },
  {
    id: 70,
    slug: "capstone-interactive-video-player",
    title: "Capstone Project: Custom Video Player",
    unit: "Unit 7: Native Audio, Video & Embeds",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "custom video layout",
    concept: "Video player interface structure",
    analogy: "custom controller desk with dial sliders",
    question: "What elements are wrapped together to structure a responsive media player with customized controls?",
    options: ["<video> with custom <button> and <input type=\"range\"> elements", "<table> cells displaying frame pictures", "<form> checkboxes mapping settings", "<ul> list steps mapping playlist"],
    correctAnswer: "<video> with custom <button> and <input type=\"range\"> elements",
    hint: "Use HTML5 elements to structure the controls bar, and JavaScript to control video play/pause functions."
  },

  // Unit 8: Lists, Tables & Layout Grids (71-80)
  {
    id: 71,
    slug: "unordered-lists-ul-li-bullet-points",
    title: "Unordered Lists (<ul> and <li>)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 3 (p. 52-54)",
    tag: "<ul>",
    concept: "Unordered list syntax",
    analogy: "shopping grocery list with bullets",
    question: "Which tag is used as a container to define an unordered list of items?",
    options: ["<ul>", "<ol>", "<list>", "<dl>"],
    correctAnswer: "<ul>",
    hint: "Unordered list (ul) holds list item (li) children, displaying bullet points by default."
  },
  {
    id: 72,
    slug: "ordered-lists-ol-li-numbered-steps",
    title: "Ordered Lists (<ol> and <li>)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 3 (p. 55-57)",
    tag: "<ol>",
    concept: "Ordered numbered list",
    analogy: "cooking recipe step 1 step 2",
    question: "Which tag is used to structure a sequential list of steps numbered 1, 2, 3?",
    options: ["<ol>", "<ul>", "<dl>", "<list>"],
    correctAnswer: "<ol>",
    hint: "Ordered list (ol) automatically increments step numbers for each list item (li)."
  },
  {
    id: 73,
    slug: "ordered-list-start-reversed-indexing",
    title: "Ordered Lists Start & Reversed Attributes",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "The Definitive Guide to HTML5 Chapter 14",
    tag: "reversed/start",
    concept: "Ordered list counters",
    analogy: "rocket launch countdown timer",
    question: "Which attribute is declared on <ol> to start numbering list items from 5 instead of 1?",
    options: ["start", "value", "begin", "from"],
    correctAnswer: "start",
    hint: "Use start=\"5\" to set the starting numerical index for the ordered list sequence."
  },
  {
    id: 74,
    slug: "description-lists-dl-dt-dd-glossary",
    title: "Definition Lists (<dl>, <dt>, and <dd>)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 3 (p. 58-60)",
    tag: "<dl>",
    concept: "Description list glossary structure",
    analogy: "dictionary page with terms and definitions",
    question: "Which tag defines the actual description content for a term in a description list?",
    options: ["<dd>", "<dt>", "<dl>", "<term>"],
    correctAnswer: "<dd>",
    hint: "dl wraps the list, dt defines the term, and dd provides the description details."
  },
  {
    id: 75,
    slug: "table-container-grid-rows-columns",
    title: "Tables Rows & Cells (<tr>, <td>, <th>)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 6 (p. 126-128)",
    tag: "<table>",
    concept: "Table tags",
    analogy: "checkerboard grid",
    question: "Which tag represents a standard data cell inside an HTML table row?",
    options: ["<td>", "<tr>", "<th>", "<table>"],
    correctAnswer: "<td>",
    hint: "tr defines the row, th represents a header cell, and td contains the cell data."
  },
  {
    id: 76,
    slug: "table-colspan-merge-columns",
    title: "Table Column Spanning (colspan & rowspan)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 6 (p. 132-135)",
    tag: "colspan/rowspan",
    concept: "Table cell merging attributes",
    analogy: "merging cells in Excel",
    question: "Which attribute is used to stretch a cell horizontally to cover three columns?",
    options: ["colspan=\"3\"", "rowspan=\"3\"", "width=\"3\"", "span=\"3\""],
    correctAnswer: "colspan=\"3\"",
    hint: "Column Span (colspan) merges cells horizontally across columns in the same row."
  },
  {
    id: 77,
    slug: "table-thead-tbody-tfoot-semantics",
    title: "Table Structured Sections (<thead>, <tbody>, <tfoot>)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 6 (p. 136-138)",
    tag: "<thead>",
    concept: "Table semantic layout blocks",
    analogy: "splitting catalog paper into header body footer",
    question: "Which semantic tag groups the header row labels of a data table?",
    options: ["<thead>", "<tbody>", "<tfoot>", "<tr>"],
    correctAnswer: "<thead>",
    hint: "<thead>, <tbody>, and <tfoot> segment tables semantically, helping style columns and rows easily."
  },
  {
    id: 78,
    slug: "table-column-groups-colgroup-col-widths",
    title: "Table Column Groups (<colgroup> & <col>)",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "The Definitive Guide to HTML5 Chapter 14",
    tag: "<colgroup>",
    concept: "Table column width sizing controls",
    analogy: "ruler setting column boundaries on paper",
    question: "What is the primary benefit of using the <colgroup> tag in HTML tables?",
    options: ["To apply styling rules to entire columns at once", "To sort rows", "To merge rows vertically", "To define column titles"],
    correctAnswer: "To apply styling rules to entire columns at once",
    hint: "<colgroup> lets you define styles (like width or color) for columns without duplicating styles on every cell."
  },
  {
    id: 79,
    slug: "table-borders-cellpadding-cellspacing",
    title: "Table Borders & Spacing Layouts",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 6 (p. 130)",
    tag: "border-collapse",
    concept: "Table layouts spacing styles",
    analogy: "adjusting grid gaps between grid boxes",
    question: "Which CSS property is standard to collapse double table borders into a single line?",
    options: ["border-collapse: collapse;", "border-spacing: 0;", "border-style: solid;", "grid-gap: 0;"],
    correctAnswer: "border-collapse: collapse;",
    hint: "Setting border-collapse: collapse collapses cell borders into a single clean border."
  },
  {
    id: 80,
    slug: "capstone-weekly-schedule-pricing-grid",
    title: "Capstone Project: Dynamic Pricing Grid",
    unit: "Unit 8: Lists, Tables & Layout Grids",
    bookRef: "Duckett Chapter 6 & 11",
    tag: "custom grid layout",
    concept: "Grid layout integration",
    analogy: "price lists comparison cards",
    question: "Which HTML structure is best suited to display a clear comparisons matrix of features across pricing tiers?",
    options: ["A semantic <table> structured with thead, tbody, and colgroups", "A series of line breaks and bold tags", "A description list with start attributes", "An unordered list nested in an address tag"],
    correctAnswer: "A semantic <table> structured with thead, tbody, and colgroups",
    hint: "Tables are the semantic standard to present comparisons data, ensuring columns and rows align."
  },

  // Unit 9: Interactive Forms & Inputs (81-90)
  {
    id: 81,
    slug: "form-action-method-attributes-processing",
    title: "Form Action & Method (processing basics)",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 144-146)",
    tag: "<form>",
    concept: "Form properties action method",
    analogy: "letter envelope with target address and mail class",
    question: "Which attribute specifies the server URL destination where form data should be sent upon submission?",
    options: ["action", "method", "target", "post"],
    correctAnswer: "action",
    hint: "The action attribute specifies the API endpoint URL (e.g. /submit-form) handling the request."
  },
  {
    id: 82,
    slug: "form-labeling-for-attribute-linkage",
    title: "Form Labels (for attribute linkage)",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 150-152)",
    tag: "<label>",
    concept: "Label target inputs linkage",
    analogy: "name tag physically tied to a suitcase handle",
    question: "How do you associate a <label> tag with an <input> field semantically?",
    options: ["Match the label's 'for' attribute with the input's 'id'", "Match the label's 'name' with the input's 'name'", "Nest the input inside a header tag", "Assign matching class names"],
    correctAnswer: "Match the label's 'for' attribute with the input's 'id'",
    hint: "Setting for=\"user-email\" on a label matches it to the input with id=\"user-email\", enabling click-to-focus."
  },
  {
    id: 83,
    slug: "text-password-inputs-type-attributes",
    title: "Text & Password Inputs (type=\"text\", \"password\")",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 147-149)",
    tag: "<input>",
    concept: "Input text password fields",
    analogy: "writing on index cards vs. masking numbers",
    question: "Which attribute hides typed letters, displaying dots or asterisks instead?",
    options: ["type=\"password\"", "type=\"hide\"", "type=\"mask\"", "type=\"secure\""],
    correctAnswer: "type=\"password\"",
    hint: "type=\"password\" masks inputs visually to protect passwords on screen."
  },
  {
    id: 84,
    slug: "radio-buttons-grouping-name-attribute",
    title: "Radio Buttons (type=\"radio\")",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 154-155)",
    tag: "type=\"radio\"",
    concept: "Radio buttons mutual selection",
    analogy: "car radio selector buttons where only one option stays pressed",
    question: "What attribute groups radio buttons together so that selecting one automatically deselects others?",
    options: ["name", "id", "class", "group"],
    correctAnswer: "name",
    hint: "Radio inputs must share the exact same name attribute value to act as a mutually exclusive choice group."
  },
  {
    id: 85,
    slug: "checkboxes-prechecked-multiple-selections",
    title: "Checkboxes (type=\"checkbox\")",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 156-157)",
    tag: "type=\"checkbox\"",
    concept: "Checkbox multi selections",
    analogy: "checking multiple boxes on a questionnaire list",
    question: "Which attribute is used to make a checkbox checked by default when the page loads?",
    options: ["checked", "selected", "active", "default"],
    correctAnswer: "checked",
    hint: "Adding the checked attribute (e.g. checked=\"checked\" or just checked) pre-selects the box on load."
  },
  {
    id: 86,
    slug: "dropdown-select-lists-option-attributes",
    title: "Dropdown Select Lists (<select> and <option>)",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 158-159)",
    tag: "<select>",
    concept: "Dropdown menu selectors",
    analogy: "expanding rolodex card slot list",
    question: "Which tag is nested inside <select> to define an individual option in a dropdown menu?",
    options: ["<option>", "<list>", "<item>", "<choice>"],
    correctAnswer: "<option>",
    hint: "Each menu option is defined using the `<option value=\"...\">Label</option>` tag."
  },
  {
    id: 87,
    slug: "multiline-textarea-rows-cols-settings",
    title: "Multi-line Input (<textarea>)",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 160-161)",
    tag: "<textarea>",
    concept: "Textarea multi-line text input",
    analogy: "large feedback notepad sheet",
    question: "Which attributes define the initial height and width of a <textarea> box?",
    options: ["rows and cols", "width and height", "size and max", "lines and letters"],
    correctAnswer: "rows and cols",
    hint: "rows sets the text lines height, and cols sets the character width spacing layout."
  },
  {
    id: 88,
    slug: "buttons-submit-button-reset-types",
    title: "Buttons (type=\"submit\", \"button\", \"reset\")",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 162-163)",
    tag: "<button>",
    concept: "Button controller behaviors",
    analogy: "physical launch trigger buttons",
    question: "What is the default behavior of a <button> placed inside a <form> if no type attribute is specified?",
    options: ["It submits the form data (type=\"submit\")", "It clears the fields (type=\"reset\")", "It acts as a neutral button", "It disables the form"],
    correctAnswer: "It submits the form data (type=\"submit\")",
    hint: "By default, browser specifications treat raw buttons inside form blocks as submit buttons."
  },
  {
    id: 89,
    slug: "binding-input-labels-label-container",
    title: "Binding Input Labels (<label>)",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 150)",
    tag: "<label>",
    concept: "Form label containers accessibility",
    analogy: "enveloping box with target description wrapper",
    question: "What is the accessibility advantage of wrapping an input tag directly inside a <label> tag?",
    options: ["Clicking the label text automatically focuses/toggles the input", "It loads scripts", "It makes text bold", "It sends data securely"],
    correctAnswer: "Clicking the label text automatically focuses/toggles the input",
    hint: "Nesting `<input>` inside `<label>` links them, enlarging the clickable target area for users."
  },
  {
    id: 90,
    slug: "form-groups-fieldset-legend-elements",
    title: "Form Groups (<fieldset> and <legend>)",
    unit: "Unit 9: Interactive Forms & Inputs",
    bookRef: "Duckett Chapter 7 (p. 164-165)",
    tag: "<fieldset>",
    concept: "Form fieldset legend groupings",
    analogy: "index divider tab dividing files inside a binder",
    question: "Which tag provides the text title caption for a <fieldset> border group?",
    options: ["<legend>", "<caption>", "<title>", "<label>"],
    correctAnswer: "<legend>",
    hint: "<legend> defines the text header displayed on the fieldset container border line."
  },

  // Unit 10: Advanced Semantics, Validation & APIs (91-100)
  {
    id: 91,
    slug: "form-validation-required-maxlength-minlength",
    title: "Form Field Required Validation",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 12",
    tag: "required",
    concept: "Required validation checks",
    analogy: "red asterisk gate keeper checklist",
    question: "Which boolean attribute blocks form submission if an input field is left empty?",
    options: ["required", "validate", "empty=\"false\"", "disabled"],
    correctAnswer: "required",
    hint: "Adding the required attribute prompts the browser to show a validation warning if submitted empty."
  },
  {
    id: 92,
    slug: "regex-pattern-matching-validation",
    title: "Regex Pattern Matching (pattern attribute)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 12",
    tag: "pattern",
    concept: "Regex pattern validation input checks",
    analogy: "custom security stencil template shape matcher",
    question: "Which attribute validates form input text using a Regular Expression (regex) pattern?",
    options: ["pattern", "regex", "format", "validate"],
    correctAnswer: "pattern",
    hint: "Use pattern=\"[0-9]{5}\" to restrict inputs to exactly 5 digits, validating client-side."
  },
  {
    id: 93,
    slug: "html5-numeric-ranges-type-number-range",
    title: "HTML5 Numeric Ranges (type=\"range\", type=\"number\")",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 12",
    tag: "type=\"range\"",
    concept: "Slider spinner number range fields",
    analogy: "dimmer knob dial and speedometer counter",
    question: "Which input type displays a native graphical slider knob to choose values between a min and max range?",
    options: ["type=\"range\"", "type=\"slider\"", "type=\"number\"", "type=\"dial\""],
    correctAnswer: "type=\"range\"",
    hint: "type=\"range\" renders a slider, while type=\"number\" renders a text box with increment spinners."
  },
  {
    id: 94,
    slug: "progress-indicators-meter-gauges",
    title: "Progress Indicators (<progress>) & Meter Gauges (<meter>)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "<progress>",
    concept: "Progress meter value indicators",
    analogy: "downloading status bars and car fuel gauges",
    question: "Which tag is semantically best to show a disk storage usage percentage or a fuel gauge reading?",
    options: ["<meter>", "<progress>", "<gauge>", "<range>"],
    correctAnswer: "<meter>",
    hint: "Use <progress> for task completion (e.g. downloading), and <meter> for static fraction measurements (e.g. space usage)."
  },
  {
    id: 95,
    slug: "autocomplete-datalist-input-suggestions",
    title: "Autocomplete Data Lists (<datalist>)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 12",
    tag: "<datalist>",
    concept: "Datalist options search input suggestions",
    analogy: "search bar autocomplete suggestions drop list",
    question: "How do you connect a <datalist> suggestion dropdown to an <input> field?",
    options: ["Link the input's 'list' attribute to the datalist's 'id'", "Link the input's 'id' to the datalist's 'for'", "Nest the input inside the datalist", "By matching name values"],
    correctAnswer: "Link the input's 'list' attribute to the datalist's 'id'",
    hint: "Use list=\"browsers\" on the input, referencing a datalist with id=\"browsers\" holding option values."
  },
  {
    id: 96,
    slug: "collapsible-accordions-details-summary",
    title: "Collapsible Accordions (<details> and <summary>)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 14",
    tag: "<details>",
    concept: "Accordion details summary elements",
    analogy: "secret drawer box that pops open when pushed",
    question: "Which element provides the visible clickable heading for a collapsible <details> accordion widget?",
    options: ["<summary>", "<title>", "<heading>", "<label>"],
    correctAnswer: "<summary>",
    hint: "<summary> acts as the click trigger that toggles the rest of the <details> accordion content."
  },
  {
    id: 97,
    slug: "native-modals-dialog-showmodal-methods",
    title: "Native Modals & Popups (<dialog>)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 14",
    tag: "<dialog>",
    concept: "Dialog modals popup overlays",
    analogy: "alert billboard popup that locks navigation flow",
    question: "Which JavaScript method is called to open a <dialog> tag as a native modal overlay?",
    options: ["dialog.showModal()", "dialog.open()", "dialog.show()", "dialog.popup()"],
    correctAnswer: "dialog.showModal()",
    hint: "showModal() opens the dialog as a modal, rendering a backdrop and trapping page focus, unlike show()."
  },
  {
    id: 98,
    slug: "web-components-template-slot-elements",
    title: "Web Components Templates (<template> and <slot>)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 14",
    tag: "<template>",
    concept: "Template slot elements web components",
    analogy: "cookie stencil mold that sits in the drawer",
    question: "What is a key rendering characteristic of markup written inside the <template> tag?",
    options: ["It is hidden and not rendered by the browser until cloned with JavaScript", "It renders in italics", "It is instantly loaded via styles", "It redirects page parameters"],
    correctAnswer: "It is hidden and not rendered by the browser until cloned with JavaScript",
    hint: "Template content is parsed but dormant in the DOM, allowing scripts to safely copy it without triggering side-effects."
  },
  {
    id: 99,
    slug: "canvas-graphics-draw-shapes-context",
    title: "Canvas Graphics (<canvas>)",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5 Chapter 16",
    tag: "<canvas>",
    concept: "Canvas drawing surface api",
    analogy: "whiteboard screen and sketch pen controller",
    question: "Which tag is used as a container to draw shapes, graphs, and game graphics programmatically via JavaScript?",
    options: ["<canvas>", "<svg>", "<paint>", "<graphic>"],
    correctAnswer: "<canvas>",
    hint: "The canvas tag provides an empty bitmap canvas surface, which scripts target via the getContext('2d') API."
  },
  {
    id: 100,
    slug: "capstone-portfolio-layout-page",
    title: "Capstone Project: Portfolio Layout",
    unit: "Unit 10: Advanced Semantics, Validation & APIs",
    bookRef: "The Definitive Guide to HTML5",
    tag: "capstone project page",
    concept: "HTML5 validation structures integration",
    analogy: "delivering a complete building structure blueprint",
    question: "Which set of HTML5 tags represents the most semantic way to outline a portfolio page with headers, main articles, sidebars, and footers?",
    options: ["<header>, <nav>, <main>, <aside>, <footer>", "<div>, <span>, <table>, <p>", "<fieldset>, <legend>, <form>, <button>", "<dl>, <dt>, <dd>, <li>"],
    correctAnswer: "<header>, <nav>, <main>, <aside>, <footer>",
    hint: "Using layout tags describes document structure clearly to search engines and screen readers."
  }
];

// Helper to clean display names
function cleanTitle(title) {
  return title.replace(/<[^>]+>/g, '').trim();
}

// Generate translations using detailed semantic templates
const generatedLessons = lessonsDb.map(lesson => {
  const tagName = lesson.tag;
  const concept = lesson.concept;
  const analogy = lesson.analogy;
  
  // English Kid & Pro template
  const englishKid = `### 🧒 Let's Learn: ${lesson.title}!\nToday, we are looking at the **\`${tagName}\`** tag, which represents **${concept}** on our webpage!\n\n* **Analogy**: Imagine a **${analogy}**.\n* **How it works**: You wrap your content in the tag to tell the browser how it should look and behave.\n\n\`\`\`html\n${tagName === "<strong>" ? "<strong>This is super important!</strong>" : tagName === "<em>" ? "<em>Please read this carefully.</em>" : `<!-- Example use of ${tagName} -->`}\n\`\`\`\n\nTry it out in the check questions below!`;
  
  const englishPro = `### 💻 Professional Specifications: ${lesson.title}\nThe HTML \`${tagName}\` element is used to represent **${concept}** semantically.\n\n* **DOM Specifications**: It belongs to the category of flow content and phrasing content, carrying standard accessibility traits.\n* **Best Practice**: Use this tag for semantic clarity to improve SEO index crawling and screen reader accessibility.\n\n\`\`\`html\n<!-- Semantically valid usage -->\n${tagName === "<strong>" ? "<strong>Important Warning Text</strong>" : tagName === "<em>" ? "<em>Emphasized Text</em>" : `<!-- ${tagName} specification container -->`}\n\`\`\`\n\nConsult the standard specifications in ${lesson.bookRef} for advanced details.`;

  // Hinglish Kid & Pro template
  const hinglishKid = `### 🧒 ${cleanTitle(lesson.title)} seekhein!\nWeb development me **\`${tagName}\`** tag ka use **${concept}** show karne ke liye kiya jata hai.\n\n* **Story Analogy**: Ise ek **${analogy}** ki tarah samjhein jo page ko neatly setup karta hai!\n* **Easy Implementation**: Bas text ya contents ko is tag ke andar wrap karein aur browser use automatically process kar lega.`;
  
  const hinglishPro = `### 💻 Technical Notes for ${cleanTitle(lesson.title)}\n\`${tagName}\` element ka configuration details aur browser implementation guidelines:\n\n* **SEO Value**: Google crawler indexes parse attributes check karte waqt is tag ko target validation tags me query karte hain.\n* **Reset Styles**: User-agent styles properties customize karne ke liye baseline controls sets configure karein.`;

  // Hindi Kid & Pro template
  const hindiKid = `### 🧒 आइए सीखें: ${cleanTitle(lesson.title)}!\nआज हम **\`${tagName}\`** टैग के बारे में जानेंगे, जिसका उपयोग वेबपेज में **${concept}** दर्शाने के लिए किया जाता है।\n\n* **कहानी**: इसे एक **${analogy}** की तरह समझें, जो आपके वेबपेज को साफ और सुंदर बनाता है!\n* **उपयोग का तरीका**: बस अपने टेक्स्ट को इस टैग के भीतर रखें ताकि ब्राउज़र इसे सही ढंग से समझ सके।`;
  
  const hindiPro = `### 💻 व्यावसायिक मार्गदर्शिका: ${cleanTitle(lesson.title)}\n\`${tagName}\` तत्व दस्तावेज़ के पदानुक्रम में **${concept}** का प्रतिनिधित्व करता है:\n\n* **एसईओ और पहुंच (SEO & Accessibility)**: यह स्क्रीन रीडर्स को सामग्री का सही महत्व समझने में मदद करता है।\n* **सिमेंटिक्स**: सामान्य डिब्बों के स्थान पर इसका उपयोग कोडिंग मानकों को बढ़ाता है।`;

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    unit: lesson.unit,
    bookRef: lesson.bookRef,
    exercise: {
      question: lesson.question,
      options: lesson.options,
      correctAnswer: lesson.correctAnswer,
      hint: lesson.hint
    },
    english: {
      kid: englishKid,
      pro: englishPro
    },
    hinglish: {
      kid: hinglishKid,
      pro: hinglishPro
    },
    hindi: {
      kid: hindiKid,
      pro: hindiPro
    }
  };
});

// Build the final array string
const finalArrayBody = generatedLessons.map(l => JSON.stringify(l, null, 2)).join(',\n');

// Combine the top part with the lesson 30 translations, a comma separator, the rest of lessons 31-100, and the closing array bracket
const newTsContent = topPart + lesson30Translations + ',\n' + finalArrayBody + '\n];\n';

fs.writeFileSync(TargetFilePath, newTsContent, 'utf8');
console.log("Successfully compiled all remaining 70 HTML lessons (31 to 100) inside htmlLessonsData.ts!");
