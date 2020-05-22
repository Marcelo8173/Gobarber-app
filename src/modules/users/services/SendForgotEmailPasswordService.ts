import AppError from '@shared/error/AppError';
import path from 'path';
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
        //passando o caminho do template de email
        const forgotPasswordTemplate = path.resolve(__dirname, '..','views', 'Forgot_Password.hbs')


       await this.mailProvider.sendMail({
           to:{
               name: user.name,
               email: user.email,
           },
           subject: '[GoBarber] Recuperação de senha ',
           templateData:{
               file: forgotPasswordTemplate,
               variables:{
                   name: user.name,
                   link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
               }
           }
       });
       
    }

}

export default SendForgotEmailPasswordService;