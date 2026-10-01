// B9: lists every TODO(verify) in src/content and every entry still published: false.
// Usage: node scripts/todo-report.mjs   (prints a Markdown table)
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "src/content";
const rows = [];
const unpublished = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  const lines = readFileSync(join(dir, file), "utf8").split(/\r?\n/);
  let current = "";
  lines.forEach((line, i) => {
    const slug = line.match(/^\s*slug:\s*"([^"]+)"/);
    if (slug) current = slug[1];
    const pub = !/^\s*(\*|\/\/)/.test(line) && line.match(/published:\s*false/);
    if (pub) unpublished.push({ file, entry: current || "(whole page block)" });
    const todo = line.match(/\/\/\s*TODO\(verify\):?\s*(.*)$/);
    if (todo) rows.push({ file, entry: current || "(page block)", line: i + 1, note: todo[1].trim() || "(see comment above)" });
  });
}

console.log(`## TODO(verify): ${rows.length} items\n`);
console.log("| File | Entry | Line | What to verify |\n|---|---|---|---|");
for (const r of rows) console.log(`| ${r.file} | ${r.entry} | ${r.line} | ${r.note.replace(/\|/g, "/")} |`);
console.log(`\n## Still published: false: ${unpublished.length} entries\n`);
const byFile = {};
for (const u of unpublished) (byFile[u.file] ??= []).push(u.entry);
for (const [file, entries] of Object.entries(byFile)) console.log(`- ${file}: ${entries.length} (${entries.join(", ")})`);
