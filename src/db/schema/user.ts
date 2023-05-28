import { InferModel } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const tableName = 'users';

export const UserTable = pgTable(
  tableName,
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 512 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(table.email),
    };
  },
);

export type User = InferModel<typeof UserTable>;
export type NewUser = InferModel<typeof UserTable, 'insert'>;
