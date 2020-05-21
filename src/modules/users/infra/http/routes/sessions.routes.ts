import { Router, request, response } from 'express';
import { celebrate,Segments,Joi } from 'celebrate';

import SessionsControler from '@modules/users/infra/http/controllers/SessionsControllers';

const SessionsRouter = Router();
const sessionsControler = new SessionsControler();
//rota principal de criar
SessionsRouter.post('/', celebrate({
    [Segments.BODY]:{
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}),sessionsControler.create)


export default SessionsRouter;