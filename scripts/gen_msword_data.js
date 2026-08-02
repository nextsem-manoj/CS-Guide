/* eslint-disable */
/**
 * Generator script: creates src/data/mswordLessonsData.ts
 * Run with: node scripts/gen_msword_data.js
 */
const fs = require('fs');
const path = require('path');

const out = path.resolve(__dirname, '../src/data/mswordLessonsData.ts');

const header = `/** MS Word 365 Career Skills — Lesson Data
 * Standard lesson template: 6 content variants per lesson (english/hinglish/hindi x kid/pro)
 * Multilingual MCQ format matching Standard Lesson Template
 * Target: Job seekers & working professionals (18-40 yrs)
 */

export interface ExerciseBlock {
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export interface MultilingualExercise {
  english: ExerciseBlock;
  hinglish: ExerciseBlock;
  hindi: ExerciseBlock;
}

export interface MsWordLesson {
  id: number;
  slug: string;
  title: string;
  unit: string;
  bookRef: string;
  exercise: ExerciseBlock | MultilingualExercise;
  english: { kid: string; pro: string; };
  hinglish: { kid: string; pro: string; };
  hindi: { kid: string; pro: string; };
}

`;

// ── Lesson 1 ─────────────────────────────────────────────────────────────────
const lesson1 = {
  id: 1,
  slug: "what-is-ms-word-career-basics",
  title: "What is MS Word & Why Every Job Needs It",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 1)",
  exercise: {
    english: {
      question: "Which of the following is the BEST use of Microsoft Word in an office job?",
      options: [
        "Browsing the internet",
        "Writing and formatting professional documents like resumes and reports",
        "Playing games",
        "Managing spreadsheets with formulas"
      ],
      correctAnswer: "Writing and formatting professional documents like resumes and reports",
      hint: "Word is a word processor — its power is in creating text-based documents like letters, reports, and resumes!"
    },
    hinglish: {
      question: "Office job mein Microsoft Word ka sabse accha use kya hai?",
      options: [
        "Internet browse karna",
        "Resume aur reports jaise professional documents likhna aur format karna",
        "Games khelna",
        "Formulas wale spreadsheets banana"
      ],
      correctAnswer: "Resume aur reports jaise professional documents likhna aur format karna",
      hint: "Word ek word processor hai — iska power text-based documents mein hai jaise letters, reports aur resumes!"
    },
    hindi: {
      question: "ऑफिस की नौकरी में Microsoft Word का सबसे अच्छा उपयोग क्या है?",
      options: [
        "इंटरनेट ब्राउज़ करना",
        "Resume और reports जैसे professional documents लिखना",
        "Games खेलना",
        "Formulas वाली spreadsheets बनाना"
      ],
      correctAnswer: "Resume और reports जैसे professional documents लिखना",
      hint: "Word एक word processor है — इसकी शक्ति text-based documents जैसे letters, reports और resumes में है!"
    }
  },
  english: {
    kid: `### 💼 Why Every Job Needs MS Word

**Real Story:** Priya got her first job offer in a Delhi firm. On Day 1, her manager said: *"Type this meeting agenda and print it."* Priya panicked — she did not know Word!

Do not be like Priya. Let us learn MS Word so you are ready from **Day 1 of your new job**.

### 🤔 What is MS Word?

Microsoft Word is like a **super-powered digital notepad**. It lets you:

* **Write** anything — letters, reports, resumes, contracts
* **Format** your text to look beautiful and professional
* **Print** or **share** documents as PDF
* **Collaborate** with teammates in real time (Word 365)

### 🏢 Where is Word Used?

* **HR Department** — Offer letters, policies, job descriptions
* **Accounts Team** — Reports, invoices, memos
* **Students** — Assignments, projects, cover letters
* **Freelancers** — Client proposals and contracts

🤖 **AI Tip:** In Word 365, you can ask **Microsoft Copilot** to *draft a letter for you* — just describe what you want and AI writes the first version!`,
    pro: `### 📄 Microsoft Word 365 — Professional Overview

Microsoft Word is part of the **Microsoft 365 suite**, a subscription-based cloud ecosystem. The latest version (2024/365) includes:

* **Cloud Integration** — Documents auto-save to OneDrive; accessible from any device
* **Real-Time Co-Authoring** — Multiple users edit simultaneously with presence indicators
* **Microsoft Copilot (AI)** — Generative AI assistant integrated directly into the editor
* **Cross-Platform** — Available on Windows, macOS, iOS, Android, and Web

### 💼 Enterprise Relevance

| Document Type | MS Word Feature Used |
|---|---|
| Legal Contracts | Track Changes + Password Protect |
| Annual Reports | Styles + TOC + Multi-section layout |
| Job Offer Letters | Mail Merge + Templates |
| Meeting Agendas | Numbered Lists + Headers |
| Research Papers | Citations + Footnotes + Bibliography |

🤖 **Copilot Tip:** Use **Copilot in Word** to summarize long contracts, rewrite in formal tone, or auto-generate first-draft emails from bullet points.`
  },
  hinglish: {
    kid: `### 💼 MS Word Kyun Zaroori Hai Har Job Mein

**Real Story:** Rahul ko pehle din hi office mein kaha gaya: *"Yeh meeting agenda type karke print karo."* Rahul ghabra gaya kyunki wo MS Word nahi jaanta tha!

Aap Rahul jaisi galti mat karna. MS Word seekho aur **Day 1 se ready** raho.

### 🤔 MS Word Kya Hai?

MS Word ek **digital writing tool** hai jo aapko:

* Kuch bhi **likhne** deta hai — letters, reports, resume, agreements
* Text ko **sundar aur professional** banana deta hai
* **PDF** mein save ya email karne deta hai
* Teammates ke saath **real time mein kaam** karne deta hai

### 🏢 Kahan Use Hota Hai Word?

* **HR** — Offer letters, appointment letters
* **Accounts** — Reports, invoices
* **Students** — Assignments, cover letters

🤖 **AI Tip:** Word 365 mein **Microsoft Copilot** se bol sakte ho: *"Mera resignation letter draft karo"* — AI khud likh dega!`,
    pro: `### 📄 Microsoft Word 365 — Professional Overview

Word 365 Microsoft ke cloud-first approach ka hissa hai jisme yeh features hain:

* **OneDrive Auto-Save** — Document hamesha cloud pe save hota hai
* **Co-Authoring** — Alag-alag jagah se log ek hi file edit kar sakte hain
* **Microsoft Copilot AI** — Built-in AI assistant jo documents draft, summarize aur rewrite kar sakta hai

### 💼 Industry Use Cases

| Document | MS Word Feature |
|---|---|
| Legal Contracts | Track Changes + Password Protection |
| Annual Reports | Styles + TOC + Sections |
| Offer Letters | Mail Merge + Templates |

🤖 **Copilot Tip:** Word ke Copilot se long documents summarize kara sakte ho!`
  },
  hindi: {
    kid: `### 💼 MS Word क्यों ज़रूरी है हर नौकरी में

**Real Story:** सुनीता को पहले दिन ही office में कहा गया: *"यह meeting agenda type करो और print करो।"* सुनीता घबरा गई!

आप यह गलती मत करना। MS Word सीखो और **Day 1 से तैयार** रहो।

### 🤔 MS Word क्या है?

MS Word एक **digital writing tool** है जो आपको:

* कुछ भी **लिखने** देता है — letters, reports, resume
* Text को **सुंदर और professional** बनाने देता है
* **PDF** में save या share करने देता है

### 🏢 कहाँ उपयोग होता है?

* **HR विभाग** — Offer letters, नीतियां
* **Accounts टीम** — Reports, invoices
* **Students** — Assignments, cover letters

🤖 **AI Tip:** Word 365 में **Microsoft Copilot** से कहो: *"मेरा resume draft करो"* — AI खुद लिख देगा!`,
    pro: `### 📄 Microsoft Word 365 — Professional Overview

Word 365 Microsoft के cloud-first approach का हिस्सा है:

* **OneDrive Auto-Save** — Document हमेशा cloud पर save होता है
* **Co-Authoring** — अलग-अलग जगह से लोग एक ही file edit कर सकते हैं
* **Microsoft Copilot AI** — Built-in AI assistant

### 💼 Industry Use Cases

| Document | MS Word Feature |
|---|---|
| Legal Contracts | Track Changes + Password Protection |
| Annual Reports | Styles + TOC |
| Offer Letters | Mail Merge + Templates |

🤖 **Copilot Tip:** Word के Copilot से long documents summarize करा सकते हो!`
  }
};

// ── Lesson 2 ─────────────────────────────────────────────────────────────────
const lesson2 = {
  id: 2,
  slug: "ms-word-interface-ribbon-tabs-explained",
  title: "The Word Screen: Ribbon, Tabs & Quick Access Toolbar",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 2)",
  exercise: {
    english: {
      question: "Where do you find the Home tab in Microsoft Word?",
      options: ["At the bottom of the screen", "Inside the File menu", "On the Ribbon at the top of the window", "In the taskbar"],
      correctAnswer: "On the Ribbon at the top of the window",
      hint: "The Ribbon is the wide toolbar at the top of Word that organizes all commands into tabs like Home, Insert, Layout!"
    },
    hinglish: {
      question: "Microsoft Word mein Home tab kahan milti hai?",
      options: ["Screen ke neeche", "File menu ke andar", "Window ke top pe Ribbon mein", "Taskbar mein"],
      correctAnswer: "Window ke top pe Ribbon mein",
      hint: "Ribbon Word ke upar wala wide toolbar hai jo Home, Insert, Layout jaise tabs mein commands organize karta hai!"
    },
    hindi: {
      question: "Microsoft Word में Home tab कहाँ मिलती है?",
      options: ["Screen के नीचे", "File menu के अंदर", "Window के ऊपर Ribbon में", "Taskbar में"],
      correctAnswer: "Window के ऊपर Ribbon में",
      hint: "Ribbon Word के ऊपर का wide toolbar है जो Home, Insert, Layout जैसे tabs में commands organize करता है!"
    }
  },
  english: {
    kid: `### 🖥️ Understanding the Word Screen

**Real Job Story:** On Rahul's first week, his manager said: *"Bold that heading and change the font."* Rahul stared at the screen — he did not know where anything was!

Let us give you a map of the MS Word screen.

### 📍 The 5 Key Zones of Word

* **1️⃣ The Ribbon** (Top area) — All tools organized into tabs: **Home**, **Insert**, **Layout**, **Review**...
* **2️⃣ Quick Access Toolbar** (Very top left) — Save, Undo, Redo shortcuts
* **3️⃣ The Document Area** (White space) — Where you type
* **4️⃣ Status Bar** (Bottom left) — Page number, word count, language
* **5️⃣ View Controls** (Bottom right) — Zoom in/out

### 🎯 Most Used Tabs on Ribbon

| Tab | What it Contains |
|---|---|
| **Home** | Font, Bold, Italic, Paragraph, Styles |
| **Insert** | Tables, Images, Charts, Headers |
| **Layout** | Margins, Page size, Columns |
| **Review** | Spell check, Track changes, Comments |
| **View** | Zoom, Reading mode |

🤖 **AI Tip:** Press **Alt** key to see keyboard shortcuts for every Ribbon item highlighted in yellow!`,
    pro: `### 🖥️ Ribbon Architecture & Customization

The Ribbon is **context-sensitive** — it shows additional tabs when you select specific objects:

* Select an image → **Picture Format** tab appears
* Click a table → **Table Design** + **Layout** tabs appear
* Select a chart → **Chart Design** tab appears

### ⚙️ Customizing the Ribbon

1. Right-click the Ribbon → **Customize the Ribbon**
2. Add/remove tabs and groups
3. Create your own custom tab

### ⌨️ Keyboard Access (KeyTips)

Press **Alt** → Letter shortcuts appear on each Ribbon item. Full keyboard navigation without a mouse.

🤖 **Power User Tip:** Pin the **Quick Access Toolbar below the Ribbon** for faster access.`
  },
  hinglish: {
    kid: `### 🖥️ Word Screen Ka Map Samjho

**Real Job Story:** Anjali ko pehle hafte manager ne kaha: *"Yeh heading bold karo aur font change karo."* Anjali screen dekh ke reh gayi!

### 📍 Word Screen Ke 5 Main Hisse

* **1️⃣ Ribbon** (Top area) — Main control panel: Home, Insert, Layout, Review...
* **2️⃣ Quick Access Toolbar** (Upar left) — Save, Undo, Redo shortcuts
* **3️⃣ Document Area** (White space) — Yahan type karte hain
* **4️⃣ Status Bar** (Neeche left) — Page number, word count
* **5️⃣ View Controls** (Neeche right) — Zoom in/out

### 🎯 Sabse Zyada Use Hone Wale Tabs

| Tab | Kya Hai Andar |
|---|---|
| **Home** | Font, Bold, Italic |
| **Insert** | Tables, Images |
| **Layout** | Margins, Page size |
| **Review** | Spell check, Track changes |

🤖 **AI Tip:** Word mein **Alt** dabao — har Ribbon item pe yellow shortcuts!`,
    pro: `### 🖥️ Ribbon Architecture & Customization

Ribbon context-sensitive hai:

* Image select karo → **Picture Format** tab appear hota hai
* Table click karo → **Table Design** + **Layout** tabs aate hain

### ⚙️ Ribbon Customize Kaise Karein

1. Ribbon pe right-click → **Customize the Ribbon**
2. Apni custom tab banao

🤖 **Power User Tip:** Quick Access Toolbar ko **Ribbon ke neeche** pin karo!`
  },
  hindi: {
    kid: `### 🖥️ Word Screen का Map समझो

**Real Job Story:** Sunita को manager ने कहा: *"यह heading bold करो।"* Sunita screen देख कर रह गई!

### 📍 Word Screen के 5 मुख्य हिस्से

* **1️⃣ Ribbon** (ऊपर) — Main control panel
* **2️⃣ Quick Access Toolbar** (बाएं ऊपर) — Save, Undo, Redo
* **3️⃣ Document Area** (सफेद जगह) — यहाँ type करते हैं
* **4️⃣ Status Bar** (नीचे बाएं) — Page number, word count
* **5️⃣ View Controls** (नीचे दाएं) — Zoom

### 🎯 सबसे ज़्यादा Use होने वाले Tabs

| Tab | अंदर क्या है |
|---|---|
| **Home** | Font, Bold, Italic |
| **Insert** | Tables, Images |
| **Layout** | Margins, Page size |

🤖 **AI Tip:** **Alt** दबाओ — yellow shortcuts दिखेंगे!`,
    pro: `### 🖥️ Ribbon Architecture & Customization

Ribbon context-sensitive है:

* Image select करो → **Picture Format** tab दिखता है
* Table click करो → **Table Design** + **Layout** tabs

### ⚙️ Ribbon Customize करें

1. Ribbon पर right-click → **Customize the Ribbon**

🤖 **Power User Tip:** Quick Access Toolbar को **Ribbon के नीचे** pin करो!`
  }
};

// ── Lesson 3 ─────────────────────────────────────────────────────────────────
const lesson3 = {
  id: 3,
  slug: "create-save-open-word-document-job-skills",
  title: "Create, Save & Open Documents the Right Way",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 3)",
  exercise: {
    english: {
      question: "What keyboard shortcut saves a document in MS Word?",
      options: ["Ctrl + P", "Ctrl + S", "Ctrl + N", "Ctrl + O"],
      correctAnswer: "Ctrl + S",
      hint: "S stands for Save! Press Ctrl + S immediately — never lose your work!"
    },
    hinglish: {
      question: "MS Word mein document save karne ka keyboard shortcut kya hai?",
      options: ["Ctrl + P", "Ctrl + S", "Ctrl + N", "Ctrl + O"],
      correctAnswer: "Ctrl + S",
      hint: "S matlab Save! Koi bhi naya document banao toh turant Ctrl + S dabao!"
    },
    hindi: {
      question: "MS Word में document save करने का keyboard shortcut क्या है?",
      options: ["Ctrl + P", "Ctrl + S", "Ctrl + N", "Ctrl + O"],
      correctAnswer: "Ctrl + S",
      hint: "S का मतलब Save! कोई भी नया document बनाओ तो तुरंत Ctrl + S दबाओ!"
    }
  },
  english: {
    kid: `### 💾 Save Like a Pro — Never Lose Your Work!

**Real Story:** Deepak spent 2 hours typing a client report. The power went out. All his work was gone — he never saved it!

### ✅ 3 Ways to Create a New Document

* **Ctrl + N** — Opens a brand new blank document
* **File → New → Blank Document** — Same thing, using the menu
* **File → New → Templates** — Start from a pre-designed template

### 💾 Saving Your Document

**First time saving:**
1. Press **Ctrl + S**
2. Choose a folder (Desktop, Documents, OneDrive)
3. Give a meaningful name: \`Rahul_Project_Report_July2025.docx\`

**After first save:**
* Press **Ctrl + S** every 5 minutes — make it a habit!

### 📂 Opening Existing Documents

* **Ctrl + O** — Open file dialog
* **File → Recent** — Recently edited files

🤖 **AI Tip:** Word 365 saves automatically to **OneDrive** if you are signed in!`,
    pro: `### 💾 File Management & Cloud Save Architecture

**File Formats in Word:**

| Format | Extension | Use Case |
|---|---|---|
| Word Document | .docx | Default — editable |
| PDF | .pdf | Sharing read-only |
| Word 97-2003 | .doc | Legacy compatibility |
| Rich Text | .rtf | Cross-app compatibility |

### ☁️ AutoSave & OneDrive Integration

AutoSave toggle (top-left) syncs to OneDrive every few seconds:
* No data loss on crash
* Version history preserved
* Accessible from any device

### ⚙️ Save As vs. Save

* **Ctrl + S** — Saves to current location
* **F12** — Opens Save As dialog

🤖 **Copilot Tip:** Check **File → Info → Version History** for complete save history!`
  },
  hinglish: {
    kid: `### 💾 Document Sahi Tarike Se Kaise Save Karein

**Real Story:** Deepak ne 2 ghante mein ek client report type ki. Light gayi. Poora kaam gaya!

### ✅ Naya Document Banane Ke 3 Tarike

* **Ctrl + N** — Naya blank document
* **File → New → Templates** — Pre-designed template se shuru karo

### 💾 Save Karne Ka Tarika

1. **Ctrl + S** dabao
2. Folder chuno (Desktop, Documents, OneDrive)
3. Meaningful naam do: \`Rahul_Report_July2025.docx\`

🤖 **AI Tip:** Word 365 **OneDrive pe auto-save** karta hai!`,
    pro: `### 💾 File Format Architecture

| Format | Extension | Use Case |
|---|---|---|
| Word | .docx | Default editable |
| PDF | .pdf | Read-only sharing |
| Legacy | .doc | Old compatibility |

### ☁️ AutoSave & OneDrive

* Crash pe data loss nahi
* Version history preserved
* **F12** — Save As dialog

🤖 **Copilot Tip:** **File → Info → Version History** check karo!`
  },
  hindi: {
    kid: `### 💾 Document सही तरीके से कैसे Save करें

**Real Story:** दीपक ने 2 घंटे में report type की। बिजली चली गई। सारा काम गया!

### ✅ नया Document बनाने के 3 तरीके

* **Ctrl + N** — नया blank document
* **File → New → Templates** — Pre-designed template से

### 💾 Save करने का तरीका

1. **Ctrl + S** दबाओ
2. Folder चुनो
3. सार्थक नाम दो

🤖 **AI Tip:** Word 365 **OneDrive पर auto-save** करता है!`,
    pro: `### 💾 File Format Architecture

| Format | Extension | Use Case |
|---|---|---|
| Word | .docx | Default editable |
| PDF | .pdf | Read-only sharing |

### ☁️ AutoSave & OneDrive

* **F12** — Save As dialog
* **File → Info → Version History** — पिछले सारे versions

🤖 **Copilot Tip:** Version history से restore करो!`
  }
};

// ── Lesson 4 ─────────────────────────────────────────────────────────────────
const lesson4 = {
  id: 4,
  slug: "typing-selecting-editing-text-ms-word",
  title: "Typing, Selecting & Basic Editing",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 4)",
  exercise: {
    english: {
      question: "What is the quickest way to select ALL text in a Word document?",
      options: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Shift + Click"],
      correctAnswer: "Ctrl + A",
      hint: "A stands for All — Ctrl + A selects everything instantly!"
    },
    hinglish: {
      question: "Word document ka poora text ek saath select karne ka fastest tarika kya hai?",
      options: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Shift + Click"],
      correctAnswer: "Ctrl + A",
      hint: "A matlab All — Ctrl + A ek second mein document ka poora content select kar leta hai!"
    },
    hindi: {
      question: "Word document का पूरा text एक साथ select करने का fastest तरीका क्या है?",
      options: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Shift + Click"],
      correctAnswer: "Ctrl + A",
      hint: "A मतलब All — Ctrl + A एक second में document का पूरा content select कर लेता है!"
    }
  },
  english: {
    kid: `### ✏️ Typing & Editing Like an Office Pro

**Real Story:** Neha's boss gave her a 5-page report: *"Change all dates from 2024 to 2025."* She didn't know how to select quickly — it took 2 hours!

### 🖱️ Selecting Text

| Action | How to Do It |
|---|---|
| Select one word | Double-click |
| Select one paragraph | Triple-click |
| Select ALL | **Ctrl + A** |
| Extend selection | **Shift** + arrow keys |

### ✂️ Basic Editing Shortcuts

| Shortcut | Action |
|---|---|
| **Ctrl + C** | Copy |
| **Ctrl + X** | Cut |
| **Ctrl + V** | Paste |
| **Ctrl + Z** | Undo |

🤖 **AI Tip:** After editing, use **Review → Editor** to check grammar and spelling!`,
    pro: `### ✏️ Efficient Text Navigation & Editing

**Power Navigation:**

| Shortcut | Action |
|---|---|
| **Ctrl + →** | Jump one word right |
| **Ctrl + Home** | Go to document start |
| **Ctrl + End** | Go to document end |
| **Ctrl + Shift + →** | Select next word |

### 📋 Paste Special (Ctrl + Alt + V)

* **Keep Source Formatting** — Original styling
* **Keep Text Only** — Strips all formatting

### 🔍 Advanced Selection

* **Alt + Click drag** — Column (block) selection
* **Ctrl + Click** — Non-contiguous text selection

🤖 **Copilot Tip:** Select text → right-click → **Rewrite with Copilot**!`
  },
  hinglish: {
    kid: `### ✏️ Type Aur Edit Karo Pro Ki Tarah

**Real Story:** Neha ke boss ne kaha: *"2024 ki saari dates 2025 kar do."* Neha ko select karna nahi aata tha — 2 ghante lag gaye!

### 🖱️ Text Select Karne Ke Tarike

| Action | Tarika |
|---|---|
| Ek word select | Double-click |
| Poora paragraph | Triple-click |
| Poora document | **Ctrl + A** |

### ✂️ Basic Shortcuts

| Shortcut | Kaam |
|---|---|
| **Ctrl + C** | Copy |
| **Ctrl + V** | Paste |
| **Ctrl + Z** | Undo |

🤖 **AI Tip:** **Review → Editor** grammar check karta hai!`,
    pro: `### ✏️ Efficient Navigation & Power Editing

| Shortcut | Action |
|---|---|
| **Ctrl + →** | Next word jump |
| **Ctrl + Home** | Document start |
| **Ctrl + Shift + →** | Next word select |

### 📋 Paste Special (Ctrl + Alt + V)

* **Keep Text Only** — Plain text, no formatting

🤖 **Copilot Tip:** Text select karo → **Rewrite with Copilot**!`
  },
  hindi: {
    kid: `### ✏️ Type और Edit करो Pro की तरह

| Action | तरीका |
|---|---|
| एक word select | Double-click |
| पूरा document | **Ctrl + A** |

| Shortcut | काम |
|---|---|
| **Ctrl + C** | Copy |
| **Ctrl + V** | Paste |
| **Ctrl + Z** | Undo |

🤖 **AI Tip:** **Review → Editor** grammar check करता है!`,
    pro: `### ✏️ Power Editing

| Shortcut | Action |
|---|---|
| **Ctrl + →** | Next word jump |
| **Ctrl + Home** | Document start |

🤖 **Copilot Tip:** Text select करो → **Rewrite with Copilot**!`
  }
};

// ── Lesson 5 ─────────────────────────────────────────────────────────────────
const lesson5 = {
  id: 5,
  slug: "undo-redo-autosave-ms-word-365",
  title: "Undo, Redo & AutoSave — Your Safety Net",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 5)",
  exercise: {
    english: {
      question: "You accidentally deleted a whole paragraph. What do you press to get it back?",
      options: ["Ctrl + S", "Ctrl + Z", "Ctrl + Y", "Ctrl + B"],
      correctAnswer: "Ctrl + Z",
      hint: "Z is for Undo! Press Ctrl + Z multiple times to go back multiple steps!"
    },
    hinglish: {
      question: "Galti se ek pura paragraph delete ho gaya. Wapas laane ke liye kya dabate hain?",
      options: ["Ctrl + S", "Ctrl + Z", "Ctrl + Y", "Ctrl + B"],
      correctAnswer: "Ctrl + Z",
      hint: "Z matlab Undo! Ctrl + Z kai baar dabao — kai steps peeche ja sakte ho!"
    },
    hindi: {
      question: "गलती से एक पूरा paragraph delete हो गया। वापस लाने के लिए क्या दबाते हैं?",
      options: ["Ctrl + S", "Ctrl + Z", "Ctrl + Y", "Ctrl + B"],
      correctAnswer: "Ctrl + Z",
      hint: "Z मतलब Undo! Ctrl + Z कई बार दबाओ — कई steps पीछे जा सकते हो!"
    }
  },
  english: {
    kid: `### 🔄 Undo & Redo — Your Time Machine!

**Real Story:** Vikram accidentally deleted 3 pages of his boss's report. Then he remembered **Ctrl + Z** and got everything back in 3 seconds!

### ⏪ Undo (Ctrl + Z)

* Undoes your last action
* Press it **multiple times** to go back multiple steps
* You can undo 100+ steps!

### ⏩ Redo (Ctrl + Y)

* Re-applies what you just undid

### 💾 AutoSave in Word 365

With OneDrive:
* Word auto-saves **every few seconds**
* Restore old versions via **File → Info → Version History**

🤖 **AI Tip:** Check **File → Info → Recover Unsaved Documents** even without saving!`,
    pro: `### 🔄 Undo Stack Architecture

Word maintains an internal **undo stack** in RAM:

* **Ctrl + Z** — Pops the top action off the stack
* **Ctrl + Y** — Re-applies the undone action
* Undo history is **cleared when you close** the document

### ☁️ Version History (OneDrive)

* Files are **versioned continuously**
* **File → Info → Version History** lists all states with timestamps
* Restore or open any historical version

🤖 **Enterprise Tip:** For regulated environments, disable AutoSave for manual version control.`
  },
  hinglish: {
    kid: `### 🔄 Undo & Redo — Aapki Time Machine!

**Real Story:** Vikram ke 3 pages galti se delete ho gaye. Ctrl + Z se 3 second mein sab wapas aa gaya!

### ⏪ Undo (Ctrl + Z)

* Aakhri action undo karo
* Kai baar dabao — kai steps peeche jao

### ⏩ Redo (Ctrl + Y)

* Jo undo kiya woh wapas karo

### 💾 AutoSave (Word 365)

* **File → Info → Version History** se purani version restore karo

🤖 **AI Tip:** **File → Info → Recover Unsaved Documents** check karo!`,
    pro: `### 🔄 Undo Stack Architecture

Word ek internal **undo stack** RAM mein maintain karta hai.

### ☁️ Version History (OneDrive)

* **File → Info → Version History** mein timestamps ke saath versions

🤖 **Enterprise Tip:** Regulated environments mein AutoSave disable karo!`
  },
  hindi: {
    kid: `### 🔄 Undo & Redo — आपकी Time Machine!

**Real Story:** Vikram के 3 pages गलती से delete हो गए। Ctrl + Z से 3 second में सब वापस आ गया!

### ⏪ Undo (Ctrl + Z) और ⏩ Redo (Ctrl + Y)

* **File → Info → Version History** से पुरानी version restore करो

🤖 **AI Tip:** **File → Info → Recover Unsaved Documents**!`,
    pro: `### 🔄 Undo Stack & Version History

* **Ctrl + Z** — Undo
* **File → Info → Version History** — timestamps के साथ versions

🤖 **Enterprise Tip:** Regulated environments में AutoSave disable करो!`
  }
};

// ── Lesson 6 ─────────────────────────────────────────────────────────────────
const lesson6 = {
  id: 6,
  slug: "find-replace-search-ms-word-productivity",
  title: "Find & Replace — Edit 100 Words in 5 Seconds",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 6)",
  exercise: {
    english: {
      question: "What keyboard shortcut opens the Find & Replace dialog in Word?",
      options: ["Ctrl + F", "Ctrl + H", "Ctrl + R", "Ctrl + G"],
      correctAnswer: "Ctrl + H",
      hint: "Ctrl + F opens Find only. Ctrl + H opens Find AND Replace!"
    },
    hinglish: {
      question: "Word mein Find & Replace dialog kholne ka shortcut kya hai?",
      options: ["Ctrl + F", "Ctrl + H", "Ctrl + R", "Ctrl + G"],
      correctAnswer: "Ctrl + H",
      hint: "Ctrl + F sirf Find karta hai. Ctrl + H poora Find AND Replace!"
    },
    hindi: {
      question: "Word में Find & Replace dialog खोलने का shortcut क्या है?",
      options: ["Ctrl + F", "Ctrl + H", "Ctrl + R", "Ctrl + G"],
      correctAnswer: "Ctrl + H",
      hint: "Ctrl + F सिर्फ Find करता है। Ctrl + H पूरा Find AND Replace!"
    }
  },
  english: {
    kid: `### 🔍 Find & Replace — The Office Superpower!

**Real Story:** Pooja's company changed its name from "ABC Enterprises" to "XYZ Solutions". 87 times in 30 pages. Her colleague said 3 hours. Pooja fixed it in 15 seconds!

### 🔎 Find (Ctrl + F)

* Opens the **Navigation Pane** on the left
* All matches highlighted

### 🔄 Find & Replace (Ctrl + H)

1. Press **Ctrl + H**
2. **Find what:** → old text
3. **Replace with:** → new text
4. **Replace All** — done!

### 💡 Pro Tips

* **Match Case** — Exact case matching
* **Find Whole Words Only** — No partial matches

🤖 **AI Tip:** Review → Editor suggests replacements for overused words!`,
    pro: `### 🔍 Advanced Find & Replace with Wildcards

Enable "Use wildcards" for pattern matching:

| Wildcard | Meaning |
|---|---|
| \`?\` | Any single character |
| \`*\` | Any string |
| \`[0-9]\` | Any digit |

### 🔧 Format-Based Replace

1. Ctrl + H → **More >>** → **Format**
2. Replace Red text with Blue text across all pages

🤖 **Power Tip:** Combine with **Macros** for complex document transformations!`
  },
  hinglish: {
    kid: `### 🔍 Find & Replace — Office Ka Superpower!

**Real Story:** Pooja ne 87 baar purana company naam 15 second mein replace kar diya!

### 🔄 Find & Replace (Ctrl + H)

1. **Ctrl + H** dabao
2. Purana text → **Find what**
3. Naya text → **Replace with**
4. **Replace All** click karo!

🤖 **AI Tip:** Review → Editor better suggestions deta hai!`,
    pro: `### 🔍 Wildcard Find & Replace

| Wildcard | Matlab |
|---|---|
| \`?\` | Koi bhi character |
| \`*\` | Characters ka string |

🤖 **Power Tip:** Macros ke saath combine karo!`
  },
  hindi: {
    kid: `### 🔍 Find & Replace — Office का Superpower!

### 🔄 Find & Replace (Ctrl + H)

1. **Ctrl + H** दबाओ
2. पुराना text → **Find what**
3. नया text → **Replace with**
4. **Replace All** click!

🤖 **AI Tip:** Review → Editor बेहतर suggestions देता है!`,
    pro: `### 🔍 Wildcard Find & Replace

| Wildcard | मतलब |
|---|---|
| \`?\` | कोई भी character |
| \`*\` | Characters का string |

🤖 **Power Tip:** Macros के साथ combine करो!`
  }
};

// ── Lesson 7 ─────────────────────────────────────────────────────────────────
const lesson7 = {
  id: 7,
  slug: "ms-word-document-views-print-read-focus",
  title: "Word Views: Print, Read, Focus & Immersive Reader",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 7)",
  exercise: {
    english: {
      question: "Which Word view shows exactly how the document will look when printed?",
      options: ["Read Mode", "Print Layout", "Web Layout", "Draft View"],
      correctAnswer: "Print Layout",
      hint: "Print Layout is the default view — it shows exact margins, page breaks and the printed page!"
    },
    hinglish: {
      question: "Kaun sa Word view print ke baad document kaisa dikhega woh exactly dikhata hai?",
      options: ["Read Mode", "Print Layout", "Web Layout", "Draft View"],
      correctAnswer: "Print Layout",
      hint: "Print Layout Word ka default view hai — exact margins aur printed page dikhata hai!"
    },
    hindi: {
      question: "कौन सा Word view print होने के बाद document कैसा दिखेगा वह exactly दिखाता है?",
      options: ["Read Mode", "Print Layout", "Web Layout", "Draft View"],
      correctAnswer: "Print Layout",
      hint: "Print Layout Word का default view है — exact margins और printed page दिखाता है!"
    }
  },
  english: {
    kid: `### 👓 Word Views — See Your Document Differently!

**Real Story:** Suresh was always shocked when the printed version looked different. Once he learned **Print Layout view**, no more surprises!

### 📋 The 5 Main Views

| View | Best For |
|---|---|
| **Print Layout** | Everyday work — Default |
| **Read Mode** | Reviewing long documents |
| **Web Layout** | HTML-style docs |
| **Outline View** | Planning long reports |
| **Draft View** | Fast typing focus |

### 🎯 Focus Mode (Word 365)

* **View → Focus** — Removes all Ribbon clutter
* Distraction-free writing!

🤖 **AI Tip:** **View → Immersive Reader** — dyslexia-friendly with text spacing control!`,
    pro: `### 👓 View Modes & Shortcuts

* **Ctrl + Alt + P** — Print Layout
* **Ctrl + Alt + R** — Read Mode
* **Ctrl + Alt + N** — Draft View

**Outline View:** Drag headings to reorganize entire sections.

### 📖 Immersive Reader

* Line focus (1, 3, or 5 lines)
* Syllable highlighting for dyslexia
* Read Aloud with synchronized highlight

🤖 **Enterprise Tip:** Use **Focus Mode + Read Aloud** for proofreading!`
  },
  hinglish: {
    kid: `### 👓 Word Views — Document Ko Alag Nazar Se Dekho!

| View | Kab Use Karein |
|---|---|
| **Print Layout** | Rozana ka kaam — Default |
| **Read Mode** | Lamba document review |
| **Outline View** | Long reports plan |

### 🎯 Focus Mode (Word 365)

* **View → Focus** — Ribbon hata deta hai, distraction-free!

🤖 **AI Tip:** **View → Immersive Reader** — dyslexia-friendly!`,
    pro: `### 👓 Shortcuts

* **Ctrl + Alt + P** — Print Layout
* **Ctrl + Alt + R** — Read Mode

🤖 **Enterprise Tip:** **Focus Mode + Read Aloud** proofreading ke liye!`
  },
  hindi: {
    kid: `### 👓 Word Views

| View | कब Use करें |
|---|---|
| **Print Layout** | रोज़ाना का काम |
| **Read Mode** | लंबा document review |

🤖 **AI Tip:** **View → Immersive Reader** — dyslexia-friendly!`,
    pro: `### 👓 Shortcuts

* **Ctrl + Alt + P** — Print Layout
* **Ctrl + Alt + N** — Draft View

🤖 **Enterprise Tip:** **Focus Mode + Read Aloud**!`
  }
};

// ── Lesson 8 ─────────────────────────────────────────────────────────────────
const lesson8 = {
  id: 8,
  slug: "ms-word-keyboard-shortcuts-office-productivity",
  title: "Keyboard Shortcuts That Save Hours Every Day",
  unit: "Module 1: Word Basics & Orientation",
  bookRef: "MS Word 365 — Office Career Skills (Lesson 8)",
  exercise: {
    english: {
      question: "Which shortcut opens a new blank document instantly?",
      options: ["Ctrl + O", "Ctrl + N", "Ctrl + S", "Ctrl + W"],
      correctAnswer: "Ctrl + N",
      hint: "N is for New! Ctrl + N opens a fresh blank document without touching the mouse!"
    },
    hinglish: {
      question: "Microsoft Word mein ek naya blank document instantly kholne ka shortcut kya hai?",
      options: ["Ctrl + O", "Ctrl + N", "Ctrl + S", "Ctrl + W"],
      correctAnswer: "Ctrl + N",
      hint: "N matlab New! Ctrl + N mouse chuye bina naya document kholta hai!"
    },
    hindi: {
      question: "Microsoft Word में नया blank document instantly खोलने का shortcut क्या है?",
      options: ["Ctrl + O", "Ctrl + N", "Ctrl + S", "Ctrl + W"],
      correctAnswer: "Ctrl + N",
      hint: "N मतलब New! Ctrl + N mouse छुए बिना नया document खोलता है!"
    }
  },
  english: {
    kid: `### ⌨️ Shortcuts That Make You the Fastest in the Office!

**Real Story:** Ankit finished reports in 1 hour; Mohan took 3 hours. The difference? Ankit knew keyboard shortcuts!

### 📋 Essential Shortcuts — The Must-Know 20

**File:**

| Shortcut | Action |
|---|---|
| **Ctrl + N** | New document |
| **Ctrl + O** | Open file |
| **Ctrl + S** | Save |
| **Ctrl + P** | Print |
| **Ctrl + W** | Close |

**Editing:**

| Shortcut | Action |
|---|---|
| **Ctrl + C** | Copy |
| **Ctrl + X** | Cut |
| **Ctrl + V** | Paste |
| **Ctrl + Z** | Undo |
| **Ctrl + A** | Select All |
| **Ctrl + H** | Find & Replace |

**Formatting:**

| Shortcut | Action |
|---|---|
| **Ctrl + B** | Bold |
| **Ctrl + I** | Italic |
| **Ctrl + U** | Underline |
| **Ctrl + E** | Centre Align |
| **Ctrl + J** | Justify |

🤖 **AI Tip:** Press **Alt** to see KeyTips — yellow letters on every Ribbon button!`,
    pro: `### ⌨️ Advanced Power User Shortcuts

**Navigation:**

| Shortcut | Action |
|---|---|
| **Ctrl + Home** | Document start |
| **Ctrl + End** | Document end |
| **F5** | Go To dialog |

**Advanced Formatting:**

| Shortcut | Action |
|---|---|
| **Ctrl + 1** | Single spacing |
| **Ctrl + 2** | Double spacing |
| **Ctrl + Alt + 1** | Heading 1 style |
| **Shift + F3** | Toggle case |
| **Ctrl + K** | Insert hyperlink |
| **F7** | Spell check |
| **Alt + Shift + D** | Insert current date |

🤖 **Power Tip:** Customise Quick Access Toolbar — Alt+1, Alt+2 become instant shortcuts!`
  },
  hinglish: {
    kid: `### ⌨️ Office Mein Sabse Fast Rehne Wale Shortcuts!

**File:**

| Shortcut | Kaam |
|---|---|
| **Ctrl + N** | Naya document |
| **Ctrl + S** | Save |
| **Ctrl + P** | Print |

**Editing:**

| Shortcut | Kaam |
|---|---|
| **Ctrl + C** | Copy |
| **Ctrl + V** | Paste |
| **Ctrl + Z** | Undo |

**Formatting:**

| Shortcut | Kaam |
|---|---|
| **Ctrl + B** | Bold |
| **Ctrl + E** | Centre |
| **Ctrl + J** | Justify |

🤖 **AI Tip:** **Alt** dabao — Ribbon pe yellow shortcuts!`,
    pro: `### ⌨️ Advanced Shortcuts

| Shortcut | Action |
|---|---|
| **Ctrl + Home** | Document start |
| **Ctrl + Alt + 1** | Heading 1 |
| **Shift + F3** | Case toggle |
| **F7** | Spell check |

🤖 **Power Tip:** Quick Access Toolbar customize karo!`
  },
  hindi: {
    kid: `### ⌨️ Office में सबसे Fast रहने वाले Shortcuts!

**File:**

| Shortcut | काम |
|---|---|
| **Ctrl + N** | नया document |
| **Ctrl + S** | Save |

**Editing:**

| Shortcut | काम |
|---|---|
| **Ctrl + C** | Copy |
| **Ctrl + Z** | Undo |

**Formatting:**

| Shortcut | काम |
|---|---|
| **Ctrl + B** | Bold |
| **Ctrl + E** | Centre |

🤖 **AI Tip:** **Alt** दबाओ — yellow shortcuts दिखेंगे!`,
    pro: `### ⌨️ Advanced Shortcuts

| Shortcut | Action |
|---|---|
| **Ctrl + Alt + 1** | Heading 1 |
| **Shift + F3** | Case toggle |
| **F7** | Spell check |

🤖 **Power Tip:** Quick Access Toolbar customize करो!`
  }
};

const lessons = [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7, lesson8];

const exportContent = header + `export const mswordLessons: MsWordLesson[] = ${JSON.stringify(lessons, null, 2)};\n`;

fs.writeFileSync(out, exportContent, 'utf8');
console.log(`mswordLessonsData.ts written with ${lessons.length} lessons to ${out}`);
