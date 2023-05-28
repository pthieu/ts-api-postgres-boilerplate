import { promises as fs } from 'fs';
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  MigrationResultSet,
  Migrator,
  PostgresDialect,
} from 'kysely';
import * as path from 'path';
import { Pool } from 'pg';

import config from '~/config';
import { DB } from '~/db/schema';

// XXX(Phong): don't keep calling this without destroying the connection, there
// should only be one instance of this in the app. The migrations are ok because
// they're scripts and also run `db.destroy()`
let db: Kysely<DB> | null = null;
export async function createDb() {
  if (db) {
    return db;
  }
  db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: config.DATABASE_URL }),
    }),
    plugins: [new CamelCasePlugin()],
  });
  return db;
}

async function createMigrator(db: Kysely<DB>) {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  });

  return migrator;
}

async function processMigrationResults({ error, results }: MigrationResultSet) {
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }
}

export async function migrateToLatest() {
  const db = await createDb();
  const migrator = await createMigrator(db);
  const res = await migrator.migrateToLatest();
  await processMigrationResults(res);

  await db.destroy();
}

export async function migrateDown() {
  const db = await createDb();
  const migrator = await createMigrator(db);
  const res = await migrator.migrateDown();
  await processMigrationResults(res);

  await db.destroy();
}

export async function migrateUp() {
  const db = await createDb();
  const migrator = await createMigrator(db);
  const res = await migrator.migrateUp();
  await processMigrationResults(res);

  await db.destroy();
}
