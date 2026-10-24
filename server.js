import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 8775;
const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  let filePath = path.join(BASE_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
