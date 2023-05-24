import { promises as fs } from 'fs';
import {
  FileMigrationProvider,
  Kysely,
  MigrationResultSet,
  Migrator,
  PostgresDialect,
} from 'kysely';
import { DB } from 'kysely-codegen';
import * as path from 'path';
import { Pool } from 'pg';

import config from '~/config';

// XXX(Phong): don't keep calling this without destroying the connection, there
// should only be one instance of this in the app. The migrations are ok because
// they're scripts and also run `db.destroy()`
async function createDb() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: config.DATABASE_URL }),
    }),
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
