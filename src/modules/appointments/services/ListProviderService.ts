import IUserRepository from '@modules/users/repositories/IUserRepositories';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    user_id: string;
}

@injectable()
class ListProviderService{

    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,       
    ){}

    public async execute({user_id}: RequestDTO ): Promise<User[]>{
        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });
        
        return users;
    }
}

export default ListProviderService