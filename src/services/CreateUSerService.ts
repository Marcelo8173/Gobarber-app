import User from '../models/User';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm'

interface RequestDTO{
    name: string,
    email: string,
    password: string,
}

class CreateUSerService{
    public async execute({name, email, password}: RequestDTO): Promise<User> {
        const userRepository = getRepository(User);
        
        const userCheckUserExist = await userRepository.findOne({
            where: {
                email
            }
        });

        if(userCheckUserExist){
            throw new Error('Email address already used');
        };

        const hashPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashPassword
        })

        await userRepository.save(user);

        return user;
    }

}

export default CreateUSerService;