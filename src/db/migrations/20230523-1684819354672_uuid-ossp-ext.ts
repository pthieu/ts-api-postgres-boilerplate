import { Kysely, sql } from 'kysely';

// eslint-disable-next-line
export async function up(db: Kysely<any>): Promise<void> {
  await sql`create extension if not exists "uuid-ossp";`.execute(db);
}

// eslint-disable-next-line
export async function down(db: Kysely<any>): Promise<void> {
  await sql`drop extension if exists "uuid-ossp";`.execute(db);
}
