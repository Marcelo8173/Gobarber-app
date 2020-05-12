import { uuid } from 'uuidv4';
import IUserTokenRepositories from '@modules/users/repositories/IUserTokenRepositories';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
//as funçoes que vão mexer com os dados

class  FakeTokenUserRepository implements IUserTokenRepositories{   
//atributos
   
    //metodo de procurar agendamentos por mesma dada
    private usersTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken>{
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        })

        this.usersTokens.push(userToken);


        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined>{
        const userToken = this.usersTokens.find(finfToken => finfToken.token === token);

        return userToken;
    }

    
}

export default FakeTokenUserRepository;