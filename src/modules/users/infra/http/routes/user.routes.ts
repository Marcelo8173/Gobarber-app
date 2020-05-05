import { Router, request, response } from 'express';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';
import multer from 'multer';
import uploadConfig from '@config/upload'; 
import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';


const userRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersController();
const userAvatarController = new UserAvatarController()
//rota principal de criar
userRouter.post('/', usersControllers.create);

userRouter.patch('/avatar', ensureAthentication, upload.single('avatar'), userAvatarController.update )

export default userRouter;