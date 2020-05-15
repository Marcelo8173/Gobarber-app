
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    user_id: string;
}

@injectable()
class ShowrProfileService{

    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,
        
    ){}

    public async execute({user_id}: RequestDTO ): Promise<User>{
        const user = await this.usersRepository.findByid(user_id);

        if(!user){
            throw new AppError('User not found')
        };

        return user;
    }
}

export default ShowrProfileService