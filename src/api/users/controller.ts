import { Request, Response } from 'express';

import { UserTable } from '../../db/schema/user';
import { createDb } from '~/db';

export async function list(_req: Request, res: Response) {
  const db = await createDb();
  const users = await db.select().from(UserTable);
  res.json(users);
}
