import IUserRepository from '@modules/users/repositories/IUserRepositories';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CachedProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    user_id: string;
}

@injectable()
class ListProviderService{

    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,     
        
        
       @inject('RedisCacheProvider')
       private cacheProvider: ICacheProvider,       
    ){}

    public async execute({user_id}: RequestDTO ): Promise<User[]>{
        
        let users = await this.cacheProvider.recover<User[]>(`Providers-list:${user_id}`);


        if(!users){
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id,
            });
                        
            await this.cacheProvider.save(`Providers-list:${user_id}`,users);    
        
        }
       
        return users;
    }
}

export default ListProviderService