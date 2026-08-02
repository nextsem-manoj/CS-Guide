const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function main() {
  console.log("Fetching Semester-1 home page...");
  const sem1Html = await fetchHtml("https://egyankosh.ac.in/handle/123456789/106392");
  
  // Extract sub-communities
  // e.g. <a href="/handle/123456789/106424">BCS-012 Mathematics</a>
  const subCommRegex = /<a href="\/handle\/(123456789\/\d+)">\s*([^<]+)<\/a>/g;
  let match;
  const subjects = [];
  
  while ((match = subCommRegex.exec(sem1Html)) !== null) {
    const handle = match[1];
    const name = match[2].trim();
    if (name.includes("BCS-") || name.includes("BCSL-") || name.includes("BEGLA-") || name.includes("BEVAE-") || name.includes("FEG-")) {
      subjects.push({ name, handle });
    }
  }
  
  console.log("Subjects found:", JSON.stringify(subjects, null, 2));
}

main().catch(err => console.error(err));
