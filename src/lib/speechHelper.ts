/**
 * NextSem Mobile-Optimized Web Speech Synthesis Utility
 * Fixes Android WebView & Mobile Safari async voice loading and audio cutout issues.
 */

let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const loadVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
    } catch (e) {
      console.error("Error fetching speech voices:", e);
    }
  };

  loadVoices();
  if ("onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

export function speakLessonText({
  text,
  lang,
  onStart,
  onEnd,
  onError,
}: {
  text: string;
  lang: "english" | "hinglish" | "hindi";
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    if (onError) onError("Speech synthesis not supported");
    return;
  }

  // Clear any existing audio playback queue
  window.speechSynthesis.cancel();
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  // Clean markdown symbols
  const cleanText = text
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/[`#*_\-\+\=~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  // Split long text into small sentence chunks (~150-200 chars) for Android WebView stability
  const sentences = cleanText.match(/[^.!?\n]+[.!?\n]+/g) || [cleanText];
  let chunkQueue: string[] = [];

  let currentChunk = "";
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > 180) {
      if (currentChunk.trim()) chunkQueue.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += " " + sentence;
    }
  }
  if (currentChunk.trim()) {
    chunkQueue.push(currentChunk.trim());
  }

  // Cap max queue to prevent infinite playback loop on long lessons
  chunkQueue = chunkQueue.slice(0, 15);

  let currentIdx = 0;
  const isHindi = lang === "hindi" || lang === "hinglish";
  const targetLangCode = isHindi ? "hi" : "en";

  // Match voice from cached list or window
  const voices = cachedVoices.length > 0 ? cachedVoices : (window.speechSynthesis.getVoices() || []);
  const matchingVoice = voices.find((v) => {
    const vLang = v.lang.toLowerCase().replace("_", "-");
    return vLang.startsWith(targetLangCode);
  });

  const speakNextChunk = () => {
    if (currentIdx >= chunkQueue.length) {
      if (onEnd) onEnd();
      return;
    }

    const chunkText = chunkQueue[currentIdx];
    const utterance = new SpeechSynthesisUtterance(chunkText);

    utterance.lang = isHindi ? "hi-IN" : "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => {
      currentIdx++;
      if (currentIdx < chunkQueue.length) {
        speakNextChunk();
      } else {
        if (onEnd) onEnd();
      }
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance error:", e);
      currentIdx++;
      if (currentIdx < chunkQueue.length) {
        speakNextChunk();
      } else {
        if (onEnd) onEnd();
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Failed to speak utterance chunk:", e);
      if (onError) onError(e);
    }
  };

  if (onStart) onStart();
  speakNextChunk();
}

export function stopLessonSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.error("Error stopping speech:", e);
    }
  }
}
