const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ASSETS_DIR = path.resolve(__dirname, '../play-store-assets');
const PHONE_DIR = path.resolve(ASSETS_DIR, 'screenshots/phone');

const lightImgPath = 'C:/Users/nextsem/.gemini/antigravity-ide/brain/d88bafe7-278f-415c-a011-6024022fb0dc/.user_uploaded/media_1791617680988.png';
const darkImgPath = 'C:/Users/nextsem/.gemini/antigravity-ide/brain/d88bafe7-278f-415c-a011-6024022fb0dc/.user_uploaded/media_1791617686605.png';

const bubuPath = path.resolve(__dirname, '../public/mascot/bubu_coding_laptop_transparent.png');
const duduPath = path.resolve(__dirname, '../public/mascot/dudu_coding_laptop_transparent.png');

const lightBase64 = fs.readFileSync(lightImgPath).toString('base64');
const darkBase64 = fs.readFileSync(darkImgPath).toString('base64');
const bubuBase64 = fs.readFileSync(bubuPath).toString('base64');
const duduBase64 = fs.readFileSync(duduPath).toString('base64');

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
// 1. DUAL THEME FEATURE GRAPHIC (1024x500)
// With cute Bubu coding on laptop + Dual Angled In-App Phones
// ============================================================================
const featureGraphicSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 500" width="1024" height="500">
  <defs>
    <!-- Studio Clean Background -->
    <linearGradient id="bgStudio" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="#F8FAFC"/>
      <stop offset="75%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>

    <radialGradient id="auraLeft" cx="20%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#DCFCE7" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#F0FDF4" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="auraCenter" cx="44%" cy="55%" r="40%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.75"/>
      <stop offset="60%" stop-color="#DCFCE7" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="auraRight" cx="75%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#0284C7" stop-opacity="0.16"/>
      <stop offset="50%" stop-color="#04AA6D" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Clip Paths for Screen Images -->
    <clipPath id="clipPhoneDark">
      <rect x="8" y="8" width="234" height="484" rx="28"/>
    </clipPath>

    <clipPath id="clipPhoneLight">
      <rect x="8" y="8" width="234" height="484" rx="28"/>
    </clipPath>
  </defs>

  <!-- Background Base -->
  <rect width="1024" height="500" fill="url(#bgStudio)"/>
  <rect width="1024" height="500" fill="url(#auraLeft)"/>
  <rect width="1024" height="500" fill="url(#auraCenter)"/>
  <rect width="1024" height="500" fill="url(#auraRight)"/>

  <!-- Subtle Blueprint Accents -->
  <circle cx="50" cy="150" r="12" fill="#86EFAC" opacity="0.6"/>
  <circle cx="360" cy="55" r="10" fill="#93C5FD" opacity="0.6"/>
  <circle cx="510" cy="445" r="14" fill="#FDE68A" opacity="0.6"/>

  <!-- ===================================================================== -->
  <!-- LEFT COLUMN: REFERENCE-STYLE BOLD TYPOGRAPHY                          -->
  <!-- ===================================================================== -->
  <g transform="translate(48, 60)">
    <!-- Line 1: BEST -->
    <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" fill="#15803D" letter-spacing="1">BEST</text>
    <!-- Line 2: BCA PRACTICAL -->
    <text x="0" y="94" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" fill="#16A34A" letter-spacing="1">BCA PRACTICAL</text>
    <!-- Line 3: CODING LAB -->
    <text x="0" y="144" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" fill="#0F172A" letter-spacing="1">CODING LAB</text>

    <!-- Tagline -->
    <text x="0" y="188" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#475569">
      3-Year Degree Curriculum • 360 Daily Labs
    </text>

    <!-- DUAL THEME BADGE -->
    <g transform="translate(0, 212)">
      <rect width="250" height="38" rx="10" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
      <circle cx="18" cy="19" r="5" fill="#10B981"/>
      <text x="32" y="24" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="12.5" fill="#FFFFFF">
        ☀️ LIGHT &amp; 🌙 DARK THEMES
      </text>
    </g>

    <!-- Supporting Value Chips -->
    <g transform="translate(0, 262)">
      <rect width="118" height="32" rx="8" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.2"/>
      <text x="12" y="21" font-family="sans-serif" font-weight="800" font-size="12" fill="#15803D">✓ 100% Free</text>

      <rect x="126" width="124" height="32" rx="8" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.2"/>
      <text x="138" y="21" font-family="sans-serif" font-weight="800" font-size="12" fill="#1D4ED8">⚡ GitHub Labs</text>
    </g>
  </g>

  <!-- Bottom Brand Text (With authentic </> Logo Badge) -->
  <g transform="translate(48, 440)">
    <!-- Blue Logo Box -->
    <rect width="32" height="32" rx="8" fill="#2563EB"/>
    <text x="16" y="22" text-anchor="middle" font-family="monospace" font-weight="900" font-size="14" fill="#FFFFFF">&lt;/&gt;</text>
    <text x="44" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="26" fill="#15803D" letter-spacing="0.5">
      CSguide <tspan fill="#334155" font-weight="700" font-size="18">by Nextsem</tspan>
    </text>
  </g>

  <!-- ===================================================================== -->
  <!-- CENTER: CUTE BUBU CODING ON LAPTOP (REPLACING OLD FEMALE CODER)       -->
  <!-- ===================================================================== -->
  <g id="center-mascot-bubu">
    <!-- Ambient Studio Glow & Backdrop -->
    <circle cx="435" cy="275" r="130" fill="#FEF3C7" opacity="0.7"/>
    <circle cx="435" cy="275" r="105" fill="#DCFCE7" opacity="0.55"/>
    <ellipse cx="435" cy="390" rx="120" ry="12" fill="#000000" opacity="0.08"/>

    <!-- Bubu Bear enthusiastically typing on cyan laptop -->
    <image href="data:image/png;base64,${bubuBase64}" x="295" y="125" width="275" height="275" preserveAspectRatio="xMidYMid meet"/>
    
    <!-- Cute Floating Dev Bubble -->
    <g transform="translate(340, 115)">
      <rect width="96" height="26" rx="13" fill="#0F172A" stroke="#38BDF8" stroke-width="1.2"/>
      <text x="48" y="17" text-anchor="middle" font-family="monospace" font-weight="800" font-size="11" fill="#38BDF8">&lt;bubu.code/&gt;</text>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- RIGHT: DUAL PHONES WITH REAL IN-APP UI SCREENSHOTS                    -->
  <!-- ===================================================================== -->

  <!-- BACK PHONE: DARK THEME (Tilted 14 degrees) -->
  <g transform="translate(585, -28) rotate(14) scale(0.91)">
    <!-- Drop Shadow -->
    <rect x="-8" y="14" width="266" height="520" rx="42" fill="#000000" opacity="0.32"/>
    <!-- Phone Frame -->
    <rect width="250" height="500" rx="36" fill="#1E293B" stroke="#475569" stroke-width="2.5"/>
    <!-- Screen: Real Dark Screenshot -->
    <image href="data:image/png;base64,${darkBase64}" x="8" y="8" width="234" height="484" clip-path="url(#clipPhoneDark)" preserveAspectRatio="xMidYMin slice"/>
    <!-- Theme Badge -->
    <rect x="25" y="455" width="200" height="30" rx="8" fill="#000000" fill-opacity="0.85" stroke="#334155" stroke-width="1"/>
    <text x="125" y="475" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#38BDF8">🌙 DARK THEME</text>
  </g>

  <!-- FRONT PHONE: LIGHT THEME (Tilted 24 degrees, in foreground) -->
  <g transform="translate(768, -45) rotate(24) scale(0.93)">
    <!-- Drop Shadow -->
    <rect x="-8" y="14" width="266" height="520" rx="42" fill="#000000" opacity="0.22"/>
    <!-- Phone Frame -->
    <rect width="250" height="500" rx="36" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.5"/>
    <!-- Screen: Real Light Screenshot -->
    <image href="data:image/png;base64,${lightBase64}" x="8" y="8" width="234" height="484" clip-path="url(#clipPhoneLight)" preserveAspectRatio="xMidYMin slice"/>
    <!-- Theme Badge -->
    <rect x="25" y="455" width="200" height="30" rx="8" fill="#FFFFFF" fill-opacity="0.9" stroke="#E2E8F0" stroke-width="1"/>
    <text x="125" y="475" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#15803D">☀️ LIGHT THEME</text>
  </g>
</svg>
`;

// ============================================================================
// 2. PHONE SCREENSHOT 1 (1080x1920) - LIGHT THEME + BUBU CODING
// ============================================================================
const screenshot1Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <radialGradient id="cardAura1" cx="30%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#DCFCE7" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clipPhoneFullLight">
      <rect x="14" y="14" width="462" height="972" rx="52"/>
    </clipPath>
  </defs>

  <rect width="1080" height="1920" fill="#FFFFFF"/>
  <rect width="1080" height="1920" fill="url(#cardAura1)"/>

  <!-- TOP HEADLINE (Reference Style) -->
  <g transform="translate(80, 110)">
    <text x="0" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="88" fill="#15803D" letter-spacing="2">BEST</text>
    <text x="0" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="88" fill="#16A34A" letter-spacing="2">BCA PRACTICAL</text>
    <text x="0" y="290" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="88" fill="#0F172A" letter-spacing="2">CODING LAB</text>
  </g>

  <!-- ANGLED SMARTPHONE (With real Light Theme screen) -->
  <g transform="translate(680, 240) rotate(26) scale(1.0)">
    <rect x="-12" y="16" width="514" height="1030" rx="66" fill="#000000" opacity="0.20"/>
    <rect width="490" height="1000" rx="60" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="4"/>
    <image href="data:image/png;base64,${lightBase64}" x="14" y="14" width="462" height="972" clip-path="url(#clipPhoneFullLight)" preserveAspectRatio="xMidYMin slice"/>
  </g>

  <!-- BUBU BEAR CODING (Bottom-Left) -->
  <g transform="translate(60, 1040)">
    <circle cx="270" cy="290" r="230" fill="#FEF3C7" opacity="0.6"/>
    <circle cx="270" cy="290" r="190" fill="#DCFCE7" opacity="0.5"/>
    <ellipse cx="270" cy="490" rx="210" ry="22" fill="#000000" opacity="0.08"/>
    <image href="data:image/png;base64,${bubuBase64}" x="10" y="40" width="510" height="510" preserveAspectRatio="xMidYMid meet"/>
    <!-- Floating Dev Badge -->
    <g transform="translate(100, 30)">
      <rect width="180" height="46" rx="23" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
      <text x="90" y="30" text-anchor="middle" font-family="monospace" font-weight="800" font-size="20" fill="#38BDF8">&lt;bubu.code/&gt;</text>
    </g>
  </g>

  <!-- BOTTOM APP BRANDING -->
  <g transform="translate(80, 1820)">
    <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="38" fill="#16A34A" letter-spacing="1">
      CSguide <tspan fill="#475569" font-weight="700" font-size="28">by Nextsem</tspan>
    </text>
  </g>
</svg>
`;

// ============================================================================
// 3. PHONE SCREENSHOT 2 (1080x1920) - DARK THEME + DUDU PANDA CODING
// ============================================================================
const screenshot2Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <radialGradient id="cardAura2" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#EFF6FF" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clipPhoneFullDark">
      <rect x="14" y="14" width="462" height="972" rx="52"/>
    </clipPath>
  </defs>

  <rect width="1080" height="1920" fill="#FFFFFF"/>
  <rect width="1080" height="1920" fill="url(#cardAura2)"/>

  <!-- TOP HEADLINE (Reference Style) -->
  <g transform="translate(540, 90)">
    <text x="0" y="70" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="78" fill="#1D4ED8" letter-spacing="3">EXPLORE IN</text>
    <text x="0" y="160" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="78" fill="#2563EB" letter-spacing="3">OLED DARK</text>
    <text x="0" y="250" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="78" fill="#0F172A" letter-spacing="3">THEME</text>
  </g>

  <!-- ANGLED SMARTPHONE (With real Dark Theme screen) -->
  <g transform="translate(390, 430) rotate(-22) scale(1.0)">
    <rect x="-12" y="16" width="514" height="1030" rx="66" fill="#000000" opacity="0.30"/>
    <rect width="490" height="1000" rx="60" fill="#1E293B" stroke="#475569" stroke-width="4"/>
    <image href="data:image/png;base64,${darkBase64}" x="14" y="14" width="462" height="972" clip-path="url(#clipPhoneFullDark)" preserveAspectRatio="xMidYMin slice"/>
  </g>

  <!-- DUDU PANDA CODING (Bottom-Left) -->
  <g transform="translate(70, 1080)">
    <circle cx="250" cy="280" r="230" fill="#FCE7F3" opacity="0.6"/>
    <circle cx="250" cy="280" r="190" fill="#EDE9FE" opacity="0.5"/>
    <ellipse cx="250" cy="490" rx="210" ry="25" fill="#000000" opacity="0.08"/>
    <image href="data:image/png;base64,${duduBase64}" x="25" y="55" width="450" height="450" preserveAspectRatio="xMidYMid meet"/>
    <!-- Floating Dev Badge -->
    <g transform="translate(90, 30)">
      <rect width="180" height="46" rx="23" fill="#0F172A" stroke="#F43F5E" stroke-width="2"/>
      <text x="90" y="30" text-anchor="middle" font-family="monospace" font-weight="800" font-size="20" fill="#F43F5E">&lt;dudu.code/&gt;</text>
    </g>
  </g>

  <!-- BOTTOM APP BRANDING -->
  <g transform="translate(980, 1820)">
    <text x="0" y="30" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="38" fill="#16A34A" letter-spacing="1">
      CSguide <tspan fill="#475569" font-weight="700" font-size="28">by Nextsem</tspan>
    </text>
  </g>
</svg>
`;

// Render all assets
renderSvg(featureGraphicSvg, 1024, 500, path.join(ASSETS_DIR, 'feature_graphic_1024x500.png'));
renderSvg(screenshot1Svg, 1080, 1920, path.join(PHONE_DIR, 'screenshot1.png'));
renderSvg(screenshot2Svg, 1080, 1920, path.join(PHONE_DIR, 'screenshot2.png'));

console.log('Successfully re-rendered all assets with authentic Bubu and Dudu mascots!');
