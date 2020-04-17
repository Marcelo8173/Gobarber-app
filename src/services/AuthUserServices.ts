import { hash, compare } from 'bcryptjs';
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken';
import User from '../models/User';


interface RequestDTO{
    email: string,
    password: string
}

interface Response{
    user: User;
    token: string;
}

class AuthUserServices{

    public async execute({email, password}: RequestDTO): Promise<Response>{

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {
                email
            }
        });

        if(!user){
            throw new Error('Incorrect email/password combination');
        };

        //senha criptografada user.password
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('Incorrect email/password combination');
        };
//gerando o token de autenticação
        const token = sign({}, '327d90f511e25300d12fccae8f2a3707',{
            subject: user.id,
            expiresIn: '2d',
        });

        return {
            user,
            token
        }
    }
}

export default AuthUserServices;