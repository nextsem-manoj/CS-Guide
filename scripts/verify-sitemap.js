const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../out/sitemap.xml');

console.log('🔍 Checking if sitemap.xml is generated and available...');

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ Error: sitemap.xml was not found in the out/ directory!');
  process.exit(1);
}

try {
  const content = fs.readFileSync(sitemapPath, 'utf8');

  // Verify it is well-formed XML
  if (!content.trim().startsWith('<?xml') || !content.trim().endsWith('</urlset>')) {
    console.error('❌ Error: sitemap.xml does not appear to be a valid XML sitemap file.');
    process.exit(1);
  }

  // Define critical URLs to verify
  const requiredPaths = [
    '',
    '/about',
    '/bca',
    '/bca/semester-1',
    '/profile'
  ];

  let missingCount = 0;
  requiredPaths.forEach((subpath) => {
    const primaryUrl = `https://cs.nextsem.online${subpath}`;
    const primaryUrlWithSlash = subpath === '' ? 'https://cs.nextsem.online/' : primaryUrl;
    const legacyUrl = `https://ignou-study-notes-by-nextsem.web.app${subpath}`;
    const legacyUrlWithSlash = subpath === '' ? 'https://ignou-study-notes-by-nextsem.web.app/' : legacyUrl;

    const found = content.includes(primaryUrl) || content.includes(primaryUrlWithSlash) || content.includes(legacyUrl) || content.includes(legacyUrlWithSlash);

    if (!found) {
      console.error(`❌ Error: sitemap is missing required URL for path: "${subpath || '/'}"`);
      missingCount++;
    } else {
      console.log(`  ✓ Found URL for path: ${subpath || '/'}`);
    }
  });

  if (missingCount > 0) {
    process.exit(1);
  }

  console.log('✅ Success: sitemap.xml is available, well-formed, and verified successfully!');
} catch (error) {
  console.error('❌ Unexpected error reading or verifying sitemap.xml:', error);
  process.exit(1);
}
