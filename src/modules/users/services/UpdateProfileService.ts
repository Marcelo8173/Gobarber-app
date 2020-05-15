import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepositories';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/error/AppError';

interface RequestDTO{
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService{

    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,
        
        @inject('HashProvider')
        private hashProvider: IHashProvider,

    ){}

    public async execute({user_id, email, name, password, old_password}: RequestDTO ): Promise<User>{
        const user = await this.usersRepository.findByid(user_id);
        if(!user){
            throw new AppError('User not found')
        }

        const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new AppError('E-mail already in use');
        }
        console.log(user)

        user.name = name;
        user.email = email;
        //caso ele não informe a senha antiga
        if(password && !old_password){
            throw new AppError('you need to inform the old password to set a new password');
        };
        //checando a senha antiga bate com a senha informada com o usuario para a troca
        


        //alterando a senha do usuario
        if(password){ 
            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError('oldPassword does not match')
            }

            user.password = await this.hashProvider.generateHash(password);
        };

         await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService