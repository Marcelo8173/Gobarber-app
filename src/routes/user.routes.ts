import { Router, request, response } from 'express';
import userService from '../services/CreateUSerService';
import ensureAthentication from '../middlewares/ensureAthentication';
import multer from 'multer';
import uploadConfig from '../config/upload'; 
import UpdateAvatarUserService from '../services/updateUserAvatar';

const userRouter = Router();
const upload = multer(uploadConfig);

//rota principal de criar
userRouter.post('/', async (request, response) =>{
    
    try {
        const {name, email, password } = request.body;

        const createUser = new userService();
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
    
        const updateAvatar = new UpdateAvatarUserService();
        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
}); 

export default userRouter;