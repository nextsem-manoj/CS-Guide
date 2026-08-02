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

export interface GitLesson {
  id: number;
  slug: string;
  originalChapterId: string;
  title: string;
  unit: string;
  bookRef: string;
  icon: string;
  exercise: MultilingualExercise;
  english: { kid: string; pro: string; };
  hinglish: { kid: string; pro: string; };
  hindi: { kid: string; pro: string; };
}

export const gitLessons: GitLesson[] = [
  {
    id: 1,
    slug: "learn-how-to-join-git-branch-on-github",
    originalChapterId: "p0-4-git",
    title: "How to Join a Branch on a GitHub Project",
    unit: "Unit 1: Collaborative Git & GitHub",
    bookRef: "Git & GitHub Collaboration (p. 25-28)",
    icon: "🌿",
    exercise: {
      english: {
        question: "Which command lists all local and remote branches in your Git repository?",
        options: [
          "git branch",
          "git branch -a",
          "git remote -v",
          "git checkout --list"
        ],
        correctAnswer: "git branch -a",
        hint: "The -a switch stands for 'all', which includes remote-tracking branches!"
      },
      hinglish: {
        question: "Git repository ke saare local aur remote branches ko list karne ke liye kaunsi command use hoti hai?",
        options: [
          "git branch",
          "git branch -a",
          "git remote -v",
          "git checkout --list"
        ],
        correctAnswer: "git branch -a",
        hint: "-a switch ka matlab 'all' hota hai, jo local aur remote dono branches ko show karta hai!"
      },
      hindi: {
        question: "अपने गिट रिपोजिटरी में सभी लोकल और रिमोट ब्रांचेस की सूची देखने के लिए किस कमांड का उपयोग किया जाता है?",
        options: [
          "git branch",
          "git branch -a",
          "git remote -v",
          "git checkout --list"
        ],
        correctAnswer: "git branch -a",
        hint: "-a स्विच का अर्थ 'all' (सभी) होता है, जो लोकल और रिमोट दोनों ब्रांचेस को दिखाता है!"
      }
    },
    english: {
      kid: "### 🌿 Group Project Time!\nImagine you and your friend are writing a story together in school. Your friend starts writing a special chapter about *aliens* on a separate page. You want to join them and write on that same page! \n\nIn Git, that separate page is called a **Branch**! Working together on GitHub branches is super easy!\n\n---\n\n### 🚀 Step-by-Step: Joining the Branch\n\nTo join a branch that your friend already uploaded to GitHub on 🪟 Windows 11, type these commands in your Command Prompt:\n\n1. **Clone the Project** (Copy the whole folder to your computer):\n   `git clone https://github.com/friend/alien-story.git` \n\n2. **Go Into the Folder**:\n   `cd alien-story` \n\n3. **Find the Alien Branch** (List all branches, including hidden remote ones!):\n   `git branch -a` \n   *(You will see a remote branch named `remotes/origin/alien-chapter`)* \n\n4. **Jump In and Join!** (Checkout to track the branch):\n   `git checkout alien-chapter` \n   *(Git automatically sets up your local branch to match the remote one!)* \n\n5. **Get Latest Updates** (Pull any new alien updates):\n   `git pull` \n\n---\n\n> 🌳 **Developer Joke:** Why did the Git branch go to therapy? \n> Because it had too many merge conflicts and felt separated from the main tree! 😂\n\n> ⊞ **Windows Tip:** Open **Windows Terminal** in 🪟 Windows 11 and use `Ctrl` + `Shift` + `P` to customize your shell settings while running your Git commands!",
      pro: "### 🌿 Distributed Branch Collaboration\n\nWhen working in multi-developer engineering squads, you often need to checkout, track, and pull branches authored by other developers and hosted on remote hubs like GitHub.\n\nHere is how Git manages remote branch checkout internally:\n\n* **`refs/remotes/origin/*`**: References containing tracking pointers to remote states.\n* **Tracking Branch**: A local branch that has a direct relationship with a remote counterpart.\n\n---\n\n### 🛠️ Step-by-Step Command Flow\n\nTo pull and checkout a remote branch in 🪟 Windows 11 / ⊞ Windows Command Prompt:\n\n1. **Clone the Repository**:\n   ```cmd\n   git clone <repository-url>\n   cd <project-folder>\n   ```\n\n2. **Fetch Latest Remote Pointers**:\n   Ensure your local indices are updated with all branch definitions from GitHub:\n   ```cmd\n   git fetch origin\n   ```\n\n3. **Identify Branch Name**:\n   List all branches including remote-tracking references:\n   ```cmd\n   git branch -a\n   ```\n\n4. **Checkout and Track the Target Branch**:\n   Execute checkout on the target branch name:\n   ```cmd\n   git checkout <branch-name>\n   ```\n   *Note: Under the hood, modern Git auto-detects remote branch matching `<branch-name>` on `origin` and configures local tracking branch `refs/heads/<branch-name>` pointing directly to `origin/<branch-name>`.*\n\n5. **Synchronize Changes**:\n   Download and merge the latest upstream commits:\n   ```cmd\n   git pull origin <branch-name>\n   ```\n\n---\n\n### 📊 Key Commands Quick Sheet\n\n| Command | Description | Switch |\n| :--- | :--- | :--- |\n| `git branch -a` | Lists all local and remote references | `-a` (All) |\n| `git fetch --all` | Updates remote branch local cache pointers | `--all` (Every remote) |\n| `git checkout -b <branch> origin/<branch>` | Explicitly creates a local branch tracking the remote | `-b` (New Branch) |"
    },
    hinglish: {
      kid: "### 🌿 Sath Milkar Code Karein!\nSocho ki aap aur aapka dost ek game bana rahe hain. Aapke dost ne login page ka code likhne ke liye ek alag branch banayi jiska naam hai `feature-login`.\n\nAapko us login page pe kaam karne ke liye us branch ko copy karke join karna hoga. Git mein isko **remote branch checkout** kehte hain!\n\n---\n\n### 🚀 Step-by-Step: Branch Kaise Join Karein?\n\n🪟 Windows 11 Command Prompt mein ye commands type karein:\n\n1. **Project Clone Karein** (GitHub se files download karein):\n   `git clone https://github.com/dost/my-game.git`\n\n2. **Folder Ke Andar Jayein**:\n   `cd my-game`\n\n3. **Saare Branches Dekhein** (Local aur remote dono):\n   `git branch -a`\n   *(Aapko list mein `remotes/origin/feature-login` dikhegi!)*\n\n4. **Branch Join Karein** (Checkout karein):\n   `git checkout feature-login`\n   *(Git automatically local branch ko create karke remote branch se connect kar dega!)*\n\n5. **Latest Code Pull Karein**:\n   `git pull`\n\n---\n\n> 🌳 **Developer Joke:** Git branch ne therapist se kya kaha? \n> \"Mujhe lagta hai main primary trunk se detached ho gaya hoon!\" 🌲\n\n> ⊞ **Windows Tip:** 🪟 Windows 11 mein terminal size adjust karne ke liye right-click title bar aur properties layout tab par click karein!",
      pro: "### 🌿 Remote Branches Ke Sath Collaboration\n\nProduction teams mein developers aksar alag branches pe kaam karte hain jo GitHub pe publish hoti hain. Jab aapko kisi specific branch ko local terminal pe track karna ho, toh niche diye steps ko follow karein:\n\n* **`git fetch`**: Local cache ko remote branches ke meta data se update karta hai.\n* **`git branch -a`**: Local aur remote (`remotes/origin/*`) references dono ko list karta hai.\n\n---\n\n### 🛠️ Execution Pipeline\n\n1. **Clone standard repository**:\n   ```cmd\n   git clone <repo-url>\n   cd <folder>\n   ```\n\n2. **Fetch remote pointers**:\n   ```cmd\n   git fetch origin\n   ```\n\n3. **Remote references print karein**:\n   ```cmd\n   git branch -a\n   ```\n\n4. **Branch checkout karein**:\n   ```cmd\n   git checkout <branch-name>\n   ```\n   *Note: Git automatically upstream tracking set kar deta hai `origin/<branch-name>` ke liye.*\n\n5. **Sync inputs and pulls**:\n   ```cmd\n   git pull origin <branch-name>\n   ```"
    },
    hindi: {
      kid: "### 🌿 ग्रुप प्रोजेक्ट और गिट ब्रांच!\nकल्पना करें कि आप और आपका दोस्त मिलकर एक स्कूल वेबसाइट बना रहे हैं। आपके दोस्त ने संपर्क पृष्ठ (Contact page) बनाने के लिए एक अलग ब्रांच `feature-contact` बनाई। अब आपको भी उस ब्रांच में शामिल होना है!\n\nगिट (Git) में किसी भी अलग पृष्ठ या काम को **ब्रांच (Branch)** कहा जाता है।\n\n---\n\n### 🚀 स्टेप-बाय-स्टेप: ब्रांच कैसे जॉइन करें?\n\n🪟 Windows 11 के कमांड प्रॉम्प्ट (Command Prompt) में ये कमांड लिखें:\n\n1. **प्रोजेक्ट क्लोन करें** (पूरे फोल्डर को अपने कंप्यूटर में कॉपी करें):\n   `git clone https://github.com/friend/school-website.git`\n\n2. **फोल्डर के अंदर जाएं**:\n   `cd school-website`\n\n3. **सभी ब्रांचेस की सूची देखें** (छिपे हुए रिमोट ब्रांचेस भी):\n   `git branch -a`\n   *(आपको `remotes/origin/feature-contact` दिखाई देगा)*\n\n4. **ब्रांच जॉइन करें** (चेकआउट करें):\n   `git checkout feature-contact`\n   *(गिट आपके लिए अपने आप एक लोकल ब्रांच बनाकर उसे रिमोट से जोड़ देगा!)*\n\n5. **लेटेस्ट अपडेट प्राप्त करें** (पुल करें):\n   `git pull`\n\n---\n\n> 🌳 **डेवलपर जोक:** गिट ब्रांच थेरेपिस्ट के पास क्यों गई? \n> क्योंकि उसे लग रहा था कि उसमें बहुत सारे कॉन्फ्लिक्ट (Conflicts) हैं और वह मुख्य पेड़ (main trunk) से अलग हो गई है! 🌲\n\n> ⊞ **Windows Tip:** 🪟 Windows 11 में नए टर्मिनल का उपयोग करें जिसमें टैब सपोर्ट और ज़ूम शॉर्टकट (`Ctrl` + `+`) पहले से उपलब्ध हैं!",
      pro: "### 🌿 डिस्ट्रीब्यूटेड गिट सहयोग और ब्रांच चेकिंग\n\nसॉफ्टवेयर टीमों में काम करते समय, आपको अन्य डेवलपर्स द्वारा बनाई गई और गिटहब (GitHub) पर पुश की गई रिमोट ब्रांचेस पर काम करना पड़ता है।\n\n---\n\n### 🛠️ मुख्य कमांड्स और उनकी प्रक्रिया\n\n🪟 Windows 11 के टर्मिनल में निम्नलिखित कमांड्स का उपयोग करें:\n\n1. **क्लोन और डायरेक्टरी नेविगेशन**:\n   ```cmd\n   git clone <repository-url>\n   cd <project-folder>\n   ```\n\n2. **रिमोट ब्रांच अपडेट प्राप्त करें (Fetch)**:\n   ```cmd\n   git fetch origin\n   ```\n\n3. **सभी ब्रांचेस की सूची देखें**:\n   ```cmd\n   git branch -a\n   ```\n\n4. **रिमोट ब्रांच को लोकल में ट्रैक और चेकिंग करें**:\n   ```cmd\n   git checkout <branch-name>\n   ```\n   *नोट: गिट रिमोट `origin/<branch-name>` से मैच करती हुई लोकल ब्रांच बनाकर सीधे ट्रैक करना शुरू कर देता है।*\n\n5. **ब्रांच को अपडेट रखें (Pull)**:\n   ```cmd\n   git pull origin <branch-name>\n   ```"
    }
  }
];
