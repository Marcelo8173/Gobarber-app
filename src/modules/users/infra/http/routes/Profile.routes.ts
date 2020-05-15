import { Router } from 'express';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';



const profileRoutes = Router();
const profileController = new ProfileController();



profileRoutes.use(ensureAthentication);

profileRoutes.put('/', profileController.create);
profileRoutes.get('/', profileController.show)


export default profileRoutes; 