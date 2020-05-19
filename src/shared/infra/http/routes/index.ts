import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appoitments.routes';
import providersRoute from '@modules/appointments/infra/http/routes/Providers.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import passwordRouter from '@modules/users/infra/http/routes/Password.routes';
import profileRouter from '@modules/users/infra/http/routes/Profile.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);    
routes.use('/appoitments', appointmentsRouter);
routes.use('/providers',providersRoute);
routes.use('/users', userRouter);
routes.use('/password' , passwordRouter);
routes.use('/profile', profileRouter);

export default routes;