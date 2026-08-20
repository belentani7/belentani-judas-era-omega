import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve('/home/ubuntu/belentani-judas-era/client/src');
const files = [];
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(current);
    else if (/\.(tsx|ts|css)$/.test(entry.name)) files.push(current);
  }
}
await walk(root);

const replacements = [
  ['#00ff41', '#ffd700'],
  ['#00ffff', '#ffffff'],
  ['#b026ff', '#ff003c'],
  ['#00ff88', '#ffd700'],
  ['#ff6600', '#ffd700'],
  ['#ff0088', '#ff003c'],
  ['#00ffff', '#ffffff'],
  ['rgba(0,255,65,', 'rgba(255,215,0,'],
  ['rgba(0,255,255,', 'rgba(255,255,255,'],
  ['0x00ffff', '0xffd700'],
  ['bg-blue-600', 'bg-[#ff003c]'],
  ['hover:bg-blue-700', 'hover:bg-[#d90436]'],
];

for (const filePath of files) {
  const original = await fs.readFile(filePath, 'utf8');
  let updated = original;
  for (const [from, to] of replacements) updated = updated.split(from).join(to);
  if (updated !== original) await fs.writeFile(filePath, updated);
}
console.log(`Unified palette in ${files.length} frontend files.`);
