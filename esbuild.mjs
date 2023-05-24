// src/index.ts --bundle --platform=node --outfile=dist/app.js --minify
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'path';

const OUT_DIR = 'dist';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  outfile: `${OUT_DIR}/app.js`,
});

const entryPoints = fs
  .readdirSync('src/db/migrations')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => path.join('src/db/migrations', file));

await build({
  entryPoints,
  bundle: true,
  minify: true,
  platform: 'node',
  outdir: `${OUT_DIR}/migrations`,
}).catch(() => process.exit(1));
