import Router from 'express-promise-router';

import { list } from './controller';

const router = Router();

router.get('/', list);

export default router;
