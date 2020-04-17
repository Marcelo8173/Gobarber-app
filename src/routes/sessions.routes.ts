import { Router, request, response } from 'express';
import AuthUserService from '../services/AuthUserServices';

const SessionsRouter = Router();


//rota principal de criar
SessionsRouter.post('/', async (request, response) =>{
    
    try {
       const {email, password} = request.body;

       const authUserServices = new AuthUserService();

       const {user, token} = await authUserServices.execute({
            email,
            password
        })

        delete user.password

        return response.json({user, token});

    } catch (err) {
        return response.status(400).json({error: err.message})
    }
    
})


export default SessionsRouter;