import { Router, request, response } from 'express';
import AuthUserService from "@modules/users/services/AuthUserServices";
import { container } from 'tsyringe';

const SessionsRouter = Router();

//rota principal de criar
SessionsRouter.post('/', async (request, response) =>{

       const {email, password} = request.body;
       //

       const authUserServices = container.resolve(AuthUserService);

       const {user, token} = await authUserServices.execute({
            email,
            password
        })

        delete user.password

        return response.json({user, token});
    
})


export default SessionsRouter;