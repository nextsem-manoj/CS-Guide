"use client";
 
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, RotateCcw, Layout, FileCode, CheckCircle, Terminal, HelpCircle, 
  ArrowLeft, Sun, Moon, Coffee, Trash2, Plus, Sliders, Type, Grid, MousePointerClick,
  RefreshCw, Sparkles, Globe, SeparatorHorizontal, TextCursorInput, AlignLeft, Table2, Video
} from "lucide-react";
import AdSenseBanner from "../../components/AdSenseBanner";
 
interface LogEntry {
  type: "log" | "error";
  message: string;
}
 
interface UIComponent {
  id: string;
  type: "div" | "h1" | "h2" | "h3" | "p" | "button" | "a" | "img" | "hr" | "input" | "textarea" | "table" | "video";
  content: string;
  styles: {
    backgroundColor: string;
    color: string;
    borderRadius: string;
    padding: string;
    fontSize: string;
    margin: string;
    textAlign: string;
  };
  src?: string;
  href?: string;
  jsAction?: {
    event: "click" | "mouseenter" | "mouseleave" | "change" | "focus";
    action: "alert" | "log" | "redirect" | "toggle" | "changeText" | "custom";
    value: string;
  };
}
 
const EMMET_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Start building your page here.</p>
  <button id="btn">Click Me</button>

  <script src="script.js"></script>
</body>
</html>`;

const EMMET_CSS = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  padding: 24px;
  background-color: #0f172a;
  color: #f8fafc;
}

h1 {
  color: #3b82f6;
  font-size: 28px;
  margin-bottom: 12px;
}

p {
  color: #94a3b8;
  font-size: 16px;
  margin-bottom: 16px;
}

button {
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`;

const EMMET_JS = `console.log("Hello from script.js!");

const btn = document.getElementById("btn");
if (btn) {
  btn.addEventListener("click", () => {
    console.log("Button clicked!");
    alert("It works!");
  });
}`;

const TEMPLATES = {
  basic: {
    html: EMMET_HTML,
    css: EMMET_CSS,
    js: EMMET_JS
  }
};
 
export default function PlaygroundClient() {
  const [playTheme, setPlayTheme] = useState<"default" | "sepia" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("play_theme") as "default" | "sepia" | "dark" | null;
      return saved || "dark";
    }
    return "dark";
  });
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [editorMode, setEditorMode] = useState<"builder" | "editor">(() => {
    if (typeof window !== "undefined") {
      const hasSavedCode = localStorage.getItem("nextsem_playground_html") || 
                           localStorage.getItem("nextsem_playground_css") || 
                           localStorage.getItem("nextsem_playground_js");
      if (hasSavedCode) return "editor";
    }
    return "builder";
  }); // Builder vs Manual Code
  const [viewMode, setViewMode] = useState<"editor" | "preview">("editor"); // Mobile tab view
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const [sidebarTab, setSidebarTab] = useState<"palette" | "properties">("palette");
  const [previewType, setPreviewType] = useState<"design" | "browser">("design");
  
  const [htmlCode, setHtmlCode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_playground_html");
      if (saved) return saved;
    }
    return TEMPLATES.basic.html;
  });
  const [cssCode, setCssCode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_playground_css");
      if (saved) return saved;
    }
    return TEMPLATES.basic.css;
  });
  const [jsCode, setJsCode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_playground_js");
      if (saved) return saved;
    }
    return TEMPLATES.basic.js;
  });
  
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
 
  // DIY Canvas Components state
  const [components, setComponents] = useState<UIComponent[]>([
    {
      id: "comp-1",
      type: "h1",
      content: "🎨 My Visual Masterpiece",
      styles: {
        backgroundColor: "transparent",
        color: "#38bdf8",
        borderRadius: "0px",
        padding: "12px",
        fontSize: "26px",
        margin: "8px",
        textAlign: "center"
      }
    },
    {
      id: "comp-2",
      type: "p",
      content: "This beautiful page was built by dragging, dropping, and styling elements! Try dragging a new button or clicking this text to edit its styles.",
      styles: {
        backgroundColor: "transparent",
        color: "#94a3b8",
        borderRadius: "0px",
        padding: "8px",
        fontSize: "14px",
        margin: "8px",
        textAlign: "center"
      }
    },
    {
      id: "comp-3",
      type: "button",
      content: "✨ Click Me!",
      styles: {
        backgroundColor: "#10b981",
        color: "#ffffff",
        borderRadius: "8px",
        padding: "10px",
        fontSize: "13px",
        margin: "12px",
        textAlign: "center"
      }
    }
  ]);
  const [activeCompId, setActiveCompId] = useState<string | null>("comp-1");
  const [builderTab, setBuilderTab] = useState<"palette" | "canvas" | "properties">("canvas");
  const [liveServer, setLiveServer] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
 
  // Compile and run the code
  const compileAndRun = (html: string, css: string, js: string, theme: "default" | "sepia" | "dark" = playTheme) => {
    setLogs([]);
    const trimmedHtml = html.trim();
    
    const interceptScript = `
      <script>
        const _log = console.log;
        console.log = (...args) => {
          _log(...args);
          const serialized = args.map(a => 
            typeof a === 'object' ? JSON.stringify(a) : String(a)
          ).join(' ');
          window.parent.postMessage({ type: 'CONSOLE_LOG', message: serialized }, '*');
        };
        
        window.onerror = (message, source, lineno, colno) => {
          window.parent.postMessage({ 
            type: 'CONSOLE_ERROR', 
            message: message + " (Line " + lineno + ")"
          }, '*');
          return false;
        };
      </script>
    `;
 
    const userScript = `
      <script>
        try {
          ${js}
        } catch(e) {
          console.log("❌ Error: " + e.message);
        }
      </script>
    `;
 
    const iframeBg = theme === "default" ? "#ffffff" : theme === "sepia" ? "#f7f1e5" : "#0f172a";
    const iframeColor = theme === "default" ? "#0f172a" : theme === "sepia" ? "#433422" : "#f8fafc";
 
    const srcDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding: 24px;
              background: ${iframeBg};
              color: ${iframeColor};
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 80vh;
            }
            ${css}
          </style>
          ${interceptScript}
        </head>
          <body>
            ${trimmedHtml}
            ${userScript}
          </body>
      </html>
    `;
    setIframeSrcDoc(srcDoc);
  };
 
  const runCode = () => {
    if (editorMode === "builder") {
      const generated = generateHTML(components);
      compileAndRun(generated, cssCode, jsCode, playTheme);
    } else {
      compileAndRun(htmlCode, cssCode, jsCode, playTheme);
    }
  };
 
  // Run on mount
  useEffect(() => {
    const initialTheme = playTheme;
    const timer = setTimeout(() => {
      if (editorMode === "builder") {
        const generated = generateHTML(components);
        compileAndRun(generated, cssCode, jsCode, initialTheme);
      } else {
        compileAndRun(htmlCode, cssCode, jsCode, initialTheme);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [editorMode, components, playTheme]);
 
  // Sync components → HTML + CSS + JS code editors
  useEffect(() => {
    if (editorMode !== "builder") return;
    setHtmlCode(generateHTML(components));
    setCssCode(generateCSS(components));
    setJsCode(generateJS(components));
  }, [components, editorMode]); 
  // Listen console logs
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "CONSOLE_LOG") {
        setLogs((prev) => [...prev, { type: "log", message: e.data.message }]);
      } else if (e.data && e.data.type === "CONSOLE_ERROR") {
        setLogs((prev) => [...prev, { type: "error", message: e.data.message }]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
 
  // Sync scroll positions for editor syntax highlighting and gutter
  useEffect(() => {
    if (editorRef.current) {
      if (highlightRef.current) {
        highlightRef.current.scrollTop = editorRef.current.scrollTop;
        highlightRef.current.scrollLeft = editorRef.current.scrollLeft;
      }
      if (gutterRef.current) {
        gutterRef.current.scrollTop = editorRef.current.scrollTop;
      }
    }
  }, [htmlCode, cssCode, jsCode, activeTab]);
 
  const handleScroll = () => {
    if (editorRef.current) {
      if (highlightRef.current) {
        highlightRef.current.scrollTop = editorRef.current.scrollTop;
        highlightRef.current.scrollLeft = editorRef.current.scrollLeft;
      }
      if (gutterRef.current) {
        gutterRef.current.scrollTop = editorRef.current.scrollTop;
      }
    }
  };
 
  // Live Server Hot-Reload Debounce Effect
  useEffect(() => {
    if (!liveServer) return;
    
    const timer = setTimeout(() => {
      if (editorMode === "builder") {
        const generated = generateHTML(components);
        compileAndRun(generated, cssCode, jsCode, playTheme);
      } else {
        compileAndRun(htmlCode, cssCode, jsCode, playTheme);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, editorMode, components, playTheme, liveServer]);
 
  const handleFormat = () => {
    setIsFormatting(true);
    setTimeout(() => {
      if (activeTab === "html") {
        setHtmlCode(formatHTML(htmlCode));
      } else if (activeTab === "css") {
        setCssCode(formatCSS(cssCode));
      } else if (activeTab === "js") {
        setJsCode(formatJS(jsCode));
      }
      setIsFormatting(false);
    }, 300);
  };
 
  function generateHTML(comps: UIComponent[]) {
    const lines: string[] = [];
    comps.forEach((c, i) => {
      const cls = `el-${i}`;
      if (c.type === "h1")       lines.push(`  <h1 class="${cls}">${c.content}</h1>`);
      else if (c.type === "h2") lines.push(`  <h2 class="${cls}">${c.content}</h2>`);
      else if (c.type === "h3") lines.push(`  <h3 class="${cls}">${c.content}</h3>`);
      else if (c.type === "p")  lines.push(`  <p class="${cls}">${c.content}</p>`);
      else if (c.type === "button") lines.push(`  <button class="${cls}" id="btn-${i}">${c.content}</button>`);
      else if (c.type === "a")  lines.push(`  <a href="${c.href || '#'}" class="${cls}">${c.content}</a>`);
      else if (c.type === "img") lines.push(`  <img src="${c.src || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'}" class="${cls}" alt="Visual item">`);
      else if (c.type === "hr") lines.push(`  <hr class="${cls}">`);
      else if (c.type === "input") lines.push(`  <input type="text" class="${cls}" placeholder="${c.content}">`);
      else if (c.type === "textarea") lines.push(`  <textarea class="${cls}" rows="4" placeholder="${c.content}"></textarea>`);
      else if (c.type === "table") lines.push(`  <table class="${cls}">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alice</td><td>Developer</td><td>Active</td></tr>
      <tr><td>Bob</td><td>Designer</td><td>Active</td></tr>
    </tbody>
  </table>`);
      else if (c.type === "video") lines.push(`  <div class="${cls} video-placeholder">
    <span>&#9654; ${c.content}</span>
  </div>`);
      else lines.push(`  <div class="${cls}">${c.content}</div>`);
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Design</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${lines.join('\n')}
</body>
</html>`;
  }

  function generateCSS(comps: UIComponent[]) {
    const rules: string[] = [
      `* { box-sizing: border-box; margin: 0; padding: 0; }`,
      `body {
  font-family: sans-serif;
  padding: 24px;
  background-color: #0f172a;
  color: #f8fafc;
}`,
      `.video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  border: 2px dashed #475569;
  border-radius: 8px;
  color: #64748b;
  font-size: 14px;
}`
    ];
    comps.forEach((c, i) => {
      const cls = `.el-${i}`;
      if (c.type === "hr") {
        rules.push(`${cls} {
  border: none;
  border-top: 2px solid ${c.styles.color || '#475569'};
  margin: ${c.styles.margin};
}`);
      } else if (c.type === "img") {
        rules.push(`${cls} {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: ${c.styles.borderRadius};
  margin: ${c.styles.margin};
}`);
      } else if (c.type === "input" || c.type === "textarea") {
        rules.push(`${cls} {
  display: block;
  width: 100%;
  padding: ${c.styles.padding};
  font-size: ${c.styles.fontSize};
  margin: ${c.styles.margin};
  border: 1px solid #475569;
  border-radius: ${c.styles.borderRadius};
  background-color: ${c.styles.backgroundColor || '#1e293b'};
  color: ${c.styles.color};
  outline: none;
}`);
      } else if (c.type === "table") {
        rules.push(`${cls} {
  width: 100%;
  border-collapse: collapse;
  font-size: ${c.styles.fontSize};
  color: ${c.styles.color};
  margin: ${c.styles.margin};
}
${cls} th, ${cls} td {
  border: 1px solid #334155;
  padding: 8px;
  text-align: center;
}
${cls} thead tr {
  background-color: #1e293b;
}`);
      } else {
        rules.push(`${cls} {
  background-color: ${c.styles.backgroundColor};
  color: ${c.styles.color};
  border-radius: ${c.styles.borderRadius};
  padding: ${c.styles.padding};
  font-size: ${c.styles.fontSize};
  margin: ${c.styles.margin};
  text-align: ${c.styles.textAlign};
  display: block;
}`);
      }
    });
    return rules.join('\n\n');
  }

  function generateJS(comps: UIComponent[]) {
    const lines: string[] = [
      `// ⚡ Auto-generated by Nextsem Visual Builder`,
      `document.addEventListener('DOMContentLoaded', function () {`
    ];
    let hasActions = false;
    comps.forEach((c, i) => {
      if (!c.jsAction || !c.jsAction.value) return;
      hasActions = true;
      const { event, action, value } = c.jsAction;
      const sel = `document.querySelector('.el-${i}')`;
      let body = "";
      if (action === "alert")      body = `alert(${JSON.stringify(value)});`;
      else if (action === "log")   body = `console.log(${JSON.stringify(value)});`;
      else if (action === "redirect") body = `window.location.href = ${JSON.stringify(value)};`;
      else if (action === "toggle") body = `const el = ${sel}; if (el) el.style.display = el.style.display === 'none' ? '' : 'none';`;
      else if (action === "changeText") body = `const el = ${sel}; if (el) el.textContent = ${JSON.stringify(value)};`;
      else body = value; // custom

      if (action === "toggle") {
        lines.push(`  // el-${i} (${c.type}) — ${event}`);
        lines.push(`  const el${i} = ${sel};`);
        lines.push(`  if (el${i}) {`);
        lines.push(`    el${i}.addEventListener('${event}', function () {`);
        lines.push(`      ${body}`);
        lines.push(`    });`);
        lines.push(`  }`);
      } else {
        lines.push(`  // el-${i} (${c.type}) — ${event}`);
        lines.push(`  const el${i} = ${sel};`);
        lines.push(`  if (el${i}) {`);
        lines.push(`    el${i}.addEventListener('${event}', function () {`);
        lines.push(`      ${body}`);
        lines.push(`    });`);
        lines.push(`  }`);
      }
    });
    if (!hasActions) {
      lines.push(`  // Add JS behavior via the Property Editor → JS Behavior section`);
      lines.push(`  console.log('Visual Builder JS loaded!');`);
    }
    lines.push(`});`);
    return lines.join('\n');
  }
 
  // Drag & drop logic
  const handleDragStart = (e: React.DragEvent, type: UIComponent["type"]) => {
    e.dataTransfer.setData("text/plain", type);
  };
 
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("text/plain") as UIComponent["type"];
    if (!type) return;
 
    const defaultContent: Record<UIComponent["type"], string> = {
      h1: "New Header", h2: "Medium Heading", h3: "Small Heading",
      p: "Tap to edit paragraph text", button: "🔥 Action", a: "🔗 Link Text",
      img: "", div: "Card Box", hr: "", input: "Enter your name...",
      textarea: "Write something here...", table: "Data Table", video: "🎬 Video Placeholder"
    };
    const newComp: UIComponent = {
      id: `comp-${Date.now()}`,
      type,
      content: defaultContent[type] ?? "Component",
      styles: {
        backgroundColor: type === "button" ? "#3b82f6" : type === "div" ? "#1e293b" : "transparent",
        color: type === "button" ? "#ffffff" : type === "a" ? "#38bdf8" : type === "hr" ? "#475569" : "#f8fafc",
        borderRadius: type === "button" ? "8px" : type === "div" ? "12px" : "0px",
        padding: type === "hr" ? "0px" : "10px",
        fontSize: type === "h1" ? "22px" : type === "h2" ? "18px" : type === "h3" ? "15px" : "14px",
        margin: "8px",
        textAlign: "left"
      }
    };
    setComponents((prev) => [...prev, newComp]);
    setActiveCompId(newComp.id);
  };
 
  const updateActiveCompStyle = (key: keyof UIComponent["styles"], val: string) => {
    if (!activeCompId) return;
    setComponents((prev) => prev.map((c) => {
      if (c.id === activeCompId) {
        return { ...c, styles: { ...c.styles, [key]: val } };
      }
      return c;
    }));
  };
 
  const updateActiveCompContent = (val: string) => {
    if (!activeCompId) return;
    setComponents((prev) => prev.map((c) => {
      if (c.id === activeCompId) {
        return { ...c, content: val };
      }
      return c;
    }));
  };
 
  const deleteActiveComp = () => {
    if (!activeCompId) return;
    setComponents((prev) => prev.filter((c) => c.id !== activeCompId));
    setActiveCompId(null);
  };
 
  const activeComp = components.find(c => c.id === activeCompId);
  const isLight = playTheme === "default";
  const isSepia = playTheme === "sepia";
  const lineCount = (activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode).split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);
 
  return (
    <div className={`h-screen w-full flex flex-col font-sans overflow-hidden select-none transition-colors duration-300 px-0 md:px-[10%] ${isLight ? "bg-[#f8fafc] text-slate-900" : isSepia ? "bg-[#f4ecd8] text-[#5b4636]" : "bg-[#030712] text-white"}`}>
      
      {/* ── HEADER ── */}
      <header className={`flex justify-between items-center px-4 py-2.5 border-b transition-colors duration-300 z-20 shrink-0 ${isLight ? "bg-white/80 border-slate-200/80 shadow-sm" : isSepia ? "bg-[#ebdcb9]/80 border-[#e6dcc8]/80" : "bg-[#090d16]/80 border-white/5 shadow-md"}`}>
        <div className="flex items-center gap-3">
          <Link href="/" className={`p-1.5 rounded-xl transition-all hover:scale-105 active:scale-95 ${isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-600" : isSepia ? "bg-[#ebdcb9]/60 hover:bg-[#ebdcb9] text-[#705845]" : "bg-slate-900 hover:bg-slate-800 text-slate-400"}`}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-[#04AA6D]">✨</span>
              <span>Nextsem DIY Simulation Sandbox</span>
            </h1>
            <p className={`text-[9px] hidden sm:block font-bold ${isLight ? "text-slate-500" : isSepia ? "text-[#705845]/90" : "text-slate-455"}`}>
              Visual design canvas & code playground
            </p>
          </div>
        </div>
 
        {/* Builder / Code Editor toggle */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center p-0.5 border rounded-xl ${isLight ? "bg-slate-100 border-slate-200" : isSepia ? "bg-[#ebdcb9]/60 border-[#e6dcc8]" : "bg-slate-950 border-white/5"}`}>
            <button 
              onClick={() => setEditorMode("builder")}
              className={`px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${editorMode === "builder" ? "bg-blue-600 text-white shadow-sm" : "text-slate-450 hover:text-white"}`}
            >
              <MousePointerClick size={11} />
              <span>Visual Builder</span>
            </button>
            <button 
              onClick={() => {
                setEditorMode("editor");
                setHtmlCode(generateHTML(components));
              }}
              className={`px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${editorMode === "editor" ? "bg-blue-600 text-white shadow-sm" : "text-slate-455 hover:text-white"}`}
            >
              <FileCode size={11} />
              <span>Code Editor</span>
            </button>
          </div>
 
          <button 
            onClick={runCode}
            className="flex items-center gap-1.5 px-4.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Play size={11} className="fill-white" />
            <span>RUN</span>
          </button>
        </div>
      </header>
 
      {/* ── WORKSPACE PANELS ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative pb-[104px] md:pb-0">
        
        {/* COLUMN 1: Sidebar Panel (Components Palette & Property Editor) */}
        <div className={`w-full md:w-60 border-r flex flex-col p-4 space-y-3 shrink-0 transition-colors duration-300 ${
          isLight ? "bg-slate-50 border-slate-200" : isSepia ? "bg-[#ebdcb9]/40 border-[#e6dcc8]" : "bg-slate-955/60 border-slate-900"
        } ${
          editorMode === "builder" && (builderTab === "palette" || builderTab === "properties") ? "flex" : "hidden md:flex"
        }`}>
          <div className="mb-2 shrink-0">
            <label className="text-[8px] font-black uppercase text-slate-550 block mb-1">Editor Control Panel</label>
            <div className="relative">
              <select
                value={sidebarTab}
                onChange={(e) => setSidebarTab(e.target.value as "palette" | "properties")}
                className={`w-full border rounded-xl px-3 py-1.5 text-xs font-black focus:outline-none appearance-none cursor-pointer pr-8 ${isLight ? "bg-white border-slate-250 text-slate-800" : isSepia ? "bg-[#f4ecd8] border-[#ebdcb9] text-[#5b4636]" : "bg-slate-900 border-slate-800 text-white"}`}
              >
                <option value="palette">🗂️ Components Palette</option>
                <option value="properties">⚙️ Property Editor</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
                <span className="text-[7px]">▼</span>
              </div>
            </div>
          </div>
 
          <div className="flex-1 overflow-y-auto">
            {sidebarTab === "palette" ? (
              <div className="space-y-3">
                <p className="text-[9px] text-slate-400 leading-relaxed mb-1">Drag these elements into the simulated browser canvas:</p>
                
                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "h1")}
                  className="p-3 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 hover:from-blue-600/20 hover:to-indigo-600/20 border border-blue-500/10 hover:border-blue-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-blue-500/10"><Type size={14} className="text-blue-400" /></div>
                  <span>Heading 1</span>
                </div>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "h2")}
                  className="p-3 bg-gradient-to-r from-blue-600/10 to-indigo-650/10 hover:from-blue-600/20 hover:to-indigo-650/20 border border-blue-500/10 hover:border-blue-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-blue-500/10"><Type size={13} className="text-blue-300" /></div>
                  <span>Heading 2</span>
                </div>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "h3")}
                  className="p-3 bg-gradient-to-r from-blue-700/10 to-indigo-700/10 hover:from-blue-700/20 hover:to-indigo-700/20 border border-blue-500/10 hover:border-blue-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-blue-500/10"><Type size={12} className="text-blue-300" /></div>
                  <span>Heading 3</span>
                </div>
                
                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "p")}
                  className="p-3 bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 hover:from-purple-600/20 hover:to-fuchsia-600/20 border border-purple-500/10 hover:border-purple-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-purple-500/10"><Type size={14} className="text-purple-400" /></div>
                  <span>Paragraph</span>
                </div>
 
                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "button")}
                  className="p-3 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 hover:from-emerald-600/20 hover:to-emerald-600/20 border border-emerald-500/10 hover:border-emerald-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-emerald-500/10"><MousePointerClick size={14} className="text-emerald-400" /></div>
                  <span>Button</span>
                </div>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "a")}
                  className="p-3 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 hover:from-cyan-600/20 hover:to-teal-600/20 border border-cyan-500/10 hover:border-cyan-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-cyan-500/10"><Globe size={14} className="text-cyan-400" /></div>
                  <span>Hyperlink Link</span>
                </div>
 
                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "img")}
                  className="p-3 bg-gradient-to-r from-amber-600/10 to-orange-600/10 hover:from-amber-600/20 hover:to-orange-600/20 border border-amber-500/10 hover:border-amber-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-amber-500/10"><Grid size={14} className="text-amber-400" /></div>
                  <span>Image Block</span>
                </div>

                {/* ── Step 2: Layout & Structure ── */}
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-2 mb-0.5">Layout</p>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "div")}
                  className="p-3 bg-gradient-to-r from-slate-600/10 to-zinc-600/10 hover:from-slate-600/20 hover:to-zinc-600/20 border border-slate-500/10 hover:border-slate-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-slate-500/10"><Layout size={14} className="text-slate-400" /></div>
                  <span>Card Box</span>
                </div>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "hr")}
                  className="p-3 bg-gradient-to-r from-slate-600/10 to-zinc-600/10 hover:from-slate-600/20 hover:to-zinc-600/20 border border-slate-500/10 hover:border-slate-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-slate-500/10"><SeparatorHorizontal size={14} className="text-slate-400" /></div>
                  <span>Divider Line</span>
                </div>

                {/* ── Step 3: Form Elements ── */}
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-2 mb-0.5">Forms</p>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "input")}
                  className="p-3 bg-gradient-to-r from-violet-600/10 to-purple-600/10 hover:from-violet-600/20 hover:to-purple-600/20 border border-violet-500/10 hover:border-violet-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-violet-500/10"><TextCursorInput size={14} className="text-violet-400" /></div>
                  <span>Input Box</span>
                </div>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "textarea")}
                  className="p-3 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 hover:from-violet-600/20 hover:to-fuchsia-600/20 border border-violet-500/10 hover:border-violet-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-violet-500/10"><AlignLeft size={14} className="text-violet-300" /></div>
                  <span>Text Area</span>
                </div>

                {/* ── Step 4: Media & Data ── */}
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-2 mb-0.5">Media & Data</p>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "table")}
                  className="p-3 bg-gradient-to-r from-rose-600/10 to-pink-600/10 hover:from-rose-600/20 hover:to-pink-600/20 border border-rose-500/10 hover:border-rose-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-rose-500/10"><Table2 size={14} className="text-rose-400" /></div>
                  <span>Data Table</span>
                </div>

                <div 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, "video")}
                  className="p-3 bg-gradient-to-r from-rose-600/10 to-red-600/10 hover:from-rose-600/20 hover:to-red-600/20 border border-rose-500/10 hover:border-rose-500/25 rounded-xl cursor-grab flex items-center gap-2.5 text-xs font-bold text-slate-355 hover:text-white transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-rose-500/10"><Video size={14} className="text-rose-300" /></div>
                  <span>Video Block</span>
                </div>
              </div>
            ) : (
                <div className="space-y-4">
                  {activeComp ? (
                    <div className="space-y-3">

                      {/* ── Component Badge ── */}
                      <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-center ${isLight ? "bg-slate-100 text-slate-600" : "bg-slate-900 text-slate-400"}`}>
                        Editing: <span className="text-blue-400">&lt;{activeComp.type}&gt;</span>
                      </div>

                      {/* ── CONTENT / TEXT (not for hr, table, video) ── */}
                      {!["hr", "table", "video"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">
                            {activeComp.type === "input" || activeComp.type === "textarea" ? "Placeholder" : activeComp.type === "img" ? "Image URL" : "Content Text"}
                          </span>
                          <input
                            type="text"
                            value={activeComp.type === "img" ? (activeComp.src || "") : activeComp.content}
                            onChange={(e) => {
                              if (activeComp.type === "img") {
                                setComponents(prev => prev.map(c => c.id === activeComp.id ? { ...c, src: e.target.value } : c));
                              } else {
                                updateActiveCompContent(e.target.value);
                              }
                            }}
                            className={`w-full mt-1.5 px-3 py-2 border rounded-xl text-xs focus:outline-none transition-all ${isLight ? "bg-white border-slate-200 text-slate-800 focus:border-blue-500" : "bg-slate-950 border-slate-800 text-white focus:border-blue-500"}`}
                          />
                        </div>
                      )}

                      {/* ── HREF (only for links) ── */}
                      {activeComp.type === "a" && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">Link URL (href)</span>
                          <input
                            type="text"
                            value={activeComp.href || ""}
                            onChange={(e) => setComponents(prev => prev.map(c => c.id === activeComp.id ? { ...c, href: e.target.value } : c))}
                            placeholder="https://example.com"
                            className={`w-full mt-1.5 px-3 py-2 border rounded-xl text-xs focus:outline-none transition-all ${isLight ? "bg-white border-slate-200 text-slate-800 focus:border-blue-500" : "bg-slate-950 border-slate-800 text-white focus:border-blue-500"}`}
                          />
                        </div>
                      )}

                      {/* ── VIDEO CAPTION ── */}
                      {activeComp.type === "video" && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">Caption / Label</span>
                          <input
                            type="text"
                            value={activeComp.content}
                            onChange={(e) => updateActiveCompContent(e.target.value)}
                            className={`w-full mt-1.5 px-3 py-2 border rounded-xl text-xs focus:outline-none transition-all ${isLight ? "bg-white border-slate-200 text-slate-800 focus:border-blue-500" : "bg-slate-950 border-slate-800 text-white focus:border-blue-500"}`}
                          />
                        </div>
                      )}

                      {/* ── TEXT COLOR (not for hr, img, video, table) ── */}
                      {!["hr", "img", "video", "table"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">Text Color</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {["#ffffff", "#38bdf8", "#10b981", "#fb7185", "#fbbf24", "#a78bfa", "#f97316", "#64748b"].map((c) => (
                              <button
                                key={c}
                                onClick={() => updateActiveCompStyle("color", c)}
                                style={{ backgroundColor: c }}
                                className={`w-5 h-5 rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-transform ${activeComp.styles.color === c ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── DIVIDER COLOR (only for hr) ── */}
                      {activeComp.type === "hr" && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">Line Color</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {["#475569", "#3b82f6", "#10b981", "#ef4444", "#fbbf24", "#ffffff"].map((c) => (
                              <button
                                key={c}
                                onClick={() => updateActiveCompStyle("color", c)}
                                style={{ backgroundColor: c }}
                                className={`w-5 h-5 rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-transform ${activeComp.styles.color === c ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── BACKGROUND COLOR (not for hr, img, video) ── */}
                      {!["hr", "img", "video"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">Background</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {["transparent", "#1e293b", "#0f172a", "#3b82f6", "#10b981", "#ef4444", "#7c3aed"].map((bg) => (
                              <button
                                key={bg}
                                onClick={() => updateActiveCompStyle("backgroundColor", bg)}
                                className={`w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-[8px] font-bold hover:scale-110 active:scale-95 transition-transform ${activeComp.styles.backgroundColor === bg ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950" : ""}`}
                                style={{ backgroundColor: bg === "transparent" ? "#64748b" : bg }}
                              >
                                {bg === "transparent" && "T"}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── FONT SIZE (text elements and buttons only) ── */}
                      {["h1", "h2", "h3", "p", "a", "button", "div", "input", "textarea", "table"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455 flex justify-between">
                            <span>Font Size</span>
                            <span className="font-bold text-blue-400">{activeComp.styles.fontSize}</span>
                          </span>
                          <input
                            type="range" min="10" max="48"
                            value={parseInt(activeComp.styles.fontSize) || 14}
                            onChange={(e) => updateActiveCompStyle("fontSize", `${e.target.value}px`)}
                            className="w-full mt-1.5 accent-blue-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}

                      {/* ── PADDING (not for hr, table) ── */}
                      {!["hr", "table"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455 flex justify-between">
                            <span>Padding</span>
                            <span className="font-bold text-blue-400">{activeComp.styles.padding}</span>
                          </span>
                          <input
                            type="range" min="0" max="32"
                            value={parseInt(activeComp.styles.padding) || 10}
                            onChange={(e) => updateActiveCompStyle("padding", `${e.target.value}px`)}
                            className="w-full mt-1.5 accent-blue-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}

                      {/* ── BORDER RADIUS (not for hr, table, img) ── */}
                      {!["hr", "table", "img"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455 flex justify-between">
                            <span>Border Radius</span>
                            <span className="font-bold text-blue-400">{activeComp.styles.borderRadius}</span>
                          </span>
                          <input
                            type="range" min="0" max="32"
                            value={parseInt(activeComp.styles.borderRadius) || 0}
                            onChange={(e) => updateActiveCompStyle("borderRadius", `${e.target.value}px`)}
                            className="w-full mt-1.5 accent-blue-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}

                      {/* ── TEXT ALIGN (text/block elements) ── */}
                      {["h1", "h2", "h3", "p", "a", "button", "div"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455">Alignment</span>
                          <div className="flex gap-1.5 mt-1.5">
                            {(["left", "center", "right"] as const).map(align => (
                              <button
                                key={align}
                                onClick={() => updateActiveCompStyle("textAlign", align)}
                                className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${activeComp.styles.textAlign === align ? "bg-blue-600 text-white" : isLight ? "bg-slate-100 text-slate-500 hover:bg-slate-200" : "bg-slate-900 text-slate-500 hover:bg-slate-800"}`}
                              >
                                {align === "left" ? "⬅" : align === "center" ? "☰" : "➡"}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── MARGIN (for hr and img only) ── */}
                      {["hr", "img"].includes(activeComp.type) && (
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-455 flex justify-between">
                            <span>Margin</span>
                            <span className="font-bold text-blue-400">{activeComp.styles.margin}</span>
                          </span>
                          <input
                            type="range" min="0" max="32"
                            value={parseInt(activeComp.styles.margin) || 8}
                            onChange={(e) => updateActiveCompStyle("margin", `${e.target.value}px`)}
                            className="w-full mt-1.5 accent-blue-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}

                      {/* ── JS BEHAVIOR ── */}
                      {!["hr", "img", "table"].includes(activeComp.type) && (
                        <div className={`rounded-xl border p-3 space-y-2.5 ${isLight ? "border-yellow-200 bg-yellow-50/50" : "border-yellow-500/10 bg-yellow-500/5"}`}>
                          <p className="text-[9px] font-black uppercase tracking-widest text-yellow-500 flex items-center gap-1">
                            <span>⚡</span> JS Behavior
                          </p>

                          {/* Event picker */}
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-455">On Event</span>
                            <select
                              value={activeComp.jsAction?.event || "click"}
                              onChange={(e) => setComponents(prev => prev.map(c => c.id === activeComp.id ? {
                                ...c,
                                jsAction: { event: e.target.value as NonNullable<UIComponent["jsAction"]>["event"], action: c.jsAction?.action || "log", value: c.jsAction?.value || "" }
                              } : c))}
                              className={`w-full mt-1 px-2 py-1.5 border rounded-lg text-xs focus:outline-none ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-950 border-slate-800 text-white"}`}
                            >
                              <option value="click">🖱️ onClick (click)</option>
                              <option value="mouseenter">🔼 onMouseEnter (hover in)</option>
                              <option value="mouseleave">🔽 onMouseLeave (hover out)</option>
                              <option value="change">✏️ onChange (input change)</option>
                              <option value="focus">🎯 onFocus (focus)</option>
                            </select>
                          </div>

                          {/* Action picker */}
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-455">Do Action</span>
                            <select
                              value={activeComp.jsAction?.action || "log"}
                              onChange={(e) => setComponents(prev => prev.map(c => c.id === activeComp.id ? {
                                ...c,
                                jsAction: { event: c.jsAction?.event || "click", action: e.target.value as NonNullable<UIComponent["jsAction"]>["action"], value: c.jsAction?.value || "" }
                              } : c))}
                              className={`w-full mt-1 px-2 py-1.5 border rounded-lg text-xs focus:outline-none ${isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-950 border-slate-800 text-white"}`}
                            >
                              <option value="alert">💬 Show Alert</option>
                              <option value="log">🖨️ Log to Console</option>
                              <option value="redirect">🔗 Redirect to URL</option>
                              <option value="toggle">👁️ Toggle Visibility</option>
                              <option value="changeText">✏️ Change Text Content</option>
                              <option value="custom">🧩 Custom JavaScript</option>
                            </select>
                          </div>

                          {/* Value input */}
                          {activeComp.jsAction?.action !== "toggle" && (
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-455">
                                {activeComp.jsAction?.action === "redirect" ? "URL" :
                                 activeComp.jsAction?.action === "custom" ? "JS Code" :
                                 activeComp.jsAction?.action === "changeText" ? "New Text" : "Message"}
                              </span>
                              <input
                                type="text"
                                placeholder={activeComp.jsAction?.action === "redirect" ? "https://example.com" :
                                             activeComp.jsAction?.action === "custom" ? "document.body.style.background = 'red'" :
                                             "Hello World!"}
                                value={activeComp.jsAction?.value || ""}
                                onChange={(e) => setComponents(prev => prev.map(c => c.id === activeComp.id ? {
                                  ...c,
                                  jsAction: { event: c.jsAction?.event || "click", action: c.jsAction?.action || "log", value: e.target.value }
                                } : c))}
                                className={`w-full mt-1 px-2 py-1.5 border rounded-lg text-xs focus:outline-none font-mono ${isLight ? "bg-white border-slate-200 text-slate-800 focus:border-yellow-500" : "bg-slate-950 border-slate-800 text-white focus:border-yellow-500"}`}
                              />
                            </div>
                          )}

                          {/* Code preview */}
                          {(activeComp.jsAction?.value || activeComp.jsAction?.action === "toggle") && (
                            <div className={`rounded-lg p-2 font-mono text-[9px] leading-relaxed ${isLight ? "bg-yellow-100 text-slate-700" : "bg-slate-950 text-yellow-300"}`}>
                              <span className="text-slate-500">// generated snippet</span><br />
                              <span className="text-blue-400">el.addEventListener</span>(<span className="text-green-400">&apos;{activeComp.jsAction?.event || "click"}&apos;</span>, () =&gt; {'{'}<br />
                              &nbsp;&nbsp;{activeComp.jsAction?.action === "alert" && <><span className="text-yellow-400">alert</span>(<span className="text-green-400">&apos;{activeComp.jsAction.value}&apos;</span>);</>}
                              {activeComp.jsAction?.action === "log" && <><span className="text-yellow-400">console.log</span>(<span className="text-green-400">&apos;{activeComp.jsAction?.value}&apos;</span>);</>}
                              {activeComp.jsAction?.action === "redirect" && <><span className="text-yellow-400">location.href</span> = <span className="text-green-400">&apos;{activeComp.jsAction.value}&apos;</span>;</>}
                              {activeComp.jsAction?.action === "toggle" && <><span className="text-yellow-400">el.style.display</span> = ...</>}
                              {activeComp.jsAction?.action === "changeText" && <><span className="text-yellow-400">el.textContent</span> = <span className="text-green-400">&apos;{activeComp.jsAction.value}&apos;</span>;</>}
                              {activeComp.jsAction?.action === "custom" && <span className="text-slate-300">{activeComp.jsAction.value}</span>}<br />
                              {'}'});
                            </div>
                          )}
                        </div>
                      )}

                      {/* ── DELETE ── */}
                      <button
                        onClick={deleteActiveComp}
                        className="w-full py-2 bg-red-955/20 hover:bg-red-955/40 border border-red-500/20 text-red-405 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                      >
                        <Trash2 size={12} />
                        <span>Delete Component</span>
                      </button>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-550 italic">Select any canvas component to edit its properties.</p>
                  )}
                </div>
            )}
          </div>
 
          {/* Ad Placement: Clean at the bottom of Column 1 */}
          <div className="border-t border-white/5 pt-3 shrink-0">
            <AdSenseBanner />
          </div>
        </div>
 
        {/* COLUMN 2: Simulated Device Preview Canvas */}
        <div className={`flex-1 flex flex-col p-4 md:p-6 items-center justify-start overflow-y-auto border-r transition-colors duration-300 ${
          isLight ? "bg-slate-100 border-slate-200" : isSepia ? "bg-[#f4ecd8] border-[#e6dcc8]" : "bg-[#090d16] border-slate-900"
        } ${
          (editorMode === "builder" && builderTab === "canvas") || (editorMode === "editor" && viewMode === "preview") ? "flex" : "hidden md:flex"
        }`}>
          {/* Bezel Switch Control Panel */}
          <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-[900px] mb-5 shrink-0">
            {/* Device switches */}
            <div className={`flex items-center gap-1.5 p-1 rounded-xl border ${isLight ? "bg-white border-slate-200/80 shadow-sm" : isSepia ? "bg-[#ebdcb9] border-[#e6dcc8]" : "bg-slate-955 border-white/5"}`}>
              <button 
                onClick={() => setDeviceMode("desktop")}
                className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${deviceMode === "desktop" ? "bg-blue-600 text-white" : "text-slate-450 hover:text-white"}`}
              >
                <span>Desktop View</span>
              </button>
              <button 
                onClick={() => setDeviceMode("tablet")}
                className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${deviceMode === "tablet" ? "bg-blue-600 text-white" : "text-slate-455 hover:text-white"}`}
              >
                <span>Tablet</span>
              </button>
              <button 
                onClick={() => setDeviceMode("mobile")}
                className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${deviceMode === "mobile" ? "bg-blue-600 text-white" : "text-slate-455 hover:text-white"}`}
              >
                <span>Mobile</span>
              </button>
            </div>
 
            {/* Visual Designer vs compiled browser preview */}
            <div className={`flex items-center p-0.5 border rounded-xl ${isLight ? "bg-white border-slate-200/80 shadow-sm" : isSepia ? "bg-[#ebdcb9] border-[#e6dcc8]" : "bg-slate-955 border-white/5"}`}>
              <button 
                onClick={() => setPreviewType("design")}
                className={`px-3.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${previewType === "design" ? "bg-blue-600 text-white shadow-sm" : "text-slate-455 hover:text-white"}`}
              >
                <span>Visual Canvas</span>
              </button>
              <button 
                onClick={() => {
                  setPreviewType("browser");
                  runCode();
                }}
                className={`px-3.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${previewType === "browser" ? "bg-blue-600 text-white shadow-sm" : "text-slate-455 hover:text-white"}`}
              >
                <span>Live Preview</span>
              </button>
            </div>
          </div>
 
          {/* Simulated Device bezel container */}
          <div 
            className={`flex flex-col border-4 border-slate-800 dark:border-slate-900 rounded-[32px] bg-slate-955 shadow-2xl transition-all duration-300 overflow-hidden relative shrink-0 ${
              deviceMode === "mobile" ? "w-[340px] h-[580px]" : 
              deviceMode === "tablet" ? "w-[600px] h-[640px]" : 
              "w-full max-w-[900px] min-h-[500px] flex-1"
            }`}
          >
            {/* Device top status notch/camera */}
            <div className="h-6 bg-slate-900 flex items-center justify-between px-6 shrink-0 text-[9px] font-bold text-slate-550 border-b border-slate-955 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>sandbox.local</span>
              </div>
              <div className="w-16 h-3 rounded-full bg-slate-955 absolute left-1/2 -translate-x-1/2 top-1.5 animate-pulse" />
              <div className="flex items-center gap-2">
                <span>100% 🔋</span>
              </div>
            </div>
            
            {/* Simulated browser location bar */}
            <div className="bg-[#0b101c] px-4 py-2 border-b border-white/5 flex items-center justify-between gap-3 text-xs shrink-0 select-none">
              <div className="flex gap-1 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
              <div className="flex-1 bg-slate-950 border border-white/5 text-[9px] text-slate-400 py-1 px-3 rounded-lg text-center font-mono select-all truncate">
                {previewType === "design" ? "https://nextsem.online/sandbox/visual-page" : (liveServer ? "http://127.0.0.1:5500/index.html" : "file:///workspace/index.html")}
              </div>
            </div>
 
            {/* Content pane: renders Visual Canvas or compiled Iframe */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0c1222]">
              {previewType === "design" ? (
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4 items-center justify-start min-h-[300px]"
                >
                  {components.length === 0 ? (
                    <div className="text-center my-auto p-8 text-slate-500 text-xs flex flex-col items-center gap-2.5">
                      <MousePointerClick size={24} className="animate-bounce text-blue-500" />
                      <span className="font-bold text-slate-400">Your Canvas is Ready</span>
                      <span className="text-[10px] text-slate-550 max-w-[180px]">Drag components from the elements palette and drop them here.</span>
                    </div>
                  ) : (
                    components.map((comp) => {
                      const isActive = comp.id === activeCompId;
                      // Base style applied to the wrapper — responsive block layout
                      const baseStyle: React.CSSProperties = {
                        backgroundColor: comp.styles.backgroundColor === "transparent" ? undefined : comp.styles.backgroundColor,
                        color: comp.styles.color,
                        borderRadius: comp.styles.borderRadius,
                        padding: comp.styles.padding,
                        fontSize: comp.styles.fontSize,
                        margin: comp.styles.margin,
                        textAlign: comp.styles.textAlign as React.CSSProperties["textAlign"],
                        width: "100%",
                        boxSizing: "border-box",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      };

                      return (
                        <div
                          key={comp.id}
                          onClick={(e) => { e.stopPropagation(); setActiveCompId(comp.id); setSidebarTab("properties"); }}
                          className={`w-full relative transition-all rounded-xl ${isActive ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950 p-1" : "hover:ring-1 hover:ring-slate-700 p-1 cursor-pointer"}`}
                        >
                          {/* ── Headings ── */}
                          {comp.type === "h1" && (
                            <h1 style={baseStyle} className="font-black leading-tight w-full break-words">
                              {comp.content}
                            </h1>
                          )}
                          {comp.type === "h2" && (
                            <h2 style={baseStyle} className="font-bold leading-tight w-full break-words">
                              {comp.content}
                            </h2>
                          )}
                          {comp.type === "h3" && (
                            <h3 style={baseStyle} className="font-semibold leading-snug w-full break-words">
                              {comp.content}
                            </h3>
                          )}

                          {/* ── Paragraph ── */}
                          {comp.type === "p" && (
                            <p style={baseStyle} className="leading-relaxed w-full break-words">
                              {comp.content}
                            </p>
                          )}

                          {/* ── Button — wraps text, full-width by default ── */}
                          {comp.type === "button" && (
                            <div className="w-full flex" style={{ justifyContent: comp.styles.textAlign === "right" ? "flex-end" : comp.styles.textAlign === "center" ? "center" : "flex-start" }}>
                              <button
                                style={{ ...baseStyle, width: "auto", minWidth: "80px", whiteSpace: "normal", lineHeight: "1.4", cursor: "default" }}
                                className="font-black uppercase tracking-wider"
                              >
                                {comp.content}
                              </button>
                            </div>
                          )}

                          {/* ── Link ── */}
                          {comp.type === "a" && (
                            <a href="#" style={baseStyle} className="underline font-bold w-full block break-words">
                              {comp.content}
                            </a>
                          )}

                          {/* ── Image — max-width full, height auto ── */}
                          {comp.type === "img" && (
                            <img
                              src={comp.src || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"}
                              style={{ borderRadius: comp.styles.borderRadius, margin: comp.styles.margin, display: "block" }}
                              alt="visual component"
                              className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                          )}

                          {/* ── Card Box ── */}
                          {comp.type === "div" && (
                            <div
                              style={{ ...baseStyle, border: "1px solid #334155", minHeight: "60px" }}
                              className="rounded-xl shadow-inner w-full"
                            >
                              <span className="text-slate-300 text-sm break-words">{comp.content}</span>
                            </div>
                          )}

                          {/* ── Divider ── */}
                          {comp.type === "hr" && (
                            <hr style={{ border: "none", borderTop: `2px solid ${comp.styles.color || "#475569"}`, margin: comp.styles.margin, width: "100%" }} />
                          )}

                          {/* ── Input — full width, auto height ── */}
                          {comp.type === "input" && (
                            <input
                              readOnly
                              placeholder={comp.content}
                              style={{
                                ...baseStyle,
                                border: "1px solid #475569",
                                outline: "none",
                                display: "block",
                                height: "auto",
                                minHeight: "36px",
                              }}
                              className="rounded-lg text-slate-300 placeholder-slate-500 w-full"
                            />
                          )}

                          {/* ── Textarea — resizes with content ── */}
                          {comp.type === "textarea" && (
                            <textarea
                              readOnly
                              placeholder={comp.content}
                              rows={Math.max(3, Math.ceil(comp.content.length / 40))}
                              style={{
                                ...baseStyle,
                                border: "1px solid #475569",
                                outline: "none",
                                display: "block",
                                resize: "none",
                                minHeight: "80px",
                              }}
                              className="rounded-lg text-slate-300 placeholder-slate-500 w-full"
                            />
                          )}

                          {/* ── Table — horizontally scrollable on small widths ── */}
                          {comp.type === "table" && (
                            <div className="w-full overflow-x-auto rounded-xl">
                              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: comp.styles.fontSize, color: comp.styles.color, minWidth: "280px" }}>
                                <thead>
                                  <tr style={{ background: "#1e293b" }}>
                                    {["Name", "Role", "Status"].map(h => (
                                      <th key={h} style={{ border: "1px solid #334155", padding: "8px", whiteSpace: "nowrap" }}>{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {[["Alice", "Developer", "✅ Active"], ["Bob", "Designer", "✅ Active"]].map((row, i) => (
                                    <tr key={i}>
                                      {row.map((cell, j) => (
                                        <td key={j} style={{ border: "1px solid #334155", padding: "8px", textAlign: "center", whiteSpace: "nowrap" }}>{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* ── Video placeholder — full width, auto height ── */}
                          {comp.type === "video" && (
                            <div
                              style={{
                                background: "#0f172a",
                                border: "2px dashed #475569",
                                minHeight: "120px",
                                width: "100%",
                                borderRadius: comp.styles.borderRadius || "10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: comp.styles.padding,
                                boxSizing: "border-box",
                              }}
                            >
                              <Video size={32} className="text-slate-500 shrink-0" />
                              <span className="text-slate-500 text-xs text-center break-words px-4">{comp.content}</span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="flex-1 relative bg-white">
                  {iframeSrcDoc ? (
                     <iframe
                       ref={iframeRef}
                       title="Nextsem Code Sandbox Preview"
                       srcDoc={iframeSrcDoc}
                       sandbox="allow-scripts"
                       className="w-full h-full border-none bg-white"
                     />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-2 bg-[#0c1222]">
                      <Play size={32} className="animate-pulse text-indigo-555" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-450">Click RUN or Turn On LIVE SERVER</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
 
        {/* COLUMN 3: Code Editor & UNIX Terminal Console */}
        <div className={`w-full md:w-[480px] flex flex-col overflow-hidden shrink-0 border-l transition-colors duration-300 ${
          isLight ? "border-slate-200" : isSepia ? "border-[#e6dcc8]" : "border-slate-900"
        } ${
          editorMode === "editor" && viewMode === "editor" ? "flex" : "hidden md:flex"
        }`}>
          {/* Header Tab selection panel */}
          <div className={`flex items-center justify-between px-3 py-1.5 border-b text-xs gap-1 shrink-0 transition-colors duration-300 ${isLight ? "bg-slate-50 border-slate-200" : isSepia ? "bg-[#ebdcb9]/40 border-[#e6dcc8]" : "bg-[#05080f] border-slate-900"}`}>
            {/* Desktop file tabs */}
            <div className="hidden sm:flex gap-1.5">
              <button 
                onClick={() => setActiveTab("html")} 
                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === "html" ? "border-orange-500 text-orange-400 bg-slate-950/30" : "text-slate-455 border-transparent hover:text-slate-250"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>index.html</span>
              </button>
              <button 
                onClick={() => setActiveTab("css")} 
                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === "css" ? "border-blue-500 text-blue-400 bg-slate-950/30" : "text-slate-455 border-transparent hover:text-slate-250"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>style.css</span>
              </button>
              <button 
                onClick={() => setActiveTab("js")} 
                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === "js" ? "border-yellow-500 text-yellow-400 bg-slate-950/30" : "text-slate-455 border-transparent hover:text-slate-250"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span>script.js</span>
              </button>
            </div>
 
            {/* Mobile file selector */}
            <div className="flex sm:hidden max-w-[150px] relative py-1">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as "html" | "css" | "js")}
                className={`w-full border rounded-xl px-3.5 py-1 text-xs font-black focus:outline-none appearance-none cursor-pointer pr-7 ${isLight ? "bg-white border-slate-200 text-slate-800" : isSepia ? "bg-[#f4ecd8] border-[#ebdcb9] text-[#5b4636]" : "bg-slate-900 border-slate-800 text-white"}`}
              >
                <option value="html">📄 index.html</option>
                <option value="css">🎨 style.css</option>
                <option value="js">⚡ script.js</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-455">
                <span className="text-[7px]">▼</span>
              </div>
            </div>
 
            {/* Format code button */}
            <button 
              onClick={handleFormat}
              disabled={isFormatting}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all border ${isFormatting ? "animate-pulse" : ""} ${isLight ? "border-slate-300 text-slate-600 hover:bg-slate-100" : isSepia ? "border-[#d2c29e] text-[#5b4636] hover:bg-[#ebdcb9]" : "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"}`}
            >
              <Sparkles size={11} className="text-amber-500" />
              <span>{isFormatting ? "Formatting..." : "Format Code"}</span>
            </button>
          </div>
 
          {/* Gutter + TextArea editor space */}
          <div className="flex-1 flex overflow-hidden bg-[#090d16] font-mono relative">
            {/* Gutter */}
            <div 
              ref={gutterRef}
              className="select-none text-right pr-2.5 pl-3 border-r border-slate-800/80 text-slate-600 font-mono text-[13px] leading-[20px] bg-[#05080f] shrink-0 overflow-y-hidden select-none pointer-events-none"
              style={{ width: '42px', userSelect: 'none', paddingTop: '2%', paddingBottom: '2%' }}
            >
              {lineNumbers.map((n) => (
                <div key={n} className="h-[20px]">{n}</div>
              ))}
            </div>
 
            {/* TextArea editor */}
            <div className="flex-1 relative overflow-hidden h-full">
              {/* Overlay highlighter */}
              <pre
                ref={highlightRef}
                className="absolute inset-0 text-slate-350 pointer-events-none whitespace-pre-wrap break-all overflow-y-auto overflow-x-hidden h-full w-full select-none"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '13px',
                  lineHeight: '20px',
                  padding: '2%',
                  border: 'none',
                  margin: '0',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}
                dangerouslySetInnerHTML={{
                  __html: activeTab === "html" 
                    ? highlightHTML(htmlCode) 
                    : activeTab === "css" 
                      ? highlightCSS(cssCode) 
                      : highlightJS(jsCode)
                }}
              />
              {/* Actual textarea overlay */}
              <textarea
                ref={editorRef}
                value={activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode}
                onChange={(e) => {
                  if (activeTab === "html") setHtmlCode(e.target.value);
                  else if (activeTab === "css") setCssCode(e.target.value);
                  else setJsCode(e.target.value);
                }}
                onScroll={handleScroll}
                className="absolute inset-0 bg-transparent focus:outline-none resize-none overflow-y-auto overflow-x-hidden text-transparent caret-white whitespace-pre-wrap break-all"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '13px',
                  lineHeight: '20px',
                  padding: '2%',
                  border: 'none',
                  margin: '0',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}
                spellCheck="false"
              />
            </div>
          </div>
 
          {/* UNIX Console outputs pane */}
          <div className="h-[30%] min-h-[140px] flex flex-col overflow-hidden shrink-0 border-t border-slate-900 bg-[#05080f]">
            <div className="px-4 py-2 border-b border-slate-900/80 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-455 bg-[#090d16]/30">
              <span className="flex items-center gap-1.5">
                <Terminal size={13} className="text-blue-400" />
                <span>Console Outputs</span>
              </span>
              <div className="flex items-center gap-3">
                {liveServer && (
                  <span className="text-[9px] text-emerald-400/80 font-bold tracking-normal normal-case hidden sm:inline-block">
                    📡 Port 5500 active
                  </span>
                )}
                {logs.length > 0 && (
                  <button 
                    onClick={() => setLogs([])}
                    className="text-[9px] font-bold text-slate-550 hover:text-white transition-colors cursor-pointer"
                  >
                    Clear Console
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 p-3.5 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-350 bg-[#05080f]">
              {logs.length === 0 ? (
                <span className="italic text-slate-655 block pl-1">Console is active. Use console.log() to print events.</span>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className={`py-0.5 border-b border-white/5 last:border-b-0 flex items-start gap-2 ${log.type === "error" ? "text-rose-455 bg-rose-500/5 px-2 py-1 rounded" : "text-blue-300"}`}>
                    <span className="text-slate-555 select-none">&gt;</span>
                    <span className="whitespace-pre-wrap break-all">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
 
        {/* Mobile Tab switcher (only visible on mobile, positioned above BottomNavigation) */}
        <div className={`absolute bottom-14 left-0 right-0 h-12 border-t flex items-center justify-center gap-2 px-4 z-40 md:hidden ${isLight ? "bg-white/90 border-slate-200" : isSepia ? "bg-[#ebdcb9]/90 border-[#e6dcc8]" : "bg-slate-950/90 border-slate-900"}`}>
          {editorMode === "builder" ? (
            <div className="flex bg-slate-900/60 p-0.5 border border-white/5 rounded-xl w-full max-w-sm justify-around">
              <button 
                onClick={() => { setBuilderTab("palette"); setSidebarTab("palette"); }}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${builderTab === "palette" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <Grid size={11} />
                <span>Palette</span>
              </button>
              <button 
                onClick={() => setBuilderTab("canvas")}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${builderTab === "canvas" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <Layout size={11} />
                <span>Canvas</span>
              </button>
              <button 
                onClick={() => { setBuilderTab("properties"); setSidebarTab("properties"); }}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${builderTab === "properties" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <Sliders size={11} />
                <span>Properties</span>
              </button>
            </div>
          ) : (
            <div className="flex bg-slate-900/60 p-0.5 border border-white/5 rounded-xl w-full max-w-sm justify-around">
              <button 
                onClick={() => setViewMode("editor")}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${viewMode === "editor" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <FileCode size={11} />
                <span>Source Code</span>
              </button>
              <button 
                onClick={() => setViewMode("preview")}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${viewMode === "preview" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                <Layout size={11} />
                <span>Preview</span>
              </button>
            </div>
          )}
        </div>
 
      </div>
    </div>
  );
}
 
// ── PRETTIER MOCK CODE FORMATTERS ──
function formatHTML(html: string): string {
  let formatted = "";
  let indent = 0;
  const cleanHtml = html
    .replace(/>\s+</g, "><")
    .replace(/(<[^>]+>)/g, "\n$1\n")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
 
  for (const line of cleanHtml) {
    const isClosing = line.startsWith("</");
    const isSelfClosing = line.endsWith("/>") || /<(!DOCTYPE|meta|link|img|br|hr|input)/i.test(line);
 
    if (isClosing) {
      indent = Math.max(0, indent - 1);
    }
    
    formatted += "  ".repeat(indent) + line + "\n";
    
    if (!isClosing && !isSelfClosing && !line.startsWith("<!")) {
      indent++;
    }
  }
  return formatted.trim();
}
 
function formatCSS(css: string): string {
  let formatted = "";
  let indent = 0;
  const lines = css
    .replace(/\s+/g, " ")
    .replace(/{/g, " {\n")
    .replace(/}/g, "\n}\n")
    .replace(/;/g, ";\n")
    .replace(/,/g, ", ")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
 
  for (const line of lines) {
    if (line.startsWith("}")) {
      indent = Math.max(0, indent - 1);
    }
    formatted += "  ".repeat(indent) + line + "\n";
    if (line.endsWith("{")) {
      indent++;
    }
  }
  return formatted.replace(/\n\s*\n/g, "\n\n").trim();
}
 
function formatJS(js: string): string {
  let formatted = "";
  let indent = 0;
  const lines = js
    .replace(/\s+/g, " ")
    .replace(/{/g, " {\n")
    .replace(/}/g, "\n}\n")
    .replace(/;/g, ";\n")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
 
  for (const line of lines) {
    if (line.startsWith("}")) {
      indent = Math.max(0, indent - 1);
    }
    formatted += "  ".repeat(indent) + line + "\n";
    if (line.endsWith("{")) {
      indent++;
    }
  }
  return formatted.replace(/\n\s*\n/g, "\n\n").trim();
}
 
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
 
// ── VS CODE SYNTAX HIGH LIGHTING ──
function highlightHTML(code: string): string {
  const parts = code.split(/(<!--[\s\S]*?-->|<[^>]+>)/g);
  return parts.map(part => {
    if (!part) return "";
    
    // Comment
    if (part.startsWith("<!--") && part.endsWith("-->")) {
      const escaped = escapeHtml(part);
      return `<span class="text-slate-500 font-normal italic">${escaped}</span>`;
    }
    
    // Tag
    if (part.startsWith("<") && part.endsWith(">")) {
      const isClosing = part.startsWith("</");
      const cleanTag = part.replace(/[<>]/g, ""); // strip < and >
      
      // Highlight attributes inside the clean tag
      // Attribute values: ="..." or ='...'
      let highlighted = cleanTag.replace(/(=["'][^"']*?["'])/g, '<span class="text-amber-300">$1</span>');
      
      // Attributes: name=
      highlighted = highlighted.replace(/(\s[a-zA-Z0-9\-]+)=/g, ' <span class="text-cyan-400">$1</span>=');
      
      // Tag name: at the start of the tag
      if (isClosing) {
        highlighted = highlighted.replace(/^(\/[a-zA-Z0-9\-]+)/, '<span class="text-blue-400 font-bold">$1</span>');
      } else {
        highlighted = highlighted.replace(/^([a-zA-Z0-9\-]+)/, '<span class="text-blue-400 font-bold">$1</span>');
      }
      
      return `<span class="text-blue-400 font-bold">&lt;</span>${highlighted}<span class="text-blue-400 font-bold">&gt;</span>`;
    }
    
    // Text content
    return escapeHtml(part);
  }).join("");
}
 
function highlightCSS(code: string): string {
  const parts = code.split(/(\/\*[\s\S]*?\*\/)/g);
  let inRule = false;
  
  return parts.map(part => {
    if (!part) return "";
    
    // Comment
    if (part.startsWith("/*") && part.endsWith("*/")) {
      return `<span class="text-slate-550 italic">${escapeHtml(part)}</span>`;
    }
    
    // Split by brackets
    const subParts = part.split(/([{}])/g);
    return subParts.map(sub => {
      if (sub === "{") {
        inRule = true;
        return '<span class="text-yellow-500 font-bold">{</span>';
      }
      if (sub === "}") {
        inRule = false;
        return '<span class="text-yellow-500 font-bold">}</span>';
      }
      if (!sub.trim()) return sub;
      
      if (!inRule) {
        return `<span class="text-orange-400 font-bold">${escapeHtml(sub)}</span>`;
      } else {
        const decls = sub.split(/(;)/g);
        return decls.map(decl => {
          if (decl === ";") {
            return '<span class="text-slate-400">;</span>';
          }
          if (!decl.trim()) return decl;
          
          const colonIdx = decl.indexOf(":");
          if (colonIdx >= 0) {
            const prop = decl.slice(0, colonIdx);
            const val = decl.slice(colonIdx + 1);
            return `<span class="text-cyan-400">${escapeHtml(prop)}</span>:<span class="text-emerald-400">${escapeHtml(val)}</span>`;
          }
          return escapeHtml(decl);
        }).join("");
      }
    }).join("");
  }).join("");
}
 
function highlightJS(code: string): string {
  const parts = code.split(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[`\\]*)*`)/g);
  const keywords = [
    "const", "let", "var", "function", "return", "if", "else", "for", "while", 
    "do", "switch", "case", "break", "continue", "new", "this", "class", "export", 
    "import", "from", "default", "true", "false", "null", "undefined", "document", "window"
  ];
  
  return parts.map(part => {
    if (!part) return "";
    
    // Comments
    if (part.startsWith("//") || part.startsWith("/*")) {
      return `<span class="text-slate-550 italic">${escapeHtml(part)}</span>`;
    }
    
    // Strings
    if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
      return `<span class="text-amber-300">${escapeHtml(part)}</span>`;
    }
    
    // Normal code
    const escaped = escapeHtml(part);
    let highlighted = escaped;
    
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-purple-400">$1</span>');
    
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, "g");
      highlighted = highlighted.replace(regex, '<span class="text-blue-400 font-bold">$1</span>');
    });
    
    highlighted = highlighted.replace(/(\.[a-zA-Z0-9_]+)(?=\()/g, '.<span class="text-yellow-400 font-bold">$1</span>');
    
    return highlighted;
  }).join("");
}
