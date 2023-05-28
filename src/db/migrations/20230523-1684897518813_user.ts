import { Kysely, sql } from 'kysely';

const TABLE_NAME = 'users';

// eslint-disable-next-line
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(TABLE_NAME)
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute();
}

// eslint-disable-next-line
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(TABLE_NAME).execute();
}
