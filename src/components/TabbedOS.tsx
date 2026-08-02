"use client";

import React, { useState, useEffect, useRef } from "react";
import { Monitor, Laptop, HelpCircle, Folder, File, ArrowRight, RefreshCw, Trash2, Command, Play } from "lucide-react";

type OSTab = "windows" | "linux" | "mac";

interface FolderItem {
  id: string;
  name: string;
  parentId: string | null;
}

interface FileItem {
  id: string;
  name: string;
  parentId: string;
  isReadOnly?: boolean;
  isHidden?: boolean;
  content?: string;
}

export default function TabbedOS() {
  const [activeTab, setActiveTab] = useState<OSTab>("windows");
  const [activeMode, setActiveMode] = useState<"terminal" | "dragdrop">("terminal");
  
  // Terminal simulator state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Microsoft Windows [Version 10.0.22621.1702]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "Type command 'mkdir Nextsem' to begin creating your folder tree...",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [currentDir, setCurrentDir] = useState("Desktop");
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [promptTemplate, setPromptTemplate] = useState("$P$G");
  const [currentDrive, setCurrentDrive] = useState<string>("C");
  
  // Folder tree simulation state
  const [folders, setFolders] = useState<FolderItem[]>([
    { id: "c-root", name: "C-Root", parentId: null },
    { id: "c-windows", name: "Windows", parentId: "c-root" },
    { id: "c-sys32", name: "system32", parentId: "c-windows" },
    { id: "c-progfiles", name: "Program Files", parentId: "c-root" },
    { id: "c-progfiles86", name: "Program Files (x86)", parentId: "c-root" },
    { id: "c-progdata", name: "ProgramData", parentId: "c-root" },
    { id: "c-users", name: "Users", parentId: "c-root" },
    { id: "c-student", name: "Student", parentId: "c-users" },
    { id: "c-admin", name: "Administrator", parentId: "c-users" },
    { id: "c-desktop", name: "Desktop", parentId: "c-student" },
    { id: "c-docs", name: "Documents", parentId: "c-student" },
    { id: "c-downloads", name: "Downloads", parentId: "c-student" },
    { id: "c-pics", name: "Pictures", parentId: "c-student" },
    { id: "d-root", name: "D-Root", parentId: null },
    { id: "d-backups", name: "backups", parentId: "d-root" },
    { id: "d-software", name: "software", parentId: "d-root" },
    { id: "f-root", name: "F-Root", parentId: null },
    { id: "f-shared", name: "shared-docs", parentId: "f-root" }
  ]);

  // File tree simulation state
  const [files, setFiles] = useState<FileItem[]>([
    { id: "c-hosts", name: "hosts", parentId: "c-sys32", content: "127.0.0.1 nextsem.online" },
    { id: "c-license", name: "license.txt", parentId: "c-progfiles", content: "Microsoft Software License Terms" },
    { id: "d-log", name: "backup-log.txt", parentId: "d-root", content: "backup completed successfully" },
    { id: "f-readme", name: "readme.txt", parentId: "f-root", content: "F: drive network share partition" }
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Load simulator state from localStorage on client-side mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFolders = localStorage.getItem("nextsem_sim_folders");
      const savedFiles = localStorage.getItem("nextsem_sim_files");
      const savedDir = localStorage.getItem("nextsem_sim_currentDir");
      const savedHistory = localStorage.getItem("nextsem_sim_history");
      const savedPrompt = localStorage.getItem("nextsem_sim_promptTemplate");
      const savedDrive = localStorage.getItem("nextsem_sim_currentDrive");

      if (savedFolders) {
        try { setFolders(JSON.parse(savedFolders)); } catch (e) {}
      }
      if (savedFiles) {
        try { setFiles(JSON.parse(savedFiles)); } catch (e) {}
      }
      if (savedDir) {
        setCurrentDir(savedDir);
      }
      if (savedHistory) {
        try { setTerminalHistory(JSON.parse(savedHistory)); } catch (e) {}
      }
      if (savedPrompt) {
        setPromptTemplate(savedPrompt);
      }
      if (savedDrive) {
        setCurrentDrive(savedDrive);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nextsem_sim_folders", JSON.stringify(folders));
  }, [folders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nextsem_sim_files", JSON.stringify(files));
  }, [files, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nextsem_sim_currentDir", currentDir);
  }, [currentDir, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nextsem_sim_history", JSON.stringify(terminalHistory));
  }, [terminalHistory, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nextsem_sim_promptTemplate", promptTemplate);
  }, [promptTemplate, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nextsem_sim_currentDrive", currentDrive);
  }, [currentDrive, isLoaded]);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const getPromptString = () => {
    let template = promptTemplate;
    
    const pathParts: string[] = [];
    const folderObj = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
    let tempId: string | null = folderObj ? folderObj.id : (currentDrive === "C" ? "c-desktop" : `${currentDrive.toLowerCase()}-root`);
    while (tempId) {
      const folder = folders.find(f => f.id === tempId);
      if (folder) {
        if (folder.id !== "c-root" && folder.id !== "d-root" && folder.id !== "f-root") {
          pathParts.unshift(folder.name);
        }
        tempId = folder.parentId;
      } else {
        break;
      }
    }
    
    const currentPath = currentDrive === "C"
      ? `C:\\` + pathParts.join("\\")
      : `${currentDrive}:\\` + pathParts.join("\\");
    
    // Replace $P or $p with currentPath
    template = template.replace(/\$P/gi, currentPath);
    // Replace $G or $g with >
    template = template.replace(/\$G/gi, ">");
    // Replace $S or $s with space
    template = template.replace(/\$S/gi, " ");
    // Replace $$ with $
    template = template.replace(/\$\$/g, "$");
    
    return template;
  };

  // Terminal commands interpreter
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    // Track command history
    setCommandHistoryList(prev => {
      const next = [...prev, cmd];
      setHistoryPointer(next.length);
      return next;
    });

    const parts = cmd.split(" ");
    let action = "";
    let arg = "";
    
    // Normalize cd.. and cd\ shortcuts, and drive switching commands
    const cmdLower = cmd.toLowerCase();
    if (cmdLower === "cd..") {
      action = "cd";
      arg = "..";
    } else if (cmdLower.startsWith("cd..\\")) {
      action = "cd";
      arg = cmd.slice(4);
    } else if (cmdLower === "cd\\") {
      action = "cd";
      arg = "\\";
    } else if (cmdLower.startsWith("cd\\")) {
      action = "cd";
      arg = cmd.slice(3);
    } else {
      action = parts[0].toLowerCase();
      arg = parts[1];
    }

    const activeRootId = currentDrive === "C" ? "c-desktop" : `${currentDrive.toLowerCase()}-root`;

    let output = "";
    const promptPrefix = getPromptString();
    const newHistory = [...terminalHistory, `${promptPrefix} ${cmd}`];

    // Check for drive switches (e.g. D: or C:)
    if (action.match(/^[a-z]:$/i)) {
      const driveLetter = action[0].toUpperCase();
      setCurrentDrive(driveLetter);
      setCurrentDir(driveLetter === "C" ? "Desktop" : `${driveLetter}-Root`);
      output = "";
    } else if (cmd.includes(">")) {
      const isAppend = cmd.includes(">>");
      const delimiter = isAppend ? ">>" : ">";
      const redirectParts = cmd.split(delimiter);
      const leftHand = redirectParts[0].trim();
      const filename = redirectParts[1].trim();
      
      if (filename.includes(" ")) {
        output = "❌ Error: Space detected in filename! Remember the 'Zero-Space Rule'—use hyphens.";
      } else {
        const text = leftHand.toLowerCase().startsWith("echo ") ? leftHand.slice(5).replace(/['"]/g, "") : "";
        
        // Find current folder ID
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        const parentId = parentFolder ? parentFolder.id : activeRootId;
        
        const existingFile = files.find(f => f.name.toLowerCase() === filename.toLowerCase() && f.parentId === parentId);
        
        if (existingFile) {
          if (existingFile.isReadOnly) {
            output = "❌ Access is denied (File is Read-Only).";
          } else {
            const updatedText = isAppend ? (existingFile.content || "") + "\n" + text : text;
            setFiles(prev => prev.map(f => f.id === existingFile.id ? { ...f, content: updatedText } : f));
            output = `Successfully updated file '${filename}'.`;
          }
        } else {
          const newId = `file-${Date.now()}`;
          setFiles(prev => [...prev, { id: newId, name: filename, parentId, content: text }]);
          output = `Successfully created file '${filename}'.`;
        }
      }
    } else if (action === "echo") {
      if (!arg) {
        output = "ECHO is on.";
      } else {
        output = cmd.slice(5).replace(/['"]/g, "");
      }
    } else if (action === "type") {
      if (!arg) {
        output = "The syntax of the command is incorrect.";
      } else {
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        const parentId = parentFolder ? parentFolder.id : activeRootId;
        const fileObj = files.find(f => f.name.toLowerCase() === arg.toLowerCase() && f.parentId === parentId);
        
        if (!fileObj) {
          output = `The system cannot find the file specified: '${arg}'`;
        } else {
          output = fileObj.content || "";
        }
      }
    } else if (action === "mkdir") {
      if (!arg) {
        output = "Error: Please specify a folder name. Example: mkdir Nextsem";
      } else if (arg.includes(" ")) {
        output = "❌ Error: Space detected! Remember the 'Zero-Space Rule'—use hyphens.";
      } else {
        // Support backslash folder path splitting: Nextsem\Week-1
        const pathParts = arg.split("\\");
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        let parentId = parentFolder ? parentFolder.id : activeRootId;
        let createdAny = false;
        const activeFolders = [...folders];

        for (const part of pathParts) {
          if (!part) continue;
          const exists = activeFolders.find(f => f.name.toLowerCase() === part.toLowerCase() && f.parentId === parentId);
          if (exists) {
            parentId = exists.id;
          } else {
            const newId = `folder-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            activeFolders.push({ id: newId, name: part, parentId });
            parentId = newId;
            createdAny = true;
          }
        }

        if (createdAny) {
          setFolders(activeFolders);
          output = `Successfully created directory path '${arg}' inside ${currentDir}.`;
        } else {
          output = `Directory path '${arg}' already exists.`;
        }
      }
    } else if (action === "cd") {
      if (!arg) {
        const pathParts: string[] = [];
        const folderObj = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        let tempId: string | null = folderObj ? folderObj.id : activeRootId;
        while (tempId) {
          const folder = folders.find(f => f.id === tempId);
          if (folder) {
            if (folder.id !== "c-root" && folder.id !== "d-root" && folder.id !== "f-root") {
              pathParts.unshift(folder.name);
            }
            tempId = folder.parentId;
          } else {
            break;
          }
        }
        output = currentDrive === "C" ? "C:\\" + pathParts.join("\\") : `${currentDrive}:\\` + pathParts.join("\\");
      } else if (arg === "..") {
        const curFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        if (curFolder && curFolder.parentId) {
          const parentFolder = folders.find(f => f.id === curFolder.parentId);
          if (parentFolder) {
            setCurrentDir(parentFolder.name);
            output = `Changed directory to ${parentFolder.name}`;
          }
        } else {
          output = `Already at root of drive ${currentDrive}:\\`;
        }
      } else {
        // Support backslash path traversing: Nextsem\Week-1 or ..\Nextsem
        const isAbsolute = arg.startsWith("\\");
        const pathParts = arg.split("\\");
        
        let parentId = "";
        if (isAbsolute) {
          parentId = currentDrive === "C" ? "c-root" : `${currentDrive.toLowerCase()}-root`;
        } else {
          const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
          parentId = parentFolder ? parentFolder.id : activeRootId;
        }
        
        let finalDirName = isAbsolute ? (currentDrive === "C" ? "C-Root" : `${currentDrive}-Root`) : currentDir;
        let success = true;

        for (const part of pathParts) {
          if (!part) continue;
          if (part === "..") {
            const currentFolderObj = folders.find(f => f.id === parentId);
            if (currentFolderObj && currentFolderObj.parentId) {
              const parentObj = folders.find(f => f.id === currentFolderObj.parentId);
              if (parentObj) {
                parentId = parentObj.id;
                finalDirName = parentObj.name;
              }
            } else {
              parentId = currentDrive === "C" ? "c-root" : `${currentDrive.toLowerCase()}-root`;
              finalDirName = currentDrive === "C" ? "C-Root" : `${currentDrive}-Root`;
            }
          } else {
            const exists = folders.find(f => f.name.toLowerCase() === part.toLowerCase() && f.parentId === parentId);
            if (exists) {
              parentId = exists.id;
              finalDirName = exists.name;
            } else {
              success = false;
              break;
            }
          }
        }

        if (success) {
          setCurrentDir(finalDirName);
          output = `Changed directory to ${finalDirName}`;
        } else {
          output = `Error: The system cannot find the path specified: '${arg}'`;
        }
      }
    } else if (action === "ls" || action === "dir") {
      const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
      const parentId = parentFolder ? parentFolder.id : activeRootId;
      
      const childrenFolders = folders.filter(f => f.parentId === parentId);
      const childrenFiles = files.filter(f => f.parentId === parentId && !f.isHidden);
      
      if (childrenFolders.length === 0 && childrenFiles.length === 0) {
        output = "Directory is empty.";
      } else {
        const foldersList = childrenFolders.map(c => `📁 ${c.name}`).join("   ");
        const filesList = childrenFiles.map(c => `📄 ${c.name}`).join("   ");
        output = [foldersList, filesList].filter(Boolean).join("   ");
      }
    } else if (action === "attrib") {
      if (!arg || !parts[2]) {
        output = "Usage: attrib [+r|-r|+h|-h] <filename>";
      } else {
        const flag = arg.toLowerCase();
        const filename = parts[2];
        
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        const parentId = parentFolder ? parentFolder.id : activeRootId;
        
        const fileIndex = files.findIndex(f => f.name.toLowerCase() === filename.toLowerCase() && f.parentId === parentId);
        
        if (fileIndex === -1) {
          output = `File '${filename}' not found inside ${currentDir}.`;
        } else {
          const updatedFiles = [...files];
          if (flag === "+r") {
            updatedFiles[fileIndex].isReadOnly = true;
            output = `Set Read-Only attribute on '${filename}'.`;
          } else if (flag === "-r") {
            updatedFiles[fileIndex].isReadOnly = false;
            output = `Removed Read-Only attribute from '${filename}'.`;
          } else if (flag === "+h") {
            updatedFiles[fileIndex].isHidden = true;
            output = `Set Hidden attribute on '${filename}'.`;
          } else if (flag === "-h") {
            updatedFiles[fileIndex].isHidden = false;
            output = `Removed Hidden attribute from '${filename}'.`;
          } else {
            output = `Flag '${flag}' not recognized. Use +r, -r, +h, or -h.`;
          }
          setFiles(updatedFiles);
        }
      }
    } else if (action === "copy" || action === "move") {
      const src = parts[1];
      const dest = parts[2];
      
      if (!src || !dest) {
        output = `Usage: ${action} <source_file> <destination_file_or_folder>`;
      } else {
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        const parentId = parentFolder ? parentFolder.id : activeRootId;
        
        const sourceFile = files.find(f => f.name.toLowerCase() === src.toLowerCase() && f.parentId === parentId);
        
        if (!sourceFile) {
          output = `Error: Source file '${src}' not found inside ${currentDir}.`;
        } else {
          const destFolder = folders.find(f => f.name.toLowerCase() === dest.toLowerCase() && f.parentId === parentId);
          
          if (destFolder) {
            if (action === "copy") {
              const newId = `file-${Date.now()}`;
              setFiles(prev => [...prev, { ...sourceFile, id: newId, parentId: destFolder.id }]);
              output = `Copied file '${src}' into folder '${dest}'.`;
            } else {
              if (sourceFile.isReadOnly) {
                output = "❌ Access is denied (File is Read-Only).";
              } else {
                setFiles(prev => prev.map(f => f.id === sourceFile.id ? { ...f, parentId: destFolder.id } : f));
                output = `Moved file '${src}' into folder '${dest}'.`;
              }
            }
          } else {
            if (action === "copy") {
              const newId = `file-${Date.now()}`;
              setFiles(prev => [...prev, { ...sourceFile, id: newId, name: dest }]);
              output = `Copied file '${src}' to '${dest}'.`;
            } else {
              if (sourceFile.isReadOnly) {
                output = "❌ Access is denied (File is Read-Only).";
              } else {
                setFiles(prev => prev.map(f => f.id === sourceFile.id ? { ...f, name: dest } : f));
                output = `Moved/Renamed file '${src}' to '${dest}'.`;
              }
            }
          }
        }
      }
    } else if (action === "del") {
      if (!arg) {
        output = "Usage: del <filename>";
      } else {
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        const parentId = parentFolder ? parentFolder.id : activeRootId;
        
        const fileToDelete = files.find(f => f.name.toLowerCase() === arg.toLowerCase() && f.parentId === parentId);
        
        if (!fileToDelete) {
          output = `File '${arg}' not found inside ${currentDir}.`;
        } else if (fileToDelete.isReadOnly) {
          output = "❌ Access is denied (File is Read-Only).";
        } else {
          setFiles(prev => prev.filter(f => f.id !== fileToDelete.id));
          output = `Deleted file '${arg}'.`;
        }
      }
    } else if (action === "ren" || action === "rename") {
      const oldName = parts[1];
      const newName = parts[2];
      
      if (!oldName || !newName) {
        output = "Usage: ren <oldname> <newname>";
      } else {
        const parentFolder = folders.find(f => f.name.toLowerCase() === currentDir.toLowerCase());
        const parentId = parentFolder ? parentFolder.id : activeRootId;
        
        const fileTarget = files.find(f => f.name.toLowerCase() === oldName.toLowerCase() && f.parentId === parentId);
        const folderTarget = folders.find(f => f.name.toLowerCase() === oldName.toLowerCase() && f.parentId === parentId);
        
        if (!fileTarget && !folderTarget) {
          output = `Error: Object '${oldName}' not found inside ${currentDir}.`;
        } else if (fileTarget) {
          if (fileTarget.isReadOnly) {
            output = "❌ Access is denied (File is Read-Only).";
          } else {
            setFiles(prev => prev.map(f => f.id === fileTarget.id ? { ...f, name: newName } : f));
            output = `Renamed file '${oldName}' to '${newName}'.`;
          }
        } else if (folderTarget) {
          setFolders(prev => prev.map(f => f.id === folderTarget.id ? { ...f, name: newName } : f));
          output = `Renamed folder '${oldName}' to '${newName}'.`;
        }
      }
    } else if (action === "ipconfig") {
      output = "Windows IP Configuration\n\nEthernet adapter Ethernet0:\n   Connection-specific DNS Suffix  . : local\n   IPv4 Address. . . . . . . . . . . : 192.168.1.104\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1";
    } else if (action === "ping") {
      if (!arg) {
        output = "Usage: ping <host_or_ip>";
      } else {
        output = `Pinging ${arg} with 32 bytes of data:\nReply from 104.244.42.1: bytes=32 time=14ms TTL=54\nReply from 104.244.42.1: bytes=32 time=12ms TTL=54\nReply from 104.244.42.1: bytes=32 time=15ms TTL=54\nReply from 104.244.42.1: bytes=32 time=13ms TTL=54\n\nPing statistics for ${arg}:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`;
      }
    } else if (action === "net") {
      const subAction = parts[1]?.toLowerCase();
      if (subAction === "use") {
        const drive = parts[2];
        const share = parts[3];
        if (!drive || !share) {
          output = "Usage: net use <drive:> <\\\\server\\share>";
        } else {
          output = `Successfully mapped ${drive} to ${share}. The command completed successfully.`;
        }
      } else {
        output = "Try: net use <drive:> <\\\\server\\share>";
      }
    } else if (action === "tasklist") {
      output = "Image Name                     PID Session Name        Mem Usage\n========================= ======== ================ ============\nSystem Idle Process              0 Services                   8 K\nSystem                           4 Services                 156 K\nexplorer.exe                  3212 Console              142,400 K\ncmd.exe                       5904 Console                8,240 K\nchrome.exe                    8412 Console              324,500 K\nlaggy-process.exe             4902 Console              850,200 K";
    } else if (action === "taskkill") {
      const isPid = parts[1]?.toLowerCase() === "/pid";
      const pidVal = parts[2];
      if (isPid && pidVal === "4902") {
        output = "SUCCESS: The process with PID 4902 has been terminated.";
      } else {
        output = "Usage: taskkill /pid 4902 /f (to terminate the process)";
      }
    } else if (action === "ver") {
      output = "Microsoft Windows [Version 10.0.22631.3296]";
    } else if (action === "prompt") {
      if (!arg) {
        setPromptTemplate("$P$G");
        output = "";
      } else {
        const pattern = cmd.slice(7);
        setPromptTemplate(pattern);
        output = "";
      }
    } else if (action === "help") {
      output = "Supported commands: mkdir, cd, dir, ls, copy, move, del, ren, attrib, ipconfig, ping, net use, tasklist, taskkill, ver, prompt, echo, type, clear, cls";
    } else if (action === "clear" || action === "cls") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else {
      output = `Command '${action}' not recognized. Type 'help' for support.`;
    }

    if (output === "") {
      setTerminalHistory(newHistory);
    } else {
      setTerminalHistory([...newHistory, output, ""]);
    }
    setTerminalInput("");
  };

  // Drag & drop logic
  const handleDragStart = (e: React.DragEvent, name: string) => {
    e.dataTransfer.setData("folderName", name);
  };

  const handleFolderDrop = (e: React.DragEvent, parentId: string) => {
    e.preventDefault();
    const folderName = e.dataTransfer.getData("folderName");
    if (!folderName) return;

    // Check if duplicate
    const exists = folders.some(f => f.name.toLowerCase() === folderName.toLowerCase() && f.parentId === parentId);
    if (exists) return;

    setFolders(prev => [...prev, {
      id: `folder-${Date.now()}`,
      name: folderName,
      parentId
    }]);
  };

  const resetSimulation = () => {
    localStorage.removeItem("nextsem_sim_folders");
    localStorage.removeItem("nextsem_sim_files");
    localStorage.removeItem("nextsem_sim_currentDir");
    localStorage.removeItem("nextsem_sim_history");
    localStorage.removeItem("nextsem_sim_promptTemplate");
    localStorage.removeItem("nextsem_sim_currentDrive");

    setFolders([{ id: "desktop", name: "Desktop", parentId: null }]);
    setFiles([]);
    setTerminalHistory([
      "Microsoft Windows [Version 10.0.22621.1702]",
      "(c) Microsoft Corporation. All rights reserved.",
      "",
      "Type command 'mkdir Nextsem' to begin creating your folder tree...",
      ""
    ]);
    setCurrentDir("Desktop");
    setPromptTemplate("$P$G");
    setCurrentDrive("C");
  };

  const renderFolderTree = (parentId: string | null, depth = 0) => {
    const childrenFolders = folders.filter(f => f.parentId === parentId);
    const childrenFiles = files.filter(f => f.parentId === parentId && !f.isHidden);
    
    return (
      <div className="flex flex-col w-full pl-3 border-l border-slate-800/40 my-1">
        {childrenFolders.map(c => (
          <div 
            key={c.id} 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleFolderDrop(e, c.id)}
            className="group"
          >
            <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/25 transition-all text-[11px] font-black text-slate-350">
              <Folder size={12} className="text-amber-400 fill-amber-400/20" />
              <span>{c.name}/</span>
            </div>
            {renderFolderTree(c.id, depth + 1)}
          </div>
        ))}
        {childrenFiles.map(file => (
          <div 
            key={file.id}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-850/20 text-[11px] font-black text-slate-400 pl-4"
          >
            <File size={11} className="text-sky-400" />
            <span>{file.name}</span>
            {file.isReadOnly && (
              <span className="text-[8px] px-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded uppercase font-black tracking-wide scale-90">
                R
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      
      const newPointer = historyPointer > 0 ? historyPointer - 1 : 0;
      setHistoryPointer(newPointer);
      setTerminalInput(commandHistoryList[newPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      
      const newPointer = historyPointer < commandHistoryList.length - 1 ? historyPointer + 1 : commandHistoryList.length;
      setHistoryPointer(newPointer);
      if (newPointer === commandHistoryList.length) {
        setTerminalInput("");
      } else {
        setTerminalInput(commandHistoryList[newPointer]);
      }
    }
  };

  // Validation tasks state calculations
  const task1Done = folders.some(f => f.name.toLowerCase() === "nextsem" && f.parentId === "c-desktop");
  
  const nextsemFolder = folders.find(f => f.name.toLowerCase() === "nextsem" && f.parentId === "c-desktop");
  const task2Done = nextsemFolder ? folders.some(f => f.name.toLowerCase() === "week-1" && f.parentId === nextsemFolder.id) : false;
  
  const week1Folder = nextsemFolder ? folders.find(f => f.name.toLowerCase() === "week-1" && f.parentId === nextsemFolder.id) : null;
  const task3Done = week1Folder ? files.some(f => f.name.toLowerCase() === "archive.html" && f.parentId === week1Folder.id) : false;
  
  const task4Done = week1Folder ? files.some(f => f.name.toLowerCase() === "archive.html" && f.parentId === week1Folder.id && f.isReadOnly) : false;
  
  const allTasksDone = task1Done && task2Done && task3Done && task4Done;

  return (
    <div className="my-6 rounded-2xl border border-gray-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0b1329]/50 shadow-md overflow-hidden">
      
      {/* ── Windows 11 Header Bar ── */}
      <div className="flex border-b border-gray-200/60 dark:border-slate-800 bg-slate-100/50 dark:bg-[#090f1e]/80 p-2.5 justify-between items-center px-4">
        <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200 select-none">
          <Monitor size={14} className="text-emerald-500" />
          <span>Windows 11 Simulator Workstation</span>
        </div>
        
        {/* Reset button */}
        <button 
          onClick={resetSimulation}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Reset Simulation"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* ── Mode Selection (Terminal vs Drag/Drop) ── */}
      <div className="flex justify-center p-2.5 bg-slate-100/30 dark:bg-[#070b14]/50 border-b border-gray-200/60 dark:border-slate-800 gap-2">
        <button 
          onClick={() => setActiveMode("terminal")}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${activeMode === "terminal" ? "bg-blue-600 text-white shadow" : "text-slate-550 dark:text-slate-400 hover:text-white"}`}
        >
          Terminal Mode
        </button>
        <button 
          onClick={() => setActiveMode("dragdrop")}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${activeMode === "dragdrop" ? "bg-blue-600 text-white shadow" : "text-slate-550 dark:text-slate-400 hover:text-white"}`}
        >
          Visual Drag & Drop
        </button>
      </div>

      {/* ── Interactive content area ── */}
      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#080d16]">
        
        {/* LEFT COLUMN: Terminal simulator OR Drag elements */}
        <div>
          {activeMode === "terminal" ? (
            <div className="flex flex-col h-[420px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Terminal Titlebar (Windows 11 Style) */}
              <div className="h-9 bg-[#1f1f1f] border-b border-[#2d2d2d] px-4 flex items-center justify-between text-[11px] font-mono font-bold text-slate-350 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-slate-400 bg-slate-800 px-1 py-0.5 rounded border border-slate-700 font-mono select-none">&gt;_</span>
                  <span className="font-bold text-slate-300">Command Prompt</span>
                </div>
                
                {/* Windows 11 window controls on the right */}
                <div className="flex items-center gap-4 text-slate-500 text-xs mr-1">
                  <span className="hover:text-white cursor-pointer select-none font-light">─</span>
                  <span className="hover:text-white cursor-pointer select-none font-light">☐</span>
                  <span className="hover:text-rose-500 cursor-pointer select-none font-light">✕</span>
                </div>
              </div>
              
              {/* Terminal History */}
              <div ref={terminalContainerRef} className="flex-1 p-4 overflow-y-auto font-mono text-[10px] leading-relaxed text-slate-350 select-text scrollbar-thin">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={line.startsWith("❌") || line.startsWith("Error") ? "text-rose-500 font-bold" : line.startsWith("Successfully") ? "text-emerald-400" : ""}>
                    {line}
                  </div>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleTerminalSubmit} className="h-10 bg-[#070b12] border-t border-[#2d2d2d] px-4 flex items-center font-mono text-[11px] text-slate-200">
                <span className="text-slate-400 mr-2">
                  {getPromptString()}
                </span>
                <input 
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="mkdir Nextsem..."
                  className="flex-1 bg-transparent focus:outline-none text-white"
                />
              </form>
            </div>
          ) : (
            <div className="flex flex-col h-[420px] p-5 bg-[#0e1422] border border-slate-800 rounded-2xl shadow-xl justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Folder Library</span>
                <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                  Drag the folders below and drop them directly onto parent folder nodes in the right-side File Explorer:
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {["Nextsem", "Week-1", "Week-2", "assets"].map(folderName => (
                    <div 
                      key={folderName}
                      draggable
                      onDragStart={(e) => handleDragStart(e, folderName)}
                      className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-grab flex items-center gap-2 text-xs font-black text-white hover:scale-103 transition-transform"
                    >
                      <Folder size={14} className="text-amber-400 fill-amber-400/20" />
                      <span>{folderName}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-[9px] text-slate-500 leading-relaxed">
                💡 <strong>Goal:</strong> Build the standardized hierarchy: Drag `Nextsem` into `Desktop`. Then drag `Week-1`, `Week-2`, and `assets` into `Nextsem`.
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live File Explorer Tree */}
        <div className="flex flex-col h-[420px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Visual File Explorer (Desktop)</span>
          
          {/* Challenge Checklist Widget */}
          <div className="mb-3 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-[10px] space-y-1.5 shrink-0">
            <div className="flex items-center justify-between font-black uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-1 mb-1">
              <span>🎯 Lab Validation Checklist</span>
              {allTasksDone && <span className="text-emerald-400 text-[8px] px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-pulse">Success</span>}
            </div>
            
            <div className="space-y-1 text-slate-350">
              <div className="flex items-center gap-2">
                <span className={task1Done ? "text-emerald-400 font-bold" : "text-slate-655"}>{task1Done ? "✓" : "○"}</span>
                <span className={task1Done ? "line-through text-slate-500 font-medium" : "font-medium"}>Create folder &quot;Nextsem&quot; on Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={task2Done ? "text-emerald-400 font-bold" : "text-slate-655"}>{task2Done ? "✓" : "○"}</span>
                <span className={task2Done ? "line-through text-slate-500 font-medium" : "font-medium"}>Create &quot;Week-1&quot; folder inside &quot;Nextsem&quot;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={task3Done ? "text-emerald-400 font-bold" : "text-slate-655"}>{task3Done ? "✓" : "○"}</span>
                <span className={task3Done ? "line-through text-slate-500 font-medium" : "font-medium"}>Create file &quot;archive.html&quot; in Week-1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={task4Done ? "text-emerald-400 font-bold" : "text-slate-655"}>{task4Done ? "✓" : "○"}</span>
                <span className={task4Done ? "line-through text-slate-500 font-medium" : "font-medium"}>Protect &quot;archive.html&quot; as Read-Only (+r)</span>
              </div>
            </div>
          </div>

          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleFolderDrop(e, currentDrive === "C" ? "c-desktop" : `${currentDrive.toLowerCase()}-root`)}
            className="flex-1 w-full border border-dashed border-slate-800 rounded-xl p-3 overflow-y-auto bg-[#080d16]/60 flex flex-col justify-start"
          >
            <div className="flex items-center gap-1.5 text-xs font-black text-white mb-2">
              <Laptop size={14} className="text-slate-400" />
              <span>{currentDrive === "C" ? "Desktop/" : `${currentDrive}:\\`}</span>
            </div>

            {/* Render recursive folder tree */}
            {renderFolderTree(currentDrive === "C" ? "c-desktop" : `${currentDrive.toLowerCase()}-root`)}
            
            {folders.filter(f => f.parentId === (currentDrive === "C" ? "c-desktop" : `${currentDrive.toLowerCase()}-root`)).length === 0 &&
             files.filter(f => f.parentId === (currentDrive === "C" ? "c-desktop" : `${currentDrive.toLowerCase()}-root`)).length === 0 && (
              <div className="flex-1 flex items-center justify-center text-slate-655 text-[10px] italic text-center p-4">
                Empty drive. Use Terminal (mkdir folder) to populate directories!
              </div>
            )}
          </div>
        </div>

      </div>

      {/* —— Guidance Details Bar —— */}
      <div className="p-4 md:p-6 border-t border-gray-200/60 dark:border-slate-800 bg-slate-100/20 dark:bg-slate-950/40 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-450">
        <div className="p-4 rounded-xl border border-slate-850 bg-slate-950/40">
          <h4 className="font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2 text-[10px]">
            <span>📂</span> Directory Layout Rule
          </h4>
          <p>
            Always create <code>Nextsem</code> as your main workspace directly on your Desktop. Store weekly exercises inside separate <code>Week-X</code> folders to avoid visual noise and path confusion.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-850 bg-slate-950/40">
          <h4 className="font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2 text-[10px]">
            <span>⚠️</span> The Zero-Space Rule
          </h4>
          <p>
            Do not put spaces in directory names (e.g. <code>Week 1</code>). The space character breaks server asset path URLs. Use hyphens like <code>Week-1</code> instead.
          </p>
        </div>
      </div>

    </div>
  );
}
