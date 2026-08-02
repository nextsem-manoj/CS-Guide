"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Square, ChevronDown, ChevronUp, Edit2, RotateCcw, Eye, FileCode } from 'lucide-react';

interface InteractivePreProps {
  children: React.ReactNode;
  onChangeCode?: (html: string, css: string, js: string) => void;
  [key: string]: unknown;
}

// Safely extract text content from any React children structure
const getTextFromChildren = (node: React.ReactNode): string => {
  if (!node) return "";
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextFromChildren).join("");
  }
  if (React.isValidElement(node) && node.props && (node.props as { children?: React.ReactNode }).children !== undefined) {
    return getTextFromChildren((node.props as { children?: React.ReactNode }).children);
  }
  return "";
};

const DEFAULT_HTML = `<div class="sandbox-wrapper">
  <header id="main-header">
    <h1 id="main-heading" class="main-heading">Demo Web Heading</h1>
    <p id="sub-text" class="highlight">This paragraph has class .highlight</p>
  </header>
  
  <button id="submit-btn" class="btn button">Interact Button (.btn / .button)</button>
  
  <div class="box card">
    Sandbox Block (.box / .card)
  </div>

  <div class="flex-container grid-container">
    <div class="flex-item grid-item">Item 1</div>
    <div class="flex-item grid-item">Item 2</div>
    <div class="flex-item grid-item">Item 3</div>
  </div>
</div>`;

const InteractivePre = ({ 
  children, 
  initialHtml: propHtml, 
  initialCss: propCss, 
  initialJs: propJs, 
  onChangeCode, 
  ...props 
}: InteractivePreProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Extract raw code string and language from children upfront
  const childrenArray = React.Children.toArray(children);
  const codeElement = childrenArray[0];
  
  let language = "";
  if (React.isValidElement(codeElement) && codeElement.props) {
    const elementProps = codeElement.props as { className?: string; children?: React.ReactNode };
    const className = elementProps.className || "";
    language = className.replace("language-", "").toLowerCase();
  }
  const isTerminal = ["bash", "sh", "zsh", "powershell", "cmd", "terminal"].includes(language);

  let resolvedCode = "";
  if (React.isValidElement(codeElement) && codeElement.props) {
    const elementProps = codeElement.props as { className?: string; children?: React.ReactNode };
    resolvedCode = getTextFromChildren(elementProps.children);
  } else {
    resolvedCode = getTextFromChildren(children);
  }
  const trimmed = resolvedCode.trim();

  // Deriving initial state values directly to avoid post-mount updates
  let initialHtml = propHtml && typeof propHtml === 'string' ? propHtml : "";
  let initialCss = propCss && typeof propCss === 'string' ? propCss : "";
  let initialJs = propJs && typeof propJs === 'string' ? propJs : "";
  let initialTab: "html" | "css" | "js" = "html";

  if (!initialHtml && !initialCss && !initialJs) {
    if (language === 'html' || trimmed.startsWith('<')) {
      initialHtml = trimmed;
      initialTab = "html";
    } else if (language === 'css') {
      initialHtml = DEFAULT_HTML;
      initialCss = trimmed;
      initialTab = "css";
    } else if (language === 'javascript' || language === 'js' || language === 'jsx' || language === 'tsx') {
      initialHtml = DEFAULT_HTML;
      initialJs = trimmed;
      initialTab = "js";
    } else {
      initialHtml = trimmed;
      initialTab = "html";
    }
  } else {
    // If props are passed, decide the tab based on which one has value
    if (initialJs) initialTab = "js";
    else if (initialCss) initialTab = "css";
    else initialTab = "html";
  }

  // Tabbed playground states
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">(initialTab);
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);
  
  const [originalCode, setOriginalCode] = useState(trimmed);
  const [iframeHeight, setIframeHeight] = useState(160);
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);

  // Callback ref that saves the actual iframe DOM element in state when it mounts
  const iframeRef = useCallback((node: HTMLIFrameElement | null) => {
    if (node !== null) {
      setIframeElement(node);
    }
  }, []);

  // Resize iframe automatically to fit content height
  useEffect(() => {
    if (isRunning && isOpen && iframeElement) {
      const resizeIframe = () => {
        try {
          if (iframeElement.contentWindow) {
            const win = iframeElement.contentWindow;
            const body = win.document.body;
            const html = win.document.documentElement;
            if (body && html) {
              const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
              );
              setIframeHeight(height + 28);
            }
          }
        } catch (err) {
          // Ignore cross-origin error contexts
        }
      };

      resizeIframe();
      const t1 = setTimeout(resizeIframe, 150);
      const t2 = setTimeout(resizeIframe, 450);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [iframeElement, htmlCode, cssCode, jsCode, isRunning, isOpen]);

  // Listen for iframe resizing events
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'resize-iframe') {
        const reportedHeight = parseInt(e.data.height, 10);
        if (!isNaN(reportedHeight)) {
          setIframeHeight(reportedHeight + 28);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);



  // Propagate code changes to parent — use ref to avoid infinite re-render loop
  const onChangeCodeRef = useRef(onChangeCode);
  useEffect(() => { onChangeCodeRef.current = onChangeCode; });

  useEffect(() => {
    if (onChangeCodeRef.current) {
      onChangeCodeRef.current(htmlCode, cssCode, jsCode);
    }
  }, [htmlCode, cssCode, jsCode]);

  const isRunnable = true;

  const toggleRun = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsOpen(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (language === 'html' || originalCode.startsWith('<')) {
      setHtmlCode(originalCode);
      setCssCode("");
      setJsCode("");
    } else if (language === 'css') {
      setHtmlCode(DEFAULT_HTML);
      setCssCode(originalCode);
      setJsCode("");
    } else if (language === 'javascript' || language === 'js' || language === 'jsx' || language === 'tsx') {
      setHtmlCode(DEFAULT_HTML);
      setCssCode("");
      setJsCode(originalCode);
    } else {
      setHtmlCode(originalCode);
      setCssCode("");
      setJsCode("");
    }
  };

  const getCodeValue = () => {
    if (activeTab === "html") return htmlCode;
    if (activeTab === "css") return cssCode;
    return jsCode;
  };

  const handleCodeChange = (val: string) => {
    if (activeTab === "html") setHtmlCode(val);
    else if (activeTab === "css") setCssCode(val);
    else setJsCode(val);
  };

  // Compile final iframe document based on the current edited tab states
  const getIframeSrcDoc = () => {
    // If it's a bash/terminal command, render simulated console output
    if (language === 'bash' || language === 'sh' || language === 'zsh' || language === 'powershell' || language === 'cmd' || language === 'terminal') {
      const trimmedCmd = getCodeValue().trim();
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { background: #070b13 !important; color: #39ff14 !important; font-family: monospace; font-size: 13px; padding: 12px; margin: 0; }
              .terminal-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
              .prompt { color: #f59e0b; font-weight: bold; user-select: none; }
              .cmd-text { color: #22d3ee; font-weight: bold; }
              .cmd-out { color: #39ff14; font-weight: 500; opacity: 0.95; padding-left: 14px; white-space: pre-wrap; margin-bottom: 12px; }
            </style>
          </head>
          <body>
            ${trimmedCmd.split('\n').map(line => {
              const cleanLine = line.trim();
              if (!cleanLine) return '';
              let outputSim = '';
              if (cleanLine === 'cd' || cleanLine.toLowerCase() === 'cd..') {
                outputSim = `C:\\Users\\nextsem\\workspace`;
              } else if (cleanLine.toLowerCase().startsWith('cd ') || cleanLine.toLowerCase().startsWith('cd..\\')) {
                const dest = cleanLine.toLowerCase().startsWith('cd ') ? cleanLine.substring(3) : cleanLine.substring(4);
                outputSim = `Changed directory to: ${dest}`;
              } else if (cleanLine.toLowerCase() === 'cd\\') {
                outputSim = `Changed directory to root: C:\\`;
              } else if (cleanLine.toLowerCase().startsWith('cd\\')) {
                outputSim = `Changed directory to: ${cleanLine.substring(3)}`;
              } else if (cleanLine.match(/^[a-zA-Z]:$/)) {
                outputSim = `Changed active drive to ${cleanLine.toUpperCase()}`;
              } else if (cleanLine === 'pwd') {
                outputSim = `C:\\Users\\nextsem\\workspace`;
              } else if (cleanLine === 'ls' || cleanLine === 'dir' || cleanLine === 'get-childitem') {
                outputSim = `    Directory: C:\\Users\\nextsem\\workspace\n\nMode                 LastWriteTime         Length Name\n----                 -------------         ------ ----\n-a----        04-07-2026     22:08            128 index.html\n-a----        04-07-2026     22:08             85 styles.css\n-a----        04-07-2026     22:08            240 script.js`;
              } else if (cleanLine.startsWith('mkdir ')) {
                outputSim = `Created directory: ${cleanLine.substring(6)}`;
              } else if (cleanLine.startsWith('md ')) {
                outputSim = `Created directory: ${cleanLine.substring(3)}`;
              } else if (cleanLine.startsWith('touch ')) {
                outputSim = `Created empty file: ${cleanLine.substring(6)}`;
              } else if (cleanLine.startsWith('new-item ')) {
                outputSim = `Created empty file: ${cleanLine.substring(9)}`;
              } else if (cleanLine.startsWith('type ') || cleanLine.startsWith('cat ') || cleanLine.startsWith('get-content ')) {
                const targetFile = cleanLine.replace(/^(type|cat|get-content)\s+/, '');
                if (targetFile.includes('html')) {
                  outputSim = `<!DOCTYPE html>\n<html>\n<head>\n  <title>Nextsem</title>\n</head>\n<body>\n  <h1>Hello Nextsem!</h1>\n</body>\n</html>`;
                } else if (targetFile.includes('txt') || targetFile.includes('hello')) {
                  outputSim = `Hello from Nextsem Academy!`;
                } else {
                  outputSim = `// Contents of ${targetFile}`;
                }
              } else if (cleanLine.startsWith('del ') || cleanLine.startsWith('rm ') || cleanLine.startsWith('remove-item ')) {
                const targetFile = cleanLine.replace(/^(del|rm|remove-item)\s+/, '');
                outputSim = `Deleted file: ${targetFile}`;
              } else if (cleanLine === 'cls' || cleanLine === 'clear') {
                outputSim = `[Terminal Output Cleared]`;
              } else if (cleanLine.startsWith('npm ')) {
                const sub = cleanLine.substring(4);
                if (sub.startsWith('install') || sub.startsWith('i ')) {
                  const pkg = sub.replace(/^i(nstall)?\s*/, '');
                  outputSim = `added ${pkg || 'packages'} to node_modules (mock)`;
                } else if (sub.startsWith('run ')) {
                  outputSim = `> ${sub.substring(4)}\n> script executed successfully (mock)`;
                } else {
                  outputSim = `npm ${sub}: completed (mock)`;
                }
              } else if (cleanLine.startsWith('git ')) {
                outputSim = `git: successfully executed '${cleanLine}' on main branch.`;
              } else if (cleanLine.startsWith('node ')) {
                outputSim = `Running node process for: ${cleanLine.substring(5)}`;
              } else {
                outputSim = `Command executed successfully in mock playground sandbox.`;
              }
              const promptPrefix = (language === 'powershell' || language === 'cmd') ? 'PS C:\\Users\\nextsem\\workspace&gt;' : '$';
              return `
                <div class="terminal-row">
                  <span class="prompt">${promptPrefix}</span>
                  <span class="cmd-text">${line}</span>
                </div>
                <div class="cmd-out">${outputSim}</div>
              `;
            }).join('')}
          </body>
        </html>
      `;
    }

    const globalStyles = `
      <style>
        body { 
          font-family: system-ui, -apple-system, sans-serif; 
          padding: 16px; 
          margin: 0;
          background: #060c18 !important; 
          color: #f8fafc !important; 
        }
        h1, h2, h3, h4, h5, h6, p, span, li, label, td, th {
          color: #f8fafc !important;
        }
        /* Style images beautifully */
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        
        /* Default low-specificity styles */
        .sandbox-wrapper {
          padding: 16px;
          border: 1px solid #1e293b;
          border-radius: 12px;
          background: #0b1329;
          margin-bottom: 16px;
        }
        h1.main-heading {
          font-size: 26px;
          font-weight: 900;
          color: #f8fafc;
          margin: 0 0 8px 0;
        }
        p.highlight {
          font-size: 14px;
          color: #94a3b8;
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          margin: 0 0 16px 0;
          background: rgba(255,255,255,0.05);
        }
        button.btn, button.button {
          padding: 10px 20px;
          background: #3b82f6;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
        .box, .card {
          margin-top: 16px;
          padding: 20px;
          border: 2px dashed #334155;
          border-radius: 10px;
          text-align: center;
          color: #94a3b8;
          font-weight: 600;
        }
        .flex-container, .grid-container {
          margin-top: 16px;
          display: flex;
          gap: 12px;
        }
        .flex-item, .grid-item {
          padding: 12px;
          background: #1e293b;
          border-radius: 8px;
          text-align: center;
          color: #f8fafc;
          font-weight: 700;
          border: 1px solid #334155;
        }
        
        #console { 
          background: #0b1329; 
          border: 1px solid #1e293b; 
          border-radius: 8px; 
          padding: 12px; 
          font-family: monospace; 
          font-size: 13px; 
          min-height: 50px; 
          color: #38bdf8; 
          overflow-x: auto; 
        }

        /* User custom CSS overrides go here */
        ${cssCode}
      </style>
      <script>
        document.addEventListener('error', function(e) {
          if (e.target.tagName === 'IMG') {
            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
          }
        }, true);
      </script>
    `;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          ${globalStyles}
          <style>
            html, body {
              margin: 0;
              padding: 16px;
              overflow: hidden;
              background: #060c18;
              color: #f8fafc;
            }
          </style>
        </head>
        <body>
          ${htmlCode}
          
          ${jsCode.trim() ? `
            <hr style="border-color: #1e293b; margin: 16px 0;">
            <h3 style="margin-top:0; font-size: 14px; text-transform: uppercase; color: #64748b;">JavaScript Console Output:</h3>
            <div id="console"></div>
            <script>
              const con = document.getElementById('console');
              const _fmt = (a) => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a);
              console.log = (...args) => {
                con.innerHTML += args.map(_fmt).join(' ') + '<br>';
              };
              console.table = (data) => {
                con.innerHTML += '<pre style="color:#38bdf8;font-size:11px;margin:2px 0;">' + JSON.stringify(data, null, 2) + '</pre>';
              };
              console.error = (...args) => {
                con.innerHTML += '<span style="color:#ef4444">[Error] ' + args.map(_fmt).join(' ') + '</span><br>';
              };
              console.warn = (...args) => {
                con.innerHTML += '<span style="color:#f59e0b">[Warn] ' + args.map(_fmt).join(' ') + '</span><br>';
              };
              window.alert = (msg) => {
                con.innerHTML += '<span style="color:#10b981; font-weight:bold;">[Alert] ' + msg + '</span><br>';
              };
              try {
                ${jsCode}
              } catch(e) {
                con.innerHTML += '<span style="color:#ef4444">Error: ' + e.message + '</span>';
              }
            </script>
          ` : ''}

          <script>
            const resizeOb = new ResizeObserver(() => {
              window.parent.postMessage({ type: 'resize-iframe', height: document.documentElement.scrollHeight }, '*');
            });
            resizeOb.observe(document.documentElement);
          </script>
        </body>
      </html>
    `;
  };

  const hasCodeChanged = () => {
    if (language === 'html' || originalCode.startsWith('<')) {
      return htmlCode !== originalCode || cssCode !== "" || jsCode !== "";
    } else if (language === 'css') {
      return cssCode !== originalCode || htmlCode !== DEFAULT_HTML || jsCode !== "";
    } else if (language === 'javascript' || language === 'js' || language === 'jsx' || language === 'tsx') {
      return jsCode !== originalCode || htmlCode !== DEFAULT_HTML || cssCode !== "";
    }
    return htmlCode !== originalCode;
  };

  const renderActionButtons = () => (
    <div className="flex items-center gap-1.5 shrink-0">
      {/* Open in Playground Button */}
      {!isTerminal && (
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("nextsem_playground_html", htmlCode);
              localStorage.setItem("nextsem_playground_css", cssCode);
              localStorage.setItem("nextsem_playground_js", jsCode);
              window.open("/playground", "_blank");
            }
          }}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] md:text-xs font-black bg-slate-800/90 hover:bg-slate-750 text-slate-250 border border-slate-700/50 shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          title="Open this code in full-page interactive playground"
        >
          <FileCode size={11} /> Playground ↗
        </button>
      )}

      {/* Edit / View Code Toggle Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] md:text-xs font-black bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/50 shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer"
        title={isEditing ? "View rendered code format" : "Edit this code snippet"}
      >
        {isEditing ? (
          <>
            <Eye size={11} /> View Code
          </>
        ) : (
          <>
            <Edit2 size={11} /> Edit Code
          </>
        )}
      </button>

      {/* Reset Code Button (only shows when content differs from original) */}
      {hasCodeChanged() && (
        <button
          onClick={handleReset}
          className="flex items-center justify-center p-1.5 rounded-lg text-xs font-black bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/50 shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Reset code to original version"
        >
          <RotateCcw size={11} />
        </button>
      )}

      {/* Run / Stop Code Button - Runs only for runnable snippets */}
      {isRunnable && (
        <button
          onClick={toggleRun}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] md:text-xs font-black shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer ${
            isRunning
              ? "bg-rose-500 hover:bg-rose-400 text-white"
              : "bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white"
          }`}
        >
          {isRunning ? (
            <>
              <Square size={11} /> Stop Code
            </>
          ) : (
            <>
              <Play size={11} /> Run Code
            </>
          )}
        </button>
      )}
    </div>
  );

  if (isEditing || isRunning) {
    return (
      <div className="relative my-6 group/code">
        {/* Top Actions Row - Always aligned to the right, just above the code block / tabs */}
        <div className="flex justify-end items-center mb-2.5 pr-1.5">
          {renderActionButtons()}
        </div>

        {/* Code Editor Header Tabs or Terminal Header */}
        {isTerminal ? (
          <div className="flex flex-row items-center justify-between bg-[#1f1f1f] border-x border-t border-[#333] rounded-t-xl text-[11px] p-2.5 text-slate-300 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-400 bg-slate-800 px-1 py-0.5 rounded border border-slate-700 font-mono select-none">&gt;_</span>
              <span className="font-mono text-slate-350 font-bold ml-2">Command Prompt (cmd.exe)</span>
            </div>
            {/* Windows 11 style window controls */}
            <div className="flex items-center gap-4 text-slate-500 text-xs mr-1 font-mono">
              <span className="hover:text-white cursor-pointer select-none font-light">─</span>
              <span className="hover:text-white cursor-pointer select-none font-light">☐</span>
              <span className="hover:text-rose-500 cursor-pointer select-none font-light">✕</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center bg-slate-900 border border-slate-800 rounded-t-xl text-[11px] gap-1 shrink-0 p-1">
            {/* Desktop tab bar view */}
            <div className="hidden sm:flex gap-1">
              <button 
                onClick={() => setActiveTab("html")}
                className={`flex items-center gap-1.5 px-3 py-2 font-black transition-all ${activeTab === "html" ? "text-orange-450 bg-[#090f1e] border-b-2 border-orange-500" : "text-slate-450 hover:text-slate-200"}`}
              >
                <FileCode size={11} className="text-orange-500" />
                <span>index.html</span>
              </button>
              <button 
                onClick={() => setActiveTab("css")}
                className={`flex items-center gap-1.5 px-3 py-2 font-black transition-all ${activeTab === "css" ? "text-blue-450 bg-[#090f1e] border-b-2 border-blue-500" : "text-slate-450 hover:text-slate-200"}`}
              >
                <FileCode size={11} className="text-blue-500" />
                <span>style.css</span>
              </button>
              <button 
                onClick={() => setActiveTab("js")}
                className={`flex items-center gap-1.5 px-3 py-2 font-black transition-all ${activeTab === "js" ? "text-yellow-450 bg-[#090f1e] border-b-2 border-yellow-500" : "text-slate-450 hover:text-slate-205"}`}
              >
                <FileCode size={11} className="text-yellow-500" />
                <span>script.js</span>
              </button>
            </div>

            {/* Mobile view dropdown selector (replaces horizontal scroll) */}
            <div className="flex sm:hidden w-full max-w-[160px] relative p-0.5">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as "html" | "css" | "js")}
                className="w-full bg-[#090f1e] border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-black text-slate-200 focus:outline-none appearance-none cursor-pointer pr-6"
              >
                <option value="html">📄 index.html</option>
                <option value="css">🎨 style.css</option>
                <option value="js">⚡ script.js</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <span className="text-[7px]">▼</span>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor Textarea */}
        <textarea
          value={getCodeValue()}
          onChange={(e) => handleCodeChange(e.target.value)}
          rows={Math.max(6, getCodeValue().split('\n').length + 1)}
          className={`w-full font-mono text-xs md:text-sm p-4 rounded-b-xl focus:outline-none shadow-inner resize-y leading-relaxed ${
            isTerminal 
              ? "bg-[#0c0c0c] text-[#dfdfdf] border-x border-b border-[#2d2d2d] focus:ring-1 focus:ring-slate-700" 
              : "bg-[#090f1e] text-slate-100 border-x border-b border-blue-500/30 focus:ring-2 focus:ring-blue-500/10"
          }`}
          placeholder={isTerminal ? "Type Windows commands here..." : `Write your ${activeTab.toUpperCase()} code here...`}
        />

        {/* Collapsible Live Preview Window */}
        <div className={`mt-2.5 border rounded-xl overflow-hidden shadow-md animate-in slide-in-from-top duration-300 ${
          isTerminal ? "border-[#2d2d2d]" : "border-blue-100 dark:border-slate-800"
        }`}>
          {/* Header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 text-xs font-black transition-colors ${
              isTerminal 
                ? "bg-[#181818] hover:bg-[#202020] border-b border-[#2d2d2d] text-slate-350 font-mono" 
                : "bg-blue-50/50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-slate-900 border-b border-blue-100 dark:border-slate-800 text-blue-600 dark:text-blue-400"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {isTerminal ? "💻 Terminal Output Console" : "🚀 Live Interactive Sandbox Output"}
            </span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Collapsible Sandbox Frame */}
          {isOpen && (
            <div className="p-3 bg-gray-50 dark:bg-slate-950">
              <iframe
                ref={iframeRef}
                title="Code block live output playground"
                srcDoc={getIframeSrcDoc()}
                sandbox="allow-scripts"
                scrolling="no"
                style={{ height: iframeHeight, overflowY: 'hidden' }}
                className="w-full border border-gray-200/80 dark:border-slate-800/80 bg-slate-950 rounded-lg shadow-inner overflow-hidden transition-all duration-200"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isTerminal) {
    return (
      <div className="my-6 rounded-xl border border-[#2d2d2d] bg-[#0c0c0c] shadow-xl overflow-hidden flex flex-col">
        {/* Windows Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1f1f1f] border-b border-[#2d2d2d] select-none">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-400 bg-slate-800 px-1 py-0.5 rounded border border-slate-700 font-mono select-none">&gt;_</span>
            <span className="font-mono text-xs text-slate-350 font-bold ml-2">Command Prompt</span>
          </div>
          {/* Windows 11 style window controls */}
          <div className="flex items-center gap-4 text-slate-500 text-xs mr-1 font-mono">
            <span className="hover:text-white cursor-pointer select-none font-light">─</span>
            <span className="hover:text-white cursor-pointer select-none font-light">☐</span>
            <span className="hover:text-rose-500 cursor-pointer select-none font-light">✕</span>
          </div>
        </div>

        {/* Code Pre container */}
        <pre 
          {...props} 
          className="overflow-x-auto bg-[#0c0c0c] text-[#dfdfdf] p-4 font-mono text-xs md:text-sm leading-relaxed border-none rounded-none outline-none"
        >
          {children}
        </pre>

        {/* Try it Yourself Button */}
        <div className="flex items-center justify-between p-3.5 bg-[#141414] border-t border-[#2d2d2d]">
          <button
            onClick={() => {
              setIsEditing(true);
              setIsRunning(true);
              setIsOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-1.5"
          >
            <span>Run Commands &raquo;</span>
          </button>
          
          <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">
            Interactive Console
          </span>
        </div>
      </div>
    );
  }

  // Render a clean example container block
  return (
    <div className="my-6 p-4 rounded-xl bg-slate-100/60 dark:bg-[#1e293b]/20 border border-gray-200/60 dark:border-slate-800/65 shadow-sm flex flex-col gap-3">
      {/* Header */}
      <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase">
        Example
      </h3>

      {/* Code Pre container with green left border */}
      <pre 
        {...props} 
        className="overflow-x-auto rounded-lg border-l-4 border-[#04aa6d] border-y border-r border-gray-200/60 dark:border-slate-850 bg-white dark:bg-[#0b1329]/90 p-4 shadow-inner relative"
      >
        {children}
      </pre>

      {/* Try it Yourself Button */}
      <div className="flex items-center justify-between mt-1">
        <button
          onClick={() => {
            setIsEditing(true);
            setIsRunning(true);
            setIsOpen(true);
          }}
          className="bg-[#04aa6d] hover:bg-[#038c5a] text-white px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-500/10 cursor-pointer"
        >
          Try it Yourself »
        </button>
        
        {/* Small indicator label */}
        <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest hidden sm:inline-block">
          Interactive Code
        </span>
      </div>
    </div>
  );
};

export default InteractivePre;
