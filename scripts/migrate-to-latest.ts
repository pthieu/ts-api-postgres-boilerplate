// XXX(Phong): on local dev, we can run the migrations manually using
// `pn migrate:latest` but on production, it will run automatically on server
// start. This is because we want migrations to run along with the server and
// keep DB out of CI/CD pipeline.
import { migrateToLatest } from '../src/db';

migrateToLatest();
