/** MS Word 365 Career Skills — Lesson Data
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

export const mswordLessons: MsWordLesson[] = [
  {
    "id": 1,
    "slug": "what-is-ms-word-career-basics",
    "title": "What is MS Word & Why Every Job Needs It",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 1)",
    "exercise": {
      "english": {
        "question": "Which of the following is the BEST use of Microsoft Word in an office job?",
        "options": [
          "Browsing the internet",
          "Writing and formatting professional documents like resumes and reports",
          "Playing games",
          "Managing spreadsheets with formulas"
        ],
        "correctAnswer": "Writing and formatting professional documents like resumes and reports",
        "hint": "Word is a word processor — its power is in creating text-based documents like letters, reports, and resumes!"
      },
      "hinglish": {
        "question": "Office job mein Microsoft Word ka sabse accha use kya hai?",
        "options": [
          "Internet browse karna",
          "Resume aur reports jaise professional documents likhna aur format karna",
          "Games khelna",
          "Formulas wale spreadsheets banana"
        ],
        "correctAnswer": "Resume aur reports jaise professional documents likhna aur format karna",
        "hint": "Word ek word processor hai — iska power text-based documents mein hai jaise letters, reports aur resumes!"
      },
      "hindi": {
        "question": "ऑफिस की नौकरी में Microsoft Word का सबसे अच्छा उपयोग क्या है?",
        "options": [
          "इंटरनेट ब्राउज़ करना",
          "Resume और reports जैसे professional documents लिखना",
          "Games खेलना",
          "Formulas वाली spreadsheets बनाना"
        ],
        "correctAnswer": "Resume और reports जैसे professional documents लिखना",
        "hint": "Word एक word processor है — इसकी शक्ति text-based documents जैसे letters, reports और resumes में है!"
      }
    },
    "english": {
      "kid": "### 💼 Why Every Job Needs MS Word\n\n**Real Story:** Priya got her first job offer in a Delhi firm. On Day 1, her manager said: *\"Type this meeting agenda and print it.\"* Priya panicked — she did not know Word!\n\nDo not be like Priya. Let us learn MS Word so you are ready from **Day 1 of your new job**.\n\n### 🤔 What is MS Word?\n\nMicrosoft Word is like a **super-powered digital notepad**. It lets you:\n\n* **Write** anything — letters, reports, resumes, contracts\n* **Format** your text to look beautiful and professional\n* **Print** or **share** documents as PDF\n* **Collaborate** with teammates in real time (Word 365)\n\n### 🏢 Where is Word Used?\n\n* **HR Department** — Offer letters, policies, job descriptions\n* **Accounts Team** — Reports, invoices, memos\n* **Students** — Assignments, projects, cover letters\n* **Freelancers** — Client proposals and contracts\n\n🤖 **AI Tip:** In Word 365, you can ask **Microsoft Copilot** to *draft a letter for you* — just describe what you want and AI writes the first version!",
      "pro": "### 📄 Microsoft Word 365 — Professional Overview\n\nMicrosoft Word is part of the **Microsoft 365 suite**, a subscription-based cloud ecosystem. The latest version (2024/365) includes:\n\n* **Cloud Integration** — Documents auto-save to OneDrive; accessible from any device\n* **Real-Time Co-Authoring** — Multiple users edit simultaneously with presence indicators\n* **Microsoft Copilot (AI)** — Generative AI assistant integrated directly into the editor\n* **Cross-Platform** — Available on Windows, macOS, iOS, Android, and Web\n\n### 💼 Enterprise Relevance\n\n| Document Type | MS Word Feature Used |\n|---|---|\n| Legal Contracts | Track Changes + Password Protect |\n| Annual Reports | Styles + TOC + Multi-section layout |\n| Job Offer Letters | Mail Merge + Templates |\n| Meeting Agendas | Numbered Lists + Headers |\n| Research Papers | Citations + Footnotes + Bibliography |\n\n🤖 **Copilot Tip:** Use **Copilot in Word** to summarize long contracts, rewrite in formal tone, or auto-generate first-draft emails from bullet points."
    },
    "hinglish": {
      "kid": "### 💼 MS Word Kyun Zaroori Hai Har Job Mein\n\n**Real Story:** Rahul ko pehle din hi office mein kaha gaya: *\"Yeh meeting agenda type karke print karo.\"* Rahul ghabra gaya kyunki wo MS Word nahi jaanta tha!\n\nAap Rahul jaisi galti mat karna. MS Word seekho aur **Day 1 se ready** raho.\n\n### 🤔 MS Word Kya Hai?\n\nMS Word ek **digital writing tool** hai jo aapko:\n\n* Kuch bhi **likhne** deta hai — letters, reports, resume, agreements\n* Text ko **sundar aur professional** banana deta hai\n* **PDF** mein save ya email karne deta hai\n* Teammates ke saath **real time mein kaam** karne deta hai\n\n### 🏢 Kahan Use Hota Hai Word?\n\n* **HR** — Offer letters, appointment letters\n* **Accounts** — Reports, invoices\n* **Students** — Assignments, cover letters\n\n🤖 **AI Tip:** Word 365 mein **Microsoft Copilot** se bol sakte ho: *\"Mera resignation letter draft karo\"* — AI khud likh dega!",
      "pro": "### 📄 Microsoft Word 365 — Professional Overview\n\nWord 365 Microsoft ke cloud-first approach ka hissa hai jisme yeh features hain:\n\n* **OneDrive Auto-Save** — Document hamesha cloud pe save hota hai\n* **Co-Authoring** — Alag-alag jagah se log ek hi file edit kar sakte hain\n* **Microsoft Copilot AI** — Built-in AI assistant jo documents draft, summarize aur rewrite kar sakta hai\n\n### 💼 Industry Use Cases\n\n| Document | MS Word Feature |\n|---|---|\n| Legal Contracts | Track Changes + Password Protection |\n| Annual Reports | Styles + TOC + Sections |\n| Offer Letters | Mail Merge + Templates |\n\n🤖 **Copilot Tip:** Word ke Copilot se long documents summarize kara sakte ho!"
    },
    "hindi": {
      "kid": "### 💼 MS Word क्यों ज़रूरी है हर नौकरी में\n\n**Real Story:** सुनीता को पहले दिन ही office में कहा गया: *\"यह meeting agenda type करो और print करो।\"* सुनीता घबरा गई!\n\nआप यह गलती मत करना। MS Word सीखो और **Day 1 से तैयार** रहो।\n\n### 🤔 MS Word क्या है?\n\nMS Word एक **digital writing tool** है जो आपको:\n\n* कुछ भी **लिखने** देता है — letters, reports, resume\n* Text को **सुंदर और professional** बनाने देता है\n* **PDF** में save या share करने देता है\n\n### 🏢 कहाँ उपयोग होता है?\n\n* **HR विभाग** — Offer letters, नीतियां\n* **Accounts टीम** — Reports, invoices\n* **Students** — Assignments, cover letters\n\n🤖 **AI Tip:** Word 365 में **Microsoft Copilot** से कहो: *\"मेरा resume draft करो\"* — AI खुद लिख देगा!",
      "pro": "### 📄 Microsoft Word 365 — Professional Overview\n\nWord 365 Microsoft के cloud-first approach का हिस्सा है:\n\n* **OneDrive Auto-Save** — Document हमेशा cloud पर save होता है\n* **Co-Authoring** — अलग-अलग जगह से लोग एक ही file edit कर सकते हैं\n* **Microsoft Copilot AI** — Built-in AI assistant\n\n### 💼 Industry Use Cases\n\n| Document | MS Word Feature |\n|---|---|\n| Legal Contracts | Track Changes + Password Protection |\n| Annual Reports | Styles + TOC |\n| Offer Letters | Mail Merge + Templates |\n\n🤖 **Copilot Tip:** Word के Copilot से long documents summarize करा सकते हो!"
    }
  },
  {
    "id": 2,
    "slug": "ms-word-interface-ribbon-tabs-explained",
    "title": "The Word Screen: Ribbon, Tabs & Quick Access Toolbar",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 2)",
    "exercise": {
      "english": {
        "question": "Where do you find the Home tab in Microsoft Word?",
        "options": [
          "At the bottom of the screen",
          "Inside the File menu",
          "On the Ribbon at the top of the window",
          "In the taskbar"
        ],
        "correctAnswer": "On the Ribbon at the top of the window",
        "hint": "The Ribbon is the wide toolbar at the top of Word that organizes all commands into tabs like Home, Insert, Layout!"
      },
      "hinglish": {
        "question": "Microsoft Word mein Home tab kahan milti hai?",
        "options": [
          "Screen ke neeche",
          "File menu ke andar",
          "Window ke top pe Ribbon mein",
          "Taskbar mein"
        ],
        "correctAnswer": "Window ke top pe Ribbon mein",
        "hint": "Ribbon Word ke upar wala wide toolbar hai jo Home, Insert, Layout jaise tabs mein commands organize karta hai!"
      },
      "hindi": {
        "question": "Microsoft Word में Home tab कहाँ मिलती है?",
        "options": [
          "Screen के नीचे",
          "File menu के अंदर",
          "Window के ऊपर Ribbon में",
          "Taskbar में"
        ],
        "correctAnswer": "Window के ऊपर Ribbon में",
        "hint": "Ribbon Word के ऊपर का wide toolbar है जो Home, Insert, Layout जैसे tabs में commands organize करता है!"
      }
    },
    "english": {
      "kid": "### 🖥️ Understanding the Word Screen\n\n**Real Job Story:** On Rahul's first week, his manager said: *\"Bold that heading and change the font.\"* Rahul stared at the screen — he did not know where anything was!\n\nLet us give you a map of the MS Word screen.\n\n### 📍 The 5 Key Zones of Word\n\n* **1️⃣ The Ribbon** (Top area) — All tools organized into tabs: **Home**, **Insert**, **Layout**, **Review**...\n* **2️⃣ Quick Access Toolbar** (Very top left) — Save, Undo, Redo shortcuts\n* **3️⃣ The Document Area** (White space) — Where you type\n* **4️⃣ Status Bar** (Bottom left) — Page number, word count, language\n* **5️⃣ View Controls** (Bottom right) — Zoom in/out\n\n### 🎯 Most Used Tabs on Ribbon\n\n| Tab | What it Contains |\n|---|---|\n| **Home** | Font, Bold, Italic, Paragraph, Styles |\n| **Insert** | Tables, Images, Charts, Headers |\n| **Layout** | Margins, Page size, Columns |\n| **Review** | Spell check, Track changes, Comments |\n| **View** | Zoom, Reading mode |\n\n🤖 **AI Tip:** Press **Alt** key to see keyboard shortcuts for every Ribbon item highlighted in yellow!",
      "pro": "### 🖥️ Ribbon Architecture & Customization\n\nThe Ribbon is **context-sensitive** — it shows additional tabs when you select specific objects:\n\n* Select an image → **Picture Format** tab appears\n* Click a table → **Table Design** + **Layout** tabs appear\n* Select a chart → **Chart Design** tab appears\n\n### ⚙️ Customizing the Ribbon\n\n1. Right-click the Ribbon → **Customize the Ribbon**\n2. Add/remove tabs and groups\n3. Create your own custom tab\n\n### ⌨️ Keyboard Access (KeyTips)\n\nPress **Alt** → Letter shortcuts appear on each Ribbon item. Full keyboard navigation without a mouse.\n\n🤖 **Power User Tip:** Pin the **Quick Access Toolbar below the Ribbon** for faster access."
    },
    "hinglish": {
      "kid": "### 🖥️ Word Screen Ka Map Samjho\n\n**Real Job Story:** Anjali ko pehle hafte manager ne kaha: *\"Yeh heading bold karo aur font change karo.\"* Anjali screen dekh ke reh gayi!\n\n### 📍 Word Screen Ke 5 Main Hisse\n\n* **1️⃣ Ribbon** (Top area) — Main control panel: Home, Insert, Layout, Review...\n* **2️⃣ Quick Access Toolbar** (Upar left) — Save, Undo, Redo shortcuts\n* **3️⃣ Document Area** (White space) — Yahan type karte hain\n* **4️⃣ Status Bar** (Neeche left) — Page number, word count\n* **5️⃣ View Controls** (Neeche right) — Zoom in/out\n\n### 🎯 Sabse Zyada Use Hone Wale Tabs\n\n| Tab | Kya Hai Andar |\n|---|---|\n| **Home** | Font, Bold, Italic |\n| **Insert** | Tables, Images |\n| **Layout** | Margins, Page size |\n| **Review** | Spell check, Track changes |\n\n🤖 **AI Tip:** Word mein **Alt** dabao — har Ribbon item pe yellow shortcuts!",
      "pro": "### 🖥️ Ribbon Architecture & Customization\n\nRibbon context-sensitive hai:\n\n* Image select karo → **Picture Format** tab appear hota hai\n* Table click karo → **Table Design** + **Layout** tabs aate hain\n\n### ⚙️ Ribbon Customize Kaise Karein\n\n1. Ribbon pe right-click → **Customize the Ribbon**\n2. Apni custom tab banao\n\n🤖 **Power User Tip:** Quick Access Toolbar ko **Ribbon ke neeche** pin karo!"
    },
    "hindi": {
      "kid": "### 🖥️ Word Screen का Map समझो\n\n**Real Job Story:** Sunita को manager ने कहा: *\"यह heading bold करो।\"* Sunita screen देख कर रह गई!\n\n### 📍 Word Screen के 5 मुख्य हिस्से\n\n* **1️⃣ Ribbon** (ऊपर) — Main control panel\n* **2️⃣ Quick Access Toolbar** (बाएं ऊपर) — Save, Undo, Redo\n* **3️⃣ Document Area** (सफेद जगह) — यहाँ type करते हैं\n* **4️⃣ Status Bar** (नीचे बाएं) — Page number, word count\n* **5️⃣ View Controls** (नीचे दाएं) — Zoom\n\n### 🎯 सबसे ज़्यादा Use होने वाले Tabs\n\n| Tab | अंदर क्या है |\n|---|---|\n| **Home** | Font, Bold, Italic |\n| **Insert** | Tables, Images |\n| **Layout** | Margins, Page size |\n\n🤖 **AI Tip:** **Alt** दबाओ — yellow shortcuts दिखेंगे!",
      "pro": "### 🖥️ Ribbon Architecture & Customization\n\nRibbon context-sensitive है:\n\n* Image select करो → **Picture Format** tab दिखता है\n* Table click करो → **Table Design** + **Layout** tabs\n\n### ⚙️ Ribbon Customize करें\n\n1. Ribbon पर right-click → **Customize the Ribbon**\n\n🤖 **Power User Tip:** Quick Access Toolbar को **Ribbon के नीचे** pin करो!"
    }
  },
  {
    "id": 3,
    "slug": "create-save-open-word-document-job-skills",
    "title": "Create, Save & Open Documents the Right Way",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 3)",
    "exercise": {
      "english": {
        "question": "What keyboard shortcut saves a document in MS Word?",
        "options": [
          "Ctrl + P",
          "Ctrl + S",
          "Ctrl + N",
          "Ctrl + O"
        ],
        "correctAnswer": "Ctrl + S",
        "hint": "S stands for Save! Press Ctrl + S immediately — never lose your work!"
      },
      "hinglish": {
        "question": "MS Word mein document save karne ka keyboard shortcut kya hai?",
        "options": [
          "Ctrl + P",
          "Ctrl + S",
          "Ctrl + N",
          "Ctrl + O"
        ],
        "correctAnswer": "Ctrl + S",
        "hint": "S matlab Save! Koi bhi naya document banao toh turant Ctrl + S dabao!"
      },
      "hindi": {
        "question": "MS Word में document save करने का keyboard shortcut क्या है?",
        "options": [
          "Ctrl + P",
          "Ctrl + S",
          "Ctrl + N",
          "Ctrl + O"
        ],
        "correctAnswer": "Ctrl + S",
        "hint": "S का मतलब Save! कोई भी नया document बनाओ तो तुरंत Ctrl + S दबाओ!"
      }
    },
    "english": {
      "kid": "### 💾 Save Like a Pro — Never Lose Your Work!\n\n**Real Story:** Deepak spent 2 hours typing a client report. The power went out. All his work was gone — he never saved it!\n\n### ✅ 3 Ways to Create a New Document\n\n* **Ctrl + N** — Opens a brand new blank document\n* **File → New → Blank Document** — Same thing, using the menu\n* **File → New → Templates** — Start from a pre-designed template\n\n### 💾 Saving Your Document\n\n**First time saving:**\n1. Press **Ctrl + S**\n2. Choose a folder (Desktop, Documents, OneDrive)\n3. Give a meaningful name: `Rahul_Project_Report_July2025.docx`\n\n**After first save:**\n* Press **Ctrl + S** every 5 minutes — make it a habit!\n\n### 📂 Opening Existing Documents\n\n* **Ctrl + O** — Open file dialog\n* **File → Recent** — Recently edited files\n\n🤖 **AI Tip:** Word 365 saves automatically to **OneDrive** if you are signed in!",
      "pro": "### 💾 File Management & Cloud Save Architecture\n\n**File Formats in Word:**\n\n| Format | Extension | Use Case |\n|---|---|---|\n| Word Document | .docx | Default — editable |\n| PDF | .pdf | Sharing read-only |\n| Word 97-2003 | .doc | Legacy compatibility |\n| Rich Text | .rtf | Cross-app compatibility |\n\n### ☁️ AutoSave & OneDrive Integration\n\nAutoSave toggle (top-left) syncs to OneDrive every few seconds:\n* No data loss on crash\n* Version history preserved\n* Accessible from any device\n\n### ⚙️ Save As vs. Save\n\n* **Ctrl + S** — Saves to current location\n* **F12** — Opens Save As dialog\n\n🤖 **Copilot Tip:** Check **File → Info → Version History** for complete save history!"
    },
    "hinglish": {
      "kid": "### 💾 Document Sahi Tarike Se Kaise Save Karein\n\n**Real Story:** Deepak ne 2 ghante mein ek client report type ki. Light gayi. Poora kaam gaya!\n\n### ✅ Naya Document Banane Ke 3 Tarike\n\n* **Ctrl + N** — Naya blank document\n* **File → New → Templates** — Pre-designed template se shuru karo\n\n### 💾 Save Karne Ka Tarika\n\n1. **Ctrl + S** dabao\n2. Folder chuno (Desktop, Documents, OneDrive)\n3. Meaningful naam do: `Rahul_Report_July2025.docx`\n\n🤖 **AI Tip:** Word 365 **OneDrive pe auto-save** karta hai!",
      "pro": "### 💾 File Format Architecture\n\n| Format | Extension | Use Case |\n|---|---|---|\n| Word | .docx | Default editable |\n| PDF | .pdf | Read-only sharing |\n| Legacy | .doc | Old compatibility |\n\n### ☁️ AutoSave & OneDrive\n\n* Crash pe data loss nahi\n* Version history preserved\n* **F12** — Save As dialog\n\n🤖 **Copilot Tip:** **File → Info → Version History** check karo!"
    },
    "hindi": {
      "kid": "### 💾 Document सही तरीके से कैसे Save करें\n\n**Real Story:** दीपक ने 2 घंटे में report type की। बिजली चली गई। सारा काम गया!\n\n### ✅ नया Document बनाने के 3 तरीके\n\n* **Ctrl + N** — नया blank document\n* **File → New → Templates** — Pre-designed template से\n\n### 💾 Save करने का तरीका\n\n1. **Ctrl + S** दबाओ\n2. Folder चुनो\n3. सार्थक नाम दो\n\n🤖 **AI Tip:** Word 365 **OneDrive पर auto-save** करता है!",
      "pro": "### 💾 File Format Architecture\n\n| Format | Extension | Use Case |\n|---|---|---|\n| Word | .docx | Default editable |\n| PDF | .pdf | Read-only sharing |\n\n### ☁️ AutoSave & OneDrive\n\n* **F12** — Save As dialog\n* **File → Info → Version History** — पिछले सारे versions\n\n🤖 **Copilot Tip:** Version history से restore करो!"
    }
  },
  {
    "id": 4,
    "slug": "typing-selecting-editing-text-ms-word",
    "title": "Typing, Selecting & Basic Editing",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 4)",
    "exercise": {
      "english": {
        "question": "What is the quickest way to select ALL text in a Word document?",
        "options": [
          "Ctrl + A",
          "Ctrl + S",
          "Ctrl + F",
          "Shift + Click"
        ],
        "correctAnswer": "Ctrl + A",
        "hint": "A stands for All — Ctrl + A selects everything instantly!"
      },
      "hinglish": {
        "question": "Word document ka poora text ek saath select karne ka fastest tarika kya hai?",
        "options": [
          "Ctrl + A",
          "Ctrl + S",
          "Ctrl + F",
          "Shift + Click"
        ],
        "correctAnswer": "Ctrl + A",
        "hint": "A matlab All — Ctrl + A ek second mein document ka poora content select kar leta hai!"
      },
      "hindi": {
        "question": "Word document का पूरा text एक साथ select करने का fastest तरीका क्या है?",
        "options": [
          "Ctrl + A",
          "Ctrl + S",
          "Ctrl + F",
          "Shift + Click"
        ],
        "correctAnswer": "Ctrl + A",
        "hint": "A मतलब All — Ctrl + A एक second में document का पूरा content select कर लेता है!"
      }
    },
    "english": {
      "kid": "### ✏️ Typing & Editing Like an Office Pro\n\n**Real Story:** Neha's boss gave her a 5-page report: *\"Change all dates from 2024 to 2025.\"* She didn't know how to select quickly — it took 2 hours!\n\n### 🖱️ Selecting Text\n\n| Action | How to Do It |\n|---|---|\n| Select one word | Double-click |\n| Select one paragraph | Triple-click |\n| Select ALL | **Ctrl + A** |\n| Extend selection | **Shift** + arrow keys |\n\n### ✂️ Basic Editing Shortcuts\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + C** | Copy |\n| **Ctrl + X** | Cut |\n| **Ctrl + V** | Paste |\n| **Ctrl + Z** | Undo |\n\n🤖 **AI Tip:** After editing, use **Review → Editor** to check grammar and spelling!",
      "pro": "### ✏️ Efficient Text Navigation & Editing\n\n**Power Navigation:**\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + →** | Jump one word right |\n| **Ctrl + Home** | Go to document start |\n| **Ctrl + End** | Go to document end |\n| **Ctrl + Shift + →** | Select next word |\n\n### 📋 Paste Special (Ctrl + Alt + V)\n\n* **Keep Source Formatting** — Original styling\n* **Keep Text Only** — Strips all formatting\n\n### 🔍 Advanced Selection\n\n* **Alt + Click drag** — Column (block) selection\n* **Ctrl + Click** — Non-contiguous text selection\n\n🤖 **Copilot Tip:** Select text → right-click → **Rewrite with Copilot**!"
    },
    "hinglish": {
      "kid": "### ✏️ Type Aur Edit Karo Pro Ki Tarah\n\n**Real Story:** Neha ke boss ne kaha: *\"2024 ki saari dates 2025 kar do.\"* Neha ko select karna nahi aata tha — 2 ghante lag gaye!\n\n### 🖱️ Text Select Karne Ke Tarike\n\n| Action | Tarika |\n|---|---|\n| Ek word select | Double-click |\n| Poora paragraph | Triple-click |\n| Poora document | **Ctrl + A** |\n\n### ✂️ Basic Shortcuts\n\n| Shortcut | Kaam |\n|---|---|\n| **Ctrl + C** | Copy |\n| **Ctrl + V** | Paste |\n| **Ctrl + Z** | Undo |\n\n🤖 **AI Tip:** **Review → Editor** grammar check karta hai!",
      "pro": "### ✏️ Efficient Navigation & Power Editing\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + →** | Next word jump |\n| **Ctrl + Home** | Document start |\n| **Ctrl + Shift + →** | Next word select |\n\n### 📋 Paste Special (Ctrl + Alt + V)\n\n* **Keep Text Only** — Plain text, no formatting\n\n🤖 **Copilot Tip:** Text select karo → **Rewrite with Copilot**!"
    },
    "hindi": {
      "kid": "### ✏️ Type और Edit करो Pro की तरह\n\n| Action | तरीका |\n|---|---|\n| एक word select | Double-click |\n| पूरा document | **Ctrl + A** |\n\n| Shortcut | काम |\n|---|---|\n| **Ctrl + C** | Copy |\n| **Ctrl + V** | Paste |\n| **Ctrl + Z** | Undo |\n\n🤖 **AI Tip:** **Review → Editor** grammar check करता है!",
      "pro": "### ✏️ Power Editing\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + →** | Next word jump |\n| **Ctrl + Home** | Document start |\n\n🤖 **Copilot Tip:** Text select करो → **Rewrite with Copilot**!"
    }
  },
  {
    "id": 5,
    "slug": "undo-redo-autosave-ms-word-365",
    "title": "Undo, Redo & AutoSave — Your Safety Net",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 5)",
    "exercise": {
      "english": {
        "question": "You accidentally deleted a whole paragraph. What do you press to get it back?",
        "options": [
          "Ctrl + S",
          "Ctrl + Z",
          "Ctrl + Y",
          "Ctrl + B"
        ],
        "correctAnswer": "Ctrl + Z",
        "hint": "Z is for Undo! Press Ctrl + Z multiple times to go back multiple steps!"
      },
      "hinglish": {
        "question": "Galti se ek pura paragraph delete ho gaya. Wapas laane ke liye kya dabate hain?",
        "options": [
          "Ctrl + S",
          "Ctrl + Z",
          "Ctrl + Y",
          "Ctrl + B"
        ],
        "correctAnswer": "Ctrl + Z",
        "hint": "Z matlab Undo! Ctrl + Z kai baar dabao — kai steps peeche ja sakte ho!"
      },
      "hindi": {
        "question": "गलती से एक पूरा paragraph delete हो गया। वापस लाने के लिए क्या दबाते हैं?",
        "options": [
          "Ctrl + S",
          "Ctrl + Z",
          "Ctrl + Y",
          "Ctrl + B"
        ],
        "correctAnswer": "Ctrl + Z",
        "hint": "Z मतलब Undo! Ctrl + Z कई बार दबाओ — कई steps पीछे जा सकते हो!"
      }
    },
    "english": {
      "kid": "### 🔄 Undo & Redo — Your Time Machine!\n\n**Real Story:** Vikram accidentally deleted 3 pages of his boss's report. Then he remembered **Ctrl + Z** and got everything back in 3 seconds!\n\n### ⏪ Undo (Ctrl + Z)\n\n* Undoes your last action\n* Press it **multiple times** to go back multiple steps\n* You can undo 100+ steps!\n\n### ⏩ Redo (Ctrl + Y)\n\n* Re-applies what you just undid\n\n### 💾 AutoSave in Word 365\n\nWith OneDrive:\n* Word auto-saves **every few seconds**\n* Restore old versions via **File → Info → Version History**\n\n🤖 **AI Tip:** Check **File → Info → Recover Unsaved Documents** even without saving!",
      "pro": "### 🔄 Undo Stack Architecture\n\nWord maintains an internal **undo stack** in RAM:\n\n* **Ctrl + Z** — Pops the top action off the stack\n* **Ctrl + Y** — Re-applies the undone action\n* Undo history is **cleared when you close** the document\n\n### ☁️ Version History (OneDrive)\n\n* Files are **versioned continuously**\n* **File → Info → Version History** lists all states with timestamps\n* Restore or open any historical version\n\n🤖 **Enterprise Tip:** For regulated environments, disable AutoSave for manual version control."
    },
    "hinglish": {
      "kid": "### 🔄 Undo & Redo — Aapki Time Machine!\n\n**Real Story:** Vikram ke 3 pages galti se delete ho gaye. Ctrl + Z se 3 second mein sab wapas aa gaya!\n\n### ⏪ Undo (Ctrl + Z)\n\n* Aakhri action undo karo\n* Kai baar dabao — kai steps peeche jao\n\n### ⏩ Redo (Ctrl + Y)\n\n* Jo undo kiya woh wapas karo\n\n### 💾 AutoSave (Word 365)\n\n* **File → Info → Version History** se purani version restore karo\n\n🤖 **AI Tip:** **File → Info → Recover Unsaved Documents** check karo!",
      "pro": "### 🔄 Undo Stack Architecture\n\nWord ek internal **undo stack** RAM mein maintain karta hai.\n\n### ☁️ Version History (OneDrive)\n\n* **File → Info → Version History** mein timestamps ke saath versions\n\n🤖 **Enterprise Tip:** Regulated environments mein AutoSave disable karo!"
    },
    "hindi": {
      "kid": "### 🔄 Undo & Redo — आपकी Time Machine!\n\n**Real Story:** Vikram के 3 pages गलती से delete हो गए। Ctrl + Z से 3 second में सब वापस आ गया!\n\n### ⏪ Undo (Ctrl + Z) और ⏩ Redo (Ctrl + Y)\n\n* **File → Info → Version History** से पुरानी version restore करो\n\n🤖 **AI Tip:** **File → Info → Recover Unsaved Documents**!",
      "pro": "### 🔄 Undo Stack & Version History\n\n* **Ctrl + Z** — Undo\n* **File → Info → Version History** — timestamps के साथ versions\n\n🤖 **Enterprise Tip:** Regulated environments में AutoSave disable करो!"
    }
  },
  {
    "id": 6,
    "slug": "find-replace-search-ms-word-productivity",
    "title": "Find & Replace — Edit 100 Words in 5 Seconds",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 6)",
    "exercise": {
      "english": {
        "question": "What keyboard shortcut opens the Find & Replace dialog in Word?",
        "options": [
          "Ctrl + F",
          "Ctrl + H",
          "Ctrl + R",
          "Ctrl + G"
        ],
        "correctAnswer": "Ctrl + H",
        "hint": "Ctrl + F opens Find only. Ctrl + H opens Find AND Replace!"
      },
      "hinglish": {
        "question": "Word mein Find & Replace dialog kholne ka shortcut kya hai?",
        "options": [
          "Ctrl + F",
          "Ctrl + H",
          "Ctrl + R",
          "Ctrl + G"
        ],
        "correctAnswer": "Ctrl + H",
        "hint": "Ctrl + F sirf Find karta hai. Ctrl + H poora Find AND Replace!"
      },
      "hindi": {
        "question": "Word में Find & Replace dialog खोलने का shortcut क्या है?",
        "options": [
          "Ctrl + F",
          "Ctrl + H",
          "Ctrl + R",
          "Ctrl + G"
        ],
        "correctAnswer": "Ctrl + H",
        "hint": "Ctrl + F सिर्फ Find करता है। Ctrl + H पूरा Find AND Replace!"
      }
    },
    "english": {
      "kid": "### 🔍 Find & Replace — The Office Superpower!\n\n**Real Story:** Pooja's company changed its name from \"ABC Enterprises\" to \"XYZ Solutions\". 87 times in 30 pages. Her colleague said 3 hours. Pooja fixed it in 15 seconds!\n\n### 🔎 Find (Ctrl + F)\n\n* Opens the **Navigation Pane** on the left\n* All matches highlighted\n\n### 🔄 Find & Replace (Ctrl + H)\n\n1. Press **Ctrl + H**\n2. **Find what:** → old text\n3. **Replace with:** → new text\n4. **Replace All** — done!\n\n### 💡 Pro Tips\n\n* **Match Case** — Exact case matching\n* **Find Whole Words Only** — No partial matches\n\n🤖 **AI Tip:** Review → Editor suggests replacements for overused words!",
      "pro": "### 🔍 Advanced Find & Replace with Wildcards\n\nEnable \"Use wildcards\" for pattern matching:\n\n| Wildcard | Meaning |\n|---|---|\n| `?` | Any single character |\n| `*` | Any string |\n| `[0-9]` | Any digit |\n\n### 🔧 Format-Based Replace\n\n1. Ctrl + H → **More >>** → **Format**\n2. Replace Red text with Blue text across all pages\n\n🤖 **Power Tip:** Combine with **Macros** for complex document transformations!"
    },
    "hinglish": {
      "kid": "### 🔍 Find & Replace — Office Ka Superpower!\n\n**Real Story:** Pooja ne 87 baar purana company naam 15 second mein replace kar diya!\n\n### 🔄 Find & Replace (Ctrl + H)\n\n1. **Ctrl + H** dabao\n2. Purana text → **Find what**\n3. Naya text → **Replace with**\n4. **Replace All** click karo!\n\n🤖 **AI Tip:** Review → Editor better suggestions deta hai!",
      "pro": "### 🔍 Wildcard Find & Replace\n\n| Wildcard | Matlab |\n|---|---|\n| `?` | Koi bhi character |\n| `*` | Characters ka string |\n\n🤖 **Power Tip:** Macros ke saath combine karo!"
    },
    "hindi": {
      "kid": "### 🔍 Find & Replace — Office का Superpower!\n\n### 🔄 Find & Replace (Ctrl + H)\n\n1. **Ctrl + H** दबाओ\n2. पुराना text → **Find what**\n3. नया text → **Replace with**\n4. **Replace All** click!\n\n🤖 **AI Tip:** Review → Editor बेहतर suggestions देता है!",
      "pro": "### 🔍 Wildcard Find & Replace\n\n| Wildcard | मतलब |\n|---|---|\n| `?` | कोई भी character |\n| `*` | Characters का string |\n\n🤖 **Power Tip:** Macros के साथ combine करो!"
    }
  },
  {
    "id": 7,
    "slug": "ms-word-document-views-print-read-focus",
    "title": "Word Views: Print, Read, Focus & Immersive Reader",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 7)",
    "exercise": {
      "english": {
        "question": "Which Word view shows exactly how the document will look when printed?",
        "options": [
          "Read Mode",
          "Print Layout",
          "Web Layout",
          "Draft View"
        ],
        "correctAnswer": "Print Layout",
        "hint": "Print Layout is the default view — it shows exact margins, page breaks and the printed page!"
      },
      "hinglish": {
        "question": "Kaun sa Word view print ke baad document kaisa dikhega woh exactly dikhata hai?",
        "options": [
          "Read Mode",
          "Print Layout",
          "Web Layout",
          "Draft View"
        ],
        "correctAnswer": "Print Layout",
        "hint": "Print Layout Word ka default view hai — exact margins aur printed page dikhata hai!"
      },
      "hindi": {
        "question": "कौन सा Word view print होने के बाद document कैसा दिखेगा वह exactly दिखाता है?",
        "options": [
          "Read Mode",
          "Print Layout",
          "Web Layout",
          "Draft View"
        ],
        "correctAnswer": "Print Layout",
        "hint": "Print Layout Word का default view है — exact margins और printed page दिखाता है!"
      }
    },
    "english": {
      "kid": "### 👓 Word Views — See Your Document Differently!\n\n**Real Story:** Suresh was always shocked when the printed version looked different. Once he learned **Print Layout view**, no more surprises!\n\n### 📋 The 5 Main Views\n\n| View | Best For |\n|---|---|\n| **Print Layout** | Everyday work — Default |\n| **Read Mode** | Reviewing long documents |\n| **Web Layout** | HTML-style docs |\n| **Outline View** | Planning long reports |\n| **Draft View** | Fast typing focus |\n\n### 🎯 Focus Mode (Word 365)\n\n* **View → Focus** — Removes all Ribbon clutter\n* Distraction-free writing!\n\n🤖 **AI Tip:** **View → Immersive Reader** — dyslexia-friendly with text spacing control!",
      "pro": "### 👓 View Modes & Shortcuts\n\n* **Ctrl + Alt + P** — Print Layout\n* **Ctrl + Alt + R** — Read Mode\n* **Ctrl + Alt + N** — Draft View\n\n**Outline View:** Drag headings to reorganize entire sections.\n\n### 📖 Immersive Reader\n\n* Line focus (1, 3, or 5 lines)\n* Syllable highlighting for dyslexia\n* Read Aloud with synchronized highlight\n\n🤖 **Enterprise Tip:** Use **Focus Mode + Read Aloud** for proofreading!"
    },
    "hinglish": {
      "kid": "### 👓 Word Views — Document Ko Alag Nazar Se Dekho!\n\n| View | Kab Use Karein |\n|---|---|\n| **Print Layout** | Rozana ka kaam — Default |\n| **Read Mode** | Lamba document review |\n| **Outline View** | Long reports plan |\n\n### 🎯 Focus Mode (Word 365)\n\n* **View → Focus** — Ribbon hata deta hai, distraction-free!\n\n🤖 **AI Tip:** **View → Immersive Reader** — dyslexia-friendly!",
      "pro": "### 👓 Shortcuts\n\n* **Ctrl + Alt + P** — Print Layout\n* **Ctrl + Alt + R** — Read Mode\n\n🤖 **Enterprise Tip:** **Focus Mode + Read Aloud** proofreading ke liye!"
    },
    "hindi": {
      "kid": "### 👓 Word Views\n\n| View | कब Use करें |\n|---|---|\n| **Print Layout** | रोज़ाना का काम |\n| **Read Mode** | लंबा document review |\n\n🤖 **AI Tip:** **View → Immersive Reader** — dyslexia-friendly!",
      "pro": "### 👓 Shortcuts\n\n* **Ctrl + Alt + P** — Print Layout\n* **Ctrl + Alt + N** — Draft View\n\n🤖 **Enterprise Tip:** **Focus Mode + Read Aloud**!"
    }
  },
  {
    "id": 8,
    "slug": "ms-word-keyboard-shortcuts-office-productivity",
    "title": "Keyboard Shortcuts That Save Hours Every Day",
    "unit": "Module 1: Word Basics & Orientation",
    "bookRef": "MS Word 365 — Office Career Skills (Lesson 8)",
    "exercise": {
      "english": {
        "question": "Which shortcut opens a new blank document instantly?",
        "options": [
          "Ctrl + O",
          "Ctrl + N",
          "Ctrl + S",
          "Ctrl + W"
        ],
        "correctAnswer": "Ctrl + N",
        "hint": "N is for New! Ctrl + N opens a fresh blank document without touching the mouse!"
      },
      "hinglish": {
        "question": "Microsoft Word mein ek naya blank document instantly kholne ka shortcut kya hai?",
        "options": [
          "Ctrl + O",
          "Ctrl + N",
          "Ctrl + S",
          "Ctrl + W"
        ],
        "correctAnswer": "Ctrl + N",
        "hint": "N matlab New! Ctrl + N mouse chuye bina naya document kholta hai!"
      },
      "hindi": {
        "question": "Microsoft Word में नया blank document instantly खोलने का shortcut क्या है?",
        "options": [
          "Ctrl + O",
          "Ctrl + N",
          "Ctrl + S",
          "Ctrl + W"
        ],
        "correctAnswer": "Ctrl + N",
        "hint": "N मतलब New! Ctrl + N mouse छुए बिना नया document खोलता है!"
      }
    },
    "english": {
      "kid": "### ⌨️ Shortcuts That Make You the Fastest in the Office!\n\n**Real Story:** Ankit finished reports in 1 hour; Mohan took 3 hours. The difference? Ankit knew keyboard shortcuts!\n\n### 📋 Essential Shortcuts — The Must-Know 20\n\n**File:**\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + N** | New document |\n| **Ctrl + O** | Open file |\n| **Ctrl + S** | Save |\n| **Ctrl + P** | Print |\n| **Ctrl + W** | Close |\n\n**Editing:**\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + C** | Copy |\n| **Ctrl + X** | Cut |\n| **Ctrl + V** | Paste |\n| **Ctrl + Z** | Undo |\n| **Ctrl + A** | Select All |\n| **Ctrl + H** | Find & Replace |\n\n**Formatting:**\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + B** | Bold |\n| **Ctrl + I** | Italic |\n| **Ctrl + U** | Underline |\n| **Ctrl + E** | Centre Align |\n| **Ctrl + J** | Justify |\n\n🤖 **AI Tip:** Press **Alt** to see KeyTips — yellow letters on every Ribbon button!",
      "pro": "### ⌨️ Advanced Power User Shortcuts\n\n**Navigation:**\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + Home** | Document start |\n| **Ctrl + End** | Document end |\n| **F5** | Go To dialog |\n\n**Advanced Formatting:**\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + 1** | Single spacing |\n| **Ctrl + 2** | Double spacing |\n| **Ctrl + Alt + 1** | Heading 1 style |\n| **Shift + F3** | Toggle case |\n| **Ctrl + K** | Insert hyperlink |\n| **F7** | Spell check |\n| **Alt + Shift + D** | Insert current date |\n\n🤖 **Power Tip:** Customise Quick Access Toolbar — Alt+1, Alt+2 become instant shortcuts!"
    },
    "hinglish": {
      "kid": "### ⌨️ Office Mein Sabse Fast Rehne Wale Shortcuts!\n\n**File:**\n\n| Shortcut | Kaam |\n|---|---|\n| **Ctrl + N** | Naya document |\n| **Ctrl + S** | Save |\n| **Ctrl + P** | Print |\n\n**Editing:**\n\n| Shortcut | Kaam |\n|---|---|\n| **Ctrl + C** | Copy |\n| **Ctrl + V** | Paste |\n| **Ctrl + Z** | Undo |\n\n**Formatting:**\n\n| Shortcut | Kaam |\n|---|---|\n| **Ctrl + B** | Bold |\n| **Ctrl + E** | Centre |\n| **Ctrl + J** | Justify |\n\n🤖 **AI Tip:** **Alt** dabao — Ribbon pe yellow shortcuts!",
      "pro": "### ⌨️ Advanced Shortcuts\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + Home** | Document start |\n| **Ctrl + Alt + 1** | Heading 1 |\n| **Shift + F3** | Case toggle |\n| **F7** | Spell check |\n\n🤖 **Power Tip:** Quick Access Toolbar customize karo!"
    },
    "hindi": {
      "kid": "### ⌨️ Office में सबसे Fast रहने वाले Shortcuts!\n\n**File:**\n\n| Shortcut | काम |\n|---|---|\n| **Ctrl + N** | नया document |\n| **Ctrl + S** | Save |\n\n**Editing:**\n\n| Shortcut | काम |\n|---|---|\n| **Ctrl + C** | Copy |\n| **Ctrl + Z** | Undo |\n\n**Formatting:**\n\n| Shortcut | काम |\n|---|---|\n| **Ctrl + B** | Bold |\n| **Ctrl + E** | Centre |\n\n🤖 **AI Tip:** **Alt** दबाओ — yellow shortcuts दिखेंगे!",
      "pro": "### ⌨️ Advanced Shortcuts\n\n| Shortcut | Action |\n|---|---|\n| **Ctrl + Alt + 1** | Heading 1 |\n| **Shift + F3** | Case toggle |\n| **F7** | Spell check |\n\n🤖 **Power Tip:** Quick Access Toolbar customize करो!"
    }
  }
];
