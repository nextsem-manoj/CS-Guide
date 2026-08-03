"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Terminal, Search, Copy, Check, Play, BookOpen, Shield, 
  Wifi, Cpu, ChevronRight, Sparkles, ArrowLeft, RefreshCw, Zap
} from "lucide-react";
import AdSenseBanner from "./AdSenseBanner";

export interface CmdCommandItem {
  id: string;
  command: string;
  category: "beginner" | "diagnostics" | "network" | "developer";
  title: string;
  description: {
    english: string;
    hinglish: string;
    hindi: string;
  };
  example: string;
  simulatedOutput: string;
  explanation: string;
  badgeText: string;
}

export const essentialCmdCommands: CmdCommandItem[] = [
  {
    id: "dir",
    command: "dir",
    category: "beginner",
    title: "1. View Directory ('dir')",
    description: {
      english: "Displays a list of files and subdirectories in the active directory.",
      hinglish: "Active folder ke saare files aur sub-folders ki list display karta hai.",
      hindi: "वर्तमान डायरेक्टरी में मौजूद सभी फाइलों और फोल्डरों की सूची प्रदर्शित करता है।"
    },
    example: "dir /p",
    simulatedOutput: ` Volume in drive C is WINDOWS\n Directory of C:\\Users\\Student\n\n08/03/2026  12:00 PM    <DIR>          Desktop\n08/03/2026  12:00 PM    <DIR>          Documents\n08/03/2026  12:00 PM             1,024 index.html\n               1 File(s)          1,024 bytes\n               2 Dir(s)  45,120,000,000 bytes free`,
    explanation: "Use 'dir /p' to pause screen after each page, or 'dir /w' for wide layout format.",
    badgeText: "Basic Navigation"
  },
  {
    id: "cd",
    command: "cd",
    category: "beginner",
    title: "2. Change Directory ('cd')",
    description: {
      english: "Changes the current working directory path or moves up one level using 'cd ..'.",
      hinglish: "Folder ke andar jaane ya 'cd ..' karke ek step peeche aane ke liye use hota hai.",
      hindi: "दूसरे फोल्डर में जाने या 'cd ..' का उपयोग करके पीछे जाने के लिए इसका उपयोग किया जाता है।"
    },
    example: "cd Desktop",
    simulatedOutput: "C:\\Users\\Student\\Desktop>",
    explanation: "Type 'cd \\' to jump straight back to the root partition C:\\.",
    badgeText: "Basic Navigation"
  },
  {
    id: "mkdir",
    command: "mkdir",
    category: "beginner",
    title: "3. Create a New Directory ('mkdir')",
    description: {
      english: "Creates a new directory (folder) under the active working path.",
      hinglish: "Naya folder banane ke liye `mkdir FolderName` command ka use karein.",
      hindi: "नया फोल्डर बनाने के लिए `mkdir FolderName` का उपयोग करें।"
    },
    example: "mkdir NextsemProjects",
    simulatedOutput: "Directory C:\\Users\\Student\\NextsemProjects created successfully.",
    explanation: "Remember the Zero-Space Rule: avoid spaces in folder names, use hyphens instead.",
    badgeText: "File & Directory"
  },
  {
    id: "ren",
    command: "ren",
    category: "beginner",
    title: "4. Rename a File ('ren')",
    description: {
      english: "Renames an existing file or directory to a new specified name.",
      hinglish: "Kisi bhi file ya folder ka naam badalne ke liye `ren old.txt new.txt` chalayein.",
      hindi: "फाइल या फोल्डर का नाम बदलने के लिए इसका उपयोग किया जाता है।"
    },
    example: "ren draft.txt final.txt",
    simulatedOutput: "File draft.txt successfully renamed to final.txt.",
    explanation: "You can also rename file extensions using wildcards like 'ren *.txt *.doc'.",
    badgeText: "File & Directory"
  },
  {
    id: "del",
    command: "del",
    category: "beginner",
    title: "5. Delete a File ('del')",
    description: {
      english: "Permanently deletes one or more specified files from storage.",
      hinglish: "Files ko permanently delete karta hai. Recycle Bin me nahi jaata!",
      hindi: "फाइलों को स्थायी रूप से हटाने के लिए इसका उपयोग किया जाता है।"
    },
    example: "del temp.log",
    simulatedOutput: "File temp.log deleted.",
    explanation: "Use 'del /f' to force delete read-only files, or 'del /q' for quiet mode.",
    badgeText: "File & Directory"
  },
  {
    id: "cls",
    command: "cls",
    category: "beginner",
    title: "6. Clear CMD Screen ('cls')",
    description: {
      english: "Clears all previous command outputs and text clutter from terminal window.",
      hinglish: "Command Prompt screen par pichhla saara text saaf kar deta hai.",
      hindi: "कमांड प्रॉम्प्ट की स्क्रीन पर लिखे सभी पिछले टेक्स्ट को साफ कर देता है।"
    },
    example: "cls",
    simulatedOutput: "C:\\Users\\Student>",
    explanation: "Keeps your active directory path intact while refreshing screen clarity.",
    badgeText: "Terminal Utility"
  },
  {
    id: "exit",
    command: "exit",
    category: "beginner",
    title: "7. Exit CMD ('exit')",
    description: {
      english: "Terminates and closes the active Command Prompt session.",
      hinglish: "Command Prompt window ko instantly close kar deta hai.",
      hindi: "कमांड प्रॉम्प्ट विंडो को तुरंत बंद कर देता है।"
    },
    example: "exit",
    simulatedOutput: "[Process exited]",
    explanation: "Closes the CMD.EXE process immediately.",
    badgeText: "Terminal Utility"
  },
  {
    id: "help",
    command: "help",
    category: "beginner",
    title: "8. CMD Built-in Help ('help')",
    description: {
      english: "Displays list of all native CMD commands or detailed help for a specific command.",
      hinglish: "CMD me available saari commands ki list aur syntax manual dikhata hai.",
      hindi: "सभी उपलब्ध कमांड की सूची या किसी विशेष कमांड का निर्देश मैनुअल दिखाता है।"
    },
    example: "help dir",
    simulatedOutput: "Displays a list of files and subdirectories in a directory.\n\nDIR [drive:][path][filename] [/P] [/W] [/A[[:]attributes]] [/O[[:]sortorder]]",
    explanation: "Type 'help [command]' to read syntax parameters for any utility.",
    badgeText: "Terminal Utility"
  },
  {
    id: "time",
    command: "time",
    category: "beginner",
    title: "9. View System Time ('time')",
    description: {
      english: "Displays or allows configuration of active Windows system clock time.",
      hinglish: "System ka current time print karta hai aur new time set karne ka option deta hai.",
      hindi: "सिस्टम का वर्तमान समय दिखाता है।"
    },
    example: "time /t",
    simulatedOutput: "The current time is: 12:04:15.82\nEnter new time: ",
    explanation: "Use 'time /t' to display time without being prompted to change it.",
    badgeText: "System Information"
  },
  {
    id: "copy",
    command: "copy",
    category: "beginner",
    title: "10. Copy File ('copy')",
    description: {
      english: "Duplicates files from one location or filename to another.",
      hinglish: "File ki duplicate copy doosri jagah ya doosre naam se save karta hai.",
      hindi: "किसी फाइल की दूसरी प्रतिलिपि बनाने के लिए उपयोग किया जाता है।"
    },
    example: "copy index.html backup.html",
    simulatedOutput: "        1 file(s) copied.",
    explanation: "To copy entire directory trees with subfolders, use 'xcopy' or 'robocopy'.",
    badgeText: "File & Directory"
  },
  {
    id: "sfc",
    command: "sfc /scannow",
    category: "diagnostics",
    title: "11. System File Checker ('sfc /scannow')",
    description: {
      english: "Scans all protected Windows system files and replaces corrupted files with fresh copies.",
      hinglish: "Windows ki corrupt system files ko scan karke automatically repair karta hai.",
      hindi: "विंडोज की खराब सिस्टम फाइलों को स्कैन और ठीक करता है।"
    },
    example: "sfc /scannow",
    simulatedOutput: "Beginning system scan. This process will take some time.\n\nVerification 100% complete.\nWindows Resource Protection found corrupt files and successfully repaired them.",
    explanation: "Requires Administrator privileges (Run CMD as Administrator).",
    badgeText: "System Diagnostic"
  },
  {
    id: "chkdsk",
    command: "chkdsk",
    category: "diagnostics",
    title: "12. Check Disk Errors ('chkdsk')",
    description: {
      english: "Verifies file system integrity and scans storage drives for physical bad sectors.",
      hinglish: "Hard drive aur SSD ke sectors me kisi bhi file system error ko check karta hai.",
      hindi: "हार्ड डिस्क की खामियों और फाइल सिस्टम की जांच करता है।"
    },
    example: "chkdsk C: /f /r",
    simulatedOutput: "The type of the file system is NTFS.\nVolume label is OS.\n\nStage 1: Examining basic file system structure...\nStage 2: Examining file name linkage...\nWindows has scanned the file system and found no problems.",
    explanation: "Use '/f' to fix errors and '/r' to recover readable information from bad sectors.",
    badgeText: "Disk Utility"
  },
  {
    id: "tasklist",
    command: "tasklist",
    category: "diagnostics",
    title: "13. View Running Processes ('tasklist')",
    description: {
      english: "Displays a complete list of currently running processes along with Process IDs (PIDs).",
      hinglish: "Background aur foreground me chalne waale saare programs aur PIDs ki list dikhata hai.",
      hindi: "वर्तमान में चल रहे सभी प्रोग्राम और उनके PID दिखाता है।"
    },
    example: "tasklist",
    simulatedOutput: "Image Name                   PID Session Name        Session#    Mem Usage\n========================= ======== ================ =========== ============\nSystem Idle Process              0 Services                   0          8 K\nexplorer.exe                  3412 Console                    1    124,512 K\nchrome.exe                    8924 Console                    1    345,120 K",
    explanation: "Use 'tasklist /v' for verbose output showing memory consumption and window titles.",
    badgeText: "Process Manager"
  },
  {
    id: "taskkill",
    command: "taskkill",
    category: "diagnostics",
    title: "14. Terminate Process ('taskkill')",
    description: {
      english: "Forcefully terminates unresponsive or hanging processes using PID or image name.",
      hinglish: "Hangs hone waale apps ko unke PID ya naam se turant band karta hai.",
      hindi: "किसी भी प्रक्रिया या ऐप को तुरंत बंद कर देता है।"
    },
    example: "taskkill /PID 8924 /F",
    simulatedOutput: "SUCCESS: The process with PID 8924 has been terminated.",
    explanation: "Use '/F' to force termination and '/IM chrome.exe' to kill by application name.",
    badgeText: "Process Manager"
  },
  {
    id: "shutdown",
    command: "shutdown",
    category: "diagnostics",
    title: "15. System Shutdown Controls ('shutdown')",
    description: {
      english: "Shuts down, restarts, or logs off local and remote computers with delay timers.",
      hinglish: "PC ko timer ke saath shutdown (`/s`) ya restart (`/r`) karne ke liye chalayein.",
      hindi: "कंप्यूटर को शटडाउन या रीस्टार्ट करने के लिए उपयोग किया जाता है।"
    },
    example: "shutdown /s /t 60",
    simulatedOutput: "Windows will shut down in 60 seconds.",
    explanation: "Type 'shutdown /a' to abort a scheduled shutdown.",
    badgeText: "Power Utility"
  },
  {
    id: "ipconfig",
    command: "ipconfig",
    category: "network",
    title: "16. Network IP Configuration ('ipconfig')",
    description: {
      english: "Displays IPv4/IPv6 addresses, subnet mask, default gateway, and clears DNS resolver cache.",
      hinglish: "Aapke computer ka IP address dikhata hai aur 'ipconfig /flushdns' se cache saaf karta hai.",
      hindi: "सिस्टम का IP एड्रेस और नेटवर्क कॉन्फ़िगरेशन दिखाता है।"
    },
    example: "ipconfig /flushdns",
    simulatedOutput: "Windows IP Configuration\n\nSuccessfully flushed the DNS Resolver Cache.",
    explanation: "Use 'ipconfig /all' to view detailed network adapter info including MAC addresses.",
    badgeText: "Network Diagnostic"
  },
  {
    id: "ping",
    command: "ping",
    category: "network",
    title: "17. Test Network Connection ('ping')",
    description: {
      english: "Sends ICMP echo requests to verify network reachability and measure round-trip latency.",
      hinglish: "Server se connection status aur network speed/latency test karne ke liye use karein.",
      hindi: "इंटरनेट कनेक्टिविटी और सर्वर की स्पीड जांचने के लिए इस्तेमाल होता है।"
    },
    example: "ping google.com",
    simulatedOutput: "Pinging google.com [142.250.190.46] with 32 bytes of data:\nReply from 142.250.190.46: bytes=32 time=14ms TTL=117\nReply from 142.250.190.46: bytes=32 time=12ms TTL=117\n\nPing statistics for 142.250.190.46:\n    Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)",
    explanation: "Use 'ping -t google.com' for continuous ping testing (press Ctrl+C to cancel).",
    badgeText: "Network Diagnostic"
  },
  {
    id: "netstat",
    command: "netstat",
    category: "network",
    title: "18. Active Network Connections ('netstat')",
    description: {
      english: "Displays active TCP connections, listening ports, and ethernet traffic statistics.",
      hinglish: "Active internet connections aur listening open ports ki list check karne ke liye.",
      hindi: "सक्रिय नेटवर्क कनेक्शन और खुले पोर्ट दिखाता है।"
    },
    example: "netstat -a",
    simulatedOutput: "Active Connections\n\n  Proto  Local Address          Foreign Address        State\n  TCP    192.168.1.5:51204      142.250.190.46:443     ESTABLISHED\n  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING",
    explanation: "Use 'netstat -ano' to show process IDs (PIDs) associated with active connections.",
    badgeText: "Network Security"
  },
  {
    id: "tracert",
    command: "tracert",
    category: "network",
    title: "19. Trace Route Hops ('tracert')",
    description: {
      english: "Traces packet path to a remote server, displaying every intermediate router hop and latency.",
      hinglish: "Packets ke destination tak pahunchne ke saare routers aur hops ka rasta trace karta hai.",
      hindi: "नेटवर्क पैकेट के सर्वर तक पहुंचने के रास्ते (रूट) को दिखाता है।"
    },
    example: "tracert nextsem.online",
    simulatedOutput: "Tracing route to nextsem.online [199.36.158.100]\nover a maximum of 30 hops:\n\n  1     2 ms     1 ms     1 ms  192.168.1.1\n  2    12 ms    10 ms    11 ms  10.240.0.1\n  3    24 ms    22 ms    23 ms  199.36.158.100\n\nTrace complete.",
    explanation: "Ideal for isolating exactly which router or ISP link is causing network drops.",
    badgeText: "Network Diagnostic"
  },
  {
    id: "wifi_pass",
    command: "netsh wlan show profile",
    category: "network",
    title: "20. View Saved Wi-Fi Passwords ('netsh')",
    description: {
      english: "Displays all saved Wi-Fi profiles and exports security keys in plain text.",
      hinglish: "System me pehle se saved Wi-Fi networks ke passwords cleartext me dikhata hai.",
      hindi: "सेव किए गए वाई-फाई के पासवर्ड दिखाता है।"
    },
    example: "netsh wlan show profile name=\"HomeWiFi\" key=clear",
    simulatedOutput: "Profile HomeWiFi on interface Wi-Fi:\n=======================================================================\nKey Content            : MySecretPassword123",
    explanation: "Use 'key=clear' to unhide the plain text security key under Key Content.",
    badgeText: "Wi-Fi Security"
  },
  {
    id: "net_user",
    command: "net user",
    category: "developer",
    title: "21. Manage User Accounts ('net user')",
    description: {
      english: "Lists, creates, modifies, or resets passwords for Windows local user accounts.",
      hinglish: "System user accounts dikhata hai aur new users ya passwords manage karta hai.",
      hindi: "यूजर अकाउंट की जानकारी और पासवर्ड मैनेज करता है।"
    },
    example: "net user Student *",
    simulatedOutput: "User name                    Student\nFull Name                    Nextsem Student\nAccount active               Yes\nLocal Group Memberships      *Users                 *Administrators",
    explanation: "Type 'net user [Username] *' to change account password safely without echoing text.",
    badgeText: "System Admin"
  },
  {
    id: "redirection",
    command: "dir > filename.txt",
    category: "developer",
    title: "22. Save CMD Output to File ('>')",
    description: {
      english: "Redirects command execution output away from screen into a text log file.",
      hinglish: "Terminal ka output screen par dikhane ke bajaye `.txt` file me save karta hai.",
      hindi: "कमांड के आउटपुट को किसी टेक्स्ट फाइल में सेव करता है।"
    },
    example: "dir > folder-list.txt",
    simulatedOutput: "Output redirected to folder-list.txt",
    explanation: "Use '>' to overwrite a file, and '>>' to append lines to the bottom of an existing file.",
    badgeText: "Scripting & Logs"
  },
  {
    id: "attrib",
    command: "attrib",
    category: "developer",
    title: "23. File Attributes & Locks ('attrib')",
    description: {
      english: "Sets or removes Read-Only (+r/-r), Hidden (+h/-h), and System (+s/-s) attributes.",
      hinglish: "File ko Hide (`+h`) ya Read-Only (`+r`) karne ke liye use hota hai.",
      hindi: "फाइल को छिपाने (+h) या लॉक (+r) करने के लिए इस्तेमाल होता है।"
    },
    example: "attrib +h +r secret.txt",
    simulatedOutput: "Attributes set: Hidden (+H), Read-Only (+R) on secret.txt",
    explanation: "Type 'attrib -h -r secret.txt' to unhide and unlock the file.",
    badgeText: "Security & Locks"
  },
  {
    id: "tree",
    command: "tree",
    category: "developer",
    title: "24. Graphical Directory Tree ('tree')",
    description: {
      english: "Renders a visual hierarchical tree diagram of all subdirectories.",
      hinglish: "Folders aur sub-folders ka clean tree diagram print karta hai.",
      hindi: "डायरेक्टरी की सभी शाखाओं का ट्री आरेख दिखाता है।"
    },
    example: "tree /f",
    simulatedOutput: "Folder PATH list\nVolume serial number is 0042-4286\nC:.\n├───Desktop\n│   └───index.html\n└───Documents",
    explanation: "Use 'tree /f' to include files inside every folder in the graphical diagram.",
    badgeText: "Visual Exploration"
  },
  {
    id: "systeminfo",
    command: "systeminfo",
    category: "diagnostics",
    title: "25. System Information Overview ('systeminfo')",
    description: {
      english: "Fetches complete OS build details, BIOS version, RAM specifications, and installed hotfixes.",
      hinglish: "PC ki poori hardware specs, OS version aur BIOS details ek jagah print karta hai.",
      hindi: "सिस्टम की पूरी हार्डवेयर और सॉफ्टवेयर जानकारी दिखाता है।"
    },
    example: "systeminfo",
    simulatedOutput: "Host Name:                 NEXTSEM-PC\nOS Name:                   Microsoft Windows 11 Pro\nOS Version:                10.0.22621 N/A Build 22621\nSystem Manufacturer:       Dell Inc.\nTotal Physical Memory:     16,284 MB\nHotfix(s):                 4 Hotfix(s) Installed.",
    explanation: "Great for checking total RAM size, virtual machine status, and system boot time.",
    badgeText: "Hardware & OS"
  }
];

export default function EssentialCmdCommandsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLang, setSelectedLang] = useState<"english" | "hinglish" | "hindi">("hinglish");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Terminal Simulator State
  const [activeSimCommand, setActiveSimCommand] = useState<CmdCommandItem>(essentialCmdCommands[0]);
  const [simOutput, setSimOutput] = useState<string>(essentialCmdCommands[0].simulatedOutput);
  const [isSimRunning, setIsSimRunning] = useState(false);

  const filteredCommands = essentialCmdCommands.filter((item) => {
    const matchesSearch = 
      item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.hinglish.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const runSimulation = (cmdItem: CmdCommandItem) => {
    setActiveSimCommand(cmdItem);
    setIsSimRunning(true);
    setSimOutput("Executing command in Windows Command Prompt...\n");
    setTimeout(() => {
      setSimOutput(cmdItem.simulatedOutput);
      setIsSimRunning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 py-6 px-3 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <Link
            href="/cli"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to CLI Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Language:</span>
            {(["english", "hinglish", "hindi"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold capitalize transition-all cursor-pointer ${
                  selectedLang === lang
                    ? "bg-[#04AA6D] text-white shadow-md"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Title & Author Attribution */}
        <div className="text-center space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c1a648]/10 border border-[#c1a648]/30 text-[#c1a648] text-xs font-extrabold shadow-inner">
            <Sparkles size={14} />
            <span>2026 Developer Handbook</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Most Useful & Essential CMD Commands in ⊞ Windows
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the most powerful 🪟 Windows Command Prompt (CMD) commands used by software engineers, system administrators, and cybersecurity professionals daily.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full">
              👨‍💻 Author: <strong className="text-white">Er. Manoj Kumar</strong>
            </span>
            <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full font-bold">
              ✓ Tested on Windows 11
            </span>
          </div>
        </div>

        {/* Interactive Windows CMD Live Simulator Box */}
        <div className="bg-[#0b101c] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl space-y-0">
          <div className="bg-[#151c2e] px-4 py-2.5 border-b border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono font-bold text-slate-200 ml-2">
                ⊞ Command Prompt — Live Terminal Sandbox
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded">
              Active: {activeSimCommand.example}
            </span>
          </div>

          <div className="p-4 sm:p-6 bg-black/80 font-mono text-xs sm:text-sm text-emerald-400 min-h-[160px] max-h-[260px] overflow-y-auto leading-relaxed shadow-inner">
            <div className="text-slate-400 mb-2">
              Microsoft Windows [Version 10.0.22621.1702]<br />
              (c) Microsoft Corporation. All rights reserved.
            </div>
            <div className="text-white font-bold flex items-center gap-2 my-2">
              <span>C:\Users\Student&gt;</span>
              <span className="text-emerald-400">{activeSimCommand.example}</span>
              {isSimRunning && <RefreshCw size={14} className="animate-spin text-emerald-400 ml-2" />}
            </div>
            <pre className="text-slate-300 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed mt-2 border-t border-slate-800/80 pt-2">
              {simOutput}
            </pre>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CMD commands (e.g. dir, sfc, ipconfig, wifi)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-[#04AA6D] focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All Commands (25)", icon: Terminal },
              { id: "beginner", label: "Beginner Essentials (10)", icon: Zap },
              { id: "diagnostics", label: "System Diagnostics (7)", icon: Shield },
              { id: "network", label: "Network & Wi-Fi (5)", icon: Wifi },
              { id: "developer", label: "Developer & Admin (4)", icon: Cpu }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#04AA6D] text-white shadow-md shadow-[#04AA6D]/20"
                      : "bg-slate-950 border border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Commands Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCommands.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl shadow-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-950 border border-slate-800 text-[#c1a648] px-2.5 py-1 rounded-full shrink-0">
                    {item.badgeText}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description[selectedLang]}
                </p>

                {/* Example Syntax Box */}
                <div className="bg-[#0b101c] p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2 font-mono text-xs shadow-inner">
                  <div className="flex items-center gap-2 overflow-x-auto text-emerald-400 font-bold">
                    <span>C:\&gt;</span>
                    <span>{item.example}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(item.example, item.id)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                    title="Copy command"
                  >
                    {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  💡 <strong className="text-slate-300">Note:</strong> {item.explanation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => runSimulation(item)}
                  className="px-3.5 py-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play size={13} className="fill-emerald-300" />
                  <span>Run in Simulator</span>
                </button>

                <button
                  onClick={() => handleCopy(item.example, item.id)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Banner Integration */}
        <AdSenseBanner />

        {/* Bottom Callout & Practice Checklist */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0c1328] to-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl text-center space-y-4">
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Ready to Master Windows CLI Architecture?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Continue learning terminal operations, drive letter swapping, wildcards, and batch scripting with Nextsem Academy free interactive lessons.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/cli"
              className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white text-xs font-extrabold rounded-xl shadow-lg shadow-[#04AA6D]/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Start Interactive CLI Lessons »</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
