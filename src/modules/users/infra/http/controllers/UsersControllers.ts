import { Request, Response } from 'express';
import userService from '@modules/users/services/CreateUSerService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';



export default class UsersControllers{
    public async create(request :Request, response: Response): Promise<Response>{
        try {
            const {name, email, password } = request.body;
    
            const createUser = container.resolve(userService);
            const user = await createUser.execute({
                name,
                email,
                password
            })
    
            delete user.password;
            
            return response.json(classToClass(user));
    
        } catch (err) {
            return response.status(400).json({error: err.message})
        }    
    }
   
}
