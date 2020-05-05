import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/error/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepositories';

interface RequestDTO{
    name: string,
    email: string,
    password: string,
}

class CreateUSerService{
    
    constructor(private usersRepository:IUserRepository ){}


    public async execute({name, email, password}: RequestDTO): Promise<User> {
    
        const userCheckUserExist = await this.usersRepository.findByEmail(email);

        if(userCheckUserExist){
            throw new AppError('Email address already used');
        };

        const hashPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword
        })


        return user;
    }

}

export default CreateUSerService;