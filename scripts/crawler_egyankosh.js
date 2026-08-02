// Bypasses local SSL certificate issues with eGyanKosh
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://egyankosh.ac.in';
const BOOKS_ROOT = path.join(__dirname, '../public/BCA_NEW_Books/1st Semester');

if (!fs.existsSync(BOOKS_ROOT)) {
  fs.mkdirSync(BOOKS_ROOT, { recursive: true });
}

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects if any
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = BASE_URL + redirectUrl;
        }
        return fetchHtml(redirectUrl).then(resolve).catch(reject);
      }
      
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = BASE_URL + redirectUrl;
        }
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
      }
      
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// Clean names for Windows folder naming compatibility
function cleanName(name) {
  return name
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

async function getSubCommunities(sem1Handle) {
  console.log(`[Sem-1] Fetching subjects for handle ${sem1Handle}...`);
  const html = await fetchHtml(`${BASE_URL}/handle/${sem1Handle}`);
  
  // Extract sub-communities matching links like /handle/123456789/xxxxx
  const regex = /<a href="\/handle\/(123456789\/\d+)">\s*([^<]+)<\/a>/g;
  let match;
  const subjects = [];
  while ((match = regex.exec(html)) !== null) {
    const handle = match[1];
    const rawName = match[2].trim();
    if (rawName.match(/^(BCS-|BCSL-|BEGLA-|BEVAE-)/i)) {
      subjects.push({
        rawName,
        handle
      });
    }
  }
  return subjects;
}

async function getCollections(subjectHandle) {
  console.log(`[Subject] Fetching blocks for handle ${subjectHandle}...`);
  const html = await fetchHtml(`${BASE_URL}/handle/${subjectHandle}`);
  
  // Find collections (Blocks)
  // e.g. <a href="/handle/123456789/106425">Block-1 Algebra-I</a> or Block 1 ...
  const regex = /<a href="\/handle\/(123456789\/\d+)">\s*(Block[- ][^<]+)<\/a>/gi;
  let match;
  const collections = [];
  while ((match = regex.exec(html)) !== null) {
    collections.push({
      name: match[2].trim(),
      handle: match[1]
    });
  }
  return collections;
}

async function getItems(collectionHandle) {
  console.log(`[Block] Fetching units for handle ${collectionHandle}...`);
  const html = await fetchHtml(`${BASE_URL}/handle/${collectionHandle}`);
  
  // Find items (Units) inside table or list
  // e.g. <a href="/handle/123456789/10976">Unit-4 Mathematical Induction</a> or Unit 4 ...
  const regex = /<a href="\/handle\/(123456789\/\d+)">\s*(Unit[- ][^<]+)<\/a>/gi;
  let match;
  const items = [];
  const visited = new Set();
  while ((match = regex.exec(html)) !== null) {
    const handle = match[1];
    const name = match[2].trim();
    if (!visited.has(handle)) {
      visited.add(handle);
      items.push({ name, handle });
    }
  }
  return items;
}

async function getPdfUrl(itemHandle) {
  const html = await fetchHtml(`${BASE_URL}/handle/${itemHandle}`);
  
  // Find PDF bitstream link
  // e.g. href="/bitstream/123456789/10976/1/Unit-4.pdf"
  const regex = /href="(\/bitstream\/123456789\/\d+\/\d+\/[^"]+\.pdf)"/i;
  const match = regex.exec(html);
  if (match) {
    return BASE_URL + match[1];
  }
  return null;
}

async function crawlSemester1() {
  const subjects = await getSubCommunities('123456789/106392');
  console.log(`Found ${subjects.length} subjects in eGyanKosh.`);
  
  const results = [];
  
  for (const subject of subjects) {
    console.log(`\n--------------------------------------------`);
    console.log(`Processing Subject: ${subject.rawName}`);
    
    // Parse subject details
    const codeMatch = subject.rawName.match(/^([A-Z0-9-]+)\s+(.*)$/i);
    const code = codeMatch ? codeMatch[1].trim() : subject.rawName;
    const name = codeMatch ? codeMatch[2].trim() : subject.rawName;
    const isLab = code.endsWith('L');
    
    const subjectFolder = cleanName(`${code} ${name}`);
    const subjectPath = path.join(BOOKS_ROOT, subjectFolder);
    const relSubjectPath = `1st Semester/${subjectFolder}`;
    
    if (!fs.existsSync(subjectPath)) {
      fs.mkdirSync(subjectPath, { recursive: true });
    }
    
    const blocks = await getCollections(subject.handle);
    const blockDataList = [];
    
    for (const block of blocks) {
      console.log(`  Processing Block: ${block.name}`);
      const blockFolder = cleanName(block.name);
      const blockPath = path.join(subjectPath, blockFolder);
      const relBlockPath = `${relSubjectPath}/${blockFolder}`;
      
      if (!fs.existsSync(blockPath)) {
        fs.mkdirSync(blockPath, { recursive: true });
      }
      
      const units = await getItems(block.handle);
      const unitDataList = [];
      
      for (const unit of units) {
        console.log(`    Processing Unit: ${unit.name}`);
        const pdfUrl = await getPdfUrl(unit.handle);
        if (!pdfUrl) {
          console.warn(`    [!] No PDF link found for unit: ${unit.name}`);
          continue;
        }
        
        // Determine filename
        const urlFilename = path.basename(decodeURIComponent(pdfUrl));
        const cleanFilename = cleanName(urlFilename);
        const destPath = path.join(blockPath, cleanFilename);
        
        // Download if missing
        if (!fs.existsSync(destPath)) {
          console.log(`      Downloading PDF: ${cleanFilename} from ${pdfUrl}...`);
          try {
            await downloadFile(pdfUrl, destPath);
            console.log(`      ✓ Saved.`);
          } catch (e) {
            console.error(`      [x] Error downloading ${pdfUrl}:`, e.message);
          }
        } else {
          console.log(`      ✓ PDF already exists: ${cleanFilename}`);
        }
        
        unitDataList.push({
          fileName: cleanFilename,
          displayName: unit.name.replace(/^Unit-\d+\s+/i, '').trim(),
          isInteractive: false
        });
      }
      
      blockDataList.push({
        name: block.name,
        path: relBlockPath,
        units: unitDataList
      });
    }
    
    results.push({
      code,
      name,
      isLab,
      path: relSubjectPath,
      blocks: blockDataList
    });
  }
  
  // Save compiled structure to scratch for reference
  const outPath = path.join(__dirname, 'sem1_egyankosh_structure.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nCrawler finished. Structure saved to: ${outPath}`);
}

crawlSemester1().catch(err => console.error("Global crawler error:", err));
