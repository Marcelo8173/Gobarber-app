import { Router, request, response } from 'express';
import AuthUserService from "@modules/users/services/AuthUserServices";
import UserRepositoy from '@modules/users/infra/typeorm/repositories/UserRepository';

const SessionsRouter = Router();

//rota principal de criar
SessionsRouter.post('/', async (request, response) =>{

       const {email, password} = request.body;
       //
       const usersRepositories = new UserRepositoy();

       const authUserServices = new AuthUserService(usersRepositories);

       const {user, token} = await authUserServices.execute({
            email,
            password
        })

        delete user.password

        return response.json({user, token});
    
})


export default SessionsRouter;