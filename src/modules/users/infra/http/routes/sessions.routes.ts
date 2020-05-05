import { Router, request, response } from 'express';
import SessionsControler from '@modules/users/infra/http/controllers/SessionsControllers';

const SessionsRouter = Router();
const sessionsControler = new SessionsControler();
//rota principal de criar
SessionsRouter.post('/', sessionsControler.create)


export default SessionsRouter;