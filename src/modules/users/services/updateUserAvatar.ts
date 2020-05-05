import path from 'path';
import fs from 'fs';
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';

interface RequestDTO{
    user_id: string,
    avatarFilename: string
}

class updateUserAvatar{
    constructor(private usersRepository:IUserRepository ){}

    public async execute({user_id, avatarFilename}: RequestDTO ): Promise<User>{

        const user = await this.usersRepository.findByid(user_id);

        if(!user){
            throw new AppError('user not authenticated, only users authenticated can update avatar', 401);
        };

       if(user.avatar){
           //deletar um avatar anterior
            const userAvatarFile = path.join(uploadConfig.directory, user.avatar);
            const userAvatarExists = await fs.promises.stat(userAvatarFile);

            if(userAvatarExists){
                await fs.promises.unlink(userAvatarFile);
            };

       };

       user.avatar = avatarFilename;
       await this.usersRepository.save(user);

       return user;
    }
}

export default updateUserAvatar