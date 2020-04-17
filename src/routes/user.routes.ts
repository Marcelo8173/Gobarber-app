import { Router, request, response } from 'express';
import userService from '../services/CreateUSerService';

const userRouter = Router();


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


export default userRouter;