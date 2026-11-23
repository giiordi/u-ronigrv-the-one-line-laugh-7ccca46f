import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My fitness app congratulated me for standing up, so I sat back down to see if it would take it personally.";

// Gate: UTF-8 text of 1 to 200 characters, not only white space,
// exactly one line, exactly one sentence (one terminal period).
function checkGate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`gate: length ${line.length} outside 1..200`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate: blank line");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("gate: more than one line");
  }
  const periods = (line.match(/\./g) ?? []).length;
  if (periods !== 1 || !line.endsWith(".")) {
    throw new Error(`gate: expected exactly one sentence, found ${periods} periods`);
  }
}

checkGate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
