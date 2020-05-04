import path from 'path';
import {getRepository} from 'typeorm';
import fs from 'fs';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';

interface RequestDTO{
    user_id: string,
    avatarFilename: string
}

class updateUserAvatar{
    public async execute({user_id, avatarFilename}: RequestDTO ): Promise<User>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

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
       await userRepository.save(user);

       return user;
    }
}

export default updateUserAvatar