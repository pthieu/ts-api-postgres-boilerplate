import Router from 'express-promise-router';

import Controller from './controller';

const router = Router();

// XXX(Phong): we 404 the root path in case someone hits it by accident or is
// trying to do an attack
router.get('/', (_, res) => res.sendStatus(404));
router.get('/ping', Controller.ping);
router.get('/serverinfo', Controller.serverInfo);

export default router;
