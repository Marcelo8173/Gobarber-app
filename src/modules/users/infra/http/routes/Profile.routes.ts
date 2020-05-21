import { Router } from 'express';
import { celebrate,Segments,Joi } from 'celebrate';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';



const profileRoutes = Router();
const profileController = new ProfileController();



profileRoutes.use(ensureAthentication);

profileRoutes.put('/', celebrate({
    [Segments.BODY]:{
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
}), profileController.create);
profileRoutes.get('/', profileController.show)


export default profileRoutes; 