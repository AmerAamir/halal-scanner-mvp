#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import AdmZip from 'adm-zip';
// Read version from the rules package.json. Using require here because
// TypeScript/Node does not support ESM import assertions in CommonJS context.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rulesPkg = require('@halalscanner/rules/package.json');
const rulesVersion: string = rulesPkg.version;

/**
 * Bundle the YAML and JSON rules into a versioned ZIP archive.  The resulting
 * file name is `rules-v<version>.zip` and contains the files in a `data/`
 * directory.  This archive can be served as a GitHub Release for clients
 * to download.
 */
async function run() {
  const zip = new AdmZip();
  const baseDir = path.join(__dirname, '..', '..', 'packages', 'rules', 'data');
  const files = await fs.readdir(baseDir);
  for (const file of files) {
    const filePath = path.join(baseDir, file);
    const data = await fs.readFile(filePath);
    zip.addFile(`data/${file}`, data);
  }
  const outDir = path.join(__dirname, '..', 'bundle');
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `rules-v${rulesVersion}.zip`);
  await fs.writeFile(outPath, zip.toBuffer());
  console.log(`Created ${outPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});