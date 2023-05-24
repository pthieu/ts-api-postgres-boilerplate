// import express, { Application, Request, Response } from 'express';

import config from './config';
import ApiRouter from '~/api/root';
import app from '~/app';
import { migrateToLatest } from '~/db';

async function main() {
  if (process.env.NODE_ENV === 'production') {
    // XXX(Phong): see scripts/migrate-to-latest.ts for comments
    await migrateToLatest();
  }

  const PORT = config.PORT;

  const server = app(ApiRouter);
  server.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
  });
}

main();
