export interface LessonExercise {
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export interface Lesson {
  id: number;
  slug: string;
  originalChapterId: string;
  title: string;
  unit: string;
  bookRef: string;
  icon: string;
  exercise: {
    english: LessonExercise;
    hinglish: LessonExercise;
    hindi: LessonExercise;
  };
  english: {
    kid: string;
    pro: string;
  };
  hinglish: {
    kid: string;
    pro: string;
  };
  hindi: {
    kid: string;
    pro: string;
  };
}

export const cliLessons: Lesson[] = [
  {
    id: 1,
    slug: "introduction-to-command-line-interface-cli-basics",
    originalChapterId: "p0-2-terminal",
    title: "CLI Introduction & Desktop Navigation",
    unit: "Unit 1: Command Line Fundamentals",
    bookRef: "Windows CLI Basics (p. 2-5)",
    icon: "💻",
    exercise: {
      english: {
        question: "Which interface do professional developers prefer for automation and scripting?",
        options: [
          "Graphical User Interface (GUI)",
          "Command Line Interface (CLI)",
          "Both are identical",
          "Neither"
        ],
        correctAnswer: "Command Line Interface (CLI)",
        hint: "CLI allows you to write scripts and execute operations without touching a mouse!"
      },
      hinglish: {
        question: "Professional developers automation aur scripting ke liye kaunsa interface prefer karte hain?",
        options: [
          "Graphical User Interface (GUI)",
          "Command Line Interface (CLI)",
          "Dono same hain",
          "Koi bhi nahi"
        ],
        correctAnswer: "Command Line Interface (CLI)",
        hint: "CLI se aap bina mouse ke fast scripting aur server operations kar sakte hain!"
      },
      hindi: {
        question: "प्रोफेशनल डेवलपर्स ऑटोमेशन और स्क्रिप्टिंग के लिए कौन सा इंटरफ़ेस पसंद करते हैं?",
        options: [
          "ग्राफिकल यूजर इंटरफेस (GUI)",
          "कमांड लाइन इंटरफेस (CLI)",
          "दोनों समान हैं",
          "कोई नहीं"
        ],
        correctAnswer: "कमांड लाइन इंटरफेस (CLI)",
        hint: "सीएलआई आपको माउस को छुए बिना स्क्रिप्ट लिखने और काम करने की अनुमति देता है!"
      }
    },
    english: {
      kid: "### 🖥️ Welcome to the Terminal World!\nImagine your computer is a magical castle. A GUI (Graphical User Interface) is like looking at the castle through windows and pointing at things with a mouse.\n\nA CLI (Command Line Interface) is like having a direct talk with the castle wizard! You type magic words (commands) and the wizard executes them instantly!\n\n* **GUI**: Slow but pretty.\n* **CLI**: Fast, powerful, and keyboard-only!",
      pro: "### ⌨️ Command Line Interface (CLI) Fundamentals\nIn modern operating systems, the CLI provides a direct shell interface to interact with the underlying OS kernel. Rather than relying on window managers and event loops, the CLI processes stream-oriented text inputs.\n\n* **Efficiency**: Executing batch operations, pipeline flows, and server configurations is significantly faster in a text shell.\n* **Automation**: Commands can be easily chained into scripts to build complex build pipelines."
    },
    hinglish: {
      kid: "### 🖥️ CLI Kya Hai? Aao Samjhein!\nGraphical User Interface (GUI) ka matlab hai mouse se folders par double-click karna. Par Command Line Interface (CLI) me hum directly text commands likhte hain.\n\n* **GUI**: Sundar aur aasan.\n* **CLI**: Super fast aur powerful, jahan keyboard hi sabkuch hai!",
      pro: "### ⌨️ GUI vs CLI Comparison\nGUI event-driven loops aur window servers ka use karti hai, jabki CLI direct input/output streams (stdin/stdout) par kaam karti hai. System automation aur continuous integration (CI) environments me CLI hi standard hai."
    },
    hindi: {
      kid: "### 🖥️ कमांड लाइन इंटरफ़ेस (CLI) का परिचय!\nजीयूआई (GUI) का मतलब है माउस से फोल्डर पर क्लिक करना। लेकिन सीएलआई (CLI) में हम सीधे कंप्यूटर को निर्देश टाइप करके देते हैं।\n\n* **GUI**: देखने में सुंदर और आसान।\n* **CLI**: बहुत तेज़ और शक्तिशाली, जिसमें माउस की ज़रूरत नहीं होती!",
      pro: "### ⌨️ सीएलआई (CLI) की मूल संरचना\nऑपरेटिंग सिस्टम में सीएलआई (CLI) कर्नेल के साथ सीधे संचार का माध्यम प्रदान करता है। यह सिस्टम एडमिनिस्ट्रेटर और डेवलपर्स के लिए ऑटोमेशन को आसान बनाता है।"
    }
  },
  {
    id: 2,
    slug: "learn-windows-command-prompt-cmd-basics",
    originalChapterId: "cli-ch1-basics",
    title: "Command Line Basics",
    unit: "Unit 1: Command Line Fundamentals",
    bookRef: "Windows CLI Basics (p. 6-10)",
    icon: "🖥️",
    exercise: {
      english: {
        question: "Which command is used to display the active Windows version in the terminal?",
        options: [
          "cls",
          "ver",
          "help",
          "mkdir"
        ],
        correctAnswer: "ver",
        hint: "Type 'ver' to view the operating system's build version."
      },
      hinglish: {
        question: "Terminal me active Windows version dekhne ke liye kaunsi command use hoti hai?",
        options: [
          "cls",
          "ver",
          "help",
          "mkdir"
        ],
        correctAnswer: "ver",
        hint: "Active OS build dekhne ke liye 'ver' type karein."
      },
      hindi: {
        question: "टर्मिनल में सक्रिय विंडोज संस्करण को प्रदर्शित करने के लिए किस कमांड का उपयोग किया जाता है?",
        options: [
          "cls",
          "ver",
          "help",
          "mkdir"
        ],
        correctAnswer: "ver",
        hint: "ऑपरेटिंग सिस्टम का संस्करण देखने के लिए 'ver' टाइप करें।"
      }
    },
    english: {
      kid: "### 🏛️ The First Command Line Words\nNow let's learn some basic commands! Every command is a instruction word:\n\n* `ver`: Shows your Windows Version.\n* `cls`: Clears the messy screen and gives you a fresh page.\n* `help`: Lists all available commands if you ever get lost!",
      pro: "### 🏛️ CMD Syntax & Basic Utilities\nEvery command in the Windows Command Prompt (cmd.exe) follows a simple structure: `COMMAND [arguments]`. Arguments can modify how a command behaves.\n\n* `ver`: Returns the NT kernel version.\n* `cls`: Sends control characters to clear the buffer screen.\n* `help`: Queries the system command registry to return usage guidelines."
    },
    hinglish: {
      kid: "### 🏛️ Pehle Basic Commands\nChaliye terminal ke basic shabd seekhein:\n\n* `ver`: Aapka Windows version check karne ke liye.\n* `cls`: Purane output ko clear karke screen saaf karne ke liye.\n* `help`: Saare commands ki list dekhne ke liye.",
      pro: "### 🏛️ System Level CLI Commands\nWindows Command Prompt parameters aur flags ke saath instructions execute karta hai. `ver` command active OS build version return karti hai, aur `cls` command CLI character buffer ko clean karti hai."
    },
    hindi: {
      kid: "### 🏛️ कमांड लाइन के बुनियादी शब्द\nआइए कुछ बुनियादी कमांड सीखें:\n\n* `ver`: आपके विंडोज संस्करण को दिखाता है।\n* `cls`: स्क्रीन को साफ़ करके एक नया पेज देता है।\n* `help`: सभी उपलब्ध कमांड्स की सूची दिखाता है।",
      pro: "### 🏛️ बुनियादी यूटिलिटी कमांड्स\nकमांड लाइन में `ver` का उपयोग विंडोज एनटी कर्नेल संस्करण की जांच करने के लिए किया जाता है। `cls` बफर स्क्रीन को साफ़ करता है और `help` मदद प्रदान करता है।"
    }
  },
  {
    id: 3,
    slug: "windows-drive-letters-and-file-system-structure",
    originalChapterId: "cli-ch2-drives",
    title: "Drive Letters and the File System",
    unit: "Unit 1: Command Line Fundamentals",
    bookRef: "Windows CLI Basics (p. 11-15)",
    icon: "💾",
    exercise: {
      english: {
        question: "Which directory separator does Windows use in file paths?",
        options: [
          "Forward slash ( / )",
          "Backslash ( \\ )",
          "Colon ( : )",
          "Dot ( . )"
        ],
        correctAnswer: "Backslash ( \\ )",
        hint: "Windows uses backslashes like C:\\Users\\Student, while Linux uses forward slashes."
      },
      hinglish: {
        question: "Windows file paths me directory separator ke roop me kiska use karta hai?",
        options: [
          "Forward slash ( / )",
          "Backslash ( \\ )",
          "Colon ( : )",
          "Dot ( . )"
        ],
        correctAnswer: "Backslash ( \\ )",
        hint: "Windows backslash (\\) use karta hai jaise C:\\Users, jabki Linux forward slash use karta hai."
      },
      hindi: {
        question: "विंडोज फ़ाइल पथ (file path) में डायरेक्टरी सेपरेटर के रूप में किसका उपयोग करता है?",
        options: [
          "फॉरवर्ड स्लैश ( / )",
          "बैकस्लैश ( \\ )",
          "कोलन ( : )",
          "डॉट ( . )"
        ],
        correctAnswer: "बैकस्लैश ( \\ )",
        hint: "विंडोज C:\\Users की तरह बैकस्लैश का उपयोग करता है, जबकि लिनक्स फॉरवर्ड स्लैश का उपयोग करता है।"
      }
    },
    english: {
      kid: "### 💾 Storing Files on Drives\nWindows organizes your hard drive using alphabetical letters followed by a colon:\n\n* `C:`: The main drive where Windows lives.\n* `D:`: A secondary backup drive.\n\nTo jump to a drive, simply type its letter and a colon (like `D:`) and press Enter!",
      pro: "### 💾 Logical Partitions & Drive Mounting\nUnlike UNIX systems which mount everything under a single root `/`, Windows mounts storage volumes using drive letters (e.g. `C:`, `D:`). Each volume maintains its own relative active directory context."
    },
    hinglish: {
      kid: "### 💾 Drive Letters aur File System\nWindows me files ko partition drives me store kiya jata hai:\n\n* `C:`: System drive (jahan Windows installed hai).\n* `D:`: Data/Backup drive.\n\nDrive switch karne ke liye bas letter aur colon type karein (jaise `D:`) aur enter dabayein!",
      pro: "### 💾 Partition Mounting & Active Context\nWindows OS storage units ko alphabetical characters (C:, D:) se differentiate karta hai. Active shell process me primary drive badalne ke liye target drive letter and colon execute kiya jata hai."
    },
    hindi: {
      kid: "### 💾 ड्राइव अक्षर और फ़ाइल सिस्टम\nविंडोज आपके फाइलों को ड्राइव लेटर्स में व्यवस्थित करता है:\n\n* `C:`: मुख्य ड्राइव जहां विंडोज स्थापित है।\n* `D:`: बैकअप या अतिरिक्त डेटा ड्राइव।\n\nड्राइव बदलने के लिए बस अक्षर और कोलन टाइप करें (जैसे `D:`) और एंटर दबाएं!",
      pro: "### 💾 वॉल्यूम पार्टिशनिंग और डायरेक्टरी पाथ\nयूनिक्स के विपरीत, विंडोज ड्राइव अक्षरों (C:, D:) का उपयोग करता है। फ़ाइल पाथ को अलग करने के लिए बैकस्लैश (\\) का उपयोग किया जाता है।"
    }
  },
  {
    id: 4,
    slug: "how-to-customize-windows-command-prompt",
    originalChapterId: "cli-ch3-prompt",
    title: "Understanding the Prompt",
    unit: "Unit 1: Command Line Fundamentals",
    bookRef: "Windows CLI Basics (p. 16-20)",
    icon: "⚡",
    exercise: {
      english: {
        question: "Which command customization flag displays the active directory path and the standard '>' sign?",
        options: [
          "prompt $p$g",
          "prompt $t$g",
          "prompt $d$g",
          "prompt reset"
        ],
        correctAnswer: "prompt $p$g",
        hint: "In Windows CLI, $p$g formats the prompt with current path ($p) and greater-than sign ($g)."
      },
      hinglish: {
        question: "Kaunsa prompt customization flag active directory path aur '>' sign display karta hai?",
        options: [
          "prompt $p$g",
          "prompt $t$g",
          "prompt $d$g",
          "prompt reset"
        ],
        correctAnswer: "prompt $p$g",
        hint: "$p$g prompt ko current path ($p) aur greater-than symbol ($g) ke sath format karta hai."
      },
      hindi: {
        question: "कौन सा प्रॉम्प्ट कस्टमाइजेशन फ्लैग सक्रिय डायरेक्टरी पाथ और मानक '>' चिह्न प्रदर्शित करता है?",
        options: [
          "prompt $p$g",
          "prompt $t$g",
          "prompt $d$g",
          "prompt reset"
        ],
        correctAnswer: "prompt $p$g",
        hint: "$p$g प्रॉम्प्ट को वर्तमान पथ ($p) और ग्रेटर-दैन संकेत ($g) के साथ रेंडर करता है।"
      }
    },
    english: {
      kid: "### ⚡ Customizing the Blinking Prompt\nThe text that tells you where you are (e.g., `C:\\Users\\Student>`) is called the **prompt**.\n\nYou can change it using the `prompt` command! For example, `prompt Hello>` will make the terminal say Hello instead of the folder path!",
      pro: "### ⚡ CMD Prompt Tokens\nThe active prompt is controlled by the `PROMPT` environment variable. Custom tokens include:\n* `$p`: Displays the current drive and directory path.\n* `$g`: Displays the greater-than sign (`>`).\n* `$t`: Displays the current system time."
    },
    hinglish: {
      kid: "### ⚡ Prompt ko Customize Karein\nTerminal par jo blinking cursor se pehle text dikhta hai use **prompt** kehte hain. Aap use change karne ke liye `prompt` command ka use kar sakte hain!",
      pro: "### ⚡ System Level Prompt Tuning\nPrompt format ko dynamically edit karne ke liye dynamic tokens utilize kiye jaate hain. System standard `$p$g` path aur bracket notation format render karta hai."
    },
    hindi: {
      kid: "### ⚡ प्रॉम्प्ट को कस्टमाइज़ करना\nटर्मिनल पर प्रॉम्प्ट का मतलब वह टेक्स्ट है जो आपके इनपुट से पहले आता है। आप इसे `prompt` कमांड से बदल सकते हैं!",
      pro: "### ⚡ प्रॉम्प्ट एन्वायरमेंट वेरिएबल्स\nविंडोज प्रॉम्प्ट `$p$g` पैरामीटर के साथ वर्तमान डायरेक्टरी और सिंबल को रेंडर करता है।"
    }
  },
  {
    id: 5,
    slug: "mkdir-cd-dir-working-with-windows-directories",
    originalChapterId: "cli-ch4-directories",
    title: "Working with Directories",
    unit: "Unit 2: File System & Directories",
    bookRef: "Windows CLI Basics (p. 21-25)",
    icon: "📂",
    exercise: {
      english: {
        question: "Which command is used to create a new directory (folder) in Windows?",
        options: [
          "cd",
          "dir",
          "mkdir",
          "rmdir"
        ],
        correctAnswer: "mkdir",
        hint: "Think of 'make directory'."
      },
      hinglish: {
        question: "Windows me naya directory (folder) banane ke liye kaunsi command use hoti hai?",
        options: [
          "cd",
          "dir",
          "mkdir",
          "rmdir"
        ],
        correctAnswer: "mkdir",
        hint: "Naya folder banane ke liye 'mkdir' (make directory) use kiya jata hai."
      },
      hindi: {
        question: "विंडोज में एक नई डायरेक्टरी (फ़ोल्डर) बनाने के लिए किस कमांड का उपयोग किया जाता है?",
        options: [
          "cd",
          "dir",
          "mkdir",
          "rmdir"
        ],
        correctAnswer: "mkdir",
        hint: "'mkdir' का मतलब 'make directory' है।"
      }
    },
    english: {
      kid: "### 📂 Creating and Navigating Folders\nFolders are called **directories** in the CLI. Here are the tools to rule them:\n\n* `dir`: Lists all folders and files inside the current folder.\n* `mkdir [name]`: Makes a brand new folder.\n* `cd [name]`: Changes folder to enter inside it.",
      pro: "### 📂 Directory Trees & Navigation\nDirectories form a hierarchical tree. You manipulate them using:\n* `dir`: Performs a directory lookup in NTFS.\n* `mkdir`: Allocates index nodes for a new subdirectory.\n* `cd`: Updates the process working directory pointer."
    },
    hinglish: {
      kid: "### 📂 Directories Ke Saath Kaam Karein\nCLI me folders ko **directories** kehte hain:\n\n* `dir`: Sabhi files/folders dekhne ke liye.\n* `mkdir [naam]`: Naya folder banane ke liye.\n* `cd [naam]`: Folder ke andar jaane ke liye.",
      pro: "### 📂 Subdirectory Manipulation\nNTFS table me folder paths ko search karne ke liye `dir` shell utility execute ki jaati hai. Active process working directory pointer switch karne ke liye `cd` utility use hoti hai."
    },
    hindi: {
      kid: "### 📂 डायरेक्टरी (फ़ोल्डर) के साथ काम करना\nकमांड लाइन में फ़ोल्डर्स को डायरेक्टरी कहते हैं:\n\n* `dir`: फ़ाइलों और फ़ोल्डर्स की सूची दिखाता है।\n* `mkdir [नाम]`: नया फ़ोल्डर बनाता है।\n* `cd [नाम]`: फ़ोल्डर के अंदर प्रवेश करता है।",
      pro: "### 📂 डायरेक्टरी ट्री मैनेजमेंट\nडायरेक्टरी पाथ रेंडरिंग के लिए `dir` कमांड का उपयोग होता है। नए सबडायरेक्टरी बनाने के लिए `mkdir` और पाथ चेंज के लिए `cd` कमांड होती है।"
    }
  },
  {
    id: 6,
    slug: "modify-file-attributes-ntfs-permissions-attrib",
    originalChapterId: "cli-ch5-attributes",
    title: "File Attributes and NTFS Permissions",
    unit: "Unit 2: File System & Directories",
    bookRef: "Windows CLI Basics (p. 26-30)",
    icon: "🔒",
    exercise: {
      english: {
        question: "Which attribute letter stands for a Hidden file in the attrib command?",
        options: [
          "R",
          "H",
          "S",
          "A"
        ],
        correctAnswer: "H",
        hint: "H stands for Hidden, R stands for Read-only, S stands for System."
      },
      hinglish: {
        question: "attrib command me file ko chhipane ke liye (Hidden) kaunsa letter use hota hai?",
        options: [
          "R",
          "H",
          "S",
          "A"
        ],
        correctAnswer: "H",
        hint: "H se Hidden, R se Read-only aur S se System attribute assign hota hai."
      },
      hindi: {
        question: "attrib कमांड में हिडन (Hidden) फ़ाइल के लिए कौन सा विशेषता अक्षर उपयोग किया जाता है?",
        options: [
          "R",
          "H",
          "S",
          "A"
        ],
        correctAnswer: "H",
        hint: "H का अर्थ हिडन (Hidden) और R का अर्थ रीड-ओनली (Read-Only) है।"
      }
    },
    english: {
      kid: "### 🔒 Secret Hidden Files!\nEvery file has qualities called **attributes**. You can make a file read-only (so no one can change it) or hide it like a secret treasure!\n\n* `attrib +h [filename]`: Hides a file from view!\n* `attrib -h [filename]`: Shows it again!",
      pro: "### 🔒 File System Attributes\nFiles are registered with attributes in the MFT (Master File Table):\n* `R`: Read-Only\n* `H`: Hidden\n* `S`: System\n* `A`: Archive\nUse `attrib +r` to prevent write access."
    },
    hinglish: {
      kid: "### 🔒 Files Ko Secret Banayein!\nHar file ki attributes hoti hain jo uski security control karti hain:\n\n* `attrib +h [filename]`: File ko chhipane ke liye (Hidden).\n* `attrib -h [filename]`: File ko wapas dekhne ke liye.",
      pro: "### 🔒 NTFS Metadata Attributes\nWindows OS attrib command se MFT entries modify karta hai. `+h` parameter metadata me file visibility flag disable karta hai, aur `+r` write permission state lock karta hai."
    },
    hindi: {
      kid: "### 🔒 फ़ाइल विशेषताओं (Attributes) का प्रबंधन\nप्रत्येक फ़ाइल के गुण होते हैं जिन्हें एट्रीब्यूट कहते हैं। आप किसी फ़ाइल को छिपा सकते हैं ताकि कोई उसे देख न सके!\n\n* `attrib +h [filename]`: फ़ाइल को छुपाता है।\n* `attrib -h [filename]`: फ़ाइल को फिर से दिखाता है।",
      pro: "### 🔒 एटीटीआरआईबी (ATTRIB) यूटिलिटी\nमास्टर फ़ाइल टेबल (MFT) में फ़ाइल मेटाडेटा बदलने के लिए `attrib` उपयोग किया जाता है। `R` रीड-ओनली, `H` हिडन के लिए उपयोग किया जाता है।"
    }
  },
  {
    id: 7,
    slug: "copy-move-rename-delete-files-cmd",
    originalChapterId: "cli-ch7-operations",
    title: "Copying, Moving, Renaming, and Deleting Files",
    unit: "Unit 2: File System & Directories",
    bookRef: "Windows CLI Basics (p. 31-35)",
    icon: "📑",
    exercise: {
      english: {
        question: "Which command deletes a file in Windows CLI?",
        options: [
          "del",
          "ren",
          "move",
          "copy"
        ],
        correctAnswer: "del",
        hint: "Use the 'del' command, which is short for delete."
      },
      hinglish: {
        question: "Windows CLI me file ko delete karne ke liye kaunsi command use hoti hai?",
        options: [
          "del",
          "ren",
          "move",
          "copy"
        ],
        correctAnswer: "del",
        hint: "File delete karne ke liye 'del' (delete) command use hoti hai."
      },
      hindi: {
        question: "विंडोज सीएलआई (CLI) में फ़ाइल हटाने (delete) के लिए किस कमांड का उपयोग किया जाता है?",
        options: [
          "del",
          "ren",
          "move",
          "copy"
        ],
        correctAnswer: "del",
        hint: "'del' का उपयोग किया जाता है जो डिलीट का संक्षिप्त रूप है।"
      }
    },
    english: {
      kid: "### 📑 Copy, Move, Rename, and Delete\nLet's manage files like office documents:\n\n* `copy file.txt clone.txt`: Makes a twin copy.\n* `ren file.txt new.txt`: Renames the file.\n* `del file.txt`: Deletes the file forever!",
      pro: "### 📑 File Management Operations\nLow-level file operations involve sector mapping and table updates:\n* `copy`: Duplicates byte streams to new sectors.\n* `move`: Modifies the MFT parent directory pointer.\n* `del`: Marks sectors as available for writing."
    },
    hinglish: {
      kid: "### 📑 Files Ko Manage Karein\nFiles par operational commands chala kar unhe manage karein:\n\n* `copy file.txt clone.txt`: File ki copy banana.\n* `ren file.txt new.txt`: Rename karna.\n* `del file.txt`: Delete karna.",
      pro: "### 📑 Byte Stream Operations\nFile parameters update karne ke liye low-level commands use hote hain. `copy` operation new sectors me data blocks allocate karta hai, aur `del` reference index entry clear karta hai."
    },
    hindi: {
      kid: "### 📑 फ़ाइलों का प्रबंधन\nकमांड लाइन में फ़ाइलों को प्रबंधित करना बहुत आसान है:\n\n* `copy file.txt clone.txt`: फ़ाइल की कॉपी बनाता है।\n* `ren file.txt new.txt`: नाम बदलता है।\n* `del file.txt`: फ़ाइल को हमेशा के लिए हटाता है।",
      pro: "### 📑 फ़ाइल मैनिपुलेशन निर्देश\nसिस्टम स्तर पर `copy` बाइट स्ट्रीम्स को डुप्लिकेट करता है, `move` डायरेक्टरी ट्री रेफरेंस बदलता है, और `del` फ़ाइल डेटा ब्लॉक रिलीज करता है।"
    }
  },
  {
    id: 8,
    slug: "windows-cli-wildcards-and-stream-redirection",
    originalChapterId: "cli-ch6-redirection",
    title: "Wildcards and Redirection",
    unit: "Unit 3: I/O Redirection & Disk Management",
    bookRef: "Windows CLI Basics (p. 36-40)",
    icon: "🔍",
    exercise: {
      english: {
        question: "Which operator is used to redirect command output to a file, overwriting its contents?",
        options: [
          ">",
          ">>",
          "<",
          "|"
        ],
        correctAnswer: ">",
        hint: "Single '>' overwrites, double '>>' appends to the file."
      },
      hinglish: {
        question: "Kaunsa operator command output ko kisi file me save karta hai (data overwrite karke)?",
        options: [
          ">",
          ">>",
          "<",
          "|"
        ],
        correctAnswer: ">",
        hint: "Single '>' overwrite karta hai, aur double '>>' purane data ke aage jodta hai."
      },
      hindi: {
        question: "किस ऑपरेटर का उपयोग कमांड आउटपुट को फ़ाइल में रीडायरेक्ट करने के लिए किया जाता है, जिससे उसकी सामग्री ओवरराइट हो जाती है?",
        options: [
          ">",
          ">>",
          "<",
          "|"
        ],
        correctAnswer: ">",
        hint: "एकल '>' फ़ाइल को ओवरराइट करता है, जबकि '>>' फ़ाइल के अंत में जोड़ता है।"
      }
    },
    english: {
      kid: "### 🔍 Redirecting Outputs\nNormally, commands print their text on the screen. But you can redirect the text to save it inside a file using the `>` symbol!\n\n* `echo Hello > doc.txt`: Saves the word Hello inside doc.txt!",
      pro: "### 🔍 Stream Redirection & Pipe Operators\nStandard streams (stdin, stdout, stderr) can be intercepted:\n* `>`: Redirects stdout to a file (overwriting).\n* `>>`: Appends stdout to a file.\n* `|`: Pipes stdout of command A to stdin of command B."
    },
    hinglish: {
      kid: "### 🔍 Redirection Aur Pipes\nRedirection ka use karke hum command ke output ko screen par dekhne ke bajaye kisi file me save kar sakte hain:\n\n* `>`: Output ko file me save karta hai (purana data delete karke).\n* `>>`: Naya data file ke aakhir me jodta hai (append).",
      pro: "### 🔍 Stream Piping & I/O Hooks\nCLI me input aur output streams ko redirect karne ke liye `>` (overwrite), `>>` (append), aur `|` (pipe operator) use kiye jaate hain. Pipe do processes ke streams link karta hai."
    },
    hindi: {
      kid: "### 🔍 रीडायरेक्शन और पाइप्स\nरीडायरेक्शन का उपयोग करके हम कमांड के परिणाम को स्क्रीन पर दिखाने के बजाय फ़ाइल में सहेज सकते हैं:\n\n* `>`: पुराने डेटा को मिटाकर परिणाम को फ़ाइल में लिखता है।\n* `>>`: नए डेटा को फ़ाइल के अंत में जोड़ता है।",
      pro: "### 🔍 स्ट्रीम रीडायरेक्शन और पाइपिंग\nस्टैंडर्ड I/O स्ट्रीम्स को हुक करने के लिए `>` और `>>` का उपयोग होता है। पाइप (`|`) ऑपरेटर एक प्रोग्राम के आउटपुट को दूसरे के इनपुट में भेजता है।"
    }
  },
  {
    id: 9,
    slug: "windows-disk-management-chkdsk-defrag-diskpart",
    originalChapterId: "cli-ch9-disk",
    title: "Disk Management",
    unit: "Unit 3: I/O Redirection & Disk Management",
    bookRef: "Windows CLI Basics (p. 41-45)",
    icon: "💿",
    exercise: {
      english: {
        question: "Which command runs the disk partition utility in Windows CLI?",
        options: [
          "chkdsk",
          "defrag",
          "diskpart",
          "format"
        ],
        correctAnswer: "diskpart",
        hint: "Type 'diskpart' to enter the disk partition manager console."
      },
      hinglish: {
        question: "Windows CLI me disk partition utility console open karne ke liye kaunsi command use hoti hai?",
        options: [
          "chkdsk",
          "defrag",
          "diskpart",
          "format"
        ],
        correctAnswer: "diskpart",
        hint: "Disk partition settings ke liye 'diskpart' system tool use hota hai."
      },
      hindi: {
        question: "विंडोज सीएलआई (CLI) में डिस्क विभाजन उपयोगिता (partition utility) कौन सी कमांड चलाती है?",
        options: [
          "chkdsk",
          "defrag",
          "diskpart",
          "format"
        ],
        correctAnswer: "diskpart",
        hint: "विभाजन प्रबंधित करने के लिए 'diskpart' कमांड का उपयोग करें।"
      }
    },
    english: {
      kid: "### 💿 Disk Clean Up & Health Check\nIs your hard drive feeling sick? You can check its health using disk utility tools:\n\n* `chkdsk`: Checks for disk storage errors and bad spots.\n* `defrag`: Arranges scrambled data blocks to speed up files.",
      pro: "### 💿 Disk Partitioning & Systems Check\nLower level volume utilities require administrative permissions:\n* `chkdsk`: Verifies the file system integrity of a volume.\n* `defrag`: Reorganizes fragmented clusters on spinning media.\n* `diskpart`: Opens the disk partitioning sub-shell."
    },
    hinglish: {
      kid: "### 💿 Disk Health aur Maintenance\nHard drive ki health check aur settings ke liye standard utilities use hoti hain:\n\n* `chkdsk`: Disk errors scan aur repair karne ke liye.\n* `defrag`: Files ko sequence me arrange karke speed badhane ke liye.",
      pro: "### 💿 Partitioning & Clusters Layout\nWindows partition tables manage karne ke liye administrative sub-shell `diskpart` use hoti hai. NTFS sector tables inspect aur fix karne ke liye `chkdsk` utility use hoti hai."
    },
    hindi: {
      kid: "### 💿 डिस्क प्रबंधन और मरम्मत\nहार्ड ड्राइव की सेहत की जांच करने के लिए इन यूटिलिटीज का उपयोग करें:\n\n* `chkdsk`: डिस्क में खराबी या त्रुटियों की जांच करता है।\n* `defrag`: फाइलों को व्यवस्थित करके कंप्यूटर की गति बढ़ाता है।",
      pro: "### 💿 डिस्क विभाजन और सेक्टर सुधार\nसिस्टम एडमिनिस्ट्रेटर `diskpart` का उपयोग करके वॉल्यूम विभाजन का प्रबंधन करते हैं और `chkdsk` के माध्यम से फ़ाइल सिस्टम की अखंडता जांचते हैं।"
    }
  },
  {
    id: 10,
    slug: "connect-network-shares-net-use-command",
    originalChapterId: "cli-ch10-shares",
    title: "Connecting to File Shares",
    unit: "Unit 3: I/O Redirection & Disk Management",
    bookRef: "Windows CLI Basics (p. 46-50)",
    icon: "🔗",
    exercise: {
      english: {
        question: "Which net command is used to map a shared network directory to a local drive letter?",
        options: [
          "net share",
          "net use",
          "net view",
          "net session"
        ],
        correctAnswer: "net use",
        hint: "Use net use to map network resources, e.g. net use Z: \\\\Server\\Share."
      },
      hinglish: {
        question: "Kaunsi net command shared network directory ko local drive mapping ke liye use hoti hai?",
        options: [
          "net share",
          "net use",
          "net view",
          "net session"
        ],
        correctAnswer: "net use",
        hint: "Z: drive map karne ke liye `net use Z: \\\\Server\\Folder` command hoti hai."
      },
      hindi: {
        question: "साझा नेटवर्क डायरेक्टरी को स्थानीय ड्राइव अक्षरों से जोड़ने के लिए किस नेट कमांड का उपयोग होता है?",
        options: [
          "net share",
          "net use",
          "net view",
          "net session"
        ],
        correctAnswer: "net use",
        hint: "नेटवर्क संसाधन माउंट करने के लिए `net use Z: \\\\Server\\Share` का उपयोग करें।"
      }
    },
    english: {
      kid: "### 🔗 Connecting to Network Folders\nWant to access a folder sitting on another computer across the room? You can map network drives easily:\n\n* `net view`: Displays all computers in the local network.\n* `net use`: Mounts a network folder locally.",
      pro: "### 🔗 SMB Share Management\nWindows utilizes the Server Message Block (SMB) protocol for networking:\n* `net share`: Exposes a local directory to the network.\n* `net use`: Mounts a remote share to a local virtual drive letter."
    },
    hinglish: {
      kid: "### 🔗 Network Sharing aur Mapping\nNetwork par doosre computers ke folders connect karne ke liye net command use hoti hai:\n\n* `net view`: Network ke aaspas ke devices dekhne ke liye.\n* `net use`: Kisi network folder ko local drive ki tarah map karne ke liye.",
      pro: "### 🔗 Network Share mounts (SMB)\nWindows system SMB protocols handle karne ke liye `net use` utility use karta hai. Dynamic networking me local drive paths map karne ke liye command format: `net use Z: \\\\Server\\Folder`."
    },
    hindi: {
      kid: "### 🔗 नेटवर्क शेयरिंग और मैपिंग\nनेटवर्क पर दूसरे कंप्यूटर के फ़ोल्डर्स को स्थानीय रूप से जोड़ने के लिए:\n\n* `net view`: नेटवर्क के अन्य डिवाइसेज की सूची दिखाता है।\n* `net use`: रिमोट नेटवर्क फ़ोल्डर को कंप्यूटर से जोड़ता है।",
      pro: "### 🔗 नेटवर्क ड्राइव मैपिंग\nविंडोज एसएमबी (SMB) प्रोटोकॉल का उपयोग करके रिमोट डायरेक्टरी को माउंट करने के लिए `net use` कमांड प्रदान करता है।"
    }
  },
  {
    id: 11,
    slug: "manage-windows-user-accounts-groups-net-user",
    originalChapterId: "cli-ch11-users",
    title: "Managing User Accounts",
    unit: "Unit 4: User Accounts & Networking",
    bookRef: "Windows CLI Basics (p. 51-55)",
    icon: "👥",
    exercise: {
      english: {
        question: "Which command displays details of all active user accounts on Windows?",
        options: [
          "net user",
          "net group",
          "whoami",
          "net accounts"
        ],
        correctAnswer: "net user",
        hint: "Simply type 'net user' to list local accounts."
      },
      hinglish: {
        question: "Windows me sabhi active user accounts ki list dekhne ke liye kaunsi command chalti hai?",
        options: [
          "net user",
          "net group",
          "whoami",
          "net accounts"
        ],
        correctAnswer: "net user",
        hint: "Local user profiles audit karne ke liye 'net user' execute karein."
      },
      hindi: {
        question: "कौन सी कमांड विंडोज पर सभी सक्रिय यूज़र खातों का विवरण प्रदर्शित करती है?",
        options: [
          "net user",
          "net group",
          "whoami",
          "net accounts"
        ],
        correctAnswer: "net user",
        hint: "स्थानीय खातों की सूची देखने के लिए बस 'net user' टाइप करें।"
      }
    },
    english: {
      kid: "### 👥 Windows User Accounts\nIf multiple people share a computer, you can manage their profiles:\n\n* `net user`: Lists all accounts (like Student, Administrator).\n* `net user [name] [password] /add`: Creates a new user!",
      pro: "### 👥 SAM Database Modification\nLocal user credentials reside in the Security Accounts Manager (SAM):\n* `net user`: Lists or updates accounts.\n* `net localgroup`: Add accounts to security descriptors."
    },
    hinglish: {
      kid: "### 👥 User Profiles aur Accounts\nComputer par naye users aur unke groups manage karne ke liye:\n\n* `net user`: Sabhi active profiles dekhne ke liye.\n* `net user [name] /add`: Naya user profile banane ke liye.",
      pro: "### 👥 SAM Database Administration\nUser accounts create aur credentials manage karne ke liye target CLI administrative privileges mandatory hain. SAM entries modify karne ke liye `net user` parameter flags use hote hain."
    },
    hindi: {
      kid: "### 👥 यूज़र प्रोफाइल और अकाउंट्स\nकंप्यूटर साझा करने वाले लोगों के खातों का प्रबंधन करने के लिए:\n\n* `net user`: सभी यूज़र खातों की सूची दिखाता है।\n* `net user [name] [password] /add`: नया यूज़र बनाता है।",
      pro: "### 👥 एसएएम (SAM) डेटाबेस सुरक्षा\nविंडोज लोकल सुरक्षा नीति और एसएएम रिकॉर्ड के प्रबंधन के लिए `net user` और `net localgroup` कमांड्स उपलब्ध कराता है।"
    }
  },
  {
    id: 12,
    slug: "network-troubleshooting-ping-tracert-ipconfig",
    originalChapterId: "cli-ch8-networking",
    title: "Networking",
    unit: "Unit 4: User Accounts & Networking",
    bookRef: "Windows CLI Basics (p. 56-60)",
    icon: "🌐",
    exercise: {
      english: {
        question: "Which utility is used to query DNS mappings and find the IP address of a domain name?",
        options: [
          "ping",
          "ipconfig",
          "nslookup",
          "tracert"
        ],
        correctAnswer: "nslookup",
        hint: "Use nslookup followed by a domain name, e.g. nslookup nextsem.online."
      },
      hinglish: {
        question: "Kaunsa network tool domain name ke IP address ki mapping (DNS lookup) check karta hai?",
        options: [
          "ping",
          "ipconfig",
          "nslookup",
          "tracert"
        ],
        correctAnswer: "nslookup",
        hint: "Website server IP queries resolve karne ke liye 'nslookup' use kiya jata hai."
      },
      hindi: {
        question: "कौन सी उपयोगिता (utility) डीएनएस मैपिंग की जांच करने और डोमेन नाम का आईपी पता खोजने के लिए उपयोग की जाती है?",
        options: [
          "ping",
          "ipconfig",
          "nslookup",
          "tracert"
        ],
        correctAnswer: "nslookup",
        hint: "डोमेन नाम के आईपी पते का पता लगाने के लिए 'nslookup' का उपयोग करें।"
      }
    },
    english: {
      kid: "### 🌐 Networking Commands\nLet's test how your computer talks to the internet:\n\n* `ipconfig`: Displays your computer's IP address.\n* `ping [website]`: Sends packet signals to see if a website is online.\n* `tracert [website]`: Shows the steps your packet takes to reach a website.",
      pro: "### 🌐 TCP/IP Network Diagnostics\nWindows includes powerful command-line network diagnostic utilities:\n* `ipconfig`: Queries active DHCP leases and network interface controllers.\n* `ping`: Sends ICMP echo requests.\n* `tracert`: Traces route hops by incrementing TTL fields."
    },
    hinglish: {
      kid: "### 🌐 Internet aur Network Tools\nAapka network settings aur internet connection check karne ke liye:\n\n* `ipconfig`: Aapke system ka local IP address check karne ke liye.\n* `ping nextsem.online`: Check karne ke liye ki website active hai ya nahi.",
      pro: "### 🌐 Network Hops & ICMP Packets\nNetwork routing verify karne ke liye ICMP utility `ping` aur packet pathway diagnostic tool `tracert` use hote hain. local NIC adapter detail queries `ipconfig` se filter ki jaati hain."
    },
    hindi: {
      kid: "### 🌐 नेटवर्क और इंटरनेट कमांड्स\nजांचें कि आपका कंप्यूटर इंटरनेट से कैसे जुड़ा है:\n\n* `ipconfig`: आपके कंप्यूटर का आईपी एड्रेस दिखाता है।\n* `ping`: जांचता है कि कोई वेबसाइट ऑनलाइन है या नहीं।\n* `tracert`: दिखाता है कि डेटा पैकेट वेबसाइट तक जाने में कितने कदम लेता है।",
      pro: "### 🌐 टीसीपी/आईपी नेटवर्क डायग्नोस्टिक्स\nनेटवर्क इंटरफ़ेस कार्ड के कॉन्फ़िगरेशन को देखने के लिए `ipconfig` और नेटवर्क रूटिंग ट्रैक करने के लिए `tracert` और `ping` का उपयोग होता है।"
    }
  },
  {
    id: 13,
    slug: "remote-access-ssh-telnet-rdp-setup",
    originalChapterId: "cli-ch12-remote",
    title: "Remote Access",
    unit: "Unit 4: User Accounts & Networking",
    bookRef: "Windows CLI Basics (p. 61-65)",
    icon: "📶",
    exercise: {
      english: {
        question: "Which port does the standard remote access protocol SSH run on by default?",
        options: [
          "21",
          "22",
          "23",
          "80"
        ],
        correctAnswer: "22",
        hint: "SSH runs on port 22, Telnet runs on port 23, and HTTP runs on port 80."
      },
      hinglish: {
        question: "Default roop se standard remote access protocol SSH kis port par chalta hai?",
        options: [
          "21",
          "22",
          "23",
          "80"
        ],
        correctAnswer: "22",
        hint: "SSH port 22 use karta hai, jabki telnet port 23 aur HTTP port 80 use karta hai."
      },
      hindi: {
        question: "मानक रिमोट एक्सेस प्रोटोकॉल एसएसएच (SSH) डिफ़ॉल्ट रूप से किस पोर्ट पर चलता है?",
        options: [
          "21",
          "22",
          "23",
          "80"
        ],
        correctAnswer: "22",
        hint: "एसएसएच पोर्ट 22 का उपयोग करता है, जबकि टेलनेट पोर्ट 23 का उपयोग करता है।"
      }
    },
    english: {
      kid: "### 📶 Connecting to Remote Servers\nHow do you control a computer in another building? You login remotely:\n\n* **SSH**: A secure encrypted text connection.\n* **Telnet**: An older unencrypted text connection.\n* **RDP**: Full graphical screen remote control.",
      pro: "### 📶 Cryptographic Remote Administration\nRemote control interfaces are divided into text-only and graphical tunnels:\n* **SSH (Secure Shell)**: Securely authenticates over port 22 using public-key cryptography.\n* **Telnet**: Insecure remote terminal access over port 23.\n* **RDP**: Terminal services protocol operating on port 3389."
    },
    hinglish: {
      kid: "### 📶 Remote Systems Se Connect Karein\nRemote control connection se aap kisi doosre system ko control kar sakte hain:\n\n* **SSH**: Secure, encrypted text-based login.\n* **RDP (Remote Desktop)**: Remote system ka screen control panels access karna.",
      pro: "### 📶 Secure Tunnels (SSH vs Telnet)\nSystems administrators ssh protocol se port 22 par shell login tunnel secure karte hain. Insecure telnet connections port 23 aur RDP desktop links port 3389 parameters use karte hain."
    },
    hindi: {
      kid: "### 📶 रिमोट कंप्यूटर से जुड़ना\nआप दूसरे स्थान पर रखे कंप्यूटर को अपने पास से कैसे नियंत्रित कर सकते हैं?\n\n* **SSH**: सुरक्षित और एन्क्रिप्टेड रिमोट कनेक्शन।\n* **Telnet**: पुराना असुरक्षित रिमोट कनेक्शन।",
      pro: "### 📶 रिमोट एक्सेस आर्किटेक्चर\nनेटवर्क सुरक्षा के लिए सुरक्षित रिमोट एक्सेस हेतु एसएसएच (SSH) पोर्ट 22 का उपयोग करता है। रिमोट डेस्कटॉप टनल के लिए आरडीपी (RDP) पोर्ट 3389 का उपयोग होता है।"
    }
  },
  {
    id: 14,
    slug: "learn-windows-batch-files-scripting-basics",
    originalChapterId: "cli-ch13-batch",
    title: "Batch Files",
    unit: "Unit 5: Automation & Task Scheduling",
    bookRef: "Windows CLI Basics (p. 66-70)",
    icon: "📄",
    exercise: {
      english: {
        question: "What file extension is used to identify executable Windows Batch Scripts?",
        options: [
          ".txt",
          ".bat",
          ".sh",
          ".exe"
        ],
        correctAnswer: ".bat",
        hint: "Windows Batch script files end with either '.bat' or '.cmd'."
      },
      hinglish: {
        question: "Windows Batch Scripts (automation scripts) ka standard file extension kya hota hai?",
        options: [
          ".txt",
          ".bat",
          ".sh",
          ".exe"
        ],
        correctAnswer: ".bat",
        hint: "Windows command script files '.bat' ya '.cmd' format me save hoti hain."
      },
      hindi: {
        question: "विंडोज बैच स्क्रिप्ट को निष्पादित करने के लिए किस फ़ाइल एक्सटेंशन का उपयोग किया जाता है?",
        options: [
          ".txt",
          ".bat",
          ".sh",
          ".exe"
        ],
        correctAnswer: ".bat",
        hint: "बैच फाइलें विंडोज में '.bat' या '.cmd' एक्सटेंशन के साथ समाप्त होती हैं।"
      }
    },
    english: {
      kid: "### 📄 Coding Scripts to Run Tasks\nInstead of typing commands one-by-one, you can save a list of commands inside a text file ending with `.bat`. When you open it, Windows executes all commands automatically!\n\n* `echo echo Welcome > script.bat`: Creates a simple batch file!",
      pro: "### 📄 Command Line Batch Scripting\nWindows Batch scripts (.bat, .cmd) compile line-by-line via cmd.exe interpreter:\n* `@echo off`: Suppresses the command display echo.\n* `%VAR%`: Evaluates local variables.\n* `%1, %2`: Arguments passed to the batch script execution."
    },
    hinglish: {
      kid: "### 📄 Batch Scripts Banayein\nApne commands ko automate karne ke liye aap ek text file me commands save karke use `.bat` extension de sakte hain. Windows use script ki tarah run karega!",
      pro: "### 📄 Shell Scripting Automation\nBatch programming (.bat) me cmd.exe lines sequentially interpret karta hai. `@echo off` command path print blocking handle karta hai, aur looping parameters local tasks automate karte hain."
    },
    hindi: {
      kid: "### 📄 बैच स्क्रिप्ट (Batch Files) को समझना\nकमांड्स को एक-एक करके टाइप करने के बजाय, आप उन्हें `.bat` फ़ाइल में सहेज सकते हैं। जब आप इसे खोलेंगे, विंडोज सभी कमांड्स को स्वचालित रूप से चलाएगा!",
      pro: "### 📄 ऑटोमेशन और बैच प्रोग्रामिंग\nविंडोज बैच फाइलें (.bat) cmd.exe व्याख्याकार द्वारा निष्पादित की जाती हैं। वेरिएबल डिक्लेरेशन और लूप्स इसमें ऑटोमेशन को संभव बनाते हैं।"
    }
  },
  {
    id: 15,
    slug: "windows-task-management-taskkill-schtasks",
    originalChapterId: "cli-ch14-tasks",
    title: "Task Management",
    unit: "Unit 5: Automation & Task Scheduling",
    bookRef: "Windows CLI Basics (p. 71-75)",
    icon: "⚙️",
    exercise: {
      english: {
        question: "Which command kills a running system process by specifying its Process ID (PID)?",
        options: [
          "tasklist",
          "taskkill",
          "schtasks",
          "shutdown"
        ],
        correctAnswer: "taskkill",
        hint: "Use taskkill /pid <PID> or taskkill /im <image_name.exe>."
      },
      hinglish: {
        question: "Process ID (PID) dekar active system process ko force stop/kill karne ke liye kaunsi command chalti hai?",
        options: [
          "tasklist",
          "taskkill",
          "schtasks",
          "shutdown"
        ],
        correctAnswer: "taskkill",
        hint: "Process band karne ke liye 'taskkill /pid <number>' command use hoti hai."
      },
      hindi: {
        question: "प्रोसेस आईडी (PID) निर्दिष्ट करके चल रही सिस्टम प्रक्रिया (process) को समाप्त करने के लिए किस कमांड का उपयोग किया जाता है?",
        options: [
          "tasklist",
          "taskkill",
          "schtasks",
          "shutdown"
        ],
        correctAnswer: "taskkill",
        hint: "प्रक्रिया समाप्त करने के लिए 'taskkill' का उपयोग किया जाता है।"
      }
    },
    english: {
      kid: "### ⚙️ Managing Running Apps\nIf an app freezes, you don't need Task Manager. You can rule it with text commands:\n\n* `tasklist`: Shows all running apps and their Process IDs (PID).\n* `taskkill /im notepad.exe`: Closes the frozen Notepad instantly!",
      pro: "### ⚙️ OS Process Management & Scheduling\nKernel processes can be audited and managed using CLI tools:\n* `tasklist`: Returns active tasks with memory mappings and PID tokens.\n* `taskkill`: Sends termination signals to a process handle.\n* `schtasks`: Schedules automatic script execution triggers."
    },
    hinglish: {
      kid: "### ⚙️ Running Apps ko Control Karein\nAgar koi app freeze ho jaye, toh use terminal se close kar sakte hain:\n\n* `tasklist`: Chal rahe saare applications ki details aur unka PID number dekhne ke liye.\n* `taskkill /f /im chrome.exe`: Chrome process ko forcefully end karne ke liye.",
      pro: "⚙️ Process Auditing & Cron Triggers\nActive system processes check karne ke liye `tasklist` runtime inspect karti hai. Process terminate karne ke liye `taskkill` PID flags handle karti hai, aur periodic scheduler triggers `schtasks` daemon configure karte hain."
    },
    hindi: {
      kid: "### ⚙️ रनिंग ऐप्स और टास्क मैनेजमेंट\nयदि कोई ऐप हैंग (फ्रीज) हो जाए, तो आप उसे कमांड लाइन से बंद कर सकते हैं:\n\n* `tasklist`: चल रहे सभी ऐप्स और उनकी प्रोसेस आईडी (PID) दिखाता है।\n* `taskkill`: हैंग हुए ऐप को तुरंत बंद कर देता है।",
      pro: "### ⚙️ सिस्टम टास्क ऑडिट और शेड्यूलिंग\nसक्रिय प्रक्रियाओं की निगरानी के लिए `tasklist` और प्रोसेस बंद करने के लिए `taskkill` उपयोग होता है। ऑटोमेशन शेड्यूल करने के लिए `schtasks` का उपयोग किया जाता है।"
    }
  }
];
