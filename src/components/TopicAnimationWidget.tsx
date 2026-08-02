"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

interface TopicAnimationWidgetProps {
  lessonId: number;
  lessonTitle: string;
  type: "html" | "cli";
  lang?: "english" | "hinglish" | "hindi";
}

/* ─── Tiny inline CSS for keyframe animations ─── */
const animCSS = `
@keyframes moveRight { 0%{transform:translateX(0)} 50%{transform:translateX(64px)} 100%{transform:translateX(0)} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes pulse2 { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.95)} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
@keyframes scaleIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes bounce2 { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-12px)} 60%{transform:translateY(-6px)} }
@keyframes spin2 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes typing { from{width:0} to{width:100%} }
@keyframes ping2 { 75%,100%{transform:scale(1.8);opacity:0} }
@keyframes waveHand { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-20deg)} 75%{transform:rotate(20deg)} }
@keyframes packetMove { 0%{transform:translateX(0);opacity:1} 90%{transform:translateX(200px);opacity:1} 100%{transform:translateX(220px);opacity:0} }
@keyframes expandWidth { from{width:0%} to{width:100%} }
@keyframes drawBox { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
@keyframes rain { from{transform:translateY(-20px);opacity:0} to{transform:translateY(60px);opacity:0} }
`;

export default function TopicAnimationWidget({ lessonId, lessonTitle, type, lang = "english" }: TopicAnimationWidgetProps) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setStep(s => (s + 1) % 3), 2600);
    return () => clearInterval(t);
  }, [isPlaying]);

  const lower = lessonTitle.toLowerCase();

  // ─── Topic detection ───
  const isInternet   = lower.includes("internet") || lower.includes("network") || lower.includes("web");
  const isClientSrv  = lower.includes("client") || lower.includes("server") || lower.includes("request") || lower.includes("dns") || lower.includes("http");
  const isViewport   = lower.includes("viewport") || lower.includes("meta") || lower.includes("mobile") || lower.includes("responsive");
  const isHtmlStruct = lower.includes("html structure") || lower.includes("doctype") || lower.includes("skeleton") || lower.includes("boilerplate") || lower.includes("anatomy");
  const isLinks      = lower.includes("anchor") || lower.includes("link") || lower.includes("href") || lower.includes("hyperlink");
  const isImage      = lower.includes("image") || lower.includes("img") || lower.includes("media") || lower.includes("video");
  const isList       = lower.includes("list") || lower.includes("<ul") || lower.includes("<ol");
  const isTable      = lower.includes("table");
  const isForm       = lower.includes("form") || lower.includes("input") || lower.includes("button");
  const isSemantics  = lower.includes("semantic") || lower.includes("<header") || lower.includes("<section") || lower.includes("seo") || lower.includes("<title");
  const isCli        = type === "cli" || lower.includes("cmd") || lower.includes("command") || lower.includes("terminal") || lower.includes("prompt");
  const isDirectory  = lower.includes("director") || lower.includes("folder") || lower.includes("mkdir") || lower.includes("path");
  const isCopy       = lower.includes("copy") || lower.includes("move") || lower.includes("del") || lower.includes("file management");

  // ─── Choose scene ───
  const getScene = (): React.ReactNode => {
    if (isInternet)   return <SceneInternet step={step} />;
    if (isClientSrv)  return <SceneClientServer step={step} />;
    if (isViewport)   return <SceneViewport step={step} />;
    if (isHtmlStruct) return <SceneHtmlStructure step={step} />;
    if (isLinks)      return <SceneLinks step={step} />;
    if (isImage)      return <SceneImage step={step} />;
    if (isList)       return <SceneList step={step} />;
    if (isTable)      return <SceneTable step={step} />;
    if (isForm)       return <SceneForm step={step} />;
    if (isSemantics)  return <SceneSemantics step={step} />;
    if (isDirectory)  return <SceneDirectory step={step} />;
    if (isCopy)       return <SceneFileCopy step={step} />;
    if (isCli)        return <SceneCli step={step} />;
    return <SceneHtmlStructure step={step} />;
  };

  // ─── Multilingual analogy map ───
  type AnalogyKey = "internet" | "clientSrv" | "viewport" | "htmlStruct" | "links" | "image" | "list" | "table" | "form" | "semantics" | "directory" | "copy" | "cli" | "default";

  const analogyData: Record<AnalogyKey, Record<"english" | "hinglish" | "hindi", { icon: string; title: string; text: string }>> = {
    internet: {
      english:  { icon: "🌊", title: "Like Undersea Cables!", text: "The internet is millions of physical cables running under oceans connecting every country — like a postal system but for data packets!" },
      hinglish: { icon: "🌊", title: "Samundar ke andar cables!", text: "Internet matlab duniya bhar mein bikhe cables — jaise ek global daak-ghar jo data packets deliver karta hai ek country se doosri country!" },
      hindi:    { icon: "🌊", title: "समुद्री केबलों की तरह!", text: "इंटरनेट लाखों केबलों का जाल है जो महासागरों के नीचे बिछी हैं — ठीक डाक तंत्र की तरह, बस यहाँ डेटा पैकेट आते-जाते हैं!" },
    },
    clientSrv: {
      english:  { icon: "🍕", title: "Like Ordering Pizza Online!", text: "You (Client) tap 'Order Pizza' → Your request travels via routers (Highway) → Domino's server (Kitchen) bakes & sends it back to your door!" },
      hinglish: { icon: "🍕", title: "Jaise Pizza order karna!", text: "Aap (Client) ne 'Order Pizza' click kiya → request highway jaise routers se travel karta hai → Domino's ka server (kitchen) pizza bana ke wapas bhejta hai!" },
      hindi:    { icon: "🍕", title: "पिज्जा ऑर्डर जैसा!", text: "आप (Client) ने 'Order Pizza' click किया → आपका request routers (highway) से travel करता है → Domino's का server (kitchen) pizza बनाकर वापस भेजता है!" },
    },
    viewport: {
      english:  { icon: "👓", title: "Like Reading Glasses!", text: "Without viewport, a website is like reading a newspaper through a keyhole — tiny! The viewport tag makes content auto-fit every screen perfectly." },
      hinglish: { icon: "👓", title: "Chasme jaisi cheez!", text: "Viewport tag ke bina website keyhole se newspaper padhne jaisi lagti hai — bahut choti! Viewport tag lagane se content screen ke hisaab se perfectly fit ho jaata hai." },
      hindi:    { icon: "👓", title: "चश्मे जैसा!", text: "Viewport tag के बिना website एक छोटी-सी चाभी के छेद से अखबार पढ़ने जैसी लगती है! Viewport tag लगाने से content हर screen पर सही fit हो जाता है।" },
    },
    htmlStruct: {
      english:  { icon: "🏗️", title: "Like Building a House!", text: "DOCTYPE = Building Permit · <html> = The Entire Plot · <head> = Hidden Wiring inside Walls · <body> = The Visible Rooms!" },
      hinglish: { icon: "🏗️", title: "Ghar banane jaisa!", text: "DOCTYPE = Naksha pass · <html> = Poora plot · <head> = Deewaaron ke andar hidden wiring · <body> = Dikhne wale kamre!" },
      hindi:    { icon: "🏗️", title: "घर बनाने जैसा!", text: "DOCTYPE = नक्शा पास · <html> = पूरा प्लॉट · <head> = दीवारों की छिपी तारें · <body> = दिखने वाले कमरे!" },
    },
    links: {
      english:  { icon: "🚪", title: "Like Doors in a Building!", text: "An <a href> tag is like a door with a sign on it. Clicking the door teleports you to a new room (webpage) — the href is the room address!" },
      hinglish: { icon: "🚪", title: "Darwaze jaisi cheez!", text: "<a href> tag ek darwaze jaisa hai jis par sign hota hai. Darwaze pe click karo to naye room (webpage) mein chale jaate ho!" },
      hindi:    { icon: "🚪", title: "दरवाज़े की तरह!", text: "<a href> tag एक दरवाज़े जैसा है जिस पर साइनबोर्ड लगा है। उस पर click करो और आप नए कमरे (webpage) में पहुँच जाते हो!" },
    },
    image: {
      english:  { icon: "🖼️", title: "Like Hanging a Photo Frame!", text: "The <img src> tag is like telling the wall 'hang this photo here'. The src is the photo's storage address, and alt is the label written behind it." },
      hinglish: { icon: "🖼️", title: "Photo frame latkane jaisa!", text: "<img src> tag matlab deewar se bol rahe ho 'yahan photo lagao'. Src woh address hai jahan photo stored hai, aur alt us photo ka description hai." },
      hindi:    { icon: "🖼️", title: "फोटो फ्रेम लगाने जैसा!", text: "<img src> tag यानी दीवार से कह रहे हो 'यहाँ फोटो लगाओ'। src फोटो का पता है और alt उस फोटो के पीछे लिखा विवरण।" },
    },
    list: {
      english:  { icon: "📋", title: "Like a Grocery Shopping List!", text: "<ul> = unordered sticky note with bullet dots. <ol> = ordered numbered recipe. Browsers render each <li> on its own line!" },
      hinglish: { icon: "📋", title: "Kiraane ki list jaisi!", text: "<ul> = bullet dots wali list — jaise grocery chit. <ol> = numbered recipe steps. Browser har <li> ko alag line pe dikhata hai!" },
      hindi:    { icon: "📋", title: "किराने की सूची जैसी!", text: "<ul> = गोलियों वाली सूची — किराने की चिट की तरह। <ol> = क्रमांकित recipe steps। Browser हर <li> को अलग लाइन पर दिखाता है!" },
    },
    table: {
      english:  { icon: "📊", title: "Like an Excel Spreadsheet!", text: "<table> = Excel workbook · <tr> = Row of cells · <td> = One cell/box · <th> = Column heading." },
      hinglish: { icon: "📊", title: "Excel spreadsheet jaisa!", text: "<table> = Excel file · <tr> = ek row · <td> = ek cell/box · <th> = column ka heading. Jaise data rows aur columns mein organize karte hain!" },
      hindi:    { icon: "📊", title: "Excel Spreadsheet जैसा!", text: "<table> = Excel file · <tr> = एक row · <td> = एक cell/box · <th> = column का शीर्षक। ठीक उसी तरह जैसे Excel में data organize होता है!" },
    },
    form: {
      english:  { icon: "📝", title: "Like a Bank Deposit Slip!", text: "<input> = Fill account number · <select> = Choose account type · <button type='submit'> = Hand the slip to the bank teller!" },
      hinglish: { icon: "📝", title: "Bank deposit slip jaisa!", text: "<input> = account number bharo · <select> = account type chuno · <button type='submit'> = slip bank teller ko do!" },
      hindi:    { icon: "📝", title: "बैंक डिपॉजिट स्लिप जैसा!", text: "<input> = खाता नंबर भरो · <select> = खाते का प्रकार चुनो · <button type='submit'> = स्लिप बैंक कर्मचारी को दो!" },
    },
    semantics: {
      english:  { icon: "📰", title: "Like a Newspaper Layout!", text: "<header> = Masthead at top · <nav> = Contents page · <main> = Main article section · <footer> = Small print at bottom. Google reads these!" },
      hinglish: { icon: "📰", title: "Akhbaar layout jaisa!", text: "<header> = title at top · <nav> = contents page · <main> = main article · <footer> = bottom footer. Google yahi padhkar aapki website rank karta hai!" },
      hindi:    { icon: "📰", title: "अखबार के layout जैसा!", text: "<header> = ऊपर शीर्षक · <nav> = सामग्री सूची · <main> = मुख्य लेख · <footer> = नीचे का पादलेख। Google इन्हें पढ़कर आपकी website को rank करता है!" },
    },
    directory: {
      english:  { icon: "📂", title: "Like an Office Filing Cabinet!", text: "mkdir = Creating a new folder · cd = Stepping inside it · dir = Spreading all paperwork on your desk to read filenames!" },
      hinglish: { icon: "📂", title: "Office filing cabinet jaisa!", text: "mkdir = naya folder banana · cd = us folder mein ghusna · dir = sab files desk pe phailana aur padna!" },
      hindi:    { icon: "📂", title: "ऑफिस फाइल कैबिनेट जैसा!", text: "mkdir = नया फोल्डर बनाना · cd = उसमें जाना · dir = सब फाइलें मेज़ पर फैलाकर देखना!" },
    },
    copy: {
      english:  { icon: "🗂️", title: "Like Photocopying Documents!", text: "copy = Xerox copy to a new folder · move = physically moving the paper · del = shredding the document!" },
      hinglish: { icon: "🗂️", title: "Photocopy karne jaisa!", text: "copy = kisi document ki Xerox alag folder mein banana · move = physically paper utha ke doosri jagah rakhna · del = shredder mein daal dena!" },
      hindi:    { icon: "🗂️", title: "Photocopy करने जैसा!", text: "copy = दस्तावेज़ की Xerox दूसरे फोल्डर में बनाना · move = कागज़ उठाकर दूसरी जगह रखना · del = shredder में डालना!" },
    },
    cli: {
      english:  { icon: "🎮", title: "Like a Keyboard-Only Video Game!", text: "The terminal is a text-only game where you type commands instead of clicking buttons. Each command instantly changes the game world!" },
      hinglish: { icon: "🎮", title: "Keyboard-only video game jaisa!", text: "Terminal ek text-only game hai jahan mouse nahi, sirf keyboard se commands type karo — har command se game ka world change ho jaata hai!" },
      hindi:    { icon: "🎮", title: "Keyboard-only वीडियो गेम जैसा!", text: "Terminal एक text-only game है जहाँ mouse नहीं चलता, बस keyboard से commands type करो — हर command से game की दुनिया बदल जाती है!" },
    },
    default: {
      english:  { icon: "💡", title: "Real-Life Connection!", text: "Every HTML concept maps to something you already know in real life. Code is just a language to describe familiar things to a computer!" },
      hinglish: { icon: "💡", title: "Real-life se connection!", text: "HTML ka har concept real life mein kisi cheez se milta hai. Code bas computer se baat karne ki bhasha hai — jo aap jaante ho, wahi describe karo!" },
      hindi:    { icon: "💡", title: "वास्तविक जीवन से जोड़!", text: "HTML का हर concept real life में किसी चीज़ से मिलता है। Code बस computer से बात करने की भाषा है!" },
    },
  };

  const getAnalogy = (): { icon: string; title: string; text: string } => {
    const l = (lang ?? "english") as "english" | "hinglish" | "hindi";
    if (isInternet)   return analogyData.internet[l];
    if (isClientSrv)  return analogyData.clientSrv[l];
    if (isViewport)   return analogyData.viewport[l];
    if (isHtmlStruct) return analogyData.htmlStruct[l];
    if (isLinks)      return analogyData.links[l];
    if (isImage)      return analogyData.image[l];
    if (isList)       return analogyData.list[l];
    if (isTable)      return analogyData.table[l];
    if (isForm)       return analogyData.form[l];
    if (isSemantics)  return analogyData.semantics[l];
    if (isDirectory)  return analogyData.directory[l];
    if (isCopy)       return analogyData.copy[l];
    if (isCli)        return analogyData.cli[l];
    return analogyData.default[l];
  };

  const analogy = getAnalogy();

  return (
    <>
      <style>{animCSS}</style>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#090f1e] text-left">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-sm font-medium text-slate-300">Visual Demo</span>
            <span className="hidden sm:block text-xs text-slate-500 truncate">— {lessonTitle}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={() => setIsPlaying(p => !p)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all cursor-pointer">
              {isPlaying ? <Pause size={11}/> : <Play size={11}/>}
              <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button onClick={() => setStep(s => (s + 1) % 3)}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all cursor-pointer">
              <SkipForward size={11}/>
            </button>
            {/* Step dots */}
            <div className="flex gap-1 pl-1">
              {[0,1,2].map(s => (
                <button key={s} onClick={() => setStep(s)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${step === s ? "bg-emerald-400 scale-125" : "bg-slate-700"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Real-Life Analogy ── */}
        <div className="flex items-start gap-3 px-4 py-3 border-b border-slate-800 border-l-2 border-l-amber-500/60 bg-slate-900/30">
          <span className="text-xl shrink-0">{analogy.icon}</span>
          <div>
            <p className="text-xs font-semibold text-amber-300">{analogy.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{analogy.text}</p>
          </div>
        </div>

        {/* ── Animated Scene ── */}
        <div className="p-4 md:p-6 min-h-[200px] flex items-center justify-center">
          {getScene()}
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   SCENE COMPONENTS — CSS animated visuals
   ════════════════════════════════════════════ */

/* 🌊 Internet: data packets flying across a cable map */
function SceneInternet({ step }: { step: number }) {
  const labels = ["📱 Your Phone", "🔌 ISP Router", "🌐 Internet", "🖥️ Web Server"];
  return (
    <div className="w-full space-y-4">
      <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
        🌊 How data travels across the world
      </p>
      <div className="flex items-center justify-between gap-1 px-2">
        {labels.map((label, i) => (
          <React.Fragment key={i}>
            <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${step >= i ? "opacity-100 scale-100" : "opacity-30 scale-90"}`}
              style={{ animation: step === i ? "bounce2 0.6s ease" : undefined }}>
              <div className="text-2xl">{label.split(" ")[0]}</div>
              <span className="text-[9px] text-slate-400 font-semibold text-center leading-tight max-w-[60px]">{label.split(" ").slice(1).join(" ")}</span>
            </div>
            {i < labels.length - 1 && (
              <div className="flex-1 relative h-1 bg-slate-800 rounded-full mx-1 overflow-hidden">
                <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-700`}
                  style={{ width: step > i ? "100%" : "0%", animation: step > i ? undefined : undefined }} />
                {step === i + 1 && (
                  <span className="absolute top-1/2 -translate-y-1/2 text-xs"
                    style={{ left: "40%", animation: "packetMove 1.2s ease forwards" }}>📦</span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center text-[11px] text-slate-500 font-semibold mt-1">
        {step === 0 && "Step 1: You type a URL and press Enter..."}
        {step === 1 && "Step 2: Your ISP Router forwards the request..."}
        {step === 2 && "Step 3: The web server sends back the HTML page!"}
      </div>
    </div>
  );
}

/* 🍕 Client-Server: pizza delivery animation */
function SceneClientServer({ step }: { step: number }) {
  return (
    <div className="w-full space-y-3">
      <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">🍕 Client-Server like Pizza Delivery</p>
      <div className="relative flex items-center justify-between px-4 gap-2">
        {/* Client */}
        <div className={`flex flex-col items-center gap-1 transition-all duration-500`}>
          <div className="text-3xl" style={{ animation: step === 0 ? "waveHand 0.8s ease 3" : undefined }}>📱</div>
          <span className="text-[10px] text-blue-300 font-bold">Your Browser</span>
          <span className="text-[9px] text-slate-500">(Client)</span>
        </div>

        {/* Arrow area */}
        <div className="flex-1 flex flex-col items-center gap-1">
          {/* Request arrow */}
          <div className="w-full flex items-center gap-1">
            <div className={`h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 flex-1 rounded transition-all duration-700`}
              style={{ opacity: step >= 1 ? 1 : 0.2, width: step >= 1 ? "100%" : "0%" }} />
            {step >= 1 && <span className="text-lg shrink-0" style={{ animation: "moveRight 1s ease 2" }}>📦</span>}
          </div>
          <div className="text-[10px] text-amber-400 font-semibold">
            {step === 0 && "Tap 'Order Pizza' →"}
            {step === 1 && "→ HTTP Request sent! →"}
            {step === 2 && "← HTTP Response (pizza!) ←"}
          </div>
          {/* Response arrow */}
          <div className="w-full flex items-center gap-1">
            {step >= 2 && <span className="text-lg shrink-0" style={{ animation: "moveRight 1s ease 2", transform: "scaleX(-1)", display: "inline-block" }}>🍕</span>}
            <div className={`h-0.5 flex-1 rounded transition-all duration-700 ${step >= 2 ? "bg-gradient-to-l from-emerald-500 to-teal-500" : "bg-slate-700"}`} />
          </div>
        </div>

        {/* Server */}
        <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-40"}`}>
          <div className="text-3xl" style={{ animation: step === 1 ? "bounce2 0.6s ease 2" : undefined }}>🖥️</div>
          <span className="text-[10px] text-emerald-300 font-bold">Web Server</span>
          <span className="text-[9px] text-slate-500">(Kitchen)</span>
        </div>
      </div>
      <p className="text-center text-[11px] text-slate-500 font-semibold">
        {step === 0 && "Click sends an HTTP GET request to the server..."}
        {step === 1 && "Router delivers your request to the server!"}
        {step === 2 && "Server responds with the HTML page — your pizza is here! 🍕"}
      </p>
    </div>
  );
}

/* 👓 Viewport: phone size comparison */
function SceneViewport({ step }: { step: number }) {
  const isMobile = step >= 1;
  return (
    <div className="w-full space-y-3">
      <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
        {isMobile ? "✅ With Viewport Tag — auto-fit!" : "❌ Without Viewport — tiny & zoomed out!"}
      </p>
      <div className="flex gap-4 items-stretch justify-center">
        {/* Phone frame */}
        <div className="border-4 border-slate-600 rounded-2xl w-28 bg-slate-950 overflow-hidden flex flex-col shadow-xl shrink-0">
          <div className="bg-slate-800 h-2 w-8 rounded-full mx-auto mt-1 mb-0.5" />
          <div className={`flex-1 bg-white p-1 overflow-hidden transition-all duration-700 ${!isMobile ? "scale-[0.38] origin-top-left" : "scale-100"}`}
            style={{ minHeight: "120px" }}>
            <div className="bg-blue-500 text-white text-[8px] font-bold px-1 py-0.5 mb-1">Nextsem Header</div>
            <div className="bg-slate-100 text-slate-800 text-[6px] p-1 mb-1 rounded">Welcome to HTML Lessons!</div>
            <div className="grid grid-cols-2 gap-0.5">
              <div className="bg-emerald-100 text-[5px] p-0.5 rounded">Lesson 1</div>
              <div className="bg-blue-100 text-[5px] p-0.5 rounded">Lesson 2</div>
            </div>
          </div>
          <div className="bg-slate-800 h-3 flex items-center justify-center pb-0.5">
            <div className="w-6 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>

        {/* Label */}
        <div className="flex flex-col justify-center gap-2">
          <div className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all duration-500 ${
            !isMobile ? "bg-rose-950/60 border-rose-500/50 text-rose-300" : "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
          }`}>
            {isMobile
              ? <>✅ <code className="text-[10px]">width=device-width</code><br/><span className="font-normal text-slate-300 text-[10px]">Content auto-scales! Readable 😊</span></>
              : <>❌ No viewport meta tag<br/><span className="font-normal text-slate-300 text-[10px]">Desktop layout crammed in! 🔍 Pinch & zoom needed</span></>
            }
          </div>
          <button onClick={() => {}} className="text-[10px] text-slate-500 text-left">
            {step === 0 && "👆 Tap play to see the fix..."}
            {step === 1 && "👓 Glasses on — perfect fit!"}
            {step === 2 && "💯 Responsive & mobile-ready!"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🏗️ HTML Structure: building blocks appearing */
function SceneHtmlStructure({ step }: { step: number }) {
  const blocks = [
    { tag: "<!DOCTYPE html>", color: "bg-slate-700 border-slate-600", label: "📋 Building Permit", desc: "Tells browser this is HTML5" },
    { tag: "<html>", color: "bg-blue-900/60 border-blue-700", label: "🏗️ The Whole Plot", desc: "Root container for everything" },
    { tag: "  <head>", color: "bg-purple-900/60 border-purple-700", label: "🔌 Hidden Wiring", desc: "Metadata — CSS links, title, SEO" },
    { tag: "  <body>", color: "bg-emerald-900/60 border-emerald-700", label: "🚪 Visible Rooms", desc: "All visible content lives here" },
  ];
  return (
    <div className="w-full space-y-2">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">🏗️ HTML Skeleton builds up block by block</p>
      {blocks.map((b, i) => (
        <div key={i}
          className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border font-mono text-xs transition-all duration-500 ${b.color} ${step * 1.5 >= i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          style={{ animation: step * 1.5 >= i ? "slideIn 0.4s ease" : undefined, transitionDelay: `${i * 80}ms` }}>
          <code className="text-slate-200 text-[11px] shrink-0">{b.tag}</code>
          <div className="text-right">
            <span className="text-[10px] font-bold text-amber-300 block">{b.label}</span>
            <span className="text-[9px] text-slate-400">{b.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 🚪 Links scene */
function SceneLinks({ step }: { step: number }) {
  return (
    <div className="w-full space-y-3 text-center">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">🚪 Clicking an &lt;a href&gt; link is like opening a door!</p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl" style={{ animation: step === 0 ? "bounce2 1s ease 3" : undefined }}>📄</div>
          <code className="text-[10px] text-blue-300">index.html</code>
          <span className="text-[9px] text-slate-500">Current Page</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <code className="text-[10px] bg-slate-800 px-2 py-1 rounded text-amber-300">{`<a href="/about">`}</code>
          <div className="flex items-center gap-1">
            <div className="w-8 h-0.5 bg-amber-500" />
            <span className="text-lg" style={{ animation: step >= 1 ? "moveRight 1.2s ease 2" : undefined }}>👆</span>
            <div className="w-8 h-0.5 bg-emerald-500" />
          </div>
        </div>
        <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${step >= 2 ? "opacity-100" : "opacity-30"}`}>
          <div className="text-4xl" style={{ animation: step === 2 ? "scaleIn 0.4s ease" : undefined }}>🚪</div>
          <code className="text-[10px] text-emerald-300">about.html</code>
          <span className="text-[9px] text-slate-500">Destination Room</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 font-semibold">
        {step === 0 && "User is on index.html page..."}
        {step === 1 && "User clicks the anchor link..."}
        {step === 2 && "Browser teleports to about.html! 🚀"}
      </p>
    </div>
  );
}

/* 🖼️ Image scene */
function SceneImage({ step }: { step: number }) {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">🖼️ &lt;img&gt; is like hanging a photo frame on a wall</p>
      <div className="flex items-center gap-6 flex-wrap justify-center">
        <div className="flex flex-col items-center gap-1">
          <code className="text-[10px] bg-slate-800 px-3 py-2 rounded-lg text-emerald-300 font-mono leading-relaxed text-left block">
            {`<img\n  src="cat.jpg"\n  alt="A cute cat"\n/>`}
          </code>
          <span className="text-[9px] text-slate-500">HTML Code</span>
        </div>
        <div className="text-slate-600 text-2xl">→</div>
        <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="w-24 h-20 bg-gradient-to-br from-orange-300 to-amber-400 rounded-xl border-4 border-amber-600 flex items-center justify-center shadow-lg"
            style={{ animation: step >= 1 ? "float 2s ease-in-out infinite" : undefined }}>
            <span className="text-3xl">🐱</span>
          </div>
          <span className="text-[9px] text-slate-500">Browser renders photo!</span>
          {step >= 2 && <span className="text-[9px] text-amber-400 font-bold">alt="A cute cat" (if broken)</span>}
        </div>
      </div>
      <p className="text-[11px] text-slate-500 font-semibold">
        {step === 0 && "src= tells browser WHERE the photo lives..."}
        {step === 1 && "Browser fetches and displays the image!"}
        {step === 2 && "alt= text shows if image can't load (accessibility!)"}
      </p>
    </div>
  );
}

/* 📋 List scene */
function SceneList({ step }: { step: number }) {
  const items = ["🥛 Milk", "🍎 Apples", "🍞 Bread", "🧀 Cheese"];
  return (
    <div className="w-full space-y-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">📋 &lt;ul&gt; is like a Grocery Shopping List!</p>
      <div className="flex gap-4 justify-center flex-wrap">
        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 font-mono text-xs space-y-0.5">
          {items.map((item, i) => (
            <div key={i} className={`transition-all duration-300 ${step * 1.4 > i ? "text-slate-200" : "text-slate-600"}`}
              style={{ animation: step * 1.4 > i ? "slideIn 0.3s ease" : undefined }}>
              &lt;li&gt;{item}&lt;/li&gt;
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-300 text-xs space-y-1 text-slate-800 min-w-[120px]">
          <p className="font-bold text-[10px] text-slate-500 uppercase mb-2">Browser Output 🌐</p>
          {items.map((item, i) => (
            <div key={i} className={`flex items-center gap-1.5 transition-all duration-300 ${step * 1.4 > i ? "opacity-100" : "opacity-0"}`}>
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full shrink-0"/>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 📊 Table scene */
function SceneTable({ step }: { step: number }) {
  const rows = [["Alice", "90%", "✅"], ["Bob", "75%", "🟡"], ["Carol", "95%", "🏆"]];
  return (
    <div className="w-full space-y-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">📊 &lt;table&gt; works just like an Excel Spreadsheet!</p>
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-xs">
          <thead>
            <tr className={`transition-all duration-500 ${step >= 0 ? "opacity-100" : "opacity-0"}`}>
              {["Student 👤","Score 📊","Status 🎯"].map((h,i) => (
                <th key={i} className="bg-indigo-600 text-white px-4 py-2 border border-indigo-400 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={`transition-all duration-500 ${step * 1.2 > ri ? "opacity-100" : "opacity-0"}`}>
                {row.map((cell, ci) => (
                  <td key={ci} className="bg-slate-900 text-slate-200 px-4 py-2 border border-slate-700 text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-500 font-semibold text-center">
        {step === 0 && "<table><tr><th> = Column headers of the spreadsheet"}
        {step === 1 && "<tr><td> = Each row of student data in the table"}
        {step === 2 && "Tables organize data perfectly — just like Excel!"}
      </p>
    </div>
  );
}

/* 📝 Form scene: bank deposit slip animation */
function SceneForm({ step }: { step: number }) {
  const values = ["John Dev", "john@email.com", "Submit! 🚀"];
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">📝 HTML Form = Bank Deposit Slip!</p>
      <div className="bg-white rounded-xl p-4 border-4 border-amber-400 shadow-xl max-w-xs w-full space-y-3">
        <div className="text-center text-xs font-black text-amber-700 border-b border-amber-200 pb-1">🏦 Nextsem Bank — Deposit Form</div>
        <div className="space-y-2">
          <div>
            <label className="text-[10px] font-bold text-slate-600 block">Name:</label>
            <div className="border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 bg-slate-50 font-mono">
              {step >= 0 ? values[0] : ""}
              {step === 0 && <span style={{ animation: "blink 1s step-end infinite" }}>|</span>}
            </div>
          </div>
          <div className={`transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
            <label className="text-[10px] font-bold text-slate-600 block">Email:</label>
            <div className="border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 bg-slate-50 font-mono">
              {step >= 1 ? values[1] : ""}
              {step === 1 && <span style={{ animation: "blink 1s step-end infinite" }}>|</span>}
            </div>
          </div>
        </div>
        <button className={`w-full py-2 rounded font-black text-sm transition-all duration-500 ${step >= 2 ? "bg-emerald-500 text-white shadow-lg scale-95" : "bg-slate-200 text-slate-400"}`}>
          {step >= 2 ? values[2] : "Submit"}
        </button>
      </div>
      <p className="text-[11px] text-slate-500 font-semibold">
        {step === 0 && "<input type='text'> — user fills the field"}
        {step === 1 && "<input type='email'> — email validation built-in!"}
        {step === 2 && "<button type='submit'> — slip handed to teller (server)!"}
      </p>
    </div>
  );
}

/* 📰 Semantic HTML: newspaper layout */
function SceneSemantics({ step }: { step: number }) {
  const zones = [
    { tag: "<header>", label: "🗞️ Masthead", color: "bg-blue-900/60 border-blue-700", height: "h-8" },
    { tag: "<nav>", label: "📖 Contents", color: "bg-purple-900/60 border-purple-700", height: "h-6" },
    { tag: "<main>", label: "📰 Main Story", color: "bg-emerald-900/60 border-emerald-700", height: "h-16" },
    { tag: "<footer>", label: "📋 Fine Print", color: "bg-slate-700 border-slate-600", height: "h-6" },
  ];
  return (
    <div className="w-full space-y-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">📰 Semantic HTML = Newspaper Sections!</p>
      <div className="flex gap-4 justify-center items-start flex-wrap">
        <div className="space-y-1 w-44">
          {zones.map((z, i) => (
            <div key={i}
              className={`${z.height} ${z.color} border rounded flex items-center justify-between px-2 transition-all duration-500 ${step * 1.2 >= i ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              style={{ animation: step * 1.2 >= i ? "drawBox 0.3s ease" : undefined }}>
              <code className="text-[9px] text-slate-200">{z.tag}</code>
              <span className="text-[9px] text-amber-300 font-bold">{z.label}</span>
            </div>
          ))}
        </div>
        <div className="text-left space-y-1 text-[10px] text-slate-400 pt-1">
          <p>✅ Google understands your page</p>
          <p>✅ Screen readers work perfectly</p>
          <p>✅ Better SEO rankings</p>
          <p className={`text-emerald-400 font-bold transition-all ${step >= 2 ? "opacity-100" : "opacity-0"}`}>🏆 Semantic = Smart HTML!</p>
        </div>
      </div>
    </div>
  );
}

/* 📂 Directory: filing cabinet animation */
function SceneDirectory({ step }: { step: number }) {
  return (
    <div className="w-full space-y-3 font-mono">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">📂 mkdir/cd = Office Filing Cabinet!</p>
      <div className="flex items-start gap-4 justify-center flex-wrap">
        <div className="bg-black rounded-xl border border-slate-800 p-3 text-xs space-y-2 min-w-[200px]">
          <div className="text-slate-500 text-[10px] border-b border-slate-800 pb-1">CMD.EXE</div>
          {[
            { cmd: "mkdir Projects", out: "📁 Folder created!" },
            { cmd: "cd Projects", out: "📂 Stepped inside folder" },
            { cmd: "dir", out: "📋 Listing files..." },
          ].map((row, i) => (
            <div key={i} className={`transition-all duration-500 ${step > i || (step === i) ? "opacity-100" : "opacity-0"}`}>
              <div className="text-emerald-400">C:\&gt; <span className={step === i ? "animate-pulse" : ""}>{row.cmd}</span></div>
              {step > i && <div className="text-slate-400 text-[10px] pl-4">{row.out}</div>}
            </div>
          ))}
          <span className={`inline-block text-emerald-400 ${step < 3 ? "" : "hidden"}`} style={{ animation: "blink 1s step-end infinite" }}>_</span>
        </div>
        <div className="text-left space-y-2 text-xs">
          <div className={`flex items-center gap-2 transition-all ${step >= 0 ? "opacity-100" : "opacity-30"}`}>
            <span>📁</span><span className="text-amber-300">mkdir = New folder in cabinet</span>
          </div>
          <div className={`flex items-center gap-2 transition-all ${step >= 1 ? "opacity-100" : "opacity-30"}`}>
            <span>🚪</span><span className="text-blue-300">cd = Step inside the folder</span>
          </div>
          <div className={`flex items-center gap-2 transition-all ${step >= 2 ? "opacity-100" : "opacity-30"}`}>
            <span>📄</span><span className="text-emerald-300">dir = Spread papers on desk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🗂️ File copy scene */
function SceneFileCopy({ step }: { step: number }) {
  return (
    <div className="w-full space-y-3">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">🗂️ copy/move/del = Office Document Management!</p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">📄</span>
          <code className="text-[9px] text-slate-400">report.txt</code>
          <span className="text-[9px] text-slate-600">Original</span>
        </div>
        <div className="flex flex-col gap-2 text-center">
          {["copy","move","del"].map((cmd, i) => (
            <div key={i} className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${step === i ? "bg-amber-500 text-slate-950 scale-110" : "bg-slate-800 text-slate-500"}`}>
              {cmd}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className={`text-3xl transition-all duration-500 ${step === 0 ? "opacity-100" : step === 1 ? "opacity-100" : "opacity-20"}`}
            style={{ animation: step === 0 ? "scaleIn 0.4s ease" : undefined }}>
            {step < 2 ? "📄" : "🗑️"}
          </span>
          <code className="text-[9px] text-slate-400">{step === 0 ? "backup/report.txt" : step === 1 ? "docs/report.txt" : "— deleted"}</code>
          <span className="text-[9px] text-slate-600">{step === 0 ? "Xerox Copy!" : step === 1 ? "Moved!" : "Shredded!"}</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 font-semibold text-center">
        {step === 0 && "copy = Xerox photocopier — original stays, clone appears!"}
        {step === 1 && "move = Pick up the paper and place it in another drawer!"}
        {step === 2 && "del = Shredding machine — paper is gone permanently! ⚠️"}
      </p>
    </div>
  );
}

/* 🎮 CLI general scene */
function SceneCli({ step }: { step: number }) {
  const cmds = [
    { cmd: "ver", out: "Windows Version 10.0.22621 🪟", label: "Check OS version" },
    { cmd: "whoami", out: "DESKTOP\\Nextsem Student 👤", label: "Check logged-in user" },
    { cmd: "cls", out: "Screen cleared! ✨", label: "Clear the terminal" },
  ];
  return (
    <div className="w-full space-y-3 font-mono">
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center">🎮 Terminal = Keyboard-Only Control Panel!</p>
      <div className="bg-black rounded-xl border border-slate-800 p-3 text-xs space-y-3">
        <div className="text-slate-500 text-[10px] border-b border-slate-800 pb-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" /><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="ml-1">🪟 Command Prompt</span>
        </div>
        {cmds.map((row, i) => (
          <div key={i} className={`transition-all duration-500 ${step >= i ? "opacity-100" : "opacity-20"}`}>
            <div className="text-emerald-400">C:\&gt; <span className={step === i ? "animate-pulse" : ""}>{row.cmd}</span></div>
            {step > i && <div className="text-slate-300 pl-4 text-[10px] mt-0.5">{row.out}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
