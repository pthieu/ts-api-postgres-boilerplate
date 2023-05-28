import config from './config';
import ApiRouter from '~/api';
import app from '~/app';
import { migrateLatest } from '~/db';

async function main() {
  await migrateLatest();
  const PORT = config.PORT;

  const server = app(ApiRouter);
  server.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
  });
}

main();
