// build.js - Bundles src/ modules into dist/app.bundle.js so index.html runs anywhere (even file://)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = [
  'src/data/jobs.js',
  'src/data/database.js',
  'src/render/paperdoll.js',
  'src/engine/game.js',
  'src/main.js'
];

let out = '(function() {\n"use strict";\n';

for (const rel of files) {
  let code = fs.readFileSync(path.join(__dirname, rel), 'utf8');
  // Strip ES module import/re-export blocks and export keywords
  code = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  code = code.replace(/export\s+\{[\s\S]*?\}\s+from\s+['"][^'"]+['"];?/g, '');
  code = code.replace(/export\s+(const|function|class)\s+/g, '$1 ');
  out += `\n// --- ${rel} ---\n` + code + '\n';
}

out += '\n})();\n';

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'app.bundle.js'), out, 'utf8');
console.log('Successfully generated dist/app.bundle.js');
