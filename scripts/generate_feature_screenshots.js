const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const OUTPUT_DIR = path.resolve(__dirname, '../play-store-assets/screenshots/phone');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

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
// COMMON SVG DEFS & TEMPLATE HELPERS
// ============================================================================
const commonDefs = `
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#050914"/>
      <stop offset="30%" stop-color="#081124"/>
      <stop offset="70%" stop-color="#0A1630"/>
      <stop offset="100%" stop-color="#040710"/>
    </linearGradient>

    <!-- Emerald Brand Gradient -->
    <linearGradient id="emGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="50%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#04AA6D"/>
    </linearGradient>

    <!-- Cyan Accent -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7DD3FC"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>

    <!-- Amber Gold Accent -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>

    <!-- Phone Chassis Rim -->
    <linearGradient id="phoneRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>

    <!-- Atmospheric Glow -->
    <radialGradient id="topGlow" cx="50%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#04AA6D" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#0284C7" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="centerGlow" cx="50%" cy="58%" r="45%">
      <stop offset="0%" stop-color="#04AA6D" stop-opacity="0.22"/>
      <stop offset="50%" stop-color="#0284C7" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
`;

// Helper function to build a full 1080x1920 slide
function buildSlide({
  tagText,
  headlineLine1,
  headlineLine2,
  headlineLine2Color = 'url(#emGrad)',
  subtitleText,
  phoneScreenSvg,
  floatingBadgesSvg,
}) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  ${commonDefs}

  <!-- Canvas Background -->
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  <rect width="1080" height="1920" fill="url(#topGlow)"/>
  <rect width="1080" height="1920" fill="url(#centerGlow)"/>

  <!-- Subtle Blueprint Tech Grid -->
  <g opacity="0.04" stroke="#38BDF8" stroke-width="1.5">
    <line x1="120" y1="0" x2="120" y2="1920"/>
    <line x1="240" y1="0" x2="240" y2="1920"/>
    <line x1="360" y1="0" x2="360" y2="1920"/>
    <line x1="480" y1="0" x2="480" y2="1920"/>
    <line x1="600" y1="0" x2="600" y2="1920"/>
    <line x1="720" y1="0" x2="720" y2="1920"/>
    <line x1="840" y1="0" x2="840" y2="1920"/>
    <line x1="960" y1="0" x2="960" y2="1920"/>
    <line x1="0" y1="200" x2="1080" y2="200"/>
    <line x1="0" y1="400" x2="1080" y2="400"/>
    <line x1="0" y1="600" x2="1080" y2="600"/>
    <line x1="0" y1="800" x2="1080" y2="800"/>
    <line x1="0" y1="1000" x2="1080" y2="1000"/>
    <line x1="0" y1="1200" x2="1080" y2="1200"/>
    <line x1="0" y1="1400" x2="1080" y2="1400"/>
    <line x1="0" y1="1600" x2="1080" y2="1600"/>
  </g>

  <!-- ================================================================= -->
  <!-- TOP SECTION: HEADLINE & BRANDING                                 -->
  <!-- ================================================================= -->

  <!-- 1. Eyebrow Tag -->
  <g transform="translate(540, 96)">
    <rect x="-130" width="260" height="42" rx="21" fill="#0C1A32" stroke="#04AA6D" stroke-width="1.5"/>
    <circle cx="-100" cy="21" r="5.5" fill="#10B981"/>
    <text x="-80" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="14.5" fill="#E2E8F0" letter-spacing="2">${tagText}</text>
  </g>

  <!-- 2. Main High-Impact Headline -->
  <text x="540" y="200" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="62" fill="#FFFFFF" letter-spacing="-1">${headlineLine1}</text>
  <text x="540" y="275" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="62" fill="${headlineLine2Color}" letter-spacing="-1">${headlineLine2}</text>

  <!-- 3. Subtitle Description -->
  <text x="540" y="340" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="25" fill="#94A3B8" letter-spacing="0.5">${subtitleText}</text>

  <!-- ================================================================= -->
  <!-- CENTER SECTION: SLEEK FLAGSHIP SMARTPHONE MOCKUP                  -->
  <!-- ================================================================= -->

  <!-- Smartphone Mockup (Width: 640, Height: 1280) Centered at X=220, Y=430 -->
  <g transform="translate(220, 430)">
    <!-- Phone Drop Shadow -->
    <rect x="-30" y="-15" width="700" height="1310" rx="72" fill="#000000" opacity="0.65"/>
    <rect x="-15" y="-8" width="670" height="1296" rx="66" fill="#04AA6D" opacity="0.2"/>

    <!-- Outer Phone Chassis (Dark Titanium) -->
    <rect width="640" height="1280" rx="64" fill="url(#phoneRim)" stroke="#475569" stroke-width="3"/>

    <!-- Inner Screen Bezel (Pure OLED Black) -->
    <rect x="14" y="14" width="612" height="1252" rx="52" fill="#060C18"/>

    <!-- Dynamic Island / Top Camera Pill -->
    <rect x="230" y="32" width="180" height="42" rx="21" fill="#000000"/>
    <circle cx="370" cy="53" r="8" fill="#1E293B"/> <!-- Camera -->

    <!-- Status Bar -->
    <text x="56" y="62" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="700" fill="#E2E8F0">9:41</text>
    <!-- Wi-Fi / Battery -->
    <g transform="translate(530, 48)">
      <rect width="40" height="20" rx="5" fill="none" stroke="#E2E8F0" stroke-width="2"/>
      <rect x="3" y="3" width="28" height="14" rx="3" fill="#10B981"/>
    </g>

    <!-- IN-APP SCREEN CONTENT INJECTION -->
    <g transform="translate(36, 100)">
      ${phoneScreenSvg}
    </g>
  </g>

  <!-- ================================================================= -->
  <!-- FLOATING BADGES AROUND PHONE                                      -->
  <!-- ================================================================= -->
  ${floatingBadgesSvg || ''}

  <!-- ================================================================= -->
  <!-- BOTTOM BRAND FOOTER                                               -->
  <!-- ================================================================= -->
  <g transform="translate(540, 1820)">
    <rect x="-160" width="320" height="46" rx="23" fill="#0C172E" stroke="#1E293B" stroke-width="1.5"/>
    <circle cx="-130" cy="23" r="6" fill="#10B981"/>
    <text x="-110" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="15" fill="#E2E8F0" letter-spacing="1">CSguide by Nextsem</text>
  </g>
</svg>
`;
}

// ============================================================================
// SLIDE 1: BEST COMPUTER SCIENCE & BCA GUIDE (Flagship Overview)
// ============================================================================
const slide1Screen = `
  <!-- App Header -->
  <g>
    <rect width="64" height="64" rx="16" fill="#0B152A" stroke="#04AA6D" stroke-width="2"/>
    <text x="32" y="42" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">&lt;CS&gt;</text>
    <text x="84" y="42" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">CSguide</text>
    <rect x="450" y="14" width="90" height="38" rx="10" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="495" y="39" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FBBF24">PRO</text>
  </g>

  <!-- Hero Welcome Banner -->
  <g transform="translate(0, 90)">
    <rect width="540" height="170" rx="24" fill="#0C1A36" stroke="#04AA6D" stroke-width="1.5"/>
    <text x="24" y="46" font-family="sans-serif" font-weight="800" font-size="22" fill="#38BDF8">IGNOU BCA 1ST SEMESTER</text>
    <text x="24" y="86" font-family="sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">Computer Basics &amp; PC Software</text>
    <text x="24" y="124" font-family="sans-serif" font-size="17" fill="#94A3B8">Line-by-line units, solved labs &amp; viva notes</text>
    <!-- Progress pill -->
    <rect x="24" y="136" width="492" height="12" rx="6" fill="#1E293B"/>
    <rect x="24" y="136" width="390" height="12" rx="6" fill="url(#emGrad)"/>
  </g>

  <!-- Core Subjects Grid -->
  <g transform="translate(0, 290)">
    <text font-family="sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">Semester 1 Core Subjects</text>

    <!-- Subject 1: BCS-011 -->
    <g transform="translate(0, 36)">
      <rect width="540" height="130" rx="20" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
      <rect x="18" y="24" width="76" height="82" rx="14" fill="#04AA6D" fill-opacity="0.2" stroke="#04AA6D" stroke-width="1"/>
      <text x="56" y="73" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#10B981">011</text>
      <text x="110" y="52" font-family="sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">BCS-011: Computer Basics</text>
      <text x="110" y="82" font-family="sans-serif" font-size="16" fill="#94A3B8">Hardware, Software, OS &amp; Web</text>
      <rect x="420" y="44" width="100" height="42" rx="12" fill="#04AA6D"/>
      <text x="470" y="71" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">OPEN</text>
    </g>

    <!-- Subject 2: BCS-012 -->
    <g transform="translate(0, 186)">
      <rect width="540" height="130" rx="20" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
      <rect x="18" y="24" width="76" height="82" rx="14" fill="#0284C7" fill-opacity="0.2" stroke="#0284C7" stroke-width="1"/>
      <text x="56" y="73" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#38BDF8">012</text>
      <text x="110" y="52" font-family="sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">BCS-012: Basic Mathematics</text>
      <text x="110" y="82" font-family="sans-serif" font-size="16" fill="#94A3B8">Matrices, Determinants &amp; Calculus</text>
      <rect x="420" y="44" width="100" height="42" rx="12" fill="#0284C7"/>
      <text x="470" y="71" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">OPEN</text>
    </g>

    <!-- Subject 3: BCSL-013 Lab -->
    <g transform="translate(0, 336)">
      <rect width="540" height="130" rx="20" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
      <rect x="18" y="24" width="76" height="82" rx="14" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1"/>
      <text x="56" y="73" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="20" fill="#FBBF24">L-13</text>
      <text x="110" y="52" font-family="sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">BCSL-013: Software Lab</text>
      <text x="110" y="82" font-family="sans-serif" font-size="16" fill="#94A3B8">Linux, MS Office &amp; HTML Labs</text>
      <rect x="420" y="44" width="100" height="42" rx="12" fill="#F59E0B"/>
      <text x="470" y="71" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">OPEN</text>
    </g>
  </g>

  <!-- Interactive Coding Lab Snippet Card -->
  <g transform="translate(0, 790)">
    <rect width="540" height="240" rx="20" fill="#080F1F" stroke="#1E293B" stroke-width="1.5"/>
    <rect width="540" height="46" rx="20" fill="#0E1A30"/>
    <circle cx="28" cy="23" r="6" fill="#EF4444"/>
    <circle cx="48" cy="23" r="6" fill="#F59E0B"/>
    <circle cx="68" cy="23" r="6" fill="#10B981"/>
    <text x="270" y="29" text-anchor="middle" font-family="monospace" font-weight="700" font-size="16" fill="#64748B">terminal.csguide.sh</text>

    <!-- Code Snippet -->
    <text x="24" y="86" font-family="monospace" font-size="17" fill="#94A3B8">
      <tspan fill="#38BDF8">&gt; nextsem compile</tspan> <tspan fill="#FBBF24">main.c</tspan>
    </text>
    <text x="24" y="126" font-family="monospace" font-size="17" fill="#10B981">
      ✓ All 5 Practical Test Cases Passed
    </text>
    <text x="24" y="166" font-family="monospace" font-size="17" fill="#38BDF8">
      ✓ Viva Verification: 100% Score
    </text>
    <text x="24" y="206" font-family="monospace" font-size="16" fill="#E2E8F0">
      🚀 Day 1 BCA Milestone Unlocked!
    </text>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 1060)">
    <rect width="540" height="80" rx="24" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
    <text x="70" y="48" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" fill="#10B981">🏠 Home</text>
    <text x="200" y="48" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" fill="#64748B">📚 BCA Hub</text>
    <text x="340" y="48" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" fill="#64748B">💻 Labs</text>
    <text x="470" y="48" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" fill="#64748B">👤 Profile</text>
  </g>
`;

const slide1Badges = `
  <!-- Floating Badge Left: 100% Free -->
  <g transform="translate(60, 680)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#04AA6D" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">✓ 100% FREE</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#34D399">No Paywalls Ever</text>
  </g>

  <!-- Floating Badge Right: BCA 1-6 -->
  <g transform="translate(810, 840)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">🎓 BCA Sem 1-6</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#38BDF8">Complete Roadmap</text>
  </g>
`;

// ============================================================================
// SLIDE 2: INTERACTIVE CODING LABS (Practice HTML, CSS, JS, Python & C)
// ============================================================================
const slide2Screen = `
  <!-- Lab Header -->
  <g>
    <rect width="540" height="60" rx="16" fill="#0B152A" stroke="#1E293B" stroke-width="1"/>
    <text x="20" y="38" font-family="sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">💻 Day 1: HTML &amp; Terminal Lab</text>
    <rect x="420" y="10" width="100" height="40" rx="10" fill="#04AA6D"/>
    <text x="470" y="35" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">RUN ▶</text>
  </g>

  <!-- Interactive Editor Card -->
  <g transform="translate(0, 80)">
    <rect width="540" height="420" rx="20" fill="#070E1C" stroke="#1E293B" stroke-width="1.5"/>
    <!-- Editor Tab bar -->
    <rect width="540" height="48" rx="20" fill="#0E1A32"/>
    <rect x="16" y="8" width="130" height="34" rx="8" fill="#070E1C" stroke="#04AA6D" stroke-width="1"/>
    <text x="81" y="30" text-anchor="middle" font-family="monospace" font-weight="700" font-size="15" fill="#34D399">index.html</text>
    <text x="180" y="30" font-family="monospace" font-size="15" fill="#64748B">style.css</text>
    <text x="270" y="30" font-family="monospace" font-size="15" fill="#64748B">main.c</text>

    <!-- Code Editor Content -->
    <g transform="translate(20, 75)">
      <text font-family="monospace" font-size="17" fill="#94A3B8">
        <tspan x="0" y="0" fill="#EF4444">&lt;!DOCTYPE html&gt;</tspan>
        <tspan x="0" y="32" fill="#38BDF8">&lt;html&gt;</tspan>
        <tspan x="20" y="64" fill="#38BDF8">&lt;head&gt;</tspan>
        <tspan x="40" y="96" fill="#FBBF24">&lt;title&gt;</tspan><tspan fill="#FFFFFF">CS Guide Pro</tspan><tspan fill="#FBBF24">&lt;/title&gt;</tspan>
        <tspan x="20" y="128" fill="#38BDF8">&lt;/head&gt;</tspan>
        <tspan x="20" y="160" fill="#38BDF8">&lt;body&gt;</tspan>
        <tspan x="40" y="192" fill="#10B981">&lt;h1&gt;</tspan><tspan fill="#FFFFFF">Welcome to Nextsem!</tspan><tspan fill="#10B981">&lt;/h1&gt;</tspan>
        <tspan x="40" y="224" fill="#38BDF8">&lt;p&gt;</tspan><tspan fill="#94A3B8">Interactive Code Runner</tspan><tspan fill="#38BDF8">&lt;/p&gt;</tspan>
        <tspan x="20" y="256" fill="#38BDF8">&lt;/body&gt;</tspan>
        <tspan x="0" y="288" fill="#38BDF8">&lt;/html&gt;</tspan>
      </text>
    </g>
  </g>

  <!-- Live Output Drawer -->
  <g transform="translate(0, 520)">
    <rect width="540" height="260" rx="20" fill="#0A1428" stroke="#04AA6D" stroke-width="1.5"/>
    <rect width="540" height="42" rx="20" fill="#0C1B33"/>
    <text x="24" y="27" font-family="sans-serif" font-weight="800" font-size="16" fill="#10B981">● LIVE WEB &amp; TERMINAL OUTPUT</text>

    <!-- Rendered result -->
    <g transform="translate(24, 65)">
      <rect width="492" height="160" rx="12" fill="#060C18"/>
      <text x="24" y="44" font-family="sans-serif" font-weight="900" font-size="26" fill="#FFFFFF">Welcome to Nextsem!</text>
      <text x="24" y="80" font-family="sans-serif" font-size="18" fill="#94A3B8">Interactive Code Runner</text>
      <rect x="24" y="104" width="220" height="34" rx="8" fill="#04AA6D" fill-opacity="0.2" stroke="#04AA6D" stroke-width="1"/>
      <text x="36" y="126" font-family="sans-serif" font-weight="800" font-size="14" fill="#10B981">✓ PASSED (Score: 100/100)</text>
    </g>
  </g>

  <!-- Viva & GitHub Completion Check -->
  <g transform="translate(0, 800)">
    <rect width="540" height="230" rx="20" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
    <text x="24" y="42" font-family="sans-serif" font-weight="800" font-size="20" fill="#FFFFFF">Lab Completion Prerequisites</text>

    <g transform="translate(24, 65)">
      <circle cx="16" cy="16" r="14" fill="#04AA6D" fill-opacity="0.2"/>
      <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#10B981">✓</text>
      <text x="44" y="22" font-family="sans-serif" font-weight="700" font-size="17" fill="#E2E8F0">100% Coding Lab Tasks Passed</text>
    </g>

    <g transform="translate(24, 115)">
      <circle cx="16" cy="16" r="14" fill="#04AA6D" fill-opacity="0.2"/>
      <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#10B981">✓</text>
      <text x="44" y="22" font-family="sans-serif" font-weight="700" font-size="17" fill="#E2E8F0">Technical Viva QA Verified</text>
    </g>

    <g transform="translate(24, 165)">
      <circle cx="16" cy="16" r="14" fill="#04AA6D" fill-opacity="0.2"/>
      <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#10B981">✓</text>
      <text x="44" y="22" font-family="sans-serif" font-weight="700" font-size="17" fill="#E2E8F0">GitHub Repo URL Submitted</text>
    </g>
  </g>
`;

const slide2Badges = `
  <g transform="translate(60, 620)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#04AA6D" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">⚡ Live Runner</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#34D399">0ms Local Instant</text>
  </g>

  <g transform="translate(810, 780)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">💻 5+ Languages</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#FBBF24">C, Python, JS, HTML</text>
  </g>
`;

// ============================================================================
// SLIDE 3: BCA SEMESTER 1 HUB (Line-by-line Units & Exam Notes)
// ============================================================================
const slide3Screen = `
  <!-- Hub Header -->
  <g>
    <text x="0" y="32" font-family="sans-serif" font-weight="900" font-size="26" fill="#FFFFFF">BCS-011 Computer Basics</text>
    <text x="0" y="60" font-family="sans-serif" font-size="17" fill="#38BDF8">Block 1: Basics of Computer Systems</text>
  </g>

  <!-- Unit 1 Card -->
  <g transform="translate(0, 90)">
    <rect width="540" height="230" rx="20" fill="#0C1832" stroke="#04AA6D" stroke-width="1.8"/>
    <!-- Unit Badge -->
    <rect x="20" y="20" width="80" height="34" rx="8" fill="#04AA6D"/>
    <text x="60" y="43" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#FFFFFF">UNIT 1</text>
    <text x="115" y="44" font-family="sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">Computer Generation &amp; Architecture</text>

    <!-- Key concepts list -->
    <text x="24" y="95" font-family="sans-serif" font-size="16" fill="#94A3B8">• 1st to 5th Generation Hardware</text>
    <text x="24" y="125" font-family="sans-serif" font-size="16" fill="#94A3B8">• Von Neumann Architecture &amp; CPU Registers</text>
    <text x="24" y="155" font-family="sans-serif" font-size="16" fill="#94A3B8">• Memory Hierarchy &amp; I/O Buses</text>

    <rect x="24" y="175" width="492" height="38" rx="10" fill="#04AA6D"/>
    <text x="270" y="200" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">START UNIT 1 LESSON ▶</text>
  </g>

  <!-- Unit 2 Card -->
  <g transform="translate(0, 340)">
    <rect width="540" height="200" rx="20" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="20" y="20" width="80" height="34" rx="8" fill="#0284C7"/>
    <text x="60" y="43" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#FFFFFF">UNIT 2</text>
    <text x="115" y="44" font-family="sans-serif" font-weight="800" font-size="22" fill="#FFFFFF">Input &amp; Output Devices</text>

    <text x="24" y="95" font-family="sans-serif" font-size="16" fill="#94A3B8">• Keyboards, Scanners &amp; Touchscreens</text>
    <text x="24" y="125" font-family="sans-serif" font-size="16" fill="#94A3B8">• Laser, Inkjet &amp; Thermal Printers</text>

    <rect x="24" y="145" width="492" height="38" rx="10" fill="#0284C7"/>
    <text x="270" y="170" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">START UNIT 2 LESSON ▶</text>
  </g>

  <!-- Interactive MCQ Knowledge Check -->
  <g transform="translate(0, 560)">
    <rect width="540" height="300" rx="20" fill="#080F1F" stroke="#04AA6D" stroke-width="1.5"/>
    <rect width="540" height="42" rx="20" fill="#0C1B33"/>
    <text x="24" y="28" font-family="sans-serif" font-weight="800" font-size="16" fill="#10B981">❓ INTERACTIVE UNIT MCQ CHECK</text>

    <text x="24" y="80" font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">What connects the CPU to RAM?</text>

    <!-- Option A -->
    <rect x="24" y="104" width="492" height="42" rx="10" fill="#0A1428" stroke="#1E293B" stroke-width="1"/>
    <text x="44" y="131" font-family="sans-serif" font-size="16" fill="#94A3B8">A) Expansion Bus</text>

    <!-- Option B: Correct -->
    <rect x="24" y="156" width="492" height="42" rx="10" fill="#04AA6D" fill-opacity="0.2" stroke="#04AA6D" stroke-width="1.5"/>
    <text x="44" y="183" font-family="sans-serif" font-weight="800" font-size="16" fill="#10B981">B) System Bus (Data, Address, Control) ✓</text>

    <!-- Option C -->
    <rect x="24" y="208" width="492" height="42" rx="10" fill="#0A1428" stroke="#1E293B" stroke-width="1"/>
    <text x="44" y="235" font-family="sans-serif" font-size="16" fill="#94A3B8">C) USB Port</text>

    <text x="24" y="280" font-family="sans-serif" font-weight="800" font-size="15" fill="#34D399">✓ Correct! System bus connects CPU and Memory.</text>
  </g>

  <!-- Author Attribution -->
  <g transform="translate(0, 880)">
    <rect width="540" height="80" rx="16" fill="#0A1428" stroke="#1E293B" stroke-width="1"/>
    <circle cx="40" cy="40" r="22" fill="#04AA6D" fill-opacity="0.2"/>
    <text x="40" y="47" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#10B981">MK</text>
    <text x="80" y="36" font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">Curriculum by Er. Manoj Kumar</text>
    <text x="80" y="60" font-family="sans-serif" font-size="14" fill="#34D399">Senior Software Engineer &amp; Educator</text>
  </g>
`;

const slide3Badges = `
  <g transform="translate(60, 680)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#04AA6D" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">📖 100% PDF Match</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#34D399">Line-by-Line Syllabus</text>
  </g>

  <g transform="translate(810, 840)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">🌟 Easy &amp; Normal</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#FBBF24">Dual Complexity Modes</text>
  </g>
`;

// ============================================================================
// SLIDE 4: ACCURATE SGPA & GRADE CARD CALCULATOR
// ============================================================================
const slide4Screen = `
  <!-- Calculator Header -->
  <g>
    <text x="0" y="32" font-family="sans-serif" font-weight="900" font-size="26" fill="#FFFFFF">SGPA &amp; Grade Calculator</text>
    <text x="0" y="60" font-family="sans-serif" font-size="17" fill="#FBBF24">Official Weighting: 30% Assignment + 70% TEE</text>
  </g>

  <!-- Calculator Input Studio -->
  <g transform="translate(0, 90)">
    <rect width="540" height="420" rx="20" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>

    <!-- Course 1 -->
    <g transform="translate(20, 20)">
      <text font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">BCS-011 (Computer Basics)</text>
      <text x="0" y="32" font-family="sans-serif" font-size="14" fill="#94A3B8">Assignment (Max 100): 88 | TEE (Max 100): 78</text>
      <rect x="360" y="6" width="140" height="36" rx="8" fill="#04AA6D" fill-opacity="0.2" stroke="#04AA6D" stroke-width="1"/>
      <text x="430" y="30" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#10B981">81.0% (A)</text>
    </g>

    <line x1="20" y1="80" x2="520" y2="80" stroke="#1E293B" stroke-width="1"/>

    <!-- Course 2 -->
    <g transform="translate(20, 100)">
      <text font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">BCS-012 (Mathematics)</text>
      <text x="0" y="32" font-family="sans-serif" font-size="14" fill="#94A3B8">Assignment (Max 100): 84 | TEE (Max 100): 72</text>
      <rect x="360" y="6" width="140" height="36" rx="8" fill="#0284C7" fill-opacity="0.2" stroke="#0284C7" stroke-width="1"/>
      <text x="430" y="30" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#38BDF8">75.6% (B)</text>
    </g>

    <line x1="20" y1="160" x2="520" y2="160" stroke="#1E293B" stroke-width="1"/>

    <!-- Course 3 -->
    <g transform="translate(20, 180)">
      <text font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">BCSL-013 (Software Lab)</text>
      <text x="0" y="32" font-family="sans-serif" font-size="14" fill="#94A3B8">Assignment (Max 100): 94 | TEE (Max 100): 86</text>
      <rect x="360" y="6" width="140" height="36" rx="8" fill="#04AA6D" fill-opacity="0.2" stroke="#04AA6D" stroke-width="1"/>
      <text x="430" y="30" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#10B981">88.4% (A+)</text>
    </g>

    <line x1="20" y1="240" x2="520" y2="240" stroke="#1E293B" stroke-width="1"/>

    <!-- Course 4 -->
    <g transform="translate(20, 260)">
      <text font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">ECO-02 / FEG-02 (Foundation)</text>
      <text x="0" y="32" font-family="sans-serif" font-size="14" fill="#94A3B8">Assignment (Max 100): 80 | TEE (Max 100): 74</text>
      <rect x="360" y="6" width="140" height="36" rx="8" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1"/>
      <text x="430" y="30" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FBBF24">75.8% (B)</text>
    </g>

    <!-- Calculate Button -->
    <rect x="20" y="340" width="500" height="56" rx="14" fill="#04AA6D"/>
    <text x="270" y="375" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="20" fill="#FFFFFF">CALCULATE CUMULATIVE SGPA ▶</text>
  </g>

  <!-- Result Dashboard Card -->
  <g transform="translate(0, 540)">
    <rect width="540" height="260" rx="20" fill="#07142A" stroke="#04AA6D" stroke-width="2"/>
    <text x="24" y="44" font-family="sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">Semester 1 Cumulative Result</text>

    <g transform="translate(24, 70)">
      <!-- SGPA Display -->
      <rect width="230" height="150" rx="16" fill="#0C1B33"/>
      <text x="24" y="38" font-family="sans-serif" font-weight="700" font-size="16" fill="#94A3B8">Cumulative SGPA</text>
      <text x="24" y="96" font-family="sans-serif" font-weight="900" font-size="48" fill="#10B981">8.24</text>
      <text x="24" y="130" font-family="sans-serif" font-size="15" fill="#34D399">Grade: Excellent (A)</text>

      <!-- Division Display -->
      <rect x="250" width="242" height="150" rx="16" fill="#0C1B33"/>
      <text x="274" y="38" font-family="sans-serif" font-weight="700" font-size="16" fill="#94A3B8">Predicted Division</text>
      <text x="274" y="86" font-family="sans-serif" font-weight="900" font-size="30" fill="#FBBF24">1st Division</text>
      <text x="274" y="112" font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">With Distinction</text>
      <text x="274" y="134" font-family="sans-serif" font-size="14" fill="#10B981">Overall: 80.2% Marks</text>
    </g>
  </g>

  <!-- PDF Export Card -->
  <g transform="translate(0, 820)">
    <rect width="540" height="90" rx="18" fill="#0A1428" stroke="#1E293B" stroke-width="1.5"/>
    <text x="24" y="40" font-family="sans-serif" font-weight="800" font-size="18" fill="#FFFFFF">📄 Download Official Grade Summary</text>
    <text x="24" y="68" font-family="sans-serif" font-size="15" fill="#38BDF8">Instant PDF export formatted with verification link</text>
    <rect x="420" y="24" width="100" height="42" rx="10" fill="#38BDF8"/>
    <text x="470" y="51" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" fill="#FFFFFF">EXPORT</text>
  </g>
`;

const slide4Badges = `
  <g transform="translate(60, 680)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">🧮 30:70 Weight</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#FBBF24">Official IGNOU Rule</text>
  </g>

  <g transform="translate(810, 840)">
    <rect width="210" height="66" rx="18" fill="#0C1B33" stroke="#04AA6D" stroke-width="1.5"/>
    <text x="20" y="28" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">🏆 Distinction</text>
    <text x="20" y="50" font-family="sans-serif" font-weight="600" font-size="14" fill="#34D399">Real-time Forecast</text>
  </g>
`;

// ============================================================================
// RENDER ALL 4 SLIDES
// ============================================================================

const slide1Svg = buildSlide({
  tagText: 'NEXTSEM ACADEMY',
  headlineLine1: 'BEST COMPUTER SCIENCE',
  headlineLine2: '&amp; BCA STUDY GUIDE',
  headlineLine2Color: 'url(#emGrad)',
  subtitleText: 'Comprehensive Curriculum, Interactive Labs &amp; Viva',
  phoneScreenSvg: slide1Screen,
  floatingBadgesSvg: slide1Badges,
});

const slide2Svg = buildSlide({
  tagText: 'INTERACTIVE CODE RUNNER',
  headlineLine1: 'HANDS-ON CODING',
  headlineLine2: '&amp; TASK-BASED LABS',
  headlineLine2Color: 'url(#cyanGrad)',
  subtitleText: 'Practice HTML, CSS, JavaScript, C/C++ &amp; CMD CLI',
  phoneScreenSvg: slide2Screen,
  floatingBadgesSvg: slide2Badges,
});

const slide3Svg = buildSlide({
  tagText: 'IGNOU BCA HUB',
  headlineLine1: 'LINE-BY-LINE UNITS',
  headlineLine2: '&amp; SOLVED ASSIGNMENTS',
  headlineLine2Color: 'url(#emGrad)',
  subtitleText: 'BCS-011, BCS-012, BCSL-013 Lab &amp; Cheatsheets',
  phoneScreenSvg: slide3Screen,
  floatingBadgesSvg: slide3Badges,
});

const slide4Svg = buildSlide({
  tagText: 'GRADE CARD STUDIO',
  headlineLine1: 'ACCURATE SGPA &amp;',
  headlineLine2: 'GRADE CALCULATOR',
  headlineLine2Color: 'url(#goldGrad)',
  subtitleText: 'Official 30% Assignment &amp; 70% TEE Formula',
  phoneScreenSvg: slide4Screen,
  floatingBadgesSvg: slide4Badges,
});

// Render the 4 high-res phone screenshots
renderSvg(slide1Svg, 1080, 1920, path.join(OUTPUT_DIR, 'screenshot1.png'));
renderSvg(slide2Svg, 1080, 1920, path.join(OUTPUT_DIR, 'screenshot2.png'));
renderSvg(slide3Svg, 1080, 1920, path.join(OUTPUT_DIR, 'screenshot3.png'));
renderSvg(slide4Svg, 1080, 1920, path.join(OUTPUT_DIR, 'screenshot4.png'));

console.log('All 4 flagship phone screenshots successfully rendered!');
