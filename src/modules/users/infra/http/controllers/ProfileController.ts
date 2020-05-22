import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileUserService';
import { classToClass } from 'class-transformer';

//index, show, create, update, delete


export default class ProfileController{
    public async show(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const showProfileService = container.resolve(ShowProfileService);
        
        const user = await showProfileService.execute({user_id});
        delete user.password;
        
        return response.status(200).json(user);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const user_id = request.user.id;
        const {name, email, old_password,password} = request.body;
        
 
        const updateProfileService = container.resolve(UpdateProfileService);
 
      const user = await updateProfileService.execute({
            user_id,
            name,
            email,
            old_password,
            password
         });
 
         return response.json(classToClass(user));
    }
}