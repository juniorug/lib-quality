import { Router } from 'express';
import appRouter from './app.routes';

const routes = Router();

routes.use('/', appRouter);

export default routes;