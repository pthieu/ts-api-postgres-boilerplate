import { Request, Response } from 'express';

import { createDb } from '~/db';

export async function list(_req: Request, res: Response) {
  const db = await createDb();
  const users = await db.selectFrom('users').selectAll().execute();
  res.json(users);
}
