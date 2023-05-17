import express from 'express';

import RootRoute from './root';

const router = express.Router();

router.use('/', RootRoute);

export default router;
