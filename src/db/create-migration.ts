// XXX(Phong): run with
// `pn run migrate:create name`

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const migrationFolder = resolve(__dirname, './migrations');

async function main() {
  const name = process.argv[2] || '';

  const now = new Date();
  const ts = now.getTime();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');

  const filenameArr = [`${year}${month}${day}-${ts}`];
  if (name) {
    filenameArr.push(`_${name}`);
  }

  filenameArr.push('.ts');
  const filename = filenameArr.join('');

  await writeFile(resolve(migrationFolder, filename), getTemplate());
}

function getTemplate() {
  return `import { Kysely } from 'kysely';

// eslint-disable-next-line
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
}

// eslint-disable-next-line
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
}`;
}

main();
