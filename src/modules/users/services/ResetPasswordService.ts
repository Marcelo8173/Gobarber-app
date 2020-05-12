import AppError from '@shared/error/AppError';
import { differenceInHours } from 'date-fns';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import IUserTokenRepositories from '@modules/users/repositories/IUserTokenRepositories';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';


import { inject, injectable } from 'tsyringe';

interface IRequestDTO{
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService{
    
    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,


        @inject('UserTokenRepositories')
        private userToken: IUserTokenRepositories,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}


    public async execute({password, token}: IRequestDTO): Promise<void> {
       const userToken = await this.userToken.findByToken(token);
    
        if(!userToken){
            throw new AppError('user token does not exist');
        };

       const user = await this.usersRepository.findByid(userToken.id);

        if(!user){
            throw new AppError('user does not exist');

        };

        const tokenCreatedAt = userToken.created_at;

        if(differenceInHours(tokenCreatedAt, Date.now()) > 2 ){
            throw new AppError('token expired');
        };

        user.password = await this.hashProvider.generateHash(password);


        await this.usersRepository.save(user);
    }

}

export default ResetPasswordService;