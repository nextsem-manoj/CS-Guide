const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ASSETS_DIR = path.resolve(__dirname, '../play-store-assets');
const PHONE_DIR = path.resolve(ASSETS_DIR, 'screenshots/phone');

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

const bubuPath = path.resolve(__dirname, '../public/mascot/bubu_coding_laptop_transparent.png');
const duduPath = path.resolve(__dirname, '../public/mascot/dudu_coding_laptop_transparent.png');
const bubuBase64 = fs.existsSync(bubuPath) ? fs.readFileSync(bubuPath).toString('base64') : '';
const duduBase64 = fs.existsSync(duduPath) ? fs.readFileSync(duduPath).toString('base64') : '';

// ============================================================================
// MASCOT ILLUSTRATION 1: Cute Bubu Bear with Cyan Laptop & Mug
// ============================================================================
const femaleCoderSvg = `
  <g id="bubu-coder">
    <circle cx="160" cy="180" r="115" fill="#FEF3C7" opacity="0.7"/>
    <circle cx="160" cy="180" r="95" fill="#DCFCE7" opacity="0.6"/>
    <ellipse cx="160" cy="285" rx="110" ry="14" fill="#000000" opacity="0.08"/>
    <image href="data:image/png;base64,${bubuBase64}" x="40" y="55" width="240" height="240" preserveAspectRatio="xMidYMid meet"/>
    <g transform="translate(80, 50)">
      <rect width="80" height="22" rx="11" fill="#0F172A" stroke="#38BDF8" stroke-width="1.2"/>
      <text x="40" y="15" text-anchor="middle" font-family="monospace" font-weight="800" font-size="10" fill="#38BDF8">&lt;bubu/&gt;</text>
    </g>
  </g>
`;

// ============================================================================
// MASCOT ILLUSTRATION 2: Cute Dudu Panda with Pink Laptop & Pacifier
// ============================================================================
const maleCoderSvg = `
  <g id="dudu-coder">
    <circle cx="160" cy="180" r="115" fill="#FCE7F3" opacity="0.7"/>
    <circle cx="160" cy="180" r="95" fill="#EDE9FE" opacity="0.6"/>
    <ellipse cx="160" cy="285" rx="110" ry="14" fill="#000000" opacity="0.08"/>
    <image href="data:image/png;base64,${duduBase64}" x="40" y="55" width="240" height="240" preserveAspectRatio="xMidYMid meet"/>
    <g transform="translate(80, 50)">
      <rect width="80" height="22" rx="11" fill="#0F172A" stroke="#F43F5E" stroke-width="1.2"/>
      <text x="40" y="15" text-anchor="middle" font-family="monospace" font-weight="800" font-size="10" fill="#F43F5E">&lt;dudu/&gt;</text>
    </g>
  </g>
`;

// ============================================================================
// ANGLED SMARTPHONE FRAME WITH SCREEN (White Chassis)
// ============================================================================
function createAngledPhone({
  phoneTitle = 'Web Development HTML & CSS',
  headerColor = '#0284C7',
  buttonText = 'START LEARNING',
}) {
  return `
    <!-- Drop Shadow -->
    <rect x="-10" y="14" width="300" height="580" rx="44" fill="#000000" opacity="0.20"/>

    <!-- White Smartphone Chassis -->
    <rect width="280" height="560" rx="38" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3"/>

    <!-- Screen Bezel -->
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#060C18"/>

    <!-- Speaker / Camera Notch -->
    <rect x="94" y="16" width="76" height="18" rx="9" fill="#FFFFFF"/>
    <circle cx="152" cy="25" r="3.5" fill="#475569"/>

    <!-- Status Bar -->
    <text x="24" y="30" font-family="-apple-system, sans-serif" font-weight="700" font-size="11" fill="#FFFFFF">9:00</text>
    <path d="M 235 24 L 244 18 L 244 30 Z" fill="#FFFFFF"/>
    <rect x="248" y="20" width="12" height="9" rx="2" fill="#FFFFFF"/>

    <!-- Screen Header Banner -->
    <g transform="translate(18, 48)">
      <rect width="228" height="110" rx="16" fill="${headerColor}"/>
      <text x="114" y="44" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="900" font-size="17" fill="#FFFFFF">Web</text>
      <text x="114" y="68" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="900" font-size="17" fill="#FFFFFF">Development</text>
      <text x="114" y="92" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="15" fill="#E0F2FE">HTML &amp; CSS</text>
    </g>

    <!-- Screen Lessons List -->
    <g transform="translate(18, 172)">
      <!-- Lesson 1 -->
      <rect width="228" height="64" rx="12" fill="#0C172E" stroke="#1E293B" stroke-width="1"/>
      <circle cx="24" cy="32" r="12" fill="#04AA6D" fill-opacity="0.2"/>
      <text x="24" y="37" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#10B981">1</text>
      <text x="48" y="28" font-family="sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">HTML Basics</text>
      <text x="48" y="46" font-family="sans-serif" font-size="11" fill="#94A3B8">Tags, Elements &amp; Forms</text>
      <circle cx="204" cy="32" r="8" fill="#04AA6D"/>
      <text x="204" y="36" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10" fill="#FFFFFF">✓</text>

      <!-- Lesson 2 -->
      <g transform="translate(0, 74)">
        <rect width="228" height="64" rx="12" fill="#0C172E" stroke="#1E293B" stroke-width="1"/>
        <circle cx="24" cy="32" r="12" fill="#0284C7" fill-opacity="0.2"/>
        <text x="24" y="37" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#38BDF8">2</text>
        <text x="48" y="28" font-family="sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">CSS Styling</text>
        <text x="48" y="46" font-family="sans-serif" font-size="11" fill="#94A3B8">Flexbox, Grid &amp; Design</text>
        <circle cx="204" cy="32" r="8" fill="#0284C7"/>
        <text x="204" y="36" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="10" fill="#FFFFFF">✓</text>
      </g>

      <!-- Lesson 3 -->
      <g transform="translate(0, 148)">
        <rect width="228" height="64" rx="12" fill="#0C172E" stroke="#1E293B" stroke-width="1"/>
        <circle cx="24" cy="32" r="12" fill="#F59E0B" fill-opacity="0.2"/>
        <text x="24" y="37" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#FBBF24">3</text>
        <text x="48" y="28" font-family="sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">JavaScript Lab</text>
        <text x="48" y="46" font-family="sans-serif" font-size="11" fill="#94A3B8">DOM &amp; Event Handling</text>
      </g>
    </g>

    <!-- Start Learning Button -->
    <g transform="translate(18, 480)">
      <rect width="228" height="48" rx="12" fill="#0284C7"/>
      <text x="114" y="30" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#FFFFFF">${buttonText}</text>
    </g>
  `;
}

// ============================================================================
// 1. FEATURE GRAPHIC (1024x500) IN USER'S EXACT REFERENCE STYLE
// Perfectly balanced composition: Text on Left, Coder in Center, Phone on Right
// ============================================================================
const featureGraphic1024x500Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 500" width="1024" height="500">
  <defs>
    <radialGradient id="fgAura" cx="30%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#DCFCE7" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#F1F5F9" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fgAuraRight" cx="80%" cy="40%" r="45%">
      <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Crisp Clean White Background -->
  <rect width="1024" height="500" fill="#FFFFFF"/>
  <rect width="1024" height="500" fill="url(#fgAura)"/>
  <rect width="1024" height="500" fill="url(#fgAuraRight)"/>

  <!-- Soft Geometric Dots -->
  <circle cx="60" cy="180" r="12" fill="#BBF7D0" opacity="0.6"/>
  <circle cx="440" cy="70" r="10" fill="#BAE6FD" opacity="0.6"/>
  <circle cx="980" cy="380" r="16" fill="#FEF08A" opacity="0.5"/>

  <!-- LEFT: BOLD HEADLINE (Reference Style) -->
  <g transform="translate(56, 70)">
    <text x="0" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="46" fill="#15803D" letter-spacing="1">BEST</text>
    <text x="0" y="96" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="46" fill="#16A34A" letter-spacing="1">HTML, CSS &amp; BCA</text>
    <text x="0" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="46" fill="#15803D" letter-spacing="1">TUTORIAL</text>

    <!-- Tagline -->
    <text x="0" y="195" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="17" fill="#475569">
      Complete Computer Science &amp; Developer Guide
    </text>

    <!-- Badges -->
    <g transform="translate(0, 222)">
      <rect width="160" height="34" rx="8" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.2"/>
      <text x="14" y="22" font-family="sans-serif" font-weight="800" font-size="12.5" fill="#15803D">✓ 100% Free Lessons</text>
    </g>

    <g transform="translate(170, 222)">
      <rect width="160" height="34" rx="8" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.2"/>
      <text x="14" y="22" font-family="sans-serif" font-weight="800" font-size="12.5" fill="#1D4ED8">⚡ Interactive Labs</text>
    </g>
  </g>

  <!-- Bottom Brand Text (Reference style) -->
  <g transform="translate(56, 435)">
    <text x="0" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="28" fill="#16A34A" letter-spacing="0.5">
      CSguide <tspan fill="#334155" font-weight="700" font-size="20">by Nextsem</tspan>
    </text>
  </g>

  <!-- CENTER: FEMALE DEVELOPER VECTOR ILLUSTRATION -->
  <g transform="translate(280, 50) scale(0.95)">
    ${femaleCoderSvg}
  </g>

  <!-- RIGHT: ANGLED SMARTPHONE FRAME -->
  <g transform="translate(730, -50) rotate(22)">
    ${createAngledPhone({
      phoneTitle: 'Web Development HTML & CSS',
      headerColor: '#0284C7',
      buttonText: 'START LEARNING',
    })}
  </g>
</svg>
`;

// ============================================================================
// 2. PHONE SCREENSHOT 1 (1080x1920) IN USER'S EXACT REFERENCE STYLE
// ============================================================================
const screenshot1Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <radialGradient id="cardAura1" cx="30%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#DCFCE7" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1920" fill="#FFFFFF"/>
  <rect width="1080" height="1920" fill="url(#cardAura1)"/>

  <!-- TOP HEADLINE (Exact style & font from User Image 1) -->
  <g transform="translate(80, 110)">
    <text x="0" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="92" fill="#15803D" letter-spacing="2">BEST</text>
    <text x="0" y="190" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="92" fill="#16A34A" letter-spacing="2">HTML &amp; CSS</text>
    <text x="0" y="300" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="92" fill="#15803D" letter-spacing="2">TUTORIAL</text>
  </g>

  <!-- ANGLED SMARTPHONE (Center-Right, rotated 28 degrees) -->
  <g transform="translate(680, 240) rotate(28) scale(1.75)">
    ${createAngledPhone({
      phoneTitle: 'Web Development HTML & CSS',
      headerColor: '#0284C7',
      buttonText: 'START LEARNING',
    })}
  </g>

  <!-- FEMALE DEVELOPER VECTOR ILLUSTRATION (Bottom-Left) -->
  <g transform="translate(60, 960) scale(2.2)">
    ${femaleCoderSvg}
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
// 3. PHONE SCREENSHOT 2 (1080x1920) IN USER'S EXACT REFERENCE STYLE
// ============================================================================
const screenshot2Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <radialGradient id="cardAura2" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FEE2E2" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1920" fill="#FFFFFF"/>
  <rect width="1080" height="1920" fill="url(#cardAura2)"/>

  <!-- TOP HEADLINE (Crimson / Red bold text from User Image 2) -->
  <g transform="translate(540, 90)">
    <text x="0" y="70" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="78" fill="#991B1B" letter-spacing="3">EXPLORE AND</text>
    <text x="0" y="160" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="78" fill="#DC2626" letter-spacing="3">LEARN</text>
    <text x="0" y="250" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="78" fill="#991B1B" letter-spacing="3">WEB TECH</text>
  </g>

  <!-- ANGLED SMARTPHONE (Perspective, rotated -24 degrees) -->
  <g transform="translate(390, 430) rotate(-24) scale(1.75)">
    ${createAngledPhone({
      phoneTitle: 'Interactive Coding & BCA Labs',
      headerColor: '#DC2626',
      buttonText: 'START CODING',
    })}
  </g>

  <!-- MALE DEVELOPER AT DESK VECTOR ILLUSTRATION -->
  <g transform="translate(140, 930) scale(2.2)">
    ${maleCoderSvg}
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
renderSvg(featureGraphic1024x500Svg, 1024, 500, path.join(ASSETS_DIR, 'feature_graphic_1024x500.png'));
renderSvg(screenshot1Svg, 1080, 1920, path.join(PHONE_DIR, 'screenshot1.png'));
renderSvg(screenshot2Svg, 1080, 1920, path.join(PHONE_DIR, 'screenshot2.png'));

console.log('All reference-style feature graphics and screenshots rendered successfully!');
