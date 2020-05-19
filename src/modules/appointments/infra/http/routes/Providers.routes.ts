import { Router } from 'express';
import ProviderController from '@modules/appointments/infra/http/controllers/ProvidersController';


import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';

const providersRouter = Router();
const providerController = new ProviderController();
//Rota: receber uma requisição, chamar outro arquivo e devolver uma resposta 

providersRouter.use(ensureAthentication);

providersRouter.get('/',providerController.index)


export default providersRouter;