import { Router, request, response } from 'express';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';
import multer from 'multer';
import uploadConfig from '@config/upload'; 
import { celebrate,Segments,Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';


const userRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersController();
const userAvatarController = new UserAvatarController()
//rota principal de criar
userRouter.post('/', celebrate({
    [Segments.BODY]:{
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}),usersControllers.create);

userRouter.patch('/avatar', ensureAthentication, upload.single('avatar'), userAvatarController.update )

export default userRouter;