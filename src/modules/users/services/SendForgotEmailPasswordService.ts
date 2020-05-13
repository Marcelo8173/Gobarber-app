import AppError from '@shared/error/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import IUserTokenRepositories from '@modules/users/repositories/IUserTokenRepositories';

import { inject, injectable } from 'tsyringe';

interface IRequestDTO{
    email: string,
}

@injectable()
class SendForgotEmailPasswordService{
    
    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepositories')
        private userToken: IUserTokenRepositories,
    ){}


    public async execute({email}: IRequestDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        
        if(!user){
            throw new AppError('User does not exist');
        }

        const { token} = await this.userToken.generate(user.id);
        
       await this.mailProvider.sendMail({
           to:{
               name: user.name,
               email: user.email,
           },
           subject: '[GoBarber] Recuperação de senha ',
           templateData:{
               template: 'Olá, {{name}} : {{token}}',
               variables:{
                   name: user.name,
                   token,
               }
           }
       });
       
    }

}

export default SendForgotEmailPasswordService;