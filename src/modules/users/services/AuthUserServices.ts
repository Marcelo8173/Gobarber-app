import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/Auth';
import IUserRepository from '@modules/users/repositories/IUserRepositories';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface RequestDTO{
    email: string,
    password: string
}

interface Response{
    user: User;
    token: string;
}

@injectable()
class AuthUserServices{

    constructor(
        @inject('UserRepository')
        private usersRepository:IUserRepository 
    ){}


    public async execute({email, password}: RequestDTO): Promise<Response>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Incorrect email/password combination', 401);
        };

        //senha criptografada user.password
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination', 401);
        };
//gerando o token de autenticação
        const token = sign({}, authConfig.jwt.secret,{
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token
        }
    }
}

export default AuthUserServices;