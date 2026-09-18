import fs from 'fs';
import path from 'path';

// Helper to generate the Lock Overlay HTML
export function getLockModalHtml() {
  return `
  <!-- SECURITY LOCK OVERLAY (PUBLIC ACCESS GATEWAY) -->
  <div id="security-lock-modal" class="fixed inset-0 z-[9999] bg-[#060c18] flex items-center justify-center p-4 selection:bg-[#04AA6D] selection:text-black" style="display: flex;">
    <div class="w-full max-w-md bg-[#0c1328] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/15 text-center space-y-6 relative overflow-hidden">
      <!-- Ambient Glow Highlights -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Lock Emblem & Headers -->
      <div class="relative space-y-3">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-[#141d38] border border-emerald-500/50 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-pulse">
          <span class="text-3xl">🔒</span>
        </div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
          Er. Manoj Kumar • Private Study Notes
        </div>
        <h2 class="text-2xl font-black text-white tracking-tight">
          Restricted Course Material
        </h2>
        <p class="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
          This comprehensive algorithm suite, interactive flowcharts, and C++ compiler environment are password-protected. Enter your authorized master password to unlock access.
        </p>
      </div>

      <!-- Password Unlock Form -->
      <form id="lock-form" onsubmit="handleUnlock(event)" class="space-y-4 text-left">
        <div class="space-y-1.5">
          <label for="access-pass" class="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Access Password</label>
          <div class="relative">
            <input 
              type="password" 
              id="access-pass" 
              required
              autocomplete="current-password"
              placeholder="Enter access password..." 
              class="w-full bg-[#070b16] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none pr-12 transition-all"
            />
            <button 
              type="button" 
              onclick="togglePasswordVisibility()" 
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-base transition cursor-pointer p-1"
              title="Toggle visibility"
            >
              👁️
            </button>
          </div>
        </div>

        <div id="lock-error-msg" class="hidden text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/30 rounded-xl p-2.5 text-center">
          ❌ Incorrect password! Access denied.
        </div>

        <button 
          type="submit" 
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span>Unlock Study Material</span>
          <span>🔓</span>
        </button>
      </form>

      <!-- Return to Home Link -->
      <div class="pt-2 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-center gap-2">
        <span>Public Visitor?</span>
        <a href="/" class="text-emerald-400 hover:underline font-bold">Return to Home 🏠</a>
      </div>
    </div>
  </div>
`;
}

// Helper to generate the Lock Logic JavaScript
export function getLockJsScript() {
  return `
  <script>
    const VALID_PASSWORDS = ["nextsem2026", "ignou2026", "bca111", "manojkumar", "nextsem"];
    const STORAGE_KEY = "nextsem_algorithms_suite_unlocked";

    function checkInitialLock() {
      const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true" || sessionStorage.getItem(STORAGE_KEY) === "true";
      const modal = document.getElementById("security-lock-modal");
      const content = document.getElementById("protected-content");

      if (isUnlocked) {
        if (modal) modal.style.display = "none";
        if (content) content.style.display = "block";
      } else {
        if (modal) modal.style.display = "flex";
        if (content) content.style.display = "none";
      }
    }

    function handleUnlock(e) {
      if (e) e.preventDefault();
      const input = document.getElementById("access-pass");
      const errorMsg = document.getElementById("lock-error-msg");
      const pass = (input ? input.value : "").trim();

      if (VALID_PASSWORDS.includes(pass)) {
        localStorage.setItem(STORAGE_KEY, "true");
        sessionStorage.setItem(STORAGE_KEY, "true");
        const modal = document.getElementById("security-lock-modal");
        const content = document.getElementById("protected-content");
        if (modal) {
          modal.style.transition = "opacity 0.3s ease-out";
          modal.style.opacity = "0";
          setTimeout(() => { modal.style.display = "none"; }, 300);
        }
        if (content) {
          content.style.display = "block";
        }
      } else {
        if (errorMsg) {
          errorMsg.classList.remove("hidden");
          if (input) {
            input.classList.add("border-red-500");
            setTimeout(() => {
              input.classList.remove("border-red-500");
            }, 2000);
          }
        }
      }
    }

    function togglePasswordVisibility() {
      const input = document.getElementById("access-pass");
      if (input) {
        input.type = input.type === "password" ? "text" : "password";
      }
    }

    function lockPage() {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      location.reload();
    }

    // Run lock check immediately on load
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", checkInitialLock);
    } else {
      checkInitialLock();
    }
  </script>
`;
}
