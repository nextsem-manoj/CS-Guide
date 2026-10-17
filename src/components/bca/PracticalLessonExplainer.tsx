"use client";

import React, { useState } from "react";
import { 
  Lightbulb, 
  Sparkles, 
  Globe, 
  Code2, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Eye, 
  ShieldCheck,
  FileCode,
  Zap,
  ArrowRight
} from "lucide-react";
import { PracticalLesson } from "@/data/bcaPracticalData";

export interface PracticalLessonExplainerProps {
  lesson: PracticalLesson;
}

type LangMode = "english" | "hinglish";

interface TagDetail {
  tag: string;
  name: string;
  category: string;
  englishPurpose: string;
  hinglishPurpose: string;
  attributes: { name: string; required: boolean; descEn: string; descHi: string }[];
  codeSnippet: string;
  previewType: "form" | "input" | "table" | "list" | "link" | "text" | "generic";
  examTipEn: string;
  examTipHi: string;
  seniorTrapEn: string;
  seniorTrapHi: string;
}

/**
 * Curated deep-dive encyclopedic explanations for core curriculum days
 */
const TOPIC_DEEP_DIVES: Record<number, {
  subtitleEn: string;
  subtitleHi: string;
  realWorldContextEn: string;
  realWorldContextHi: string;
  pipelineTitleEn: string;
  pipelineTitleHi: string;
  pipelineSteps: { step: string; titleEn: string; titleHi: string; descEn: string; descHi: string }[];
  tags: TagDetail[];
  pitfalls: { titleEn: string; titleHi: string; badCode: string; goodCode: string; explanationEn: string; explanationHi: string }[];
  vivaPrep: { questionEn: string; questionHi: string; answerEn: string; answerHi: string }[];
}> = {
  // ── DAY 5: HTML FORMS & INPUT ELEMENTS ──
  5: {
    subtitleEn: "Transform static web pages into interactive two-way data applications.",
    subtitleHi: "Apni static web pages ko dynamic two-way data collection applications mein badlein.",
    realWorldContextEn: "Without forms, the web would be just digital billboards. Every login screen, Google search box, online shopping checkout, and job portal relies entirely on HTML forms to package user data and securely ship it to backend servers.",
    realWorldContextHi: "Forms ke bina internet sirf ek digital billboard hota. Chahe Google Search ho, portal login ho, ya job portal pe resume submit karna—har dynamic website HTML forms se hi user ka data pack karke backend server tak pahunchati hai.",
    pipelineTitleEn: "How an HTML Form Submits Data Behind the Scenes",
    pipelineTitleHi: "HTML Form Ka Data Backend Server Tak Kaise Jata Hai (Step-by-Step Flow)",
    pipelineSteps: [
      {
        step: "1",
        titleEn: "User Enters Data",
        titleHi: "User Details Fill Karta Hai",
        descEn: "User types text, selects checkboxes, uploads files, or clicks radio buttons inside input fields.",
        descHi: "User apne browser mein name, email, radio button ya resume upload field mein data bharta hai."
      },
      {
        step: "2",
        titleEn: "Client-Side Native Validation",
        titleHi: "Browser Khud Data Validate Karta Hai",
        descEn: "HTML5 checks `required`, `type='email'`, `minlength`, and regex `pattern` before anything leaves the browser. If invalid, the browser halts submission and shows a popup alert.",
        descHi: "HTML5 bina kisi JavaScript ke check karta hai ki email valid hai ya nahi, aur required fields bhari hain ya nahi. Invalid hone par browser turant red warning popup dikha deta hai."
      },
      {
        step: "3",
        titleEn: "Payload Bundled via `name`",
        titleHi: "`name` Attribute Ke Sath Data Bundle Hota Hai",
        descEn: "CRITICAL: The browser bundles fields as key-value pairs using each input's `name` attribute (e.g. `fullName=Rahul&email=rahul@test.com`). Without `name`, inputs are completely discarded!",
        descHi: "SABSE IMPORTANT: Browser har input ko uske `name` attribute ke sath jodkar pack karta hai (jaise fullName=Rahul). Agar aapne name attribute chhod diya, to server ko blank data milega!"
      },
      {
        step: "4",
        titleEn: "HTTP Transmission (GET vs POST)",
        titleHi: "Server Tak HTTP Request Deliver Hoti Hai",
        descEn: "`method='POST'` packages data invisibly inside the HTTP request body (ideal for passwords & forms). `method='GET'` appends data to the visible URL bar (used for search queries).",
        descHi: "`POST` method data ko secret HTTP body mein pack karke bhejta hai (passwords aur jobs ke liye zaroori). `GET` method URL ke peeche `?query=...` laga kar bhejta hai (search bars ke liye)."
      }
    ],
    tags: [
      {
        tag: "<form>",
        name: "Form Container",
        category: "Container Element",
        englishPurpose: "The wrapper element that defines how and where all nested input fields will be submitted.",
        hinglishPurpose: "Poore form ka parent wrapper jo tay karta hai ki data kis server address pe aur kis method se bheja jayega.",
        attributes: [
          { name: "action", required: true, descEn: "The backend server URL or script endpoint that processes submitted data.", descHi: "Backend server ka URL ya file jahan form submit hone ke baad data process hoga." },
          { name: "method", required: true, descEn: "HTTP transfer protocol: 'POST' (secure data payload) or 'GET' (URL query parameters).", descHi: "'POST' (hidden body payload) ya 'GET' (visible URL parameters)." }
        ],
        codeSnippet: `<form action="/submit-job" method="POST">\n  <!-- All inputs go inside here -->\n</form>`,
        previewType: "form",
        examTipEn: "Always specify method='POST' when sensitive data (passwords, addresses, resumes) is handled.",
        examTipHi: "Exams mein hamesha method='POST' likhein jab bhi password ya user profile form pucha jaye.",
        seniorTrapEn: "Submitting a form without an `action` attribute causes the page to reload itself and reset form state.",
        seniorTrapHi: "Bina action ke form submit karne par page refresh ho jayega aur user ka likha sab erase ho jayega."
      },
      {
        tag: "<input>",
        name: "Interactive Data Input",
        category: "Void Element (Self-Closing)",
        englishPurpose: "The workhorse of web forms. Its visual and functional behavior changes completely based on the `type` attribute.",
        hinglishPurpose: "Web forms ka sabse versatile tag. `type` attribute badalne se yeh text box, password, radio button ya file upload ban jata hai.",
        attributes: [
          { name: "type", required: true, descEn: "Control type: 'text', 'email', 'password', 'tel', 'file', 'radio', 'checkbox', 'submit'.", descHi: "Control ka type: text, email, password, file, radio, checkbox etc." },
          { name: "name", required: true, descEn: "MANDATORY: The backend variable key. Without `name`, this field will NOT be submitted to the server!", descHi: "MANDATORY: Backend variable key. Iske bina input ka data server tak kabhi nahi pahunchta!" },
          { name: "id", required: true, descEn: "Unique identifier on the page; must match the `<label for='...'>` attribute.", descHi: "Unique identifier jo label ke 'for' attribute se connect hota hai." },
          { name: "required", required: false, descEn: "Prevents submission if left empty (browser handles validation automatically).", descHi: "Agar field khali ho to submit rokk kar warning dikhata hai." }
        ],
        codeSnippet: `<input type="email" id="userEmail" name="email" placeholder="name@example.com" required>`,
        previewType: "input",
        examTipEn: "Remember that `<input>` is a void element in HTML5 and never has a closing `</input>` tag.",
        examTipHi: "Yaad rakhein: `<input>` self-closing hota hai, iska kabhi `</input>` closing tag nahi hota.",
        seniorTrapEn: "Setting `id` without `name`. The form will look right visually, but your backend database will receive zero data!",
        seniorTrapHi: "`id` laga kar `name` bhool jana: visual UI theek lagegi par backend database mein blank value submit hogi!"
      },
      {
        tag: "<label>",
        name: "Accessible Field Label",
        category: "Inline Element",
        englishPurpose: "Provides clear textual caption for form controls and crucially expands the clickable hit target for mouse and touch users.",
        hinglishPurpose: "Input field ka title dikhata hai aur click area bada karta hai: text pe click karne se input box automatic focus ho jata hai.",
        attributes: [
          { name: "for", required: true, descEn: "Must match the exact `id` of the target input element.", descHi: "Target input ke exact `id` se match hona chahiye." }
        ],
        codeSnippet: `<label for="userEmail">Your Official Email Address:</label>\n<input type="email" id="userEmail" name="email" required>`,
        previewType: "input",
        examTipEn: "Viva examiner favorite: 'How does a label improve accessibility?' Mention screen readers and tap target expansion.",
        examTipHi: "Viva check question: Label screen readers ko batata hai ki field kya hai aur phone par tap karna easy banata hai.",
        seniorTrapEn: "Wrapping text in plain `<span>` or `<p>` instead of `<label for='...'>`. Breaks screen reader accessibility.",
        seniorTrapHi: "Label ke bajaye simple `<p>` ya `<span>` use karna accessibility guidelines (WCAG) ko violate karta hai."
      },
      {
        tag: "type='radio'",
        name: "Mutually Exclusive Choice",
        category: "Input Variant",
        englishPurpose: "Allows users to select exactly ONE option from a predefined list of mutually exclusive choices.",
        hinglishPurpose: "Kayi options mein se sirf aur sirf EK option select karne ke liye (jaise Gender, Fresher/Experienced).",
        attributes: [
          { name: "name", required: true, descEn: "ALL options in the same group MUST share the identical `name` to enforce mutual exclusion!", descHi: "Group ke sabhi radio buttons ka `name` IDENTICAL hona chahiye taaki ek waqt pe ek hi select ho!" },
          { name: "value", required: true, descEn: "The data sent to the server when this specific option is selected.", descHi: "Jab user yeh option chune to server ko jo string bhejni hai." }
        ],
        codeSnippet: `<input type="radio" id="fresher" name="exp" value="fresher" checked>\n<label for="fresher">Fresher</label>\n\n<input type="radio" id="exp1" name="exp" value="1-2yrs">\n<label for="exp1">1-2 Years Experience</label>`,
        previewType: "generic",
        examTipEn: "To make radio buttons mutually exclusive, assign the exact same `name` attribute to all of them.",
        examTipHi: "Agar do radio buttons dono select ho rahe hain, to unka `name` attribute alag hoga. Dono ka name same kardo, fix ho jayega!",
        seniorTrapEn: "Giving different names to radio buttons in the same group, which allows the user to select multiple conflicting options.",
        seniorTrapHi: "Radio buttons ko alag-alag name de dena—usse user sabhi options ko select kar payega jo illegal hai."
      },
      {
        tag: "<select> & <option>",
        name: "Dropdown Selection Menu",
        category: "Form Control",
        englishPurpose: "Saves massive screen space by collapsing multiple choices into an elegant popup dropdown menu.",
        hinglishPurpose: "Screen space bachane ke liye kayi options ko ek compact dropdown menu mein dikhata hai.",
        attributes: [
          { name: "name", required: true, descEn: "The backend parameter name for the selected option.", descHi: "Backend ke liye parameter key." },
          { name: "value", required: true, descEn: "Belongs on each `<option>`: the machine-readable value sent to backend.", descHi: "Har option ka actual data jo server ko jayega." }
        ],
        codeSnippet: `<select id="course" name="course">\n  <option value="bca">Bachelor of Computer Applications (BCA)</option>\n  <option value="mca">Master of Computer Applications (MCA)</option>\n</select>`,
        previewType: "generic",
        examTipEn: "Use the `selected` attribute on an `<option>` to make it the default chosen item on page load.",
        examTipHi: "Kisi option ko default selected rakhne ke liye us par `selected` attribute lagayein.",
        seniorTrapEn: "Forgetting the `value` attribute on `<option>`. Some browsers will fall back to sending the entire inner text.",
        seniorTrapHi: "Option pe value chhod dena, jisse messy inner text backend server pe chala jata hai."
      },
      {
        tag: "<textarea>",
        name: "Multi-line Text Field",
        category: "Paired Element",
        englishPurpose: "Provides a resizable multi-line text input for long-form answers like cover letters, comments, or feedback.",
        hinglishPurpose: "Lambe text, cover letters ya feedback ke liye multiple lines wala resizable text box.",
        attributes: [
          { name: "rows", required: false, descEn: "Initial visible vertical height in text lines (default ~2).", descHi: "Box ki initial line height (e.g. rows='5')." },
          { name: "cols", required: false, descEn: "Initial visible horizontal width in character columns.", descHi: "Box ki initial character width." }
        ],
        codeSnippet: `<label for="cover">Cover Letter:</label>\n<textarea id="cover" name="coverLetter" rows="4" placeholder="Describe your coding experience..."></textarea>`,
        previewType: "generic",
        examTipEn: "Notice that `<textarea>` requires a closing `</textarea>` tag, unlike single-line `<input>`.",
        examTipHi: "Yaad rakhein: `<textarea>` ka closing tag `</textarea>` zaroori hota hai! Default text dono tags ke beech mein likha jata hai.",
        seniorTrapEn: "Trying to set default text using `value='...'`. For `<textarea>`, default content goes between `<textarea>Content here</textarea>`.",
        seniorTrapHi: "Textarea mein value='' attribute lagana kaam nahi karta; default text `<textarea>` aur `</textarea>` ke beech aana chahiye."
      }
    ],
    pitfalls: [
      {
        titleEn: "The Silent Failure: Missing `name` Attribute",
        titleHi: "Sabse Badi Junior Mistake: `name` Attribute Bhool Jana",
        badCode: `<!-- ❌ WRONG: Submits EMPTY data to backend! -->\n<form action="/login" method="POST">\n  <input type="email" id="email">\n  <button type="submit">Sign In</button>\n</form>`,
        goodCode: `<!-- ✅ CORRECT: Submits { userEmail: "val" } -->\n<form action="/login" method="POST">\n  <input type="email" id="email" name="userEmail" required>\n  <button type="submit">Sign In</button>\n</form>`,
        explanationEn: "Browsers ONLY send inputs that have a `name` attribute. Without `name`, the input exists visually on screen but is completely ignored during form submission.",
        explanationHi: "Browser sirf unhi inputs ko submit karta hai jinme `name` attribute hota hai. Bina `name` ke input screen pe dikhega par server ko khali payload milega."
      },
      {
        titleEn: "Radio Group Disconnection: Differing `name` Attributes",
        titleHi: "Radio Button Glitch: Alag-Alag `name` Dena",
        badCode: `<!-- ❌ WRONG: User can select BOTH options! -->\n<input type="radio" id="m" name="isMale" value="m">\n<label for="m">Male</label>\n<input type="radio" id="f" name="isFemale" value="f">\n<label for="f">Female</label>`,
        goodCode: `<!-- ✅ CORRECT: Only ONE can be selected at a time -->\n<input type="radio" id="m" name="gender" value="m" checked>\n<label for="m">Male</label>\n<input type="radio" id="f" name="gender" value="f">\n<label for="f">Female</label>`,
        explanationEn: "Radio buttons are grouped by their `name`. If you give them different names, the browser treats them as unrelated toggles, allowing multiple selections.",
        explanationHi: "Radio buttons tabhi mutually exclusive hote hain jab sabhi ka `name` attribute exact match ho. Alag name dene par dono ek sath tick ho jate hain."
      },
      {
        titleEn: "Unlinked Label Accessibility Violation",
        titleHi: "Unlinked Label: Label Aur Input Ka Connection Tutna",
        badCode: `<!-- ❌ WRONG: Clicking text does nothing -->\n<label>Phone Number:</label>\n<input type="tel" name="phone">`,
        goodCode: `<!-- ✅ CORRECT: Clicking text automatically focuses input -->\n<label for="phoneInput">Phone Number:</label>\n<input type="tel" id="phoneInput" name="phone" required>`,
        explanationEn: "By explicitly binding `<label for='id'>` with `<input id='id'>`, tapping the label on a smartphone automatically focuses the field and brings up the telephone keypad.",
        explanationHi: "Jab aap label ke `for` ko input ke `id` se connect karte hain, to phone screen par label par halka sa tap karte hi input box focus ho jata hai."
      }
    ],
    vivaPrep: [
      {
        questionEn: "What is the difference between GET and POST methods in an HTML form?",
        questionHi: "HTML form mein GET aur POST method mein kya farq hota hai?",
        answerEn: "GET appends submitted data directly to the URL query string (`/search?q=term`), making it visible, bookmarkable, but limited in size and insecure for passwords. POST sends data invisibly in the HTTP message body, supporting unlimited payload size, binary file uploads, and secure encrypted transmission.",
        answerHi: "GET data ko URL ke andar add karke bhejta hai (`?q=term`), jo history mein save ho jata hai aur password ke liye bilkul safe nahi hai. POST data ko secret HTTP body mein pack karke bhejta hai, jisme sensitive data aur files securely travel karti hain."
      },
      {
        questionEn: "Why is the `name` attribute mandatory on input elements?",
        questionHi: "Input elements par `name` attribute kyu mandatory hota hai?",
        answerEn: "The `name` attribute acts as the key in the server's key-value pair payload (e.g. `req.body.username`). If `name` is omitted, the browser strips that input from the form serialization entirely, sending nothing to the backend server.",
        answerHi: "`name` attribute server ke liye variable key ka kaam karta hai. Agar input mein `name` nahi hoga, to browser use submit hi nahi karega aur backend ko kuch receive nahi hoga."
      },
      {
        questionEn: "How does HTML5 native validation work without JavaScript?",
        questionHi: "HTML5 native validation bina JavaScript ke kaise kaam karta hai?",
        answerEn: "HTML5 provides declarative validation attributes such as `required`, `type='email'`, `minlength`, `maxlength`, and `pattern`. Before submitting, modern browsers inspect these constraints; if any fail, the browser cancels submission and renders an accessible localized error bubble pointing to the erroneous input.",
        answerHi: "HTML5 mein `required`, `type='email'`, `pattern` jaise built-in attributes hote hain. Submit button dabane par browser khud check karta hai. Agar koi rule violate ho, to browser submit rok deta hai aur user ko direct bubble alert dikhata hai."
      }
    ]
  },

  // ── DAY 4: HTML LISTS & TABLES ──
  4: {
    subtitleEn: "Master organized bullet points, hierarchical menus, and tabular matrix data.",
    subtitleHi: "Structured bullet points, nested menus aur tabular grid data banana seekhein.",
    realWorldContextEn: "Web navigation bars, sitemaps, price matrices, semester grade cards, and financial statements all rely on proper semantic lists and tables. Using the wrong tag harms accessibility and SEO.",
    realWorldContextHi: "Website ke navigation bars, sitemaps, marks sheets aur price comparison tables sabhi semantic lists aur tables se bante hain. Layout ke liye table use karna galat hai, table sirf data ke liye hoti hai.",
    pipelineTitleEn: "HTML Table Structural Hierarchy",
    pipelineTitleHi: "HTML Table Ka Correct Structural Hierarchy",
    pipelineSteps: [
      {
        step: "1",
        titleEn: "Parent Container <table>",
        titleHi: "Parent Table Wrapper",
        descEn: "Initializes the tabular context; should never be used for page layouts, only 2D data.",
        descHi: "Table initialize karta hai. Layout ke liye nahi, sirf tabular data ke liye use karein."
      },
      {
        step: "2",
        titleEn: "Semantic Header <thead>",
        titleHi: "Table Header Section",
        descEn: "Contains the table header row(s) with `<th>` (Table Header) tags that are bold and centered by default.",
        descHi: "Columns ki heading rakhne ki jagah. Iske andar `<th>` tags aate hain jo by default bold aur centered hote hain."
      },
      {
        step: "3",
        titleEn: "Data Rows <tbody>",
        titleHi: "Table Body Section",
        descEn: "Contains the actual records in `<tr>` (Table Rows) composed of `<td>` (Table Data) cells.",
        descHi: "Actual data records rakhne ki jagah. `<tr>` row hoti hai aur `<td>` cell hota hai."
      },
      {
        step: "4",
        titleEn: "Cell Merging (`colspan` & `rowspan`)",
        titleHi: "Cells Ko Merge Karna",
        descEn: "`colspan='N'` merges cells horizontally across columns; `rowspan='N'` merges cells vertically across rows.",
        descHi: "`colspan` horizontal columns ko jodta hai; `rowspan` vertical rows ko merge karta hai."
      }
    ],
    tags: [
      {
        tag: "<ul> & <ol>",
        name: "Unordered vs Ordered Lists",
        category: "List Containers",
        englishPurpose: "`<ul>` creates bulleted lists (items where order doesn't matter); `<ol>` creates numbered sequential lists.",
        hinglishPurpose: "`<ul>` bullet points banata hai (order zaroori nahi). `<ol>` numbered list banata hai (steps jahan sequence zaroori ho).",
        attributes: [
          { name: "type", required: false, descEn: "Controls bullet/number style (e.g. '1', 'a', 'A', 'i', 'I').", descHi: "Numbering style badalta hai (1, a, I)." }
        ],
        codeSnippet: `<ul>\n  <li>HTML5 Semantic Tags</li>\n  <li>CSS3 Flexbox</li>\n</ul>`,
        previewType: "list",
        examTipEn: "CRITICAL: Only `<li>` elements are legally permitted as direct children of `<ul>` and `<ol>`.",
        examTipHi: "Exams ke liye zaroori: `<ul>` aur `<ol>` ke direct andar sirf aur sirf `<li>` aa sakta hai!",
        seniorTrapEn: "Placing `<p>` or `<div>` directly inside `<ul>`. Breaks HTML parsing standards.",
        seniorTrapHi: "`<ul>` ke direct andar `<p>` ya `<div>` likhna HTML specification ka violation hai."
      },
      {
        tag: "<table>",
        name: "2D Data Table",
        category: "Tabular Matrix",
        englishPurpose: "Displays structured 2-dimensional grid data with rows and columns.",
        hinglishPurpose: "Excel spreadsheet ki tarah 2D rows aur columns mein data organize karta hai.",
        attributes: [
          { name: "border", required: false, descEn: "Legacy HTML attribute; modern tables use CSS `border-collapse: collapse;`.", descHi: "CSS mein border-collapse: collapse use karein." }
        ],
        codeSnippet: `<table>\n  <thead>\n    <tr><th>Code</th><th>Subject</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>BCS-111</td><td>Computer Basics</td></tr>\n  </tbody>\n</table>`,
        previewType: "table",
        examTipEn: "Always wrap column headers inside `<thead>` and data rows inside `<tbody>` for accessibility.",
        examTipHi: "Hamesha header rows ko `<thead>` aur data rows ko `<tbody>` mein divide karein.",
        seniorTrapEn: "Using HTML tables to design website page layouts. Tables must ONLY be used for tabular data.",
        seniorTrapHi: "Website ka layout (header/sidebar/content) banane ke liye table use karna ek outdated aur galat practice hai."
      }
    ],
    pitfalls: [
      {
        titleEn: "Illegal Direct Children in Lists",
        titleHi: "List Ke Andar Illegal Direct Tags Daalna",
        badCode: `<!-- ❌ WRONG: <p> cannot be a direct child of <ul> -->\n<ul>\n  <p>Introduction</p>\n  <div>Chapter 1</div>\n</ul>`,
        goodCode: `<!-- ✅ CORRECT: Only <li> may be a direct child -->\n<ul>\n  <li><p>Introduction</p></li>\n  <li>Chapter 1</li>\n</ul>`,
        explanationEn: "The W3C specification strictly requires that only `<li>` elements can be immediate direct children of `<ul>` or `<ol>`.",
        explanationHi: "W3C standards ke hisaab se `<ul>` ya `<ol>` ke andar direct child sirf `<li>` hona chahiye."
      }
    ],
    vivaPrep: [
      {
        questionEn: "What is the difference between `colspan` and `rowspan` in an HTML table?",
        questionHi: "HTML table mein `colspan` aur `rowspan` mein kya antar hai?",
        answerEn: "`colspan` specifies how many horizontal columns a table cell should span across. `rowspan` specifies how many vertical rows a cell should span down.",
        answerHi: "`colspan` ek cell ko horizontal columns mein merge karta hai. `rowspan` ek cell ko vertical rows mein merge karta hai."
      }
    ]
  },

  // ── DAY 3: HTML HYPERLINKS & IMAGES ──
  3: {
    subtitleEn: "Connect documents globally via hyperlinks and embed media with responsive accessibility.",
    subtitleHi: "Webpages ko hyperlinks se jodein aur images ko accessible banayein.",
    realWorldContextEn: "The web is named the 'World Wide Web' because hyperlinks weave millions of independent documents into a single interconnected graph.",
    realWorldContextHi: "Hyperlinks ki wajah se hi internet ko 'Web' kaha jata hai—har page doosre page se ek click se jud jata hai.",
    pipelineTitleEn: "Hyperlink & Image Resolution Architecture",
    pipelineTitleHi: "Browser Links Aur Images Ko Kaise Resolve Karta Hai",
    pipelineSteps: [
      {
        step: "1",
        titleEn: "Anchor Tag `<a href='...'>`",
        titleHi: "Anchor Tag Se Navigation",
        descEn: "Browser listens for clicks and switches the active viewport URL to the destination target.",
        descHi: "User ke click karte hi browser naye address pe navigate karta hai."
      },
      {
        step: "2",
        titleEn: "Security Protection: `rel='noopener'`",
        titleHi: "Security Protection: Tab Nabbing Se Bachna",
        descEn: "When using `target='_blank'`, ALWAYS pair with `rel='noopener noreferrer'` to prevent the new tab from hijacking the parent window via `window.opener`.",
        descHi: "Jab bhi target='_blank' use karein, tab nabbing hacking se bachne ke liye rel='noopener noreferrer' zaroori hai."
      },
      {
        step: "3",
        titleEn: "Image Embedding: `<img src='...' alt='...'>`",
        titleHi: "Accessible Image Embedding",
        descEn: "Images are fetched asynchronously; the `alt` text provides screen reader description and fallback text if the file is missing or fails to load.",
        descHi: "Image download hone tak alt text fallback dikhta hai aur blind users ke screen readers ko image describe karta hai."
      }
    ],
    tags: [
      {
        tag: "<a href='...'>",
        name: "Anchor / Hyperlink",
        category: "Inline Element",
        englishPurpose: "Creates clickable links to other webpages, external sites, files, or on-page bookmark anchors.",
        hinglishPurpose: "Clickable link banata hai jisse user doosre page, website ya page ke kisi section pe jump kar sake.",
        attributes: [
          { name: "href", required: true, descEn: "The destination URL or anchor hash (e.g. '#section2').", descHi: "Destination web address ya page anchor." },
          { name: "target", required: false, descEn: "Use '_blank' to open destination in a new browser tab.", descHi: "Naye tab mein kholne ke liye '_blank' lagayein." },
          { name: "rel", required: false, descEn: "Set to 'noopener noreferrer' for secure target='_blank' links.", descHi: "Security ke liye 'noopener noreferrer' lagayein." }
        ],
        codeSnippet: `<a href="https://github.com" target="_blank" rel="noopener noreferrer">\n  Visit My GitHub Portfolio\n</a>`,
        previewType: "link",
        examTipEn: "Remember to explain bookmark links: `<a href='#contact'>Jump to Contact</a>` links to `<section id='contact'>`.",
        examTipHi: "Same page pe scroll karne ke liye href='#contact' aur destination tag pe id='contact' lagaya jata hai.",
        seniorTrapEn: "Using `target='_blank'` without `rel='noopener noreferrer'`. Exposes users to security vulnerabilities.",
        seniorTrapHi: "target='_blank' ke sath rel='noopener' na lagana security vulnerability create karta hai."
      },
      {
        tag: "<img src='...'>",
        name: "Image Element",
        category: "Void Element (Self-Closing)",
        englishPurpose: "Embeds an image file into the webpage document stream.",
        hinglishPurpose: "Webpage par photo ya illustration display karta hai.",
        attributes: [
          { name: "src", required: true, descEn: "File path or remote URL of the image file.", descHi: "Image file ka path ya link." },
          { name: "alt", required: true, descEn: "MANDATORY: Descriptive alternative text for screen readers and broken image fallback.", descHi: "MANDATORY: Photo ka description jo image fail hone pe ya screen readers ke liye dikhta hai." },
          { name: "loading", required: false, descEn: "Set to 'lazy' for fast performance on mobile devices.", descHi: "Mobile speed badhane ke liye loading='lazy' lagayein." }
        ],
        codeSnippet: `<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" alt="Student coding on laptop in VS Code" loading="lazy">`,
        previewType: "generic",
        examTipEn: "The `alt` attribute is NOT a tooltip! Tooltips are created using the `title` attribute.",
        examTipHi: "Alt text mouse hover tooltip nahi hota; tooltip ke liye title='' attribute use hota hai.",
        seniorTrapEn: "Leaving `alt` blank or writing `alt='image'`. W3C considers this an accessibility error.",
        seniorTrapHi: "Alt attribute khali chhod dena ya sirf 'image' likhna testing tools mein error trigger karta hai."
      }
    ],
    pitfalls: [
      {
        titleEn: "Case Sensitivity Errors on Linux / GitHub Servers",
        titleHi: "Case-Sensitive Image Filename Error",
        badCode: `<!-- ❌ WRONG: File on disk is 'Profile.JPG' -->\n<img src="profile.jpg" alt="Profile">`,
        goodCode: `<!-- ✅ CORRECT: Exact case matching -->\n<img src="Profile.JPG" alt="Profile">`,
        explanationEn: "Windows is case-insensitive, but GitHub and Linux web servers are strictly case-sensitive. `photo.png` will fail to load if the file on disk is `Photo.PNG`.",
        explanationHi: "Windows pe photo.png aur Photo.PNG chal jata hai, par GitHub aur Linux servers case-sensitive hote hain. Exact match na hone par 404 error aata hai."
      }
    ],
    vivaPrep: [
      {
        questionEn: "Why is the `alt` attribute strictly mandatory on an `<img>` tag?",
        questionHi: "`<img>` tag par `alt` attribute kyu mandatory hota hai?",
        answerEn: "`alt` provides essential accessibility for screen readers used by visually impaired students, and displays fallback description text if slow network bandwidth prevents the image from downloading.",
        answerHi: "`alt` text visually impaired students ke screen readers ke liye zaroori hai, aur internet slow hone par photo ki jagah description text dikhata hai."
      }
    ]
  }
};

export function PracticalLessonExplainer({ lesson }: PracticalLessonExplainerProps) {
  const [lang, setLang] = useState<LangMode>("hinglish");
  const [selectedTagIndex, setSelectedTagIndex] = useState<number>(0);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [revealedViva, setRevealedViva] = useState<Record<number, boolean>>({});

  const deepDive = TOPIC_DEEP_DIVES[lesson.day];
  const activeTag = deepDive?.tags[selectedTagIndex] ?? deepDive?.tags[0];

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {}
  };

  const toggleViva = (index: number) => {
    setRevealedViva((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-6">
      {/* ── 1. MASTER HEADER & DUAL LANGUAGE CONTROLLER ── */}
      <div className="rounded-2xl border-2 border-blue-600/30 dark:border-blue-500/30 bg-gradient-to-r from-blue-50/70 via-white to-blue-50/50 dark:from-neutral-900/90 dark:via-black dark:to-neutral-900/90 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1 shadow-sm">
                <Sparkles size={11} />
                Day {lesson.day} Masterclass
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                {lesson.category}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-black dark:text-white tracking-tight">
              {lesson.title} — Comprehensive Practical Guide
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {lang === "hinglish" 
                ? (deepDive?.subtitleHi || "Har concept ko visual mental models, code anatomy aur practical industry tips ke sath samjhein.") 
                : (deepDive?.subtitleEn || "Deep architectural breakdown, visual mental models, tag anatomy, and senior developer tips.")}
            </p>
          </div>

          {/* Language Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-950 p-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setLang("english")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                lang === "english"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <span>🇬🇧 English</span>
            </button>
            <button
              type="button"
              onClick={() => setLang("hinglish")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                lang === "hinglish"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <span>🌐 Hinglish (Easy)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. CORE MENTAL MODEL & REAL-WORLD INDUSTRY CONTEXT ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Overview */}
        <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <BookOpen size={15} />
            <span>{lang === "hinglish" ? "Real-World Purpose Aur Zaroorat" : "Industry Context & Practical Purpose"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {lang === "hinglish"
              ? (deepDive?.realWorldContextHi || lesson.concept.overview)
              : (deepDive?.realWorldContextEn || lesson.concept.overview)}
          </p>

          <div className="pt-2 border-t border-slate-100 dark:border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {lesson.concept.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Mental Model Analogy */}
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Lightbulb size={16} />
              <span>{lang === "hinglish" ? "Dimaag Mein Bithane Ka Model" : "Core Mental Model"}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
              "{lesson.concept.analogy || "Think of HTML elements as pre-fabricated building blocks on a construction site."}"
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-black/60 border border-blue-100 dark:border-blue-900/40 text-[11px] text-slate-600 dark:text-slate-400">
            💡 <strong className="text-black dark:text-white">Pro Tip:</strong> {lang === "hinglish" ? "Code ko ratta mat maaro; imagine karo ki browser har tag ko visually kaise draw karta hai." : "Never memorize code syntax blindly. Focus on how the browser interprets and parses the DOM."}
          </div>
        </div>
      </div>

      {/* ── 3. VISUAL PIPELINE ARCHITECTURE (HOW IT WORKS BEHIND THE SCENES) ── */}
      {deepDive?.pipelineSteps && (
        <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
            <Layers size={15} />
            <span>{lang === "hinglish" ? deepDive.pipelineTitleHi : deepDive.pipelineTitleEn}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {deepDive.pipelineSteps.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-2 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                      {p.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Phase {p.step}</span>
                  </div>
                  <h4 className="text-xs font-black text-black dark:text-white leading-tight">
                    {lang === "hinglish" ? p.titleHi : p.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {lang === "hinglish" ? p.descHi : p.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. INTERACTIVE TAG & ATTRIBUTE ANATOMY INSPECTOR ── */}
      {deepDive?.tags && deepDive.tags.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Code2 size={16} />
                <span>{lang === "hinglish" ? "Interactive Tag & Attribute Inspector" : "Interactive Tag & Attribute Anatomy"}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === "hinglish" ? "Kisi bhi tag par tap karein aur uske mandatory attributes, code aur live preview dekhein:" : "Select any building block below to inspect its attributes, syntax, and live browser behavior:"}
              </p>
            </div>

            {/* Tag Selection Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {deepDive.tags.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTagIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    selectedTagIndex === idx
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-neutral-800 hover:border-blue-400"
                  }`}
                >
                  {t.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tag Deep Card */}
          {activeTag && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
              {/* Left Column: Purpose & Attributes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-mono font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60">
                    {activeTag.tag}
                  </h4>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {activeTag.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 ml-auto">
                    {activeTag.category}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lang === "hinglish" ? activeTag.hinglishPurpose : activeTag.englishPurpose}
                </p>

                {/* Attributes Table */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    {lang === "hinglish" ? "Core Attributes Checklist" : "Essential Attributes"}
                  </span>
                  <div className="space-y-1.5">
                    {activeTag.attributes.map((attr, aIdx) => (
                      <div
                        key={aIdx}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-start gap-2 text-xs"
                      >
                        <code className="text-blue-600 dark:text-blue-400 font-mono font-bold shrink-0">
                          {attr.name}
                        </code>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                          attr.required
                            ? "bg-rose-500 text-white"
                            : "bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400"
                        }`}>
                          {attr.required ? "REQUIRED" : "OPTIONAL"}
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                          {lang === "hinglish" ? attr.descHi : attr.descEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam Tip Callout */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs flex items-start gap-2">
                  <Zap size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900 dark:text-amber-300 block text-[11px] uppercase tracking-wide">
                      {lang === "hinglish" ? "IGNOU BCA Exam & Viva Secret" : "BCA Exam & Viva Key Fact"}
                    </strong>
                    <span className="text-[11px] text-amber-950 dark:text-amber-200/90 leading-tight">
                      {lang === "hinglish" ? activeTag.examTipHi : activeTag.examTipEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Code Snippet & Live Browser Rendering */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    {lang === "hinglish" ? "Standard Syntax Snippet" : "Reference Implementation"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeTag.codeSnippet)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {copiedSnippet ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedSnippet ? "Copied!" : "Copy Snippet"}</span>
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-neutral-800 bg-[#090d16] text-white p-3.5 font-mono text-xs leading-relaxed">
                  <pre className="overflow-x-hidden whitespace-pre-wrap break-words break-all sm:break-words text-slate-200">
                    <code className="whitespace-pre-wrap break-words break-all sm:break-words">{activeTag.codeSnippet}</code>
                  </pre>
                </div>

                {/* Senior Dev Trap */}
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs flex items-start gap-2">
                  <AlertCircle size={14} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-900 dark:text-rose-300 block text-[11px] uppercase tracking-wide">
                      {lang === "hinglish" ? "Common Junior Dev Pitfall" : "Common Trap to Avoid"}
                    </strong>
                    <span className="text-[11px] text-rose-950 dark:text-rose-200/90 leading-tight">
                      {lang === "hinglish" ? activeTag.seniorTrapHi : activeTag.seniorTrapEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 5. SPOT THE MISTAKE (SENIOR DEV PITFALLS & CORRECT PATTERNS) ── */}
      {deepDive?.pitfalls && deepDive.pitfalls.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <ShieldCheck size={16} />
            <span>{lang === "hinglish" ? "Top 3 Coding Mistakes (Aur Unhe Fix Kaise Karein)" : "Top 3 Mistakes Junior Devs Make"}</span>
          </div>

          <div className="space-y-4">
            {deepDive.pitfalls.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 space-y-3"
              >
                <h4 className="text-xs sm:text-sm font-black text-black dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{lang === "hinglish" ? p.titleHi : p.titleEn}</span>
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lang === "hinglish" ? p.explanationHi : p.explanationEn}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  {/* Bad Code */}
                  <div className="rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-3 overflow-x-hidden space-y-1">
                    <span className="text-[10px] font-black font-sans uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      ❌ Don't Do This
                    </span>
                    <pre className="text-rose-950 dark:text-rose-200 whitespace-pre-wrap break-words break-all sm:break-words leading-relaxed text-[11px] overflow-x-hidden">
                      <code className="whitespace-pre-wrap break-words break-all sm:break-words">{p.badCode}</code>
                    </pre>
                  </div>

                  {/* Good Code */}
                  <div className="rounded-xl border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3 overflow-x-hidden space-y-1">
                    <span className="text-[10px] font-black font-sans uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      ✅ Production Standard
                    </span>
                    <pre className="text-emerald-950 dark:text-emerald-200 whitespace-pre-wrap break-words break-all sm:break-words leading-relaxed text-[11px] overflow-x-hidden">
                      <code className="whitespace-pre-wrap break-words break-all sm:break-words">{p.goodCode}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. IGNOU BCA VIVA QUICK-FIRE CHECKPOINTS ── */}
      {deepDive?.vivaPrep && deepDive.vivaPrep.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <HelpCircle size={16} />
            <span>{lang === "hinglish" ? "University Practical Exam & Viva Q&A" : "IGNOU Practical Exam & Viva Questions"}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === "hinglish" ? "Lab exam mein external examiners aamtaur par ye sawaal puchte hain. Click karke model answer dekhein:" : "External examiners frequently ask these conceptual questions during university lab evaluations:"}
          </p>

          <div className="space-y-2.5 pt-1">
            {deepDive.vivaPrep.map((q, qIdx) => {
              const isRevealed = Boolean(revealedViva[qIdx]);
              return (
                <div
                  key={qIdx}
                  className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/60 p-3.5 space-y-2"
                >
                  <div
                    onClick={() => toggleViva(qIdx)}
                    className="flex items-start justify-between gap-2 cursor-pointer select-none"
                  >
                    <span className="font-bold text-xs sm:text-sm text-black dark:text-white flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-mono font-bold shrink-0">Q{qIdx + 1}.</span>
                      <span>{lang === "hinglish" ? q.questionHi : q.questionEn}</span>
                    </span>
                    <button
                      type="button"
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 shrink-0"
                    >
                      {isRevealed ? "Hide Answer" : "Reveal Answer"}
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-5 animate-in fade-in duration-150">
                      <strong className="text-blue-600 dark:text-blue-400 block mb-0.5 font-bold">
                        {lang === "hinglish" ? "Model Examiner Answer:" : "Official Model Answer:"}
                      </strong>
                      <span>{lang === "hinglish" ? q.answerHi : q.answerEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticalLessonExplainer;
