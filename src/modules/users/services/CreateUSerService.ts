import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CachedProvider/models/ICacheProvider';
import AppError from '@shared/error/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    name: string,
    email: string,
    password: string,
}

@injectable()
class CreateUSerService{
    
    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('RedisCacheProvider')
       private cacheProvider: ICacheProvider,       
    ){}


    public async execute({name, email, password}: RequestDTO): Promise<User> {
    
        const userCheckUserExist = await this.usersRepository.findByEmail(email);

        if(userCheckUserExist){
            throw new AppError('Email address already used');
        };

        const hashPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword
        })

        await this.cacheProvider.ivalidatePrefix('Providers-list:*');


        return user;
    }

}

export default CreateUSerService;