import express from 'express';

import RootRoute from '~/api/root';
import UsersRoute from '~/api/users';

const router = express.Router();

router.use('/', RootRoute);
router.use('/users', UsersRoute);

export default router;
