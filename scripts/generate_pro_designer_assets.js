const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ASSETS_DIR = path.resolve(__dirname, '../play-store-assets');

function renderSvg(svgString, width, height, outputPath) {
  const resvg = new Resvg(svgString, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`Rendered: ${outputPath} (${width}x${height})`);
}

// ============================================================================
// ULTRA-POLISHED PRO FEATURE GRAPHIC (1024x500)
// Flagship Silicon Valley Quality for Google Play Store
// ============================================================================
const featureGraphicSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 500" width="1024" height="500">
  <defs>
    <!-- Background Gradient: Deep Studio Slate -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040711"/>
      <stop offset="35%" stop-color="#060D1D"/>
      <stop offset="75%" stop-color="#09152B"/>
      <stop offset="100%" stop-color="#03060E"/>
    </linearGradient>

    <!-- Emerald Brand Gradient -->
    <linearGradient id="emGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="50%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#04AA6D"/>
    </linearGradient>

    <!-- Electric Cyan Gradient -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7DD3FC"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>

    <!-- Phone Glass Rim Gradient -->
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>

    <!-- Ambient Glow: Emerald & Cyan Backlights -->
    <radialGradient id="auraRight" cx="72%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#04AA6D" stop-opacity="0.28"/>
      <stop offset="45%" stop-color="#0284C7" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="auraLeft" cx="15%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 1. Deep Studio Canvas -->
  <rect width="1024" height="500" fill="url(#bgGrad)"/>
  <rect width="1024" height="500" fill="url(#auraRight)"/>
  <rect width="1024" height="500" fill="url(#auraLeft)"/>

  <!-- 2. Precision Developer Blueprint Grid -->
  <g opacity="0.04" stroke="#38BDF8" stroke-width="1">
    <line x1="64" y1="0" x2="64" y2="500"/>
    <line x1="128" y1="0" x2="128" y2="500"/>
    <line x1="192" y1="0" x2="192" y2="500"/>
    <line x1="256" y1="0" x2="256" y2="500"/>
    <line x1="320" y1="0" x2="320" y2="500"/>
    <line x1="384" y1="0" x2="384" y2="500"/>
    <line x1="448" y1="0" x2="448" y2="500"/>
    <line x1="512" y1="0" x2="512" y2="500"/>
    <line x1="576" y1="0" x2="576" y2="500"/>
    <line x1="640" y1="0" x2="640" y2="500"/>
    <line x1="704" y1="0" x2="704" y2="500"/>
    <line x1="768" y1="0" x2="768" y2="500"/>
    <line x1="832" y1="0" x2="832" y2="500"/>
    <line x1="896" y1="0" x2="896" y2="500"/>
    <line x1="960" y1="0" x2="960" y2="500"/>
    <line x1="0" y1="64" x2="1024" y2="64"/>
    <line x1="0" y1="128" x2="1024" y2="128"/>
    <line x1="0" y1="192" x2="1024" y2="192"/>
    <line x1="0" y1="256" x2="1024" y2="256"/>
    <line x1="0" y1="320" x2="1024" y2="320"/>
    <line x1="0" y1="384" x2="1024" y2="384"/>
    <line x1="0" y1="448" x2="1024" y2="448"/>
  </g>

  <!-- ===================================================================== -->
  <!-- LEFT COLUMN: BRAND IDENTITY & TYPOGRAPHY                              -->
  <!-- ===================================================================== -->

  <!-- A. Eyebrow Tag: NEXTSEM ACADEMY OFFICIAL -->
  <g transform="translate(56, 44)">
    <rect width="210" height="30" rx="15" fill="#0C1A32" stroke="#04AA6D" stroke-width="1.2"/>
    <circle cx="16" cy="15" r="4.5" fill="#10B981"/>
    <text x="32" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="11.5" fill="#E2E8F0" letter-spacing="1.5">NEXTSEM ACADEMY</text>
  </g>

  <!-- B. Main Headline: CSguide by Nextsem -->
  <text x="56" y="142" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="64" fill="#FFFFFF" letter-spacing="-1">
    CSguide
    <tspan fill="url(#emGrad)" font-size="40" font-weight="800" letter-spacing="-0.5"> by Nextsem</tspan>
  </text>

  <!-- C. High-Impact Value Proposition Tagline -->
  <text x="58" y="184" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="19" fill="#94A3B8" letter-spacing="0.3">
    Complete Computer Science &amp; BCA Learning Companion
  </text>

  <!-- D. Premium Feature Highlights (Clean Glassmorphic Cards) -->
  <!-- Feature 1: IGNOU BCA 1st Semester Hub -->
  <g transform="translate(56, 222)">
    <rect width="280" height="46" rx="12" fill="#0B152B" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="24" cy="23" r="12" fill="#0284C7" fill-opacity="0.25"/>
    <path d="M 18 20 L 24 23 L 18 26" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF">IGNOU BCA 1st Semester Hub</text>
    <text x="46" y="37" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="11" fill="#38BDF8">BCS-011 • BCS-012 • BCSL-013 Lab</text>
  </g>

  <!-- Feature 2: Interactive Coding Labs -->
  <g transform="translate(56, 280)">
    <rect width="280" height="46" rx="12" fill="#0B152B" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="24" cy="23" r="12" fill="#04AA6D" fill-opacity="0.25"/>
    <path d="M 17 20 L 14 23 L 17 26 M 31 20 L 34 23 L 31 26" fill="none" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF">Interactive Coding Labs</text>
    <text x="46" y="37" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="11" fill="#34D399">HTML, CSS, JS, Python &amp; CMD CLI</text>
  </g>

  <!-- Feature 3: Viva Preparation & Grade Calculator -->
  <g transform="translate(56, 338)">
    <rect width="280" height="46" rx="12" fill="#0B152B" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="24" cy="23" r="12" fill="#F59E0B" fill-opacity="0.25"/>
    <path d="M 19 23 L 23 27 L 30 19" fill="none" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF">Lab Viva &amp; SGPA Calculator</text>
    <text x="46" y="37" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="11" fill="#FBBF24">Verified Answers &amp; Grade Forecast</text>
  </g>

  <!-- E. Bottom Trust Badges (Free + Certified + Dark Theme) -->
  <g transform="translate(56, 408)">
    <!-- Free Badge -->
    <rect width="138" height="32" rx="8" fill="#04AA6D" fill-opacity="0.18" stroke="#04AA6D" stroke-width="1.2"/>
    <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="12" fill="#10B981">✓ 100% FREE</text>

    <!-- Mentor Attribution -->
    <rect x="150" width="186" height="32" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
    <circle cx="166" cy="16" r="4.5" fill="#38BDF8"/>
    <text x="178" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="11.5" fill="#E2E8F0">Er. Manoj Kumar</text>
  </g>

  <!-- ===================================================================== -->
  <!-- RIGHT COLUMN: WORLD-CLASS HARDWARE APP UI SHOWCASE                    -->
  <!-- A sleek modern smartphone mockup displaying the live app              -->
  <!-- ===================================================================== -->

  <!-- Smartphone Mockup Container (Width: 260, Height: 440) -->
  <g transform="translate(576, 30)">
    <!-- Ambient Phone Drop Shadow -->
    <rect x="-16" y="-8" width="292" height="456" rx="38" fill="#000000" opacity="0.65"/>
    <rect x="-8" y="-4" width="276" height="448" rx="34" fill="#04AA6D" opacity="0.18"/>

    <!-- Outer Smartphone Chassis (Titanium Dark Slate) -->
    <rect width="260" height="440" rx="32" fill="url(#rimGrad)" stroke="#475569" stroke-width="2"/>

    <!-- Inner Screen Bezel (Matte Black) -->
    <rect x="6" y="6" width="248" height="428" rx="26" fill="#060C18"/>

    <!-- Dynamic Island / Speaker Notch -->
    <rect x="94" y="14" width="72" height="18" rx="9" fill="#000000"/>
    <circle cx="152" cy="23" r="3.5" fill="#1E293B"/>

    <!-- Status Bar (Clock 9:41, Wi-Fi, Battery) -->
    <text x="24" y="27" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="700" fill="#E2E8F0">9:41</text>
    <g transform="translate(216, 20)">
      <rect width="18" height="9" rx="2.5" fill="none" stroke="#E2E8F0" stroke-width="1"/>
      <rect x="1.5" y="1.5" width="12" height="6" rx="1.5" fill="#10B981"/>
    </g>

    <!-- IN-APP UI SCREEN CONTENT -->
    <!-- App Navigation Header -->
    <g transform="translate(18, 44)">
      <!-- App Brand Mark: Miniature CS Emblem -->
      <rect width="28" height="28" rx="7" fill="#0B152A" stroke="#04AA6D" stroke-width="1.2"/>
      <text x="14" y="19" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10.5" fill="#FFFFFF">&lt;CS&gt;</text>
      <!-- Title -->
      <text x="36" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">CSguide</text>
      <!-- Gold Pro Badge -->
      <rect x="180" y="4" width="44" height="20" rx="5" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1"/>
      <text x="202" y="17" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="9" fill="#FBBF24">PRO</text>
    </g>

    <!-- Card 1: Active Interactive Practical Lab -->
    <g transform="translate(18, 86)">
      <rect width="224" height="152" rx="14" fill="#0A1324" stroke="#1E293B" stroke-width="1.2"/>
      <!-- Header with Traffic Lights -->
      <rect width="224" height="30" rx="14" fill="#0E1A30"/>
      <circle cx="14" cy="15" r="3.5" fill="#EF4444"/>
      <circle cx="26" cy="15" r="3.5" fill="#F59E0B"/>
      <circle cx="38" cy="15" r="3.5" fill="#10B981"/>
      <text x="120" y="19" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#64748B">BCS-011 • Day 1 Lab</text>

      <!-- Terminal Output Content -->
      <g transform="translate(12, 42)">
        <text font-family="ui-monospace, monospace" font-size="9.5" fill="#94A3B8">
          <tspan x="0" y="0" fill="#38BDF8">$ csguide run practical.c</tspan>
          <tspan x="0" y="16" fill="#10B981">✓ Coding Task: 100% PASSED</tspan>
          <tspan x="0" y="32" fill="#FBBF24">✓ Technical Viva: VERIFIED</tspan>
          <tspan x="0" y="48" fill="#E2E8F0">✓ GitHub Repo: CONNECTED</tspan>
        </text>

        <!-- Progress Bar -->
        <g transform="translate(0, 68)">
          <rect width="200" height="6" rx="3" fill="#1E293B"/>
          <rect width="180" height="6" rx="3" fill="url(#emGrad)"/>
          <text x="0" y="20" font-family="sans-serif" font-size="9" font-weight="700" fill="#10B981">Sprint Progress: 90% Unlocked</text>
        </g>
      </g>
    </g>

    <!-- Card 2: BCA Subject Roadmap Module -->
    <g transform="translate(18, 250)">
      <rect width="224" height="110" rx="14" fill="#0A1324" stroke="#1E293B" stroke-width="1.2"/>
      <text x="14" y="22" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="11" fill="#FFFFFF">Semester 1 Modules</text>

      <!-- Subject Item 1 -->
      <g transform="translate(14, 32)">
        <circle cx="10" cy="10" r="10" fill="#04AA6D" fill-opacity="0.25"/>
        <text x="10" y="14" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="9" fill="#10B981">1</text>
        <text x="28" y="11" font-family="sans-serif" font-weight="700" font-size="10.5" fill="#E2E8F0">BCS-011 Computer Basics</text>
        <text x="28" y="23" font-family="sans-serif" font-size="8.5" fill="#34D399">Unit 1 to 4 Notes &amp; MCQs</text>
      </g>

      <!-- Subject Item 2 -->
      <g transform="translate(14, 68)">
        <circle cx="10" cy="10" r="10" fill="#0284C7" fill-opacity="0.25"/>
        <text x="10" y="14" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="9" fill="#38BDF8">2</text>
        <text x="28" y="11" font-family="sans-serif" font-weight="700" font-size="10.5" fill="#E2E8F0">BCSL-013 Software Lab</text>
        <text x="28" y="23" font-family="sans-serif" font-size="8.5" fill="#38BDF8">Linux, Word, Excel &amp; Web</text>
      </g>
    </g>

    <!-- Bottom Navigation Bar on Phone -->
    <g transform="translate(18, 372)">
      <rect width="224" height="42" rx="12" fill="#0B1428" stroke="#1E293B" stroke-width="1"/>
      <circle cx="36" cy="21" r="5" fill="#10B981"/>
      <circle cx="92" cy="21" r="5" fill="#64748B"/>
      <circle cx="148" cy="21" r="5" fill="#64748B"/>
      <circle cx="196" cy="21" r="5" fill="#64748B"/>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- FLOATING BADGES AROUND PHONE (High-end 3D Layering Effect)            -->
  <!-- ===================================================================== -->

  <!-- Floating Badge 1: Top Right "BCA Sem 1-6" -->
  <g transform="translate(848, 68)">
    <rect width="144" height="44" rx="12" fill="#0F1D38" stroke="#38BDF8" stroke-width="1.2"/>
    <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">🎓 BCA Sem 1-6</text>
    <text x="14" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="9.5" fill="#38BDF8">Complete Coverage</text>
  </g>

  <!-- Floating Badge 2: Mid Right "Coding Labs" -->
  <g transform="translate(848, 190)">
    <rect width="144" height="44" rx="12" fill="#0F1D38" stroke="#04AA6D" stroke-width="1.2"/>
    <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">💻 90-Day Labs</text>
    <text x="14" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="9.5" fill="#34D399">Hands-on Coding</text>
  </g>

  <!-- Floating Badge 3: Bottom Right "Grade Calc" -->
  <g transform="translate(848, 312)">
    <rect width="144" height="44" rx="12" fill="#0F1D38" stroke="#F59E0B" stroke-width="1.2"/>
    <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF">🧮 SGPA Calculator</text>
    <text x="14" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="9.5" fill="#FBBF24">Accurate Weighting</text>
  </g>
</svg>
`;

renderSvg(featureGraphicSvg, 1024, 500, path.join(ASSETS_DIR, 'feature_graphic_1024x500.png'));
console.log('Flagship feature graphic successfully generated!');
