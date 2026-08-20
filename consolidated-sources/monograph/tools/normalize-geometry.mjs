import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve('/home/ubuntu/belentani-judas-era/client/src');
const files = [];

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(filePath);
    else if (/\.(tsx|ts|css)$/.test(entry.name)) files.push(filePath);
  }
}

await walk(root);
for (const filePath of files) {
  const original = await fs.readFile(filePath, 'utf8');
  const updated = original
    .replace(/\brounded(?:-[^\s"'`}>]+)?/g, 'clip-corner')
    .replace(/\bfont-sans\b/g, 'font-[Chakra_Petch]');
  if (updated !== original) await fs.writeFile(filePath, updated);
}
console.log(`Normalized ${files.length} frontend files.`);
