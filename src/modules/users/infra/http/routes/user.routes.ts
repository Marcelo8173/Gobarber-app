import { Router, request, response } from 'express';
import userService from '@modules/users/services/CreateUSerService';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';
import multer from 'multer';
import UserRepositoy from '@modules/users/infra/typeorm/repositories/UserRepository';
import uploadConfig from '@config/upload'; 
import UpdateAvatarUserService from '@modules/users/services/updateUserAvatar';

const userRouter = Router();
const upload = multer(uploadConfig);

//rota principal de criar
userRouter.post('/', async (request, response) =>{
    
    try {
        const {name, email, password } = request.body;
        const usersRepository = new UserRepositoy();

        const createUser = new userService(usersRepository);
        const user = await createUser.execute({
            name,
            email,
            password
        })

        delete user.password;
        
        return response.json(user);

    } catch (err) {
        return response.status(400).json({error: err.message})
    }
    
})

userRouter.patch('/avatar', ensureAthentication, upload.single('avatar') , async (request, response) =>{
     const usersRepository = new UserRepositoy();

        const updateAvatar = new UpdateAvatarUserService(usersRepository);
        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
}); 

export default userRouter;