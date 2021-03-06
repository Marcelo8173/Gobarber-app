import { Router } from 'express';
import ProviderController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvalabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvalabilityController';
import ProviderMonthAvalabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvalabilityController';

import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';

const providersRouter = Router();
const providerController = new ProviderController();
import { celebrate,Segments, Joi } from 'celebrate';

const providerMonthAvalabilityController = new ProviderMonthAvalabilityController();
const providerDayAvalabilityController = new ProviderDayAvalabilityController();
//Rota: receber uma requisição, chamar outro arquivo e devolver uma resposta 

providersRouter.use(ensureAthentication);

providersRouter.get('/',providerController.index);
providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}),providerMonthAvalabilityController.index)
providersRouter.get('/:provider_id/day-availability',
celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), providerDayAvalabilityController.index)



export default providersRouter;