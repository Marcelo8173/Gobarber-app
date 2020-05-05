import { Router, request, response } from 'express';
import userService from '@modules/users/services/CreateUSerService';
import ensureAthentication from '@modules/users/infra/http/middlewares/ensureAthentication';
import multer from 'multer';
import uploadConfig from '@config/upload'; 
import UpdateAvatarUserService from '@modules/users/services/updateUserAvatar';
import { container } from 'tsyringe';

const userRouter = Router();
const upload = multer(uploadConfig);

//rota principal de criar
userRouter.post('/', async (request, response) =>{
    
    try {
        const {name, email, password } = request.body;

        const createUser = container.resolve(userService);
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

        const updateAvatar = container.resolve(UpdateAvatarUserService);
        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
}); 

export default userRouter;