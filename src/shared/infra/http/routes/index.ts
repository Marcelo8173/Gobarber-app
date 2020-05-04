import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appoitments.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';


const routes = Router();

routes.use('/sessions', sessionsRouter)
routes.use('/appoitments', appointmentsRouter)
routes.use('/users', userRouter)


export default routes;