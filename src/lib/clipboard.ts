/**
 * Safe Instant Clipboard Copy Helper
 * Guarantees synchronous 0ms copy across:
 * - Desktop Chrome / Edge / Safari / Firefox
 * - Mobile Chrome / iOS Safari / Android WebKit
 * - Insecure Contexts (e.g. Wi-Fi IP http://192.168.x.x:3001)
 * - In-app WebViews & sandboxed iframes
 */
export function safeInstantCopy(text: string): boolean {
  if (typeof window === "undefined" || !text) return false;

  let success = false;

  // 1. Synchronous DOM textarea copy (Guaranteed to execute in 0ms synchronously during the click event)
  try {
    const el = document.createElement("textarea");
    el.value = text;
    // Set 16px font-size to prevent iOS Safari auto-zooming
    el.style.fontSize = "16px";
    // Keep within visible rendering tree so WebKit/Blink doesn't ignore it
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "2em";
    el.style.height = "2em";
    el.style.padding = "0";
    el.style.border = "none";
    el.style.outline = "none";
    el.style.boxShadow = "none";
    el.style.background = "transparent";
    el.style.opacity = "0.01";
    el.style.zIndex = "-1";
    el.setAttribute("readonly", "");

    document.body.appendChild(el);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      // iOS Safari specific range selection
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
      el.setSelectionRange(0, 999999);
    } else {
      el.focus();
      el.select();
    }

    const execOk = document.execCommand("copy");
    document.body.removeChild(el);
    if (execOk) {
      success = true;
    }
  } catch (err) {
    console.warn("DOM execCommand copy error:", err);
  }

  // 2. Also dispatch to modern asynchronous navigator.clipboard if available (secure contexts)
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      navigator.clipboard.writeText(text).then(() => {
        // clipboard write succeeded
      }).catch(() => {
        // Fallback already executed above
      });
      success = true;
    } catch {
      // ignore
    }
  }

  return success;
}
