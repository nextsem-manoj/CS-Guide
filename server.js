import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const OUT_DIR = path.join(__dirname, 'out');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

function resolveFilePath(urlPath) {
  let decodedPath = decodeURIComponent(urlPath.split('?')[0]);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[\/\\])+/, '');

  const candidates = [
    // 1. Direct file in out/
    path.join(OUT_DIR, safePath),
    // 2. HTML extension in out/
    path.join(OUT_DIR, `${safePath}.html`),
    // 3. Directory index.html in out/
    path.join(OUT_DIR, safePath, 'index.html'),
    // 4. Direct file in public/
    path.join(PUBLIC_DIR, safePath),
    // 5. HTML extension in public/
    path.join(PUBLIC_DIR, `${safePath}.html`),
    // 6. Directory index.html in public/
    path.join(PUBLIC_DIR, safePath, 'index.html'),
    // 7. Root fallback
    path.join(__dirname, safePath)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  // Fallback to out/index.html for root or out/404.html
  if (safePath === '' || safePath === '/') {
    const rootIndex = path.join(OUT_DIR, 'index.html');
    if (fs.existsSync(rootIndex)) return rootIndex;
  }

  const notFoundPage = path.join(OUT_DIR, '404.html');
  if (fs.existsSync(notFoundPage)) return notFoundPage;

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFilePath(req.url);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const is404 = filePath.endsWith('404.html');

  res.writeHead(is404 ? 404 : 200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('500 Server Error');
  });
  stream.pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Operating System Lesson: http://localhost:${PORT}/bca/semester-1/bcs-011-computer-basics/unit-2-operating-system`);
  console.log(`12-Page Notes Suite: http://localhost:${PORT}/bca/notes/bcs-011-unit-2-operating-system`);
  console.log(`Standalone HTML: http://localhost:${PORT}/os-unit2-fill-in-the-blanks.html`);
});
