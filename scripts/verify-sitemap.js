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
  const requiredUrls = [
    'https://ignou.nextsem.online/',
    'https://ignou.nextsem.online/about',
    'https://ignou.nextsem.online/bca',
    'https://ignou.nextsem.online/bca/semester-1',
    'https://ignou.nextsem.online/profile'
  ];

  let missingCount = 0;
  requiredUrls.forEach((url) => {
    if (!content.includes(url)) {
      console.error(`❌ Error: sitemap is missing required URL: ${url}`);
      missingCount++;
    } else {
      console.log(`  ✓ Found URL: ${url}`);
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
