import { Request, Response } from 'express';
import AuthUserService from "@modules/users/services/AuthUserServices";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

//index, show, create, update, delete


export default class SessionsControllers{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;
        //
 
        const authUserServices = container.resolve(AuthUserService);
 
        const {user, token} = await authUserServices.execute({
             email,
             password
         })
  
         return response.json({user: classToClass(user), token});
    }
}