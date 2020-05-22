
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    user_id: string,
    avatarFilename: string
}

@injectable()
class updateUserAvatar{

    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository, 

        @inject('StorageProvider')
        private storageProvider:IStorageProvider 
    ){}

    public async execute({user_id, avatarFilename}: RequestDTO ): Promise<User>{

        const user = await this.usersRepository.findByid(user_id);

        if(!user){
            throw new AppError('user not authenticated, only users authenticated can update avatar', 401);
        };

       if(user.avatar){
           //deletar um avatar anterior
            await this.storageProvider.deleteFile(user.avatar);
       };

       const fileName = await this.storageProvider.saveFile(avatarFilename);

       user.avatar = fileName;
       await this.usersRepository.save(user);

       return user;
    }
}

export default updateUserAvatar