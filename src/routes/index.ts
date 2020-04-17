import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import appointmentsRouter from './appoitments.routes';
import userRouter from './user.routes'


const routes = Router();

routes.use('/sessions', sessionsRouter)
routes.use('/appoitments', appointmentsRouter)
routes.use('/users', userRouter)


export default routes;