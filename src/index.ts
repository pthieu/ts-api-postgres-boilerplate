// import express, { Application, Request, Response } from 'express';

import config from './config';
import ApiRouter from '~/api/root';
import app from '~/app';

const PORT = config.PORT;

const server = app(ApiRouter);
server.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
