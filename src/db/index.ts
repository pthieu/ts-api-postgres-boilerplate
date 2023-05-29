import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { resolve } from 'node:path';
import path from 'path';
import { Pool } from 'pg';
import { fileURLToPath } from 'url';

import config from '~/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db: ReturnType<typeof drizzle>;
export async function createDb() {
  if (db) {
    return db;
  }
  const pool = new Pool({
    connectionString: config.DATABASE_URL,
  });

  db = drizzle(pool);
  return db;
}

export async function migrateLatest() {
  console.log('Running migrations...');
  const db = await createDb();
  await migrate(db, { migrationsFolder: resolve(__dirname, 'migrations') });
  console.log('Migrations completed successfully');
}
