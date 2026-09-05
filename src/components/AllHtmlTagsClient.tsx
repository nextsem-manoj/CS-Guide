"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Copy, Check, Play, Code2, Sparkles, BookOpen, 
  Layers, Terminal, ExternalLink, ArrowUp, RefreshCw, 
  CheckCircle2, AlertTriangle, Filter, Globe, Eye, EyeOff
} from "lucide-react";
import { ALL_HTML_TAGS, CATEGORIES, TagCategory, HtmlTagItem } from "@/data/allHtmlTagsData";

export default function AllHtmlTagsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TagCategory>("All");
  const [selectedLang, setSelectedLang] = useState<"english" | "hinglish" | "hindi">("english");
  const [filterType, setFilterType] = useState<"all" | "void" | "html5" | "deprecated">("all");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  
  // Interactive Live Editor State
  const [activePreviewTag, setActivePreviewTag] = useState<string | null>(null);
  const [customCode, setCustomCode] = useState<Record<string, string>>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Load language preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("nextsem_lang");
      if (savedLang === "hinglish" || savedLang === "hindi" || savedLang === "english") {
        setSelectedLang(savedLang);
      }
    }
  }, []);

  const handleLangChange = (lang: "english" | "hinglish" | "hindi") => {
    setSelectedLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_lang", lang);
    }
  };

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter tags based on search query, category, and tag type
  const filteredTags = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_HTML_TAGS.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // Type filter
      if (filterType === "void" && !item.isVoid) return false;
      if (filterType === "html5" && !item.isHtml5) return false;
      if (filterType === "deprecated" && !item.isDeprecated) return false;

      // Search query
      if (!q) return true;
      const matchTag = item.tag.toLowerCase().includes(q);
      const matchName = item.name.toLowerCase().includes(q);
      const matchEn = item.english.toLowerCase().includes(q);
      const matchHing = item.hinglish.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchAttr = item.attributes?.some(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));

      return matchTag || matchName || matchEn || matchHing || matchCategory || matchAttr;
    });
  }, [searchQuery, selectedCategory, filterType]);

  // Alphabetical list of starting letters for quick jump
  const alphabetLetters = useMemo(() => {
    const letters = new Set<string>();
    ALL_HTML_TAGS.forEach((t) => {
      const firstChar = t.name.replace(/[^a-zA-Z]/g, "").charAt(0).toUpperCase();
      if (firstChar) letters.add(firstChar);
    });
    return Array.from(letters).sort();
  }, []);

  const handleCopyCode = (tagStr: string, code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedTag(tagStr);
      setTimeout(() => setCopiedTag(null), 2000);
    }
  };

  const scrollToLetter = (letter: string) => {
    const target = document.getElementById(`letter-${letter}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Document & Metadata":
        return "bg-purple-950/60 text-purple-300 border-purple-800/60";
      case "Layout & Sectioning":
        return "bg-blue-950/60 text-blue-300 border-blue-800/60";
      case "Text & Grouping":
        return "bg-slate-900 text-slate-300 border-slate-700";
      case "Inline Semantics":
        return "bg-teal-950/60 text-teal-300 border-teal-800/60";
      case "Media & Multimedia":
        return "bg-pink-950/60 text-pink-300 border-pink-800/60";
      case "Embedded & Graphics":
        return "bg-cyan-950/60 text-cyan-300 border-cyan-800/60";
      case "Tables":
        return "bg-amber-950/60 text-amber-300 border-amber-800/60";
      case "Forms & Inputs":
        return "bg-emerald-950/60 text-emerald-300 border-emerald-800/60";
      case "Interactive & Dialogs":
        return "bg-indigo-950/60 text-indigo-300 border-indigo-800/60";
      case "Web Components":
        return "bg-violet-950/60 text-violet-300 border-violet-800/60";
      case "Deprecated & Obsolete":
        return "bg-rose-950/60 text-rose-300 border-rose-800/60";
      default:
        return "bg-slate-900 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-white selection:bg-[#04AA6D] selection:text-white">
      {/* ── TOP HERO SECTION ── */}
      <section className="relative overflow-hidden pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0c1328]/80 via-[#060c18] to-[#060c18]">
        {/* Glowing background blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#04AA6D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Breadcrumb / Category Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#04AA6D]/15 border border-[#04AA6D]/30 text-[#04AA6D] text-xs font-bold uppercase tracking-wider mb-4">
            <Code2 size={14} className="animate-pulse" />
            <span>Complete HTML5 Cheat Sheet & Reference</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04AA6D] via-[#38bdf8] to-[#c1a648]">HTML Tags</span> with Examples
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            A comprehensive, interactive reference directory of all standard HTML5 and legacy tags. Includes working code snippets, live sandbox previews, attribute specifications, and explanations in English, Hinglish, and Hindi.
          </p>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <Sparkles size={16} className="text-[#c1a648]" />
              <span><strong>115+</strong> Tags Covered</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <CheckCircle2 size={16} className="text-[#04AA6D]" />
              <span><strong>100%</strong> Working Examples</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <Play size={16} className="text-[#38bdf8]" />
              <span>Live Interactive Editor</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <Globe size={16} className="text-purple-400" />
              <span>EN / Hinglish / Hindi</span>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags (e.g. <img>, <video>, form, href, dialog, table)..."
              className="w-full pl-12 pr-12 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-[#04AA6D] focus:ring-2 focus:ring-[#04AA6D]/30 shadow-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Language Switcher & Tag Quick Type Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
            {/* Language Selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Globe size={14} /> Explanation:
              </span>
              <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                <button
                  onClick={() => handleLangChange("english")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedLang === "english"
                      ? "bg-[#04AA6D] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLangChange("hinglish")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedLang === "hinglish"
                      ? "bg-[#04AA6D] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Hinglish
                </button>
                <button
                  onClick={() => handleLangChange("hindi")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedLang === "hindi"
                      ? "bg-[#04AA6D] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            {/* Quick Type Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <Filter size={13} /> Filter:
              </span>
              <button
                onClick={() => setFilterType("all")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "all" ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                All ({ALL_HTML_TAGS.length})
              </button>
              <button
                onClick={() => setFilterType("html5")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "html5" ? "bg-[#04AA6D] text-white" : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                HTML5 Standard
              </button>
              <button
                onClick={() => setFilterType("void")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "void" ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Self-Closing / Void
              </button>
              <button
                onClick={() => setFilterType("deprecated")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "deprecated" ? "bg-rose-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Deprecated ⚠️
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY CATEGORY NAV & ALPHABET BAR ── */}
      <div className="sticky top-14 z-30 bg-[#060c18]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" 
                ? ALL_HTML_TAGS.length 
                : ALL_HTML_TAGS.filter(t => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? "bg-[#04AA6D] text-white shadow-lg shadow-[#04AA6D]/20 scale-105"
                      : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-black">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Alphabetical Jump Index */}
          <div className="hidden sm:flex items-center justify-between gap-1 text-[11px] font-bold text-slate-400 overflow-x-auto pt-1 border-t border-slate-800/50">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] mr-2">Jump A-Z:</span>
            <div className="flex items-center gap-1 flex-1 justify-between">
              {alphabetLetters.map((char) => (
                <button
                  key={char}
                  onClick={() => scrollToLetter(char)}
                  className="w-6 h-6 rounded-lg bg-slate-900/80 hover:bg-[#04AA6D] hover:text-white border border-slate-800/60 flex items-center justify-center transition-colors"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN TAGS DIRECTORY CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Counter & Return to HTML Lessons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs sm:text-sm text-slate-400">
          <div>
            Showing <strong className="text-[#04AA6D]">{filteredTags.length}</strong> of {ALL_HTML_TAGS.length} HTML tags
            {searchQuery && <span> matching "<span className="text-white">{searchQuery}</span>"</span>}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/html"
              className="inline-flex items-center gap-1.5 text-xs text-[#38bdf8] hover:text-white hover:underline font-semibold"
            >
              <BookOpen size={14} /> Go to HTML5 Full Course
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {filteredTags.length === 0 && (
          <div className="text-center py-16 bg-[#0c1328] rounded-3xl border border-slate-800 p-8">
            <AlertTriangle size={40} className="mx-auto text-amber-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No HTML tags found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              No tags matched your current search criteria. Try clearing search filters or selecting "All" categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setFilterType("all");
              }}
              className="px-4 py-2 bg-[#04AA6D] text-white text-xs font-bold rounded-xl hover:bg-[#038857] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Tag Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTags.map((item, idx) => {
            const firstChar = item.name.replace(/[^a-zA-Z]/g, "").charAt(0).toUpperCase();
            const isFirstOfLetter = idx === 0 || 
              filteredTags[idx - 1].name.replace(/[^a-zA-Z]/g, "").charAt(0).toUpperCase() !== firstChar;

            const isLiveOpen = activePreviewTag === item.tag;
            const currentLiveCode = customCode[item.tag] ?? item.example;

            return (
              <div key={item.tag} id={isFirstOfLetter ? `letter-${firstChar}` : undefined}>
                {/* Optional Alphabet Section Marker */}
                {isFirstOfLetter && (
                  <div className="flex items-center gap-3 my-4">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#04AA6D] to-[#0284c7] text-white font-black text-sm flex items-center justify-center shadow-md">
                      {firstChar}
                    </span>
                    <div className="h-px bg-slate-800 flex-1" />
                  </div>
                )}

                {/* Tag Card Box */}
                <div 
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-[#0c1328] shadow-lg ${
                    item.isDeprecated 
                      ? "border-rose-900/50 hover:border-rose-700" 
                      : "border-slate-800/90 hover:border-[#04AA6D]/50"
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900/60 to-[#0c1328]">
                    {/* Left: Tag Name & Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-lg sm:text-xl font-black text-[#38bdf8] bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                        {item.tag}
                      </span>

                      {/* Category Badge */}
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>

                      {/* Display Type Badge */}
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {item.display}
                      </span>

                      {/* Void / Self-Closing Badge */}
                      {item.isVoid ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-950/70 text-purple-300 border border-purple-800/60">
                          Self-Closing (Void)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/50">
                          Paired Tag
                        </span>
                      )}

                      {/* HTML5 Standard Badge */}
                      {item.isHtml5 && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#04AA6D]/20 text-[#04AA6D] border border-[#04AA6D]/40">
                          HTML5 Standard
                        </span>
                      )}

                      {/* Deprecated Badge */}
                      {item.isDeprecated && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1">
                          <AlertTriangle size={12} /> Obsolete / Deprecated
                        </span>
                      )}
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCode(item.tag, item.example)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                        title="Copy Code"
                      >
                        {copiedTag === item.tag ? (
                          <>
                            <Check size={14} className="text-[#04AA6D]" />
                            <span className="text-[#04AA6D]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setActivePreviewTag(isLiveOpen ? null : item.tag)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isLiveOpen
                            ? "bg-[#04AA6D] text-white border-[#04AA6D] shadow-md shadow-[#04AA6D]/30"
                            : "bg-blue-950/80 text-blue-300 hover:bg-blue-900 border-blue-800/80"
                        }`}
                        title="Toggle Live Sandbox"
                      >
                        {isLiveOpen ? (
                          <>
                            <EyeOff size={14} />
                            <span>Hide Preview</span>
                          </>
                        ) : (
                          <>
                            <Eye size={14} />
                            <span>Live Preview</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-4">
                    {/* Multilingual Explanation */}
                    <div className="text-sm text-slate-200 leading-relaxed">
                      {selectedLang === "english" && (
                        <p>{item.english}</p>
                      )}
                      {selectedLang === "hinglish" && (
                        <p className="text-amber-200/90 font-medium">
                          <strong className="text-amber-400">💡 Hinglish:</strong> {item.hinglish}
                        </p>
                      )}
                      {selectedLang === "hindi" && (
                        <p className="text-emerald-200/90 font-medium leading-relaxed">
                          <strong className="text-[#04AA6D]">🇮🇳 हिन्दी:</strong> {item.hindi}
                        </p>
                      )}
                    </div>

                    {/* Deprecated Warning Notice */}
                    {item.isDeprecated && item.deprecatedAlternative && (
                      <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3">
                        <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <strong className="text-rose-300 font-bold block">
                            Deprecated in HTML5 standard:
                          </strong>
                          <span className="text-rose-200/90">
                            Do not use in modern web projects. <strong>Modern Alternative:</strong> {item.deprecatedAlternative}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Common Attributes List */}
                    {item.attributes && item.attributes.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Key Attributes:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {item.attributes.map((attr) => (
                            <div
                              key={attr.name}
                              className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs flex flex-col justify-between"
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <code className="text-[#38bdf8] font-bold font-mono">{attr.name}</code>
                                {attr.exampleValue && (
                                  <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                                    {attr.exampleValue}
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-400 text-[11px] leading-tight">
                                {attr.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Example Box */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#060c18]">
                      <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                          <Code2 size={13} className="text-[#04AA6D]" /> HTML Code Snippet
                        </span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                          Ready to use
                        </span>
                      </div>
                      <pre className="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                        <code>{item.example}</code>
                      </pre>
                    </div>

                    {/* Interactive Live Sandbox Frame (Expandable) */}
                    {isLiveOpen && (
                      <div className="rounded-2xl border-2 border-[#04AA6D]/60 bg-[#071120] p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#04AA6D] flex items-center gap-1.5 uppercase tracking-wider">
                            <Sparkles size={14} /> Live Browser Sandbox
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Rendered securely on your browser
                          </span>
                        </div>

                        {/* Live Render Output Container */}
                        <div className="p-4 rounded-xl bg-[#030712] border border-slate-700/80 shadow-inner">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.livePreviewHtml || item.example
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM CTA SECTION ── */}
        <div className="mt-12 rounded-3xl p-6 sm:p-10 border border-slate-800 bg-gradient-to-br from-[#0c1328] via-[#09101f] to-[#060c18] text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ready to master Frontend Web Development?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Continue with our 100+ interactive HTML5 lessons, live coding simulators, and IGNOU BCA Semester 1 curriculum.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/html"
                className="px-6 py-3 rounded-xl bg-[#04AA6D] hover:bg-[#038857] text-white font-black text-sm shadow-lg shadow-[#04AA6D]/30 transition-all flex items-center gap-2"
              >
                <BookOpen size={16} /> Start HTML5 Course
              </Link>
              <Link
                href="/curriculum"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2"
              >
                <Layers size={16} /> View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#04AA6D] text-white shadow-2xl hover:scale-110 transition-all border border-emerald-400/40 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
